const deleteCookie = (_:any,res:any) => {
  try{
  res.cookie('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0), // Expire immediately
    path: '/',
  });}catch(err){
    res.json({
      message: "deletion failed"
    })
  }
};

export default deleteCookie;