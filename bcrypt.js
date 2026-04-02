import bcrypt from "bcryptjs";

const generatePassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};
export { comparePassword, generatePassword };
