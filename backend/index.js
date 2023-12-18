import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import bookRoute from "./routes/booksRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response)=> {
   console.log(request);
   return response.status('234').send('Welcome to my website'); 
});

app.use("/books", bookRoute);

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database");
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
});

