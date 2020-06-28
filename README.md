# A simplified Jira clone built with Angular 9 and Akita

> Phase 2 will be started very soon with a lot of exciting features: GraphQL, Authentication, and more.

I got the motivation from the similar clone app written in `React`/`VueJS`. And I thought **Why not Angular**? So here you go. It is a simplified Jira clone built with Angular 9.

It is an example of a **modern**, **real-world** Angular codebase. Working on this project helped me to strengthen my knowledge about Angular.

## Working application

Check out the **live demo** -> https://jira.trungk18.com

![Jira clone built with Angular 9 and Akita][demo]

If you like my work, feel free to:

- [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)][tweet] about Angular Jira clone
- :star: this repository. It will make both of us happy :)

Thanks for visiting and your support :)

[tweet]: https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Ftrungk18%2Fjira-clone-angular&text=Awesome%20Jira%20clone%20app%20built%20with%20Angular%209%20and%20Akita&hashtags=angular,akita,typescript

## Who is it for 🤷‍♀️

I have been working with Angular for about four years. I built cool stuff at [Zyllem][zyllem] but almost all of them are internal apps which is difficult to show.

This is a showcase application I've built in my spare time to experiment the new library that I wanted to try before: `Akita`, `TailwindCSS`, `ng-zorro`.

There are many Angular examples on the web but most of them are way too simple. I like to think that this codebase contains enough complexity to offer valuable insights to Angular developers of all skill levels while still being _relatively_ easy to understand.

---

This application is a part of our technical series [angular-vietnam/100-days-of-angular][100days] with a clear target: after 100 days of learning Angular through with us, **everyone can build the application at the same scale**. We also want to bring Angular to a **broader** developer community in Vietnam.

[zyllem]: https://www.zyllem.com/

## Tech stack

![Tech logos][stack]

- [Angular CLI][cli]
- [Akita][akita] state management
- [NestJS][nestjs]
- UI modules:
  - [TailwindCSS][tailwind]
  - Angular CDK [drag and drop][cdkdrag]
  - [ng-zorro][ng-zorro] UI component: `tooltip`, `dropdown`, `select`, `icon`
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

## Features and Roadmap

I set the tentative deadline to motivate myself to finish it on time. Otherwise, It will take forever to complete :)

### Phase 1 - Angular application and simple Nest API

> June 13 - 27, 2020

- [x] Proven, scalable, and easy to understand project structure
- [x] Simple drag and drop kanban board
- [x] Add/update issue
- [x] Search/filtering issues
- [x] Add comments

> Noted: All of your interactions with data such as a comment or change the issue detail will not be saved to the persistent database. Currently, the application will serve a fixed structure of data every time you open the app. It means if you reload the browser, all of your changes will be gone.
>
> Phase 2 will bring you a proper API where you can log in and save your work.

While working with this application, I have the opportunity to revisit some of the interesting topics:

- TailwindCSS configuration - that's awesome
- Scrollable layout with Flexbox
- Deploy Angular application to Netlify

I will take two weeks break to continue working with the [typescript-data-structures][typescript-dsa] repo.

[typescript-dsa]: https://github.com/trungk18/typescript-data-structures

### Phase 2

> July 10 - 25, 2020

- [ ] GraphQL API and store data on the actual database
- [ ] Authentication
- [ ] Websocket realtime update
- [ ] Interactive report

## Time spending

I built it as the side project so It usually took longer than expected. One day, my team and I were fire fighting on PROD until 11 PM. After taking a shower, I continue with Angular Jira clone for another two hours...

According to waka time report, I have spent about 45 hours working on this project. Which is equivalent to watch the [whole Stranger Things series twice][stranger].

I enjoyed working on this project. The interactive kanban board took me sometimes, it is challenging but exciting at the same time.

[stranger]: [https://www.bingeclock.com/s/stranger-things/]

![Jira clone built with Angular 9 and Akita - Time spending][time]

## What's currently missing?

There are missing features from the live demo which should exist in a real product. All of them will be finished on Phase 2:

### Proper backend API

I built a very simple NestJS API to send a fixed data structure to the client. All of your interactivity with data will only be saved on the memory. If you refresh the page, it will be gone. Phase 2 will bring the application to live by saving the data into a database.

### Proper authentication system 🔐

I am currently sending a fixed email and a random password to the server to get the current user back. Phase 2 will also bring a proper authentication system.

### Accessibility ♿

Not all components have properly defined [aria attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA), visual focus indicators, etc.

## Setting up development environment 🛠

- `git clone https://github.com/trungk18/jira-clone-angular.git`
- `cd jira-clone-angular`
- `npm run install-dependencies`
- `npm run start:back` for the API
- `npm run start:front` for angular web application
- App should now be running on `http://localhost:4200/`

### Unit/Integration tests 🧪

I skipped writing test for this project. I might do it for the proper backend GraphQL API.

## Author: Trung Vo ✍️

- A young and passionate front-end engineer. Working with Angular and TypeScript. Like photography, running, cooking, and reading books.
- Personal blog: https://trungk18.com/
- Say hello: trungk18 [et] gmail [dot] com

## Contributing

If you have any ideas, just [open an issue][issues] and tell me what you think.

If you'd like to contribute, please fork the repository and make changes as you'd like. [Pull requests][pull] are warmly welcome.

## Credits

Inspired by [oldboyxx/jira_clone][oldboyxx] and [Datlyfe/jira_clone][datlyfe]

## License

Feel free to use my code on your project. It would be great if you put a reference to this repository.

[MIT](https://opensource.org/licenses/MIT)

[oldboyxx]: https://github.com/oldboyxx/jira_clone
[datlyfe]: https://github.com/Datlyfe/jira_clone
[stack]: frontend/src/assets/img/jira-clone-tech-stack.png
[demo]: frontend/src/assets/img/jira-clone-angular-demo-trungk18.gif
[time]: frontend/src/assets/img/time-spending.png
[issues]: https://github.com/trungk18/jira-clone-angular/issues/new
[pull]: https://github.com/trungk18/jira-clone-angular/compare
[100days]: https://github.com/angular-vietnam/100-days-of-angular
