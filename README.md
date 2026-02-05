# CarAtlas User/Public Frontend

User-facing portal for searching and browsing cars.

## Port
Runs on port **3275**

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3377
```

3. Run development server:
```bash
npm run dev
```

## Features

- Car search and filtering
- Car details page
- Location-based search
- User dashboard

## API Endpoints

- `/search` - Search cars
- `/search/brands` - Get brands
- `/search/models` - Get models
- `/search/cities` - Get cities
- `/search/:id` - Get car details
