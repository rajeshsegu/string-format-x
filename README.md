# string-format-x

resolve string templates for all types of objects

## Usage

```javascript
var formatx = require('string-format-x');
```
## Object
```
var obj = { name: '{name}', addr: '{city}, {country}'};
formatx(obj, {name: 'Segu', city: 'SF', country: 'USA'});
// => {name: 'Segu', addr: 'SF, USA'}
```

## Array
```
var obj = ['{lname}', '{fname}', '{lname} {fname}'];
formatx(obj, {lname: 'S', fname: 'R'});
// => ['S', 'R', 'R S']
```

## String
```
formatx('{lname} {fname}', {lname: 'S', fname: 'R'});
// => 'R S'
```

## Primitive
```
formatx(123, {lname: 'S', fname: 'R'});
// => 123

formatx(false, {lname: 'S', fname: 'R'});
// => false

formatx(null, {lname: 'S', fname: 'R'});
// => null
```
