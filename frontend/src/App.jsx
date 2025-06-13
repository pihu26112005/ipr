import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditUser from './pages/EditUser';
import CreateUser from './pages/CreateUser';
import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';
import AllUsers from './pages/AllUsers';
import { SharedProvider } from './context/sharedContext';

const App = () => {
  return (
    <SharedProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateUser />} />
            <Route path="/edit/:id" element={<EditUser />} />
            <Route path="alluser" element={<AllUsers />} />
          </Routes>
        </div>
      </Router>
    </SharedProvider>
  )
}

export default App