// scripts/import-db.cjs
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || '';

if (!uri) {
  console.error('❌ MONGODB_URI not set in .env.local');
  process.exit(1);
}

const backupPath = path.join(process.cwd(), 'db-backup.json');

if (!fs.existsSync(backupPath)) {
  console.error(`❌ Backup file not found at: ${backupPath}`);
  console.error('   Make sure you ran `npm run export-db` first or copied the file in.');
  process.exit(1);
}

(async () => {
  try {
    const raw = fs.readFileSync(backupPath, 'utf8');
    const backup = JSON.parse(raw);

    if (!backup.collections || !Array.isArray(backup.collections)) {
      throw new Error('Backup file format invalid – missing "collections" array');
    }

    await mongoose.connect(uri, { bufferCommands: false });
    const db = mongoose.connection.db;
    console.log('✅ Connected to MongoDB for IMPORT');
    console.log(`📄 Importing from: ${backupPath}`);
    console.log(`🗄  Backup DB name: ${backup.database || '(unknown)'}`);
    console.log('');

    for (const coll of backup.collections) {
      const name = coll.name;
      const docs = coll.documents || [];
      console.log(`⬆ Importing collection: ${name}`);

      const collection = db.collection(name);

      // wipe collection first
      const delRes = await collection.deleteMany({});
      console.log(`   🧹 Deleted ${delRes.deletedCount} existing docs`);

      if (docs.length) {
        const insertRes = await collection.insertMany(docs);
        console.log(`   ✅ Inserted ${insertRes.insertedCount} docs`);
      } else {
        console.log('   (no documents in backup for this collection)');
      }
    }

    console.log('');
    console.log('🎉 Import complete!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Import failed:', err);
    process.exit(1);
  }
})();