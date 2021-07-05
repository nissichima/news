# fp-dom-tool

library to help interacting with DOM - get and create element

## Installation

You need node.js and npm.

`npm install fp-dom-tool`

```javascript
import _tool from "fp-dom-tool";

module.exports = {
  _getElement,
  _getElementID,
  _getElementClass,
  _createElement,
  _createElementContent,
  _appendElement,
};
```

## Usage

JS library, help to interact with the DOM with following functions:

- `_getElement` get element of the DOM. Option to add `prefix` in or to set partial curring.

```javascript
const paragraph = _tool._getElement("p")
const paragraph(".example")
//Get the first <p> element in the document with class="example":
```

- `_getElementID` get element DOM of given ID. Partial currying of `_getElement`.

- `_getElementClass` get element DOM of given class. Partial currying of `_getElement`.
- `_createElement` create a type element. Option to add attributes. Any new addtional attributes had to be in the form `[name, value]`

```javascript
const newP = _tool._createElement("div"); // return element <div></div>
const newDiv = _tool._createElement("img")(
  ["class", "class-1 class-2"],
  ["id", "divId"]
); // return element <img id="divId" class="class-1 class-2">
```

- `_createElementContent` create a type element with a text node. Option to add attributes. Any new addtional attributes had to be in the form `[name, value]`

```javascript
const newP = _tool._createElementContent("h1")(["class", "class-1 class-2"])('A ramdom title';
// return element <h1 class='class-1 class-2'>A ramdom title</h1>
```

- `_appendElement` Append child an elment to a Parent element

## Compatibility

library converted to ES5 JavaScript.
