import React from 'react';
import { Register } from './';

class Text extends React.Component {

  constructor(props) {
    super(props);
    this.originalText = props.text;
    this.keys = this.keys(props.text);
    this.lang = props.lang;
    this.debug = props.debug || false;
  }

  keys(text) {
    return text.split('.');
  }

  find(text) {
      let current = text;
      while(this.keys.length) {
          if(typeof current !== 'object') return undefined;
          current = current[this.keys.shift()];
      }
      return current;
  }

  render() {
    const text = this.find(Register.config[this.lang]);

    if(!text) {
      throw new Error(`${this.originalText} is not in your language object tree.`);
    }

    if(this.debug) {
      console.log(`--------------------------------------------------------------------------------------------------------------------------------`);
      console.log(`Lang: ${this.lang}`);
      console.log(`Text Prop Received: ${this.originalText}`);
      console.log(`Text that sq-localization found: ${text}`);
      console.log(`(You are seeing this because you have included the 'debug' prop in your <Text /> component. Change that if you don't like this.)`);
      console.log('--------------------------------------------------------------------------------------------------------------------------------');
    }

    return (
      <div>{text}</div>
    );
  }
}

export default Text;
