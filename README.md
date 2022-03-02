# c5cl

Installation:

```js
npm install c5cl
```

Usage:

```js
import React from 'react';
import {Button} from 'c5cl';

function App(){
  return <Button label="click me" />
}

export default App;

```

There are a number of helper utilites, example usage:
formateDate: takes a string or a date and returns a string representation of only the date.
formatMoney: fixes issues with money values that only have a decimal precision of 1.
isValid: return true or false depending on the existence of a string, a number that is not zero, or an object with keys.

```js
import {formatDate, formatMoney, isValid} from 'c5cl';

isValid(null);
// returns false
isValid(undefined)
// returns false
isValid('hello')
// returns true
isValid({name: 'mike'})
// returns true
isValid({})
// returns false

formatDate('1/1/2022 2:00 PM')
// returns '1/1/2022'

formatMoney('1.1')
// returns '$1.10

```
