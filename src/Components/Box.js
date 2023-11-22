import React from 'react'

export default function Box({list,ind,name}) {
  return (
         <>
         <tr >
                    <th scope="row">{ind+1}</th>
                    <td>{list.title}</td>
                    <td>{name}</td>
                    <td>{list.date}</td>
        </tr>
    </>
  )
}
