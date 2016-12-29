import Token from './Token';

class Pattern {
  /**
   * Pattern object
   */
  constructor(match, parser) {
    this.match = match || '';
    this.parser = parser;
    this.tokens = this.tokenize();
  }

  toString() {
    return this.match;
  }

  parse(context, values) {
    return this.parser(context, values);
  }

  equals(other) {
    if (!other) return false;
    return this.match === other.match;
  }

  tokenize() {
    const pattern = this.match;
    const tokens = [];

    let currentToken = '';
    let i;
    for (i = 0; i < pattern.length; i++) {
      switch (pattern[i]) {
        case '{':
          if (!currentToken.length) {
            break;
          }
          tokens.push(new Token(currentToken, true));
          currentToken = '';
          break;
        case '}':
          tokens.push(new Token(currentToken, false));
          currentToken = '';
          break;
        default:
          currentToken += pattern[i];
          break;
      }
    }

    if (currentToken) {
      tokens.push(new Token(currentToken, true));
    }
    return tokens;
  }
}

export default Pattern;
