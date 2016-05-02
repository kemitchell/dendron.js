var assert = require('assert')
var parse = require('./')

assert.deepEqual(
  parse(
    [ 'a',
      '  b',
      '  c' ]
      .join('\n')),
  { a: { b: { }, c: { } } })

assert.deepEqual(
  parse(
    [ 'a',
      '  b',
      '    c' ]
      .join('\n')),
  { a: { b: { c: { } } } })
