const PushNotifications = require("@pusher/push-notifications-server");

const emit = (stream,title,body,link)=>{

   let beamsClient = new PushNotifications({
     instanceId: "d3fef753-d608-4c0b-8b9c-879e7c9e44eb",
     secretKey:process.env.BEAMS,
   });
   console.log('publishing')
   console.log(stream, title,body)
   beamsClient
     .publishToInterests([stream], {
       web: {
         notification: {
           title: title,
           body: body,
         },
       },
     })
     .then((publishResponse) => {
       console.log("Just published:", publishResponse.publishId);
       console.log("Just published:", publishResponse);
     })
     .catch((error) => {
       console.log("Error:", error);
     });
 }

module.exports={emit}
