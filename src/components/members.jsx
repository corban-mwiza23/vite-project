import axios from "axios";
import { useEffect, useState } from "react";
import {Navigate, useNavigate,Link} from "react-router-dom";
function AddMember(){
    const navigate = useNavigate();
    const [form,setForm] = useState({firstName:'',lastName:'',email:'',phone:''});
    const[users,setUsers] = useState([]);
    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value});
    }
    const fetchMembers = async() =>{
        try{
            const response = await axios.get('http://localhost:5000/api/findMembers')
            setUsers(response.data)
        }
        catch(error){
            alert("Error fetching Users")
        }
    }
    const deleteMember = async(id)=>{
        try{
            const response = await axios.delete(`http://localhost:5000/api/deleteMember/${id}`);
            alert('Member deleted Successfully')
            fetchMembers();
        }
        catch(error){
            alert('Error Deleting')
        }
    }
        useEffect(()=>{
        fetchMembers();},[])
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/api/add-members',form);
            if(response.status==200){
                alert(response.data.message);
                navigate('/')
                fetchMembers();
            }
        }
        catch(error){
            alert(error);
        }
    }
return(
    <div className="flex justify-center items-center w-full h-screen flex-col">
        <div>
        <form onSubmit={handleSubmit} className="bg-base-100 p-4 border border-base-content/20 card shadow-2xl min-w-96">
        <h2 className="text-2xl font-bold text-center">Add a Member</h2>
            <label htmlFor="" className="label m-1">First Name</label>
            <input type="text" onChange={handleChange} placeholder="firstname" className="input" name="firstName" />
            <label htmlFor="" className="label m-1">Last Name</label>
            <input type="text" onChange={handleChange} placeholder="lastname" className="input" name="lastName" />
            <label htmlFor="" className="label m-1">Email</label>
            <input type="email" onChange={handleChange} placeholder="Username" className="input" name="email" />
            <label htmlFor="" className="label m-1">Phone Number</label>
            <input type="tel" onChange={handleChange} placeholder="+250 780 0000" className="input" name="phone" />
            <input type="submit" className="btn btn-info" />
        </form>
        </div>
        <div className="c">
            <table className="table table-zebra bg-base-100">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                    {users.map(users=>(
                        <tr key={users.memberId}>
                            <td>{users.firstName}</td>
                            <td>{users.lastName}</td>
                            <td>{users.email}</td>
                            <td>{users.phone}</td>
                            <td>
                                <Link to={`/edit-members/${users.memberId}`} className="btn btn-warning btn-small">Edit</Link>
                            </td>
                                <td>
                                    <button onClick={()=>{
                                        if(window.confirm('Are you sure you want to delete?')){
                                            deleteMember(users.memberId)
                                        }
                                    }}
                                className="btn btn-error btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </thead>
            </table>
        </div>
    </div>
)
}

export default AddMember;