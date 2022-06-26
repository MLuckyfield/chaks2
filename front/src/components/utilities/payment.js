import React, {useState,useEffect} from 'react'
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
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
const CheckoutForm = (props) => {

  const stripe = useStripe();
  const elements = useElements();
  const [options,setOptions]=useState(()=>{
    axios.post('/payment/getId',{product:props.product})
      .then((res) => {
          console.log(res)
              return {
                  // passing the client secret obtained in step 2
                  clientSecret: res.data.data.client_secret,
                  // Fully customizable with appearance API.
                  appearance: {/*...*/},
              }
          })
      .catch((err) => {
        console.log(err)
        return null
        // setFeedback(err.response.data.message);
        });
  })
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    console.log(event)
  };

  return (
    <Elements stripe={stripe} options={options}>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <button disabled={!stripe}>Submit</button>
          {/* Show error message to your customers */}
          {errorMessage && <div>{errorMessage}</div>}
        </form>
    </Elements>
  )
};
export default CheckoutForm;
