# Ng2-Taiga-Task-Activity-Reports

This web-based application works in conjunction with an Agile project management platform called [Taiga](http://taiga.io "Taiga project management platform"). Its purpose is to generate a custom visual report on Taiga tasks on a per-user basis, and includes data analytics such as:

- Estimated hours for a given task
- Actual hours for a given task
- Difference between estimated and actual hours for a given task
- Cumulative differences between estimated and actual hours
- Total estimates hours for all tasks
- Total actual hours for all tasks

This application uses several libraries, including:

-  [Angular Framework](https://angular.io/) (Angular 2.0.0-rc.4)
-  [Ng2-Bootstrap](https://github.com/valor-software/ng2-bootstrap) components
- [Highcharts](http://www.highcharts.com/) charting library

> Note that this application is a refactor of an Angular 1.0-based project, [located here](https://github.com/richbl/taiga.io-scripts).


## Login Page
![image](https://cloud.githubusercontent.com/assets/10182110/18178057/adfe7dd8-7031-11e6-938f-ff2a69bdb1a1.png)
## Results Page
![image](https://cloud.githubusercontent.com/assets/10182110/18178108/ddb90f66-7031-11e6-83fb-1dacf6e5a09c.png)


## Based on Angular 2-Quickstart
This repository is based on the [Angular 2-Quickstart](https://github.com/valor-software/angular2-quickstart), which is provided by Valor Software to demo a simple implementation of their [Native Angular 2 Directives for Bootstrap](http://valor-software.com/ng2-bootstrap/#/).


## Prerequisites

 - [Angular Framework](https://angular.io/) library resources
 - [Ng2-Bootstrap](https://github.com/valor-software/ng2-bootstrap) library resources
 - [Highcharts](http://www.highcharts.com/) charting library

### Angular Framework
Node.js and npm are essential to Angular 2 development. <a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm"> Get them now</a> if they're not already installed on your machine.
 
**Verify that you are running at least node `v5.x.x` and npm `3.x.x`**
by running `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors.

> This project was originally developed using Angular 2.0.0-RC4.

### Ng2-Bootstrap
The [ng2-bootstrap](https://github.com/valor-software/ng2-bootstrap) library is available as an [npm package](https://www.npmjs.com/package/ng2-bootstrap), which makes it extremely easy to implement in this or any Angular Framework project. When first installing npm packages, project dependencies should install the latest package.

> This project was originally developed using Ng-Bootstrap 1.0.23.

### Highcharts
The [Highcharts](http://www.highcharts.com/) charting library for Angular 2 is available as an [npm package](https://www.npmjs.com/package/angular2-highcharts), which makes it extremely easy to implement in this or any Angular Framework project. When first installing npm packages, project dependencies should install the latest package.

> This project was originally developed using Angular2-highcharts 0.2.1.

## Getting Started

Clone this repo into new project folder (*e.g.*, `my-proj`).
```bash
git clone  https://github.com/richbl/Ng2-Taiga-Tasks  my-proj
cd my-proj
```

### Install npm Packages

> See npm and nvm version notes above

Install the npm packages described in the `package.json` and verify that it works:

> Attention Windows developers: you must run all of these commands in administrator mode.

```bash
npm install
```

### Start the Localhost Server

The `npm start` command first compiles the application, 
then simultaneously re-compiles and runs the `lite-server`.
Both the compiler and the server watch for file changes.

```bash
npm start
```

> By default, the server will be running on http://localhost:3000. Open a browser page on this URL and you should see the application running. Shut it down manually with Ctrl-C.

**You're ready to go!**
