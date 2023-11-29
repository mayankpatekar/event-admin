// About.js
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import SearchComponent from './SearchComponent';

const SearchPage = () => {
  // const navigate = useNavigate(); // Example usage of useNavigate

//   const handleClick = () => {
//     navigate('/'); // Navigate to the home page
//   };

  return (
    <div>
      SearchPage Page
      {/* <button onClick={handleClick}>Go Home</button> */}
      <SearchComponent />
    </div>
  );
};

export default SearchPage;
