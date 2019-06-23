import moment from 'moment';
import properties from '../models/property';

const specificPropertyAdvert = (req, res) => {
  const { id } = req.params;

  const foundProperty = properties.find(property => property.id === id);

  if (!foundProperty) {
    return res.status(400).json({
      status: 400,
      error: 'Property Id does not exist',
    });
  }

  return res.status(200).json({
    status: 200,
    data: {
      id,
      status: foundProperty.status,
      type: foundProperty.type,
      state: foundProperty.state,
      city: foundProperty.city,
      address: foundProperty.address,
      price: foundProperty.price,
      created_on: foundProperty.created_on,
      image_url: foundProperty.imageUrl,
    },
  });
};

export default specificPropertyAdvert;
