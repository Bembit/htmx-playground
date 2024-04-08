# Room Management System

## Overview

This project is a simple Room Management System implemented using Node.js, Express, and MongoDB. It provides basic create and read operations.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the server using `node app.js`.
4. Optionally, seed the database with dummy data using `node seed.js`.
5. Optionally, clean up the seed from database using `node seedDelete.js`.

## Files

### `app.js`

- Entry point for the Express application.
- Defines routes for creating, retrieving, updating, and deleting lobbies.
- Uses the `roomSchema.js` schema for interacting with MongoDB.
- Utilizes the `cors` middleware to handle Cross-Origin Resource Sharing.
- Connects to a MongoDB database using the `mongoose` library.
- Parses JSON in incoming requests using the `express.json()` middleware.

### `roomSchema.js`

- Defines the MongoDB schema for the room document.
- Includes fields for room ID, creation timestamp, details, team information, and user details.
- Uses Mongoose to define and create the room model.

### `seed.js`

- Populates the MongoDB database with dummy data for testing.
- Uses the `uuid` module to generate unique identifiers for each room.
- Connects to the MongoDB database using `mongoose`.
- Includes a function `seedData()` that inserts dummy lobbies into the database.
- Defines random user `names`, `userId`, `anotherId`, and boolean `projectState` for each room using helper functions.

### `seedDelete.js`

- Deletes all room data seeded by the `seed.js` script.
- Connects to the MongoDB database using `mongoose`.
- Uses the `deleteMany` method to remove all documents from the `Room` collection.