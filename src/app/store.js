import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "../Redux/UserRedux";
import { QuizReducer } from "../Redux/QuizRedux";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ UserReducer,QuizReducer })

export const store = configureStore({
    reducer:{rootReducer}
});