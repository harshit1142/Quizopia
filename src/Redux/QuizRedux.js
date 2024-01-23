import { createSlice } from "@reduxjs/toolkit";


const InitialValue = {
    quiz: {_id:"",title:"",question:""}
}



export const QuizRedux = createSlice({
    name: 'quiz',
    initialState: InitialValue,
    reducers: {
        setQuiz: (state, action) => {
            localStorage.setItem('quiz', JSON.stringify(action.payload));
            state.quiz = action.payload;
        },
        removeQuiz: (state, action) => {
            localStorage.removeItem('quiz');
            state.quiz = {}
        }
        
    }
})

export const { setQuiz, removeQuiz } = QuizRedux.actions
export const QuizReducer = QuizRedux.reducer

