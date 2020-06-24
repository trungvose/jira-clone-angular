# A simplified Jira clone built with Angular 9 and Akita

> It is still <u>under development</u>. I am planning to build it in about two weeks (13 - 27 Jun 2020) in my spare time. After finished Phase 1 coding , I will gradually publish a series of tutorial how I built it from scratch.

This project is basically a clone of another open source Jira clone build in `React` and `VueJS` (you could say `a clone of a clone application` I know). I though it would be a great candidate of a modern, real-world Angular codebase and it really helps me to strengthen my knowledge about Angular.

I like working with interactive UI because it is challenging, but also very exciting.

## Working application

Check out the live demo at - https://jira.trungk18.com/

--> SCREENSHOT GIF

If you like my work, feel free to:

- [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)][tweet] about Angular Jira clone
- And :star: this repository

Thanks for visiting and your support :)

[tweet]: https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Ftrungk18%2Fjira-clone-angular&text=Awesome%20Jira%20clone%20app%20built%20with%20Angular%209%20and%20Akita&hashtags=angular,akita,typescript

## Who is it for 🤷‍♀️

I do Angular development and this is a showcase product I've built in my spare time to experiment the new library that I wanted to try before: `Akita`, `TailwindCSS`, `ng-zorro`.

There are many showcase/example Angular projects out there but most of them are way too simple. I like to think that this codebase contains enough complexity to offer valuable insights to Angular developers of all skill levels while still being _relatively_ easy to understand.

## Tech stack

![Tech logos][stack]

- Angular CLI
- Akita state management
- NestJS
- UI modules:
  - TailwindCSS
  - Angular CDK drag and drop
  - ng-zorro UI component: `tooltip`, `dropdown`, `icon`
  - ngx-quill
- Netlify
  
## Features and Roadmap

I built it as the side project so It usually took longer than expected. One day, my team and I did the fire fighting on PROD until 11PM. After taking shower, I continue with Angular Jira clone for another two hours...

I set the tentative deadline to motivate myself to finish it on time. Otherwise, It will take forever to finish :)

### Phase 1 - Angular application and simple Nest API

> June 13 - 27, 2020

- [x] Proven, scalable, and easy to understand project structure
- [x] Simple drag and drop kanban board
- [x] Add/update issue
- [x] Search/filtering issues
- [ ] Comments

> Noted: All of your interaction with data will not be save to the persistent database. Currently, the application will serve a fixed structure of data everytime you open the app, or on a full browser refresh. Phase 2 will bring you a proper API where you can login and save your work.

During working with this application, I have the opportunity to revisit some of the interesting topic:

- TailwindCSS configuration - that's awesome
- Scrollable layout with Flexbox
- Deploy Angular application to Netlify

### Phase 2

> July 1 - 15, 2020

- [ ] GraphQL API and store data on the actual database
- [ ] Authentication
- [ ] Websocket realtime update
- [ ] Interactive report

## What's currently missing?

There are features missing from the live demo which should exist in a real product and should be finished on Phase 2:

### Proper backend API

I am currently using a `json` file for storing data on the backend. I am planning to write a graphQL API soon in order to learn more about that.

### Proper authentication system 🔐

I am currently auto create an auth token and seed a project with issues and users for anyone who visits the API without valid credentials. In a real product you have to to implement a proper [email and password authentication system](https://www.google.com/search?q=email+and+password+authentication+node+js&oq=email+and+password+authentication+node+js).

### Accessibility ♿

Not all components have properly defined [aria attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA), visual focus indicators etc. Most early stage companies tend to ignore this aspect of their product but in many cases they shouldn't, especially once their users starts growing.

## Setting up development environment 🛠

- `git clone https://github.com/trungk18/jira-clone-angular.git`
- `cd jira-clone-angular`
- `npm run install-dependencies`
- `cd frontend && npm start`
- App should now be running on `http://localhost:4200/`

### Unit/Integration tests 🧪

I skipped writing test for this project. I might do it for the proper backend GraphQL API.

## Author: Trung Vo ✍️

- A young and passionate front-end engineer. Working with Angular and TypeScript. Like photography, running, cooking and reading book.
- Personal blog: https://trungk18.com/
- Say hello: trungk18 [et] gmail [dot] com

## Contributing

If you have any ideas, just [open an issue][issues] and tell me what you think.

If you'd like to contribute, please fork the repository and make changes as you'd like. [Pull requests][pull] are warmly welcome.

## Credits

Inspired by [oldboyxx/jira_clone][oldboyxx] and [Datlyfe/jira_clone][datlyfe]

## License

Feel free to use my code on your personal project. It would be great if you put a reference to this repository.

[MIT](https://opensource.org/licenses/MIT)

[oldboyxx]: https://github.com/oldboyxx/jira_clone
[datlyfe]: https://github.com/Datlyfe/jira_clone
[stack]: https://github.com/trungk18/jira-clone-angular/raw/master/frontend/src/assets/img/jira-clone-tech-stack.png
[issues]: https://github.com/trungk18/jira-clone-angular/issues/new
[pull]: https://github.com/trungk18/jira-clone-angular/compare
