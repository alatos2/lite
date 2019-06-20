import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const { SECRET } = process.env;

const utils = {
  /**
     * @description assign token
     * @param {object} payload
     * @returns {object} token
     */
  jwtToken(payload) {
    const token = jwt.sign(payload, SECRET, { expiresIn: '24h' });
    return token;
  },

  /**
   * @description hash password
   * @param {object} password
   * @returns {object} hashPassword
   */
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  },
};

export default utils;
