import lib from 'axios';

export const axios = lib.create({})
axios.interceptors.request.use(
  config => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    console.log('current token is :'+token)
    if (token) {
      console.log('Setting headers');
      config.headers.Authorization = `Token ${token}`;
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
      console.log('removing headers')
      axios.defaults.headers.common['Authorization'] = null;
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
