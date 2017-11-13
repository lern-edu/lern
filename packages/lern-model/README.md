# Layout - _client side_

## Screen
- mixin to bind listener on `Window` for width and height and set this vars on view state
- How to use:
~~~js
  // Libs
  import React from 'react';
  import { Screen } from 'meteor/lsunsi:se-layouts';

  const SomeViewAnywhere = React.createClass({
    mixins: [Screen],

    render() {
      const { innerWidth, innerHeight } = this.state;

      return (something);
    },
  })
~~~
