const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const errorHandler = require('./middlewares/errorHandler')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))


// ROUTES
const AuthRoutes = require("./routes/auth")

app.use('/api/v1/auth', AuthRoutes)

app.all("*", (req, res)=>{
    res.json({
        message: `${req.method} ${req.originalUrl} is not an endpoinit on this server.`
    })
})
app.use("*", errorHandler)

module.exports = app