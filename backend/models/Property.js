/**
 * Property.js — Mongoose Schema & Model
 *
 * What it does:
 *   Defines the schema for Property documents in MongoDB Atlas,
 *   including accommodation details, host information, amenities,
 *   price breakdown, and comprehensive review category ratings.
 */

const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String, default: 'Property image' },
  order: { type: Number, default: 0 },
}, { _id: false });

const highlightSchema = new mongoose.Schema({
  icon: { type: String, default: 'star' },
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const sleepingArrangementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  bedType: { type: String, required: true },
  image: { type: String, default: '' },
}, { _id: false });

const amenitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: 'check' },
  unavailable: { type: Boolean, default: false },
}, { _id: false });

const photoTourSectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  subtitle: { type: String, default: null },
  thumbnail: { type: String, default: '' },
  photos: [{
    id: String,
    url: String,
    thumbnail: String,
    alt: String,
  }],
}, { _id: false });

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  city: { type: String, default: 'Goa' },
  country: { type: String, default: 'India' },
  propertyType: { type: String, required: true },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  beds: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  reviewsCount: { type: Number, required: true, default: 0 },
  guestFavourite: { type: Boolean, default: false },
  guestFavouriteDescription: { type: String, default: '' },
  
  // Pricing for reservation card
  price: { type: Number, default: 17742 },
  originalPrice: { type: Number, default: 22210 },
  priceNights: { type: Number, default: 2 },
  
  // Host details
  host: {
    name: { type: String, default: 'Curated Stays' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80' },
    isSuperhost: { type: Boolean, default: true },
    yearsHosting: { type: Number, default: 7 },
  },

  // Room & stay highlights
  highlights: [highlightSchema],

  // Description
  description: { type: String, default: '' },

  // Sleeping arrangements
  sleepingArrangements: [sleepingArrangementSchema],

  // Amenities
  amenities: [amenitySchema],
  totalAmenitiesCount: { type: Number, default: 62 },

  // Photo tour sections
  photoTour: [photoTourSectionSchema],

  // Full review breakdowns
  ratingBreakdown: {
    overall: {
      star5: { type: Number, default: 94 },
      star4: { type: Number, default: 5 },
      star3: { type: Number, default: 1 },
      star2: { type: Number, default: 0 },
      star1: { type: Number, default: 0 },
    },
    categories: {
      cleanliness: { type: Number, default: 4.8 },
      accuracy: { type: Number, default: 5.0 },
      checkIn: { type: Number, default: 4.9 },
      communication: { type: Number, default: 5.0 },
      location: { type: Number, default: 4.9 },
      value: { type: Number, default: 4.9 },
    },
  },

  images: [imageSchema],
}, {
  timestamps: true,
});

propertySchema.index({ title: 'text', location: 'text', city: 'text' });

module.exports = mongoose.model('Property', propertySchema);
