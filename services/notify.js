const PushNotifications = require("@pusher/push-notifications-server");

const emit = (stream,title,body,link)=>{

   let beamsClient = new PushNotifications({
     instanceId: "d3fef753-d608-4c0b-8b9c-879e7c9e44eb",
     secretKey:process.env.BEAMS,
   });

   beamsClient
     .publishToInterests([stream], {
       web: {
         notification: {
           title: title,
           body: body,
           deep_link: link,
         },
       },
     })
     .then((publishResponse) => {
       console.log("Just published:", publishResponse.publishId);
     })
     .catch((error) => {
       console.log("Error:", error);
     });
 }

module.exports={emit}
