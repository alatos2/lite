import uuid from 'uuid';
import users from '../models/users';

class AuthController {
  static signUp(req, res) {
    const {
      email, firstName, lastName, password, confirmPassword, phoneNumber, address, isAdmin,
    } = req.body;

    const userData = {
      id: uuid.v4(),
      Email: email,
      first_name: firstName,
      last_name: lastName,
      Password: password,
      phone_number: phoneNumber,
      Address: address,
      IsAdmin: isAdmin,
    };

    users.push(userData);

    return res.status(201).json({
      status: 201,
      data: {
        email: userData.Email,
      },
    });
  }
}

export default AuthController;
