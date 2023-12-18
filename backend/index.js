import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of CORS(*)
// app.use(cors());
// Option 2: Allow Custom Origins
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)

// Display Page View for root directory of the backend
const displayPageView = `
<div style="height:100%; display:-webkit-box; display:-ms-flexbox; display:flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column; -webkit-box-align:center; -ms-flex-align:center; align-items:center; -webkit-box-pack:center; -ms-flex-pack:center; justify-content:center;">
    <h1 style="font-family:sans-serif; font-size: 48px; text-align:center;">Book Store App</h1>
    <h2 style="font-family:sans-serif; font-size: 30px; text-align:center;">(Backend)</h2>
</div>
`;

app.get('/', (request, response)=> {
   console.log(request);
   return response.status('234').send(displayPageView);
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

