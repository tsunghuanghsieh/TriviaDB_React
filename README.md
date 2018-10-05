# Description
This is a simple trivia webpage using Open Trivia DB API and React. I am trying to (re)familiarize myself with React. It allows users to specify trivia category, difficulty and type, and present one trivia question at a time.

Hierachical components communicate using `props` which is `read-only` and flows parent -> child. Inside a component, we update and maintain private data using `state` by calling `this.setState()` and return data to parent using sorta callback (a function in parent component). One thing to remember is `setState()` does *shallow* merge, so I need to explicitly maintain values in an object in `state`. See [https://reactjs.org/docs/react-component.html](React.Component) Also because `setState()` is async, be careful when updating value in `state` based on its current value.

# Setup environment
`npm install`

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
