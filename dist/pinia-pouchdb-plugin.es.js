import { h as Br, Suspense as Wa, watch as Ha } from "vue";
function Ya(e) {
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
const Xa = {}, Za = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xa
}, Symbol.toStringTag, { value: "Module" })), Va = /* @__PURE__ */ Ya(Za);
var rr = {};
rr.test = function() {
  return typeof (!1).queueMicrotask == "function";
};
rr.install = function(e) {
  return function() {
    (!1).queueMicrotask(e);
  };
};
var ir = {}, Ei = (!1).MutationObserver || (!1).WebKitMutationObserver;
ir.test = function() {
  return Ei;
};
ir.install = function(e) {
  var t = 0, n = new Ei(e), r = (!1).document.createTextNode("");
  return n.observe(r, {
    characterData: !0
  }), function() {
    r.data = t = ++t % 2;
  };
};
var ar = {};
ar.test = function() {
  return (!1).setImmediate ? !1 : typeof (!1).MessageChannel < "u";
};
ar.install = function(e) {
  var t = new (!1).MessageChannel();
  return t.port1.onmessage = e, function() {
    t.port2.postMessage(0);
  };
};
var ur = {};
ur.test = function() {
  return "document" in !1 && "onreadystatechange" in (!1).document.createElement("script");
};
ur.install = function(e) {
  return function() {
    var t = (!1).document.createElement("script");
    return t.onreadystatechange = function() {
      e(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null;
    }, (!1).document.documentElement.appendChild(t), e;
  };
};
var or = {};
or.test = function() {
  return !0;
};
or.install = function(e) {
  return function() {
    setTimeout(e, 0);
  };
};
var mt = [Va, rr, ir, ar, ur, or], it, Je, wt = -1, Le = [], jn = !1;
function eu() {
  !it || !Je || (it = !1, Je.length ? Le = Je.concat(Le) : wt = -1, Le.length && ki());
}
function ki() {
  if (!it) {
    jn = !1, it = !0;
    for (var e = Le.length, t = setTimeout(eu); e; ) {
      for (Je = Le, Le = []; Je && ++wt < e; )
        Je[wt].run();
      wt = -1, e = Le.length;
    }
    Je = null, wt = -1, it = !1, clearTimeout(t);
  }
}
var Ci, gt = -1, tu = mt.length;
for (; ++gt < tu; )
  if (mt[gt] && mt[gt].test && mt[gt].test()) {
    Ci = mt[gt].install(ki);
    break;
  }
function ji(e, t) {
  this.fun = e, this.array = t;
}
ji.prototype.run = function() {
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
var pe = nu;
function nu(e) {
  var t = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var n = 1; n < arguments.length; n++)
      t[n - 1] = arguments[n];
  Le.push(new ji(e, t)), !jn && !it && (jn = !0, Ci());
}
var Ft, ru = new Uint8Array(16);
function iu() {
  if (!Ft && (Ft = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !Ft))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Ft(ru);
}
const au = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function uu(e) {
  return typeof e == "string" && au.test(e);
}
var ye = [];
for (var yn = 0; yn < 256; ++yn)
  ye.push((yn + 256).toString(16).substr(1));
function ou(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = (ye[e[t + 0]] + ye[e[t + 1]] + ye[e[t + 2]] + ye[e[t + 3]] + "-" + ye[e[t + 4]] + ye[e[t + 5]] + "-" + ye[e[t + 6]] + ye[e[t + 7]] + "-" + ye[e[t + 8]] + ye[e[t + 9]] + "-" + ye[e[t + 10]] + ye[e[t + 11]] + ye[e[t + 12]] + ye[e[t + 13]] + ye[e[t + 14]] + ye[e[t + 15]]).toLowerCase();
  if (!uu(n))
    throw TypeError("Stringified UUID is invalid");
  return n;
}
function Ii(e, t, n) {
  e = e || {};
  var r = e.random || (e.rng || iu)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (var i = 0; i < 16; ++i)
      t[n + i] = r[i];
    return t;
  }
  return ou(r);
}
var Pi = { exports: {} };
(function(e, t) {
  (function(n) {
    e.exports = n();
  })(function(n) {
    var r = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    function i(g, h) {
      var f = g[0], l = g[1], d = g[2], y = g[3];
      f += (l & d | ~l & y) + h[0] - 680876936 | 0, f = (f << 7 | f >>> 25) + l | 0, y += (f & l | ~f & d) + h[1] - 389564586 | 0, y = (y << 12 | y >>> 20) + f | 0, d += (y & f | ~y & l) + h[2] + 606105819 | 0, d = (d << 17 | d >>> 15) + y | 0, l += (d & y | ~d & f) + h[3] - 1044525330 | 0, l = (l << 22 | l >>> 10) + d | 0, f += (l & d | ~l & y) + h[4] - 176418897 | 0, f = (f << 7 | f >>> 25) + l | 0, y += (f & l | ~f & d) + h[5] + 1200080426 | 0, y = (y << 12 | y >>> 20) + f | 0, d += (y & f | ~y & l) + h[6] - 1473231341 | 0, d = (d << 17 | d >>> 15) + y | 0, l += (d & y | ~d & f) + h[7] - 45705983 | 0, l = (l << 22 | l >>> 10) + d | 0, f += (l & d | ~l & y) + h[8] + 1770035416 | 0, f = (f << 7 | f >>> 25) + l | 0, y += (f & l | ~f & d) + h[9] - 1958414417 | 0, y = (y << 12 | y >>> 20) + f | 0, d += (y & f | ~y & l) + h[10] - 42063 | 0, d = (d << 17 | d >>> 15) + y | 0, l += (d & y | ~d & f) + h[11] - 1990404162 | 0, l = (l << 22 | l >>> 10) + d | 0, f += (l & d | ~l & y) + h[12] + 1804603682 | 0, f = (f << 7 | f >>> 25) + l | 0, y += (f & l | ~f & d) + h[13] - 40341101 | 0, y = (y << 12 | y >>> 20) + f | 0, d += (y & f | ~y & l) + h[14] - 1502002290 | 0, d = (d << 17 | d >>> 15) + y | 0, l += (d & y | ~d & f) + h[15] + 1236535329 | 0, l = (l << 22 | l >>> 10) + d | 0, f += (l & y | d & ~y) + h[1] - 165796510 | 0, f = (f << 5 | f >>> 27) + l | 0, y += (f & d | l & ~d) + h[6] - 1069501632 | 0, y = (y << 9 | y >>> 23) + f | 0, d += (y & l | f & ~l) + h[11] + 643717713 | 0, d = (d << 14 | d >>> 18) + y | 0, l += (d & f | y & ~f) + h[0] - 373897302 | 0, l = (l << 20 | l >>> 12) + d | 0, f += (l & y | d & ~y) + h[5] - 701558691 | 0, f = (f << 5 | f >>> 27) + l | 0, y += (f & d | l & ~d) + h[10] + 38016083 | 0, y = (y << 9 | y >>> 23) + f | 0, d += (y & l | f & ~l) + h[15] - 660478335 | 0, d = (d << 14 | d >>> 18) + y | 0, l += (d & f | y & ~f) + h[4] - 405537848 | 0, l = (l << 20 | l >>> 12) + d | 0, f += (l & y | d & ~y) + h[9] + 568446438 | 0, f = (f << 5 | f >>> 27) + l | 0, y += (f & d | l & ~d) + h[14] - 1019803690 | 0, y = (y << 9 | y >>> 23) + f | 0, d += (y & l | f & ~l) + h[3] - 187363961 | 0, d = (d << 14 | d >>> 18) + y | 0, l += (d & f | y & ~f) + h[8] + 1163531501 | 0, l = (l << 20 | l >>> 12) + d | 0, f += (l & y | d & ~y) + h[13] - 1444681467 | 0, f = (f << 5 | f >>> 27) + l | 0, y += (f & d | l & ~d) + h[2] - 51403784 | 0, y = (y << 9 | y >>> 23) + f | 0, d += (y & l | f & ~l) + h[7] + 1735328473 | 0, d = (d << 14 | d >>> 18) + y | 0, l += (d & f | y & ~f) + h[12] - 1926607734 | 0, l = (l << 20 | l >>> 12) + d | 0, f += (l ^ d ^ y) + h[5] - 378558 | 0, f = (f << 4 | f >>> 28) + l | 0, y += (f ^ l ^ d) + h[8] - 2022574463 | 0, y = (y << 11 | y >>> 21) + f | 0, d += (y ^ f ^ l) + h[11] + 1839030562 | 0, d = (d << 16 | d >>> 16) + y | 0, l += (d ^ y ^ f) + h[14] - 35309556 | 0, l = (l << 23 | l >>> 9) + d | 0, f += (l ^ d ^ y) + h[1] - 1530992060 | 0, f = (f << 4 | f >>> 28) + l | 0, y += (f ^ l ^ d) + h[4] + 1272893353 | 0, y = (y << 11 | y >>> 21) + f | 0, d += (y ^ f ^ l) + h[7] - 155497632 | 0, d = (d << 16 | d >>> 16) + y | 0, l += (d ^ y ^ f) + h[10] - 1094730640 | 0, l = (l << 23 | l >>> 9) + d | 0, f += (l ^ d ^ y) + h[13] + 681279174 | 0, f = (f << 4 | f >>> 28) + l | 0, y += (f ^ l ^ d) + h[0] - 358537222 | 0, y = (y << 11 | y >>> 21) + f | 0, d += (y ^ f ^ l) + h[3] - 722521979 | 0, d = (d << 16 | d >>> 16) + y | 0, l += (d ^ y ^ f) + h[6] + 76029189 | 0, l = (l << 23 | l >>> 9) + d | 0, f += (l ^ d ^ y) + h[9] - 640364487 | 0, f = (f << 4 | f >>> 28) + l | 0, y += (f ^ l ^ d) + h[12] - 421815835 | 0, y = (y << 11 | y >>> 21) + f | 0, d += (y ^ f ^ l) + h[15] + 530742520 | 0, d = (d << 16 | d >>> 16) + y | 0, l += (d ^ y ^ f) + h[2] - 995338651 | 0, l = (l << 23 | l >>> 9) + d | 0, f += (d ^ (l | ~y)) + h[0] - 198630844 | 0, f = (f << 6 | f >>> 26) + l | 0, y += (l ^ (f | ~d)) + h[7] + 1126891415 | 0, y = (y << 10 | y >>> 22) + f | 0, d += (f ^ (y | ~l)) + h[14] - 1416354905 | 0, d = (d << 15 | d >>> 17) + y | 0, l += (y ^ (d | ~f)) + h[5] - 57434055 | 0, l = (l << 21 | l >>> 11) + d | 0, f += (d ^ (l | ~y)) + h[12] + 1700485571 | 0, f = (f << 6 | f >>> 26) + l | 0, y += (l ^ (f | ~d)) + h[3] - 1894986606 | 0, y = (y << 10 | y >>> 22) + f | 0, d += (f ^ (y | ~l)) + h[10] - 1051523 | 0, d = (d << 15 | d >>> 17) + y | 0, l += (y ^ (d | ~f)) + h[1] - 2054922799 | 0, l = (l << 21 | l >>> 11) + d | 0, f += (d ^ (l | ~y)) + h[8] + 1873313359 | 0, f = (f << 6 | f >>> 26) + l | 0, y += (l ^ (f | ~d)) + h[15] - 30611744 | 0, y = (y << 10 | y >>> 22) + f | 0, d += (f ^ (y | ~l)) + h[6] - 1560198380 | 0, d = (d << 15 | d >>> 17) + y | 0, l += (y ^ (d | ~f)) + h[13] + 1309151649 | 0, l = (l << 21 | l >>> 11) + d | 0, f += (d ^ (l | ~y)) + h[4] - 145523070 | 0, f = (f << 6 | f >>> 26) + l | 0, y += (l ^ (f | ~d)) + h[11] - 1120210379 | 0, y = (y << 10 | y >>> 22) + f | 0, d += (f ^ (y | ~l)) + h[2] + 718787259 | 0, d = (d << 15 | d >>> 17) + y | 0, l += (y ^ (d | ~f)) + h[9] - 343485551 | 0, l = (l << 21 | l >>> 11) + d | 0, g[0] = f + g[0] | 0, g[1] = l + g[1] | 0, g[2] = d + g[2] | 0, g[3] = y + g[3] | 0;
    }
    function a(g) {
      var h = [], f;
      for (f = 0; f < 64; f += 4)
        h[f >> 2] = g.charCodeAt(f) + (g.charCodeAt(f + 1) << 8) + (g.charCodeAt(f + 2) << 16) + (g.charCodeAt(f + 3) << 24);
      return h;
    }
    function u(g) {
      var h = [], f;
      for (f = 0; f < 64; f += 4)
        h[f >> 2] = g[f] + (g[f + 1] << 8) + (g[f + 2] << 16) + (g[f + 3] << 24);
      return h;
    }
    function o(g) {
      var h = g.length, f = [1732584193, -271733879, -1732584194, 271733878], l, d, y, j, R, B;
      for (l = 64; l <= h; l += 64)
        i(f, a(g.substring(l - 64, l)));
      for (g = g.substring(l - 64), d = g.length, y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], l = 0; l < d; l += 1)
        y[l >> 2] |= g.charCodeAt(l) << (l % 4 << 3);
      if (y[l >> 2] |= 128 << (l % 4 << 3), l > 55)
        for (i(f, y), l = 0; l < 16; l += 1)
          y[l] = 0;
      return j = h * 8, j = j.toString(16).match(/(.*?)(.{0,8})$/), R = parseInt(j[2], 16), B = parseInt(j[1], 16) || 0, y[14] = R, y[15] = B, i(f, y), f;
    }
    function c(g) {
      var h = g.length, f = [1732584193, -271733879, -1732584194, 271733878], l, d, y, j, R, B;
      for (l = 64; l <= h; l += 64)
        i(f, u(g.subarray(l - 64, l)));
      for (g = l - 64 < h ? g.subarray(l - 64) : new Uint8Array(0), d = g.length, y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], l = 0; l < d; l += 1)
        y[l >> 2] |= g[l] << (l % 4 << 3);
      if (y[l >> 2] |= 128 << (l % 4 << 3), l > 55)
        for (i(f, y), l = 0; l < 16; l += 1)
          y[l] = 0;
      return j = h * 8, j = j.toString(16).match(/(.*?)(.{0,8})$/), R = parseInt(j[2], 16), B = parseInt(j[1], 16) || 0, y[14] = R, y[15] = B, i(f, y), f;
    }
    function _(g) {
      var h = "", f;
      for (f = 0; f < 4; f += 1)
        h += r[g >> f * 8 + 4 & 15] + r[g >> f * 8 & 15];
      return h;
    }
    function b(g) {
      var h;
      for (h = 0; h < g.length; h += 1)
        g[h] = _(g[h]);
      return g.join("");
    }
    b(o("hello")), typeof ArrayBuffer < "u" && !ArrayBuffer.prototype.slice && function() {
      function g(h, f) {
        return h = h | 0 || 0, h < 0 ? Math.max(h + f, 0) : Math.min(h, f);
      }
      ArrayBuffer.prototype.slice = function(h, f) {
        var l = this.byteLength, d = g(h, l), y = l, j, R, B, L;
        return f !== n && (y = g(f, l)), d > y ? new ArrayBuffer(0) : (j = y - d, R = new ArrayBuffer(j), B = new Uint8Array(R), L = new Uint8Array(this, d, j), B.set(L), R);
      };
    }();
    function s(g) {
      return /[\u0080-\uFFFF]/.test(g) && (g = unescape(encodeURIComponent(g))), g;
    }
    function m(g, h) {
      var f = g.length, l = new ArrayBuffer(f), d = new Uint8Array(l), y;
      for (y = 0; y < f; y += 1)
        d[y] = g.charCodeAt(y);
      return h ? d : l;
    }
    function O(g) {
      return String.fromCharCode.apply(null, new Uint8Array(g));
    }
    function $(g, h, f) {
      var l = new Uint8Array(g.byteLength + h.byteLength);
      return l.set(new Uint8Array(g)), l.set(new Uint8Array(h), g.byteLength), f ? l : l.buffer;
    }
    function S(g) {
      var h = [], f = g.length, l;
      for (l = 0; l < f - 1; l += 2)
        h.push(parseInt(g.substr(l, 2), 16));
      return String.fromCharCode.apply(String, h);
    }
    function A() {
      this.reset();
    }
    return A.prototype.append = function(g) {
      return this.appendBinary(s(g)), this;
    }, A.prototype.appendBinary = function(g) {
      this._buff += g, this._length += g.length;
      var h = this._buff.length, f;
      for (f = 64; f <= h; f += 64)
        i(this._hash, a(this._buff.substring(f - 64, f)));
      return this._buff = this._buff.substring(f - 64), this;
    }, A.prototype.end = function(g) {
      var h = this._buff, f = h.length, l, d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], y;
      for (l = 0; l < f; l += 1)
        d[l >> 2] |= h.charCodeAt(l) << (l % 4 << 3);
      return this._finish(d, f), y = b(this._hash), g && (y = S(y)), this.reset(), y;
    }, A.prototype.reset = function() {
      return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, A.prototype.getState = function() {
      return {
        buff: this._buff,
        length: this._length,
        hash: this._hash.slice()
      };
    }, A.prototype.setState = function(g) {
      return this._buff = g.buff, this._length = g.length, this._hash = g.hash, this;
    }, A.prototype.destroy = function() {
      delete this._hash, delete this._buff, delete this._length;
    }, A.prototype._finish = function(g, h) {
      var f = h, l, d, y;
      if (g[f >> 2] |= 128 << (f % 4 << 3), f > 55)
        for (i(this._hash, g), f = 0; f < 16; f += 1)
          g[f] = 0;
      l = this._length * 8, l = l.toString(16).match(/(.*?)(.{0,8})$/), d = parseInt(l[2], 16), y = parseInt(l[1], 16) || 0, g[14] = d, g[15] = y, i(this._hash, g);
    }, A.hash = function(g, h) {
      return A.hashBinary(s(g), h);
    }, A.hashBinary = function(g, h) {
      var f = o(g), l = b(f);
      return h ? S(l) : l;
    }, A.ArrayBuffer = function() {
      this.reset();
    }, A.ArrayBuffer.prototype.append = function(g) {
      var h = $(this._buff.buffer, g, !0), f = h.length, l;
      for (this._length += g.byteLength, l = 64; l <= f; l += 64)
        i(this._hash, u(h.subarray(l - 64, l)));
      return this._buff = l - 64 < f ? new Uint8Array(h.buffer.slice(l - 64)) : new Uint8Array(0), this;
    }, A.ArrayBuffer.prototype.end = function(g) {
      var h = this._buff, f = h.length, l = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], d, y;
      for (d = 0; d < f; d += 1)
        l[d >> 2] |= h[d] << (d % 4 << 3);
      return this._finish(l, f), y = b(this._hash), g && (y = S(y)), this.reset(), y;
    }, A.ArrayBuffer.prototype.reset = function() {
      return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, A.ArrayBuffer.prototype.getState = function() {
      var g = A.prototype.getState.call(this);
      return g.buff = O(g.buff), g;
    }, A.ArrayBuffer.prototype.setState = function(g) {
      return g.buff = m(g.buff, !0), A.prototype.setState.call(this, g);
    }, A.ArrayBuffer.prototype.destroy = A.prototype.destroy, A.ArrayBuffer.prototype._finish = A.prototype._finish, A.ArrayBuffer.hash = function(g, h) {
      var f = c(new Uint8Array(g)), l = b(f);
      return h ? S(l) : l;
    }, A;
  });
})(Pi);
const Qt = Pi.exports;
var en = {};
en.stringify = function(t) {
  var n = [];
  n.push({
    obj: t
  });
  for (var r = "", i, a, u, o, c, _, b, s, m, O, $; i = n.pop(); )
    if (a = i.obj, u = i.prefix || "", o = i.val || "", r += u, o)
      r += o;
    else if (typeof a != "object")
      r += typeof a > "u" ? null : JSON.stringify(a);
    else if (a === null)
      r += "null";
    else if (Array.isArray(a)) {
      for (n.push({
        val: "]"
      }), c = a.length - 1; c >= 0; c--)
        _ = c === 0 ? "" : ",", n.push({
          obj: a[c],
          prefix: _
        });
      n.push({
        val: "["
      });
    } else {
      b = [];
      for (s in a)
        a.hasOwnProperty(s) && b.push(s);
      for (n.push({
        val: "}"
      }), c = b.length - 1; c >= 0; c--)
        m = b[c], O = a[m], $ = c > 0 ? "," : "", $ += JSON.stringify(m) + ":", n.push({
          obj: O,
          prefix: $
        });
      n.push({
        val: "{"
      });
    }
  return r;
};
function tt(e, t, n) {
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
en.parse = function(e) {
  for (var t = [], n = [], r = 0, i, a, u, o, c, _, b, s, m; ; ) {
    if (i = e[r++], i === "}" || i === "]" || typeof i > "u") {
      if (t.length === 1)
        return t.pop();
      tt(t.pop(), t, n);
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
        r += 3, tt(null, t, n);
        break;
      case "t":
        r += 3, tt(!0, t, n);
        break;
      case "f":
        r += 4, tt(!1, t, n);
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
        tt(parseFloat(a), t, n);
        break;
      case '"':
        for (o = "", c = void 0, _ = 0; b = e[r++], b !== '"' || c === "\\" && _ % 2 === 1; )
          o += b, c = b, c === "\\" ? _++ : _ = 0;
        tt(JSON.parse('"' + o + '"'), t, n);
        break;
      case "[":
        s = {
          element: [],
          index: t.length
        }, t.push(s.element), n.push(s);
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
var Te = fu;
function fu(e) {
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
var de = { exports: {} }, at = typeof Reflect == "object" ? Reflect : null, Rr = at && typeof at.apply == "function" ? at.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, zt;
at && typeof at.ownKeys == "function" ? zt = at.ownKeys : Object.getOwnPropertySymbols ? zt = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : zt = function(t) {
  return Object.getOwnPropertyNames(t);
};
function su(e) {
  console && console.warn && console.warn(e);
}
var qi = Number.isNaN || function(t) {
  return t !== t;
};
function ne() {
  ne.init.call(this);
}
de.exports = ne;
de.exports.once = vu;
ne.EventEmitter = ne;
ne.prototype._events = void 0;
ne.prototype._eventsCount = 0;
ne.prototype._maxListeners = void 0;
var Lr = 10;
function tn(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(ne, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Lr;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || qi(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    Lr = e;
  }
});
ne.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
ne.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || qi(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function Ti(e) {
  return e._maxListeners === void 0 ? ne.defaultMaxListeners : e._maxListeners;
}
ne.prototype.getMaxListeners = function() {
  return Ti(this);
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
  var c = a[t];
  if (c === void 0)
    return !1;
  if (typeof c == "function")
    Rr(c, this, n);
  else
    for (var _ = c.length, b = Ni(c, _), r = 0; r < _; ++r)
      Rr(b[r], this, n);
  return !0;
};
function Bi(e, t, n, r) {
  var i, a, u;
  if (tn(n), a = e._events, a === void 0 ? (a = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (a.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n), a = e._events), u = a[t]), u === void 0)
    u = a[t] = n, ++e._eventsCount;
  else if (typeof u == "function" ? u = a[t] = r ? [n, u] : [u, n] : r ? u.unshift(n) : u.push(n), i = Ti(e), i > 0 && u.length > i && !u.warned) {
    u.warned = !0;
    var o = new Error("Possible EventEmitter memory leak detected. " + u.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    o.name = "MaxListenersExceededWarning", o.emitter = e, o.type = t, o.count = u.length, su(o);
  }
  return e;
}
ne.prototype.addListener = function(t, n) {
  return Bi(this, t, n, !1);
};
ne.prototype.on = ne.prototype.addListener;
ne.prototype.prependListener = function(t, n) {
  return Bi(this, t, n, !0);
};
function cu() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Ri(e, t, n) {
  var r = {
    fired: !1,
    wrapFn: void 0,
    target: e,
    type: t,
    listener: n
  }, i = cu.bind(r);
  return i.listener = n, r.wrapFn = i, i;
}
ne.prototype.once = function(t, n) {
  return tn(n), this.on(t, Ri(this, t, n)), this;
};
ne.prototype.prependOnceListener = function(t, n) {
  return tn(n), this.prependListener(t, Ri(this, t, n)), this;
};
ne.prototype.removeListener = function(t, n) {
  var r, i, a, u, o;
  if (tn(n), i = this._events, i === void 0)
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
    a === 0 ? r.shift() : lu(r, a), r.length === 1 && (i[t] = r[0]), i.removeListener !== void 0 && this.emit("removeListener", t, o || n);
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
function Li(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var i = r[t];
  return i === void 0 ? [] : typeof i == "function" ? n ? [i.listener || i] : [i] : n ? du(i) : Ni(i, i.length);
}
ne.prototype.listeners = function(t) {
  return Li(this, t, !0);
};
ne.prototype.rawListeners = function(t) {
  return Li(this, t, !1);
};
ne.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : Di.call(e, t);
};
ne.prototype.listenerCount = Di;
function Di(e) {
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
  return this._eventsCount > 0 ? zt(this._events) : [];
};
function Ni(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function lu(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function du(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function vu(e, t) {
  return new Promise(function(n, r) {
    function i(u) {
      e.removeListener(t, a), r(u);
    }
    function a() {
      typeof e.removeListener == "function" && e.removeListener("error", i), n([].slice.call(arguments));
    }
    Fi(e, t, a, {
      once: !0
    }), t !== "error" && hu(e, i, {
      once: !0
    });
  });
}
function hu(e, t, n) {
  typeof e.on == "function" && Fi(e, "error", t, n);
}
function Fi(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function i(a) {
      r.once && e.removeEventListener(t, i), n(a);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
function nn(e) {
  return "$" + e;
}
function Mi(e) {
  return e.substring(1);
}
function Be() {
  this._store = {};
}
Be.prototype.get = function(e) {
  var t = nn(e);
  return this._store[t];
};
Be.prototype.set = function(e, t) {
  var n = nn(e);
  return this._store[n] = t, !0;
};
Be.prototype.has = function(e) {
  var t = nn(e);
  return t in this._store;
};
Be.prototype.keys = function() {
  return Object.keys(this._store).map((e) => Mi(e));
};
Be.prototype.delete = function(e) {
  var t = nn(e), n = t in this._store;
  return delete this._store[t], n;
};
Be.prototype.forEach = function(e) {
  for (var t = Object.keys(this._store), n = 0, r = t.length; n < r; n++) {
    var i = t[n], a = this._store[i];
    i = Mi(i), e(a, i);
  }
};
Object.defineProperty(Be.prototype, "size", {
  get: function() {
    return Object.keys(this._store).length;
  }
});
function Ct(e) {
  if (this._store = new Be(), e && Array.isArray(e))
    for (var t = 0, n = e.length; t < n; t++)
      this.add(e[t]);
}
Ct.prototype.add = function(e) {
  return this._store.set(e, !0);
};
Ct.prototype.has = function(e) {
  return this._store.has(e);
};
Ct.prototype.forEach = function(e) {
  this._store.forEach(function(t, n) {
    e(n);
  });
};
Object.defineProperty(Ct.prototype, "size", {
  get: function() {
    return this._store.size;
  }
});
function yu() {
  if (typeof Symbol > "u" || typeof Map > "u" || typeof Set > "u")
    return !1;
  var e = Object.getOwnPropertyDescriptor(Map, Symbol.species);
  return e && "get" in e && Map[Symbol.species] === Map;
}
var st, me;
yu() ? (st = Set, me = Map) : (st = Ct, me = Be);
function gu(e) {
  return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer || typeof Blob < "u" && e instanceof Blob;
}
function pu(e) {
  if (typeof e.slice == "function")
    return e.slice(0);
  var t = new ArrayBuffer(e.byteLength), n = new Uint8Array(t), r = new Uint8Array(e);
  return n.set(r), t;
}
function _u(e) {
  if (e instanceof ArrayBuffer)
    return pu(e);
  var t = e.size, n = e.type;
  return typeof e.slice == "function" ? e.slice(0, t, n) : e.webkitSlice(0, t, n);
}
var Ui = Function.prototype.toString, mu = Ui.call(Object);
function wu(e) {
  var t = Object.getPrototypeOf(e);
  if (t === null)
    return !0;
  var n = t.constructor;
  return typeof n == "function" && n instanceof n && Ui.call(n) == mu;
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
  if (gu(e))
    return _u(e);
  if (!wu(e))
    return e;
  t = {};
  for (n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      var i = le(e[n]);
      typeof i < "u" && (t[n] = i);
    }
  return t;
}
function zi(e) {
  var t = !1;
  return Te(function(n) {
    if (t)
      throw new Error("once called more than once");
    t = !0, e.apply(this, n);
  });
}
function Ki(e) {
  return Te(function(t) {
    t = le(t);
    var n = this, r = typeof t[t.length - 1] == "function" ? t.pop() : !1, i = new Promise(function(a, u) {
      var o;
      try {
        var c = zi(function(_, b) {
          _ ? u(_) : a(b);
        });
        t.push(c), o = e.apply(n, t), o && typeof o.then == "function" && a(o);
      } catch (_) {
        u(_);
      }
    });
    return r && i.then(function(a) {
      r(null, a);
    }, r), i;
  });
}
function bu(e, t, n) {
  if (e.constructor.listeners("debug").length) {
    for (var r = ["api", e.name, t], i = 0; i < n.length - 1; i++)
      r.push(n[i]);
    e.constructor.emit("debug", r);
    var a = n[n.length - 1];
    n[n.length - 1] = function(u, o) {
      var c = ["api", e.name, t];
      c = c.concat(u ? ["error", u] : ["success", o]), e.constructor.emit("debug", c), a(u, o);
    };
  }
}
function se(e, t) {
  return Ki(Te(function(n) {
    if (this._closed)
      return Promise.reject(new Error("database is closed"));
    if (this._destroyed)
      return Promise.reject(new Error("database is destroyed"));
    var r = this;
    return bu(r, e, n), this.taskqueue.isReady ? t.apply(this, n) : new Promise(function(i, a) {
      r.taskqueue.addTask(function(u) {
        u ? a(u) : i(r[e].apply(r, n));
      });
    });
  }));
}
function jt(e, t) {
  for (var n = {}, r = 0, i = t.length; r < i; r++) {
    var a = t[r];
    a in e && (n[a] = e[a]);
  }
  return n;
}
var $u = 6;
function Dr(e) {
  return e;
}
function Au(e) {
  return [{
    ok: e
  }];
}
function Ji(e, t, n) {
  var r = t.docs, i = new me();
  r.forEach(function(S) {
    i.has(S.id) ? i.get(S.id).push(S) : i.set(S.id, [S]);
  });
  var a = i.size, u = 0, o = new Array(a);
  function c() {
    var S = [];
    o.forEach(function(A) {
      A.docs.forEach(function(g) {
        S.push({
          id: A.id,
          docs: [g]
        });
      });
    }), n(null, {
      results: S
    });
  }
  function _() {
    ++u === a && c();
  }
  function b(S, A, g) {
    o[S] = {
      id: A,
      docs: g
    }, _();
  }
  var s = [];
  i.forEach(function(S, A) {
    s.push(A);
  });
  var m = 0;
  function O() {
    if (!(m >= s.length)) {
      var S = Math.min(m + $u, s.length), A = s.slice(m, S);
      $(A, m), m += A.length;
    }
  }
  function $(S, A) {
    S.forEach(function(g, h) {
      var f = A + h, l = i.get(g), d = jt(l[0], ["atts_since", "attachments"]);
      d.open_revs = l.map(function(j) {
        return j.rev;
      }), d.open_revs = d.open_revs.filter(Dr);
      var y = Dr;
      d.open_revs.length === 0 && (delete d.open_revs, y = Au), ["revs", "attachments", "binary", "ajax", "latest"].forEach(function(j) {
        j in t && (d[j] = t[j]);
      }), e.get(g, d, function(j, R) {
        var B;
        j ? B = [{
          error: j
        }] : B = y(R), b(f, g, B), O();
      });
    });
  }
  O();
}
var In;
try {
  localStorage.setItem("_pouch_check_localstorage", 1), In = !!localStorage.getItem("_pouch_check_localstorage");
} catch {
  In = !1;
}
function rn() {
  return In;
}
ve.exports(dt, de.exports);
function Ou(e) {
  rn() && addEventListener("storage", function(t) {
    e.emit(t.key);
  });
}
function dt() {
  de.exports.call(this), this._listeners = {}, Ou(this);
}
dt.prototype.addListener = function(e, t, n, r) {
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
    var o = jt(r, ["style", "include_docs", "attachments", "conflicts", "filter", "doc_ids", "view", "since", "query_params", "binary", "return_docs"]);
    function c() {
      a = !1;
    }
    n.changes(o).on("change", function(_) {
      _.seq > r.since && !r.cancelled && (r.since = _.seq, r.onChange(_));
    }).on("complete", function() {
      a === "waiting" && pe(u), a = !1;
    }).on("error", c);
  }
  this._listeners[t] = u, this.on(e, u);
};
dt.prototype.removeListener = function(e, t) {
  t in this._listeners && (de.exports.prototype.removeListener.call(this, e, this._listeners[t]), delete this._listeners[t]);
};
dt.prototype.notifyLocalWindows = function(e) {
  rn() && (localStorage[e] = localStorage[e] === "a" ? "b" : "a");
};
dt.prototype.notify = function(e) {
  this.emit(e), this.notifyLocalWindows(e);
};
function $e(e) {
  if (typeof console < "u" && typeof console[e] == "function") {
    var t = Array.prototype.slice.call(arguments, 1);
    console[e].apply(console, t);
  }
}
function Su(e, t) {
  var n = 6e5;
  e = parseInt(e, 10) || 0, t = parseInt(t, 10), t !== t || t <= e ? t = (e || 1) << 1 : t = t + 1, t > n && (e = n >> 1, t = n);
  var r = Math.random(), i = t - e;
  return ~~(i * r + e);
}
function xu(e) {
  var t = 0;
  return e || (t = 2e3), Su(e, t);
}
function Pn(e, t) {
  $e("info", "The above " + e + " is totally normal. " + t);
}
var qn;
typeof Object.assign == "function" ? qn = Object.assign : qn = function(e) {
  for (var t = Object(e), n = 1; n < arguments.length; n++) {
    var r = arguments[n];
    if (r != null)
      for (var i in r)
        Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
  }
  return t;
};
var We = qn;
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
var Eu = new re(400, "bad_request", "Missing JSON list of 'docs'"), ke = new re(404, "not_found", "missing"), ct = new re(409, "conflict", "Document update conflict"), Qi = new re(400, "bad_request", "_id field must contain a string"), ku = new re(412, "missing_id", "_id is required for puts"), Cu = new re(400, "bad_request", "Only reserved document ids may start with underscore.");
new re(412, "precondition_failed", "Database not open");
var Gi = new re(500, "unknown_error", "Database encountered an unknown error"), Wi = new re(500, "badarg", "Some query argument is invalid");
new re(400, "invalid_request", "Request was invalid");
var ju = new re(400, "query_parse_error", "Some query parameter is invalid"), Nr = new re(500, "doc_validation", "Bad special document member"), an = new re(400, "bad_request", "Something wrong with the request"), fr = new re(400, "bad_request", "Document must be a JSON object");
new re(404, "not_found", "Database not found");
var sr = new re(500, "indexed_db_went_bad", "unknown");
new re(500, "web_sql_went_bad", "unknown");
new re(500, "levelDB_went_went_bad", "unknown");
new re(403, "forbidden", "Forbidden by design doc validate_doc_update function");
var Hi = new re(400, "bad_request", "Invalid rev format");
new re(412, "file_exists", "The database could not be created, the file already exists.");
var Iu = new re(412, "missing_stub", "A pre-existing attachment stub wasn't found");
new re(413, "invalid_url", "Provided URL is invalid");
function V(e, t) {
  function n(r) {
    for (var i = Object.getOwnPropertyNames(e), a = 0, u = i.length; a < u; a++)
      typeof e[i[a]] != "function" && (this[i[a]] = e[i[a]]);
    this.stack === void 0 && (this.stack = new Error().stack), r !== void 0 && (this.reason = r);
  }
  return n.prototype = re.prototype, new n(t);
}
function lt(e) {
  if (typeof e != "object") {
    var t = e;
    e = Gi, e.data = t;
  }
  return "error" in e && e.error === "conflict" && (e.name = "conflict", e.status = 409), "name" in e || (e.name = e.error || "unknown"), "status" in e || (e.status = 500), "message" in e || (e.message = e.message || e.reason), "stack" in e || (e.stack = new Error().stack), e;
}
function Pu(e, t, n) {
  try {
    return !e(t, n);
  } catch (i) {
    var r = "Filter function threw: " + i.toString();
    return V(an, r);
  }
}
function cr(e) {
  var t = {}, n = e.filter && typeof e.filter == "function";
  return t.query = e.query_params, function(i) {
    i.doc || (i.doc = {});
    var a = n && Pu(e.filter, i.doc, t);
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
function Gt(e) {
  for (var t = [], n = 0, r = e.length; n < r; n++)
    t = t.concat(e[n]);
  return t;
}
function Yi(e) {
  var t;
  if (e ? typeof e != "string" ? t = V(Qi) : /^_/.test(e) && !/^_(design|local)/.test(e) && (t = V(Cu)) : t = V(ku), t)
    throw t;
}
function Pe(e) {
  return typeof e._remote == "boolean" ? e._remote : typeof e.type == "function" ? ($e("warn", "db.type() is deprecated and will be removed in a future version of PouchDB"), e.type() === "http") : !1;
}
function qu(e, t) {
  return "listenerCount" in e ? e.listenerCount(t) : de.exports.listenerCount(e, t);
}
function Tn(e) {
  if (!e)
    return null;
  var t = e.split("/");
  return t.length === 2 ? t : t.length === 1 ? [e, e] : null;
}
function Fr(e) {
  var t = Tn(e);
  return t ? t.join("/") : null;
}
var Mr = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"], Ur = "queryKey", Tu = /(?:^|&)([^&=]*)=?([^&]*)/g, Bu = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
function Xi(e) {
  for (var t = Bu.exec(e), n = {}, r = 14; r--; ) {
    var i = Mr[r], a = t[r] || "", u = ["user", "password"].indexOf(i) !== -1;
    n[i] = u ? decodeURIComponent(a) : a;
  }
  return n[Ur] = {}, n[Mr[12]].replace(Tu, function(o, c, _) {
    c && (n[Ur][c] = _);
  }), n;
}
function lr(e, t) {
  var n = [], r = [];
  for (var i in t)
    Object.prototype.hasOwnProperty.call(t, i) && (n.push(i), r.push(t[i]));
  return n.push(e), Function.apply(null, n).apply(null, r);
}
function un(e, t, n) {
  return e.get(t).catch(function(r) {
    if (r.status !== 404)
      throw r;
    return {};
  }).then(function(r) {
    var i = r._rev, a = n(r);
    return a ? (a._id = t, a._rev = i, Ru(e, a, n)) : {
      updated: !1,
      rev: i
    };
  });
}
function Ru(e, t, n) {
  return e.put(t).then(function(r) {
    return {
      updated: !0,
      rev: r.rev
    };
  }, function(r) {
    if (r.status !== 409)
      throw r;
    return un(e, t._id, n);
  });
}
var dr = function(e) {
  return atob(e);
}, It = function(e) {
  return btoa(e);
};
function vr(e, t) {
  e = e || [], t = t || {};
  try {
    return new Blob(e, t);
  } catch (a) {
    if (a.name !== "TypeError")
      throw a;
    for (var n = typeof BlobBuilder < "u" ? BlobBuilder : typeof MSBlobBuilder < "u" ? MSBlobBuilder : typeof MozBlobBuilder < "u" ? MozBlobBuilder : WebKitBlobBuilder, r = new n(), i = 0; i < e.length; i += 1)
      r.append(e[i]);
    return r.getBlob(t.type);
  }
}
function Lu(e) {
  for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), i = 0; i < t; i++)
    r[i] = e.charCodeAt(i);
  return n;
}
function hr(e, t) {
  return vr([Lu(e)], {
    type: t
  });
}
function yr(e, t) {
  return hr(dr(e), t);
}
function Du(e) {
  for (var t = "", n = new Uint8Array(e), r = n.byteLength, i = 0; i < r; i++)
    t += String.fromCharCode(n[i]);
  return t;
}
function Zi(e, t) {
  var n = new FileReader(), r = typeof n.readAsBinaryString == "function";
  n.onloadend = function(i) {
    var a = i.target.result || "";
    if (r)
      return t(a);
    t(Du(a));
  }, r ? n.readAsBinaryString(e) : n.readAsArrayBuffer(e);
}
function Vi(e, t) {
  Zi(e, function(n) {
    t(n);
  });
}
function gr(e, t) {
  Vi(e, function(n) {
    t(It(n));
  });
}
function Nu(e, t) {
  var n = new FileReader();
  n.onloadend = function(r) {
    var i = r.target.result || new ArrayBuffer(0);
    t(i);
  }, n.readAsArrayBuffer(e);
}
var Fu = self.setImmediate || self.setTimeout, Mu = 32768;
function Uu(e) {
  return It(e);
}
function zu(e, t, n) {
  return e.webkitSlice ? e.webkitSlice(t, n) : e.slice(t, n);
}
function Ku(e, t, n, r, i) {
  (n > 0 || r < t.size) && (t = zu(t, n, r)), Nu(t, function(a) {
    e.append(a), i();
  });
}
function Ju(e, t, n, r, i) {
  (n > 0 || r < t.length) && (t = t.substring(n, r)), e.appendBinary(t), i();
}
function pr(e, t) {
  var n = typeof e == "string", r = n ? e.length : e.size, i = Math.min(Mu, r), a = Math.ceil(r / i), u = 0, o = n ? new Qt() : new Qt.ArrayBuffer(), c = n ? Ju : Ku;
  function _() {
    Fu(s);
  }
  function b() {
    var m = o.end(!0), O = Uu(m);
    t(O), o.destroy();
  }
  function s() {
    var m = u * i, O = m + i;
    u++, u < a ? c(o, e, m, O, _) : c(o, e, m, O, b);
  }
  s();
}
function ea(e) {
  return Qt.hash(e);
}
function ta(e, t) {
  if (!t)
    return Ii().replace(/-/g, "").toLowerCase();
  var n = We({}, e);
  return delete n._rev_tree, ea(JSON.stringify(n));
}
var on = Ii;
function He(e) {
  for (var t, n, r, i = e.rev_tree.slice(), a; a = i.pop(); ) {
    var u = a.ids, o = u[2], c = a.pos;
    if (o.length) {
      for (var _ = 0, b = o.length; _ < b; _++)
        i.push({
          pos: c + 1,
          ids: o[_]
        });
      continue;
    }
    var s = !!u[1].deleted, m = u[0];
    (!t || (r !== s ? r : n !== c ? n < c : t < m)) && (t = m, n = c, r = s);
  }
  return n + "-" + t;
}
function et(e, t) {
  for (var n = e.slice(), r; r = n.pop(); )
    for (var i = r.pos, a = r.ids, u = a[2], o = t(u.length === 0, i, a[0], r.ctx, a[1]), c = 0, _ = u.length; c < _; c++)
      n.push({
        pos: i + 1,
        ids: u[c],
        ctx: o
      });
}
function Qu(e, t) {
  return e.pos - t.pos;
}
function _r(e) {
  var t = [];
  et(e, function(i, a, u, o, c) {
    i && t.push({
      rev: a + "-" + u,
      pos: a,
      opts: c
    });
  }), t.sort(Qu).reverse();
  for (var n = 0, r = t.length; n < r; n++)
    delete t[n].pos;
  return t;
}
function mr(e) {
  for (var t = He(e), n = _r(e.rev_tree), r = [], i = 0, a = n.length; i < a; i++) {
    var u = n[i];
    u.rev !== t && !u.opts.deleted && r.push(u.rev);
  }
  return r;
}
function Gu(e) {
  var t = [];
  return et(e.rev_tree, function(n, r, i, a, u) {
    u.status === "available" && !n && (t.push(r + "-" + i), u.status = "missing");
  }), t;
}
function na(e) {
  for (var t = [], n = e.slice(), r; r = n.pop(); ) {
    var i = r.pos, a = r.ids, u = a[0], o = a[1], c = a[2], _ = c.length === 0, b = r.history ? r.history.slice() : [];
    b.push({
      id: u,
      opts: o
    }), _ && t.push({
      pos: i + 1 - b.length,
      ids: b
    });
    for (var s = 0, m = c.length; s < m; s++)
      n.push({
        pos: i + 1,
        ids: c[s],
        history: b
      });
  }
  return t.reverse();
}
function Wu(e, t) {
  return e.pos - t.pos;
}
function Hu(e, t, n) {
  for (var r = 0, i = e.length, a; r < i; )
    a = r + i >>> 1, n(e[a], t) < 0 ? r = a + 1 : i = a;
  return r;
}
function Yu(e, t, n) {
  var r = Hu(e, t, n);
  e.splice(r, 0, t);
}
function zr(e, t) {
  for (var n, r, i = t, a = e.length; i < a; i++) {
    var u = e[i], o = [u.id, u.opts, []];
    r ? (r[2].push(o), r = o) : n = r = o;
  }
  return n;
}
function Xu(e, t) {
  return e[0] < t[0] ? -1 : 1;
}
function Kr(e, t) {
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
      for (var c = !1, _ = 0; _ < a[2].length; _++)
        a[2][_][0] === u[2][o][0] && (n.push({
          tree1: a[2][_],
          tree2: u[2][o]
        }), c = !0);
      c || (r = "new_branch", Yu(a[2], u[2][o], Xu));
    }
  }
  return {
    conflicts: r,
    tree: e
  };
}
function ra(e, t, n) {
  var r = [], i = !1, a = !1, u;
  if (!e.length)
    return {
      tree: [t],
      conflicts: "new_leaf"
    };
  for (var o = 0, c = e.length; o < c; o++) {
    var _ = e[o];
    if (_.pos === t.pos && _.ids[0] === t.ids[0])
      u = Kr(_.ids, t.ids), r.push({
        pos: _.pos,
        ids: u.tree
      }), i = i || u.conflicts, a = !0;
    else if (n !== !0) {
      var b = _.pos < t.pos ? _ : t, s = _.pos < t.pos ? t : _, m = s.pos - b.pos, O = [], $ = [];
      for ($.push({
        ids: b.ids,
        diff: m,
        parent: null,
        parentIdx: null
      }); $.length > 0; ) {
        var S = $.pop();
        if (S.diff === 0) {
          S.ids[0] === s.ids[0] && O.push(S);
          continue;
        }
        for (var A = S.ids[2], g = 0, h = A.length; g < h; g++)
          $.push({
            ids: A[g],
            diff: S.diff - 1,
            parent: S.ids,
            parentIdx: g
          });
      }
      var f = O[0];
      f ? (u = Kr(f.ids, s.ids), f.parent[2][f.parentIdx] = u.tree, r.push({
        pos: b.pos,
        ids: b.ids
      }), i = i || u.conflicts, a = !0) : r.push(_);
    } else
      r.push(_);
  }
  return a || r.push(t), r.sort(Wu), {
    tree: r,
    conflicts: i || "internal_node"
  };
}
function Zu(e, t) {
  for (var n = na(e), r, i, a = 0, u = n.length; a < u; a++) {
    var o = n[a], c = o.ids, _;
    if (c.length > t) {
      r || (r = {});
      var b = c.length - t;
      _ = {
        pos: o.pos + b,
        ids: zr(c, b)
      };
      for (var s = 0; s < b; s++) {
        var m = o.pos + s + "-" + c[s].id;
        r[m] = !0;
      }
    } else
      _ = {
        pos: o.pos,
        ids: zr(c, 0)
      };
    i ? i = ra(i, _, !0).tree : i = [_];
  }
  return r && et(i, function(O, $, S) {
    delete r[$ + "-" + S];
  }), {
    tree: i,
    revs: r ? Object.keys(r) : []
  };
}
function ia(e, t, n) {
  var r = ra(e, t), i = Zu(r.tree, n);
  return {
    tree: i.tree,
    stemmedRevs: i.revs,
    conflicts: r.conflicts
  };
}
function Vu(e, t) {
  for (var n = e.slice(), r = t.split("-"), i = parseInt(r[0], 10), a = r[1], u; u = n.pop(); ) {
    if (u.pos === i && u.ids[0] === a)
      return !0;
    for (var o = u.ids[2], c = 0, _ = o.length; c < _; c++)
      n.push({
        pos: u.pos + 1,
        ids: o[c]
      });
  }
  return !1;
}
function eo(e) {
  return e.ids;
}
function qe(e, t) {
  t || (t = He(e));
  for (var n = t.substring(t.indexOf("-") + 1), r = e.rev_tree.map(eo), i; i = r.pop(); ) {
    if (i[0] === n)
      return !!i[1].deleted;
    r = r.concat(i[2]);
  }
}
function Ye(e) {
  return /^_local/.test(e);
}
function to(e, t) {
  for (var n = t.rev_tree.slice(), r; r = n.pop(); ) {
    var i = r.pos, a = r.ids, u = a[0], o = a[1], c = a[2], _ = c.length === 0, b = r.history ? r.history.slice() : [];
    if (b.push({
      id: u,
      pos: i,
      opts: o
    }), _)
      for (var s = 0, m = b.length; s < m; s++) {
        var O = b[s], $ = O.pos + "-" + O.id;
        if ($ === e)
          return i + "-" + u;
      }
    for (var S = 0, A = c.length; S < A; S++)
      n.push({
        pos: i + 1,
        ids: c[S],
        history: b
      });
  }
  throw new Error("Unable to resolve latest revision for id " + t.id + ", rev " + e);
}
ve.exports(Pt, de.exports);
function no(e, t, n, r) {
  try {
    e.emit("change", t, n, r);
  } catch (i) {
    $e("error", 'Error in .on("change", function):', i);
  }
}
function Pt(e, t, n) {
  de.exports.call(this);
  var r = this;
  this.db = e, t = t ? le(t) : {};
  var i = t.complete = zi(function(o, c) {
    o ? qu(r, "error") > 0 && r.emit("error", o) : r.emit("complete", c), r.removeAllListeners(), e.removeListener("destroyed", a);
  });
  n && (r.on("complete", function(o) {
    n(null, o);
  }), r.on("error", n));
  function a() {
    r.cancel();
  }
  e.once("destroyed", a), t.onChange = function(o, c, _) {
    r.isCancelled || no(r, o, c, _);
  };
  var u = new Promise(function(o, c) {
    t.complete = function(_, b) {
      _ ? c(_) : o(b);
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
Pt.prototype.cancel = function() {
  this.isCancelled = !0, this.db.taskqueue.isReady && this.emit("cancel");
};
function ro(e, t, n) {
  var r = [{
    rev: e._rev
  }];
  n.style === "all_docs" && (r = _r(t.rev_tree).map(function(a) {
    return {
      rev: a.rev
    };
  }));
  var i = {
    id: t.id,
    changes: r,
    doc: e
  };
  return qe(t, e._rev) && (i.deleted = !0), n.conflicts && (i.doc._conflicts = mr(t), i.doc._conflicts.length || delete i.doc._conflicts), i;
}
Pt.prototype.validateChanges = function(e) {
  var t = e.complete, n = this;
  H._changesFilterPlugin ? H._changesFilterPlugin.validate(e, function(r) {
    if (r)
      return t(r);
    n.doChanges(e);
  }) : n.doChanges(e);
};
Pt.prototype.doChanges = function(e) {
  var t = this, n = e.complete;
  if (e = le(e), "live" in e && !("continuous" in e) && (e.continuous = e.live), e.processChange = ro, e.since === "latest" && (e.since = "now"), e.since || (e.since = 0), e.since === "now") {
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
      a in e && $e("warn", 'The "' + a + '" option was passed in to changes/replicate, but pouchdb-changes-filter plugin is not installed, so it was ignored. Please install the plugin to enable filtering.');
    });
  "descending" in e || (e.descending = !1), e.limit = e.limit === 0 ? 1 : e.limit, e.complete = n;
  var r = this.db._changes(e);
  if (r && typeof r.cancel == "function") {
    var i = t.cancel;
    t.cancel = Te(function(a) {
      r.cancel(), i.apply(this, a);
    });
  }
};
function Jr(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function wr(e, t) {
  return function(n, r) {
    n || r[0] && r[0].error ? (n = n || r[0], n.docId = t, e(n)) : e(null, r.length ? r[0] : r);
  };
}
function io(e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    if (n._deleted)
      delete n._attachments;
    else if (n._attachments)
      for (var r = Object.keys(n._attachments), i = 0; i < r.length; i++) {
        var a = r[i];
        n._attachments[a] = jt(n._attachments[a], ["data", "digest", "content_type", "length", "revpos", "stub"]);
      }
  }
}
function ao(e, t) {
  var n = Jr(e._id, t._id);
  if (n !== 0)
    return n;
  var r = e._revisions ? e._revisions.start : 0, i = t._revisions ? t._revisions.start : 0;
  return Jr(r, i);
}
function uo(e) {
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
function oo(e) {
  var t = "limit" in e ? e.keys.slice(e.skip, e.limit + e.skip) : e.skip > 0 ? e.keys.slice(e.skip) : e.keys;
  e.keys = t, e.skip = 0, delete e.limit, e.descending && (t.reverse(), e.descending = !1);
}
function aa(e) {
  var t = e._compactionQueue[0], n = t.opts, r = t.callback;
  e.get("_local/compaction").catch(function() {
    return !1;
  }).then(function(i) {
    i && i.last_seq && (n.last_seq = i.last_seq), e._compact(n, function(a, u) {
      a ? r(a) : r(null, u), pe(function() {
        e._compactionQueue.shift(), e._compactionQueue.length && aa(e);
      });
    });
  });
}
function fo(e) {
  return e.charAt(0) === "_" ? e + " is not a valid attachment name, attachment names cannot start with '_'" : !1;
}
ve.exports(ae, de.exports);
function ae() {
  de.exports.call(this);
  for (var e in ae.prototype)
    typeof this[e] == "function" && (this[e] = this[e].bind(this));
}
ae.prototype.post = se("post", function(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), typeof e != "object" || Array.isArray(e))
    return n(V(fr));
  this.bulkDocs({
    docs: [e]
  }, t, wr(n, e._id));
});
ae.prototype.put = se("put", function(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), typeof e != "object" || Array.isArray(e))
    return n(V(fr));
  if (Yi(e._id), Ye(e._id) && typeof this._putLocal == "function")
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
    var u = e._rev.split("-"), o = u[1], c = parseInt(u[0], 10), _ = c + 1, b = ta();
    e._revisions = {
      start: _,
      ids: [b, o]
    }, e._rev = _ + "-" + b, t.new_edits = !1;
  }
  function a(u) {
    typeof r._put == "function" && t.new_edits !== !1 ? r._put(e, t, u) : r.bulkDocs({
      docs: [e]
    }, t, wr(u, e._id));
  }
});
ae.prototype.putAttachment = se("putAttachment", function(e, t, n, r, i) {
  var a = this;
  typeof i == "function" && (i = r, r = n, n = null), typeof i > "u" && (i = r, r = n, n = null), i || $e("warn", "Attachment", t, "on document", e, "is missing content_type");
  function u(o) {
    var c = "_rev" in o ? parseInt(o._rev, 10) : 0;
    return o._attachments = o._attachments || {}, o._attachments[t] = {
      content_type: i,
      data: r,
      revpos: ++c
    }, a.put(o);
  }
  return a.get(e).then(function(o) {
    if (o._rev !== n)
      throw V(ct);
    return u(o);
  }, function(o) {
    if (o.reason === ke.message)
      return u({
        _id: e
      });
    throw o;
  });
});
ae.prototype.removeAttachment = se("removeAttachment", function(e, t, n, r) {
  var i = this;
  i.get(e, function(a, u) {
    if (a) {
      r(a);
      return;
    }
    if (u._rev !== n) {
      r(V(ct));
      return;
    }
    if (!u._attachments)
      return r();
    delete u._attachments[t], Object.keys(u._attachments).length === 0 && delete u._attachments, i.put(u, r);
  });
});
ae.prototype.remove = se("remove", function(e, t, n, r) {
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
  }, n, wr(r, a._id));
});
ae.prototype.revsDiff = se("revsDiff", function(e, t, n) {
  typeof t == "function" && (n = t, t = {});
  var r = Object.keys(e);
  if (!r.length)
    return n(null, {});
  var i = 0, a = new me();
  function u(c, _) {
    a.has(c) || a.set(c, {
      missing: []
    }), a.get(c).missing.push(_);
  }
  function o(c, _) {
    var b = e[c].slice(0);
    et(_, function(s, m, O, $, S) {
      var A = m + "-" + O, g = b.indexOf(A);
      g !== -1 && (b.splice(g, 1), S.status !== "available" && u(c, A));
    }), b.forEach(function(s) {
      u(c, s);
    });
  }
  r.map(function(c) {
    this._getRevisionTree(c, function(_, b) {
      if (_ && _.status === 404 && _.message === "missing")
        a.set(c, {
          missing: e[c]
        });
      else {
        if (_)
          return n(_);
        o(c, b);
      }
      if (++i === r.length) {
        var s = {};
        return a.forEach(function(m, O) {
          s[O] = m;
        }), n(null, s);
      }
    });
  }, this);
});
ae.prototype.bulkGet = se("bulkGet", function(e, t) {
  Ji(this, e, t);
});
ae.prototype.compactDocument = se("compactDocument", function(e, t, n) {
  var r = this;
  this._getRevisionTree(e, function(i, a) {
    if (i)
      return n(i);
    var u = uo(a), o = [], c = [];
    Object.keys(u).forEach(function(_) {
      u[_] > t && o.push(_);
    }), et(a, function(_, b, s, m, O) {
      var $ = b + "-" + s;
      O.status === "available" && o.indexOf($) !== -1 && c.push($);
    }), r._doCompaction(e, c, n);
  });
});
ae.prototype.compact = se("compact", function(e, t) {
  typeof e == "function" && (t = e, e = {});
  var n = this;
  e = e || {}, n._compactionQueue = n._compactionQueue || [], n._compactionQueue.push({
    opts: e,
    callback: t
  }), n._compactionQueue.length === 1 && aa(n);
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
    var c = o.last_seq;
    Promise.all(i).then(function() {
      return un(n, "_local/compaction", function(b) {
        return !b.last_seq || b.last_seq < c ? (b.last_seq = c, b) : !1;
      });
    }).then(function() {
      t(null, {
        ok: !0
      });
    }).catch(t);
  }
  n.changes(r).on("change", a).on("complete", u).on("error", t);
};
ae.prototype.get = se("get", function(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), typeof e != "string")
    return n(V(Qi));
  if (Ye(e) && typeof this._getLocal == "function")
    return this._getLocal(e, n);
  var r = [], i = this;
  function a() {
    var c = [], _ = r.length;
    if (!_)
      return n(null, c);
    r.forEach(function(b) {
      i.get(e, {
        rev: b,
        revs: t.revs,
        latest: t.latest,
        attachments: t.attachments,
        binary: t.binary
      }, function(s, m) {
        if (s)
          c.push({
            missing: b
          });
        else {
          for (var O, $ = 0, S = c.length; $ < S; $++)
            if (c[$].ok && c[$].ok._rev === m._rev) {
              O = !0;
              break;
            }
          O || c.push({
            ok: m
          });
        }
        _--, _ || n(null, c);
      });
    });
  }
  if (t.open_revs) {
    if (t.open_revs === "all")
      this._getRevisionTree(e, function(c, _) {
        if (c)
          return n(c);
        r = _r(_).map(function(b) {
          return b.rev;
        }), a();
      });
    else if (Array.isArray(t.open_revs)) {
      r = t.open_revs;
      for (var u = 0; u < r.length; u++) {
        var o = r[u];
        if (!(typeof o == "string" && /^\d+-/.test(o)))
          return n(V(Hi));
      }
      a();
    } else
      return n(V(Gi, "function_clause"));
    return;
  }
  return this._get(e, t, function(c, _) {
    if (c)
      return c.docId = e, n(c);
    var b = _.doc, s = _.metadata, m = _.ctx;
    if (t.conflicts) {
      var O = mr(s);
      O.length && (b._conflicts = O);
    }
    if (qe(s, b._rev) && (b._deleted = !0), t.revs || t.revs_info) {
      for (var $ = b._rev.split("-"), S = parseInt($[0], 10), A = $[1], g = na(s.rev_tree), h = null, f = 0; f < g.length; f++) {
        var l = g[f], d = l.ids.map(function(Y) {
          return Y.id;
        }).indexOf(A), y = d === S - 1;
        (y || !h && d !== -1) && (h = l);
      }
      if (!h)
        return c = new Error("invalid rev tree"), c.docId = e, n(c);
      var j = h.ids.map(function(Y) {
        return Y.id;
      }).indexOf(b._rev.split("-")[1]) + 1, R = h.ids.length - j;
      if (h.ids.splice(j, R), h.ids.reverse(), t.revs && (b._revisions = {
        start: h.pos + h.ids.length - 1,
        ids: h.ids.map(function(Y) {
          return Y.id;
        })
      }), t.revs_info) {
        var B = h.pos + h.ids.length;
        b._revs_info = h.ids.map(function(Y) {
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
        }, function(J, G) {
          var U = b._attachments[Y];
          U.data = G, delete U.stub, delete U.length, --K || n(null, b);
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
ae.prototype.getAttachment = se("getAttachment", function(e, t, n, r) {
  var i = this;
  n instanceof Function && (r = n, n = {}), this._get(e, n, function(a, u) {
    if (a)
      return r(a);
    if (u.doc._attachments && u.doc._attachments[t])
      n.ctx = u.ctx, n.binary = !0, i._getAttachment(e, t, u.doc._attachments[t], n, r);
    else
      return r(V(ke));
  });
});
ae.prototype.allDocs = se("allDocs", function(e, t) {
  if (typeof e == "function" && (t = e, e = {}), e.skip = typeof e.skip < "u" ? e.skip : 0, e.start_key && (e.startkey = e.start_key), e.end_key && (e.endkey = e.end_key), "keys" in e) {
    if (!Array.isArray(e.keys))
      return t(new TypeError("options.keys must be an array"));
    var n = ["startkey", "endkey", "key"].filter(function(r) {
      return r in e;
    })[0];
    if (n) {
      t(V(ju, "Query parameter `" + n + "` is not compatible with multi-get"));
      return;
    }
    if (!Pe(this) && (oo(e), e.keys.length === 0))
      return this._allDocs({
        limit: 0
      }, t);
  }
  return this._allDocs(e, t);
});
ae.prototype.changes = function(e, t) {
  return typeof e == "function" && (t = e, e = {}), e = e || {}, e.return_docs = "return_docs" in e ? e.return_docs : !e.live, new Pt(this, e, t);
};
ae.prototype.close = se("close", function(e) {
  return this._closed = !0, this.emit("closed"), this._close(e);
});
ae.prototype.info = se("info", function(e) {
  var t = this;
  this._info(function(n, r) {
    if (n)
      return e(n);
    r.db_name = r.db_name || t.name, r.auto_compaction = !!(t.auto_compaction && !Pe(t)), r.adapter = t.adapter, e(null, r);
  });
});
ae.prototype.id = se("id", function(e) {
  return this._id(e);
});
ae.prototype.type = function() {
  return typeof this._type == "function" ? this._type() : this.adapter;
};
ae.prototype.bulkDocs = se("bulkDocs", function(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), t = t || {}, Array.isArray(e) && (e = {
    docs: e
  }), !e || !e.docs || !Array.isArray(e.docs))
    return n(V(Eu));
  for (var r = 0; r < e.docs.length; ++r)
    if (typeof e.docs[r] != "object" || Array.isArray(e.docs[r]))
      return n(V(fr));
  var i;
  if (e.docs.forEach(function(o) {
    o._attachments && Object.keys(o._attachments).forEach(function(c) {
      i = i || fo(c), o._attachments[c].content_type || $e("warn", "Attachment", c, "on document", o._id, "is missing content_type");
    });
  }), i)
    return n(V(an, i));
  "new_edits" in t || ("new_edits" in e ? t.new_edits = e.new_edits : t.new_edits = !0);
  var a = this;
  !t.new_edits && !Pe(a) && e.docs.sort(ao), io(e.docs);
  var u = e.docs.map(function(o) {
    return o._id;
  });
  return this._bulkDocs(e, t, function(o, c) {
    if (o)
      return n(o);
    if (t.new_edits || (c = c.filter(function(s) {
      return s.error;
    })), !Pe(a))
      for (var _ = 0, b = c.length; _ < b; _++)
        c[_].id = c[_].id || u[_];
    n(null, c);
  });
});
ae.prototype.registerDependentDatabase = se("registerDependentDatabase", function(e, t) {
  var n = le(this.__opts);
  this.__opts.view_adapter && (n.adapter = this.__opts.view_adapter);
  var r = new this.constructor(e, n);
  function i(a) {
    return a.dependentDbs = a.dependentDbs || {}, a.dependentDbs[e] ? !1 : (a.dependentDbs[e] = !0, a);
  }
  un(this, "_local/_pouch_dependentDbs", i).then(function() {
    t(null, {
      db: r
    });
  }).catch(t);
});
ae.prototype.destroy = se("destroy", function(e, t) {
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
  if (Pe(n))
    return i();
  n.get("_local/_pouch_dependentDbs", function(a, u) {
    if (a)
      return a.status !== 404 ? t(a) : i();
    var o = u.dependentDbs, c = n.constructor, _ = Object.keys(o).map(function(b) {
      var s = r ? b.replace(new RegExp("^" + c.prefix), "") : b;
      return new c(s, n.__opts).destroy();
    });
    Promise.all(_).then(i, t);
  });
});
function qt() {
  this.isReady = !1, this.failed = !1, this.queue = [];
}
qt.prototype.execute = function() {
  var e;
  if (this.failed)
    for (; e = this.queue.shift(); )
      e(this.failed);
  else
    for (; e = this.queue.shift(); )
      e();
};
qt.prototype.fail = function(e) {
  this.failed = e, this.execute();
};
qt.prototype.ready = function(e) {
  this.isReady = !0, this.db = e, this.execute();
};
qt.prototype.addTask = function(e) {
  this.queue.push(e), this.failed && this.execute();
};
function so(e, t) {
  var n = e.match(/([a-z-]*):\/\/(.*)/);
  if (n)
    return {
      name: /https?/.test(n[1]) ? n[1] + "://" + n[2] : n[2],
      adapter: n[1]
    };
  var r = H.adapters, i = H.preferredAdapters, a = H.prefix, u = t.adapter;
  if (!u)
    for (var o = 0; o < i.length; ++o) {
      if (u = i[o], u === "idb" && "websql" in r && rn() && localStorage["_pouch__websqldb_" + a + e]) {
        $e("log", 'PouchDB is downgrading "' + e + '" to WebSQL to avoid data loss, because it was already opened with WebSQL.');
        continue;
      }
      break;
    }
  var c = r[u], _ = c && "use_prefix" in c ? c.use_prefix : !0;
  return {
    name: _ ? a + e : e,
    adapter: u
  };
}
function co(e) {
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
  var r = (t.prefix || "") + e, i = so(r, t);
  if (t.name = i.name, t.adapter = t.adapter || i.adapter, n.name = e, n._adapter = t.adapter, H.emit("debug", ["adapter", "Picked adapter: ", t.adapter]), !H.adapters[t.adapter] || !H.adapters[t.adapter].valid())
    throw new Error("Invalid Adapter: " + t.adapter);
  if (t.view_adapter && (!H.adapters[t.view_adapter] || !H.adapters[t.view_adapter].valid()))
    throw new Error("Invalid View Adapter: " + t.view_adapter);
  ae.call(n), n.taskqueue = new qt(), n.adapter = t.adapter, H.adapters[t.adapter].call(n, t, function(a) {
    if (a)
      return n.taskqueue.fail(a);
    co(n), n.emit("created", n), H.emit("created", n.name), n.taskqueue.ready(n);
  });
}
var lo = typeof AbortController < "u" ? AbortController : function() {
  return {
    abort: function() {
    }
  };
}, ua = fetch, ut = Headers;
H.adapters = {};
H.preferredAdapters = [];
H.prefix = "_pouch_";
var Qr = new de.exports();
function vo(e) {
  Object.keys(de.exports.prototype).forEach(function(n) {
    typeof de.exports.prototype[n] == "function" && (e[n] = Qr[n].bind(Qr));
  });
  var t = e._destructionListeners = new me();
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
vo(H);
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
  return ua(e, t);
};
var ho = "7.3.0";
function br(e, t) {
  for (var n = e, r = 0, i = t.length; r < i; r++) {
    var a = t[r];
    if (n = n[a], !n)
      break;
  }
  return n;
}
function yo(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function $r(e) {
  for (var t = [], n = "", r = 0, i = e.length; r < i; r++) {
    var a = e[r];
    r > 0 && e[r - 1] === "\\" && (a === "$" || a === ".") ? n = n.substring(0, n.length - 1) + a : a === "." ? (t.push(n), n = "") : n += a;
  }
  return t.push(n), t;
}
var go = ["$or", "$nor", "$not"];
function oa(e) {
  return go.indexOf(e) > -1;
}
function fa(e) {
  return Object.keys(e)[0];
}
function po(e) {
  return e[fa(e)];
}
function $t(e) {
  var t = {}, n = {
    $or: !0,
    $nor: !0
  };
  return e.forEach(function(r) {
    Object.keys(r).forEach(function(i) {
      var a = r[i];
      if (typeof a != "object" && (a = {
        $eq: a
      }), oa(i))
        if (a instanceof Array) {
          if (n[i]) {
            n[i] = !1, t[i] = a;
            return;
          }
          var u = [];
          t[i].forEach(function(c) {
            Object.keys(a).forEach(function(_) {
              var b = a[_], s = Math.max(Object.keys(c).length, Object.keys(b).length), m = $t([c, b]);
              Object.keys(m).length <= s || u.push(m);
            });
          }), t[i] = u;
        } else
          t[i] = $t([a]);
      else {
        var o = t[i] = t[i] || {};
        Object.keys(a).forEach(function(c) {
          var _ = a[c];
          if (c === "$gt" || c === "$gte")
            return _o(c, _, o);
          if (c === "$lt" || c === "$lte")
            return mo(c, _, o);
          if (c === "$ne")
            return wo(_, o);
          if (c === "$eq")
            return bo(_, o);
          if (c === "$regex")
            return $o(_, o);
          o[c] = _;
        });
      }
    });
  }), t;
}
function _o(e, t, n) {
  typeof n.$eq < "u" || (typeof n.$gte < "u" ? e === "$gte" ? t > n.$gte && (n.$gte = t) : t >= n.$gte && (delete n.$gte, n.$gt = t) : typeof n.$gt < "u" ? e === "$gte" ? t > n.$gt && (delete n.$gt, n.$gte = t) : t > n.$gt && (n.$gt = t) : n[e] = t);
}
function mo(e, t, n) {
  typeof n.$eq < "u" || (typeof n.$lte < "u" ? e === "$lte" ? t < n.$lte && (n.$lte = t) : t <= n.$lte && (delete n.$lte, n.$lt = t) : typeof n.$lt < "u" ? e === "$lte" ? t < n.$lt && (delete n.$lt, n.$lte = t) : t < n.$lt && (n.$lt = t) : n[e] = t);
}
function wo(e, t) {
  "$ne" in t ? t.$ne.push(e) : t.$ne = [e];
}
function bo(e, t) {
  delete t.$gt, delete t.$gte, delete t.$lt, delete t.$lte, delete t.$ne, t.$eq = e;
}
function $o(e, t) {
  "$regex" in t ? t.$regex.push(e) : t.$regex = [e];
}
function sa(e) {
  for (var t in e) {
    if (Array.isArray(e))
      for (var n in e)
        e[n].$and && (e[n] = $t(e[n].$and));
    var r = e[t];
    typeof r == "object" && sa(r);
  }
  return e;
}
function ca(e, t) {
  for (var n in e) {
    n === "$and" && (t = !0);
    var r = e[n];
    typeof r == "object" && (t = ca(r, t));
  }
  return t;
}
function Ao(e) {
  var t = le(e), n = !1;
  ca(t, !1) && (t = sa(t), "$and" in t && (t = $t(t.$and)), n = !0), ["$or", "$nor"].forEach(function(o) {
    o in t && t[o].forEach(function(c) {
      for (var _ = Object.keys(c), b = 0; b < _.length; b++) {
        var s = _[b], m = c[s];
        (typeof m != "object" || m === null) && (c[s] = {
          $eq: m
        });
      }
    });
  }), "$not" in t && (t.$not = $t([t.$not]));
  for (var r = Object.keys(t), i = 0; i < r.length; i++) {
    var a = r[i], u = t[a];
    typeof u != "object" || u === null ? u = {
      $eq: u
    } : n || ("$ne" in u && (u.$ne = [u.$ne]), "$regex" in u && (u.$regex = [u.$regex])), t[a] = u;
  }
  return t;
}
function Oo(e, t, n) {
  for (var r = "", i = n - e.length; r.length < i; )
    r += t;
  return r;
}
function So(e, t, n) {
  var r = Oo(e, t, n);
  return r + e;
}
var la = -324, Bn = 3, Rn = "";
function ue(e, t) {
  if (e === t)
    return 0;
  e = Xe(e), t = Xe(t);
  var n = Ln(e), r = Ln(t);
  if (n - r !== 0)
    return n - r;
  switch (typeof e) {
    case "number":
      return e - t;
    case "boolean":
      return e < t ? -1 : 1;
    case "string":
      return Io(e, t);
  }
  return Array.isArray(e) ? jo(e, t) : Po(e, t);
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
              typeof a < "u" && (e[i] = Xe(a));
            }
        }
      }
  }
  return e;
}
function xo(e) {
  if (e !== null)
    switch (typeof e) {
      case "boolean":
        return e ? 1 : 0;
      case "number":
        return qo(e);
      case "string":
        return e.replace(/\u0002/g, "").replace(/\u0001/g, "").replace(/\u0000/g, "");
      case "object":
        var t = Array.isArray(e), n = t ? e : Object.keys(e), r = -1, i = n.length, a = "";
        if (t)
          for (; ++r < i; )
            a += Se(n[r]);
        else
          for (; ++r < i; ) {
            var u = n[r];
            a += Se(u) + Se(e[u]);
          }
        return a;
    }
  return "";
}
function Se(e) {
  var t = "\0";
  return e = Xe(e), Ln(e) + Rn + xo(e) + t;
}
function Eo(e, t) {
  var n = t, r, i = e[t] === "1";
  if (i)
    r = 0, t++;
  else {
    var a = e[t] === "0";
    t++;
    var u = "", o = e.substring(t, t + Bn), c = parseInt(o, 10) + la;
    for (a && (c = -c), t += Bn; ; ) {
      var _ = e[t];
      if (_ === "\0")
        break;
      u += _, t++;
    }
    u = u.split("."), u.length === 1 ? r = parseInt(u, 10) : r = parseFloat(u[0] + "." + u[1]), a && (r = r - 10), c !== 0 && (r = parseFloat(r + "e" + c));
  }
  return {
    num: r,
    length: t - n
  };
}
function ko(e, t) {
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
function Co(e) {
  for (var t = [], n = [], r = 0; ; ) {
    var i = e[r++];
    if (i === "\0") {
      if (t.length === 1)
        return t.pop();
      ko(t, n);
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
        var a = Eo(e, r);
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
        var c = {
          element: [],
          index: t.length
        };
        t.push(c.element), n.push(c);
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
function jo(e, t) {
  for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) {
    var i = ue(e[r], t[r]);
    if (i !== 0)
      return i;
  }
  return e.length === t.length ? 0 : e.length > t.length ? 1 : -1;
}
function Io(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function Po(e, t) {
  for (var n = Object.keys(e), r = Object.keys(t), i = Math.min(n.length, r.length), a = 0; a < i; a++) {
    var u = ue(n[a], r[a]);
    if (u !== 0 || (u = ue(e[n[a]], t[r[a]]), u !== 0))
      return u;
  }
  return n.length === r.length ? 0 : n.length > r.length ? 1 : -1;
}
function Ln(e) {
  var t = ["boolean", "number", "string", "object"], n = t.indexOf(typeof e);
  if (~n)
    return e === null ? 1 : Array.isArray(e) ? 5 : n < 3 ? n + 2 : n + 3;
  if (Array.isArray(e))
    return 5;
}
function qo(e) {
  if (e === 0)
    return "1";
  var t = e.toExponential().split(/e\+?/), n = parseInt(t[1], 10), r = e < 0, i = r ? "0" : "2", a = (r ? -n : n) - la, u = So(a.toString(), "0", Bn);
  i += Rn + u;
  var o = Math.abs(parseFloat(t[0]));
  r && (o = 10 - o);
  var c = o.toFixed(20);
  return c = c.replace(/\.?0+$/, ""), i += Rn + c, i;
}
function To(e) {
  function t(n) {
    return e.map(function(r) {
      var i = fa(r), a = $r(i), u = br(n, a);
      return u;
    });
  }
  return function(n, r) {
    var i = t(n.doc), a = t(r.doc), u = ue(i, a);
    return u !== 0 ? u : yo(n.doc._id, r.doc._id);
  };
}
function Bo(e, t, n) {
  if (e = e.filter(function(u) {
    return ot(u.doc, t.selector, n);
  }), t.sort) {
    var r = To(t.sort);
    e = e.sort(r), typeof t.sort[0] != "string" && po(t.sort[0]) === "desc" && (e = e.reverse());
  }
  if ("limit" in t || "skip" in t) {
    var i = t.skip || 0, a = ("limit" in t ? t.limit : e.length) + i;
    e = e.slice(i, a);
  }
  return e;
}
function ot(e, t, n) {
  return n.every(function(r) {
    var i = t[r], a = $r(r), u = br(e, a);
    return oa(r) ? Ro(r, i, e) : Wt(i, e, a, u);
  });
}
function Wt(e, t, n, r) {
  return e ? typeof e == "object" ? Object.keys(e).every(function(i) {
    var a = e[i];
    if (i.indexOf("$") === 0)
      return Gr(i, t, a, n, r);
    var u = $r(i);
    if (r === void 0 && typeof a != "object" && u.length > 0)
      return !1;
    var o = br(r, u);
    return typeof a == "object" ? Wt(a, t, n, o) : Gr("$eq", t, a, u, o);
  }) : e === r : !0;
}
function Ro(e, t, n) {
  return e === "$or" ? t.some(function(r) {
    return ot(n, r, Object.keys(r));
  }) : e === "$not" ? !ot(n, t, Object.keys(t)) : !t.find(function(r) {
    return ot(n, r, Object.keys(r));
  });
}
function Gr(e, t, n, r, i) {
  if (!Hr[e])
    throw new Error('unknown operator "' + e + '" - should be one of $eq, $lte, $lt, $gt, $gte, $exists, $ne, $in, $nin, $size, $mod, $regex, $elemMatch, $type, $allMatch or $all');
  return Hr[e](t, n, r, i);
}
function pt(e) {
  return typeof e < "u" && e !== null;
}
function Fe(e) {
  return typeof e < "u";
}
function Lo(e, t) {
  if (typeof e != "number" || parseInt(e, 10) !== e)
    return !1;
  var n = t[0], r = t[1];
  return e % n === r;
}
function Wr(e, t) {
  return t.some(function(n) {
    return e instanceof Array ? e.some(function(r) {
      return ue(n, r) === 0;
    }) : ue(n, e) === 0;
  });
}
function Do(e, t) {
  return t.every(function(n) {
    return e.some(function(r) {
      return ue(n, r) === 0;
    });
  });
}
function No(e, t) {
  return e.length === t;
}
function Fo(e, t) {
  var n = new RegExp(t);
  return n.test(e);
}
function Mo(e, t) {
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
var Hr = {
  $elemMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" ? r.some(function(i) {
      return ot(i, t, Object.keys(t));
    }) : r.some(function(i) {
      return Wt(t, e, n, i);
    });
  },
  $allMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" ? r.every(function(i) {
      return ot(i, t, Object.keys(t));
    }) : r.every(function(i) {
      return Wt(t, e, n, i);
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
    return pt(r) && Lo(r, t);
  },
  $ne: function(e, t, n, r) {
    return t.every(function(i) {
      return ue(r, i) !== 0;
    });
  },
  $in: function(e, t, n, r) {
    return pt(r) && Wr(r, t);
  },
  $nin: function(e, t, n, r) {
    return pt(r) && !Wr(r, t);
  },
  $size: function(e, t, n, r) {
    return pt(r) && Array.isArray(r) && No(r, t);
  },
  $all: function(e, t, n, r) {
    return Array.isArray(r) && Do(r, t);
  },
  $regex: function(e, t, n, r) {
    return pt(r) && typeof r == "string" && t.every(function(i) {
      return Fo(r, i);
    });
  },
  $type: function(e, t, n, r) {
    return Mo(r, t);
  }
};
function Uo(e, t) {
  if (typeof t != "object")
    throw new Error("Selector error: expected a JSON object");
  t = Ao(t);
  var n = {
    doc: e
  }, r = Bo([n], {
    selector: t
  }, Object.keys(t));
  return r && r.length === 1;
}
function zo(e) {
  return lr(`"use strict";
return ` + e + ";", {});
}
function Ko(e) {
  var t = ["return function(doc) {", '  "use strict";', "  var emitted = false;", "  var emit = function (a, b) {", "    emitted = true;", "  };", "  var view = " + e + ";", "  view(doc);", "  if (emitted) {", "    return true;", "  }", "};"].join(`
`);
  return lr(t, {});
}
function Jo(e, t) {
  if (e.selector && e.filter && e.filter !== "_selector") {
    var n = typeof e.filter == "string" ? e.filter : "function";
    return t(new Error('selector invalid for filter "' + n + '"'));
  }
  t();
}
function Qo(e) {
  e.view && !e.filter && (e.filter = "_view"), e.selector && !e.filter && (e.filter = "_selector"), e.filter && typeof e.filter == "string" && (e.filter === "_view" ? e.view = Fr(e.view) : e.filter = Fr(e.filter));
}
function Go(e, t) {
  return t.filter && typeof t.filter == "string" && !t.doc_ids && !Pe(e.db);
}
function Wo(e, t) {
  var n = t.complete;
  if (t.filter === "_view") {
    if (!t.view || typeof t.view != "string") {
      var r = V(an, "`view` filter parameter not found or invalid.");
      return n(r);
    }
    var i = Tn(t.view);
    e.db.get("_design/" + i[0], function(u, o) {
      if (e.isCancelled)
        return n(null, {
          status: "cancelled"
        });
      if (u)
        return n(lt(u));
      var c = o && o.views && o.views[i[1]] && o.views[i[1]].map;
      if (!c)
        return n(V(ke, o.views ? "missing json key: " + i[1] : "missing json key: views"));
      t.filter = Ko(c), e.doChanges(t);
    });
  } else if (t.selector)
    t.filter = function(u) {
      return Uo(u, t.selector);
    }, e.doChanges(t);
  else {
    var a = Tn(t.filter);
    e.db.get("_design/" + a[0], function(u, o) {
      if (e.isCancelled)
        return n(null, {
          status: "cancelled"
        });
      if (u)
        return n(lt(u));
      var c = o && o.filters && o.filters[a[1]];
      if (!c)
        return n(V(ke, o && o.filters ? "missing json key: " + a[1] : "missing json key: filters"));
      t.filter = zo(c), e.doChanges(t);
    });
  }
}
function Ho(e) {
  e._changesFilterPlugin = {
    validate: Jo,
    normalize: Qo,
    shouldFilter: Go,
    filter: Wo
  };
}
H.plugin(Ho);
H.version = ho;
function da(e) {
  return e.reduce(function(t, n) {
    return t[n] = !0, t;
  }, {});
}
var Yo = da([
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
]), Xo = da([
  "_access",
  "_attachments",
  "_replication_id",
  "_replication_state",
  "_replication_state_time",
  "_replication_state_reason",
  "_replication_stats"
]);
function Yr(e) {
  if (!/^\d+-/.test(e))
    return V(Hi);
  var t = e.indexOf("-"), n = e.substring(0, t), r = e.substring(t + 1);
  return {
    prefix: parseInt(n, 10),
    id: r
  };
}
function Zo(e, t) {
  for (var n = e.start - e.ids.length + 1, r = e.ids, i = [r[0], t, []], a = 1, u = r.length; a < u; a++)
    i = [r[a], {
      status: "missing"
    }, [i]];
  return [{
    pos: n,
    ids: i
  }];
}
function va(e, t, n) {
  n || (n = {
    deterministic_revs: !0
  });
  var r, i, a, u = {
    status: "available"
  };
  if (e._deleted && (u.deleted = !0), t)
    if (e._id || (e._id = on()), i = ta(e, n.deterministic_revs), e._rev) {
      if (a = Yr(e._rev), a.error)
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
  else if (e._revisions && (e._rev_tree = Zo(e._revisions, u), r = e._revisions.start, i = e._revisions.ids[0]), !e._rev_tree) {
    if (a = Yr(e._rev), a.error)
      return a;
    r = a.prefix, i = a.id, e._rev_tree = [{
      pos: r,
      ids: [i, u, []]
    }];
  }
  Yi(e._id), e._rev = r + "-" + i;
  var o = {
    metadata: {},
    data: {}
  };
  for (var c in e)
    if (Object.prototype.hasOwnProperty.call(e, c)) {
      var _ = c[0] === "_";
      if (_ && !Yo[c]) {
        var b = V(Nr, c);
        throw b.message = Nr.message + ": " + c, b;
      } else
        _ && !Xo[c] ? o.metadata[c.slice(1)] = e[c] : o.data[c] = e[c];
    }
  return o;
}
function Vo(e) {
  try {
    return dr(e);
  } catch {
    var t = V(Wi, "Attachment is not a valid base64 string");
    return {
      error: t
    };
  }
}
function ef(e, t, n) {
  var r = Vo(e.data);
  if (r.error)
    return n(r.error);
  e.length = r.length, t === "blob" ? e.data = hr(r, e.content_type) : t === "base64" ? e.data = It(r) : e.data = r, pr(r, function(i) {
    e.digest = "md5-" + i, n();
  });
}
function tf(e, t, n) {
  pr(e.data, function(r) {
    e.digest = "md5-" + r, e.length = e.data.size || e.data.length || 0, t === "binary" ? Vi(e.data, function(i) {
      e.data = i, n();
    }) : t === "base64" ? gr(e.data, function(i) {
      e.data = i, n();
    }) : n();
  });
}
function nf(e, t, n) {
  if (e.stub)
    return n();
  typeof e.data == "string" ? ef(e, t, n) : tf(e, t, n);
}
function rf(e, t, n) {
  if (!e.length)
    return n();
  var r = 0, i;
  e.forEach(function(u) {
    var o = u.data && u.data._attachments ? Object.keys(u.data._attachments) : [], c = 0;
    if (!o.length)
      return a();
    function _(s) {
      i = s, c++, c === o.length && a();
    }
    for (var b in u.data._attachments)
      Object.prototype.hasOwnProperty.call(u.data._attachments, b) && nf(u.data._attachments[b], t, _);
  });
  function a() {
    r++, e.length === r && (i ? n(i) : n());
  }
}
function af(e, t, n, r, i, a, u, o) {
  if (Vu(t.rev_tree, n.metadata.rev) && !o)
    return r[i] = n, a();
  var c = t.winningRev || He(t), _ = "deleted" in t ? t.deleted : qe(t, c), b = "deleted" in n.metadata ? n.metadata.deleted : qe(n.metadata), s = /^1-/.test(n.metadata.rev);
  if (_ && !b && o && s) {
    var m = n.data;
    m._rev = c, m._id = n.metadata.id, n = va(m, o);
  }
  var O = ia(t.rev_tree, n.metadata.rev_tree[0], e), $ = o && (_ && b && O.conflicts !== "new_leaf" || !_ && O.conflicts !== "new_leaf" || _ && !b && O.conflicts === "new_branch");
  if ($) {
    var S = V(ct);
    return r[i] = S, a();
  }
  var A = n.metadata.rev;
  n.metadata.rev_tree = O.tree, n.stemmedRevs = O.stemmedRevs || [], t.rev_map && (n.metadata.rev_map = t.rev_map);
  var g = He(n.metadata), h = qe(n.metadata, g), f = _ === h ? 0 : _ < h ? -1 : 1, l;
  A === g ? l = h : l = qe(n.metadata, A), u(n, g, h, l, !0, f, i, a);
}
function uf(e) {
  return e.metadata.rev_tree[0].ids[1].status === "missing";
}
function of(e, t, n, r, i, a, u, o, c) {
  e = e || 1e3;
  function _(S, A, g) {
    var h = He(S.metadata), f = qe(S.metadata, h);
    if ("was_delete" in o && f)
      return a[A] = V(ke, "deleted"), g();
    var l = b && uf(S);
    if (l) {
      var d = V(ct);
      return a[A] = d, g();
    }
    var y = f ? 0 : 1;
    u(S, h, f, f, !1, y, A, g);
  }
  var b = o.new_edits, s = new me(), m = 0, O = t.length;
  function $() {
    ++m === O && c && c();
  }
  t.forEach(function(S, A) {
    if (S._id && Ye(S._id)) {
      var g = S._deleted ? "_removeLocal" : "_putLocal";
      n[g](S, {
        ctx: i
      }, function(f, l) {
        a[A] = f || l, $();
      });
      return;
    }
    var h = S.metadata.id;
    s.has(h) ? (O--, s.get(h).push([S, A])) : s.set(h, [[S, A]]);
  }), s.forEach(function(S, A) {
    var g = 0;
    function h() {
      ++g < S.length ? f() : $();
    }
    function f() {
      var l = S[g], d = l[0], y = l[1];
      if (r.has(A))
        af(e, r.get(A), d, a, y, h, u, b);
      else {
        var j = ia([], d.metadata.rev_tree[0], e);
        d.metadata.rev_tree = j.tree, d.stemmedRevs = j.stemmedRevs || [], _(d, y, h);
      }
    }
    f();
  });
}
var ff = 5, oe = "document-store", ge = "by-sequence", be = "attach-store", Qe = "attach-seq-store", _e = "meta-store", Ce = "local-store", Dn = "detect-blob-support";
function sf(e) {
  try {
    return JSON.parse(e);
  } catch {
    return en.parse(e);
  }
}
function cf(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return en.stringify(e);
  }
}
function Ie(e) {
  return function(t) {
    var n = "unknown_error";
    t.target && t.target.error && (n = t.target.error.name || t.target.error.message), e(V(sr, n, t.type));
  };
}
function Nn(e, t, n) {
  return {
    data: cf(e),
    winningRev: t,
    deletedOrLocal: n ? "1" : "0",
    seq: e.seq,
    id: e.id
  };
}
function Ge(e) {
  if (!e)
    return null;
  var t = sf(e.data);
  return t.winningRev = e.winningRev, t.deleted = e.deletedOrLocal === "1", t.seq = e.seq, t;
}
function Ht(e) {
  if (!e)
    return e;
  var t = e._doc_id_rev.lastIndexOf(":");
  return e._id = e._doc_id_rev.substring(0, t - 1), e._rev = e._doc_id_rev.substring(t + 1), delete e._doc_id_rev, e;
}
function ha(e, t, n, r) {
  n ? r(e ? typeof e != "string" ? e : yr(e, t) : vr([""], {
    type: t
  })) : e ? typeof e != "string" ? Zi(e, function(i) {
    r(It(i));
  }) : r(e) : r("");
}
function ya(e, t, n, r) {
  var i = Object.keys(e._attachments || {});
  if (!i.length)
    return r && r();
  var a = 0;
  function u() {
    ++a === i.length && r && r();
  }
  function o(c, _) {
    var b = c._attachments[_], s = b.digest, m = n.objectStore(be).get(s);
    m.onsuccess = function(O) {
      b.body = O.target.result.body, u();
    };
  }
  i.forEach(function(c) {
    t.attachments && t.include_docs ? o(e, c) : (e._attachments[c].stub = !0, u());
  });
}
function Fn(e, t) {
  return Promise.all(e.map(function(n) {
    if (n.doc && n.doc._attachments) {
      var r = Object.keys(n.doc._attachments);
      return Promise.all(r.map(function(i) {
        var a = n.doc._attachments[i];
        if ("body" in a) {
          var u = a.body, o = a.content_type;
          return new Promise(function(c) {
            ha(u, o, t, function(_) {
              n.doc._attachments[i] = We(jt(a, ["digest", "content_type"]), {
                data: _
              }), c();
            });
          });
        }
      }));
    }
  }));
}
function ga(e, t, n) {
  var r = [], i = n.objectStore(ge), a = n.objectStore(be), u = n.objectStore(Qe), o = e.length;
  function c() {
    o--, o || _();
  }
  function _() {
    !r.length || r.forEach(function(b) {
      var s = u.index("digestSeq").count(IDBKeyRange.bound(b + "::", b + "::\uFFFF", !1, !1));
      s.onsuccess = function(m) {
        var O = m.target.result;
        O || a.delete(b);
      };
    });
  }
  e.forEach(function(b) {
    var s = i.index("_doc_id_rev"), m = t + "::" + b;
    s.getKey(m).onsuccess = function(O) {
      var $ = O.target.result;
      if (typeof $ != "number")
        return c();
      i.delete($);
      var S = u.index("seq").openCursor(IDBKeyRange.only($));
      S.onsuccess = function(A) {
        var g = A.target.result;
        if (g) {
          var h = g.value.digestSeq.split("::")[0];
          r.push(h), u.delete(g.primaryKey), g.continue();
        } else
          c();
      };
    };
  });
}
function xe(e, t, n) {
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
var bt = new dt();
function lf(e, t, n, r, i, a) {
  for (var u = t.docs, o, c, _, b, s, m, O, $, S = 0, A = u.length; S < A; S++) {
    var g = u[S];
    g._id && Ye(g._id) || (g = u[S] = va(g, n.new_edits, e), g.error && !O && (O = g));
  }
  if (O)
    return a(O);
  var h = !1, f = 0, l = new Array(u.length), d = new me(), y = !1, j = r._meta.blobSupport ? "blob" : "base64";
  rf(u, j, function(C) {
    if (C)
      return a(C);
    R();
  });
  function R() {
    var C = [oe, ge, be, Ce, Qe, _e], I = xe(i, C, "readwrite");
    if (I.error)
      return a(I.error);
    o = I.txn, o.onabort = Ie(a), o.ontimeout = Ie(a), o.oncomplete = Y, c = o.objectStore(oe), _ = o.objectStore(ge), b = o.objectStore(be), s = o.objectStore(Qe), m = o.objectStore(_e), m.get(_e).onsuccess = function(k) {
      $ = k.target.result, K();
    }, G(function(k) {
      if (k)
        return y = !0, a(k);
      Z();
    });
  }
  function B() {
    h = !0, K();
  }
  function L() {
    of(e.revs_limit, u, r, d, o, l, U, n, B);
  }
  function K() {
    !$ || !h || ($.docCount += f, m.put($));
  }
  function Z() {
    if (!u.length)
      return;
    var C = 0;
    function I() {
      ++C === u.length && L();
    }
    function k(E) {
      var F = Ge(E.target.result);
      F && d.set(F.id, F), I();
    }
    for (var P = 0, q = u.length; P < q; P++) {
      var T = u[P];
      if (T._id && Ye(T._id)) {
        I();
        continue;
      }
      var D = c.get(T.metadata.id);
      D.onsuccess = k;
    }
  }
  function Y() {
    y || (bt.notify(r._meta.name), a(null, l));
  }
  function J(C, I) {
    var k = b.get(C);
    k.onsuccess = function(P) {
      if (P.target.result)
        I();
      else {
        var q = V(Iu, "unknown stub attachment with digest " + C);
        q.status = 412, I(q);
      }
    };
  }
  function G(C) {
    var I = [];
    if (u.forEach(function(T) {
      T.data && T.data._attachments && Object.keys(T.data._attachments).forEach(function(D) {
        var E = T.data._attachments[D];
        E.stub && I.push(E.digest);
      });
    }), !I.length)
      return C();
    var k = 0, P;
    function q() {
      ++k === I.length && C(P);
    }
    I.forEach(function(T) {
      J(T, function(D) {
        D && !P && (P = D), q();
      });
    });
  }
  function U(C, I, k, P, q, T, D, E) {
    C.metadata.winningRev = I, C.metadata.deleted = k;
    var F = C.data;
    F._id = C.metadata.id, F._rev = C.metadata.rev, P && (F._deleted = !0);
    var W = F._attachments && Object.keys(F._attachments).length;
    if (W)
      return p(C, I, k, q, D, E);
    f += T, K(), v(C, I, k, q, D, E);
  }
  function v(C, I, k, P, q, T) {
    var D = C.data, E = C.metadata;
    D._doc_id_rev = E.id + "::" + E.rev, delete D._id, delete D._rev;
    function F(N) {
      var z = C.stemmedRevs || [];
      P && r.auto_compaction && (z = z.concat(Gu(C.metadata))), z && z.length && ga(z, C.metadata.id, o), E.seq = N.target.result;
      var Q = Nn(E, I, k), ee = c.put(Q);
      ee.onsuccess = te;
    }
    function W(N) {
      N.preventDefault(), N.stopPropagation();
      var z = _.index("_doc_id_rev"), Q = z.getKey(D._doc_id_rev);
      Q.onsuccess = function(ee) {
        var X = _.put(D, ee.target.result);
        X.onsuccess = F;
      };
    }
    function te() {
      l[q] = {
        ok: !0,
        id: E.id,
        rev: E.rev
      }, d.set(C.metadata.id, C.metadata), w(C, E.seq, T);
    }
    var M = _.put(D);
    M.onsuccess = F, M.onerror = W;
  }
  function p(C, I, k, P, q, T) {
    var D = C.data, E = 0, F = Object.keys(D._attachments);
    function W() {
      E === F.length && v(C, I, k, P, q, T);
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
        delete N.data, N.revpos = parseInt(I, 10);
        var Q = N.digest;
        x(Q, z, te);
      }
    });
  }
  function w(C, I, k) {
    var P = 0, q = Object.keys(C.data._attachments || {});
    if (!q.length)
      return k();
    function T() {
      ++P === q.length && k();
    }
    function D(F) {
      var W = C.data._attachments[F].digest, te = s.put({
        seq: I,
        digestSeq: W + "::" + I
      });
      te.onsuccess = T, te.onerror = function(M) {
        M.preventDefault(), M.stopPropagation(), T();
      };
    }
    for (var E = 0; E < q.length; E++)
      D(q[E]);
  }
  function x(C, I, k) {
    var P = b.count(C);
    P.onsuccess = function(q) {
      var T = q.target.result;
      if (T)
        return k();
      var D = {
        digest: C,
        body: I
      }, E = b.put(D);
      E.onsuccess = k;
    };
  }
}
function pa(e, t, n, r, i) {
  r === -1 && (r = 1e3);
  var a = typeof e.getAll == "function" && typeof e.getAllKeys == "function" && r > 1 && !n, u, o, c;
  function _(O) {
    o = O.target.result, u && i(u, o, c);
  }
  function b(O) {
    u = O.target.result, o && i(u, o, c);
  }
  function s() {
    if (!u.length)
      return i();
    var O = u[u.length - 1], $;
    if (t && t.upper)
      try {
        $ = IDBKeyRange.bound(O, t.upper, !0, t.upperOpen);
      } catch (S) {
        if (S.name === "DataError" && S.code === 0)
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
  a ? (c = {
    continue: s
  }, e.getAll(t, r).onsuccess = _, e.getAllKeys(t, r).onsuccess = b) : n ? e.openCursor(t, "prev").onsuccess = m : e.openCursor(t).onsuccess = m;
}
function df(e, t, n) {
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
function vf(e, t, n) {
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
function hf(e, t, n, r, i) {
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
function yf(e, t, n) {
  var r = "startkey" in e ? e.startkey : !1, i = "endkey" in e ? e.endkey : !1, a = "key" in e ? e.key : !1, u = "keys" in e ? e.keys : !1, o = e.skip || 0, c = typeof e.limit == "number" ? e.limit : -1, _ = e.inclusive_end !== !1, b, s;
  if (!u && (b = hf(r, i, _, a, e.descending), s = b && b.error, s && !(s.name === "DataError" && s.code === 0)))
    return n(V(sr, s.name, s.message));
  var m = [oe, ge, _e];
  e.attachments && m.push(be);
  var O = xe(t, m, "readonly");
  if (O.error)
    return n(O.error);
  var $ = O.txn;
  $.oncomplete = Y, $.onabort = Ie(n);
  var S = $.objectStore(oe), A = $.objectStore(ge), g = $.objectStore(_e), h = A.index("_doc_id_rev"), f = [], l, d;
  g.get(_e).onsuccess = function(J) {
    l = J.target.result.docCount;
  }, e.update_seq && y(A, function(J) {
    J.target.result && J.target.result.length > 0 && (d = J.target.result[0]);
  });
  function y(J, G) {
    function U(v) {
      var p = v.target.result, w = void 0;
      return p && p.key && (w = p.key), G({
        target: {
          result: [w]
        }
      });
    }
    J.openCursor(null, "prev").onsuccess = U;
  }
  function j(J, G, U) {
    var v = J.id + "::" + U;
    h.get(v).onsuccess = function(w) {
      if (G.doc = Ht(w.target.result) || {}, e.conflicts) {
        var x = mr(J);
        x.length && (G.doc._conflicts = x);
      }
      ya(G.doc, e, $);
    };
  }
  function R(J, G) {
    var U = {
      id: G.id,
      key: G.id,
      value: {
        rev: J
      }
    }, v = G.deleted;
    v ? u && (f.push(U), U.value.deleted = !0, U.doc = null) : o-- <= 0 && (f.push(U), e.include_docs && j(G, U, J));
  }
  function B(J) {
    for (var G = 0, U = J.length; G < U && f.length !== c; G++) {
      var v = J[G];
      if (v.error && u) {
        f.push(v);
        continue;
      }
      var p = Ge(v), w = p.winningRev;
      R(w, p);
    }
  }
  function L(J, G, U) {
    !U || (B(G), f.length < c && U.continue());
  }
  function K(J) {
    var G = J.target.result;
    e.descending && (G = G.reverse()), B(G);
  }
  function Z() {
    var J = {
      total_rows: l,
      offset: e.skip,
      rows: f
    };
    e.update_seq && d !== void 0 && (J.update_seq = d), n(null, J);
  }
  function Y() {
    e.attachments ? Fn(f, e.binary).then(Z) : Z();
  }
  if (!(s || c === 0)) {
    if (u)
      return vf(e.keys, S, L);
    if (c === -1)
      return df(S, b, K);
    pa(S, b, e.descending, c + o, L);
  }
}
function gf(e) {
  return new Promise(function(t) {
    var n = vr([""]), r = e.objectStore(Dn).put(n, "key");
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
function pf(e, t) {
  var n = e.objectStore(oe).index("deletedOrLocal");
  n.count(IDBKeyRange.only("0")).onsuccess = function(r) {
    t(r.target.result);
  };
}
var Mn = !1, Un = [];
function _f(e, t, n, r) {
  try {
    e(t, n);
  } catch (i) {
    r.emit("error", i);
  }
}
function Xr() {
  Mn || !Un.length || (Mn = !0, Un.shift()());
}
function mf(e, t, n) {
  Un.push(function() {
    e(function(a, u) {
      _f(t, a, u, n), Mn = !1, pe(function() {
        Xr();
      });
    });
  }), Xr();
}
function wf(e, t, n, r) {
  if (e = le(e), e.continuous) {
    var i = n + ":" + on();
    return bt.addListener(n, i, t, e), bt.notify(n), {
      cancel: function() {
        bt.removeListener(n, i);
      }
    };
  }
  var a = e.doc_ids && new st(e.doc_ids);
  e.since = e.since || 0;
  var u = e.since, o = "limit" in e ? e.limit : -1;
  o === 0 && (o = 1);
  var c = [], _ = 0, b = cr(e), s = new me(), m, O, $, S;
  function A(R, B, L) {
    if (!L || !R.length)
      return;
    var K = new Array(R.length), Z = new Array(R.length);
    function Y(U, v) {
      var p = e.processChange(v, U, e);
      u = p.seq = U.seq;
      var w = b(p);
      return typeof w == "object" ? Promise.reject(w) : w ? (_++, e.return_docs && c.push(p), e.attachments && e.include_docs ? new Promise(function(x) {
        ya(v, e, m, function() {
          Fn([p], e.binary).then(function() {
            x(p);
          });
        });
      }) : Promise.resolve(p)) : Promise.resolve();
    }
    function J() {
      for (var U = [], v = 0, p = K.length; v < p && _ !== o; v++) {
        var w = K[v];
        if (!!w) {
          var x = Z[v];
          U.push(Y(x, w));
        }
      }
      Promise.all(U).then(function(C) {
        for (var I = 0, k = C.length; I < k; I++)
          C[I] && e.onChange(C[I]);
      }).catch(e.complete), _ !== o && L.continue();
    }
    var G = 0;
    B.forEach(function(U, v) {
      var p = Ht(U), w = R[v];
      h(p, w, function(x, C) {
        Z[v] = x, K[v] = C, ++G === R.length && J();
      });
    });
  }
  function g(R, B, L, K) {
    if (L.seq !== B)
      return K();
    if (L.winningRev === R._rev)
      return K(L, R);
    var Z = R._id + "::" + L.winningRev, Y = S.get(Z);
    Y.onsuccess = function(J) {
      K(L, Ht(J.target.result));
    };
  }
  function h(R, B, L) {
    if (a && !a.has(R._id))
      return L();
    var K = s.get(R._id);
    if (K)
      return g(R, B, K, L);
    $.get(R._id).onsuccess = function(Z) {
      K = Ge(Z.target.result), s.set(R._id, K), g(R, B, K, L);
    };
  }
  function f() {
    e.complete(null, {
      results: c,
      last_seq: u
    });
  }
  function l() {
    !e.continuous && e.attachments ? Fn(c).then(f) : f();
  }
  var d = [oe, ge];
  e.attachments && d.push(be);
  var y = xe(r, d, "readonly");
  if (y.error)
    return e.complete(y.error);
  m = y.txn, m.onabort = Ie(e.complete), m.oncomplete = l, O = m.objectStore(ge), $ = m.objectStore(oe), S = O.index("_doc_id_rev");
  var j = e.since && !e.descending ? IDBKeyRange.lowerBound(e.since, !0) : null;
  pa(O, j, e.descending, o, A);
}
var nt = new me(), gn, pn = new me();
function _a(e, t) {
  var n = this;
  mf(function(r) {
    bf(n, e, r);
  }, t, n.constructor);
}
function bf(e, t, n) {
  var r = t.name, i = null, a = null;
  e._meta = null;
  function u(A) {
    return function(g, h) {
      g && g instanceof Error && !g.reason && a && (g.reason = a), A(g, h);
    };
  }
  function o(A) {
    var g = A.createObjectStore(oe, {
      keyPath: "id"
    });
    A.createObjectStore(ge, {
      autoIncrement: !0
    }).createIndex("_doc_id_rev", "_doc_id_rev", {
      unique: !0
    }), A.createObjectStore(be, {
      keyPath: "digest"
    }), A.createObjectStore(_e, {
      keyPath: "id",
      autoIncrement: !1
    }), A.createObjectStore(Dn), g.createIndex("deletedOrLocal", "deletedOrLocal", {
      unique: !1
    }), A.createObjectStore(Ce, {
      keyPath: "_id"
    });
    var h = A.createObjectStore(Qe, {
      autoIncrement: !0
    });
    h.createIndex("seq", "seq"), h.createIndex("digestSeq", "digestSeq", {
      unique: !0
    });
  }
  function c(A, g) {
    var h = A.objectStore(oe);
    h.createIndex("deletedOrLocal", "deletedOrLocal", {
      unique: !1
    }), h.openCursor().onsuccess = function(f) {
      var l = f.target.result;
      if (l) {
        var d = l.value, y = qe(d);
        d.deletedOrLocal = y ? "1" : "0", h.put(d), l.continue();
      } else
        g();
    };
  }
  function _(A) {
    A.createObjectStore(Ce, {
      keyPath: "_id"
    }).createIndex("_doc_id_rev", "_doc_id_rev", {
      unique: !0
    });
  }
  function b(A, g) {
    var h = A.objectStore(Ce), f = A.objectStore(oe), l = A.objectStore(ge), d = f.openCursor();
    d.onsuccess = function(y) {
      var j = y.target.result;
      if (j) {
        var R = j.value, B = R.id, L = Ye(B), K = He(R);
        if (L) {
          var Z = B + "::" + K, Y = B + "::", J = B + "::~", G = l.index("_doc_id_rev"), U = IDBKeyRange.bound(Y, J, !1, !1), v = G.openCursor(U);
          v.onsuccess = function(p) {
            if (v = p.target.result, !v)
              f.delete(j.primaryKey), j.continue();
            else {
              var w = v.value;
              w._doc_id_rev === Z && h.put(w), l.delete(v.primaryKey), v.continue();
            }
          };
        } else
          j.continue();
      } else
        g && g();
    };
  }
  function s(A) {
    var g = A.createObjectStore(Qe, {
      autoIncrement: !0
    });
    g.createIndex("seq", "seq"), g.createIndex("digestSeq", "digestSeq", {
      unique: !0
    });
  }
  function m(A, g) {
    var h = A.objectStore(ge), f = A.objectStore(be), l = A.objectStore(Qe), d = f.count();
    d.onsuccess = function(y) {
      var j = y.target.result;
      if (!j)
        return g();
      h.openCursor().onsuccess = function(R) {
        var B = R.target.result;
        if (!B)
          return g();
        for (var L = B.value, K = B.primaryKey, Z = Object.keys(L._attachments || {}), Y = {}, J = 0; J < Z.length; J++) {
          var G = L._attachments[Z[J]];
          Y[G.digest] = !0;
        }
        var U = Object.keys(Y);
        for (J = 0; J < U.length; J++) {
          var v = U[J];
          l.put({
            seq: K,
            digestSeq: v + "::" + K
          });
        }
        B.continue();
      };
    };
  }
  function O(A) {
    function g(d) {
      return d.data ? Ge(d) : (d.deleted = d.deletedOrLocal === "1", d);
    }
    var h = A.objectStore(ge), f = A.objectStore(oe), l = f.openCursor();
    l.onsuccess = function(d) {
      var y = d.target.result;
      if (!y)
        return;
      var j = g(y.value);
      j.winningRev = j.winningRev || He(j);
      function R() {
        var L = j.id + "::", K = j.id + "::\uFFFF", Z = h.index("_doc_id_rev").openCursor(IDBKeyRange.bound(L, K)), Y = 0;
        Z.onsuccess = function(J) {
          var G = J.target.result;
          if (!G)
            return j.seq = Y, B();
          var U = G.primaryKey;
          U > Y && (Y = U), G.continue();
        };
      }
      function B() {
        var L = Nn(j, j.winningRev, j.deleted), K = f.put(L);
        K.onsuccess = function() {
          y.continue();
        };
      }
      if (j.seq)
        return B();
      R();
    };
  }
  e._remote = !1, e.type = function() {
    return "idb";
  }, e._id = Ki(function(A) {
    A(null, e._meta.instanceId);
  }), e._bulkDocs = function(g, h, f) {
    lf(t, g, h, e, i, u(f));
  }, e._get = function(g, h, f) {
    var l, d, y, j = h.ctx;
    if (!j) {
      var R = xe(i, [oe, ge, be], "readonly");
      if (R.error)
        return f(R.error);
      j = R.txn;
    }
    function B() {
      f(y, {
        doc: l,
        metadata: d,
        ctx: j
      });
    }
    j.objectStore(oe).get(g).onsuccess = function(L) {
      if (d = Ge(L.target.result), !d)
        return y = V(ke, "missing"), B();
      var K;
      if (h.rev)
        K = h.latest ? to(h.rev, d) : h.rev;
      else {
        K = d.winningRev;
        var Z = qe(d);
        if (Z)
          return y = V(ke, "deleted"), B();
      }
      var Y = j.objectStore(ge), J = d.id + "::" + K;
      Y.index("_doc_id_rev").get(J).onsuccess = function(G) {
        if (l = G.target.result, l && (l = Ht(l)), !l)
          return y = V(ke, "missing"), B();
        B();
      };
    };
  }, e._getAttachment = function(A, g, h, f, l) {
    var d;
    if (f.ctx)
      d = f.ctx;
    else {
      var y = xe(i, [oe, ge, be], "readonly");
      if (y.error)
        return l(y.error);
      d = y.txn;
    }
    var j = h.digest, R = h.content_type;
    d.objectStore(be).get(j).onsuccess = function(B) {
      var L = B.target.result.body;
      ha(L, R, f.binary, function(K) {
        l(null, K);
      });
    };
  }, e._info = function(g) {
    var h, f, l = xe(i, [_e, ge], "readonly");
    if (l.error)
      return g(l.error);
    var d = l.txn;
    d.objectStore(_e).get(_e).onsuccess = function(y) {
      f = y.target.result.docCount;
    }, d.objectStore(ge).openCursor(null, "prev").onsuccess = function(y) {
      var j = y.target.result;
      h = j ? j.key : 0;
    }, d.oncomplete = function() {
      g(null, {
        doc_count: f,
        update_seq: h,
        idb_attachment_format: e._meta.blobSupport ? "binary" : "base64"
      });
    };
  }, e._allDocs = function(g, h) {
    yf(g, i, u(h));
  }, e._changes = function(g) {
    return wf(g, e, r, i);
  }, e._close = function(A) {
    i.close(), nt.delete(r), A();
  }, e._getRevisionTree = function(A, g) {
    var h = xe(i, [oe], "readonly");
    if (h.error)
      return g(h.error);
    var f = h.txn, l = f.objectStore(oe).get(A);
    l.onsuccess = function(d) {
      var y = Ge(d.target.result);
      y ? g(null, y.rev_tree) : g(V(ke));
    };
  }, e._doCompaction = function(A, g, h) {
    var f = [oe, ge, be, Qe], l = xe(i, f, "readwrite");
    if (l.error)
      return h(l.error);
    var d = l.txn, y = d.objectStore(oe);
    y.get(A).onsuccess = function(j) {
      var R = Ge(j.target.result);
      et(R.rev_tree, function(K, Z, Y, J, G) {
        var U = Z + "-" + Y;
        g.indexOf(U) !== -1 && (G.status = "missing");
      }), ga(g, A, d);
      var B = R.winningRev, L = R.deleted;
      d.objectStore(oe).put(Nn(R, B, L));
    }, d.onabort = Ie(h), d.oncomplete = function() {
      h();
    };
  }, e._getLocal = function(A, g) {
    var h = xe(i, [Ce], "readonly");
    if (h.error)
      return g(h.error);
    var f = h.txn, l = f.objectStore(Ce).get(A);
    l.onerror = Ie(g), l.onsuccess = function(d) {
      var y = d.target.result;
      y ? (delete y._doc_id_rev, g(null, y)) : g(V(ke));
    };
  }, e._putLocal = function(A, g, h) {
    typeof g == "function" && (h = g, g = {}), delete A._revisions;
    var f = A._rev, l = A._id;
    f ? A._rev = "0-" + (parseInt(f.split("-")[1], 10) + 1) : A._rev = "0-1";
    var d = g.ctx, y;
    if (!d) {
      var j = xe(i, [Ce], "readwrite");
      if (j.error)
        return h(j.error);
      d = j.txn, d.onerror = Ie(h), d.oncomplete = function() {
        y && h(null, y);
      };
    }
    var R = d.objectStore(Ce), B;
    f ? (B = R.get(l), B.onsuccess = function(L) {
      var K = L.target.result;
      if (!K || K._rev !== f)
        h(V(ct));
      else {
        var Z = R.put(A);
        Z.onsuccess = function() {
          y = {
            ok: !0,
            id: A._id,
            rev: A._rev
          }, g.ctx && h(null, y);
        };
      }
    }) : (B = R.add(A), B.onerror = function(L) {
      h(V(ct)), L.preventDefault(), L.stopPropagation();
    }, B.onsuccess = function() {
      y = {
        ok: !0,
        id: A._id,
        rev: A._rev
      }, g.ctx && h(null, y);
    });
  }, e._removeLocal = function(A, g, h) {
    typeof g == "function" && (h = g, g = {});
    var f = g.ctx;
    if (!f) {
      var l = xe(i, [Ce], "readwrite");
      if (l.error)
        return h(l.error);
      f = l.txn, f.oncomplete = function() {
        d && h(null, d);
      };
    }
    var d, y = A._id, j = f.objectStore(Ce), R = j.get(y);
    R.onerror = Ie(h), R.onsuccess = function(B) {
      var L = B.target.result;
      !L || L._rev !== A._rev ? h(V(ke)) : (j.delete(y), d = {
        ok: !0,
        id: y,
        rev: "0-0"
      }, g.ctx && h(null, d));
    };
  }, e._destroy = function(A, g) {
    bt.removeAllListeners(r);
    var h = pn.get(r);
    h && h.result && (h.result.close(), nt.delete(r));
    var f = indexedDB.deleteDatabase(r);
    f.onsuccess = function() {
      pn.delete(r), rn() && r in localStorage && delete localStorage[r], g(null, {
        ok: !0
      });
    }, f.onerror = Ie(g);
  };
  var $ = nt.get(r);
  if ($)
    return i = $.idb, e._meta = $.global, pe(function() {
      n(null, e);
    });
  var S = indexedDB.open(r, ff);
  pn.set(r, S), S.onupgradeneeded = function(A) {
    var g = A.target.result;
    if (A.oldVersion < 1)
      return o(g);
    var h = A.currentTarget.transaction;
    A.oldVersion < 3 && _(g), A.oldVersion < 4 && s(g);
    var f = [
      c,
      b,
      m,
      O
    ], l = A.oldVersion;
    function d() {
      var y = f[l - 1];
      l++, y && y(h, d);
    }
    d();
  }, S.onsuccess = function(A) {
    i = A.target.result, i.onversionchange = function() {
      i.close(), nt.delete(r);
    }, i.onabort = function(B) {
      $e("error", "Database has a false failure", B.target.error), a = B.target.error, i.close(), nt.delete(r);
    };
    var g = i.transaction([_e, Dn, oe], "readwrite"), h = !1, f, l, d, y;
    function j() {
      typeof d > "u" || !h || (e._meta = {
        name: r,
        instanceId: y,
        blobSupport: d
      }, nt.set(r, {
        idb: i,
        false: e._meta
      }), n(null, e));
    }
    function R() {
      if (!(typeof l > "u" || typeof f > "u")) {
        var B = r + "_id";
        B in f ? y = f[B] : f[B] = y = on(), f.docCount = l, g.objectStore(_e).put(f);
      }
    }
    g.objectStore(_e).get(_e).onsuccess = function(B) {
      f = B.target.result || {
        id: _e
      }, R();
    }, pf(g, function(B) {
      l = B, R();
    }), gn || (gn = gf(g)), gn.then(function(B) {
      d = B, j();
    }), g.oncomplete = function() {
      h = !0, j();
    }, g.onabort = Ie(n);
  }, S.onerror = function(A) {
    var g = A.target.error && A.target.error.message;
    g ? g.indexOf("stored database is a higher version") !== -1 && (g = new Error('This DB was created with the newer "indexeddb" adapter, but you are trying to open it with the older "idb" adapter')) : g = "Failed to open indexedDB, are you in private browsing mode?", $e("error", g), n(V(sr, g));
  };
}
_a.valid = function() {
  try {
    return typeof indexedDB < "u" && typeof IDBKeyRange < "u";
  } catch {
    return !1;
  }
};
function $f(e) {
  e.adapter("idb", _a, !0);
}
function Af(e, t) {
  return new Promise(function(n, r) {
    var i = 0, a = 0, u = 0, o = e.length, c;
    function _() {
      i++, e[a++]().then(s, m);
    }
    function b() {
      ++u === o ? c ? r(c) : n() : O();
    }
    function s() {
      i--, b();
    }
    function m($) {
      i--, c = c || $, b();
    }
    function O() {
      for (; i < t && a < o; )
        _();
    }
    O();
  });
}
var Of = 25, Sf = 50, Mt = 5e3, xf = 1e4, _n = {};
function mn(e) {
  var t = e.doc || e.ok, n = t && t._attachments;
  !n || Object.keys(n).forEach(function(r) {
    var i = n[r];
    i.data = yr(i.data, i.content_type);
  });
}
function Me(e) {
  return /^_design/.test(e) ? "_design/" + encodeURIComponent(e.slice(8)) : /^_local/.test(e) ? "_local/" + encodeURIComponent(e.slice(7)) : encodeURIComponent(e);
}
function Zr(e) {
  return !e._attachments || !Object.keys(e._attachments) ? Promise.resolve() : Promise.all(Object.keys(e._attachments).map(function(t) {
    var n = e._attachments[t];
    if (n.data && typeof n.data != "string")
      return new Promise(function(r) {
        gr(n.data, r);
      }).then(function(r) {
        n.data = r;
      });
  }));
}
function Ef(e) {
  if (!e.prefix)
    return !1;
  var t = Xi(e.prefix).protocol;
  return t === "http" || t === "https";
}
function kf(e, t) {
  if (Ef(t)) {
    var n = t.name.substr(t.prefix.length), r = t.prefix.replace(/\/?$/, "/");
    e = r + encodeURIComponent(n);
  }
  var i = Xi(e);
  (i.user || i.password) && (i.auth = {
    username: i.user,
    password: i.password
  });
  var a = i.path.replace(/(^\/|\/$)/g, "").split("/");
  return i.db = a.pop(), i.db.indexOf("%") === -1 && (i.db = encodeURIComponent(i.db)), i.path = a.join("/"), i;
}
function ce(e, t) {
  return Kt(e, e.db + "/" + t);
}
function Kt(e, t) {
  var n = e.path ? "/" : "";
  return e.protocol + "://" + e.host + (e.port ? ":" + e.port : "") + "/" + e.path + n + t;
}
function Ut(e) {
  return "?" + Object.keys(e).map(function(t) {
    return t + "=" + encodeURIComponent(e[t]);
  }).join("&");
}
function Cf(e) {
  var t = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "", n = t.indexOf("msie") !== -1, r = t.indexOf("trident") !== -1, i = t.indexOf("edge") !== -1, a = !("method" in e) || e.method === "GET";
  return (n || r || i) && a;
}
function zn(e, t) {
  var n = this, r = kf(e.name, e), i = ce(r, "");
  e = le(e);
  var a = function(s, m) {
    if (m = m || {}, m.headers = m.headers || new ut(), m.credentials = "include", e.auth || r.auth) {
      var O = e.auth || r.auth, $ = O.username + ":" + O.password, S = It(unescape(encodeURIComponent($)));
      m.headers.set("Authorization", "Basic " + S);
    }
    var A = e.headers || {};
    Object.keys(A).forEach(function(h) {
      m.headers.append(h, A[h]);
    }), Cf(m) && (s += (s.indexOf("?") === -1 ? "?" : "&") + "_nonce=" + Date.now());
    var g = e.fetch || ua;
    return g(s, m);
  };
  function u(s, m) {
    return se(s, Te(function(O) {
      _().then(function() {
        return m.apply(this, O);
      }).catch(function($) {
        var S = O.pop();
        S($);
      });
    })).bind(n);
  }
  function o(s, m, O) {
    var $ = {};
    return m = m || {}, m.headers = m.headers || new ut(), m.headers.get("Content-Type") || m.headers.set("Content-Type", "application/json"), m.headers.get("Accept") || m.headers.set("Accept", "application/json"), a(s, m).then(function(S) {
      return $.ok = S.ok, $.status = S.status, S.json();
    }).then(function(S) {
      if ($.data = S, !$.ok) {
        $.data.status = $.status;
        var A = lt($.data);
        if (O)
          return O(A);
        throw A;
      }
      if (Array.isArray($.data) && ($.data = $.data.map(function(g) {
        return g.error || g.missing ? lt(g) : g;
      })), O)
        O(null, $.data);
      else
        return $;
    });
  }
  var c;
  function _() {
    return e.skip_setup ? Promise.resolve() : c || (c = o(i).catch(function(s) {
      return s && s.status && s.status === 404 ? (Pn(404, "PouchDB is just detecting if the remote exists."), o(i, {
        method: "PUT"
      })) : Promise.reject(s);
    }).catch(function(s) {
      return s && s.status && s.status === 412 ? !0 : Promise.reject(s);
    }), c.catch(function() {
      c = null;
    }), c);
  }
  pe(function() {
    t(null, n);
  }), n._remote = !0, n.type = function() {
    return "http";
  }, n.id = u("id", function(s) {
    a(Kt(r, "")).then(function(m) {
      return m.json();
    }).catch(function() {
      return {};
    }).then(function(m) {
      var O = m && m.uuid ? m.uuid + r.db : ce(r, "");
      s(null, O);
    });
  }), n.compact = u("compact", function(s, m) {
    typeof s == "function" && (m = s, s = {}), s = le(s), o(ce(r, "_compact"), {
      method: "POST"
    }).then(function() {
      function O() {
        n.info(function($, S) {
          S && !S.compact_running ? m(null, {
            ok: !0
          }) : setTimeout(O, s.interval || 200);
        });
      }
      O();
    });
  }), n.bulkGet = se("bulkGet", function(s, m) {
    var O = this;
    function $(h) {
      var f = {};
      s.revs && (f.revs = !0), s.attachments && (f.attachments = !0), s.latest && (f.latest = !0), o(ce(r, "_bulk_get" + Ut(f)), {
        method: "POST",
        body: JSON.stringify({
          docs: s.docs
        })
      }).then(function(l) {
        s.attachments && s.binary && l.data.results.forEach(function(d) {
          d.docs.forEach(mn);
        }), h(null, l.data);
      }).catch(h);
    }
    function S() {
      var h = Sf, f = Math.ceil(s.docs.length / h), l = 0, d = new Array(f);
      function y(B) {
        return function(L, K) {
          d[B] = K.results, ++l === f && m(null, {
            results: Gt(d)
          });
        };
      }
      for (var j = 0; j < f; j++) {
        var R = jt(s, ["revs", "attachments", "binary", "latest"]);
        R.docs = s.docs.slice(j * h, Math.min(s.docs.length, (j + 1) * h)), Ji(O, R, y(j));
      }
    }
    var A = Kt(r, ""), g = _n[A];
    typeof g != "boolean" ? $(function(h, f) {
      h ? (_n[A] = !1, Pn(h.status, "PouchDB is just detecting if the remote supports the _bulk_get API."), S()) : (_n[A] = !0, m(null, f));
    }) : g ? $(m) : S();
  }), n._info = function(s) {
    _().then(function() {
      return a(ce(r, ""));
    }).then(function(m) {
      return m.json();
    }).then(function(m) {
      m.host = ce(r, ""), s(null, m);
    }).catch(s);
  }, n.fetch = function(s, m) {
    return _().then(function() {
      var O = s.substring(0, 1) === "/" ? Kt(r, s.substring(1)) : ce(r, s);
      return a(O, m);
    });
  }, n.get = u("get", function(s, m, O) {
    typeof m == "function" && (O = m, m = {}), m = le(m);
    var $ = {};
    m.revs && ($.revs = !0), m.revs_info && ($.revs_info = !0), m.latest && ($.latest = !0), m.open_revs && (m.open_revs !== "all" && (m.open_revs = JSON.stringify(m.open_revs)), $.open_revs = m.open_revs), m.rev && ($.rev = m.rev), m.conflicts && ($.conflicts = m.conflicts), m.update_seq && ($.update_seq = m.update_seq), s = Me(s);
    function S(h) {
      var f = h._attachments, l = f && Object.keys(f);
      if (!f || !l.length)
        return;
      function d(j) {
        var R = f[j], B = Me(h._id) + "/" + b(j) + "?rev=" + h._rev;
        return a(ce(r, B)).then(function(L) {
          return "buffer" in L ? L.buffer() : L.blob();
        }).then(function(L) {
          if (m.binary) {
            var K = Object.getOwnPropertyDescriptor(L.__proto__, "type");
            return (!K || K.set) && (L.type = R.content_type), L;
          }
          return new Promise(function(Z) {
            gr(L, Z);
          });
        }).then(function(L) {
          delete R.stub, delete R.length, R.data = L;
        });
      }
      var y = l.map(function(j) {
        return function() {
          return d(j);
        };
      });
      return Af(y, 5);
    }
    function A(h) {
      return Array.isArray(h) ? Promise.all(h.map(function(f) {
        if (f.ok)
          return S(f.ok);
      })) : S(h);
    }
    var g = ce(r, s + Ut($));
    o(g).then(function(h) {
      return Promise.resolve().then(function() {
        if (m.attachments)
          return A(h.data);
      }).then(function() {
        O(null, h.data);
      });
    }).catch(function(h) {
      h.docId = s, O(h);
    });
  }), n.remove = u("remove", function(s, m, O, $) {
    var S;
    typeof m == "string" ? (S = {
      _id: s,
      _rev: m
    }, typeof O == "function" && ($ = O, O = {})) : (S = s, typeof m == "function" ? ($ = m, O = {}) : ($ = O, O = m));
    var A = S._rev || O.rev, g = ce(r, Me(S._id)) + "?rev=" + A;
    o(g, {
      method: "DELETE"
    }, $).catch($);
  });
  function b(s) {
    return s.split("/").map(encodeURIComponent).join("/");
  }
  n.getAttachment = u("getAttachment", function(s, m, O, $) {
    typeof O == "function" && ($ = O, O = {});
    var S = O.rev ? "?rev=" + O.rev : "", A = ce(r, Me(s)) + "/" + b(m) + S, g;
    a(A, {
      method: "GET"
    }).then(function(h) {
      if (g = h.headers.get("content-type"), h.ok)
        return typeof process < "u" && !process.browser && typeof h.buffer == "function" ? h.buffer() : h.blob();
      throw h;
    }).then(function(h) {
      typeof process < "u" && !process.browser && (h.type = g), $(null, h);
    }).catch(function(h) {
      $(h);
    });
  }), n.removeAttachment = u("removeAttachment", function(s, m, O, $) {
    var S = ce(r, Me(s) + "/" + b(m)) + "?rev=" + O;
    o(S, {
      method: "DELETE"
    }, $).catch($);
  }), n.putAttachment = u("putAttachment", function(s, m, O, $, S, A) {
    typeof S == "function" && (A = S, S = $, $ = O, O = null);
    var g = Me(s) + "/" + b(m), h = ce(r, g);
    if (O && (h += "?rev=" + O), typeof $ == "string") {
      var f;
      try {
        f = dr($);
      } catch {
        return A(V(Wi, "Attachment is not a valid base64 string"));
      }
      $ = f ? hr(f, S) : "";
    }
    o(h, {
      headers: new ut({
        "Content-Type": S
      }),
      method: "PUT",
      body: $
    }, A).catch(A);
  }), n._bulkDocs = function(s, m, O) {
    s.new_edits = m.new_edits, _().then(function() {
      return Promise.all(s.docs.map(Zr));
    }).then(function() {
      return o(ce(r, "_bulk_docs"), {
        method: "POST",
        body: JSON.stringify(s)
      }, O);
    }).catch(O);
  }, n._put = function(s, m, O) {
    _().then(function() {
      return Zr(s);
    }).then(function() {
      return o(ce(r, Me(s._id)), {
        method: "PUT",
        body: JSON.stringify(s)
      });
    }).then(function($) {
      O(null, $.data);
    }).catch(function($) {
      $.docId = s && s._id, O($);
    });
  }, n.allDocs = u("allDocs", function(s, m) {
    typeof s == "function" && (m = s, s = {}), s = le(s);
    var O = {}, $, S = "GET";
    s.conflicts && (O.conflicts = !0), s.update_seq && (O.update_seq = !0), s.descending && (O.descending = !0), s.include_docs && (O.include_docs = !0), s.attachments && (O.attachments = !0), s.key && (O.key = JSON.stringify(s.key)), s.start_key && (s.startkey = s.start_key), s.startkey && (O.startkey = JSON.stringify(s.startkey)), s.end_key && (s.endkey = s.end_key), s.endkey && (O.endkey = JSON.stringify(s.endkey)), typeof s.inclusive_end < "u" && (O.inclusive_end = !!s.inclusive_end), typeof s.limit < "u" && (O.limit = s.limit), typeof s.skip < "u" && (O.skip = s.skip);
    var A = Ut(O);
    typeof s.keys < "u" && (S = "POST", $ = {
      keys: s.keys
    }), o(ce(r, "_all_docs" + A), {
      method: S,
      body: JSON.stringify($)
    }).then(function(g) {
      s.include_docs && s.attachments && s.binary && g.data.rows.forEach(mn), m(null, g.data);
    }).catch(m);
  }), n._changes = function(s) {
    var m = "batch_size" in s ? s.batch_size : Of;
    s = le(s), s.continuous && !("heartbeat" in s) && (s.heartbeat = xf);
    var O = "timeout" in s ? s.timeout : 30 * 1e3;
    "timeout" in s && s.timeout && O - s.timeout < Mt && (O = s.timeout + Mt), "heartbeat" in s && s.heartbeat && O - s.heartbeat < Mt && (O = s.heartbeat + Mt);
    var $ = {};
    "timeout" in s && s.timeout && ($.timeout = s.timeout);
    var S = typeof s.limit < "u" ? s.limit : !1, A = S;
    if (s.style && ($.style = s.style), (s.include_docs || s.filter && typeof s.filter == "function") && ($.include_docs = !0), s.attachments && ($.attachments = !0), s.continuous && ($.feed = "longpoll"), s.seq_interval && ($.seq_interval = s.seq_interval), s.conflicts && ($.conflicts = !0), s.descending && ($.descending = !0), s.update_seq && ($.update_seq = !0), "heartbeat" in s && s.heartbeat && ($.heartbeat = s.heartbeat), s.filter && typeof s.filter == "string" && ($.filter = s.filter), s.view && typeof s.view == "string" && ($.filter = "_view", $.view = s.view), s.query_params && typeof s.query_params == "object")
      for (var g in s.query_params)
        Object.prototype.hasOwnProperty.call(s.query_params, g) && ($[g] = s.query_params[g]);
    var h = "GET", f;
    s.doc_ids ? ($.filter = "_doc_ids", h = "POST", f = {
      doc_ids: s.doc_ids
    }) : s.selector && ($.filter = "_selector", h = "POST", f = {
      selector: s.selector
    });
    var l = new lo(), d, y = function(B, L) {
      if (!s.aborted) {
        $.since = B, typeof $.since == "object" && ($.since = JSON.stringify($.since)), s.descending ? S && ($.limit = A) : $.limit = !S || A > m ? m : A;
        var K = ce(r, "_changes" + Ut($)), Z = {
          signal: l.signal,
          method: h,
          body: JSON.stringify(f)
        };
        d = B, !s.aborted && _().then(function() {
          return o(K, Z, L);
        }).catch(L);
      }
    }, j = {
      results: []
    }, R = function(B, L) {
      if (!s.aborted) {
        var K = 0;
        if (L && L.results) {
          K = L.results.length, j.last_seq = L.last_seq;
          var Z = null, Y = null;
          typeof L.pending == "number" && (Z = L.pending), (typeof j.last_seq == "string" || typeof j.last_seq == "number") && (Y = j.last_seq);
          var J = {};
          J.query = s.query_params, L.results = L.results.filter(function(U) {
            A--;
            var v = cr(s)(U);
            return v && (s.include_docs && s.attachments && s.binary && mn(U), s.return_docs && j.results.push(U), s.onChange(U, Z, Y)), v;
          });
        } else if (B) {
          s.aborted = !0, s.complete(B);
          return;
        }
        L && L.last_seq && (d = L.last_seq);
        var G = S && A <= 0 || L && K < m || s.descending;
        s.continuous && !(S && A <= 0) || !G ? pe(function() {
          y(d, R);
        }) : s.complete(null, j);
      }
    };
    return y(s.since || 0, R), {
      cancel: function() {
        s.aborted = !0, l.abort();
      }
    };
  }, n.revsDiff = u("revsDiff", function(s, m, O) {
    typeof m == "function" && (O = m, m = {}), o(ce(r, "_revs_diff"), {
      method: "POST",
      body: JSON.stringify(s)
    }, O).catch(O);
  }), n._close = function(s) {
    s();
  }, n._destroy = function(s, m) {
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
zn.valid = function() {
  return !0;
};
function jf(e) {
  e.adapter("http", zn, !1), e.adapter("https", zn, !1);
}
function ze(e) {
  this.status = 400, this.name = "query_parse_error", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, ze);
  } catch {
  }
}
ve.exports(ze, Error);
function fn(e) {
  this.status = 404, this.name = "not_found", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, fn);
  } catch {
  }
}
ve.exports(fn, Error);
function sn(e) {
  this.status = 500, this.name = "invalid_value", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, sn);
  } catch {
  }
}
ve.exports(sn, Error);
function ma(e, t) {
  return t && e.then(function(n) {
    pe(function() {
      t(null, n);
    });
  }, function(n) {
    pe(function() {
      t(n);
    });
  }), e;
}
function If(e) {
  return Te(function(t) {
    var n = t.pop(), r = e.apply(this, t);
    return typeof n == "function" && ma(r, n), r;
  });
}
function Pf(e, t) {
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
function wn(e, t) {
  return function() {
    var n = arguments, r = this;
    return e.add(function() {
      return t.apply(r, n);
    });
  };
}
function Vr(e) {
  var t = new st(e), n = new Array(t.size), r = -1;
  return t.forEach(function(i) {
    n[++r] = i;
  }), n;
}
function bn(e) {
  var t = new Array(e.size), n = -1;
  return e.forEach(function(r, i) {
    t[++n] = i;
  }), t;
}
function ei(e) {
  var t = "builtin " + e + " function requires map values to be numbers or number arrays";
  return new sn(t);
}
function Kn(e) {
  for (var t = 0, n = 0, r = e.length; n < r; n++) {
    var i = e[n];
    if (typeof i != "number")
      if (Array.isArray(i)) {
        t = typeof t == "number" ? [t] : t;
        for (var a = 0, u = i.length; a < u; a++) {
          var o = i[a];
          if (typeof o != "number")
            throw ei("_sum");
          typeof t[a] > "u" ? t.push(o) : t[a] += o;
        }
      } else
        throw ei("_sum");
    else
      typeof t == "number" ? t += i : t[0] += i;
  }
  return t;
}
var qf = $e.bind(null, "log"), Tf = Array.isArray, Bf = JSON.parse;
function wa(e, t) {
  return lr("return (" + e.replace(/;\s*$/, "") + ");", {
    emit: t,
    sum: Kn,
    log: qf,
    isArray: Tf,
    toJSON: Bf
  });
}
function At() {
  this.promise = new Promise(function(e) {
    e();
  });
}
At.prototype.add = function(e) {
  return this.promise = this.promise.catch(function() {
  }).then(function() {
    return e();
  }), this.promise;
};
At.prototype.finish = function() {
  return this.promise;
};
function ti(e) {
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
function Rf(e, t) {
  return ti(e) + ti(t) + "undefined";
}
function ni(e, t, n, r, i, a) {
  var u = Rf(n, r), o;
  if (!i && (o = e._cachedViews = e._cachedViews || {}, o[u]))
    return o[u];
  var c = e.info().then(function(_) {
    var b = _.db_name + "-mrview-" + (i ? "temp" : ea(u));
    function s(m) {
      m.views = m.views || {};
      var O = t;
      O.indexOf("/") === -1 && (O = t + "/" + t);
      var $ = m.views[O] = m.views[O] || {};
      if (!$[b])
        return $[b] = !0, m;
    }
    return un(e, "_local/" + a, s).then(function() {
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
        return $.db.get("_local/lastSeq").catch(function(S) {
          if (S.status !== 404)
            throw S;
        }).then(function(S) {
          return $.seq = S ? S.seq : 0, o && $.db.once("destroyed", function() {
            delete o[u];
          }), $;
        });
      });
    });
  });
  return o && (o[u] = c), c;
}
var ri = {}, ii = new At(), Lf = 50;
function $n(e) {
  return e.indexOf("/") === -1 ? [e, e] : e.split("/");
}
function Df(e) {
  return e.length === 1 && /^1-/.test(e[0].rev);
}
function ai(e, t) {
  try {
    e.emit("error", t);
  } catch {
    $e("error", `The user's map/reduce function threw an uncaught error.
You can debug this error by doing:
myDatabase.on('error', function (err) { debugger; });
Please double-check your map/reduce function.`), $e("error", t);
  }
}
function Nf(e, t, n, r) {
  function i(v, p, w) {
    try {
      p(w);
    } catch (x) {
      ai(v, x);
    }
  }
  function a(v, p, w, x, C) {
    try {
      return {
        output: p(w, x, C)
      };
    } catch (I) {
      return ai(v, I), {
        error: I
      };
    }
  }
  function u(v, p) {
    var w = ue(v.key, p.key);
    return w !== 0 ? w : ue(v.value, p.value);
  }
  function o(v, p, w) {
    return w = w || 0, typeof p == "number" ? v.slice(w, p + w) : w > 0 ? v.slice(w) : v;
  }
  function c(v) {
    var p = v.value, w = p && typeof p == "object" && p._id || v.id;
    return w;
  }
  function _(v) {
    v.rows.forEach(function(p) {
      var w = p.doc && p.doc._attachments;
      !w || Object.keys(w).forEach(function(x) {
        var C = w[x];
        w[x].data = yr(C.data, C.content_type);
      });
    });
  }
  function b(v) {
    return function(p) {
      return v.include_docs && v.attachments && v.binary && _(p), p;
    };
  }
  function s(v, p, w, x) {
    var C = p[v];
    typeof C < "u" && (x && (C = encodeURIComponent(JSON.stringify(C))), w.push(v + "=" + C));
  }
  function m(v) {
    if (typeof v < "u") {
      var p = Number(v);
      return !isNaN(p) && p === parseInt(v, 10) ? p : v;
    }
  }
  function O(v) {
    return v.group_level = m(v.group_level), v.limit = m(v.limit), v.skip = m(v.skip), v;
  }
  function $(v) {
    if (v) {
      if (typeof v != "number")
        return new ze('Invalid value for integer: "' + v + '"');
      if (v < 0)
        return new ze('Invalid value for positive integer: "' + v + '"');
    }
  }
  function S(v, p) {
    var w = v.descending ? "endkey" : "startkey", x = v.descending ? "startkey" : "endkey";
    if (typeof v[w] < "u" && typeof v[x] < "u" && ue(v[w], v[x]) > 0)
      throw new ze("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");
    if (p.reduce && v.reduce !== !1) {
      if (v.include_docs)
        throw new ze("{include_docs:true} is invalid for reduce");
      if (v.keys && v.keys.length > 1 && !v.group && !v.group_level)
        throw new ze("Multi-key fetches for reduce views must use {group: true}");
    }
    ["group_level", "limit", "skip"].forEach(function(C) {
      var I = $(v[C]);
      if (I)
        throw I;
    });
  }
  function A(v, p, w) {
    var x = [], C, I = "GET", k, P;
    if (s("reduce", w, x), s("include_docs", w, x), s("attachments", w, x), s("limit", w, x), s("descending", w, x), s("group", w, x), s("group_level", w, x), s("skip", w, x), s("stale", w, x), s("conflicts", w, x), s("startkey", w, x, !0), s("start_key", w, x, !0), s("endkey", w, x, !0), s("end_key", w, x, !0), s("inclusive_end", w, x), s("key", w, x, !0), s("update_seq", w, x), x = x.join("&"), x = x === "" ? "" : "?" + x, typeof w.keys < "u") {
      var q = 2e3, T = "keys=" + encodeURIComponent(JSON.stringify(w.keys));
      T.length + x.length + 1 <= q ? x += (x[0] === "?" ? "&" : "?") + T : (I = "POST", typeof p == "string" ? C = {
        keys: w.keys
      } : p.keys = w.keys);
    }
    if (typeof p == "string") {
      var D = $n(p);
      return v.fetch("_design/" + D[0] + "/_view/" + D[1] + x, {
        headers: new ut({
          "Content-Type": "application/json"
        }),
        method: I,
        body: JSON.stringify(C)
      }).then(function(E) {
        return k = E.ok, P = E.status, E.json();
      }).then(function(E) {
        if (!k)
          throw E.status = P, lt(E);
        return E.rows.forEach(function(F) {
          if (F.value && F.value.error && F.value.error === "builtin_reduce_error")
            throw new Error(F.reason);
        }), E;
      }).then(b(w));
    }
    return C = C || {}, Object.keys(p).forEach(function(E) {
      Array.isArray(p[E]) ? C[E] = p[E] : C[E] = p[E].toString();
    }), v.fetch("_temp_view" + x, {
      headers: new ut({
        "Content-Type": "application/json"
      }),
      method: "POST",
      body: JSON.stringify(C)
    }).then(function(E) {
      return k = E.ok, P = E.status, E.json();
    }).then(function(E) {
      if (!k)
        throw E.status = P, lt(E);
      return E;
    }).then(b(w));
  }
  function g(v, p, w) {
    return new Promise(function(x, C) {
      v._query(p, w, function(I, k) {
        if (I)
          return C(I);
        x(k);
      });
    });
  }
  function h(v) {
    return new Promise(function(p, w) {
      v._viewCleanup(function(x, C) {
        if (x)
          return w(x);
        p(C);
      });
    });
  }
  function f(v) {
    return function(p) {
      if (p.status === 404)
        return v;
      throw p;
    };
  }
  function l(v, p, w) {
    var x = "_local/doc_" + v, C = {
      _id: x,
      keys: []
    }, I = w.get(v), k = I[0], P = I[1];
    function q() {
      return Df(P) ? Promise.resolve(C) : p.db.get(x).catch(f(C));
    }
    function T(E) {
      return E.keys.length ? p.db.allDocs({
        keys: E.keys,
        include_docs: !0
      }) : Promise.resolve({
        rows: []
      });
    }
    function D(E, F) {
      for (var W = [], te = new st(), M = 0, N = F.rows.length; M < N; M++) {
        var z = F.rows[M], Q = z.doc;
        if (!!Q && (W.push(Q), te.add(Q._id), Q._deleted = !k.has(Q._id), !Q._deleted)) {
          var ee = k.get(Q._id);
          "value" in ee && (Q.value = ee.value);
        }
      }
      var X = bn(k);
      return X.forEach(function(he) {
        if (!te.has(he)) {
          var Oe = {
            _id: he
          }, yt = k.get(he);
          "value" in yt && (Oe.value = yt.value), W.push(Oe);
        }
      }), E.keys = Vr(X.concat(E.keys)), W.push(E), W;
    }
    return q().then(function(E) {
      return T(E).then(function(F) {
        return D(E, F);
      });
    });
  }
  function d(v, p, w) {
    var x = "_local/lastSeq";
    return v.db.get(x).catch(f({
      _id: x,
      seq: 0
    })).then(function(C) {
      var I = bn(p);
      return Promise.all(I.map(function(k) {
        return l(k, v, p);
      })).then(function(k) {
        var P = Gt(k);
        return C.seq = w, P.push(C), v.db.bulkDocs({
          docs: P
        });
      });
    });
  }
  function y(v) {
    var p = typeof v == "string" ? v : v.name, w = ri[p];
    return w || (w = ri[p] = new At()), w;
  }
  function j(v, p) {
    return wn(y(v), function() {
      return R(v, p);
    })();
  }
  function R(v, p) {
    var w, x;
    function C(M, N) {
      var z = {
        id: x._id,
        key: Xe(M)
      };
      typeof N < "u" && N !== null && (z.value = Xe(N)), w.push(z);
    }
    var I = t(v.mapFun, C), k = v.seq || 0;
    function P(M, N) {
      return function() {
        return d(v, M, N);
      };
    }
    let q = 0, T = {
      view: v.name,
      indexed_docs: q
    };
    v.sourceDB.emit("indexing", T);
    var D = new At();
    function E() {
      return v.sourceDB.changes({
        return_docs: !0,
        conflicts: !0,
        include_docs: !0,
        style: "all_docs",
        since: k,
        limit: p.changes_batch_size
      }).then(F);
    }
    function F(M) {
      var N = M.results;
      if (!N.length)
        return;
      var z = W(N);
      D.add(P(z, k)), q = q + N.length;
      let Q = {
        view: v.name,
        last_seq: M.last_seq,
        results_count: N.length,
        indexed_docs: q
      };
      if (v.sourceDB.emit("indexing", Q), !(N.length < p.changes_batch_size))
        return E();
    }
    function W(M) {
      for (var N = new me(), z = 0, Q = M.length; z < Q; z++) {
        var ee = M[z];
        if (ee.doc._id[0] !== "_") {
          w = [], x = ee.doc, x._deleted || i(v.sourceDB, I, x), w.sort(u);
          var X = te(w);
          N.set(ee.doc._id, [X, ee.changes]);
        }
        k = ee.seq;
      }
      return N;
    }
    function te(M) {
      for (var N = new me(), z, Q = 0, ee = M.length; Q < ee; Q++) {
        var X = M[Q], he = [X.key, X.id];
        Q > 0 && ue(X.key, z) === 0 && he.push(Q), N.set(Se(he), X), z = X.key;
      }
      return N;
    }
    return E().then(function() {
      return D.finish();
    }).then(function() {
      v.seq = k;
    });
  }
  function B(v, p, w) {
    w.group_level === 0 && delete w.group_level;
    var x = w.group || w.group_level, C = n(v.reduceFun), I = [], k = isNaN(w.group_level) ? Number.POSITIVE_INFINITY : w.group_level;
    p.forEach(function(E) {
      var F = I[I.length - 1], W = x ? E.key : null;
      if (x && Array.isArray(W) && (W = W.slice(0, k)), F && ue(F.groupKey, W) === 0) {
        F.keys.push([E.key, E.id]), F.values.push(E.value);
        return;
      }
      I.push({
        keys: [[E.key, E.id]],
        values: [E.value],
        groupKey: W
      });
    }), p = [];
    for (var P = 0, q = I.length; P < q; P++) {
      var T = I[P], D = a(v.sourceDB, C, T.keys, T.values, !1);
      if (D.error && D.error instanceof sn)
        throw D.error;
      p.push({
        value: D.error ? null : D.output,
        key: T.groupKey
      });
    }
    return {
      rows: o(p, w.limit, w.skip)
    };
  }
  function L(v, p) {
    return wn(y(v), function() {
      return K(v, p);
    })();
  }
  function K(v, p) {
    var w, x = v.reduceFun && p.reduce !== !1, C = p.skip || 0;
    typeof p.keys < "u" && !p.keys.length && (p.limit = 0, delete p.keys);
    function I(M) {
      return M.include_docs = !0, v.db.allDocs(M).then(function(N) {
        return w = N.total_rows, N.rows.map(function(z) {
          if ("value" in z.doc && typeof z.doc.value == "object" && z.doc.value !== null) {
            var Q = Object.keys(z.doc.value).sort(), ee = ["id", "key", "value"];
            if (!(Q < ee || Q > ee))
              return z.doc.value;
          }
          var X = Co(z.doc._id);
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
      if (x ? N = B(v, M, p) : typeof p.keys > "u" ? N = {
        total_rows: w,
        offset: C,
        rows: M
      } : N = {
        total_rows: w,
        offset: C,
        rows: o(M, p.limit, p.skip)
      }, p.update_seq && (N.update_seq = v.seq), p.include_docs) {
        var z = Vr(M.map(c));
        return v.sourceDB.allDocs({
          keys: z,
          include_docs: !0,
          conflicts: p.conflicts,
          attachments: p.attachments,
          binary: p.binary
        }).then(function(Q) {
          var ee = new me();
          return Q.rows.forEach(function(X) {
            ee.set(X.id, X.doc);
          }), M.forEach(function(X) {
            var he = c(X), Oe = ee.get(he);
            Oe && (X.doc = Oe);
          }), N;
        });
      } else
        return N;
    }
    if (typeof p.keys < "u") {
      var P = p.keys, q = P.map(function(M) {
        var N = {
          startkey: Se([M]),
          endkey: Se([M, {}])
        };
        return p.update_seq && (N.update_seq = !0), I(N);
      });
      return Promise.all(q).then(Gt).then(k);
    } else {
      var T = {
        descending: p.descending
      };
      p.update_seq && (T.update_seq = !0);
      var D, E;
      if ("start_key" in p && (D = p.start_key), "startkey" in p && (D = p.startkey), "end_key" in p && (E = p.end_key), "endkey" in p && (E = p.endkey), typeof D < "u" && (T.startkey = p.descending ? Se([D, {}]) : Se([D])), typeof E < "u") {
        var F = p.inclusive_end !== !1;
        p.descending && (F = !F), T.endkey = Se(F ? [E, {}] : [E]);
      }
      if (typeof p.key < "u") {
        var W = Se([p.key]), te = Se([p.key, {}]);
        T.descending ? (T.endkey = W, T.startkey = te) : (T.startkey = W, T.endkey = te);
      }
      return x || (typeof p.limit == "number" && (T.limit = p.limit), T.skip = C), I(T).then(k);
    }
  }
  function Z(v) {
    return v.fetch("_view_cleanup", {
      headers: new ut({
        "Content-Type": "application/json"
      }),
      method: "POST"
    }).then(function(p) {
      return p.json();
    });
  }
  function Y(v) {
    return v.get("_local/" + e).then(function(p) {
      var w = new me();
      Object.keys(p.views).forEach(function(C) {
        var I = $n(C), k = "_design/" + I[0], P = I[1], q = w.get(k);
        q || (q = new st(), w.set(k, q)), q.add(P);
      });
      var x = {
        keys: bn(w),
        include_docs: !0
      };
      return v.allDocs(x).then(function(C) {
        var I = {};
        C.rows.forEach(function(q) {
          var T = q.key.substring(8);
          w.get(q.key).forEach(function(D) {
            var E = T + "/" + D;
            p.views[E] || (E = D);
            var F = Object.keys(p.views[E]), W = q.doc && q.doc.views && q.doc.views[D];
            F.forEach(function(te) {
              I[te] = I[te] || W;
            });
          });
        });
        var k = Object.keys(I).filter(function(q) {
          return !I[q];
        }), P = k.map(function(q) {
          return wn(y(q), function() {
            return new v.constructor(q, v.__opts).destroy();
          })();
        });
        return Promise.all(P).then(function() {
          return {
            ok: !0
          };
        });
      });
    }, f({
      ok: !0
    }));
  }
  function J(v, p, w) {
    if (typeof v._query == "function")
      return g(v, p, w);
    if (Pe(v))
      return A(v, p, w);
    var x = {
      changes_batch_size: v.__opts.view_update_changes_batch_size || Lf
    };
    if (typeof p != "string")
      return S(w, p), ii.add(function() {
        var q = ni(v, "temp_view/temp_view", p.map, p.reduce, !0, e);
        return q.then(function(T) {
          return Pf(j(T, x).then(function() {
            return L(T, w);
          }), function() {
            return T.db.destroy();
          });
        });
      }), ii.finish();
    var C = p, I = $n(C), k = I[0], P = I[1];
    return v.get("_design/" + k).then(function(q) {
      var T = q.views && q.views[P];
      if (!T)
        throw new fn("ddoc " + q._id + " has no view named " + P);
      r(q, P), S(w, T);
      var D = ni(v, C, T.map, T.reduce, !1, e);
      return D.then(function(E) {
        return w.stale === "ok" || w.stale === "update_after" ? (w.stale === "update_after" && pe(function() {
          j(E, x);
        }), L(E, w)) : j(E, x).then(function() {
          return L(E, w);
        });
      });
    });
  }
  function G(v, p, w) {
    var x = this;
    typeof p == "function" && (w = p, p = {}), p = p ? O(p) : {}, typeof v == "function" && (v = {
      map: v
    });
    var C = Promise.resolve().then(function() {
      return J(x, v, p);
    });
    return ma(C, w), C;
  }
  var U = If(function() {
    var v = this;
    return typeof v._viewCleanup == "function" ? h(v) : Pe(v) ? Z(v) : Y(v);
  });
  return {
    query: G,
    viewCleanup: U
  };
}
var An = {
  _sum: function(e, t) {
    return Kn(t);
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
      sum: Kn(t),
      min: Math.min.apply(null, t),
      max: Math.max.apply(null, t),
      count: t.length,
      sumsqr: n(t)
    };
  }
};
function Ff(e) {
  if (/^_sum/.test(e))
    return An._sum;
  if (/^_count/.test(e))
    return An._count;
  if (/^_stats/.test(e))
    return An._stats;
  if (/^_/.test(e))
    throw new Error(e + " is not a supported reduce function.");
}
function Mf(e, t) {
  if (typeof e == "function" && e.length === 2) {
    var n = e;
    return function(r) {
      return n(r, t);
    };
  } else
    return wa(e.toString(), t);
}
function Uf(e) {
  var t = e.toString(), n = Ff(t);
  return n || wa(t);
}
function zf(e, t) {
  var n = e.views && e.views[t];
  if (typeof n.map != "string")
    throw new fn("ddoc " + e._id + " has no string view named " + t + ", instead found object of type: " + typeof n.map);
}
var Kf = "mrviews", ba = Nf(Kf, Mf, Uf, zf);
function Jf(e, t, n) {
  return ba.query.call(this, e, t, n);
}
function Qf(e) {
  return ba.viewCleanup.call(this, e);
}
var Gf = {
  query: Jf,
  viewCleanup: Qf
};
function ui(e) {
  return /^1-/.test(e);
}
function Wf(e, t, n) {
  return !e._attachments || !e._attachments[n] || e._attachments[n].digest !== t._attachments[n].digest;
}
function oi(e, t) {
  var n = Object.keys(t._attachments);
  return Promise.all(n.map(function(r) {
    return e.getAttachment(t._id, r, {
      rev: t._rev
    });
  }));
}
function Hf(e, t, n) {
  var r = Pe(t) && !Pe(e), i = Object.keys(n._attachments);
  return r ? e.get(n._id).then(function(a) {
    return Promise.all(i.map(function(u) {
      return Wf(a, n, u) ? t.getAttachment(n._id, u) : e.getAttachment(a._id, u);
    }));
  }).catch(function(a) {
    if (a.status !== 404)
      throw a;
    return oi(t, n);
  }) : oi(t, n);
}
function Yf(e) {
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
function Xf(e, t, n, r) {
  n = le(n);
  var i = [], a = !0;
  function u() {
    var m = Yf(n);
    if (!!m.docs.length)
      return e.bulkGet(m).then(function(O) {
        if (r.cancelled)
          throw new Error("cancelled");
        return Promise.all(O.results.map(function($) {
          return Promise.all($.docs.map(function(S) {
            var A = S.ok;
            return S.error && (a = !1), !A || !A._attachments ? A : Hf(t, e, A).then(function(g) {
              var h = Object.keys(A._attachments);
              return g.forEach(function(f, l) {
                var d = A._attachments[h[l]];
                delete d.stub, delete d.length, d.data = f;
              }), A;
            });
          }));
        })).then(function($) {
          i = i.concat(Gt($).filter(Boolean));
        });
      });
  }
  function o(m) {
    return m._attachments && Object.keys(m._attachments).length > 0;
  }
  function c(m) {
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
        $.deleted || !$.doc || !ui($.value.rev) || o($.doc) || c($.doc) || ($.doc._conflicts && delete $.doc._conflicts, i.push($.doc), delete n[$.id]);
      });
    });
  }
  function b() {
    var m = Object.keys(n).filter(function(O) {
      var $ = n[O].missing;
      return $.length === 1 && ui($[0]);
    });
    if (m.length > 0)
      return _(m);
  }
  function s() {
    return {
      ok: a,
      docs: i
    };
  }
  return Promise.resolve().then(b).then(u).then(s);
}
var fi = 1, si = "pouchdb", Zf = 5, je = 0;
function Ar(e, t, n, r, i) {
  return e.get(t).catch(function(a) {
    if (a.status === 404)
      return (e.adapter === "http" || e.adapter === "https") && Pn(404, "PouchDB is just checking if a remote checkpoint exists."), {
        session_id: r,
        _id: t,
        history: [],
        replicator: si,
        version: fi
      };
    throw a;
  }).then(function(a) {
    if (!i.cancelled && a.last_seq !== n)
      return a.history = (a.history || []).filter(function(u) {
        return u.session_id !== r;
      }), a.history.unshift({
        last_seq: n,
        session_id: r
      }), a.history = a.history.slice(0, Zf), a.version = fi, a.replicator = si, a.session_id = r, a.last_seq = n, e.put(a).catch(function(u) {
        if (u.status === 409)
          return Ar(e, t, n, r, i);
        throw u;
      });
  });
}
function Tt(e, t, n, r, i) {
  this.src = e, this.target = t, this.id = n, this.returnValue = r, this.opts = i || {};
}
Tt.prototype.writeCheckpoint = function(e, t) {
  var n = this;
  return this.updateTarget(e, t).then(function() {
    return n.updateSource(e, t);
  });
};
Tt.prototype.updateTarget = function(e, t) {
  return this.opts.writeTargetCheckpoint ? Ar(this.target, this.id, e, t, this.returnValue) : Promise.resolve(!0);
};
Tt.prototype.updateSource = function(e, t) {
  if (this.opts.writeSourceCheckpoint) {
    var n = this;
    return Ar(this.src, this.id, e, t, this.returnValue).catch(function(r) {
      if (Aa(r))
        return n.opts.writeSourceCheckpoint = !1, !0;
      throw r;
    });
  } else
    return Promise.resolve(!0);
};
var ci = {
  undefined: function(e, t) {
    return ue(e.last_seq, t.last_seq) === 0 ? t.last_seq : 0;
  },
  1: function(e, t) {
    return Vf(t, e).last_seq;
  }
};
Tt.prototype.getCheckpoint = function() {
  var e = this;
  return e.opts && e.opts.writeSourceCheckpoint && !e.opts.writeTargetCheckpoint ? e.src.get(e.id).then(function(t) {
    return t.last_seq || je;
  }).catch(function(t) {
    if (t.status !== 404)
      throw t;
    return je;
  }) : e.target.get(e.id).then(function(t) {
    return e.opts && e.opts.writeTargetCheckpoint && !e.opts.writeSourceCheckpoint ? t.last_seq || je : e.src.get(e.id).then(function(n) {
      if (t.version !== n.version)
        return je;
      var r;
      return t.version ? r = t.version.toString() : r = "undefined", r in ci ? ci[r](t, n) : je;
    }, function(n) {
      if (n.status === 404 && t.last_seq)
        return e.src.put({
          _id: e.id,
          last_seq: je
        }).then(function() {
          return je;
        }, function(r) {
          return Aa(r) ? (e.opts.writeSourceCheckpoint = !1, t.last_seq) : je;
        });
      throw n;
    });
  }).catch(function(t) {
    if (t.status !== 404)
      throw t;
    return je;
  });
};
function Vf(e, t) {
  return e.session_id === t.session_id ? {
    last_seq: e.last_seq,
    history: e.history
  } : $a(e.history, t.history);
}
function $a(e, t) {
  var n = e[0], r = e.slice(1), i = t[0], a = t.slice(1);
  if (!n || t.length === 0)
    return {
      last_seq: je,
      history: []
    };
  var u = n.session_id;
  if (Jn(u, t))
    return {
      last_seq: n.last_seq,
      history: e
    };
  var o = i.session_id;
  return Jn(o, r) ? {
    last_seq: i.last_seq,
    history: a
  } : $a(r, a);
}
function Jn(e, t) {
  var n = t[0], r = t.slice(1);
  return !e || t.length === 0 ? !1 : e === n.session_id ? !0 : Jn(e, r);
}
function Aa(e) {
  return typeof e.status == "number" && Math.floor(e.status / 100) === 4;
}
var li = 0;
function es(e, t, n, r) {
  if (e.retry === !1) {
    t.emit("error", n), t.removeAllListeners();
    return;
  }
  if (typeof e.back_off_function != "function" && (e.back_off_function = xu), t.emit("requestError", n), t.state === "active" || t.state === "pending") {
    t.emit("paused", n), t.state = "stopped";
    var i = function() {
      e.current_back_off = li;
    }, a = function() {
      t.removeListener("active", i);
    };
    t.once("paused", a), t.once("active", i);
  }
  e.current_back_off = e.current_back_off || li, e.current_back_off = e.back_off_function(e.current_back_off), setTimeout(r, e.current_back_off);
}
function ts(e) {
  return Object.keys(e).sort(ue).reduce(function(t, n) {
    return t[n] = e[n], t;
  }, {});
}
function ns(e, t, n) {
  var r = n.doc_ids ? n.doc_ids.sort(ue) : "", i = n.filter ? n.filter.toString() : "", a = "", u = "", o = "";
  return n.selector && (o = JSON.stringify(n.selector)), n.filter && n.query_params && (a = JSON.stringify(ts(n.query_params))), n.filter && n.filter === "_view" && (u = n.view.toString()), Promise.all([e.id(), t.id()]).then(function(c) {
    var _ = c[0] + c[1] + i + u + a + r + o;
    return new Promise(function(b) {
      pr(_, b);
    });
  }).then(function(c) {
    return c = c.replace(/\//g, ".").replace(/\+/g, "_"), "_local/" + c;
  });
}
function Oa(e, t, n, r, i) {
  var a = [], u, o = {
    seq: 0,
    changes: [],
    docs: []
  }, c = !1, _ = !1, b = !1, s = 0, m = n.continuous || n.live || !1, O = n.batch_size || 100, $ = n.batches_limit || 10, S = n.style || "all_docs", A = !1, g = n.doc_ids, h = n.selector, f, l, d = [], y = on();
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
    return l ? Promise.resolve() : ns(e, t, n).then(function(k) {
      f = k;
      var P = {};
      n.checkpoint === !1 ? P = {
        writeSourceCheckpoint: !1,
        writeTargetCheckpoint: !1
      } : n.checkpoint === "source" ? P = {
        writeSourceCheckpoint: !0,
        writeTargetCheckpoint: !1
      } : n.checkpoint === "target" ? P = {
        writeSourceCheckpoint: !1,
        writeTargetCheckpoint: !0
      } : P = {
        writeSourceCheckpoint: !0,
        writeTargetCheckpoint: !0
      }, l = new Tt(e, t, f, r, P);
    });
  }
  function B() {
    if (d = [], u.docs.length !== 0) {
      var k = u.docs, P = {
        timeout: n.timeout
      };
      return t.bulkDocs({
        docs: k,
        new_edits: !1
      }, P).then(function(q) {
        if (r.cancelled)
          throw U(), new Error("cancelled");
        var T = /* @__PURE__ */ Object.create(null);
        q.forEach(function(E) {
          E.error && (T[E.id] = E);
        });
        var D = Object.keys(T).length;
        i.doc_write_failures += D, i.docs_written += k.length - D, k.forEach(function(E) {
          var F = T[E._id];
          if (F) {
            i.errors.push(F);
            var W = (F.name || "").toLowerCase();
            if (W === "unauthorized" || W === "forbidden")
              r.emit("denied", le(F));
            else
              throw F;
          } else
            d.push(E);
        });
      }, function(q) {
        throw i.doc_write_failures += k.length, q;
      });
    }
  }
  function L() {
    if (u.error)
      throw new Error("There was a problem getting docs.");
    i.last_seq = s = u.seq;
    var k = le(i);
    return d.length && (k.docs = d, typeof u.pending == "number" && (k.pending = u.pending, delete u.pending), r.emit("change", k)), c = !0, l.writeCheckpoint(u.seq, y).then(function() {
      if (r.emit("checkpoint", {
        checkpoint: u.seq
      }), c = !1, r.cancelled)
        throw U(), new Error("cancelled");
      u = void 0, x();
    }).catch(function(P) {
      throw I(P), P;
    });
  }
  function K() {
    var k = {};
    return u.changes.forEach(function(P) {
      r.emit("checkpoint", {
        revs_diff: P
      }), P.id !== "_user/" && (k[P.id] = P.changes.map(function(q) {
        return q.rev;
      }));
    }), t.revsDiff(k).then(function(P) {
      if (r.cancelled)
        throw U(), new Error("cancelled");
      u.diffs = P;
    });
  }
  function Z() {
    return Xf(e, t, u.diffs, r).then(function(k) {
      u.error = !k.ok, k.docs.forEach(function(P) {
        delete u.diffs[P._id], i.docs_read++, u.docs.push(P);
      });
    });
  }
  function Y() {
    if (!(r.cancelled || u)) {
      if (a.length === 0) {
        J(!0);
        return;
      }
      u = a.shift(), r.emit("checkpoint", {
        start_next_batch: u.seq
      }), K().then(Z).then(B).then(L).then(Y).catch(function(k) {
        G("batch processing terminated with error", k);
      });
    }
  }
  function J(k) {
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
  function G(k, P) {
    b || (P.message || (P.message = k), i.ok = !1, i.status = "aborting", a = [], o = {
      seq: 0,
      changes: [],
      docs: []
    }, U(P));
  }
  function U(k) {
    if (!b && !(r.cancelled && (i.status = "cancelled", c)))
      if (i.status = i.status || "complete", i.end_time = new Date().toISOString(), i.last_seq = s, b = !0, k) {
        k = V(k), k.result = i;
        var P = (k.name || "").toLowerCase();
        P === "unauthorized" || P === "forbidden" ? (r.emit("error", k), r.removeAllListeners()) : es(n, r, k, function() {
          Oa(e, t, n, r);
        });
      } else
        r.emit("complete", i), r.removeAllListeners();
  }
  function v(k, P, q) {
    if (r.cancelled)
      return U();
    typeof P == "number" && (o.pending = P);
    var T = cr(n)(k);
    !T || (o.seq = k.seq || q, o.changes.push(k), r.emit("checkpoint", {
      pending_batch: o.seq
    }), pe(function() {
      J(a.length === 0 && j.live);
    }));
  }
  function p(k) {
    if (A = !1, r.cancelled)
      return U();
    if (k.results.length > 0)
      j.since = k.results[k.results.length - 1].seq, x(), J(!0);
    else {
      var P = function() {
        m ? (j.live = !0, x()) : _ = !0, J(!0);
      };
      !u && k.results.length === 0 ? (c = !0, l.writeCheckpoint(k.last_seq, y).then(function() {
        c = !1, i.last_seq = s = k.last_seq, P();
      }).catch(I)) : P();
    }
  }
  function w(k) {
    if (A = !1, r.cancelled)
      return U();
    G("changes rejected", k);
  }
  function x() {
    if (!(!A && !_ && a.length < $))
      return;
    A = !0;
    function k() {
      q.cancel();
    }
    function P() {
      r.removeListener("cancel", k);
    }
    r._changes && (r.removeListener("cancel", r._abortChanges), r._changes.cancel()), r.once("cancel", k);
    var q = e.changes(j).on("change", v);
    q.then(P, P), q.then(p).catch(w), n.retry && (r._changes = q, r._abortChanges = k);
  }
  function C() {
    R().then(function() {
      if (r.cancelled) {
        U();
        return;
      }
      return l.getCheckpoint().then(function(k) {
        s = k, j = {
          since: s,
          limit: O,
          batch_size: O,
          style: S,
          doc_ids: g,
          selector: h,
          return_docs: !0
        }, n.filter && (typeof n.filter != "string" ? j.include_docs = !0 : j.filter = n.filter), "heartbeat" in n && (j.heartbeat = n.heartbeat), "timeout" in n && (j.timeout = n.timeout), n.query_params && (j.query_params = n.query_params), n.view && (j.view = n.view), x();
      });
    }).catch(function(k) {
      G("getCheckpoint rejected with ", k);
    });
  }
  function I(k) {
    c = !1, G("writeCheckpoint completed with error", k);
  }
  if (r.cancelled) {
    U();
    return;
  }
  r._addedListeners || (r.once("cancel", U), typeof n.complete == "function" && (r.once("error", n.complete), r.once("complete", function(k) {
    n.complete(null, k);
  })), r._addedListeners = !0), typeof n.since > "u" ? C() : R().then(function() {
    return c = !0, l.writeCheckpoint(n.since, y);
  }).then(function() {
    if (c = !1, r.cancelled) {
      U();
      return;
    }
    s = n.since, C();
  }).catch(I);
}
ve.exports(cn, de.exports);
function cn() {
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
cn.prototype.cancel = function() {
  this.cancelled = !0, this.state = "cancelled", this.emit("cancel");
};
cn.prototype.ready = function(e, t) {
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
function Yt(e, t) {
  var n = t.PouchConstructor;
  return typeof e == "string" ? new n(e, t) : e;
}
function Qn(e, t, n, r) {
  if (typeof n == "function" && (r = n, n = {}), typeof n > "u" && (n = {}), n.doc_ids && !Array.isArray(n.doc_ids))
    throw V(an, "`doc_ids` filter parameter is not a list.");
  n.complete = r, n = le(n), n.continuous = n.continuous || n.live, n.retry = "retry" in n ? n.retry : !1, n.PouchConstructor = n.PouchConstructor || this;
  var i = new cn(), a = Yt(e, n), u = Yt(t, n);
  return Oa(a, u, n, i), i;
}
ve.exports(Or, de.exports);
function rs(e, t, n, r) {
  return typeof n == "function" && (r = n, n = {}), typeof n > "u" && (n = {}), n = le(n), n.PouchConstructor = n.PouchConstructor || this, e = Yt(e, n), t = Yt(t, n), new Or(e, t, n, r);
}
function Or(e, t, n, r) {
  var i = this;
  this.canceled = !1;
  var a = n.push ? We({}, n, n.push) : n, u = n.pull ? We({}, n, n.pull) : n;
  this.push = Qn(e, t, a), this.pull = Qn(t, e, u), this.pushPaused = !0, this.pullPaused = !0;
  function o(f) {
    i.emit("change", {
      direction: "pull",
      change: f
    });
  }
  function c(f) {
    i.emit("change", {
      direction: "push",
      change: f
    });
  }
  function _(f) {
    i.emit("denied", {
      direction: "push",
      doc: f
    });
  }
  function b(f) {
    i.emit("denied", {
      direction: "pull",
      doc: f
    });
  }
  function s() {
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
  var S = {};
  function A(f) {
    return function(l, d) {
      var y = l === "change" && (d === o || d === c), j = l === "denied" && (d === b || d === _), R = l === "paused" && (d === m || d === s), B = l === "active" && (d === $ || d === O);
      (y || j || R || B) && (l in S || (S[l] = {}), S[l][f] = !0, Object.keys(S[l]).length === 2 && i.removeAllListeners(l));
    };
  }
  n.live && (this.push.on("complete", i.pull.cancel.bind(i.pull)), this.pull.on("complete", i.push.cancel.bind(i.push)));
  function g(f, l, d) {
    f.listeners(l).indexOf(d) == -1 && f.on(l, d);
  }
  this.on("newListener", function(f) {
    f === "change" ? (g(i.pull, "change", o), g(i.push, "change", c)) : f === "denied" ? (g(i.pull, "denied", b), g(i.push, "denied", _)) : f === "active" ? (g(i.pull, "active", $), g(i.push, "active", O)) : f === "paused" && (g(i.pull, "paused", m), g(i.push, "paused", s));
  }), this.on("removeListener", function(f) {
    f === "change" ? (i.pull.removeListener("change", o), i.push.removeListener("change", c)) : f === "denied" ? (i.pull.removeListener("denied", b), i.push.removeListener("denied", _)) : f === "active" ? (i.pull.removeListener("active", $), i.push.removeListener("active", O)) : f === "paused" && (i.pull.removeListener("paused", m), i.push.removeListener("paused", s));
  }), this.pull.on("removeListener", A("pull")), this.push.on("removeListener", A("push"));
  var h = Promise.all([this.push, this.pull]).then(function(f) {
    var l = {
      push: f[0],
      pull: f[1]
    };
    return i.emit("complete", l), r && r(null, l), i.removeAllListeners(), l;
  }, function(f) {
    if (i.cancel(), r ? r(f) : i.emit("error", f), i.removeAllListeners(), r)
      throw f;
  });
  this.then = function(f, l) {
    return h.then(f, l);
  }, this.catch = function(f) {
    return h.catch(f);
  };
}
Or.prototype.cancel = function() {
  this.canceled || (this.canceled = !0, this.push.cancel(), this.pull.cancel());
};
function is(e) {
  e.replicate = Qn, e.sync = rs, Object.defineProperty(e.prototype, "replicate", {
    get: function() {
      var t = this;
      return typeof this.replicateMethods > "u" && (this.replicateMethods = {
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
H.plugin($f).plugin(jf).plugin(Gf).plugin(is);
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
var as = new ie(500, "unknown_error", "Database encountered an unknown error");
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
function Gn(e) {
  if (typeof e != "object") {
    var t = e;
    e = as, e.data = t;
  }
  return "error" in e && e.error === "conflict" && (e.name = "conflict", e.status = 409), "name" in e || (e.name = e.error || "unknown"), "status" in e || (e.status = 500), "message" in e || (e.message = e.message || e.reason), "stack" in e || (e.stack = new Error().stack), e;
}
var Jt = Headers;
function ln(e) {
  return "$" + e;
}
function Sa(e) {
  return e.substring(1);
}
function Re() {
  this._store = {};
}
Re.prototype.get = function(e) {
  var t = ln(e);
  return this._store[t];
};
Re.prototype.set = function(e, t) {
  var n = ln(e);
  return this._store[n] = t, !0;
};
Re.prototype.has = function(e) {
  var t = ln(e);
  return t in this._store;
};
Re.prototype.keys = function() {
  return Object.keys(this._store).map((e) => Sa(e));
};
Re.prototype.delete = function(e) {
  var t = ln(e), n = t in this._store;
  return delete this._store[t], n;
};
Re.prototype.forEach = function(e) {
  for (var t = Object.keys(this._store), n = 0, r = t.length; n < r; n++) {
    var i = t[n], a = this._store[i];
    i = Sa(i), e(a, i);
  }
};
Object.defineProperty(Re.prototype, "size", {
  get: function() {
    return Object.keys(this._store).length;
  }
});
function Bt(e) {
  if (this._store = new Re(), e && Array.isArray(e))
    for (var t = 0, n = e.length; t < n; t++)
      this.add(e[t]);
}
Bt.prototype.add = function(e) {
  return this._store.set(e, !0);
};
Bt.prototype.has = function(e) {
  return this._store.has(e);
};
Bt.prototype.forEach = function(e) {
  this._store.forEach(function(t, n) {
    e(n);
  });
};
Object.defineProperty(Bt.prototype, "size", {
  get: function() {
    return this._store.size;
  }
});
function us() {
  if (typeof Symbol > "u" || typeof Map > "u" || typeof Set > "u")
    return !1;
  var e = Object.getOwnPropertyDescriptor(Map, Symbol.species);
  return e && "get" in e && Map[Symbol.species] === Map;
}
var Ot, rt;
us() ? (Ot = Set, rt = Map) : (Ot = Bt, rt = Re);
var os = function(e) {
  return atob(e);
};
function fs(e, t) {
  e = e || [], t = t || {};
  try {
    return new Blob(e, t);
  } catch (a) {
    if (a.name !== "TypeError")
      throw a;
    for (var n = typeof BlobBuilder < "u" ? BlobBuilder : typeof MSBlobBuilder < "u" ? MSBlobBuilder : typeof MozBlobBuilder < "u" ? MozBlobBuilder : WebKitBlobBuilder, r = new n(), i = 0; i < e.length; i += 1)
      r.append(e[i]);
    return r.getBlob(t.type);
  }
}
function ss(e) {
  for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), i = 0; i < t; i++)
    r[i] = e.charCodeAt(i);
  return n;
}
function cs(e, t) {
  return fs([ss(e)], {
    type: t
  });
}
function ls(e, t) {
  return cs(os(e), t);
}
function ds(e, t, n) {
  for (var r = "", i = n - e.length; r.length < i; )
    r += t;
  return r;
}
function vs(e, t, n) {
  var r = ds(e, t, n);
  return r + e;
}
var xa = -324, Wn = 3, Hn = "";
function fe(e, t) {
  if (e === t)
    return 0;
  e = Ze(e), t = Ze(t);
  var n = Yn(e), r = Yn(t);
  if (n - r !== 0)
    return n - r;
  switch (typeof e) {
    case "number":
      return e - t;
    case "boolean":
      return e < t ? -1 : 1;
    case "string":
      return ms(e, t);
  }
  return Array.isArray(e) ? _s(e, t) : ws(e, t);
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
              typeof a < "u" && (e[i] = Ze(a));
            }
        }
      }
  }
  return e;
}
function hs(e) {
  if (e !== null)
    switch (typeof e) {
      case "boolean":
        return e ? 1 : 0;
      case "number":
        return bs(e);
      case "string":
        return e.replace(/\u0002/g, "").replace(/\u0001/g, "").replace(/\u0000/g, "");
      case "object":
        var t = Array.isArray(e), n = t ? e : Object.keys(e), r = -1, i = n.length, a = "";
        if (t)
          for (; ++r < i; )
            a += Ee(n[r]);
        else
          for (; ++r < i; ) {
            var u = n[r];
            a += Ee(u) + Ee(e[u]);
          }
        return a;
    }
  return "";
}
function Ee(e) {
  var t = "\0";
  return e = Ze(e), Yn(e) + Hn + hs(e) + t;
}
function ys(e, t) {
  var n = t, r, i = e[t] === "1";
  if (i)
    r = 0, t++;
  else {
    var a = e[t] === "0";
    t++;
    var u = "", o = e.substring(t, t + Wn), c = parseInt(o, 10) + xa;
    for (a && (c = -c), t += Wn; ; ) {
      var _ = e[t];
      if (_ === "\0")
        break;
      u += _, t++;
    }
    u = u.split("."), u.length === 1 ? r = parseInt(u, 10) : r = parseFloat(u[0] + "." + u[1]), a && (r = r - 10), c !== 0 && (r = parseFloat(r + "e" + c));
  }
  return {
    num: r,
    length: t - n
  };
}
function gs(e, t) {
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
function ps(e) {
  for (var t = [], n = [], r = 0; ; ) {
    var i = e[r++];
    if (i === "\0") {
      if (t.length === 1)
        return t.pop();
      gs(t, n);
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
        var a = ys(e, r);
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
        var c = {
          element: [],
          index: t.length
        };
        t.push(c.element), n.push(c);
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
function _s(e, t) {
  for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) {
    var i = fe(e[r], t[r]);
    if (i !== 0)
      return i;
  }
  return e.length === t.length ? 0 : e.length > t.length ? 1 : -1;
}
function ms(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function ws(e, t) {
  for (var n = Object.keys(e), r = Object.keys(t), i = Math.min(n.length, r.length), a = 0; a < i; a++) {
    var u = fe(n[a], r[a]);
    if (u !== 0 || (u = fe(e[n[a]], t[r[a]]), u !== 0))
      return u;
  }
  return n.length === r.length ? 0 : n.length > r.length ? 1 : -1;
}
function Yn(e) {
  var t = ["boolean", "number", "string", "object"], n = t.indexOf(typeof e);
  if (~n)
    return e === null ? 1 : Array.isArray(e) ? 5 : n < 3 ? n + 2 : n + 3;
  if (Array.isArray(e))
    return 5;
}
function bs(e) {
  if (e === 0)
    return "1";
  var t = e.toExponential().split(/e\+?/), n = parseInt(t[1], 10), r = e < 0, i = r ? "0" : "2", a = (r ? -n : n) - xa, u = vs(a.toString(), "0", Wn);
  i += Hn + u;
  var o = Math.abs(parseFloat(t[0]));
  r && (o = 10 - o);
  var c = o.toFixed(20);
  return c = c.replace(/\.?0+$/, ""), i += Hn + c, i;
}
function Ea(e) {
  return Qt.hash(e);
}
function $s(e) {
  return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer || typeof Blob < "u" && e instanceof Blob;
}
function As(e) {
  if (typeof e.slice == "function")
    return e.slice(0);
  var t = new ArrayBuffer(e.byteLength), n = new Uint8Array(t), r = new Uint8Array(e);
  return n.set(r), t;
}
function Os(e) {
  if (e instanceof ArrayBuffer)
    return As(e);
  var t = e.size, n = e.type;
  return typeof e.slice == "function" ? e.slice(0, t, n) : e.webkitSlice(0, t, n);
}
var ka = Function.prototype.toString, Ss = ka.call(Object);
function xs(e) {
  var t = Object.getPrototypeOf(e);
  if (t === null)
    return !0;
  var n = t.constructor;
  return typeof n == "function" && n instanceof n && ka.call(n) == Ss;
}
function De(e) {
  var t, n, r;
  if (!e || typeof e != "object")
    return e;
  if (Array.isArray(e)) {
    for (t = [], n = 0, r = e.length; n < r; n++)
      t[n] = De(e[n]);
    return t;
  }
  if (e instanceof Date && isFinite(e))
    return e.toISOString();
  if ($s(e))
    return Os(e);
  if (!xs(e))
    return e;
  t = {};
  for (n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      var i = De(e[n]);
      typeof i < "u" && (t[n] = i);
    }
  return t;
}
function Es(e) {
  var t = !1;
  return Te(function(n) {
    if (t)
      throw new Error("once called more than once");
    t = !0, e.apply(this, n);
  });
}
function Rt(e) {
  return Te(function(t) {
    t = De(t);
    var n = this, r = typeof t[t.length - 1] == "function" ? t.pop() : !1, i = new Promise(function(a, u) {
      var o;
      try {
        var c = Es(function(_, b) {
          _ ? u(_) : a(b);
        });
        t.push(c), o = e.apply(n, t), o && typeof o.then == "function" && a(o);
      } catch (_) {
        u(_);
      }
    });
    return r && i.then(function(a) {
      r(null, a);
    }, r), i;
  });
}
function ks(e, t) {
  for (var n = {}, r = 0, i = t.length; r < i; r++) {
    var a = t[r];
    a in e && (n[a] = e[a]);
  }
  return n;
}
var Xn;
try {
  localStorage.setItem("_pouch_check_localstorage", 1), Xn = !!localStorage.getItem("_pouch_check_localstorage");
} catch {
  Xn = !1;
}
function Ca() {
  return Xn;
}
ve.exports(Lt, de.exports);
function Cs(e) {
  Ca() && addEventListener("storage", function(t) {
    e.emit(t.key);
  });
}
function Lt() {
  de.exports.call(this), this._listeners = {}, Cs(this);
}
Lt.prototype.addListener = function(e, t, n, r) {
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
    var o = ks(r, ["style", "include_docs", "attachments", "conflicts", "filter", "doc_ids", "view", "since", "query_params", "binary", "return_docs"]);
    function c() {
      a = !1;
    }
    n.changes(o).on("change", function(_) {
      _.seq > r.since && !r.cancelled && (r.since = _.seq, r.onChange(_));
    }).on("complete", function() {
      a === "waiting" && pe(u), a = !1;
    }).on("error", c);
  }
  this._listeners[t] = u, this.on(e, u);
};
Lt.prototype.removeListener = function(e, t) {
  t in this._listeners && (de.exports.prototype.removeListener.call(this, e, this._listeners[t]), delete this._listeners[t]);
};
Lt.prototype.notifyLocalWindows = function(e) {
  Ca() && (localStorage[e] = localStorage[e] === "a" ? "b" : "a");
};
Lt.prototype.notify = function(e) {
  this.emit(e), this.notifyLocalWindows(e);
};
function Zn(e) {
  if (typeof console < "u" && typeof console[e] == "function") {
    var t = Array.prototype.slice.call(arguments, 1);
    console[e].apply(console, t);
  }
}
var Vn;
typeof Object.assign == "function" ? Vn = Object.assign : Vn = function(e) {
  for (var t = Object(e), n = 1; n < arguments.length; n++) {
    var r = arguments[n];
    if (r != null)
      for (var i in r)
        Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
  }
  return t;
};
var Sr = Vn;
function di(e) {
  for (var t = [], n = 0, r = e.length; n < r; n++)
    t = t.concat(e[n]);
  return t;
}
function Ve(e) {
  return typeof e._remote == "boolean" ? e._remote : typeof e.type == "function" ? (Zn("warn", "db.type() is deprecated and will be removed in a future version of PouchDB"), e.type() === "http") : !1;
}
function dn(e, t, n) {
  return e.get(t).catch(function(r) {
    if (r.status !== 404)
      throw r;
    return {};
  }).then(function(r) {
    var i = r._rev, a = n(r);
    return a ? (a._id = t, a._rev = i, js(e, a, n)) : {
      updated: !1,
      rev: i
    };
  });
}
function js(e, t, n) {
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
function Ke(e) {
  this.status = 400, this.name = "query_parse_error", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, Ke);
  } catch {
  }
}
ve.exports(Ke, Error);
function xr(e) {
  this.status = 404, this.name = "not_found", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, xr);
  } catch {
  }
}
ve.exports(xr, Error);
function Er(e) {
  this.status = 500, this.name = "invalid_value", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, Er);
  } catch {
  }
}
ve.exports(Er, Error);
function ja(e, t) {
  return t && e.then(function(n) {
    pe(function() {
      t(null, n);
    });
  }, function(n) {
    pe(function() {
      t(n);
    });
  }), e;
}
function Is(e) {
  return Te(function(t) {
    var n = t.pop(), r = e.apply(this, t);
    return typeof n == "function" && ja(r, n), r;
  });
}
function Ps(e, t) {
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
function On(e, t) {
  return function() {
    var n = arguments, r = this;
    return e.add(function() {
      return t.apply(r, n);
    });
  };
}
function vi(e) {
  var t = new Ot(e), n = new Array(t.size), r = -1;
  return t.forEach(function(i) {
    n[++r] = i;
  }), n;
}
function Sn(e) {
  var t = new Array(e.size), n = -1;
  return e.forEach(function(r, i) {
    t[++n] = i;
  }), t;
}
function St() {
  this.promise = new Promise(function(e) {
    e();
  });
}
St.prototype.add = function(e) {
  return this.promise = this.promise.catch(function() {
  }).then(function() {
    return e();
  }), this.promise;
};
St.prototype.finish = function() {
  return this.promise;
};
function hi(e) {
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
function qs(e, t) {
  return hi(e) + hi(t) + "undefined";
}
function yi(e, t, n, r, i, a) {
  var u = qs(n, r), o;
  if (!i && (o = e._cachedViews = e._cachedViews || {}, o[u]))
    return o[u];
  var c = e.info().then(function(_) {
    var b = _.db_name + "-mrview-" + (i ? "temp" : Ea(u));
    function s(m) {
      m.views = m.views || {};
      var O = t;
      O.indexOf("/") === -1 && (O = t + "/" + t);
      var $ = m.views[O] = m.views[O] || {};
      if (!$[b])
        return $[b] = !0, m;
    }
    return dn(e, "_local/" + a, s).then(function() {
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
        return $.db.get("_local/lastSeq").catch(function(S) {
          if (S.status !== 404)
            throw S;
        }).then(function(S) {
          return $.seq = S ? S.seq : 0, o && $.db.once("destroyed", function() {
            delete o[u];
          }), $;
        });
      });
    });
  });
  return o && (o[u] = c), c;
}
var gi = {}, pi = new St(), Ts = 50;
function xn(e) {
  return e.indexOf("/") === -1 ? [e, e] : e.split("/");
}
function Bs(e) {
  return e.length === 1 && /^1-/.test(e[0].rev);
}
function _i(e, t) {
  try {
    e.emit("error", t);
  } catch {
    Zn("error", `The user's map/reduce function threw an uncaught error.
You can debug this error by doing:
myDatabase.on('error', function (err) { debugger; });
Please double-check your map/reduce function.`), Zn("error", t);
  }
}
function Rs(e, t, n, r) {
  function i(v, p, w) {
    try {
      p(w);
    } catch (x) {
      _i(v, x);
    }
  }
  function a(v, p, w, x, C) {
    try {
      return {
        output: p(w, x, C)
      };
    } catch (I) {
      return _i(v, I), {
        error: I
      };
    }
  }
  function u(v, p) {
    var w = fe(v.key, p.key);
    return w !== 0 ? w : fe(v.value, p.value);
  }
  function o(v, p, w) {
    return w = w || 0, typeof p == "number" ? v.slice(w, p + w) : w > 0 ? v.slice(w) : v;
  }
  function c(v) {
    var p = v.value, w = p && typeof p == "object" && p._id || v.id;
    return w;
  }
  function _(v) {
    v.rows.forEach(function(p) {
      var w = p.doc && p.doc._attachments;
      !w || Object.keys(w).forEach(function(x) {
        var C = w[x];
        w[x].data = ls(C.data, C.content_type);
      });
    });
  }
  function b(v) {
    return function(p) {
      return v.include_docs && v.attachments && v.binary && _(p), p;
    };
  }
  function s(v, p, w, x) {
    var C = p[v];
    typeof C < "u" && (x && (C = encodeURIComponent(JSON.stringify(C))), w.push(v + "=" + C));
  }
  function m(v) {
    if (typeof v < "u") {
      var p = Number(v);
      return !isNaN(p) && p === parseInt(v, 10) ? p : v;
    }
  }
  function O(v) {
    return v.group_level = m(v.group_level), v.limit = m(v.limit), v.skip = m(v.skip), v;
  }
  function $(v) {
    if (v) {
      if (typeof v != "number")
        return new Ke('Invalid value for integer: "' + v + '"');
      if (v < 0)
        return new Ke('Invalid value for positive integer: "' + v + '"');
    }
  }
  function S(v, p) {
    var w = v.descending ? "endkey" : "startkey", x = v.descending ? "startkey" : "endkey";
    if (typeof v[w] < "u" && typeof v[x] < "u" && fe(v[w], v[x]) > 0)
      throw new Ke("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");
    if (p.reduce && v.reduce !== !1) {
      if (v.include_docs)
        throw new Ke("{include_docs:true} is invalid for reduce");
      if (v.keys && v.keys.length > 1 && !v.group && !v.group_level)
        throw new Ke("Multi-key fetches for reduce views must use {group: true}");
    }
    ["group_level", "limit", "skip"].forEach(function(C) {
      var I = $(v[C]);
      if (I)
        throw I;
    });
  }
  function A(v, p, w) {
    var x = [], C, I = "GET", k, P;
    if (s("reduce", w, x), s("include_docs", w, x), s("attachments", w, x), s("limit", w, x), s("descending", w, x), s("group", w, x), s("group_level", w, x), s("skip", w, x), s("stale", w, x), s("conflicts", w, x), s("startkey", w, x, !0), s("start_key", w, x, !0), s("endkey", w, x, !0), s("end_key", w, x, !0), s("inclusive_end", w, x), s("key", w, x, !0), s("update_seq", w, x), x = x.join("&"), x = x === "" ? "" : "?" + x, typeof w.keys < "u") {
      var q = 2e3, T = "keys=" + encodeURIComponent(JSON.stringify(w.keys));
      T.length + x.length + 1 <= q ? x += (x[0] === "?" ? "&" : "?") + T : (I = "POST", typeof p == "string" ? C = {
        keys: w.keys
      } : p.keys = w.keys);
    }
    if (typeof p == "string") {
      var D = xn(p);
      return v.fetch("_design/" + D[0] + "/_view/" + D[1] + x, {
        headers: new Jt({
          "Content-Type": "application/json"
        }),
        method: I,
        body: JSON.stringify(C)
      }).then(function(E) {
        return k = E.ok, P = E.status, E.json();
      }).then(function(E) {
        if (!k)
          throw E.status = P, Gn(E);
        return E.rows.forEach(function(F) {
          if (F.value && F.value.error && F.value.error === "builtin_reduce_error")
            throw new Error(F.reason);
        }), E;
      }).then(b(w));
    }
    return C = C || {}, Object.keys(p).forEach(function(E) {
      Array.isArray(p[E]) ? C[E] = p[E] : C[E] = p[E].toString();
    }), v.fetch("_temp_view" + x, {
      headers: new Jt({
        "Content-Type": "application/json"
      }),
      method: "POST",
      body: JSON.stringify(C)
    }).then(function(E) {
      return k = E.ok, P = E.status, E.json();
    }).then(function(E) {
      if (!k)
        throw E.status = P, Gn(E);
      return E;
    }).then(b(w));
  }
  function g(v, p, w) {
    return new Promise(function(x, C) {
      v._query(p, w, function(I, k) {
        if (I)
          return C(I);
        x(k);
      });
    });
  }
  function h(v) {
    return new Promise(function(p, w) {
      v._viewCleanup(function(x, C) {
        if (x)
          return w(x);
        p(C);
      });
    });
  }
  function f(v) {
    return function(p) {
      if (p.status === 404)
        return v;
      throw p;
    };
  }
  function l(v, p, w) {
    var x = "_local/doc_" + v, C = {
      _id: x,
      keys: []
    }, I = w.get(v), k = I[0], P = I[1];
    function q() {
      return Bs(P) ? Promise.resolve(C) : p.db.get(x).catch(f(C));
    }
    function T(E) {
      return E.keys.length ? p.db.allDocs({
        keys: E.keys,
        include_docs: !0
      }) : Promise.resolve({
        rows: []
      });
    }
    function D(E, F) {
      for (var W = [], te = new Ot(), M = 0, N = F.rows.length; M < N; M++) {
        var z = F.rows[M], Q = z.doc;
        if (!!Q && (W.push(Q), te.add(Q._id), Q._deleted = !k.has(Q._id), !Q._deleted)) {
          var ee = k.get(Q._id);
          "value" in ee && (Q.value = ee.value);
        }
      }
      var X = Sn(k);
      return X.forEach(function(he) {
        if (!te.has(he)) {
          var Oe = {
            _id: he
          }, yt = k.get(he);
          "value" in yt && (Oe.value = yt.value), W.push(Oe);
        }
      }), E.keys = vi(X.concat(E.keys)), W.push(E), W;
    }
    return q().then(function(E) {
      return T(E).then(function(F) {
        return D(E, F);
      });
    });
  }
  function d(v, p, w) {
    var x = "_local/lastSeq";
    return v.db.get(x).catch(f({
      _id: x,
      seq: 0
    })).then(function(C) {
      var I = Sn(p);
      return Promise.all(I.map(function(k) {
        return l(k, v, p);
      })).then(function(k) {
        var P = di(k);
        return C.seq = w, P.push(C), v.db.bulkDocs({
          docs: P
        });
      });
    });
  }
  function y(v) {
    var p = typeof v == "string" ? v : v.name, w = gi[p];
    return w || (w = gi[p] = new St()), w;
  }
  function j(v, p) {
    return On(y(v), function() {
      return R(v, p);
    })();
  }
  function R(v, p) {
    var w, x;
    function C(M, N) {
      var z = {
        id: x._id,
        key: Ze(M)
      };
      typeof N < "u" && N !== null && (z.value = Ze(N)), w.push(z);
    }
    var I = t(v.mapFun, C), k = v.seq || 0;
    function P(M, N) {
      return function() {
        return d(v, M, N);
      };
    }
    let q = 0, T = {
      view: v.name,
      indexed_docs: q
    };
    v.sourceDB.emit("indexing", T);
    var D = new St();
    function E() {
      return v.sourceDB.changes({
        return_docs: !0,
        conflicts: !0,
        include_docs: !0,
        style: "all_docs",
        since: k,
        limit: p.changes_batch_size
      }).then(F);
    }
    function F(M) {
      var N = M.results;
      if (!N.length)
        return;
      var z = W(N);
      D.add(P(z, k)), q = q + N.length;
      let Q = {
        view: v.name,
        last_seq: M.last_seq,
        results_count: N.length,
        indexed_docs: q
      };
      if (v.sourceDB.emit("indexing", Q), !(N.length < p.changes_batch_size))
        return E();
    }
    function W(M) {
      for (var N = new rt(), z = 0, Q = M.length; z < Q; z++) {
        var ee = M[z];
        if (ee.doc._id[0] !== "_") {
          w = [], x = ee.doc, x._deleted || i(v.sourceDB, I, x), w.sort(u);
          var X = te(w);
          N.set(ee.doc._id, [X, ee.changes]);
        }
        k = ee.seq;
      }
      return N;
    }
    function te(M) {
      for (var N = new rt(), z, Q = 0, ee = M.length; Q < ee; Q++) {
        var X = M[Q], he = [X.key, X.id];
        Q > 0 && fe(X.key, z) === 0 && he.push(Q), N.set(Ee(he), X), z = X.key;
      }
      return N;
    }
    return E().then(function() {
      return D.finish();
    }).then(function() {
      v.seq = k;
    });
  }
  function B(v, p, w) {
    w.group_level === 0 && delete w.group_level;
    var x = w.group || w.group_level, C = n(v.reduceFun), I = [], k = isNaN(w.group_level) ? Number.POSITIVE_INFINITY : w.group_level;
    p.forEach(function(E) {
      var F = I[I.length - 1], W = x ? E.key : null;
      if (x && Array.isArray(W) && (W = W.slice(0, k)), F && fe(F.groupKey, W) === 0) {
        F.keys.push([E.key, E.id]), F.values.push(E.value);
        return;
      }
      I.push({
        keys: [[E.key, E.id]],
        values: [E.value],
        groupKey: W
      });
    }), p = [];
    for (var P = 0, q = I.length; P < q; P++) {
      var T = I[P], D = a(v.sourceDB, C, T.keys, T.values, !1);
      if (D.error && D.error instanceof Er)
        throw D.error;
      p.push({
        value: D.error ? null : D.output,
        key: T.groupKey
      });
    }
    return {
      rows: o(p, w.limit, w.skip)
    };
  }
  function L(v, p) {
    return On(y(v), function() {
      return K(v, p);
    })();
  }
  function K(v, p) {
    var w, x = v.reduceFun && p.reduce !== !1, C = p.skip || 0;
    typeof p.keys < "u" && !p.keys.length && (p.limit = 0, delete p.keys);
    function I(M) {
      return M.include_docs = !0, v.db.allDocs(M).then(function(N) {
        return w = N.total_rows, N.rows.map(function(z) {
          if ("value" in z.doc && typeof z.doc.value == "object" && z.doc.value !== null) {
            var Q = Object.keys(z.doc.value).sort(), ee = ["id", "key", "value"];
            if (!(Q < ee || Q > ee))
              return z.doc.value;
          }
          var X = ps(z.doc._id);
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
      if (x ? N = B(v, M, p) : typeof p.keys > "u" ? N = {
        total_rows: w,
        offset: C,
        rows: M
      } : N = {
        total_rows: w,
        offset: C,
        rows: o(M, p.limit, p.skip)
      }, p.update_seq && (N.update_seq = v.seq), p.include_docs) {
        var z = vi(M.map(c));
        return v.sourceDB.allDocs({
          keys: z,
          include_docs: !0,
          conflicts: p.conflicts,
          attachments: p.attachments,
          binary: p.binary
        }).then(function(Q) {
          var ee = new rt();
          return Q.rows.forEach(function(X) {
            ee.set(X.id, X.doc);
          }), M.forEach(function(X) {
            var he = c(X), Oe = ee.get(he);
            Oe && (X.doc = Oe);
          }), N;
        });
      } else
        return N;
    }
    if (typeof p.keys < "u") {
      var P = p.keys, q = P.map(function(M) {
        var N = {
          startkey: Ee([M]),
          endkey: Ee([M, {}])
        };
        return p.update_seq && (N.update_seq = !0), I(N);
      });
      return Promise.all(q).then(di).then(k);
    } else {
      var T = {
        descending: p.descending
      };
      p.update_seq && (T.update_seq = !0);
      var D, E;
      if ("start_key" in p && (D = p.start_key), "startkey" in p && (D = p.startkey), "end_key" in p && (E = p.end_key), "endkey" in p && (E = p.endkey), typeof D < "u" && (T.startkey = p.descending ? Ee([D, {}]) : Ee([D])), typeof E < "u") {
        var F = p.inclusive_end !== !1;
        p.descending && (F = !F), T.endkey = Ee(F ? [E, {}] : [E]);
      }
      if (typeof p.key < "u") {
        var W = Ee([p.key]), te = Ee([p.key, {}]);
        T.descending ? (T.endkey = W, T.startkey = te) : (T.startkey = W, T.endkey = te);
      }
      return x || (typeof p.limit == "number" && (T.limit = p.limit), T.skip = C), I(T).then(k);
    }
  }
  function Z(v) {
    return v.fetch("_view_cleanup", {
      headers: new Jt({
        "Content-Type": "application/json"
      }),
      method: "POST"
    }).then(function(p) {
      return p.json();
    });
  }
  function Y(v) {
    return v.get("_local/" + e).then(function(p) {
      var w = new rt();
      Object.keys(p.views).forEach(function(C) {
        var I = xn(C), k = "_design/" + I[0], P = I[1], q = w.get(k);
        q || (q = new Ot(), w.set(k, q)), q.add(P);
      });
      var x = {
        keys: Sn(w),
        include_docs: !0
      };
      return v.allDocs(x).then(function(C) {
        var I = {};
        C.rows.forEach(function(q) {
          var T = q.key.substring(8);
          w.get(q.key).forEach(function(D) {
            var E = T + "/" + D;
            p.views[E] || (E = D);
            var F = Object.keys(p.views[E]), W = q.doc && q.doc.views && q.doc.views[D];
            F.forEach(function(te) {
              I[te] = I[te] || W;
            });
          });
        });
        var k = Object.keys(I).filter(function(q) {
          return !I[q];
        }), P = k.map(function(q) {
          return On(y(q), function() {
            return new v.constructor(q, v.__opts).destroy();
          })();
        });
        return Promise.all(P).then(function() {
          return {
            ok: !0
          };
        });
      });
    }, f({
      ok: !0
    }));
  }
  function J(v, p, w) {
    if (typeof v._query == "function")
      return g(v, p, w);
    if (Ve(v))
      return A(v, p, w);
    var x = {
      changes_batch_size: v.__opts.view_update_changes_batch_size || Ts
    };
    if (typeof p != "string")
      return S(w, p), pi.add(function() {
        var q = yi(v, "temp_view/temp_view", p.map, p.reduce, !0, e);
        return q.then(function(T) {
          return Ps(j(T, x).then(function() {
            return L(T, w);
          }), function() {
            return T.db.destroy();
          });
        });
      }), pi.finish();
    var C = p, I = xn(C), k = I[0], P = I[1];
    return v.get("_design/" + k).then(function(q) {
      var T = q.views && q.views[P];
      if (!T)
        throw new xr("ddoc " + q._id + " has no view named " + P);
      r(q, P), S(w, T);
      var D = yi(v, C, T.map, T.reduce, !1, e);
      return D.then(function(E) {
        return w.stale === "ok" || w.stale === "update_after" ? (w.stale === "update_after" && pe(function() {
          j(E, x);
        }), L(E, w)) : j(E, x).then(function() {
          return L(E, w);
        });
      });
    });
  }
  function G(v, p, w) {
    var x = this;
    typeof p == "function" && (w = p, p = {}), p = p ? O(p) : {}, typeof v == "function" && (v = {
      map: v
    });
    var C = Promise.resolve().then(function() {
      return J(x, v, p);
    });
    return ja(C, w), C;
  }
  var U = Is(function() {
    var v = this;
    return typeof v._viewCleanup == "function" ? h(v) : Ve(v) ? Z(v) : Y(v);
  });
  return {
    query: G,
    viewCleanup: U
  };
}
function vn(e, t) {
  for (var n = e, r = 0, i = t.length; r < i; r++) {
    var a = t[r];
    if (n = n[a], !n)
      break;
  }
  return n;
}
function Ls(e, t, n) {
  for (var r = 0, i = t.length; r < i - 1; r++) {
    var a = t[r];
    e = e[a] = e[a] || {};
  }
  e[t[i - 1]] = n;
}
function kr(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function vt(e) {
  for (var t = [], n = "", r = 0, i = e.length; r < i; r++) {
    var a = e[r];
    r > 0 && e[r - 1] === "\\" && (a === "$" || a === ".") ? n = n.substring(0, n.length - 1) + a : a === "." ? (t.push(n), n = "") : n += a;
  }
  return t.push(n), t;
}
var Ds = ["$or", "$nor", "$not"];
function Ia(e) {
  return Ds.indexOf(e) > -1;
}
function we(e) {
  return Object.keys(e)[0];
}
function Cr(e) {
  return e[we(e)];
}
function xt(e) {
  var t = {}, n = {
    $or: !0,
    $nor: !0
  };
  return e.forEach(function(r) {
    Object.keys(r).forEach(function(i) {
      var a = r[i];
      if (typeof a != "object" && (a = {
        $eq: a
      }), Ia(i))
        if (a instanceof Array) {
          if (n[i]) {
            n[i] = !1, t[i] = a;
            return;
          }
          var u = [];
          t[i].forEach(function(c) {
            Object.keys(a).forEach(function(_) {
              var b = a[_], s = Math.max(Object.keys(c).length, Object.keys(b).length), m = xt([c, b]);
              Object.keys(m).length <= s || u.push(m);
            });
          }), t[i] = u;
        } else
          t[i] = xt([a]);
      else {
        var o = t[i] = t[i] || {};
        Object.keys(a).forEach(function(c) {
          var _ = a[c];
          if (c === "$gt" || c === "$gte")
            return Ns(c, _, o);
          if (c === "$lt" || c === "$lte")
            return Fs(c, _, o);
          if (c === "$ne")
            return Ms(_, o);
          if (c === "$eq")
            return Us(_, o);
          if (c === "$regex")
            return zs(_, o);
          o[c] = _;
        });
      }
    });
  }), t;
}
function Ns(e, t, n) {
  typeof n.$eq < "u" || (typeof n.$gte < "u" ? e === "$gte" ? t > n.$gte && (n.$gte = t) : t >= n.$gte && (delete n.$gte, n.$gt = t) : typeof n.$gt < "u" ? e === "$gte" ? t > n.$gt && (delete n.$gt, n.$gte = t) : t > n.$gt && (n.$gt = t) : n[e] = t);
}
function Fs(e, t, n) {
  typeof n.$eq < "u" || (typeof n.$lte < "u" ? e === "$lte" ? t < n.$lte && (n.$lte = t) : t <= n.$lte && (delete n.$lte, n.$lt = t) : typeof n.$lt < "u" ? e === "$lte" ? t < n.$lt && (delete n.$lt, n.$lte = t) : t < n.$lt && (n.$lt = t) : n[e] = t);
}
function Ms(e, t) {
  "$ne" in t ? t.$ne.push(e) : t.$ne = [e];
}
function Us(e, t) {
  delete t.$gt, delete t.$gte, delete t.$lt, delete t.$lte, delete t.$ne, t.$eq = e;
}
function zs(e, t) {
  "$regex" in t ? t.$regex.push(e) : t.$regex = [e];
}
function Pa(e) {
  for (var t in e) {
    if (Array.isArray(e))
      for (var n in e)
        e[n].$and && (e[n] = xt(e[n].$and));
    var r = e[t];
    typeof r == "object" && Pa(r);
  }
  return e;
}
function qa(e, t) {
  for (var n in e) {
    n === "$and" && (t = !0);
    var r = e[n];
    typeof r == "object" && (t = qa(r, t));
  }
  return t;
}
function Ta(e) {
  var t = De(e), n = !1;
  qa(t, !1) && (t = Pa(t), "$and" in t && (t = xt(t.$and)), n = !0), ["$or", "$nor"].forEach(function(o) {
    o in t && t[o].forEach(function(c) {
      for (var _ = Object.keys(c), b = 0; b < _.length; b++) {
        var s = _[b], m = c[s];
        (typeof m != "object" || m === null) && (c[s] = {
          $eq: m
        });
      }
    });
  }), "$not" in t && (t.$not = xt([t.$not]));
  for (var r = Object.keys(t), i = 0; i < r.length; i++) {
    var a = r[i], u = t[a];
    typeof u != "object" || u === null ? u = {
      $eq: u
    } : n || ("$ne" in u && (u.$ne = [u.$ne]), "$regex" in u && (u.$regex = [u.$regex])), t[a] = u;
  }
  return t;
}
function Ks(e) {
  function t(n) {
    return e.map(function(r) {
      var i = we(r), a = vt(i), u = vn(n, a);
      return u;
    });
  }
  return function(n, r) {
    var i = t(n.doc), a = t(r.doc), u = fe(i, a);
    return u !== 0 ? u : kr(n.doc._id, r.doc._id);
  };
}
function Ba(e, t, n) {
  if (e = e.filter(function(u) {
    return ft(u.doc, t.selector, n);
  }), t.sort) {
    var r = Ks(t.sort);
    e = e.sort(r), typeof t.sort[0] != "string" && Cr(t.sort[0]) === "desc" && (e = e.reverse());
  }
  if ("limit" in t || "skip" in t) {
    var i = t.skip || 0, a = ("limit" in t ? t.limit : e.length) + i;
    e = e.slice(i, a);
  }
  return e;
}
function ft(e, t, n) {
  return n.every(function(r) {
    var i = t[r], a = vt(r), u = vn(e, a);
    return Ia(r) ? Js(r, i, e) : Xt(i, e, a, u);
  });
}
function Xt(e, t, n, r) {
  return e ? typeof e == "object" ? Object.keys(e).every(function(i) {
    var a = e[i];
    if (i.indexOf("$") === 0)
      return mi(i, t, a, n, r);
    var u = vt(i);
    if (r === void 0 && typeof a != "object" && u.length > 0)
      return !1;
    var o = vn(r, u);
    return typeof a == "object" ? Xt(a, t, n, o) : mi("$eq", t, a, u, o);
  }) : e === r : !0;
}
function Js(e, t, n) {
  return e === "$or" ? t.some(function(r) {
    return ft(n, r, Object.keys(r));
  }) : e === "$not" ? !ft(n, t, Object.keys(t)) : !t.find(function(r) {
    return ft(n, r, Object.keys(r));
  });
}
function mi(e, t, n, r, i) {
  if (!bi[e])
    throw new Error('unknown operator "' + e + '" - should be one of $eq, $lte, $lt, $gt, $gte, $exists, $ne, $in, $nin, $size, $mod, $regex, $elemMatch, $type, $allMatch or $all');
  return bi[e](t, n, r, i);
}
function _t(e) {
  return typeof e < "u" && e !== null;
}
function Ue(e) {
  return typeof e < "u";
}
function Qs(e, t) {
  if (typeof e != "number" || parseInt(e, 10) !== e)
    return !1;
  var n = t[0], r = t[1];
  return e % n === r;
}
function wi(e, t) {
  return t.some(function(n) {
    return e instanceof Array ? e.some(function(r) {
      return fe(n, r) === 0;
    }) : fe(n, e) === 0;
  });
}
function Gs(e, t) {
  return t.every(function(n) {
    return e.some(function(r) {
      return fe(n, r) === 0;
    });
  });
}
function Ws(e, t) {
  return e.length === t;
}
function Hs(e, t) {
  var n = new RegExp(t);
  return n.test(e);
}
function Ys(e, t) {
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
var bi = {
  $elemMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" ? r.some(function(i) {
      return ft(i, t, Object.keys(t));
    }) : r.some(function(i) {
      return Xt(t, e, n, i);
    });
  },
  $allMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" ? r.every(function(i) {
      return ft(i, t, Object.keys(t));
    }) : r.every(function(i) {
      return Xt(t, e, n, i);
    });
  },
  $eq: function(e, t, n, r) {
    return Ue(r) && fe(r, t) === 0;
  },
  $gte: function(e, t, n, r) {
    return Ue(r) && fe(r, t) >= 0;
  },
  $gt: function(e, t, n, r) {
    return Ue(r) && fe(r, t) > 0;
  },
  $lte: function(e, t, n, r) {
    return Ue(r) && fe(r, t) <= 0;
  },
  $lt: function(e, t, n, r) {
    return Ue(r) && fe(r, t) < 0;
  },
  $exists: function(e, t, n, r) {
    return t ? Ue(r) : !Ue(r);
  },
  $mod: function(e, t, n, r) {
    return _t(r) && Qs(r, t);
  },
  $ne: function(e, t, n, r) {
    return t.every(function(i) {
      return fe(r, i) !== 0;
    });
  },
  $in: function(e, t, n, r) {
    return _t(r) && wi(r, t);
  },
  $nin: function(e, t, n, r) {
    return _t(r) && !wi(r, t);
  },
  $size: function(e, t, n, r) {
    return _t(r) && Array.isArray(r) && Ws(r, t);
  },
  $all: function(e, t, n, r) {
    return Array.isArray(r) && Gs(r, t);
  },
  $regex: function(e, t, n, r) {
    return _t(r) && typeof r == "string" && t.every(function(i) {
      return Hs(r, i);
    });
  },
  $type: function(e, t, n, r) {
    return Ys(r, t);
  }
};
function hn(e, t) {
  if (typeof t != "object")
    throw new Error("Selector error: expected a JSON object");
  t = Ta(t);
  var n = {
    doc: e
  }, r = Ba([n], {
    selector: t
  }, Object.keys(t));
  return r && r.length === 1;
}
function Ra(e) {
  return e = De(e), e.index || (e.index = {}), ["type", "name", "ddoc"].forEach(function(t) {
    e.index[t] && (e[t] = e.index[t], delete e.index[t]);
  }), e.fields && (e.index.fields = e.fields, delete e.fields), e.type || (e.type = "json"), e;
}
function Xs(e, t, n) {
  var r = "", i = t, a = !0;
  if (["$in", "$nin", "$or", "$and", "$mod", "$nor", "$all"].indexOf(e) !== -1 && (Array.isArray(t) || (r = "Query operator " + e + " must be an array.")), ["$not", "$elemMatch", "$allMatch"].indexOf(e) !== -1 && (!Array.isArray(t) && typeof t == "object" && t !== null || (r = "Query operator " + e + " must be an object.")), e === "$mod" && Array.isArray(t))
    if (t.length !== 2)
      r = "Query operator $mod must be in the format [divisor, remainder], where divisor and remainder are both integers.";
    else {
      var u = t[0], o = t[1];
      u === 0 && (r = "Query operator $mod's divisor cannot be 0, cannot divide by zero.", a = !1), (typeof u != "number" || parseInt(u, 10) !== u) && (r = "Query operator $mod's divisor is not an integer.", i = u), parseInt(o, 10) !== o && (r = "Query operator $mod's remainder is not an integer.", i = o);
    }
  if (e === "$exists" && typeof t != "boolean" && (r = "Query operator $exists must be a boolean."), e === "$type") {
    var c = ["null", "boolean", "number", "string", "array", "object"], _ = '"' + c.slice(0, c.length - 1).join('", "') + '", or "' + c[c.length - 1] + '"';
    (typeof t != "string" || c.indexOf(t) == -1) && (r = "Query operator $type must be a string. Supported values: " + _ + ".");
  }
  if (e === "$size" && parseInt(t, 10) !== t && (r = "Query operator $size must be a integer."), e === "$regex" && typeof t != "string" && (console.log("here", n), n ? r = "Query operator $regex must be a string." : t instanceof RegExp || (r = "Query operator $regex must be a string or an instance of a javascript regular expression.")), r) {
    if (a) {
      var b = i === null ? " " : Array.isArray(i) ? " array" : " " + typeof i, s = typeof i == "object" && i !== null ? JSON.stringify(i, null, "	") : i;
      r += " Received" + b + ": " + s;
    }
    throw new Error(r);
  }
}
var Zs = ["$all", "$allMatch", "$and", "$elemMatch", "$exists", "$in", "$mod", "$nin", "$nor", "$not", "$or", "$regex", "$size", "$type"], Vs = ["$in", "$nin", "$mod", "$all"], ec = ["$eq", "$gt", "$gte", "$lt", "$lte"];
function Zt(e, t) {
  if (Array.isArray(e))
    for (var n of e)
      typeof n == "object" && u !== null && Zt(n, t);
  else
    for (var r = Object.keys(e), i = 0; i < r.length; i++) {
      var a = r[i], u = e[a];
      Zs.indexOf(a) !== -1 && Xs(a, u, t), ec.indexOf(a) === -1 && Vs.indexOf(a) === -1 && typeof u == "object" && u !== null && Zt(u, t);
    }
}
function Dt(e, t, n, r) {
  var i, a;
  n.headers = new Jt({
    "Content-type": "application/json"
  }), e.fetch(t, n).then(function(u) {
    return i = u.status, a = u.ok, u.json();
  }).then(function(u) {
    if (a)
      r(null, u);
    else {
      u.status = i;
      var o = Gn(u);
      r(o);
    }
  }).catch(r);
}
function tc(e, t, n) {
  t = Ra(t), Dt(e, "_index", {
    method: "POST",
    body: JSON.stringify(t)
  }, n);
}
function nc(e, t, n) {
  Zt(t.selector, !0), Dt(e, "_find", {
    method: "POST",
    body: JSON.stringify(t)
  }, n);
}
function rc(e, t, n) {
  Dt(e, "_explain", {
    method: "POST",
    body: JSON.stringify(t)
  }, n);
}
function ic(e, t) {
  Dt(e, "_index", {
    method: "GET"
  }, t);
}
function ac(e, t, n) {
  var r = t.ddoc, i = t.type || "json", a = t.name;
  if (!r)
    return n(new Error("you must provide an index's ddoc"));
  if (!a)
    return n(new Error("you must provide an index's name"));
  var u = "_index/" + [r, i, a].map(encodeURIComponent).join("/");
  Dt(e, u, {
    method: "DELETE"
  }, n);
}
function La(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = -1; ++r < t; )
      n[r] = arguments[r];
    return e.call(this, n);
  };
}
function Nt(e) {
  return La(function(t) {
    var n = t.pop(), r = e.apply(this, t);
    return uc(r, n), r;
  });
}
function uc(e, t) {
  return e.then(function(n) {
    pe(function() {
      t(null, n);
    });
  }, function(n) {
    pe(function() {
      t(n);
    });
  }), e;
}
var jr = La(function(e) {
  for (var t = [], n = 0, r = e.length; n < r; n++) {
    var i = e[n];
    Array.isArray(i) ? t = t.concat(jr.apply(null, i)) : t.push(i);
  }
  return t;
});
function Ir(e) {
  for (var t = {}, n = 0, r = e.length; n < r; n++)
    t = Sr(t, e[n]);
  return t;
}
function oc(e, t) {
  for (var n = {}, r = 0, i = t.length; r < i; r++) {
    var a = vt(t[r]), u = vn(e, a);
    typeof u < "u" && Ls(n, a, u);
  }
  return n;
}
function Da(e, t) {
  for (var n = 0, r = Math.min(e.length, t.length); n < r; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function fc(e, t) {
  return e.length > t.length ? !1 : Da(e, t);
}
function sc(e, t) {
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
function cc(e) {
  for (var t = {}, n = 0, r = e.length; n < r; n++)
    t[e[n]] = !0;
  return t;
}
function lc(e, t) {
  for (var n = null, r = -1, i = 0, a = e.length; i < a; i++) {
    var u = e[i], o = t(u);
    o > r && (r = o, n = u);
  }
  return n;
}
function $i(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var n = 0, r = e.length; n < r; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function dc(e) {
  for (var t = {}, n = 0; n < e.length; n++)
    t["$" + e[n]] = !0;
  return Object.keys(t).map(function(r) {
    return r.substring(1);
  });
}
function vc(e, t, n) {
  return function(r) {
    if (!(n && !hn(r, n))) {
      for (var i = [], a = 0, u = e.length; a < u; a++) {
        for (var o = vt(e[a]), c = r, _ = 0, b = o.length; _ < b; _++) {
          var s = o[_];
          if (c = c[s], typeof c > "u")
            return;
        }
        i.push(c);
      }
      t(i);
    }
  };
}
function hc(e, t, n) {
  var r = vt(e);
  return function(i) {
    if (!(n && !hn(i, n))) {
      for (var a = i, u = 0, o = r.length; u < o; u++) {
        var c = r[u];
        if (a = a[c], typeof a > "u")
          return;
      }
      t(a);
    }
  };
}
function yc(e, t, n) {
  return function(r) {
    n && !hn(r, n) || t(r[e]);
  };
}
function gc(e, t, n) {
  return function(r) {
    if (!(n && !hn(r, n))) {
      for (var i = [], a = 0, u = e.length; a < u; a++)
        i.push(r[e[a]]);
      t(i);
    }
  };
}
function pc(e) {
  for (var t = 0, n = e.length; t < n; t++) {
    var r = e[t];
    if (r.indexOf(".") !== -1)
      return !1;
  }
  return !0;
}
function _c(e, t, n) {
  var r = pc(e), i = e.length === 1;
  return r ? i ? yc(e[0], t, n) : gc(e, t, n) : i ? hc(e[0], t, n) : vc(e, t, n);
}
function mc(e, t) {
  const n = Object.keys(e.fields), r = e.partial_filter_selector;
  return _c(n, t, r);
}
function wc() {
  throw new Error("reduce not supported");
}
function bc(e, t) {
  var n = e.views[t];
  if (!n.map || !n.map.fields)
    throw new Error("ddoc " + e._id + " with view " + t + " doesn't have map.fields defined. maybe it wasn't created by this plugin?");
}
var $c = Rs("indexes", mc, wc, bc);
function Pr(e) {
  return e._customFindAbstractMapper || $c;
}
function Ac(e) {
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
function Oc(e) {
  var t = [];
  return typeof e == "string" ? t.push(e) : t = e, t.map(function(n) {
    return n.replace("_design/", "");
  });
}
function Na(e) {
  return e.fields = e.fields.map(function(t) {
    if (typeof t == "string") {
      var n = {};
      return n[t] = "asc", n;
    }
    return t;
  }), e;
}
function Sc(e, t) {
  for (var n = [], r = 0; r < t.def.fields.length; r++) {
    var i = we(t.def.fields[r]);
    n.push(e[i]);
  }
  return n;
}
function xc(e, t, n) {
  for (var r = n.def.fields, i = 0, a = e.length; i < a; i++) {
    var u = e[i], o = Sc(u.doc, n);
    if (r.length === 1)
      o = o[0];
    else
      for (; o.length > t.length; )
        o.pop();
    if (Math.abs(fe(o, t)) > 0)
      break;
  }
  return i > 0 ? e.slice(i) : e;
}
function Ec(e) {
  var t = De(e);
  return delete t.startkey, delete t.endkey, delete t.inclusive_start, delete t.inclusive_end, "endkey" in e && (t.startkey = e.endkey), "startkey" in e && (t.endkey = e.startkey), "inclusive_start" in e && (t.inclusive_end = e.inclusive_start), "inclusive_end" in e && (t.inclusive_start = e.inclusive_end), t;
}
function kc(e) {
  var t = e.fields.filter(function(n) {
    return Cr(n) === "asc";
  });
  if (t.length !== 0 && t.length !== e.fields.length)
    throw new Error("unsupported mixed sorting");
}
function Cc(e, t) {
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
function jc(e) {
  if (typeof e.selector != "object")
    throw new Error("you must provide a selector when you find()");
}
function Ic(e, t) {
  var n = Object.keys(e), r = t ? t.map(we) : [], i;
  return n.length >= r.length ? i = n : i = r, r.length === 0 ? {
    fields: i
  } : (i = i.sort(function(a, u) {
    var o = r.indexOf(a);
    o === -1 && (o = Number.MAX_VALUE);
    var c = r.indexOf(u);
    return c === -1 && (c = Number.MAX_VALUE), o < c ? -1 : o > c ? 1 : 0;
  }), {
    fields: i,
    sortOrder: t.map(we)
  });
}
function Pc(e, t) {
  t = Ra(t);
  var n = De(t.index);
  t.index = Na(t.index), kc(t.index);
  var r;
  function i() {
    return r || (r = Ea(JSON.stringify(t)));
  }
  var a = t.name || "idx-" + i(), u = t.ddoc || "idx-" + i(), o = "_design/" + u, c = !1, _ = !1;
  function b(s) {
    return s._rev && s.language !== "query" && (c = !0), s.language = "query", s.views = s.views || {}, _ = !!s.views[a], _ ? !1 : (s.views[a] = {
      map: {
        fields: Ir(t.index.fields)
      },
      reduce: "_count",
      options: {
        def: n
      }
    }, s);
  }
  return e.constructor.emit("debug", ["find", "creating index", o]), dn(e, o, b).then(function() {
    if (c)
      throw new Error('invalid language for ddoc with id "' + o + '" (should be "query")');
  }).then(function() {
    var s = u + "/" + a;
    return Pr(e).query.call(e, s, {
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
function Fa(e) {
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
    return n.indexes = jr(n.indexes, t.rows.filter(function(r) {
      return r.doc.language === "query";
    }).map(function(r) {
      var i = r.doc.views !== void 0 ? Object.keys(r.doc.views) : [];
      return i.map(function(a) {
        var u = r.doc.views[a];
        return {
          ddoc: r.id,
          name: a,
          type: "json",
          def: Na(u.options.def)
        };
      });
    })), n.indexes.sort(function(r, i) {
      return kr(r.name, i.name);
    }), n.total_rows = n.indexes.length, n;
  });
}
var Vt = null, er = {
  "\uFFFF": {}
};
const qc = {
  queryOpts: {
    limit: 0,
    startkey: er,
    endkey: Vt
  },
  inMemoryFields: []
};
function Tc(e, t) {
  for (var n = e.def.fields.map(we), r = 0, i = n.length; r < i; r++) {
    var a = n[r];
    if (t === a)
      return !0;
  }
  return !1;
}
function Bc(e, t) {
  var n = e[t], r = we(n);
  return r !== "$eq";
}
function Ma(e, t) {
  var n = t.def.fields.map(we);
  return e.slice().sort(function(r, i) {
    var a = n.indexOf(r), u = n.indexOf(i);
    return a === -1 && (a = Number.MAX_VALUE), u === -1 && (u = Number.MAX_VALUE), kr(a, u);
  });
}
function Rc(e, t, n) {
  n = Ma(n, e);
  for (var r = !1, i = 0, a = n.length; i < a; i++) {
    var u = n[i];
    if (r || !Tc(e, u))
      return n.slice(i);
    i < a - 1 && Bc(t, u) && (r = !0);
  }
  return [];
}
function Lc(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    var r = e[n];
    Object.keys(r).forEach(function(i) {
      i === "$ne" && t.push(n);
    });
  }), t;
}
function Dc(e, t, n, r) {
  var i = jr(
    e,
    Rc(t, n, r),
    Lc(n)
  );
  return Ma(dc(i), t);
}
function Nc(e, t, n) {
  if (t) {
    var r = fc(t, e), i = Da(n, e);
    return r && i;
  }
  return sc(n, e);
}
var Fc = ["$eq", "$gt", "$gte", "$lt", "$lte"];
function Ua(e) {
  return Fc.indexOf(e) === -1;
}
function Mc(e, t) {
  var n = e[0], r = t[n];
  if (typeof r > "u")
    return !0;
  var i = Object.keys(r).length === 1 && we(r) === "$ne";
  return !i;
}
function Uc(e, t, n, r) {
  var i = e.def.fields.map(we), a = Nc(i, t, n);
  return a ? Mc(i, r) : !1;
}
function zc(e, t, n, r) {
  return r.filter(function(i) {
    return Uc(i, n, t, e);
  });
}
function Kc(e, t, n, r, i) {
  var a = zc(e, t, n, r);
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
  var o = cc(t);
  function c(m) {
    for (var O = m.def.fields.map(we), $ = 0, S = 0, A = O.length; S < A; S++) {
      var g = O[S];
      o[g] && $++;
    }
    return $;
  }
  if (i) {
    var _ = "_design/" + i[0], b = i.length === 2 ? i[1] : !1, s = a.find(function(m) {
      return !!(b && m.ddoc === _ && b === m.name || m.ddoc === _);
    });
    if (!s)
      throw {
        error: "unknown_error",
        message: "Could not find that index or could not use that index for the query"
      };
    return s;
  }
  return lc(a, c);
}
function Jc(e, t) {
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
    startkey: Vt
  };
}
function Qc(e, t) {
  var n = we(t.def.fields[0]), r = e[n] || {}, i = [], a = Object.keys(r), u;
  return a.forEach(function(o) {
    Ua(o) && i.push(n);
    var c = r[o], _ = Jc(o, c);
    u ? u = Ir([u, _]) : u = _;
  }), {
    queryOpts: u,
    inMemoryFields: i
  };
}
function Gc(e, t) {
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
function Wc(e, t) {
  var n = t.def.fields.map(we), r = [], i = [], a = [], u, o;
  function c(B) {
    u !== !1 && i.push(Vt), o !== !1 && a.push(er), r = n.slice(B);
  }
  for (var _ = 0, b = n.length; _ < b; _++) {
    var s = n[_], m = e[s];
    if (!m || !Object.keys(m).length) {
      c(_);
      break;
    } else if (Object.keys(m).some(Ua)) {
      c(_);
      break;
    } else if (_ > 0) {
      var O = "$gt" in m || "$gte" in m || "$lt" in m || "$lte" in m, $ = Object.keys(e[n[_ - 1]]), S = $i($, ["$eq"]), A = $i($, Object.keys(m)), g = O && !S && !A;
      if (g) {
        c(_);
        break;
      }
    }
    for (var h = Object.keys(m), f = null, l = 0; l < h.length; l++) {
      var d = h[l], y = m[d], j = Gc(d, y);
      f ? f = Ir([f, j]) : f = j;
    }
    i.push("startkey" in f ? f.startkey : Vt), a.push("endkey" in f ? f.endkey : er), "inclusive_start" in f && (u = f.inclusive_start), "inclusive_end" in f && (o = f.inclusive_end);
  }
  var R = {
    startkey: i,
    endkey: a
  };
  return typeof u < "u" && (R.inclusive_start = u), typeof o < "u" && (R.inclusive_end = o), {
    queryOpts: R,
    inMemoryFields: r
  };
}
function Hc(e) {
  return Object.keys(e).map(function(n) {
    return e[n];
  }).some(function(n) {
    return typeof n == "object" && Object.keys(n).length === 0;
  });
}
function Yc(e) {
  return {
    queryOpts: {
      startkey: null
    },
    inMemoryFields: [Object.keys(e)]
  };
}
function Xc(e, t) {
  return t.defaultUsed ? Yc(e) : t.def.fields.length === 1 ? Qc(e, t) : Wc(e, t);
}
function Zc(e, t) {
  var n = e.selector, r = e.sort;
  if (Hc(n))
    return Sr({}, qc, {
      index: t[0]
    });
  var i = Ic(n, r), a = i.fields, u = i.sortOrder, o = Kc(n, a, u, t, e.use_index), c = Xc(n, o), _ = c.queryOpts, b = c.inMemoryFields, s = Dc(b, o, n, a), m = {
    queryOpts: _,
    index: o,
    inMemoryFields: s
  };
  return m;
}
function Vc(e) {
  return e.ddoc.substring(8) + "/" + e.name;
}
function el(e, t) {
  var n = De(t);
  return n.descending ? ("endkey" in n && typeof n.endkey != "string" && (n.endkey = ""), "startkey" in n && typeof n.startkey != "string" && (n.limit = 0)) : ("startkey" in n && typeof n.startkey != "string" && (n.startkey = ""), "endkey" in n && typeof n.endkey != "string" && (n.limit = 0)), "key" in n && typeof n.key != "string" && (n.limit = 0), n.limit > 0 && n.indexes_count && (n.original_limit = n.limit, n.limit += n.indexes_count), e.allDocs(n).then(function(r) {
    return r.rows = r.rows.filter(function(i) {
      return !/^_design\//.test(i.id);
    }), n.original_limit && (n.limit = n.original_limit), r.rows = r.rows.slice(0, n.limit), r;
  });
}
function za(e, t, n) {
  return t.selector && (Zt(t.selector, !1), t.selector = Ta(t.selector)), t.sort && (t.sort = Ac(t.sort)), t.use_index && (t.use_index = Oc(t.use_index)), jc(t), Fa(e).then(function(r) {
    e.constructor.emit("debug", ["find", "planning query", t]);
    var i = Zc(t, r.indexes);
    e.constructor.emit("debug", ["find", "query plan", i]);
    var a = i.index;
    Cc(t, a);
    var u = Sr({
      include_docs: !0,
      reduce: !1,
      indexes_count: r.total_rows
    }, i.queryOpts);
    if ("startkey" in u && "endkey" in u && fe(u.startkey, u.endkey) > 0)
      return {
        docs: []
      };
    var o = t.sort && typeof t.sort[0] != "string" && Cr(t.sort[0]) === "desc";
    return o && (u.descending = !0, u = Ec(u)), i.inMemoryFields.length || ("limit" in t && (u.limit = t.limit), "skip" in t && (u.skip = t.skip)), n ? Promise.resolve(i, u) : Promise.resolve().then(function() {
      if (a.name === "_all_docs")
        return el(e, u);
      var c = Vc(a);
      return Pr(e).query.call(e, c, u);
    }).then(function(c) {
      u.inclusive_start === !1 && (c.rows = xc(c.rows, u.startkey, a)), i.inMemoryFields.length && (c.rows = Ba(c.rows, t, i.inMemoryFields));
      var _ = {
        docs: c.rows.map(function(b) {
          var s = b.doc;
          return t.fields ? oc(s, t.fields) : s;
        })
      };
      return a.defaultUsed && (_.warning = "No matching index found, create an index to optimize query time."), _;
    });
  });
}
function tl(e, t) {
  return za(e, t, !0).then(function(n) {
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
function nl(e, t) {
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
  return dn(e, n, i).then(function() {
    return Pr(e).viewCleanup.apply(e);
  }).then(function() {
    return {
      ok: !0
    };
  });
}
var rl = Nt(Pc), il = Nt(za), al = Nt(tl), ul = Nt(Fa), ol = Nt(nl), ht = {};
ht.createIndex = Rt(function(e, t) {
  if (typeof e != "object")
    return t(new Error("you must provide an index to create"));
  var n = Ve(this) ? tc : rl;
  n(this, e, t);
});
ht.find = Rt(function(e, t) {
  if (typeof t > "u" && (t = e, e = void 0), typeof e != "object")
    return t(new Error("you must provide search parameters to find()"));
  var n = Ve(this) ? nc : il;
  n(this, e, t);
});
ht.explain = Rt(function(e, t) {
  if (typeof t > "u" && (t = e, e = void 0), typeof e != "object")
    return t(new Error("you must provide search parameters to explain()"));
  var n = Ve(this) ? rc : al;
  n(this, e, t);
});
ht.getIndexes = Rt(function(e) {
  var t = Ve(this) ? ic : ul;
  t(this, e);
});
ht.deleteIndex = Rt(function(e, t) {
  if (typeof e != "object")
    return t(new Error("you must provide an index to delete"));
  var n = Ve(this) ? ac : ol;
  n(this, e, t);
});
function Et(...e) {
  return [].concat(...e).filter((t) => !sl(t) && !cl(t) && !dl(t)).flat();
}
function fl(e = null) {
  const t = new Date();
  return typeof e == "number" && t.setSeconds(t.getSeconds() + e), t;
}
function kt(e, t) {
  if (e instanceof Map)
    return Array.from(e).map(([r, i]) => kt(i, t));
  if (Array.isArray(e))
    return e.map((r) => kt(r, t));
  if (t = Et(t), !t.length)
    return e;
  const n = t.map((r) => ll(e) ? e[r] : e);
  if (!!n.length)
    return n.length === 1 ? n.shift() : n;
}
function Ka(...e) {
  return [].concat(...e).shift();
}
function sl(e) {
  return e === !1;
}
function cl(e) {
  return e === null;
}
function ll(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Ja(e) {
  return typeof e == "string";
}
function dl(e) {
  return e === void 0;
}
function qr(e, t, n = []) {
  if (e instanceof Map)
    return e;
  if (t === void 0)
    throw new Error(
      "You must specify an attribute for the map's key."
    );
  const r = new Map(
    Et(n).map((i) => [i, void 0])
  );
  return Et(e).reduce((i, a) => {
    const u = typeof t == "function" ? t(a) : a[t];
    return i.set(u, a);
  }, Object.assign(r, {
    first(...i) {
      return kt(this.toArray().shift(), [...i]);
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
function Qa(e, ...t) {
  return e instanceof Promise ? e : typeof e == "function" ? Promise.resolve(e(...t)) : Promise.resolve(e);
}
function Tr(e, t = (n) => n) {
  if (!!e.size)
    return e.size === 1 ? t(e.first()) : Object.fromEntries(
      Array.from(e).map(([n, r]) => [n, t(r)])
    );
}
async function Ai(e, t) {
  const n = Object.entries(t);
  for (const [r, i] of n)
    t[r] = i && await e.remove(i);
  return Tr(qr(t, "id"));
}
function vl(e) {
  e && console.warn(e);
}
const hl = {
  async cache(...e) {
    const [t, n, r] = e;
    await this.clearExpiredCache(t);
    const i = await this.findCache(t);
    if (e.length <= 1 || i.length) {
      const _ = qr(i, "_id", t);
      return Tr(_, (b) => kt(b, "$value"));
    }
    if (!Ja(t))
      throw new Error(
        "The key must be a string when cache() is being used a setter."
      );
    const a = r instanceof Date ? r : typeof r == "number" ? fl(r) : null;
    let u = await Qa(n);
    u !== void 0 && (u = JSON.parse(JSON.stringify(u)));
    const { _rev: o } = Ka(i) || {}, c = Object.assign({
      _id: t,
      _rev: o,
      $value: u,
      $expiredAt: a
    });
    return await this.put(c), u;
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
  async clearExpiredCache(e) {
    const t = await this.findCache(Et(e), new Date(), !0);
    return await Promise.all(
      Object.entries(t).map(([n, r]) => r && this.remove(r._id, r._rev))
    );
  },
  async createCacheIndex() {
    return await this.createIndex({
      index: {
        fields: ["$expiredAt", "$value"]
      }
    });
  },
  async findCache(e = void 0, t = void 0, n = !1) {
    t === void 0 && (t = new Date());
    const { docs: r, warning: i } = await this.find(
      this.cacheSelector(Et(e), t, n)
    );
    return vl(i), r;
  },
  async findExpiredCache(e, t = null) {
    return await this.findCache(e, !0, t || new Date());
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
  async purge(e) {
    return await Ai(this, await this.findCache(e));
  },
  async removeCache(e) {
    return await Ai(this, await this.findCache(e));
  }
}, yl = {
  async config(...e) {
    const [t, n] = e, r = await this.findConfig(t);
    if (e.length <= 1) {
      const o = qr(r, "_id", t);
      return Tr(o, (c) => kt(c, "$value"));
    }
    if (!Ja(t))
      throw new Error(
        "The key must be a string when config() is being used a setter."
      );
    let i = await Qa(n);
    i !== void 0 && (i = JSON.parse(JSON.stringify(i)));
    const { _rev: a } = Ka(r) || {}, u = Object.assign({
      _id: t,
      _rev: a,
      $value: i,
      $config: !0
    });
    return await this.put(u), i;
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
  async createConfigIndex() {
    return await this.createIndex({
      index: {
        fields: ["$config"]
      }
    });
  }
};
H.plugin(ht);
H.plugin(hl);
H.plugin(yl);
let Ae;
function Ne() {
  if (!Ae)
    throw new Error("You must initialize with init() before accessing the database.");
  return !0;
}
function gl(e, t) {
  return Ae || (Ae = new H(e, t));
}
async function Ll() {
  return Ne() && {
    cache: await Ae.createCacheIndex(),
    config: await Ae.createConfigIndex()
  };
}
async function Dl() {
  return Ne() && await Ae.createCacheIndex();
}
async function Nl() {
  return Ne() && await Ae.createConfigIndex();
}
async function Fl(...e) {
  return Ne() && await Ae.cache(...e);
}
async function Ml(...e) {
  return Ne() && await Ae.config(...e);
}
async function Ul(...e) {
  return Ne() && await Ae.purge(...e);
}
async function zl(...e) {
  return Ne() && await Ae.removeCache(...e);
}
async function Kl(...e) {
  return Ne() && await Ae.removeConfig(...e);
}
const En = (e) => e instanceof Date, pl = (e) => Object.keys(e).length === 0, tr = (e) => e != null && typeof e == "object", Oi = (e, ...t) => Object.prototype.hasOwnProperty.call(e, ...t), kn = (e) => tr(e) && pl(e), Ga = (e, t) => {
  if (e === t)
    return {};
  if (!tr(e) || !tr(t))
    return t;
  const n = e, r = t, i = Object.keys(n).reduce((a, u) => (Oi(r, u) || (a[u] = void 0), a), {});
  return En(n) || En(r) ? n.valueOf() == r.valueOf() ? {} : r : Object.keys(r).reduce((a, u) => {
    if (!Oi(n, u))
      return a[u] = r[u], a;
    const o = Ga(n[u], r[u]);
    return kn(o) && !En(o) && (kn(n[u]) || !kn(r[u])) || (a[u] = o), a;
  }, i);
};
var _l = "Expected a function", Si = 0 / 0, ml = "[object Symbol]", wl = /^\s+|\s+$/g, bl = /^[-+]0x[0-9a-f]+$/i, $l = /^0b[01]+$/i, Al = /^0o[0-7]+$/i, Ol = parseInt, Sl = typeof self == "object" && self && self.Object === Object && self, xl = Sl || Function("return this")(), El = Object.prototype, kl = El.toString, Cl = Math.max, jl = Math.min, Cn = function() {
  return xl.Date.now();
};
function Il(e, t, n) {
  var r, i, a, u, o, c, _ = 0, b = !1, s = !1, m = !0;
  if (typeof e != "function")
    throw new TypeError(_l);
  t = xi(t) || 0, nr(n) && (b = !!n.leading, s = "maxWait" in n, a = s ? Cl(xi(n.maxWait) || 0, t) : a, m = "trailing" in n ? !!n.trailing : m);
  function O(y) {
    var j = r, R = i;
    return r = i = void 0, _ = y, u = e.apply(R, j), u;
  }
  function $(y) {
    return _ = y, o = setTimeout(g, t), b ? O(y) : u;
  }
  function S(y) {
    var j = y - c, R = y - _, B = t - j;
    return s ? jl(B, a - R) : B;
  }
  function A(y) {
    var j = y - c, R = y - _;
    return c === void 0 || j >= t || j < 0 || s && R >= a;
  }
  function g() {
    var y = Cn();
    if (A(y))
      return h(y);
    o = setTimeout(g, S(y));
  }
  function h(y) {
    return o = void 0, m && r ? O(y) : (r = i = void 0, u);
  }
  function f() {
    o !== void 0 && clearTimeout(o), _ = 0, r = c = i = o = void 0;
  }
  function l() {
    return o === void 0 ? u : h(Cn());
  }
  function d() {
    var y = Cn(), j = A(y);
    if (r = arguments, i = this, c = y, j) {
      if (o === void 0)
        return $(c);
      if (s)
        return o = setTimeout(g, t), O(c);
    }
    return o === void 0 && (o = setTimeout(g, t)), u;
  }
  return d.cancel = f, d.flush = l, d;
}
function nr(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function Pl(e) {
  return !!e && typeof e == "object";
}
function ql(e) {
  return typeof e == "symbol" || Pl(e) && kl.call(e) == ml;
}
function xi(e) {
  if (typeof e == "number")
    return e;
  if (ql(e))
    return Si;
  if (nr(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = nr(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(wl, "");
  var n = $l.test(e);
  return n || Al.test(e) ? Ol(e.slice(2), n ? 2 : 8) : bl.test(e) ? Si : +e;
}
var Tl = Il;
async function Bl(e, t) {
  for (const [n, r] of Object.entries(t.state.value))
    for (const i of Object.keys(r)) {
      const a = await e.config(`${n}.${i}`);
      a !== void 0 && (r[i] = JSON.parse(JSON.stringify(a)));
    }
}
const Jl = (e) => {
  console.log("pouch plugin");
  const t = gl(e.database || "pinia-pouchdb-plugin");
  return (n) => {
    n.app.component(e.component || "PouchDB", {
      render(i) {
        return Br(Wa, Br({
          async setup() {
            await Bl(t, n.pinia);
          },
          render() {
            return i.$slots.default(n);
          }
        }));
      }
    });
    let r = JSON.parse(JSON.stringify(n.pinia.state)) || {};
    Ha(n.pinia.state, Tl(async () => {
      for (const [i, a] of Object.entries(n.pinia.state.value)) {
        const u = JSON.parse(JSON.stringify(a)), o = Ga(r[i] || {}, u);
        for (let c of Object.keys(o))
          await t.config(`${i}.${c}`, a[c]);
        r[i] = u;
      }
    }, e.wait || 100), {
      deep: !0
    });
  };
};
export {
  Fl as cache,
  Ml as config,
  Dl as createCacheIndex,
  Nl as createConfigIndex,
  Ll as createIndex,
  Ae as db,
  gl as init,
  Bl as load,
  Ul as purge,
  zl as removeCache,
  Kl as removeConfig,
  Jl as usePouchPlugin
};
