import { createSlice } from "@reduxjs/toolkit";


const InitialValue = {
    ques: []
}



export const QuesRedux = createSlice({
    name: 'ques',
    initialState: InitialValue,
    reducers: {
        setQues: (state, action) => {
            state.ques=[...state.ques,action.payload];
        },
        removeQues: (state, action) => {
            state.ques = []
        },
        updateQues:(state,action)=>{
            const ind=state.ques.findIndex(ele=>ele.ind===action.payload.ind);
            if(ind!==-1){
                state.ques[ind]=action.payload;
            }else{
               state.ques=[...state.ques,action.payload]; 
            }
        }

    }
})

export const { setQues, removeQues,updateQues } = QuesRedux.actions
export const QuesReducer = QuesRedux.reducer

