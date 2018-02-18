import ShoppingCentre from './../models/shopping.model';
import mongoose from 'mongoose';

export function shoppingCentreRoutes(app, router) {

    router.route('/shopping/objects')
    .get((req, res, next) => {
        ShoppingCentre.find({}).exec().then((objects) => {
            res.json(objects);
        }).catch((err) => {
            res.status(500).json({error: 'Unable to get objects', body: err});
        });
    });

    router.route('/shopping/objects/:id')
    .get((req, res, next) => {
        const id = req.params.id;
        ShoppingCentre.findOne({_id: id}).then((object) => {
            res.json(object);
        }).catch((err) => {
            res.status(500).json({error: 'Unable to get object', body: err});
        });
    });

    router.route('/shopping/objects')
    .post((req, res, next) => {
        let user = req.headers['user-id-token'];
        let shoppingObject = new ShoppingCentre(
            { 
                name: req.body.name, 
                address: req.body.address, 
                assets: req.body.assets,
                lastChanged: parseInt(user)
            });

        shoppingObject.save().then(() => {
            res.status(201).json({msg: 'Created shopping centre successfully'});
        }).catch((err) => {
            res.status(500).json({error: 'Cannot create object', body: err});
        });
    });

    router.route('/shopping/objects/:id')
    .put((req, res, next) => {
        let user = req.headers['user-id-token'];
        const id = req.params.id;
        ShoppingCentre.findOneAndUpdate({ _id: id}, 
            { $set: { name: req.body.name, address: req.body.address, assets: req.body.assets, lastChanged: parseInt(user)}}, 
            {upsert: true})
            .then(() => {
                res.status(200).json({msg: 'Updated shopping centre'});
            }, (err) => {
                res.status(500).json({error: 'Unable to update object', body: err});
            });
    });

    router.route('/shopping/objects/:id')
    .delete((req, res, next) => {
        const id = req.params.id;
        ShoppingCentre.findByIdAndRemove({_id: id}).then(() => {
            res.status(200).json({msg: 'Deleted'});
        }, (err) => {
            res.status(500).json({error: 'Something went wrong', body: err});
        });
    });
}