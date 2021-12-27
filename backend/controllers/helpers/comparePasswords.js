import bccrypt from 'bcryptjs';

const comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    return await bccrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error('Comparison Failed', error);
  }
};
export default comparePasswords;
