const router = require('express').Router();
const auth= require('../../services/authentication');
const Material = require('./model')
const User = require('../user/model')
const request = require('request')
const email = require('../../services/email')
const cron = require('node-cron')


// cron.schedule('15 */1 * * *',()=>{
//   Material.find().then((materials)=>{
//     User.updateMany({role:'user'},{progress:materials})
//       .then(()=>{console.log('done')})
//       .catch((err)=>{console.log(err)})
//     })
//   })
// })
//Create
router.post('/new', auth.auth, auth.permission(['manager']),async (req, res) => {
  // req = JSON.stringify(req.body)
  req=req.body
  console.log(req[0])
  req.shift()
  console.log(req[0])
  await Material.insertMany(req)
      .then(()=>{
        return res.status(201).json({
          message: 'Material saved',
          success: true
        });
      })
      .catch((err)=>{
        console.log(err)
        return res.status(500).json({
          message: `Material creation unsuccessful: ${err}`,
          success: false
        });
      })

});

    router.post('/update',auth.auth, auth.permission(['manager']),async (req,res)=>{
      await Material.findOneAndUpdate(req.body.filter,req.body.data)
          .then(()=>{
            return res.status(201).json({
              message: 'Material updated',
              success: true
            });
          })
          .catch((err)=>{
            return res.status(500).json({
              message: `Material failed to update: ${err}`,
              success: false
            });
          })
    })

    //Get
    router.get('/all', async (req, res) => {
      // console.log('get all Materials...',req.query)
      let data = await Material.find(req.query?req.query.filter:{})
      return res.status(201).json({
        data: data,
        message: 'Materials List',
        success: true
      });
    });

module.exports = router;
