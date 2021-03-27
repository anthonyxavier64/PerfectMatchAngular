# PerfectMatchStudent

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

*********************************************************************************************************************************************************************************

Frontend tech stack:
1. JSF with PrimeFaces
2. Angular

Backend tech stack:
1. MySQL database
2. Enterprise Java Beans

Instructions to run application
1. ng serve
2. Go to browser: localhost:4200

Code styling
1. Use tab spaces
2. To auto-format in VScode, use alt-shift-f
3. Leave an empty line between methods
4. Camel case for variable and method names

**First time pulling Angular App**
1. Run "npm install" to install node modules
2. Run above command in the Angular Application directory

**Important**
1. When adding new features, do it on a new branch first
2. Name the branch something like this: anthony/registration_feature
3. Then after completed, create a pull request and if no conflict, merge with main branch
4. This is to avoid merge conflicts as much as possible

**How to use git branch**
1. Create local branch: git branch *name*/*branch name*
2. Checkout to newly create branch: git checkout *name*/*branch name*
3. Push local branch to github and set local branch to track remote branch: git push --set-upstream origin *name*/*branch name*

**WHEN PUSHING TO GITHUB**
1. Make sure you are pushing to the correct branch
2. Check which branch your local branch is tracking: git branch -vv
3. Safe method to push to correct branch: git push origin *name*/*branch name*:*name*/*branch name*, where name and branch name is the same to the left and right of the colon
