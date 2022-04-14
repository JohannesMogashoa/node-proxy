const express = require("express")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
require("dotenv").config()

const port = process.env.PORT || 5000

const app = express()

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)
app.set('trust proxy', 1)

// app.use(cors)

app.use('/api', require("./routes"))

app.listen(port, () => console.log(`Server runnning on port ${port}`))