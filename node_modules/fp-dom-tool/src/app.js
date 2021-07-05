const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((y, f) => f(y), x);

// GET ELEMENT

/**
 * Get DOM element given a param query
 * @param {string} prefix option to add a prefix ie. '#'
 * @param {string} param
 * @returns element
 */
const _getElement =
  (prefix = null) =>
  (param) => {
    const query = !prefix ? `${param}` : `${prefix}${param}`;
    return document.querySelector(query);
  };

/**
 * Partial cyrring of @_getElement
 * prefix has been set up with # symbol
 * @param {string} param name of the id element
 */
const _getElementID = _getElement("#");

/**
 * Partial cyrring of @_getElement
 * prefix has been set up with . symbol
 * @param {string} param name of the class element
 */
const _getElementClass = _getElement(".");

// Create Element
const _createEl = (type) => document.createElement(type);

/**
 * Add attributes to a given element
 * @param {*} element
 * @param {attributes} opt. rest parameters of attributes under the form [name, value]
 * if null does not add attributes
 * @returns element
 */
const _setAttribute =
  (element) =>
  (...attributes) => {
    !attributes[0]
      ? null
      : attributes.map((att) => element.setAttribute(att[0], att[1]));
    return element;
  };

/**
 * Create an element and set opt. attributes with @_setAttribute
 * @param {string} type of element ie div
 * @param {attributes} opt. rest parameters of attributes under the form [name, value]
 * if null does not add attributes
 * @return element
 */
const _createElement = compose(_setAttribute, _createEl);

/**
 * Create text node
 * @param {string} text
 * @returns
 */
const _createContent = (text) => {
  return document.createTextNode(text);
};

/**
 * AppendChild Element to a givent parent Element
 * @param {*} element
 * @returns element
 */
const _appendElement =
  (element) =>
  (...children) => {
    children.map((child) => element.appendChild(child));
    return element;
  };

const _PipeElementContent =
  (createElement, createContent) =>
  (type) =>
  (...attributes) =>
  (text) => {
    return _appendElement(createElement(type)(...attributes))(
      createContent(text)
    );
  };

/**
 * Create a element types with a text node
 * @param {string} type element
 * @param {attributes} opt. rest parameters of attributes under the form [name, value]
 * if null does not add attributes
 * @param {string} text node
 */
const _createElementContent = _PipeElementContent(
  _createElement,
  _createContent
);

/**
 * Change Display state
 * @param {string} state
 * @returns state
 */
const _switchDisplay = (state) => {
  return state === "block" ? { state: "none" } : { state: "block" };
};

/**
 * Change the Display state of a given element
 * @param {*} element
 */
const _switchElementDisplay = (element) => () => {
  element.style.display = _switchDisplay(element.style.display).state;
};

module.exports = {
  _getElement,
  _getElementID,
  _getElementClass,
  _createElement,
  _createElementContent,
  _appendElement,
  _switchElementDisplay,
};
