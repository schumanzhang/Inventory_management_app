## Simple APIs for inventory management system for shopping centres

This set of APIs enables the user to perform CRUD operations on shopping centres under management, as well as the advertising assets within those shopping centres.

### Prerequisites

1) Install node.js
2) Install mongodb 
3) Start mongodb, create two databases called inventory_app and inventory_app_test
    use inventory_app
    use inventory_app_test

### Running the APIs

1) Navigate to the /api directory
2) npm install
3) npm start

### Running the tests

1) Navigate to the /api directory
2) npm test

### Endpoints

All endpoints require a user-id-token in the header. Valid user-id-tokens are 5448320 and 8046270. This is to simulate an authentication system. 

#### GET api/shopping/objects 

Retrieves all shopping centres

#### GET api/shopping/objects/:id

Retrieves the shopping centre given the unique ID

#### POST api/shopping/objects

Creates a new shopping centre
Sample request body:
{
    "name": "Westfields",
    "address": 19 Ramsay St,
    "assets": ['a', 'b']
}

#### PUT api/shopping/objects/:id

Updates a shopping centre given unique ID
Sample request body:
{
    "name": "Bunnings",
    "address": 19 Ramsay St,
    "assets": ['a', 'b']
}

#### DELETE api/shopping/objects/:id

Deletes a shopping centre given the unique ID


#### GET api/assets/objects 

Retrieves all assets

#### GET api/assets/objects/:id

Retrieves all assets given a unique ID

#### GET api/assets/search/:shopping?/:status?/:name?

Performs search operation on assets, search by shopping centre name, and status and asset name. Parameters optional.

#### POST api/assets/objects

Creates a new asset
Sample request body:
{	
	"name": "hello",
	"dimensions": [139, 245],
	"location": "2nd shop Level 5",
	"shopping": "IGA",
    "status": false
}

#### PUT api/assets/objects/:id

Updates an asset given unique ID
Sample request body:
{	
	"name": "hello",
	"dimensions": [139, 245],
	"location": "2nd shop Level 5",
	"shopping": "IGA",
    "status": true
}

#### DELETE api/assets/objects/:id

Deletes an asset given the unique ID


