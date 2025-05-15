import express, {json} from "express";
import mongoose from "mongoose";
import Url from "./model/Url.js";
import dotenv from "dotenv";
import cors from "cors";
import { createShortUrl, redirectToFullUrl } from "./handler/shortlink.js";

dotenv.config();

const app = express()

console.log('MONGO_URI:', process.env.MONGO_URI);


mongoose.connect(process.env.MONGO_URI, {
    dbName : "ShortUrlDB",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err.message);
  });

app.use(json());
app.use(cors())
  
app.get("/:shortUrl", redirectToFullUrl)  

app.post("/create", createShortUrl )

app.get("/", (req, res) => {
    res.send("Habla dev")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor Funcionando")
})