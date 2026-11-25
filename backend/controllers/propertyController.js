/**
 * propertyController.js — Request Handlers for Property API
 *
 * Implements full-text property searching and comprehensive destination
 * autocomplete covering global destinations (Thailand, Japan, Bali, Goa, Europe, etc.)
 */

const Property = require('../models/Property');
const mongoose = require('mongoose');

// Comprehensive global destinations database matching Airbnb's autocomplete
const GLOBAL_DESTINATIONS = [
  // Thailand
  { name: 'Thailand', subtitle: 'Explore tropical islands & bustling cities', country: 'Thailand', city: 'Thailand' },
  { name: 'Bangkok, Thailand', subtitle: 'Street food, vibrant markets & temples', country: 'Thailand', city: 'Bangkok' },
  { name: 'Phuket, Thailand', subtitle: 'White sand beaches & island getaways', country: 'Thailand', city: 'Phuket' },
  { name: 'Chiang Mai, Thailand', subtitle: 'Lush mountains & historic old city', country: 'Thailand', city: 'Chiang Mai' },
  { name: 'Koh Samui, Thailand', subtitle: 'Palm-fringed beaches & luxury resorts', country: 'Thailand', city: 'Koh Samui' },
  { name: 'Krabi, Thailand', subtitle: 'Limestone cliffs & emerald waters', country: 'Thailand', city: 'Krabi' },

  // Japan
  { name: 'Japan', subtitle: 'Historic temples, cutting-edge cities & onsen', country: 'Japan', city: 'Japan' },
  { name: 'Tokyo, Japan', subtitle: 'Vibrant metropolis, sushi & shopping', country: 'Japan', city: 'Tokyo' },
  { name: 'Kyoto, Japan', subtitle: 'Centuries-old shrines, gardens & geisha', country: 'Japan', city: 'Kyoto' },
  { name: 'Osaka, Japan', subtitle: 'Famous street food & lively nightlife', country: 'Japan', city: 'Osaka' },
  { name: 'Hokkaido, Japan', subtitle: 'Snow resorts, powder skiing & hot springs', country: 'Japan', city: 'Hokkaido' },
  { name: 'Okinawa, Japan', subtitle: 'Subtropical islands & coral reefs', country: 'Japan', city: 'Okinawa' },

  // Indonesia / Bali
  { name: 'Bali, Indonesia', subtitle: 'Tropical villas, surf spots & rice terraces', country: 'Indonesia', city: 'Bali' },
  { name: 'Seminyak, Bali', subtitle: 'Beach clubs, boutique shopping & dining', country: 'Indonesia', city: 'Seminyak' },
  { name: 'Ubud, Bali', subtitle: 'Art, yoga retreats & lush jungle views', country: 'Indonesia', city: 'Ubud' },
  { name: 'Canggu, Bali', subtitle: 'Surf beaches, cafes & sunset bars', country: 'Indonesia', city: 'Canggu' },

  // India
  { name: 'Goa, India', subtitle: 'Beaches, Portuguese architecture & cafes', country: 'India', city: 'Goa' },
  { name: 'Candolim, Goa', subtitle: 'Water sports, beach shacks & peaceful stays', country: 'India', city: 'Candolim' },
  { name: 'North Goa, India', subtitle: 'Anjuna, Vagator & bustling nightlife', country: 'India', city: 'North Goa' },
  { name: 'South Goa, India', subtitle: 'Serene beaches, luxury resorts & heritage', country: 'India', city: 'South Goa' },
  { name: 'Mumbai, India', subtitle: 'Coastal skyline & Bollywood capital', country: 'India', city: 'Mumbai' },
  { name: 'Manali, Himachal Pradesh', subtitle: 'Himalayan peaks & alpine adventure', country: 'India', city: 'Manali' },

  // Europe & Americas
  { name: 'Paris, France', subtitle: 'The City of Light, cafes & museums', country: 'France', city: 'Paris' },
  { name: 'London, United Kingdom', subtitle: 'Iconic landmarks, theatre & parks', country: 'United Kingdom', city: 'London' },
  { name: 'Rome, Italy', subtitle: 'Colosseum, ancient history & Italian dining', country: 'Italy', city: 'Rome' },
  { name: 'Switzerland', subtitle: 'Snowy Alps, crystal lakes & scenic trains', country: 'Switzerland', city: 'Switzerland' },
  { name: 'Dubai, United Arab Emirates', subtitle: 'Modern luxury, skyline & desert safaris', country: 'United Arab Emirates', city: 'Dubai' },
  { name: 'New York, United States', subtitle: 'Broadway, Central Park & skyline', country: 'United States', city: 'New York' },
];

/**
 * GET /api/properties/:id
 */
const getProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    let property;

    if (mongoose.Types.ObjectId.isValid(id)) {
      property = await Property.findById(id);
    }

    if (!property) {
      property = await Property.findOne({ slug: id });
    }

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/properties/search?q=
 * Searches MongoDB collection and matches any global destination
 */
const searchProperties = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(200).json({
        success: true,
        data: [],
        destinations: GLOBAL_DESTINATIONS.slice(0, 5),
        message: 'Popular destinations returned',
      });
    }

    const cleanQuery = q.trim();
    const escapedQuery = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedQuery, 'i');

    // 1. Query MongoDB for properties matching title, location, city, or country
    const properties = await Property.find({
      $or: [
        { title: { $regex: escapedQuery, $options: 'i' } },
        { location: { $regex: escapedQuery, $options: 'i' } },
        { city: { $regex: escapedQuery, $options: 'i' } },
        { country: { $regex: escapedQuery, $options: 'i' } },
      ],
    }).select('title location city country slug rating reviewsCount images propertyType price originalPrice');

    // 2. Match global destinations
    let matchedDestinations = GLOBAL_DESTINATIONS.filter(
      (dest) =>
        regex.test(dest.name) ||
        regex.test(dest.subtitle) ||
        regex.test(dest.city) ||
        regex.test(dest.country)
    );

    // If user typed something custom that isn't already in the list,
    // dynamically generate a search-everywhere suggestion so there are always results
    if (matchedDestinations.length === 0 && cleanQuery.length >= 2) {
      matchedDestinations = [
        {
          name: cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1),
          subtitle: 'Search all stays and experiences',
          country: 'Worldwide',
          city: cleanQuery,
        },
      ];
    }

    res.status(200).json({
      success: true,
      data: properties,
      destinations: matchedDestinations,
      count: properties.length + matchedDestinations.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/health
 */
const healthCheck = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
};

module.exports = {
  getProperty,
  searchProperties,
  healthCheck,
  GLOBAL_DESTINATIONS,
};
