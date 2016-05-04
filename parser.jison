%start document

%%

document: content END  { return $1 };

content: map | list;

list
  : elements                          { $$ = $1 }
  | elements INDENT elements OUTDENT  { $$ = $1.concat($3) }
  | INDENT elements OUTDENT           { $$ = $2 };

elements
  : element           { $$ = [ $1 ] }
  | elements element  { $$ = $1.concat($2) };

element: DASH TEXT { $$ = $2.trim() };

map
  : pair                       { var object = new Object
                                 object[$1.key] = $1.value
                                 $$ = object },
  | pair INDENT pairs OUTDENT  { $$ = [ $1 ]
                                   .concat($3)
                                   .reduce(
                                     function(result, pair) {
                                       result[pair.key] = pair.value
                                       return result },
                                     new Object) }
  | INDENT pairs OUTDENT       { $$ = $2.reduce(
                                   function(result, pair) {
                                     result[pair.key] = pair.value
                                     return result },
                                   new Object) };

pairs
  : pair        { $$ = [ $1 ] }
  | pairs pair  { $$ = $1.concat($2)  };

pair: TEXT EQUALS TEXT  { $$ = { key: $1, value: $3 } };
