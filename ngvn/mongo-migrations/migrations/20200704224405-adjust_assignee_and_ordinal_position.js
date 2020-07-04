module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    const projectIssuesCollection = await db.collection('project-issues');
    const projectIssues = await projectIssuesCollection.find({}).toArray();
    for (let i = 0; i < projectIssues.length; i++) {
      const projectIssue = projectIssues[i];
      await projectIssuesCollection.updateOne(
        { _id: projectIssue._id },
        {
          $set: {
            ordinalPosition: i + 1,
            assignee: null,
          },
          $unset: {
            assignees: '',
          },
        },
      );
    }
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
