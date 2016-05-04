var tape = require('tape')
var parse = require('..')

tape('parser', function(test) {

  test.deepEqual(
    parse('- x'),
    [ 'x' ],
    'single list element')

  test.deepEqual(
    parse(
      [ '- x',
        '- y' ]
        .join('\n')),
    [ 'x', 'y' ],
    'two list elements')

  test.deepEqual(
    parse(
      [ '- x',
        '- y',
        '- z' ]
        .join('\n')),
    [ 'x', 'y', 'z' ],
    'three list elements')

  test.end() })
