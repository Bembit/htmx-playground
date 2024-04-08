const mongoose = require('mongoose');
const uuidv4 = require('uuid').v4;

const roomSchema = new mongoose.Schema({
	roomId: { type: String, default: uuidv4, required: true, unique: true },
	// roomId: { type: String, required: true, unique: true, sparse: true },
	created: { type: Date, default: Date.now },
	name: { type: String, required: true },
	description: { type: String, required: true },
	region: { type: String, required: true },
	maxParticipants: { type: Number, required: true },

	teams: {
		team1: {
			name: { type: String, required: true, default: 'Team 1' },
			users: {
				user1: {
					name: { type: String, required: true, default: 'User 1' },
					userId: { type: Number, required: true, default: 123456789 },
					anotherId: { type: String, required: true, default: '123string3456789' },
					projectState: { type: Boolean, required: true, default: false },
					readyState: { type: Boolean, required: true, default: false },
				},
				user2: {
					name: { type: String, required: true, default: 'User 2' },
					userId: { type: Number, required: true, default: 123456789 },
					anotherId: { type: String, required: true, default: '123string3456789' },
					projectState: { type: Boolean, required: true, default: false },
					readyState: { type: Boolean, required:true, default: false },
				},
			},
		},
		team2: {
			name: { type: String, required: true, default: 'Team 2' },
			users: {
				user1: {
					name: { type: String, required: true, default: 'User 1' },
					userId: { type: Number, required: true, default: 123456789 },
					anotherId: { type: String, required: true, default: '123string3456789' },
					projectState: { type: Boolean, required: true, default: false },
					readyState: { type: Boolean, required: true, default: false },
				},
				user2: {
					name: { type: String, required: true, default: 'User 2' },
					userId: { type: Number, required: true, default: 123456789 },
					anotherId: { type: String, required: true, default: '123string3456789' },
					projectState: { type: Boolean, required: true, default: false },
					readyState: { type: Boolean, required:true, default: false },
				},
			},
		},
	},
});

// Create the Room model
const Room = mongoose.model('Room', roomSchema);

// Export the model for use in other files
module.exports = Room;
