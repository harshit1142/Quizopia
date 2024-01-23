import React from 'react'

export default function Ranking({ind,name,score,total,email}) {
  return (
      <>
          <tr >
              <th scope="row">{ind + 1}</th>
              <td>{name}</td>
              <td>{email}</td>
              <td>{score}</td>
              <td>{total}</td>
          </tr>
      </>
  )
}
