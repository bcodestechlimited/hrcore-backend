/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('HrCore');

// Search for documents in the current collection.
// db.getCollection('vouchers')
//   .find(
//     {
//         approvedBy: ObjectId('64f08c496574010cb1ce7e5e')
//       /*
//       * Filter
//       * fieldA: value or expression
//       */
//     },
//     {
//       /*
//       * Projection
//       * _id: 0, // exclude _id
//       * fieldA: 1 // include field
//       */
//     }
//   )
//   .sort({
//     /*
//     * fieldA: 1 // ascending
//     * fieldB: -1 // descending
//     */
//   });

// update all vouchers with approvedBy = ObjectId('64f08c496574010cb1ce7e5e') to approvedBy = ObjectId("653fb83ad966163f75c87137")
db.getCollection('vouchers').updateMany(
    { approvedBy: ObjectId('64f08c496574010cb1ce7e5e') },
    { $set: { approvedBy: ObjectId("653fb83ad966163f75c87137") } }
);
