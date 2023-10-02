/* We need 2 functions: 
- Check username and email is duplicated
- Check role existed or not
*/

checkDuplicateUsernameOrEmail = (req, res, next) => {
  next();
};

checkRoleExisted = (req, res, next) => {
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRoleExisted: checkRoleExisted,
};

module.exports = verifySignUp;
