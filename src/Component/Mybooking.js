import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
export default function Mybooking(){
    const data=useSelector(state=>state.movies)
    const[mybooking,setMybooking]=useState([])
    const{user}=data
    
    useEffect(()=>{
        let obj={
            username:user
        }
   axios.post("/mybooking",obj)
   .then(res=>setMybooking(res.data.mybooking))
   .catch(err=>console.log(err))
    },[user])
    return (
        <div>
{user && <div  style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"10px"}}>
      {mybooking.map((item,index)=>
      <div key={index} style={{border:"1px solid",width:"90%",borderRadius:"10px",padding:"10px",marginTop:"10px"}}>
           <h3>{item.moviename}</h3><br/>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}> {item.seats.map(item=>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
           <label>Seat Number : {item.seatid}</label>
           <label>Price : {item.Price}/Rs</label>
           </div>
            )}</div>

      </div>
      )}

    </div>}

        </div>
    )
}