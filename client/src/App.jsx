import { BrowserRouter,Routes,Route } from 'react-router-dom'

import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import SingUp from './pages/SingUp'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Signin from './pages/SighIn'
import Header from './components/Header'
import Footer from './components/Footer'
import Privateroute from './components/Privateroute'
import OnlyAdminPrivateroute from './components/OnlyAdminPrivateroute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/Update'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'
import Search from './pages/Search'
import Add from './pages/CreateAdd'
import CreateAdd from './pages/CreateAdd'
import UpdateAdd from './pages/UpdateAdd'




export default function App() {
  return (
    <BrowserRouter >
    <ScrollToTop />
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin/>} />
        <Route path="/sign-up" element={<SingUp/>} />
        <Route path="/search" element={<Search/>} />
        <Route element={<Privateroute />}>
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
        <Route element={<OnlyAdminPrivateroute />}>
          <Route path="/create-post" element={<CreatePost/>} />
          <Route path="/update-post/:postId" element={<UpdatePost/>} />
        </Route>
        <Route element={<OnlyAdminPrivateroute />}>
          <Route path="/create-add" element={<CreateAdd/>} />
          <Route path="/update-add/:addId" element={<UpdateAdd/>} />
        </Route>
        <Route path="/project" element={<Project/>} />
        <Route path="/post/:postSlug" element={<PostPage/>} />
      </Routes>
    <Footer />
    </BrowserRouter>
  )
}
