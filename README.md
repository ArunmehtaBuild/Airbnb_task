# Full-Stack Airbnb Property Page Clone (MERN Stack)

A pixel-accurate, full-stack recreation of the Airbnb property listing for **"2 BHK Tranquil Bluetique Apartment, Candolim"** in Goa, India. 

## 🚀 Live Scope & Features

This application reproduces the complete page up to the end of the **Guest Favourite / Review Breakdown** section:

1. **Airbnb Navbar & Expanded Search Experience**:
   - Collapsed pill: `Anywhere | Any week | Add guests` with coral-red search button.
   - Interactive expanded search bar with **Stays** and **Experiences** tabs.
   - Interactive fields: **Where**, **Check in**, **Check out**, and **Who** (guest counter).
   - Dynamic autocomplete suggestions querying MongoDB Atlas: search for **"Goa"**, **"Bali"**, **"Candolim"**, etc. to view matched destinations and active listings.
   - In-page property selection without full page refreshes.
2. **Sub-Navigation Sticky Bar**:
   - `Photos · Amenities · Reviews · Location` anchor buttons.
3. **Property Header**:
   - Title (`2 BHK Tranquil Bluetique Apartment, Candolim`), location (`Candolim, North Goa, India`), and Share/Save action buttons.
4. **Photo Gallery Grid**:
   - Authentic 5-image grid with 8px gaps and rounded outer corners, loaded directly from Airbnb's `muscache.com` CDN.
   - "Show all photos" button with 3x3 dot grid icon.
   - Full-screen lightbox modal with keyboard navigation (Left/Right arrows, Escape to close).
5. **Property Overview & Details**:
   - `Entire serviced apartment in Goa, India`
   - `5 guests · 2 bedrooms · 2 beds · 2.5 bathrooms`
6. **Guest Favourite Top Badge Card**:
   - Laurel wreath badge, 4.93 rating score with 5 stars, and 165 reviews count.
7. **Host Section**:
   - Host avatar, `Hosted by Curated Stays`, `Superhost · 7 years hosting`.
8. **Stay Highlights**:
   - Dedicated workspace, Self check-in with keypad, and Great location rating.
9. **About This Space**:
   - Detailed property description with expandable "Show more" toggle.
10. **Where You'll Sleep**:
    - Bedroom 1 and Bedroom 2 cards with queen bed indicators.
11. **Amenities Section**:
    - Grid of featured amenities with icons (pool, wifi, workspace, parking, AC, kitchen, etc.).
    - **"Show all 62 amenities"** button matching the Airbnb reference.
12. **Interactive Calendar Section**:
    - `2 nights in Goa` (`4 Dec 2026 - 6 Dec 2026`).
    - Two-month calendar view (December 2026 & January 2027) with selectable dates, keyboard shortcut icon, and "Clear dates" action.
13. **Sticky Reservation Card**:
    - "Prices include all fees" pill banner.
    - Discounted pricing: `₹22,210` crossed out, `₹17,742 for 2 nights`.
    - Check-in (`12/4/2026`), Checkout (`12/6/2026`), and Guests (`1 guest`) dropdown.
    - Airbnb pink `Reserve` button (`#E00B41`).
    - "You won't be charged yet" and "Report this listing" link.
14. **Reviews & Rating Breakdown Section (Final Stopping Section)**:
    - Giant **4.93** rating flanked by authentic SVG laurel wreath branches.
    - **Guest favourite** title and *"This home is a guest favourite based on ratings, reviews and reliability"*.
    - **Overall rating distribution chart**:
      - 5 stars: 94% of reviews
      - 4 stars: 5% of reviews
      - 3 stars: 1% of reviews
      - 2 stars: 0% of reviews
      - 1 stars: 0% of reviews
    - **6 Category Rating Cards**:
      - Cleanliness: `4.8`
      - Accuracy: `5.0`
      - Check-in: `4.9`
      - Communication: `5.0`
      - Location: `4.9`
      - Value: `4.9`

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, Lucide React icons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Data Fetching** | Native Fetch API with resilient parsing and fallback protection |

---

## 📂 Project Structure

```
fleeguide_task_airbnb/
├── backend/
│   ├── config/db.js                 # Mongoose connection with DNS fallback
│   ├── controllers/propertyController.js # getProperty & searchProperties
│   ├── middleware/errorHandler.js    # Central error handler
│   ├── models/Property.js           # Mongoose schema with text indexes
│   ├── routes/propertyRoutes.js     # Express routes
│   ├── seed/seed.js                 # Seeder script for Goa & Bali properties
│   ├── server.js                    # Express app entry point
│   ├── .env                         # MongoDB connection credentials
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Top navigation bar
│   │   │   ├── SearchBar.jsx        # Expanded Airbnb search with autocomplete
│   │   │   ├── SubNav.jsx           # Sticky section anchor bar
│   │   │   ├── PropertyHeader.jsx   # Title, location, Share & Save
│   │   │   ├── ImageGallery.jsx     # 5-image grid
│   │   │   ├── PhotoModal.jsx       # Full-screen lightbox
│   │   │   ├── PropertyOverview.jsx # Room & accommodation numbers
│   │   │   ├── GuestFavourite.jsx   # Top badge card
│   │   │   ├── HostSection.jsx      # Host profile & superhost badge
│   │   │   ├── HighlightsSection.jsx# Workspace, check-in, location perks
│   │   │   ├── AboutSection.jsx     # Description with show more toggle
│   │   │   ├── SleepingArrangements.jsx # Bedroom cards
│   │   │   ├── AmenitiesSection.jsx # Amenities grid + Show all 62 button
│   │   │   ├── CalendarSection.jsx  # Dec 2026 - Jan 2027 calendar
│   │   │   ├── BookingCard.jsx      # Sticky price & reservation card
│   │   │   └── ReviewBreakdown.jsx  # Giant 4.93, laurel wreaths & categories
│   │   ├── services/
│   │   │   └── propertyApi.js       # Fetch client with zero-downtime fallback
│   │   ├── App.jsx                  # Root component
│   │   └── main.jsx                 # React root
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## ⚡ How to Run the Project

### 1. Start the Backend
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`.

### 2. Start the Frontend
In a second terminal:
```bash
cd frontend
npm run dev
```
Open `http://localhost:5173` in your browser.
