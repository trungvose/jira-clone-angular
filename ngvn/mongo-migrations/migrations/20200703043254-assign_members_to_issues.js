const userEmails = [
  'trung_vo@mailinator.com',
  'iron_man@mailinator.com',
  'captain@mailinator.com',
  'thor@mailinator.com',
  'spider_man@mailinator.com',
];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

module.exports = {
  async up(db, client) {
    const [usersCollection, projectIssuesCollection] = await Promise.all([
      db.collection('users'),
      db.collection('project-issues'),
    ]);

    const populatedUsers = await usersCollection.find({ email: { $in: userEmails } }).toArray();
    await projectIssuesCollection.updateMany(
      {},
      {
        $set: { reporter: populatedUsers[4]._id },
        $push: { participants: populatedUsers[4]._id },
      },
    );

    const populatedIssues = await projectIssuesCollection.find({}).toArray();

    for (const populatedIssue of populatedIssues) {
      let randomIndex = getRandomIntInclusive(0, 4);
      while (randomIndex === 4) {
        randomIndex = getRandomIntInclusive(0, 4);
      }

      await projectIssuesCollection.updateOne(
        { _id: populatedIssue._id },
        { $push: { participants: populatedUsers[randomIndex]._id } },
      );
    }
  },

  async down(db, client) {
    await db.collection('project-issues').updateMany({}, { $set: { reporter: null, participants: [] } });
  },
};
