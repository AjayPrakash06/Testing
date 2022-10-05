import {configureStore} from "@reduxjs/toolkit"
import subjectReducer from "./subjectSlice"
import  scanReducer from "./scanSlice"
const store = configureStore(
    {
        reducer:{subject:subjectReducer , scan:scanReducer }
    }
)
export default store