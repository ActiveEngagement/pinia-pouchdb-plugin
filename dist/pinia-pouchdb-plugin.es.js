var be = (e, t, n) => new Promise((r, i) => {
  var a = (f) => {
    try {
      o(n.next(f));
    } catch (_) {
      i(_);
    }
  }, u = (f) => {
    try {
      o(n.throw(f));
    } catch (_) {
      i(_);
    }
  }, o = (f) => f.done ? r(f.value) : Promise.resolve(f.value).then(a, u);
  o((n = n.apply(e, t)).next());
});
function Li(e) {
  var t = e.default;
  if (typeof t == "function") {
    var n = function() {
      return t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
const cu = {}, lu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cu
}, Symbol.toStringTag, { value: "Module" })), du = /* @__PURE__ */ Li(lu);
var cr = {};
cr.test = function() {
  return typeof window.queueMicrotask == "function";
};
cr.install = function(e) {
  return function() {
    window.queueMicrotask(e);
  };
};
var lr = {}, Di = window.MutationObserver || window.WebKitMutationObserver;
lr.test = function() {
  return Di;
};
lr.install = function(e) {
  var t = 0, n = new Di(e), r = window.document.createTextNode("");
  return n.observe(r, {
    characterData: !0
  }), function() {
    r.data = t = ++t % 2;
  };
};
var dr = {};
dr.test = function() {
  return window.setImmediate ? !1 : typeof window.MessageChannel != "undefined";
};
dr.install = function(e) {
  var t = new window.MessageChannel();
  return t.port1.onmessage = e, function() {
    t.port2.postMessage(0);
  };
};
var vr = {};
vr.test = function() {
  return "document" in window && "onreadystatechange" in window.document.createElement("script");
};
vr.install = function(e) {
  return function() {
    var t = window.document.createElement("script");
    return t.onreadystatechange = function() {
      e(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null;
    }, window.document.documentElement.appendChild(t), e;
  };
};
var hr = {};
hr.test = function() {
  return !0;
};
hr.install = function(e) {
  return function() {
    setTimeout(e, 0);
  };
};
var $t = [du, cr, lr, dr, vr, hr], at, Qe, At = -1, De = [], Bn = !1;
function vu() {
  !at || !Qe || (at = !1, Qe.length ? De = Qe.concat(De) : At = -1, De.length && Ni());
}
function Ni() {
  if (!at) {
    Bn = !1, at = !0;
    for (var e = De.length, t = setTimeout(vu); e; ) {
      for (Qe = De, De = []; Qe && ++At < e; )
        Qe[At].run();
      At = -1, e = De.length;
    }
    Qe = null, At = -1, at = !1, clearTimeout(t);
  }
}
var Fi, mt = -1, hu = $t.length;
for (; ++mt < hu; )
  if ($t[mt] && $t[mt].test && $t[mt].test()) {
    Fi = $t[mt].install(Ni);
    break;
  }
function Mi(e, t) {
  this.fun = e, this.array = t;
}
Mi.prototype.run = function() {
  var e = this.fun, t = this.array;
  switch (t.length) {
    case 0:
      return e();
    case 1:
      return e(t[0]);
    case 2:
      return e(t[0], t[1]);
    case 3:
      return e(t[0], t[1], t[2]);
    default:
      return e.apply(null, t);
  }
};
var _e = yu;
function yu(e) {
  var t = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var n = 1; n < arguments.length; n++)
      t[n - 1] = arguments[n];
  De.push(new Mi(e, t)), !Bn && !at && (Bn = !0, Fi());
}
var Qt, gu = new Uint8Array(16);
function pu() {
  if (!Qt && (Qt = typeof crypto != "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != "undefined" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !Qt))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Qt(gu);
}
const _u = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function mu(e) {
  return typeof e == "string" && _u.test(e);
}
var ye = [];
for (var bn = 0; bn < 256; ++bn)
  ye.push((bn + 256).toString(16).substr(1));
function wu(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = (ye[e[t + 0]] + ye[e[t + 1]] + ye[e[t + 2]] + ye[e[t + 3]] + "-" + ye[e[t + 4]] + ye[e[t + 5]] + "-" + ye[e[t + 6]] + ye[e[t + 7]] + "-" + ye[e[t + 8]] + ye[e[t + 9]] + "-" + ye[e[t + 10]] + ye[e[t + 11]] + ye[e[t + 12]] + ye[e[t + 13]] + ye[e[t + 14]] + ye[e[t + 15]]).toLowerCase();
  if (!mu(n))
    throw TypeError("Stringified UUID is invalid");
  return n;
}
function Ui(e, t, n) {
  e = e || {};
  var r = e.random || (e.rng || pu)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (var i = 0; i < 16; ++i)
      t[n + i] = r[i];
    return t;
  }
  return wu(r);
}
var zi = { exports: {} };
(function(e, t) {
  (function(n) {
    e.exports = n();
  })(function(n) {
    var r = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    function i(y, v) {
      var s = y[0], l = y[1], h = y[2], p = y[3];
      s += (l & h | ~l & p) + v[0] - 680876936 | 0, s = (s << 7 | s >>> 25) + l | 0, p += (s & l | ~s & h) + v[1] - 389564586 | 0, p = (p << 12 | p >>> 20) + s | 0, h += (p & s | ~p & l) + v[2] + 606105819 | 0, h = (h << 17 | h >>> 15) + p | 0, l += (h & p | ~h & s) + v[3] - 1044525330 | 0, l = (l << 22 | l >>> 10) + h | 0, s += (l & h | ~l & p) + v[4] - 176418897 | 0, s = (s << 7 | s >>> 25) + l | 0, p += (s & l | ~s & h) + v[5] + 1200080426 | 0, p = (p << 12 | p >>> 20) + s | 0, h += (p & s | ~p & l) + v[6] - 1473231341 | 0, h = (h << 17 | h >>> 15) + p | 0, l += (h & p | ~h & s) + v[7] - 45705983 | 0, l = (l << 22 | l >>> 10) + h | 0, s += (l & h | ~l & p) + v[8] + 1770035416 | 0, s = (s << 7 | s >>> 25) + l | 0, p += (s & l | ~s & h) + v[9] - 1958414417 | 0, p = (p << 12 | p >>> 20) + s | 0, h += (p & s | ~p & l) + v[10] - 42063 | 0, h = (h << 17 | h >>> 15) + p | 0, l += (h & p | ~h & s) + v[11] - 1990404162 | 0, l = (l << 22 | l >>> 10) + h | 0, s += (l & h | ~l & p) + v[12] + 1804603682 | 0, s = (s << 7 | s >>> 25) + l | 0, p += (s & l | ~s & h) + v[13] - 40341101 | 0, p = (p << 12 | p >>> 20) + s | 0, h += (p & s | ~p & l) + v[14] - 1502002290 | 0, h = (h << 17 | h >>> 15) + p | 0, l += (h & p | ~h & s) + v[15] + 1236535329 | 0, l = (l << 22 | l >>> 10) + h | 0, s += (l & p | h & ~p) + v[1] - 165796510 | 0, s = (s << 5 | s >>> 27) + l | 0, p += (s & h | l & ~h) + v[6] - 1069501632 | 0, p = (p << 9 | p >>> 23) + s | 0, h += (p & l | s & ~l) + v[11] + 643717713 | 0, h = (h << 14 | h >>> 18) + p | 0, l += (h & s | p & ~s) + v[0] - 373897302 | 0, l = (l << 20 | l >>> 12) + h | 0, s += (l & p | h & ~p) + v[5] - 701558691 | 0, s = (s << 5 | s >>> 27) + l | 0, p += (s & h | l & ~h) + v[10] + 38016083 | 0, p = (p << 9 | p >>> 23) + s | 0, h += (p & l | s & ~l) + v[15] - 660478335 | 0, h = (h << 14 | h >>> 18) + p | 0, l += (h & s | p & ~s) + v[4] - 405537848 | 0, l = (l << 20 | l >>> 12) + h | 0, s += (l & p | h & ~p) + v[9] + 568446438 | 0, s = (s << 5 | s >>> 27) + l | 0, p += (s & h | l & ~h) + v[14] - 1019803690 | 0, p = (p << 9 | p >>> 23) + s | 0, h += (p & l | s & ~l) + v[3] - 187363961 | 0, h = (h << 14 | h >>> 18) + p | 0, l += (h & s | p & ~s) + v[8] + 1163531501 | 0, l = (l << 20 | l >>> 12) + h | 0, s += (l & p | h & ~p) + v[13] - 1444681467 | 0, s = (s << 5 | s >>> 27) + l | 0, p += (s & h | l & ~h) + v[2] - 51403784 | 0, p = (p << 9 | p >>> 23) + s | 0, h += (p & l | s & ~l) + v[7] + 1735328473 | 0, h = (h << 14 | h >>> 18) + p | 0, l += (h & s | p & ~s) + v[12] - 1926607734 | 0, l = (l << 20 | l >>> 12) + h | 0, s += (l ^ h ^ p) + v[5] - 378558 | 0, s = (s << 4 | s >>> 28) + l | 0, p += (s ^ l ^ h) + v[8] - 2022574463 | 0, p = (p << 11 | p >>> 21) + s | 0, h += (p ^ s ^ l) + v[11] + 1839030562 | 0, h = (h << 16 | h >>> 16) + p | 0, l += (h ^ p ^ s) + v[14] - 35309556 | 0, l = (l << 23 | l >>> 9) + h | 0, s += (l ^ h ^ p) + v[1] - 1530992060 | 0, s = (s << 4 | s >>> 28) + l | 0, p += (s ^ l ^ h) + v[4] + 1272893353 | 0, p = (p << 11 | p >>> 21) + s | 0, h += (p ^ s ^ l) + v[7] - 155497632 | 0, h = (h << 16 | h >>> 16) + p | 0, l += (h ^ p ^ s) + v[10] - 1094730640 | 0, l = (l << 23 | l >>> 9) + h | 0, s += (l ^ h ^ p) + v[13] + 681279174 | 0, s = (s << 4 | s >>> 28) + l | 0, p += (s ^ l ^ h) + v[0] - 358537222 | 0, p = (p << 11 | p >>> 21) + s | 0, h += (p ^ s ^ l) + v[3] - 722521979 | 0, h = (h << 16 | h >>> 16) + p | 0, l += (h ^ p ^ s) + v[6] + 76029189 | 0, l = (l << 23 | l >>> 9) + h | 0, s += (l ^ h ^ p) + v[9] - 640364487 | 0, s = (s << 4 | s >>> 28) + l | 0, p += (s ^ l ^ h) + v[12] - 421815835 | 0, p = (p << 11 | p >>> 21) + s | 0, h += (p ^ s ^ l) + v[15] + 530742520 | 0, h = (h << 16 | h >>> 16) + p | 0, l += (h ^ p ^ s) + v[2] - 995338651 | 0, l = (l << 23 | l >>> 9) + h | 0, s += (h ^ (l | ~p)) + v[0] - 198630844 | 0, s = (s << 6 | s >>> 26) + l | 0, p += (l ^ (s | ~h)) + v[7] + 1126891415 | 0, p = (p << 10 | p >>> 22) + s | 0, h += (s ^ (p | ~l)) + v[14] - 1416354905 | 0, h = (h << 15 | h >>> 17) + p | 0, l += (p ^ (h | ~s)) + v[5] - 57434055 | 0, l = (l << 21 | l >>> 11) + h | 0, s += (h ^ (l | ~p)) + v[12] + 1700485571 | 0, s = (s << 6 | s >>> 26) + l | 0, p += (l ^ (s | ~h)) + v[3] - 1894986606 | 0, p = (p << 10 | p >>> 22) + s | 0, h += (s ^ (p | ~l)) + v[10] - 1051523 | 0, h = (h << 15 | h >>> 17) + p | 0, l += (p ^ (h | ~s)) + v[1] - 2054922799 | 0, l = (l << 21 | l >>> 11) + h | 0, s += (h ^ (l | ~p)) + v[8] + 1873313359 | 0, s = (s << 6 | s >>> 26) + l | 0, p += (l ^ (s | ~h)) + v[15] - 30611744 | 0, p = (p << 10 | p >>> 22) + s | 0, h += (s ^ (p | ~l)) + v[6] - 1560198380 | 0, h = (h << 15 | h >>> 17) + p | 0, l += (p ^ (h | ~s)) + v[13] + 1309151649 | 0, l = (l << 21 | l >>> 11) + h | 0, s += (h ^ (l | ~p)) + v[4] - 145523070 | 0, s = (s << 6 | s >>> 26) + l | 0, p += (l ^ (s | ~h)) + v[11] - 1120210379 | 0, p = (p << 10 | p >>> 22) + s | 0, h += (s ^ (p | ~l)) + v[2] + 718787259 | 0, h = (h << 15 | h >>> 17) + p | 0, l += (p ^ (h | ~s)) + v[9] - 343485551 | 0, l = (l << 21 | l >>> 11) + h | 0, y[0] = s + y[0] | 0, y[1] = l + y[1] | 0, y[2] = h + y[2] | 0, y[3] = p + y[3] | 0;
    }
    function a(y) {
      var v = [], s;
      for (s = 0; s < 64; s += 4)
        v[s >> 2] = y.charCodeAt(s) + (y.charCodeAt(s + 1) << 8) + (y.charCodeAt(s + 2) << 16) + (y.charCodeAt(s + 3) << 24);
      return v;
    }
    function u(y) {
      var v = [], s;
      for (s = 0; s < 64; s += 4)
        v[s >> 2] = y[s] + (y[s + 1] << 8) + (y[s + 2] << 16) + (y[s + 3] << 24);
      return v;
    }
    function o(y) {
      var v = y.length, s = [1732584193, -271733879, -1732584194, 271733878], l, h, p, j, R, B;
      for (l = 64; l <= v; l += 64)
        i(s, a(y.substring(l - 64, l)));
      for (y = y.substring(l - 64), h = y.length, p = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], l = 0; l < h; l += 1)
        p[l >> 2] |= y.charCodeAt(l) << (l % 4 << 3);
      if (p[l >> 2] |= 128 << (l % 4 << 3), l > 55)
        for (i(s, p), l = 0; l < 16; l += 1)
          p[l] = 0;
      return j = v * 8, j = j.toString(16).match(/(.*?)(.{0,8})$/), R = parseInt(j[2], 16), B = parseInt(j[1], 16) || 0, p[14] = R, p[15] = B, i(s, p), s;
    }
    function f(y) {
      var v = y.length, s = [1732584193, -271733879, -1732584194, 271733878], l, h, p, j, R, B;
      for (l = 64; l <= v; l += 64)
        i(s, u(y.subarray(l - 64, l)));
      for (y = l - 64 < v ? y.subarray(l - 64) : new Uint8Array(0), h = y.length, p = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], l = 0; l < h; l += 1)
        p[l >> 2] |= y[l] << (l % 4 << 3);
      if (p[l >> 2] |= 128 << (l % 4 << 3), l > 55)
        for (i(s, p), l = 0; l < 16; l += 1)
          p[l] = 0;
      return j = v * 8, j = j.toString(16).match(/(.*?)(.{0,8})$/), R = parseInt(j[2], 16), B = parseInt(j[1], 16) || 0, p[14] = R, p[15] = B, i(s, p), s;
    }
    function _(y) {
      var v = "", s;
      for (s = 0; s < 4; s += 1)
        v += r[y >> s * 8 + 4 & 15] + r[y >> s * 8 & 15];
      return v;
    }
    function b(y) {
      var v;
      for (v = 0; v < y.length; v += 1)
        y[v] = _(y[v]);
      return y.join("");
    }
    b(o("hello")), typeof ArrayBuffer != "undefined" && !ArrayBuffer.prototype.slice && function() {
      function y(v, s) {
        return v = v | 0 || 0, v < 0 ? Math.max(v + s, 0) : Math.min(v, s);
      }
      ArrayBuffer.prototype.slice = function(v, s) {
        var l = this.byteLength, h = y(v, l), p = l, j, R, B, L;
        return s !== n && (p = y(s, l)), h > p ? new ArrayBuffer(0) : (j = p - h, R = new ArrayBuffer(j), B = new Uint8Array(R), L = new Uint8Array(this, h, j), B.set(L), R);
      };
    }();
    function c(y) {
      return /[\u0080-\uFFFF]/.test(y) && (y = unescape(encodeURIComponent(y))), y;
    }
    function m(y, v) {
      var s = y.length, l = new ArrayBuffer(s), h = new Uint8Array(l), p;
      for (p = 0; p < s; p += 1)
        h[p] = y.charCodeAt(p);
      return v ? h : l;
    }
    function O(y) {
      return String.fromCharCode.apply(null, new Uint8Array(y));
    }
    function $(y, v, s) {
      var l = new Uint8Array(y.byteLength + v.byteLength);
      return l.set(new Uint8Array(y)), l.set(new Uint8Array(v), y.byteLength), s ? l : l.buffer;
    }
    function x(y) {
      var v = [], s = y.length, l;
      for (l = 0; l < s - 1; l += 2)
        v.push(parseInt(y.substr(l, 2), 16));
      return String.fromCharCode.apply(String, v);
    }
    function A() {
      this.reset();
    }
    return A.prototype.append = function(y) {
      return this.appendBinary(c(y)), this;
    }, A.prototype.appendBinary = function(y) {
      this._buff += y, this._length += y.length;
      var v = this._buff.length, s;
      for (s = 64; s <= v; s += 64)
        i(this._hash, a(this._buff.substring(s - 64, s)));
      return this._buff = this._buff.substring(s - 64), this;
    }, A.prototype.end = function(y) {
      var v = this._buff, s = v.length, l, h = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], p;
      for (l = 0; l < s; l += 1)
        h[l >> 2] |= v.charCodeAt(l) << (l % 4 << 3);
      return this._finish(h, s), p = b(this._hash), y && (p = x(p)), this.reset(), p;
    }, A.prototype.reset = function() {
      return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, A.prototype.getState = function() {
      return {
        buff: this._buff,
        length: this._length,
        hash: this._hash.slice()
      };
    }, A.prototype.setState = function(y) {
      return this._buff = y.buff, this._length = y.length, this._hash = y.hash, this;
    }, A.prototype.destroy = function() {
      delete this._hash, delete this._buff, delete this._length;
    }, A.prototype._finish = function(y, v) {
      var s = v, l, h, p;
      if (y[s >> 2] |= 128 << (s % 4 << 3), s > 55)
        for (i(this._hash, y), s = 0; s < 16; s += 1)
          y[s] = 0;
      l = this._length * 8, l = l.toString(16).match(/(.*?)(.{0,8})$/), h = parseInt(l[2], 16), p = parseInt(l[1], 16) || 0, y[14] = h, y[15] = p, i(this._hash, y);
    }, A.hash = function(y, v) {
      return A.hashBinary(c(y), v);
    }, A.hashBinary = function(y, v) {
      var s = o(y), l = b(s);
      return v ? x(l) : l;
    }, A.ArrayBuffer = function() {
      this.reset();
    }, A.ArrayBuffer.prototype.append = function(y) {
      var v = $(this._buff.buffer, y, !0), s = v.length, l;
      for (this._length += y.byteLength, l = 64; l <= s; l += 64)
        i(this._hash, u(v.subarray(l - 64, l)));
      return this._buff = l - 64 < s ? new Uint8Array(v.buffer.slice(l - 64)) : new Uint8Array(0), this;
    }, A.ArrayBuffer.prototype.end = function(y) {
      var v = this._buff, s = v.length, l = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], h, p;
      for (h = 0; h < s; h += 1)
        l[h >> 2] |= v[h] << (h % 4 << 3);
      return this._finish(l, s), p = b(this._hash), y && (p = x(p)), this.reset(), p;
    }, A.ArrayBuffer.prototype.reset = function() {
      return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, A.ArrayBuffer.prototype.getState = function() {
      var y = A.prototype.getState.call(this);
      return y.buff = O(y.buff), y;
    }, A.ArrayBuffer.prototype.setState = function(y) {
      return y.buff = m(y.buff, !0), A.prototype.setState.call(this, y);
    }, A.ArrayBuffer.prototype.destroy = A.prototype.destroy, A.ArrayBuffer.prototype._finish = A.prototype._finish, A.ArrayBuffer.hash = function(y, v) {
      var s = f(new Uint8Array(y)), l = b(s);
      return v ? x(l) : l;
    }, A;
  });
})(zi);
const Zt = zi.exports;
var on = {};
on.stringify = function(t) {
  var n = [];
  n.push({
    obj: t
  });
  for (var r = "", i, a, u, o, f, _, b, c, m, O, $; i = n.pop(); )
    if (a = i.obj, u = i.prefix || "", o = i.val || "", r += u, o)
      r += o;
    else if (typeof a != "object")
      r += typeof a == "undefined" ? null : JSON.stringify(a);
    else if (a === null)
      r += "null";
    else if (Array.isArray(a)) {
      for (n.push({
        val: "]"
      }), f = a.length - 1; f >= 0; f--)
        _ = f === 0 ? "" : ",", n.push({
          obj: a[f],
          prefix: _
        });
      n.push({
        val: "["
      });
    } else {
      b = [];
      for (c in a)
        a.hasOwnProperty(c) && b.push(c);
      for (n.push({
        val: "}"
      }), f = b.length - 1; f >= 0; f--)
        m = b[f], O = a[m], $ = f > 0 ? "," : "", $ += JSON.stringify(m) + ":", n.push({
          obj: O,
          prefix: $
        });
      n.push({
        val: "{"
      });
    }
  return r;
};
function nt(e, t, n) {
  var r = n[n.length - 1];
  e === r.element && (n.pop(), r = n[n.length - 1]);
  var i = r.element, a = r.index;
  if (Array.isArray(i))
    i.push(e);
  else if (a === t.length - 2) {
    var u = t.pop();
    i[u] = e;
  } else
    t.push(e);
}
on.parse = function(e) {
  for (var t = [], n = [], r = 0, i, a, u, o, f, _, b, c, m; ; ) {
    if (i = e[r++], i === "}" || i === "]" || typeof i == "undefined") {
      if (t.length === 1)
        return t.pop();
      nt(t.pop(), t, n);
      continue;
    }
    switch (i) {
      case " ":
      case "	":
      case `
`:
      case ":":
      case ",":
        break;
      case "n":
        r += 3, nt(null, t, n);
        break;
      case "t":
        r += 3, nt(!0, t, n);
        break;
      case "f":
        r += 4, nt(!1, t, n);
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "-":
        for (a = "", r--; ; )
          if (u = e[r++], /[\d\.\-e\+]/.test(u))
            a += u;
          else {
            r--;
            break;
          }
        nt(parseFloat(a), t, n);
        break;
      case '"':
        for (o = "", f = void 0, _ = 0; b = e[r++], b !== '"' || f === "\\" && _ % 2 === 1; )
          o += b, f = b, f === "\\" ? _++ : _ = 0;
        nt(JSON.parse('"' + o + '"'), t, n);
        break;
      case "[":
        c = {
          element: [],
          index: t.length
        }, t.push(c.element), n.push(c);
        break;
      case "{":
        m = {
          element: {},
          index: t.length
        }, t.push(m.element), n.push(m);
        break;
      default:
        throw new Error("unexpectedly reached end of input: " + i);
    }
  }
};
var Be = bu;
function bu(e) {
  return function() {
    var t = arguments.length;
    if (t) {
      for (var n = [], r = -1; ++r < t; )
        n[r] = arguments[r];
      return e.call(this, n);
    } else
      return e.call(this, []);
  };
}
var ve = { exports: {} };
typeof Object.create == "function" ? ve.exports = function(t, n) {
  n && (t.super_ = n, t.prototype = Object.create(n.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : ve.exports = function(t, n) {
  if (n) {
    t.super_ = n;
    var r = function() {
    };
    r.prototype = n.prototype, t.prototype = new r(), t.prototype.constructor = t;
  }
};
var de = { exports: {} }, ut = typeof Reflect == "object" ? Reflect : null, Kr = ut && typeof ut.apply == "function" ? ut.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, Ht;
ut && typeof ut.ownKeys == "function" ? Ht = ut.ownKeys : Object.getOwnPropertySymbols ? Ht = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Ht = function(t) {
  return Object.getOwnPropertyNames(t);
};
function $u(e) {
  console && console.warn && console.warn(e);
}
var Ki = Number.isNaN || function(t) {
  return t !== t;
};
function ne() {
  ne.init.call(this);
}
de.exports = ne;
de.exports.once = xu;
ne.EventEmitter = ne;
ne.prototype._events = void 0;
ne.prototype._eventsCount = 0;
ne.prototype._maxListeners = void 0;
var Qr = 10;
function sn(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(ne, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Qr;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || Ki(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    Qr = e;
  }
});
ne.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
ne.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || Ki(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function Qi(e) {
  return e._maxListeners === void 0 ? ne.defaultMaxListeners : e._maxListeners;
}
ne.prototype.getMaxListeners = function() {
  return Qi(this);
};
ne.prototype.emit = function(t) {
  for (var n = [], r = 1; r < arguments.length; r++)
    n.push(arguments[r]);
  var i = t === "error", a = this._events;
  if (a !== void 0)
    i = i && a.error === void 0;
  else if (!i)
    return !1;
  if (i) {
    var u;
    if (n.length > 0 && (u = n[0]), u instanceof Error)
      throw u;
    var o = new Error("Unhandled error." + (u ? " (" + u.message + ")" : ""));
    throw o.context = u, o;
  }
  var f = a[t];
  if (f === void 0)
    return !1;
  if (typeof f == "function")
    Kr(f, this, n);
  else
    for (var _ = f.length, b = Yi(f, _), r = 0; r < _; ++r)
      Kr(b[r], this, n);
  return !0;
};
function Gi(e, t, n, r) {
  var i, a, u;
  if (sn(n), a = e._events, a === void 0 ? (a = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (a.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n), a = e._events), u = a[t]), u === void 0)
    u = a[t] = n, ++e._eventsCount;
  else if (typeof u == "function" ? u = a[t] = r ? [n, u] : [u, n] : r ? u.unshift(n) : u.push(n), i = Qi(e), i > 0 && u.length > i && !u.warned) {
    u.warned = !0;
    var o = new Error("Possible EventEmitter memory leak detected. " + u.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    o.name = "MaxListenersExceededWarning", o.emitter = e, o.type = t, o.count = u.length, $u(o);
  }
  return e;
}
ne.prototype.addListener = function(t, n) {
  return Gi(this, t, n, !1);
};
ne.prototype.on = ne.prototype.addListener;
ne.prototype.prependListener = function(t, n) {
  return Gi(this, t, n, !0);
};
function Au() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Ji(e, t, n) {
  var r = {
    fired: !1,
    wrapFn: void 0,
    target: e,
    type: t,
    listener: n
  }, i = Au.bind(r);
  return i.listener = n, r.wrapFn = i, i;
}
ne.prototype.once = function(t, n) {
  return sn(n), this.on(t, Ji(this, t, n)), this;
};
ne.prototype.prependOnceListener = function(t, n) {
  return sn(n), this.prependListener(t, Ji(this, t, n)), this;
};
ne.prototype.removeListener = function(t, n) {
  var r, i, a, u, o;
  if (sn(n), i = this._events, i === void 0)
    return this;
  if (r = i[t], r === void 0)
    return this;
  if (r === n || r.listener === n)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[t], i.removeListener && this.emit("removeListener", t, r.listener || n));
  else if (typeof r != "function") {
    for (a = -1, u = r.length - 1; u >= 0; u--)
      if (r[u] === n || r[u].listener === n) {
        o = r[u].listener, a = u;
        break;
      }
    if (a < 0)
      return this;
    a === 0 ? r.shift() : Ou(r, a), r.length === 1 && (i[t] = r[0]), i.removeListener !== void 0 && this.emit("removeListener", t, o || n);
  }
  return this;
};
ne.prototype.off = ne.prototype.removeListener;
ne.prototype.removeAllListeners = function(t) {
  var n, r, i;
  if (r = this._events, r === void 0)
    return this;
  if (r.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : r[t] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete r[t]), this;
  if (arguments.length === 0) {
    var a = Object.keys(r), u;
    for (i = 0; i < a.length; ++i)
      u = a[i], u !== "removeListener" && this.removeAllListeners(u);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (n = r[t], typeof n == "function")
    this.removeListener(t, n);
  else if (n !== void 0)
    for (i = n.length - 1; i >= 0; i--)
      this.removeListener(t, n[i]);
  return this;
};
function Wi(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var i = r[t];
  return i === void 0 ? [] : typeof i == "function" ? n ? [i.listener || i] : [i] : n ? Su(i) : Yi(i, i.length);
}
ne.prototype.listeners = function(t) {
  return Wi(this, t, !0);
};
ne.prototype.rawListeners = function(t) {
  return Wi(this, t, !1);
};
ne.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : Hi.call(e, t);
};
ne.prototype.listenerCount = Hi;
function Hi(e) {
  var t = this._events;
  if (t !== void 0) {
    var n = t[e];
    if (typeof n == "function")
      return 1;
    if (n !== void 0)
      return n.length;
  }
  return 0;
}
ne.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Ht(this._events) : [];
};
function Yi(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function Ou(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function Su(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function xu(e, t) {
  return new Promise(function(n, r) {
    function i(u) {
      e.removeListener(t, a), r(u);
    }
    function a() {
      typeof e.removeListener == "function" && e.removeListener("error", i), n([].slice.call(arguments));
    }
    Xi(e, t, a, {
      once: !0
    }), t !== "error" && Eu(e, i, {
      once: !0
    });
  });
}
function Eu(e, t, n) {
  typeof e.on == "function" && Xi(e, "error", t, n);
}
function Xi(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function i(a) {
      r.once && e.removeEventListener(t, i), n(a);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
function fn(e) {
  return "$" + e;
}
function Zi(e) {
  return e.substring(1);
}
function Re() {
  this._store = {};
}
Re.prototype.get = function(e) {
  var t = fn(e);
  return this._store[t];
};
Re.prototype.set = function(e, t) {
  var n = fn(e);
  return this._store[n] = t, !0;
};
Re.prototype.has = function(e) {
  var t = fn(e);
  return t in this._store;
};
Re.prototype.keys = function() {
  return Object.keys(this._store).map((e) => Zi(e));
};
Re.prototype.delete = function(e) {
  var t = fn(e), n = t in this._store;
  return delete this._store[t], n;
};
Re.prototype.forEach = function(e) {
  for (var t = Object.keys(this._store), n = 0, r = t.length; n < r; n++) {
    var i = t[n], a = this._store[i];
    i = Zi(i), e(a, i);
  }
};
Object.defineProperty(Re.prototype, "size", {
  get: function() {
    return Object.keys(this._store).length;
  }
});
function Tt(e) {
  if (this._store = new Re(), e && Array.isArray(e))
    for (var t = 0, n = e.length; t < n; t++)
      this.add(e[t]);
}
Tt.prototype.add = function(e) {
  return this._store.set(e, !0);
};
Tt.prototype.has = function(e) {
  return this._store.has(e);
};
Tt.prototype.forEach = function(e) {
  this._store.forEach(function(t, n) {
    e(n);
  });
};
Object.defineProperty(Tt.prototype, "size", {
  get: function() {
    return this._store.size;
  }
});
function ku() {
  if (typeof Symbol == "undefined" || typeof Map == "undefined" || typeof Set == "undefined")
    return !1;
  var e = Object.getOwnPropertyDescriptor(Map, Symbol.species);
  return e && "get" in e && Map[Symbol.species] === Map;
}
var ct, we;
ku() ? (ct = Set, we = Map) : (ct = Tt, we = Re);
function Cu(e) {
  return typeof ArrayBuffer != "undefined" && e instanceof ArrayBuffer || typeof Blob != "undefined" && e instanceof Blob;
}
function ju(e) {
  if (typeof e.slice == "function")
    return e.slice(0);
  var t = new ArrayBuffer(e.byteLength), n = new Uint8Array(t), r = new Uint8Array(e);
  return n.set(r), t;
}
function Pu(e) {
  if (e instanceof ArrayBuffer)
    return ju(e);
  var t = e.size, n = e.type;
  return typeof e.slice == "function" ? e.slice(0, t, n) : e.webkitSlice(0, t, n);
}
var Vi = Function.prototype.toString, qu = Vi.call(Object);
function Tu(e) {
  var t = Object.getPrototypeOf(e);
  if (t === null)
    return !0;
  var n = t.constructor;
  return typeof n == "function" && n instanceof n && Vi.call(n) == qu;
}
function le(e) {
  var t, n, r;
  if (!e || typeof e != "object")
    return e;
  if (Array.isArray(e)) {
    for (t = [], n = 0, r = e.length; n < r; n++)
      t[n] = le(e[n]);
    return t;
  }
  if (e instanceof Date && isFinite(e))
    return e.toISOString();
  if (Cu(e))
    return Pu(e);
  if (!Tu(e))
    return e;
  t = {};
  for (n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      var i = le(e[n]);
      typeof i != "undefined" && (t[n] = i);
    }
  return t;
}
function ea(e) {
  var t = !1;
  return Be(function(n) {
    if (t)
      throw new Error("once called more than once");
    t = !0, e.apply(this, n);
  });
}
function ta(e) {
  return Be(function(t) {
    t = le(t);
    var n = this, r = typeof t[t.length - 1] == "function" ? t.pop() : !1, i = new Promise(function(a, u) {
      var o;
      try {
        var f = ea(function(_, b) {
          _ ? u(_) : a(b);
        });
        t.push(f), o = e.apply(n, t), o && typeof o.then == "function" && a(o);
      } catch (_) {
        u(_);
      }
    });
    return r && i.then(function(a) {
      r(null, a);
    }, r), i;
  });
}
function Iu(e, t, n) {
  if (e.constructor.listeners("debug").length) {
    for (var r = ["api", e.name, t], i = 0; i < n.length - 1; i++)
      r.push(n[i]);
    e.constructor.emit("debug", r);
    var a = n[n.length - 1];
    n[n.length - 1] = function(u, o) {
      var f = ["api", e.name, t];
      f = f.concat(u ? ["error", u] : ["success", o]), e.constructor.emit("debug", f), a(u, o);
    };
  }
}
function fe(e, t) {
  return ta(Be(function(n) {
    if (this._closed)
      return Promise.reject(new Error("database is closed"));
    if (this._destroyed)
      return Promise.reject(new Error("database is destroyed"));
    var r = this;
    return Iu(r, e, n), this.taskqueue.isReady ? t.apply(this, n) : new Promise(function(i, a) {
      r.taskqueue.addTask(function(u) {
        u ? a(u) : i(r[e].apply(r, n));
      });
    });
  }));
}
function It(e, t) {
  for (var n = {}, r = 0, i = t.length; r < i; r++) {
    var a = t[r];
    a in e && (n[a] = e[a]);
  }
  return n;
}
var Bu = 6;
function Gr(e) {
  return e;
}
function Ru(e) {
  return [{
    ok: e
  }];
}
function na(e, t, n) {
  var r = t.docs, i = new we();
  r.forEach(function(x) {
    i.has(x.id) ? i.get(x.id).push(x) : i.set(x.id, [x]);
  });
  var a = i.size, u = 0, o = new Array(a);
  function f() {
    var x = [];
    o.forEach(function(A) {
      A.docs.forEach(function(y) {
        x.push({
          id: A.id,
          docs: [y]
        });
      });
    }), n(null, {
      results: x
    });
  }
  function _() {
    ++u === a && f();
  }
  function b(x, A, y) {
    o[x] = {
      id: A,
      docs: y
    }, _();
  }
  var c = [];
  i.forEach(function(x, A) {
    c.push(A);
  });
  var m = 0;
  function O() {
    if (!(m >= c.length)) {
      var x = Math.min(m + Bu, c.length), A = c.slice(m, x);
      $(A, m), m += A.length;
    }
  }
  function $(x, A) {
    x.forEach(function(y, v) {
      var s = A + v, l = i.get(y), h = It(l[0], ["atts_since", "attachments"]);
      h.open_revs = l.map(function(j) {
        return j.rev;
      }), h.open_revs = h.open_revs.filter(Gr);
      var p = Gr;
      h.open_revs.length === 0 && (delete h.open_revs, p = Ru), ["revs", "attachments", "binary", "ajax", "latest"].forEach(function(j) {
        j in t && (h[j] = t[j]);
      }), e.get(y, h, function(j, R) {
        var B;
        j ? B = [{
          error: j
        }] : B = p(R), b(s, y, B), O();
      });
    });
  }
  O();
}
var Rn;
try {
  localStorage.setItem("_pouch_check_localstorage", 1), Rn = !!localStorage.getItem("_pouch_check_localstorage");
} catch (e) {
  Rn = !1;
}
function cn() {
  return Rn;
}
ve.exports(ht, de.exports);
function Lu(e) {
  cn() && addEventListener("storage", function(t) {
    e.emit(t.key);
  });
}
function ht() {
  de.exports.call(this), this._listeners = {}, Lu(this);
}
ht.prototype.addListener = function(e, t, n, r) {
  if (this._listeners[t])
    return;
  var i = this, a = !1;
  function u() {
    if (!i._listeners[t])
      return;
    if (a) {
      a = "waiting";
      return;
    }
    a = !0;
    var o = It(r, ["style", "include_docs", "attachments", "conflicts", "filter", "doc_ids", "view", "since", "query_params", "binary", "return_docs"]);
    function f() {
      a = !1;
    }
    n.changes(o).on("change", function(_) {
      _.seq > r.since && !r.cancelled && (r.since = _.seq, r.onChange(_));
    }).on("complete", function() {
      a === "waiting" && _e(u), a = !1;
    }).on("error", f);
  }
  this._listeners[t] = u, this.on(e, u);
};
ht.prototype.removeListener = function(e, t) {
  t in this._listeners && (de.exports.prototype.removeListener.call(this, e, this._listeners[t]), delete this._listeners[t]);
};
ht.prototype.notifyLocalWindows = function(e) {
  cn() && (localStorage[e] = localStorage[e] === "a" ? "b" : "a");
};
ht.prototype.notify = function(e) {
  this.emit(e), this.notifyLocalWindows(e);
};
function Oe(e) {
  if (typeof console != "undefined" && typeof console[e] == "function") {
    var t = Array.prototype.slice.call(arguments, 1);
    console[e].apply(console, t);
  }
}
function Du(e, t) {
  var n = 6e5;
  e = parseInt(e, 10) || 0, t = parseInt(t, 10), t !== t || t <= e ? t = (e || 1) << 1 : t = t + 1, t > n && (e = n >> 1, t = n);
  var r = Math.random(), i = t - e;
  return ~~(i * r + e);
}
function Nu(e) {
  var t = 0;
  return e || (t = 2e3), Du(e, t);
}
function Ln(e, t) {
  Oe("info", "The above " + e + " is totally normal. " + t);
}
var Dn;
typeof Object.assign == "function" ? Dn = Object.assign : Dn = function(e) {
  for (var t = Object(e), n = 1; n < arguments.length; n++) {
    var r = arguments[n];
    if (r != null)
      for (var i in r)
        Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
  }
  return t;
};
var We = Dn;
ve.exports(re, Error);
function re(e, t, n) {
  Error.call(this, n), this.status = e, this.name = t, this.message = n, this.error = !0;
}
re.prototype.toString = function() {
  return JSON.stringify({
    status: this.status,
    name: this.name,
    message: this.message,
    reason: this.reason
  });
};
new re(401, "unauthorized", "Name or password is incorrect.");
var Fu = new re(400, "bad_request", "Missing JSON list of 'docs'"), Ce = new re(404, "not_found", "missing"), lt = new re(409, "conflict", "Document update conflict"), ra = new re(400, "bad_request", "_id field must contain a string"), Mu = new re(412, "missing_id", "_id is required for puts"), Uu = new re(400, "bad_request", "Only reserved document ids may start with underscore.");
new re(412, "precondition_failed", "Database not open");
var ia = new re(500, "unknown_error", "Database encountered an unknown error"), aa = new re(500, "badarg", "Some query argument is invalid");
new re(400, "invalid_request", "Request was invalid");
var zu = new re(400, "query_parse_error", "Some query parameter is invalid"), Jr = new re(500, "doc_validation", "Bad special document member"), ln = new re(400, "bad_request", "Something wrong with the request"), yr = new re(400, "bad_request", "Document must be a JSON object");
new re(404, "not_found", "Database not found");
var gr = new re(500, "indexed_db_went_bad", "unknown");
new re(500, "web_sql_went_bad", "unknown");
new re(500, "levelDB_went_went_bad", "unknown");
new re(403, "forbidden", "Forbidden by design doc validate_doc_update function");
var ua = new re(400, "bad_request", "Invalid rev format");
new re(412, "file_exists", "The database could not be created, the file already exists.");
var Ku = new re(412, "missing_stub", "A pre-existing attachment stub wasn't found");
new re(413, "invalid_url", "Provided URL is invalid");
function V(e, t) {
  function n(r) {
    for (var i = Object.getOwnPropertyNames(e), a = 0, u = i.length; a < u; a++)
      typeof e[i[a]] != "function" && (this[i[a]] = e[i[a]]);
    this.stack === void 0 && (this.stack = new Error().stack), r !== void 0 && (this.reason = r);
  }
  return n.prototype = re.prototype, new n(t);
}
function dt(e) {
  if (typeof e != "object") {
    var t = e;
    e = ia, e.data = t;
  }
  return "error" in e && e.error === "conflict" && (e.name = "conflict", e.status = 409), "name" in e || (e.name = e.error || "unknown"), "status" in e || (e.status = 500), "message" in e || (e.message = e.message || e.reason), "stack" in e || (e.stack = new Error().stack), e;
}
function Qu(e, t, n) {
  try {
    return !e(t, n);
  } catch (i) {
    var r = "Filter function threw: " + i.toString();
    return V(ln, r);
  }
}
function pr(e) {
  var t = {}, n = e.filter && typeof e.filter == "function";
  return t.query = e.query_params, function(i) {
    i.doc || (i.doc = {});
    var a = n && Qu(e.filter, i.doc, t);
    if (typeof a == "object")
      return a;
    if (a)
      return !1;
    if (!e.include_docs)
      delete i.doc;
    else if (!e.attachments)
      for (var u in i.doc._attachments)
        Object.prototype.hasOwnProperty.call(i.doc._attachments, u) && (i.doc._attachments[u].stub = !0);
    return !0;
  };
}
function Vt(e) {
  for (var t = [], n = 0, r = e.length; n < r; n++)
    t = t.concat(e[n]);
  return t;
}
function oa(e) {
  var t;
  if (e ? typeof e != "string" ? t = V(ra) : /^_/.test(e) && !/^_(design|local)/.test(e) && (t = V(Uu)) : t = V(Mu), t)
    throw t;
}
function Te(e) {
  return typeof e._remote == "boolean" ? e._remote : typeof e.type == "function" ? (Oe("warn", "db.type() is deprecated and will be removed in a future version of PouchDB"), e.type() === "http") : !1;
}
function Gu(e, t) {
  return "listenerCount" in e ? e.listenerCount(t) : de.exports.listenerCount(e, t);
}
function Nn(e) {
  if (!e)
    return null;
  var t = e.split("/");
  return t.length === 2 ? t : t.length === 1 ? [e, e] : null;
}
function Wr(e) {
  var t = Nn(e);
  return t ? t.join("/") : null;
}
var Hr = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"], Yr = "queryKey", Ju = /(?:^|&)([^&=]*)=?([^&]*)/g, Wu = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
function sa(e) {
  for (var t = Wu.exec(e), n = {}, r = 14; r--; ) {
    var i = Hr[r], a = t[r] || "", u = ["user", "password"].indexOf(i) !== -1;
    n[i] = u ? decodeURIComponent(a) : a;
  }
  return n[Yr] = {}, n[Hr[12]].replace(Ju, function(o, f, _) {
    f && (n[Yr][f] = _);
  }), n;
}
function _r(e, t) {
  var n = [], r = [];
  for (var i in t)
    Object.prototype.hasOwnProperty.call(t, i) && (n.push(i), r.push(t[i]));
  return n.push(e), Function.apply(null, n).apply(null, r);
}
function dn(e, t, n) {
  return e.get(t).catch(function(r) {
    if (r.status !== 404)
      throw r;
    return {};
  }).then(function(r) {
    var i = r._rev, a = n(r);
    return a ? (a._id = t, a._rev = i, Hu(e, a, n)) : {
      updated: !1,
      rev: i
    };
  });
}
function Hu(e, t, n) {
  return e.put(t).then(function(r) {
    return {
      updated: !0,
      rev: r.rev
    };
  }, function(r) {
    if (r.status !== 409)
      throw r;
    return dn(e, t._id, n);
  });
}
var mr = function(e) {
  return atob(e);
}, Bt = function(e) {
  return btoa(e);
};
function wr(e, t) {
  e = e || [], t = t || {};
  try {
    return new Blob(e, t);
  } catch (a) {
    if (a.name !== "TypeError")
      throw a;
    for (var n = typeof BlobBuilder != "undefined" ? BlobBuilder : typeof MSBlobBuilder != "undefined" ? MSBlobBuilder : typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : WebKitBlobBuilder, r = new n(), i = 0; i < e.length; i += 1)
      r.append(e[i]);
    return r.getBlob(t.type);
  }
}
function Yu(e) {
  for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), i = 0; i < t; i++)
    r[i] = e.charCodeAt(i);
  return n;
}
function br(e, t) {
  return wr([Yu(e)], {
    type: t
  });
}
function $r(e, t) {
  return br(mr(e), t);
}
function Xu(e) {
  for (var t = "", n = new Uint8Array(e), r = n.byteLength, i = 0; i < r; i++)
    t += String.fromCharCode(n[i]);
  return t;
}
function fa(e, t) {
  var n = new FileReader(), r = typeof n.readAsBinaryString == "function";
  n.onloadend = function(i) {
    var a = i.target.result || "";
    if (r)
      return t(a);
    t(Xu(a));
  }, r ? n.readAsBinaryString(e) : n.readAsArrayBuffer(e);
}
function ca(e, t) {
  fa(e, function(n) {
    t(n);
  });
}
function Ar(e, t) {
  ca(e, function(n) {
    t(Bt(n));
  });
}
function Zu(e, t) {
  var n = new FileReader();
  n.onloadend = function(r) {
    var i = r.target.result || new ArrayBuffer(0);
    t(i);
  }, n.readAsArrayBuffer(e);
}
var Vu = self.setImmediate || self.setTimeout, eo = 32768;
function to(e) {
  return Bt(e);
}
function no(e, t, n) {
  return e.webkitSlice ? e.webkitSlice(t, n) : e.slice(t, n);
}
function ro(e, t, n, r, i) {
  (n > 0 || r < t.size) && (t = no(t, n, r)), Zu(t, function(a) {
    e.append(a), i();
  });
}
function io(e, t, n, r, i) {
  (n > 0 || r < t.length) && (t = t.substring(n, r)), e.appendBinary(t), i();
}
function Or(e, t) {
  var n = typeof e == "string", r = n ? e.length : e.size, i = Math.min(eo, r), a = Math.ceil(r / i), u = 0, o = n ? new Zt() : new Zt.ArrayBuffer(), f = n ? io : ro;
  function _() {
    Vu(c);
  }
  function b() {
    var m = o.end(!0), O = to(m);
    t(O), o.destroy();
  }
  function c() {
    var m = u * i, O = m + i;
    u++, u < a ? f(o, e, m, O, _) : f(o, e, m, O, b);
  }
  c();
}
function la(e) {
  return Zt.hash(e);
}
function da(e, t) {
  if (!t)
    return Ui().replace(/-/g, "").toLowerCase();
  var n = We({}, e);
  return delete n._rev_tree, la(JSON.stringify(n));
}
var vn = Ui;
function He(e) {
  for (var t, n, r, i = e.rev_tree.slice(), a; a = i.pop(); ) {
    var u = a.ids, o = u[2], f = a.pos;
    if (o.length) {
      for (var _ = 0, b = o.length; _ < b; _++)
        i.push({
          pos: f + 1,
          ids: o[_]
        });
      continue;
    }
    var c = !!u[1].deleted, m = u[0];
    (!t || (r !== c ? r : n !== f ? n < f : t < m)) && (t = m, n = f, r = c);
  }
  return n + "-" + t;
}
function et(e, t) {
  for (var n = e.slice(), r; r = n.pop(); )
    for (var i = r.pos, a = r.ids, u = a[2], o = t(u.length === 0, i, a[0], r.ctx, a[1]), f = 0, _ = u.length; f < _; f++)
      n.push({
        pos: i + 1,
        ids: u[f],
        ctx: o
      });
}
function ao(e, t) {
  return e.pos - t.pos;
}
function Sr(e) {
  var t = [];
  et(e, function(i, a, u, o, f) {
    i && t.push({
      rev: a + "-" + u,
      pos: a,
      opts: f
    });
  }), t.sort(ao).reverse();
  for (var n = 0, r = t.length; n < r; n++)
    delete t[n].pos;
  return t;
}
function xr(e) {
  for (var t = He(e), n = Sr(e.rev_tree), r = [], i = 0, a = n.length; i < a; i++) {
    var u = n[i];
    u.rev !== t && !u.opts.deleted && r.push(u.rev);
  }
  return r;
}
function uo(e) {
  var t = [];
  return et(e.rev_tree, function(n, r, i, a, u) {
    u.status === "available" && !n && (t.push(r + "-" + i), u.status = "missing");
  }), t;
}
function va(e) {
  for (var t = [], n = e.slice(), r; r = n.pop(); ) {
    var i = r.pos, a = r.ids, u = a[0], o = a[1], f = a[2], _ = f.length === 0, b = r.history ? r.history.slice() : [];
    b.push({
      id: u,
      opts: o
    }), _ && t.push({
      pos: i + 1 - b.length,
      ids: b
    });
    for (var c = 0, m = f.length; c < m; c++)
      n.push({
        pos: i + 1,
        ids: f[c],
        history: b
      });
  }
  return t.reverse();
}
function oo(e, t) {
  return e.pos - t.pos;
}
function so(e, t, n) {
  for (var r = 0, i = e.length, a; r < i; )
    a = r + i >>> 1, n(e[a], t) < 0 ? r = a + 1 : i = a;
  return r;
}
function fo(e, t, n) {
  var r = so(e, t, n);
  e.splice(r, 0, t);
}
function Xr(e, t) {
  for (var n, r, i = t, a = e.length; i < a; i++) {
    var u = e[i], o = [u.id, u.opts, []];
    r ? (r[2].push(o), r = o) : n = r = o;
  }
  return n;
}
function co(e, t) {
  return e[0] < t[0] ? -1 : 1;
}
function Zr(e, t) {
  for (var n = [{
    tree1: e,
    tree2: t
  }], r = !1; n.length > 0; ) {
    var i = n.pop(), a = i.tree1, u = i.tree2;
    (a[1].status || u[1].status) && (a[1].status = a[1].status === "available" || u[1].status === "available" ? "available" : "missing");
    for (var o = 0; o < u[2].length; o++) {
      if (!a[2][0]) {
        r = "new_leaf", a[2][0] = u[2][o];
        continue;
      }
      for (var f = !1, _ = 0; _ < a[2].length; _++)
        a[2][_][0] === u[2][o][0] && (n.push({
          tree1: a[2][_],
          tree2: u[2][o]
        }), f = !0);
      f || (r = "new_branch", fo(a[2], u[2][o], co));
    }
  }
  return {
    conflicts: r,
    tree: e
  };
}
function ha(e, t, n) {
  var r = [], i = !1, a = !1, u;
  if (!e.length)
    return {
      tree: [t],
      conflicts: "new_leaf"
    };
  for (var o = 0, f = e.length; o < f; o++) {
    var _ = e[o];
    if (_.pos === t.pos && _.ids[0] === t.ids[0])
      u = Zr(_.ids, t.ids), r.push({
        pos: _.pos,
        ids: u.tree
      }), i = i || u.conflicts, a = !0;
    else if (n !== !0) {
      var b = _.pos < t.pos ? _ : t, c = _.pos < t.pos ? t : _, m = c.pos - b.pos, O = [], $ = [];
      for ($.push({
        ids: b.ids,
        diff: m,
        parent: null,
        parentIdx: null
      }); $.length > 0; ) {
        var x = $.pop();
        if (x.diff === 0) {
          x.ids[0] === c.ids[0] && O.push(x);
          continue;
        }
        for (var A = x.ids[2], y = 0, v = A.length; y < v; y++)
          $.push({
            ids: A[y],
            diff: x.diff - 1,
            parent: x.ids,
            parentIdx: y
          });
      }
      var s = O[0];
      s ? (u = Zr(s.ids, c.ids), s.parent[2][s.parentIdx] = u.tree, r.push({
        pos: b.pos,
        ids: b.ids
      }), i = i || u.conflicts, a = !0) : r.push(_);
    } else
      r.push(_);
  }
  return a || r.push(t), r.sort(oo), {
    tree: r,
    conflicts: i || "internal_node"
  };
}
function lo(e, t) {
  for (var n = va(e), r, i, a = 0, u = n.length; a < u; a++) {
    var o = n[a], f = o.ids, _;
    if (f.length > t) {
      r || (r = {});
      var b = f.length - t;
      _ = {
        pos: o.pos + b,
        ids: Xr(f, b)
      };
      for (var c = 0; c < b; c++) {
        var m = o.pos + c + "-" + f[c].id;
        r[m] = !0;
      }
    } else
      _ = {
        pos: o.pos,
        ids: Xr(f, 0)
      };
    i ? i = ha(i, _, !0).tree : i = [_];
  }
  return r && et(i, function(O, $, x) {
    delete r[$ + "-" + x];
  }), {
    tree: i,
    revs: r ? Object.keys(r) : []
  };
}
function ya(e, t, n) {
  var r = ha(e, t), i = lo(r.tree, n);
  return {
    tree: i.tree,
    stemmedRevs: i.revs,
    conflicts: r.conflicts
  };
}
function vo(e, t) {
  for (var n = e.slice(), r = t.split("-"), i = parseInt(r[0], 10), a = r[1], u; u = n.pop(); ) {
    if (u.pos === i && u.ids[0] === a)
      return !0;
    for (var o = u.ids[2], f = 0, _ = o.length; f < _; f++)
      n.push({
        pos: u.pos + 1,
        ids: o[f]
      });
  }
  return !1;
}
function ho(e) {
  return e.ids;
}
function Ie(e, t) {
  t || (t = He(e));
  for (var n = t.substring(t.indexOf("-") + 1), r = e.rev_tree.map(ho), i; i = r.pop(); ) {
    if (i[0] === n)
      return !!i[1].deleted;
    r = r.concat(i[2]);
  }
}
function Ye(e) {
  return /^_local/.test(e);
}
function yo(e, t) {
  for (var n = t.rev_tree.slice(), r; r = n.pop(); ) {
    var i = r.pos, a = r.ids, u = a[0], o = a[1], f = a[2], _ = f.length === 0, b = r.history ? r.history.slice() : [];
    if (b.push({
      id: u,
      pos: i,
      opts: o
    }), _)
      for (var c = 0, m = b.length; c < m; c++) {
        var O = b[c], $ = O.pos + "-" + O.id;
        if ($ === e)
          return i + "-" + u;
      }
    for (var x = 0, A = f.length; x < A; x++)
      n.push({
        pos: i + 1,
        ids: f[x],
        history: b
      });
  }
  throw new Error("Unable to resolve latest revision for id " + t.id + ", rev " + e);
}
ve.exports(Rt, de.exports);
function go(e, t, n, r) {
  try {
    e.emit("change", t, n, r);
  } catch (i) {
    Oe("error", 'Error in .on("change", function):', i);
  }
}
function Rt(e, t, n) {
  de.exports.call(this);
  var r = this;
  this.db = e, t = t ? le(t) : {};
  var i = t.complete = ea(function(o, f) {
    o ? Gu(r, "error") > 0 && r.emit("error", o) : r.emit("complete", f), r.removeAllListeners(), e.removeListener("destroyed", a);
  });
  n && (r.on("complete", function(o) {
    n(null, o);
  }), r.on("error", n));
  function a() {
    r.cancel();
  }
  e.once("destroyed", a), t.onChange = function(o, f, _) {
    r.isCancelled || go(r, o, f, _);
  };
  var u = new Promise(function(o, f) {
    t.complete = function(_, b) {
      _ ? f(_) : o(b);
    };
  });
  r.once("cancel", function() {
    e.removeListener("destroyed", a), t.complete(null, {
      status: "cancelled"
    });
  }), this.then = u.then.bind(u), this.catch = u.catch.bind(u), this.then(function(o) {
    i(null, o);
  }, i), e.taskqueue.isReady ? r.validateChanges(t) : e.taskqueue.addTask(function(o) {
    o ? t.complete(o) : r.isCancelled ? r.emit("cancel") : r.validateChanges(t);
  });
}
Rt.prototype.cancel = function() {
  this.isCancelled = !0, this.db.taskqueue.isReady && this.emit("cancel");
};
function po(e, t, n) {
  var r = [{
    rev: e._rev
  }];
  n.style === "all_docs" && (r = Sr(t.rev_tree).map(function(a) {
    return {
      rev: a.rev
    };
  }));
  var i = {
    id: t.id,
    changes: r,
    doc: e
  };
  return Ie(t, e._rev) && (i.deleted = !0), n.conflicts && (i.doc._conflicts = xr(t), i.doc._conflicts.length || delete i.doc._conflicts), i;
}
Rt.prototype.validateChanges = function(e) {
  var t = e.complete, n = this;
  H._changesFilterPlugin ? H._changesFilterPlugin.validate(e, function(r) {
    if (r)
      return t(r);
    n.doChanges(e);
  }) : n.doChanges(e);
};
Rt.prototype.doChanges = function(e) {
  var t = this, n = e.complete;
  if (e = le(e), "live" in e && !("continuous" in e) && (e.continuous = e.live), e.processChange = po, e.since === "latest" && (e.since = "now"), e.since || (e.since = 0), e.since === "now") {
    this.db.info().then(function(a) {
      if (t.isCancelled) {
        n(null, {
          status: "cancelled"
        });
        return;
      }
      e.since = a.update_seq, t.doChanges(e);
    }, n);
    return;
  }
  if (H._changesFilterPlugin) {
    if (H._changesFilterPlugin.normalize(e), H._changesFilterPlugin.shouldFilter(this, e))
      return H._changesFilterPlugin.filter(this, e);
  } else
    ["doc_ids", "filter", "selector", "view"].forEach(function(a) {
      a in e && Oe("warn", 'The "' + a + '" option was passed in to changes/replicate, but pouchdb-changes-filter plugin is not installed, so it was ignored. Please install the plugin to enable filtering.');
    });
  "descending" in e || (e.descending = !1), e.limit = e.limit === 0 ? 1 : e.limit, e.complete = n;
  var r = this.db._changes(e);
  if (r && typeof r.cancel == "function") {
    var i = t.cancel;
    t.cancel = Be(function(a) {
      r.cancel(), i.apply(this, a);
    });
  }
};
function Vr(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function Er(e, t) {
  return function(n, r) {
    n || r[0] && r[0].error ? (n = n || r[0], n.docId = t, e(n)) : e(null, r.length ? r[0] : r);
  };
}
function _o(e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    if (n._deleted)
      delete n._attachments;
    else if (n._attachments)
      for (var r = Object.keys(n._attachments), i = 0; i < r.length; i++) {
        var a = r[i];
        n._attachments[a] = It(n._attachments[a], ["data", "digest", "content_type", "length", "revpos", "stub"]);
      }
  }
}
function mo(e, t) {
  var n = Vr(e._id, t._id);
  if (n !== 0)
    return n;
  var r = e._revisions ? e._revisions.start : 0, i = t._revisions ? t._revisions.start : 0;
  return Vr(r, i);
}
function wo(e) {
  var t = {}, n = [];
  return et(e, function(r, i, a, u) {
    var o = i + "-" + a;
    return r && (t[o] = 0), u !== void 0 && n.push({
      from: u,
      to: o
    }), o;
  }), n.reverse(), n.forEach(function(r) {
    t[r.from] === void 0 ? t[r.from] = 1 + t[r.to] : t[r.from] = Math.min(t[r.from], 1 + t[r.to]);
  }), t;
}
function bo(e) {
  var t = "limit" in e ? e.keys.slice(e.skip, e.limit + e.skip) : e.skip > 0 ? e.keys.slice(e.skip) : e.keys;
  e.keys = t, e.skip = 0, delete e.limit, e.descending && (t.reverse(), e.descending = !1);
}
function ga(e) {
  var t = e._compactionQueue[0], n = t.opts, r = t.callback;
  e.get("_local/compaction").catch(function() {
    return !1;
  }).then(function(i) {
    i && i.last_seq && (n.last_seq = i.last_seq), e._compact(n, function(a, u) {
      a ? r(a) : r(null, u), _e(function() {
        e._compactionQueue.shift(), e._compactionQueue.length && ga(e);
      });
    });
  });
}
function $o(e) {
  return e.charAt(0) === "_" ? e + " is not a valid attachment name, attachment names cannot start with '_'" : !1;
}
ve.exports(ae, de.exports);
function ae() {
  de.exports.call(this);
  for (var e in ae.prototype)
    typeof this[e] == "function" && (this[e] = this[e].bind(this));
}
ae.prototype.post = fe("post", function(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), typeof e != "object" || Array.isArray(e))
    return n(V(yr));
  this.bulkDocs({
    docs: [e]
  }, t, Er(n, e._id));
});
ae.prototype.put = fe("put", function(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), typeof e != "object" || Array.isArray(e))
    return n(V(yr));
  if (oa(e._id), Ye(e._id) && typeof this._putLocal == "function")
    return e._deleted ? this._removeLocal(e, n) : this._putLocal(e, n);
  var r = this;
  t.force && e._rev ? (i(), a(function(u) {
    var o = u ? null : {
      ok: !0,
      id: e._id,
      rev: e._rev
    };
    n(u, o);
  })) : a(n);
  function i() {
    var u = e._rev.split("-"), o = u[1], f = parseInt(u[0], 10), _ = f + 1, b = da();
    e._revisions = {
      start: _,
      ids: [b, o]
    }, e._rev = _ + "-" + b, t.new_edits = !1;
  }
  function a(u) {
    typeof r._put == "function" && t.new_edits !== !1 ? r._put(e, t, u) : r.bulkDocs({
      docs: [e]
    }, t, Er(u, e._id));
  }
});
ae.prototype.putAttachment = fe("putAttachment", function(e, t, n, r, i) {
  var a = this;
  typeof i == "function" && (i = r, r = n, n = null), typeof i == "undefined" && (i = r, r = n, n = null), i || Oe("warn", "Attachment", t, "on document", e, "is missing content_type");
  function u(o) {
    var f = "_rev" in o ? parseInt(o._rev, 10) : 0;
    return o._attachments = o._attachments || {}, o._attachments[t] = {
      content_type: i,
      data: r,
      revpos: ++f
    }, a.put(o);
  }
  return a.get(e).then(function(o) {
    if (o._rev !== n)
      throw V(lt);
    return u(o);
  }, function(o) {
    if (o.reason === Ce.message)
      return u({
        _id: e
      });
    throw o;
  });
});
ae.prototype.removeAttachment = fe("removeAttachment", function(e, t, n, r) {
  var i = this;
  i.get(e, function(a, u) {
    if (a) {
      r(a);
      return;
    }
    if (u._rev !== n) {
      r(V(lt));
      return;
    }
    if (!u._attachments)
      return r();
    delete u._attachments[t], Object.keys(u._attachments).length === 0 && delete u._attachments, i.put(u, r);
  });
});
ae.prototype.remove = fe("remove", function(e, t, n, r) {
  var i;
  typeof t == "string" ? (i = {
    _id: e,
    _rev: t
  }, typeof n == "function" && (r = n, n = {})) : (i = e, typeof t == "function" ? (r = t, n = {}) : (r = n, n = t)), n = n || {}, n.was_delete = !0;
  var a = {
    _id: i._id,
    _rev: i._rev || n.rev
  };
  if (a._deleted = !0, Ye(a._id) && typeof this._removeLocal == "function")
    return this._removeLocal(i, r);
  this.bulkDocs({
    docs: [a]
  }, n, Er(r, a._id));
});
ae.prototype.revsDiff = fe("revsDiff", function(e, t, n) {
  typeof t == "function" && (n = t, t = {});
  var r = Object.keys(e);
  if (!r.length)
    return n(null, {});
  var i = 0, a = new we();
  function u(f, _) {
    a.has(f) || a.set(f, {
      missing: []
    }), a.get(f).missing.push(_);
  }
  function o(f, _) {
    var b = e[f].slice(0);
    et(_, function(c, m, O, $, x) {
      var A = m + "-" + O, y = b.indexOf(A);
      y !== -1 && (b.splice(y, 1), x.status !== "available" && u(f, A));
    }), b.forEach(function(c) {
      u(f, c);
    });
  }
  r.map(function(f) {
    this._getRevisionTree(f, function(_, b) {
      if (_ && _.status === 404 && _.message === "missing")
        a.set(f, {
          missing: e[f]
        });
      else {
        if (_)
          return n(_);
        o(f, b);
      }
      if (++i === r.length) {
        var c = {};
        return a.forEach(function(m, O) {
          c[O] = m;
        }), n(null, c);
      }
    });
  }, this);
});
ae.prototype.bulkGet = fe("bulkGet", function(e, t) {
  na(this, e, t);
});
ae.prototype.compactDocument = fe("compactDocument", function(e, t, n) {
  var r = this;
  this._getRevisionTree(e, function(i, a) {
    if (i)
      return n(i);
    var u = wo(a), o = [], f = [];
    Object.keys(u).forEach(function(_) {
      u[_] > t && o.push(_);
    }), et(a, function(_, b, c, m, O) {
      var $ = b + "-" + c;
      O.status === "available" && o.indexOf($) !== -1 && f.push($);
    }), r._doCompaction(e, f, n);
  });
});
ae.prototype.compact = fe("compact", function(e, t) {
  typeof e == "function" && (t = e, e = {});
  var n = this;
  e = e || {}, n._compactionQueue = n._compactionQueue || [], n._compactionQueue.push({
    opts: e,
    callback: t
  }), n._compactionQueue.length === 1 && ga(n);
});
ae.prototype._compact = function(e, t) {
  var n = this, r = {
    return_docs: !1,
    last_seq: e.last_seq || 0
  }, i = [];
  function a(o) {
    i.push(n.compactDocument(o.id, 0));
  }
  function u(o) {
    var f = o.last_seq;
    Promise.all(i).then(function() {
      return dn(n, "_local/compaction", function(b) {
        return !b.last_seq || b.last_seq < f ? (b.last_seq = f, b) : !1;
      });
    }).then(function() {
      t(null, {
        ok: !0
      });
    }).catch(t);
  }
  n.changes(r).on("change", a).on("complete", u).on("error", t);
};
ae.prototype.get = fe("get", function(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), typeof e != "string")
    return n(V(ra));
  if (Ye(e) && typeof this._getLocal == "function")
    return this._getLocal(e, n);
  var r = [], i = this;
  function a() {
    var f = [], _ = r.length;
    if (!_)
      return n(null, f);
    r.forEach(function(b) {
      i.get(e, {
        rev: b,
        revs: t.revs,
        latest: t.latest,
        attachments: t.attachments,
        binary: t.binary
      }, function(c, m) {
        if (c)
          f.push({
            missing: b
          });
        else {
          for (var O, $ = 0, x = f.length; $ < x; $++)
            if (f[$].ok && f[$].ok._rev === m._rev) {
              O = !0;
              break;
            }
          O || f.push({
            ok: m
          });
        }
        _--, _ || n(null, f);
      });
    });
  }
  if (t.open_revs) {
    if (t.open_revs === "all")
      this._getRevisionTree(e, function(f, _) {
        if (f)
          return n(f);
        r = Sr(_).map(function(b) {
          return b.rev;
        }), a();
      });
    else if (Array.isArray(t.open_revs)) {
      r = t.open_revs;
      for (var u = 0; u < r.length; u++) {
        var o = r[u];
        if (!(typeof o == "string" && /^\d+-/.test(o)))
          return n(V(ua));
      }
      a();
    } else
      return n(V(ia, "function_clause"));
    return;
  }
  return this._get(e, t, function(f, _) {
    if (f)
      return f.docId = e, n(f);
    var b = _.doc, c = _.metadata, m = _.ctx;
    if (t.conflicts) {
      var O = xr(c);
      O.length && (b._conflicts = O);
    }
    if (Ie(c, b._rev) && (b._deleted = !0), t.revs || t.revs_info) {
      for (var $ = b._rev.split("-"), x = parseInt($[0], 10), A = $[1], y = va(c.rev_tree), v = null, s = 0; s < y.length; s++) {
        var l = y[s], h = l.ids.map(function(Y) {
          return Y.id;
        }).indexOf(A), p = h === x - 1;
        (p || !v && h !== -1) && (v = l);
      }
      if (!v)
        return f = new Error("invalid rev tree"), f.docId = e, n(f);
      var j = v.ids.map(function(Y) {
        return Y.id;
      }).indexOf(b._rev.split("-")[1]) + 1, R = v.ids.length - j;
      if (v.ids.splice(j, R), v.ids.reverse(), t.revs && (b._revisions = {
        start: v.pos + v.ids.length - 1,
        ids: v.ids.map(function(Y) {
          return Y.id;
        })
      }), t.revs_info) {
        var B = v.pos + v.ids.length;
        b._revs_info = v.ids.map(function(Y) {
          return B--, {
            rev: B + "-" + Y.id,
            status: Y.opts.status
          };
        });
      }
    }
    if (t.attachments && b._attachments) {
      var L = b._attachments, K = Object.keys(L).length;
      if (K === 0)
        return n(null, b);
      Object.keys(L).forEach(function(Y) {
        this._getAttachment(b._id, Y, L[Y], {
          rev: b._rev,
          binary: t.binary,
          ctx: m
        }, function(Q, J) {
          var U = b._attachments[Y];
          U.data = J, delete U.stub, delete U.length, --K || n(null, b);
        });
      }, i);
    } else {
      if (b._attachments)
        for (var Z in b._attachments)
          Object.prototype.hasOwnProperty.call(b._attachments, Z) && (b._attachments[Z].stub = !0);
      n(null, b);
    }
  });
});
ae.prototype.getAttachment = fe("getAttachment", function(e, t, n, r) {
  var i = this;
  n instanceof Function && (r = n, n = {}), this._get(e, n, function(a, u) {
    if (a)
      return r(a);
    if (u.doc._attachments && u.doc._attachments[t])
      n.ctx = u.ctx, n.binary = !0, i._getAttachment(e, t, u.doc._attachments[t], n, r);
    else
      return r(V(Ce));
  });
});
ae.prototype.allDocs = fe("allDocs", function(e, t) {
  if (typeof e == "function" && (t = e, e = {}), e.skip = typeof e.skip != "undefined" ? e.skip : 0, e.start_key && (e.startkey = e.start_key), e.end_key && (e.endkey = e.end_key), "keys" in e) {
    if (!Array.isArray(e.keys))
      return t(new TypeError("options.keys must be an array"));
    var n = ["startkey", "endkey", "key"].filter(function(r) {
      return r in e;
    })[0];
    if (n) {
      t(V(zu, "Query parameter `" + n + "` is not compatible with multi-get"));
      return;
    }
    if (!Te(this) && (bo(e), e.keys.length === 0))
      return this._allDocs({
        limit: 0
      }, t);
  }
  return this._allDocs(e, t);
});
ae.prototype.changes = function(e, t) {
  return typeof e == "function" && (t = e, e = {}), e = e || {}, e.return_docs = "return_docs" in e ? e.return_docs : !e.live, new Rt(this, e, t);
};
ae.prototype.close = fe("close", function(e) {
  return this._closed = !0, this.emit("closed"), this._close(e);
});
ae.prototype.info = fe("info", function(e) {
  var t = this;
  this._info(function(n, r) {
    if (n)
      return e(n);
    r.db_name = r.db_name || t.name, r.auto_compaction = !!(t.auto_compaction && !Te(t)), r.adapter = t.adapter, e(null, r);
  });
});
ae.prototype.id = fe("id", function(e) {
  return this._id(e);
});
ae.prototype.type = function() {
  return typeof this._type == "function" ? this._type() : this.adapter;
};
ae.prototype.bulkDocs = fe("bulkDocs", function(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), t = t || {}, Array.isArray(e) && (e = {
    docs: e
  }), !e || !e.docs || !Array.isArray(e.docs))
    return n(V(Fu));
  for (var r = 0; r < e.docs.length; ++r)
    if (typeof e.docs[r] != "object" || Array.isArray(e.docs[r]))
      return n(V(yr));
  var i;
  if (e.docs.forEach(function(o) {
    o._attachments && Object.keys(o._attachments).forEach(function(f) {
      i = i || $o(f), o._attachments[f].content_type || Oe("warn", "Attachment", f, "on document", o._id, "is missing content_type");
    });
  }), i)
    return n(V(ln, i));
  "new_edits" in t || ("new_edits" in e ? t.new_edits = e.new_edits : t.new_edits = !0);
  var a = this;
  !t.new_edits && !Te(a) && e.docs.sort(mo), _o(e.docs);
  var u = e.docs.map(function(o) {
    return o._id;
  });
  return this._bulkDocs(e, t, function(o, f) {
    if (o)
      return n(o);
    if (t.new_edits || (f = f.filter(function(c) {
      return c.error;
    })), !Te(a))
      for (var _ = 0, b = f.length; _ < b; _++)
        f[_].id = f[_].id || u[_];
    n(null, f);
  });
});
ae.prototype.registerDependentDatabase = fe("registerDependentDatabase", function(e, t) {
  var n = le(this.__opts);
  this.__opts.view_adapter && (n.adapter = this.__opts.view_adapter);
  var r = new this.constructor(e, n);
  function i(a) {
    return a.dependentDbs = a.dependentDbs || {}, a.dependentDbs[e] ? !1 : (a.dependentDbs[e] = !0, a);
  }
  dn(this, "_local/_pouch_dependentDbs", i).then(function() {
    t(null, {
      db: r
    });
  }).catch(t);
});
ae.prototype.destroy = fe("destroy", function(e, t) {
  typeof e == "function" && (t = e, e = {});
  var n = this, r = "use_prefix" in n ? n.use_prefix : !0;
  function i() {
    n._destroy(e, function(a, u) {
      if (a)
        return t(a);
      n._destroyed = !0, n.emit("destroyed"), t(null, u || {
        ok: !0
      });
    });
  }
  if (Te(n))
    return i();
  n.get("_local/_pouch_dependentDbs", function(a, u) {
    if (a)
      return a.status !== 404 ? t(a) : i();
    var o = u.dependentDbs, f = n.constructor, _ = Object.keys(o).map(function(b) {
      var c = r ? b.replace(new RegExp("^" + f.prefix), "") : b;
      return new f(c, n.__opts).destroy();
    });
    Promise.all(_).then(i, t);
  });
});
function Lt() {
  this.isReady = !1, this.failed = !1, this.queue = [];
}
Lt.prototype.execute = function() {
  var e;
  if (this.failed)
    for (; e = this.queue.shift(); )
      e(this.failed);
  else
    for (; e = this.queue.shift(); )
      e();
};
Lt.prototype.fail = function(e) {
  this.failed = e, this.execute();
};
Lt.prototype.ready = function(e) {
  this.isReady = !0, this.db = e, this.execute();
};
Lt.prototype.addTask = function(e) {
  this.queue.push(e), this.failed && this.execute();
};
function Ao(e, t) {
  var n = e.match(/([a-z-]*):\/\/(.*)/);
  if (n)
    return {
      name: /https?/.test(n[1]) ? n[1] + "://" + n[2] : n[2],
      adapter: n[1]
    };
  var r = H.adapters, i = H.preferredAdapters, a = H.prefix, u = t.adapter;
  if (!u)
    for (var o = 0; o < i.length; ++o) {
      if (u = i[o], u === "idb" && "websql" in r && cn() && localStorage["_pouch__websqldb_" + a + e]) {
        Oe("log", 'PouchDB is downgrading "' + e + '" to WebSQL to avoid data loss, because it was already opened with WebSQL.');
        continue;
      }
      break;
    }
  var f = r[u], _ = f && "use_prefix" in f ? f.use_prefix : !0;
  return {
    name: _ ? a + e : e,
    adapter: u
  };
}
function Oo(e) {
  function t(r) {
    e.removeListener("closed", n), r || e.constructor.emit("destroyed", e.name);
  }
  function n() {
    e.removeListener("destroyed", t), e.constructor.emit("unref", e);
  }
  e.once("destroyed", t), e.once("closed", n), e.constructor.emit("ref", e);
}
ve.exports(H, ae);
function H(e, t) {
  if (!(this instanceof H))
    return new H(e, t);
  var n = this;
  if (t = t || {}, e && typeof e == "object" && (t = e, e = t.name, delete t.name), t.deterministic_revs === void 0 && (t.deterministic_revs = !0), this.__opts = t = le(t), n.auto_compaction = t.auto_compaction, n.prefix = H.prefix, typeof e != "string")
    throw new Error("Missing/invalid DB name");
  var r = (t.prefix || "") + e, i = Ao(r, t);
  if (t.name = i.name, t.adapter = t.adapter || i.adapter, n.name = e, n._adapter = t.adapter, H.emit("debug", ["adapter", "Picked adapter: ", t.adapter]), !H.adapters[t.adapter] || !H.adapters[t.adapter].valid())
    throw new Error("Invalid Adapter: " + t.adapter);
  if (t.view_adapter && (!H.adapters[t.view_adapter] || !H.adapters[t.view_adapter].valid()))
    throw new Error("Invalid View Adapter: " + t.view_adapter);
  ae.call(n), n.taskqueue = new Lt(), n.adapter = t.adapter, H.adapters[t.adapter].call(n, t, function(a) {
    if (a)
      return n.taskqueue.fail(a);
    Oo(n), n.emit("created", n), H.emit("created", n.name), n.taskqueue.ready(n);
  });
}
var So = typeof AbortController != "undefined" ? AbortController : function() {
  return {
    abort: function() {
    }
  };
}, pa = fetch, ot = Headers;
H.adapters = {};
H.preferredAdapters = [];
H.prefix = "_pouch_";
var ei = new de.exports();
function xo(e) {
  Object.keys(de.exports.prototype).forEach(function(n) {
    typeof de.exports.prototype[n] == "function" && (e[n] = ei[n].bind(ei));
  });
  var t = e._destructionListeners = new we();
  e.on("ref", function(r) {
    t.has(r.name) || t.set(r.name, []), t.get(r.name).push(r);
  }), e.on("unref", function(r) {
    if (!!t.has(r.name)) {
      var i = t.get(r.name), a = i.indexOf(r);
      a < 0 || (i.splice(a, 1), i.length > 1 ? t.set(r.name, i) : t.delete(r.name));
    }
  }), e.on("destroyed", function(r) {
    if (!!t.has(r)) {
      var i = t.get(r);
      t.delete(r), i.forEach(function(a) {
        a.emit("destroyed", !0);
      });
    }
  });
}
xo(H);
H.adapter = function(e, t, n) {
  t.valid() && (H.adapters[e] = t, n && H.preferredAdapters.push(e));
};
H.plugin = function(e) {
  if (typeof e == "function")
    e(H);
  else {
    if (typeof e != "object" || Object.keys(e).length === 0)
      throw new Error('Invalid plugin: got "' + e + '", expected an object or a function');
    Object.keys(e).forEach(function(t) {
      H.prototype[t] = e[t];
    });
  }
  return this.__defaults && (H.__defaults = We({}, this.__defaults)), H;
};
H.defaults = function(e) {
  function t(n, r) {
    if (!(this instanceof t))
      return new t(n, r);
    r = r || {}, n && typeof n == "object" && (r = n, n = r.name, delete r.name), r = We({}, t.__defaults, r), H.call(this, n, r);
  }
  return ve.exports(t, H), t.preferredAdapters = H.preferredAdapters.slice(), Object.keys(H).forEach(function(n) {
    n in t || (t[n] = H[n]);
  }), t.__defaults = We({}, this.__defaults, e), t;
};
H.fetch = function(e, t) {
  return pa(e, t);
};
var Eo = "7.3.1";
function kr(e, t) {
  for (var n = e, r = 0, i = t.length; r < i; r++) {
    var a = t[r];
    if (n = n[a], !n)
      break;
  }
  return n;
}
function ko(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function Cr(e) {
  for (var t = [], n = "", r = 0, i = e.length; r < i; r++) {
    var a = e[r];
    r > 0 && e[r - 1] === "\\" && (a === "$" || a === ".") ? n = n.substring(0, n.length - 1) + a : a === "." ? (t.push(n), n = "") : n += a;
  }
  return t.push(n), t;
}
var Co = ["$or", "$nor", "$not"];
function _a(e) {
  return Co.indexOf(e) > -1;
}
function ma(e) {
  return Object.keys(e)[0];
}
function jo(e) {
  return e[ma(e)];
}
function Et(e) {
  var t = {}, n = {
    $or: !0,
    $nor: !0
  };
  return e.forEach(function(r) {
    Object.keys(r).forEach(function(i) {
      var a = r[i];
      if (typeof a != "object" && (a = {
        $eq: a
      }), _a(i))
        if (a instanceof Array) {
          if (n[i]) {
            n[i] = !1, t[i] = a;
            return;
          }
          var u = [];
          t[i].forEach(function(f) {
            Object.keys(a).forEach(function(_) {
              var b = a[_], c = Math.max(Object.keys(f).length, Object.keys(b).length), m = Et([f, b]);
              Object.keys(m).length <= c || u.push(m);
            });
          }), t[i] = u;
        } else
          t[i] = Et([a]);
      else {
        var o = t[i] = t[i] || {};
        Object.keys(a).forEach(function(f) {
          var _ = a[f];
          if (f === "$gt" || f === "$gte")
            return Po(f, _, o);
          if (f === "$lt" || f === "$lte")
            return qo(f, _, o);
          if (f === "$ne")
            return To(_, o);
          if (f === "$eq")
            return Io(_, o);
          if (f === "$regex")
            return Bo(_, o);
          o[f] = _;
        });
      }
    });
  }), t;
}
function Po(e, t, n) {
  typeof n.$eq == "undefined" && (typeof n.$gte != "undefined" ? e === "$gte" ? t > n.$gte && (n.$gte = t) : t >= n.$gte && (delete n.$gte, n.$gt = t) : typeof n.$gt != "undefined" ? e === "$gte" ? t > n.$gt && (delete n.$gt, n.$gte = t) : t > n.$gt && (n.$gt = t) : n[e] = t);
}
function qo(e, t, n) {
  typeof n.$eq == "undefined" && (typeof n.$lte != "undefined" ? e === "$lte" ? t < n.$lte && (n.$lte = t) : t <= n.$lte && (delete n.$lte, n.$lt = t) : typeof n.$lt != "undefined" ? e === "$lte" ? t < n.$lt && (delete n.$lt, n.$lte = t) : t < n.$lt && (n.$lt = t) : n[e] = t);
}
function To(e, t) {
  "$ne" in t ? t.$ne.push(e) : t.$ne = [e];
}
function Io(e, t) {
  delete t.$gt, delete t.$gte, delete t.$lt, delete t.$lte, delete t.$ne, t.$eq = e;
}
function Bo(e, t) {
  "$regex" in t ? t.$regex.push(e) : t.$regex = [e];
}
function wa(e) {
  for (var t in e) {
    if (Array.isArray(e))
      for (var n in e)
        e[n].$and && (e[n] = Et(e[n].$and));
    var r = e[t];
    typeof r == "object" && wa(r);
  }
  return e;
}
function ba(e, t) {
  for (var n in e) {
    n === "$and" && (t = !0);
    var r = e[n];
    typeof r == "object" && (t = ba(r, t));
  }
  return t;
}
function Ro(e) {
  var t = le(e), n = !1;
  ba(t, !1) && (t = wa(t), "$and" in t && (t = Et(t.$and)), n = !0), ["$or", "$nor"].forEach(function(o) {
    o in t && t[o].forEach(function(f) {
      for (var _ = Object.keys(f), b = 0; b < _.length; b++) {
        var c = _[b], m = f[c];
        (typeof m != "object" || m === null) && (f[c] = {
          $eq: m
        });
      }
    });
  }), "$not" in t && (t.$not = Et([t.$not]));
  for (var r = Object.keys(t), i = 0; i < r.length; i++) {
    var a = r[i], u = t[a];
    typeof u != "object" || u === null ? u = {
      $eq: u
    } : n || ("$ne" in u && (u.$ne = [u.$ne]), "$regex" in u && (u.$regex = [u.$regex])), t[a] = u;
  }
  return t;
}
function Lo(e, t, n) {
  for (var r = "", i = n - e.length; r.length < i; )
    r += t;
  return r;
}
function Do(e, t, n) {
  var r = Lo(e, t, n);
  return r + e;
}
var $a = -324, Fn = 3, Mn = "";
function ue(e, t) {
  if (e === t)
    return 0;
  e = Xe(e), t = Xe(t);
  var n = Un(e), r = Un(t);
  if (n - r !== 0)
    return n - r;
  switch (typeof e) {
    case "number":
      return e - t;
    case "boolean":
      return e < t ? -1 : 1;
    case "string":
      return Ko(e, t);
  }
  return Array.isArray(e) ? zo(e, t) : Qo(e, t);
}
function Xe(e) {
  switch (typeof e) {
    case "undefined":
      return null;
    case "number":
      return e === 1 / 0 || e === -1 / 0 || isNaN(e) ? null : e;
    case "object":
      var t = e;
      if (Array.isArray(e)) {
        var n = e.length;
        e = new Array(n);
        for (var r = 0; r < n; r++)
          e[r] = Xe(t[r]);
      } else {
        if (e instanceof Date)
          return e.toJSON();
        if (e !== null) {
          e = {};
          for (var i in t)
            if (Object.prototype.hasOwnProperty.call(t, i)) {
              var a = t[i];
              typeof a != "undefined" && (e[i] = Xe(a));
            }
        }
      }
  }
  return e;
}
function No(e) {
  if (e !== null)
    switch (typeof e) {
      case "boolean":
        return e ? 1 : 0;
      case "number":
        return Go(e);
      case "string":
        return e.replace(/\u0002/g, "").replace(/\u0001/g, "").replace(/\u0000/g, "");
      case "object":
        var t = Array.isArray(e), n = t ? e : Object.keys(e), r = -1, i = n.length, a = "";
        if (t)
          for (; ++r < i; )
            a += xe(n[r]);
        else
          for (; ++r < i; ) {
            var u = n[r];
            a += xe(u) + xe(e[u]);
          }
        return a;
    }
  return "";
}
function xe(e) {
  var t = "\0";
  return e = Xe(e), Un(e) + Mn + No(e) + t;
}
function Fo(e, t) {
  var n = t, r, i = e[t] === "1";
  if (i)
    r = 0, t++;
  else {
    var a = e[t] === "0";
    t++;
    var u = "", o = e.substring(t, t + Fn), f = parseInt(o, 10) + $a;
    for (a && (f = -f), t += Fn; ; ) {
      var _ = e[t];
      if (_ === "\0")
        break;
      u += _, t++;
    }
    u = u.split("."), u.length === 1 ? r = parseInt(u, 10) : r = parseFloat(u[0] + "." + u[1]), a && (r = r - 10), f !== 0 && (r = parseFloat(r + "e" + f));
  }
  return {
    num: r,
    length: t - n
  };
}
function Mo(e, t) {
  var n = e.pop();
  if (t.length) {
    var r = t[t.length - 1];
    n === r.element && (t.pop(), r = t[t.length - 1]);
    var i = r.element, a = r.index;
    if (Array.isArray(i))
      i.push(n);
    else if (a === e.length - 2) {
      var u = e.pop();
      i[u] = n;
    } else
      e.push(n);
  }
}
function Uo(e) {
  for (var t = [], n = [], r = 0; ; ) {
    var i = e[r++];
    if (i === "\0") {
      if (t.length === 1)
        return t.pop();
      Mo(t, n);
      continue;
    }
    switch (i) {
      case "1":
        t.push(null);
        break;
      case "2":
        t.push(e[r] === "1"), r++;
        break;
      case "3":
        var a = Fo(e, r);
        t.push(a.num), r += a.length;
        break;
      case "4":
        for (var u = ""; ; ) {
          var o = e[r];
          if (o === "\0")
            break;
          u += o, r++;
        }
        u = u.replace(/\u0001\u0001/g, "\0").replace(/\u0001\u0002/g, "").replace(/\u0002\u0002/g, ""), t.push(u);
        break;
      case "5":
        var f = {
          element: [],
          index: t.length
        };
        t.push(f.element), n.push(f);
        break;
      case "6":
        var _ = {
          element: {},
          index: t.length
        };
        t.push(_.element), n.push(_);
        break;
      default:
        throw new Error("bad collationIndex or unexpectedly reached end of input: " + i);
    }
  }
}
function zo(e, t) {
  for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) {
    var i = ue(e[r], t[r]);
    if (i !== 0)
      return i;
  }
  return e.length === t.length ? 0 : e.length > t.length ? 1 : -1;
}
function Ko(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function Qo(e, t) {
  for (var n = Object.keys(e), r = Object.keys(t), i = Math.min(n.length, r.length), a = 0; a < i; a++) {
    var u = ue(n[a], r[a]);
    if (u !== 0 || (u = ue(e[n[a]], t[r[a]]), u !== 0))
      return u;
  }
  return n.length === r.length ? 0 : n.length > r.length ? 1 : -1;
}
function Un(e) {
  var t = ["boolean", "number", "string", "object"], n = t.indexOf(typeof e);
  if (~n)
    return e === null ? 1 : Array.isArray(e) ? 5 : n < 3 ? n + 2 : n + 3;
  if (Array.isArray(e))
    return 5;
}
function Go(e) {
  if (e === 0)
    return "1";
  var t = e.toExponential().split(/e\+?/), n = parseInt(t[1], 10), r = e < 0, i = r ? "0" : "2", a = (r ? -n : n) - $a, u = Do(a.toString(), "0", Fn);
  i += Mn + u;
  var o = Math.abs(parseFloat(t[0]));
  r && (o = 10 - o);
  var f = o.toFixed(20);
  return f = f.replace(/\.?0+$/, ""), i += Mn + f, i;
}
function Jo(e) {
  function t(n) {
    return e.map(function(r) {
      var i = ma(r), a = Cr(i), u = kr(n, a);
      return u;
    });
  }
  return function(n, r) {
    var i = t(n.doc), a = t(r.doc), u = ue(i, a);
    return u !== 0 ? u : ko(n.doc._id, r.doc._id);
  };
}
function Wo(e, t, n) {
  if (e = e.filter(function(u) {
    return st(u.doc, t.selector, n);
  }), t.sort) {
    var r = Jo(t.sort);
    e = e.sort(r), typeof t.sort[0] != "string" && jo(t.sort[0]) === "desc" && (e = e.reverse());
  }
  if ("limit" in t || "skip" in t) {
    var i = t.skip || 0, a = ("limit" in t ? t.limit : e.length) + i;
    e = e.slice(i, a);
  }
  return e;
}
function st(e, t, n) {
  return n.every(function(r) {
    var i = t[r], a = Cr(r), u = kr(e, a);
    return _a(r) ? Ho(r, i, e) : en(i, e, a, u);
  });
}
function en(e, t, n, r) {
  return e ? typeof e == "object" ? Object.keys(e).every(function(i) {
    var a = e[i];
    if (i.indexOf("$") === 0)
      return ti(i, t, a, n, r);
    var u = Cr(i);
    if (r === void 0 && typeof a != "object" && u.length > 0)
      return !1;
    var o = kr(r, u);
    return typeof a == "object" ? en(a, t, n, o) : ti("$eq", t, a, u, o);
  }) : e === r : !0;
}
function Ho(e, t, n) {
  return e === "$or" ? t.some(function(r) {
    return st(n, r, Object.keys(r));
  }) : e === "$not" ? !st(n, t, Object.keys(t)) : !t.find(function(r) {
    return st(n, r, Object.keys(r));
  });
}
function ti(e, t, n, r, i) {
  if (!ri[e])
    throw new Error('unknown operator "' + e + '" - should be one of $eq, $lte, $lt, $gt, $gte, $exists, $ne, $in, $nin, $size, $mod, $regex, $elemMatch, $type, $allMatch or $all');
  return ri[e](t, n, r, i);
}
function wt(e) {
  return typeof e != "undefined" && e !== null;
}
function Fe(e) {
  return typeof e != "undefined";
}
function Yo(e, t) {
  if (typeof e != "number" || parseInt(e, 10) !== e)
    return !1;
  var n = t[0], r = t[1];
  return e % n === r;
}
function ni(e, t) {
  return t.some(function(n) {
    return e instanceof Array ? e.some(function(r) {
      return ue(n, r) === 0;
    }) : ue(n, e) === 0;
  });
}
function Xo(e, t) {
  return t.every(function(n) {
    return e.some(function(r) {
      return ue(n, r) === 0;
    });
  });
}
function Zo(e, t) {
  return e.length === t;
}
function Vo(e, t) {
  var n = new RegExp(t);
  return n.test(e);
}
function es(e, t) {
  switch (t) {
    case "null":
      return e === null;
    case "boolean":
      return typeof e == "boolean";
    case "number":
      return typeof e == "number";
    case "string":
      return typeof e == "string";
    case "array":
      return e instanceof Array;
    case "object":
      return {}.toString.call(e) === "[object Object]";
  }
}
var ri = {
  $elemMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" && r[0] !== null ? r.some(function(i) {
      return st(i, t, Object.keys(t));
    }) : r.some(function(i) {
      return en(t, e, n, i);
    });
  },
  $allMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" && r[0] !== null ? r.every(function(i) {
      return st(i, t, Object.keys(t));
    }) : r.every(function(i) {
      return en(t, e, n, i);
    });
  },
  $eq: function(e, t, n, r) {
    return Fe(r) && ue(r, t) === 0;
  },
  $gte: function(e, t, n, r) {
    return Fe(r) && ue(r, t) >= 0;
  },
  $gt: function(e, t, n, r) {
    return Fe(r) && ue(r, t) > 0;
  },
  $lte: function(e, t, n, r) {
    return Fe(r) && ue(r, t) <= 0;
  },
  $lt: function(e, t, n, r) {
    return Fe(r) && ue(r, t) < 0;
  },
  $exists: function(e, t, n, r) {
    return t ? Fe(r) : !Fe(r);
  },
  $mod: function(e, t, n, r) {
    return wt(r) && Yo(r, t);
  },
  $ne: function(e, t, n, r) {
    return t.every(function(i) {
      return ue(r, i) !== 0;
    });
  },
  $in: function(e, t, n, r) {
    return wt(r) && ni(r, t);
  },
  $nin: function(e, t, n, r) {
    return wt(r) && !ni(r, t);
  },
  $size: function(e, t, n, r) {
    return wt(r) && Array.isArray(r) && Zo(r, t);
  },
  $all: function(e, t, n, r) {
    return Array.isArray(r) && Xo(r, t);
  },
  $regex: function(e, t, n, r) {
    return wt(r) && typeof r == "string" && t.every(function(i) {
      return Vo(r, i);
    });
  },
  $type: function(e, t, n, r) {
    return es(r, t);
  }
};
function ts(e, t) {
  if (typeof t != "object")
    throw new Error("Selector error: expected a JSON object");
  t = Ro(t);
  var n = {
    doc: e
  }, r = Wo([n], {
    selector: t
  }, Object.keys(t));
  return r && r.length === 1;
}
function ns(e) {
  return _r(`"use strict";
return ` + e + ";", {});
}
function rs(e) {
  var t = ["return function(doc) {", '  "use strict";', "  var emitted = false;", "  var emit = function (a, b) {", "    emitted = true;", "  };", "  var view = " + e + ";", "  view(doc);", "  if (emitted) {", "    return true;", "  }", "};"].join(`
`);
  return _r(t, {});
}
function is(e, t) {
  if (e.selector && e.filter && e.filter !== "_selector") {
    var n = typeof e.filter == "string" ? e.filter : "function";
    return t(new Error('selector invalid for filter "' + n + '"'));
  }
  t();
}
function as(e) {
  e.view && !e.filter && (e.filter = "_view"), e.selector && !e.filter && (e.filter = "_selector"), e.filter && typeof e.filter == "string" && (e.filter === "_view" ? e.view = Wr(e.view) : e.filter = Wr(e.filter));
}
function us(e, t) {
  return t.filter && typeof t.filter == "string" && !t.doc_ids && !Te(e.db);
}
function os(e, t) {
  var n = t.complete;
  if (t.filter === "_view") {
    if (!t.view || typeof t.view != "string") {
      var r = V(ln, "`view` filter parameter not found or invalid.");
      return n(r);
    }
    var i = Nn(t.view);
    e.db.get("_design/" + i[0], function(u, o) {
      if (e.isCancelled)
        return n(null, {
          status: "cancelled"
        });
      if (u)
        return n(dt(u));
      var f = o && o.views && o.views[i[1]] && o.views[i[1]].map;
      if (!f)
        return n(V(Ce, o.views ? "missing json key: " + i[1] : "missing json key: views"));
      t.filter = rs(f), e.doChanges(t);
    });
  } else if (t.selector)
    t.filter = function(u) {
      return ts(u, t.selector);
    }, e.doChanges(t);
  else {
    var a = Nn(t.filter);
    e.db.get("_design/" + a[0], function(u, o) {
      if (e.isCancelled)
        return n(null, {
          status: "cancelled"
        });
      if (u)
        return n(dt(u));
      var f = o && o.filters && o.filters[a[1]];
      if (!f)
        return n(V(Ce, o && o.filters ? "missing json key: " + a[1] : "missing json key: filters"));
      t.filter = ns(f), e.doChanges(t);
    });
  }
}
function ss(e) {
  e._changesFilterPlugin = {
    validate: is,
    normalize: as,
    shouldFilter: us,
    filter: os
  };
}
H.plugin(ss);
H.version = Eo;
function Aa(e) {
  return e.reduce(function(t, n) {
    return t[n] = !0, t;
  }, {});
}
var fs = Aa([
  "_id",
  "_rev",
  "_access",
  "_attachments",
  "_deleted",
  "_revisions",
  "_revs_info",
  "_conflicts",
  "_deleted_conflicts",
  "_local_seq",
  "_rev_tree",
  "_replication_id",
  "_replication_state",
  "_replication_state_time",
  "_replication_state_reason",
  "_replication_stats",
  "_removed"
]), cs = Aa([
  "_access",
  "_attachments",
  "_replication_id",
  "_replication_state",
  "_replication_state_time",
  "_replication_state_reason",
  "_replication_stats"
]);
function ii(e) {
  if (!/^\d+-/.test(e))
    return V(ua);
  var t = e.indexOf("-"), n = e.substring(0, t), r = e.substring(t + 1);
  return {
    prefix: parseInt(n, 10),
    id: r
  };
}
function ls(e, t) {
  for (var n = e.start - e.ids.length + 1, r = e.ids, i = [r[0], t, []], a = 1, u = r.length; a < u; a++)
    i = [r[a], {
      status: "missing"
    }, [i]];
  return [{
    pos: n,
    ids: i
  }];
}
function Oa(e, t, n) {
  n || (n = {
    deterministic_revs: !0
  });
  var r, i, a, u = {
    status: "available"
  };
  if (e._deleted && (u.deleted = !0), t)
    if (e._id || (e._id = vn()), i = da(e, n.deterministic_revs), e._rev) {
      if (a = ii(e._rev), a.error)
        return a;
      e._rev_tree = [{
        pos: a.prefix,
        ids: [a.id, {
          status: "missing"
        }, [[i, u, []]]]
      }], r = a.prefix + 1;
    } else
      e._rev_tree = [{
        pos: 1,
        ids: [i, u, []]
      }], r = 1;
  else if (e._revisions && (e._rev_tree = ls(e._revisions, u), r = e._revisions.start, i = e._revisions.ids[0]), !e._rev_tree) {
    if (a = ii(e._rev), a.error)
      return a;
    r = a.prefix, i = a.id, e._rev_tree = [{
      pos: r,
      ids: [i, u, []]
    }];
  }
  oa(e._id), e._rev = r + "-" + i;
  var o = {
    metadata: {},
    data: {}
  };
  for (var f in e)
    if (Object.prototype.hasOwnProperty.call(e, f)) {
      var _ = f[0] === "_";
      if (_ && !fs[f]) {
        var b = V(Jr, f);
        throw b.message = Jr.message + ": " + f, b;
      } else
        _ && !cs[f] ? o.metadata[f.slice(1)] = e[f] : o.data[f] = e[f];
    }
  return o;
}
function ds(e) {
  try {
    return mr(e);
  } catch (n) {
    var t = V(aa, "Attachment is not a valid base64 string");
    return {
      error: t
    };
  }
}
function vs(e, t, n) {
  var r = ds(e.data);
  if (r.error)
    return n(r.error);
  e.length = r.length, t === "blob" ? e.data = br(r, e.content_type) : t === "base64" ? e.data = Bt(r) : e.data = r, Or(r, function(i) {
    e.digest = "md5-" + i, n();
  });
}
function hs(e, t, n) {
  Or(e.data, function(r) {
    e.digest = "md5-" + r, e.length = e.data.size || e.data.length || 0, t === "binary" ? ca(e.data, function(i) {
      e.data = i, n();
    }) : t === "base64" ? Ar(e.data, function(i) {
      e.data = i, n();
    }) : n();
  });
}
function ys(e, t, n) {
  if (e.stub)
    return n();
  typeof e.data == "string" ? vs(e, t, n) : hs(e, t, n);
}
function gs(e, t, n) {
  if (!e.length)
    return n();
  var r = 0, i;
  e.forEach(function(u) {
    var o = u.data && u.data._attachments ? Object.keys(u.data._attachments) : [], f = 0;
    if (!o.length)
      return a();
    function _(c) {
      i = c, f++, f === o.length && a();
    }
    for (var b in u.data._attachments)
      Object.prototype.hasOwnProperty.call(u.data._attachments, b) && ys(u.data._attachments[b], t, _);
  });
  function a() {
    r++, e.length === r && (i ? n(i) : n());
  }
}
function ps(e, t, n, r, i, a, u, o) {
  if (vo(t.rev_tree, n.metadata.rev) && !o)
    return r[i] = n, a();
  var f = t.winningRev || He(t), _ = "deleted" in t ? t.deleted : Ie(t, f), b = "deleted" in n.metadata ? n.metadata.deleted : Ie(n.metadata), c = /^1-/.test(n.metadata.rev);
  if (_ && !b && o && c) {
    var m = n.data;
    m._rev = f, m._id = n.metadata.id, n = Oa(m, o);
  }
  var O = ya(t.rev_tree, n.metadata.rev_tree[0], e), $ = o && (_ && b && O.conflicts !== "new_leaf" || !_ && O.conflicts !== "new_leaf" || _ && !b && O.conflicts === "new_branch");
  if ($) {
    var x = V(lt);
    return r[i] = x, a();
  }
  var A = n.metadata.rev;
  n.metadata.rev_tree = O.tree, n.stemmedRevs = O.stemmedRevs || [], t.rev_map && (n.metadata.rev_map = t.rev_map);
  var y = He(n.metadata), v = Ie(n.metadata, y), s = _ === v ? 0 : _ < v ? -1 : 1, l;
  A === y ? l = v : l = Ie(n.metadata, A), u(n, y, v, l, !0, s, i, a);
}
function _s(e) {
  return e.metadata.rev_tree[0].ids[1].status === "missing";
}
function ms(e, t, n, r, i, a, u, o, f) {
  e = e || 1e3;
  function _(x, A, y) {
    var v = He(x.metadata), s = Ie(x.metadata, v);
    if ("was_delete" in o && s)
      return a[A] = V(Ce, "deleted"), y();
    var l = b && _s(x);
    if (l) {
      var h = V(lt);
      return a[A] = h, y();
    }
    var p = s ? 0 : 1;
    u(x, v, s, s, !1, p, A, y);
  }
  var b = o.new_edits, c = new we(), m = 0, O = t.length;
  function $() {
    ++m === O && f && f();
  }
  t.forEach(function(x, A) {
    if (x._id && Ye(x._id)) {
      var y = x._deleted ? "_removeLocal" : "_putLocal";
      n[y](x, {
        ctx: i
      }, function(s, l) {
        a[A] = s || l, $();
      });
      return;
    }
    var v = x.metadata.id;
    c.has(v) ? (O--, c.get(v).push([x, A])) : c.set(v, [[x, A]]);
  }), c.forEach(function(x, A) {
    var y = 0;
    function v() {
      ++y < x.length ? s() : $();
    }
    function s() {
      var l = x[y], h = l[0], p = l[1];
      if (r.has(A))
        ps(e, r.get(A), h, a, p, v, u, b);
      else {
        var j = ya([], h.metadata.rev_tree[0], e);
        h.metadata.rev_tree = j.tree, h.stemmedRevs = j.stemmedRevs || [], _(h, p, v);
      }
    }
    s();
  });
}
var ws = 5, oe = "document-store", ge = "by-sequence", Ae = "attach-store", Ge = "attach-seq-store", me = "meta-store", je = "local-store", zn = "detect-blob-support";
function bs(e) {
  try {
    return JSON.parse(e);
  } catch (t) {
    return on.parse(e);
  }
}
function $s(e) {
  try {
    return JSON.stringify(e);
  } catch (t) {
    return on.stringify(e);
  }
}
function qe(e) {
  return function(t) {
    var n = "unknown_error";
    t.target && t.target.error && (n = t.target.error.name || t.target.error.message), e(V(gr, n, t.type));
  };
}
function Kn(e, t, n) {
  return {
    data: $s(e),
    winningRev: t,
    deletedOrLocal: n ? "1" : "0",
    seq: e.seq,
    id: e.id
  };
}
function Je(e) {
  if (!e)
    return null;
  var t = bs(e.data);
  return t.winningRev = e.winningRev, t.deleted = e.deletedOrLocal === "1", t.seq = e.seq, t;
}
function tn(e) {
  if (!e)
    return e;
  var t = e._doc_id_rev.lastIndexOf(":");
  return e._id = e._doc_id_rev.substring(0, t - 1), e._rev = e._doc_id_rev.substring(t + 1), delete e._doc_id_rev, e;
}
function Sa(e, t, n, r) {
  n ? r(e ? typeof e != "string" ? e : $r(e, t) : wr([""], {
    type: t
  })) : e ? typeof e != "string" ? fa(e, function(i) {
    r(Bt(i));
  }) : r(e) : r("");
}
function xa(e, t, n, r) {
  var i = Object.keys(e._attachments || {});
  if (!i.length)
    return r && r();
  var a = 0;
  function u() {
    ++a === i.length && r && r();
  }
  function o(f, _) {
    var b = f._attachments[_], c = b.digest, m = n.objectStore(Ae).get(c);
    m.onsuccess = function(O) {
      b.body = O.target.result.body, u();
    };
  }
  i.forEach(function(f) {
    t.attachments && t.include_docs ? o(e, f) : (e._attachments[f].stub = !0, u());
  });
}
function Qn(e, t) {
  return Promise.all(e.map(function(n) {
    if (n.doc && n.doc._attachments) {
      var r = Object.keys(n.doc._attachments);
      return Promise.all(r.map(function(i) {
        var a = n.doc._attachments[i];
        if ("body" in a) {
          var u = a.body, o = a.content_type;
          return new Promise(function(f) {
            Sa(u, o, t, function(_) {
              n.doc._attachments[i] = We(It(a, ["digest", "content_type"]), {
                data: _
              }), f();
            });
          });
        }
      }));
    }
  }));
}
function Ea(e, t, n) {
  var r = [], i = n.objectStore(ge), a = n.objectStore(Ae), u = n.objectStore(Ge), o = e.length;
  function f() {
    o--, o || _();
  }
  function _() {
    !r.length || r.forEach(function(b) {
      var c = u.index("digestSeq").count(IDBKeyRange.bound(b + "::", b + "::\uFFFF", !1, !1));
      c.onsuccess = function(m) {
        var O = m.target.result;
        O || a.delete(b);
      };
    });
  }
  e.forEach(function(b) {
    var c = i.index("_doc_id_rev"), m = t + "::" + b;
    c.getKey(m).onsuccess = function(O) {
      var $ = O.target.result;
      if (typeof $ != "number")
        return f();
      i.delete($);
      var x = u.index("seq").openCursor(IDBKeyRange.only($));
      x.onsuccess = function(A) {
        var y = A.target.result;
        if (y) {
          var v = y.value.digestSeq.split("::")[0];
          r.push(v), u.delete(y.primaryKey), y.continue();
        } else
          f();
      };
    };
  });
}
function Ee(e, t, n) {
  try {
    return {
      txn: e.transaction(t, n)
    };
  } catch (r) {
    return {
      error: r
    };
  }
}
var xt = new ht();
function As(e, t, n, r, i, a) {
  for (var u = t.docs, o, f, _, b, c, m, O, $, x = 0, A = u.length; x < A; x++) {
    var y = u[x];
    y._id && Ye(y._id) || (y = u[x] = Oa(y, n.new_edits, e), y.error && !O && (O = y));
  }
  if (O)
    return a(O);
  var v = !1, s = 0, l = new Array(u.length), h = new we(), p = !1, j = r._meta.blobSupport ? "blob" : "base64";
  gs(u, j, function(C) {
    if (C)
      return a(C);
    R();
  });
  function R() {
    var C = [oe, ge, Ae, je, Ge, me], P = Ee(i, C, "readwrite");
    if (P.error)
      return a(P.error);
    o = P.txn, o.onabort = qe(a), o.ontimeout = qe(a), o.oncomplete = Y, f = o.objectStore(oe), _ = o.objectStore(ge), b = o.objectStore(Ae), c = o.objectStore(Ge), m = o.objectStore(me), m.get(me).onsuccess = function(k) {
      $ = k.target.result, K();
    }, J(function(k) {
      if (k)
        return p = !0, a(k);
      Z();
    });
  }
  function B() {
    v = !0, K();
  }
  function L() {
    ms(e.revs_limit, u, r, h, o, l, U, n, B);
  }
  function K() {
    !$ || !v || ($.docCount += s, m.put($));
  }
  function Z() {
    if (!u.length)
      return;
    var C = 0;
    function P() {
      ++C === u.length && L();
    }
    function k(E) {
      var F = Je(E.target.result);
      F && h.set(F.id, F), P();
    }
    for (var q = 0, T = u.length; q < T; q++) {
      var I = u[q];
      if (I._id && Ye(I._id)) {
        P();
        continue;
      }
      var D = f.get(I.metadata.id);
      D.onsuccess = k;
    }
  }
  function Y() {
    p || (xt.notify(r._meta.name), a(null, l));
  }
  function Q(C, P) {
    var k = b.get(C);
    k.onsuccess = function(q) {
      if (q.target.result)
        P();
      else {
        var T = V(Ku, "unknown stub attachment with digest " + C);
        T.status = 412, P(T);
      }
    };
  }
  function J(C) {
    var P = [];
    if (u.forEach(function(I) {
      I.data && I.data._attachments && Object.keys(I.data._attachments).forEach(function(D) {
        var E = I.data._attachments[D];
        E.stub && P.push(E.digest);
      });
    }), !P.length)
      return C();
    var k = 0, q;
    function T() {
      ++k === P.length && C(q);
    }
    P.forEach(function(I) {
      Q(I, function(D) {
        D && !q && (q = D), T();
      });
    });
  }
  function U(C, P, k, q, T, I, D, E) {
    C.metadata.winningRev = P, C.metadata.deleted = k;
    var F = C.data;
    F._id = C.metadata.id, F._rev = C.metadata.rev, q && (F._deleted = !0);
    var W = F._attachments && Object.keys(F._attachments).length;
    if (W)
      return g(C, P, k, T, D, E);
    s += I, K(), d(C, P, k, T, D, E);
  }
  function d(C, P, k, q, T, I) {
    var D = C.data, E = C.metadata;
    D._doc_id_rev = E.id + "::" + E.rev, delete D._id, delete D._rev;
    function F(N) {
      var z = C.stemmedRevs || [];
      q && r.auto_compaction && (z = z.concat(uo(C.metadata))), z && z.length && Ea(z, C.metadata.id, o), E.seq = N.target.result;
      var G = Kn(E, P, k), ee = f.put(G);
      ee.onsuccess = te;
    }
    function W(N) {
      N.preventDefault(), N.stopPropagation();
      var z = _.index("_doc_id_rev"), G = z.getKey(D._doc_id_rev);
      G.onsuccess = function(ee) {
        var X = _.put(D, ee.target.result);
        X.onsuccess = F;
      };
    }
    function te() {
      l[T] = {
        ok: !0,
        id: E.id,
        rev: E.rev
      }, h.set(C.metadata.id, C.metadata), w(C, E.seq, I);
    }
    var M = _.put(D);
    M.onsuccess = F, M.onerror = W;
  }
  function g(C, P, k, q, T, I) {
    var D = C.data, E = 0, F = Object.keys(D._attachments);
    function W() {
      E === F.length && d(C, P, k, q, T, I);
    }
    function te() {
      E++, W();
    }
    F.forEach(function(M) {
      var N = C.data._attachments[M];
      if (N.stub)
        E++, W();
      else {
        var z = N.data;
        delete N.data, N.revpos = parseInt(P, 10);
        var G = N.digest;
        S(G, z, te);
      }
    });
  }
  function w(C, P, k) {
    var q = 0, T = Object.keys(C.data._attachments || {});
    if (!T.length)
      return k();
    function I() {
      ++q === T.length && k();
    }
    function D(F) {
      var W = C.data._attachments[F].digest, te = c.put({
        seq: P,
        digestSeq: W + "::" + P
      });
      te.onsuccess = I, te.onerror = function(M) {
        M.preventDefault(), M.stopPropagation(), I();
      };
    }
    for (var E = 0; E < T.length; E++)
      D(T[E]);
  }
  function S(C, P, k) {
    var q = b.count(C);
    q.onsuccess = function(T) {
      var I = T.target.result;
      if (I)
        return k();
      var D = {
        digest: C,
        body: P
      }, E = b.put(D);
      E.onsuccess = k;
    };
  }
}
function ka(e, t, n, r, i) {
  r === -1 && (r = 1e3);
  var a = typeof e.getAll == "function" && typeof e.getAllKeys == "function" && r > 1 && !n, u, o, f;
  function _(O) {
    o = O.target.result, u && i(u, o, f);
  }
  function b(O) {
    u = O.target.result, o && i(u, o, f);
  }
  function c() {
    if (!u.length)
      return i();
    var O = u[u.length - 1], $;
    if (t && t.upper)
      try {
        $ = IDBKeyRange.bound(O, t.upper, !0, t.upperOpen);
      } catch (x) {
        if (x.name === "DataError" && x.code === 0)
          return i();
      }
    else
      $ = IDBKeyRange.lowerBound(O, !0);
    t = $, u = null, o = null, e.getAll(t, r).onsuccess = _, e.getAllKeys(t, r).onsuccess = b;
  }
  function m(O) {
    var $ = O.target.result;
    if (!$)
      return i();
    i([$.key], [$.value], $);
  }
  a ? (f = {
    continue: c
  }, e.getAll(t, r).onsuccess = _, e.getAllKeys(t, r).onsuccess = b) : n ? e.openCursor(t, "prev").onsuccess = m : e.openCursor(t).onsuccess = m;
}
function Os(e, t, n) {
  if (typeof e.getAll == "function") {
    e.getAll(t).onsuccess = n;
    return;
  }
  var r = [];
  function i(a) {
    var u = a.target.result;
    u ? (r.push(u.value), u.continue()) : n({
      target: {
        result: r
      }
    });
  }
  e.openCursor(t).onsuccess = i;
}
function Ss(e, t, n) {
  var r = new Array(e.length), i = 0;
  e.forEach(function(a, u) {
    t.get(a).onsuccess = function(o) {
      o.target.result ? r[u] = o.target.result : r[u] = {
        key: a,
        error: "not_found"
      }, i++, i === e.length && n(e, r, {});
    };
  });
}
function xs(e, t, n, r, i) {
  try {
    if (e && t)
      return i ? IDBKeyRange.bound(t, e, !n, !1) : IDBKeyRange.bound(e, t, !1, !n);
    if (e)
      return i ? IDBKeyRange.upperBound(e) : IDBKeyRange.lowerBound(e);
    if (t)
      return i ? IDBKeyRange.lowerBound(t, !n) : IDBKeyRange.upperBound(t, !n);
    if (r)
      return IDBKeyRange.only(r);
  } catch (a) {
    return {
      error: a
    };
  }
  return null;
}
function Es(e, t, n) {
  var r = "startkey" in e ? e.startkey : !1, i = "endkey" in e ? e.endkey : !1, a = "key" in e ? e.key : !1, u = "keys" in e ? e.keys : !1, o = e.skip || 0, f = typeof e.limit == "number" ? e.limit : -1, _ = e.inclusive_end !== !1, b, c;
  if (!u && (b = xs(r, i, _, a, e.descending), c = b && b.error, c && !(c.name === "DataError" && c.code === 0)))
    return n(V(gr, c.name, c.message));
  var m = [oe, ge, me];
  e.attachments && m.push(Ae);
  var O = Ee(t, m, "readonly");
  if (O.error)
    return n(O.error);
  var $ = O.txn;
  $.oncomplete = Y, $.onabort = qe(n);
  var x = $.objectStore(oe), A = $.objectStore(ge), y = $.objectStore(me), v = A.index("_doc_id_rev"), s = [], l, h;
  y.get(me).onsuccess = function(Q) {
    l = Q.target.result.docCount;
  }, e.update_seq && p(A, function(Q) {
    Q.target.result && Q.target.result.length > 0 && (h = Q.target.result[0]);
  });
  function p(Q, J) {
    function U(d) {
      var g = d.target.result, w = void 0;
      return g && g.key && (w = g.key), J({
        target: {
          result: [w]
        }
      });
    }
    Q.openCursor(null, "prev").onsuccess = U;
  }
  function j(Q, J, U) {
    var d = Q.id + "::" + U;
    v.get(d).onsuccess = function(w) {
      if (J.doc = tn(w.target.result) || {}, e.conflicts) {
        var S = xr(Q);
        S.length && (J.doc._conflicts = S);
      }
      xa(J.doc, e, $);
    };
  }
  function R(Q, J) {
    var U = {
      id: J.id,
      key: J.id,
      value: {
        rev: Q
      }
    }, d = J.deleted;
    d ? u && (s.push(U), U.value.deleted = !0, U.doc = null) : o-- <= 0 && (s.push(U), e.include_docs && j(J, U, Q));
  }
  function B(Q) {
    for (var J = 0, U = Q.length; J < U && s.length !== f; J++) {
      var d = Q[J];
      if (d.error && u) {
        s.push(d);
        continue;
      }
      var g = Je(d), w = g.winningRev;
      R(w, g);
    }
  }
  function L(Q, J, U) {
    !U || (B(J), s.length < f && U.continue());
  }
  function K(Q) {
    var J = Q.target.result;
    e.descending && (J = J.reverse()), B(J);
  }
  function Z() {
    var Q = {
      total_rows: l,
      offset: e.skip,
      rows: s
    };
    e.update_seq && h !== void 0 && (Q.update_seq = h), n(null, Q);
  }
  function Y() {
    e.attachments ? Qn(s, e.binary).then(Z) : Z();
  }
  if (!(c || f === 0)) {
    if (u)
      return Ss(e.keys, x, L);
    if (f === -1)
      return Os(x, b, K);
    ka(x, b, e.descending, f + o, L);
  }
}
function ks(e) {
  return new Promise(function(t) {
    var n = wr([""]), r = e.objectStore(zn).put(n, "key");
    r.onsuccess = function() {
      var i = navigator.userAgent.match(/Chrome\/(\d+)/), a = navigator.userAgent.match(/Edge\//);
      t(a || !i || parseInt(i[1], 10) >= 43);
    }, r.onerror = e.onabort = function(i) {
      i.preventDefault(), i.stopPropagation(), t(!1);
    };
  }).catch(function() {
    return !1;
  });
}
function Cs(e, t) {
  var n = e.objectStore(oe).index("deletedOrLocal");
  n.count(IDBKeyRange.only("0")).onsuccess = function(r) {
    t(r.target.result);
  };
}
var Gn = !1, Jn = [];
function js(e, t, n, r) {
  try {
    e(t, n);
  } catch (i) {
    r.emit("error", i);
  }
}
function ai() {
  Gn || !Jn.length || (Gn = !0, Jn.shift()());
}
function Ps(e, t, n) {
  Jn.push(function() {
    e(function(a, u) {
      js(t, a, u, n), Gn = !1, _e(function() {
        ai();
      });
    });
  }), ai();
}
function qs(e, t, n, r) {
  if (e = le(e), e.continuous) {
    var i = n + ":" + vn();
    return xt.addListener(n, i, t, e), xt.notify(n), {
      cancel: function() {
        xt.removeListener(n, i);
      }
    };
  }
  var a = e.doc_ids && new ct(e.doc_ids);
  e.since = e.since || 0;
  var u = e.since, o = "limit" in e ? e.limit : -1;
  o === 0 && (o = 1);
  var f = [], _ = 0, b = pr(e), c = new we(), m, O, $, x;
  function A(R, B, L) {
    if (!L || !R.length)
      return;
    var K = new Array(R.length), Z = new Array(R.length);
    function Y(U, d) {
      var g = e.processChange(d, U, e);
      u = g.seq = U.seq;
      var w = b(g);
      return typeof w == "object" ? Promise.reject(w) : w ? (_++, e.return_docs && f.push(g), e.attachments && e.include_docs ? new Promise(function(S) {
        xa(d, e, m, function() {
          Qn([g], e.binary).then(function() {
            S(g);
          });
        });
      }) : Promise.resolve(g)) : Promise.resolve();
    }
    function Q() {
      for (var U = [], d = 0, g = K.length; d < g && _ !== o; d++) {
        var w = K[d];
        if (!!w) {
          var S = Z[d];
          U.push(Y(S, w));
        }
      }
      Promise.all(U).then(function(C) {
        for (var P = 0, k = C.length; P < k; P++)
          C[P] && e.onChange(C[P]);
      }).catch(e.complete), _ !== o && L.continue();
    }
    var J = 0;
    B.forEach(function(U, d) {
      var g = tn(U), w = R[d];
      v(g, w, function(S, C) {
        Z[d] = S, K[d] = C, ++J === R.length && Q();
      });
    });
  }
  function y(R, B, L, K) {
    if (L.seq !== B)
      return K();
    if (L.winningRev === R._rev)
      return K(L, R);
    var Z = R._id + "::" + L.winningRev, Y = x.get(Z);
    Y.onsuccess = function(Q) {
      K(L, tn(Q.target.result));
    };
  }
  function v(R, B, L) {
    if (a && !a.has(R._id))
      return L();
    var K = c.get(R._id);
    if (K)
      return y(R, B, K, L);
    $.get(R._id).onsuccess = function(Z) {
      K = Je(Z.target.result), c.set(R._id, K), y(R, B, K, L);
    };
  }
  function s() {
    e.complete(null, {
      results: f,
      last_seq: u
    });
  }
  function l() {
    !e.continuous && e.attachments ? Qn(f).then(s) : s();
  }
  var h = [oe, ge];
  e.attachments && h.push(Ae);
  var p = Ee(r, h, "readonly");
  if (p.error)
    return e.complete(p.error);
  m = p.txn, m.onabort = qe(e.complete), m.oncomplete = l, O = m.objectStore(ge), $ = m.objectStore(oe), x = O.index("_doc_id_rev");
  var j = e.since && !e.descending ? IDBKeyRange.lowerBound(e.since, !0) : null;
  ka(O, j, e.descending, o, A);
}
var rt = new we(), $n, An = new we();
function Ca(e, t) {
  var n = this;
  Ps(function(r) {
    Ts(n, e, r);
  }, t, n.constructor);
}
function Ts(e, t, n) {
  var r = t.name, i = null, a = null;
  e._meta = null;
  function u(A) {
    return function(y, v) {
      y && y instanceof Error && !y.reason && a && (y.reason = a), A(y, v);
    };
  }
  function o(A) {
    var y = A.createObjectStore(oe, {
      keyPath: "id"
    });
    A.createObjectStore(ge, {
      autoIncrement: !0
    }).createIndex("_doc_id_rev", "_doc_id_rev", {
      unique: !0
    }), A.createObjectStore(Ae, {
      keyPath: "digest"
    }), A.createObjectStore(me, {
      keyPath: "id",
      autoIncrement: !1
    }), A.createObjectStore(zn), y.createIndex("deletedOrLocal", "deletedOrLocal", {
      unique: !1
    }), A.createObjectStore(je, {
      keyPath: "_id"
    });
    var v = A.createObjectStore(Ge, {
      autoIncrement: !0
    });
    v.createIndex("seq", "seq"), v.createIndex("digestSeq", "digestSeq", {
      unique: !0
    });
  }
  function f(A, y) {
    var v = A.objectStore(oe);
    v.createIndex("deletedOrLocal", "deletedOrLocal", {
      unique: !1
    }), v.openCursor().onsuccess = function(s) {
      var l = s.target.result;
      if (l) {
        var h = l.value, p = Ie(h);
        h.deletedOrLocal = p ? "1" : "0", v.put(h), l.continue();
      } else
        y();
    };
  }
  function _(A) {
    A.createObjectStore(je, {
      keyPath: "_id"
    }).createIndex("_doc_id_rev", "_doc_id_rev", {
      unique: !0
    });
  }
  function b(A, y) {
    var v = A.objectStore(je), s = A.objectStore(oe), l = A.objectStore(ge), h = s.openCursor();
    h.onsuccess = function(p) {
      var j = p.target.result;
      if (j) {
        var R = j.value, B = R.id, L = Ye(B), K = He(R);
        if (L) {
          var Z = B + "::" + K, Y = B + "::", Q = B + "::~", J = l.index("_doc_id_rev"), U = IDBKeyRange.bound(Y, Q, !1, !1), d = J.openCursor(U);
          d.onsuccess = function(g) {
            if (d = g.target.result, !d)
              s.delete(j.primaryKey), j.continue();
            else {
              var w = d.value;
              w._doc_id_rev === Z && v.put(w), l.delete(d.primaryKey), d.continue();
            }
          };
        } else
          j.continue();
      } else
        y && y();
    };
  }
  function c(A) {
    var y = A.createObjectStore(Ge, {
      autoIncrement: !0
    });
    y.createIndex("seq", "seq"), y.createIndex("digestSeq", "digestSeq", {
      unique: !0
    });
  }
  function m(A, y) {
    var v = A.objectStore(ge), s = A.objectStore(Ae), l = A.objectStore(Ge), h = s.count();
    h.onsuccess = function(p) {
      var j = p.target.result;
      if (!j)
        return y();
      v.openCursor().onsuccess = function(R) {
        var B = R.target.result;
        if (!B)
          return y();
        for (var L = B.value, K = B.primaryKey, Z = Object.keys(L._attachments || {}), Y = {}, Q = 0; Q < Z.length; Q++) {
          var J = L._attachments[Z[Q]];
          Y[J.digest] = !0;
        }
        var U = Object.keys(Y);
        for (Q = 0; Q < U.length; Q++) {
          var d = U[Q];
          l.put({
            seq: K,
            digestSeq: d + "::" + K
          });
        }
        B.continue();
      };
    };
  }
  function O(A) {
    function y(h) {
      return h.data ? Je(h) : (h.deleted = h.deletedOrLocal === "1", h);
    }
    var v = A.objectStore(ge), s = A.objectStore(oe), l = s.openCursor();
    l.onsuccess = function(h) {
      var p = h.target.result;
      if (!p)
        return;
      var j = y(p.value);
      j.winningRev = j.winningRev || He(j);
      function R() {
        var L = j.id + "::", K = j.id + "::\uFFFF", Z = v.index("_doc_id_rev").openCursor(IDBKeyRange.bound(L, K)), Y = 0;
        Z.onsuccess = function(Q) {
          var J = Q.target.result;
          if (!J)
            return j.seq = Y, B();
          var U = J.primaryKey;
          U > Y && (Y = U), J.continue();
        };
      }
      function B() {
        var L = Kn(j, j.winningRev, j.deleted), K = s.put(L);
        K.onsuccess = function() {
          p.continue();
        };
      }
      if (j.seq)
        return B();
      R();
    };
  }
  e._remote = !1, e.type = function() {
    return "idb";
  }, e._id = ta(function(A) {
    A(null, e._meta.instanceId);
  }), e._bulkDocs = function(y, v, s) {
    As(t, y, v, e, i, u(s));
  }, e._get = function(y, v, s) {
    var l, h, p, j = v.ctx;
    if (!j) {
      var R = Ee(i, [oe, ge, Ae], "readonly");
      if (R.error)
        return s(R.error);
      j = R.txn;
    }
    function B() {
      s(p, {
        doc: l,
        metadata: h,
        ctx: j
      });
    }
    j.objectStore(oe).get(y).onsuccess = function(L) {
      if (h = Je(L.target.result), !h)
        return p = V(Ce, "missing"), B();
      var K;
      if (v.rev)
        K = v.latest ? yo(v.rev, h) : v.rev;
      else {
        K = h.winningRev;
        var Z = Ie(h);
        if (Z)
          return p = V(Ce, "deleted"), B();
      }
      var Y = j.objectStore(ge), Q = h.id + "::" + K;
      Y.index("_doc_id_rev").get(Q).onsuccess = function(J) {
        if (l = J.target.result, l && (l = tn(l)), !l)
          return p = V(Ce, "missing"), B();
        B();
      };
    };
  }, e._getAttachment = function(A, y, v, s, l) {
    var h;
    if (s.ctx)
      h = s.ctx;
    else {
      var p = Ee(i, [oe, ge, Ae], "readonly");
      if (p.error)
        return l(p.error);
      h = p.txn;
    }
    var j = v.digest, R = v.content_type;
    h.objectStore(Ae).get(j).onsuccess = function(B) {
      var L = B.target.result.body;
      Sa(L, R, s.binary, function(K) {
        l(null, K);
      });
    };
  }, e._info = function(y) {
    var v, s, l = Ee(i, [me, ge], "readonly");
    if (l.error)
      return y(l.error);
    var h = l.txn;
    h.objectStore(me).get(me).onsuccess = function(p) {
      s = p.target.result.docCount;
    }, h.objectStore(ge).openCursor(null, "prev").onsuccess = function(p) {
      var j = p.target.result;
      v = j ? j.key : 0;
    }, h.oncomplete = function() {
      y(null, {
        doc_count: s,
        update_seq: v,
        idb_attachment_format: e._meta.blobSupport ? "binary" : "base64"
      });
    };
  }, e._allDocs = function(y, v) {
    Es(y, i, u(v));
  }, e._changes = function(y) {
    return qs(y, e, r, i);
  }, e._close = function(A) {
    i.close(), rt.delete(r), A();
  }, e._getRevisionTree = function(A, y) {
    var v = Ee(i, [oe], "readonly");
    if (v.error)
      return y(v.error);
    var s = v.txn, l = s.objectStore(oe).get(A);
    l.onsuccess = function(h) {
      var p = Je(h.target.result);
      p ? y(null, p.rev_tree) : y(V(Ce));
    };
  }, e._doCompaction = function(A, y, v) {
    var s = [oe, ge, Ae, Ge], l = Ee(i, s, "readwrite");
    if (l.error)
      return v(l.error);
    var h = l.txn, p = h.objectStore(oe);
    p.get(A).onsuccess = function(j) {
      var R = Je(j.target.result);
      et(R.rev_tree, function(K, Z, Y, Q, J) {
        var U = Z + "-" + Y;
        y.indexOf(U) !== -1 && (J.status = "missing");
      }), Ea(y, A, h);
      var B = R.winningRev, L = R.deleted;
      h.objectStore(oe).put(Kn(R, B, L));
    }, h.onabort = qe(v), h.oncomplete = function() {
      v();
    };
  }, e._getLocal = function(A, y) {
    var v = Ee(i, [je], "readonly");
    if (v.error)
      return y(v.error);
    var s = v.txn, l = s.objectStore(je).get(A);
    l.onerror = qe(y), l.onsuccess = function(h) {
      var p = h.target.result;
      p ? (delete p._doc_id_rev, y(null, p)) : y(V(Ce));
    };
  }, e._putLocal = function(A, y, v) {
    typeof y == "function" && (v = y, y = {}), delete A._revisions;
    var s = A._rev, l = A._id;
    s ? A._rev = "0-" + (parseInt(s.split("-")[1], 10) + 1) : A._rev = "0-1";
    var h = y.ctx, p;
    if (!h) {
      var j = Ee(i, [je], "readwrite");
      if (j.error)
        return v(j.error);
      h = j.txn, h.onerror = qe(v), h.oncomplete = function() {
        p && v(null, p);
      };
    }
    var R = h.objectStore(je), B;
    s ? (B = R.get(l), B.onsuccess = function(L) {
      var K = L.target.result;
      if (!K || K._rev !== s)
        v(V(lt));
      else {
        var Z = R.put(A);
        Z.onsuccess = function() {
          p = {
            ok: !0,
            id: A._id,
            rev: A._rev
          }, y.ctx && v(null, p);
        };
      }
    }) : (B = R.add(A), B.onerror = function(L) {
      v(V(lt)), L.preventDefault(), L.stopPropagation();
    }, B.onsuccess = function() {
      p = {
        ok: !0,
        id: A._id,
        rev: A._rev
      }, y.ctx && v(null, p);
    });
  }, e._removeLocal = function(A, y, v) {
    typeof y == "function" && (v = y, y = {});
    var s = y.ctx;
    if (!s) {
      var l = Ee(i, [je], "readwrite");
      if (l.error)
        return v(l.error);
      s = l.txn, s.oncomplete = function() {
        h && v(null, h);
      };
    }
    var h, p = A._id, j = s.objectStore(je), R = j.get(p);
    R.onerror = qe(v), R.onsuccess = function(B) {
      var L = B.target.result;
      !L || L._rev !== A._rev ? v(V(Ce)) : (j.delete(p), h = {
        ok: !0,
        id: p,
        rev: "0-0"
      }, y.ctx && v(null, h));
    };
  }, e._destroy = function(A, y) {
    xt.removeAllListeners(r);
    var v = An.get(r);
    v && v.result && (v.result.close(), rt.delete(r));
    var s = indexedDB.deleteDatabase(r);
    s.onsuccess = function() {
      An.delete(r), cn() && r in localStorage && delete localStorage[r], y(null, {
        ok: !0
      });
    }, s.onerror = qe(y);
  };
  var $ = rt.get(r);
  if ($)
    return i = $.idb, e._meta = $.global, _e(function() {
      n(null, e);
    });
  var x = indexedDB.open(r, ws);
  An.set(r, x), x.onupgradeneeded = function(A) {
    var y = A.target.result;
    if (A.oldVersion < 1)
      return o(y);
    var v = A.currentTarget.transaction;
    A.oldVersion < 3 && _(y), A.oldVersion < 4 && c(y);
    var s = [
      f,
      b,
      m,
      O
    ], l = A.oldVersion;
    function h() {
      var p = s[l - 1];
      l++, p && p(v, h);
    }
    h();
  }, x.onsuccess = function(A) {
    i = A.target.result, i.onversionchange = function() {
      i.close(), rt.delete(r);
    }, i.onabort = function(B) {
      Oe("error", "Database has a window failure", B.target.error), a = B.target.error, i.close(), rt.delete(r);
    };
    var y = i.transaction([me, zn, oe], "readwrite"), v = !1, s, l, h, p;
    function j() {
      typeof h == "undefined" || !v || (e._meta = {
        name: r,
        instanceId: p,
        blobSupport: h
      }, rt.set(r, {
        idb: i,
        window: e._meta
      }), n(null, e));
    }
    function R() {
      if (!(typeof l == "undefined" || typeof s == "undefined")) {
        var B = r + "_id";
        B in s ? p = s[B] : s[B] = p = vn(), s.docCount = l, y.objectStore(me).put(s);
      }
    }
    y.objectStore(me).get(me).onsuccess = function(B) {
      s = B.target.result || {
        id: me
      }, R();
    }, Cs(y, function(B) {
      l = B, R();
    }), $n || ($n = ks(y)), $n.then(function(B) {
      h = B, j();
    }), y.oncomplete = function() {
      v = !0, j();
    }, y.onabort = qe(n);
  }, x.onerror = function(A) {
    var y = A.target.error && A.target.error.message;
    y ? y.indexOf("stored database is a higher version") !== -1 && (y = new Error('This DB was created with the newer "indexeddb" adapter, but you are trying to open it with the older "idb" adapter')) : y = "Failed to open indexedDB, are you in private browsing mode?", Oe("error", y), n(V(gr, y));
  };
}
Ca.valid = function() {
  try {
    return typeof indexedDB != "undefined" && typeof IDBKeyRange != "undefined";
  } catch (e) {
    return !1;
  }
};
function Is(e) {
  e.adapter("idb", Ca, !0);
}
function Bs(e, t) {
  return new Promise(function(n, r) {
    var i = 0, a = 0, u = 0, o = e.length, f;
    function _() {
      i++, e[a++]().then(c, m);
    }
    function b() {
      ++u === o ? f ? r(f) : n() : O();
    }
    function c() {
      i--, b();
    }
    function m($) {
      i--, f = f || $, b();
    }
    function O() {
      for (; i < t && a < o; )
        _();
    }
    O();
  });
}
var Rs = 25, Ls = 50, Gt = 5e3, Ds = 1e4, On = {};
function Sn(e) {
  var t = e.doc || e.ok, n = t && t._attachments;
  !n || Object.keys(n).forEach(function(r) {
    var i = n[r];
    i.data = $r(i.data, i.content_type);
  });
}
function Me(e) {
  return /^_design/.test(e) ? "_design/" + encodeURIComponent(e.slice(8)) : /^_local/.test(e) ? "_local/" + encodeURIComponent(e.slice(7)) : encodeURIComponent(e);
}
function ui(e) {
  return !e._attachments || !Object.keys(e._attachments) ? Promise.resolve() : Promise.all(Object.keys(e._attachments).map(function(t) {
    var n = e._attachments[t];
    if (n.data && typeof n.data != "string")
      return new Promise(function(r) {
        Ar(n.data, r);
      }).then(function(r) {
        n.data = r;
      });
  }));
}
function Ns(e) {
  if (!e.prefix)
    return !1;
  var t = sa(e.prefix).protocol;
  return t === "http" || t === "https";
}
function Fs(e, t) {
  if (Ns(t)) {
    var n = t.name.substr(t.prefix.length), r = t.prefix.replace(/\/?$/, "/");
    e = r + encodeURIComponent(n);
  }
  var i = sa(e);
  (i.user || i.password) && (i.auth = {
    username: i.user,
    password: i.password
  });
  var a = i.path.replace(/(^\/|\/$)/g, "").split("/");
  return i.db = a.pop(), i.db.indexOf("%") === -1 && (i.db = encodeURIComponent(i.db)), i.path = a.join("/"), i;
}
function ce(e, t) {
  return Yt(e, e.db + "/" + t);
}
function Yt(e, t) {
  var n = e.path ? "/" : "";
  return e.protocol + "://" + e.host + (e.port ? ":" + e.port : "") + "/" + e.path + n + t;
}
function Jt(e) {
  return "?" + Object.keys(e).map(function(t) {
    return t + "=" + encodeURIComponent(e[t]);
  }).join("&");
}
function Ms(e) {
  var t = typeof navigator != "undefined" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "", n = t.indexOf("msie") !== -1, r = t.indexOf("trident") !== -1, i = t.indexOf("edge") !== -1, a = !("method" in e) || e.method === "GET";
  return (n || r || i) && a;
}
function Wn(e, t) {
  var n = this, r = Fs(e.name, e), i = ce(r, "");
  e = le(e);
  var a = function(c, m) {
    if (m = m || {}, m.headers = m.headers || new ot(), m.credentials = "include", e.auth || r.auth) {
      var O = e.auth || r.auth, $ = O.username + ":" + O.password, x = Bt(unescape(encodeURIComponent($)));
      m.headers.set("Authorization", "Basic " + x);
    }
    var A = e.headers || {};
    Object.keys(A).forEach(function(v) {
      m.headers.append(v, A[v]);
    }), Ms(m) && (c += (c.indexOf("?") === -1 ? "?" : "&") + "_nonce=" + Date.now());
    var y = e.fetch || pa;
    return y(c, m);
  };
  function u(c, m) {
    return fe(c, Be(function(O) {
      _().then(function() {
        return m.apply(this, O);
      }).catch(function($) {
        var x = O.pop();
        x($);
      });
    })).bind(n);
  }
  function o(c, m, O) {
    var $ = {};
    return m = m || {}, m.headers = m.headers || new ot(), m.headers.get("Content-Type") || m.headers.set("Content-Type", "application/json"), m.headers.get("Accept") || m.headers.set("Accept", "application/json"), a(c, m).then(function(x) {
      return $.ok = x.ok, $.status = x.status, x.json();
    }).then(function(x) {
      if ($.data = x, !$.ok) {
        $.data.status = $.status;
        var A = dt($.data);
        if (O)
          return O(A);
        throw A;
      }
      if (Array.isArray($.data) && ($.data = $.data.map(function(y) {
        return y.error || y.missing ? dt(y) : y;
      })), O)
        O(null, $.data);
      else
        return $;
    });
  }
  var f;
  function _() {
    return e.skip_setup ? Promise.resolve() : f || (f = o(i).catch(function(c) {
      return c && c.status && c.status === 404 ? (Ln(404, "PouchDB is just detecting if the remote exists."), o(i, {
        method: "PUT"
      })) : Promise.reject(c);
    }).catch(function(c) {
      return c && c.status && c.status === 412 ? !0 : Promise.reject(c);
    }), f.catch(function() {
      f = null;
    }), f);
  }
  _e(function() {
    t(null, n);
  }), n._remote = !0, n.type = function() {
    return "http";
  }, n.id = u("id", function(c) {
    a(Yt(r, "")).then(function(m) {
      return m.json();
    }).catch(function() {
      return {};
    }).then(function(m) {
      var O = m && m.uuid ? m.uuid + r.db : ce(r, "");
      c(null, O);
    });
  }), n.compact = u("compact", function(c, m) {
    typeof c == "function" && (m = c, c = {}), c = le(c), o(ce(r, "_compact"), {
      method: "POST"
    }).then(function() {
      function O() {
        n.info(function($, x) {
          x && !x.compact_running ? m(null, {
            ok: !0
          }) : setTimeout(O, c.interval || 200);
        });
      }
      O();
    });
  }), n.bulkGet = fe("bulkGet", function(c, m) {
    var O = this;
    function $(v) {
      var s = {};
      c.revs && (s.revs = !0), c.attachments && (s.attachments = !0), c.latest && (s.latest = !0), o(ce(r, "_bulk_get" + Jt(s)), {
        method: "POST",
        body: JSON.stringify({
          docs: c.docs
        })
      }).then(function(l) {
        c.attachments && c.binary && l.data.results.forEach(function(h) {
          h.docs.forEach(Sn);
        }), v(null, l.data);
      }).catch(v);
    }
    function x() {
      var v = Ls, s = Math.ceil(c.docs.length / v), l = 0, h = new Array(s);
      function p(B) {
        return function(L, K) {
          h[B] = K.results, ++l === s && m(null, {
            results: Vt(h)
          });
        };
      }
      for (var j = 0; j < s; j++) {
        var R = It(c, ["revs", "attachments", "binary", "latest"]);
        R.docs = c.docs.slice(j * v, Math.min(c.docs.length, (j + 1) * v)), na(O, R, p(j));
      }
    }
    var A = Yt(r, ""), y = On[A];
    typeof y != "boolean" ? $(function(v, s) {
      v ? (On[A] = !1, Ln(v.status, "PouchDB is just detecting if the remote supports the _bulk_get API."), x()) : (On[A] = !0, m(null, s));
    }) : y ? $(m) : x();
  }), n._info = function(c) {
    _().then(function() {
      return a(ce(r, ""));
    }).then(function(m) {
      return m.json();
    }).then(function(m) {
      m.host = ce(r, ""), c(null, m);
    }).catch(c);
  }, n.fetch = function(c, m) {
    return _().then(function() {
      var O = c.substring(0, 1) === "/" ? Yt(r, c.substring(1)) : ce(r, c);
      return a(O, m);
    });
  }, n.get = u("get", function(c, m, O) {
    typeof m == "function" && (O = m, m = {}), m = le(m);
    var $ = {};
    m.revs && ($.revs = !0), m.revs_info && ($.revs_info = !0), m.latest && ($.latest = !0), m.open_revs && (m.open_revs !== "all" && (m.open_revs = JSON.stringify(m.open_revs)), $.open_revs = m.open_revs), m.rev && ($.rev = m.rev), m.conflicts && ($.conflicts = m.conflicts), m.update_seq && ($.update_seq = m.update_seq), c = Me(c);
    function x(v) {
      var s = v._attachments, l = s && Object.keys(s);
      if (!s || !l.length)
        return;
      function h(j) {
        var R = s[j], B = Me(v._id) + "/" + b(j) + "?rev=" + v._rev;
        return a(ce(r, B)).then(function(L) {
          return "buffer" in L ? L.buffer() : L.blob();
        }).then(function(L) {
          if (m.binary) {
            var K = Object.getOwnPropertyDescriptor(L.__proto__, "type");
            return (!K || K.set) && (L.type = R.content_type), L;
          }
          return new Promise(function(Z) {
            Ar(L, Z);
          });
        }).then(function(L) {
          delete R.stub, delete R.length, R.data = L;
        });
      }
      var p = l.map(function(j) {
        return function() {
          return h(j);
        };
      });
      return Bs(p, 5);
    }
    function A(v) {
      return Array.isArray(v) ? Promise.all(v.map(function(s) {
        if (s.ok)
          return x(s.ok);
      })) : x(v);
    }
    var y = ce(r, c + Jt($));
    o(y).then(function(v) {
      return Promise.resolve().then(function() {
        if (m.attachments)
          return A(v.data);
      }).then(function() {
        O(null, v.data);
      });
    }).catch(function(v) {
      v.docId = c, O(v);
    });
  }), n.remove = u("remove", function(c, m, O, $) {
    var x;
    typeof m == "string" ? (x = {
      _id: c,
      _rev: m
    }, typeof O == "function" && ($ = O, O = {})) : (x = c, typeof m == "function" ? ($ = m, O = {}) : ($ = O, O = m));
    var A = x._rev || O.rev, y = ce(r, Me(x._id)) + "?rev=" + A;
    o(y, {
      method: "DELETE"
    }, $).catch($);
  });
  function b(c) {
    return c.split("/").map(encodeURIComponent).join("/");
  }
  n.getAttachment = u("getAttachment", function(c, m, O, $) {
    typeof O == "function" && ($ = O, O = {});
    var x = O.rev ? "?rev=" + O.rev : "", A = ce(r, Me(c)) + "/" + b(m) + x, y;
    a(A, {
      method: "GET"
    }).then(function(v) {
      if (y = v.headers.get("content-type"), v.ok)
        return typeof process != "undefined" && !process.browser && typeof v.buffer == "function" ? v.buffer() : v.blob();
      throw v;
    }).then(function(v) {
      if (typeof process != "undefined" && !process.browser) {
        var s = Object.getOwnPropertyDescriptor(v.__proto__, "type");
        (!s || s.set) && (v.type = y);
      }
      $(null, v);
    }).catch(function(v) {
      $(v);
    });
  }), n.removeAttachment = u("removeAttachment", function(c, m, O, $) {
    var x = ce(r, Me(c) + "/" + b(m)) + "?rev=" + O;
    o(x, {
      method: "DELETE"
    }, $).catch($);
  }), n.putAttachment = u("putAttachment", function(c, m, O, $, x, A) {
    typeof x == "function" && (A = x, x = $, $ = O, O = null);
    var y = Me(c) + "/" + b(m), v = ce(r, y);
    if (O && (v += "?rev=" + O), typeof $ == "string") {
      var s;
      try {
        s = mr($);
      } catch (l) {
        return A(V(aa, "Attachment is not a valid base64 string"));
      }
      $ = s ? br(s, x) : "";
    }
    o(v, {
      headers: new ot({
        "Content-Type": x
      }),
      method: "PUT",
      body: $
    }, A).catch(A);
  }), n._bulkDocs = function(c, m, O) {
    c.new_edits = m.new_edits, _().then(function() {
      return Promise.all(c.docs.map(ui));
    }).then(function() {
      return o(ce(r, "_bulk_docs"), {
        method: "POST",
        body: JSON.stringify(c)
      }, O);
    }).catch(O);
  }, n._put = function(c, m, O) {
    _().then(function() {
      return ui(c);
    }).then(function() {
      return o(ce(r, Me(c._id)), {
        method: "PUT",
        body: JSON.stringify(c)
      });
    }).then(function($) {
      O(null, $.data);
    }).catch(function($) {
      $.docId = c && c._id, O($);
    });
  }, n.allDocs = u("allDocs", function(c, m) {
    typeof c == "function" && (m = c, c = {}), c = le(c);
    var O = {}, $, x = "GET";
    c.conflicts && (O.conflicts = !0), c.update_seq && (O.update_seq = !0), c.descending && (O.descending = !0), c.include_docs && (O.include_docs = !0), c.attachments && (O.attachments = !0), c.key && (O.key = JSON.stringify(c.key)), c.start_key && (c.startkey = c.start_key), c.startkey && (O.startkey = JSON.stringify(c.startkey)), c.end_key && (c.endkey = c.end_key), c.endkey && (O.endkey = JSON.stringify(c.endkey)), typeof c.inclusive_end != "undefined" && (O.inclusive_end = !!c.inclusive_end), typeof c.limit != "undefined" && (O.limit = c.limit), typeof c.skip != "undefined" && (O.skip = c.skip);
    var A = Jt(O);
    typeof c.keys != "undefined" && (x = "POST", $ = {
      keys: c.keys
    }), o(ce(r, "_all_docs" + A), {
      method: x,
      body: JSON.stringify($)
    }).then(function(y) {
      c.include_docs && c.attachments && c.binary && y.data.rows.forEach(Sn), m(null, y.data);
    }).catch(m);
  }), n._changes = function(c) {
    var m = "batch_size" in c ? c.batch_size : Rs;
    c = le(c), c.continuous && !("heartbeat" in c) && (c.heartbeat = Ds);
    var O = "timeout" in c ? c.timeout : 30 * 1e3;
    "timeout" in c && c.timeout && O - c.timeout < Gt && (O = c.timeout + Gt), "heartbeat" in c && c.heartbeat && O - c.heartbeat < Gt && (O = c.heartbeat + Gt);
    var $ = {};
    "timeout" in c && c.timeout && ($.timeout = c.timeout);
    var x = typeof c.limit != "undefined" ? c.limit : !1, A = x;
    if (c.style && ($.style = c.style), (c.include_docs || c.filter && typeof c.filter == "function") && ($.include_docs = !0), c.attachments && ($.attachments = !0), c.continuous && ($.feed = "longpoll"), c.seq_interval && ($.seq_interval = c.seq_interval), c.conflicts && ($.conflicts = !0), c.descending && ($.descending = !0), c.update_seq && ($.update_seq = !0), "heartbeat" in c && c.heartbeat && ($.heartbeat = c.heartbeat), c.filter && typeof c.filter == "string" && ($.filter = c.filter), c.view && typeof c.view == "string" && ($.filter = "_view", $.view = c.view), c.query_params && typeof c.query_params == "object")
      for (var y in c.query_params)
        Object.prototype.hasOwnProperty.call(c.query_params, y) && ($[y] = c.query_params[y]);
    var v = "GET", s;
    c.doc_ids ? ($.filter = "_doc_ids", v = "POST", s = {
      doc_ids: c.doc_ids
    }) : c.selector && ($.filter = "_selector", v = "POST", s = {
      selector: c.selector
    });
    var l = new So(), h, p = function(B, L) {
      if (!c.aborted) {
        $.since = B, typeof $.since == "object" && ($.since = JSON.stringify($.since)), c.descending ? x && ($.limit = A) : $.limit = !x || A > m ? m : A;
        var K = ce(r, "_changes" + Jt($)), Z = {
          signal: l.signal,
          method: v,
          body: JSON.stringify(s)
        };
        h = B, !c.aborted && _().then(function() {
          return o(K, Z, L);
        }).catch(L);
      }
    }, j = {
      results: []
    }, R = function(B, L) {
      if (!c.aborted) {
        var K = 0;
        if (L && L.results) {
          K = L.results.length, j.last_seq = L.last_seq;
          var Z = null, Y = null;
          typeof L.pending == "number" && (Z = L.pending), (typeof j.last_seq == "string" || typeof j.last_seq == "number") && (Y = j.last_seq);
          var Q = {};
          Q.query = c.query_params, L.results = L.results.filter(function(U) {
            A--;
            var d = pr(c)(U);
            return d && (c.include_docs && c.attachments && c.binary && Sn(U), c.return_docs && j.results.push(U), c.onChange(U, Z, Y)), d;
          });
        } else if (B) {
          c.aborted = !0, c.complete(B);
          return;
        }
        L && L.last_seq && (h = L.last_seq);
        var J = x && A <= 0 || L && K < m || c.descending;
        c.continuous && !(x && A <= 0) || !J ? _e(function() {
          p(h, R);
        }) : c.complete(null, j);
      }
    };
    return p(c.since || 0, R), {
      cancel: function() {
        c.aborted = !0, l.abort();
      }
    };
  }, n.revsDiff = u("revsDiff", function(c, m, O) {
    typeof m == "function" && (O = m, m = {}), o(ce(r, "_revs_diff"), {
      method: "POST",
      body: JSON.stringify(c)
    }, O).catch(O);
  }), n._close = function(c) {
    c();
  }, n._destroy = function(c, m) {
    o(ce(r, ""), {
      method: "DELETE"
    }).then(function(O) {
      m(null, O);
    }).catch(function(O) {
      O.status === 404 ? m(null, {
        ok: !0
      }) : m(O);
    });
  };
}
Wn.valid = function() {
  return !0;
};
function Us(e) {
  e.adapter("http", Wn, !1), e.adapter("https", Wn, !1);
}
function ze(e) {
  this.status = 400, this.name = "query_parse_error", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, ze);
  } catch (t) {
  }
}
ve.exports(ze, Error);
function hn(e) {
  this.status = 404, this.name = "not_found", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, hn);
  } catch (t) {
  }
}
ve.exports(hn, Error);
function yn(e) {
  this.status = 500, this.name = "invalid_value", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, yn);
  } catch (t) {
  }
}
ve.exports(yn, Error);
function ja(e, t) {
  return t && e.then(function(n) {
    _e(function() {
      t(null, n);
    });
  }, function(n) {
    _e(function() {
      t(n);
    });
  }), e;
}
function zs(e) {
  return Be(function(t) {
    var n = t.pop(), r = e.apply(this, t);
    return typeof n == "function" && ja(r, n), r;
  });
}
function Ks(e, t) {
  return e.then(function(n) {
    return t().then(function() {
      return n;
    });
  }, function(n) {
    return t().then(function() {
      throw n;
    });
  });
}
function xn(e, t) {
  return function() {
    var n = arguments, r = this;
    return e.add(function() {
      return t.apply(r, n);
    });
  };
}
function oi(e) {
  var t = new ct(e), n = new Array(t.size), r = -1;
  return t.forEach(function(i) {
    n[++r] = i;
  }), n;
}
function En(e) {
  var t = new Array(e.size), n = -1;
  return e.forEach(function(r, i) {
    t[++n] = i;
  }), t;
}
function si(e) {
  var t = "builtin " + e + " function requires map values to be numbers or number arrays";
  return new yn(t);
}
function Hn(e) {
  for (var t = 0, n = 0, r = e.length; n < r; n++) {
    var i = e[n];
    if (typeof i != "number")
      if (Array.isArray(i)) {
        t = typeof t == "number" ? [t] : t;
        for (var a = 0, u = i.length; a < u; a++) {
          var o = i[a];
          if (typeof o != "number")
            throw si("_sum");
          typeof t[a] == "undefined" ? t.push(o) : t[a] += o;
        }
      } else
        throw si("_sum");
    else
      typeof t == "number" ? t += i : t[0] += i;
  }
  return t;
}
var Qs = Oe.bind(null, "log"), Gs = Array.isArray, Js = JSON.parse;
function Pa(e, t) {
  return _r("return (" + e.replace(/;\s*$/, "") + ");", {
    emit: t,
    sum: Hn,
    log: Qs,
    isArray: Gs,
    toJSON: Js
  });
}
function kt() {
  this.promise = new Promise(function(e) {
    e();
  });
}
kt.prototype.add = function(e) {
  return this.promise = this.promise.catch(function() {
  }).then(function() {
    return e();
  }), this.promise;
};
kt.prototype.finish = function() {
  return this.promise;
};
function fi(e) {
  if (!e)
    return "undefined";
  switch (typeof e) {
    case "function":
      return e.toString();
    case "string":
      return e.toString();
    default:
      return JSON.stringify(e);
  }
}
function Ws(e, t) {
  return fi(e) + fi(t) + "undefined";
}
function ci(e, t, n, r, i, a) {
  var u = Ws(n, r), o;
  if (!i && (o = e._cachedViews = e._cachedViews || {}, o[u]))
    return o[u];
  var f = e.info().then(function(_) {
    var b = _.db_name + "-mrview-" + (i ? "temp" : la(u));
    function c(m) {
      m.views = m.views || {};
      var O = t;
      O.indexOf("/") === -1 && (O = t + "/" + t);
      var $ = m.views[O] = m.views[O] || {};
      if (!$[b])
        return $[b] = !0, m;
    }
    return dn(e, "_local/" + a, c).then(function() {
      return e.registerDependentDatabase(b).then(function(m) {
        var O = m.db;
        O.auto_compaction = !0;
        var $ = {
          name: b,
          db: O,
          sourceDB: e,
          adapter: e.adapter,
          mapFun: n,
          reduceFun: r
        };
        return $.db.get("_local/lastSeq").catch(function(x) {
          if (x.status !== 404)
            throw x;
        }).then(function(x) {
          return $.seq = x ? x.seq : 0, o && $.db.once("destroyed", function() {
            delete o[u];
          }), $;
        });
      });
    });
  });
  return o && (o[u] = f), f;
}
var li = {}, di = new kt(), Hs = 50;
function kn(e) {
  return e.indexOf("/") === -1 ? [e, e] : e.split("/");
}
function Ys(e) {
  return e.length === 1 && /^1-/.test(e[0].rev);
}
function vi(e, t, n) {
  try {
    e.emit("error", t);
  } catch (r) {
    Oe("error", `The user's map/reduce function threw an uncaught error.
You can debug this error by doing:
myDatabase.on('error', function (err) { debugger; });
Please double-check your map/reduce function.`), Oe("error", t, n);
  }
}
function Xs(e, t, n, r) {
  function i(d, g, w) {
    try {
      g(w);
    } catch (S) {
      vi(d, S, {
        fun: g,
        doc: w
      });
    }
  }
  function a(d, g, w, S, C) {
    try {
      return {
        output: g(w, S, C)
      };
    } catch (P) {
      return vi(d, P, {
        fun: g,
        keys: w,
        values: S,
        rereduce: C
      }), {
        error: P
      };
    }
  }
  function u(d, g) {
    var w = ue(d.key, g.key);
    return w !== 0 ? w : ue(d.value, g.value);
  }
  function o(d, g, w) {
    return w = w || 0, typeof g == "number" ? d.slice(w, g + w) : w > 0 ? d.slice(w) : d;
  }
  function f(d) {
    var g = d.value, w = g && typeof g == "object" && g._id || d.id;
    return w;
  }
  function _(d) {
    d.rows.forEach(function(g) {
      var w = g.doc && g.doc._attachments;
      !w || Object.keys(w).forEach(function(S) {
        var C = w[S];
        w[S].data = $r(C.data, C.content_type);
      });
    });
  }
  function b(d) {
    return function(g) {
      return d.include_docs && d.attachments && d.binary && _(g), g;
    };
  }
  function c(d, g, w, S) {
    var C = g[d];
    typeof C != "undefined" && (S && (C = encodeURIComponent(JSON.stringify(C))), w.push(d + "=" + C));
  }
  function m(d) {
    if (typeof d != "undefined") {
      var g = Number(d);
      return !isNaN(g) && g === parseInt(d, 10) ? g : d;
    }
  }
  function O(d) {
    return d.group_level = m(d.group_level), d.limit = m(d.limit), d.skip = m(d.skip), d;
  }
  function $(d) {
    if (d) {
      if (typeof d != "number")
        return new ze('Invalid value for integer: "' + d + '"');
      if (d < 0)
        return new ze('Invalid value for positive integer: "' + d + '"');
    }
  }
  function x(d, g) {
    var w = d.descending ? "endkey" : "startkey", S = d.descending ? "startkey" : "endkey";
    if (typeof d[w] != "undefined" && typeof d[S] != "undefined" && ue(d[w], d[S]) > 0)
      throw new ze("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");
    if (g.reduce && d.reduce !== !1) {
      if (d.include_docs)
        throw new ze("{include_docs:true} is invalid for reduce");
      if (d.keys && d.keys.length > 1 && !d.group && !d.group_level)
        throw new ze("Multi-key fetches for reduce views must use {group: true}");
    }
    ["group_level", "limit", "skip"].forEach(function(C) {
      var P = $(d[C]);
      if (P)
        throw P;
    });
  }
  function A(d, g, w) {
    var S = [], C, P = "GET", k, q;
    if (c("reduce", w, S), c("include_docs", w, S), c("attachments", w, S), c("limit", w, S), c("descending", w, S), c("group", w, S), c("group_level", w, S), c("skip", w, S), c("stale", w, S), c("conflicts", w, S), c("startkey", w, S, !0), c("start_key", w, S, !0), c("endkey", w, S, !0), c("end_key", w, S, !0), c("inclusive_end", w, S), c("key", w, S, !0), c("update_seq", w, S), S = S.join("&"), S = S === "" ? "" : "?" + S, typeof w.keys != "undefined") {
      var T = 2e3, I = "keys=" + encodeURIComponent(JSON.stringify(w.keys));
      I.length + S.length + 1 <= T ? S += (S[0] === "?" ? "&" : "?") + I : (P = "POST", typeof g == "string" ? C = {
        keys: w.keys
      } : g.keys = w.keys);
    }
    if (typeof g == "string") {
      var D = kn(g);
      return d.fetch("_design/" + D[0] + "/_view/" + D[1] + S, {
        headers: new ot({
          "Content-Type": "application/json"
        }),
        method: P,
        body: JSON.stringify(C)
      }).then(function(E) {
        return k = E.ok, q = E.status, E.json();
      }).then(function(E) {
        if (!k)
          throw E.status = q, dt(E);
        return E.rows.forEach(function(F) {
          if (F.value && F.value.error && F.value.error === "builtin_reduce_error")
            throw new Error(F.reason);
        }), E;
      }).then(b(w));
    }
    return C = C || {}, Object.keys(g).forEach(function(E) {
      Array.isArray(g[E]) ? C[E] = g[E] : C[E] = g[E].toString();
    }), d.fetch("_temp_view" + S, {
      headers: new ot({
        "Content-Type": "application/json"
      }),
      method: "POST",
      body: JSON.stringify(C)
    }).then(function(E) {
      return k = E.ok, q = E.status, E.json();
    }).then(function(E) {
      if (!k)
        throw E.status = q, dt(E);
      return E;
    }).then(b(w));
  }
  function y(d, g, w) {
    return new Promise(function(S, C) {
      d._query(g, w, function(P, k) {
        if (P)
          return C(P);
        S(k);
      });
    });
  }
  function v(d) {
    return new Promise(function(g, w) {
      d._viewCleanup(function(S, C) {
        if (S)
          return w(S);
        g(C);
      });
    });
  }
  function s(d) {
    return function(g) {
      if (g.status === 404)
        return d;
      throw g;
    };
  }
  function l(d, g, w) {
    var S = "_local/doc_" + d, C = {
      _id: S,
      keys: []
    }, P = w.get(d), k = P[0], q = P[1];
    function T() {
      return Ys(q) ? Promise.resolve(C) : g.db.get(S).catch(s(C));
    }
    function I(E) {
      return E.keys.length ? g.db.allDocs({
        keys: E.keys,
        include_docs: !0
      }) : Promise.resolve({
        rows: []
      });
    }
    function D(E, F) {
      for (var W = [], te = new ct(), M = 0, N = F.rows.length; M < N; M++) {
        var z = F.rows[M], G = z.doc;
        if (!!G && (W.push(G), te.add(G._id), G._deleted = !k.has(G._id), !G._deleted)) {
          var ee = k.get(G._id);
          "value" in ee && (G.value = ee.value);
        }
      }
      var X = En(k);
      return X.forEach(function(he) {
        if (!te.has(he)) {
          var Se = {
            _id: he
          }, _t = k.get(he);
          "value" in _t && (Se.value = _t.value), W.push(Se);
        }
      }), E.keys = oi(X.concat(E.keys)), W.push(E), W;
    }
    return T().then(function(E) {
      return I(E).then(function(F) {
        return D(E, F);
      });
    });
  }
  function h(d, g, w) {
    var S = "_local/lastSeq";
    return d.db.get(S).catch(s({
      _id: S,
      seq: 0
    })).then(function(C) {
      var P = En(g);
      return Promise.all(P.map(function(k) {
        return l(k, d, g);
      })).then(function(k) {
        var q = Vt(k);
        return C.seq = w, q.push(C), d.db.bulkDocs({
          docs: q
        });
      });
    });
  }
  function p(d) {
    var g = typeof d == "string" ? d : d.name, w = li[g];
    return w || (w = li[g] = new kt()), w;
  }
  function j(d, g) {
    return xn(p(d), function() {
      return R(d, g);
    })();
  }
  function R(d, g) {
    var w, S;
    function C(M, N) {
      var z = {
        id: S._id,
        key: Xe(M)
      };
      typeof N != "undefined" && N !== null && (z.value = Xe(N)), w.push(z);
    }
    var P = t(d.mapFun, C), k = d.seq || 0;
    function q(M, N) {
      return function() {
        return h(d, M, N);
      };
    }
    let T = 0, I = {
      view: d.name,
      indexed_docs: T
    };
    d.sourceDB.emit("indexing", I);
    var D = new kt();
    function E() {
      return d.sourceDB.changes({
        return_docs: !0,
        conflicts: !0,
        include_docs: !0,
        style: "all_docs",
        since: k,
        limit: g.changes_batch_size
      }).then(F);
    }
    function F(M) {
      var N = M.results;
      if (!N.length)
        return;
      var z = W(N);
      D.add(q(z, k)), T = T + N.length;
      let G = {
        view: d.name,
        last_seq: M.last_seq,
        results_count: N.length,
        indexed_docs: T
      };
      if (d.sourceDB.emit("indexing", G), !(N.length < g.changes_batch_size))
        return E();
    }
    function W(M) {
      for (var N = new we(), z = 0, G = M.length; z < G; z++) {
        var ee = M[z];
        if (ee.doc._id[0] !== "_") {
          w = [], S = ee.doc, S._deleted || i(d.sourceDB, P, S), w.sort(u);
          var X = te(w);
          N.set(ee.doc._id, [X, ee.changes]);
        }
        k = ee.seq;
      }
      return N;
    }
    function te(M) {
      for (var N = new we(), z, G = 0, ee = M.length; G < ee; G++) {
        var X = M[G], he = [X.key, X.id];
        G > 0 && ue(X.key, z) === 0 && he.push(G), N.set(xe(he), X), z = X.key;
      }
      return N;
    }
    return E().then(function() {
      return D.finish();
    }).then(function() {
      d.seq = k;
    });
  }
  function B(d, g, w) {
    w.group_level === 0 && delete w.group_level;
    var S = w.group || w.group_level, C = n(d.reduceFun), P = [], k = isNaN(w.group_level) ? Number.POSITIVE_INFINITY : w.group_level;
    g.forEach(function(E) {
      var F = P[P.length - 1], W = S ? E.key : null;
      if (S && Array.isArray(W) && (W = W.slice(0, k)), F && ue(F.groupKey, W) === 0) {
        F.keys.push([E.key, E.id]), F.values.push(E.value);
        return;
      }
      P.push({
        keys: [[E.key, E.id]],
        values: [E.value],
        groupKey: W
      });
    }), g = [];
    for (var q = 0, T = P.length; q < T; q++) {
      var I = P[q], D = a(d.sourceDB, C, I.keys, I.values, !1);
      if (D.error && D.error instanceof yn)
        throw D.error;
      g.push({
        value: D.error ? null : D.output,
        key: I.groupKey
      });
    }
    return {
      rows: o(g, w.limit, w.skip)
    };
  }
  function L(d, g) {
    return xn(p(d), function() {
      return K(d, g);
    })();
  }
  function K(d, g) {
    var w, S = d.reduceFun && g.reduce !== !1, C = g.skip || 0;
    typeof g.keys != "undefined" && !g.keys.length && (g.limit = 0, delete g.keys);
    function P(M) {
      return M.include_docs = !0, d.db.allDocs(M).then(function(N) {
        return w = N.total_rows, N.rows.map(function(z) {
          if ("value" in z.doc && typeof z.doc.value == "object" && z.doc.value !== null) {
            var G = Object.keys(z.doc.value).sort(), ee = ["id", "key", "value"];
            if (!(G < ee || G > ee))
              return z.doc.value;
          }
          var X = Uo(z.doc._id);
          return {
            key: X[0],
            id: X[1],
            value: "value" in z.doc ? z.doc.value : null
          };
        });
      });
    }
    function k(M) {
      var N;
      if (S ? N = B(d, M, g) : typeof g.keys == "undefined" ? N = {
        total_rows: w,
        offset: C,
        rows: M
      } : N = {
        total_rows: w,
        offset: C,
        rows: o(M, g.limit, g.skip)
      }, g.update_seq && (N.update_seq = d.seq), g.include_docs) {
        var z = oi(M.map(f));
        return d.sourceDB.allDocs({
          keys: z,
          include_docs: !0,
          conflicts: g.conflicts,
          attachments: g.attachments,
          binary: g.binary
        }).then(function(G) {
          var ee = new we();
          return G.rows.forEach(function(X) {
            ee.set(X.id, X.doc);
          }), M.forEach(function(X) {
            var he = f(X), Se = ee.get(he);
            Se && (X.doc = Se);
          }), N;
        });
      } else
        return N;
    }
    if (typeof g.keys != "undefined") {
      var q = g.keys, T = q.map(function(M) {
        var N = {
          startkey: xe([M]),
          endkey: xe([M, {}])
        };
        return g.update_seq && (N.update_seq = !0), P(N);
      });
      return Promise.all(T).then(Vt).then(k);
    } else {
      var I = {
        descending: g.descending
      };
      g.update_seq && (I.update_seq = !0);
      var D, E;
      if ("start_key" in g && (D = g.start_key), "startkey" in g && (D = g.startkey), "end_key" in g && (E = g.end_key), "endkey" in g && (E = g.endkey), typeof D != "undefined" && (I.startkey = g.descending ? xe([D, {}]) : xe([D])), typeof E != "undefined") {
        var F = g.inclusive_end !== !1;
        g.descending && (F = !F), I.endkey = xe(F ? [E, {}] : [E]);
      }
      if (typeof g.key != "undefined") {
        var W = xe([g.key]), te = xe([g.key, {}]);
        I.descending ? (I.endkey = W, I.startkey = te) : (I.startkey = W, I.endkey = te);
      }
      return S || (typeof g.limit == "number" && (I.limit = g.limit), I.skip = C), P(I).then(k);
    }
  }
  function Z(d) {
    return d.fetch("_view_cleanup", {
      headers: new ot({
        "Content-Type": "application/json"
      }),
      method: "POST"
    }).then(function(g) {
      return g.json();
    });
  }
  function Y(d) {
    return d.get("_local/" + e).then(function(g) {
      var w = new we();
      Object.keys(g.views).forEach(function(C) {
        var P = kn(C), k = "_design/" + P[0], q = P[1], T = w.get(k);
        T || (T = new ct(), w.set(k, T)), T.add(q);
      });
      var S = {
        keys: En(w),
        include_docs: !0
      };
      return d.allDocs(S).then(function(C) {
        var P = {};
        C.rows.forEach(function(T) {
          var I = T.key.substring(8);
          w.get(T.key).forEach(function(D) {
            var E = I + "/" + D;
            g.views[E] || (E = D);
            var F = Object.keys(g.views[E]), W = T.doc && T.doc.views && T.doc.views[D];
            F.forEach(function(te) {
              P[te] = P[te] || W;
            });
          });
        });
        var k = Object.keys(P).filter(function(T) {
          return !P[T];
        }), q = k.map(function(T) {
          return xn(p(T), function() {
            return new d.constructor(T, d.__opts).destroy();
          })();
        });
        return Promise.all(q).then(function() {
          return {
            ok: !0
          };
        });
      });
    }, s({
      ok: !0
    }));
  }
  function Q(d, g, w) {
    if (typeof d._query == "function")
      return y(d, g, w);
    if (Te(d))
      return A(d, g, w);
    var S = {
      changes_batch_size: d.__opts.view_update_changes_batch_size || Hs
    };
    if (typeof g != "string")
      return x(w, g), di.add(function() {
        var T = ci(d, "temp_view/temp_view", g.map, g.reduce, !0, e);
        return T.then(function(I) {
          return Ks(j(I, S).then(function() {
            return L(I, w);
          }), function() {
            return I.db.destroy();
          });
        });
      }), di.finish();
    var C = g, P = kn(C), k = P[0], q = P[1];
    return d.get("_design/" + k).then(function(T) {
      var I = T.views && T.views[q];
      if (!I)
        throw new hn("ddoc " + T._id + " has no view named " + q);
      r(T, q), x(w, I);
      var D = ci(d, C, I.map, I.reduce, !1, e);
      return D.then(function(E) {
        return w.stale === "ok" || w.stale === "update_after" ? (w.stale === "update_after" && _e(function() {
          j(E, S);
        }), L(E, w)) : j(E, S).then(function() {
          return L(E, w);
        });
      });
    });
  }
  function J(d, g, w) {
    var S = this;
    typeof g == "function" && (w = g, g = {}), g = g ? O(g) : {}, typeof d == "function" && (d = {
      map: d
    });
    var C = Promise.resolve().then(function() {
      return Q(S, d, g);
    });
    return ja(C, w), C;
  }
  var U = zs(function() {
    var d = this;
    return typeof d._viewCleanup == "function" ? v(d) : Te(d) ? Z(d) : Y(d);
  });
  return {
    query: J,
    viewCleanup: U
  };
}
var Cn = {
  _sum: function(e, t) {
    return Hn(t);
  },
  _count: function(e, t) {
    return t.length;
  },
  _stats: function(e, t) {
    function n(r) {
      for (var i = 0, a = 0, u = r.length; a < u; a++) {
        var o = r[a];
        i += o * o;
      }
      return i;
    }
    return {
      sum: Hn(t),
      min: Math.min.apply(null, t),
      max: Math.max.apply(null, t),
      count: t.length,
      sumsqr: n(t)
    };
  }
};
function Zs(e) {
  if (/^_sum/.test(e))
    return Cn._sum;
  if (/^_count/.test(e))
    return Cn._count;
  if (/^_stats/.test(e))
    return Cn._stats;
  if (/^_/.test(e))
    throw new Error(e + " is not a supported reduce function.");
}
function Vs(e, t) {
  if (typeof e == "function" && e.length === 2) {
    var n = e;
    return function(r) {
      return n(r, t);
    };
  } else
    return Pa(e.toString(), t);
}
function ef(e) {
  var t = e.toString(), n = Zs(t);
  return n || Pa(t);
}
function tf(e, t) {
  var n = e.views && e.views[t];
  if (typeof n.map != "string")
    throw new hn("ddoc " + e._id + " has no string view named " + t + ", instead found object of type: " + typeof n.map);
}
var nf = "mrviews", qa = Xs(nf, Vs, ef, tf);
function rf(e, t, n) {
  return qa.query.call(this, e, t, n);
}
function af(e) {
  return qa.viewCleanup.call(this, e);
}
var uf = {
  query: rf,
  viewCleanup: af
};
function hi(e) {
  return /^1-/.test(e);
}
function of(e, t, n) {
  return !e._attachments || !e._attachments[n] || e._attachments[n].digest !== t._attachments[n].digest;
}
function yi(e, t) {
  var n = Object.keys(t._attachments);
  return Promise.all(n.map(function(r) {
    return e.getAttachment(t._id, r, {
      rev: t._rev
    });
  }));
}
function sf(e, t, n) {
  var r = Te(t) && !Te(e), i = Object.keys(n._attachments);
  return r ? e.get(n._id).then(function(a) {
    return Promise.all(i.map(function(u) {
      return of(a, n, u) ? t.getAttachment(n._id, u) : e.getAttachment(a._id, u);
    }));
  }).catch(function(a) {
    if (a.status !== 404)
      throw a;
    return yi(t, n);
  }) : yi(t, n);
}
function ff(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    var r = e[n].missing;
    r.forEach(function(i) {
      t.push({
        id: n,
        rev: i
      });
    });
  }), {
    docs: t,
    revs: !0,
    latest: !0
  };
}
function cf(e, t, n, r) {
  n = le(n);
  var i = [], a = !0;
  function u() {
    var m = ff(n);
    if (!!m.docs.length)
      return e.bulkGet(m).then(function(O) {
        if (r.cancelled)
          throw new Error("cancelled");
        return Promise.all(O.results.map(function($) {
          return Promise.all($.docs.map(function(x) {
            var A = x.ok;
            return x.error && (a = !1), !A || !A._attachments ? A : sf(t, e, A).then(function(y) {
              var v = Object.keys(A._attachments);
              return y.forEach(function(s, l) {
                var h = A._attachments[v[l]];
                delete h.stub, delete h.length, h.data = s;
              }), A;
            });
          }));
        })).then(function($) {
          i = i.concat(Vt($).filter(Boolean));
        });
      });
  }
  function o(m) {
    return m._attachments && Object.keys(m._attachments).length > 0;
  }
  function f(m) {
    return m._conflicts && m._conflicts.length > 0;
  }
  function _(m) {
    return e.allDocs({
      keys: m,
      include_docs: !0,
      conflicts: !0
    }).then(function(O) {
      if (r.cancelled)
        throw new Error("cancelled");
      O.rows.forEach(function($) {
        $.deleted || !$.doc || !hi($.value.rev) || o($.doc) || f($.doc) || ($.doc._conflicts && delete $.doc._conflicts, i.push($.doc), delete n[$.id]);
      });
    });
  }
  function b() {
    var m = Object.keys(n).filter(function(O) {
      var $ = n[O].missing;
      return $.length === 1 && hi($[0]);
    });
    if (m.length > 0)
      return _(m);
  }
  function c() {
    return {
      ok: a,
      docs: i
    };
  }
  return Promise.resolve().then(b).then(u).then(c);
}
var gi = 1, pi = "pouchdb", lf = 5, Pe = 0;
function jr(e, t, n, r, i) {
  return e.get(t).catch(function(a) {
    if (a.status === 404)
      return (e.adapter === "http" || e.adapter === "https") && Ln(404, "PouchDB is just checking if a remote checkpoint exists."), {
        session_id: r,
        _id: t,
        history: [],
        replicator: pi,
        version: gi
      };
    throw a;
  }).then(function(a) {
    if (!i.cancelled && a.last_seq !== n)
      return a.history = (a.history || []).filter(function(u) {
        return u.session_id !== r;
      }), a.history.unshift({
        last_seq: n,
        session_id: r
      }), a.history = a.history.slice(0, lf), a.version = gi, a.replicator = pi, a.session_id = r, a.last_seq = n, e.put(a).catch(function(u) {
        if (u.status === 409)
          return jr(e, t, n, r, i);
        throw u;
      });
  });
}
function Dt(e, t, n, r, i) {
  this.src = e, this.target = t, this.id = n, this.returnValue = r, this.opts = i || {};
}
Dt.prototype.writeCheckpoint = function(e, t) {
  var n = this;
  return this.updateTarget(e, t).then(function() {
    return n.updateSource(e, t);
  });
};
Dt.prototype.updateTarget = function(e, t) {
  return this.opts.writeTargetCheckpoint ? jr(this.target, this.id, e, t, this.returnValue) : Promise.resolve(!0);
};
Dt.prototype.updateSource = function(e, t) {
  if (this.opts.writeSourceCheckpoint) {
    var n = this;
    return jr(this.src, this.id, e, t, this.returnValue).catch(function(r) {
      if (Ia(r))
        return n.opts.writeSourceCheckpoint = !1, !0;
      throw r;
    });
  } else
    return Promise.resolve(!0);
};
var _i = {
  undefined: function(e, t) {
    return ue(e.last_seq, t.last_seq) === 0 ? t.last_seq : 0;
  },
  1: function(e, t) {
    return df(t, e).last_seq;
  }
};
Dt.prototype.getCheckpoint = function() {
  var e = this;
  return e.opts && e.opts.writeSourceCheckpoint && !e.opts.writeTargetCheckpoint ? e.src.get(e.id).then(function(t) {
    return t.last_seq || Pe;
  }).catch(function(t) {
    if (t.status !== 404)
      throw t;
    return Pe;
  }) : e.target.get(e.id).then(function(t) {
    return e.opts && e.opts.writeTargetCheckpoint && !e.opts.writeSourceCheckpoint ? t.last_seq || Pe : e.src.get(e.id).then(function(n) {
      if (t.version !== n.version)
        return Pe;
      var r;
      return t.version ? r = t.version.toString() : r = "undefined", r in _i ? _i[r](t, n) : Pe;
    }, function(n) {
      if (n.status === 404 && t.last_seq)
        return e.src.put({
          _id: e.id,
          last_seq: Pe
        }).then(function() {
          return Pe;
        }, function(r) {
          return Ia(r) ? (e.opts.writeSourceCheckpoint = !1, t.last_seq) : Pe;
        });
      throw n;
    });
  }).catch(function(t) {
    if (t.status !== 404)
      throw t;
    return Pe;
  });
};
function df(e, t) {
  return e.session_id === t.session_id ? {
    last_seq: e.last_seq,
    history: e.history
  } : Ta(e.history, t.history);
}
function Ta(e, t) {
  var n = e[0], r = e.slice(1), i = t[0], a = t.slice(1);
  if (!n || t.length === 0)
    return {
      last_seq: Pe,
      history: []
    };
  var u = n.session_id;
  if (Yn(u, t))
    return {
      last_seq: n.last_seq,
      history: e
    };
  var o = i.session_id;
  return Yn(o, r) ? {
    last_seq: i.last_seq,
    history: a
  } : Ta(r, a);
}
function Yn(e, t) {
  var n = t[0], r = t.slice(1);
  return !e || t.length === 0 ? !1 : e === n.session_id ? !0 : Yn(e, r);
}
function Ia(e) {
  return typeof e.status == "number" && Math.floor(e.status / 100) === 4;
}
var mi = 0;
function vf(e, t, n, r) {
  if (e.retry === !1) {
    t.emit("error", n), t.removeAllListeners();
    return;
  }
  if (typeof e.back_off_function != "function" && (e.back_off_function = Nu), t.emit("requestError", n), t.state === "active" || t.state === "pending") {
    t.emit("paused", n), t.state = "stopped";
    var i = function() {
      e.current_back_off = mi;
    }, a = function() {
      t.removeListener("active", i);
    };
    t.once("paused", a), t.once("active", i);
  }
  e.current_back_off = e.current_back_off || mi, e.current_back_off = e.back_off_function(e.current_back_off), setTimeout(r, e.current_back_off);
}
function hf(e) {
  return Object.keys(e).sort(ue).reduce(function(t, n) {
    return t[n] = e[n], t;
  }, {});
}
function yf(e, t, n) {
  var r = n.doc_ids ? n.doc_ids.sort(ue) : "", i = n.filter ? n.filter.toString() : "", a = "", u = "", o = "";
  return n.selector && (o = JSON.stringify(n.selector)), n.filter && n.query_params && (a = JSON.stringify(hf(n.query_params))), n.filter && n.filter === "_view" && (u = n.view.toString()), Promise.all([e.id(), t.id()]).then(function(f) {
    var _ = f[0] + f[1] + i + u + a + r + o;
    return new Promise(function(b) {
      Or(_, b);
    });
  }).then(function(f) {
    return f = f.replace(/\//g, ".").replace(/\+/g, "_"), "_local/" + f;
  });
}
function Ba(e, t, n, r, i) {
  var a = [], u, o = {
    seq: 0,
    changes: [],
    docs: []
  }, f = !1, _ = !1, b = !1, c = 0, m = n.continuous || n.live || !1, O = n.batch_size || 100, $ = n.batches_limit || 10, x = n.style || "all_docs", A = !1, y = n.doc_ids, v = n.selector, s, l, h = [], p = vn();
  i = i || {
    ok: !0,
    start_time: new Date().toISOString(),
    docs_read: 0,
    docs_written: 0,
    doc_write_failures: 0,
    errors: []
  };
  var j = {};
  r.ready(e, t);
  function R() {
    return l ? Promise.resolve() : yf(e, t, n).then(function(k) {
      s = k;
      var q = {};
      n.checkpoint === !1 ? q = {
        writeSourceCheckpoint: !1,
        writeTargetCheckpoint: !1
      } : n.checkpoint === "source" ? q = {
        writeSourceCheckpoint: !0,
        writeTargetCheckpoint: !1
      } : n.checkpoint === "target" ? q = {
        writeSourceCheckpoint: !1,
        writeTargetCheckpoint: !0
      } : q = {
        writeSourceCheckpoint: !0,
        writeTargetCheckpoint: !0
      }, l = new Dt(e, t, s, r, q);
    });
  }
  function B() {
    if (h = [], u.docs.length !== 0) {
      var k = u.docs, q = {
        timeout: n.timeout
      };
      return t.bulkDocs({
        docs: k,
        new_edits: !1
      }, q).then(function(T) {
        if (r.cancelled)
          throw U(), new Error("cancelled");
        var I = /* @__PURE__ */ Object.create(null);
        T.forEach(function(E) {
          E.error && (I[E.id] = E);
        });
        var D = Object.keys(I).length;
        i.doc_write_failures += D, i.docs_written += k.length - D, k.forEach(function(E) {
          var F = I[E._id];
          if (F) {
            i.errors.push(F);
            var W = (F.name || "").toLowerCase();
            if (W === "unauthorized" || W === "forbidden")
              r.emit("denied", le(F));
            else
              throw F;
          } else
            h.push(E);
        });
      }, function(T) {
        throw i.doc_write_failures += k.length, T;
      });
    }
  }
  function L() {
    if (u.error)
      throw new Error("There was a problem getting docs.");
    i.last_seq = c = u.seq;
    var k = le(i);
    return h.length && (k.docs = h, typeof u.pending == "number" && (k.pending = u.pending, delete u.pending), r.emit("change", k)), f = !0, l.writeCheckpoint(u.seq, p).then(function() {
      if (r.emit("checkpoint", {
        checkpoint: u.seq
      }), f = !1, r.cancelled)
        throw U(), new Error("cancelled");
      u = void 0, S();
    }).catch(function(q) {
      throw P(q), q;
    });
  }
  function K() {
    var k = {};
    return u.changes.forEach(function(q) {
      r.emit("checkpoint", {
        revs_diff: q
      }), q.id !== "_user/" && (k[q.id] = q.changes.map(function(T) {
        return T.rev;
      }));
    }), t.revsDiff(k).then(function(q) {
      if (r.cancelled)
        throw U(), new Error("cancelled");
      u.diffs = q;
    });
  }
  function Z() {
    return cf(e, t, u.diffs, r).then(function(k) {
      u.error = !k.ok, k.docs.forEach(function(q) {
        delete u.diffs[q._id], i.docs_read++, u.docs.push(q);
      });
    });
  }
  function Y() {
    if (!(r.cancelled || u)) {
      if (a.length === 0) {
        Q(!0);
        return;
      }
      u = a.shift(), r.emit("checkpoint", {
        start_next_batch: u.seq
      }), K().then(Z).then(B).then(L).then(Y).catch(function(k) {
        J("batch processing terminated with error", k);
      });
    }
  }
  function Q(k) {
    if (o.changes.length === 0) {
      a.length === 0 && !u && ((m && j.live || _) && (r.state = "pending", r.emit("paused")), _ && U());
      return;
    }
    (k || _ || o.changes.length >= O) && (a.push(o), o = {
      seq: 0,
      changes: [],
      docs: []
    }, (r.state === "pending" || r.state === "stopped") && (r.state = "active", r.emit("active")), Y());
  }
  function J(k, q) {
    b || (q.message || (q.message = k), i.ok = !1, i.status = "aborting", a = [], o = {
      seq: 0,
      changes: [],
      docs: []
    }, U(q));
  }
  function U(k) {
    if (!b && !(r.cancelled && (i.status = "cancelled", f)))
      if (i.status = i.status || "complete", i.end_time = new Date().toISOString(), i.last_seq = c, b = !0, k) {
        k = V(k), k.result = i;
        var q = (k.name || "").toLowerCase();
        q === "unauthorized" || q === "forbidden" ? (r.emit("error", k), r.removeAllListeners()) : vf(n, r, k, function() {
          Ba(e, t, n, r);
        });
      } else
        r.emit("complete", i), r.removeAllListeners();
  }
  function d(k, q, T) {
    if (r.cancelled)
      return U();
    typeof q == "number" && (o.pending = q);
    var I = pr(n)(k);
    !I || (o.seq = k.seq || T, o.changes.push(k), r.emit("checkpoint", {
      pending_batch: o.seq
    }), _e(function() {
      Q(a.length === 0 && j.live);
    }));
  }
  function g(k) {
    if (A = !1, r.cancelled)
      return U();
    if (k.results.length > 0)
      j.since = k.results[k.results.length - 1].seq, S(), Q(!0);
    else {
      var q = function() {
        m ? (j.live = !0, S()) : _ = !0, Q(!0);
      };
      !u && k.results.length === 0 ? (f = !0, l.writeCheckpoint(k.last_seq, p).then(function() {
        f = !1, i.last_seq = c = k.last_seq, q();
      }).catch(P)) : q();
    }
  }
  function w(k) {
    if (A = !1, r.cancelled)
      return U();
    J("changes rejected", k);
  }
  function S() {
    if (!(!A && !_ && a.length < $))
      return;
    A = !0;
    function k() {
      T.cancel();
    }
    function q() {
      r.removeListener("cancel", k);
    }
    r._changes && (r.removeListener("cancel", r._abortChanges), r._changes.cancel()), r.once("cancel", k);
    var T = e.changes(j).on("change", d);
    T.then(q, q), T.then(g).catch(w), n.retry && (r._changes = T, r._abortChanges = k);
  }
  function C() {
    R().then(function() {
      if (r.cancelled) {
        U();
        return;
      }
      return l.getCheckpoint().then(function(k) {
        c = k, j = {
          since: c,
          limit: O,
          batch_size: O,
          style: x,
          doc_ids: y,
          selector: v,
          return_docs: !0
        }, n.filter && (typeof n.filter != "string" ? j.include_docs = !0 : j.filter = n.filter), "heartbeat" in n && (j.heartbeat = n.heartbeat), "timeout" in n && (j.timeout = n.timeout), n.query_params && (j.query_params = n.query_params), n.view && (j.view = n.view), S();
      });
    }).catch(function(k) {
      J("getCheckpoint rejected with ", k);
    });
  }
  function P(k) {
    f = !1, J("writeCheckpoint completed with error", k);
  }
  if (r.cancelled) {
    U();
    return;
  }
  r._addedListeners || (r.once("cancel", U), typeof n.complete == "function" && (r.once("error", n.complete), r.once("complete", function(k) {
    n.complete(null, k);
  })), r._addedListeners = !0), typeof n.since == "undefined" ? C() : R().then(function() {
    return f = !0, l.writeCheckpoint(n.since, p);
  }).then(function() {
    if (f = !1, r.cancelled) {
      U();
      return;
    }
    c = n.since, C();
  }).catch(P);
}
ve.exports(gn, de.exports);
function gn() {
  de.exports.call(this), this.cancelled = !1, this.state = "pending";
  var e = this, t = new Promise(function(n, r) {
    e.once("complete", n), e.once("error", r);
  });
  e.then = function(n, r) {
    return t.then(n, r);
  }, e.catch = function(n) {
    return t.catch(n);
  }, e.catch(function() {
  });
}
gn.prototype.cancel = function() {
  this.cancelled = !0, this.state = "cancelled", this.emit("cancel");
};
gn.prototype.ready = function(e, t) {
  var n = this;
  if (n._readyCalled)
    return;
  n._readyCalled = !0;
  function r() {
    n.cancel();
  }
  e.once("destroyed", r), t.once("destroyed", r);
  function i() {
    e.removeListener("destroyed", r), t.removeListener("destroyed", r);
  }
  n.once("complete", i), n.once("error", i);
};
function nn(e, t) {
  var n = t.PouchConstructor;
  return typeof e == "string" ? new n(e, t) : e;
}
function Xn(e, t, n, r) {
  if (typeof n == "function" && (r = n, n = {}), typeof n == "undefined" && (n = {}), n.doc_ids && !Array.isArray(n.doc_ids))
    throw V(ln, "`doc_ids` filter parameter is not a list.");
  n.complete = r, n = le(n), n.continuous = n.continuous || n.live, n.retry = "retry" in n ? n.retry : !1, n.PouchConstructor = n.PouchConstructor || this;
  var i = new gn(), a = nn(e, n), u = nn(t, n);
  return Ba(a, u, n, i), i;
}
ve.exports(Pr, de.exports);
function gf(e, t, n, r) {
  return typeof n == "function" && (r = n, n = {}), typeof n == "undefined" && (n = {}), n = le(n), n.PouchConstructor = n.PouchConstructor || this, e = nn(e, n), t = nn(t, n), new Pr(e, t, n, r);
}
function Pr(e, t, n, r) {
  var i = this;
  this.canceled = !1;
  var a = n.push ? We({}, n, n.push) : n, u = n.pull ? We({}, n, n.pull) : n;
  this.push = Xn(e, t, a), this.pull = Xn(t, e, u), this.pushPaused = !0, this.pullPaused = !0;
  function o(s) {
    i.emit("change", {
      direction: "pull",
      change: s
    });
  }
  function f(s) {
    i.emit("change", {
      direction: "push",
      change: s
    });
  }
  function _(s) {
    i.emit("denied", {
      direction: "push",
      doc: s
    });
  }
  function b(s) {
    i.emit("denied", {
      direction: "pull",
      doc: s
    });
  }
  function c() {
    i.pushPaused = !0, i.pullPaused && i.emit("paused");
  }
  function m() {
    i.pullPaused = !0, i.pushPaused && i.emit("paused");
  }
  function O() {
    i.pushPaused = !1, i.pullPaused && i.emit("active", {
      direction: "push"
    });
  }
  function $() {
    i.pullPaused = !1, i.pushPaused && i.emit("active", {
      direction: "pull"
    });
  }
  var x = {};
  function A(s) {
    return function(l, h) {
      var p = l === "change" && (h === o || h === f), j = l === "denied" && (h === b || h === _), R = l === "paused" && (h === m || h === c), B = l === "active" && (h === $ || h === O);
      (p || j || R || B) && (l in x || (x[l] = {}), x[l][s] = !0, Object.keys(x[l]).length === 2 && i.removeAllListeners(l));
    };
  }
  n.live && (this.push.on("complete", i.pull.cancel.bind(i.pull)), this.pull.on("complete", i.push.cancel.bind(i.push)));
  function y(s, l, h) {
    s.listeners(l).indexOf(h) == -1 && s.on(l, h);
  }
  this.on("newListener", function(s) {
    s === "change" ? (y(i.pull, "change", o), y(i.push, "change", f)) : s === "denied" ? (y(i.pull, "denied", b), y(i.push, "denied", _)) : s === "active" ? (y(i.pull, "active", $), y(i.push, "active", O)) : s === "paused" && (y(i.pull, "paused", m), y(i.push, "paused", c));
  }), this.on("removeListener", function(s) {
    s === "change" ? (i.pull.removeListener("change", o), i.push.removeListener("change", f)) : s === "denied" ? (i.pull.removeListener("denied", b), i.push.removeListener("denied", _)) : s === "active" ? (i.pull.removeListener("active", $), i.push.removeListener("active", O)) : s === "paused" && (i.pull.removeListener("paused", m), i.push.removeListener("paused", c));
  }), this.pull.on("removeListener", A("pull")), this.push.on("removeListener", A("push"));
  var v = Promise.all([this.push, this.pull]).then(function(s) {
    var l = {
      push: s[0],
      pull: s[1]
    };
    return i.emit("complete", l), r && r(null, l), i.removeAllListeners(), l;
  }, function(s) {
    if (i.cancel(), r ? r(s) : i.emit("error", s), i.removeAllListeners(), r)
      throw s;
  });
  this.then = function(s, l) {
    return v.then(s, l);
  }, this.catch = function(s) {
    return v.catch(s);
  };
}
Pr.prototype.cancel = function() {
  this.canceled || (this.canceled = !0, this.push.cancel(), this.pull.cancel());
};
function pf(e) {
  e.replicate = Xn, e.sync = gf, Object.defineProperty(e.prototype, "replicate", {
    get: function() {
      var t = this;
      return typeof this.replicateMethods == "undefined" && (this.replicateMethods = {
        from: function(n, r, i) {
          return t.constructor.replicate(n, t, r, i);
        },
        to: function(n, r, i) {
          return t.constructor.replicate(t, n, r, i);
        }
      }), this.replicateMethods;
    }
  }), e.prototype.sync = function(t, n, r) {
    return this.constructor.sync(this, t, n, r);
  };
}
H.plugin(Is).plugin(Us).plugin(uf).plugin(pf);
ve.exports(ie, Error);
function ie(e, t, n) {
  Error.call(this, n), this.status = e, this.name = t, this.message = n, this.error = !0;
}
ie.prototype.toString = function() {
  return JSON.stringify({
    status: this.status,
    name: this.name,
    message: this.message,
    reason: this.reason
  });
};
new ie(401, "unauthorized", "Name or password is incorrect.");
new ie(400, "bad_request", "Missing JSON list of 'docs'");
new ie(404, "not_found", "missing");
new ie(409, "conflict", "Document update conflict");
new ie(400, "bad_request", "_id field must contain a string");
new ie(412, "missing_id", "_id is required for puts");
new ie(400, "bad_request", "Only reserved document ids may start with underscore.");
new ie(412, "precondition_failed", "Database not open");
var _f = new ie(500, "unknown_error", "Database encountered an unknown error");
new ie(500, "badarg", "Some query argument is invalid");
new ie(400, "invalid_request", "Request was invalid");
new ie(400, "query_parse_error", "Some query parameter is invalid");
new ie(500, "doc_validation", "Bad special document member");
new ie(400, "bad_request", "Something wrong with the request");
new ie(400, "bad_request", "Document must be a JSON object");
new ie(404, "not_found", "Database not found");
new ie(500, "indexed_db_went_bad", "unknown");
new ie(500, "web_sql_went_bad", "unknown");
new ie(500, "levelDB_went_went_bad", "unknown");
new ie(403, "forbidden", "Forbidden by design doc validate_doc_update function");
new ie(400, "bad_request", "Invalid rev format");
new ie(412, "file_exists", "The database could not be created, the file already exists.");
new ie(412, "missing_stub", "A pre-existing attachment stub wasn't found");
new ie(413, "invalid_url", "Provided URL is invalid");
function Zn(e) {
  if (typeof e != "object") {
    var t = e;
    e = _f, e.data = t;
  }
  return "error" in e && e.error === "conflict" && (e.name = "conflict", e.status = 409), "name" in e || (e.name = e.error || "unknown"), "status" in e || (e.status = 500), "message" in e || (e.message = e.message || e.reason), "stack" in e || (e.stack = new Error().stack), e;
}
var Xt = Headers;
function pn(e) {
  return "$" + e;
}
function Ra(e) {
  return e.substring(1);
}
function Le() {
  this._store = {};
}
Le.prototype.get = function(e) {
  var t = pn(e);
  return this._store[t];
};
Le.prototype.set = function(e, t) {
  var n = pn(e);
  return this._store[n] = t, !0;
};
Le.prototype.has = function(e) {
  var t = pn(e);
  return t in this._store;
};
Le.prototype.keys = function() {
  return Object.keys(this._store).map((e) => Ra(e));
};
Le.prototype.delete = function(e) {
  var t = pn(e), n = t in this._store;
  return delete this._store[t], n;
};
Le.prototype.forEach = function(e) {
  for (var t = Object.keys(this._store), n = 0, r = t.length; n < r; n++) {
    var i = t[n], a = this._store[i];
    i = Ra(i), e(a, i);
  }
};
Object.defineProperty(Le.prototype, "size", {
  get: function() {
    return Object.keys(this._store).length;
  }
});
function Nt(e) {
  if (this._store = new Le(), e && Array.isArray(e))
    for (var t = 0, n = e.length; t < n; t++)
      this.add(e[t]);
}
Nt.prototype.add = function(e) {
  return this._store.set(e, !0);
};
Nt.prototype.has = function(e) {
  return this._store.has(e);
};
Nt.prototype.forEach = function(e) {
  this._store.forEach(function(t, n) {
    e(n);
  });
};
Object.defineProperty(Nt.prototype, "size", {
  get: function() {
    return this._store.size;
  }
});
function mf() {
  if (typeof Symbol == "undefined" || typeof Map == "undefined" || typeof Set == "undefined")
    return !1;
  var e = Object.getOwnPropertyDescriptor(Map, Symbol.species);
  return e && "get" in e && Map[Symbol.species] === Map;
}
var Ct, it;
mf() ? (Ct = Set, it = Map) : (Ct = Nt, it = Le);
var wf = function(e) {
  return atob(e);
};
function bf(e, t) {
  e = e || [], t = t || {};
  try {
    return new Blob(e, t);
  } catch (a) {
    if (a.name !== "TypeError")
      throw a;
    for (var n = typeof BlobBuilder != "undefined" ? BlobBuilder : typeof MSBlobBuilder != "undefined" ? MSBlobBuilder : typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : WebKitBlobBuilder, r = new n(), i = 0; i < e.length; i += 1)
      r.append(e[i]);
    return r.getBlob(t.type);
  }
}
function $f(e) {
  for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), i = 0; i < t; i++)
    r[i] = e.charCodeAt(i);
  return n;
}
function Af(e, t) {
  return bf([$f(e)], {
    type: t
  });
}
function Of(e, t) {
  return Af(wf(e), t);
}
function Sf(e, t, n) {
  for (var r = "", i = n - e.length; r.length < i; )
    r += t;
  return r;
}
function xf(e, t, n) {
  var r = Sf(e, t, n);
  return r + e;
}
var La = -324, Vn = 3, er = "";
function se(e, t) {
  if (e === t)
    return 0;
  e = Ze(e), t = Ze(t);
  var n = tr(e), r = tr(t);
  if (n - r !== 0)
    return n - r;
  switch (typeof e) {
    case "number":
      return e - t;
    case "boolean":
      return e < t ? -1 : 1;
    case "string":
      return qf(e, t);
  }
  return Array.isArray(e) ? Pf(e, t) : Tf(e, t);
}
function Ze(e) {
  switch (typeof e) {
    case "undefined":
      return null;
    case "number":
      return e === 1 / 0 || e === -1 / 0 || isNaN(e) ? null : e;
    case "object":
      var t = e;
      if (Array.isArray(e)) {
        var n = e.length;
        e = new Array(n);
        for (var r = 0; r < n; r++)
          e[r] = Ze(t[r]);
      } else {
        if (e instanceof Date)
          return e.toJSON();
        if (e !== null) {
          e = {};
          for (var i in t)
            if (Object.prototype.hasOwnProperty.call(t, i)) {
              var a = t[i];
              typeof a != "undefined" && (e[i] = Ze(a));
            }
        }
      }
  }
  return e;
}
function Ef(e) {
  if (e !== null)
    switch (typeof e) {
      case "boolean":
        return e ? 1 : 0;
      case "number":
        return If(e);
      case "string":
        return e.replace(/\u0002/g, "").replace(/\u0001/g, "").replace(/\u0000/g, "");
      case "object":
        var t = Array.isArray(e), n = t ? e : Object.keys(e), r = -1, i = n.length, a = "";
        if (t)
          for (; ++r < i; )
            a += ke(n[r]);
        else
          for (; ++r < i; ) {
            var u = n[r];
            a += ke(u) + ke(e[u]);
          }
        return a;
    }
  return "";
}
function ke(e) {
  var t = "\0";
  return e = Ze(e), tr(e) + er + Ef(e) + t;
}
function kf(e, t) {
  var n = t, r, i = e[t] === "1";
  if (i)
    r = 0, t++;
  else {
    var a = e[t] === "0";
    t++;
    var u = "", o = e.substring(t, t + Vn), f = parseInt(o, 10) + La;
    for (a && (f = -f), t += Vn; ; ) {
      var _ = e[t];
      if (_ === "\0")
        break;
      u += _, t++;
    }
    u = u.split("."), u.length === 1 ? r = parseInt(u, 10) : r = parseFloat(u[0] + "." + u[1]), a && (r = r - 10), f !== 0 && (r = parseFloat(r + "e" + f));
  }
  return {
    num: r,
    length: t - n
  };
}
function Cf(e, t) {
  var n = e.pop();
  if (t.length) {
    var r = t[t.length - 1];
    n === r.element && (t.pop(), r = t[t.length - 1]);
    var i = r.element, a = r.index;
    if (Array.isArray(i))
      i.push(n);
    else if (a === e.length - 2) {
      var u = e.pop();
      i[u] = n;
    } else
      e.push(n);
  }
}
function jf(e) {
  for (var t = [], n = [], r = 0; ; ) {
    var i = e[r++];
    if (i === "\0") {
      if (t.length === 1)
        return t.pop();
      Cf(t, n);
      continue;
    }
    switch (i) {
      case "1":
        t.push(null);
        break;
      case "2":
        t.push(e[r] === "1"), r++;
        break;
      case "3":
        var a = kf(e, r);
        t.push(a.num), r += a.length;
        break;
      case "4":
        for (var u = ""; ; ) {
          var o = e[r];
          if (o === "\0")
            break;
          u += o, r++;
        }
        u = u.replace(/\u0001\u0001/g, "\0").replace(/\u0001\u0002/g, "").replace(/\u0002\u0002/g, ""), t.push(u);
        break;
      case "5":
        var f = {
          element: [],
          index: t.length
        };
        t.push(f.element), n.push(f);
        break;
      case "6":
        var _ = {
          element: {},
          index: t.length
        };
        t.push(_.element), n.push(_);
        break;
      default:
        throw new Error("bad collationIndex or unexpectedly reached end of input: " + i);
    }
  }
}
function Pf(e, t) {
  for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) {
    var i = se(e[r], t[r]);
    if (i !== 0)
      return i;
  }
  return e.length === t.length ? 0 : e.length > t.length ? 1 : -1;
}
function qf(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function Tf(e, t) {
  for (var n = Object.keys(e), r = Object.keys(t), i = Math.min(n.length, r.length), a = 0; a < i; a++) {
    var u = se(n[a], r[a]);
    if (u !== 0 || (u = se(e[n[a]], t[r[a]]), u !== 0))
      return u;
  }
  return n.length === r.length ? 0 : n.length > r.length ? 1 : -1;
}
function tr(e) {
  var t = ["boolean", "number", "string", "object"], n = t.indexOf(typeof e);
  if (~n)
    return e === null ? 1 : Array.isArray(e) ? 5 : n < 3 ? n + 2 : n + 3;
  if (Array.isArray(e))
    return 5;
}
function If(e) {
  if (e === 0)
    return "1";
  var t = e.toExponential().split(/e\+?/), n = parseInt(t[1], 10), r = e < 0, i = r ? "0" : "2", a = (r ? -n : n) - La, u = xf(a.toString(), "0", Vn);
  i += er + u;
  var o = Math.abs(parseFloat(t[0]));
  r && (o = 10 - o);
  var f = o.toFixed(20);
  return f = f.replace(/\.?0+$/, ""), i += er + f, i;
}
function Da(e) {
  return Zt.hash(e);
}
function Bf(e) {
  return typeof ArrayBuffer != "undefined" && e instanceof ArrayBuffer || typeof Blob != "undefined" && e instanceof Blob;
}
function Rf(e) {
  if (typeof e.slice == "function")
    return e.slice(0);
  var t = new ArrayBuffer(e.byteLength), n = new Uint8Array(t), r = new Uint8Array(e);
  return n.set(r), t;
}
function Lf(e) {
  if (e instanceof ArrayBuffer)
    return Rf(e);
  var t = e.size, n = e.type;
  return typeof e.slice == "function" ? e.slice(0, t, n) : e.webkitSlice(0, t, n);
}
var Na = Function.prototype.toString, Df = Na.call(Object);
function Nf(e) {
  var t = Object.getPrototypeOf(e);
  if (t === null)
    return !0;
  var n = t.constructor;
  return typeof n == "function" && n instanceof n && Na.call(n) == Df;
}
function Ne(e) {
  var t, n, r;
  if (!e || typeof e != "object")
    return e;
  if (Array.isArray(e)) {
    for (t = [], n = 0, r = e.length; n < r; n++)
      t[n] = Ne(e[n]);
    return t;
  }
  if (e instanceof Date && isFinite(e))
    return e.toISOString();
  if (Bf(e))
    return Lf(e);
  if (!Nf(e))
    return e;
  t = {};
  for (n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      var i = Ne(e[n]);
      typeof i != "undefined" && (t[n] = i);
    }
  return t;
}
function Ff(e) {
  var t = !1;
  return Be(function(n) {
    if (t)
      throw new Error("once called more than once");
    t = !0, e.apply(this, n);
  });
}
function Ft(e) {
  return Be(function(t) {
    t = Ne(t);
    var n = this, r = typeof t[t.length - 1] == "function" ? t.pop() : !1, i = new Promise(function(a, u) {
      var o;
      try {
        var f = Ff(function(_, b) {
          _ ? u(_) : a(b);
        });
        t.push(f), o = e.apply(n, t), o && typeof o.then == "function" && a(o);
      } catch (_) {
        u(_);
      }
    });
    return r && i.then(function(a) {
      r(null, a);
    }, r), i;
  });
}
function Mf(e, t) {
  for (var n = {}, r = 0, i = t.length; r < i; r++) {
    var a = t[r];
    a in e && (n[a] = e[a]);
  }
  return n;
}
var nr;
try {
  localStorage.setItem("_pouch_check_localstorage", 1), nr = !!localStorage.getItem("_pouch_check_localstorage");
} catch (e) {
  nr = !1;
}
function Fa() {
  return nr;
}
ve.exports(Mt, de.exports);
function Uf(e) {
  Fa() && addEventListener("storage", function(t) {
    e.emit(t.key);
  });
}
function Mt() {
  de.exports.call(this), this._listeners = {}, Uf(this);
}
Mt.prototype.addListener = function(e, t, n, r) {
  if (this._listeners[t])
    return;
  var i = this, a = !1;
  function u() {
    if (!i._listeners[t])
      return;
    if (a) {
      a = "waiting";
      return;
    }
    a = !0;
    var o = Mf(r, ["style", "include_docs", "attachments", "conflicts", "filter", "doc_ids", "view", "since", "query_params", "binary", "return_docs"]);
    function f() {
      a = !1;
    }
    n.changes(o).on("change", function(_) {
      _.seq > r.since && !r.cancelled && (r.since = _.seq, r.onChange(_));
    }).on("complete", function() {
      a === "waiting" && _e(u), a = !1;
    }).on("error", f);
  }
  this._listeners[t] = u, this.on(e, u);
};
Mt.prototype.removeListener = function(e, t) {
  t in this._listeners && (de.exports.prototype.removeListener.call(this, e, this._listeners[t]), delete this._listeners[t]);
};
Mt.prototype.notifyLocalWindows = function(e) {
  Fa() && (localStorage[e] = localStorage[e] === "a" ? "b" : "a");
};
Mt.prototype.notify = function(e) {
  this.emit(e), this.notifyLocalWindows(e);
};
function rr(e) {
  if (typeof console != "undefined" && typeof console[e] == "function") {
    var t = Array.prototype.slice.call(arguments, 1);
    console[e].apply(console, t);
  }
}
var ir;
typeof Object.assign == "function" ? ir = Object.assign : ir = function(e) {
  for (var t = Object(e), n = 1; n < arguments.length; n++) {
    var r = arguments[n];
    if (r != null)
      for (var i in r)
        Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
  }
  return t;
};
var qr = ir;
function wi(e) {
  for (var t = [], n = 0, r = e.length; n < r; n++)
    t = t.concat(e[n]);
  return t;
}
function Ve(e) {
  return typeof e._remote == "boolean" ? e._remote : typeof e.type == "function" ? (rr("warn", "db.type() is deprecated and will be removed in a future version of PouchDB"), e.type() === "http") : !1;
}
function _n(e, t, n) {
  return e.get(t).catch(function(r) {
    if (r.status !== 404)
      throw r;
    return {};
  }).then(function(r) {
    var i = r._rev, a = n(r);
    return a ? (a._id = t, a._rev = i, zf(e, a, n)) : {
      updated: !1,
      rev: i
    };
  });
}
function zf(e, t, n) {
  return e.put(t).then(function(r) {
    return {
      updated: !0,
      rev: r.rev
    };
  }, function(r) {
    if (r.status !== 409)
      throw r;
    return _n(e, t._id, n);
  });
}
function Ke(e) {
  this.status = 400, this.name = "query_parse_error", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, Ke);
  } catch (t) {
  }
}
ve.exports(Ke, Error);
function Tr(e) {
  this.status = 404, this.name = "not_found", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, Tr);
  } catch (t) {
  }
}
ve.exports(Tr, Error);
function Ir(e) {
  this.status = 500, this.name = "invalid_value", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, Ir);
  } catch (t) {
  }
}
ve.exports(Ir, Error);
function Ma(e, t) {
  return t && e.then(function(n) {
    _e(function() {
      t(null, n);
    });
  }, function(n) {
    _e(function() {
      t(n);
    });
  }), e;
}
function Kf(e) {
  return Be(function(t) {
    var n = t.pop(), r = e.apply(this, t);
    return typeof n == "function" && Ma(r, n), r;
  });
}
function Qf(e, t) {
  return e.then(function(n) {
    return t().then(function() {
      return n;
    });
  }, function(n) {
    return t().then(function() {
      throw n;
    });
  });
}
function jn(e, t) {
  return function() {
    var n = arguments, r = this;
    return e.add(function() {
      return t.apply(r, n);
    });
  };
}
function bi(e) {
  var t = new Ct(e), n = new Array(t.size), r = -1;
  return t.forEach(function(i) {
    n[++r] = i;
  }), n;
}
function Pn(e) {
  var t = new Array(e.size), n = -1;
  return e.forEach(function(r, i) {
    t[++n] = i;
  }), t;
}
function jt() {
  this.promise = new Promise(function(e) {
    e();
  });
}
jt.prototype.add = function(e) {
  return this.promise = this.promise.catch(function() {
  }).then(function() {
    return e();
  }), this.promise;
};
jt.prototype.finish = function() {
  return this.promise;
};
function $i(e) {
  if (!e)
    return "undefined";
  switch (typeof e) {
    case "function":
      return e.toString();
    case "string":
      return e.toString();
    default:
      return JSON.stringify(e);
  }
}
function Gf(e, t) {
  return $i(e) + $i(t) + "undefined";
}
function Ai(e, t, n, r, i, a) {
  var u = Gf(n, r), o;
  if (!i && (o = e._cachedViews = e._cachedViews || {}, o[u]))
    return o[u];
  var f = e.info().then(function(_) {
    var b = _.db_name + "-mrview-" + (i ? "temp" : Da(u));
    function c(m) {
      m.views = m.views || {};
      var O = t;
      O.indexOf("/") === -1 && (O = t + "/" + t);
      var $ = m.views[O] = m.views[O] || {};
      if (!$[b])
        return $[b] = !0, m;
    }
    return _n(e, "_local/" + a, c).then(function() {
      return e.registerDependentDatabase(b).then(function(m) {
        var O = m.db;
        O.auto_compaction = !0;
        var $ = {
          name: b,
          db: O,
          sourceDB: e,
          adapter: e.adapter,
          mapFun: n,
          reduceFun: r
        };
        return $.db.get("_local/lastSeq").catch(function(x) {
          if (x.status !== 404)
            throw x;
        }).then(function(x) {
          return $.seq = x ? x.seq : 0, o && $.db.once("destroyed", function() {
            delete o[u];
          }), $;
        });
      });
    });
  });
  return o && (o[u] = f), f;
}
var Oi = {}, Si = new jt(), Jf = 50;
function qn(e) {
  return e.indexOf("/") === -1 ? [e, e] : e.split("/");
}
function Wf(e) {
  return e.length === 1 && /^1-/.test(e[0].rev);
}
function xi(e, t, n) {
  try {
    e.emit("error", t);
  } catch (r) {
    rr("error", `The user's map/reduce function threw an uncaught error.
You can debug this error by doing:
myDatabase.on('error', function (err) { debugger; });
Please double-check your map/reduce function.`), rr("error", t, n);
  }
}
function Hf(e, t, n, r) {
  function i(d, g, w) {
    try {
      g(w);
    } catch (S) {
      xi(d, S, {
        fun: g,
        doc: w
      });
    }
  }
  function a(d, g, w, S, C) {
    try {
      return {
        output: g(w, S, C)
      };
    } catch (P) {
      return xi(d, P, {
        fun: g,
        keys: w,
        values: S,
        rereduce: C
      }), {
        error: P
      };
    }
  }
  function u(d, g) {
    var w = se(d.key, g.key);
    return w !== 0 ? w : se(d.value, g.value);
  }
  function o(d, g, w) {
    return w = w || 0, typeof g == "number" ? d.slice(w, g + w) : w > 0 ? d.slice(w) : d;
  }
  function f(d) {
    var g = d.value, w = g && typeof g == "object" && g._id || d.id;
    return w;
  }
  function _(d) {
    d.rows.forEach(function(g) {
      var w = g.doc && g.doc._attachments;
      !w || Object.keys(w).forEach(function(S) {
        var C = w[S];
        w[S].data = Of(C.data, C.content_type);
      });
    });
  }
  function b(d) {
    return function(g) {
      return d.include_docs && d.attachments && d.binary && _(g), g;
    };
  }
  function c(d, g, w, S) {
    var C = g[d];
    typeof C != "undefined" && (S && (C = encodeURIComponent(JSON.stringify(C))), w.push(d + "=" + C));
  }
  function m(d) {
    if (typeof d != "undefined") {
      var g = Number(d);
      return !isNaN(g) && g === parseInt(d, 10) ? g : d;
    }
  }
  function O(d) {
    return d.group_level = m(d.group_level), d.limit = m(d.limit), d.skip = m(d.skip), d;
  }
  function $(d) {
    if (d) {
      if (typeof d != "number")
        return new Ke('Invalid value for integer: "' + d + '"');
      if (d < 0)
        return new Ke('Invalid value for positive integer: "' + d + '"');
    }
  }
  function x(d, g) {
    var w = d.descending ? "endkey" : "startkey", S = d.descending ? "startkey" : "endkey";
    if (typeof d[w] != "undefined" && typeof d[S] != "undefined" && se(d[w], d[S]) > 0)
      throw new Ke("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");
    if (g.reduce && d.reduce !== !1) {
      if (d.include_docs)
        throw new Ke("{include_docs:true} is invalid for reduce");
      if (d.keys && d.keys.length > 1 && !d.group && !d.group_level)
        throw new Ke("Multi-key fetches for reduce views must use {group: true}");
    }
    ["group_level", "limit", "skip"].forEach(function(C) {
      var P = $(d[C]);
      if (P)
        throw P;
    });
  }
  function A(d, g, w) {
    var S = [], C, P = "GET", k, q;
    if (c("reduce", w, S), c("include_docs", w, S), c("attachments", w, S), c("limit", w, S), c("descending", w, S), c("group", w, S), c("group_level", w, S), c("skip", w, S), c("stale", w, S), c("conflicts", w, S), c("startkey", w, S, !0), c("start_key", w, S, !0), c("endkey", w, S, !0), c("end_key", w, S, !0), c("inclusive_end", w, S), c("key", w, S, !0), c("update_seq", w, S), S = S.join("&"), S = S === "" ? "" : "?" + S, typeof w.keys != "undefined") {
      var T = 2e3, I = "keys=" + encodeURIComponent(JSON.stringify(w.keys));
      I.length + S.length + 1 <= T ? S += (S[0] === "?" ? "&" : "?") + I : (P = "POST", typeof g == "string" ? C = {
        keys: w.keys
      } : g.keys = w.keys);
    }
    if (typeof g == "string") {
      var D = qn(g);
      return d.fetch("_design/" + D[0] + "/_view/" + D[1] + S, {
        headers: new Xt({
          "Content-Type": "application/json"
        }),
        method: P,
        body: JSON.stringify(C)
      }).then(function(E) {
        return k = E.ok, q = E.status, E.json();
      }).then(function(E) {
        if (!k)
          throw E.status = q, Zn(E);
        return E.rows.forEach(function(F) {
          if (F.value && F.value.error && F.value.error === "builtin_reduce_error")
            throw new Error(F.reason);
        }), E;
      }).then(b(w));
    }
    return C = C || {}, Object.keys(g).forEach(function(E) {
      Array.isArray(g[E]) ? C[E] = g[E] : C[E] = g[E].toString();
    }), d.fetch("_temp_view" + S, {
      headers: new Xt({
        "Content-Type": "application/json"
      }),
      method: "POST",
      body: JSON.stringify(C)
    }).then(function(E) {
      return k = E.ok, q = E.status, E.json();
    }).then(function(E) {
      if (!k)
        throw E.status = q, Zn(E);
      return E;
    }).then(b(w));
  }
  function y(d, g, w) {
    return new Promise(function(S, C) {
      d._query(g, w, function(P, k) {
        if (P)
          return C(P);
        S(k);
      });
    });
  }
  function v(d) {
    return new Promise(function(g, w) {
      d._viewCleanup(function(S, C) {
        if (S)
          return w(S);
        g(C);
      });
    });
  }
  function s(d) {
    return function(g) {
      if (g.status === 404)
        return d;
      throw g;
    };
  }
  function l(d, g, w) {
    var S = "_local/doc_" + d, C = {
      _id: S,
      keys: []
    }, P = w.get(d), k = P[0], q = P[1];
    function T() {
      return Wf(q) ? Promise.resolve(C) : g.db.get(S).catch(s(C));
    }
    function I(E) {
      return E.keys.length ? g.db.allDocs({
        keys: E.keys,
        include_docs: !0
      }) : Promise.resolve({
        rows: []
      });
    }
    function D(E, F) {
      for (var W = [], te = new Ct(), M = 0, N = F.rows.length; M < N; M++) {
        var z = F.rows[M], G = z.doc;
        if (!!G && (W.push(G), te.add(G._id), G._deleted = !k.has(G._id), !G._deleted)) {
          var ee = k.get(G._id);
          "value" in ee && (G.value = ee.value);
        }
      }
      var X = Pn(k);
      return X.forEach(function(he) {
        if (!te.has(he)) {
          var Se = {
            _id: he
          }, _t = k.get(he);
          "value" in _t && (Se.value = _t.value), W.push(Se);
        }
      }), E.keys = bi(X.concat(E.keys)), W.push(E), W;
    }
    return T().then(function(E) {
      return I(E).then(function(F) {
        return D(E, F);
      });
    });
  }
  function h(d, g, w) {
    var S = "_local/lastSeq";
    return d.db.get(S).catch(s({
      _id: S,
      seq: 0
    })).then(function(C) {
      var P = Pn(g);
      return Promise.all(P.map(function(k) {
        return l(k, d, g);
      })).then(function(k) {
        var q = wi(k);
        return C.seq = w, q.push(C), d.db.bulkDocs({
          docs: q
        });
      });
    });
  }
  function p(d) {
    var g = typeof d == "string" ? d : d.name, w = Oi[g];
    return w || (w = Oi[g] = new jt()), w;
  }
  function j(d, g) {
    return jn(p(d), function() {
      return R(d, g);
    })();
  }
  function R(d, g) {
    var w, S;
    function C(M, N) {
      var z = {
        id: S._id,
        key: Ze(M)
      };
      typeof N != "undefined" && N !== null && (z.value = Ze(N)), w.push(z);
    }
    var P = t(d.mapFun, C), k = d.seq || 0;
    function q(M, N) {
      return function() {
        return h(d, M, N);
      };
    }
    let T = 0, I = {
      view: d.name,
      indexed_docs: T
    };
    d.sourceDB.emit("indexing", I);
    var D = new jt();
    function E() {
      return d.sourceDB.changes({
        return_docs: !0,
        conflicts: !0,
        include_docs: !0,
        style: "all_docs",
        since: k,
        limit: g.changes_batch_size
      }).then(F);
    }
    function F(M) {
      var N = M.results;
      if (!N.length)
        return;
      var z = W(N);
      D.add(q(z, k)), T = T + N.length;
      let G = {
        view: d.name,
        last_seq: M.last_seq,
        results_count: N.length,
        indexed_docs: T
      };
      if (d.sourceDB.emit("indexing", G), !(N.length < g.changes_batch_size))
        return E();
    }
    function W(M) {
      for (var N = new it(), z = 0, G = M.length; z < G; z++) {
        var ee = M[z];
        if (ee.doc._id[0] !== "_") {
          w = [], S = ee.doc, S._deleted || i(d.sourceDB, P, S), w.sort(u);
          var X = te(w);
          N.set(ee.doc._id, [X, ee.changes]);
        }
        k = ee.seq;
      }
      return N;
    }
    function te(M) {
      for (var N = new it(), z, G = 0, ee = M.length; G < ee; G++) {
        var X = M[G], he = [X.key, X.id];
        G > 0 && se(X.key, z) === 0 && he.push(G), N.set(ke(he), X), z = X.key;
      }
      return N;
    }
    return E().then(function() {
      return D.finish();
    }).then(function() {
      d.seq = k;
    });
  }
  function B(d, g, w) {
    w.group_level === 0 && delete w.group_level;
    var S = w.group || w.group_level, C = n(d.reduceFun), P = [], k = isNaN(w.group_level) ? Number.POSITIVE_INFINITY : w.group_level;
    g.forEach(function(E) {
      var F = P[P.length - 1], W = S ? E.key : null;
      if (S && Array.isArray(W) && (W = W.slice(0, k)), F && se(F.groupKey, W) === 0) {
        F.keys.push([E.key, E.id]), F.values.push(E.value);
        return;
      }
      P.push({
        keys: [[E.key, E.id]],
        values: [E.value],
        groupKey: W
      });
    }), g = [];
    for (var q = 0, T = P.length; q < T; q++) {
      var I = P[q], D = a(d.sourceDB, C, I.keys, I.values, !1);
      if (D.error && D.error instanceof Ir)
        throw D.error;
      g.push({
        value: D.error ? null : D.output,
        key: I.groupKey
      });
    }
    return {
      rows: o(g, w.limit, w.skip)
    };
  }
  function L(d, g) {
    return jn(p(d), function() {
      return K(d, g);
    })();
  }
  function K(d, g) {
    var w, S = d.reduceFun && g.reduce !== !1, C = g.skip || 0;
    typeof g.keys != "undefined" && !g.keys.length && (g.limit = 0, delete g.keys);
    function P(M) {
      return M.include_docs = !0, d.db.allDocs(M).then(function(N) {
        return w = N.total_rows, N.rows.map(function(z) {
          if ("value" in z.doc && typeof z.doc.value == "object" && z.doc.value !== null) {
            var G = Object.keys(z.doc.value).sort(), ee = ["id", "key", "value"];
            if (!(G < ee || G > ee))
              return z.doc.value;
          }
          var X = jf(z.doc._id);
          return {
            key: X[0],
            id: X[1],
            value: "value" in z.doc ? z.doc.value : null
          };
        });
      });
    }
    function k(M) {
      var N;
      if (S ? N = B(d, M, g) : typeof g.keys == "undefined" ? N = {
        total_rows: w,
        offset: C,
        rows: M
      } : N = {
        total_rows: w,
        offset: C,
        rows: o(M, g.limit, g.skip)
      }, g.update_seq && (N.update_seq = d.seq), g.include_docs) {
        var z = bi(M.map(f));
        return d.sourceDB.allDocs({
          keys: z,
          include_docs: !0,
          conflicts: g.conflicts,
          attachments: g.attachments,
          binary: g.binary
        }).then(function(G) {
          var ee = new it();
          return G.rows.forEach(function(X) {
            ee.set(X.id, X.doc);
          }), M.forEach(function(X) {
            var he = f(X), Se = ee.get(he);
            Se && (X.doc = Se);
          }), N;
        });
      } else
        return N;
    }
    if (typeof g.keys != "undefined") {
      var q = g.keys, T = q.map(function(M) {
        var N = {
          startkey: ke([M]),
          endkey: ke([M, {}])
        };
        return g.update_seq && (N.update_seq = !0), P(N);
      });
      return Promise.all(T).then(wi).then(k);
    } else {
      var I = {
        descending: g.descending
      };
      g.update_seq && (I.update_seq = !0);
      var D, E;
      if ("start_key" in g && (D = g.start_key), "startkey" in g && (D = g.startkey), "end_key" in g && (E = g.end_key), "endkey" in g && (E = g.endkey), typeof D != "undefined" && (I.startkey = g.descending ? ke([D, {}]) : ke([D])), typeof E != "undefined") {
        var F = g.inclusive_end !== !1;
        g.descending && (F = !F), I.endkey = ke(F ? [E, {}] : [E]);
      }
      if (typeof g.key != "undefined") {
        var W = ke([g.key]), te = ke([g.key, {}]);
        I.descending ? (I.endkey = W, I.startkey = te) : (I.startkey = W, I.endkey = te);
      }
      return S || (typeof g.limit == "number" && (I.limit = g.limit), I.skip = C), P(I).then(k);
    }
  }
  function Z(d) {
    return d.fetch("_view_cleanup", {
      headers: new Xt({
        "Content-Type": "application/json"
      }),
      method: "POST"
    }).then(function(g) {
      return g.json();
    });
  }
  function Y(d) {
    return d.get("_local/" + e).then(function(g) {
      var w = new it();
      Object.keys(g.views).forEach(function(C) {
        var P = qn(C), k = "_design/" + P[0], q = P[1], T = w.get(k);
        T || (T = new Ct(), w.set(k, T)), T.add(q);
      });
      var S = {
        keys: Pn(w),
        include_docs: !0
      };
      return d.allDocs(S).then(function(C) {
        var P = {};
        C.rows.forEach(function(T) {
          var I = T.key.substring(8);
          w.get(T.key).forEach(function(D) {
            var E = I + "/" + D;
            g.views[E] || (E = D);
            var F = Object.keys(g.views[E]), W = T.doc && T.doc.views && T.doc.views[D];
            F.forEach(function(te) {
              P[te] = P[te] || W;
            });
          });
        });
        var k = Object.keys(P).filter(function(T) {
          return !P[T];
        }), q = k.map(function(T) {
          return jn(p(T), function() {
            return new d.constructor(T, d.__opts).destroy();
          })();
        });
        return Promise.all(q).then(function() {
          return {
            ok: !0
          };
        });
      });
    }, s({
      ok: !0
    }));
  }
  function Q(d, g, w) {
    if (typeof d._query == "function")
      return y(d, g, w);
    if (Ve(d))
      return A(d, g, w);
    var S = {
      changes_batch_size: d.__opts.view_update_changes_batch_size || Jf
    };
    if (typeof g != "string")
      return x(w, g), Si.add(function() {
        var T = Ai(d, "temp_view/temp_view", g.map, g.reduce, !0, e);
        return T.then(function(I) {
          return Qf(j(I, S).then(function() {
            return L(I, w);
          }), function() {
            return I.db.destroy();
          });
        });
      }), Si.finish();
    var C = g, P = qn(C), k = P[0], q = P[1];
    return d.get("_design/" + k).then(function(T) {
      var I = T.views && T.views[q];
      if (!I)
        throw new Tr("ddoc " + T._id + " has no view named " + q);
      r(T, q), x(w, I);
      var D = Ai(d, C, I.map, I.reduce, !1, e);
      return D.then(function(E) {
        return w.stale === "ok" || w.stale === "update_after" ? (w.stale === "update_after" && _e(function() {
          j(E, S);
        }), L(E, w)) : j(E, S).then(function() {
          return L(E, w);
        });
      });
    });
  }
  function J(d, g, w) {
    var S = this;
    typeof g == "function" && (w = g, g = {}), g = g ? O(g) : {}, typeof d == "function" && (d = {
      map: d
    });
    var C = Promise.resolve().then(function() {
      return Q(S, d, g);
    });
    return Ma(C, w), C;
  }
  var U = Kf(function() {
    var d = this;
    return typeof d._viewCleanup == "function" ? v(d) : Ve(d) ? Z(d) : Y(d);
  });
  return {
    query: J,
    viewCleanup: U
  };
}
function mn(e, t) {
  for (var n = e, r = 0, i = t.length; r < i; r++) {
    var a = t[r];
    if (n = n[a], !n)
      break;
  }
  return n;
}
function Yf(e, t, n) {
  for (var r = 0, i = t.length; r < i - 1; r++) {
    var a = t[r];
    e = e[a] = e[a] || {};
  }
  e[t[i - 1]] = n;
}
function Br(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function yt(e) {
  for (var t = [], n = "", r = 0, i = e.length; r < i; r++) {
    var a = e[r];
    r > 0 && e[r - 1] === "\\" && (a === "$" || a === ".") ? n = n.substring(0, n.length - 1) + a : a === "." ? (t.push(n), n = "") : n += a;
  }
  return t.push(n), t;
}
var Xf = ["$or", "$nor", "$not"];
function Ua(e) {
  return Xf.indexOf(e) > -1;
}
function $e(e) {
  return Object.keys(e)[0];
}
function Rr(e) {
  return e[$e(e)];
}
function Pt(e) {
  var t = {}, n = {
    $or: !0,
    $nor: !0
  };
  return e.forEach(function(r) {
    Object.keys(r).forEach(function(i) {
      var a = r[i];
      if (typeof a != "object" && (a = {
        $eq: a
      }), Ua(i))
        if (a instanceof Array) {
          if (n[i]) {
            n[i] = !1, t[i] = a;
            return;
          }
          var u = [];
          t[i].forEach(function(f) {
            Object.keys(a).forEach(function(_) {
              var b = a[_], c = Math.max(Object.keys(f).length, Object.keys(b).length), m = Pt([f, b]);
              Object.keys(m).length <= c || u.push(m);
            });
          }), t[i] = u;
        } else
          t[i] = Pt([a]);
      else {
        var o = t[i] = t[i] || {};
        Object.keys(a).forEach(function(f) {
          var _ = a[f];
          if (f === "$gt" || f === "$gte")
            return Zf(f, _, o);
          if (f === "$lt" || f === "$lte")
            return Vf(f, _, o);
          if (f === "$ne")
            return ec(_, o);
          if (f === "$eq")
            return tc(_, o);
          if (f === "$regex")
            return nc(_, o);
          o[f] = _;
        });
      }
    });
  }), t;
}
function Zf(e, t, n) {
  typeof n.$eq == "undefined" && (typeof n.$gte != "undefined" ? e === "$gte" ? t > n.$gte && (n.$gte = t) : t >= n.$gte && (delete n.$gte, n.$gt = t) : typeof n.$gt != "undefined" ? e === "$gte" ? t > n.$gt && (delete n.$gt, n.$gte = t) : t > n.$gt && (n.$gt = t) : n[e] = t);
}
function Vf(e, t, n) {
  typeof n.$eq == "undefined" && (typeof n.$lte != "undefined" ? e === "$lte" ? t < n.$lte && (n.$lte = t) : t <= n.$lte && (delete n.$lte, n.$lt = t) : typeof n.$lt != "undefined" ? e === "$lte" ? t < n.$lt && (delete n.$lt, n.$lte = t) : t < n.$lt && (n.$lt = t) : n[e] = t);
}
function ec(e, t) {
  "$ne" in t ? t.$ne.push(e) : t.$ne = [e];
}
function tc(e, t) {
  delete t.$gt, delete t.$gte, delete t.$lt, delete t.$lte, delete t.$ne, t.$eq = e;
}
function nc(e, t) {
  "$regex" in t ? t.$regex.push(e) : t.$regex = [e];
}
function za(e) {
  for (var t in e) {
    if (Array.isArray(e))
      for (var n in e)
        e[n].$and && (e[n] = Pt(e[n].$and));
    var r = e[t];
    typeof r == "object" && za(r);
  }
  return e;
}
function Ka(e, t) {
  for (var n in e) {
    n === "$and" && (t = !0);
    var r = e[n];
    typeof r == "object" && (t = Ka(r, t));
  }
  return t;
}
function Qa(e) {
  var t = Ne(e), n = !1;
  Ka(t, !1) && (t = za(t), "$and" in t && (t = Pt(t.$and)), n = !0), ["$or", "$nor"].forEach(function(o) {
    o in t && t[o].forEach(function(f) {
      for (var _ = Object.keys(f), b = 0; b < _.length; b++) {
        var c = _[b], m = f[c];
        (typeof m != "object" || m === null) && (f[c] = {
          $eq: m
        });
      }
    });
  }), "$not" in t && (t.$not = Pt([t.$not]));
  for (var r = Object.keys(t), i = 0; i < r.length; i++) {
    var a = r[i], u = t[a];
    typeof u != "object" || u === null ? u = {
      $eq: u
    } : n || ("$ne" in u && (u.$ne = [u.$ne]), "$regex" in u && (u.$regex = [u.$regex])), t[a] = u;
  }
  return t;
}
function rc(e) {
  function t(n) {
    return e.map(function(r) {
      var i = $e(r), a = yt(i), u = mn(n, a);
      return u;
    });
  }
  return function(n, r) {
    var i = t(n.doc), a = t(r.doc), u = se(i, a);
    return u !== 0 ? u : Br(n.doc._id, r.doc._id);
  };
}
function Ga(e, t, n) {
  if (e = e.filter(function(u) {
    return ft(u.doc, t.selector, n);
  }), t.sort) {
    var r = rc(t.sort);
    e = e.sort(r), typeof t.sort[0] != "string" && Rr(t.sort[0]) === "desc" && (e = e.reverse());
  }
  if ("limit" in t || "skip" in t) {
    var i = t.skip || 0, a = ("limit" in t ? t.limit : e.length) + i;
    e = e.slice(i, a);
  }
  return e;
}
function ft(e, t, n) {
  return n.every(function(r) {
    var i = t[r], a = yt(r), u = mn(e, a);
    return Ua(r) ? ic(r, i, e) : rn(i, e, a, u);
  });
}
function rn(e, t, n, r) {
  return e ? typeof e == "object" ? Object.keys(e).every(function(i) {
    var a = e[i];
    if (i.indexOf("$") === 0)
      return Ei(i, t, a, n, r);
    var u = yt(i);
    if (r === void 0 && typeof a != "object" && u.length > 0)
      return !1;
    var o = mn(r, u);
    return typeof a == "object" ? rn(a, t, n, o) : Ei("$eq", t, a, u, o);
  }) : e === r : !0;
}
function ic(e, t, n) {
  return e === "$or" ? t.some(function(r) {
    return ft(n, r, Object.keys(r));
  }) : e === "$not" ? !ft(n, t, Object.keys(t)) : !t.find(function(r) {
    return ft(n, r, Object.keys(r));
  });
}
function Ei(e, t, n, r, i) {
  if (!Ci[e])
    throw new Error('unknown operator "' + e + '" - should be one of $eq, $lte, $lt, $gt, $gte, $exists, $ne, $in, $nin, $size, $mod, $regex, $elemMatch, $type, $allMatch or $all');
  return Ci[e](t, n, r, i);
}
function bt(e) {
  return typeof e != "undefined" && e !== null;
}
function Ue(e) {
  return typeof e != "undefined";
}
function ac(e, t) {
  if (typeof e != "number" || parseInt(e, 10) !== e)
    return !1;
  var n = t[0], r = t[1];
  return e % n === r;
}
function ki(e, t) {
  return t.some(function(n) {
    return e instanceof Array ? e.some(function(r) {
      return se(n, r) === 0;
    }) : se(n, e) === 0;
  });
}
function uc(e, t) {
  return t.every(function(n) {
    return e.some(function(r) {
      return se(n, r) === 0;
    });
  });
}
function oc(e, t) {
  return e.length === t;
}
function sc(e, t) {
  var n = new RegExp(t);
  return n.test(e);
}
function fc(e, t) {
  switch (t) {
    case "null":
      return e === null;
    case "boolean":
      return typeof e == "boolean";
    case "number":
      return typeof e == "number";
    case "string":
      return typeof e == "string";
    case "array":
      return e instanceof Array;
    case "object":
      return {}.toString.call(e) === "[object Object]";
  }
}
var Ci = {
  $elemMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" && r[0] !== null ? r.some(function(i) {
      return ft(i, t, Object.keys(t));
    }) : r.some(function(i) {
      return rn(t, e, n, i);
    });
  },
  $allMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" && r[0] !== null ? r.every(function(i) {
      return ft(i, t, Object.keys(t));
    }) : r.every(function(i) {
      return rn(t, e, n, i);
    });
  },
  $eq: function(e, t, n, r) {
    return Ue(r) && se(r, t) === 0;
  },
  $gte: function(e, t, n, r) {
    return Ue(r) && se(r, t) >= 0;
  },
  $gt: function(e, t, n, r) {
    return Ue(r) && se(r, t) > 0;
  },
  $lte: function(e, t, n, r) {
    return Ue(r) && se(r, t) <= 0;
  },
  $lt: function(e, t, n, r) {
    return Ue(r) && se(r, t) < 0;
  },
  $exists: function(e, t, n, r) {
    return t ? Ue(r) : !Ue(r);
  },
  $mod: function(e, t, n, r) {
    return bt(r) && ac(r, t);
  },
  $ne: function(e, t, n, r) {
    return t.every(function(i) {
      return se(r, i) !== 0;
    });
  },
  $in: function(e, t, n, r) {
    return bt(r) && ki(r, t);
  },
  $nin: function(e, t, n, r) {
    return bt(r) && !ki(r, t);
  },
  $size: function(e, t, n, r) {
    return bt(r) && Array.isArray(r) && oc(r, t);
  },
  $all: function(e, t, n, r) {
    return Array.isArray(r) && uc(r, t);
  },
  $regex: function(e, t, n, r) {
    return bt(r) && typeof r == "string" && t.every(function(i) {
      return sc(r, i);
    });
  },
  $type: function(e, t, n, r) {
    return fc(r, t);
  }
};
function wn(e, t) {
  if (typeof t != "object")
    throw new Error("Selector error: expected a JSON object");
  t = Qa(t);
  var n = {
    doc: e
  }, r = Ga([n], {
    selector: t
  }, Object.keys(t));
  return r && r.length === 1;
}
function Ja(e) {
  return e = Ne(e), e.index || (e.index = {}), ["type", "name", "ddoc"].forEach(function(t) {
    e.index[t] && (e[t] = e.index[t], delete e.index[t]);
  }), e.fields && (e.index.fields = e.fields, delete e.fields), e.type || (e.type = "json"), e;
}
function cc(e, t, n) {
  var r = "", i = t, a = !0;
  if (["$in", "$nin", "$or", "$and", "$mod", "$nor", "$all"].indexOf(e) !== -1 && (Array.isArray(t) || (r = "Query operator " + e + " must be an array.")), ["$not", "$elemMatch", "$allMatch"].indexOf(e) !== -1 && (!Array.isArray(t) && typeof t == "object" && t !== null || (r = "Query operator " + e + " must be an object.")), e === "$mod" && Array.isArray(t))
    if (t.length !== 2)
      r = "Query operator $mod must be in the format [divisor, remainder], where divisor and remainder are both integers.";
    else {
      var u = t[0], o = t[1];
      u === 0 && (r = "Query operator $mod's divisor cannot be 0, cannot divide by zero.", a = !1), (typeof u != "number" || parseInt(u, 10) !== u) && (r = "Query operator $mod's divisor is not an integer.", i = u), parseInt(o, 10) !== o && (r = "Query operator $mod's remainder is not an integer.", i = o);
    }
  if (e === "$exists" && typeof t != "boolean" && (r = "Query operator $exists must be a boolean."), e === "$type") {
    var f = ["null", "boolean", "number", "string", "array", "object"], _ = '"' + f.slice(0, f.length - 1).join('", "') + '", or "' + f[f.length - 1] + '"';
    (typeof t != "string" || f.indexOf(t) == -1) && (r = "Query operator $type must be a string. Supported values: " + _ + ".");
  }
  if (e === "$size" && parseInt(t, 10) !== t && (r = "Query operator $size must be a integer."), e === "$regex" && typeof t != "string" && (console.log("here", n), n ? r = "Query operator $regex must be a string." : t instanceof RegExp || (r = "Query operator $regex must be a string or an instance of a javascript regular expression.")), r) {
    if (a) {
      var b = i === null ? " " : Array.isArray(i) ? " array" : " " + typeof i, c = typeof i == "object" && i !== null ? JSON.stringify(i, null, "	") : i;
      r += " Received" + b + ": " + c;
    }
    throw new Error(r);
  }
}
var lc = ["$all", "$allMatch", "$and", "$elemMatch", "$exists", "$in", "$mod", "$nin", "$nor", "$not", "$or", "$regex", "$size", "$type"], dc = ["$in", "$nin", "$mod", "$all"], vc = ["$eq", "$gt", "$gte", "$lt", "$lte"];
function an(e, t) {
  if (Array.isArray(e))
    for (var n of e)
      typeof n == "object" && u !== null && an(n, t);
  else
    for (var r = Object.keys(e), i = 0; i < r.length; i++) {
      var a = r[i], u = e[a];
      lc.indexOf(a) !== -1 && cc(a, u, t), vc.indexOf(a) === -1 && dc.indexOf(a) === -1 && typeof u == "object" && u !== null && an(u, t);
    }
}
function Ut(e, t, n, r) {
  var i, a;
  n.headers = new Xt({
    "Content-type": "application/json"
  }), e.fetch(t, n).then(function(u) {
    return i = u.status, a = u.ok, u.json();
  }).then(function(u) {
    if (a)
      r(null, u);
    else {
      u.status = i;
      var o = Zn(u);
      r(o);
    }
  }).catch(r);
}
function hc(e, t, n) {
  t = Ja(t), Ut(e, "_index", {
    method: "POST",
    body: JSON.stringify(t)
  }, n);
}
function yc(e, t, n) {
  an(t.selector, !0), Ut(e, "_find", {
    method: "POST",
    body: JSON.stringify(t)
  }, n);
}
function gc(e, t, n) {
  Ut(e, "_explain", {
    method: "POST",
    body: JSON.stringify(t)
  }, n);
}
function pc(e, t) {
  Ut(e, "_index", {
    method: "GET"
  }, t);
}
function _c(e, t, n) {
  var r = t.ddoc, i = t.type || "json", a = t.name;
  if (!r)
    return n(new Error("you must provide an index's ddoc"));
  if (!a)
    return n(new Error("you must provide an index's name"));
  var u = "_index/" + [r, i, a].map(encodeURIComponent).join("/");
  Ut(e, u, {
    method: "DELETE"
  }, n);
}
function Wa(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = -1; ++r < t; )
      n[r] = arguments[r];
    return e.call(this, n);
  };
}
function zt(e) {
  return Wa(function(t) {
    var n = t.pop(), r = e.apply(this, t);
    return mc(r, n), r;
  });
}
function mc(e, t) {
  return e.then(function(n) {
    _e(function() {
      t(null, n);
    });
  }, function(n) {
    _e(function() {
      t(n);
    });
  }), e;
}
var Lr = Wa(function(e) {
  for (var t = [], n = 0, r = e.length; n < r; n++) {
    var i = e[n];
    Array.isArray(i) ? t = t.concat(Lr.apply(null, i)) : t.push(i);
  }
  return t;
});
function Dr(e) {
  for (var t = {}, n = 0, r = e.length; n < r; n++)
    t = qr(t, e[n]);
  return t;
}
function wc(e, t) {
  for (var n = {}, r = 0, i = t.length; r < i; r++) {
    var a = yt(t[r]), u = mn(e, a);
    typeof u != "undefined" && Yf(n, a, u);
  }
  return n;
}
function Ha(e, t) {
  for (var n = 0, r = Math.min(e.length, t.length); n < r; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function bc(e, t) {
  return e.length > t.length ? !1 : Ha(e, t);
}
function $c(e, t) {
  e = e.slice();
  for (var n = 0, r = t.length; n < r; n++) {
    var i = t[n];
    if (!e.length)
      break;
    var a = e.indexOf(i);
    if (a === -1)
      return !1;
    e.splice(a, 1);
  }
  return !0;
}
function Ac(e) {
  for (var t = {}, n = 0, r = e.length; n < r; n++)
    t[e[n]] = !0;
  return t;
}
function Oc(e, t) {
  for (var n = null, r = -1, i = 0, a = e.length; i < a; i++) {
    var u = e[i], o = t(u);
    o > r && (r = o, n = u);
  }
  return n;
}
function ji(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var n = 0, r = e.length; n < r; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function Sc(e) {
  for (var t = {}, n = 0; n < e.length; n++)
    t["$" + e[n]] = !0;
  return Object.keys(t).map(function(r) {
    return r.substring(1);
  });
}
function xc(e, t, n) {
  return function(r) {
    if (!(n && !wn(r, n))) {
      for (var i = [], a = 0, u = e.length; a < u; a++) {
        for (var o = yt(e[a]), f = r, _ = 0, b = o.length; _ < b; _++) {
          var c = o[_];
          if (f = f[c], typeof f == "undefined")
            return;
        }
        i.push(f);
      }
      t(i);
    }
  };
}
function Ec(e, t, n) {
  var r = yt(e);
  return function(i) {
    if (!(n && !wn(i, n))) {
      for (var a = i, u = 0, o = r.length; u < o; u++) {
        var f = r[u];
        if (a = a[f], typeof a == "undefined")
          return;
      }
      t(a);
    }
  };
}
function kc(e, t, n) {
  return function(r) {
    n && !wn(r, n) || t(r[e]);
  };
}
function Cc(e, t, n) {
  return function(r) {
    if (!(n && !wn(r, n))) {
      for (var i = [], a = 0, u = e.length; a < u; a++)
        i.push(r[e[a]]);
      t(i);
    }
  };
}
function jc(e) {
  for (var t = 0, n = e.length; t < n; t++) {
    var r = e[t];
    if (r.indexOf(".") !== -1)
      return !1;
  }
  return !0;
}
function Pc(e, t, n) {
  var r = jc(e), i = e.length === 1;
  return r ? i ? kc(e[0], t, n) : Cc(e, t, n) : i ? Ec(e[0], t, n) : xc(e, t, n);
}
function qc(e, t) {
  const n = Object.keys(e.fields), r = e.partial_filter_selector;
  return Pc(n, t, r);
}
function Tc() {
  throw new Error("reduce not supported");
}
function Ic(e, t) {
  var n = e.views[t];
  if (!n.map || !n.map.fields)
    throw new Error("ddoc " + e._id + " with view " + t + " doesn't have map.fields defined. maybe it wasn't created by this plugin?");
}
var Bc = Hf("indexes", qc, Tc, Ic);
function Nr(e) {
  return e._customFindAbstractMapper || Bc;
}
function Rc(e) {
  if (!Array.isArray(e))
    throw new Error("invalid sort json - should be an array");
  return e.map(function(t) {
    if (typeof t == "string") {
      var n = {};
      return n[t] = "asc", n;
    } else
      return t;
  });
}
function Lc(e) {
  var t = [];
  return typeof e == "string" ? t.push(e) : t = e, t.map(function(n) {
    return n.replace("_design/", "");
  });
}
function Ya(e) {
  return e.fields = e.fields.map(function(t) {
    if (typeof t == "string") {
      var n = {};
      return n[t] = "asc", n;
    }
    return t;
  }), e;
}
function Dc(e, t) {
  for (var n = [], r = 0; r < t.def.fields.length; r++) {
    var i = $e(t.def.fields[r]);
    n.push(e[i]);
  }
  return n;
}
function Nc(e, t, n) {
  for (var r = n.def.fields, i = 0, a = e.length; i < a; i++) {
    var u = e[i], o = Dc(u.doc, n);
    if (r.length === 1)
      o = o[0];
    else
      for (; o.length > t.length; )
        o.pop();
    if (Math.abs(se(o, t)) > 0)
      break;
  }
  return i > 0 ? e.slice(i) : e;
}
function Fc(e) {
  var t = Ne(e);
  return delete t.startkey, delete t.endkey, delete t.inclusive_start, delete t.inclusive_end, "endkey" in e && (t.startkey = e.endkey), "startkey" in e && (t.endkey = e.startkey), "inclusive_start" in e && (t.inclusive_end = e.inclusive_start), "inclusive_end" in e && (t.inclusive_start = e.inclusive_end), t;
}
function Mc(e) {
  var t = e.fields.filter(function(n) {
    return Rr(n) === "asc";
  });
  if (t.length !== 0 && t.length !== e.fields.length)
    throw new Error("unsupported mixed sorting");
}
function Uc(e, t) {
  if (t.defaultUsed && e.sort) {
    var n = e.sort.filter(function(r) {
      return Object.keys(r)[0] !== "_id";
    }).map(function(r) {
      return Object.keys(r)[0];
    });
    if (n.length > 0)
      throw new Error('Cannot sort on field(s) "' + n.join(",") + '" when using the default index');
  }
  t.defaultUsed;
}
function zc(e) {
  if (typeof e.selector != "object")
    throw new Error("you must provide a selector when you find()");
}
function Kc(e, t) {
  var n = Object.keys(e), r = t ? t.map($e) : [], i;
  return n.length >= r.length ? i = n : i = r, r.length === 0 ? {
    fields: i
  } : (i = i.sort(function(a, u) {
    var o = r.indexOf(a);
    o === -1 && (o = Number.MAX_VALUE);
    var f = r.indexOf(u);
    return f === -1 && (f = Number.MAX_VALUE), o < f ? -1 : o > f ? 1 : 0;
  }), {
    fields: i,
    sortOrder: t.map($e)
  });
}
function Qc(e, t) {
  t = Ja(t);
  var n = Ne(t.index);
  t.index = Ya(t.index), Mc(t.index);
  var r;
  function i() {
    return r || (r = Da(JSON.stringify(t)));
  }
  var a = t.name || "idx-" + i(), u = t.ddoc || "idx-" + i(), o = "_design/" + u, f = !1, _ = !1;
  function b(c) {
    return c._rev && c.language !== "query" && (f = !0), c.language = "query", c.views = c.views || {}, _ = !!c.views[a], _ ? !1 : (c.views[a] = {
      map: {
        fields: Dr(t.index.fields)
      },
      reduce: "_count",
      options: {
        def: n
      }
    }, c);
  }
  return e.constructor.emit("debug", ["find", "creating index", o]), _n(e, o, b).then(function() {
    if (f)
      throw new Error('invalid language for ddoc with id "' + o + '" (should be "query")');
  }).then(function() {
    var c = u + "/" + a;
    return Nr(e).query.call(e, c, {
      limit: 0,
      reduce: !1
    }).then(function() {
      return {
        id: o,
        name: a,
        result: _ ? "exists" : "created"
      };
    });
  });
}
function Xa(e) {
  return e.allDocs({
    startkey: "_design/",
    endkey: "_design/\uFFFF",
    include_docs: !0
  }).then(function(t) {
    var n = {
      indexes: [{
        ddoc: null,
        name: "_all_docs",
        type: "special",
        def: {
          fields: [{
            _id: "asc"
          }]
        }
      }]
    };
    return n.indexes = Lr(n.indexes, t.rows.filter(function(r) {
      return r.doc.language === "query";
    }).map(function(r) {
      var i = r.doc.views !== void 0 ? Object.keys(r.doc.views) : [];
      return i.map(function(a) {
        var u = r.doc.views[a];
        return {
          ddoc: r.id,
          name: a,
          type: "json",
          def: Ya(u.options.def)
        };
      });
    })), n.indexes.sort(function(r, i) {
      return Br(r.name, i.name);
    }), n.total_rows = n.indexes.length, n;
  });
}
var un = null, ar = {
  "\uFFFF": {}
};
const Gc = {
  queryOpts: {
    limit: 0,
    startkey: ar,
    endkey: un
  },
  inMemoryFields: []
};
function Jc(e, t) {
  for (var n = e.def.fields.map($e), r = 0, i = n.length; r < i; r++) {
    var a = n[r];
    if (t === a)
      return !0;
  }
  return !1;
}
function Wc(e, t) {
  var n = e[t], r = $e(n);
  return r !== "$eq";
}
function Za(e, t) {
  var n = t.def.fields.map($e);
  return e.slice().sort(function(r, i) {
    var a = n.indexOf(r), u = n.indexOf(i);
    return a === -1 && (a = Number.MAX_VALUE), u === -1 && (u = Number.MAX_VALUE), Br(a, u);
  });
}
function Hc(e, t, n) {
  n = Za(n, e);
  for (var r = !1, i = 0, a = n.length; i < a; i++) {
    var u = n[i];
    if (r || !Jc(e, u))
      return n.slice(i);
    i < a - 1 && Wc(t, u) && (r = !0);
  }
  return [];
}
function Yc(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    var r = e[n];
    Object.keys(r).forEach(function(i) {
      i === "$ne" && t.push(n);
    });
  }), t;
}
function Xc(e, t, n, r) {
  var i = Lr(
    e,
    Hc(t, n, r),
    Yc(n)
  );
  return Za(Sc(i), t);
}
function Zc(e, t, n) {
  if (t) {
    var r = bc(t, e), i = Ha(n, e);
    return r && i;
  }
  return $c(n, e);
}
var Vc = ["$eq", "$gt", "$gte", "$lt", "$lte"];
function Va(e) {
  return Vc.indexOf(e) === -1;
}
function el(e, t) {
  var n = e[0], r = t[n];
  if (typeof r == "undefined")
    return !0;
  var i = Object.keys(r).length === 1 && $e(r) === "$ne";
  return !i;
}
function tl(e, t, n, r) {
  var i = e.def.fields.map($e), a = Zc(i, t, n);
  return a ? el(i, r) : !1;
}
function nl(e, t, n, r) {
  return r.filter(function(i) {
    return tl(i, n, t, e);
  });
}
function rl(e, t, n, r, i) {
  var a = nl(e, t, n, r);
  if (a.length === 0) {
    if (i)
      throw {
        error: "no_usable_index",
        message: "There is no index available for this selector."
      };
    var u = r[0];
    return u.defaultUsed = !0, u;
  }
  if (a.length === 1 && !i)
    return a[0];
  var o = Ac(t);
  function f(m) {
    for (var O = m.def.fields.map($e), $ = 0, x = 0, A = O.length; x < A; x++) {
      var y = O[x];
      o[y] && $++;
    }
    return $;
  }
  if (i) {
    var _ = "_design/" + i[0], b = i.length === 2 ? i[1] : !1, c = a.find(function(m) {
      return !!(b && m.ddoc === _ && b === m.name || m.ddoc === _);
    });
    if (!c)
      throw {
        error: "unknown_error",
        message: "Could not find that index or could not use that index for the query"
      };
    return c;
  }
  return Oc(a, f);
}
function il(e, t) {
  switch (e) {
    case "$eq":
      return {
        key: t
      };
    case "$lte":
      return {
        endkey: t
      };
    case "$gte":
      return {
        startkey: t
      };
    case "$lt":
      return {
        endkey: t,
        inclusive_end: !1
      };
    case "$gt":
      return {
        startkey: t,
        inclusive_start: !1
      };
  }
  return {
    startkey: un
  };
}
function al(e, t) {
  var n = $e(t.def.fields[0]), r = e[n] || {}, i = [], a = Object.keys(r), u;
  return a.forEach(function(o) {
    Va(o) && i.push(n);
    var f = r[o], _ = il(o, f);
    u ? u = Dr([u, _]) : u = _;
  }), {
    queryOpts: u,
    inMemoryFields: i
  };
}
function ul(e, t) {
  switch (e) {
    case "$eq":
      return {
        startkey: t,
        endkey: t
      };
    case "$lte":
      return {
        endkey: t
      };
    case "$gte":
      return {
        startkey: t
      };
    case "$lt":
      return {
        endkey: t,
        inclusive_end: !1
      };
    case "$gt":
      return {
        startkey: t,
        inclusive_start: !1
      };
  }
}
function ol(e, t) {
  var n = t.def.fields.map($e), r = [], i = [], a = [], u, o;
  function f(B) {
    u !== !1 && i.push(un), o !== !1 && a.push(ar), r = n.slice(B);
  }
  for (var _ = 0, b = n.length; _ < b; _++) {
    var c = n[_], m = e[c];
    if (!m || !Object.keys(m).length) {
      f(_);
      break;
    } else if (Object.keys(m).some(Va)) {
      f(_);
      break;
    } else if (_ > 0) {
      var O = "$gt" in m || "$gte" in m || "$lt" in m || "$lte" in m, $ = Object.keys(e[n[_ - 1]]), x = ji($, ["$eq"]), A = ji($, Object.keys(m)), y = O && !x && !A;
      if (y) {
        f(_);
        break;
      }
    }
    for (var v = Object.keys(m), s = null, l = 0; l < v.length; l++) {
      var h = v[l], p = m[h], j = ul(h, p);
      s ? s = Dr([s, j]) : s = j;
    }
    i.push("startkey" in s ? s.startkey : un), a.push("endkey" in s ? s.endkey : ar), "inclusive_start" in s && (u = s.inclusive_start), "inclusive_end" in s && (o = s.inclusive_end);
  }
  var R = {
    startkey: i,
    endkey: a
  };
  return typeof u != "undefined" && (R.inclusive_start = u), typeof o != "undefined" && (R.inclusive_end = o), {
    queryOpts: R,
    inMemoryFields: r
  };
}
function sl(e) {
  return Object.keys(e).map(function(n) {
    return e[n];
  }).some(function(n) {
    return typeof n == "object" && Object.keys(n).length === 0;
  });
}
function fl(e) {
  return {
    queryOpts: {
      startkey: null
    },
    inMemoryFields: [Object.keys(e)]
  };
}
function cl(e, t) {
  return t.defaultUsed ? fl(e) : t.def.fields.length === 1 ? al(e, t) : ol(e, t);
}
function ll(e, t) {
  var n = e.selector, r = e.sort;
  if (sl(n))
    return qr({}, Gc, {
      index: t[0]
    });
  var i = Kc(n, r), a = i.fields, u = i.sortOrder, o = rl(n, a, u, t, e.use_index), f = cl(n, o), _ = f.queryOpts, b = f.inMemoryFields, c = Xc(b, o, n, a), m = {
    queryOpts: _,
    index: o,
    inMemoryFields: c
  };
  return m;
}
function dl(e) {
  return e.ddoc.substring(8) + "/" + e.name;
}
function vl(e, t) {
  var n = Ne(t);
  return n.descending ? ("endkey" in n && typeof n.endkey != "string" && (n.endkey = ""), "startkey" in n && typeof n.startkey != "string" && (n.limit = 0)) : ("startkey" in n && typeof n.startkey != "string" && (n.startkey = ""), "endkey" in n && typeof n.endkey != "string" && (n.limit = 0)), "key" in n && typeof n.key != "string" && (n.limit = 0), n.limit > 0 && n.indexes_count && (n.original_limit = n.limit, n.limit += n.indexes_count), e.allDocs(n).then(function(r) {
    return r.rows = r.rows.filter(function(i) {
      return !/^_design\//.test(i.id);
    }), n.original_limit && (n.limit = n.original_limit), r.rows = r.rows.slice(0, n.limit), r;
  });
}
function eu(e, t, n) {
  return t.selector && (an(t.selector, !1), t.selector = Qa(t.selector)), t.sort && (t.sort = Rc(t.sort)), t.use_index && (t.use_index = Lc(t.use_index)), zc(t), Xa(e).then(function(r) {
    e.constructor.emit("debug", ["find", "planning query", t]);
    var i = ll(t, r.indexes);
    e.constructor.emit("debug", ["find", "query plan", i]);
    var a = i.index;
    Uc(t, a);
    var u = qr({
      include_docs: !0,
      reduce: !1,
      indexes_count: r.total_rows
    }, i.queryOpts);
    if ("startkey" in u && "endkey" in u && se(u.startkey, u.endkey) > 0)
      return {
        docs: []
      };
    var o = t.sort && typeof t.sort[0] != "string" && Rr(t.sort[0]) === "desc";
    return o && (u.descending = !0, u = Fc(u)), i.inMemoryFields.length || ("limit" in t && (u.limit = t.limit), "skip" in t && (u.skip = t.skip)), n ? Promise.resolve(i, u) : Promise.resolve().then(function() {
      if (a.name === "_all_docs")
        return vl(e, u);
      var f = dl(a);
      return Nr(e).query.call(e, f, u);
    }).then(function(f) {
      u.inclusive_start === !1 && (f.rows = Nc(f.rows, u.startkey, a)), i.inMemoryFields.length && (f.rows = Ga(f.rows, t, i.inMemoryFields));
      var _ = {
        docs: f.rows.map(function(b) {
          var c = b.doc;
          return t.fields ? wc(c, t.fields) : c;
        })
      };
      return a.defaultUsed && (_.warning = "No matching index found, create an index to optimize query time."), _;
    });
  });
}
function hl(e, t) {
  return eu(e, t, !0).then(function(n) {
    return {
      dbname: e.name,
      index: n.index,
      selector: t.selector,
      range: {
        start_key: n.queryOpts.startkey,
        end_key: n.queryOpts.endkey
      },
      opts: {
        use_index: t.use_index || [],
        bookmark: "nil",
        limit: t.limit,
        skip: t.skip,
        sort: t.sort || {},
        fields: t.fields,
        conflicts: !1,
        r: [49]
      },
      limit: t.limit,
      skip: t.skip || 0,
      fields: t.fields
    };
  });
}
function yl(e, t) {
  if (!t.ddoc)
    throw new Error("you must supply an index.ddoc when deleting");
  if (!t.name)
    throw new Error("you must supply an index.name when deleting");
  var n = t.ddoc, r = t.name;
  function i(a) {
    return Object.keys(a.views).length === 1 && a.views[r] ? {
      _id: n,
      _deleted: !0
    } : (delete a.views[r], a);
  }
  return _n(e, n, i).then(function() {
    return Nr(e).viewCleanup.apply(e);
  }).then(function() {
    return {
      ok: !0
    };
  });
}
var gl = zt(Qc), pl = zt(eu), _l = zt(hl), ml = zt(Xa), wl = zt(yl), gt = {};
gt.createIndex = Ft(function(e, t) {
  if (typeof e != "object")
    return t(new Error("you must provide an index to create"));
  var n = Ve(this) ? hc : gl;
  n(this, e, t);
});
gt.find = Ft(function(e, t) {
  if (typeof t == "undefined" && (t = e, e = void 0), typeof e != "object")
    return t(new Error("you must provide search parameters to find()"));
  var n = Ve(this) ? yc : pl;
  n(this, e, t);
});
gt.explain = Ft(function(e, t) {
  if (typeof t == "undefined" && (t = e, e = void 0), typeof e != "object")
    return t(new Error("you must provide search parameters to explain()"));
  var n = Ve(this) ? gc : _l;
  n(this, e, t);
});
gt.getIndexes = Ft(function(e) {
  var t = Ve(this) ? pc : ml;
  t(this, e);
});
gt.deleteIndex = Ft(function(e, t) {
  if (typeof e != "object")
    return t(new Error("you must provide an index to delete"));
  var n = Ve(this) ? _c : wl;
  n(this, e, t);
});
var tu = {}, Pi = window.MutationObserver || window.WebKitMutationObserver, Ot;
if (Pi) {
  var qi = 0, bl = new Pi(Wt), Ti = window.document.createTextNode("");
  bl.observe(Ti, {
    characterData: !0
  }), Ot = function() {
    Ti.data = qi = ++qi % 2;
  };
} else if (!window.setImmediate && typeof window.MessageChannel != "undefined") {
  var Ii = new window.MessageChannel();
  Ii.port1.onmessage = Wt, Ot = function() {
    Ii.port2.postMessage(0);
  };
} else
  "document" in window && "onreadystatechange" in window.document.createElement("script") ? Ot = function() {
    var e = window.document.createElement("script");
    e.onreadystatechange = function() {
      Wt(), e.onreadystatechange = null, e.parentNode.removeChild(e), e = null;
    }, window.document.documentElement.appendChild(e);
  } : Ot = function() {
    setTimeout(Wt, 0);
  };
var ur, St = [];
function Wt() {
  ur = !0;
  for (var e, t, n = St.length; n; ) {
    for (t = St, St = [], e = -1; ++e < n; )
      t[e]();
    n = St.length;
  }
  ur = !1;
}
var $l = Al;
function Al(e) {
  St.push(e) === 1 && !ur && Ot();
}
var Ol = $l;
function pt() {
}
var pe = {}, nu = ["REJECTED"], or = ["FULFILLED"], ru = ["PENDING"], Sl = tt;
function tt(e) {
  if (typeof e != "function")
    throw new TypeError("resolver must be a function");
  this.state = ru, this.queue = [], this.outcome = void 0, e !== pt && iu(this, e);
}
tt.prototype.catch = function(e) {
  return this.then(null, e);
};
tt.prototype.then = function(e, t) {
  if (typeof e != "function" && this.state === or || typeof t != "function" && this.state === nu)
    return this;
  var n = new this.constructor(pt);
  if (this.state !== ru) {
    var r = this.state === or ? e : t;
    Fr(n, r, this.outcome);
  } else
    this.queue.push(new Kt(n, e, t));
  return n;
};
function Kt(e, t, n) {
  this.promise = e, typeof t == "function" && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), typeof n == "function" && (this.onRejected = n, this.callRejected = this.otherCallRejected);
}
Kt.prototype.callFulfilled = function(e) {
  pe.resolve(this.promise, e);
};
Kt.prototype.otherCallFulfilled = function(e) {
  Fr(this.promise, this.onFulfilled, e);
};
Kt.prototype.callRejected = function(e) {
  pe.reject(this.promise, e);
};
Kt.prototype.otherCallRejected = function(e) {
  Fr(this.promise, this.onRejected, e);
};
function Fr(e, t, n) {
  Ol(function() {
    var r;
    try {
      r = t(n);
    } catch (i) {
      return pe.reject(e, i);
    }
    r === e ? pe.reject(e, new TypeError("Cannot resolve promise with itself")) : pe.resolve(e, r);
  });
}
pe.resolve = function(e, t) {
  var n = au(xl, t);
  if (n.status === "error")
    return pe.reject(e, n.value);
  var r = n.value;
  if (r)
    iu(e, r);
  else {
    e.state = or, e.outcome = t;
    for (var i = -1, a = e.queue.length; ++i < a; )
      e.queue[i].callFulfilled(t);
  }
  return e;
};
pe.reject = function(e, t) {
  e.state = nu, e.outcome = t;
  for (var n = -1, r = e.queue.length; ++n < r; )
    e.queue[n].callRejected(t);
  return e;
};
function xl(e) {
  var t = e && e.then;
  if (e && (typeof e == "object" || typeof e == "function") && typeof t == "function")
    return function() {
      t.apply(e, arguments);
    };
}
function iu(e, t) {
  var n = !1;
  function r(o) {
    n || (n = !0, pe.reject(e, o));
  }
  function i(o) {
    n || (n = !0, pe.resolve(e, o));
  }
  function a() {
    t(i, r);
  }
  var u = au(a);
  u.status === "error" && r(u.value);
}
function au(e, t) {
  var n = {};
  try {
    n.value = e(t), n.status = "success";
  } catch (r) {
    n.status = "error", n.value = r;
  }
  return n;
}
tt.resolve = El;
function El(e) {
  return e instanceof this ? e : pe.resolve(new this(pt), e);
}
tt.reject = kl;
function kl(e) {
  var t = new this(pt);
  return pe.reject(t, e);
}
tt.all = Cl;
function Cl(e) {
  var t = this;
  if (Object.prototype.toString.call(e) !== "[object Array]")
    return this.reject(new TypeError("must be an array"));
  var n = e.length, r = !1;
  if (!n)
    return this.resolve([]);
  for (var i = new Array(n), a = 0, u = -1, o = new this(pt); ++u < n; )
    f(e[u], u);
  return o;
  function f(_, b) {
    t.resolve(_).then(c, function(m) {
      r || (r = !0, pe.reject(o, m));
    });
    function c(m) {
      i[b] = m, ++a === n && !r && (r = !0, pe.resolve(o, i));
    }
  }
}
tt.race = jl;
function jl(e) {
  var t = this;
  if (Object.prototype.toString.call(e) !== "[object Array]")
    return this.reject(new TypeError("must be an array"));
  var n = e.length, r = !1;
  if (!n)
    return this.resolve([]);
  for (var i = -1, a = new this(pt); ++i < n; )
    u(e[i]);
  return a;
  function u(o) {
    t.resolve(o).then(function(f) {
      r || (r = !0, pe.resolve(a, f));
    }, function(f) {
      r || (r = !0, pe.reject(a, f));
    });
  }
}
var Pl = typeof Promise == "function" ? Promise : Sl;
const ql = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pl
}, Symbol.toStringTag, { value: "Module" })), Tl = /* @__PURE__ */ Li(ql);
(function(e) {
  var t = Tl;
  function n(i, a, u) {
    return typeof a != "string" ? t.reject(new Error("doc id is required")) : i.get(a).catch(function(o) {
      if (o.status !== 404)
        throw o;
      return {};
    }).then(function(o) {
      var f = o._rev, _ = u(o);
      return _ ? (_._id = a, _._rev = f, r(i, _, u)) : {
        updated: !1,
        rev: f,
        id: a
      };
    });
  }
  function r(i, a, u) {
    return i.put(a).then(function(o) {
      return {
        updated: !0,
        rev: o.rev,
        id: a._id
      };
    }, function(o) {
      if (o.status !== 409)
        throw o;
      return n(i, a._id, u);
    });
  }
  e.upsert = function(a, u, o) {
    var f = this, _ = n(f, a, u);
    if (typeof o != "function")
      return _;
    _.then(function(b) {
      o(null, b);
    }, o);
  }, e.putIfNotExists = function(a, u, o) {
    var f = this;
    typeof a != "string" && (o = u, u = a, a = u._id);
    var _ = function(c) {
      return c._rev ? !1 : u;
    }, b = n(f, a, _);
    if (typeof o != "function")
      return b;
    b.then(function(c) {
      o(null, c);
    }, o);
  }, typeof window != "undefined" && window.PouchDB && window.PouchDB.plugin(e);
})(tu);
const Tn = (e) => e instanceof Date, Il = (e) => Object.keys(e).length === 0, sr = (e) => e != null && typeof e == "object", Bi = (e, ...t) => Object.prototype.hasOwnProperty.call(e, ...t), In = (e) => sr(e) && Il(e), Bl = () => /* @__PURE__ */ Object.create(null), Mr = (e, t) => {
  if (e === t)
    return {};
  if (!sr(e) || !sr(t))
    return t;
  const n = Object.keys(e).reduce((r, i) => (Bi(t, i) || (r[i] = void 0), r), Bl());
  return Tn(e) || Tn(t) ? e.valueOf() == t.valueOf() ? {} : t : Object.keys(t).reduce((r, i) => {
    if (!Bi(e, i))
      return r[i] = t[i], r;
    const a = Mr(e[i], t[i]);
    return In(a) && !Tn(a) && (In(e[i]) || !In(t[i])) || (r[i] = a), r;
  }, n);
};
function vt(...e) {
  return [].concat(...e).filter((t) => !Ll(t) && !Dl(t) && !Fl(t)).flat();
}
function Rl(e = null) {
  const t = new Date();
  return typeof e == "number" && t.setSeconds(t.getSeconds() + e), t;
}
function qt(e, t) {
  if (e instanceof Map)
    return Array.from(e).map(([r, i]) => qt(i, t));
  if (Array.isArray(e))
    return e.map((r) => qt(r, t));
  if (t = vt(t), !t.length)
    return e;
  const n = t.map((r) => Nl(e) ? e[r] : e);
  if (!!n.length)
    return n.length === 1 ? n.shift() : n;
}
function uu(...e) {
  return [].concat(...e).shift();
}
function Ll(e) {
  return e === !1;
}
function Dl(e) {
  return e === null;
}
function Nl(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function ou(e) {
  return typeof e == "string";
}
function Fl(e) {
  return e === void 0;
}
function Ur(e, t, n = []) {
  if (e instanceof Map)
    return e;
  if (t === void 0)
    throw new Error(
      "You must specify an attribute for the map's key."
    );
  const r = new Map(
    vt(n).map((i) => [i, void 0])
  );
  return vt(e).reduce((i, a) => {
    const u = typeof t == "function" ? t(a) : a[t];
    return i.set(u, a);
  }, Object.assign(r, {
    first(...i) {
      return qt(this.toArray().shift(), [...i]);
    },
    last() {
      return this.toArray().pop();
    },
    toArray() {
      return Array.from(r.values());
    },
    toJson() {
      return Object.fromEntries(r);
    }
  }));
}
function su(e, ...t) {
  return e instanceof Promise ? e : typeof e == "function" ? Promise.resolve(e(...t)) : Promise.resolve(e);
}
function zr(e, t = (n) => n) {
  if (!!e.size)
    return e.size === 1 ? t(e.first()) : Object.fromEntries(
      Array.from(e).map(([n, r]) => [n, t(r)])
    );
}
function fr(e, t) {
  return be(this, null, function* () {
    const n = Object.entries(t);
    for (const [r, i] of n)
      t[r] = i && (yield e.remove(i));
    return zr(Ur(t, "id"));
  });
}
function fu(e) {
  e && console.warn(e);
}
const Ml = {
  cache(...e) {
    return be(this, null, function* () {
      const [t, n, r] = e;
      yield this.clearExpiredCache(t);
      const i = yield this.findCache(t);
      if (e.length <= 1 || i.length) {
        const _ = Ur(i, "_id", t);
        return zr(_, (b) => qt(b, "$value"));
      }
      if (!ou(t))
        throw new Error(
          "The key must be a string when cache() is being used a setter."
        );
      const a = r instanceof Date ? r : typeof r == "number" ? Rl(r) : null;
      let u = yield su(n);
      u !== void 0 && (u = JSON.parse(JSON.stringify(u)));
      const { _rev: o } = uu(i) || {}, f = Object.assign({
        _id: t,
        _rev: o,
        $value: u,
        $expiredAt: a
      });
      return yield this.upsert(t, (_) => {
        if (Object.keys(Mr(f, _)).length > 0)
          return f;
      }), u;
    });
  },
  cacheSelector(e = [], t = null, n = !1) {
    return {
      selector: this.mergeCacheExpirationSelector({
        _id: {
          [e.length ? "$in" : "$nin"]: e
        },
        $expiredAt: {
          $exists: !0
        },
        $value: {
          $exists: !0
        }
      }, t, n)
    };
  },
  clearExpiredCache(e) {
    return be(this, null, function* () {
      const t = yield this.findCache(vt(e), new Date(), !0);
      return yield Promise.all(
        Object.entries(t).map(([n, r]) => r && this.remove(r._id, r._rev))
      );
    });
  },
  createCacheIndex() {
    return be(this, null, function* () {
      return yield this.createIndex({
        index: {
          fields: ["$expiredAt", "$value"]
        }
      });
    });
  },
  findCache(e = void 0, t = void 0, n = !1) {
    return be(this, null, function* () {
      t === void 0 && (t = new Date());
      const { docs: r, warning: i } = yield this.find(
        this.cacheSelector(vt(e), t, n)
      );
      return fu(i), r;
    });
  },
  findExpiredCache(e, t = null) {
    return be(this, null, function* () {
      return yield this.findCache(e, !0, t || new Date());
    });
  },
  mergeCacheExpirationSelector(e, t = null, n = !1) {
    return t instanceof Date ? Object.assign(e, {
      [n ? "$and" : "$or"]: [{
        $expiredAt: {
          [n ? "$lte" : "$gt"]: t
        }
      }, {
        $expiredAt: {
          [n ? "$ne" : "$eq"]: null
        }
      }]
    }) : e;
  },
  purge(e) {
    return be(this, null, function* () {
      return yield fr(this, yield this.findCache(e));
    });
  },
  removeCache(e) {
    return be(this, null, function* () {
      return yield fr(this, yield this.findCache(e));
    });
  }
}, Ul = {
  config(...e) {
    return be(this, null, function* () {
      const [t, n] = e, r = yield this.findConfig(t);
      if (e.length <= 1) {
        const o = Ur(r, "_id", t);
        return zr(o, (f) => qt(f, "$value"));
      }
      if (!ou(t))
        throw new Error(
          "The key must be a string when config() is being used a setter."
        );
      let i = yield su(n);
      i !== void 0 && (i = JSON.parse(JSON.stringify(i)));
      const { _rev: a } = uu(r) || {}, u = Object.assign({
        _id: t,
        _rev: a,
        $value: i,
        $config: !0
      });
      return yield this.upsert(t, (o) => {
        if (Object.keys(Mr(u, o)).length > 0)
          return u;
      }), i;
    });
  },
  configSelector(e = []) {
    return {
      selector: {
        _id: {
          [e.length ? "$in" : "$nin"]: e
        },
        $config: {
          $exists: !0
        }
      }
    };
  },
  createConfigIndex() {
    return be(this, null, function* () {
      return yield this.createIndex({
        index: {
          fields: ["$config"]
        }
      });
    });
  },
  findConfig(e) {
    return be(this, null, function* () {
      const { docs: t, warning: n } = yield this.find(
        this.configSelector(vt(e))
      );
      return fu(n), t;
    });
  },
  removeConfig(e) {
    return be(this, null, function* () {
      return yield fr(this, yield this.findConfig(e));
    });
  }
};
H.plugin(gt);
H.plugin(tu);
H.plugin(Ml);
H.plugin(Ul);
let Ri;
function Kl(e, t) {
  return Ri || (Ri = new H(e, t));
}
export {
  Ri as db,
  Kl as init
};
