import request from 'supertest';
import { expect } from 'chai';
import server from '../index';
import utils from '../helpers/commons';

const testUser = {
  id: 1,
  email: 'drogba@gmail.com',
  firstName: 'Didier',
  lastName: 'Drogba',
  password: utils.hashPassword('didier321'),
  phoneNumber: '08124354643',
  address: 'ruxton street alagbado lagos',
  isAdmin: true,
};

const userToken = utils.jwtToken(testUser);

describe('Update Property Data and also mark as SOLD if not available', () => {
  describe('test PATCH /api/v1/property/:id', () => {
    it('should not update property data if property id does not exist', (done) => {
      request(server)
        .patch('/api/v1/property/5')
        .send({
          city: 'Ogbomosho',
        })
        .set('Authorization', userToken)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
    it('should not update property data if token is invalid', (done) => {
      request(server)
        .patch('/api/v1/property/1')
        .send({
          city: 'Ogbomosho',
        })
        .set('Authorization', 'user123')
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
  });
  describe('test PATCH /api/v1/property/:id/sold', () => {
    it('should not mark property data as sold if property id does not exist', (done) => {
      request(server)
        .patch('/api/v1/property/11/sold')
        .set('Authorization', userToken)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
    it('should not mark property data as sold if token is invalid', (done) => {
      request(server)
        .patch('/api/v1/property/11/sold')
        .set('Authorization', 'rty')
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
  });
});
