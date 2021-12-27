import User from '../models/user.model.js';
import hashPassword from './helpers/hashPassword.js';
import comparePasswords from './helpers/comparePasswords.js';
import jwt from 'jsonwebtoken';

class UsersController {
  async signup(req, res) {
    console.log('The wreques body', req.body);
    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({
          error: true,
          message: 'email is already in use',
        });
      }

      user = req.body;

      const hashedPassword = await hashPassword(req.body.password);
      user.password = hashedPassword;
      user = new User(req.body);

      await user.save();

      return res.status(201).send(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message: 'Cannot Sign up',
      });
    }
  }

  async login(req, res) {
    try {
      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({
          error: true,
          message: 'Account not found',
        });
      }

      const isValid = await comparePasswords(req.body.password, user.password);

      if (!isValid) {
        return res.status(400).json({
          error: true,
          message: 'Invalid password',
        });
      }

      const user1 = {
        // id: 1,
        // name: 'Muhammad Faisal',
        email: req.body.email,
        isAuthenticated: true,
      };
      const token = jwt.sign(user1, process.env.JWT_KEY);
      return res.json({
        user1,
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message: "Couldn't login. Please try again.",
      });
    }
  }
}

export default UsersController;
