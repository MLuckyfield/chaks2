import lib from 'axios';

export const axios = lib.create({})
axios.interceptors.request.use(
  config => {
    // prepare to send token)
    if (localStorage.getItem('user')) {
      const token = JSON.parse(localStorage.getItem('user')).token
      console.log('Setting headers');
      config.headers.Authorization = `Token ${token}`;
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
      console.log('removing headers')
      axios.defaults.headers.common['Authorization'] = null;
    }
    //check token is not expired
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp
    if(Math.floor(new Date().getTime()/1000)>=expiry){
      console.log('login required...')
      window.location.href='/location'
    }
    return config;
  },
  error=>{return Promise.reject(error)}
)
// export const setToken = (token)=>{
//   if(token){
//     axios.defaults.headers.common['Authorization']=`Bearer ${token}`
//     console.log(axios.defaults.headers.common['Authorization'])
//   }else{
//     delete axios.defaults.headers.common['Authorization']
//   }
// }
