import React, { useState } from 'react';


const Frontpage = () => {
  const [showForm, setShowForm] = useState(false);
  const [fields, setFields] = useState([
    { fieldName: '', fieldType: '' },
  ]);

  const handleAddCategoryClick = () => {
    setShowForm(true);
  };

  const handleAddFieldClick = () => {
    setFields([...fields, { fieldName: '', fieldType: '' }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);
  };

  return (
    <div className="frontpage">

      <button onClick={handleAddCategoryClick}>Add category</button>
      {showForm && (
        <form>
          <div>
            <label>
              Category Name:
              <input
                type="text"
                name="categoryName"
                value={fields.categoryName}
                onChange={(e) => handleInputChange(0, e)}
              />
            </label>
          </div>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={fields.name}
                onChange={(e) => handleInputChange(0, e)}
              />
            </label>
          </div>
          <div>
            <label>
              Place:
              <input
                type="text"
                name="place"
                value={fields.place}
                onChange={(e) => handleInputChange(0, e)}
              />
            </label>
          </div>
          <div>
            <label>
              Pricing:
              <input
                type="text"
                name="pricing"
                value={fields.pricing}
                onChange={(e) => handleInputChange(0, e)}
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={fields.description}
                onChange={(e) => handleInputChange(0, e)}
              />
            </label>
          </div>
          <p className="add-more" onClick={handleAddFieldClick}>
            Add more fields
          </p>
          {fields.slice(1).map((field, index) => (
            <div key={index}>
              <label>
                Field Name:
                <input
                  type="text"
                  name="fieldName"
                  value={field.fieldName}
                  onChange={(e) => handleInputChange(index + 1, e)}
                />
              </label>
              <label>
                Field Type:
                <select
                  name="fieldType"
                  value={field.fieldType}
                  onChange={(e) => handleInputChange(index + 1, e)}
                >
                  <option value="">Select a field type</option>
                  <option value="Text">Text</option>
                  <option value="Number">Number</option>
                  <option value="File">File</option>
                  <option value="Boolean">Boolean</option>
                  <option value="Radio">Radio</option>
                  <option value="Checkbox">Checkbox</option>
                </select>
              </label>
            </div>
          ))}
        </form>
      )}
    </div>
  );
};

export default Frontpage;
