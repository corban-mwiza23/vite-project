import { useEffect, useState } from "react";
import axios from "axios";

function EditMedia(){
    const {id} =req.params();
    const [form,setForm] = useState({title:'',type:'',author:'',publisher:'',year:'',availableCopies:''})
    const fetchMedia = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/getMedia/${id}`);
            setUsers(response.data);
        } catch (error) {
            alert('Error fetching Media');
        }
    };
    useEffect(()=>{
        fetchMedia();},[]
    )
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await axios.put('http://localhost:5000/')
    }
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Title</label>
            <input type="text" name="author" value={form.author} />
            <label htmlFor="">Type</label>
            <input type="text" name="type" />
            <label htmlFor="">Author</label>
            <input type="text" name="author" />
            <label htmlFor="">Publisher</label>
            <input type="text" name="publisher" />
            <label htmlFor="">Year</label>
            <input type="date" name="year" />
            <label htmlFor="">Available Copies</label>
            <input type="number" name="availableCopies" />
        </form>
    )
}
export default EditMedia;