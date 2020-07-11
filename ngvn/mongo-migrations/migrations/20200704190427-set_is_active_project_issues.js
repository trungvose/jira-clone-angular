module.exports = {
  async up(db, client) {
    await db.collection('projects').updateMany({}, { $set: { isActive: true } });
    await db.collection('project-issues').updateMany({}, { $set: { isActive: true } });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
