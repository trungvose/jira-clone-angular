# A simplified Jira clone built with Angular, Akita and ng-zorro

> Phase two will not be completed as planned. Both [Chau Tran][chau] and I was too busy with some other commitments. View our [working in progress Graph QL branch][gql].
>
> You can check the storybook collection of components I wrote for Jira Clone ➡ [jira-storybook.trungk18.com](https://jira-storybook.trungk18.com/) 📕
>
> Thanks for your continuous support. Stay tuned! :muscle:

There have been a handful of cool Jira-cloned apps written in `React`/`VueJS`, which makes me wonder **Why not Angular**? And here you go.

This is not only a simplified Jira clone built with Angular, but also an example of a **modern**, **real-world** Angular codebase.

## Merry Christmas

Thank you for your support! -> https://jira.trungk18.com/project/issue/2020

![Jira clone built with Angular and Akita][christmas2020]

## Working application

Check out the **live demo** -> https://jira.trungk18.com

![Jira clone built with Angular and Akita][demo]

## Storybook

### What is Storybook

Storybook helps you build UI components in isolation from your app's business logic, data, and context.
That makes it easy to develop hard-to-reach states. Save these UI states as **stories** to revisit during development, testing, or QA.

### Jira Clone Storybook

This is the collection of components that I wrote for [jira.trungk18.com][jira], includes:

- Avatar
- Breadcrumbs
- Button
- Input
- More to come...

Check out the **storybook demo** -> https://jira-storybook.trungk18.com/

![Jira clone built with Angular and Akita][demo-storybook]

## Support

If you like my work, feel free to:

- ⭐ this repository. And we will be happy together :)
- [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)][tweet] about Angular Jira clone
- <a title="Thanks for your support!" href="https://www.buymeacoffee.com/tuantrungvo" target="_blank"><img src="https://res.cloudinary.com/dvujyxh7e/image/upload/c_thumb,w_140,g_face/v1596378474/default-orange_uthxgz.jpg" alt="Buy Me A Coffee"></a>

Thanks a bunch for stopping by and supporting me!

[tweet]: https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Ftrungk18%2Fjira-clone-angular&text=Awesome%20Jira%20clone%20app%20built%20with%20Angular%209%20and%20Akita&hashtags=angular,akita,typescript
## Who is it for 🤷‍♀️

I have been working with Angular for about four years. I built cool stuff at [Zyllem][zyllem] but almost all of them are internal apps which is difficult to show.

This is a showcase application I've built in my spare time to experiment the new library that I wanted to try before: `Akita`, `TailwindCSS`, `ng-zorro`.

There are many Angular examples on the web but most of them are way too simple. I like to think that this codebase contains enough complexity to offer valuable insights to **Angular developers of all skill levels** while still being _relatively_ easy to understand.

---

This piece of work is also part of our technical series [angular-vietnam/100-days-of-angular][100days] which aims at enabling everyone, after 100 days of learning Angular with us, to **self-build their application with the similar scale**. Our desire is to advocate and grow the Angular developer community in Vietnam.

[zyllem]: https://www.zyllem.com/

## Tech stack

![Tech logos][stack]

- [Angular CLI][cli]
- [Akita][akita] state management
- [NestJS][nestjs]
- UI modules:
  - [TailwindCSS][tailwind]
  - Angular CDK [drag and drop][cdkdrag]
  - [ng-zorro][ng-zorro] UI component: `tooltip`, `modal`, `select`, `icon` and more.
  - [ngx-quill][quill]
- [Netlify][netlify]
- [Heroku][heroku]

[cli]: https://cli.angular.io/
[akita]: https://datorama.github.io/akita/
[nestjs]: https://nestjs.com/
[tailwind]: https://tailwindcss.com/
[cdkdrag]: https://material.angular.io/cdk/drag-drop/overview
[ng-zorro]: https://ng.ant.design/docs/introduce/en
[quill]: https://github.com/KillerCodeMonkey/ngx-quill
[netlify]: https://www.netlify.com/
[heroku]: https://www.heroku.com/

## High level design

As requested by [@eric_cart][eric_cart], I draw a simple high-level design for the application.

### Application architecture

I have an AppModule that will import:

![Jira clone built with Angular and Akita - Application architecture][application-architecture]

- Angular needed modules such as `BrowserModule` and any module that need to run `forRoot`.
- The application core modules such as `AuthModule` that need to available on the whole platform.
- And I also configured the router to [lazy load any modules][lazy-load] only when I needed. Otherwise, everything will be loaded when I start the application.
  For instance, `LoginModule` when I open the URL at `/login` and `ProjectModule` when the URL is `/project`. Inside each modules, I could import whatever modules that are required. Such as I need the `JiraControlModule` for some custom UI components for the `ProjectModule`

