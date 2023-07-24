import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DynamicForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryFields, setCategoryFields] = useState([]);
  const [formData, setFormData] = useState({});

  // Fetch categories when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Fetch fields when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`http://localhost:5000/api/categories/${selectedCategory}`)
        .then((response) => {
          setCategoryFields(response.data.fields);
          setFormData({}); // Clear existing form data when category changes
        })
        .catch((error) => {
          console.error('Error fetching category fields:', error);
        });
    } else {
      setCategoryFields([]);
      setFormData({}); // Clear form data when no category is selected
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const toggleCheckboxValue = (fieldName, value, formData) => {
    const currentData = formData[fieldName] || [];
    const updatedData = currentData.includes(value)
      ? currentData.filter((item) => item !== value) // Remove value if it exists
      : [...currentData, value]; // Add value if it doesn't exist
    return {
      ...formData,
      [fieldName]: updatedData,
    };
  };
  
  
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
  
    // Handle checkboxes as an array
    if (type === 'checkbox') {
      setFormData((prevFormData) =>
      toggleCheckboxValue(name, value, prevFormData)
    );
    } else if (type === 'radio') {
      // For radio buttons, we store the value of the selected option
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      // For text and number fields, we store the value directly
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  
  const renderInputField = (field) => {
    const { name, type, options } = field;

    switch (type) {
      case 'checkbox':
        return (
          <>
            {options.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="checkbox"
                    name={name}
                    value={option}
                    checked={formData[name]?.includes(option) || false}
                    onChange={handleInputChange}
                  />
                  {option}
                </label>
              </div>
            ))}
          </>
        );
      case 'radio':
        return (
          <>
            {options.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={name}
                    value={option}
                    checked={formData[name] === option}
                    onChange={handleInputChange}
                  />
                  {option}
                </label>
              </div>
            ))}
          </>
        );
      default:
        return (
          <input
            type={type}
            name={name}
            value={formData[name] || ''}
            onChange={handleInputChange}
          />
        );
    }
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
              {renderInputField(field)}
            </div>
          ))}
        </form>
      )}

      <div>
        <h3>Form Data:</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DynamicForm;
