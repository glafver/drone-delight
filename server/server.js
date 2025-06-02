require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require('./routes/userRoutes');
const connectDB = require("./config/dBconnection");
const morgan = require('morgan')

connectDB();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan('dev'));

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/users', userRoutes);

app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
