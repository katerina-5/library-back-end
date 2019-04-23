module.exports = {
  getBase
};

function getBase(req, res, next) {
  res.send('ToReadList REST API.\nThis is a home page.');
}
