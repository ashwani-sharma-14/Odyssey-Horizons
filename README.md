# Odyssey Horizons (Travel Agency Website)

A full-stack web application for managing travel packages and customer bookings.

## Features

### User Side

- Browse travel packages
- View package details
- Submit booking queries
- Filter packages by price, duration, and destination
- Responsive design for all devices

### Admin Side

- Dashboard with key metrics
- Manage travel packages (CRUD operations)
- Handle customer queries
- Track booking status
- Real-time updates

## Tech Stack

### Frontend

- React
- Material UI
- TailwindCSS
- React Router
- Axios

### Backend

- Node.js
- Express
- MongoDB
- Mongoose

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

### Installation

1. Clone the repository

```bash
git clone [your-repository-url]
cd travel-agency-website-revisited
```

2. Install Server Dependencies

```bash
cd server
npm install
```

3. Configure Server Environment

```bash
cd src
# Create .env file and add following variables:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/travel-agency
# NODE_ENV=development
```

4. Install Client Dependencies

```bash
cd ../client
npm install
```

### Running the Application

1. Start MongoDB Server

```bash
mongod
```

2. Start Backend Server

```bash
cd server
npm run dev
```

3. Start Frontend Development Server

```bash
cd client
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
travel-agency-website-revisited/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API integration
│   │   └── App.jsx       # Main application component
│   └── index.html        # Entry HTML file
│
├── server/                # Backend Node.js application
│ 
│   ├── config/       # Configuration files
│   ├── controllers/  # Route controllers
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── index.js      # Server entry point
│   └── package.json      # Backend dependencies
│
└── README.md             # Project documentation
```

## API Endpoints

### Packages

- GET `/api/packages` - Get all packages
- GET `/api/packages/:id` - Get package by ID
- POST `/api/packages` - Create new package
- PUT `/api/packages/:id` - Update package
- DELETE `/api/packages/:id` - Delete package

### Queries

- GET `/api/queries` - Get all queries
- POST `/api/queries` - Create new query
- PATCH `/api/queries/:id/status` - Update query status

## License

This project is licensed under the MIT License - see the LICENSE file for details.
