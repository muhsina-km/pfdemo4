import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Plantedit = (props) => {
   
        var[ptype,setPtype]=useState(props.data)
    
    const navigate =useNavigate();
    
    
    const ptypehandler =(event)=>{
        const {name,value}=event.target
        setPtype((ptype)=>({...ptype,[name]:value}))
        console.log(ptype)
    }  
     const saveData =()=>{
        
        if
        (props.method==="put")
        {
            axios.put("http://localhost:3005/ptedit/"+ptype._id,ptype)
            .then((response)=>{
                alert("UPDATED")
                window.location.reload(false)
            })
            .catch(err=>console.log(err))
        }
     }
     
  return (
    <div>
    <h1 >Plant Type</h1>
    <TextField label="Plant Type" name="Planttype" value={ptype.Planttype} onChange={ptypehandler}/>
    <br></br>
    <br></br>
    status &nbsp;&nbsp;&nbsp;
    <select name="Status" value={ptype.Status} onChange={ptypehandler}>
        <option value="ACTIVE">ACTIVE</option>
        <option value="INACTIVE">INACTIVE</option>
    </select>
    <br></br>
    <button onClick={saveData} >SUBMIT</button>
</div>

  )
}

export default Plantedit
