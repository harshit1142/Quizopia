import { createSlice } from "@reduxjs/toolkit";


const InitialValue = {
    rank: []
}



export const RankingRedux = createSlice({
    name: 'rank',
    initialState: InitialValue,
    reducers: {
        setRanking: (state, action) => {
            state.rank = action.payload;
            localStorage.setItem('ranking', JSON.stringify(action.payload));
        },
        removeRanking: (state, action) => {
            localStorage.removeItem('ranking');
            state.rank = {}
        }

    }
})

export const { setRanking, removeRanking } = RankingRedux.actions
export const RankingReducer = RankingRedux.reducer

