const allAccess = (req, res) => {
  res.status(200).send('Public content.');
};

const userBoard = (req, res) => {
  res.status(200).send('User content.');
};

const moderatorBoard = (req, res) => {
  res.status(200).send('Moderator content.');
};

const adminBoard = (req, res) => {
  res.status(200).send('Admin content.');
};

module.exports = {
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
};
