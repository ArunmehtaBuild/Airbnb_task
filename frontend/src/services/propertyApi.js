/**
 * propertyApi.js — API Service Layer
 *
 * Handles fetching property details and performing dynamic search queries
 * against the Express backend and MongoDB Atlas.
 */

import { photoTourSections } from '../data/photoTourData';

const API_BASE = '/api';

export const FALLBACK_PROPERTY = {
  title: '2 BHK Tranquil Bluetique Apartment, Candolim',
  slug: '2-bhk-tranquil-bluetique-apartment-candolim',
  location: 'Candolim, North Goa, India',
  city: 'Goa',
  country: 'India',
  propertyType: 'Entire serviced apartment in Goa, India',
  guests: 5,
  bedrooms: 2,
  beds: 2,
  bathrooms: 2.5,
  rating: 4.93,
  reviewsCount: 165,
  guestFavourite: true,
  guestFavouriteDescription: 'This home is a guest favourite based on ratings, reviews and reliability',
  price: 17742,
  originalPrice: 22210,
  priceNights: 2,
  host: {
    name: 'Arun Mehta',
    avatar: '/arun_mehta.jpg',
    isSuperhost: true,
    yearsHosting: 7,
  },
  photoTour: photoTourSections,
  highlights: [
    {
      icon: 'map-pin',
      title: 'In Candolim, near the beach',
      description: 'About a 10-min walk to Candolim Beach, with restaurants and shops along the way',
    },
    {
      icon: 'waves',
      title: 'Pool and balcony with green views',
      description: 'A shared infinity pool overlooks the mangroves, with a private balcony to take in the greenery',
    },
    {
      icon: 'award',
      title: 'Arun Mehta is an attentive host',
      description: "Guests highlight Arun's responsiveness, local tips, and the daily housekeeping that keeps the space spotless",
    },
  ],
  description: `This is a spacious apartment with a rustic mediterranean look which you will fall in love with. With 2 bedrooms and en-suite bathrooms it is just the right size for small familes and group of friends.

The apartment is located in a peaceful location and yet very close to all the action like amazing restaurants, bars and night clubs within 15-20 min of walking distance. The apartment block has a small infinity style swimming pool overlooking mangroves where you can relax after a long day out.

The space
The apartment has an amazing view of the mangroves which is a natural habitat for various species of birds like peacocks etc.`,
  sleepingArrangements: [
    {
      title: 'Bedroom 1',
      bedType: '1 king bed',
      image:
        'https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/ba88c8e4-315d-470b-93b4-96ea1765c135.jpeg?im_w=720',
    },
    {
      title: 'Bedroom 2',
      bedType: '1 king bed',
      image:
        'https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/143fc71f-84e1-4db7-afc4-7cc0bdf386ae.jpeg?im_w=720',
    },
  ],
  amenities: [
    { name: 'Garden view', icon: 'flower' },
    { name: 'Mountain view', icon: 'mountain' },
    { name: 'Shared beach access', icon: 'sun' },
    { name: 'Kitchen', icon: 'utensils' },
    { name: 'Caretaker', icon: 'caretaker' },
    { name: 'Wifi', icon: 'wifi' },
    { name: 'Dedicated workspace', icon: 'workspace' },
    { name: 'Free parking on premises', icon: 'car' },
    { name: 'Carbon monoxide alarm', icon: 'alarm', unavailable: true },
    { name: 'Smoke alarm', icon: 'smoke', unavailable: true },
  ],
  totalAmenitiesCount: 62,
  ratingBreakdown: {
    overall: { star5: 94, star4: 5, star3: 1, star2: 0, star1: 0 },
    categories: {
      cleanliness: 4.8,
      accuracy: 5.0,
      checkIn: 4.9,
      communication: 5.0,
      location: 4.9,
      value: 4.9,
    },
  },
  images: [
    {
      url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/94b58daf-1e75-4ab1-9b21-07e6268991a7.jpeg?im_w=960',
      alt: 'Living room with teal sofa, balcony doors and chandelier',
      order: 0,
    },
    {
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/9de4680d-8dd7-4f4b-8b4f-b705d0e9148f.jpeg?im_w=720',
      alt: 'Bedroom with patterned bed runner and yellow wood chair',
      order: 1,
    },
    {
      url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/b30fc62a-9ee9-49d6-af4a-44429f409b8e.jpeg?im_w=720',
      alt: 'Living room open view towards hallway and kitchen',
      order: 2,
    },
    {
      url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/aeb11b38-03b7-480a-8529-769978e77dfd.jpeg?im_w=720',
      alt: 'Bedroom with white frame bed and wall paintings',
      order: 3,
    },
    {
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/3341d85b-2354-4435-a9eb-e490e1faa53f.jpeg?im_w=720',
      alt: 'Balcony overlooking lush green mangroves with table and chairs',
      order: 4,
    },
  ],
};

const GLOBAL_DEFAULT_DESTINATIONS = [
  { name: 'Thailand', subtitle: 'Explore tropical islands & bustling cities' },
  { name: 'Bangkok, Thailand', subtitle: 'Street food, vibrant markets & temples' },
  { name: 'Phuket, Thailand', subtitle: 'White sand beaches & island getaways' },
  { name: 'Japan', subtitle: 'Historic temples, cutting-edge cities & onsen' },
  { name: 'Tokyo, Japan', subtitle: 'Vibrant metropolis, sushi & shopping' },
  { name: 'Kyoto, Japan', subtitle: 'Centuries-old shrines & traditional gardens' },
  { name: 'Bali, Indonesia', subtitle: 'Tropical villas, surf spots & rice terraces' },
  { name: 'Goa, India', subtitle: 'Beaches, Portuguese architecture & cafes' },
  { name: 'Candolim, Goa', subtitle: 'Water sports, beach shacks & peaceful stays' },
  { name: 'Paris, France', subtitle: 'The City of Light, cafes & museums' },
  { name: 'Switzerland', subtitle: 'Snowy Alps, crystal lakes & scenic trains' },
  { name: 'London, United Kingdom', subtitle: 'Iconic landmarks, theatre & parks' },
];

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }
  return null;
}

export async function fetchProperty(id) {
  try {
    const response = await fetch(`${API_BASE}/properties/${id}`);
    const data = await parseResponse(response);
    if (response.ok && data?.data) {
      return data.data;
    }
  } catch (err) {
    console.warn('Backend unavailable, using fallback seeded data:', err.message);
  }
  return FALLBACK_PROPERTY;
}

export async function searchProperties(query) {
  if (!query || query.trim() === '') {
    return {
      properties: [],
      destinations: GLOBAL_DEFAULT_DESTINATIONS.slice(0, 6),
    };
  }

  try {
    const response = await fetch(
      `${API_BASE}/properties/search?q=${encodeURIComponent(query.trim())}`
    );
    const data = await parseResponse(response);
    if (response.ok && data) {
      return {
        properties: data.data || [],
        destinations: data.destinations || [],
      };
    }
  } catch (err) {
    console.warn('Search API offline:', err.message);
  }

  // Fallback matching
  const qLower = query.toLowerCase().trim();
  const matchedDestinations = GLOBAL_DEFAULT_DESTINATIONS.filter(
    (d) => d.name.toLowerCase().includes(qLower) || d.subtitle.toLowerCase().includes(qLower)
  );

  if (matchedDestinations.length === 0 && qLower.length >= 2) {
    matchedDestinations.push({
      name: query.charAt(0).toUpperCase() + query.slice(1),
      subtitle: 'Search all stays and experiences',
    });
  }

  return { properties: [], destinations: matchedDestinations };
}
