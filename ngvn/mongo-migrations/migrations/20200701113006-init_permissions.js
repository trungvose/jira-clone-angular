module.exports = {
  async up(db, client) {
    const [permissionsCollection, usersCollection] = await Promise.all([
      db.collection('permissions'),
      db.collection('users'),
    ]);

    await permissionsCollection.deleteMany({});

    const permissionNames = ['user.self', 'user.manage'];
    for (const permission of permissionNames) {
      for (const privilege of [1, 3, 7, 15]) {
        await permissionsCollection.insertOne({
          permissionName: permission,
          privilege,
          type: 'System',
          __t: 'System',
          __v: 0,
        });
      }
    }

    const selfReadPermission = await permissionsCollection.findOne({ permissionName: 'user.self', privilege: 1 });
    await usersCollection.updateMany({}, { $set: { permissions: [selfReadPermission._id] } });
  },

  async down(db, client) {
    await db.collection('permissions').deleteMany({});
    await db.collection('users').updateMany({}, { $set: { permissions: [] } });
  },
};
