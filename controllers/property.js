const PropertyCol = require("../models/property")


// ADD PROPERTY
const addProperty = async (req, res, next) => {

    try {
        const property = await PropertyCol.create(req.body)
        if(!property){
            res.status(400).json({
                status: "error",
                message: "Unable to post Property"
            })
            return
        }    
        res.status(201).json({
            status: "success",
            message: "Property has been posted"
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const searchSortProperties = async (req, res, next) =>{
    const {search, minPrice, location, maxPrice} = req.query
    let filter = {}
    if(search){
        filter.$or = [{title: {$regex: search, $options: "i"}}, {type: {$regex: search, $options: "i"}}, {location: {$regex: search, $options: "i"}}, {purpose: {$regex: search, $options: "i"}}]
    }
    if(location){
        filter.location ={$regex: location, $options: "i" }
    }
    if(minPrice){
        filter.price ={$gte: parseFloat(minPrice) }
    }
    if(maxPrice){
        filter.price ={$lte: parseFloat(maxPrice) }
    }
    try {
        const results = await PropertyCol.find(filter).populate("agent", "firstName email phone profilePicture isVerified")
        if(!results){
            res.status(404).json({
                status: "error",
                message:"No result"
            })
        }
        res.status(200).json({
            count: results.length,
            status: "success",
            results
        })
    } catch (error) {
        next(error)
        console.log(error)
    }
} 

const getSingleProperty = async (req, res) => {
    const {id} = req.params
    try {
        const property = await PropertyCol.findById(id)
        if(!property){
            res.status(404).json({
                status: "error",
                mesage: "Propery not found"
            })
        }

        res.status(200).json({
            status: "success",
            property
        })
    } catch (error) {
        console.lof(error)
    }
}

const getAllProperties = async (req, res) => {
   
    try {
        const properties = await PropertyCol.find().populate("agent", "firstName lastName email phone profilePicture isVerified ")
        res.status(200).json({
            success: true,
            count: properties.length,
            data: properties
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};


module.exports = {
    addProperty,
    getAllProperties,
    getSingleProperty,
    searchSortProperties
}