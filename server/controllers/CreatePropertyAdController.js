import moment from 'moment';
import validations from '../middlewares/validations';
import pool from '../models/database';
import { addProperty } from '../models/queries';

/**
 * @function createPropertyAd
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */

const createPropertyAd = (req, res) => {
  try {
    const {
      status, price, state, city, address, type, imageUrl,
    } = req.body;

    const {
      id,
    } = req.decode;

    const result = validations.validateCreatePropertyAd(req.body);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return res.status(400).json({
        status: 400,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }

    const propertyData = {
      owner: id,
      status,
      price,
      state,
      city,
      address,
      type,
      createdOn: moment().format(),
      imageUrl,
    };

    pool.connect((err, client, done) => {
      client.query(addProperty(propertyData), (error, result) => {
        done();
        if (error) {
          if (error.code === '23505') {
            res.status(400).json({
              status: 400,
              error: 'An error has occured!',
            });
          }
        }

        const property = result.rows[0];

        return res.status(201).json({
          status: 201,
          data: [{
            id: property.id,
            status: property.status,
            type: property.type,
            state: property.state,
            city: property.city,
            address: property.address,
            price: property.price,
            createdOn: propertyData.createdOn,
            imageUrl: propertyData.imageUrl,
          }],
        });
      });
    });
  } catch (e) {
    return res.status(500).json({ status: 500, error: 'Server Error' });
  }
};

export default createPropertyAd;
