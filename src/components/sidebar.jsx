import {Link} from "react-router-dom";

function Sidebar(){
    return(
        <div className="font-black navbar-center">
            <Link to='/register' className='font-black text underline-offset-0 px-4'>Register</Link>
            <Link to='/add-member' className='font-black text underline-offset-0 px-4'>Member</Link>
            <Link to='/getMedia' className='font-black text underline-offset-0 px-4'>Media</Link>
            <Link to='/Logout' className='font-black text underline-offset-0 px-4'>Logout</Link>
        </div>
    )
}
export default Sidebar;