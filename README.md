# A simplified Jira clone app built with Angular 9 and Akita

> It is still <u>under development</u>. I am planning to build it in about two weeks (13 - 27 Jun 2020) in my spare time. After finished coding, I will gradually publish a series of tutorial how I built it from scratch.

This project is basically a clone of another open source Jira clone build in `React` and `VueJS` (you could say `a clone of a clone application` I know). I though it would be a great candidate of a modern, real-world Angular codebase and it really helps me to strengthen my knowledge about Angular.

I like working with interactive UI because it is challenging, but also very exciting.

## Working application

- https://jira.trungk18.com/

If you like my work, feel free to:

- [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)][tweet] about Angular Jira clone
- And :star: this repository

Thanks for visiting and your support :)

[tweet]: https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Ftrungk18%2Fjira-clone-angular&text=Awesome%20Jira%20clone%20app%20built%20with%20Angular%209%20and%20Akita&hashtags=angular,akita,typescript

## What is this and who is it for 🤷‍♀️

I do Angular development and this is a showcase product I've built in my spare time to experiment the new library that I wanted to try before: `Akita`, `TailwindCSS`, `ng-zorro`.

There are many showcase/example Angular projects out there but most of them are way too simple. I like to think that this codebase contains enough complexity to offer valuable insights to Angular developers of all skill levels while still being _relatively_ easy to understand.

## Technology

![Tech logos][stack]

- Project setup with Angular CLI
- Use Akita state management
- TailwindCSS
- ng-zorro UI component: `tooltip`, `select`, `icon`

## Features

- Proven, scalable, and easy to understand project structure
- Simple drag and drop kanban board
- Search/filtering issues
- Add/update issue
- Comments

## What's missing?

There are features missing from this showcase product which should exist in a real product:

### Proper backend API

I am currently using a `json` file for storing data. I am planning to write a graphQL API soon in order to learn more about that.

### Proper authentication system 🔐

I am currently auto create an auth token and seed a project with issues and users for anyone who visits the API without valid credentials. In a real product you have to to implement a proper [email and password authentication system](https://www.google.com/search?q=email+and+password+authentication+node+js&oq=email+and+password+authentication+node+js).

### Accessibility ♿

Not all components have properly defined [aria attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA), visual focus indicators etc. Most early stage companies tend to ignore this aspect of their product but in many cases they shouldn't, especially once their users starts growing.

## Setting up development environment 🛠

- `git clone https://github.com/trungk18/jira-clone-angular.git`
- `npm run install-dependencies`
- `cd frontend && npm start`
- App should now be running on `http://localhost:4200/`

### Unit/Integration tests 🧪

I skipped writing test for this project. I will do it for the backend API.

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

You are free to use my code on your personal project. It would be great if you put a reference to this repository.

[MIT](https://opensource.org/licenses/MIT)

[oldboyxx]: https://github.com/oldboyxx/jira_clone
[datlyfe]: https://github.com/Datlyfe/jira_clone
[stack]: https://github.com/trungk18/jira-clone-angular/raw/master/frontend/src/assets/img/jira-clone-tech-stack.png
[issues]: https://github.com/trungk18/jira-clone-angular/issues/new
[pull]: https://github.com/trungk18/jira-clone-angular/compare
