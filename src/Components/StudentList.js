import React from 'react'

export default function StudentList({list,ind}) {
  return (
    <>
         <tr >
                    <th scope="row">{ind+1}</th>
                    <td>{list.name}</td>
                    <td>{list.email}</td>
                    <td>{list.branch}</td>
                    <td>{list.graduationYear}</td>
        </tr>
    </>
  )
}
