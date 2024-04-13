const mongoose = require('mongoose');
const uuidv4 = require('uuid').v4;

const postSchema = new mongoose.Schema({
	postId: { type: String, default: uuidv4, required: true, unique: true },
	created: { type: Date, default: Date.now },
	name: { type: String, required: true },
	description: { type: String, required: true },
	tags: { type: String, required: true },
});

const Post = mongoose.model('Post', postSchema);

// Export the model for use in other files
module.exports = Post;
