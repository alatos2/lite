import Joi from 'joi';

const validateRegister = (data) => {
  const schema = {
    email: Joi.string().email({ minDomainSegments: 2 }).required().error(_error => ({ message: 'Email is required' })),
    firstName: Joi.string().required().error(_error => ({ message: 'First name is required' })),
    lastName: Joi.string().required().error(_error => ({ message: 'Last name is required' })),
    phoneNumber: Joi.string().required().error(_error => ({ message: 'Phone number is required' })),
    address: Joi.string().required().error(_error => ({ message: 'Address is required' })),
    password: Joi.string().required().error(_error => ({ message: 'Password is required' })),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).options({
      language: {
        any: {
          allowOnly: 'Passwords do not match',
        },
      },
    }),
  };
  return Joi.validate(data, schema);
};

const validations = {
  validateRegister,
};

export default validations;
