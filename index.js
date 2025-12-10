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

  var DEBUG = true;

  function _superPropBase(t, o) {
    for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
    return t;
  }

  function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }

  function _get$1() {
    return _get$1 = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
      var p = _superPropBase(e, t);
      if (p) {
        var n = Object.getOwnPropertyDescriptor(p, t);
        return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
      }
    }, _get$1.apply(null, arguments);
  }

  var ReactiveFlags;
  (function (ReactiveFlags) {
    ReactiveFlags[ReactiveFlags["None"] = 0] = "None";
    ReactiveFlags[ReactiveFlags["Mutable"] = 1] = "Mutable";
    ReactiveFlags[ReactiveFlags["Watching"] = 2] = "Watching";
    ReactiveFlags[ReactiveFlags["RecursedCheck"] = 4] = "RecursedCheck";
    ReactiveFlags[ReactiveFlags["Recursed"] = 8] = "Recursed";
    ReactiveFlags[ReactiveFlags["Dirty"] = 16] = "Dirty";
    ReactiveFlags[ReactiveFlags["Pending"] = 32] = "Pending";
  })(ReactiveFlags || (ReactiveFlags = {}));
  function createReactiveSystem(_ref) {
    var update = _ref.update,
      notify = _ref.notify,
      unwatched = _ref.unwatched;
    var currentVersion = 0;
    return {
      link: link,
      unlink: unlink,
      propagate: propagate,
      checkDirty: checkDirty,
      endTracking: endTracking,
      startTracking: startTracking,
      shallowPropagate: shallowPropagate
    };
    function link(dep, sub) {
      var prevDep = sub.depsTail;
      if (prevDep !== undefined && prevDep.dep === dep) {
        return;
      }
      var nextDep = prevDep !== undefined ? prevDep.nextDep : sub.deps;
      if (nextDep !== undefined && nextDep.dep === dep) {
        nextDep.version = currentVersion;
        sub.depsTail = nextDep;
        return;
      }
      var prevSub = dep.subsTail;
      if (prevSub !== undefined && prevSub.version === currentVersion && prevSub.sub === sub) {
        return;
      }
      var newLink = sub.depsTail = dep.subsTail = {
        version: currentVersion,
        dep: dep,
        sub: sub,
        prevDep: prevDep,
        nextDep: nextDep,
        prevSub: prevSub,
        nextSub: undefined
      };
      if (nextDep !== undefined) {
        nextDep.prevDep = newLink;
      }
      if (prevDep !== undefined) {
        prevDep.nextDep = newLink;
      } else {
        sub.deps = newLink;
      }
      if (prevSub !== undefined) {
        prevSub.nextSub = newLink;
      } else {
        dep.subs = newLink;
      }
    }
    function unlink(link) {
      var sub = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : link.sub;
      var dep = link.dep;
      var prevDep = link.prevDep;
      var nextDep = link.nextDep;
      var nextSub = link.nextSub;
      var prevSub = link.prevSub;
      if (nextDep !== undefined) {
        nextDep.prevDep = prevDep;
      } else {
        sub.depsTail = prevDep;
      }
      if (prevDep !== undefined) {
        prevDep.nextDep = nextDep;
      } else {
        sub.deps = nextDep;
      }
      if (nextSub !== undefined) {
        nextSub.prevSub = prevSub;
      } else {
        dep.subsTail = prevSub;
      }
      if (prevSub !== undefined) {
        prevSub.nextSub = nextSub;
      } else if ((dep.subs = nextSub) === undefined) {
        unwatched(dep);
      }
      return nextDep;
    }
    function propagate(link) {
      var next = link.nextSub;
      var stack;
      top: do {
        var sub = link.sub;
        var flags = sub.flags;
        if (!(flags & 60)) {
          sub.flags = flags | 32;
        } else if (!(flags & 12)) {
          flags = 0;
        } else if (!(flags & 4)) {
          sub.flags = flags & -9 | 32;
        } else if (!(flags & 48) && isValidLink(link, sub)) {
          sub.flags = flags | 40;
          flags &= 1;
        } else {
          flags = 0;
        }
        if (flags & 2) {
          notify(sub);
        }
        if (flags & 1) {
          var subSubs = sub.subs;
          if (subSubs !== undefined) {
            var nextSub = (link = subSubs).nextSub;
            if (nextSub !== undefined) {
              stack = {
                value: next,
                prev: stack
              };
              next = nextSub;
            }
            continue;
          }
        }
        if ((link = next) !== undefined) {
          next = link.nextSub;
          continue;
        }
        while (stack !== undefined) {
          link = stack.value;
          stack = stack.prev;
          if (link !== undefined) {
            next = link.nextSub;
            continue top;
          }
        }
        break;
      } while (true);
    }
    function startTracking(sub) {
      ++currentVersion;
      sub.depsTail = undefined;
      sub.flags = sub.flags & -57 | 4;
    }
    function endTracking(sub) {
      var depsTail = sub.depsTail;
      var toRemove = depsTail !== undefined ? depsTail.nextDep : sub.deps;
      while (toRemove !== undefined) {
        toRemove = unlink(toRemove, sub);
      }
      sub.flags &= -5;
    }
    function checkDirty(link, sub) {
      var stack;
      var checkDepth = 0;
      var dirty = false;
      top: do {
        var dep = link.dep;
        var flags = dep.flags;
        if (sub.flags & 16) {
          dirty = true;
        } else if ((flags & 17) === 17) {
          if (update(dep)) {
            var subs = dep.subs;
            if (subs.nextSub !== undefined) {
              shallowPropagate(subs);
            }
            dirty = true;
          }
        } else if ((flags & 33) === 33) {
          if (link.nextSub !== undefined || link.prevSub !== undefined) {
            stack = {
              value: link,
              prev: stack
            };
          }
          link = dep.deps;
          sub = dep;
          ++checkDepth;
          continue;
        }
        if (!dirty) {
          var nextDep = link.nextDep;
          if (nextDep !== undefined) {
            link = nextDep;
            continue;
          }
        }
        while (checkDepth--) {
          var firstSub = sub.subs;
          var hasMultipleSubs = firstSub.nextSub !== undefined;
          if (hasMultipleSubs) {
            link = stack.value;
            stack = stack.prev;
          } else {
            link = firstSub;
          }
          if (dirty) {
            if (update(sub)) {
              if (hasMultipleSubs) {
                shallowPropagate(firstSub);
              }
              sub = link.sub;
              continue;
            }
            dirty = false;
          } else {
            sub.flags &= -33;
          }
          sub = link.sub;
          var _nextDep = link.nextDep;
          if (_nextDep !== undefined) {
            link = _nextDep;
            continue top;
          }
        }
        return dirty;
      } while (true);
    }
    function shallowPropagate(link) {
      do {
        var sub = link.sub;
        var flags = sub.flags;
        if ((flags & 48) === 32) {
          sub.flags = flags | 16;
          if (flags & 2) {
            notify(sub);
          }
        }
      } while ((link = link.nextSub) !== undefined);
    }
    function isValidLink(checkLink, sub) {
      var link = sub.depsTail;
      while (link !== undefined) {
        if (link === checkLink) {
          return true;
        }
        link = link.prevDep;
      }
      return false;
    }
  }

  var pauseStack = [];
  var _createReactiveSystem = createReactiveSystem({
      update: function update(signal) {
        if ('getter' in signal) {
          return updateComputed(signal);
        } else {
          return updateSignal(signal, signal.value);
        }
      },
      notify: notify,
      unwatched: function unwatched(node) {
        if ('getter' in node) {
          var toRemove = node.deps;
          if (toRemove !== undefined) {
            node.flags = 17;
            do {
              toRemove = unlink(toRemove, node);
            } while (toRemove !== undefined);
          }
        } else if (!('previousValue' in node)) {
          effectOper.call(node);
        }
      }
    }),
    link = _createReactiveSystem.link,
    unlink = _createReactiveSystem.unlink;
    _createReactiveSystem.propagate;
    _createReactiveSystem.checkDirty;
    var endTracking = _createReactiveSystem.endTracking,
    startTracking = _createReactiveSystem.startTracking;
    _createReactiveSystem.shallowPropagate;
  var activeSub;
  var activeScope;
  function setCurrentSub(sub) {
    var prevSub = activeSub;
    activeSub = sub;
    return prevSub;
  }
  function setCurrentScope(scope) {
    var prevScope = activeScope;
    activeScope = scope;
    return prevScope;
  }
  function pauseTracking() {
    pauseStack.push(setCurrentSub(undefined));
  }
  function resumeTracking() {
    setCurrentSub(pauseStack.pop());
  }
  function effect(fn) {
    var e = {
      fn: fn,
      subs: undefined,
      subsTail: undefined,
      deps: undefined,
      depsTail: undefined,
      flags: 2
    };
    if (activeSub !== undefined) {
      link(e, activeSub);
    } else if (activeScope !== undefined) {
      link(e, activeScope);
    }
    var prev = setCurrentSub(e);
    try {
      e.fn();
    } finally {
      setCurrentSub(prev);
    }
    return effectOper.bind(e);
  }
  function effectScope(fn) {
    var e = {
      deps: undefined,
      depsTail: undefined,
      subs: undefined,
      subsTail: undefined,
      flags: 0
    };
    if (activeScope !== undefined) {
      link(e, activeScope);
    }
    var prevSub = setCurrentSub(undefined);
    var prevScope = setCurrentScope(e);
    try {
      fn();
    } finally {
      setCurrentScope(prevScope);
      setCurrentSub(prevSub);
    }
    return effectOper.bind(e);
  }
  function updateComputed(c) {
    var prevSub = setCurrentSub(c);
    startTracking(c);
    try {
      var oldValue = c.value;
      return oldValue !== (c.value = c.getter(oldValue));
    } finally {
      setCurrentSub(prevSub);
      endTracking(c);
    }
  }
  function updateSignal(s, value) {
    s.flags = 1;
    return s.previousValue !== (s.previousValue = value);
  }
  function notify(e) {
    var flags = e.flags;
    if (!(flags & 64)) {
      e.flags = flags | 64;
      var subs = e.subs;
      if (subs !== undefined) {
        notify(subs.sub);
      }
    }
  }
  function effectOper() {
    var dep = this.deps;
    while (dep !== undefined) {
      dep = unlink(dep, this);
    }
    var sub = this.subs;
    if (sub !== undefined) {
      unlink(sub);
    }
    this.flags = 0;
  }

  /**
   * @template T
   * @param {function(): T} fn
   * @returns {T}
   */
  var untracked = function untracked(fn) {
    pauseTracking();
    try {
      return fn();
    } finally {
      resumeTracking();
    }
  };

  /**
   * @template T
   */
  var Signal = /*#__PURE__*/function () {
    /**
     * @param {(value: T) => T} fn
     * @param {T} value
     */
    function Signal(fn, value) {
      _classCallCheck(this, Signal);
      this._ = fn(value);
    }

    /** @returns {T} */
    return _createClass(Signal, [{
      key: "value",
      get: function get() {
        return this._();
      }

      /** @param {T} value */,
      set: function set(value) {
        this._(value);
      }

      /** @returns {T} */
    }, {
      key: "peek",
      value: function peek() {
        return untracked(this._);
      }

      /** @returns {T} */
    }, {
      key: "valueOf",
      value: function valueOf() {
        return this.value;
      }
    }]);
  }();

  function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
  function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
  function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
  function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
  function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
  var isArray = Array.isArray;
  var assign = Object.assign,
    defineProperties$2 = Object.defineProperties,
    entries = Object.entries,
    freeze = Object.freeze;
  var _data = /*#__PURE__*/new WeakMap();
  var Unsafe = /*#__PURE__*/function () {
    function Unsafe(data) {
      _classCallCheck(this, Unsafe);
      _classPrivateFieldInitSpec(this, _data, void 0);
      _classPrivateFieldSet(_data, this, data);
    }
    return _createClass(Unsafe, [{
      key: "valueOf",
      value: function valueOf() {
        return _classPrivateFieldGet(_data, this);
      }
    }, {
      key: "toString",
      value: function toString() {
        return String(_classPrivateFieldGet(_data, this));
      }
    }]);
  }();
  var createComment = function createComment(value) {
    return document.createComment(value);
  };
  /* c8 ignore stop */

  function _callSuper$2(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$3() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$3() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$3 = function _isNativeReflectConstruct() { return !!t; })(); }
  var ELEMENT = 1;
  var ATTRIBUTE$1 = 2;
  var TEXT$1 = 3;
  var COMMENT$1 = 8;
  var DOCUMENT_TYPE = 10;
  var FRAGMENT = 11;
  var COMPONENT$1 = 42;
  var TEXT_ELEMENTS = new Set(['plaintext', 'script', 'style', 'textarea', 'title', 'xmp']);
  var VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr']);
  var props$1 = freeze({});
  var children = freeze([]);
  var append = function append(node, child) {
    if (node.children === children) node.children = [];
    node.children.push(child);
    child.parent = node;
    return child;
  };
  var prop = function prop(node, name, value) {
    if (node.props === props$1) node.props = {};
    node.props[name] = value;
  };
  var addJSON = function addJSON(value, comp, json) {
    if (value !== comp) json.push(value);
  };
  var Node = /*#__PURE__*/function () {
    function Node(type) {
      _classCallCheck(this, Node);
      this.type = type;
      this.parent = null;
    }
    return _createClass(Node, [{
      key: "toJSON",
      value: function toJSON() {
        //@ts-ignore
        return [this.type, this.data];
      }
    }]);
  }();
  var Comment = /*#__PURE__*/function (_Node) {
    function Comment(data) {
      var _this;
      _classCallCheck(this, Comment);
      _this = _callSuper$2(this, Comment, [COMMENT$1]);
      _this.data = data;
      return _this;
    }
    _inherits(Comment, _Node);
    return _createClass(Comment, [{
      key: "toString",
      value: function toString() {
        return "<!--".concat(this.data, "-->");
      }
    }]);
  }(Node);
  var DocumentType = /*#__PURE__*/function (_Node2) {
    function DocumentType(data) {
      var _this2;
      _classCallCheck(this, DocumentType);
      _this2 = _callSuper$2(this, DocumentType, [DOCUMENT_TYPE]);
      _this2.data = data;
      return _this2;
    }
    _inherits(DocumentType, _Node2);
    return _createClass(DocumentType, [{
      key: "toString",
      value: function toString() {
        return "<!".concat(this.data, ">");
      }
    }]);
  }(Node);
  var Text = /*#__PURE__*/function (_Node3) {
    function Text(data) {
      var _this3;
      _classCallCheck(this, Text);
      _this3 = _callSuper$2(this, Text, [TEXT$1]);
      _this3.data = data;
      return _this3;
    }
    _inherits(Text, _Node3);
    return _createClass(Text, [{
      key: "toString",
      value: function toString() {
        return this.data;
      }
    }]);
  }(Node);
  var Component = /*#__PURE__*/function (_Node4) {
    function Component() {
      var _this4;
      _classCallCheck(this, Component);
      _this4 = _callSuper$2(this, Component, [COMPONENT$1]);
      _this4.name = 'template';
      _this4.props = props$1;
      _this4.children = children;
      return _this4;
    }
    _inherits(Component, _Node4);
    return _createClass(Component, [{
      key: "toJSON",
      value: function toJSON() {
        var json = [COMPONENT$1];
        addJSON(this.props, props$1, json);
        addJSON(this.children, children, json);
        return json;
      }
    }, {
      key: "toString",
      value: function toString() {
        var attrs = '';
        for (var key in this.props) {
          var value = this.props[key];
          if (value != null) {
            /* c8 ignore start */
            if (typeof value === 'boolean') {
              if (value) attrs += " ".concat(key);
            } else attrs += " ".concat(key, "=\"").concat(value, "\"");
            /* c8 ignore stop */
          }
        }
        return "<template".concat(attrs, ">").concat(this.children.join(''), "</template>");
      }
    }]);
  }(Node);
  var Element = /*#__PURE__*/function (_Node5) {
    function Element(name) {
      var _this5;
      var xml = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      _classCallCheck(this, Element);
      _this5 = _callSuper$2(this, Element, [ELEMENT]);
      _this5.name = name;
      _this5.xml = xml;
      _this5.props = props$1;
      _this5.children = children;
      return _this5;
    }
    _inherits(Element, _Node5);
    return _createClass(Element, [{
      key: "toJSON",
      value: function toJSON() {
        var json = [ELEMENT, this.name, +this.xml];
        addJSON(this.props, props$1, json);
        addJSON(this.children, children, json);
        return json;
      }
    }, {
      key: "toString",
      value: function toString() {
        var xml = this.xml,
          name = this.name,
          props = this.props,
          children = this.children;
        var length = children.length;
        var html = "<".concat(name);
        for (var key in props) {
          var value = props[key];
          if (value != null) {
            if (typeof value === 'boolean') {
              if (value) html += xml ? " ".concat(key, "=\"\"") : " ".concat(key);
            } else html += " ".concat(key, "=\"").concat(value, "\"");
          }
        }
        if (length) {
          html += '>';
          for (var text = !xml && TEXT_ELEMENTS.has(name), i = 0; i < length; i++) html += text ? children[i].data : children[i];
          html += "</".concat(name, ">");
        } else if (xml) html += ' />';else html += VOID_ELEMENTS.has(name) ? '>' : "></".concat(name, ">");
        return html;
      }
    }]);
  }(Node);
  var Fragment = /*#__PURE__*/function (_Node6) {
    function Fragment() {
      var _this6;
      _classCallCheck(this, Fragment);
      _this6 = _callSuper$2(this, Fragment, [FRAGMENT]);
      _this6.name = '#fragment';
      _this6.children = children;
      return _this6;
    }
    _inherits(Fragment, _Node6);
    return _createClass(Fragment, [{
      key: "toJSON",
      value: function toJSON() {
        var json = [FRAGMENT];
        addJSON(this.children, children, json);
        return json;
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.children.join('');
      }
    }]);
  }(Node);

  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }

  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = true,
        o = false;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = true, n = r;
      } finally {
        try {
          if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }

  function _arrayLikeToArray$3(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _unsupportedIterableToArray$3(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$3(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$3(r, a) : void 0;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray$3(r, e) || _nonIterableRest();
  }

  /* c8 ignore start */
  var asTemplate = function asTemplate(template) {
    var _ref, _ref$join;
    return ((_ref = (template === null || template === void 0 ? void 0 : template.raw) || template) === null || _ref === void 0 || (_ref$join = _ref.join) === null || _ref$join === void 0 ? void 0 : _ref$join.call(_ref, ',')) || 'unknown';
  };
  /* c8 ignore stop */

  var errors = {
    text: function text(template, tag, value) {
      return new SyntaxError("Mixed text and interpolations found in text only <".concat(tag, "> element ").concat(JSON.stringify(String(value)), " in template ").concat(asTemplate(template)));
    },
    unclosed: function unclosed(template, tag) {
      return new SyntaxError("The text only <".concat(tag, "> element requires explicit </").concat(tag, "> closing tag in template ").concat(asTemplate(template)));
    },
    unclosed_element: function unclosed_element(template, tag) {
      return new SyntaxError("Unclosed element <".concat(tag, "> found in template ").concat(asTemplate(template)));
    },
    invalid_content: function invalid_content(template) {
      return new SyntaxError("Invalid content \"<!\" found in template: ".concat(asTemplate(template)));
    },
    invalid_closing: function invalid_closing(template) {
      return new SyntaxError("Invalid closing tag: </... found in template: ".concat(asTemplate(template)));
    },
    invalid_nul: function invalid_nul(template) {
      return new SyntaxError("Invalid content: NUL char \\x00 found in template: ".concat(asTemplate(template)));
    },
    invalid_comment: function invalid_comment(template) {
      return new SyntaxError("Invalid comment: no closing --> found in template ".concat(asTemplate(template)));
    },
    invalid_layout: function invalid_layout(template) {
      return new SyntaxError("Too many closing tags found in template ".concat(asTemplate(template)));
    },
    invalid_doctype: function invalid_doctype(template, value) {
      return new SyntaxError("Invalid doctype: ".concat(value, " found in template ").concat(asTemplate(template)));
    },
    // DOM ONLY
    /* c8 ignore start */
    invalid_template: function invalid_template(template) {
      return new SyntaxError("Invalid template - the amount of values does not match the amount of updates: ".concat(asTemplate(template)));
    },
    invalid_path: function invalid_path(template, path) {
      return new SyntaxError("Invalid path - unreachable node at the path [".concat(path.join(', '), "] found in template ").concat(asTemplate(template)));
    },
    invalid_attribute: function invalid_attribute(template, kind) {
      return new SyntaxError("Invalid ".concat(kind, " attribute in template definition\n").concat(asTemplate(template)));
    },
    invalid_interpolation: function invalid_interpolation(template, value) {
      return new SyntaxError("Invalid interpolation - expected hole or array: ".concat(String(value), " found in template ").concat(asTemplate(template)));
    },
    invalid_hole: function invalid_hole(value) {
      return new SyntaxError("Invalid interpolation - expected hole: ".concat(String(value)));
    },
    invalid_key: function invalid_key(value) {
      return new SyntaxError("Invalid key attribute or position in template: ".concat(String(value)));
    },
    invalid_array: function invalid_array(value) {
      return new SyntaxError("Invalid array - expected html/svg but found something else: ".concat(String(value)));
    },
    invalid_component: function invalid_component(value) {
      return new SyntaxError("Invalid component: ".concat(String(value)));
    }
  };

  function _createForOfIteratorHelper$2(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray$2(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
  function _unsupportedIterableToArray$2(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray$2(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$2(r, a) : void 0; } }
  function _arrayLikeToArray$2(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  var NUL = '\x00';
  var DOUBLE_QUOTED_NUL = "\"".concat(NUL, "\"");
  var SINGLE_QUOTED_NUL = "'".concat(NUL, "'");
  var NEXT = /\x00|<[^><\s]+/g;
  var ATTRS = /([^\s/>=]+)(?:=(\x00|(?:(['"])[\s\S]*?\3)))?/g;

  // // YAGNI: NUL char in the wild is a shenanigan
  // // usage: template.map(safe).join(NUL).trim()
  // const NUL_RE = /\x00/g;
  // const safe = s => s.replace(NUL_RE, '&#0;');

  /** @typedef {import('../dom/ish.js').Node} Node */
  /** @typedef {import('../dom/ish.js').Element} Element */
  /** @typedef {import('../dom/ish.js').Component} Component */
  /** @typedef {(node: import('../dom/ish.js').Node, type: typeof ATTRIBUTE | typeof TEXT | typeof COMMENT | typeof COMPONENT, path: number[], name: string, hint: unknown) => unknown} update */
  /** @typedef {Element | Component} Container */

  /** @type {update} */
  var defaultUpdate = function defaultUpdate(_, type, path, name, hint) {
    return [type, path, name];
  };

  /**
   * @param {Node} node
   * @returns {number[]}
   */
  var path = function path(node) {
    var insideout = [];
    while (node.parent) {
      switch (node.type) {
        /* c8 ignore start */
        case COMPONENT$1:
        // fallthrough
        /* c8 ignore stop */
        case ELEMENT:
          {
            if (/** @type {Container} */node.name === 'template') insideout.push(-1);
            break;
          }
      }
      insideout.push(node.parent.children.indexOf(node));
      node = node.parent;
    }
    return insideout;
  };

  /**
   * @param {Node} node
   * @param {Set<Node>} ignore
   * @returns {Node}
   */
  var parent = function parent(node, ignore) {
    do {
      node = node.parent;
    } while (ignore.has(node));
    return node;
  };
  var parser = (function (_ref) {
    var _ref$Comment = _ref.Comment,
      Comment$1 = _ref$Comment === void 0 ? Comment : _ref$Comment,
      _ref$DocumentType = _ref.DocumentType,
      DocumentType$1 = _ref$DocumentType === void 0 ? DocumentType : _ref$DocumentType,
      _ref$Text = _ref.Text,
      Text$1 = _ref$Text === void 0 ? Text : _ref$Text,
      _ref$Fragment = _ref.Fragment,
      Fragment$1 = _ref$Fragment === void 0 ? Fragment : _ref$Fragment,
      _ref$Element = _ref.Element,
      Element$1 = _ref$Element === void 0 ? Element : _ref$Element,
      _ref$Component = _ref.Component,
      Component$1 = _ref$Component === void 0 ? Component : _ref$Component,
      _ref$update = _ref.update,
      update = _ref$update === void 0 ? defaultUpdate : _ref$update;
    return (
      /**
       * Parse a template string into a crawable JS literal tree and provide a list of updates.
       * @param {TemplateStringsArray|string[]} template
       * @param {unknown[]} holes
       * @param {boolean} xml
       * @returns {[Node, unknown[]]}
       */
      function (template, holes, xml) {
        if (template.some(function (chunk) {
          return chunk.includes(NUL);
        })) throw errors.invalid_nul(template);
        var content = template.join(NUL).trim();
        if (content.replace(/(\S+)=(['"])([\S\s]+?)\2/g, function () {
          return /^[^\x00]+\x00|\x00[^\x00]+$/.test(arguments.length <= 3 ? undefined : arguments[3]) ? xml = arguments.length <= 1 ? undefined : arguments[1] : arguments.length <= 0 ? undefined : arguments[0];
        }) !== content) throw errors.invalid_attribute(template, xml);
        var ignore = new Set();
        var values = [];
        var node = new Fragment$1(),
          pos = 0,
          skip = 0,
          hole = 0,
          resolvedPath = children;
        var _iterator = _createForOfIteratorHelper$2(content.matchAll(NEXT)),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var match = _step.value;
            // already handled via attributes or text content nodes
            if (0 < skip) {
              skip--;
              continue;
            }
            var chunk = match[0];
            var index = match.index;

            // prepend previous content, if any
            if (pos < index) append(node, new Text$1(content.slice(pos, index)));

            // holes
            if (chunk === NUL) {
              if (node.name === 'table') {
                node = append(node, new Element$1('tbody', xml));
                ignore.add(node);
              }
              var comment = append(node, new Comment$1('◦'));
              values.push(update(comment, COMMENT$1, path(comment), '', holes[hole++]));
              pos = index + 1;
            }
            // comments or doctype
            else if (chunk.startsWith('<!')) {
              var i = content.indexOf('>', index + 2);
              if (DEBUG && i < 0) throw errors.invalid_content(template);
              if (content.slice(i - 2, i + 1) === '-->') {
                if (DEBUG && i - index < 6) throw errors.invalid_comment(template);
                var data = content.slice(index + 4, i - 2);
                if (data[0] === '!') append(node, new Comment$1(data.slice(1).replace(/!$/, '')));
              } else {
                if (DEBUG && !content.slice(index + 2, i).toLowerCase().startsWith('doctype')) throw errors.invalid_doctype(template, content.slice(index + 2, i));
                append(node, new DocumentType$1(content.slice(index + 2, i)));
              }
              pos = i + 1;
            }
            // closing tag </> or </name>
            else if (chunk.startsWith('</')) {
              var _i = content.indexOf('>', index + 2);
              if (DEBUG && _i < 0) throw errors.invalid_closing(template);
              if (xml && node.name === 'svg') xml = false;
              node = /** @type {Container} */parent(node, ignore);
              if (DEBUG && !node) throw errors.invalid_layout(template);
              pos = _i + 1;
            }
            // opening tag <name> or <name />
            else {
              var _i2 = index + chunk.length;
              var j = content.indexOf('>', _i2);
              var name = chunk.slice(1);
              if (DEBUG && j < 0) throw errors.unclosed_element(template, name);
              var tag = name;
              // <${Component} ... />
              if (name === NUL) {
                tag = 'template';
                node = append(node, new Component$1());
                resolvedPath = path(node).slice(1);
                //@ts-ignore
                values.push(update(node, COMPONENT$1, resolvedPath, '', holes[hole++]));
              }
              // any other element
              else {
                if (!xml) {
                  tag = tag.toLowerCase();
                  // patch automatic elements insertion with <table>
                  // or path will fail once live on the DOM
                  if (node.name === 'table' && (tag === 'tr' || tag === 'td')) {
                    node = append(node, new Element$1('tbody', xml));
                    ignore.add(node);
                  }
                  if (node.name === 'tbody' && tag === 'td') {
                    node = append(node, new Element$1('tr', xml));
                    ignore.add(node);
                  }
                }
                node = append(node, new Element$1(tag, xml ? tag !== 'svg' : false));
                resolvedPath = children;
              }

              // attributes
              if (_i2 < j) {
                var dot = false;
                var _iterator2 = _createForOfIteratorHelper$2(content.slice(_i2, j).matchAll(ATTRS)),
                  _step2;
                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var _step2$value = _slicedToArray(_step2.value, 3),
                      _ = _step2$value[0],
                      _name = _step2$value[1],
                      value = _step2$value[2];
                    if (value === NUL || value === DOUBLE_QUOTED_NUL || value === SINGLE_QUOTED_NUL || (dot = _name.endsWith(NUL))) {
                      var p = resolvedPath === children ? resolvedPath = path(node) : resolvedPath;
                      //@ts-ignore
                      values.push(update(node, ATTRIBUTE$1, p, dot ? _name.slice(0, -1) : _name, holes[hole++]));
                      dot = false;
                      skip++;
                    } else prop(node, _name, value ? value.slice(1, -1) : true);
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
                resolvedPath = children;
              }
              pos = j + 1;

              // to handle self-closing tags
              var closed = 0 < j && content[j - 1] === '/';
              if (xml) {
                if (closed) {
                  node = node.parent;
                  /* c8 ignore start unable to reproduce, still worth a guard */
                  if (DEBUG && !node) throw errors.invalid_layout(template);
                  /* c8 ignore stop */
                }
              } else if (closed || VOID_ELEMENTS.has(tag)) {
                // void elements are never td or tr
                node = closed ? parent(node, ignore) : node.parent;

                /* c8 ignore start unable to reproduce, still worth a guard */
                if (DEBUG && !node) throw errors.invalid_layout();
                /* c8 ignore stop */
              }
              // <svg> switches to xml mode
              else if (tag === 'svg') xml = true;
              // text content / data elements content handling
              else if (TEXT_ELEMENTS.has(tag)) {
                var _index = content.indexOf("</".concat(name, ">"), pos);
                if (DEBUG && _index < 0) throw errors.unclosed(template, tag);
                var _value = content.slice(pos, _index);
                // interpolation as text
                if (_value.trim() === NUL) {
                  skip++;
                  values.push(update(node, TEXT$1, path(node), '', holes[hole++]));
                } else if (DEBUG && _value.includes(NUL)) throw errors.text(template, tag, _value);else append(node, new Text$1(_value));
                // text elements are never td or tr
                node = node.parent;
                /* c8 ignore start unable to reproduce, still worth a guard */
                if (DEBUG && !node) throw errors.invalid_layout(template);
                /* c8 ignore stop */
                pos = _index + name.length + 3;
                // ignore the closing tag regardless of the content
                skip++;
                continue;
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (pos < content.length) append(node, new Text$1(content.slice(pos)));

        /* c8 ignore start */
        if (hole < holes.length) throw errors.invalid_template(template);
        /* c8 ignore stop */

        return [node, values];
      }
    );
  });

  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray$3(r);
  }

  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray$3(r) || _nonIterableSpread();
  }

  var tree = function (node, i) {
    var _node$childNodes;
    return i < 0 ? node === null || node === void 0 ? void 0 : node.content : node === null || node === void 0 || (_node$childNodes = node.childNodes) === null || _node$childNodes === void 0 ? void 0 : _node$childNodes[i];
  } ;
  var resolve = (function (root, path) {
    return path.reduceRight(tree, root);
  });

  var checkType = false,
    range;

  /**
   * @param {DocumentFragment} fragment
   * @returns {Node | Element}
   */
  var drop = function drop(_ref) {
    var firstChild = _ref.firstChild,
      lastChild = _ref.lastChild;
    var r = range || (range = document.createRange());
    r.setStartAfter(firstChild);
    r.setEndAfter(lastChild);
    r.deleteContents();
    //@ts-ignore
    return firstChild;
  };

  /**
   * @param {Node} node
   * @param {1 | 0 | -0 | -1} operation
   * @returns {Node}
   */
  var diffFragment = function diffFragment(node, operation) {
    return checkType && node.nodeType === 11 ? 1 / operation < 0 ?
    //@ts-ignore
    operation ? drop(node) : node.lastChild :
    //@ts-ignore
    operation ? node.valueOf() : node.firstChild : node;
  };
  var nodes = Symbol('nodes');
  var parentNode = {
    get: function get() {
      return this.firstChild.parentNode;
    }
  };
  //@ts-ignore
  var replaceWith = {
    value: function value(node) {
      drop(this).replaceWith(node);
    }
  };
  //@ts-ignore
  var remove = {
    value: function value() {
      drop(this).remove();
    }
  };
  var valueOf = {
    value: function value() {
      var parentNode = this.parentNode;
      if (parentNode === this) {
        if (this[nodes] === children) this[nodes] = _toConsumableArray(this.childNodes);
      } else {
        // TODO: verify fragments in lists don't call this twice
        if (parentNode) {
          var firstChild = this.firstChild,
            lastChild = this.lastChild;
          this[nodes] = [firstChild];
          while (firstChild !== lastChild) this[nodes].push(firstChild = firstChild.nextSibling);
        }
        this.replaceChildren.apply(this, _toConsumableArray(this[nodes]));
      }
      return this;
    }
  };

  /**
   * @param {DocumentFragment} fragment
   * @returns {DocumentFragment}
   */
  function PersistentFragment(fragment) {
    var firstChild = createComment('<>'),
      lastChild = createComment('</>');
    //@ts-ignore
    fragment.replaceChildren.apply(fragment, [firstChild].concat(_toConsumableArray(fragment.childNodes), [lastChild]));
    checkType = true;
    return defineProperties$2(fragment, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, nodes, {
      writable: true,
      value: children
    }), "firstChild", {
      value: firstChild
    }), "lastChild", {
      value: lastChild
    }), "parentNode", parentNode), "valueOf", valueOf), "replaceWith", replaceWith), "remove", remove));
  }
  PersistentFragment.prototype = DocumentFragment.prototype;

  // @ts-check

  /**
   * @param {Document} document
   * @returns
   */
  var creator = (function () {
    var document = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (/** @type {Document} */globalThis.document);
    var tpl = document.createElement('template'),
      range;
    /**
     * @param {string} content
     * @param {boolean} [xml=false]
     * @returns {DocumentFragment}
     */
    return function (content) {
      var xml = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (xml) {
        if (!range) {
          range = document.createRange();
          range.selectNodeContents(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
        }
        return range.createContextualFragment(content);
      }
      tpl.innerHTML = content;
      var fragment = tpl.content;
      tpl = /** @type {HTMLTemplateElement} */tpl.cloneNode(false);
      return fragment;
    };
  });

  // @see https://github.com/WebReflection/udomdiff

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
   * @param {Node[]} a The list of current/live children
   * @param {Node[]} b The list of future children
   * @param {(entry: Node, action: number) => Node} get
   * The callback invoked per each entry related DOM operation.
   * @param {Node} [before] The optional node used as anchor to insert before.
   * @returns {Node[]} The same list of future children.
   */
  var diff = (function (a, b, get, before) {
    var parentNode = before.parentNode;
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
          if (!map || !map.has(a[aStart]))
            //@ts-ignore
            get(a[aStart], -1).remove();
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
        var _map$get;
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
        var index = (_map$get = map.get(a[aStart])) !== null && _map$get !== void 0 ? _map$get : -1;

        // this node has no meaning in the future list, so it's more than safe
        // to remove it, and check the next live node out instead, meaning
        // that only the live list index should be forwarded
        //@ts-ignore
        if (index < 0) get(a[aStart++], -1).remove();
        // it's a future node, hence it needs some handling
        else {
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
              // TODO: benchmark replaceWith instead
              parentNode.replaceChild(get(b[bStart++], 1), get(a[aStart++], -1));
            }
          }
          // otherwise move the source forward, 'cause there's nothing to do
          else aStart++;
        }
      }
    }
    return b;
  });

  function _createForOfIteratorHelper$1(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray$1(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
  function _unsupportedIterableToArray$1(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray$1(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0; } }
  function _arrayLikeToArray$1(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  var ARRAY = 1 << 0;
  var ARIA = 1 << 1;
  var ATTRIBUTE = 1 << 2;
  var COMMENT = 1 << 3;
  var COMPONENT = 1 << 4;
  var DATA = 1 << 5;
  var DIRECT = 1 << 6;
  var DOTS = 1 << 7;
  var EVENT = 1 << 8;
  var KEY = 1 << 9;
  var PROP = 1 << 10;
  var TEXT = 1 << 11;
  var TOGGLE = 1 << 12;
  var UNSAFE = 1 << 13;
  var REF = 1 << 14;
  var SIGNAL = 1 << 15;

  // COMPONENT flags
  var COMPONENT_DIRECT = COMPONENT | DIRECT;
  var COMPONENT_DOTS = COMPONENT | DOTS;
  var COMPONENT_PROP = COMPONENT | PROP;
  var EVENT_ARRAY = EVENT | ARRAY;
  var COMMENT_ARRAY = COMMENT | ARRAY;
  var fragment = creator(document);
  var ref = Symbol('ref');
  var aria = function aria(node, values) {
    var _iterator = _createForOfIteratorHelper$1(entries(values)),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];
        var name = key === 'role' ? key : "aria-".concat(key.toLowerCase());
        if (value == null) node.removeAttribute(name);else node.setAttribute(name, value);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  var attribute = function attribute(name) {
    return function (node, value) {
      if (value == null) node.removeAttribute(name);else node.setAttribute(name, value);
    };
  };
  var comment_array = function comment_array(node, value) {
    node[nodes] = diff(node[nodes] || children, value, diffFragment, node);
  };
  var text = new WeakMap();
  var getText = function getText(ref, value) {
    var node = text.get(ref);
    if (node) node.data = value;else text.set(ref, node = document.createTextNode(value));
    return node;
  };
  var comment_hole = function comment_hole(node, value) {
    var _node$nodes;
    var current = _typeof(value) === 'object' ? value !== null && value !== void 0 ? value : node : getText(node, value);
    var prev = (_node$nodes = node[nodes]) !== null && _node$nodes !== void 0 ? _node$nodes : node;
    if (current !== prev) prev.replaceWith(diffFragment(node[nodes] = current, 1));
  };
  var comment_unsafe = function comment_unsafe(xml) {
    return function (node, value) {
      var _node$ref;
      var prev = (_node$ref = node[ref]) !== null && _node$ref !== void 0 ? _node$ref : node[ref] = {};
      if (prev.v !== value) {
        prev.f = PersistentFragment(fragment(value, xml));
        prev.v = value;
      }
      comment_hole(node, prev.f);
    };
  };
  var comment_signal = function comment_signal(node, value) {
    comment_hole(node, value instanceof Signal ? value.value : value);
  };
  var data = function data(_ref, values) {
    var dataset = _ref.dataset;
    var _iterator2 = _createForOfIteratorHelper$1(entries(values)),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _step2$value = _slicedToArray(_step2.value, 2),
          key = _step2$value[0],
          value = _step2$value[1];
        if (value == null) delete dataset[key];else dataset[key] = value;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  };

  /** @type {Map<string|Symbol, Function>} */
  var directRefs = new Map();

  /**
   * @param {string|Symbol} name
   * @returns {Function}
   */
  var directFor = function directFor(name) {
    var fn = directRefs.get(name);
    if (!fn) directRefs.set(name, fn = direct$1(name));
    return fn;
  };
  var direct$1 = function direct(name) {
    return function (node, value) {
      node[name] = value;
    };
  };
  var dots = function dots(node, values) {
    var _iterator3 = _createForOfIteratorHelper$1(entries(values)),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _step3$value = _slicedToArray(_step3.value, 2),
          name = _step3$value[0],
          value = _step3$value[1];
        attribute(name)(node, value);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  };
  var event = function event(type, at, array) {
    return array ? function (node, value) {
      var prev = node[at];
      if (prev !== null && prev !== void 0 && prev.length) node.removeEventListener.apply(node, [type].concat(_toConsumableArray(prev)));
      if (value) node.addEventListener.apply(node, [type].concat(_toConsumableArray(value)));
      node[at] = value;
    } : function (node, value) {
      var prev = node[at];
      if (prev) node.removeEventListener(type, prev);
      if (value) node.addEventListener(type, value);
      node[at] = value;
    };
  };
  var toggle = function toggle(name) {
    return function (node, value) {
      node.toggleAttribute(name, !!value);
    };
  };
  var k = false;
  var isKeyed = function isKeyed() {
    var wasKeyed = k;
    k = false;
    return wasKeyed;
  };
  var update = function update(node, type, path, name, hint) {
    switch (type) {
      case COMPONENT$1:
        return [path, hint, COMPONENT];
      case COMMENT$1:
        {
          if (isArray(hint)) return [path, comment_array, COMMENT_ARRAY];
          if (hint instanceof Unsafe) return [path, comment_unsafe(node.xml), UNSAFE];
          if (hint instanceof Signal) return [path, comment_signal, COMMENT | SIGNAL];
          return [path, comment_hole, COMMENT];
        }
      case TEXT$1:
        return [path, directFor('textContent'), TEXT];
      case ATTRIBUTE$1:
        {
          var isComponent = node.type === COMPONENT$1;
          switch (name.at(0)) {
            case '@':
              {
                if (isComponent) throw errors.invalid_attribute([], name);
                var array = isArray(hint);
                return [path, event(name.slice(1), Symbol(name), array), array ? EVENT_ARRAY : EVENT];
              }
            case '?':
              if (isComponent) throw errors.invalid_attribute([], name);
              return [path, toggle(name.slice(1)), TOGGLE];
            case '.':
              {
                return name === '...' ? [path, isComponent ? assign : dots, isComponent ? COMPONENT_DOTS : DOTS] : [path, direct$1(name.slice(1)), isComponent ? COMPONENT_DIRECT : DIRECT];
              }
            default:
              {
                if (isComponent) return [path, direct$1(name), COMPONENT_PROP];
                if (name === 'aria') return [path, aria, ARIA];
                if (name === 'data' && !/^object$/i.test(node.name)) return [path, data, DATA];
                if (name === 'key') {
                  if (1 < path.length) throw errors.invalid_key(hint);
                  return [path, k = true, KEY];
                }
                if (name === 'ref') return [path, directFor(ref), REF];
                if (name.startsWith('on')) return [path, directFor(name.toLowerCase()), DIRECT];
                return [path, attribute(name), ATTRIBUTE];
              }
          }
        }
    }
  };

  var direct = true;

  /** @param {boolean} value */
  var _set = function _set(value) {
    direct = value;
  };

  /** @returns {boolean} */
  var _get = function _get() {
    return direct;
  };

  function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

  /**
   * @param {Hole} hole
   * @returns
   */
  var dom = function dom(hole) {
    return diffFragment(hole.n ? hole.update(hole) : hole.valueOf(false), 1);
  };
  var holed = function holed(prev, current) {
    var changes = [],
      h = prev.length,
      l = current.length;
    for (var c, p, j = 0, i = 0; i < l; i++) {
      c = current[i];
      changes[i] = j < h && (p = prev[j++]).t === c.t ? (current[i] = p).update(c) : c.valueOf(false);
    }
    return changes;
  };

  /**
   * @param {Hole} hole
   * @param {unknown} value
   * @returns {Node}
   */
  var keyed$1 = function keyed(hole, value) {
    var _hole$t$2$get$update, _hole$t$2$get;
    return /** @type {import('./keyed.js').Keyed} */(_hole$t$2$get$update = (_hole$t$2$get = hole.t[2].get(value)) === null || _hole$t$2$get === void 0 ? void 0 : _hole$t$2$get.update(hole)) !== null && _hole$t$2$get$update !== void 0 ? _hole$t$2$get$update : hole.valueOf(false);
  };

  /**
   * 
   * @param {Function} Component
   * @param {Object} obj
   * @param {unknown[]} signals
   * @returns {Hole}
   */
  var component = function component(Component, obj, signals) {
    signals.length;
    var wasDirect = _get();
    if (wasDirect) _set(!wasDirect);
    try {
      return Component(obj, global);
    } finally {
      if (wasDirect) _set(wasDirect);
    }
  };

  /**
   * @param {Hole} hole
   * @param {Hole} value
   * @returns {Hole}
   */
  var getHole = function getHole(hole, value) {
    if (hole.t === value.t) {
      hole.update(value);
    } else {
      hole.n.replaceWith(dom(value));
      hole = value;
    }
    return hole;
  };
  var createEffect = function createEffect(node, value, obj) {
    var signals = [],
      entry = [COMPONENT, null, obj],
      bootstrap = true,
      hole;
    effect(function () {
      if (bootstrap) {
        bootstrap = false;
        hole = component(value, obj, signals);
        if (!signals.length) signals = children;
        if (hole) {
          node.replaceWith(dom(hole));
          entry[1] = hole;
        } else node.remove();
      } else {
        var result = component(value, obj, signals);
        if (hole) {
          if (!(result instanceof Hole)) throw errors.invalid_component(value);
          if (getHole(hole, /** @type {Hole} */result) === result) entry[2] = hole = result;
        }
      }
    });
    return entry;
  };
  var updateRefs = function updateRefs(refs) {
    var _iterator = _createForOfIteratorHelper(refs),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var node = _step.value;
        var value = node[ref];
        if (typeof value === 'function') value(node);else if (value instanceof Signal) value.value = node;else if (value) value.current = node;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  var props = Symbol();
  var global = {};
  var Hole = /*#__PURE__*/function () {
    /**
     * @param {[DocumentFragment, unknown[], import('./keyed.js').Keyed?]} template
     * @param {unknown[]} values
     */
    function Hole(template, values) {
      _classCallCheck(this, Hole);
      this.t = template;
      this.v = values;
      this.n = null;
      this.k = -1;
    }

    /**
     * @param {boolean} [direct]
     * @returns {Node}
     */
    return _createClass(Hole, [{
      key: "valueOf",
      value: function valueOf() {
        var direct = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _get();
        var _this$t = _slicedToArray(this.t, 3),
          fragment = _this$t[0],
          updates = _this$t[1],
          keys = _this$t[2];
        var root = document.importNode(fragment, true);
        var values = this.v;
        var length = values.length;
        var changes = children;
        var node, prev, refs;
        if (length !== updates.length) throw errors.invalid_interpolation(this.t[3], values);
        if (0 < length) {
          changes = updates.slice(0);
          while (length--) {
            var _updates$length = _slicedToArray(updates[length], 3),
              path = _updates$length[0],
              update = _updates$length[1],
              type = _updates$length[2];
            var value = values[length];
            if (prev !== path) {
              node = resolve(root, path);
              prev = path;
              if (!node) throw errors.invalid_path(this.t[3], path);
            }
            if (type & COMPONENT) {
              var obj = node[props] || (node[props] = {});
              if (type === COMPONENT) {
                var _obj$children;
                var _iterator2 = _createForOfIteratorHelper(node.attributes),
                  _step2;
                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var _obj$name;
                    var _step2$value = _step2.value,
                      name = _step2$value.name,
                      _value = _step2$value.value;
                    (_obj$name = obj[name]) !== null && _obj$name !== void 0 ? _obj$name : obj[name] = _value;
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
                (_obj$children = obj.children) !== null && _obj$children !== void 0 ? _obj$children : obj.children = _toConsumableArray(node.content.childNodes);
                changes[length] = createEffect(node, value, obj);
              } else {
                update(obj, value);
                changes[length] = [type, update, obj];
              }
            } else {
              var commit = true;
              if (type & ARRAY && !isArray(value)) throw errors.invalid_interpolation(this.t[3], value);
              if (!direct && type & COMMENT && !(type & SIGNAL)) {
                if (type & ARRAY) {
                  commit = false;
                  if (value.length) update(node, value[0] instanceof Hole ? holed(children, value) : value);
                } else if (value instanceof Hole) {
                  commit = false;
                  update(node, dom(value));
                }
              }
              if (commit) {
                if (type === KEY) {
                  if (!keys) throw errors.invalid_key(value);
                  this.k = length;
                } else {
                  if (type === REF) (refs !== null && refs !== void 0 ? refs : refs = new Set()).add(node);
                  update(node, value);
                }
              }
              changes[length] = [type, update, value, node];
              if (direct && type & COMMENT) node.remove();
            }
          }
          if (refs) updateRefs(refs);
        }
        var childNodes = root.childNodes;
        var size = childNodes.length;
        var n = size === 1 ? childNodes[0] : size ? PersistentFragment(root) : root;
        this.v = changes;
        this.n = n;
        if (-1 < this.k) keys.set(changes[this.k][2], n, this);
        return n;
      }

      /**
       * @param {Hole} hole
       * @returns {Node}
       */
    }, {
      key: "update",
      value: function update(hole) {
        var key = this.k;
        var changes = this.v;
        var values = hole.v;
        if (-1 < key && changes[key][2] !== values[key]) return keyed$1(hole, values[key]);
        var length = changes.length;
        while (length--) {
          var entry = changes[length];
          var _entry = _slicedToArray(entry, 3),
            type = _entry[0],
            _update = _entry[1],
            prev = _entry[2];
          if (type === KEY) continue;
          var value = values[length];
          if (type & COMPONENT) {
            if (type === COMPONENT) {
              if (typeof value !== 'function') throw errors.invalid_component(value);
              var result = value(prev, global);
              if (_update) {
                if (!(result instanceof Hole)) throw errors.invalid_component(value);
                if (getHole(_update, /** @type {Hole} */result) === result) entry[2] = result;
              }
            } else _update(prev, value);
          } else {
            var change = value;
            if (type & ARRAY) {
              if (!isArray(value)) throw errors.invalid_interpolation([], value);
              if (type & COMMENT) {
                // TODO: a smarter differ that does not require 2 loops
                if (value.length) {
                  if (value[0] instanceof Hole) {
                    if (prev.length && !(prev[0] instanceof Hole)) throw errors.invalid_interpolation([], value[0]);
                    change = holed(prev, value);
                  }
                }
              } else if (type & EVENT && value[0] === prev[0]) continue;
            } else if (type & COMMENT) {
              if (type & SIGNAL) {
                if (value === prev) {
                  _update(entry[3], change);
                  continue;
                }
              } else if (prev instanceof Hole) {
                if (!(value instanceof Hole)) throw errors.invalid_interpolation([], value);
                value = getHole(prev, /** @type {Hole} */value);
                change = value.n;
              }
            }
            if (value !== prev) {
              entry[2] = value;
              _update(entry[3], change);
            }
          }
        }
        return /** @type {Node} */this.n;
      }
    }]);
  }();

  function _isNativeFunction(t) {
    try {
      return -1 !== Function.toString.call(t).indexOf("[native code]");
    } catch (n) {
      return "function" == typeof t;
    }
  }

  function _isNativeReflectConstruct$2() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct() {
      return !!t;
    })();
  }

  function _construct(t, e, r) {
    if (_isNativeReflectConstruct$2()) return Reflect.construct.apply(null, arguments);
    var o = [null];
    o.push.apply(o, e);
    var p = new (t.bind.apply(t, o))();
    return r && _setPrototypeOf(p, r.prototype), p;
  }

  function _wrapNativeSuper(t) {
    var r = "function" == typeof Map ? new Map() : void 0;
    return _wrapNativeSuper = function _wrapNativeSuper(t) {
      if (null === t || !_isNativeFunction(t)) return t;
      if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== r) {
        if (r.has(t)) return r.get(t);
        r.set(t, Wrapper);
      }
      function Wrapper() {
        return _construct(t, arguments, _getPrototypeOf(this).constructor);
      }
      return Wrapper.prototype = Object.create(t.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      }), _setPrototypeOf(Wrapper, t);
    }, _wrapNativeSuper(t);
  }

  function _callSuper$1(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$1() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct() { return !!t; })(); }
  function _superPropGet(t, o, e, r) { var p = _get$1(_getPrototypeOf(t.prototype ), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
  var keyed = new WeakMap();

  //@ts-ignore
  var Keyed = /*#__PURE__*/function (_Map) {
    function Keyed() {
      var _this;
      _classCallCheck(this, Keyed);
      //@ts-ignore
      (_this = _callSuper$1(this, Keyed))._ = new FinalizationRegistry(function (key) {
        return _this["delete"](key);
      });
      return _this;
    }
    _inherits(Keyed, _Map);
    return _createClass(Keyed, [{
      key: "get",
      value: function get(key) {
        var _superPropGet2;
        var node = (_superPropGet2 = _superPropGet(Keyed, "get", this, 3)([key])) === null || _superPropGet2 === void 0 ? void 0 : _superPropGet2.deref();
        return node && keyed.get(node);
      }

      /**
       * @param {any} key
       * @param {Node} node
       * @param {import('./rabbit.js').Hole} hole
       */
      //@ts-ignore
    }, {
      key: "set",
      value: function set(key, node, hole) {
        keyed.set(node, hole);
        //@ts-ignore
        this._.register(node, key);
        _superPropGet(Keyed, "set", this, 3)([key, new WeakRef(node)]);
      }
    }]);
  }(/*#__PURE__*/_wrapNativeSuper(Map));

  //@ts-check


  /** @typedef {globalThis.Element | globalThis.HTMLElement | globalThis.SVGSVGElement | globalThis.DocumentFragment} Container */

  var parse$1 = parser({
    Comment: Comment,
    DocumentType: DocumentType,
    Text: Text,
    Fragment: Fragment,
    Element: Element,
    Component: Component,
    update: update
  });

  /**
   * @param {boolean} xml
   * @param {WeakMap<TemplateStringsArray | string[], [any, any[], Keyed?]>} twm
   * @returns
   */
  var create$1 = function create(xml) {
    var twm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
    return (
      /**
       * @param {TemplateStringsArray | string[]} template
       * @param {unknown[]} values
       * @returns {Hole}
       */
      function (template) {
        var parsed = twm.get(template);
        for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          values[_key - 1] = arguments[_key];
        }
        if (!parsed) {
          parsed = parse$1(template, values, xml);
          parsed.push(isKeyed() ? new Keyed() : null);
          parsed.push(template);
          parsed[0] = fragment(parsed[0].toString(), xml);
          twm.set(template, parsed);
        }
        return new Hole(parsed, values);
      }
    );
  };
  var htmlHole = create$1(false);
  var svgHole = create$1(true);
  var rendered = new WeakMap();

  /**
   * @param {TemplateStringsArray | string[]} template
   * @param {any[]} values
   * @returns {Node | HTMLElement | Hole}
   */
  function html(template) {
    for (var _len2 = arguments.length, values = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      values[_key2 - 1] = arguments[_key2];
    }
    var hole = htmlHole.apply(null, arguments);
    return _get() ? hole.valueOf(true) : hole;
  }

  /**
   * @param {TemplateStringsArray | string[]} template
   * @param {any[]} values
   * @returns {Node | SVGSVGElement | Hole}
   */
  function svg(template) {
    for (var _len3 = arguments.length, values = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      values[_key3 - 1] = arguments[_key3];
    }
    var hole = svgHole.apply(null, arguments);
    return _get() ? hole.valueOf(true) : hole;
  }

  /**
   * @param {Container} where
   * @param {Function | Node | Container} what
   * @returns
   */
  var render = function render(where, what) {
    var known = rendered.get(where);
    if (known) known[0]();
    if (typeof what === 'function') {
      _set(false);
      var hole;
      var scope = effectScope(function () {
        hole = what();
      });
      //@ts-ignore
      if (!known || known[1].t !== hole.t) {
        //@ts-ignore
        var d = hole.valueOf(false);
        where.replaceChildren(d);
      } else known[1].update(hole);
      rendered.set(where, [scope, hole]);
    } else {
      _set(true);
      rendered["delete"](where);
      where.replaceChildren(what instanceof Hole ? dom(what) : diffFragment(what, 1));
    }
    return where;
  };

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
