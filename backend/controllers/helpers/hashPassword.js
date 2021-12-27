import bccrypt from 'bcryptjs';

const hashPassword = async (password) => {
  try {
    const salt = await bccrypt.genSalt(10);

    return await bccrypt.hash(password, salt);
  } catch (error) {
    throw new Error('Hashing Failed', error);
  }
};
export default hashPassword;
