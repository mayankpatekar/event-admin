import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route,Routes, Link, Outlet} from 'react-router-dom';
// import {Switch }from 'react-router';
import AdminPage from './components/AdminPage';
import SearchPage from './components/SearchPage';
import ViewData from './components/ViewData';

function App() {
  return (
    <div className="App">
      <>
      
      
    <Outlet />
      </>
      <Router>
      
      <nav>
      <ul>
        <li>
          <Link to="">View Current</Link>
        </li>
        <li>
          <Link to="/searchpage">Search</Link>
        </li>
        <li>
          <Link to="/viewdata">View Data</Link>
        </li>
      </ul>
    </nav>
    <Routes>

        
        <Route path="" exact element={<AdminPage />} />

        <Route path="/searchpage" element={<SearchPage/>} />
        <Route path="/viewdata" element={<ViewData/>} />
    </Routes>
        
      
    </Router>
      {/* <AdminPage /> */}
      
    </div>
  );
}

export default App;
