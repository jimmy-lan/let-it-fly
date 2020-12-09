# LetItFly Project

> Author: Jimmy Lan
>
> Last Updated: Oct 21, 2020

Let It Fly is an anonymous platform for people to send messages
("paper cranes") to each other.
This is a course project for CSC309.
Team members: **Jimmy Lan** ([@lanyanxiang](https://github.com/lanyanxiang)),
**Brady Huai**([@BradyHuai](https://github.com/BradyHuai)), **Michael Liu**([@michaelliutt](https://github.com/michaelliutt)), **Xiao Sun**([@chsx258](https://github.com/chsx258)).

## Documentation

Please find a menu of documentation here: [Documentation Menu](/docs)/.

## Marking Guide for TA and Professor

- [Phase 1](/docs/marking/phase1.md)

## Project Setup

If you are new to this project, please follow [this setup guide](/docs/setup) to run
a development copy of the project on your machine.

## Contributing

Please follow our workflow when contributing to the codebase.
A typical workflow and important conventions will be briefly introduced here.

### Branch Naming Convention

Please come up with 4 unique characters (using your name as a starting point is recommended) and add them
to the beginning of your branch name. Following the 4 characters with a `/` character, then add the feature
that you are working on in this branch. For example, `lany/set-up` would be a good branch name.

For the second part of the branch name (i.e. after the `/` character), use the following prefixes:

- `bugfix-` for fixing a bug
- `hotfix-` for hot fixes
- `release-` for release branches

If you are naming a feature branch, do not add a prefix to the branch name.

### Pull Requests

Because this project was initially setup by CSC309 course team, we have no access to settings where we can
implement CI/CD or change the default branch. Therefore, we will eliminate `develop` branch and allow everyone
to merge directly into the `master` branch.

Before you merge your branch, please create a pull request. This way, your code can potentially be reviewed by
other people, and so the overall code quality may be improved.

### Writing Documentation

Please write documentation when needed for your components. The folder `/docs` is used for more detailed
documentation files.

---

**Have fun!**
