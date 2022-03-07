# c5cl

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CircleCI](https://circleci.com/gh/C5m7b4/c5cl/tree/master.svg?style=svg)](https://circleci.com/gh/C5m7b4/c5cl/tree/master)
[![codecov](https://codecov.io/gh/C5m7b4/c5cl/branch/master/graph/badge.svg?token=4CPGf4PdJ9)](https://codecov.io/gh/C5m7b4/c5cl)

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

RippleButton usage:
Color, HoverColor, and TextColor are optional.

```js
  import {RippleButton} from 'c5cl';

  return (
    <RippleButton 
      text="Click Me" 
      onClick={() => console.log('I have been clicked')}
      color={'#de34eb'}
      hoverColor={'#bb5bc2'}
      textColor={'#fff'}
    />
  )
```

DataGrid usage:

```js
  import {DataGrid} from 'c5cl';

  const testData = [
  {
    id: 1,
    storeName: 'IGA 001',
    storeNumber: '001',
    termCount: 3,
  },
  {
    id: 2,
    storeName: 'IGA 002',
    storeNumber: '002',
    termCount: 4,
  },
  {
    id: 3,
    storeName: 'IGA 003',
    storeNumber: '003',
    termCount: 6,
  },
];

  return (
    <DataGrid 
      data={testData}
      identifier={'grid1'}
      headers={[
          {
            columnName: 'id',
            title: 'ID',
            visible: true,
            style: {
              textAlign: 'center',
            },
          },
          {
            columnName: 'storeName',
            title: 'Name',
            style: {
              textAlign: 'left',
            },
          },
          {
            columnName: 'storeNumber',
            title: '#',
            style: {
              textAlign: 'center',
            },
          },
        ]}
    />
  )
```

## DataGrid Props:
|    Prop name | optional | type | description |
| :----------: | :------: | :--: | :---------: |
| data         | [required] | array | array of data |
| identifier   | [required] | string | used for the id of the main div |
| customRenderers | [✔] | function | function used to render images and such |
| headers | [✔] | array of object | object to defined the shape of the header |
| fill | [✔] | boolean | whether or not to fill the parent div |
| style | [✔] | CSSProperties | style for the main div |
| className | [✔] | string | className for the main div |
| tableClassName | [✔] | string | className for the actual table |
| mode | [✔] | 'light' or 'dark' | changes the styles of the entire component |

## DataGrid Header Props

|   Prop name | optional | type | description |
| :-------: | :-----: | :-----: | :----: |
| columnName | [required] | string | represents the name of the column in your data |
| title | [required] | string | What to display in the column header |
| sortable | [✔] | boolean | can make this column not sortable. default is true |
|visible | [✔] | boolean | can make this column invisible. default is true |
| style | [✔] |CSSProperties | the style for this column. ex: textAlign: 'center'
|width | [✔] | number | predetermined width for the column |
filterable | [✔] | boolean | can make this column not filterable. default is true |

## Custom Renderers

You can for example add custom Renderers to your grid with an example like so: 

```js
const renderers = {
  active: (i: T) => (
    <input type="checkbox" checked={i.active} />;
  ),
  image: (i: T) => {
    return (
      <img
        alt={i.image.name}
        src={i.image.url}
        height={i.image.height}
        width={i.image.width}
      />
    );
  },
};

<DataGrid customRenderers={renderers} />

```

and then your headers would look like this:

```js

const headers = [
  {
    columnName: 'active',
    title: 'active',
    style: {
      textAlign: 'center',
    },
  },
  {
    columnName: 'image',
    title: 'PinPad',
    style: {
      textAlign: 'center',
    },
  }
]

```

and your data would look like this:

```js
const testData = [
  {
    id: 1,
    storeName: 'IGA 001',
    storeNumber: '001',
    termCount: 3,
    active: true,
    image: {
      url: 'https://www.someurl.com/_images/pinpadlogos/l5300.png',
      name: 'l5300',
      height: '20',
      width: '30',
    },
  },
]

```

so your columnName needs to match the name of the renderer

note: The error field in both components is used for when the form validation fails, you can send in a unique error message to each element of your form.

If for some reason you are using CRA and are getting an error about not being able to find source maps, this is a known issue with Webpack5 and is being address. The workaround is to add this to your .env file:

GENERATE_SOURCEMAP=false

## DataGrid Todos

- [✔] work on row colors based on the color that might be passed in
- [✔] figure out how to center the column text
- [✔] make each column sortable
- [✔] make columns hidden
- [✔] make column filterable by the unique values that are displayed for that column
- [✔] make columns draggable 🚀
- [✔] enable light and dark mode
- [✔] change column hiding to be enabled by right clicking
- [✔] fix column widget vertical placement
- [✔] fix filter widget vertical placement
- [ ] fix custom renderers

## Some ideas for extra components

- Toasts
- Data Picker
- Tooltips
- [✔] Slider
- any other thoughts
