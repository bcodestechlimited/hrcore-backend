/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'HrCore';
const collection = 'companies';

// Create a new database.
use(database);

// Create a new collection.
// db.createCollection(collection);

// add a new company to companies collection
// db.companies.insertOne({
//   name: 'ICS',
//   createdBy: ObjectId('64b7d183a3af43611a768a80'),
//   _id: ObjectId('64b7d25484151e9e5b82332e')
// });

// find all users with the company = 64b7d183a3af43611a768a80
const companyId = ObjectId('64b7d25484151e9e5b82332e');
const users = db.users.find({ company: companyId }).toArray()
console.log(users.length);
const usersIds = users.map(user => {
  const {_id} = user;
  return _id;
});
console.log(usersIds);
// update the company staff array
db.companies.updateOne(
  { _id: companyId },
  {
    $set: {
      staff: usersIds,
    },
  }
);




// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
