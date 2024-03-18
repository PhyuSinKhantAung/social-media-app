# Social Media App Backend and Frontend

Welcome to the repository for the Social Media App. This repository contains both the backend API and frontend components of the application. The backend is responsible for handling data storage, user authentication, and API endpoints, while the frontend provides the user interface for interacting with the application.

## Backend

### Features

- **User Authentication**: Enables users to sign up or log in using their email and password, with authentication handled via JWT tokens.
- **Post Management**: Provides functionality for users to create, like, unlike, comment on, and save posts.
- **Friend Management**: Allows users to add friends, unfriend other users, and block users.
- **Tagging**: Enables users to tag other users in their posts.
- **Image Upload**: Supports uploading multiple images or a single image to users' feeds.
- **Personalized Feeds**: Provides users with personalized feeds based on their interactions and connections.

### Tech Stack

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **MongoDB**: NoSQL database for storing application data.

### Getting Started

To get started with the backend API, follow these steps:

1. Navigate to the `backend` directory.
2. Clone this repository to your local machine.
3. Install dependencies using `npm install`.
4. Set up your environment variables in a `.env` file in the `backend` directory:
   ```
   NODE_ENV=development
   PORT=7000
   SESSION_SECRET=<Your Session Secret>
   JWT_SECRET=<Your JWT Secret>
   JWT_EXPIRES=<Your JWT expiration time>
   COOKIES_EXPIRES=<Your cookies expiration time>
   ACCOUNT_SID=<Your Twilio account SID>
   AUTH_TOKEN=<Your Twilio authentication token>
   SERVICE_ID=<Your Twilio service ID>
   CLOUDINARY_CLOUD_NAME=<Your Cloudinary cloud name>
   CLOUDINARY_API_KEY=<Your Cloudinary API key>
   CLOUDINARY_API_SECRET=<Your Cloudinary API secret>
   CLOUDINARY_SECURE_DELIVERY_URL=<Your Cloudinary secure delivery URL>
   EMAIL_USERNAME=<Your email username>
   EMAIL_PASSWORD=<Your email password>
   EMAIL_HOST=<Your email host>
   EMAIL_PORT=<Your email port>
   MONGODB_URI=<Your MongoDB connection URI>
   ```
5. Run the server using `npm start`.

## Frontend

### Features

- **User Interface**: Provides a user-friendly interface for interacting with the social media application.

### Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **axios**: Promise-based HTTP client for the browser and Node.js.
- **React Router**: Declarative routing for React.

### Getting Started

To get started with the frontend, follow these steps:

1. Navigate to the `frontend` directory.
2. Clone this repository to your local machine.
3. Install dependencies using `npm install`.
4. Run the development server using `npm start`.
