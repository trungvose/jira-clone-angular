module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    const [projectsCollection, permissionsCollection] = await Promise.all([
      db.collection('projects'),
      db.collection('permissions'),
    ]);

    const projectPermissions = await permissionsCollection
      .find({
        $and: [{ type: 'Project' }, { $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }] }],
      })
      .toArray();

    for (const projectPermission of projectPermissions) {
      const project = await projectsCollection.findOne({ _id: projectPermission.projectId });
      await permissionsCollection.updateOne({ _id: projectPermission._id }, { $set: { projectSlug: project.slug } });
    }
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
