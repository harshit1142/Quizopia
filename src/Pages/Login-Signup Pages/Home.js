
import React, { useEffect } from 'react'
import './home.css'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function Home() {
  const history=useHistory();
  useEffect(()=>{
    if(localStorage.getItem('user')){
      history.push(JSON.parse(localStorage.getItem('user')).role);
    }
  })
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
