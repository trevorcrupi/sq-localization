# SQ localization

This is extremely simple client-side localization for React. Focused on non-intrusive integration in your app.

I was tasked with adding localization to an app midway through the application cycle, and I found that most of the packages out there are very intrusive when trying integration. So, I created the simplest localization component I could think of.

## Getting Started

### Installing

`npm i sq-localization --save`

### Setting up

By design, this package is incredibly easy to set up and use.

Before your .render in your index file, call the init function and point to your language object:

```js
import { Register } from 'sq-localization';

Register.init({
  'en': {
    'greeting': {
      'formal': 'Hello, World!',
      'informal': 'What up!'
    }
  },
  'fr': {
    'greeting': {
      'formal': 'Bonjour!',
      'informal': 'Salut!'
    }
  }
})
```

This is used by the <Text /> component to decide what to dynamically render. This is all that's needed to get up and running with simple localization. I recommend separating the language objects into separate .js files and importing them for better separation and readability.  

To start using localization, just use the <Text /> component as follows:

```js
import { Text } from 'sq-localization';

class TestComponent extends React.Component {
  render() {
    return (
      <Text lang='en' text='greeting.formal' />
    );
  }
}
```

This would output "Hello, World!". In order to switch languages, just change the 'lang' prop to one of your defined language strings in the init function. For example:

```js
import { Text } from 'sq-localization';

class TestComponent extends React.Component {
  render() {
    return (
      <Text lang='fr' text='greeting.formal' />
    );
  }
}
```

Would output 'Bonjour!'.

An error will be thrown if the language or the text is not found.

### Redux

Again, designed to be as simple as possible. Just keep the value for the language in your state and pass it down the tree to the text component. The text component will re-render on a state change.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
