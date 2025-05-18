import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function DeleteMember(){
    const{id} = req.params();
    const[form,setForm] = useState({firstName:'',lastName:'',email:'',phone:''});
    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value});
    }
    const handleSubmit = async(e) =>{
        e.preventDefault
    }
}

export default DeleteMember;