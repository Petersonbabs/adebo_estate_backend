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

const getAllProperties = async (req, res) => {
    const {minPrice, location} = req.query
    try {
        const properties = await PropertyCol.find({price: {$gte: Number(minPrice)}}).populate("agent", "firstName lastName email phone profilePicture isVerified ")
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
    getAllProperties
}