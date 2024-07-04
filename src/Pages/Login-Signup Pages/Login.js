
import React, { useEffect, useState } from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {  useDispatch } from 'react-redux';
import { setUser } from '../../Redux/UserRedux';

export default function Login() {
    const dispatch=useDispatch();
   const history=useHistory();
    const [data,setData]=useState({
        role:"",
        email:"",
        password:""
    })

    function handleChange(e){
        setData({...data,[e.target.name]:e.target.value});
    }
   
    useEffect(() => {
        if (localStorage.getItem('user')) {
            history.push(JSON.parse(localStorage.getItem('user')).role);
        }
    })

    async function handelSubmit(event){
        event.preventDefault();
        try {
            const response=await fetch("http://localhost:4000/login",{
                method:"POST",
                headers: {
                            "content-type": "application/json",
                        },
                        withCredentials:true,
                        body: JSON.stringify({
                            role:data.role,
                            email:data.email,
                            password:data.password,
                        })
                    })
                    const res= await response.json();
                    if(res.status===200)
                    {
                        alert("Logined Successfully!!");
                        localStorage.setItem('user',res.data);
                        dispatch(setUser(res.data));
                        if(data.role==="student") history.push("/student");
                        else if(data.role==="teacher") history.push("/teacher");
                        if(data.role==="admin") history.push("/admin");
                       
                    }else{
                        alert(res.meassage);
                    }
            
        } catch (error) {
            alert(error)
        }    
    }

  return (
    <>
      <div className="wrapper">
        <div className="container-login">
            <h2 className="login-heading">Login</h2>
           <Link to="/"><span className="icon close-icon" id="cross"><ion-icon name="close"></ion-icon></span> </Link>

            <div className="formbox">
                <form action="#" className="formcontent">
                    <div id="item0" className="item">
                        {/* <!-- <label htmlFor="role">Role:</label> --> */}
                        
                        <select name="role" id="selectrole" className="inputbar" value={data.role} onChange={handleChange} required>
                            <option value="selectrl">Select Role</option>
                            <option value="admin" >Admin</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>

                    </div>

                    <div id="item2 item2forlogin" className="item">
                        {/* <!-- <label htmlFor="email">Email:</label> --> */}
                              <input type="email" placeholder="Email" id="email" className="inputbar" name='email' autocomplete="off" value={data.email} onChange={handleChange} required />
                        <span className="icon"><ion-icon name="mail"></ion-icon></span>
                    </div>
                    <div id="item3" className="item">
                        {/* <!-- <label htmlFor="name">Password:</label> --> */}
                        <input type="password" placeholder="Password" id="password" className="inputbar" name='password' value={data.password} onChange={handleChange} required />
                        <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                    </div>
                    <div id="item12" className="item">
                        <p id="message"></p>
                    </div>
                    <div id="item8" className="item" required>
                        <input type="checkbox" id="check-box1" /><label htmlFor="" id="terms">Remember Me</label>
                    </div>

                    <div id="item9" className="item">
                        <button className="btn-black" onClick={handelSubmit}>Login</button>
                    </div>

                </form>
            </div>

        </div>
    </div>
    </>
  )
}
