// src/SearchComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://adminbackend-huuq.onrender.com/api/search?searchTerm=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleAccept = async (formId, email, receiptNumber) => {
    try {
      const response = await fetch(`https://adminbackend-huuq.onrender.com/api/acceptForm/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ receiptNumber,email })
      });
  
      if (!response.ok) {
        throw new Error('Failed to accept form.');
      }
      window.alert('Form accepted');
      window.location.reload(false);
      console.log('Form accepted.');
    } catch (error) {
      console.error('Error accepting form:', error);
    }
  };
  
  const handleReject = async (formId, email) => {
    try {
      const response = await fetch(`https://adminbackend-huuq.onrender.com/api/rejectForm/${formId}`, {
        method: 'POST'
      });
  
      if (!response.ok) {
        throw new Error('Failed to reject form.');
      }
  
      console.log('Form rejected.');
    } catch (error) {
      console.error('Error rejecting form:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter email or receipt number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <table>
        <thead>
          <tr>
          <th>Name</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Email</th>
            <th>Receipt Number</th>
            <th>Receipt Image</th>
            <th></th>
            <th></th>
            <th>accepted</th>
            <th>Entered</th>
            {/* Add other headers based on your data structure */}
          </tr>
        </thead>
        <tbody>
          {searchResults.map((form, index) => (
            <tr key={index}>
              <td>{form.name}</td>
              <td>{form.rollNo}</td>
              <td>{form.classN}</td>
              <td>{form.email}</td>
              <td>{form.receiptNo}</td>
              <td><a href={form.receiptImageUrl}>clik to view</a></td>
              <td><button className="accept-button" onClick={() => handleAccept(form._id, form.email, form.receiptNo)}>Accept</button></td>
            <td><button className='reject-button' onClick={() => handleReject(form._id, form.email)}>Reject</button></td>
           <td>{form.accepted ? 'true':'false'}</td>
           <td>{form.Entered ? 'true' : 'false'}</td>

              {/* Add other cells based on your data structure */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchComponent;
