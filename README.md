![Lern Logo](public/images/icons/mipmap-xxxhdpi/ic_launcher.png)

# Lern

## Tech Stack:
- [Meteor 1.6](https://guide.meteor.com/index.html)
- Model
  - MongoDB
  - [Astronomy](https://jagi.github.io/meteor-astronomy/v2)
- Render
  - [React](https://facebook.github.io/react/)
  - [React Mounter](https://github.com/kadirahq/react-mounter)
- Routes
  - [FlowRouter](https://github.com/kadirahq/flow-router)
- Styles
  - Sass
  - [Semantic UI React](https://react.semantic-ui.com/introduction)
  - [MaterialUI](http://www.material-ui.com)
  - [DraftJS](https://facebook.github.io/draft-js/) - [Examples](http://draftjs-examples.herokuapp.com/)
- Misc
  - [Lodash](https://lodash.com/)
  - [Moment](https://momentjs.com/)
- [Tests](https://guide.meteor.com/testing.html)
  - [Chai](http://chaijs.com/)
  - [Mocha](https://github.com/practicalmeteor/meteor-mocha)

## Languages
- ES6 Javascript (.js)
- React Javascript (.jsx)
<br>
_Styleguides:_ [Airbnb](https://github.com/airbnb/javascript)
<br>
_Linter:_ JSCS

### Recomended editor: [Atom](https://atom.io/)
- Packages:
  - language-babel
  - linter
  - linter-jscs

## System Views
- Admin
- School
- Teacher
- Student

## Convention Highlights
- Global names should be PascalCased
- Imported and exported variables should be PascalCased
- Instance and variables should be camelCased
- Logic should be divided by the four sytem views
- Only top level view should fetch data
- Route name should match top level component name
- File name should match component name

## NPM run
- _start:_ Start meteor with settings on port 3000 with configured locales
- _debug:_ Start meteor with settings on port 3000 with configured locales with debug console
- _test:_ Run test once for selected package, results on console
  - **Example:** `npm run test packages/lern-check`
- _test-watch:_ Run test live for selected package on web view in `localhost:3100`
  - **Example:** `npm run test packages/lern-check`
- _jsdoc:_ Create documentation using jsdoc.json configuration

## Private packages
- [lern-check](https://lern-edu.github.io/lern/LernCheck.html)
- [lern-head](https://lern-edu.github.io/lern/LernHead.html)
- [lern-layouts](https://lern-edu.github.io/lern/LernLayouts.html)
