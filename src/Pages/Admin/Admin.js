import React from 'react'
import classes from "./admin.module.css"
import { useState } from 'react'
import List from '../../Components/List';
import StudentList from '../../Components/StudentList';

export default function Admin() {
  const [curr,setCurr]=useState("1");

  function Click1(){
     setCurr("1");
  }
  function Click2(){
     setCurr("2");
  }
  function Click3(){
     setCurr("3");
  }
  return (
    <div className={classes.container}>
           <div className={classes.left}>
              <div className={classes.img}>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg" alt="Profile Pic" />
              </div>
              <div className={classes.info}>
                <h1>Name</h1>
                <p>Email@gmail.com</p>
              </div>
              <div className={classes.option}>
                <button className={classes.btn} onClick={Click1}>
                  Teacher Approved
                </button>
                <button className={classes.btn} onClick={Click2}>
                  Teacher Pending
                </button>
                <button className={classes.btn} onClick={Click3}>
                  Student Connected
                </button>
              </div>
           </div>
           <div className={classes.right}>
               {curr==="1"?<List />:""}
               {curr==="2"?"":""}
               {curr==="3"?<StudentList />:""}
           </div>
    </div>
  )
}
