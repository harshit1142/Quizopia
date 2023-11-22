
import React from 'react'
import './home.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function Home() {
  return (
    <>
      <header>
    {/* <nav>
       <div className="logo">
        <h1 className="">Logo Here</h1>
       </div>
       <div className ="menu">
        <a href="./index.html" className="nav-link">Home</a>
        <a href="#" className="nav-link">Home</a>
        <a href="../contact.html" className="nav-link">Contact</a>
        <a href="./about.html" className="nav-link">About</a>

       </div>
       <div className="hamburger">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
       </div>
    </nav> */}

       <main>
        <section>
            <h3>
                Welcome To Site !
            </h3>
            <h1>Quize Site <span></span></h1>
            {/* <p>"india once is not enough"</p> */}
            <Link to="/login" className="btnone">Login here</Link>
            <Link to="/signup" className="btntwo">Register here</Link>
            
        </section>
       </main>
    
    
</header>
    </> 
  )
}
