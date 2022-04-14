const express = require("express")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
require("dotenv").config()

const port = process.env.PORT || 5000
const app = express()

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)
app.set('trust proxy', 1)

app.use(express.static('public'))

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOptions))

app.use('/api', require("./routes"))

app.listen(port, () => console.log(`Server runnning on port ${port}`))