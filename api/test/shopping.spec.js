process.env.NODE_ENV = 'test';

require('babel-register')({
    presets: [ 'es2015' ]
});

let mongoose = require('mongoose');
let ShoppingCentre = require('../app/models/shopping.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.conf');
let should = chai.should();

chai.use(chaiHttp);

describe('Shopping Centre', () => {

    beforeEach((done) => {
        ShoppingCentre.remove({}, (err) => { 
           done();         
        });
    });
  
    describe('/GET Shopping Centre', () => {
        it('it should fail if valid user ID is not sent', (done) => {
            chai.request(server)
            .get('/api/shopping/objects')
            .end((err, res) => {
                res.should.have.status(401);
              done();
            });
        });
        it('it should GET all the shopping centres', (done) => {
            chai.request(server)
            .get('/api/shopping/objects')
            .set('user-id-token', '8046270')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    describe('/GET/:id Shopping Centre', () => {
        it('it should get one shopping centre', (done) => {
            let shoppingCentre = new ShoppingCentre({
                name: 'Westfields',
                address: '33 Mary St Penrith',
                assets: ['A', 'B', 'C', 'D']
            });

            shoppingCentre.save((err, object) => {
                chai.request(server)
                .get('/api/shopping/objects/' + shoppingCentre.id)
                .set('user-id-token', '8046270')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('_id').eql(shoppingCentre.id);
                    done();
                });
            })
        });
    });

    describe('/POST Shopping Centre', () => {
        it('it should not post a shopping centre without an address', (done) => {
            let postObj = {
                name: 'Westfields',
                assets: ['A', 'B', 'C', 'D']
            };

            chai.request(server)
            .post('/api/shopping/objects')
            .set('user-id-token', '8046270')
            .send(postObj)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.have.property('error');
                done();
            });
        });

        it('it should post a shopping centre', (done) => {
            let postObj = {
                name: 'Westfields',
                address: '33 Mary St Penrith',
                assets: ['A', 'B', 'C', 'D']
            };

            chai.request(server)
            .post('/api/shopping/objects')
            .set('user-id-token', '8046270')
            .send(postObj)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('msg').eql('Created shopping centre successfully');
                done();
            });
        });
    });

    describe('/PUT Shopping Centre', () => {
        it('it should update a shopping centre given the id', (done) => {
            let shoppingCentre = new ShoppingCentre({
                name: 'Westfields',
                address: '33 Mary St Penrith',
                assets: ['A', 'B', 'C', 'D'],
                lastChanged: 5448320
            });

            let postObj = {
                name: 'Westfields',
                address: '33 Mary St Penrith',
                assets: ['F', 'G', 'D', 'B']
            };

            shoppingCentre.save((err, res) => {
                chai.request(server)
                .put('/api/shopping/objects/' + shoppingCentre.id)
                .set('user-id-token', '8046270')
                .send(postObj)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('msg').eql('Updated shopping centre');
                    done();
                });
            });
        });
    });

    describe('/DELETE Shopping Centre', () => {
        it('it should delete a shopping centre given the id', (done) => {
            let shoppingCentre = new ShoppingCentre({
                name: 'Westfields',
                address: '33 Mary St Penrith',
                assets: ['A', 'B', 'C', 'D'],
                lastChanged: 5448320
            });

            shoppingCentre.save((err, res) => {
                chai.request(server)
                .delete('/api/shopping/objects/' + shoppingCentre.id)
                .set('user-id-token', '8046270')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('msg').eql('Deleted');
                    done();
                });
            });
        });
    });

});
