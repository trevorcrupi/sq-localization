import React from 'react';
import { Register } from './';

class Text extends React.Component {

  constructor(props) {
    super(props);
    this.originalText = props.text;
    this.keys = this.keys(props.text);
    this.lang = props.lang;
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

    return (
      <span>{text}</span>
    );
  }
}

export default Text;
