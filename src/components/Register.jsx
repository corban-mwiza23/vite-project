import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import bcrypt from "bcryptjs";
function Register(){
    const navigate = useNavigate();
    const [form,setForm] = useState({username:'',password:'',role:'librarian'});
    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value});
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const hashedPassword = await bcrypt.hash(form.password,10)
            const response = await axios.post('http://localhost:5000/api/register',{
                username: form.username,
                password:hashedPassword,
                role: form.role
            });
            if(response.status==200){
                alert(response.data.message);
                navigate('/login')
            }
        }
        catch(error){
            alert(error);
        }
    }
return(
    <div className="flex justify-center items-center w-full h-screen">
        <form onSubmit={handleSubmit} className="bg-base-100 p-4 border border-base-content/20 card shadow-2xl min-w-96">
        <h2 className="text-2xl font-bold text-center">Create An Account</h2>
            <label htmlFor="" className="label m-1">Enter Username:</label>
            <input type="text" onChange={handleChange} placeholder="Username" className="input" name="username" />
            <label htmlFor="" className="label m-1">Enter Password:</label>
            <input type="password" onChange={handleChange} placeholder="Password" className="input" name="password" />
            <label htmlFor="" className="label m-1">Select Role:</label>
            <select onChange={handleChange} className="select" name="role">
                <option onChange={handleChange} name="role" value="librarian">librarian</option>
                <option onChange={handleChange} name="role" value="librarian">Assistant</option>
            </select>
            <input type="submit" className="btn btn-info" />
        </form>
    </div>
)
}

export default Register;