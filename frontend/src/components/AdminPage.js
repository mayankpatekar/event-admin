import { useParams } from 'react-router';
import './style.css';
// import React, { useState, useEffect } from 'react';

// const AdminPage = () => {
//   const [forms, setForms] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const response = await fetch('http://localhost:5001/api/forms');
//             const text = await response.text();
//             console.log('Response Text:', text); // Log the response text
//             const data = JSON.parse(text); // Try parsing the response text as JSON
//             setForms(data);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//     };

//     fetchData();
//   }, []);

//   return (
//     console.log(forms),
//     <div>
//       <h2>Admin Page - Form Submissions</h2>
//       <ul>
//         {forms.map((form) => (
//           <li key={form._id}>
//             <p>Name: {form.name}</p>
//             <p>receiptNo: {form.receiptNo}</p>
//             {/* Display other form fields */}

//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminPage;



import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const { id } = useParams(); // Example usage of useParams
  const [forms, setForms] = useState([]);
console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://adminbackend-huuq.onrender.com/api/forms');
        const text = await response.text();
            console.log('Response Text:', text); // Log the response text
            const data = JSON.parse(text); // Try parsing the response text as JSON
            setForms(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
      window.alert('Form rejected');
      window.location.reload(false);
      console.log('Form rejected.');
    } catch (error) {
      console.error('Error rejecting form:', error);
    }
  };
  

  return (
    <div>
      <h2>Admin Page - Form submitted</h2>

      <table>
        <thead>
          <tr>
            <th>Sr. no</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Email</th>
            <th>Receipt Number</th>
            <th>Receipt Image</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form,index) => (
            <tr key={form._id}>
              <td>{index+1}</td>
              <td>{form.name}</td>
              <td>{form.rollNo}</td>
              <td>{form.classN}</td>
              <td>{form.email}</td>
              <td>{form.receiptNo}</td>
              <td><a href={form.receiptImageUrl}>clik to view</a></td>
              <td><button className="accept-button" onClick={() => handleAccept(form._id, form.email, form.receiptNo)}>Accept</button></td>
            <td><button className='reject-button' onClick={() => handleReject(form._id, form.email)}>Reject</button></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default AdminPage;
