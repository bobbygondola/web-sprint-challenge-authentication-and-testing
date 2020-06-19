//middleware
module.exports=(req,res,next) => {
  const logged = req.session.user;
  if(logged){
      next()
  } else {
      res.status(401).json({message: "You must login first before accessing the JOKES!"})
  }
}
