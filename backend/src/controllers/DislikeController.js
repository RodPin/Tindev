const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const {devId} = req.params;
    const {user} = req.headers;
    const loggedDev = await Dev.findById(user);
    try {
      const targetDev = await Dev.findById(devId);

      loggedDev.dislikes.push(targetDev._id);
      await loggedDev.save();
      return res.json(loggedDev);
    } catch (err) {
      return res.status(400).json({error: 'Dev does not exist'});
    }
  }
};
