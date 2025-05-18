import {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
function Login(){
    const[form,setForm] = useState({username:'',password:''});
    const [error,setError] = useState([]);
    const handleChange= (e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/api/login',form);
            alert(response.data.message)
        }
        catch(error){
            alert('Invalid credentials')
            setError(error.response.message.Error)
        }
    }
    return(
        <div className="flex justify-center items-center w-full h-screen">
            <form onSubmit={handleSubmit} className="card shadow-2xl border border-base-300 min-w-96">
                <h2 className='text-2xl font-bold text-center'>Access Your Account</h2>
                <label className='label m-1'>Enter Username:</label>
                <input className='input m-1' onChange={handleChange} name='username' />
                <label className='label m-1'>Enter Password:</label>
                <input className='input m-1' onChange={handleChange} name='password' type='password' />
                <button type='submit' className='btn btn-info'>Submit</button>
            </form>
        </div>
    )
}
export default Login;