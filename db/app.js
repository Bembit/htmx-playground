const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Room = require('./roomSchema');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.DB_PORT;

// Enable CORS for the Replica Server using port 8001
app.use(cors({
	origin: `http://localhost:${process.env.REPLICA_SERVER_PORT || 8001}`,
	methods: 'POST',
  }));

// MongoDB connection - local-db collection name: room-test
mongoose.connect('mongodb://localhost:27017/room-test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  	console.log('Connected to MongoDB');
});

// Middleware to parse JSON in requests
app.use(express.json());

// Example route to create a new room
app.post('/create-room', async (req, res) => {
	try {
		const newRoom = new Room(req.body);
		const savedRoom = await newRoom.save();
		res.json(savedRoom);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Example route to get all rooms
app.get('/rooms', async (req, res) => {
	try {
		const rooms = await Room.find();
		res.json(rooms);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.listen(PORT, () => {
 	 console.log(`Server is running at http://localhost:${PORT}`);
});
