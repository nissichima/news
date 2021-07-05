"use strict";

var compose = function compose() {
  for (
    var _len = arguments.length, fns = Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    fns[_key] = arguments[_key];
  }

  return function (x) {
    return fns.reduceRight(function (y, f) {
      return f(y);
    }, x);
  };
};

// GET ELEMENT

/**
 * Get DOM element given a param query
 * @param {string} prefix option to add a prefix ie. '#'
 * @param {string} param
 * @returns element
 */
var _getElement = function _getElement() {
  var prefix =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return function (param) {
    var query = !prefix ? "" + param : "" + prefix + param;
    return document.querySelector(query);
  };
};

/**
 * Partial cyrring of @_getElement
 * prefix has been set up with # symbol
 * @param {string} param name of the id element
 */
var _getElementID = _getElement("#");

/**
 * Partial cyrring of @_getElement
 * prefix has been set up with . symbol
 * @param {string} param name of the class element
 */
var _getElementClass = _getElement(".");

// Create Element
var _createEl = function _createEl(type) {
  return document.createElement(type);
};

/**
 * Add attributes to a given element
 * @param {*} element
 * @param {attributes} opt. rest parameters of attributes under the form [name, value]
 * if null does not add attributes
 * @returns element
 */
var _setAttribute = function _setAttribute(element) {
  return function () {
    for (
      var _len2 = arguments.length, attributes = Array(_len2), _key2 = 0;
      _key2 < _len2;
      _key2++
    ) {
      attributes[_key2] = arguments[_key2];
    }

    !attributes[0]
      ? null
      : attributes.map(function (att) {
          return element.setAttribute(att[0], att[1]);
        });
    return element;
  };
};

/**
 * Create an element and set opt. attributes with @_setAttribute
 * @param {string} type of element ie div
 * @param {attributes} opt. rest parameters of attributes under the form [name, value]
 * if null does not add attributes
 * @return element
 */
var _createElement = compose(_setAttribute, _createEl);

/**
 * Create text node
 * @param {string} text
 * @returns
 */
var _createContent = function _createContent(text) {
  return document.createTextNode(text);
};

/**
 * AppendChild Element to a givent parent Element
 * @param {*} element
 * @returns element
 */
var _appendElement = function _appendElement(element) {
  return function () {
    for (
      var _len3 = arguments.length, children = Array(_len3), _key3 = 0;
      _key3 < _len3;
      _key3++
    ) {
      children[_key3] = arguments[_key3];
    }

    children.map(function (child) {
      return element.appendChild(child);
    });
    return element;
  };
};

var _PipeElementContent = function _PipeElementContent(
  createElement,
  createContent
) {
  return function (type) {
    return function () {
      for (
        var _len4 = arguments.length, attributes = Array(_len4), _key4 = 0;
        _key4 < _len4;
        _key4++
      ) {
        attributes[_key4] = arguments[_key4];
      }

      return function (text) {
        return _appendElement(createElement(type).apply(undefined, attributes))(
          createContent(text)
        );
      };
    };
  };
};

/**
 * Create a element types with a text node
 * @param {string} type element
 * @param {attributes} opt. rest parameters of attributes under the form [name, value]
 * if null does not add attributes
 * @param {string} text node
 */
var _createElementContent = _PipeElementContent(_createElement, _createContent);

/**
 * Change Display state
 * @param {string} state
 * @returns state
 */
var _switchDisplay = function _switchDisplay(state) {
  return state === "block" ? { state: "none" } : { state: "block" };
};

/**
 * Change the Display state of a given element
 * @param {*} element
 */
var _switchElementDisplay = function _switchElementDisplay(element) {
  return function () {
    element.style.display = _switchDisplay(element.style.display).state;
  };
};

module.exports = {
  _getElement: _getElement,
  _getElementID: _getElementID,
  _getElementClass: _getElementClass,
  _createElement: _createElement,
  _createElementContent: _createElementContent,
  _appendElement: _appendElement,
  _switchElementDisplay: _switchElementDisplay,
};
