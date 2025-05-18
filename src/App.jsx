import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/Register.jsx'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Login from './components/Login.jsx'
import AddMember from './components/members.jsx'
import EditMember from './components/edit-members.jsx';
import DeleteMember from './components/delete-members.jsx';
import Sidebar from './components/sidebar.jsx';
import Media from './components/media.jsx'
import EditMedia from './components/edit-media.jsx'
function App() {
  return (
    <div>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/register'element={<Register /> } />
          <Route path='/login'element={<Login /> } />
          <Route path='/add-member'element={<AddMember /> } />
          <Route path='/edit-members/:id' element={<EditMember />} />
          <Route path='/delete-member/:id' element={<DeleteMember />} />
          <Route path='/getMedia' element={<Media />} />
          <Route path='/edit-media/:id' element={<EditMedia />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
