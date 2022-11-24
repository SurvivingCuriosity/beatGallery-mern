require('dotenv').config({ path: './config.env' });
const cors = require('cors')
const express = require('express');
const app = express();
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

connectDB();
//test feature
app.use(cors())
app.use(express.json()); //middleware para obtener informacion del cuerpo en formato json
app.use('/api/user', require('./routes/user'))//user info CRUD & login
app.use('/api/beat', require('./routes/beat'))//beat CRUD

app.use(errorHandler) //errorHandler debe de ser el ultimo middleware

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); })

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged error; ${err}`);
    server.close(() => { process.exit(1) });
})