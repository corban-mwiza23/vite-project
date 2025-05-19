import {Link, useNavigate} from "react-router-dom";

function Sidebar(){
  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('user');
    navigate('/')
  }
    return(
<div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Library Database</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
            <Link to='/getMedia' className="px-4">Media</Link>
            <Link to='/add-member' className="px-4">Member</Link>
            <button className="btn btn-error btn-sm flex-end items-end text-center py-3" onClick={handleLogout}>Logout</button>
          </ul>
  </div>
</div>
    )
}
export default Sidebar;