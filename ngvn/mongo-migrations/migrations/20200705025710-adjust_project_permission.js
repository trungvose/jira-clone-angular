module.exports = {
  async up(db, client) {
    const [permissionsCollection, usersCollection, projectsCollection] = await Promise.all([
      db.collection('permissions'),
      db.collection('users'),
      db.collection('projects'),
    ]);

    const { insertedId } = await permissionsCollection.insertOne({
      permissionName: 'project.manage',
      privilege: 2,
      type: 'System',
      __t: 'System',
      __v: 0,
    });

    await permissionsCollection.updateMany({}, { $set: { updatedAt: new Date(), createdAt: new Date() } });

    const project = await projectsCollection.findOne({});
    await usersCollection.updateMany({ _id: { $in: project.users } }, { $push: { permissions: insertedId } });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
