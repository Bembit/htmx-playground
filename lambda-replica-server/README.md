### Lambda Replica Server (lambda-replica-server)
**app.js**
- Entry point for the Express application.
- Listens for POST requests on /create.
- Forwards the POST request to the MongoDB Server at `http://localhost:8000/create`.
- Returns the response from the MongoDB Server.