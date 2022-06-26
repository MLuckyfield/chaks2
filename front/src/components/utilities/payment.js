import React, {useState,useEffect} from 'react'
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {useStripe, useElements, PaymentElement, Elements} from '@stripe/react-stripe-js';
import {axios} from "../../utilities/axios";

//
// const Payment = ()=>{
//   const [transaction, setTransaction] = useState(window.location.pathname.slice(13,window.location.pathname.length));
//   useEffect(()=>{
//     // axios.post('/payment/getTransaction',
//     //     {
//     //       transaction:transaction
//     //     })
//     //       .then((res) => {
//     //         console.log(res.data.data)
//     //
//     //           })
//     //       .catch((err) => {
//     //         // setMsg([err.message,err.success]);
//     //         // setFeedback(err.response.data.message);
//     //         });
//   },[])
//   //CUSTOM STRIPE WORKFLOW
//     // const stripePromise = loadStripe('pk_test_46zswMCbz39W2KAqKj43vDRu');
    // const [options,setOptions]=useState(()=>{
    //   axios.post('/payment/getId',{product:props.product})
    //     .then((res) => {
    //         console.log(res)
    //             return {
    //                 // passing the client secret obtained in step 2
    //                 clientSecret: res.data.data.client_secret,
    //                 // Fully customizable with appearance API.
    //                 appearance: {/*...*/},
    //             }
    //         })
    //     .catch((err) => {
    //       return null
    //       // setFeedback(err.response.data.message);
    //       });
    // })
//     //
//     // return (
//     //   <Elements stripe={stripePromise} options={options}>
//     //   <CheckoutForm />
//     // </Elements>
//     // );
//     return(
//       <div>Complete!</div>
//     )
// }

// axios.post('/payment/getId',{product:props.product})
//   .then((res) => {
//       console.log(res)
//       setOptions({clientSecret: res.data.data.client_secret})
//       })
//   .catch((err) => {
//       console.log(err)
//     // setFeedback(err.response.data.message);
//     });
const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

const Form =()=>{
  const options = {
    // passing the client secret obtained in step 2
    clientSecret: '{{CLIENT_SECRET}}',
    // Fully customizable with appearance API.
    appearance: {/*...*/},
  };
  const stripePromise = loadStripe('pk_test_46zswMCbz39W2KAqKj43vDRu');
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}
