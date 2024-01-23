import React from 'react'
import "./styles.css"
import { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom/cjs/react-router-dom';



export default function Signup() {
    const history=useHistory();
    const [role,setRole]=useState("student");
    const [student,setStudent]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        role:"Student",
        branch:"",
        graduationYear:Number
    })
    const [teacher,setTeacher]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        role:"Teacher",
        subject:""
    })
    const [admin,setAdmin]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        role:"Admin"
    })
    
    function studentChange(e){
       setStudent({...student,[ e.target.name]:e.target.value});
    }
    function teacherChange(e){
       setTeacher({...teacher,[ e.target.name]:e.target.value});
    }
    function adminChange(e){
       setAdmin({...admin,[ e.target.name]:e.target.value});
    }


   var correct=true;
    async function check(event){
        event.preventDefault();
        correct=true;
        checkName();
        checkCheckbox();
        checkPassword();
        checkPasswordLength();
        if(correct){
            if(role==="student")
            {
                
               const response= await fetch("http://localhost:4000/student",{
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        name:student.name,
                        email:student.email,
                        password:student.password,
                        confirmPassword:student.confirmPassword,
                        branch:student.branch,
                        graduationYear:student.graduationYear
                    })
                })
                const res= await response.json();
                if(res.status===201)
                {
                    alert("Registered Successfully!!");
                    history.push("/login");
                    
                }else{
                    alert("Error Occured");
                }
            }
            else if(role==="teacher")
            {
                
               const response= await fetch("http://localhost:4000/teacher",{
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        name:teacher.name,
                        email:teacher.email,
                        password:teacher.password,
                        confirmPassword:teacher.confirmPassword,
                        subject:teacher.subject
                    })
                })
                const res= await response.json();
                if(res.status===201)
                {
                    alert("Registered Successfully!!");
                     history.push("/login");
                }else{
                    alert("Error Occured");
                }
            }else{
                const response= await fetch("http://localhost:4000/admin",{
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        name:admin.name,
                        email:admin.email,
                        password:admin.password,
                        confirmPassword:admin.confirmPassword
                    })
                })
                const res= await response.json();
                if(res.status===201)
                {
                    alert("Registered Successfully!!");
                     history.push("/login");
                }else{
                    alert("Error Occured");
                }
            }
        }
    }
    
        function checkPassword(){
        let password = document.getElementById("password").value;
        let cnfrmPassword = document.getElementById("cnfrm-password").value;
        // console.log(" Password:", password,'\n',"Confirm Password:",cnfrmPassword);
        let message = document.getElementById("message");

        if(password.length !== 0){
            if(password === cnfrmPassword){
                message.textContent = "Passwords match";
                message.style.color = "green";
            }
            if(password !== cnfrmPassword){
                message.textContent = "Passwords don't match";
                message.style.color = "red";
                correct=false;
            }
        }
        else{
            alert("Password can't be empty!");
            message.textContent = "";
            correct=false;
        }
    }
    // const tabss=document.querySelectorAll('.tabs');
    // const all_content=document.querySelectorAll('.content');
    // tabss.forEach((tab,index)=>{
    //     tab.addEventListener('click',()=>{
    //         tabss.forEach(tab=>{tab.classNameList.remove('active')})
    //         tab.classNameList.add('active');
    //     })
    // })
    function checkName()
    {
        let name=document.getElementById("name").value;
        // console.log(" Name:", name);
        let message = document.getElementById("messagename");
        if(name.length!==0)
        {
            if(typeof(name)!="string")
        {
            message.textContent = "enter a valid name";
            message.style.color = "red";  
            correct=false;
        }
            else
        {
            message.textContent = "Name entered is valid";
            message.style.color = "green";  
        }
        }



    }
    function checkPasswordLength()
    {
        let len=document.getElementById("password").value;
        // console.log(" Passwordlength:", passwordlength);
        let message = document.getElementById("messagelength");
        if(len.length!==0)
        {
            if(len.length<8)
            {
                message.textContent = "Password should be atleast 8 characters long";
                message.style.color = "red";  
                correct=false;
            }
        }
    }
    function checkCheckbox()
    {
        let check=document.getElementById("check-box1");
        // console.log(" Checkbox:", checkbox);
    if(check.checked===false)
    {
        alert("agree to conditons to proceed further!");
       correct=false;
    }
    }

  return (
    <>
       <div className="wrapper">
        <div className="container">
            <h2 className="register-heading">Register</h2>
           <Link to="/"> <span className=" icon close-icon" id="cross" ><ion-icon name="close"></ion-icon></span></Link>
            <div className="choosebar">
                <button className="tabs "  id="admin" onClick={()=>setRole("admin")} >Admin</button>
                <button className="tabs " id="student" onClick={()=>setRole("student")}>Student</button>
                <button className="tabs " id="teacher" onClick={()=>setRole("teacher")}>Teacher</button>

            </div>
         {role==="student"?
              <div className="formbox">
                <form  className="formcontent">
                    <div id="item0" className="item">
                        {/* <!-- <label htmlFor="role">Role:</label> --> */}
                        <input type="text" placeholder="Role" id="Role" className="inputbar" value="Student" readOnly />
                        <span className="icon" ><ion-icon name="person"></ion-icon></span>

                    </div>
                    <div id="item1" className="item">
                        {/* <!-- <label htmlFor="name">Name:</label> --> */}
                                  <input type="text" placeholder="Name" name='name' id="name" onChange={studentChange} value={student.name} autocomplete="off" className="inputbar" required />
                    </div>
                    <div id="item10" className="item">
                        <p id="messagename"></p>
                    </div>
                    <div id="item2" className="item">
                        {/* <!-- <label htmlFor="email">Email:</label> --> */}
                                  <input type="email" placeholder="Email" id="email" name='email' onChange={studentChange} value={student.email} autocomplete="off" className="inputbar" required />
                        <span className="icon"><ion-icon name="mail"></ion-icon></span>
                    </div>
                    <div id="item3" className="item">
                        {/* <!-- <label htmlFor="name">Password:</label> --> */}
                        <input type="password" placeholder="Password" id="password"  name='password' onChange={studentChange} value={student.password} className="inputbar" required />
                        <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                    </div>
                    <div id="item11" className="item">
                        <p id="messagelength"></p>
                    </div>
                    <div id="item4" className="item">
                        {/* <!-- <label htmlFor="name">Confirm Password:</label> --> */}
                        <input type="password" placeholder="Confirm Password" id="cnfrm-password" name='confirmPassword' onChange={studentChange} value={student.confirmPassword} className="inputbar" required />
                    </div>
                    <div id="item5" className="item">
                        {/* <!-- <label htmlFor="name">Confirm Password:</label> --> */}
                        <select name="branch" id="selectbranch" className="inputbar"  onChange={studentChange} value={student.branch} required>
                            <option value="selectbr">Select Branch</option>
                            <option value="biotech">Biotechnology</option>
                            <option value="ch">Chemical engineering</option>
                            <option value="ce">Civil engineering</option>
                            <option value="cse">Computer science and engineering</option>
                            <option value="ee">Electrical engineering</option>
                            <option value="ece">Electronics and communication engineering</option>
                            <option value="me">Mechanical engineering</option>                           
                            <option value="pie">Production and industrial engineering</option>
                        </select>

                    </div>

                    <div id="item6" className="item">
                        {/* <!-- <label htmlFor="name">Graduation Year:</label> --> */}
                        <input type="number" min="1999" max="2040" placeholder="Select Year" name='graduationYear' onChange={studentChange} value={student.graduationYear} id="year" className="inputbar" required />
                    </div>

                    <div id="item7" className="item">
                        <p id="message"></p>
                    </div>
                    <div id="item8" className="item">
                        <input type="checkbox" id="check-box1" /><label htmlFor="" id="terms" required >I agree to the terms and
                            conditions</label>
                    </div>

                    <div id="item9" className="item">
                    {/* className="reglog-button" */}
                        <button className="btn-black" onClick={check} >Register</button>
                    </div>

                </form>
            </div>

         :role==="admin"?
             <div className="formbox">
                <form  className="formcontent">
                    <div id="item0" className="item">
                        {/* <!-- <label htmlFor="role">Role:</label> --> */}
                        <input type="text" placeholder="Role" id="Role"  className="inputbar" value="Admin" readOnly />
                        <span className="icon"><ion-icon name="person"></ion-icon></span>

                    </div>
                    <div id="item1" className="item">
                        {/* <!-- <label htmlFor="name">Name:</label> --> */}
                        <input type="text" placeholder="Name" id="name" name='name' value={admin.name} onChange={adminChange} className="inputbar" required />

                    </div>
                    <div id="item10" className="item">
                        <p id="messagename"></p>
                    </div>
                    <div id="item2" className="item">
                        {/* <!-- <label htmlFor="email">Email:</label> --> */}
                        <input type="email" placeholder="Email" id="email" name='email' value={admin.email} onChange={adminChange} className="inputbar" required />
                        <span className="icon"><ion-icon name="mail"></ion-icon></span>
                    </div>
                    <div id="item3" className="item">
                        {/* <!-- <label htmlFor="name">Password:</label> --> */}
                        <input type="password" placeholder="Password" id="password" name='password' value={admin.password} onChange={adminChange} className="inputbar" required />
                        <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                    </div>
                    <div id="item11" className="item">
                        <p id="messagelength"></p>
                    </div>
                    <div id="item4" className="item">
                        {/* <!-- <label htmlFor="name">Confirm Password:</label> --> */}
                        <input type="password" placeholder="Confirm Password" id="cnfrm-password" name='confirmPassword' value={admin.confirmPassword} onChange={adminChange} className="inputbar" required />
                    </div>
                    <div id="item6" className="item">
                        <p id="message"></p>
                    </div>
                    <div id="item8" className="item">
                        <input type="checkbox" id="check-box1" /><label htmlFor="" id="terms" required>I agree to the terms and
                            conditions</label>
                    </div>

                    <div id="item9" className="item">
                        <button className="btn-black" onClick={check}>Register</button>
                    </div>

                </form>
            </div>

         : <div className="formbox">
                <form  className="formcontent">
                    <div id="item0" className="item">
                        {/* <!-- <label htmlFor="role">Role:</label> --> */}
                        <input type="text" placeholder="Role" id="Role" className="inputbar" value="Teacher" readOnly />
                        <span className="icon"><ion-icon name="person"></ion-icon></span>

                    </div>
                    <div id="item1" className="item">
                        {/* <!-- <label htmlFor="name">Name:</label> --> */}
                        <input type="text" placeholder="Name" id="name" name='name' value={teacher.name} onChange={teacherChange} className="inputbar" required />

                    </div>
                    <div id="item10" className="item">
                        <p id="messagename"></p>
                    </div>
                    <div id="item2" className="item">
                        {/* <!-- <label htmlFor="email">Email:</label> --> */}
                        <input type="email" placeholder="Email" id="email" name='email' value={teacher.email} onChange={teacherChange} className="inputbar" required />
                        <span className="icon"><ion-icon name="mail"></ion-icon></span>
                    </div>
                    <div id="item3" className="item">
                        {/* <!-- <label htmlFor="name">Password:</label> --> */}
                        <input type="password" placeholder="Password" id="password" name='password' value={teacher.password} onChange={teacherChange} className="inputbar" required />
                        <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                    </div>
                    <div id="item11" className="item">
                        <p id="messagelength"></p>
                    </div>
                    <div id="item4" className="item">
                        {/* <!-- <label htmlFor="name">Confirm Password:</label> --> */}
                        <input type="password" placeholder="Confirm Password" id="cnfrm-password" name='confirmPassword' value={teacher.confirmPassword} onChange={teacherChange} className="inputbar" required />
                    </div>

                    <div id="item5" className="item">
                        {/* <!-- <label htmlFor="name">Graduation Year:</label> --> */}
                        <input type="text" placeholder="Subject" id="subject" name='subject' value={teacher.subject} onChange={teacherChange} className="inputbar" required />
                    </div>

                    <div id="item6" className="item">
                        <p id="message"></p>
                    </div>
                    <div id="item8" className="item">
                        <input type="checkbox" id="check-box1" /><label htmlFor="" id="terms" required>I agree to the terms and
                            conditions</label>
                    </div>

                    <div id="item9" className="item">
                        <button className="btn-black" onClick={check} >Register</button>
                    </div>

                </form>
            </div>}
         
       
        </div>
    </div>

    </>
  )
}
