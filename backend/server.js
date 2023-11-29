import express from 'express';
import { connect } from 'mongoose';
import pkg from 'body-parser';
const { json } = pkg;
import cors from 'cors';



const app = express();
app.use(cors())
const port = process.env.PORT || 5001;

// MongoDB connection
connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



// Middleware
app.use(json());








// Routes
import formRoutes from './routes/formRoutes.js';
import Form from './models/Form.js';
app.use('/api', formRoutes);

// import acceptRoutes from './routes/acceptRoutes.js';
// app.use('/api/acceptForm/:id',acceptRoutes);

// import regectRoutes from './routes/regectRoutes.js';
// app.use('/api/regectForm/:id',regectRoutes);

// API endpoint for searching by email or receipt number
app.get('/api/search', async (req, res) => {
  const searchTerm = req.query.searchTerm;
  try {
    const results = await Form.find({
      $or: [{ email: searchTerm }, { receiptNo: searchTerm }]
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Inside your Express.js route for fetching data
app.get('/api/data', async (req, res) => {
  try {
    const { accepted, rejected, Entered } = req.query;

    // Define the query based on the filter parameters
    const query = {};

    if (accepted === 'true') {
      query.accepted = true;
    }

    if (rejected === 'true') {
      query.rejected = true;
    }

    if (Entered === 'true') {
      query.Entered = true;
    }

    const data = await Form.find(query);

    return res.json(data);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/count',async (req, res) => {
  try {
    const count = await Form.countDocuments();
    const rejected = await Form.countDocuments({ rejected: true });
    const accepted = await Form.countDocuments({ accepted: true });
    const Entered = await Form.countDocuments({ Entered: true });
    // console.log(count);
    return res.json({ count, rejected, accepted, Entered });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }


});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
