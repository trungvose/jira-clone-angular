module.exports = {
  async up(db, client) {
    const [permissionsCollection, projectsCollection, usersCollection] = await Promise.all([
      db.collection('permissions'),
      db.collection('projects'),
      db.collection('users'),
    ]);

    const { insertedId } = await permissionsCollection.insertOne({
      permissionName: 'projectIssue.manage',
      privilege: 2,
      type: 'System',
      __t: 'System',
      __v: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const project = await projectsCollection.findOne({});
    await usersCollection.updateMany({ _id: { $in: project.users } }, { $push: { permissions: insertedId } });
    for (const userId of project.users) {
      const user = await usersCollection.findOne({ _id: userId });
      if (!user.email.includes('trung_vo')) {
        await permissionsCollection.updateOne(
          {
            _id: { $in: user.permissions },
            permissionName: 'project.manage',
            privilege: 1,
          },
          { $set: { privilege: 5 } }, // 5 = READ + UPDATE
        );
      }
    }
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
