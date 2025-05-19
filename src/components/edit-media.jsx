import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // ✅ Correct
import { useNavigate } from "react-router-dom";
function EditMedia(){
    const navigate = useNavigate();
    const { id } = useParams(); // ✅ Correct way to get :id
    const [form, setForm] = useState({
        title: '', type: '', author: '', publisher: '', year: '', availableCopies: ''
    });

    const fetchMedia = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/getMedia/${id}`);
            setForm(response.data); // ✅ Use setForm, not setUsers
        } catch (error) {
            alert('Error fetching Media');
        }
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/editMedia/${id}`, form);
            if(response.status==200){
                alert(response.data);
                navigate('/getMedia')
            }
        } catch(error) {
            alert('Failed UPDATING');
        }
    };

    return (
    <div className="flex justify-center items-center w-full h-screen flex-col">
      <div>
        <form onSubmit={handleSubmit} className="bg-base-100 p-4 border border-base-content/20 card shadow-2xl min-w-96">
          <h2 className="text-2xl font-bold text-center">Edit Member</h2>
          <label className="label m-1">First Name</label>
          <input type="text" onChange={handleChange} value={form.title} placeholder="First Name" className="input" name="title" required />
          <label className="label m-1">Type</label>
          <input type="text" onChange={handleChange} value={form.type} placeholder="Last Name" className="input" name="type" required />
          <label className="label m-1">Author</label>
          <input type="text" onChange={handleChange} value={form.author} placeholder="Email" className="input" name="author" required />
          <label className="label m-1">Publisher</label>
          <input type="text" onChange={handleChange} value={form.publisher} placeholder="+250 780 0000" className="input" name="publisher" required />
          <label className="label m-1">Year</label>
          <input type="date" onChange={handleChange} value={form.year} placeholder="+250 780 0000" className="input" name="year" required />
          <label className="label m-1">Available Copies</label>
          <input type="tel" onChange={handleChange} value={form.availableCopies} placeholder="+250 780 0000" className="input" name="availableCopies" required />
          <button type="submit" className="btn btn-info mt-4">Update Media</button>
        </form>
      </div>
    </div>
    );
}

export default EditMedia;
