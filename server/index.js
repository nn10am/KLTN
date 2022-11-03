const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dbConn = require('./config/db.config')
const { v4: uuidv4 } = require('uuid')

// Create express app
const app = express()
app.use(cors())

// Setup the server port
const port = 3001

// Parse request data content type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Parse request data content type application/json
app.use(bodyParser.json())

// Listen to the port
app.listen(port, () => {
  console.log('Express Server is running on port', port)
})

app.get('/', (rep, res) => {
  res.send('Test API')
})

app.post('/login', async (req, ress) => {
  const { userName, password } = req.body
  try {
    await dbConn.query(
      `SELECT * FROM users WHERE userName = '${userName}' AND password = '${password}'`,
      (err, res) => {
        if (err) {
          console.log('Error Login', err)
          ress.sendStatus(400).json({ error: err, message: 'SQL error' })
        } else {
          console.log('res', res)
          ress.json({
            data: res,
            success: !!res?.length,
            message: res?.length ? 'Login success' : 'Invalid username or password',
          })
        }
      }
    )
  } catch (err) {
    ress.sendStatus(400).json(err)
  }
})

app.post('/register', async (req, ress) => {
  const { fristName, lastName, email, userName, password } = req.body
  try {
    await dbConn.query(
      `INSERT INTO users (id, fristName, lastName, email, userName, password)
        VALUES ('${uuidv4()}', '${fristName}', '${lastName}', '${email}', '${userName}', '${password}');`,
      (err, res) => {
        if (err) {
          console.log('Error Login', err)
          ress.sendStatus(400).json({ error: err, message: 'SQL error' })
        } else {
          console.log('res', res)
          ress.json({
            data: {
              fristName,
              lastName,
              email,
              userName,
            },
            success: !!res?.affectedRows,
            message: res?.affectedRows ? 'Register success' : 'Register fail',
          })
        }
      }
    )
  } catch (err) {
    ress.sendStatus(400).json(err)
  }
})
