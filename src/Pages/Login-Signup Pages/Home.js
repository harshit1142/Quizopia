
import React from 'react'
import './home.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function Home() {
  return (
    <>
      <header>
    {/* <nav>
       <div class="logo">
        <h1 class="">Logo Here</h1>
       </div>
       <div class ="menu">
        <a href="./index.html" class="nav-link">Home</a>
        <a href="#" class="nav-link">Home</a>
        <a href="../contact.html" class="nav-link">Contact</a>
        <a href="./about.html" class="nav-link">About</a>

       </div>
       <div class="hamburger">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
       </div>
    </nav> */}

       <main>
        <section>
            <h3>
                Welcome To Site !
            </h3>
            <h1>Quize Site <span></span></h1>
            {/* <p>"india once is not enough"</p> */}
            <Link to="/login" class="btnone">Login here</Link>
            <Link to="/signup" class="btntwo">Register here</Link>
            
        </section>
       </main>
    
    
</header>
    </> 
  )
}
