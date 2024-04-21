import { BrowserRouter,Routes,Route } from 'react-router-dom'

import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import SingUp from './pages/SingUp'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Signin from './pages/SighIn'
import Header from './components/Header'

export default function App() {
  return (
    <BrowserRouter >
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin/>} />
        <Route path="/sign-up" element={<SingUp/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/Project" element={<Project/>} />
      </Routes>
    </BrowserRouter>
  )
}
