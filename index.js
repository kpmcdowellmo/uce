var uce = (function (exports) {
  'use strict';

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != _typeof(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }

  function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }

  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }

  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }

  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }

  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }

  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
  }

  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }

  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: true,
        configurable: true
      }
    }), Object.defineProperty(t, "prototype", {
      writable: false
    }), e && _setPrototypeOf(t, e);
  }

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }

  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }

  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }

  /**
   * ISC License
   *
   * Copyright (c) 2020, Andrea Giammarchi, @WebReflection
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
   * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
   * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
   * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
   * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
   * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
   * PERFORMANCE OF THIS SOFTWARE.
   */

  /**
   * @param {Node} parentNode The container where children live
   * @param {Node[]} a The list of current/live children
   * @param {Node[]} b The list of future children
   * @param {(entry: Node, action: number) => Node} get
   * The callback invoked per each entry related DOM operation.
   * @param {Node} [before] The optional node used as anchor to insert before.
   * @returns {Node[]} The same list of future children.
   */
  var udomdiff = (function (parentNode, a, b, get, before) {
    var bLength = b.length;
    var aEnd = a.length;
    var bEnd = bLength;
    var aStart = 0;
    var bStart = 0;
    var map = null;
    while (aStart < aEnd || bStart < bEnd) {
      // append head, tail, or nodes in between: fast path
      if (aEnd === aStart) {
        // we could be in a situation where the rest of nodes that
        // need to be added are not at the end, and in such case
        // the node to `insertBefore`, if the index is more than 0
        // must be retrieved, otherwise it's gonna be the first item.
        var node = bEnd < bLength ? bStart ? get(b[bStart - 1], -0).nextSibling : get(b[bEnd], 0) : before;
        while (bStart < bEnd) parentNode.insertBefore(get(b[bStart++], 1), node);
      }
      // remove head or tail: fast path
      else if (bEnd === bStart) {
        while (aStart < aEnd) {
          // remove the node only if it's unknown or not live
          if (!map || !map.has(a[aStart])) parentNode.removeChild(get(a[aStart], -1));
          aStart++;
        }
      }
      // same node: fast path
      else if (a[aStart] === b[bStart]) {
        aStart++;
        bStart++;
      }
      // same tail: fast path
      else if (a[aEnd - 1] === b[bEnd - 1]) {
        aEnd--;
        bEnd--;
      }
      // The once here single last swap "fast path" has been removed in v1.1.0
      // https://github.com/WebReflection/udomdiff/blob/single-final-swap/esm/index.js#L69-L85
      // reverse swap: also fast path
      else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
        // this is a "shrink" operation that could happen in these cases:
        // [1, 2, 3, 4, 5]
        // [1, 4, 3, 2, 5]
        // or asymmetric too
        // [1, 2, 3, 4, 5]
        // [1, 2, 3, 5, 6, 4]
        var _node = get(a[--aEnd], -0).nextSibling;
        parentNode.insertBefore(get(b[bStart++], 1), get(a[aStart++], -0).nextSibling);
        parentNode.insertBefore(get(b[--bEnd], 1), _node);
        // mark the future index as identical (yeah, it's dirty, but cheap 👍)
        // The main reason to do this, is that when a[aEnd] will be reached,
        // the loop will likely be on the fast path, as identical to b[bEnd].
        // In the best case scenario, the next loop will skip the tail,
        // but in the worst one, this node will be considered as already
        // processed, bailing out pretty quickly from the map index check
        a[aEnd] = b[bEnd];
      }
      // map based fallback, "slow" path
      else {
        // the map requires an O(bEnd - bStart) operation once
        // to store all future nodes indexes for later purposes.
        // In the worst case scenario, this is a full O(N) cost,
        // and such scenario happens at least when all nodes are different,
        // but also if both first and last items of the lists are different
        if (!map) {
          map = new Map();
          var i = bStart;
          while (i < bEnd) map.set(b[i], i++);
        }
        // if it's a future node, hence it needs some handling
        if (map.has(a[aStart])) {
          // grab the index of such node, 'cause it might have been processed
          var index = map.get(a[aStart]);
          // if it's not already processed, look on demand for the next LCS
          if (bStart < index && index < bEnd) {
            var _i = aStart;
            // counts the amount of nodes that are the same in the future
            var sequence = 1;
            while (++_i < aEnd && _i < bEnd && map.get(a[_i]) === index + sequence) sequence++;
            // effort decision here: if the sequence is longer than replaces
            // needed to reach such sequence, which would brings again this loop
            // to the fast path, prepend the difference before a sequence,
            // and move only the future list index forward, so that aStart
            // and bStart will be aligned again, hence on the fast path.
            // An example considering aStart and bStart are both 0:
            // a: [1, 2, 3, 4]
            // b: [7, 1, 2, 3, 6]
            // this would place 7 before 1 and, from that time on, 1, 2, and 3
            // will be processed at zero cost
            if (sequence > index - bStart) {
              var _node2 = get(a[aStart], 0);
              while (bStart < index) parentNode.insertBefore(get(b[bStart++], 1), _node2);
            }
            // if the effort wasn't good enough, fallback to a replace,
            // moving both source and target indexes forward, hoping that some
            // similar node will be found later on, to go back to the fast path
            else {
              parentNode.replaceChild(get(b[bStart++], 1), get(a[aStart++], -1));
            }
          }
          // otherwise move the source forward, 'cause there's nothing to do
          else aStart++;
        }
        // this node has no meaning in the future list, so it's more than safe
        // to remove it, and check the next live node out instead, meaning
        // that only the live list index should be forwarded
        else parentNode.removeChild(get(a[aStart++], -1));
      }
    }
    return b;
  });

  var isArray = Array.isArray;
  var getPrototypeOf = Object.getPrototypeOf,
    getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
  var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  var empty = [];
  var newRange = function newRange() {
    return document.createRange();
  };

  /**
   * Set the `key` `value` pair to the *Map* or *WeakMap* and returns the `value`
   * @template T
   * @param {Map | WeakMap} map
   * @param {any} key
   * @param {T} value
   * @returns {T}
   */
  var set = function set(map, key, value) {
    map.set(key, value);
    return value;
  };

  /**
   * Return a descriptor, if any, for the referenced *Element*
   * @param {Element} ref
   * @param {string} prop
   * @returns 
   */
  var gPD = function gPD(ref, prop) {
    var desc;
    do {
      desc = getOwnPropertyDescriptor$1(ref, prop);
    } while (!desc && (ref = getPrototypeOf(ref)));
    return desc;
  };

  /* c8 ignore start */
  /**
   * @param {DocumentFragment} content
   * @param {number[]} path
   * @returns {Element}
   */
  var find = function find(content, path) {
    return path.reduceRight(childNodesIndex, content);
  };
  var childNodesIndex = function childNodesIndex(node, i) {
    return node.childNodes[i];
  };
  /* c8 ignore stop */

  var ELEMENT_NODE = 1;
  var COMMENT_NODE = 8;
  var DOCUMENT_FRAGMENT_NODE = 11;

  var setPrototypeOf = Object.setPrototypeOf;

  /**
   * @param {Function} Class any base class to extend without passing through it via super() call.
   * @returns {Function} an extensible class for the passed one.
   * @example
   *  // creating this very same module utility
   *  import custom from 'custom-function/factory';
   *  const CustomFunction = custom(Function);
   *  class MyFunction extends CustomFunction {}
   *  const mf = new MyFunction(() => {});
   */
  var custom = (function (Class) {
    function Custom(target) {
      return setPrototypeOf(target, (this instanceof Custom ? this.constructor : void 0).prototype);
    }
    Custom.prototype = Class.prototype;
    return Custom;
  });

  var range$1;
  /**
   * @param {Node | Element} firstChild
   * @param {Node | Element} lastChild
   * @param {boolean} preserve
   * @returns
   */
  var drop = (function (firstChild, lastChild, preserve) {
    if (!range$1) range$1 = newRange();
    /* c8 ignore start */
    if (preserve) range$1.setStartAfter(firstChild);else range$1.setStartBefore(firstChild);
    /* c8 ignore stop */
    range$1.setEndAfter(lastChild);
    range$1.deleteContents();
    return firstChild;
  });

  function _callSuper$1(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$1() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct() { return !!t; })(); }
  function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
  function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
  function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
  function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
  function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }

  /**
   * @param {PersistentFragment} fragment
   * @returns {Node | Element}
   */
  var _remove = function remove(_ref, preserve) {
    var firstChild = _ref.firstChild,
      lastChild = _ref.lastChild;
    return drop(firstChild, lastChild, preserve);
  };
  var checkType = false;

  /**
   * @param {Node} node
   * @param {1 | 0 | -0 | -1} operation
   * @returns {Node}
   */
  var diffFragment = function diffFragment(node, operation) {
    return checkType && node.nodeType === DOCUMENT_FRAGMENT_NODE ? 1 / operation < 0 ? operation ? _remove(node, true) : node.lastChild : operation ? node.valueOf() : node.firstChild : node;
  };
  var comment = function comment(value) {
    return document.createComment(value);
  };

  /** @extends {DocumentFragment} */
  var _firstChild = /*#__PURE__*/new WeakMap();
  var _lastChild = /*#__PURE__*/new WeakMap();
  var _nodes = /*#__PURE__*/new WeakMap();
  var PersistentFragment = /*#__PURE__*/function (_custom) {
    function PersistentFragment(fragment) {
      var _this2;
      var _this;
      _classCallCheck(this, PersistentFragment);
      _this = _callSuper$1(this, PersistentFragment, [fragment]);
      _classPrivateFieldInitSpec(_this, _firstChild, comment('<>'));
      _classPrivateFieldInitSpec(_this, _lastChild, comment('</>'));
      _classPrivateFieldInitSpec(_this, _nodes, empty);
      (_this2 = _this).replaceChildren.apply(_this2, [_classPrivateFieldGet(_firstChild, _this)].concat(_toConsumableArray(fragment.childNodes), [_classPrivateFieldGet(_lastChild, _this)]));
      checkType = true;
      return _this;
    }
    _inherits(PersistentFragment, _custom);
    return _createClass(PersistentFragment, [{
      key: "firstChild",
      get: function get() {
        return _classPrivateFieldGet(_firstChild, this);
      }
    }, {
      key: "lastChild",
      get: function get() {
        return _classPrivateFieldGet(_lastChild, this);
      }
    }, {
      key: "parentNode",
      get: function get() {
        return _classPrivateFieldGet(_firstChild, this).parentNode;
      }
    }, {
      key: "remove",
      value: function remove() {
        _remove(this, false);
      }
    }, {
      key: "replaceWith",
      value: function replaceWith(node) {
        _remove(this, true).replaceWith(node);
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        var parentNode = this.parentNode;
        if (parentNode === this) {
          if (_classPrivateFieldGet(_nodes, this) === empty) _classPrivateFieldSet(_nodes, this, _toConsumableArray(this.childNodes));
        } else {
          /* c8 ignore start */
          // there are cases where a fragment might be just appended
          // out of the box without valueOf() invoke (first render).
          // When these are moved around and lose their parent and,
          // such parent is not the fragment itself, it's possible there
          // where changes or mutations in there to take care about.
          // This is a render-only specific issue but it's tested and
          // it's worth fixing to me to have more consistent fragments.
          if (parentNode) {
            var firstChild = this.firstChild,
              lastChild = this.lastChild;
            _classPrivateFieldSet(_nodes, this, [firstChild]);
            while (firstChild !== lastChild) _classPrivateFieldGet(_nodes, this).push(firstChild = firstChild.nextSibling);
          }
          /* c8 ignore stop */
          this.replaceChildren.apply(this, _toConsumableArray(_classPrivateFieldGet(_nodes, this)));
        }
        return this;
      }
    }]);
  }(custom(DocumentFragment));

  var setAttribute = function setAttribute(element, name, value) {
    return element.setAttribute(name, value);
  };

  /**
   * @param {Element} element
   * @param {string} name
   * @returns {void}
   */
  var removeAttribute = function removeAttribute(element, name) {
    return element.removeAttribute(name);
  };

  /**
   * @template T
   * @param {Element} element
   * @param {T} value
   * @returns {T}
   */
  var aria = function aria(element, value) {
    for (var key in value) {
      var $ = value[key];
      var name = key === 'role' ? key : "aria-".concat(key);
      if ($ == null) removeAttribute(element, name);else setAttribute(element, name, $);
    }
    return value;
  };
  var listeners;

  /**
   * @template T
   * @param {Element} element
   * @param {T} value
   * @param {string} name
   * @returns {T}
   */
  var at = function at(element, value, name) {
    name = name.slice(1);
    if (!listeners) listeners = new WeakMap();
    var known = listeners.get(element) || set(listeners, element, {});
    var current = known[name];
    if (current && current[0]) element.removeEventListener.apply(element, [name].concat(_toConsumableArray(current)));
    current = isArray(value) ? value : [value, false];
    known[name] = current;
    if (current[0]) element.addEventListener.apply(element, [name].concat(_toConsumableArray(current)));
    return value;
  };

  /**
   * @template T
   * @param {import("./literals.js").Detail} detail
   * @param {T} value
   * @returns {T}
   */
  var hole = function hole(detail, value) {
    var node = detail.t,
      hole = detail.n;
    var nullish = false;
    switch (_typeof(value)) {
      case 'object':
        if (value !== null) {
          (hole || node).replaceWith(detail.n = value.valueOf());
          break;
        }
      case 'undefined':
        nullish = true;
      default:
        node.data = nullish ? '' : value;
        if (hole) {
          detail.n = null;
          hole.replaceWith(node);
        }
        break;
    }
    return value;
  };

  /**
   * @template T
   * @param {Element} element
   * @param {T} value
   * @returns {T}
   */
  var className = function className(element, value) {
    return maybeDirect(element, value, value == null ? 'class' : 'className');
  };

  /**
   * @template T
   * @param {Element} element
   * @param {T} value
   * @returns {T}
   */
  var data = function data(element, value) {
    var dataset = element.dataset;
    for (var key in value) {
      if (value[key] == null) delete dataset[key];else dataset[key] = value[key];
    }
    return value;
  };

  /**
   * @template T
   * @param {Element | CSSStyleDeclaration} ref
   * @param {T} value
   * @param {string} name
   * @returns {T}
   */
  var direct = function direct(ref, value, name) {
    return ref[name] = value;
  };

  /**
   * @template T
   * @param {Element} element
   * @param {T} value
   * @param {string} name
   * @returns {T}
   */
  var dot = function dot(element, value, name) {
    return direct(element, value, name.slice(1));
  };

  /**
   * @template T
   * @param {Element} element
   * @param {T} value
   * @param {string} name
   * @returns {T}
   */
  var maybeDirect = function maybeDirect(element, value, name) {
    return value == null ? (removeAttribute(element, name), value) : direct(element, value, name);
  };

  /**
   * @template T
   * @param {Element} element
   * @param {T} value
   * @returns {T}
   */
  var ref = function ref(element, value) {
    return typeof value === 'function' ? value(element) : value.current = element, value;
  };

  /**
   * @template T
   * @param {Element} element
   * @param {T} value
   * @param {string} name
   * @returns {T}
   */
  var regular = function regular(element, value, name) {
    return value == null ? removeAttribute(element, name) : setAttribute(element, name, value), value;
  };

  /**
   * @template T
   * @param {Element} element
   * @param {T} value
   * @returns {T}
   */
  var style = function style(element, value) {
    return value == null ? maybeDirect(element, value, 'style') : direct(element.style, value, 'cssText');
  };

  /**
   * @template T
   * @param {Element} element
   * @param {T} value
   * @param {string} name
   * @returns {T}
   */
  var toggle = function toggle(element, value, name) {
    return element.toggleAttribute(name.slice(1), value), value;
  };

  /**
   * @param {Node} node
   * @param {Node[]} value
   * @param {string} _
   * @param {Node[]} prev
   * @returns {Node[]}
   */
  var array = function array(node, value, prev) {
    // normal diff
    var length = value.length;
    node.data = "[".concat(length, "]");
    if (length) return udomdiff(node.parentNode, prev, value, diffFragment, node);
    /* c8 ignore start */
    switch (prev.length) {
      case 1:
        prev[0].remove();
      case 0:
        break;
      default:
        drop(diffFragment(prev[0], 0), diffFragment(prev.at(-1), -0), false);
        break;
    }
    /* c8 ignore stop */
    return empty;
  };
  var attr = new Map([['aria', aria], ['class', className], ['data', data], ['ref', ref], ['style', style]]);

  /**
   * @param {HTMLElement | SVGElement} element
   * @param {string} name
   * @param {boolean} svg
   * @returns
   */
  var attribute = function attribute(element, name, svg) {
    var _gPD;
    switch (name[0]) {
      case '.':
        return dot;
      case '?':
        return toggle;
      case '@':
        return at;
      default:
        return svg || 'ownerSVGElement' in element ? name === 'ref' ? ref : regular : attr.get(name) || (name in element ? name.startsWith('on') ? direct : (_gPD = gPD(element, name)) !== null && _gPD !== void 0 && _gPD.set ? maybeDirect : regular : regular);
    }
  };

  /**
   * @template T
   * @param {Element} element
   * @param {T} value
   * @returns {T}
   */
  var text = function text(element, value) {
    return element.textContent = value == null ? '' : value, value;
  };

  /** @typedef {import("./persistent-fragment.js").PersistentFragment} PersistentFragment */
  /** @typedef {import("./rabbit.js").Hole} Hole */

  /** @typedef {unknown} Value */
  /** @typedef {Node | Element | PersistentFragment} Target */
  /** @typedef {null | undefined | string | number | boolean | Node | Element | PersistentFragment} DOMValue */
  /** @typedef {Hole | Node} ArrayValue */

  var abc = function abc(a, b, c) {
    return {
      a: a,
      b: b,
      c: c
    };
  };
  var bc = function bc(b, c) {
    return {
      b: b,
      c: c
    };
  };

  /**
   * @typedef {Object} Detail
   * @property {any} v the current value of the interpolation / hole
   * @property {function} u the callback to update the value
   * @property {Node} t the target comment node or element
   * @property {string | null | Node} n the attribute name, if any, or `null`
   * @property {Cache | ArrayValue[] | null} c the cache value for this detail
   */

  /**
   * @returns {Detail}
   */
  var detail = function detail(u, t, n, c) {
    return {
      v: empty,
      u: u,
      t: t,
      n: n,
      c: c
    };
  };

  /**
   * @typedef {Object} Entry
   * @property {number[]} a the path to retrieve the node
   * @property {function} b the update function
   * @property {string | null} c the attribute name, if any, or `null`
   */

  /**
   * @typedef {Object} Cache
   * @property {null | TemplateStringsArray} a the cached template
   * @property {null | Node | PersistentFragment} b the node returned when parsing the template
   * @property {Detail[]} c the list of updates to perform
   */

  /**
   * @returns {Cache}
   */
  var cache$1 = function cache() {
    return abc(null, null, empty);
  };

  /** @param {(template: TemplateStringsArray, values: any[]) => import("./parser.js").Resolved} parse */
  var create$1 = (function (parse) {
    return (
      /**
       * @param {TemplateStringsArray} template
       * @param {any[]} values
       * @returns {import("./literals.js").Cache}
       */
      function (template, values) {
        var _parse = parse(template, values),
          fragment = _parse.a,
          entries = _parse.b,
          direct = _parse.c;
        var root = document.importNode(fragment, true);
        /** @type {import("./literals.js").Detail[]} */
        var details = empty;
        if (entries !== empty) {
          details = [];
          for (var current, prev, i = 0; i < entries.length; i++) {
            var _entries$i = entries[i],
              path = _entries$i.a,
              update = _entries$i.b,
              name = _entries$i.c;
            var node = path === prev ? current : current = find(root, prev = path);
            details[i] = detail(update, node, name, update === array ? [] : update === hole ? cache$1() : null);
          }
        }
        return bc(direct ? root.firstChild : new PersistentFragment(root), details);
      }
    );
  });

  var TEXT_ELEMENTS = /^(?:plaintext|script|style|textarea|title|xmp)$/i;
  var VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;

  var elements = /<([a-zA-Z0-9]+[a-zA-Z0-9:._-]*)([^>]*?)(\/?)>/g;
  var attributes = /([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g;
  var holes = /[\x01\x02]/g;

  // \x01 Node.ELEMENT_NODE
  // \x02 Node.ATTRIBUTE_NODE

  /**
   * Given a template, find holes as both nodes and attributes and
   * return a string with holes as either comment nodes or named attributes.
   * @param {string[]} template a template literal tag array
   * @param {string} prefix prefix to use per each comment/attribute
   * @param {boolean} xml enforces self-closing tags
   * @returns {string} X/HTML with prefixed comments or attributes
   */
  var parser$1 = (function (template, prefix, xml) {
    var i = 0;
    return template.join('\x01').trim().replace(elements, function (_, name, attrs, selfClosing) {
      return "<".concat(name).concat(attrs.replace(attributes, '\x02=$2$1').trimEnd()).concat(selfClosing ? xml || VOID_ELEMENTS.test(name) ? ' /' : "></".concat(name) : '', ">");
    }).replace(holes, function (hole) {
      return hole === '\x01' ? "<!--".concat(prefix + i++, "-->") : prefix + i++;
    });
  });

  var template = document.createElement('template'),
    svg$1,
    range;

  /**
   * @param {string} text
   * @param {boolean} xml
   * @returns {DocumentFragment}
   */
  var createContent = (function (text, xml) {
    if (xml) {
      if (!svg$1) {
        svg$1 = document.createElementNS(SVG_NAMESPACE, 'svg');
        range = newRange();
        range.selectNodeContents(svg$1);
      }
      return range.createContextualFragment(text);
    }
    template.innerHTML = text;
    var _template = template,
      content = _template.content;
    template = template.cloneNode(false);
    return content;
  });

  /** @typedef {import("./literals.js").Entry} Entry */

  /**
   * @typedef {Object} Resolved
   * @param {DocumentFragment} f content retrieved from the template
   * @param {Entry[]} e entries per each hole in the template
   * @param {boolean} d direct node to handle
   */

  /**
   * @param {Element} node
   * @returns {number[]}
   */
  var createPath = function createPath(node) {
    var path = [];
    var parentNode;
    while (parentNode = node.parentNode) {
      path.push(path.indexOf.call(parentNode.childNodes, node));
      node = parentNode;
    }
    return path;
  };
  var textNode = function textNode() {
    return document.createTextNode('');
  };

  /**
   * @param {TemplateStringsArray} template
   * @param {boolean} xml
   * @returns {Resolved}
   */
  var resolve = function resolve(template, values, xml) {
    var content = createContent(parser$1(template, prefix, xml), xml);
    var length = template.length;
    var entries = empty;
    if (length > 1) {
      var replace = [];
      var tw = document.createTreeWalker(content, 1 | 128);
      var i = 0,
        search = "".concat(prefix).concat(i++);
      entries = [];
      while (i < length) {
        var node = tw.nextNode();
        // these are holes or arrays
        if (node.nodeType === COMMENT_NODE) {
          if (node.data === search) {
            // ⚠️ once array, always array!
            var update = isArray(values[i - 1]) ? array : hole;
            if (update === hole) replace.push(node);
            entries.push(abc(createPath(node), update, null));
            search = "".concat(prefix).concat(i++);
          }
        } else {
          var path = void 0;
          // these are attributes
          while (node.hasAttribute(search)) {
            if (!path) path = createPath(node);
            var name = node.getAttribute(search);
            entries.push(abc(path, attribute(node, name, xml), name));
            removeAttribute(node, search);
            search = "".concat(prefix).concat(i++);
          }
          // these are special text-only nodes
          if (!xml && TEXT_ELEMENTS.test(node.localName) && node.textContent.trim() === "<!--".concat(search, "-->")) {
            entries.push(abc(path || createPath(node), text, null));
            search = "".concat(prefix).concat(i++);
          }
        }
      }
      // can't replace holes on the fly or the tree walker fails
      for (i = 0; i < replace.length; i++) replace[i].replaceWith(textNode());
    }

    // need to decide if there should be a persistent fragment
    var childNodes = content.childNodes;
    var len = childNodes.length;

    // html`` or svg`` to signal an empty content
    // these nodes can be passed directly as never mutated
    if (len < 1) {
      len = 1;
      content.appendChild(textNode());
    }
    // html`${'b'}` or svg`${[]}` cases
    else if (len === 1 &&
    // ignore html`static` or svg`static` because
    // these nodes can be passed directly as never mutated
    length !== 1 && childNodes[0].nodeType !== ELEMENT_NODE) {
      // use a persistent fragment for these cases too
      len = 0;
    }
    return set(cache, template, abc(content, entries, len === 1));
  };

  /** @type {WeakMap<TemplateStringsArray, Resolved>} */
  var cache = new WeakMap();
  var prefix = 'isµ';

  /**
   * @param {boolean} xml
   * @returns {(template: TemplateStringsArray, values: any[]) => Resolved}
   */
  var parser = (function (xml) {
    return function (template, values) {
      return cache.get(template) || resolve(template, values, xml);
    };
  });

  var createHTML = create$1(parser(false));
  var createSVG = create$1(parser(true));

  /**
   * @param {import("./literals.js").Cache} info
   * @param {Hole} hole
   * @returns {Node}
   */
  var _unroll = function unroll(info, _ref) {
    var s = _ref.s,
      t = _ref.t,
      v = _ref.v;
    if (info.a !== t) {
      var _ref2 = (s ? createSVG : createHTML)(t, v),
        b = _ref2.b,
        c = _ref2.c;
      info.a = t;
      info.b = b;
      info.c = c;
    }
    for (var _c = info.c, i = 0; i < _c.length; i++) {
      var value = v[i];
      var detail = _c[i];
      switch (detail.u) {
        case array:
          detail.v = array(detail.t, unrollValues(detail.c, value), detail.v);
          break;
        case hole:
          var current = value instanceof Hole ? _unroll(detail.c || (detail.c = cache$1()), value) : (detail.c = null, value);
          if (current !== detail.v) detail.v = hole(detail, current);
          break;
        default:
          if (value !== detail.v) detail.v = detail.u(detail.t, value, detail.n, detail.v);
          break;
      }
    }
    return info.b;
  };

  /**
   * @param {Cache} cache
   * @param {any[]} values
   * @returns {number}
   */
  var unrollValues = function unrollValues(stack, values) {
    var i = 0,
      length = values.length;
    if (length < stack.length) stack.splice(length);
    for (; i < length; i++) {
      var value = values[i];
      if (value instanceof Hole) values[i] = _unroll(stack[i] || (stack[i] = cache$1()), value);else stack[i] = null;
    }
    return values;
  };

  /**
   * Holds all details needed to render the content on a render.
   * @constructor
   * @param {boolean} svg The content type.
   * @param {TemplateStringsArray} template The template literals used to the define the content.
   * @param {any[]} values Zero, one, or more interpolated values to render.
   */
  var Hole = /*#__PURE__*/function () {
    function Hole(svg, template, values) {
      _classCallCheck(this, Hole);
      this.s = svg;
      this.t = template;
      this.v = values;
    }
    return _createClass(Hole, [{
      key: "toDOM",
      value: function toDOM() {
        var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : cache$1();
        return _unroll(info, this);
      }
    }]);
  }();

  /** @typedef {import("../rabbit.js").Hole} Hole */

  /** @type {WeakMap<Element | DocumentFragment, import("../literals.js").Cache>} */
  var known = new WeakMap();

  /**
   * Render with smart updates within a generic container.
   * @template T
   * @param {T} where the DOM node where to render content
   * @param {(() => Hole) | Hole} what the hole to render
   * @returns
   */
  var render = (function (where, what) {
    var info = known.get(where) || set(known, where, cache$1());
    var b = info.b;
    if (b !== (typeof what === 'function' ? what() : what).toDOM(info)) where.replaceChildren(info.b.valueOf());
    return where;
  });

  /*! (c) Andrea Giammarchi - MIT */

  /** @typedef {import("./literals.js").Value} Value */

  var tag = function tag(svg) {
    return function (template) {
      for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
      }
      return new Hole(svg, template, values);
    };
  };

  /** @type {(template: TemplateStringsArray, ...values:Value[]) => Hole} A tag to render HTML content. */
  var html = tag(false);

  /** @type {(template: TemplateStringsArray, ...values:Value[]) => Hole} A tag to render SVG content. */
  var svg = tag(true);

  var umap = (function (_) {
    return {
      // About: get: _.get.bind(_)
      // It looks like WebKit/Safari didn't optimize bind at all,
      // so that using bind slows it down by 60%.
      // Firefox and Chrome are just fine in both cases,
      // so let's use the approach that works fast everywhere 👍
      get: function get(key) {
        return _.get(key);
      },
      set: function set(key, value) {
        return _.set(key, value), value;
      }
    };
  });

  function css (t) {
    for (var s = t[0], i = 1, l = arguments.length; i < l; i++) s += arguments[i] + t[i];
    return s;
  }

  var defineProperties$1 = Object.defineProperties,
    keys$1 = Object.keys;
  var accessor = function accessor(all, shallow, hook, value, update) {
    return {
      configurable: true,
      get: function get() {
        return value;
      },
      set: function set(_) {
        if (all || _ !== value || shallow && _typeof(_) === 'object' && _) {
          value = _;
          if (hook) update.call(this, value);else update.call(this);
        }
      }
    };
  };
  var loop = function loop(props, get, all, shallow, useState, update) {
    var desc = {};
    var hook = useState !== noop;
    var args = [all, shallow, hook];
    for (var ke = keys$1(props), y = 0; y < ke.length; y++) {
      var value = get(props, ke[y]);
      var extras = hook ? useState(value) : [value, useState];
      if (update) extras[1] = update;
      desc[ke[y]] = accessor.apply(null, args.concat(extras));
    }
    return desc;
  };
  var noop = function noop() {};

  var domHandler = (function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$all = _ref.all,
      all = _ref$all === void 0 ? false : _ref$all,
      _ref$shallow = _ref.shallow,
      shallow = _ref$shallow === void 0 ? true : _ref$shallow,
      _ref$useState = _ref.useState,
      useState = _ref$useState === void 0 ? noop : _ref$useState,
      _ref$getAttribute = _ref.getAttribute,
      getAttribute = _ref$getAttribute === void 0 ? function (element, key) {
        return element.getAttribute(key);
      } : _ref$getAttribute;
    return function (element, props, update) {
      var value = function value(props, key) {
        var result = props[key],
          type = _typeof(result);
        if (element.hasOwnProperty(key)) {
          result = element[key];
          delete element[key];
        } else if (element.hasAttribute(key)) {
          result = getAttribute(element, key);
          if (type == 'number') result = +result;else if (type == 'boolean') result = !/^(?:false|0|)$/.test(result);
        }
        return result;
      };
      var desc = loop(props, value, all, shallow, useState, update);
      return defineProperties$1(element, desc);
    };
  });

  function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var reactive = domHandler({
    dom: true
  });
  var CE = customElements;
  var defineCustomElement = CE.define;
  var parse = JSON.parse,
    stringify = JSON.stringify;
  var create = Object.create,
    defineProperties = Object.defineProperties,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
    keys = Object.keys;
  var element = 'element';
  var ownProps = new WeakMap();
  var constructors = umap(new Map([[element, {
    c: HTMLElement,
    e: element
  }]]));
  var el = function el(name) {
    return document.createElement(name);
  };
  var info = function info(e) {
    return constructors.get(e) || constructors.set(e, {
      c: el(e).constructor,
      e: e
    });
  };
  var define = function define(tagName, definition) {
    var attachShadow = definition.attachShadow,
      attributeChanged = definition.attributeChanged,
      bound = definition.bound,
      connected = definition.connected,
      disconnected = definition.disconnected,
      formAssociated = definition.formAssociated,
      handleEvent = definition.handleEvent,
      init = definition.init,
      observedAttributes = definition.observedAttributes,
      props = definition.props,
      render = definition.render,
      style = definition.style;
    var initialized = new WeakMap();
    var statics = {};
    var proto = {};
    var listeners = [];
    var retype = create(null);
    var bootstrap = function bootstrap(element, key, value) {
      if (!initialized.has(element)) {
        initialized.set(element, 0);
        defineProperties(element, {
          html: {
            configurable: true,
            value: content.bind(attachShadow ? element.attachShadow(attachShadow) : element)
          }
        });
        for (var i = 0; i < length; i++) {
          var _listeners$i = listeners[i],
            type = _listeners$i.type,
            options = _listeners$i.options;
          element.addEventListener(type, element, options);
        }
        if (bound) bound.forEach(bind, element);
        if (props) {
          var reProps = {};
          for (var k = keys(props), _i = 0; _i < k.length; _i++) {
            var _key = k[_i];
            var _value = props[_key];
            reProps[_key] = _typeof(_value) === 'object' ? parse(stringify(_value)) : _value;
          }
          ownProps.set(element, reProps);
          reactive(element, reProps, render);
        }
        if (init || render) (init || render).call(element);
        if (key) element[key] = value;
      }
    };
    for (var k = keys(definition), i = 0, _length = k.length; i < _length; i++) {
      var key = k[i];
      if (/^on./.test(key) && !/Options$/.test(key)) {
        var options = definition[key + 'Options'] || false;
        var lower = key.toLowerCase();
        var type = lower.slice(2);
        listeners.push({
          type: type,
          options: options
        });
        retype[type] = key;
        if (lower !== key) {
          type = lower.slice(2, 3) + key.slice(3);
          retype[type] = key;
          listeners.push({
            type: type,
            options: options
          });
        }
      }
      switch (key) {
        case 'attachShadow':
        case 'constructor':
        case 'observedAttributes':
        case 'style':
          break;
        default:
          proto[key] = getOwnPropertyDescriptor(definition, key);
      }
    }
    var length = listeners.length;
    if (length && !handleEvent) proto.handleEvent = {
      value: function value(event) {
        this[retype[event.type]](event);
      }
    };

    // [props]
    if (props !== null) {
      if (props) {
        var _loop = function _loop() {
          var key = _k[_i2];
          proto[key] = {
            get: function get() {
              bootstrap(this);
              return ownProps.get(this)[key];
            },
            set: function set(value) {
              bootstrap(this, key, value);
            }
          };
        };
        for (var _k = keys(props), _i2 = 0; _i2 < _k.length; _i2++) {
          _loop();
        }
      } else {
        proto.props = {
          get: function get() {
            var props = {};
            for (var attributes = this.attributes, _length2 = attributes.length, _i3 = 0; _i3 < _length2; _i3++) {
              var _attributes$_i = attributes[_i3],
                name = _attributes$_i.name,
                value = _attributes$_i.value;
              props[name] = value;
            }
            return props;
          }
        };
      }
    }
    // [/props]

    if (observedAttributes) statics.observedAttributes = {
      value: observedAttributes
    };
    proto.attributeChangedCallback = {
      value: function value() {
        bootstrap(this);
        if (attributeChanged) attributeChanged.apply(this, arguments);
      }
    };
    if (formAssociated) {
      statics.formAssociated = {
        value: formAssociated
      };
    }
    proto.connectedCallback = {
      value: function value() {
        bootstrap(this);
        if (connected) connected.call(this);
      }
    };
    if (disconnected) proto.disconnectedCallback = {
      value: disconnected
    };
    var _info = info(definition["extends"] || element),
      c = _info.c,
      e = _info.e;
    var MicroElement = /*#__PURE__*/function (_c) {
      function MicroElement() {
        _classCallCheck(this, MicroElement);
        return _callSuper(this, MicroElement, arguments);
      }
      _inherits(MicroElement, _c);
      return _createClass(MicroElement);
    }(c);
    defineProperties(MicroElement, statics);
    defineProperties(MicroElement.prototype, proto);
    var args = [tagName, MicroElement];
    if (e !== element) args.push({
      "extends": e
    });
    defineCustomElement.apply(CE, args);
    constructors.set(tagName, {
      c: MicroElement,
      e: e
    });
    if (style) document.head.appendChild(el('style')).textContent = style(e === element ? tagName : e + '[is="' + tagName + '"]');
    return MicroElement;
  };

  /* istanbul ignore else */
  if (!CE.get('uce-lib'))
    // theoretically this could be just class { ... }
    // however, if there is for whatever reason a <uce-lib>
    // element on the page, it will break once the registry
    // will try to upgrade such element so ... HTMLElement it is.
    CE.define('uce-lib', /*#__PURE__*/function (_info$c) {
      function _class() {
        _classCallCheck(this, _class);
        return _callSuper(this, _class, arguments);
      }
      _inherits(_class, _info$c);
      return _createClass(_class, null, [{
        key: "define",
        get: function get() {
          return define;
        }
      }, {
        key: "render",
        get: function get() {
          return render;
        }
      }, {
        key: "html",
        get: function get() {
          return html;
        }
      }, {
        key: "svg",
        get: function get() {
          return svg;
        }
      }, {
        key: "css",
        get: function get() {
          return css;
        }
      }]);
    }(info(element).c));
  function bind(method) {
    this[method] = this[method].bind(this);
  }
  function content() {
    return render(this, html.apply(null, arguments));
  }

  exports.css = css;
  exports.define = define;
  exports.html = html;
  exports.render = render;
  exports.svg = svg;

  return exports;

})({});
