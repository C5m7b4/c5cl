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

TextInput example usage:

```js
import {TextInput} from 'c5cl';

return (
  <TextInput 
    id="someid"
    name="somename"
    label="somelabel"
    placeholder="some placeholder"
    onChange={(e) => console.log(e.target.value) }
    type="text"
    value="someValue"
    error="This field is required"
  />
)
```

SelectField example usage:

```js
import {SelectField} from 'c5cl';

const states = [
  {abbr: 'AL', name:'Alabama'},
  {abbr: 'TN', name: 'Tennessee'}
]

return (
  <SelectField 
    id="someid"
    name="somename"
    label="somelabel"
    displayField="name"
    valueField="abbr"
    onChange={(e) => console.log(e.target.value)}
    emptyMsg="Please select a state"
    data={states}
    error="This field is required"
  />
)

```

note: The error field in both components is used for when the form validation fails, you can send in a unique error message to each element of your form.

If for some reason you are using CRA and are getting an error about not being able to find source maps, this is a known issue with Webpack5 and is being address. The workaround is to add this to your .env file:

GENERATE_SOURCEMAP=false

DataGrid Todos:
- [] work on row colors based on the color that might be passed in
- [] figure out how to center the column text
- [✔] make each column sortable
- [✔] make columns hidden
- [] make column filterable by the unique values that are displayed for that column
- [] make columns draggable 🚀
- [] enable light and dark mode
- [✔] change column hiding to be enabled by right clicking
