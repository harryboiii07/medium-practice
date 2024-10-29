
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './routes/Signup'
import { Signin } from './routes/Signin'
import { Blog } from './routes/Blog'
import { Blogs } from './routes/Blogs'
import { Publish } from './routes/Publish'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element = {<Signup />} />
          <Route path='/signin' element = {<Signin />} />
          <Route path='/blog/:id' element = {<Blog />} />
          <Route path='/blogs' element = {<Blogs />} />
          <Route path='/publish' element = {<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
