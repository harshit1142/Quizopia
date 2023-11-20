import React from 'react'

export default function ({list,ind}) {
   const style=(list.accepted==true)?"green":"red";
  async function handleAccept(){
                
   }
   async function handleDecline(){
      
   }
  return (
    <>
         <tr >
                    <th scope="row" style={{color:style}}>{ind+1}</th>
                    <td style={{color:style}}>{list.name}</td>
                    <td style={{color:style}}>{list.email}</td>
                    <td style={{color:style}}>{list.subject}</td>
                    <td > <button onClick={()=>handleAccept()}>Accept</button> </td>
                    <td onClick={()=>handleDecline()}>Decline</td>
                    
        </tr>
    </>
  )
}
