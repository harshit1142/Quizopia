import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "../Redux/UserRedux";
import { QuizReducer } from "../Redux/QuizRedux";
import { QuesReducer } from "../Redux/QuesRedux";
import { combineReducers } from "@reduxjs/toolkit";
import { AllQuizReducer } from "../Redux/AllQuizRedux";
const rootReducer = combineReducers({ UserReducer,QuizReducer ,QuesReducer,AllQuizReducer})

export const store = configureStore({
    reducer:{rootReducer}
});