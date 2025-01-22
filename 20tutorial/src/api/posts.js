import axios from 'axios';

// To start server: "npx json-server -p 3500 -w data/db.json"

export default axios.create({
    // Would change this to actual URL when website is being hosted
    baseURL: 'http:///localhost:3500'
});