### Simple data interaction flow

As I am using [Akita][akita] state management, I follow the Akita documentation for the data flow. I found it is simple to understand comparing with ngrx terms (`reducer`, `selector`, `effect`)

![Jira clone built with Angular and Akita - Simple data interaction flow][interaction-data-flow]

I set up a [project state with initial data][project-store]. The main heavy lifting part I think is the [project service][project-service], it contains all the interacting with [project store][project-store]. Such as after fetching the project successfully, I update the store immediately inside the service itself. The last lego block was to expose the data through [project query][project-query]. Any components can start to inject [project query][project-query] and consume data from there.

If you are using ngrx, you have to dispatch an action when you started fetching the project, and then there is an effect somewhere that was detached from your context need to handle the action, send a request to the API server. And finally, the effect will tell whether the data was successfully fetched or not. <u>There is nothing wrong with ngrx approach</u>, it is just too much concept and layer that you need to understand. To be honest, I used to afraid of integrating ngrx in my project because of the unnecessary complexity it would bring.

## Features and Roadmap

I set the tentative deadline for motivating myself to finish the work on time. Otherwise, It will take forever to complete :)

### Phase 1 - Angular application and simple Nest API

> June 13 - 27, 2020

- [x] Proven, scalable, and easy to understand project structure
- [x] Simple drag and drop kanban board
- [x] Add/update issue
- [x] Search/filtering issues
- [x] Add comments

> Noted: All of your interactions with data such as leave a comment or change the issue detail will not be saved to the persistent database. Currently, the application will serve a fixed structure of data every time you open the app. It means if you reload the browser, all of your changes will be gone.
>
> Phase 2 will bring you a proper API where you can log in and save your work.

While working with this application, I have the opportunity to revisit some of the interesting topics:

- TailwindCSS configuration - that's awesome
- Scrollable layout with Flexbox
- Deploy Angular application to Netlify

I will take two weeks break to:

- Fix bugs and UI enhancements for Angular Jira clone.
- Continue working with the [typescript-data-structures][typescript-dsa] repo.

[typescript-dsa]: https://github.com/trungk18/typescript-data-structures

### Phase 2

> TBD

- [ ] Refactor the mono repo to use Nx Workspace
- [ ] GraphQL API and store data on the actual database
- [ ] Authentication

View the current [work in progress branch][gql]

## Tutorial

When I look at the application, it is huge. When the task is huge, you usually don't know where and how to start working with them. I started to break the big task into a [simple to-do list on notion][todo-list]. Once I know what needs to be done, what I need is to follow the plan. That's my approach.

I learned a lot of stuff. I know you might also have a curiosity about the process of building the same scale app as well. That's why I am writing a tutorial series on how I built Angular Jira clone from scratch. I hope you guys will learn something from that too :)

I will try to be as detailed as possible. Hopefully through the tutorial, you will get the idea and will start working on your own application soon. Please bear with me.

Its series will also be published in Vietnamese as part of our [angular-vietnam/100-days-of-angular][100days].

