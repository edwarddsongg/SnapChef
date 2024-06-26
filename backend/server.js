const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 4000
const cors = require('cors')


connectDB()

const app = express()

// allows request body to work
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

// has userRoutes start from /api/users and goalRoutes start from /api/goals
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/', require('./routes/uploadRoutes'))
app.use('/', require('./routes/previewRoutes'))
// serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile((path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

// overwrite default express error handler
app.use(errorHandler)
app.listen(port, () => console.log(`server started on port ${port}`))