import jwt from "jsonwebtoken";
const secretWord = "ab333jh3ahj3bab3abd3a3a";

const generateToken = (user) => {
  const token = jwt.sign(
    {
      name: user.firstName,
      _id: user._id,
      birthDate: user.birthDate,

      role: user.role,
    },
    secretWord,
  );
  return token;
};

const verifyToken = (tokenFromClient) => {
  try {
    const userDataFromPayload = jwt.verify(tokenFromClient, secretWord);

    return userDataFromPayload;
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };
