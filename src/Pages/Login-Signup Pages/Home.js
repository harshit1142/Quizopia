
import React from 'react'
import './home.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function Home() {
  return (
    <>
      <header>
       <main>
        <section>
            <h1 style={{color:"purple"}}>
                QUIZOPIA
            </h1>
            {/* <h2>Quize Site <span></span></h2> */}
            {/* <p>"india once is not enough"</p> */}
            <Link to="/login" className="btnone">Login here</Link>
            <Link to="/signup" className="btntwo">Register here</Link>
            
        </section>
       </main>
    
    
</header>
    </> 
  )
}
