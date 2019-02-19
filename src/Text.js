import React from 'react';
import { Register } from './';
import ReactMarkdown from 'react-markdown';

class Text extends React.Component {

  constructor(props) {
    super(props);
    this.originalText = props.text;
    this.key = props.text;
    this.lang = props.lang;
    this.debug = props.debug || false;
    this.debugMap = [];
    this.props = props;
    this.className = props.className || this.key;
  }

  keys(text) {
    return text.split('.');
  }

  find(text) {
      let current = text;
      let splitKeys = this.keys(this.key);
      while(splitKeys.length) {
          if(typeof current !== 'object') return undefined;
          current = current[splitKeys.shift()];
      }
      return current;
  }

  template(tpl, data) {
      const re = /<%([^%>]+)?%>/g;
      let match = [];
      this.debugMap['matches'] = {
        description: '\'Matches\' are the objects associated with the mini templating engine.',
        value: []
      };
      while(match = re.exec(tpl)) {
          // console.log(match);

          if(data[match[1]] === undefined) {
            throw new Error('No key found for: ' + match[1]);
          }

          tpl = tpl.replace(match[0], data[match[1]])
      }
      return tpl;
  }

  setLang(lang) {
    this.lang = lang;

    return this;
  }

  render() {
    let text = this.setLang(this.props.lang).find(Register.config[this.lang]);

    if(!text) {
      throw new Error(`${this.originalText} is not in your language object tree.`);
    }
    const display = this.template(text, this.props);

    return (
      <React.Fragment>
       <ReactMarkdown className={this.className} source={display} />
      </React.Fragment>
    );
  }
}

export default Text;
