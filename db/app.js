const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Post = require('./postSchema');

const { renderPreviewHTML } = require('./renderPreviewHtml');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.DB_PORT;

// Enable CORS for the Replica Server using port 8001 and the front-end using port 3000

const allowedOrigins = [`http://localhost:${process.env.REPLICA_SERVER_PORT || 8001}`, `http://localhost:${process.env.CLIENT_PORT || 3000}`];

app.use(cors({
	origin: allowedOrigins,
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

app.post('/create', async (req, res) => {
	try {
		const newPost = new Post(req.body);
		const savedPost = await newPost.save();
		res.json(savedPost);
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

// get posts route and return the json response
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Example route to search for posts based on the query
app.get('/search/', async (req, res) => {
    try {
        const searchTerm = req.query.query;
        
        // Use a MongoDB query to find posts that match the search term
        const posts = await Post.find({
            $or: [
                // Add more fields as needed for searching
                { postId: { $regex: new RegExp(searchTerm, 'i') } },
                { tags: { $regex: new RegExp(searchTerm, 'i') } },
                { name: { $regex: new RegExp(searchTerm, 'i') } },
                { description: { $regex: new RegExp(searchTerm, 'i') } },
            ],
        });
        // Generate HTML for each post individually
        const postHtmlArray = posts.map(post => renderPreviewHTML(post));

        // Join the HTML strings together
        const allPostsHtml = postHtmlArray.join('');

        // Send the HTML response to the client
        res.status(200).send(`<div id="item-container" class="item-container">${allPostsHtml}</div>`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
 	 console.log(`Server is running at http://localhost:${PORT}`);
});
