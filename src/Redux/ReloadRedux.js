import { createSlice } from "@reduxjs/toolkit";


const InitialValue = {
    change:false
}



export const ReloadRedux = createSlice({
    name: 'change',
    initialState: InitialValue,
    reducers: {
        setChange: (state, action) => {
            state.change=!state.change
        }
    }
})

export const { setChange } = ReloadRedux.actions
export const ReloadReducer = ReloadRedux.reducer

