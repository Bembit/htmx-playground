### Lambda Replica Server (lambda-replica-server)
**app.js**
- Entry point for the Express application.
- Listens for POST requests on /create-room.
- Forwards the POST request to the MongoDB Server at `http://localhost:8000/create-room`.
- Returns the response from the MongoDB Server.