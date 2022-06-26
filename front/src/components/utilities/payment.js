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
const CheckoutForm = (props) => {

  const stripe = useStripe();
  const elements = useElements();
  const [options,setOptions]=useState()
  useEffect(()=>{
    axios.post('/payment/getId',{product:props.product})
      .then((res) => {
          console.log(res)
          setOptions({clientSecret: res.data.data.client_secret})
          })
      .catch((err) => {
          console.log(err)
        // setFeedback(err.response.data.message);
        });
  },[])
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {

      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const {error} = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: 'https://example.com/order/123/complete',
        },
      });


      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setErrorMessage(error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
  };

  return (
    <Elements stripe={loadStripe(process.env.STRIPE)} options={options}>
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
