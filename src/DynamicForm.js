import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DynamicForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryFields, setCategoryFields] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then((response) => {
        setCategories(response.data);
        console.log("data fetched")
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios.get(`http://localhost:5000/api/categories/${selectedCategory}`)
        .then((response) => {
          setCategoryFields(response.data.fields);
        })
        .catch((error) => {
          console.error('Error fetching category fields:', error);
        });
    } else {
      setCategoryFields([]);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <h2>Dynamic Form</h2>
      <div>
        <label htmlFor="category">Select Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {categoryFields.length > 0 && (
        <form>
          {categoryFields.map((field) => (
            <div key={field._id}>
              <label htmlFor={field.name}>{field.name}:</label>
              <input type={field.type} id={field.name} name={field.name} />
            </div>
          ))}
        </form>
      )}
    </div>
  );
};

export default DynamicForm;
