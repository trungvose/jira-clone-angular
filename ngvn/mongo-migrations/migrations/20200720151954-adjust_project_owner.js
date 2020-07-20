module.exports = {
  async up(db, client) {
    const [projectsCollection, permissionsCollection, usersCollection] = await Promise.all([
      db.collection('projects'),
      db.collection('permissions'),
      db.collection('users'),
    ]);

    const projects = await projectsCollection.find({}).toArray();
    for (const project of projects) {
      for (const userId of project.users) {
        const user = await usersCollection.findOne({ _id: userId });
        const hasPermission = await permissionsCollection.countDocuments(
          {
            _id: { $in: user.permissions },
            projectId: project._id,
            privilege: 15,
          },
          { limit: 1 },
        );
        if (hasPermission > 0) {
          project.owner = [userId];
          project.users = project.users.filter((u) => u !== userId);
          break;
        }
      }
      await projectsCollection.updateOne({ _id: project._id }, { $set: project });
    }
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
