import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditMember() {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ fix

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchMember = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/findMembers/${id}`);
      if (response.status === 200) {
        setForm({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phone
        });
      }
    } catch (error) {
      alert("Error fetching user data.");
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/update-members/${id}`, form); // ✅ fixed URL
      if (response.status === 200) {
        alert(response.data.message);
        navigate('/add-member'); // ✅ redirect back
      }
    } catch (error) {
      alert("Failed to update member.");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen flex-col">
      <div>
        <form onSubmit={handleSubmit} className="bg-base-100 p-4 border border-base-content/20 card shadow-2xl min-w-96">
          <h2 className="text-2xl font-bold text-center">Edit Member</h2>
          <label className="label m-1">First Name</label>
          <input type="text" onChange={handleChange} value={form.firstName} placeholder="First Name" className="input" name="firstName" required />
          <label className="label m-1">Last Name</label>
          <input type="text" onChange={handleChange} value={form.lastName} placeholder="Last Name" className="input" name="lastName" required />
          <label className="label m-1">Email</label>
          <input type="email" onChange={handleChange} value={form.email} placeholder="Email" className="input" name="email" required />
          <label className="label m-1">Phone Number</label>
          <input type="tel" onChange={handleChange} value={form.phone} placeholder="+250 780 0000" className="input" name="phone" required />
          <button type="submit" className="btn btn-info mt-4">Update Member</button>
        </form>
      </div>
    </div>
  );
}

export default EditMember;
