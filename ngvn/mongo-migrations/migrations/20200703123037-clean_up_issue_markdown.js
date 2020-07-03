const modifiedMarkdowns = [
  {
    bodyMarkdown: `
### Create front end and backend folder

-   npm init
-   CLI new application
-   TailwindCSS configuration 
-   WIP Landing Page
-   Build command on the root folder
-   Deploy to Netlify
-   Configure sub domain redirect - Need to retest
-   Configure SVG icon definition
-   Add Google Analytics - IMPORTANT
-   Refactor to module lazy loading
-   Add Akita - [https://datorama.github.io/akita/docs/angular/architecture/#session-feature](https://datorama.github.io/akita/docs/angular/architecture/#session-feature)
-   Tweet Icon
`,
    outputHtml:
      "<h3>Create front end and backend folder</h3><ul><li>npm init</li><li>CLI new application</li><li>TailwindCSS configuration&nbsp;</li><li>WIP Landing Page</li><li>Build command on the root folder</li><li>Deploy to Netlify</li><li>Configure sub domain redirect - Need to retest</li><li>Configure SVG icon definition</li><li>Add Google Analytics - IMPORTANT</li><li>Refactor to module lazy loading</li><li>Add Akita - <a href='https://datorama.github.io/akita/docs/angular/architecture/#session-feature' rel='noopener noreferrer' target='_blank' style='color: inherit;'>https://datorama.github.io/akita/docs/angular/architecture/#session-feature</a></li><li>Tweet Icon</li></ul>",
  },
  {
    bodyMarkdown: `
# No official guide to configure TailwindCSS and Angular**⛏️⛏️**



It took me few hours to try and configure with different option. Also, was confuse when PurgeCSS remove ng-zorro style...



I wrote one myself



[https://trungk18.com/experience/configure-tailwind-css-with-angular/](https://trungk18.com/experience/configure-tailwind-css-with-angular/)
`,
    outputHtml:
      "<h1>No official guide to configure TailwindCSS and Angular<strong>⛏️⛏️</strong></h1><p><br></p><p>It took me few hours to try and configure with different option. Also, was confuse when PurgeCSS remove ng-zorro style...</p><p><br></p><p>I wrote one myself</p><p><br></p><p><a href='https://trungk18.com/experience/configure-tailwind-css-with-angular/' rel='noopener noreferrer' target='_blank'>https://trungk18.com/experience/configure-tailwind-css-with-angular/</a></p><p><br></p>",
  },
  {
    bodyMarkdown: `
Adding comments to an issue is a useful way to record additional detail about an issue, and collaborate with team members. Comments are shown in the **Comments** section when you [view an issue](https://confluence.atlassian.com/jira064/what-is-an-issue-720416138.html).



1.  Open the [issue](https://confluence.atlassian.com/jira064/what-is-an-issue-720416138.html) on which to add your comment.
2.  Click the **Add a comment** button.
3.  In the **Comment** text box, type your comment
4.  Click the **Save** button or the **Enter** key to save the comment.
`,
    outputHtml:
      '<p>Adding comments to an issue is a useful way to record additional detail about an issue, and collaborate with team members. Comments are shown in the&nbsp;<strong>Comments</strong>&nbsp;section when you&nbsp;<a href="https://confluence.atlassian.com/jira064/what-is-an-issue-720416138.html" rel="noopener noreferrer" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(0, 82, 204);">view an issue</a>.</p><p><br></p><ol><li>Open the&nbsp;<a href="https://confluence.atlassian.com/jira064/what-is-an-issue-720416138.html" rel="noopener noreferrer" target="_blank" style="color: rgb(0, 82, 204);">issue</a>&nbsp;on which to add your comment.</li><li>Click the&nbsp;<strong>Add a comment</strong>&nbsp;button.</li><li>In the&nbsp;<strong>Comment</strong>&nbsp;text box, type your comment</li><li>Click the&nbsp;<strong>Save </strong>button or the <strong>Enter </strong>key to save the comment.</li></ol><p><br></p>',
  },
  {
    bodyMarkdown: `
### I will set up a GraphQL endpoint as soon as possible

I am currently using NestJS and storing data on a \`json\` file. I like the idea behind GraphQL, it is the good chance to learn more about that technology.
`,
    outputHtml:
      '<h3>I will set up a GraphQL endpoint as soon as possible</h3><p>I am currently using NestJS and storing data on a <code>json</code> file. I like the idea behind GraphQL, it is the good chance to learn more about that technology.</p>',
  },
  {
    bodyMarkdown: `
## Try assigning this issue to **_Spider Man_**. 🤣 🤣 🤣
`,
    outputHtml:
      "<h2>Try assigning this issue to <strong><em>Spider Man</em></strong>. <span style='color: rgb(51, 51, 51);'>🤣&nbsp;🤣&nbsp;🤣</span></h2>",
  },
  {
    bodyMarkdown: `
## I heard about Akita and would love to try this

Akita is a state management pattern, built on top of RxJS, which takes the idea of multiple data stores from Flux and the immutable updates from Redux, along with the concept of streaming data, to create the Observable Data Stores model.
`,
    outputHtml:
      '<h2>I heard about Akita and would love to try this</h2><p>Akita is a state management pattern, built on top of RxJS, which takes the idea of multiple data stores from Flux and the immutable updates from Redux, along with the concept of streaming data, to create the Observable Data Stores model.</p><p></p>',
  },
  {
    bodyMarkdown: `
## The drag and drop board is not working as I expected

After finishing all the other heavy lifting parts, I will spend sometimes at the end to finalize the DnD. The current behavior is acceptable for now.



_28 June 2020_

After spending about half an hour on that, I found the bug. Basically, I applied the cdkDrag to my component issue-card. _Its height and width was collapsed to 0_. That's why the animation has no effect at all.



I fixed by fixing adding these CSS to the issue-card component.



\`\`\`css
:host {  @apply flex flex-grow;  margin-bottom: 5px;}
\`\`\`
`,
    outputHtml:
      '<h2>The drag and drop board is not working as I expected</h2><p>After finishing all the other heavy lifting parts, I will spend sometimes at the end to finalize the DnD. The current behavior is acceptable for now.</p><p><br></p><p><em>28 June 2020</em></p><p>After spending about half an hour on that, I found the bug. Basically, I applied the cdkDrag to my component issue-card. <em>Its height and width was collapsed to 0</em>. That\'s why the animation has no effect at all.</p><p><br></p><p>I fixed by fixing adding these CSS to the issue-card component.</p><p><br></p><pre><code class="language-css">:host&nbsp;{&nbsp;&nbsp;@apply&nbsp;flex&nbsp;flex-grow;&nbsp;&nbsp;margin-bottom:&nbsp;5px;}</code></pre>',
  },
  {
    bodyMarkdown: `
There have been a handful of cool Jira-cloned apps written in React/VueJS, which makes me wonder **Why not Angular**? And here you go.



This is _not only_ a simplified Jira clone built with Angular 9, but also an example of a _modern, real-world_ Angular codebase.



**Tech stack**



[![Tech logos](https://github.com/trungk18/jira-clone-angular/raw/master/frontend/src/assets/img/jira-clone-tech-stack.png)](https://raw.githubusercontent.com/trungk18/jira-clone-angular/master/frontend/src/assets/img/jira-clone-tech-stack.png)



-   [Angular CLI](https://cli.angular.io/)
-   [Akita](https://datorama.github.io/akita/) state management
-   [NestJS](https://nestjs.com/)
-   UI modules:
-   [TailwindCSS](https://tailwindcss.com/)
-   Angular CDK [drag and drop](https://material.angular.io/cdk/drag-drop/overview)
-   [ng-zorro](https://ng.ant.design/docs/introduce/en) UI component: \`tooltip\`, \`modal\`, \`select\`, \`icon\` and more.
-   [ngx-quill](https://github.com/KillerCodeMonkey/ngx-quill)
-   [Netlify](https://www.netlify.com/)
-   [Heroku](https://www.heroku.com/)
`,
    outputHtml:
      "<p>There have been a handful of cool Jira-cloned apps written in React/VueJS, which makes me wonder <strong>Why not Angular</strong>? And here you go.</p><p><br></p><p>This is <em>not only</em> a simplified Jira clone built with Angular 9, but also an example of a <em>modern, real-world</em> Angular codebase.</p><p><br></p><p><strong>Tech stack</strong></p><p><br></p><p><a href='https://raw.githubusercontent.com/trungk18/jira-clone-angular/master/frontend/src/assets/img/jira-clone-tech-stack.png' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214); background-color: rgb(255, 255, 255);'><img src='https://github.com/trungk18/jira-clone-angular/raw/master/frontend/src/assets/img/jira-clone-tech-stack.png' alt='Tech logos'></a></p><p><br></p><ul><li><a href='https://cli.angular.io/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>Angular CLI</a></li><li><a href='https://datorama.github.io/akita/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>Akita</a>&nbsp;state management</li><li><a href='https://nestjs.com/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>NestJS</a></li><li>UI modules:</li><li class='ql-indent-1'><a href='https://tailwindcss.com/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>TailwindCSS</a></li><li class='ql-indent-1'>Angular CDK&nbsp;<a href='https://material.angular.io/cdk/drag-drop/overview' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>drag and drop</a></li><li class='ql-indent-1'><a href='https://ng.ant.design/docs/introduce/en' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>ng-zorro</a>&nbsp;UI component:&nbsp;<code style='background-color: rgba(27, 31, 35, 0.05);'>tooltip</code>,&nbsp;<code style='background-color: rgba(27, 31, 35, 0.05);'>modal</code>,&nbsp;<code style='background-color: rgba(27, 31, 35, 0.05);'>select</code>,&nbsp;<code style='background-color: rgba(27, 31, 35, 0.05);'>icon</code> and more.</li><li class='ql-indent-1'><a href='https://github.com/KillerCodeMonkey/ngx-quill' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>ngx-quill</a></li><li><a href='https://www.netlify.com/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>Netlify</a></li><li><a href='https://www.heroku.com/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>Heroku</a></li></ul>",
  },
  {
    bodyMarkdown: `
### Hi! My name is Trung.

I’m the only front-end engineer at Zyllem, where I work mostly with Angular to build client side web app. I love thinking about development and user experience.



Find me around the web



-   My blog: [https://trungk18.com/](https://trungk18.com/)
-   [https://github.com/trungk18](https://github.com/trungk18)
-   [https://stackoverflow.com/users/3375906/trungk18](https://stackoverflow.com/users/3375906/trungk18)
`,
    outputHtml:
      "<h3>Hi! My name is Trung.</h3><p>I’m the only front-end engineer at Zyllem, where I work mostly with Angular to build client side web app. I love thinking about development and user experience. </p><br/><p>Find me around the web</p><p><br></p><ul><li>My blog: <a href='https://trungk18.com/' rel='noopener noreferrer' target='_blank'>https://trungk18.com/</a></li><li><a href='https://github.com/trungk18' rel='noopener noreferrer' target='_blank'>https://github.com/trungk18</a></li><li><a href='https://stackoverflow.com/users/3375906/trungk18' rel='noopener noreferrer' target='_blank'>https://stackoverflow.com/users/3375906/trungk18</a></li></ul><p><br></p>",
  },
  {
    bodyMarkdown: `
Old question, but for those who might stumble on it on how to enable angular routing in Netlify.



See the full answer on [stackoverflow](https://stackoverflow.com/a/52312060/3375906).



Create a file \`_redirects\` in your \`src\` folder, add the following to it:



\`\`\`
/*  /index.html 200
\`\`\`
`,
    outputHtml:
      "<p>Old question, but for those who might stumble on it on how to enable angular routing in Netlify. </p><p><br></p><p>See the full answer on <a target='_blank' href='https://stackoverflow.com/a/52312060/3375906'>stackoverflow</a>.</p><p><br></p><p>Create a file <code>_redirects</code> in your <code>src</code> folder, add the following to it:</p><p><br></p><pre><code>/*  /index.html 200</code></pre>",
  },
  {
    bodyMarkdown: `
After searching for an assignee on the list and clear the text, the option label was missing. It could be the bug on the ng-zorro select itself. If you have any idea, feel free to create a pull request.

![Assignee issue](https://raw.githubusercontent.com/trungk18/jira-clone-angular/master/frontend/src/assets/img/assignee-bug.gif)
`,
    outputHtml:
      "After searching for an assignee on the list and clear the text, the option label was missing. It could be the bug on the ng-zorro select itself. If you have any idea, feel free to create a pull request. <br/> <br/><img src='https://raw.githubusercontent.com/trungk18/jira-clone-angular/master/frontend/src/assets/img/assignee-bug.gif' alt='Assignee issue' />",
  },
];

module.exports = {
  async up(db, client) {
    const issues = await db.collection('project-issues').find({}).toArray();
    for (let i = 0; i < issues.length; i++) {
      const issue = issues[i];
      const marked = modifiedMarkdowns[i];
      await db.collection('project-issues').updateOne(
        { _id: issue._id },
        {
          $set: {
            bodyMarkdown: marked.bodyMarkdown,
            outputHtml: marked.outputHtml,
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
