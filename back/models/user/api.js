const router = require('express').Router();
const {register, login, auth, serialize, checkRole} = require('../../services/authentication');


//Registration

    //user
    router.post('/new', async (req, res) => {
      await register(req.body,res);
    });


//Login

    //user
    router.post('/login',
          async (req, res) => {
            await login(req.body, res);
          });


//Get Profile
    router.get('/admin_dashboard', async (req, res) => {
      return res.json(serialize(req.user));
    })



module.exports = router;
