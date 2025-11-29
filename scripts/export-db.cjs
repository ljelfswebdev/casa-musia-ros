// scripts/export-db.cjs
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || '';

if (!uri) {
  console.error('❌ MONGODB_URI not set in .env.local');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(uri, { bufferCommands: false });
    const db = mongoose.connection.db;

    console.log('✅ Connected to MongoDB for EXPORT');
    const dbName = db.databaseName;
    const collections = await db.listCollections().toArray();

    if (!collections.length) {
      console.log('ℹ No collections found to export.');
      process.exit(0);
    }

    const output = {
      database: dbName,
      exportedAt: new Date().toISOString(),
      collections: [],
    };

    for (const coll of collections) {
      const name = coll.name;
      console.log(`⬇ Exporting collection: ${name}`);
      const docs = await db.collection(name).find({}).toArray();
      output.collections.push({
        name,
        count: docs.length,
        documents: docs,
      });
      console.log(`   → ${docs.length} docs`);
    }

    const outPath = path.join(process.cwd(), 'db-backup.json');
    fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');

    console.log('');
    console.log('🎉 Export complete!');
    console.log(`📄 File written: ${outPath}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Export failed:', err);
    process.exit(1);
  }
})();