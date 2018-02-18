process.env.NODE_ENV = 'test';

require('babel-register')({
    presets: [ 'es2015' ]
});

let mongoose = require('mongoose');
let Assets = require('../app/models/assets.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.conf');
let should = chai.should();

chai.use(chaiHttp);

describe('Assets', () => {

    beforeEach((done) => {
        Assets.remove({}, (err) => { 
           done();         
        });
    });
  
    describe('/GET asset', () => {
        it('it should fail if valid user ID is not sent', (done) => {
            chai.request(server)
            .get('/api/assets/objects')
            .end((err, res) => {
                res.should.have.status(401);
              done();
            });
        });
        it('it should GET all the assets', (done) => {
            chai.request(server)
            .get('/api/assets/objects')
            .set('user-id-token', '8046270')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    describe('/GET/:id asset', () => {
        it('it should get one shopping centre', (done) => {
            let asset = new Assets({
                name: 'alpha', 
                dimensions: [128, 128],
                location: '2nd shop level 2', 
                shopping: 'Westfields',
                status: true
            });

            asset.save((err, object) => {
                chai.request(server)
                .get('/api/assets/objects/' + asset.id)
                .set('user-id-token', '8046270')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('_id').eql(asset.id);
                    done();
                });
            })
        });
    });

    describe('/GET/:shopping?/:status?/:name? asset', () => {
        it('it should retrieve the asset', (done) => {
            let asset = new Assets({
                name: 'alpha', 
                dimensions: [128, 128],
                location: '2nd shop level 2', 
                shopping: 'Westfields',
                status: true
            });

            asset.save((err, object) => {
                chai.request(server)
                .get('/api/assets/search/Westfields')
                .set('user-id-token', '8046270')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(1);
                    res.body[0].should.have.property('_id').eql(asset.id);
                    done();
                });
            })
        });
        it('it should return nothing', (done) => {
            let asset = new Assets({
                name: 'alpha', 
                dimensions: [128, 128],
                location: '2nd shop level 2', 
                shopping: 'Westfields',
                status: true
            });

            asset.save((err, object) => {
                chai.request(server)
                .get('/api/assets/search/Bunnings')
                .set('user-id-token', '8046270')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(0);
                    done();
                });
            })
        });
    });

    describe('/POST asset', () => {
        it('it should not post an asset without a name', (done) => {
            let postObj = {
                dimensions: [128, 128],
                location: '2nd shop level 2', 
                shopping: 'Westfields',
                status: true
            };

            chai.request(server)
            .post('/api/assets/objects')
            .set('user-id-token', '8046270')
            .send(postObj)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.have.property('error');
                done();
            });
        });

        it('it should post an asset', (done) => {
            let postObj = {
                name: 'beta',
                dimensions: [128, 128],
                location: '2nd shop level 2', 
                shopping: 'Westfields',
                status: true
            };

            chai.request(server)
            .post('/api/assets/objects')
            .set('user-id-token', '8046270')
            .send(postObj)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('msg').eql('Created asset successfully');
                done();
            });
        });
    });

    describe('/PUT asset', () => {
        it('it should update a shopping centre given the id', (done) => {
            let asset = new Assets({
                name: 'alpha', 
                dimensions: [128, 128],
                location: '2nd shop level 2', 
                shopping: 'Westfields',
                status: true
            });

            let postObj = {
                name: 'beta',
                dimensions: [128, 128],
                location: '2nd shop level 2', 
                shopping: 'Westfields',
                status: false
            };

            asset.save((err, res) => {
                chai.request(server)
                .put('/api/assets/objects/' + asset.id)
                .set('user-id-token', '8046270')
                .send(postObj)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('msg').eql('Updated asset');
                    done();
                });
            });
        });
    });

    describe('/DELETE asset', () => {
        it('it should delete a shopping centre given the id', (done) => {
            let asset = new Assets({
                name: 'alpha', 
                dimensions: [128, 128],
                location: '2nd shop level 2', 
                shopping: 'Westfields',
                status: true
            });

            asset.save((err, res) => {
                chai.request(server)
                .delete('/api/assets/objects/' + asset.id)
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
