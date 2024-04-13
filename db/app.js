const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Post = require('./postSchema');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.DB_PORT;

// Enable CORS for the Replica Server using port 8001
app.use(cors({
	origin: `http://localhost:${process.env.REPLICA_SERVER_PORT || 8001}`,
	methods: 'POST',
  }));

// MongoDB connection - local-db collection name: Post-test
mongoose.connect('mongodb://localhost:27017/htmx-features-test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  	console.log('Connected to MongoDB');
});

// Middleware to parse JSON in requests
app.use(express.json());

// Example route to create a new Post
// maybe I can get rid of json entirely
// or leave it its not the point now the key is that the replica should send pure html only which it does
app.post('/create', async (req, res) => {
	try {
		const newPost = new Post(req.body);
		const savedPost = await newPost.save();
		res.json(savedPost);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Example route to get all posts
app.get('/posts', async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Example route to get a specific Post by ID
app.get('/posts/:id', async (req, res) => {
	try {
		const posts = await Post.findById(req.params.id);
		res.json(posts);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Example route to search for posts based on the query
app.get('/posts/', async (req, res) => {
    try {
        const searchTerm = req.query.query;
        
        // Use a MongoDB query to find posts that match the search term
        const posts = await Post.find({
            $or: [
				// might add exact match for postId
				{ postId: { $regex: new RegExp(searchTerm, 'i') } },
				{ tags: { $regex: new RegExp(searchTerm, 'i') } },
                { name: { $regex: new RegExp(searchTerm, 'i') } },
                { description: { $regex: new RegExp(searchTerm, 'i') } },
                // Add more fields as needed for searching
		],
	});

	res.json(posts);
		
    } catch (error) {
		console.log("fucked it on DB side")
        res.status(500).json({ error: error.message });
    }
});

// might add delete and edit routes and search by id
// seed more data to try htmx pagination
// test session headers in htmx

app.listen(PORT, () => {
 	 console.log(`Server is running at http://localhost:${PORT}`);
});
