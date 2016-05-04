// This module exports the tokenizer ("lexical analyzer" or "lexer")
// for content within lines of Common Form markup. It does not handle
// indentation or other line-based tokens. String input is passed to the
// top-level tokenizer function in tokenize-lines.js, which in turn uses
// this module.

module.exports = tokenizeContent

// A token type that is only used within this module for individual characters
// of text. Contiguous character tokens are concatenated into longer text
// tokens before they are returned.
var CHARACTER = 'char'

// Special characters with their own token types.
var CHAR_TOKENS = {
  '=': 'EQUALS',
  '-': 'DASH' }

// Escape character
var ESCAPE = '\\'

function tokenizeContent(string, line, offset) {
  var arrayOfTokens = [ ]
  var character
  var escaped = false
  // For each character in the string
  for (var index = 0; index < string.length; index++) {
    character = string.charAt(index)
    if (escaped) {
      arrayOfTokens.push({
        type: CHARACTER,
        line: line,
        column: ( offset + index - 1 ),
        string: character })
      escaped = false }
    else {
      if (character === ESCAPE) {
        escaped = true }
      else if (CHAR_TOKENS.hasOwnProperty(character)) {
        arrayOfTokens.push({
          type: CHAR_TOKENS[character],
          line: line,
          column: ( offset + index ),
          string: character }) }
      else {
        arrayOfTokens.push({
          type: CHARACTER,
          line: line,
          column: ( offset + index ),
          string: character }) } } }
  // Combine consecutive character tokens into text tokens.
  return arrayOfTokens
    .reduce(
      function(returned, token, index, tokens) {
        var precedingToken = ( ( index > 0 ) ? tokens[index - 1] : false )
        var consecutiveText = (
          precedingToken &&
          ( precedingToken.type === CHARACTER ) &&
          ( token.type === CHARACTER) )
        if (consecutiveText) {
          returned[( returned.length - 1 )].string += token.string
          return returned }
        else {
          return returned.concat({
            type: (
              ( token.type === CHARACTER ) ?
                'TEXT' :
                token.type ),
            column: token.column,
            line: token.line,
            string: token.string }) } },
      [ ]) }
