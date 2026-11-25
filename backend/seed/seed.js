/**
 * seed.js — Database Seed Script
 *
 * Populates MongoDB Atlas with properties in Goa, Bali, Thailand, and Japan.
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const dns = require('dns');

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}

dotenv.config({ path: path.join(__dirname, '..', '.env') });
const Property = require('../models/Property');

const properties = [
  // 1. Candolim, Goa (Reference Listing)
  {
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
    photoTour: [
      {
            "id": "photo-tour-section-living-room",
            "name": "Living room",
            "subtitle": null,
            "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/73a83e85-2e50-470b-9e1d-7d47d0212ca2.jpeg?im_w=720",
            "photos": [
                  {
                        "id": "52481572-space-163874107-photo-1",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/73a83e85-2e50-470b-9e1d-7d47d0212ca2.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/73a83e85-2e50-470b-9e1d-7d47d0212ca2.jpeg?im_w=720",
                        "alt": "Living room photo 1"
                  },
                  {
                        "id": "52481572-space-163874107-photo-2",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/493625d3-7131-48fe-a6a4-e55fa21663e3.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/493625d3-7131-48fe-a6a4-e55fa21663e3.jpeg?im_w=720",
                        "alt": "Living room photo 2"
                  },
                  {
                        "id": "52481572-space-163874107-photo-3",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/c220e6f0-fe9d-4863-ad07-bc8d45e79cd2.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/c220e6f0-fe9d-4863-ad07-bc8d45e79cd2.jpeg?im_w=720",
                        "alt": "Living room photo 3"
                  },
                  {
                        "id": "52481572-space-163874107-photo-4",
                        "url": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/f316cf79-b08f-4f8c-be4d-46a65d9706b6.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/f316cf79-b08f-4f8c-be4d-46a65d9706b6.jpeg?im_w=720",
                        "alt": "Living room photo 4"
                  },
                  {
                        "id": "52481572-space-163874107-photo-5",
                        "url": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/94b58daf-1e75-4ab1-9b21-07e6268991a7.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/94b58daf-1e75-4ab1-9b21-07e6268991a7.jpeg?im_w=720",
                        "alt": "Living room photo 5"
                  },
                  {
                        "id": "52481572-space-163874107-photo-6",
                        "url": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/2f251f7a-35e2-4584-8b77-ae6cfeee078b.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/2f251f7a-35e2-4584-8b77-ae6cfeee078b.jpeg?im_w=720",
                        "alt": "Living room photo 6"
                  },
                  {
                        "id": "52481572-space-163874107-photo-7",
                        "url": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/b78534bc-8b68-40be-b90e-d7c5a9a6bfff.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/b78534bc-8b68-40be-b90e-d7c5a9a6bfff.jpeg?im_w=720",
                        "alt": "Living room photo 7"
                  },
                  {
                        "id": "52481572-space-163874107-photo-8",
                        "url": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/aeb11b38-03b7-480a-8529-769978e77dfd.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/aeb11b38-03b7-480a-8529-769978e77dfd.jpeg?im_w=720",
                        "alt": "Living room photo 8"
                  }
            ]
      },
      {
            "id": "photo-tour-section-full-kitchen",
            "name": "Full kitchen",
            "subtitle": null,
            "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/082d968e-7fc3-4d73-8f8c-b55b171a23b1.jpeg?im_w=720",
            "photos": [
                  {
                        "id": "52481572-space-163874108-photo-1",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/082d968e-7fc3-4d73-8f8c-b55b171a23b1.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/082d968e-7fc3-4d73-8f8c-b55b171a23b1.jpeg?im_w=720",
                        "alt": "Full kitchen photo 1"
                  },
                  {
                        "id": "52481572-space-163874108-photo-2",
                        "url": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/30c03dad-07ec-40e6-b041-4558b38b93fe.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/30c03dad-07ec-40e6-b041-4558b38b93fe.jpeg?im_w=720",
                        "alt": "Full kitchen photo 2"
                  }
            ]
      },
      {
            "id": "photo-tour-section-bedroom-1",
            "name": "Bedroom 1",
            "subtitle": "King bed",
            "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/ba88c8e4-315d-470b-93b4-96ea1765c135.jpeg?im_w=720",
            "photos": [
                  {
                        "id": "52481572-space-163874103-photo-1",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/ba88c8e4-315d-470b-93b4-96ea1765c135.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/ba88c8e4-315d-470b-93b4-96ea1765c135.jpeg?im_w=720",
                        "alt": "Bedroom 1 photo 1"
                  },
                  {
                        "id": "52481572-space-163874103-photo-2",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/5096b30c-06c8-402e-a480-d6f164a34fad.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/5096b30c-06c8-402e-a480-d6f164a34fad.jpeg?im_w=720",
                        "alt": "Bedroom 1 photo 2"
                  },
                  {
                        "id": "52481572-space-163874103-photo-3",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/413eb6c2-a79e-4436-b134-3fcd26764ee3.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/413eb6c2-a79e-4436-b134-3fcd26764ee3.jpeg?im_w=720",
                        "alt": "Bedroom 1 photo 3"
                  },
                  {
                        "id": "52481572-space-163874103-photo-4",
                        "url": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/412c3474-6996-4a09-bfd1-ad32379de121.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/412c3474-6996-4a09-bfd1-ad32379de121.jpeg?im_w=720",
                        "alt": "Bedroom 1 photo 4"
                  },
                  {
                        "id": "52481572-space-163874103-photo-5",
                        "url": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/39b71536-2332-460a-b239-a9edeb1b3df5.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/39b71536-2332-460a-b239-a9edeb1b3df5.jpeg?im_w=720",
                        "alt": "Bedroom 1 photo 5"
                  },
                  {
                        "id": "52481572-space-163874103-photo-6",
                        "url": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/b30fc62a-9ee9-49d6-af4a-44429f409b8e.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/b30fc62a-9ee9-49d6-af4a-44429f409b8e.jpeg?im_w=720",
                        "alt": "Bedroom 1 photo 6"
                  }
            ]
      },
      {
            "id": "photo-tour-section-bedroom-2",
            "name": "Bedroom 2",
            "subtitle": "King bed",
            "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/143fc71f-84e1-4db7-afc4-7cc0bdf386ae.jpeg?im_w=720",
            "photos": [
                  {
                        "id": "52481572-space-163874106-photo-1",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/143fc71f-84e1-4db7-afc4-7cc0bdf386ae.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/143fc71f-84e1-4db7-afc4-7cc0bdf386ae.jpeg?im_w=720",
                        "alt": "Bedroom 2 photo 1"
                  },
                  {
                        "id": "52481572-space-163874106-photo-2",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/2bb48057-ef57-4fcf-9eb3-a2d3ca647c8f.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/2bb48057-ef57-4fcf-9eb3-a2d3ca647c8f.jpeg?im_w=720",
                        "alt": "Bedroom 2 photo 2"
                  },
                  {
                        "id": "52481572-space-163874106-photo-3",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/9de4680d-8dd7-4f4b-8b4f-b705d0e9148f.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/9de4680d-8dd7-4f4b-8b4f-b705d0e9148f.jpeg?im_w=720",
                        "alt": "Bedroom 2 photo 3"
                  },
                  {
                        "id": "52481572-space-163874106-photo-4",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/329bab24-ee44-4bdc-b29b-4aaf833c03d2.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/329bab24-ee44-4bdc-b29b-4aaf833c03d2.jpeg?im_w=720",
                        "alt": "Bedroom 2 photo 4"
                  },
                  {
                        "id": "52481572-space-163874106-photo-5",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/26189d43-fdb1-47cd-8cbd-bb0532b3f948.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/26189d43-fdb1-47cd-8cbd-bb0532b3f948.jpeg?im_w=720",
                        "alt": "Bedroom 2 photo 5"
                  },
                  {
                        "id": "52481572-space-163874106-photo-6",
                        "url": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/e56a011c-0a18-4c40-b60c-bca434bdc7f8.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/e56a011c-0a18-4c40-b60c-bca434bdc7f8.jpeg?im_w=720",
                        "alt": "Bedroom 2 photo 6"
                  },
                  {
                        "id": "52481572-space-163874106-photo-7",
                        "url": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/d03960b4-2152-4ecf-8836-ebbbcb66f5d6.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/d03960b4-2152-4ecf-8836-ebbbcb66f5d6.jpeg?im_w=720",
                        "alt": "Bedroom 2 photo 7"
                  },
                  {
                        "id": "52481572-space-163874106-photo-8",
                        "url": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/4661f206-cadd-410b-8259-3b87aa7e3ce3.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/4661f206-cadd-410b-8259-3b87aa7e3ce3.jpeg?im_w=720",
                        "alt": "Bedroom 2 photo 8"
                  }
            ]
      },
      {
            "id": "photo-tour-section-full-bathroom-1",
            "name": "Full bathroom 1",
            "subtitle": null,
            "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/bc230c5a-9668-44b3-a993-97190d314aa7.jpeg?im_w=720",
            "photos": [
                  {
                        "id": "52481572-space-163874101-photo-1",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/bc230c5a-9668-44b3-a993-97190d314aa7.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/bc230c5a-9668-44b3-a993-97190d314aa7.jpeg?im_w=720",
                        "alt": "Full bathroom 1 photo 1"
                  }
            ]
      },
      {
            "id": "photo-tour-section-full-bathroom-2",
            "name": "Full bathroom 2",
            "subtitle": null,
            "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/94c84327-61a0-4710-981c-ec25f1ced774.jpeg?im_w=720",
            "photos": [
                  {
                        "id": "52481572-space-163874111-photo-1",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/94c84327-61a0-4710-981c-ec25f1ced774.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/94c84327-61a0-4710-981c-ec25f1ced774.jpeg?im_w=720",
                        "alt": "Full bathroom 2 photo 1"
                  }
            ]
      },
      {
            "id": "photo-tour-section-wc",
            "name": "WC",
            "subtitle": null,
            "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/7f4c5257-ac1b-446c-8cee-34833c29ff0e.jpeg?im_w=720",
            "photos": [
                  {
                        "id": "52481572-space-163874100-photo-1",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/7f4c5257-ac1b-446c-8cee-34833c29ff0e.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/7f4c5257-ac1b-446c-8cee-34833c29ff0e.jpeg?im_w=720",
                        "alt": "WC photo 1"
                  }
            ]
      },
      {
            "id": "photo-tour-section-workspace",
            "name": "Workspace",
            "subtitle": null,
            "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/d8837e4b-d425-4c26-a57f-f0705a765504.jpeg?im_w=720",
            "photos": [
                  {
                        "id": "52481572-space-529190250-photo-1",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/d8837e4b-d425-4c26-a57f-f0705a765504.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/d8837e4b-d425-4c26-a57f-f0705a765504.jpeg?im_w=720",
                        "alt": "Workspace photo 1"
                  }
            ]
      },
      {
            "id": "photo-tour-section-back-garden",
            "name": "Back garden",
            "subtitle": null,
            "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/62031ff1-fcff-4b03-926c-1879d83deba6.jpeg?im_w=720",
            "photos": [
                  {
                        "id": "52481572-space-163874104-photo-1",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/62031ff1-fcff-4b03-926c-1879d83deba6.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/62031ff1-fcff-4b03-926c-1879d83deba6.jpeg?im_w=720",
                        "alt": "Back garden photo 1"
                  },
                  {
                        "id": "52481572-space-163874104-photo-2",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/42efa635-3bd7-4476-91ef-075733733e9f.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/42efa635-3bd7-4476-91ef-075733733e9f.jpeg?im_w=720",
                        "alt": "Back garden photo 2"
                  },
                  {
                        "id": "52481572-space-163874104-photo-3",
                        "url": "https://a0.muscache.com/im/pictures/c636be53-df40-42ef-a046-d9f36c9a3aee.jpg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/c636be53-df40-42ef-a046-d9f36c9a3aee.jpg?im_w=720",
                        "alt": "Back garden photo 3"
                  },
                  {
                        "id": "52481572-space-163874104-photo-4",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/9f787033-a354-4c66-8eaa-1797b06fe2d0.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/9f787033-a354-4c66-8eaa-1797b06fe2d0.jpeg?im_w=720",
                        "alt": "Back garden photo 4"
                  }
            ]
      },
      {
            "id": "photo-tour-section-patio",
            "name": "Patio",
            "subtitle": null,
            "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/3341d85b-2354-4435-a9eb-e490e1faa53f.jpeg?im_w=720",
            "photos": [
                  {
                        "id": "52481572-space-163874102-photo-1",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/3341d85b-2354-4435-a9eb-e490e1faa53f.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/3341d85b-2354-4435-a9eb-e490e1faa53f.jpeg?im_w=720",
                        "alt": "Patio photo 1"
                  },
                  {
                        "id": "52481572-space-163874102-photo-2",
                        "url": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/d1820a0f-9f75-49e4-8ec6-57b37a23d2d1.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/d1820a0f-9f75-49e4-8ec6-57b37a23d2d1.jpeg?im_w=720",
                        "alt": "Patio photo 2"
                  },
                  {
                        "id": "52481572-space-163874102-photo-3",
                        "url": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/e1d90a8e-91f1-4208-839a-160986ebc636.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/e1d90a8e-91f1-4208-839a-160986ebc636.jpeg?im_w=720",
                        "alt": "Patio photo 3"
                  }
            ]
      },
      {
            "id": "photo-tour-section-exterior",
            "name": "Exterior",
            "subtitle": null,
            "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/d5d2d80d-dc02-4603-9999-c1fc2d5c5988.jpeg?im_w=720",
            "photos": [
                  {
                        "id": "52481572-space-163874110-photo-1",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/d5d2d80d-dc02-4603-9999-c1fc2d5c5988.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/d5d2d80d-dc02-4603-9999-c1fc2d5c5988.jpeg?im_w=720",
                        "alt": "Exterior photo 1"
                  },
                  {
                        "id": "52481572-space-163874110-photo-2",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/46c57afa-b877-4d9d-b4c2-8183c7399508.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/46c57afa-b877-4d9d-b4c2-8183c7399508.jpeg?im_w=720",
                        "alt": "Exterior photo 2"
                  },
                  {
                        "id": "52481572-space-163874110-photo-3",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/15af7a24-73b6-451a-8493-e15216098f91.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/15af7a24-73b6-451a-8493-e15216098f91.jpeg?im_w=720",
                        "alt": "Exterior photo 3"
                  }
            ]
      },
      {
            "id": "photo-tour-section-pool",
            "name": "Pool",
            "subtitle": null,
            "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/ae4647cb-5c7d-4355-87f7-40d7593e20cb.jpeg?im_w=720",
            "photos": [
                  {
                        "id": "52481572-space-163874109-photo-1",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/ae4647cb-5c7d-4355-87f7-40d7593e20cb.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/ae4647cb-5c7d-4355-87f7-40d7593e20cb.jpeg?im_w=720",
                        "alt": "Pool photo 1"
                  },
                  {
                        "id": "52481572-space-163874109-photo-2",
                        "url": "https://a0.muscache.com/im/pictures/8d0aae86-828a-44f3-a66c-b9e4a1c7fe50.jpg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/8d0aae86-828a-44f3-a66c-b9e4a1c7fe50.jpg?im_w=720",
                        "alt": "Pool photo 2"
                  }
            ]
      },
      {
            "id": "photo-tour-section-additional-photos",
            "name": "Additional photos",
            "subtitle": null,
            "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/271aaf56-a0a0-4368-8db2-0ade65e2cdf7.jpeg?im_w=720",
            "photos": [
                  {
                        "id": "52481572-additional-photo-1",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/271aaf56-a0a0-4368-8db2-0ade65e2cdf7.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/271aaf56-a0a0-4368-8db2-0ade65e2cdf7.jpeg?im_w=720",
                        "alt": "Additional photos photo 1"
                  },
                  {
                        "id": "52481572-additional-photo-2",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/9c7891b8-334c-48bf-a068-cde1f3f06db3.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/9c7891b8-334c-48bf-a068-cde1f3f06db3.jpeg?im_w=720",
                        "alt": "Additional photos photo 2"
                  },
                  {
                        "id": "52481572-additional-photo-3",
                        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/535c5ec2-2931-45e1-8da6-47e87aced871.jpeg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/535c5ec2-2931-45e1-8da6-47e87aced871.jpeg?im_w=720",
                        "alt": "Additional photos photo 3"
                  },
                  {
                        "id": "52481572-additional-photo-4",
                        "url": "https://a0.muscache.com/im/pictures/1d223ca9-0a06-4bbf-b797-7ee885008427.jpg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/1d223ca9-0a06-4bbf-b797-7ee885008427.jpg?im_w=720",
                        "alt": "Additional photos photo 4"
                  },
                  {
                        "id": "52481572-additional-photo-5",
                        "url": "https://a0.muscache.com/im/pictures/08e4839e-cc0b-4cce-a0f6-7c39501c2c1c.jpg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/08e4839e-cc0b-4cce-a0f6-7c39501c2c1c.jpg?im_w=720",
                        "alt": "Additional photos photo 5"
                  },
                  {
                        "id": "52481572-additional-photo-6",
                        "url": "https://a0.muscache.com/im/pictures/e3699a8f-c103-4320-992c-0d375e7cf831.jpg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/e3699a8f-c103-4320-992c-0d375e7cf831.jpg?im_w=720",
                        "alt": "Additional photos photo 6"
                  },
                  {
                        "id": "52481572-additional-photo-7",
                        "url": "https://a0.muscache.com/im/pictures/a669c110-f3c1-4254-abae-f6b0800f5768.jpg?im_w=1200",
                        "thumbnail": "https://a0.muscache.com/im/pictures/a669c110-f3c1-4254-abae-f6b0800f5768.jpg?im_w=720",
                        "alt": "Additional photos photo 7"
                  }
            ]
      }
],
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
  },

  // 2. Thailand Listing (Phuket)
  {
    title: 'Secluded Oceanfront Pool Villa, Phuket',
    slug: 'secluded-oceanfront-pool-villa-phuket-thailand',
    location: 'Kamala Beach, Phuket, Thailand',
    city: 'Phuket',
    country: 'Thailand',
    propertyType: 'Entire luxury villa in Phuket, Thailand',
    guests: 6,
    bedrooms: 3,
    beds: 3,
    bathrooms: 3.5,
    rating: 4.97,
    reviewsCount: 188,
    guestFavourite: true,
    guestFavouriteDescription: 'This home is a guest favourite based on ratings, reviews and reliability.',
    price: 32500,
    originalPrice: 38000,
    priceNights: 2,
    host: {
      name: 'Somchai & Maya',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=80',
      isSuperhost: true,
      yearsHosting: 8,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
        alt: 'Phuket oceanfront villa with infinity pool',
        order: 0,
      },
    ],
  },

  // 3. Japan Listing (Kyoto)
  {
    title: 'Traditional Machiya Heritage House, Kyoto',
    slug: 'traditional-machiya-heritage-house-kyoto-japan',
    location: 'Gion District, Kyoto, Japan',
    city: 'Kyoto',
    country: 'Japan',
    propertyType: 'Entire historic townhouse in Kyoto, Japan',
    guests: 4,
    bedrooms: 2,
    beds: 4,
    bathrooms: 1.5,
    rating: 4.98,
    reviewsCount: 224,
    guestFavourite: true,
    guestFavouriteDescription: 'This home is a guest favourite based on ratings, reviews and reliability.',
    price: 28900,
    originalPrice: 34000,
    priceNights: 2,
    host: {
      name: 'Kenji & Aoi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=80',
      isSuperhost: true,
      yearsHosting: 6,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
        alt: 'Kyoto traditional wooden Machiya house',
        order: 0,
      },
    ],
  },

  // 4. Bali Listing
  {
    title: 'Luxury Tropical Pool Villa, Seminyak',
    slug: 'luxury-tropical-pool-villa-seminyak-bali',
    location: 'Seminyak, Bali, Indonesia',
    city: 'Bali',
    country: 'Indonesia',
    propertyType: 'Entire villa in Bali, Indonesia',
    guests: 6,
    bedrooms: 3,
    beds: 3,
    bathrooms: 3,
    rating: 4.96,
    reviewsCount: 210,
    guestFavourite: true,
    guestFavouriteDescription: 'This home is a guest favourite based on ratings, reviews and reliability.',
    price: 24500,
    originalPrice: 29000,
    priceNights: 2,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
        alt: 'Tropical villa with private pool',
        order: 0,
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    for (const prop of properties) {
      await Property.findOneAndUpdate(
        { slug: prop.slug },
        prop,
        { upsert: true, new: true }
      );
      console.log(`Seeded: ${prop.title} (${prop.slug})`);
    }

    console.log('All properties seeded successfully!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
