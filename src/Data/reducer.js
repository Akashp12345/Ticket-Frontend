import { createSlice } from '@reduxjs/toolkit'
const data = {
    movies: [],
    user:"",
    booking:[],
    bookedseat:[],
    mybooking:false
}
const moviereducer = createSlice({
    name: "movies",
    initialState: data,
    reducers: {
        AddMovies(state, action) {
            state.movies = action.payload
        },
        Login(state,action){
            state.user=action.payload
        },
        seatbooking(state,action){
            state.booking=action.payload.modal
            state.bookedseat=action.payload.Final
        },
        mybook(state,action){
            state.mybooking=action.payload
        }
    }
})
export const { AddMovies,Login,seatbooking,mybook} = moviereducer.actions
export default moviereducer.reducer