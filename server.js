// listen for server
const app = require("./app")
const connectToDb = require('./config/connectToDb')
const dotEnv = require("dotenv")
const PORT = process.env.PORT || 4001

dotEnv.config()

const connected = connectToDb()
if(connected){
    app.listen(PORT, ()=>{
        console.log(`Listening for server on port ${PORT}`)
    })
}



// conect to database