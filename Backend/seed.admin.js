require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/admin.model');
const connectDB = require('./db/db');

async function seed() {
  await connectDB();

  const existing = await Admin.findOne({ email: 'admin@myzo.com' });
  if (existing) {
    console.log('Admin already exists: admin@myzo.com');
    process.exit(0);
  }

  const password = await Admin.hashPassword('Admin@1234');
  await Admin.create({ name: 'Super Admin', email: 'admin@myzo.com', password, role: 'super_admin' });

  console.log('✅ Admin created successfully!');
  console.log('   Email:    admin@myzo.com');
  console.log('   Password: Admin@1234');
  console.log('   ⚠️  Change the password after first login!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
