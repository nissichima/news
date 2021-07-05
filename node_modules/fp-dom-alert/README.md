# fp-dom-alert

Library that helps you create HTML Alert.

<img src="https://github.com/clemoni/fp-dom-alert/blob/main/img/alert-precreated.png" alt="All the precreated alert" width="600" height="300">

## Installation

You need node.js and npm and [fp-dom-tool](https://www.npmjs.com/package/fp-dom-tool).

`npm install fp-dom-alert`

```javascript
import _tool from "fp-dom-tool"; // opt.
import _alert from "fp-dom-alert"; // lib fp-dom-alert

const _export = {
  _alert,
  _alertDanger,
  _alertSuccess,
  _alertWarning,
  _createAlertStyle,
  _setStyle,
};

export default _export;
```

**To export the Style**

- In you `config.webpack.js`:

```javascript
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },
      ],
    },
  ];
}
```

- In you scss or css file:

```css
@import "fp-dom-alert/lib/index.css";
```

## Usage

- You need to create an html container with a class `._message`. You can use the function `_createElement` from the `fp-dom-tool` package.

```javascript
const _messageContainer = _tool._createElement("div")(["class", "_message"]);
```

- Create an alert with the function `_alert`. The function required two arguments: an alert type and and content. The package has 3 alert pre-created.

```javascript
const _alertDanger = _alert._alert("danger");
const _alertSuccess = _alert._alert("success");
const _alertWarning = _alert._alert("warning");
```

- You then append all you alert to the `._message` container by using the function `_appendElement`.

```javascript
const appendMessageContainer = _tool._appendElement(_messageContainer);
appendMessageContainer(
  _alert._alertDanger("Something is wrong"),
  _alert._alertWarning("Better be carefull"),
  _alert._alertSuccess("All is fine now")
);
```

- The `._message` container is by default on `display:none`. You can use the function `_switchElementDisplay` from the from the `fp-dom-tool` package. Everytime the `_switchElementDisplay` is used the element changes state from `display:none` to `display:block`.

```javascript
const _switchAlertDisplay = _tool._switchElementDisplay(_messageContainer);
_switchAlertDisplay(); // display:block
_switchAlertDisplay(); // display:none
```

### Style

Each pre-created alert has the following style:

```scss
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,700;1,200;1,300;1,400;1,700&display=swap");
$message-danger: #f8d7d9;
$message-success: #d4edd9;
$message-warning: #fff3cd;

@mixin message($color) {
  background-color: $color;
  border-color: darken($color, 50);
  color: darken($color, 50);
}

._message {
  display: none;

  &__container {
    padding: 0.6rem;
    border: 2px solid #000;
    border-radius: 0.3em;
    font-family: "Montserrat", sans-serif;
    font-size: 1.1rem;
    margin: 0.3rem 0;
  }
  &--danger {
    @include message($message-danger);
  }
  &--success {
    @include message($message-success);
  }
  &--warning {
    @include message($message-warning);
  }
}
```

#### Changing style

##### Direclty in css

You can overide the predifined with yours by creating your own style.

##### By using the library

You can also use the function `_createAlertStyle` from this package.
First you need to create an object that will overide the `_AlertCss` object. The `_AlertCss` has the following property:

```javascript
const _AlertCss = {
  padding: ".6rem",
  border: "2px solid #000",
  borderRadius: "0.3em",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "1.1rem",
  margin: "0.3rem 0",
  backgroundColor: "#fff",
  borderColor: "#000",
  color: "#000",
};
```

**You can't add additional property to the object. Any property not listed in the `_AlertCss` won't be added.**

```javascript
const newStyle = {
  backgroundColor: "#9da3d8",
  color: "#2835ad",
  borderColor: "#2835ad",
};

const alertInfoStyle = _alert._createAlertStyle(newStyle);
```

You can then use the function `_setStyle` to set the new style to a given element.

```javascript
const dangerAlert = _tool._getElementClass("_message--danger");
_alert._setStyle(dangerAlert)(dangerStyle);
```

### Example

```javascript
// Create the div ._message container that will contain all the alerts.
const _messageContainer = _tool._createElement("div")(["class", "_message"]);
const appendMessageContainer = _tool._appendElement(_messageContainer);

// Create a new type of alert: alertinfo
const alertInfo = _alert._alert("info");

// Add a message to the newly alertinfo and append it to the div ._message container.
appendMessageContainer(alertInfo("Fun Fact: I'm an info"));

//creste a new style with the element you wish to override.
const newStyle = {
  backgroundColor: "#9da3d8",
  color: "#2835ad",
  borderColor: "#2835ad",
};

// create a new object style
const alertInfoStyle = _createAlertStyle(newStyle);

// get the alert alertInfo in the dom and set the new style
const info = _tool._getElementClass("_message--info");
_setStyle(info)(alertInfoStyle);

// display the alert
_switchAlertDisplay(); // display:block
```

The alert now is now created.

<img src="https://github.com/clemoni/fp-dom-alert/blob/main/img/alert-info.jpg" alt="Alert info is created" width="500" height="100">
