const express = require('express');
const connectDb = require('./config/db');
const app = express();

// db connection
connectDb();
// middleware
app.use(express.json({extended: false}));
// routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

