import express from 'express';
import { errorHandler } from './middlewares/ErrorHandler.js';
import './db/server.js'; //importing the db connection file
import cors from 'cors'; // cors
import routerToDO from './routes/routerToDO.js';
import cookieParser from 'cookie-parser'; // cookie-parser
import listRouter from './routes/routerToDolist.js';

const app = express();
const  PORT=8000;

app.get('/', (req, res) => {    
    res.send('Hello World');
});

//express.json
app.use(express.json());

// cookie-parser
app.use(cookieParser()); 

app.use(cors({ origin:['https://todolisthassan.netlify.app','http://localhost:5173','https://todoliste.onrender.com'] ,
    // methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true }));

//routes
app.use('/user',routerToDO);
app.use('/list',listRouter)

//error handler
app.use(errorHandler);
app.listen(PORT, () => {console.log(`Server is running on port http://localhost:${PORT}`)});