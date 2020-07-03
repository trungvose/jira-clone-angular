const { v4 } = require('uuid');
const { genSalt, hash } = require('bcrypt');

const systemAdminEmail = 'system.admin@jcngvn.com';
const systemAdminPassword = process.env.MIGRATE_SYSTEM_ADMIN_PASSWORD;
module.exports = {
  async up(db, client) {
    const usersCollection = await db.collection('users');

    await usersCollection.updateMany({}, { $set: { isSystemAdmin: false } });

    const user = {
      firstName: 'System',
      lastName: 'Admin',
      email: systemAdminEmail,
      isActive: true,
      isSystemAdmin: true,
      refreshTokenId: v4(),
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
    };
    const salt = await genSalt(10);
    user.password = await hash(systemAdminPassword, salt);
    await usersCollection.insertOne(user);
  },

  async down(db, client) {
    const usersCollection = await db.collection('users');
    await usersCollection.deleteOne({ email: systemAdminEmail });
    await usersCollection.updateMany({}, { $unset: { isSystemAdmin: '' } });
  },
};
