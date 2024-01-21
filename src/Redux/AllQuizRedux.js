import { createSlice } from "@reduxjs/toolkit";


const InitialValue = {
    allQuiz: []
}



export const AllQuizRedux = createSlice({
    name: 'allQuiz',
    initialState: InitialValue,
    reducers: {
        setAllQuiz: (state, action) => {
            state.allQuiz= action.payload;
            localStorage.setItem('allQuiz', JSON.stringify(action.payload));
        },
        removeAllQuiz: (state, action) => {
            localStorage.removeItem('allQuiz');
            state.allQuiz = {}
        }

    }
})

export const { setAllQuiz, removeAllQuiz } = AllQuizRedux.actions
export const AllQuizReducer = AllQuizRedux.reducer

