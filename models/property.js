const mongoose = require("mongoose");
const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    images: {
        type: [String] // Arrays of image urls
    },
    type: {
        type: String,
        required: true,
        enum: ["apartment", "house", "land", "office", "shop"]
    },
    purpose: {
        type: String,
        required: true,
        enum: ["rent", "sale", "shorlet"]
    },
    rooms: {
        type: Number,
        required: ()=> this.type !== "land"
    },
    features: {
        type: [String], // Example: swimming pool, 24/7 electricity
    },
    status: {
        type: String,
        enum: ["pending", "available", "sold"],
        default: "available"
    },
    agent: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }
    
}, { timestamps: true } )

const PropertyModel = mongoose.model("properties", PropertySchema)

module.exports = PropertyModel