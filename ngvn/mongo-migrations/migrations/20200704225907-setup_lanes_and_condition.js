module.exports = {
  async up(db, client) {
    const [projectsCollection, projectIssuesCollection] = await Promise.all([
      db.collection('projects'),
      db.collection('project-issues'),
    ]);

    const projects = await projectsCollection.find({}).toArray();

    /**
     * Backlog = 'Backlog',
     Selected = 'Selected',
     InProgress = 'InProgress',
     Done = 'Done',
     */

    for (const project of projects) {
      const issues = await projectIssuesCollection.find({ _id: { $in: project.issues } }).toArray();
      const lanes = ['Backlog', 'Selected', 'InProgress', 'Done'].map((status) => ({
        title: status,
        conditions: [
          {
            issueField: 'status',
            value: status,
            operand: 'eq',
          },
        ],
        issues: issues.filter((issue) => issue.status === status).map((issue) => issue._id),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        __v: 0,
      }));
      await projectsCollection.updateOne({ _id: project._id }, { $set: { lanes } });
    }
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
