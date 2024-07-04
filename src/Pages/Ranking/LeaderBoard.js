import React from 'react'
import { useSelector } from 'react-redux'
import Ranking from '../../Components/Ranking';


export default function LeaderBoard() {
    
    const selectRank = (state) => state.rootReducer.RankingReducer.rank;
    const selectQuiz = (state) => state.rootReducer.QuizReducer.quiz;
    var ranking = useSelector(selectRank);
    var quiz=useSelector(selectQuiz)
   
    ranking = ranking.slice().sort((a, b) => b.score - a.score)
    
    return (
        <div className='container-fluid bg-dark text-light vh-100'>
            <div className='container-fluid d-flex flex-column align-items-center text-warning text-bold'>
                <h1>LeaderBoard</h1>
            </div>
            <div className='container-fluid d-flex flex-column  mt-3 text-light'>
                <h1 className='text-primary'>Quiz Detail</h1>
                <h3>Title: {quiz.title}</h3>
                <h3>Branch: {quiz.branch}</h3>
                <h3>Graduation Year: {quiz.graduationYear}</h3>
                <h3>Teacher: {quiz.name}</h3>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Score</th>
                            <th scope="col">Total Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranking != null && ranking.map((ele, ind) => <Ranking ind={ind} name={ele.name} email={ele.email} score={ele.score} total={ele.totalMarks}/>)}
                    </tbody>
                    </table>
            </div>
        </div>
    )
}
