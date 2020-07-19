const express = require('express');
const router = express.Router();

/* GET users listing. */
router
.get('/', (req, res, next)=> {
  res.send('respond with a resource');
})
.get('/cool', (req,res,next)=>{
  res.send("So Cool");
});

module.exports = router;