| Part | Description                                                                     | Status |
| ---- | ------------------------------------------------------------------------------- | ------ |
| 00   | [Behind the 900 stars repository - Slide][part-1]                               | Done   |
| 00   | [Behind a thousand stars repository - Angular Air][part-1-video]                | Done   |
| 00   | [Prerequisites][part00]                                                         | Done   |
| 01   | [Create a new repository and set up a new Angular application with CLI][part01] | Done   |
| 02   | [Build the application layout with flex and TailwindCSS][part02]                | Done   |
| 03   | [Setup Akita state management][part03]                                          | Done   |
| 04   | [Build an editable textbox][part04]                                             | Done   |
| 05   | [Build an interactive drag and drop board][part05]                              | Done   |
| 06   | [Build a markdown text editor][part06]                                          | Done   |
| 07   | [Build a rich text HTML editor][part07]                                         | Done   |
| 08   | [Create placeholder loading (like Facebook's cards loading)][part08]            | Done   |

[part-1]: https://slides.com/tuantrungvo/behind-the-900-star-repository-jira-clone-angular
[part-1-video]: https://youtu.be/3dukbsRX0tc
[part00]: https://trungk18.com/experience/angular-jira-clone-tutorial-00-prerequisites/
[part01]: https://trungk18.com/experience/angular-jira-clone-tutorial-01-planning-and-set-up/
[part02]: https://trungk18.com/experience/angular-jira-clone-tutorial-02-application-layout-tailwindcss-flex/
[part03]: https://trungk18.com/experience/angular-jira-clone-tutorial-03-akita-state-management/
[part04]: https://trungk18.com/experience/angular-jira-clone-tutorial-04-editable-textbox/
[part05]: https://trungk18.com/experience/angular-jira-clone-tutorial-05-interactive-drag-and-drop-board/
[part06]: https://trungk18.com/experience/angular-jira-clone-tutorial-06-angular-markdown-text-editor/
[part07]: https://trungk18.com/experience/angular-jira-clone-tutorial-07-rich-text-editor/
[part08]: https://trungk18.com/experience/angular-jira-clone-tutorial-08-angular-placeholder-loading/
[todo-list]: https://www.notion.so/trungk18/Tasks-636be5c5c0dd4d8cab30808e4e41facc

## Time spending

It is a side project that I only spent time outside of the office hours to work on. One day, my team and I were fire fighting on PROD until 11 PM. After taking a shower, I continue with Angular Jira clone for another two hours...

According to waka time report, I have spent about 45 hours working on this project. Which is equivalent to watch the [whole Stranger Things series twice][stranger].

I really enjoyed working on this project. The interactive kanban board took me sometimes, it is challenging but exciting at the same time.

![Jira clone built with Angular and Akita - Time spending][time]

## What's currently missing?

There are missing features from the live demo which should exist in a real product. All of them will be finished on Phase 2:

### Proper authentication system 🔐

I am currently sending the same email and a random password to the server without any check to get the current user back. Phase 2 will also bring a proper authentication system.

### Accessibility ♿

Not all components have properly defined [aria attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA), visual focus indicators, etc.

## Setting up development environment 🛠

- `git clone https://github.com/trungk18/jira-clone-angular.git`
- `cd jira-clone-angular`
- `npm start` for angular web application
- The app should run on `http://localhost:4200/`

### Unit/Integration tests 🧪

I skipped writing test for this project. I might do it for the proper backend GraphQL API.

## Compatibility

It was being tested on IE 11, Chrome and Firefox. For Safari, there are some minor alignment issues.

## Author: Trung Vo ✍️

- A young and passionate front-end engineer. Working with Angular and TypeScript. Like photography, running, cooking, and reading books.
- Personal blog: https://trungk18.com/
- Say hello: trungk18 [et] gmail [dot] com

## Contributing

If you have any ideas, just [open an issue][issues] and tell me what you think.

If you'd like to contribute, please fork the repository and make changes as you'd like. [Pull requests][pull] are warmly welcome.

## Credits

Inspired by [oldboyxx/jira_clone][oldboyxx] and [Datlyfe/jira_clone][datlyfe].

I reused part of the HTML and CSS code from these projects.

## License

Feel free to use my code on your project. It would be great if you put a reference to this repository.

[MIT](https://opensource.org/licenses/MIT)

[jira]: http://jira.trungk18.com/
[oldboyxx]: https://github.com/oldboyxx/jira_clone
[datlyfe]: https://github.com/Datlyfe/jira_clone
[stack]: src/assets/img/jira-clone-tech-stack.png
[demo]: src/assets/img/jira-clone-angular-demo-trungk18.gif
[christmas2020]: src/assets/img/merry-christmas-2020.gif
[demo-storybook]: src/assets/img/jira-storybook.gif
[time]: src/assets/img/time-spending.png
[issues]: https://github.com/trungk18/jira-clone-angular/issues/new
[pull]: https://github.com/trungk18/jira-clone-angular/compare
[100days]: https://github.com/angular-vietnam/100-days-of-angular
[stranger]: https://www.bingeclock.com/s/stranger-things/
[eric_cart]: https://www.reddit.com/r/Angular2/comments/hj4kxd/angular_jira_clone_application_built_akita_and/fwu1tbm/
[application-architecture]: src/assets/img/diagram/application-architecture.png
[interaction-data-flow]: src/assets/img/diagram/interaction-data-flow.png
[project-store]: src/app/project/state/project/project.store.ts
[project-service]: src/app/project/state/project/project.service.ts
[project-query]: src/app/project/state/project/project.query.ts
[lazy-load]: https://angular.io/guide/lazy-loading-ngmodules
[chau]: https://github.com/nartc
[tiep]: https://github.com/tieppt
[gql]: https://github.com/trungk18/jira-clone-angular/tree/feature/gql
