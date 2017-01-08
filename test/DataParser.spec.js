/**
 * Tests for PatternMatcher
 */

import chai from 'chai';
import sinon from 'sinon';

import DataParser from '../src/DataParser';
import PatternMatcher from '../src/PatternMatcher';

import BooleanValue from '../src/values/BooleanValue';

const assert = chai.assert;

describe('DataParser', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('calls makePatternMatcher with default modules when none are supplied', () => {
    const spy = sandbox.spy();
    const makePatternMatcher = DataParser.__get__('makePatternMatcher');
    DataParser.__set__('makePatternMatcher', spy);

    new DataParser();   // eslint-disable-line no-new

    assert.isTrue(spy.calledOnce);

    // restore
    DataParser.__set__('makePatternMatcher', makePatternMatcher);
  });

  describe('.constructor', () => {
    it('creates a matcher or uses the cached instance', () => {
      const parser1 = new DataParser('parser');
      const parser2 = new DataParser('parser');

      assert.instanceOf(parser1.patternMatcher, PatternMatcher);
      assert.instanceOf(parser2.patternMatcher, PatternMatcher);

      // second call should return same instance
      assert.strictEqual(parser2.patternMatcher, parser1.patternMatcher, 'Should reuse a cached PatternMatcher instance if a name is specified');
    });

    it('creates a new matcher if modules or context are set', () => {
      const parser1 = new DataParser('parser');
      const parser2 = new DataParser('parser', []);
      const parser3 = new DataParser('parser', null, {});

      assert.instanceOf(parser1.patternMatcher, PatternMatcher);
      assert.instanceOf(parser2.patternMatcher, PatternMatcher);
      assert.instanceOf(parser3.patternMatcher, PatternMatcher);

      // second call should return different instance
      assert.notStrictEqual(parser2.patternMatcher, parser1.patternMatcher, 'Should create a new PatternMatcher instance if modules are specified');

      // third call should return different instance
      assert.notStrictEqual(parser3.patternMatcher, parser2.patternMatcher, 'Should create a new PatternMatcher instance if context is specified');
    });
  });

  describe('.parse', () => {
    it('returns BooleanValue when parsing "true" / "false" with or without surrounding spaces', () => {
      const parser = new DataParser();

      const testStrings = ['true', 'false', '  true', ' true  '];
      testStrings.forEach(str => {
        const result = parser.parse(str);
        assert.isArray(result);
        assert.lengthOf(result, 1);
        assert.instanceOf(result[0], BooleanValue);
      });
    });
  });
});
