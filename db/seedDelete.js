const mongoose = require('mongoose');
const Room = require('./roomSchema');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/room-test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  // Delete all rooms
  await deleteAllData();

  console.log('Cleanup completed successfully');
  mongoose.connection.close();
});

async function deleteAllData() {
  try {
    await Room.deleteMany({});
    console.log('All data deleted');
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}
