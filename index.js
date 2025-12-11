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

  function _arrayLikeToArray$1(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _unsupportedIterableToArray$1(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest();
  }

  function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }

  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray$1(r);
  }

  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray$1(r) || _nonIterableSpread();
  }

  function _superPropBase(t, o) {
    for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
    return t;
  }

  function set(e, r, t, o) {
    return set = "undefined" != typeof Reflect && Reflect.set ? Reflect.set : function (e, r, t, o) {
      var f,
        i = _superPropBase(e, r);
      if (i) {
        if ((f = Object.getOwnPropertyDescriptor(i, r)).set) return f.set.call(o, t), true;
        if (!f.writable) return false;
      }
      if (f = Object.getOwnPropertyDescriptor(o, r)) {
        if (!f.writable) return false;
        f.value = t, Object.defineProperty(o, r, f);
      } else _defineProperty(o, r, t);
      return true;
    }, set(e, r, t, o);
  }
  function _set(e, r, t, o, f) {
    if (!set(e, r, t, o || e) && f) throw new TypeError("failed to set property");
    return t;
  }

  function _get() {
    return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
      var p = _superPropBase(e, t);
      if (p) {
        var n = Object.getOwnPropertyDescriptor(p, t);
        return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
      }
    }, _get.apply(null, arguments);
  }

  function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) { t && (r = t); var _n1 = 0, F = function F() {}; return { s: F, n: function n() { return _n1 >= r.length ? { done: true } : { done: false, value: r[_n1++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
  function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
  function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
  function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
  function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
  function _superPropSet(t, e, o, r, p, f) { return _set(_getPrototypeOf(t.prototype ), e, o, r, p); }
  function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
  function _callSuper$1(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$1() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct() { return !!t; })(); }
  var e;
  !function (e) {
    e[e.None = 0] = "None", e[e.Mutable = 1] = "Mutable", e[e.Watching = 2] = "Watching", e[e.RecursedCheck = 4] = "RecursedCheck", e[e.Recursed = 8] = "Recursed", e[e.Dirty = 16] = "Dirty", e[e.Pending = 32] = "Pending";
  }(e || (e = {}));
  var t = [],
    n = [],
    _ref = function (_ref2) {
      var e = _ref2.update,
        t = _ref2.notify,
        n = _ref2.unwatched;
      var s = 0;
      return {
        link: function link(e, t) {
          var n = t.depsTail;
          if (void 0 !== n && n.dep === e) return;
          var i;
          if (4 & t.flags && (i = void 0 !== n ? n.nextDep : t.deps, void 0 !== i && i.dep === e)) return i.version = s, void (t.depsTail = i);
          var r = e.subsTail;
          if (void 0 !== r && r.version === s && r.sub === t) return;
          var o = t.depsTail = e.subsTail = {
            version: s,
            dep: e,
            sub: t,
            prevDep: n,
            nextDep: i,
            prevSub: r,
            nextSub: void 0
          };
          void 0 !== i && (i.prevDep = o);
          void 0 !== n ? n.nextDep = o : t.deps = o;
          void 0 !== r ? r.nextSub = o : e.subs = o;
        },
        unlink: i,
        propagate: function propagate(e) {
          var n,
            s = e.nextSub;
          e: for (;;) {
            var _i = e.sub;
            var _r = _i.flags;
            if (3 & _r && (60 & _r ? 12 & _r ? 4 & _r ? 48 & _r || !o(e, _i) ? _r = 0 : (_i.flags = 40 | _r, _r &= 1) : _i.flags = -9 & _r | 32 : _r = 0 : _i.flags = 32 | _r, 2 & _r && t(_i), 1 & _r)) {
              var _t = _i.subs;
              if (void 0 !== _t) {
                e = _t, void 0 !== _t.nextSub && (n = {
                  value: s,
                  prev: n
                }, s = e.nextSub);
                continue;
              }
            }
            if (void 0 === (e = s)) {
              for (; void 0 !== n;) if (e = n.value, n = n.prev, void 0 !== e) {
                s = e.nextSub;
                continue e;
              }
              break;
            }
            s = e.nextSub;
          }
        },
        checkDirty: function checkDirty(t, n) {
          var s,
            i = 0;
          e: for (;;) {
            var _o = t.dep,
              _l = _o.flags;
            var _a = false;
            if (16 & n.flags) _a = true;else if (17 & ~_l) {
              if (!(33 & ~_l)) {
                void 0 === t.nextSub && void 0 === t.prevSub || (s = {
                  value: t,
                  prev: s
                }), t = _o.deps, n = _o, ++i;
                continue;
              }
            } else if (e(_o)) {
              var _e2 = _o.subs;
              void 0 !== _e2.nextSub && r(_e2), _a = true;
            }
            if (_a || void 0 === t.nextDep) {
              for (; i;) {
                --i;
                var _o2 = n.subs,
                  _l2 = void 0 !== _o2.nextSub;
                if (_l2 ? (t = s.value, s = s.prev) : t = _o2, _a) {
                  if (e(n)) {
                    _l2 && r(_o2), n = t.sub;
                    continue;
                  }
                } else n.flags &= -33;
                if (n = t.sub, void 0 !== t.nextDep) {
                  t = t.nextDep;
                  continue e;
                }
                _a = false;
              }
              return _a;
            }
            t = t.nextDep;
          }
        },
        endTracking: function endTracking(e) {
          var t = e.depsTail;
          var n = void 0 !== t ? t.nextDep : e.deps;
          for (; void 0 !== n;) n = i(n, e);
          e.flags &= -5;
        },
        startTracking: function startTracking(e) {
          ++s, e.depsTail = void 0, e.flags = -57 & e.flags | 4;
        },
        shallowPropagate: r
      };
      function i(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : e.sub;
        var s = e.dep,
          i = e.prevDep,
          r = e.nextDep,
          o = e.nextSub,
          l = e.prevSub;
        return void 0 !== r ? r.prevDep = i : t.depsTail = i, void 0 !== i ? i.nextDep = r : t.deps = r, void 0 !== o ? o.prevSub = l : s.subsTail = l, void 0 !== l ? l.nextSub = o : void 0 === (s.subs = o) && n(s), r;
      }
      function r(e) {
        do {
          var _n = e.sub,
            _s = e.nextSub,
            _i2 = _n.flags;
          32 == (48 & _i2) && (_n.flags = 16 | _i2, 2 & _i2 && t(_n)), e = _s;
        } while (void 0 !== e);
      }
      function o(e, t) {
        var n = t.depsTail;
        if (void 0 !== n) {
          var _s2 = t.deps;
          do {
            if (_s2 === e) return true;
            if (_s2 === n) break;
            _s2 = _s2.nextDep;
          } while (void 0 !== _s2);
        }
        return false;
      }
    }({
      update: function update(e) {
        return "getter" in e ? y(e) : w(e, e.value);
      },
      notify: function e(t) {
        var s = t.flags;
        if (!(64 & s)) {
          t.flags = 64 | s;
          var _i3 = t.subs;
          void 0 !== _i3 ? e(_i3.sub) : n[h++] = t;
        }
      },
      unwatched: function unwatched(e) {
        if ("getter" in e) {
          var _t2 = e.deps;
          if (void 0 !== _t2) {
            e.flags = 17;
            do {
              _t2 = i(_t2, e);
            } while (void 0 !== _t2);
          }
        } else "previousValue" in e || D.call(e);
      }
    }),
    s = _ref.link,
    i = _ref.unlink,
    r = _ref.propagate,
    o = _ref.checkDirty,
    l = _ref.endTracking,
    a = _ref.startTracking,
    c = _ref.shallowPropagate;
  var u,
    d,
    f = 0,
    p = 0,
    h = 0;
  function v(e) {
    var t = u;
    return u = e, t;
  }
  function g(e) {
    var t = d;
    return d = e, t;
  }
  function b(e) {
    return T.bind({
      previousValue: e,
      value: e,
      subs: void 0,
      subsTail: void 0,
      flags: 1
    });
  }
  function m(e) {
    return C.bind({
      value: void 0,
      subs: void 0,
      subsTail: void 0,
      deps: void 0,
      depsTail: void 0,
      flags: 17,
      getter: e
    });
  }
  function x(e) {
    var t = {
      fn: e,
      subs: void 0,
      subsTail: void 0,
      deps: void 0,
      depsTail: void 0,
      flags: 2
    };
    void 0 !== u ? s(t, u) : void 0 !== d && s(t, d);
    var n = v(t);
    try {
      t.fn();
    } finally {
      v(n);
    }
    return D.bind(t);
  }
  function y(e) {
    var t = v(e);
    a(e);
    try {
      var _t3 = e.value;
      return _t3 !== (e.value = e.getter(_t3));
    } finally {
      v(t), l(e);
    }
  }
  function w(e, t) {
    return e.flags = 1, e.previousValue !== (e.previousValue = t);
  }
  function S(e, t) {
    if (16 & t || 32 & t && o(e.deps, e)) {
      var _t4 = v(e);
      a(e);
      try {
        e.fn();
      } finally {
        v(_t4), l(e);
      }
      return;
    }
    32 & t && (e.flags = -33 & t);
    var n = e.deps;
    for (; void 0 !== n;) {
      var _e3 = n.dep,
        _t5 = _e3.flags;
      64 & _t5 && S(_e3, _e3.flags = -65 & _t5), n = n.nextDep;
    }
  }
  function k() {
    for (; p < h;) {
      var _e4 = n[p];
      n[p++] = void 0, S(_e4, _e4.flags &= -65);
    }
    p = 0, h = 0;
  }
  function C() {
    var e = this.flags;
    if (16 & e || 32 & e && o(this.deps, this)) {
      if (y(this)) {
        var _e5 = this.subs;
        void 0 !== _e5 && c(_e5);
      }
    } else 32 & e && (this.flags = -33 & e);
    return void 0 !== u ? s(this, u) : void 0 !== d && s(this, d), this.value;
  }
  function T() {
    if (!arguments.length) {
      var _e6 = this.value;
      if (16 & this.flags && w(this, _e6)) {
        var _e7 = this.subs;
        void 0 !== _e7 && c(_e7);
      }
      return void 0 !== u && s(this, u), _e6;
    }
    {
      var _t6 = arguments.length <= 0 ? undefined : arguments[0];
      if (this.value !== (this.value = _t6)) {
        this.flags = 17;
        var _e8 = this.subs;
        void 0 !== _e8 && (r(_e8), f || k());
      }
    }
  }
  function D() {
    var e = this.deps;
    for (; void 0 !== e;) e = i(e, this);
    var t = this.subs;
    void 0 !== t && i(t), this.flags = 0;
  }
  var O = {
      greedy: false
    },
    N = function N(e) {
      return new A(e);
    },
    $ = function $(e) {
      t.push(v(void 0));
      try {
        return e();
      } finally {
        v(t.pop());
      }
    };
  var W = /*#__PURE__*/function () {
    function W(e, t) {
      _classCallCheck(this, W);
      this._ = e(t);
    }
    return _createClass(W, [{
      key: "value",
      get: function get() {
        return this._();
      },
      set: function set(e) {
        this._(e);
      }
    }, {
      key: "peek",
      value: function peek() {
        return $(this._);
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        return this.value;
      }
    }]);
  }();
  var A = /*#__PURE__*/function (_W) {
    function A(e) {
      _classCallCheck(this, A);
      return _callSuper$1(this, A, [m, e]);
    }
    _inherits(A, _W);
    return _createClass(A, [{
      key: "value",
      get: function get() {
        return this._();
      },
      set: function set(e) {
        throw new Error("Computed values are read-only");
      }
    }]);
  }(W);
  var E = /*#__PURE__*/function (_W2) {
    function E(e) {
      _classCallCheck(this, E);
      return _callSuper$1(this, E, [b, [e]]);
    }
    _inherits(E, _W2);
    return _createClass(E, [{
      key: "value",
      get: function get() {
        return _superPropGet(E, "value", this, 1)[0];
      },
      set: function set(e) {
        _superPropSet(E, "value", [e], this, 1);
      }
    }, {
      key: "peek",
      value: function peek() {
        return _superPropGet(E, "peek", this, 3)([])[0];
      }
    }]);
  }(W);
  var M = function M(e) {
    ++f;
    try {
      return e();
    } finally {
      --f || k();
    }
  };
  var R = function R(e) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : O,
      _ref3$greedy = _ref3.greedy,
      t = _ref3$greedy === void 0 ? false : _ref3$greedy;
    return t ? new E(e) : new W(b, e);
  };
  function L() {
    return R.apply(null, arguments);
  }
  var _ = function _(e) {
      R = e;
    },
    j = Array.isArray,
    F = Object.assign,
    P = Object.defineProperties,
    B = Object.entries,
    J = Object.freeze;
  var _e9 = /*#__PURE__*/new WeakMap();
  var V = /*#__PURE__*/function () {
    function V(e) {
      _classCallCheck(this, V);
      _classPrivateFieldInitSpec(this, _e9, void 0);
      _classPrivateFieldSet(_e9, this, e);
    }
    return _createClass(V, [{
      key: "valueOf",
      value: function valueOf() {
        return _classPrivateFieldGet(_e9, this);
      }
    }, {
      key: "toString",
      value: function toString() {
        return String(_classPrivateFieldGet(_e9, this));
      }
    }]);
  }();
  var z = function z(e) {
      return new V(e);
    },
    H = function H(e) {
      return document.createComment(e);
    },
    q = 42,
    G = new Set(["plaintext", "script", "style", "textarea", "title", "xmp"]),
    I = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"]),
    K = J({}),
    Q = J([]),
    U = function U(e, t) {
      return e.children === Q && (e.children = []), e.children.push(t), t.parent = e, t;
    },
    X = function X(e, t, n) {
      e.props === K && (e.props = {}), e.props[t] = n;
    },
    Y = function Y(e, t, n) {
      e !== t && n.push(e);
    };
  var Z = /*#__PURE__*/function () {
    function Z(e) {
      _classCallCheck(this, Z);
      this.type = e, this.parent = null;
    }
    return _createClass(Z, [{
      key: "toJSON",
      value: function toJSON() {
        return [this.type, this.data];
      }
    }]);
  }();
  var ee = /*#__PURE__*/function (_Z) {
    function ee(e) {
      var _this;
      _classCallCheck(this, ee);
      _this = _callSuper$1(this, ee, [8]), _this.data = e;
      return _this;
    }
    _inherits(ee, _Z);
    return _createClass(ee, [{
      key: "toString",
      value: function toString() {
        return "<!--".concat(this.data, "-->");
      }
    }]);
  }(Z);
  var te = /*#__PURE__*/function (_Z2) {
    function te(e) {
      var _this2;
      _classCallCheck(this, te);
      _this2 = _callSuper$1(this, te, [10]), _this2.data = e;
      return _this2;
    }
    _inherits(te, _Z2);
    return _createClass(te, [{
      key: "toString",
      value: function toString() {
        return "<!".concat(this.data, ">");
      }
    }]);
  }(Z);
  var ne = /*#__PURE__*/function (_Z3) {
    function ne(e) {
      var _this3;
      _classCallCheck(this, ne);
      _this3 = _callSuper$1(this, ne, [3]), _this3.data = e;
      return _this3;
    }
    _inherits(ne, _Z3);
    return _createClass(ne, [{
      key: "toString",
      value: function toString() {
        return this.data;
      }
    }]);
  }(Z);
  var se = /*#__PURE__*/function (_Z4) {
    function se() {
      var _this4;
      _classCallCheck(this, se);
      _this4 = _callSuper$1(this, se, [q]), _this4.name = "template", _this4.props = K, _this4.children = Q;
      return _this4;
    }
    _inherits(se, _Z4);
    return _createClass(se, [{
      key: "toJSON",
      value: function toJSON() {
        var e = [q];
        return Y(this.props, K, e), Y(this.children, Q, e), e;
      }
    }, {
      key: "toString",
      value: function toString() {
        var e = "";
        for (var _t7 in this.props) {
          var _n2 = this.props[_t7];
          null != _n2 && ("boolean" == typeof _n2 ? _n2 && (e += " ".concat(_t7)) : e += " ".concat(_t7, "=\"").concat(_n2, "\""));
        }
        return "<template".concat(e, ">").concat(this.children.join(""), "</template>");
      }
    }]);
  }(Z);
  var ie = /*#__PURE__*/function (_Z5) {
    function ie(e) {
      var _this5;
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      _classCallCheck(this, ie);
      _this5 = _callSuper$1(this, ie, [1]), _this5.name = e, _this5.xml = t, _this5.props = K, _this5.children = Q;
      return _this5;
    }
    _inherits(ie, _Z5);
    return _createClass(ie, [{
      key: "toJSON",
      value: function toJSON() {
        var e = [1, this.name, +this.xml];
        return Y(this.props, K, e), Y(this.children, Q, e), e;
      }
    }, {
      key: "toString",
      value: function toString() {
        var e = this.xml,
          t = this.name,
          n = this.props,
          s = this.children,
          i = s.length;
        var r = "<".concat(t);
        for (var _t8 in n) {
          var _s3 = n[_t8];
          null != _s3 && ("boolean" == typeof _s3 ? _s3 && (r += e ? " ".concat(_t8, "=\"\"") : " ".concat(_t8)) : r += " ".concat(_t8, "=\"").concat(_s3, "\""));
        }
        if (i) {
          r += ">";
          for (var _n3 = !e && G.has(t), _o3 = 0; _o3 < i; _o3++) r += _n3 ? s[_o3].data : s[_o3];
          r += "</".concat(t, ">");
        } else r += e ? " />" : I.has(t) ? ">" : "></".concat(t, ">");
        return r;
      }
    }]);
  }(Z);
  var re = /*#__PURE__*/function (_Z6) {
    function re() {
      var _this6;
      _classCallCheck(this, re);
      _this6 = _callSuper$1(this, re, [11]), _this6.name = "#fragment", _this6.children = Q;
      return _this6;
    }
    _inherits(re, _Z6);
    return _createClass(re, [{
      key: "toJSON",
      value: function toJSON() {
        var e = [11];
        return Y(this.children, Q, e), e;
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.children.join("");
      }
    }]);
  }(Z);
  var oe = "\0",
    le = "\"".concat(oe, "\""),
    ae = "'".concat(oe, "'"),
    ce = /\x00|<[^><\s]+/g,
    ue = /([^\s/>=]+)(?:=(\x00|(?:(['"])[\s\S]*?\3)))?/g,
    de = function de(e, t, n, s, i) {
      return [t, n, s];
    },
    fe = function fe(e) {
      var t = [];
      for (; e.parent;) {
        switch (e.type) {
          case q:
          case 1:
            "template" === e.name && t.push(-1);
        }
        t.push(e.parent.children.indexOf(e)), e = e.parent;
      }
      return t;
    },
    pe = function pe(e, t) {
      do {
        e = e.parent;
      } while (t.has(e));
      return e;
    };
  var he = function he(e, t) {
    return t < 0 ? e.content : e.childNodes[t];
  };
  var ve = function ve(e, t) {
    return t.reduceRight(he, e);
  };
  var ge,
    be = false;
  var me = function me(_ref4) {
      var e = _ref4.firstChild,
        t = _ref4.lastChild;
      var n = ge || (ge = document.createRange());
      return n.setStartAfter(e), n.setEndAfter(t), n.deleteContents(), e;
    },
    xe = function xe(e, t) {
      return be && 11 === e.nodeType ? 1 / t < 0 ? t ? me(e) : e.lastChild : t ? e.valueOf() : e.firstChild : e;
    },
    ye = Symbol("nodes"),
    we = {
      get: function get() {
        return this.firstChild.parentNode;
      }
    },
    Se = {
      value: function value(e) {
        me(this).replaceWith(e);
      }
    },
    ke = {
      value: function value() {
        me(this).remove();
      }
    },
    Ce = {
      value: function value() {
        var e = this.parentNode;
        if (e === this) this[ye] === Q && (this[ye] = _toConsumableArray(this.childNodes));else {
          if (e) {
            var _e0 = this.firstChild,
              _t9 = this.lastChild;
            for (this[ye] = [_e0]; _e0 !== _t9;) this[ye].push(_e0 = _e0.nextSibling);
          }
          this.replaceChildren.apply(this, _toConsumableArray(this[ye]));
        }
        return this;
      }
    };
  function Te(e) {
    var t = H("<>"),
      n = H("</>");
    return e.replaceChildren.apply(e, [t].concat(_toConsumableArray(e.childNodes), [n])), be = true, P(e, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, ye, {
      writable: true,
      value: Q
    }), "firstChild", {
      value: t
    }), "lastChild", {
      value: n
    }), "parentNode", we), "valueOf", Ce), "replaceWith", Se), "remove", ke));
  }
  Te.prototype = DocumentFragment.prototype;
  var De = 16,
    Oe = 32768,
    Ne = function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : globalThis.document;
      var t,
        n = e.createElement("template");
      return function (s) {
        var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (i) return t || (t = e.createRange(), t.selectNodeContents(e.createElementNS("http://www.w3.org/2000/svg", "svg"))), t.createContextualFragment(s);
        n.innerHTML = s;
        var r = n.content;
        return n = n.cloneNode(false), r;
      };
    }(document),
    $e = Symbol("ref"),
    We = function We(e, t) {
      var _iterator = _createForOfIteratorHelper(B(t)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            _n4 = _step$value[0],
            _s4 = _step$value[1];
          var _t0 = "role" === _n4 ? _n4 : "aria-".concat(_n4.toLowerCase());
          null == _s4 ? e.removeAttribute(_t0) : e.setAttribute(_t0, _s4);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    Ae = function Ae(e) {
      return function (t, n) {
        null == n ? t.removeAttribute(e) : t.setAttribute(e, n);
      };
    },
    Ee = function Ee(e, t) {
      e[ye] = function (e, t, n, s) {
        var i = s.parentNode,
          r = t.length;
        var o = e.length,
          l = r,
          a = 0,
          c = 0,
          u = null;
        for (; a < o || c < l;) if (o === a) {
          var _e1 = l < r ? c ? n(t[c - 1], -0).nextSibling : n(t[l], 0) : s;
          for (; c < l;) i.insertBefore(n(t[c++], 1), _e1);
        } else if (l === c) for (; a < o;) u && u.has(e[a]) || n(e[a], -1).remove(), a++;else if (e[a] === t[c]) a++, c++;else if (e[o - 1] === t[l - 1]) o--, l--;else if (e[a] === t[l - 1] && t[c] === e[o - 1]) {
          var _s5 = n(e[--o], -0).nextSibling;
          i.insertBefore(n(t[c++], 1), n(e[a++], -0).nextSibling), i.insertBefore(n(t[--l], 1), _s5), e[o] = t[l];
        } else {
          var _u$get;
          if (!u) {
            u = new Map();
            var _e10 = c;
            for (; _e10 < l;) u.set(t[_e10], _e10++);
          }
          var _s6 = (_u$get = u.get(e[a])) !== null && _u$get !== void 0 ? _u$get : -1;
          if (_s6 < 0) n(e[a++], -1).remove();else if (c < _s6 && _s6 < l) {
            var _r2 = a,
              _d = 1;
            for (; ++_r2 < o && _r2 < l && u.get(e[_r2]) === _s6 + _d;) _d++;
            if (_d > _s6 - c) {
              var _r3 = n(e[a], 0);
              for (; c < _s6;) i.insertBefore(n(t[c++], 1), _r3);
            } else i.replaceChild(n(t[c++], 1), n(e[a++], -1));
          } else a++;
        }
        return t;
      }(e[ye] || Q, t, xe, e);
    },
    Me = new WeakMap(),
    Re = function Re(e, t) {
      var _e$ye;
      var n = "object" == _typeof(t) ? t !== null && t !== void 0 ? t : e : function (e, t) {
          var n = Me.get(e);
          return n ? n.data = t : Me.set(e, n = document.createTextNode(t)), n;
        }(e, t),
        s = (_e$ye = e[ye]) !== null && _e$ye !== void 0 ? _e$ye : e;
      n !== s && s.replaceWith(xe(e[ye] = n, 1));
    },
    Le = function Le(e, t) {
      Re(e, t instanceof W ? t.value : t);
    },
    _e = function _e(_ref5, t) {
      var e = _ref5.dataset;
      var _iterator2 = _createForOfIteratorHelper(B(t)),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            _n5 = _step2$value[0],
            _s7 = _step2$value[1];
          null == _s7 ? delete e[_n5] : e[_n5] = _s7;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    },
    je = new Map(),
    Fe = function Fe(e) {
      var t = je.get(e);
      return t || je.set(e, t = Pe(e)), t;
    },
    Pe = function Pe(e) {
      return function (t, n) {
        t[e] = n;
      };
    },
    Be = function Be(e, t) {
      var _iterator3 = _createForOfIteratorHelper(B(t)),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = _slicedToArray(_step3.value, 2),
            _n6 = _step3$value[0],
            _s8 = _step3$value[1];
          Ae(_n6)(e, _s8);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    },
    Je = function Je(e, t, n) {
      return n ? function (n, s) {
        var i = n[t];
        i !== null && i !== void 0 && i.length && n.removeEventListener.apply(n, [e].concat(_toConsumableArray(i))), s && n.addEventListener.apply(n, [e].concat(_toConsumableArray(s))), n[t] = s;
      } : function (n, s) {
        var i = n[t];
        i && n.removeEventListener(e, i), s && n.addEventListener(e, s), n[t] = s;
      };
    },
    Ve = function Ve(e) {
      return function (t, n) {
        t.toggleAttribute(e, !!n);
      };
    };
  var ze = false;
  var He = true;
  var qe = function qe(e) {
      He = e;
    },
    Ge = function Ge() {
      return He;
    },
    Ie = function Ie(e) {
      return xe(e.n ? e.update(e) : e.valueOf(false), 1);
    },
    Ke = function Ke(e, t) {
      var n = [],
        s = e.length,
        i = t.length;
      for (var _r4, _o4, _l3 = 0, _a2 = 0; _a2 < i; _a2++) _r4 = t[_a2], n[_a2] = _l3 < s && (_o4 = e[_l3++]).t === _r4.t ? (t[_a2] = _o4).update(_r4) : _r4.valueOf(false);
      return n;
    },
    Qe = function Qe(e, t, n) {
      var s = R,
        i = n.length;
      var r = 0;
      _(function (e) {
        return r < i ? n[r++] : n[r++] = e instanceof W ? e : s(e);
      });
      var o = Ge();
      o && qe(!o);
      try {
        return e(t, Ze);
      } finally {
        o && qe(o), _(s);
      }
    },
    Ue = function Ue(e, t) {
      return e.t === t.t ? e.update(t) : (e.n.replaceWith(Ie(t)), e = t), e;
    },
    Xe = function Xe(e, t, n) {
      var s,
        i = [],
        r = [De, null, n],
        o = true;
      return x(function () {
        if (o) o = false, s = Qe(t, n, i), i.length || (i = Q), s ? (e.replaceWith(Ie(s)), r[1] = s) : e.remove();else {
          var _e11 = Qe(t, n, i);
          s && Ue(s, _e11) === _e11 && (r[2] = s = _e11);
        }
      }), r;
    },
    Ye = Symbol(),
    Ze = {};
  var et = /*#__PURE__*/function () {
    function et(e, t) {
      _classCallCheck(this, et);
      this.t = e, this.v = t, this.n = null, this.k = -1;
    }
    return _createClass(et, [{
      key: "valueOf",
      value: function valueOf() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Ge();
        var _this$t = _slicedToArray(this.t, 3),
          t = _this$t[0],
          n = _this$t[1],
          s = _this$t[2],
          i = document.importNode(t, true),
          r = this.v;
        var o,
          l,
          a,
          c = r.length,
          u = Q;
        if (0 < c) {
          for (u = n.slice(0); c--;) {
            var _n$c = _slicedToArray(n[c], 3),
              _t1 = _n$c[0],
              _s9 = _n$c[1],
              _d2 = _n$c[2],
              _f = r[c];
            if (l !== _t1 && (o = ve(i, _t1), l = _t1), _d2 & De) {
              var _e12 = o[Ye] || (o[Ye] = {});
              if (_d2 === De) {
                var _e12$children;
                var _iterator4 = _createForOfIteratorHelper(o.attributes),
                  _step4;
                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    var _e12$_t;
                    var _step4$value = _step4.value,
                      _t10 = _step4$value.name,
                      _n7 = _step4$value.value;
                    (_e12$_t = _e12[_t10]) !== null && _e12$_t !== void 0 ? _e12$_t : _e12[_t10] = _n7;
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }
                (_e12$children = _e12.children) !== null && _e12$children !== void 0 ? _e12$children : _e12.children = _toConsumableArray(o.content.childNodes), u[c] = Xe(o, _f, _e12);
              } else _s9(_e12, _f), u[c] = [_d2, _s9, _e12];
            } else {
              var _t11 = true;
              e || !(8 & _d2) || _d2 & Oe || (1 & _d2 ? (_t11 = false, _f.length && _s9(o, _f[0] instanceof et ? Ke(Q, _f) : _f)) : _f instanceof et && (_t11 = false, _s9(o, Ie(_f)))), _t11 && (512 === _d2 ? this.k = c : (16384 === _d2 && (a !== null && a !== void 0 ? a : a = new Set()).add(o), _s9(o, _f))), u[c] = [_d2, _s9, _f, o], e && 8 & _d2 && o.remove();
            }
          }
          a && function (e) {
            var _iterator5 = _createForOfIteratorHelper(e),
              _step5;
            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var _t12 = _step5.value;
                var _e13 = _t12[$e];
                "function" == typeof _e13 ? _e13(_t12) : _e13 instanceof W ? _e13.value = _t12 : _e13 && (_e13.current = _t12);
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          }(a);
        }
        var d = i.childNodes,
          f = d.length,
          p = 1 === f ? d[0] : f ? Te(i) : i;
        return this.v = u, this.n = p, -1 < this.k && s.set(u[this.k][2], p, this), p;
      }
    }, {
      key: "update",
      value: function update(e) {
        var t = this.k,
          n = this.v,
          s = e.v;
        if (-1 < t && n[t][2] !== s[t]) return function (e, t, _e$t$2$get$update, _e$t$2$get) {
          return (_e$t$2$get$update = (_e$t$2$get = e.t[2].get(t)) === null || _e$t$2$get === void 0 ? void 0 : _e$t$2$get.update(e)) !== null && _e$t$2$get$update !== void 0 ? _e$t$2$get$update : e.valueOf(false);
        }(e, s[t]);
        var i = n.length;
        for (; i--;) {
          var _e15 = n[i],
            _e14 = _slicedToArray(_e15, 3),
            _t13 = _e14[0],
            _r5 = _e14[1],
            _o5 = _e14[2];
          if (512 === _t13) continue;
          var _l4 = s[i];
          if (_t13 & De) {
            if (_t13 === De) {
              var _t14 = _l4(_o5, Ze);
              _r5 && Ue(_r5, _t14) === _t14 && (_e15[2] = _t14);
            } else _r5(_o5, _l4);
          } else {
            var _n8 = _l4;
            if (1 & _t13) {
              if (8 & _t13) _l4.length && _l4[0] instanceof et && (_n8 = Ke(_o5, _l4));else if (256 & _t13 && _l4[0] === _o5[0]) continue;
            } else if (8 & _t13) if (_t13 & Oe) {
              if (_l4 === _o5) {
                _r5(_e15[3], _n8);
                continue;
              }
            } else _o5 instanceof et && (_l4 = Ue(_o5, _l4), _n8 = _l4.n);
            _l4 !== _o5 && (_e15[2] = _l4, _r5(_e15[3], _n8));
          }
        }
        return this.n;
      }
    }]);
  }();
  var tt = new WeakMap();
  var nt = /*#__PURE__*/function (_Map) {
    function nt() {
      var _this7;
      _classCallCheck(this, nt);
      (_this7 = _callSuper$1(this, nt))._ = new FinalizationRegistry(function (e) {
        return _this7["delete"](e);
      });
      return _this7;
    }
    _inherits(nt, _Map);
    return _createClass(nt, [{
      key: "get",
      value: function get(e) {
        var _superPropGet2;
        var t = (_superPropGet2 = _superPropGet(nt, "get", this, 3)([e])) === null || _superPropGet2 === void 0 ? void 0 : _superPropGet2.deref();
        return t && tt.get(t);
      }
    }, {
      key: "set",
      value: function set(e, t, n) {
        tt.set(t, n), this._.register(t, e), _superPropGet(nt, "set", this, 3)([e, new WeakRef(t)]);
      }
    }]);
  }(/*#__PURE__*/_wrapNativeSuper(Map));
  var st = function (_ref6) {
      var _ref6$Comment = _ref6.Comment,
        e = _ref6$Comment === void 0 ? ee : _ref6$Comment,
        _ref6$DocumentType = _ref6.DocumentType,
        t = _ref6$DocumentType === void 0 ? te : _ref6$DocumentType,
        _ref6$Text = _ref6.Text,
        n = _ref6$Text === void 0 ? ne : _ref6$Text,
        _ref6$Fragment = _ref6.Fragment,
        s = _ref6$Fragment === void 0 ? re : _ref6$Fragment,
        _ref6$Element = _ref6.Element,
        i = _ref6$Element === void 0 ? ie : _ref6$Element,
        _ref6$Component = _ref6.Component,
        r = _ref6$Component === void 0 ? se : _ref6$Component,
        _ref6$update = _ref6.update,
        o = _ref6$update === void 0 ? de : _ref6$update;
      return function (l, a, c) {
        var u = l.join(oe).trim(),
          d = new Set(),
          f = [];
        var p = new s(),
          h = 0,
          v = 0,
          g = 0,
          b = Q;
        var _iterator6 = _createForOfIteratorHelper(u.matchAll(ce)),
          _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _s0 = _step6.value;
            if (0 < v) {
              v--;
              continue;
            }
            var _l5 = _s0[0],
              _m = _s0.index;
            if (h < _m && U(p, new n(u.slice(h, _m))), _l5 === oe) {
              "table" === p.name && (p = U(p, new i("tbody", c)), d.add(p));
              var _t15 = U(p, new e("◦"));
              f.push(o(_t15, 8, fe(_t15), "", a[g++])), h = _m + 1;
            } else if (_l5.startsWith("<!")) {
              var _n9 = u.indexOf(">", _m + 2);
              if ("--\x3e" === u.slice(_n9 - 2, _n9 + 1)) {
                var _t16 = u.slice(_m + 4, _n9 - 2);
                "!" === _t16[0] && U(p, new e(_t16.slice(1).replace(/!$/, "")));
              } else U(p, new t(u.slice(_m + 2, _n9)));
              h = _n9 + 1;
            } else if (_l5.startsWith("</")) {
              var _e16 = u.indexOf(">", _m + 2);
              c && "svg" === p.name && (c = !1), p = pe(p, d), h = _e16 + 1;
            } else {
              var _e17 = _m + _l5.length,
                _t17 = u.indexOf(">", _e17),
                _s1 = _l5.slice(1);
              var _x = _s1;
              if (_s1 === oe ? (_x = "template", p = U(p, new r()), b = fe(p).slice(1), f.push(o(p, q, b, "", a[g++]))) : (c || (_x = _x.toLowerCase(), "table" !== p.name || "tr" !== _x && "td" !== _x || (p = U(p, new i("tbody", c)), d.add(p)), "tbody" === p.name && "td" === _x && (p = U(p, new i("tr", c)), d.add(p))), p = U(p, new i(_x, !!c && "svg" !== _x)), b = Q), _e17 < _t17) {
                var _n0 = !1;
                var _iterator7 = _createForOfIteratorHelper(u.slice(_e17, _t17).matchAll(ue)),
                  _step7;
                try {
                  for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                    var _step7$value = _slicedToArray(_step7.value, 3),
                      _s10 = _step7$value[0],
                      _i4 = _step7$value[1],
                      _r6 = _step7$value[2];
                    if (_r6 === oe || _r6 === le || _r6 === ae || (_n0 = _i4.endsWith(oe))) {
                      var _e18 = b === Q ? b = fe(p) : b;
                      f.push(o(p, 2, _e18, _n0 ? _i4.slice(0, -1) : _i4, a[g++])), _n0 = !1, v++;
                    } else X(p, _i4, !_r6 || _r6.slice(1, -1));
                  }
                } catch (err) {
                  _iterator7.e(err);
                } finally {
                  _iterator7.f();
                }
                b = Q;
              }
              h = _t17 + 1;
              var _y = 0 < _t17 && "/" === u[_t17 - 1];
              if (c) _y && (p = p.parent);else if (_y || I.has(_x)) p = _y ? pe(p, d) : p.parent;else if ("svg" === _x) c = !0;else if (G.has(_x)) {
                var _e19 = u.indexOf("</".concat(_s1, ">"), h),
                  _t18 = u.slice(h, _e19);
                _t18.trim() === oe ? (v++, f.push(o(p, 3, fe(p), "", a[g++]))) : U(p, new n(_t18)), p = p.parent, h = _e19 + _s1.length + 3, v++;
                continue;
              }
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
        return h < u.length && U(p, new n(u.slice(h))), [p, f];
      };
    }({
      Comment: ee,
      DocumentType: te,
      Text: ne,
      Fragment: re,
      Element: ie,
      Component: se,
      update: function update(e, t, n, s, i) {
        switch (t) {
          case q:
            return [n, i, De];
          case 8:
            return j(i) ? [n, Ee, 9] : i instanceof V ? [n, (r = e.xml, function (e, t) {
              var _e$$e;
              var n = (_e$$e = e[$e]) !== null && _e$$e !== void 0 ? _e$$e : e[$e] = {};
              n.v !== t && (n.f = Te(Ne(t, r)), n.v = t), Re(e, n.f);
            }), 8192] : i instanceof W ? [n, Le, 32776] : [n, Re, 8];
          case 3:
            return [n, Fe("textContent"), 2048];
          case 2:
            {
              var _t19 = e.type === q;
              switch (s.at(0)) {
                case "@":
                  {
                    var _e20 = j(i);
                    return [n, Je(s.slice(1), Symbol(s), _e20), _e20 ? 257 : 256];
                  }
                case "?":
                  return [n, Ve(s.slice(1)), 4096];
                case ".":
                  return "..." === s ? [n, _t19 ? F : Be, _t19 ? 144 : 128] : [n, Pe(s.slice(1)), _t19 ? 80 : 64];
                default:
                  return _t19 ? [n, Pe(s), 1040] : "aria" === s ? [n, We, 2] : "data" !== s || /^object$/i.test(e.name) ? "key" === s ? [n, ze = true, 512] : "ref" === s ? [n, Fe($e), 16384] : s.startsWith("on") ? [n, Fe(s.toLowerCase()), 64] : [n, Ae(s), 4] : [n, _e, 32];
              }
            }
        }
        var r;
      }
    }),
    it = function it(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
      return function (n) {
        var i = t.get(n);
        for (var _len = arguments.length, s = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          s[_key - 1] = arguments[_key];
        }
        return i || (i = st(n, s, e), i.push(function () {
          var e = ze;
          return ze = false, e;
        }() ? new nt() : null), i[0] = Ne(i[0].toString(), e), t.set(n, i)), new et(i, s);
      };
    },
    rt = it(false),
    ot = it(true),
    lt = new WeakMap();
  function at(e) {
    for (var _len2 = arguments.length, t = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      t[_key2 - 1] = arguments[_key2];
    }
    var n = rt.apply(null, arguments);
    return Ge() ? n.valueOf(true) : n;
  }
  function ct(e) {
    for (var _len3 = arguments.length, t = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      t[_key3 - 1] = arguments[_key3];
    }
    var n = ot.apply(null, arguments);
    return Ge() ? n.valueOf(true) : n;
  }
  var ut = function ut(e, t) {
    var n = lt.get(e);
    if (n && n[0](), "function" == typeof t) {
      var _i5;
      qe(false);
      var _r7 = function (e) {
        var t = {
          deps: void 0,
          depsTail: void 0,
          subs: void 0,
          subsTail: void 0,
          flags: 0
        };
        void 0 !== d && s(t, d);
        var n = v(void 0),
          i = g(t);
        try {
          e();
        } finally {
          g(i), v(n);
        }
        return D.bind(t);
      }(function () {
        _i5 = t();
      });
      if (n && n[1].t === _i5.t) n[1].update(_i5);else {
        var _t20 = _i5.valueOf(false);
        e.replaceChildren(_t20);
      }
      lt.set(e, [_r7, _i5]);
    } else qe(true), lt["delete"](e), e.replaceChildren(t instanceof et ? Ie(t) : xe(t, 1));
    return e;
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
          return ut;
        }
      }, {
        key: "html",
        get: function get() {
          return at;
        }
      }, {
        key: "svg",
        get: function get() {
          return ct;
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
    return ut(this, at.apply(null, arguments));
  }

  exports.Hole = et;
  exports.batch = M;
  exports.computed = N;
  exports.css = css;
  exports.define = define;
  exports.effect = x;
  exports.fragment = Ne;
  exports.html = at;
  exports.render = ut;
  exports.signal = L;
  exports.svg = ct;
  exports.unsafe = z;
  exports.untracked = $;

  return exports;

})({});
