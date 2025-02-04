const blacklist = require("../models/blacklist")
const UserModel = require("../models/user")
const bcrypt = require("bcryptjs")
// const jwt = require('jsonwebtoken')


// SIGN UP
const signup = async (req, res, next) => {
    const { password  } = req.body
    try {
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        // GENERATE TOKEN 
        // const verificationToken = generateToken(16)
        // CREATE VERIFICATION EXPIRATION
        // const verificationExp =  Date.now() + 36000000
        

        const user = await UserModel.create({password: hashedPassword, ...req.body})
        if (!user) {
            res.status(400).json({
                status: 'error',
                message: 'Unable to signup'
            })
            return
        }

        // sendVerificationEmail(name, email, verificationToken)

        res.status(201).json({
            status: 'success',
            message: 'Sign up successful.',
            user
        })


    } catch (error) {
        console.log(error);
        next(error)
    }
}

const logout = async (req, res, next)=>{
    // const {token} = req.user
    try {
        // await blacklist.create(token)
        res.status(200).json({
            message: 'You logged out'
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    signup,
    logout
}