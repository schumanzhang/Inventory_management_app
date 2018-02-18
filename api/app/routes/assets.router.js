import Assets from './../models/assets.model';
import mongoose from 'mongoose';

export function assetsRoutes(app, router) {

    router.route('/assets/objects')
    .get((req, res, next) => {
        Assets.find({}).exec().then((objects) => {
            res.json(objects);
        }).catch((err) => {
            res.status(500).json({error: 'Unable to get objects', body: err});
        });
    });

    router.route('/assets/objects/:id')
    .get((req, res, next) => {
        const id = req.params.id;
        Assets.findOne({_id: id}).then((object) => {
            res.json(object);
        }).catch((err) => {
            res.status(500).json({error: 'Unable to get object', body: err});
        });
    });

    router.route('/assets/search/:shopping?/:status?/:name?')
    .get((req, res, next) => {
        const searchParams = req.params;
        let searchQuery = {};

        for (let key in searchParams) {
            if ((key === 'name' || key === 'shopping' || key === 'status') && typeof searchParams[key] !== 'undefined') {
                searchQuery[key] = searchParams[key];
            }
        }

        Assets.find(searchQuery).then((objects) => {
            res.json(objects);
        }).catch((err) => {
            res.status(500).json({error: 'Unable to get object(s)', body: err});
        });
    });

    router.route('/assets/objects')
    .post((req, res, next) => {
        let user = req.headers['user-id-token'];
        let asset = new Assets(
            { 
                name: req.body.name, 
                dimensions: req.body.dimensions,
                location: req.body.location, 
                shopping: req.body.shopping,
                status: req.body.status,
                lastChanged: parseInt(user)
            });

            asset.save().then(() => {
            res.status(201).json({msg: 'Created asset successfully'});
        }).catch((err) => {
            res.status(500).json({error: 'Cannot create object', body: err});
        });
    });

    router.route('/assets/objects/:id')
    .put((req, res, next) => {
        let user = req.headers['user-id-token'];
        const id = req.params.id;
        Assets.findOneAndUpdate({ _id: id}, 
            { $set: { 
                name: req.body.name, 
                dimensions: req.body.dimensions,
                location: req.body.location, 
                shopping: req.body.shopping,
                status: req.body.status,
                lastChanged: parseInt(user)
            }}, 
            {upsert: true})
            .then(() => {
                res.status(200).json({msg: 'Updated asset'});
            }, (err) => {
                res.status(500).json({error: 'Unable to update object', body: err});
            });
    });

    router.route('/assets/objects/:id')
    .delete((req, res, next) => {
        const id = req.params.id;
        Assets.findByIdAndRemove({_id: id}).then(() => {
            res.status(200).json({msg: 'Deleted'});
        }, (err) => {
            res.status(500).json({error: 'Something went wrong', body: err});
        });
    });
}