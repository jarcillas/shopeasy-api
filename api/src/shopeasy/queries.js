const getUsers = 'SELECT * FROM users';

const getUserById = 'SELECT * FROM users WHERE id = $1';

const checkEmailExists = 'SELECT u FROM users u WHERE u.email = $1';

const addUser =
  'INSERT INTO users (name, email, age, dob) VALUES ($1, $2, $3, $4)';

const updateUserName = 'UPDATE users SET name = $2 WHERE id = $1';

const removeUser = 'DELETE FROM users WHERE id = $1';

module.exports = {
  getUsers,
  getUserById,
  checkEmailExists,
  addUser,
  updateUserName,
  removeUser,
};
