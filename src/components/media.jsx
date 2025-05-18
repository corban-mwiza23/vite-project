import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Media() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getMedia');
            setUsers(response.data);
        } catch (error) {
            alert('Error fetching Media');
        }
    };

const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        const response = await axios.post('http://localhost:5000/editMedia',form);
        fetchMedia();
        alert('Updated Successfully')
    }
    catch(error){
        alert('Failed editing')
    }
}

    const deleteMedia = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/deleteMedia/${id}`);
            alert("Media deleted successfully!");
            fetchMedia();
        } catch (error) {
            alert("Failed to delete media");
        }
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Year</th>
                    <th>Available Copies</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.mediaId}>
                        <td>{user.title}</td>
                        <td>{user.type}</td>
                        <td>{user.author}</td>
                        <td>{user.publisher}</td>
                        <td>{user.year}</td>
                        <td>{user.availableCopies}</td>
                        <td className="space-x-2">
                            <Link to={`/edit-media/${user.mediaId}`} className='btn btn-warning btn-sm'>Edit</Link>
                            <button onClick={() => deleteMedia(user.mediaId)} className="btn btn-error btn-sm">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Media;
