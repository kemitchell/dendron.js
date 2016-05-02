module.exports = parse

var LINE = /^(\s*)(.+)$/

function parse(argument) {
  var stack = [ { } ]
  var indents = [ -1 ]
  function shift() {
    stack.shift()
    indents.shift() }
  argument
    .split('\n')
    .forEach(function(line) {
      var match = LINE.exec(line)
      var indent = match[1].length
      var content = match[2]
      var object
      function unshift(object) {
        stack.unshift(object)
        indents.unshift(indent) }
      while (indent < indents[0]) {
        shift() }
      if (indent > indents[0]) {
        object = { }
        stack[0][content] = object
        unshift(object) }
      else if (indent === indents[0]) {
        shift()
        object = { }
        stack[0][content] = object
        unshift(object) } })
  return stack[stack.length - 1] }
