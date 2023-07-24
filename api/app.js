const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;
const { Category } = require('./model');
// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));// In-memory data (replace this with database in a production environment)


// API endpoints
// app.get('/api/categories', (req, res) => {
//   res.json(categories);
// });
app.get('/api/categories', async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find();

    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    // Create a new category based on the request body
    const newCategory = new Category({
      name: req.body.name,
      fields: req.body.fields || [], // Assuming fields are sent as an array of objects
    });

    // Save the new category to the database
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/categories/:id', async (req, res) => {
  try {
    // Fetch the category by its ID from the database
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Return the fields of the category as the response
    res.json({ fields: category.fields });
  } catch (error) {
    console.error('Error fetching category fields:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// app.get('/api/categories/:id', (req, res) => {
//   const category = categories.find((c) => c.id === req.params.id);
//   if (!category) {
//     return res.status(404).json({ message: 'Category not found' });
//   }
//   res.json(category);
// });

// app.put('/api/categories/:id', (req, res) => {
//   const categoryIndex = categories.findIndex((c) => c.id === req.params.id);
//   if (categoryIndex === -1) {
//     return res.status(404).json({ message: 'Category not found' });
//   }
//   categories[categoryIndex] = { ...categories[categoryIndex], ...req.body };
//   res.json(categories[categoryIndex]);
// });

// app.delete('/api/categories/:id', (req, res) => {
//   categories = categories.filter((c) => c.id !== req.params.id);
//   res.json({ message: 'Category deleted successfully' });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
