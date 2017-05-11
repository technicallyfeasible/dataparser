/**
 * A node in the current parsing session
 */
class PathNode {
  /**
   * Create a new node to hold parsing state
   * @param token
   * @param path
   * @param textValue
   * @constructor
   */
  constructor(token, path, textValue) {
    // The token for comparison
    this.token = token;

    // The matching path for going deeper
    this.path = path;

    // The value which still matches this path
    this.textValue = textValue || '';

    // The final assembled value
    this.value = null;
    // All values of earlier tokens
    this.previousValues = null;

    // True if the value has been finalized and assigned
    this.isFinalized = null;

    // Remember the current state of any matching algorithm
    this.matchState = null;
  }

  clone() {
    const clone = new PathNode(this.token, this.path, this.textValue);
    clone.previousValues = this.previousValues.slice();
    clone.parent = this.parent;
    return clone;
  }

  /**
   * Log a validation reason with result
   * @param test
   * @param args
   * @param result
   */
  logReason(test, args, result) {
    if (!this.reasons) this.reasons = [];
    this.reasons.push({
      test,
      args,
      token: this.token.toString(),
      textValue: this.textValue,
      result,
    });
  }

  toString() {
    return `${this.token} ~ "${this.textValue}"`;
  }
}

module.exports = PathNode;
