module.exports = {
  async up(db, client) {
    const [usersCollection, permissionsCollection, projectCollections] = await Promise.all([
      db.collection('users'),
      db.collection('permissions'),
      db.collection('projects'),
    ]);

    const project = await projectCollections.findOne({});
    for (const userId of project.users) {
      const user = await usersCollection.findOne({ _id: userId });
      const permissionToAdd = {
        permissionName: 'project.manage',
        type: 'Project',
        projectId: project._id,
        __t: 'Project',
        __v: 0,
      };
      if (user.email === 'trung_vo@mailinator.com') {
        permissionToAdd.privilege = 15;
      } else {
        permissionToAdd.privilege = 1;
      }
      const { insertedId: permission } = await permissionsCollection.insertOne(permissionToAdd);
      await usersCollection.updateOne({ _id: user._id }, { $push: { permissions: permission } });

      for (const issueId of project.issues) {
        const issuePermissionToAdd = {
          permissionName: 'projectIssue.manage',
          type: 'ProjectIssue',
          projectIssueId: issueId,
          __t: 'ProjectIssue',
          __v: 0,
        };
        if (user.email === 'trung_vo@mailinator.com') {
          issuePermissionToAdd.privilege = 15;
        } else {
          issuePermissionToAdd.privilege = 7;
        }
        const { insertedId: issuePermission } = await permissionsCollection.insertOne(issuePermissionToAdd);
        await usersCollection.updateOne({ _id: user._id }, { $push: { permissions: issuePermission } });
      }
    }
  },

  async down(db, client) {
    const [usersCollection, permissionsCollection, projectCollections] = await Promise.all([
      db.collection('users'),
      db.collection('permissions'),
      db.collection('projects'),
    ]);
    const project = await projectCollections.findOne({});
    for (const userId of project.users) {
      const user = await usersCollection.findOne({ _id: userId });
      const firstPermission = user.permissions[0];
      console.log(firstPermission);
      await usersCollection.updateOne({ _id: user.id }, { $set: { permissions: [firstPermission] } });
    }

    await permissionsCollection.deleteMany({ $or: [{ type: 'Project' }, { type: 'ProjectIssue' }] });
  },
};
