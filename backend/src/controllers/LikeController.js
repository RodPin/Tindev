const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    console.log(req.io, req.connectedUsers);
    const {devId} = req.params;
    const {user} = req.headers;
    const loggedDev = await Dev.findById(user);
    try {
      const targetDev = await Dev.findById(devId);
      if (targetDev.likes.includes(loggedDev._id)) {
        const loggedSocketUser = req.connectedUsers[user];
        const targetSocketUser = req.connectedUsers[devId];

        //warning the users if they match,only if they are onli
        //we need to use a database to warn then if they are offline
        if (loggedSocketUser) {
          req.io.to(loggedSocketUser).emit('match', targetDev);
        }
        if (targetSocketUser) {
          req.io.to(targetSocketUser).emit('match', loggedDev);
        }
      }
      loggedDev.likes.push(targetDev._id);
      await loggedDev.save();
      return res.json(loggedDev);
    } catch (err) {
      return res.status(400).json({error: 'Dev does not exist'});
    }
  }
};
