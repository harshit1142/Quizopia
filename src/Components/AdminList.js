import React from 'react'

export default function AdminList({list,ind,add,remove}) {
   const style=(list.accepted==true)?"green":"red";
  return (
    <>
         <tr >
                    <th scope="row" style={{color:style}}>{ind+1}</th>
                    <td style={{color:style}}>{list.name}</td>
                    <td style={{color:style}}>{list.email}</td>
                    <td style={{color:style}}>{list.subject}</td>
        <td > <button className='btn btn-success w-100 text-light' onClick={add} style={{color:"green"}}>Accept</button> </td>
                    {/* <td > <button onClick={remove} style={{color:"red"}}>Delete</button> </td> */}
                   
                    
        </tr>
    </>
  )
}
