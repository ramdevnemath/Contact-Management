// Importing libraries and modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import contactSchema from './model/contactSchema.js'
import connectDB from './config/db.js'

// Load environment variables
dotenv.config();

// Define the port
const port = process.env.PORT || 4000;

// Connect to the MongoDB database
connectDB();

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Create an Express application
const app = express();

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fetching data
app.get('/', (req, res) => {
    contactSchema.find({})
    .then(contacts => res.json(contacts))
    .catch(error => res.json(error))
});

// find contact by id
app.get('/getContact/:id', (req, res) => {
  const id = req.params.id
  contactSchema.findById({_id:id})
  .then(contact => res.json(contact))
  .catch(error => res.json(error))
})

// Creating contact
app.post('/createContact', (req, res) => {
  
  contactSchema.create(req.body)
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      if (error.code === 11000 && error.keyPattern.email) {
        // Duplicate email error
        return res.status(409).json({ error: 'Duplicate_Email' });
      } else if (error.code === 11000 && error.keyPattern.phone) {
        // Duplicate phone number error
        return res.status(409).json({ error: 'Duplicate_Phone' });
      } else {
        // Handle other errors
        return res.status(500).json({ error: 'Internal server error.' });
      }
    })
});

// Updating contact
app.put('/updateContact/:id', (req, res) => {
  const id = req.params.id;
  contactSchema.findByIdAndUpdate({_id:id}, {
    firstName: req.body.firstName, 
    lastName: req.body.lastName, 
    email: req.body.email, 
    phone: req.body.phone, 
    dob: req.body.dob
  })
  .then(contact => res.json(contact))
  .catch(error => {
    if (error.code === 11000 && error.keyPattern.email) {
      // Duplicate email error
      return res.status(409).json({ error: 'Duplicate_Email' });
    } else if (error.code === 11000 && error.keyPattern.phone) {
      // Duplicate phone number error
      return res.status(409).json({ error: 'Duplicate_Phone' });
    } else {
      // Handle other errors
      return res.status(500).json({ error: 'Internal server error.' });
    }
  })
});

app.delete('/deleteContact/:id', (req, res) => {
  const id = req.params.id;
  contactSchema.findByIdAndDelete({_id: id})
  .then(res => res.json(res))
  .catch(err => res.json(err))
})

// Start the Express server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});