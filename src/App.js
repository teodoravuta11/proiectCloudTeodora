import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    console.log('Selected file:', file ? file.name : 'No file selected');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!imageFile) {
      alert('Please upload an image.');
      return; 
    }
    const formData = new FormData();
    formData.append('file', imageFile); 
    console.log('FormData content:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value); 
    }
    try {
      const response = await axios.post(
        'http://localhost:29870/api/fileupload/upload', 
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log('Response:', response.data);
      alert('Uploaded completed');
    } catch (error) {
      console.error('Error uploading image:', error);
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
      }
      alert('Uploaded uncompleted');
    }
  };

  return (
    <div className="App">
      <h1>Upload an Image</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image-upload">Image File:</label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imageFile && <p>Selected file: {imageFile.name}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
