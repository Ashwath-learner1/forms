const mongoose = require('mongoose');

// Connect to your MongoDB database (replace 'mongodb://localhost/dynamic-form' with your MongoDB connection string)
mongoose.connect('mongodb+srv://ashwath:59d0uJEhwBQ2sQf3@cluster0.9bhl8nt.mongodb.net/dynamicforms?retryWrites=true&w=majority&authMechanism=DEFAULT', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

// Define the Field schema
const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  fields: [fieldSchema], // Fields are stored as an array of field documents inside each category document
},{collection:"categories"});

// Middleware to populate fields when retrieving a category
categorySchema.pre('find', function (next) {
  this.populate('fields');
  next();
});

// Middleware to update field documents when a category is updated
categorySchema.pre('findOneAndUpdate', async function () {
  const categoryId = this.getQuery()['_id'];
  const update = this.getUpdate();
  if (update.fields) {
    // Assuming fields are sent as an array of field objects
    const updatedFields = update.fields.map((field) => {
      return {
        updateOne: {
          filter: { _id: field._id || mongoose.Types.ObjectId() },
          update: { $set: field },
          upsert: true,
        },
      };
    });
    await mongoose.model('Field').bulkWrite(updatedFields);
  }
});

// Create the models
const Category = mongoose.model('Category', categorySchema);
const Field = mongoose.model('Field', fieldSchema);

module.exports = {
  Category,
  Field,
};
