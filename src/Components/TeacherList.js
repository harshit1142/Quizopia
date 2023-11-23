import React from 'react'

export default function TeacherList({list,ind}) {
    const style=(list.accepted==true)?"green":"red";
  return (
    <>
         <tr >
                    <th scope="row" style={{color:style}}>{ind+1}</th>
                    <td style={{color:style}}>{list.name}</td>
                    <td style={{color:style}}>{list.email}</td>
                    <td style={{color:style}}>{list.subject}</td>
        </tr>
    </>
  )
}
