import express from 'express';
import createPropertyAd from '../controllers/CreatePropertyAdController';
// import updatePropertyData from '../controllers/UpdatePropertyDataController';
import specificPropertyAdvert from '../controllers/GetPropertyAdController';
import deletePropertyAdvert from '../controllers/DeletePropertyController';
import authentication from '../middlewares/verifications';

const propertyRoute = express.Router();

propertyRoute.get('/property/:id', specificPropertyAdvert);
propertyRoute.post('/property', authentication, createPropertyAd);
// propertyRoute.patch('/property/:id', authentication, updatePropertyData);
propertyRoute.delete('/property/:id', authentication, deletePropertyAdvert);

export default propertyRoute;
