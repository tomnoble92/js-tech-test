# Sky Betting & Gaming Tech Test

## The Stack

I made the choice of choosing the React Framework to develop the app, more specifically using the create-react-app. The benefits for choosing this approach are the built in config tools like Webpack and Babel which saves time on setting up the app.

I used React Router for routing purposes.

I haven't leaned on any CSS frameworks the UI is all built from scratch mainly taking advantage of the Flexible Box Module.

For testing I have used Jest and Enzyme because they are the recommended frameworks for React

## Getting Started

### System Requirements

* Docker
* Node.js
* NPM

### Running the API and Websocket Server

```bash
# run on the command line
docker run -it --rm --name sbg-tech-test-api -p 8888-8890:8888-8890 sbgtechtest/api:2.0.0
```

### Running the App

```bash
# To install run the below command in the root directory
npm install
```

```bash
# To start run the below command in the root directory,
npm start
```

Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

### Running the App Tests

```bash
# To start the test suite run the below command in the root directory
npm test
```

## Reflection

Relecting on the project and the decisons I made.

Moving forward I need to... 

* Invest time learning how to write a proper test suite.
* Plan the project in more depth I had to refactor a number of components when the scope changed,
Really aim towards writing all the tests before developement begins, which therefore will help me gain a better understanding of the protential scope of the project.

