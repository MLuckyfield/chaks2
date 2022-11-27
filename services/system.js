const network = (name,req)=>{
  console.log(name,req.rawHeaders[27],'-->',
              req.route.path,' | ',
              req.user.first,'('+req.user._id+')')
}
const start = (name,req)=>{
  console.log(name,'STARTING: ',req.user.first,'('+req.user._id+')')
}
const end = (name,req)=>{
  console.log(name,'COMPLETE: ',req.user.first,'('+req.user._id+')')
}
module.exports = {
  start,end,network
}
