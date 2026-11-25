# Fleeguide Frontend

React 19 + Vite single-page application recreating the Airbnb property listing page for **2 BHK Tranquil Bluetique Apartment, Candolim**.

## Key Tech
- **React 19** with functional components and hooks
- **Vite 8** with native ESM support and proxying to backend (`/api` -> `http://localhost:5000`)
- **Tailwind CSS v4** for clean utility-first styling
- **Lucide React** for icons

## Project Structure
```
frontend/
├── public/
│   ├── arun_mehta.jpg       # Host profile avatar
│   └── favicon.svg          # Fleeguide Bélo favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Header with expandable search bar and profile menu
│   │   ├── SearchBar.jsx            # Autocomplete search capsule with Stays/Experiences/Services
│   │   ├── SubNav.jsx               # Floating sticky anchor nav (Photos, Amenities, Reviews, Location)
│   │   ├── PropertyHeader.jsx       # Title, location, interactive Share & Save buttons
│   │   ├── ImageGallery.jsx         # 5-image responsive grid with lightbox triggers
│   │   ├── PhotoModal.jsx           # Full-screen photo tour modal with 13 room sections
│   │   ├── PropertyOverview.jsx     # Serviced apartment type & room counts
│   │   ├── GuestFavourite.jsx       # Top badge with laurel wreath and rating
│   │   ├── HostSection.jsx          # Host Arun Mehta profile and Superhost badge
│   │   ├── HighlightsSection.jsx    # Room & location highlights
│   │   ├── AboutSection.jsx         # Property description with "Show more" modal
│   │   ├── SleepingArrangements.jsx # Bedroom cards linking to photo tour
│   │   ├── AmenitiesSection.jsx     # Amenities preview & "Show all 62 amenities" modal
│   │   ├── CalendarSection.jsx      # Interactive 2-month booking calendar
│   │   ├── BookingCard.jsx          # Sticky reservation card with guest & date popovers
│   │   └── ReviewBreakdown.jsx      # Giant 4.93 rating with laurel wreaths & category cards
│   ├── data/
│   │   └── photoTourData.js         # Complete photo tour data with 13 categorized rooms
│   ├── services/
│   │   └── propertyApi.js           # API client with offline fallback protection
│   ├── App.jsx                      # Root container & scroll coordinator
│   ├── index.css                    # Tailwind CSS v4 entry point & base resets
│   └── main.jsx                     # Application bootstrap mounting into DOM
├── index.html                       # HTML root with Plus Jakarta Sans & favicon
├── package.json
└── vite.config.js                   # Vite configuration with React and Tailwind plugins
```

## Available Scripts
- `npm run dev`: Starts local development server on port 5173
- `npm run build`: Builds optimized production bundle into `dist/`
- `npm run lint`: Runs Oxlint checking 100+ linting rules
- `npm run preview`: Previews production build locally
