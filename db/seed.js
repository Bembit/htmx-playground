const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Post = require('./postSchema');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/htmx-features-test', { useNewUrlParser: true, useUnifiedTopology: true });

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
	const dummyPosts = Array.from({ length: 5 }, () => ({
		// removed UUIDv4
		name: 'Test post from Seed',
		description: 'This is the description of the test post',
		region: 'EU-West',
  }));
  	await Post.insertMany(dummyPosts);
}