import mongoose from "mongoose";
import shortid from "shortid";

const { model } = mongoose;

const ShortUrlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        default: shortid.generate()
    }
})

const Url = model("Url", ShortUrlSchema)

export default Url