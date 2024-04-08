const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Room = require('./roomSchema');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/room-test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
	console.log('Connected to MongoDB');

	// Seed dummy data
	await seedData();

	console.log('Seed data inserted successfully');
	mongoose.connection.close();
});

async function seedData() {
  // Dummy data with UUIDs
	const dummyRooms = Array.from({ length: 5 }, () => ({
		// removed UUIDv4
		name: 'Test room from Seed',
		description: 'This is the description of the test room',
		// ideally region would be autopicked based on user location
		region: 'EU-West',
		maxParticipants: 8,
		teams: {
			team1: {
				name: generateRandomName(),
				users: {
					user1: generateUser(),
					user2: generateUser(),
				},
			},
			team2: {
				name: generateRandomName(),
				users: {
					user1: generateUser(),
					user2: generateUser(),
				},
			},
		},
  }));

 	 // Insert dummy lobbies into the database
  	await Room.insertMany(dummyRooms);
}

function generateRandomName() {
	const adjectives = ['Red', 'Blue', 'Green', 'Sunny', 'Mysterious', 'Dynamic'];
	const nouns = ['Tiger', 'Dragon', 'Phoenix', 'Elephant', 'Whale', 'Panda'];
	const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	const noun = nouns[Math.floor(Math.random() * nouns.length)];
	return `${adjective} ${noun}`;
}

// generate random user attributes
function generateUser() {
	return {
		name: generateRandomName(),
		userId: Math.floor(100000000 + Math.random() * 900000000), // Generate a random 9-digit number
		anotherId: `0x${Math.random().toString(16).substr(2, 10)}`, // Generate a random hex string
		projectState: Math.random() < 0.5, // Randomly assign true or false
		readyState: Math.random() < 0.5, // Randomly assign true or false for readyState
	};
}
