import { configureStore } from "@reduxjs/toolkit";
import moviereducer from "./reducer";
const Store=configureStore({
    reducer:{
        movies:moviereducer
    }
})
export default Store