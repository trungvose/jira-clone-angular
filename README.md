# A simplified Jira clone built with Angular 9 and Akita

<h3 align="center">
  <a href="https://jira.trungk18.com/">Visit the app</a> |
  <a href="hhttps://github.com/trungk18/jira-clone-angular/tree/master/frontend">View front-end code</a>
</h3>

It is still <u>under development</u>. I am planning to build it in about two weeks (13 - 27 Jun 2020) in my spare time. In the meantime, I will gradually publish a series of tutorial how I built it from scratch.

Thanks for visiting.

![Tech logos][stack]

## What is this and who is it for 🤷‍♀️

I do Angular development and this is a showcase product I've built in my spare time. It's a very good example of modern, real-world Angular codebase.

There are many showcase/example Angular projects out there but most of them are way too simple. I like to think that this codebase contains enough complexity to offer valuable insights to Angular developers of all skill levels while still being _relatively_ easy to understand.

## Features

- Proven, scalable, and easy to understand project structure
- All code are written in TypeScript
- Project setup with Angular CLI
- Use Akita state management
- Use TailwindCSS

## Setting up development environment 🛠

- `git clone https://github.com/trungk18/jira-clone-angular.git`
- `npm run install-dependencies`
- `cd frontend && npm start`
- App should now be running on `http://localhost:4200/`

## What's missing?

There are features missing from this showcase product which should exist in a real product:

### Proper backend API

I am currently using a `json` file for storing data. I am planning to write a graphQL API soon in order to learn more about that.

### Proper authentication system 🔐

I am currently auto create an auth token and seed a project with issues and users for anyone who visits the API without valid credentials. In a real product you have to to implement a proper [email and password authentication system](https://www.google.com/search?q=email+and+password+authentication+node+js&oq=email+and+password+authentication+node+js).

### Accessibility ♿

Not all components have properly defined [aria attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA), visual focus indicators etc. Most early stage companies tend to ignore this aspect of their product but in many cases they shouldn't, especially once their userbase starts growing.

### Unit/Integration tests 🧪

I only write test for some functions and skipped the end to end testing.

## Author: Trung Vo ✍️

- Website: https://trungk18.com/

## Contributing

I will not be accepting PR's on this repository. Feel free to fork and maintain your own version.

## Credits

Insprited by [oldboyxx/jira_clone] and [Datlyfe/jira_clone][Datlyfe]

## License

[MIT](https://opensource.org/licenses/MIT)
[oldboyxx]: https://github.com/oldboyxx/jira_clone
[Datlyfe]: https://github.com/Datlyfe/jira_clone
[stack]: https://github.com/trungk18/jira-clone-angular/raw/master/frontend/src/assets/img/jira-clone-tech-stack.png
