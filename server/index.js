import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { mongodbURL } from "./config.js";
import cors from 'cors';
import responseRoutes from './responseRoutes.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const corsOptions={
  origin:'https://home-land-2z2k.vercel.app',
  optionSuccessfulStatus:200,
}
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

app.use("/property", responseRoutes);
app.use("/signup", responseRoutes);

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on Port: http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));
