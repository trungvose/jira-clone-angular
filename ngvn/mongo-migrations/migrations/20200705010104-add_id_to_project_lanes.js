const { Types } = require('mongoose');

module.exports = {
  async up(db, client) {
    const projectsCollection = await db.collection('projects');
    const projects = await projectsCollection.find({}).toArray();

    for (const project of projects) {
      await projectsCollection.updateOne({ _id: project._id }, { $set: { 'lanes.$[]._id': Types.ObjectId() } });
    }
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
