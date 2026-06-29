import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
async function copyDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const adminDb = client.db().admin();
    const { databases } = await adminDb.listDatabases();
    const dbNames = databases.map((db) => db.name);

    if (!dbNames.includes('HRCore-Main')) {
      console.log('❌ Database HRCore-Main not found.');
      return;
    }

    console.log('📦 Found HRCore-Main. Copying data to HRCore-Staging...');

    const sourceDb = client.db('HRCore-Main');
    const targetDb = client.db('HRCore-Staging');

    const collections = await sourceDb.listCollections().toArray();

    for (const { name: collectionName } of collections) {
      const sourceCollection = sourceDb.collection(collectionName);
      const targetCollection = targetDb.collection(collectionName);

      // Drop the target collection to avoid _id conflicts
      await targetCollection.drop().catch(() => {});
      console.log(`🧹 Dropped target collection: ${collectionName}`);

      const documents = await sourceCollection.find().toArray();

      if (documents.length > 0) {
        const chunkSize = 1000;
        for (let i = 0; i < documents.length; i += chunkSize) {
          const chunk = documents.slice(i, i + chunkSize);
          await targetCollection.insertMany(chunk, { ordered: false });
        }

        console.log(
          `✅ Copied ${documents.length} documents into ${collectionName}`,
        );
      } else {
        console.log(`⚠️ No documents found in ${collectionName}`);
      }
    }

    console.log('🎉 Database copy completed successfully (IDs preserved).');
  } catch (error) {
    console.error('❌ Error copying database:', error);
  } finally {
    await client.close();
    console.log('🔒 MongoDB connection closed.');
  }
}

copyDatabase();
