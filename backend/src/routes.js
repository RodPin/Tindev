const express = require('express');
const routes = express.Router();
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
//Get,post,edit,delete
// routes.get('/', (req, res) => {
//   //getting name as the param of HTTP req
//   const URLparam = req.query.name;
//   //   return res.send('Hello ' + URLparam);
//   return res.json({name: 'hello ' + URLparam});
// });

routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);

module.exports = routes;
