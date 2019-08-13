//for APIS: axios , axios is async
const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
  async index(req, res) {
    const {user} = req.headers;
    try {
      const loggedDev = await Dev.findById(user);
      const users = await Dev.find({
        $and: [
          {
            _id: {$ne: user}
          },
          {
            _id: {$nin: loggedDev.likes}
          },
          {
            _id: {$nin: loggedDev.dislikes}
          }
        ]
      });
      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  },
  async store(req, res) {
    const {username} = req.body;

    const userExists = await Dev.findOne({user: username});

    if (userExists) {
      Dev.remove({user: username});
    }
    const response = await axios.get('https://api.github.com/users/' + username);
    const {name, bio, avatar_url: avatar} = response.data;
    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    });
    return res.json(dev);
  }
};
