import {Link} from "react-router-dom";

function Sidebar(){
    return(
<div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Library Database</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
            <Link to='/getMedia' className="px-4">Media</Link>
            <Link to='/add-member' className="px-4">Member</Link>
          </ul>
  </div>
</div>
    )
}
export default Sidebar;