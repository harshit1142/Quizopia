import React from 'react'

export default function QuizList({list,ind,name}) {
   return(
    <div className="card" style={{margin:"2px"}}>
        <div className="card-body">
            <h5 className="card-title" style={{color:"black"}}>{list.title}</h5>
            <h5 className="card-title" style={{color:"black"}}>{list.branch},{list.graduationYear}</h5>
            <h6 className="card-subtitle mb-2 text-muted" style={{color:"black"}}>{list.description}</h6>
            <h6 className="card-subtitle mb-2 text-muted" style={{color:"black"}}>{name}</h6>
            <p className="card-text " style={{color:"red"}}>{list.totalMarks}</p>
            <h6 className="card-subtitle mb-2 text-muted" style={{color:"black"}}>{list.date}</h6>
            <h6 className="card-subtitle mb-2 text-muted" style={{color:"black"}}>{list.duration}</h6>
            <div className='d-flex flex-column'>
            <a  className="card-link" style={{color:"green"}}>Open</a>
            <a  className="card-link" style={{color:"red"}}>Delete</a>
            </div>
        </div>
</div>
   );
}
