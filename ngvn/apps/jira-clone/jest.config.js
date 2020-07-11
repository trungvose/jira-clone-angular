module.exports = {
  name: 'jira-clone',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/jira-clone',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
