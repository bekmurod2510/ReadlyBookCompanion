import deleteCookie from './utils/deleteCookie'

const Logout = (req:any, res:any) => {
    try{
        deleteCookie(req,res);
        res.status(200).json({
            success:true,
            message: "Logged out successfully"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message : "Log Out failed. Server error!"
        })
    }
}

export default Logout