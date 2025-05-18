const ProtectedRoute = ({children})=>{
    const user = localStorage.get('user');
    if(!user){
        <Navigate to='/' replace />
    }
    return children;
}
export default ProtectedRoute;