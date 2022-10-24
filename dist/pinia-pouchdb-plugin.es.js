var ue = (e, t, n) => new Promise((r, i) => {
  var a = (s) => {
    try {
      o(n.next(s));
    } catch (_) {
      i(_);
    }
  }, u = (s) => {
    try {
      o(n.throw(s));
    } catch (_) {
      i(_);
    }
  }, o = (s) => s.done ? r(s.value) : Promise.resolve(s.value).then(a, u);
  o((n = n.apply(e, t)).next());
});
import { h as Rr, Suspense as Ha, watch as Ya } from "vue";
function Xa(e) {
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
const Za = {}, Va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Za
}, Symbol.toStringTag, { value: "Module" })), eu = /* @__PURE__ */ Xa(Va);
var ir = {};
ir.test = function() {
  return typeof (!1).queueMicrotask == "function";
};
ir.install = function(e) {
  return function() {
    (!1).queueMicrotask(e);
  };
};
var ar = {}, ki = (!1).MutationObserver || (!1).WebKitMutationObserver;
ar.test = function() {
  return ki;
};
ar.install = function(e) {
  var t = 0, n = new ki(e), r = (!1).document.createTextNode("");
  return n.observe(r, {
    characterData: !0
  }), function() {
    r.data = t = ++t % 2;
  };
};
var ur = {};
ur.test = function() {
  return (!1).setImmediate ? !1 : typeof (!1).MessageChannel != "undefined";
};
ur.install = function(e) {
  var t = new (!1).MessageChannel();
  return t.port1.onmessage = e, function() {
    t.port2.postMessage(0);
  };
};
var or = {};
or.test = function() {
  return "document" in !1 && "onreadystatechange" in (!1).document.createElement("script");
};
or.install = function(e) {
  return function() {
    var t = (!1).document.createElement("script");
    return t.onreadystatechange = function() {
      e(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null;
    }, (!1).document.documentElement.appendChild(t), e;
  };
};
var fr = {};
fr.test = function() {
  return !0;
};
fr.install = function(e) {
  return function() {
    setTimeout(e, 0);
  };
};
var wt = [eu, ir, ar, ur, or, fr], at, Qe, bt = -1, De = [], In = !1;
function tu() {
  !at || !Qe || (at = !1, Qe.length ? De = Qe.concat(De) : bt = -1, De.length && Ci());
}
function Ci() {
  if (!at) {
    In = !1, at = !0;
    for (var e = De.length, t = setTimeout(tu); e; ) {
      for (Qe = De, De = []; Qe && ++bt < e; )
        Qe[bt].run();
      bt = -1, e = De.length;
    }
    Qe = null, bt = -1, at = !1, clearTimeout(t);
  }
}
var ji, pt = -1, nu = wt.length;
for (; ++pt < nu; )
  if (wt[pt] && wt[pt].test && wt[pt].test()) {
    ji = wt[pt].install(Ci);
    break;
  }
function Ii(e, t) {
  this.fun = e, this.array = t;
}
Ii.prototype.run = function() {
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
var _e = ru;
function ru(e) {
  var t = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var n = 1; n < arguments.length; n++)
      t[n - 1] = arguments[n];
  De.push(new Ii(e, t)), !In && !at && (In = !0, ji());
}
var Mt, iu = new Uint8Array(16);
function au() {
  if (!Mt && (Mt = typeof crypto != "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != "undefined" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !Mt))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Mt(iu);
}
const uu = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function ou(e) {
  return typeof e == "string" && uu.test(e);
}
var ge = [];
for (var gn = 0; gn < 256; ++gn)
  ge.push((gn + 256).toString(16).substr(1));
function fu(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = (ge[e[t + 0]] + ge[e[t + 1]] + ge[e[t + 2]] + ge[e[t + 3]] + "-" + ge[e[t + 4]] + ge[e[t + 5]] + "-" + ge[e[t + 6]] + ge[e[t + 7]] + "-" + ge[e[t + 8]] + ge[e[t + 9]] + "-" + ge[e[t + 10]] + ge[e[t + 11]] + ge[e[t + 12]] + ge[e[t + 13]] + ge[e[t + 14]] + ge[e[t + 15]]).toLowerCase();
  if (!ou(n))
    throw TypeError("Stringified UUID is invalid");
  return n;
}
function Pi(e, t, n) {
  e = e || {};
  var r = e.random || (e.rng || au)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (var i = 0; i < 16; ++i)
      t[n + i] = r[i];
    return t;
  }
  return fu(r);
}
var qi = { exports: {} };
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
    function s(g) {
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
    b(o("hello")), typeof ArrayBuffer != "undefined" && !ArrayBuffer.prototype.slice && function() {
      function g(h, f) {
        return h = h | 0 || 0, h < 0 ? Math.max(h + f, 0) : Math.min(h, f);
      }
      ArrayBuffer.prototype.slice = function(h, f) {
        var l = this.byteLength, d = g(h, l), y = l, j, R, B, L;
        return f !== n && (y = g(f, l)), d > y ? new ArrayBuffer(0) : (j = y - d, R = new ArrayBuffer(j), B = new Uint8Array(R), L = new Uint8Array(this, d, j), B.set(L), R);
      };
    }();
    function c(g) {
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
      return this.appendBinary(c(g)), this;
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
      return A.hashBinary(c(g), h);
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
      var f = s(new Uint8Array(g)), l = b(f);
      return h ? S(l) : l;
    }, A;
  });
})(qi);
const Gt = qi.exports;
var tn = {};
tn.stringify = function(t) {
  var n = [];
  n.push({
    obj: t
  });
  for (var r = "", i, a, u, o, s, _, b, c, m, O, $; i = n.pop(); )
    if (a = i.obj, u = i.prefix || "", o = i.val || "", r += u, o)
      r += o;
    else if (typeof a != "object")
      r += typeof a == "undefined" ? null : JSON.stringify(a);
    else if (a === null)
      r += "null";
    else if (Array.isArray(a)) {
      for (n.push({
        val: "]"
      }), s = a.length - 1; s >= 0; s--)
        _ = s === 0 ? "" : ",", n.push({
          obj: a[s],
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
      }), s = b.length - 1; s >= 0; s--)
        m = b[s], O = a[m], $ = s > 0 ? "," : "", $ += JSON.stringify(m) + ":", n.push({
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
tn.parse = function(e) {
  for (var t = [], n = [], r = 0, i, a, u, o, s, _, b, c, m; ; ) {
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
        for (o = "", s = void 0, _ = 0; b = e[r++], b !== '"' || s === "\\" && _ % 2 === 1; )
          o += b, s = b, s === "\\" ? _++ : _ = 0;
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
var Be = su;
function su(e) {
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
var he = { exports: {} };
typeof Object.create == "function" ? he.exports = function(t, n) {
  n && (t.super_ = n, t.prototype = Object.create(n.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : he.exports = function(t, n) {
  if (n) {
    t.super_ = n;
    var r = function() {
    };
    r.prototype = n.prototype, t.prototype = new r(), t.prototype.constructor = t;
  }
};
var ve = { exports: {} }, ut = typeof Reflect == "object" ? Reflect : null, Lr = ut && typeof ut.apply == "function" ? ut.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, Kt;
ut && typeof ut.ownKeys == "function" ? Kt = ut.ownKeys : Object.getOwnPropertySymbols ? Kt = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Kt = function(t) {
  return Object.getOwnPropertyNames(t);
};
function cu(e) {
  console && console.warn && console.warn(e);
}
var Ti = Number.isNaN || function(t) {
  return t !== t;
};
function ne() {
  ne.init.call(this);
}
ve.exports = ne;
ve.exports.once = hu;
ne.EventEmitter = ne;
ne.prototype._events = void 0;
ne.prototype._eventsCount = 0;
ne.prototype._maxListeners = void 0;
var Dr = 10;
function nn(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(ne, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Dr;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || Ti(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    Dr = e;
  }
});
ne.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
ne.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || Ti(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function Bi(e) {
  return e._maxListeners === void 0 ? ne.defaultMaxListeners : e._maxListeners;
}
ne.prototype.getMaxListeners = function() {
  return Bi(this);
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
  var s = a[t];
  if (s === void 0)
    return !1;
  if (typeof s == "function")
    Lr(s, this, n);
  else
    for (var _ = s.length, b = Fi(s, _), r = 0; r < _; ++r)
      Lr(b[r], this, n);
  return !0;
};
function Ri(e, t, n, r) {
  var i, a, u;
  if (nn(n), a = e._events, a === void 0 ? (a = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (a.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n), a = e._events), u = a[t]), u === void 0)
    u = a[t] = n, ++e._eventsCount;
  else if (typeof u == "function" ? u = a[t] = r ? [n, u] : [u, n] : r ? u.unshift(n) : u.push(n), i = Bi(e), i > 0 && u.length > i && !u.warned) {
    u.warned = !0;
    var o = new Error("Possible EventEmitter memory leak detected. " + u.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    o.name = "MaxListenersExceededWarning", o.emitter = e, o.type = t, o.count = u.length, cu(o);
  }
  return e;
}
ne.prototype.addListener = function(t, n) {
  return Ri(this, t, n, !1);
};
ne.prototype.on = ne.prototype.addListener;
ne.prototype.prependListener = function(t, n) {
  return Ri(this, t, n, !0);
};
function lu() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Li(e, t, n) {
  var r = {
    fired: !1,
    wrapFn: void 0,
    target: e,
    type: t,
    listener: n
  }, i = lu.bind(r);
  return i.listener = n, r.wrapFn = i, i;
}
ne.prototype.once = function(t, n) {
  return nn(n), this.on(t, Li(this, t, n)), this;
};
ne.prototype.prependOnceListener = function(t, n) {
  return nn(n), this.prependListener(t, Li(this, t, n)), this;
};
ne.prototype.removeListener = function(t, n) {
  var r, i, a, u, o;
  if (nn(n), i = this._events, i === void 0)
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
    a === 0 ? r.shift() : du(r, a), r.length === 1 && (i[t] = r[0]), i.removeListener !== void 0 && this.emit("removeListener", t, o || n);
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
function Di(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var i = r[t];
  return i === void 0 ? [] : typeof i == "function" ? n ? [i.listener || i] : [i] : n ? vu(i) : Fi(i, i.length);
}
ne.prototype.listeners = function(t) {
  return Di(this, t, !0);
};
ne.prototype.rawListeners = function(t) {
  return Di(this, t, !1);
};
ne.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : Ni.call(e, t);
};
ne.prototype.listenerCount = Ni;
function Ni(e) {
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
  return this._eventsCount > 0 ? Kt(this._events) : [];
};
function Fi(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function du(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function vu(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function hu(e, t) {
  return new Promise(function(n, r) {
    function i(u) {
      e.removeListener(t, a), r(u);
    }
    function a() {
      typeof e.removeListener == "function" && e.removeListener("error", i), n([].slice.call(arguments));
    }
    Mi(e, t, a, {
      once: !0
    }), t !== "error" && yu(e, i, {
      once: !0
    });
  });
}
function yu(e, t, n) {
  typeof e.on == "function" && Mi(e, "error", t, n);
}
function Mi(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function i(a) {
      r.once && e.removeEventListener(t, i), n(a);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
function rn(e) {
  return "$" + e;
}
function Ui(e) {
  return e.substring(1);
}
function Re() {
  this._store = {};
}
Re.prototype.get = function(e) {
  var t = rn(e);
  return this._store[t];
};
Re.prototype.set = function(e, t) {
  var n = rn(e);
  return this._store[n] = t, !0;
};
Re.prototype.has = function(e) {
  var t = rn(e);
  return t in this._store;
};
Re.prototype.keys = function() {
  return Object.keys(this._store).map((e) => Ui(e));
};
Re.prototype.delete = function(e) {
  var t = rn(e), n = t in this._store;
  return delete this._store[t], n;
};
Re.prototype.forEach = function(e) {
  for (var t = Object.keys(this._store), n = 0, r = t.length; n < r; n++) {
    var i = t[n], a = this._store[i];
    i = Ui(i), e(a, i);
  }
};
Object.defineProperty(Re.prototype, "size", {
  get: function() {
    return Object.keys(this._store).length;
  }
});
function jt(e) {
  if (this._store = new Re(), e && Array.isArray(e))
    for (var t = 0, n = e.length; t < n; t++)
      this.add(e[t]);
}
jt.prototype.add = function(e) {
  return this._store.set(e, !0);
};
jt.prototype.has = function(e) {
  return this._store.has(e);
};
jt.prototype.forEach = function(e) {
  this._store.forEach(function(t, n) {
    e(n);
  });
};
Object.defineProperty(jt.prototype, "size", {
  get: function() {
    return this._store.size;
  }
});
function gu() {
  if (typeof Symbol == "undefined" || typeof Map == "undefined" || typeof Set == "undefined")
    return !1;
  var e = Object.getOwnPropertyDescriptor(Map, Symbol.species);
  return e && "get" in e && Map[Symbol.species] === Map;
}
var ct, we;
gu() ? (ct = Set, we = Map) : (ct = jt, we = Re);
function pu(e) {
  return typeof ArrayBuffer != "undefined" && e instanceof ArrayBuffer || typeof Blob != "undefined" && e instanceof Blob;
}
function _u(e) {
  if (typeof e.slice == "function")
    return e.slice(0);
  var t = new ArrayBuffer(e.byteLength), n = new Uint8Array(t), r = new Uint8Array(e);
  return n.set(r), t;
}
function mu(e) {
  if (e instanceof ArrayBuffer)
    return _u(e);
  var t = e.size, n = e.type;
  return typeof e.slice == "function" ? e.slice(0, t, n) : e.webkitSlice(0, t, n);
}
var zi = Function.prototype.toString, wu = zi.call(Object);
function bu(e) {
  var t = Object.getPrototypeOf(e);
  if (t === null)
    return !0;
  var n = t.constructor;
  return typeof n == "function" && n instanceof n && zi.call(n) == wu;
}
function de(e) {
  var t, n, r;
  if (!e || typeof e != "object")
    return e;
  if (Array.isArray(e)) {
    for (t = [], n = 0, r = e.length; n < r; n++)
      t[n] = de(e[n]);
    return t;
  }
  if (e instanceof Date && isFinite(e))
    return e.toISOString();
  if (pu(e))
    return mu(e);
  if (!bu(e))
    return e;
  t = {};
  for (n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      var i = de(e[n]);
      typeof i != "undefined" && (t[n] = i);
    }
  return t;
}
function Ki(e) {
  var t = !1;
  return Be(function(n) {
    if (t)
      throw new Error("once called more than once");
    t = !0, e.apply(this, n);
  });
}
function Ji(e) {
  return Be(function(t) {
    t = de(t);
    var n = this, r = typeof t[t.length - 1] == "function" ? t.pop() : !1, i = new Promise(function(a, u) {
      var o;
      try {
        var s = Ki(function(_, b) {
          _ ? u(_) : a(b);
        });
        t.push(s), o = e.apply(n, t), o && typeof o.then == "function" && a(o);
      } catch (_) {
        u(_);
      }
    });
    return r && i.then(function(a) {
      r(null, a);
    }, r), i;
  });
}
function $u(e, t, n) {
  if (e.constructor.listeners("debug").length) {
    for (var r = ["api", e.name, t], i = 0; i < n.length - 1; i++)
      r.push(n[i]);
    e.constructor.emit("debug", r);
    var a = n[n.length - 1];
    n[n.length - 1] = function(u, o) {
      var s = ["api", e.name, t];
      s = s.concat(u ? ["error", u] : ["success", o]), e.constructor.emit("debug", s), a(u, o);
    };
  }
}
function ce(e, t) {
  return Ji(Be(function(n) {
    if (this._closed)
      return Promise.reject(new Error("database is closed"));
    if (this._destroyed)
      return Promise.reject(new Error("database is destroyed"));
    var r = this;
    return $u(r, e, n), this.taskqueue.isReady ? t.apply(this, n) : new Promise(function(i, a) {
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
var Au = 6;
function Nr(e) {
  return e;
}
function Ou(e) {
  return [{
    ok: e
  }];
}
function Qi(e, t, n) {
  var r = t.docs, i = new we();
  r.forEach(function(S) {
    i.has(S.id) ? i.get(S.id).push(S) : i.set(S.id, [S]);
  });
  var a = i.size, u = 0, o = new Array(a);
  function s() {
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
    ++u === a && s();
  }
  function b(S, A, g) {
    o[S] = {
      id: A,
      docs: g
    }, _();
  }
  var c = [];
  i.forEach(function(S, A) {
    c.push(A);
  });
  var m = 0;
  function O() {
    if (!(m >= c.length)) {
      var S = Math.min(m + Au, c.length), A = c.slice(m, S);
      $(A, m), m += A.length;
    }
  }
  function $(S, A) {
    S.forEach(function(g, h) {
      var f = A + h, l = i.get(g), d = It(l[0], ["atts_since", "attachments"]);
      d.open_revs = l.map(function(j) {
        return j.rev;
      }), d.open_revs = d.open_revs.filter(Nr);
      var y = Nr;
      d.open_revs.length === 0 && (delete d.open_revs, y = Ou), ["revs", "attachments", "binary", "ajax", "latest"].forEach(function(j) {
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
var Pn;
try {
  localStorage.setItem("_pouch_check_localstorage", 1), Pn = !!localStorage.getItem("_pouch_check_localstorage");
} catch (e) {
  Pn = !1;
}
function an() {
  return Pn;
}
he.exports(vt, ve.exports);
function Su(e) {
  an() && addEventListener("storage", function(t) {
    e.emit(t.key);
  });
}
function vt() {
  ve.exports.call(this), this._listeners = {}, Su(this);
}
vt.prototype.addListener = function(e, t, n, r) {
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
    function s() {
      a = !1;
    }
    n.changes(o).on("change", function(_) {
      _.seq > r.since && !r.cancelled && (r.since = _.seq, r.onChange(_));
    }).on("complete", function() {
      a === "waiting" && _e(u), a = !1;
    }).on("error", s);
  }
  this._listeners[t] = u, this.on(e, u);
};
vt.prototype.removeListener = function(e, t) {
  t in this._listeners && (ve.exports.prototype.removeListener.call(this, e, this._listeners[t]), delete this._listeners[t]);
};
vt.prototype.notifyLocalWindows = function(e) {
  an() && (localStorage[e] = localStorage[e] === "a" ? "b" : "a");
};
vt.prototype.notify = function(e) {
  this.emit(e), this.notifyLocalWindows(e);
};
function Ae(e) {
  if (typeof console != "undefined" && typeof console[e] == "function") {
    var t = Array.prototype.slice.call(arguments, 1);
    console[e].apply(console, t);
  }
}
function xu(e, t) {
  var n = 6e5;
  e = parseInt(e, 10) || 0, t = parseInt(t, 10), t !== t || t <= e ? t = (e || 1) << 1 : t = t + 1, t > n && (e = n >> 1, t = n);
  var r = Math.random(), i = t - e;
  return ~~(i * r + e);
}
function Eu(e) {
  var t = 0;
  return e || (t = 2e3), xu(e, t);
}
function qn(e, t) {
  Ae("info", "The above " + e + " is totally normal. " + t);
}
var Tn;
typeof Object.assign == "function" ? Tn = Object.assign : Tn = function(e) {
  for (var t = Object(e), n = 1; n < arguments.length; n++) {
    var r = arguments[n];
    if (r != null)
      for (var i in r)
        Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
  }
  return t;
};
var He = Tn;
he.exports(re, Error);
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
var ku = new re(400, "bad_request", "Missing JSON list of 'docs'"), Ce = new re(404, "not_found", "missing"), lt = new re(409, "conflict", "Document update conflict"), Gi = new re(400, "bad_request", "_id field must contain a string"), Cu = new re(412, "missing_id", "_id is required for puts"), ju = new re(400, "bad_request", "Only reserved document ids may start with underscore.");
new re(412, "precondition_failed", "Database not open");
var Wi = new re(500, "unknown_error", "Database encountered an unknown error"), Hi = new re(500, "badarg", "Some query argument is invalid");
new re(400, "invalid_request", "Request was invalid");
var Iu = new re(400, "query_parse_error", "Some query parameter is invalid"), Fr = new re(500, "doc_validation", "Bad special document member"), un = new re(400, "bad_request", "Something wrong with the request"), sr = new re(400, "bad_request", "Document must be a JSON object");
new re(404, "not_found", "Database not found");
var cr = new re(500, "indexed_db_went_bad", "unknown");
new re(500, "web_sql_went_bad", "unknown");
new re(500, "levelDB_went_went_bad", "unknown");
new re(403, "forbidden", "Forbidden by design doc validate_doc_update function");
var Yi = new re(400, "bad_request", "Invalid rev format");
new re(412, "file_exists", "The database could not be created, the file already exists.");
var Pu = new re(412, "missing_stub", "A pre-existing attachment stub wasn't found");
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
    e = Wi, e.data = t;
  }
  return "error" in e && e.error === "conflict" && (e.name = "conflict", e.status = 409), "name" in e || (e.name = e.error || "unknown"), "status" in e || (e.status = 500), "message" in e || (e.message = e.message || e.reason), "stack" in e || (e.stack = new Error().stack), e;
}
function qu(e, t, n) {
  try {
    return !e(t, n);
  } catch (i) {
    var r = "Filter function threw: " + i.toString();
    return V(un, r);
  }
}
function lr(e) {
  var t = {}, n = e.filter && typeof e.filter == "function";
  return t.query = e.query_params, function(i) {
    i.doc || (i.doc = {});
    var a = n && qu(e.filter, i.doc, t);
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
function Wt(e) {
  for (var t = [], n = 0, r = e.length; n < r; n++)
    t = t.concat(e[n]);
  return t;
}
function Xi(e) {
  var t;
  if (e ? typeof e != "string" ? t = V(Gi) : /^_/.test(e) && !/^_(design|local)/.test(e) && (t = V(ju)) : t = V(Cu), t)
    throw t;
}
function qe(e) {
  return typeof e._remote == "boolean" ? e._remote : typeof e.type == "function" ? (Ae("warn", "db.type() is deprecated and will be removed in a future version of PouchDB"), e.type() === "http") : !1;
}
function Tu(e, t) {
  return "listenerCount" in e ? e.listenerCount(t) : ve.exports.listenerCount(e, t);
}
function Bn(e) {
  if (!e)
    return null;
  var t = e.split("/");
  return t.length === 2 ? t : t.length === 1 ? [e, e] : null;
}
function Mr(e) {
  var t = Bn(e);
  return t ? t.join("/") : null;
}
var Ur = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"], zr = "queryKey", Bu = /(?:^|&)([^&=]*)=?([^&]*)/g, Ru = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
function Zi(e) {
  for (var t = Ru.exec(e), n = {}, r = 14; r--; ) {
    var i = Ur[r], a = t[r] || "", u = ["user", "password"].indexOf(i) !== -1;
    n[i] = u ? decodeURIComponent(a) : a;
  }
  return n[zr] = {}, n[Ur[12]].replace(Bu, function(o, s, _) {
    s && (n[zr][s] = _);
  }), n;
}
function dr(e, t) {
  var n = [], r = [];
  for (var i in t)
    Object.prototype.hasOwnProperty.call(t, i) && (n.push(i), r.push(t[i]));
  return n.push(e), Function.apply(null, n).apply(null, r);
}
function on(e, t, n) {
  return e.get(t).catch(function(r) {
    if (r.status !== 404)
      throw r;
    return {};
  }).then(function(r) {
    var i = r._rev, a = n(r);
    return a ? (a._id = t, a._rev = i, Lu(e, a, n)) : {
      updated: !1,
      rev: i
    };
  });
}
function Lu(e, t, n) {
  return e.put(t).then(function(r) {
    return {
      updated: !0,
      rev: r.rev
    };
  }, function(r) {
    if (r.status !== 409)
      throw r;
    return on(e, t._id, n);
  });
}
var vr = function(e) {
  return atob(e);
}, Pt = function(e) {
  return btoa(e);
};
function hr(e, t) {
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
function Du(e) {
  for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), i = 0; i < t; i++)
    r[i] = e.charCodeAt(i);
  return n;
}
function yr(e, t) {
  return hr([Du(e)], {
    type: t
  });
}
function gr(e, t) {
  return yr(vr(e), t);
}
function Nu(e) {
  for (var t = "", n = new Uint8Array(e), r = n.byteLength, i = 0; i < r; i++)
    t += String.fromCharCode(n[i]);
  return t;
}
function Vi(e, t) {
  var n = new FileReader(), r = typeof n.readAsBinaryString == "function";
  n.onloadend = function(i) {
    var a = i.target.result || "";
    if (r)
      return t(a);
    t(Nu(a));
  }, r ? n.readAsBinaryString(e) : n.readAsArrayBuffer(e);
}
function ea(e, t) {
  Vi(e, function(n) {
    t(n);
  });
}
function pr(e, t) {
  ea(e, function(n) {
    t(Pt(n));
  });
}
function Fu(e, t) {
  var n = new FileReader();
  n.onloadend = function(r) {
    var i = r.target.result || new ArrayBuffer(0);
    t(i);
  }, n.readAsArrayBuffer(e);
}
var Mu = self.setImmediate || self.setTimeout, Uu = 32768;
function zu(e) {
  return Pt(e);
}
function Ku(e, t, n) {
  return e.webkitSlice ? e.webkitSlice(t, n) : e.slice(t, n);
}
function Ju(e, t, n, r, i) {
  (n > 0 || r < t.size) && (t = Ku(t, n, r)), Fu(t, function(a) {
    e.append(a), i();
  });
}
function Qu(e, t, n, r, i) {
  (n > 0 || r < t.length) && (t = t.substring(n, r)), e.appendBinary(t), i();
}
function _r(e, t) {
  var n = typeof e == "string", r = n ? e.length : e.size, i = Math.min(Uu, r), a = Math.ceil(r / i), u = 0, o = n ? new Gt() : new Gt.ArrayBuffer(), s = n ? Qu : Ju;
  function _() {
    Mu(c);
  }
  function b() {
    var m = o.end(!0), O = zu(m);
    t(O), o.destroy();
  }
  function c() {
    var m = u * i, O = m + i;
    u++, u < a ? s(o, e, m, O, _) : s(o, e, m, O, b);
  }
  c();
}
function ta(e) {
  return Gt.hash(e);
}
function na(e, t) {
  if (!t)
    return Pi().replace(/-/g, "").toLowerCase();
  var n = He({}, e);
  return delete n._rev_tree, ta(JSON.stringify(n));
}
var fn = Pi;
function Ye(e) {
  for (var t, n, r, i = e.rev_tree.slice(), a; a = i.pop(); ) {
    var u = a.ids, o = u[2], s = a.pos;
    if (o.length) {
      for (var _ = 0, b = o.length; _ < b; _++)
        i.push({
          pos: s + 1,
          ids: o[_]
        });
      continue;
    }
    var c = !!u[1].deleted, m = u[0];
    (!t || (r !== c ? r : n !== s ? n < s : t < m)) && (t = m, n = s, r = c);
  }
  return n + "-" + t;
}
function tt(e, t) {
  for (var n = e.slice(), r; r = n.pop(); )
    for (var i = r.pos, a = r.ids, u = a[2], o = t(u.length === 0, i, a[0], r.ctx, a[1]), s = 0, _ = u.length; s < _; s++)
      n.push({
        pos: i + 1,
        ids: u[s],
        ctx: o
      });
}
function Gu(e, t) {
  return e.pos - t.pos;
}
function mr(e) {
  var t = [];
  tt(e, function(i, a, u, o, s) {
    i && t.push({
      rev: a + "-" + u,
      pos: a,
      opts: s
    });
  }), t.sort(Gu).reverse();
  for (var n = 0, r = t.length; n < r; n++)
    delete t[n].pos;
  return t;
}
function wr(e) {
  for (var t = Ye(e), n = mr(e.rev_tree), r = [], i = 0, a = n.length; i < a; i++) {
    var u = n[i];
    u.rev !== t && !u.opts.deleted && r.push(u.rev);
  }
  return r;
}
function Wu(e) {
  var t = [];
  return tt(e.rev_tree, function(n, r, i, a, u) {
    u.status === "available" && !n && (t.push(r + "-" + i), u.status = "missing");
  }), t;
}
function ra(e) {
  for (var t = [], n = e.slice(), r; r = n.pop(); ) {
    var i = r.pos, a = r.ids, u = a[0], o = a[1], s = a[2], _ = s.length === 0, b = r.history ? r.history.slice() : [];
    b.push({
      id: u,
      opts: o
    }), _ && t.push({
      pos: i + 1 - b.length,
      ids: b
    });
    for (var c = 0, m = s.length; c < m; c++)
      n.push({
        pos: i + 1,
        ids: s[c],
        history: b
      });
  }
  return t.reverse();
}
function Hu(e, t) {
  return e.pos - t.pos;
}
function Yu(e, t, n) {
  for (var r = 0, i = e.length, a; r < i; )
    a = r + i >>> 1, n(e[a], t) < 0 ? r = a + 1 : i = a;
  return r;
}
function Xu(e, t, n) {
  var r = Yu(e, t, n);
  e.splice(r, 0, t);
}
function Kr(e, t) {
  for (var n, r, i = t, a = e.length; i < a; i++) {
    var u = e[i], o = [u.id, u.opts, []];
    r ? (r[2].push(o), r = o) : n = r = o;
  }
  return n;
}
function Zu(e, t) {
  return e[0] < t[0] ? -1 : 1;
}
function Jr(e, t) {
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
      for (var s = !1, _ = 0; _ < a[2].length; _++)
        a[2][_][0] === u[2][o][0] && (n.push({
          tree1: a[2][_],
          tree2: u[2][o]
        }), s = !0);
      s || (r = "new_branch", Xu(a[2], u[2][o], Zu));
    }
  }
  return {
    conflicts: r,
    tree: e
  };
}
function ia(e, t, n) {
  var r = [], i = !1, a = !1, u;
  if (!e.length)
    return {
      tree: [t],
      conflicts: "new_leaf"
    };
  for (var o = 0, s = e.length; o < s; o++) {
    var _ = e[o];
    if (_.pos === t.pos && _.ids[0] === t.ids[0])
      u = Jr(_.ids, t.ids), r.push({
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
        var S = $.pop();
        if (S.diff === 0) {
          S.ids[0] === c.ids[0] && O.push(S);
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
      f ? (u = Jr(f.ids, c.ids), f.parent[2][f.parentIdx] = u.tree, r.push({
        pos: b.pos,
        ids: b.ids
      }), i = i || u.conflicts, a = !0) : r.push(_);
    } else
      r.push(_);
  }
  return a || r.push(t), r.sort(Hu), {
    tree: r,
    conflicts: i || "internal_node"
  };
}
function Vu(e, t) {
  for (var n = ra(e), r, i, a = 0, u = n.length; a < u; a++) {
    var o = n[a], s = o.ids, _;
    if (s.length > t) {
      r || (r = {});
      var b = s.length - t;
      _ = {
        pos: o.pos + b,
        ids: Kr(s, b)
      };
      for (var c = 0; c < b; c++) {
        var m = o.pos + c + "-" + s[c].id;
        r[m] = !0;
      }
    } else
      _ = {
        pos: o.pos,
        ids: Kr(s, 0)
      };
    i ? i = ia(i, _, !0).tree : i = [_];
  }
  return r && tt(i, function(O, $, S) {
    delete r[$ + "-" + S];
  }), {
    tree: i,
    revs: r ? Object.keys(r) : []
  };
}
function aa(e, t, n) {
  var r = ia(e, t), i = Vu(r.tree, n);
  return {
    tree: i.tree,
    stemmedRevs: i.revs,
    conflicts: r.conflicts
  };
}
function eo(e, t) {
  for (var n = e.slice(), r = t.split("-"), i = parseInt(r[0], 10), a = r[1], u; u = n.pop(); ) {
    if (u.pos === i && u.ids[0] === a)
      return !0;
    for (var o = u.ids[2], s = 0, _ = o.length; s < _; s++)
      n.push({
        pos: u.pos + 1,
        ids: o[s]
      });
  }
  return !1;
}
function to(e) {
  return e.ids;
}
function Te(e, t) {
  t || (t = Ye(e));
  for (var n = t.substring(t.indexOf("-") + 1), r = e.rev_tree.map(to), i; i = r.pop(); ) {
    if (i[0] === n)
      return !!i[1].deleted;
    r = r.concat(i[2]);
  }
}
function Xe(e) {
  return /^_local/.test(e);
}
function no(e, t) {
  for (var n = t.rev_tree.slice(), r; r = n.pop(); ) {
    var i = r.pos, a = r.ids, u = a[0], o = a[1], s = a[2], _ = s.length === 0, b = r.history ? r.history.slice() : [];
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
    for (var S = 0, A = s.length; S < A; S++)
      n.push({
        pos: i + 1,
        ids: s[S],
        history: b
      });
  }
  throw new Error("Unable to resolve latest revision for id " + t.id + ", rev " + e);
}
he.exports(qt, ve.exports);
function ro(e, t, n, r) {
  try {
    e.emit("change", t, n, r);
  } catch (i) {
    Ae("error", 'Error in .on("change", function):', i);
  }
}
function qt(e, t, n) {
  ve.exports.call(this);
  var r = this;
  this.db = e, t = t ? de(t) : {};
  var i = t.complete = Ki(function(o, s) {
    o ? Tu(r, "error") > 0 && r.emit("error", o) : r.emit("complete", s), r.removeAllListeners(), e.removeListener("destroyed", a);
  });
  n && (r.on("complete", function(o) {
    n(null, o);
  }), r.on("error", n));
  function a() {
    r.cancel();
  }
  e.once("destroyed", a), t.onChange = function(o, s, _) {
    r.isCancelled || ro(r, o, s, _);
  };
  var u = new Promise(function(o, s) {
    t.complete = function(_, b) {
      _ ? s(_) : o(b);
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
qt.prototype.cancel = function() {
  this.isCancelled = !0, this.db.taskqueue.isReady && this.emit("cancel");
};
function io(e, t, n) {
  var r = [{
    rev: e._rev
  }];
  n.style === "all_docs" && (r = mr(t.rev_tree).map(function(a) {
    return {
      rev: a.rev
    };
  }));
  var i = {
    id: t.id,
    changes: r,
    doc: e
  };
  return Te(t, e._rev) && (i.deleted = !0), n.conflicts && (i.doc._conflicts = wr(t), i.doc._conflicts.length || delete i.doc._conflicts), i;
}
qt.prototype.validateChanges = function(e) {
  var t = e.complete, n = this;
  H._changesFilterPlugin ? H._changesFilterPlugin.validate(e, function(r) {
    if (r)
      return t(r);
    n.doChanges(e);
  }) : n.doChanges(e);
};
qt.prototype.doChanges = function(e) {
  var t = this, n = e.complete;
  if (e = de(e), "live" in e && !("continuous" in e) && (e.continuous = e.live), e.processChange = io, e.since === "latest" && (e.since = "now"), e.since || (e.since = 0), e.since === "now") {
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
      a in e && Ae("warn", 'The "' + a + '" option was passed in to changes/replicate, but pouchdb-changes-filter plugin is not installed, so it was ignored. Please install the plugin to enable filtering.');
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
function Qr(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function br(e, t) {
  return function(n, r) {
    n || r[0] && r[0].error ? (n = n || r[0], n.docId = t, e(n)) : e(null, r.length ? r[0] : r);
  };
}
function ao(e) {
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
function uo(e, t) {
  var n = Qr(e._id, t._id);
  if (n !== 0)
    return n;
  var r = e._revisions ? e._revisions.start : 0, i = t._revisions ? t._revisions.start : 0;
  return Qr(r, i);
}
function oo(e) {
  var t = {}, n = [];
  return tt(e, function(r, i, a, u) {
    var o = i + "-" + a;
    return r && (t[o] = 0), u !== void 0 && n.push({
      from: u,
      to: o
    }), o;
  }), n.reverse(), n.forEach(function(r) {
    t[r.from] === void 0 ? t[r.from] = 1 + t[r.to] : t[r.from] = Math.min(t[r.from], 1 + t[r.to]);
  }), t;
}
function fo(e) {
  var t = "limit" in e ? e.keys.slice(e.skip, e.limit + e.skip) : e.skip > 0 ? e.keys.slice(e.skip) : e.keys;
  e.keys = t, e.skip = 0, delete e.limit, e.descending && (t.reverse(), e.descending = !1);
}
function ua(e) {
  var t = e._compactionQueue[0], n = t.opts, r = t.callback;
  e.get("_local/compaction").catch(function() {
    return !1;
  }).then(function(i) {
    i && i.last_seq && (n.last_seq = i.last_seq), e._compact(n, function(a, u) {
      a ? r(a) : r(null, u), _e(function() {
        e._compactionQueue.shift(), e._compactionQueue.length && ua(e);
      });
    });
  });
}
function so(e) {
  return e.charAt(0) === "_" ? e + " is not a valid attachment name, attachment names cannot start with '_'" : !1;
}
he.exports(ae, ve.exports);
function ae() {
  ve.exports.call(this);
  for (var e in ae.prototype)
    typeof this[e] == "function" && (this[e] = this[e].bind(this));
}
ae.prototype.post = ce("post", function(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), typeof e != "object" || Array.isArray(e))
    return n(V(sr));
  this.bulkDocs({
    docs: [e]
  }, t, br(n, e._id));
});
ae.prototype.put = ce("put", function(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), typeof e != "object" || Array.isArray(e))
    return n(V(sr));
  if (Xi(e._id), Xe(e._id) && typeof this._putLocal == "function")
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
    var u = e._rev.split("-"), o = u[1], s = parseInt(u[0], 10), _ = s + 1, b = na();
    e._revisions = {
      start: _,
      ids: [b, o]
    }, e._rev = _ + "-" + b, t.new_edits = !1;
  }
  function a(u) {
    typeof r._put == "function" && t.new_edits !== !1 ? r._put(e, t, u) : r.bulkDocs({
      docs: [e]
    }, t, br(u, e._id));
  }
});
ae.prototype.putAttachment = ce("putAttachment", function(e, t, n, r, i) {
  var a = this;
  typeof i == "function" && (i = r, r = n, n = null), typeof i == "undefined" && (i = r, r = n, n = null), i || Ae("warn", "Attachment", t, "on document", e, "is missing content_type");
  function u(o) {
    var s = "_rev" in o ? parseInt(o._rev, 10) : 0;
    return o._attachments = o._attachments || {}, o._attachments[t] = {
      content_type: i,
      data: r,
      revpos: ++s
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
ae.prototype.removeAttachment = ce("removeAttachment", function(e, t, n, r) {
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
ae.prototype.remove = ce("remove", function(e, t, n, r) {
  var i;
  typeof t == "string" ? (i = {
    _id: e,
    _rev: t
  }, typeof n == "function" && (r = n, n = {})) : (i = e, typeof t == "function" ? (r = t, n = {}) : (r = n, n = t)), n = n || {}, n.was_delete = !0;
  var a = {
    _id: i._id,
    _rev: i._rev || n.rev
  };
  if (a._deleted = !0, Xe(a._id) && typeof this._removeLocal == "function")
    return this._removeLocal(i, r);
  this.bulkDocs({
    docs: [a]
  }, n, br(r, a._id));
});
ae.prototype.revsDiff = ce("revsDiff", function(e, t, n) {
  typeof t == "function" && (n = t, t = {});
  var r = Object.keys(e);
  if (!r.length)
    return n(null, {});
  var i = 0, a = new we();
  function u(s, _) {
    a.has(s) || a.set(s, {
      missing: []
    }), a.get(s).missing.push(_);
  }
  function o(s, _) {
    var b = e[s].slice(0);
    tt(_, function(c, m, O, $, S) {
      var A = m + "-" + O, g = b.indexOf(A);
      g !== -1 && (b.splice(g, 1), S.status !== "available" && u(s, A));
    }), b.forEach(function(c) {
      u(s, c);
    });
  }
  r.map(function(s) {
    this._getRevisionTree(s, function(_, b) {
      if (_ && _.status === 404 && _.message === "missing")
        a.set(s, {
          missing: e[s]
        });
      else {
        if (_)
          return n(_);
        o(s, b);
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
ae.prototype.bulkGet = ce("bulkGet", function(e, t) {
  Qi(this, e, t);
});
ae.prototype.compactDocument = ce("compactDocument", function(e, t, n) {
  var r = this;
  this._getRevisionTree(e, function(i, a) {
    if (i)
      return n(i);
    var u = oo(a), o = [], s = [];
    Object.keys(u).forEach(function(_) {
      u[_] > t && o.push(_);
    }), tt(a, function(_, b, c, m, O) {
      var $ = b + "-" + c;
      O.status === "available" && o.indexOf($) !== -1 && s.push($);
    }), r._doCompaction(e, s, n);
  });
});
ae.prototype.compact = ce("compact", function(e, t) {
  typeof e == "function" && (t = e, e = {});
  var n = this;
  e = e || {}, n._compactionQueue = n._compactionQueue || [], n._compactionQueue.push({
    opts: e,
    callback: t
  }), n._compactionQueue.length === 1 && ua(n);
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
    var s = o.last_seq;
    Promise.all(i).then(function() {
      return on(n, "_local/compaction", function(b) {
        return !b.last_seq || b.last_seq < s ? (b.last_seq = s, b) : !1;
      });
    }).then(function() {
      t(null, {
        ok: !0
      });
    }).catch(t);
  }
  n.changes(r).on("change", a).on("complete", u).on("error", t);
};
ae.prototype.get = ce("get", function(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), typeof e != "string")
    return n(V(Gi));
  if (Xe(e) && typeof this._getLocal == "function")
    return this._getLocal(e, n);
  var r = [], i = this;
  function a() {
    var s = [], _ = r.length;
    if (!_)
      return n(null, s);
    r.forEach(function(b) {
      i.get(e, {
        rev: b,
        revs: t.revs,
        latest: t.latest,
        attachments: t.attachments,
        binary: t.binary
      }, function(c, m) {
        if (c)
          s.push({
            missing: b
          });
        else {
          for (var O, $ = 0, S = s.length; $ < S; $++)
            if (s[$].ok && s[$].ok._rev === m._rev) {
              O = !0;
              break;
            }
          O || s.push({
            ok: m
          });
        }
        _--, _ || n(null, s);
      });
    });
  }
  if (t.open_revs) {
    if (t.open_revs === "all")
      this._getRevisionTree(e, function(s, _) {
        if (s)
          return n(s);
        r = mr(_).map(function(b) {
          return b.rev;
        }), a();
      });
    else if (Array.isArray(t.open_revs)) {
      r = t.open_revs;
      for (var u = 0; u < r.length; u++) {
        var o = r[u];
        if (!(typeof o == "string" && /^\d+-/.test(o)))
          return n(V(Yi));
      }
      a();
    } else
      return n(V(Wi, "function_clause"));
    return;
  }
  return this._get(e, t, function(s, _) {
    if (s)
      return s.docId = e, n(s);
    var b = _.doc, c = _.metadata, m = _.ctx;
    if (t.conflicts) {
      var O = wr(c);
      O.length && (b._conflicts = O);
    }
    if (Te(c, b._rev) && (b._deleted = !0), t.revs || t.revs_info) {
      for (var $ = b._rev.split("-"), S = parseInt($[0], 10), A = $[1], g = ra(c.rev_tree), h = null, f = 0; f < g.length; f++) {
        var l = g[f], d = l.ids.map(function(Y) {
          return Y.id;
        }).indexOf(A), y = d === S - 1;
        (y || !h && d !== -1) && (h = l);
      }
      if (!h)
        return s = new Error("invalid rev tree"), s.docId = e, n(s);
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
ae.prototype.getAttachment = ce("getAttachment", function(e, t, n, r) {
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
ae.prototype.allDocs = ce("allDocs", function(e, t) {
  if (typeof e == "function" && (t = e, e = {}), e.skip = typeof e.skip != "undefined" ? e.skip : 0, e.start_key && (e.startkey = e.start_key), e.end_key && (e.endkey = e.end_key), "keys" in e) {
    if (!Array.isArray(e.keys))
      return t(new TypeError("options.keys must be an array"));
    var n = ["startkey", "endkey", "key"].filter(function(r) {
      return r in e;
    })[0];
    if (n) {
      t(V(Iu, "Query parameter `" + n + "` is not compatible with multi-get"));
      return;
    }
    if (!qe(this) && (fo(e), e.keys.length === 0))
      return this._allDocs({
        limit: 0
      }, t);
  }
  return this._allDocs(e, t);
});
ae.prototype.changes = function(e, t) {
  return typeof e == "function" && (t = e, e = {}), e = e || {}, e.return_docs = "return_docs" in e ? e.return_docs : !e.live, new qt(this, e, t);
};
ae.prototype.close = ce("close", function(e) {
  return this._closed = !0, this.emit("closed"), this._close(e);
});
ae.prototype.info = ce("info", function(e) {
  var t = this;
  this._info(function(n, r) {
    if (n)
      return e(n);
    r.db_name = r.db_name || t.name, r.auto_compaction = !!(t.auto_compaction && !qe(t)), r.adapter = t.adapter, e(null, r);
  });
});
ae.prototype.id = ce("id", function(e) {
  return this._id(e);
});
ae.prototype.type = function() {
  return typeof this._type == "function" ? this._type() : this.adapter;
};
ae.prototype.bulkDocs = ce("bulkDocs", function(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), t = t || {}, Array.isArray(e) && (e = {
    docs: e
  }), !e || !e.docs || !Array.isArray(e.docs))
    return n(V(ku));
  for (var r = 0; r < e.docs.length; ++r)
    if (typeof e.docs[r] != "object" || Array.isArray(e.docs[r]))
      return n(V(sr));
  var i;
  if (e.docs.forEach(function(o) {
    o._attachments && Object.keys(o._attachments).forEach(function(s) {
      i = i || so(s), o._attachments[s].content_type || Ae("warn", "Attachment", s, "on document", o._id, "is missing content_type");
    });
  }), i)
    return n(V(un, i));
  "new_edits" in t || ("new_edits" in e ? t.new_edits = e.new_edits : t.new_edits = !0);
  var a = this;
  !t.new_edits && !qe(a) && e.docs.sort(uo), ao(e.docs);
  var u = e.docs.map(function(o) {
    return o._id;
  });
  return this._bulkDocs(e, t, function(o, s) {
    if (o)
      return n(o);
    if (t.new_edits || (s = s.filter(function(c) {
      return c.error;
    })), !qe(a))
      for (var _ = 0, b = s.length; _ < b; _++)
        s[_].id = s[_].id || u[_];
    n(null, s);
  });
});
ae.prototype.registerDependentDatabase = ce("registerDependentDatabase", function(e, t) {
  var n = de(this.__opts);
  this.__opts.view_adapter && (n.adapter = this.__opts.view_adapter);
  var r = new this.constructor(e, n);
  function i(a) {
    return a.dependentDbs = a.dependentDbs || {}, a.dependentDbs[e] ? !1 : (a.dependentDbs[e] = !0, a);
  }
  on(this, "_local/_pouch_dependentDbs", i).then(function() {
    t(null, {
      db: r
    });
  }).catch(t);
});
ae.prototype.destroy = ce("destroy", function(e, t) {
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
  if (qe(n))
    return i();
  n.get("_local/_pouch_dependentDbs", function(a, u) {
    if (a)
      return a.status !== 404 ? t(a) : i();
    var o = u.dependentDbs, s = n.constructor, _ = Object.keys(o).map(function(b) {
      var c = r ? b.replace(new RegExp("^" + s.prefix), "") : b;
      return new s(c, n.__opts).destroy();
    });
    Promise.all(_).then(i, t);
  });
});
function Tt() {
  this.isReady = !1, this.failed = !1, this.queue = [];
}
Tt.prototype.execute = function() {
  var e;
  if (this.failed)
    for (; e = this.queue.shift(); )
      e(this.failed);
  else
    for (; e = this.queue.shift(); )
      e();
};
Tt.prototype.fail = function(e) {
  this.failed = e, this.execute();
};
Tt.prototype.ready = function(e) {
  this.isReady = !0, this.db = e, this.execute();
};
Tt.prototype.addTask = function(e) {
  this.queue.push(e), this.failed && this.execute();
};
function co(e, t) {
  var n = e.match(/([a-z-]*):\/\/(.*)/);
  if (n)
    return {
      name: /https?/.test(n[1]) ? n[1] + "://" + n[2] : n[2],
      adapter: n[1]
    };
  var r = H.adapters, i = H.preferredAdapters, a = H.prefix, u = t.adapter;
  if (!u)
    for (var o = 0; o < i.length; ++o) {
      if (u = i[o], u === "idb" && "websql" in r && an() && localStorage["_pouch__websqldb_" + a + e]) {
        Ae("log", 'PouchDB is downgrading "' + e + '" to WebSQL to avoid data loss, because it was already opened with WebSQL.');
        continue;
      }
      break;
    }
  var s = r[u], _ = s && "use_prefix" in s ? s.use_prefix : !0;
  return {
    name: _ ? a + e : e,
    adapter: u
  };
}
function lo(e) {
  function t(r) {
    e.removeListener("closed", n), r || e.constructor.emit("destroyed", e.name);
  }
  function n() {
    e.removeListener("destroyed", t), e.constructor.emit("unref", e);
  }
  e.once("destroyed", t), e.once("closed", n), e.constructor.emit("ref", e);
}
he.exports(H, ae);
function H(e, t) {
  if (!(this instanceof H))
    return new H(e, t);
  var n = this;
  if (t = t || {}, e && typeof e == "object" && (t = e, e = t.name, delete t.name), t.deterministic_revs === void 0 && (t.deterministic_revs = !0), this.__opts = t = de(t), n.auto_compaction = t.auto_compaction, n.prefix = H.prefix, typeof e != "string")
    throw new Error("Missing/invalid DB name");
  var r = (t.prefix || "") + e, i = co(r, t);
  if (t.name = i.name, t.adapter = t.adapter || i.adapter, n.name = e, n._adapter = t.adapter, H.emit("debug", ["adapter", "Picked adapter: ", t.adapter]), !H.adapters[t.adapter] || !H.adapters[t.adapter].valid())
    throw new Error("Invalid Adapter: " + t.adapter);
  if (t.view_adapter && (!H.adapters[t.view_adapter] || !H.adapters[t.view_adapter].valid()))
    throw new Error("Invalid View Adapter: " + t.view_adapter);
  ae.call(n), n.taskqueue = new Tt(), n.adapter = t.adapter, H.adapters[t.adapter].call(n, t, function(a) {
    if (a)
      return n.taskqueue.fail(a);
    lo(n), n.emit("created", n), H.emit("created", n.name), n.taskqueue.ready(n);
  });
}
var vo = typeof AbortController != "undefined" ? AbortController : function() {
  return {
    abort: function() {
    }
  };
}, oa = fetch, ot = Headers;
H.adapters = {};
H.preferredAdapters = [];
H.prefix = "_pouch_";
var Gr = new ve.exports();
function ho(e) {
  Object.keys(ve.exports.prototype).forEach(function(n) {
    typeof ve.exports.prototype[n] == "function" && (e[n] = Gr[n].bind(Gr));
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
ho(H);
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
  return this.__defaults && (H.__defaults = He({}, this.__defaults)), H;
};
H.defaults = function(e) {
  function t(n, r) {
    if (!(this instanceof t))
      return new t(n, r);
    r = r || {}, n && typeof n == "object" && (r = n, n = r.name, delete r.name), r = He({}, t.__defaults, r), H.call(this, n, r);
  }
  return he.exports(t, H), t.preferredAdapters = H.preferredAdapters.slice(), Object.keys(H).forEach(function(n) {
    n in t || (t[n] = H[n]);
  }), t.__defaults = He({}, this.__defaults, e), t;
};
H.fetch = function(e, t) {
  return oa(e, t);
};
var yo = "7.3.0";
function $r(e, t) {
  for (var n = e, r = 0, i = t.length; r < i; r++) {
    var a = t[r];
    if (n = n[a], !n)
      break;
  }
  return n;
}
function go(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function Ar(e) {
  for (var t = [], n = "", r = 0, i = e.length; r < i; r++) {
    var a = e[r];
    r > 0 && e[r - 1] === "\\" && (a === "$" || a === ".") ? n = n.substring(0, n.length - 1) + a : a === "." ? (t.push(n), n = "") : n += a;
  }
  return t.push(n), t;
}
var po = ["$or", "$nor", "$not"];
function fa(e) {
  return po.indexOf(e) > -1;
}
function sa(e) {
  return Object.keys(e)[0];
}
function _o(e) {
  return e[sa(e)];
}
function At(e) {
  var t = {}, n = {
    $or: !0,
    $nor: !0
  };
  return e.forEach(function(r) {
    Object.keys(r).forEach(function(i) {
      var a = r[i];
      if (typeof a != "object" && (a = {
        $eq: a
      }), fa(i))
        if (a instanceof Array) {
          if (n[i]) {
            n[i] = !1, t[i] = a;
            return;
          }
          var u = [];
          t[i].forEach(function(s) {
            Object.keys(a).forEach(function(_) {
              var b = a[_], c = Math.max(Object.keys(s).length, Object.keys(b).length), m = At([s, b]);
              Object.keys(m).length <= c || u.push(m);
            });
          }), t[i] = u;
        } else
          t[i] = At([a]);
      else {
        var o = t[i] = t[i] || {};
        Object.keys(a).forEach(function(s) {
          var _ = a[s];
          if (s === "$gt" || s === "$gte")
            return mo(s, _, o);
          if (s === "$lt" || s === "$lte")
            return wo(s, _, o);
          if (s === "$ne")
            return bo(_, o);
          if (s === "$eq")
            return $o(_, o);
          if (s === "$regex")
            return Ao(_, o);
          o[s] = _;
        });
      }
    });
  }), t;
}
function mo(e, t, n) {
  typeof n.$eq == "undefined" && (typeof n.$gte != "undefined" ? e === "$gte" ? t > n.$gte && (n.$gte = t) : t >= n.$gte && (delete n.$gte, n.$gt = t) : typeof n.$gt != "undefined" ? e === "$gte" ? t > n.$gt && (delete n.$gt, n.$gte = t) : t > n.$gt && (n.$gt = t) : n[e] = t);
}
function wo(e, t, n) {
  typeof n.$eq == "undefined" && (typeof n.$lte != "undefined" ? e === "$lte" ? t < n.$lte && (n.$lte = t) : t <= n.$lte && (delete n.$lte, n.$lt = t) : typeof n.$lt != "undefined" ? e === "$lte" ? t < n.$lt && (delete n.$lt, n.$lte = t) : t < n.$lt && (n.$lt = t) : n[e] = t);
}
function bo(e, t) {
  "$ne" in t ? t.$ne.push(e) : t.$ne = [e];
}
function $o(e, t) {
  delete t.$gt, delete t.$gte, delete t.$lt, delete t.$lte, delete t.$ne, t.$eq = e;
}
function Ao(e, t) {
  "$regex" in t ? t.$regex.push(e) : t.$regex = [e];
}
function ca(e) {
  for (var t in e) {
    if (Array.isArray(e))
      for (var n in e)
        e[n].$and && (e[n] = At(e[n].$and));
    var r = e[t];
    typeof r == "object" && ca(r);
  }
  return e;
}
function la(e, t) {
  for (var n in e) {
    n === "$and" && (t = !0);
    var r = e[n];
    typeof r == "object" && (t = la(r, t));
  }
  return t;
}
function Oo(e) {
  var t = de(e), n = !1;
  la(t, !1) && (t = ca(t), "$and" in t && (t = At(t.$and)), n = !0), ["$or", "$nor"].forEach(function(o) {
    o in t && t[o].forEach(function(s) {
      for (var _ = Object.keys(s), b = 0; b < _.length; b++) {
        var c = _[b], m = s[c];
        (typeof m != "object" || m === null) && (s[c] = {
          $eq: m
        });
      }
    });
  }), "$not" in t && (t.$not = At([t.$not]));
  for (var r = Object.keys(t), i = 0; i < r.length; i++) {
    var a = r[i], u = t[a];
    typeof u != "object" || u === null ? u = {
      $eq: u
    } : n || ("$ne" in u && (u.$ne = [u.$ne]), "$regex" in u && (u.$regex = [u.$regex])), t[a] = u;
  }
  return t;
}
function So(e, t, n) {
  for (var r = "", i = n - e.length; r.length < i; )
    r += t;
  return r;
}
function xo(e, t, n) {
  var r = So(e, t, n);
  return r + e;
}
var da = -324, Rn = 3, Ln = "";
function oe(e, t) {
  if (e === t)
    return 0;
  e = Ze(e), t = Ze(t);
  var n = Dn(e), r = Dn(t);
  if (n - r !== 0)
    return n - r;
  switch (typeof e) {
    case "number":
      return e - t;
    case "boolean":
      return e < t ? -1 : 1;
    case "string":
      return Po(e, t);
  }
  return Array.isArray(e) ? Io(e, t) : qo(e, t);
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
function Eo(e) {
  if (e !== null)
    switch (typeof e) {
      case "boolean":
        return e ? 1 : 0;
      case "number":
        return To(e);
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
  return e = Ze(e), Dn(e) + Ln + Eo(e) + t;
}
function ko(e, t) {
  var n = t, r, i = e[t] === "1";
  if (i)
    r = 0, t++;
  else {
    var a = e[t] === "0";
    t++;
    var u = "", o = e.substring(t, t + Rn), s = parseInt(o, 10) + da;
    for (a && (s = -s), t += Rn; ; ) {
      var _ = e[t];
      if (_ === "\0")
        break;
      u += _, t++;
    }
    u = u.split("."), u.length === 1 ? r = parseInt(u, 10) : r = parseFloat(u[0] + "." + u[1]), a && (r = r - 10), s !== 0 && (r = parseFloat(r + "e" + s));
  }
  return {
    num: r,
    length: t - n
  };
}
function Co(e, t) {
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
function jo(e) {
  for (var t = [], n = [], r = 0; ; ) {
    var i = e[r++];
    if (i === "\0") {
      if (t.length === 1)
        return t.pop();
      Co(t, n);
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
        var a = ko(e, r);
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
        var s = {
          element: [],
          index: t.length
        };
        t.push(s.element), n.push(s);
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
function Io(e, t) {
  for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) {
    var i = oe(e[r], t[r]);
    if (i !== 0)
      return i;
  }
  return e.length === t.length ? 0 : e.length > t.length ? 1 : -1;
}
function Po(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function qo(e, t) {
  for (var n = Object.keys(e), r = Object.keys(t), i = Math.min(n.length, r.length), a = 0; a < i; a++) {
    var u = oe(n[a], r[a]);
    if (u !== 0 || (u = oe(e[n[a]], t[r[a]]), u !== 0))
      return u;
  }
  return n.length === r.length ? 0 : n.length > r.length ? 1 : -1;
}
function Dn(e) {
  var t = ["boolean", "number", "string", "object"], n = t.indexOf(typeof e);
  if (~n)
    return e === null ? 1 : Array.isArray(e) ? 5 : n < 3 ? n + 2 : n + 3;
  if (Array.isArray(e))
    return 5;
}
function To(e) {
  if (e === 0)
    return "1";
  var t = e.toExponential().split(/e\+?/), n = parseInt(t[1], 10), r = e < 0, i = r ? "0" : "2", a = (r ? -n : n) - da, u = xo(a.toString(), "0", Rn);
  i += Ln + u;
  var o = Math.abs(parseFloat(t[0]));
  r && (o = 10 - o);
  var s = o.toFixed(20);
  return s = s.replace(/\.?0+$/, ""), i += Ln + s, i;
}
function Bo(e) {
  function t(n) {
    return e.map(function(r) {
      var i = sa(r), a = Ar(i), u = $r(n, a);
      return u;
    });
  }
  return function(n, r) {
    var i = t(n.doc), a = t(r.doc), u = oe(i, a);
    return u !== 0 ? u : go(n.doc._id, r.doc._id);
  };
}
function Ro(e, t, n) {
  if (e = e.filter(function(u) {
    return ft(u.doc, t.selector, n);
  }), t.sort) {
    var r = Bo(t.sort);
    e = e.sort(r), typeof t.sort[0] != "string" && _o(t.sort[0]) === "desc" && (e = e.reverse());
  }
  if ("limit" in t || "skip" in t) {
    var i = t.skip || 0, a = ("limit" in t ? t.limit : e.length) + i;
    e = e.slice(i, a);
  }
  return e;
}
function ft(e, t, n) {
  return n.every(function(r) {
    var i = t[r], a = Ar(r), u = $r(e, a);
    return fa(r) ? Lo(r, i, e) : Ht(i, e, a, u);
  });
}
function Ht(e, t, n, r) {
  return e ? typeof e == "object" ? Object.keys(e).every(function(i) {
    var a = e[i];
    if (i.indexOf("$") === 0)
      return Wr(i, t, a, n, r);
    var u = Ar(i);
    if (r === void 0 && typeof a != "object" && u.length > 0)
      return !1;
    var o = $r(r, u);
    return typeof a == "object" ? Ht(a, t, n, o) : Wr("$eq", t, a, u, o);
  }) : e === r : !0;
}
function Lo(e, t, n) {
  return e === "$or" ? t.some(function(r) {
    return ft(n, r, Object.keys(r));
  }) : e === "$not" ? !ft(n, t, Object.keys(t)) : !t.find(function(r) {
    return ft(n, r, Object.keys(r));
  });
}
function Wr(e, t, n, r, i) {
  if (!Yr[e])
    throw new Error('unknown operator "' + e + '" - should be one of $eq, $lte, $lt, $gt, $gte, $exists, $ne, $in, $nin, $size, $mod, $regex, $elemMatch, $type, $allMatch or $all');
  return Yr[e](t, n, r, i);
}
function _t(e) {
  return typeof e != "undefined" && e !== null;
}
function Me(e) {
  return typeof e != "undefined";
}
function Do(e, t) {
  if (typeof e != "number" || parseInt(e, 10) !== e)
    return !1;
  var n = t[0], r = t[1];
  return e % n === r;
}
function Hr(e, t) {
  return t.some(function(n) {
    return e instanceof Array ? e.some(function(r) {
      return oe(n, r) === 0;
    }) : oe(n, e) === 0;
  });
}
function No(e, t) {
  return t.every(function(n) {
    return e.some(function(r) {
      return oe(n, r) === 0;
    });
  });
}
function Fo(e, t) {
  return e.length === t;
}
function Mo(e, t) {
  var n = new RegExp(t);
  return n.test(e);
}
function Uo(e, t) {
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
var Yr = {
  $elemMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" ? r.some(function(i) {
      return ft(i, t, Object.keys(t));
    }) : r.some(function(i) {
      return Ht(t, e, n, i);
    });
  },
  $allMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" ? r.every(function(i) {
      return ft(i, t, Object.keys(t));
    }) : r.every(function(i) {
      return Ht(t, e, n, i);
    });
  },
  $eq: function(e, t, n, r) {
    return Me(r) && oe(r, t) === 0;
  },
  $gte: function(e, t, n, r) {
    return Me(r) && oe(r, t) >= 0;
  },
  $gt: function(e, t, n, r) {
    return Me(r) && oe(r, t) > 0;
  },
  $lte: function(e, t, n, r) {
    return Me(r) && oe(r, t) <= 0;
  },
  $lt: function(e, t, n, r) {
    return Me(r) && oe(r, t) < 0;
  },
  $exists: function(e, t, n, r) {
    return t ? Me(r) : !Me(r);
  },
  $mod: function(e, t, n, r) {
    return _t(r) && Do(r, t);
  },
  $ne: function(e, t, n, r) {
    return t.every(function(i) {
      return oe(r, i) !== 0;
    });
  },
  $in: function(e, t, n, r) {
    return _t(r) && Hr(r, t);
  },
  $nin: function(e, t, n, r) {
    return _t(r) && !Hr(r, t);
  },
  $size: function(e, t, n, r) {
    return _t(r) && Array.isArray(r) && Fo(r, t);
  },
  $all: function(e, t, n, r) {
    return Array.isArray(r) && No(r, t);
  },
  $regex: function(e, t, n, r) {
    return _t(r) && typeof r == "string" && t.every(function(i) {
      return Mo(r, i);
    });
  },
  $type: function(e, t, n, r) {
    return Uo(r, t);
  }
};
function zo(e, t) {
  if (typeof t != "object")
    throw new Error("Selector error: expected a JSON object");
  t = Oo(t);
  var n = {
    doc: e
  }, r = Ro([n], {
    selector: t
  }, Object.keys(t));
  return r && r.length === 1;
}
function Ko(e) {
  return dr(`"use strict";
return ` + e + ";", {});
}
function Jo(e) {
  var t = ["return function(doc) {", '  "use strict";', "  var emitted = false;", "  var emit = function (a, b) {", "    emitted = true;", "  };", "  var view = " + e + ";", "  view(doc);", "  if (emitted) {", "    return true;", "  }", "};"].join(`
`);
  return dr(t, {});
}
function Qo(e, t) {
  if (e.selector && e.filter && e.filter !== "_selector") {
    var n = typeof e.filter == "string" ? e.filter : "function";
    return t(new Error('selector invalid for filter "' + n + '"'));
  }
  t();
}
function Go(e) {
  e.view && !e.filter && (e.filter = "_view"), e.selector && !e.filter && (e.filter = "_selector"), e.filter && typeof e.filter == "string" && (e.filter === "_view" ? e.view = Mr(e.view) : e.filter = Mr(e.filter));
}
function Wo(e, t) {
  return t.filter && typeof t.filter == "string" && !t.doc_ids && !qe(e.db);
}
function Ho(e, t) {
  var n = t.complete;
  if (t.filter === "_view") {
    if (!t.view || typeof t.view != "string") {
      var r = V(un, "`view` filter parameter not found or invalid.");
      return n(r);
    }
    var i = Bn(t.view);
    e.db.get("_design/" + i[0], function(u, o) {
      if (e.isCancelled)
        return n(null, {
          status: "cancelled"
        });
      if (u)
        return n(dt(u));
      var s = o && o.views && o.views[i[1]] && o.views[i[1]].map;
      if (!s)
        return n(V(Ce, o.views ? "missing json key: " + i[1] : "missing json key: views"));
      t.filter = Jo(s), e.doChanges(t);
    });
  } else if (t.selector)
    t.filter = function(u) {
      return zo(u, t.selector);
    }, e.doChanges(t);
  else {
    var a = Bn(t.filter);
    e.db.get("_design/" + a[0], function(u, o) {
      if (e.isCancelled)
        return n(null, {
          status: "cancelled"
        });
      if (u)
        return n(dt(u));
      var s = o && o.filters && o.filters[a[1]];
      if (!s)
        return n(V(Ce, o && o.filters ? "missing json key: " + a[1] : "missing json key: filters"));
      t.filter = Ko(s), e.doChanges(t);
    });
  }
}
function Yo(e) {
  e._changesFilterPlugin = {
    validate: Qo,
    normalize: Go,
    shouldFilter: Wo,
    filter: Ho
  };
}
H.plugin(Yo);
H.version = yo;
function va(e) {
  return e.reduce(function(t, n) {
    return t[n] = !0, t;
  }, {});
}
var Xo = va([
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
]), Zo = va([
  "_access",
  "_attachments",
  "_replication_id",
  "_replication_state",
  "_replication_state_time",
  "_replication_state_reason",
  "_replication_stats"
]);
function Xr(e) {
  if (!/^\d+-/.test(e))
    return V(Yi);
  var t = e.indexOf("-"), n = e.substring(0, t), r = e.substring(t + 1);
  return {
    prefix: parseInt(n, 10),
    id: r
  };
}
function Vo(e, t) {
  for (var n = e.start - e.ids.length + 1, r = e.ids, i = [r[0], t, []], a = 1, u = r.length; a < u; a++)
    i = [r[a], {
      status: "missing"
    }, [i]];
  return [{
    pos: n,
    ids: i
  }];
}
function ha(e, t, n) {
  n || (n = {
    deterministic_revs: !0
  });
  var r, i, a, u = {
    status: "available"
  };
  if (e._deleted && (u.deleted = !0), t)
    if (e._id || (e._id = fn()), i = na(e, n.deterministic_revs), e._rev) {
      if (a = Xr(e._rev), a.error)
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
  else if (e._revisions && (e._rev_tree = Vo(e._revisions, u), r = e._revisions.start, i = e._revisions.ids[0]), !e._rev_tree) {
    if (a = Xr(e._rev), a.error)
      return a;
    r = a.prefix, i = a.id, e._rev_tree = [{
      pos: r,
      ids: [i, u, []]
    }];
  }
  Xi(e._id), e._rev = r + "-" + i;
  var o = {
    metadata: {},
    data: {}
  };
  for (var s in e)
    if (Object.prototype.hasOwnProperty.call(e, s)) {
      var _ = s[0] === "_";
      if (_ && !Xo[s]) {
        var b = V(Fr, s);
        throw b.message = Fr.message + ": " + s, b;
      } else
        _ && !Zo[s] ? o.metadata[s.slice(1)] = e[s] : o.data[s] = e[s];
    }
  return o;
}
function ef(e) {
  try {
    return vr(e);
  } catch (n) {
    var t = V(Hi, "Attachment is not a valid base64 string");
    return {
      error: t
    };
  }
}
function tf(e, t, n) {
  var r = ef(e.data);
  if (r.error)
    return n(r.error);
  e.length = r.length, t === "blob" ? e.data = yr(r, e.content_type) : t === "base64" ? e.data = Pt(r) : e.data = r, _r(r, function(i) {
    e.digest = "md5-" + i, n();
  });
}
function nf(e, t, n) {
  _r(e.data, function(r) {
    e.digest = "md5-" + r, e.length = e.data.size || e.data.length || 0, t === "binary" ? ea(e.data, function(i) {
      e.data = i, n();
    }) : t === "base64" ? pr(e.data, function(i) {
      e.data = i, n();
    }) : n();
  });
}
function rf(e, t, n) {
  if (e.stub)
    return n();
  typeof e.data == "string" ? tf(e, t, n) : nf(e, t, n);
}
function af(e, t, n) {
  if (!e.length)
    return n();
  var r = 0, i;
  e.forEach(function(u) {
    var o = u.data && u.data._attachments ? Object.keys(u.data._attachments) : [], s = 0;
    if (!o.length)
      return a();
    function _(c) {
      i = c, s++, s === o.length && a();
    }
    for (var b in u.data._attachments)
      Object.prototype.hasOwnProperty.call(u.data._attachments, b) && rf(u.data._attachments[b], t, _);
  });
  function a() {
    r++, e.length === r && (i ? n(i) : n());
  }
}
function uf(e, t, n, r, i, a, u, o) {
  if (eo(t.rev_tree, n.metadata.rev) && !o)
    return r[i] = n, a();
  var s = t.winningRev || Ye(t), _ = "deleted" in t ? t.deleted : Te(t, s), b = "deleted" in n.metadata ? n.metadata.deleted : Te(n.metadata), c = /^1-/.test(n.metadata.rev);
  if (_ && !b && o && c) {
    var m = n.data;
    m._rev = s, m._id = n.metadata.id, n = ha(m, o);
  }
  var O = aa(t.rev_tree, n.metadata.rev_tree[0], e), $ = o && (_ && b && O.conflicts !== "new_leaf" || !_ && O.conflicts !== "new_leaf" || _ && !b && O.conflicts === "new_branch");
  if ($) {
    var S = V(lt);
    return r[i] = S, a();
  }
  var A = n.metadata.rev;
  n.metadata.rev_tree = O.tree, n.stemmedRevs = O.stemmedRevs || [], t.rev_map && (n.metadata.rev_map = t.rev_map);
  var g = Ye(n.metadata), h = Te(n.metadata, g), f = _ === h ? 0 : _ < h ? -1 : 1, l;
  A === g ? l = h : l = Te(n.metadata, A), u(n, g, h, l, !0, f, i, a);
}
function of(e) {
  return e.metadata.rev_tree[0].ids[1].status === "missing";
}
function ff(e, t, n, r, i, a, u, o, s) {
  e = e || 1e3;
  function _(S, A, g) {
    var h = Ye(S.metadata), f = Te(S.metadata, h);
    if ("was_delete" in o && f)
      return a[A] = V(Ce, "deleted"), g();
    var l = b && of(S);
    if (l) {
      var d = V(lt);
      return a[A] = d, g();
    }
    var y = f ? 0 : 1;
    u(S, h, f, f, !1, y, A, g);
  }
  var b = o.new_edits, c = new we(), m = 0, O = t.length;
  function $() {
    ++m === O && s && s();
  }
  t.forEach(function(S, A) {
    if (S._id && Xe(S._id)) {
      var g = S._deleted ? "_removeLocal" : "_putLocal";
      n[g](S, {
        ctx: i
      }, function(f, l) {
        a[A] = f || l, $();
      });
      return;
    }
    var h = S.metadata.id;
    c.has(h) ? (O--, c.get(h).push([S, A])) : c.set(h, [[S, A]]);
  }), c.forEach(function(S, A) {
    var g = 0;
    function h() {
      ++g < S.length ? f() : $();
    }
    function f() {
      var l = S[g], d = l[0], y = l[1];
      if (r.has(A))
        uf(e, r.get(A), d, a, y, h, u, b);
      else {
        var j = aa([], d.metadata.rev_tree[0], e);
        d.metadata.rev_tree = j.tree, d.stemmedRevs = j.stemmedRevs || [], _(d, y, h);
      }
    }
    f();
  });
}
var sf = 5, fe = "document-store", pe = "by-sequence", $e = "attach-store", Ge = "attach-seq-store", me = "meta-store", je = "local-store", Nn = "detect-blob-support";
function cf(e) {
  try {
    return JSON.parse(e);
  } catch (t) {
    return tn.parse(e);
  }
}
function lf(e) {
  try {
    return JSON.stringify(e);
  } catch (t) {
    return tn.stringify(e);
  }
}
function Pe(e) {
  return function(t) {
    var n = "unknown_error";
    t.target && t.target.error && (n = t.target.error.name || t.target.error.message), e(V(cr, n, t.type));
  };
}
function Fn(e, t, n) {
  return {
    data: lf(e),
    winningRev: t,
    deletedOrLocal: n ? "1" : "0",
    seq: e.seq,
    id: e.id
  };
}
function We(e) {
  if (!e)
    return null;
  var t = cf(e.data);
  return t.winningRev = e.winningRev, t.deleted = e.deletedOrLocal === "1", t.seq = e.seq, t;
}
function Yt(e) {
  if (!e)
    return e;
  var t = e._doc_id_rev.lastIndexOf(":");
  return e._id = e._doc_id_rev.substring(0, t - 1), e._rev = e._doc_id_rev.substring(t + 1), delete e._doc_id_rev, e;
}
function ya(e, t, n, r) {
  n ? r(e ? typeof e != "string" ? e : gr(e, t) : hr([""], {
    type: t
  })) : e ? typeof e != "string" ? Vi(e, function(i) {
    r(Pt(i));
  }) : r(e) : r("");
}
function ga(e, t, n, r) {
  var i = Object.keys(e._attachments || {});
  if (!i.length)
    return r && r();
  var a = 0;
  function u() {
    ++a === i.length && r && r();
  }
  function o(s, _) {
    var b = s._attachments[_], c = b.digest, m = n.objectStore($e).get(c);
    m.onsuccess = function(O) {
      b.body = O.target.result.body, u();
    };
  }
  i.forEach(function(s) {
    t.attachments && t.include_docs ? o(e, s) : (e._attachments[s].stub = !0, u());
  });
}
function Mn(e, t) {
  return Promise.all(e.map(function(n) {
    if (n.doc && n.doc._attachments) {
      var r = Object.keys(n.doc._attachments);
      return Promise.all(r.map(function(i) {
        var a = n.doc._attachments[i];
        if ("body" in a) {
          var u = a.body, o = a.content_type;
          return new Promise(function(s) {
            ya(u, o, t, function(_) {
              n.doc._attachments[i] = He(It(a, ["digest", "content_type"]), {
                data: _
              }), s();
            });
          });
        }
      }));
    }
  }));
}
function pa(e, t, n) {
  var r = [], i = n.objectStore(pe), a = n.objectStore($e), u = n.objectStore(Ge), o = e.length;
  function s() {
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
        return s();
      i.delete($);
      var S = u.index("seq").openCursor(IDBKeyRange.only($));
      S.onsuccess = function(A) {
        var g = A.target.result;
        if (g) {
          var h = g.value.digestSeq.split("::")[0];
          r.push(h), u.delete(g.primaryKey), g.continue();
        } else
          s();
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
var $t = new vt();
function df(e, t, n, r, i, a) {
  for (var u = t.docs, o, s, _, b, c, m, O, $, S = 0, A = u.length; S < A; S++) {
    var g = u[S];
    g._id && Xe(g._id) || (g = u[S] = ha(g, n.new_edits, e), g.error && !O && (O = g));
  }
  if (O)
    return a(O);
  var h = !1, f = 0, l = new Array(u.length), d = new we(), y = !1, j = r._meta.blobSupport ? "blob" : "base64";
  af(u, j, function(C) {
    if (C)
      return a(C);
    R();
  });
  function R() {
    var C = [fe, pe, $e, je, Ge, me], I = Ee(i, C, "readwrite");
    if (I.error)
      return a(I.error);
    o = I.txn, o.onabort = Pe(a), o.ontimeout = Pe(a), o.oncomplete = Y, s = o.objectStore(fe), _ = o.objectStore(pe), b = o.objectStore($e), c = o.objectStore(Ge), m = o.objectStore(me), m.get(me).onsuccess = function(k) {
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
    ff(e.revs_limit, u, r, d, o, l, U, n, B);
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
      var F = We(E.target.result);
      F && d.set(F.id, F), I();
    }
    for (var P = 0, q = u.length; P < q; P++) {
      var T = u[P];
      if (T._id && Xe(T._id)) {
        I();
        continue;
      }
      var D = s.get(T.metadata.id);
      D.onsuccess = k;
    }
  }
  function Y() {
    y || ($t.notify(r._meta.name), a(null, l));
  }
  function J(C, I) {
    var k = b.get(C);
    k.onsuccess = function(P) {
      if (P.target.result)
        I();
      else {
        var q = V(Pu, "unknown stub attachment with digest " + C);
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
      P && r.auto_compaction && (z = z.concat(Wu(C.metadata))), z && z.length && pa(z, C.metadata.id, o), E.seq = N.target.result;
      var Q = Fn(E, I, k), ee = s.put(Q);
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
      var W = C.data._attachments[F].digest, te = c.put({
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
function _a(e, t, n, r, i) {
  r === -1 && (r = 1e3);
  var a = typeof e.getAll == "function" && typeof e.getAllKeys == "function" && r > 1 && !n, u, o, s;
  function _(O) {
    o = O.target.result, u && i(u, o, s);
  }
  function b(O) {
    u = O.target.result, o && i(u, o, s);
  }
  function c() {
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
  a ? (s = {
    continue: c
  }, e.getAll(t, r).onsuccess = _, e.getAllKeys(t, r).onsuccess = b) : n ? e.openCursor(t, "prev").onsuccess = m : e.openCursor(t).onsuccess = m;
}
function vf(e, t, n) {
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
function hf(e, t, n) {
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
function yf(e, t, n, r, i) {
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
function gf(e, t, n) {
  var r = "startkey" in e ? e.startkey : !1, i = "endkey" in e ? e.endkey : !1, a = "key" in e ? e.key : !1, u = "keys" in e ? e.keys : !1, o = e.skip || 0, s = typeof e.limit == "number" ? e.limit : -1, _ = e.inclusive_end !== !1, b, c;
  if (!u && (b = yf(r, i, _, a, e.descending), c = b && b.error, c && !(c.name === "DataError" && c.code === 0)))
    return n(V(cr, c.name, c.message));
  var m = [fe, pe, me];
  e.attachments && m.push($e);
  var O = Ee(t, m, "readonly");
  if (O.error)
    return n(O.error);
  var $ = O.txn;
  $.oncomplete = Y, $.onabort = Pe(n);
  var S = $.objectStore(fe), A = $.objectStore(pe), g = $.objectStore(me), h = A.index("_doc_id_rev"), f = [], l, d;
  g.get(me).onsuccess = function(J) {
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
      if (G.doc = Yt(w.target.result) || {}, e.conflicts) {
        var x = wr(J);
        x.length && (G.doc._conflicts = x);
      }
      ga(G.doc, e, $);
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
    for (var G = 0, U = J.length; G < U && f.length !== s; G++) {
      var v = J[G];
      if (v.error && u) {
        f.push(v);
        continue;
      }
      var p = We(v), w = p.winningRev;
      R(w, p);
    }
  }
  function L(J, G, U) {
    !U || (B(G), f.length < s && U.continue());
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
    e.attachments ? Mn(f, e.binary).then(Z) : Z();
  }
  if (!(c || s === 0)) {
    if (u)
      return hf(e.keys, S, L);
    if (s === -1)
      return vf(S, b, K);
    _a(S, b, e.descending, s + o, L);
  }
}
function pf(e) {
  return new Promise(function(t) {
    var n = hr([""]), r = e.objectStore(Nn).put(n, "key");
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
function _f(e, t) {
  var n = e.objectStore(fe).index("deletedOrLocal");
  n.count(IDBKeyRange.only("0")).onsuccess = function(r) {
    t(r.target.result);
  };
}
var Un = !1, zn = [];
function mf(e, t, n, r) {
  try {
    e(t, n);
  } catch (i) {
    r.emit("error", i);
  }
}
function Zr() {
  Un || !zn.length || (Un = !0, zn.shift()());
}
function wf(e, t, n) {
  zn.push(function() {
    e(function(a, u) {
      mf(t, a, u, n), Un = !1, _e(function() {
        Zr();
      });
    });
  }), Zr();
}
function bf(e, t, n, r) {
  if (e = de(e), e.continuous) {
    var i = n + ":" + fn();
    return $t.addListener(n, i, t, e), $t.notify(n), {
      cancel: function() {
        $t.removeListener(n, i);
      }
    };
  }
  var a = e.doc_ids && new ct(e.doc_ids);
  e.since = e.since || 0;
  var u = e.since, o = "limit" in e ? e.limit : -1;
  o === 0 && (o = 1);
  var s = [], _ = 0, b = lr(e), c = new we(), m, O, $, S;
  function A(R, B, L) {
    if (!L || !R.length)
      return;
    var K = new Array(R.length), Z = new Array(R.length);
    function Y(U, v) {
      var p = e.processChange(v, U, e);
      u = p.seq = U.seq;
      var w = b(p);
      return typeof w == "object" ? Promise.reject(w) : w ? (_++, e.return_docs && s.push(p), e.attachments && e.include_docs ? new Promise(function(x) {
        ga(v, e, m, function() {
          Mn([p], e.binary).then(function() {
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
      var p = Yt(U), w = R[v];
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
      K(L, Yt(J.target.result));
    };
  }
  function h(R, B, L) {
    if (a && !a.has(R._id))
      return L();
    var K = c.get(R._id);
    if (K)
      return g(R, B, K, L);
    $.get(R._id).onsuccess = function(Z) {
      K = We(Z.target.result), c.set(R._id, K), g(R, B, K, L);
    };
  }
  function f() {
    e.complete(null, {
      results: s,
      last_seq: u
    });
  }
  function l() {
    !e.continuous && e.attachments ? Mn(s).then(f) : f();
  }
  var d = [fe, pe];
  e.attachments && d.push($e);
  var y = Ee(r, d, "readonly");
  if (y.error)
    return e.complete(y.error);
  m = y.txn, m.onabort = Pe(e.complete), m.oncomplete = l, O = m.objectStore(pe), $ = m.objectStore(fe), S = O.index("_doc_id_rev");
  var j = e.since && !e.descending ? IDBKeyRange.lowerBound(e.since, !0) : null;
  _a(O, j, e.descending, o, A);
}
var rt = new we(), pn, _n = new we();
function ma(e, t) {
  var n = this;
  wf(function(r) {
    $f(n, e, r);
  }, t, n.constructor);
}
function $f(e, t, n) {
  var r = t.name, i = null, a = null;
  e._meta = null;
  function u(A) {
    return function(g, h) {
      g && g instanceof Error && !g.reason && a && (g.reason = a), A(g, h);
    };
  }
  function o(A) {
    var g = A.createObjectStore(fe, {
      keyPath: "id"
    });
    A.createObjectStore(pe, {
      autoIncrement: !0
    }).createIndex("_doc_id_rev", "_doc_id_rev", {
      unique: !0
    }), A.createObjectStore($e, {
      keyPath: "digest"
    }), A.createObjectStore(me, {
      keyPath: "id",
      autoIncrement: !1
    }), A.createObjectStore(Nn), g.createIndex("deletedOrLocal", "deletedOrLocal", {
      unique: !1
    }), A.createObjectStore(je, {
      keyPath: "_id"
    });
    var h = A.createObjectStore(Ge, {
      autoIncrement: !0
    });
    h.createIndex("seq", "seq"), h.createIndex("digestSeq", "digestSeq", {
      unique: !0
    });
  }
  function s(A, g) {
    var h = A.objectStore(fe);
    h.createIndex("deletedOrLocal", "deletedOrLocal", {
      unique: !1
    }), h.openCursor().onsuccess = function(f) {
      var l = f.target.result;
      if (l) {
        var d = l.value, y = Te(d);
        d.deletedOrLocal = y ? "1" : "0", h.put(d), l.continue();
      } else
        g();
    };
  }
  function _(A) {
    A.createObjectStore(je, {
      keyPath: "_id"
    }).createIndex("_doc_id_rev", "_doc_id_rev", {
      unique: !0
    });
  }
  function b(A, g) {
    var h = A.objectStore(je), f = A.objectStore(fe), l = A.objectStore(pe), d = f.openCursor();
    d.onsuccess = function(y) {
      var j = y.target.result;
      if (j) {
        var R = j.value, B = R.id, L = Xe(B), K = Ye(R);
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
  function c(A) {
    var g = A.createObjectStore(Ge, {
      autoIncrement: !0
    });
    g.createIndex("seq", "seq"), g.createIndex("digestSeq", "digestSeq", {
      unique: !0
    });
  }
  function m(A, g) {
    var h = A.objectStore(pe), f = A.objectStore($e), l = A.objectStore(Ge), d = f.count();
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
      return d.data ? We(d) : (d.deleted = d.deletedOrLocal === "1", d);
    }
    var h = A.objectStore(pe), f = A.objectStore(fe), l = f.openCursor();
    l.onsuccess = function(d) {
      var y = d.target.result;
      if (!y)
        return;
      var j = g(y.value);
      j.winningRev = j.winningRev || Ye(j);
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
        var L = Fn(j, j.winningRev, j.deleted), K = f.put(L);
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
  }, e._id = Ji(function(A) {
    A(null, e._meta.instanceId);
  }), e._bulkDocs = function(g, h, f) {
    df(t, g, h, e, i, u(f));
  }, e._get = function(g, h, f) {
    var l, d, y, j = h.ctx;
    if (!j) {
      var R = Ee(i, [fe, pe, $e], "readonly");
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
    j.objectStore(fe).get(g).onsuccess = function(L) {
      if (d = We(L.target.result), !d)
        return y = V(Ce, "missing"), B();
      var K;
      if (h.rev)
        K = h.latest ? no(h.rev, d) : h.rev;
      else {
        K = d.winningRev;
        var Z = Te(d);
        if (Z)
          return y = V(Ce, "deleted"), B();
      }
      var Y = j.objectStore(pe), J = d.id + "::" + K;
      Y.index("_doc_id_rev").get(J).onsuccess = function(G) {
        if (l = G.target.result, l && (l = Yt(l)), !l)
          return y = V(Ce, "missing"), B();
        B();
      };
    };
  }, e._getAttachment = function(A, g, h, f, l) {
    var d;
    if (f.ctx)
      d = f.ctx;
    else {
      var y = Ee(i, [fe, pe, $e], "readonly");
      if (y.error)
        return l(y.error);
      d = y.txn;
    }
    var j = h.digest, R = h.content_type;
    d.objectStore($e).get(j).onsuccess = function(B) {
      var L = B.target.result.body;
      ya(L, R, f.binary, function(K) {
        l(null, K);
      });
    };
  }, e._info = function(g) {
    var h, f, l = Ee(i, [me, pe], "readonly");
    if (l.error)
      return g(l.error);
    var d = l.txn;
    d.objectStore(me).get(me).onsuccess = function(y) {
      f = y.target.result.docCount;
    }, d.objectStore(pe).openCursor(null, "prev").onsuccess = function(y) {
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
    gf(g, i, u(h));
  }, e._changes = function(g) {
    return bf(g, e, r, i);
  }, e._close = function(A) {
    i.close(), rt.delete(r), A();
  }, e._getRevisionTree = function(A, g) {
    var h = Ee(i, [fe], "readonly");
    if (h.error)
      return g(h.error);
    var f = h.txn, l = f.objectStore(fe).get(A);
    l.onsuccess = function(d) {
      var y = We(d.target.result);
      y ? g(null, y.rev_tree) : g(V(Ce));
    };
  }, e._doCompaction = function(A, g, h) {
    var f = [fe, pe, $e, Ge], l = Ee(i, f, "readwrite");
    if (l.error)
      return h(l.error);
    var d = l.txn, y = d.objectStore(fe);
    y.get(A).onsuccess = function(j) {
      var R = We(j.target.result);
      tt(R.rev_tree, function(K, Z, Y, J, G) {
        var U = Z + "-" + Y;
        g.indexOf(U) !== -1 && (G.status = "missing");
      }), pa(g, A, d);
      var B = R.winningRev, L = R.deleted;
      d.objectStore(fe).put(Fn(R, B, L));
    }, d.onabort = Pe(h), d.oncomplete = function() {
      h();
    };
  }, e._getLocal = function(A, g) {
    var h = Ee(i, [je], "readonly");
    if (h.error)
      return g(h.error);
    var f = h.txn, l = f.objectStore(je).get(A);
    l.onerror = Pe(g), l.onsuccess = function(d) {
      var y = d.target.result;
      y ? (delete y._doc_id_rev, g(null, y)) : g(V(Ce));
    };
  }, e._putLocal = function(A, g, h) {
    typeof g == "function" && (h = g, g = {}), delete A._revisions;
    var f = A._rev, l = A._id;
    f ? A._rev = "0-" + (parseInt(f.split("-")[1], 10) + 1) : A._rev = "0-1";
    var d = g.ctx, y;
    if (!d) {
      var j = Ee(i, [je], "readwrite");
      if (j.error)
        return h(j.error);
      d = j.txn, d.onerror = Pe(h), d.oncomplete = function() {
        y && h(null, y);
      };
    }
    var R = d.objectStore(je), B;
    f ? (B = R.get(l), B.onsuccess = function(L) {
      var K = L.target.result;
      if (!K || K._rev !== f)
        h(V(lt));
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
      h(V(lt)), L.preventDefault(), L.stopPropagation();
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
      var l = Ee(i, [je], "readwrite");
      if (l.error)
        return h(l.error);
      f = l.txn, f.oncomplete = function() {
        d && h(null, d);
      };
    }
    var d, y = A._id, j = f.objectStore(je), R = j.get(y);
    R.onerror = Pe(h), R.onsuccess = function(B) {
      var L = B.target.result;
      !L || L._rev !== A._rev ? h(V(Ce)) : (j.delete(y), d = {
        ok: !0,
        id: y,
        rev: "0-0"
      }, g.ctx && h(null, d));
    };
  }, e._destroy = function(A, g) {
    $t.removeAllListeners(r);
    var h = _n.get(r);
    h && h.result && (h.result.close(), rt.delete(r));
    var f = indexedDB.deleteDatabase(r);
    f.onsuccess = function() {
      _n.delete(r), an() && r in localStorage && delete localStorage[r], g(null, {
        ok: !0
      });
    }, f.onerror = Pe(g);
  };
  var $ = rt.get(r);
  if ($)
    return i = $.idb, e._meta = $.global, _e(function() {
      n(null, e);
    });
  var S = indexedDB.open(r, sf);
  _n.set(r, S), S.onupgradeneeded = function(A) {
    var g = A.target.result;
    if (A.oldVersion < 1)
      return o(g);
    var h = A.currentTarget.transaction;
    A.oldVersion < 3 && _(g), A.oldVersion < 4 && c(g);
    var f = [
      s,
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
      i.close(), rt.delete(r);
    }, i.onabort = function(B) {
      Ae("error", "Database has a false failure", B.target.error), a = B.target.error, i.close(), rt.delete(r);
    };
    var g = i.transaction([me, Nn, fe], "readwrite"), h = !1, f, l, d, y;
    function j() {
      typeof d == "undefined" || !h || (e._meta = {
        name: r,
        instanceId: y,
        blobSupport: d
      }, rt.set(r, {
        idb: i,
        false: e._meta
      }), n(null, e));
    }
    function R() {
      if (!(typeof l == "undefined" || typeof f == "undefined")) {
        var B = r + "_id";
        B in f ? y = f[B] : f[B] = y = fn(), f.docCount = l, g.objectStore(me).put(f);
      }
    }
    g.objectStore(me).get(me).onsuccess = function(B) {
      f = B.target.result || {
        id: me
      }, R();
    }, _f(g, function(B) {
      l = B, R();
    }), pn || (pn = pf(g)), pn.then(function(B) {
      d = B, j();
    }), g.oncomplete = function() {
      h = !0, j();
    }, g.onabort = Pe(n);
  }, S.onerror = function(A) {
    var g = A.target.error && A.target.error.message;
    g ? g.indexOf("stored database is a higher version") !== -1 && (g = new Error('This DB was created with the newer "indexeddb" adapter, but you are trying to open it with the older "idb" adapter')) : g = "Failed to open indexedDB, are you in private browsing mode?", Ae("error", g), n(V(cr, g));
  };
}
ma.valid = function() {
  try {
    return typeof indexedDB != "undefined" && typeof IDBKeyRange != "undefined";
  } catch (e) {
    return !1;
  }
};
function Af(e) {
  e.adapter("idb", ma, !0);
}
function Of(e, t) {
  return new Promise(function(n, r) {
    var i = 0, a = 0, u = 0, o = e.length, s;
    function _() {
      i++, e[a++]().then(c, m);
    }
    function b() {
      ++u === o ? s ? r(s) : n() : O();
    }
    function c() {
      i--, b();
    }
    function m($) {
      i--, s = s || $, b();
    }
    function O() {
      for (; i < t && a < o; )
        _();
    }
    O();
  });
}
var Sf = 25, xf = 50, Ut = 5e3, Ef = 1e4, mn = {};
function wn(e) {
  var t = e.doc || e.ok, n = t && t._attachments;
  !n || Object.keys(n).forEach(function(r) {
    var i = n[r];
    i.data = gr(i.data, i.content_type);
  });
}
function Ue(e) {
  return /^_design/.test(e) ? "_design/" + encodeURIComponent(e.slice(8)) : /^_local/.test(e) ? "_local/" + encodeURIComponent(e.slice(7)) : encodeURIComponent(e);
}
function Vr(e) {
  return !e._attachments || !Object.keys(e._attachments) ? Promise.resolve() : Promise.all(Object.keys(e._attachments).map(function(t) {
    var n = e._attachments[t];
    if (n.data && typeof n.data != "string")
      return new Promise(function(r) {
        pr(n.data, r);
      }).then(function(r) {
        n.data = r;
      });
  }));
}
function kf(e) {
  if (!e.prefix)
    return !1;
  var t = Zi(e.prefix).protocol;
  return t === "http" || t === "https";
}
function Cf(e, t) {
  if (kf(t)) {
    var n = t.name.substr(t.prefix.length), r = t.prefix.replace(/\/?$/, "/");
    e = r + encodeURIComponent(n);
  }
  var i = Zi(e);
  (i.user || i.password) && (i.auth = {
    username: i.user,
    password: i.password
  });
  var a = i.path.replace(/(^\/|\/$)/g, "").split("/");
  return i.db = a.pop(), i.db.indexOf("%") === -1 && (i.db = encodeURIComponent(i.db)), i.path = a.join("/"), i;
}
function le(e, t) {
  return Jt(e, e.db + "/" + t);
}
function Jt(e, t) {
  var n = e.path ? "/" : "";
  return e.protocol + "://" + e.host + (e.port ? ":" + e.port : "") + "/" + e.path + n + t;
}
function zt(e) {
  return "?" + Object.keys(e).map(function(t) {
    return t + "=" + encodeURIComponent(e[t]);
  }).join("&");
}
function jf(e) {
  var t = typeof navigator != "undefined" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "", n = t.indexOf("msie") !== -1, r = t.indexOf("trident") !== -1, i = t.indexOf("edge") !== -1, a = !("method" in e) || e.method === "GET";
  return (n || r || i) && a;
}
function Kn(e, t) {
  var n = this, r = Cf(e.name, e), i = le(r, "");
  e = de(e);
  var a = function(c, m) {
    if (m = m || {}, m.headers = m.headers || new ot(), m.credentials = "include", e.auth || r.auth) {
      var O = e.auth || r.auth, $ = O.username + ":" + O.password, S = Pt(unescape(encodeURIComponent($)));
      m.headers.set("Authorization", "Basic " + S);
    }
    var A = e.headers || {};
    Object.keys(A).forEach(function(h) {
      m.headers.append(h, A[h]);
    }), jf(m) && (c += (c.indexOf("?") === -1 ? "?" : "&") + "_nonce=" + Date.now());
    var g = e.fetch || oa;
    return g(c, m);
  };
  function u(c, m) {
    return ce(c, Be(function(O) {
      _().then(function() {
        return m.apply(this, O);
      }).catch(function($) {
        var S = O.pop();
        S($);
      });
    })).bind(n);
  }
  function o(c, m, O) {
    var $ = {};
    return m = m || {}, m.headers = m.headers || new ot(), m.headers.get("Content-Type") || m.headers.set("Content-Type", "application/json"), m.headers.get("Accept") || m.headers.set("Accept", "application/json"), a(c, m).then(function(S) {
      return $.ok = S.ok, $.status = S.status, S.json();
    }).then(function(S) {
      if ($.data = S, !$.ok) {
        $.data.status = $.status;
        var A = dt($.data);
        if (O)
          return O(A);
        throw A;
      }
      if (Array.isArray($.data) && ($.data = $.data.map(function(g) {
        return g.error || g.missing ? dt(g) : g;
      })), O)
        O(null, $.data);
      else
        return $;
    });
  }
  var s;
  function _() {
    return e.skip_setup ? Promise.resolve() : s || (s = o(i).catch(function(c) {
      return c && c.status && c.status === 404 ? (qn(404, "PouchDB is just detecting if the remote exists."), o(i, {
        method: "PUT"
      })) : Promise.reject(c);
    }).catch(function(c) {
      return c && c.status && c.status === 412 ? !0 : Promise.reject(c);
    }), s.catch(function() {
      s = null;
    }), s);
  }
  _e(function() {
    t(null, n);
  }), n._remote = !0, n.type = function() {
    return "http";
  }, n.id = u("id", function(c) {
    a(Jt(r, "")).then(function(m) {
      return m.json();
    }).catch(function() {
      return {};
    }).then(function(m) {
      var O = m && m.uuid ? m.uuid + r.db : le(r, "");
      c(null, O);
    });
  }), n.compact = u("compact", function(c, m) {
    typeof c == "function" && (m = c, c = {}), c = de(c), o(le(r, "_compact"), {
      method: "POST"
    }).then(function() {
      function O() {
        n.info(function($, S) {
          S && !S.compact_running ? m(null, {
            ok: !0
          }) : setTimeout(O, c.interval || 200);
        });
      }
      O();
    });
  }), n.bulkGet = ce("bulkGet", function(c, m) {
    var O = this;
    function $(h) {
      var f = {};
      c.revs && (f.revs = !0), c.attachments && (f.attachments = !0), c.latest && (f.latest = !0), o(le(r, "_bulk_get" + zt(f)), {
        method: "POST",
        body: JSON.stringify({
          docs: c.docs
        })
      }).then(function(l) {
        c.attachments && c.binary && l.data.results.forEach(function(d) {
          d.docs.forEach(wn);
        }), h(null, l.data);
      }).catch(h);
    }
    function S() {
      var h = xf, f = Math.ceil(c.docs.length / h), l = 0, d = new Array(f);
      function y(B) {
        return function(L, K) {
          d[B] = K.results, ++l === f && m(null, {
            results: Wt(d)
          });
        };
      }
      for (var j = 0; j < f; j++) {
        var R = It(c, ["revs", "attachments", "binary", "latest"]);
        R.docs = c.docs.slice(j * h, Math.min(c.docs.length, (j + 1) * h)), Qi(O, R, y(j));
      }
    }
    var A = Jt(r, ""), g = mn[A];
    typeof g != "boolean" ? $(function(h, f) {
      h ? (mn[A] = !1, qn(h.status, "PouchDB is just detecting if the remote supports the _bulk_get API."), S()) : (mn[A] = !0, m(null, f));
    }) : g ? $(m) : S();
  }), n._info = function(c) {
    _().then(function() {
      return a(le(r, ""));
    }).then(function(m) {
      return m.json();
    }).then(function(m) {
      m.host = le(r, ""), c(null, m);
    }).catch(c);
  }, n.fetch = function(c, m) {
    return _().then(function() {
      var O = c.substring(0, 1) === "/" ? Jt(r, c.substring(1)) : le(r, c);
      return a(O, m);
    });
  }, n.get = u("get", function(c, m, O) {
    typeof m == "function" && (O = m, m = {}), m = de(m);
    var $ = {};
    m.revs && ($.revs = !0), m.revs_info && ($.revs_info = !0), m.latest && ($.latest = !0), m.open_revs && (m.open_revs !== "all" && (m.open_revs = JSON.stringify(m.open_revs)), $.open_revs = m.open_revs), m.rev && ($.rev = m.rev), m.conflicts && ($.conflicts = m.conflicts), m.update_seq && ($.update_seq = m.update_seq), c = Ue(c);
    function S(h) {
      var f = h._attachments, l = f && Object.keys(f);
      if (!f || !l.length)
        return;
      function d(j) {
        var R = f[j], B = Ue(h._id) + "/" + b(j) + "?rev=" + h._rev;
        return a(le(r, B)).then(function(L) {
          return "buffer" in L ? L.buffer() : L.blob();
        }).then(function(L) {
          if (m.binary) {
            var K = Object.getOwnPropertyDescriptor(L.__proto__, "type");
            return (!K || K.set) && (L.type = R.content_type), L;
          }
          return new Promise(function(Z) {
            pr(L, Z);
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
      return Of(y, 5);
    }
    function A(h) {
      return Array.isArray(h) ? Promise.all(h.map(function(f) {
        if (f.ok)
          return S(f.ok);
      })) : S(h);
    }
    var g = le(r, c + zt($));
    o(g).then(function(h) {
      return Promise.resolve().then(function() {
        if (m.attachments)
          return A(h.data);
      }).then(function() {
        O(null, h.data);
      });
    }).catch(function(h) {
      h.docId = c, O(h);
    });
  }), n.remove = u("remove", function(c, m, O, $) {
    var S;
    typeof m == "string" ? (S = {
      _id: c,
      _rev: m
    }, typeof O == "function" && ($ = O, O = {})) : (S = c, typeof m == "function" ? ($ = m, O = {}) : ($ = O, O = m));
    var A = S._rev || O.rev, g = le(r, Ue(S._id)) + "?rev=" + A;
    o(g, {
      method: "DELETE"
    }, $).catch($);
  });
  function b(c) {
    return c.split("/").map(encodeURIComponent).join("/");
  }
  n.getAttachment = u("getAttachment", function(c, m, O, $) {
    typeof O == "function" && ($ = O, O = {});
    var S = O.rev ? "?rev=" + O.rev : "", A = le(r, Ue(c)) + "/" + b(m) + S, g;
    a(A, {
      method: "GET"
    }).then(function(h) {
      if (g = h.headers.get("content-type"), h.ok)
        return typeof process != "undefined" && !process.browser && typeof h.buffer == "function" ? h.buffer() : h.blob();
      throw h;
    }).then(function(h) {
      typeof process != "undefined" && !process.browser && (h.type = g), $(null, h);
    }).catch(function(h) {
      $(h);
    });
  }), n.removeAttachment = u("removeAttachment", function(c, m, O, $) {
    var S = le(r, Ue(c) + "/" + b(m)) + "?rev=" + O;
    o(S, {
      method: "DELETE"
    }, $).catch($);
  }), n.putAttachment = u("putAttachment", function(c, m, O, $, S, A) {
    typeof S == "function" && (A = S, S = $, $ = O, O = null);
    var g = Ue(c) + "/" + b(m), h = le(r, g);
    if (O && (h += "?rev=" + O), typeof $ == "string") {
      var f;
      try {
        f = vr($);
      } catch (l) {
        return A(V(Hi, "Attachment is not a valid base64 string"));
      }
      $ = f ? yr(f, S) : "";
    }
    o(h, {
      headers: new ot({
        "Content-Type": S
      }),
      method: "PUT",
      body: $
    }, A).catch(A);
  }), n._bulkDocs = function(c, m, O) {
    c.new_edits = m.new_edits, _().then(function() {
      return Promise.all(c.docs.map(Vr));
    }).then(function() {
      return o(le(r, "_bulk_docs"), {
        method: "POST",
        body: JSON.stringify(c)
      }, O);
    }).catch(O);
  }, n._put = function(c, m, O) {
    _().then(function() {
      return Vr(c);
    }).then(function() {
      return o(le(r, Ue(c._id)), {
        method: "PUT",
        body: JSON.stringify(c)
      });
    }).then(function($) {
      O(null, $.data);
    }).catch(function($) {
      $.docId = c && c._id, O($);
    });
  }, n.allDocs = u("allDocs", function(c, m) {
    typeof c == "function" && (m = c, c = {}), c = de(c);
    var O = {}, $, S = "GET";
    c.conflicts && (O.conflicts = !0), c.update_seq && (O.update_seq = !0), c.descending && (O.descending = !0), c.include_docs && (O.include_docs = !0), c.attachments && (O.attachments = !0), c.key && (O.key = JSON.stringify(c.key)), c.start_key && (c.startkey = c.start_key), c.startkey && (O.startkey = JSON.stringify(c.startkey)), c.end_key && (c.endkey = c.end_key), c.endkey && (O.endkey = JSON.stringify(c.endkey)), typeof c.inclusive_end != "undefined" && (O.inclusive_end = !!c.inclusive_end), typeof c.limit != "undefined" && (O.limit = c.limit), typeof c.skip != "undefined" && (O.skip = c.skip);
    var A = zt(O);
    typeof c.keys != "undefined" && (S = "POST", $ = {
      keys: c.keys
    }), o(le(r, "_all_docs" + A), {
      method: S,
      body: JSON.stringify($)
    }).then(function(g) {
      c.include_docs && c.attachments && c.binary && g.data.rows.forEach(wn), m(null, g.data);
    }).catch(m);
  }), n._changes = function(c) {
    var m = "batch_size" in c ? c.batch_size : Sf;
    c = de(c), c.continuous && !("heartbeat" in c) && (c.heartbeat = Ef);
    var O = "timeout" in c ? c.timeout : 30 * 1e3;
    "timeout" in c && c.timeout && O - c.timeout < Ut && (O = c.timeout + Ut), "heartbeat" in c && c.heartbeat && O - c.heartbeat < Ut && (O = c.heartbeat + Ut);
    var $ = {};
    "timeout" in c && c.timeout && ($.timeout = c.timeout);
    var S = typeof c.limit != "undefined" ? c.limit : !1, A = S;
    if (c.style && ($.style = c.style), (c.include_docs || c.filter && typeof c.filter == "function") && ($.include_docs = !0), c.attachments && ($.attachments = !0), c.continuous && ($.feed = "longpoll"), c.seq_interval && ($.seq_interval = c.seq_interval), c.conflicts && ($.conflicts = !0), c.descending && ($.descending = !0), c.update_seq && ($.update_seq = !0), "heartbeat" in c && c.heartbeat && ($.heartbeat = c.heartbeat), c.filter && typeof c.filter == "string" && ($.filter = c.filter), c.view && typeof c.view == "string" && ($.filter = "_view", $.view = c.view), c.query_params && typeof c.query_params == "object")
      for (var g in c.query_params)
        Object.prototype.hasOwnProperty.call(c.query_params, g) && ($[g] = c.query_params[g]);
    var h = "GET", f;
    c.doc_ids ? ($.filter = "_doc_ids", h = "POST", f = {
      doc_ids: c.doc_ids
    }) : c.selector && ($.filter = "_selector", h = "POST", f = {
      selector: c.selector
    });
    var l = new vo(), d, y = function(B, L) {
      if (!c.aborted) {
        $.since = B, typeof $.since == "object" && ($.since = JSON.stringify($.since)), c.descending ? S && ($.limit = A) : $.limit = !S || A > m ? m : A;
        var K = le(r, "_changes" + zt($)), Z = {
          signal: l.signal,
          method: h,
          body: JSON.stringify(f)
        };
        d = B, !c.aborted && _().then(function() {
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
          var J = {};
          J.query = c.query_params, L.results = L.results.filter(function(U) {
            A--;
            var v = lr(c)(U);
            return v && (c.include_docs && c.attachments && c.binary && wn(U), c.return_docs && j.results.push(U), c.onChange(U, Z, Y)), v;
          });
        } else if (B) {
          c.aborted = !0, c.complete(B);
          return;
        }
        L && L.last_seq && (d = L.last_seq);
        var G = S && A <= 0 || L && K < m || c.descending;
        c.continuous && !(S && A <= 0) || !G ? _e(function() {
          y(d, R);
        }) : c.complete(null, j);
      }
    };
    return y(c.since || 0, R), {
      cancel: function() {
        c.aborted = !0, l.abort();
      }
    };
  }, n.revsDiff = u("revsDiff", function(c, m, O) {
    typeof m == "function" && (O = m, m = {}), o(le(r, "_revs_diff"), {
      method: "POST",
      body: JSON.stringify(c)
    }, O).catch(O);
  }), n._close = function(c) {
    c();
  }, n._destroy = function(c, m) {
    o(le(r, ""), {
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
Kn.valid = function() {
  return !0;
};
function If(e) {
  e.adapter("http", Kn, !1), e.adapter("https", Kn, !1);
}
function Ke(e) {
  this.status = 400, this.name = "query_parse_error", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, Ke);
  } catch (t) {
  }
}
he.exports(Ke, Error);
function sn(e) {
  this.status = 404, this.name = "not_found", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, sn);
  } catch (t) {
  }
}
he.exports(sn, Error);
function cn(e) {
  this.status = 500, this.name = "invalid_value", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, cn);
  } catch (t) {
  }
}
he.exports(cn, Error);
function wa(e, t) {
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
function Pf(e) {
  return Be(function(t) {
    var n = t.pop(), r = e.apply(this, t);
    return typeof n == "function" && wa(r, n), r;
  });
}
function qf(e, t) {
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
function bn(e, t) {
  return function() {
    var n = arguments, r = this;
    return e.add(function() {
      return t.apply(r, n);
    });
  };
}
function ei(e) {
  var t = new ct(e), n = new Array(t.size), r = -1;
  return t.forEach(function(i) {
    n[++r] = i;
  }), n;
}
function $n(e) {
  var t = new Array(e.size), n = -1;
  return e.forEach(function(r, i) {
    t[++n] = i;
  }), t;
}
function ti(e) {
  var t = "builtin " + e + " function requires map values to be numbers or number arrays";
  return new cn(t);
}
function Jn(e) {
  for (var t = 0, n = 0, r = e.length; n < r; n++) {
    var i = e[n];
    if (typeof i != "number")
      if (Array.isArray(i)) {
        t = typeof t == "number" ? [t] : t;
        for (var a = 0, u = i.length; a < u; a++) {
          var o = i[a];
          if (typeof o != "number")
            throw ti("_sum");
          typeof t[a] == "undefined" ? t.push(o) : t[a] += o;
        }
      } else
        throw ti("_sum");
    else
      typeof t == "number" ? t += i : t[0] += i;
  }
  return t;
}
var Tf = Ae.bind(null, "log"), Bf = Array.isArray, Rf = JSON.parse;
function ba(e, t) {
  return dr("return (" + e.replace(/;\s*$/, "") + ");", {
    emit: t,
    sum: Jn,
    log: Tf,
    isArray: Bf,
    toJSON: Rf
  });
}
function Ot() {
  this.promise = new Promise(function(e) {
    e();
  });
}
Ot.prototype.add = function(e) {
  return this.promise = this.promise.catch(function() {
  }).then(function() {
    return e();
  }), this.promise;
};
Ot.prototype.finish = function() {
  return this.promise;
};
function ni(e) {
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
function Lf(e, t) {
  return ni(e) + ni(t) + "undefined";
}
function ri(e, t, n, r, i, a) {
  var u = Lf(n, r), o;
  if (!i && (o = e._cachedViews = e._cachedViews || {}, o[u]))
    return o[u];
  var s = e.info().then(function(_) {
    var b = _.db_name + "-mrview-" + (i ? "temp" : ta(u));
    function c(m) {
      m.views = m.views || {};
      var O = t;
      O.indexOf("/") === -1 && (O = t + "/" + t);
      var $ = m.views[O] = m.views[O] || {};
      if (!$[b])
        return $[b] = !0, m;
    }
    return on(e, "_local/" + a, c).then(function() {
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
  return o && (o[u] = s), s;
}
var ii = {}, ai = new Ot(), Df = 50;
function An(e) {
  return e.indexOf("/") === -1 ? [e, e] : e.split("/");
}
function Nf(e) {
  return e.length === 1 && /^1-/.test(e[0].rev);
}
function ui(e, t) {
  try {
    e.emit("error", t);
  } catch (n) {
    Ae("error", `The user's map/reduce function threw an uncaught error.
You can debug this error by doing:
myDatabase.on('error', function (err) { debugger; });
Please double-check your map/reduce function.`), Ae("error", t);
  }
}
function Ff(e, t, n, r) {
  function i(v, p, w) {
    try {
      p(w);
    } catch (x) {
      ui(v, x);
    }
  }
  function a(v, p, w, x, C) {
    try {
      return {
        output: p(w, x, C)
      };
    } catch (I) {
      return ui(v, I), {
        error: I
      };
    }
  }
  function u(v, p) {
    var w = oe(v.key, p.key);
    return w !== 0 ? w : oe(v.value, p.value);
  }
  function o(v, p, w) {
    return w = w || 0, typeof p == "number" ? v.slice(w, p + w) : w > 0 ? v.slice(w) : v;
  }
  function s(v) {
    var p = v.value, w = p && typeof p == "object" && p._id || v.id;
    return w;
  }
  function _(v) {
    v.rows.forEach(function(p) {
      var w = p.doc && p.doc._attachments;
      !w || Object.keys(w).forEach(function(x) {
        var C = w[x];
        w[x].data = gr(C.data, C.content_type);
      });
    });
  }
  function b(v) {
    return function(p) {
      return v.include_docs && v.attachments && v.binary && _(p), p;
    };
  }
  function c(v, p, w, x) {
    var C = p[v];
    typeof C != "undefined" && (x && (C = encodeURIComponent(JSON.stringify(C))), w.push(v + "=" + C));
  }
  function m(v) {
    if (typeof v != "undefined") {
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
    if (typeof v[w] != "undefined" && typeof v[x] != "undefined" && oe(v[w], v[x]) > 0)
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
    if (c("reduce", w, x), c("include_docs", w, x), c("attachments", w, x), c("limit", w, x), c("descending", w, x), c("group", w, x), c("group_level", w, x), c("skip", w, x), c("stale", w, x), c("conflicts", w, x), c("startkey", w, x, !0), c("start_key", w, x, !0), c("endkey", w, x, !0), c("end_key", w, x, !0), c("inclusive_end", w, x), c("key", w, x, !0), c("update_seq", w, x), x = x.join("&"), x = x === "" ? "" : "?" + x, typeof w.keys != "undefined") {
      var q = 2e3, T = "keys=" + encodeURIComponent(JSON.stringify(w.keys));
      T.length + x.length + 1 <= q ? x += (x[0] === "?" ? "&" : "?") + T : (I = "POST", typeof p == "string" ? C = {
        keys: w.keys
      } : p.keys = w.keys);
    }
    if (typeof p == "string") {
      var D = An(p);
      return v.fetch("_design/" + D[0] + "/_view/" + D[1] + x, {
        headers: new ot({
          "Content-Type": "application/json"
        }),
        method: I,
        body: JSON.stringify(C)
      }).then(function(E) {
        return k = E.ok, P = E.status, E.json();
      }).then(function(E) {
        if (!k)
          throw E.status = P, dt(E);
        return E.rows.forEach(function(F) {
          if (F.value && F.value.error && F.value.error === "builtin_reduce_error")
            throw new Error(F.reason);
        }), E;
      }).then(b(w));
    }
    return C = C || {}, Object.keys(p).forEach(function(E) {
      Array.isArray(p[E]) ? C[E] = p[E] : C[E] = p[E].toString();
    }), v.fetch("_temp_view" + x, {
      headers: new ot({
        "Content-Type": "application/json"
      }),
      method: "POST",
      body: JSON.stringify(C)
    }).then(function(E) {
      return k = E.ok, P = E.status, E.json();
    }).then(function(E) {
      if (!k)
        throw E.status = P, dt(E);
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
      return Nf(P) ? Promise.resolve(C) : p.db.get(x).catch(f(C));
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
      for (var W = [], te = new ct(), M = 0, N = F.rows.length; M < N; M++) {
        var z = F.rows[M], Q = z.doc;
        if (!!Q && (W.push(Q), te.add(Q._id), Q._deleted = !k.has(Q._id), !Q._deleted)) {
          var ee = k.get(Q._id);
          "value" in ee && (Q.value = ee.value);
        }
      }
      var X = $n(k);
      return X.forEach(function(ye) {
        if (!te.has(ye)) {
          var Se = {
            _id: ye
          }, gt = k.get(ye);
          "value" in gt && (Se.value = gt.value), W.push(Se);
        }
      }), E.keys = ei(X.concat(E.keys)), W.push(E), W;
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
      var I = $n(p);
      return Promise.all(I.map(function(k) {
        return l(k, v, p);
      })).then(function(k) {
        var P = Wt(k);
        return C.seq = w, P.push(C), v.db.bulkDocs({
          docs: P
        });
      });
    });
  }
  function y(v) {
    var p = typeof v == "string" ? v : v.name, w = ii[p];
    return w || (w = ii[p] = new Ot()), w;
  }
  function j(v, p) {
    return bn(y(v), function() {
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
      typeof N != "undefined" && N !== null && (z.value = Ze(N)), w.push(z);
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
    var D = new Ot();
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
      for (var N = new we(), z = 0, Q = M.length; z < Q; z++) {
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
      for (var N = new we(), z, Q = 0, ee = M.length; Q < ee; Q++) {
        var X = M[Q], ye = [X.key, X.id];
        Q > 0 && oe(X.key, z) === 0 && ye.push(Q), N.set(xe(ye), X), z = X.key;
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
      if (x && Array.isArray(W) && (W = W.slice(0, k)), F && oe(F.groupKey, W) === 0) {
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
      if (D.error && D.error instanceof cn)
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
    return bn(y(v), function() {
      return K(v, p);
    })();
  }
  function K(v, p) {
    var w, x = v.reduceFun && p.reduce !== !1, C = p.skip || 0;
    typeof p.keys != "undefined" && !p.keys.length && (p.limit = 0, delete p.keys);
    function I(M) {
      return M.include_docs = !0, v.db.allDocs(M).then(function(N) {
        return w = N.total_rows, N.rows.map(function(z) {
          if ("value" in z.doc && typeof z.doc.value == "object" && z.doc.value !== null) {
            var Q = Object.keys(z.doc.value).sort(), ee = ["id", "key", "value"];
            if (!(Q < ee || Q > ee))
              return z.doc.value;
          }
          var X = jo(z.doc._id);
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
      if (x ? N = B(v, M, p) : typeof p.keys == "undefined" ? N = {
        total_rows: w,
        offset: C,
        rows: M
      } : N = {
        total_rows: w,
        offset: C,
        rows: o(M, p.limit, p.skip)
      }, p.update_seq && (N.update_seq = v.seq), p.include_docs) {
        var z = ei(M.map(s));
        return v.sourceDB.allDocs({
          keys: z,
          include_docs: !0,
          conflicts: p.conflicts,
          attachments: p.attachments,
          binary: p.binary
        }).then(function(Q) {
          var ee = new we();
          return Q.rows.forEach(function(X) {
            ee.set(X.id, X.doc);
          }), M.forEach(function(X) {
            var ye = s(X), Se = ee.get(ye);
            Se && (X.doc = Se);
          }), N;
        });
      } else
        return N;
    }
    if (typeof p.keys != "undefined") {
      var P = p.keys, q = P.map(function(M) {
        var N = {
          startkey: xe([M]),
          endkey: xe([M, {}])
        };
        return p.update_seq && (N.update_seq = !0), I(N);
      });
      return Promise.all(q).then(Wt).then(k);
    } else {
      var T = {
        descending: p.descending
      };
      p.update_seq && (T.update_seq = !0);
      var D, E;
      if ("start_key" in p && (D = p.start_key), "startkey" in p && (D = p.startkey), "end_key" in p && (E = p.end_key), "endkey" in p && (E = p.endkey), typeof D != "undefined" && (T.startkey = p.descending ? xe([D, {}]) : xe([D])), typeof E != "undefined") {
        var F = p.inclusive_end !== !1;
        p.descending && (F = !F), T.endkey = xe(F ? [E, {}] : [E]);
      }
      if (typeof p.key != "undefined") {
        var W = xe([p.key]), te = xe([p.key, {}]);
        T.descending ? (T.endkey = W, T.startkey = te) : (T.startkey = W, T.endkey = te);
      }
      return x || (typeof p.limit == "number" && (T.limit = p.limit), T.skip = C), I(T).then(k);
    }
  }
  function Z(v) {
    return v.fetch("_view_cleanup", {
      headers: new ot({
        "Content-Type": "application/json"
      }),
      method: "POST"
    }).then(function(p) {
      return p.json();
    });
  }
  function Y(v) {
    return v.get("_local/" + e).then(function(p) {
      var w = new we();
      Object.keys(p.views).forEach(function(C) {
        var I = An(C), k = "_design/" + I[0], P = I[1], q = w.get(k);
        q || (q = new ct(), w.set(k, q)), q.add(P);
      });
      var x = {
        keys: $n(w),
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
          return bn(y(q), function() {
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
    if (qe(v))
      return A(v, p, w);
    var x = {
      changes_batch_size: v.__opts.view_update_changes_batch_size || Df
    };
    if (typeof p != "string")
      return S(w, p), ai.add(function() {
        var q = ri(v, "temp_view/temp_view", p.map, p.reduce, !0, e);
        return q.then(function(T) {
          return qf(j(T, x).then(function() {
            return L(T, w);
          }), function() {
            return T.db.destroy();
          });
        });
      }), ai.finish();
    var C = p, I = An(C), k = I[0], P = I[1];
    return v.get("_design/" + k).then(function(q) {
      var T = q.views && q.views[P];
      if (!T)
        throw new sn("ddoc " + q._id + " has no view named " + P);
      r(q, P), S(w, T);
      var D = ri(v, C, T.map, T.reduce, !1, e);
      return D.then(function(E) {
        return w.stale === "ok" || w.stale === "update_after" ? (w.stale === "update_after" && _e(function() {
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
    return wa(C, w), C;
  }
  var U = Pf(function() {
    var v = this;
    return typeof v._viewCleanup == "function" ? h(v) : qe(v) ? Z(v) : Y(v);
  });
  return {
    query: G,
    viewCleanup: U
  };
}
var On = {
  _sum: function(e, t) {
    return Jn(t);
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
      sum: Jn(t),
      min: Math.min.apply(null, t),
      max: Math.max.apply(null, t),
      count: t.length,
      sumsqr: n(t)
    };
  }
};
function Mf(e) {
  if (/^_sum/.test(e))
    return On._sum;
  if (/^_count/.test(e))
    return On._count;
  if (/^_stats/.test(e))
    return On._stats;
  if (/^_/.test(e))
    throw new Error(e + " is not a supported reduce function.");
}
function Uf(e, t) {
  if (typeof e == "function" && e.length === 2) {
    var n = e;
    return function(r) {
      return n(r, t);
    };
  } else
    return ba(e.toString(), t);
}
function zf(e) {
  var t = e.toString(), n = Mf(t);
  return n || ba(t);
}
function Kf(e, t) {
  var n = e.views && e.views[t];
  if (typeof n.map != "string")
    throw new sn("ddoc " + e._id + " has no string view named " + t + ", instead found object of type: " + typeof n.map);
}
var Jf = "mrviews", $a = Ff(Jf, Uf, zf, Kf);
function Qf(e, t, n) {
  return $a.query.call(this, e, t, n);
}
function Gf(e) {
  return $a.viewCleanup.call(this, e);
}
var Wf = {
  query: Qf,
  viewCleanup: Gf
};
function oi(e) {
  return /^1-/.test(e);
}
function Hf(e, t, n) {
  return !e._attachments || !e._attachments[n] || e._attachments[n].digest !== t._attachments[n].digest;
}
function fi(e, t) {
  var n = Object.keys(t._attachments);
  return Promise.all(n.map(function(r) {
    return e.getAttachment(t._id, r, {
      rev: t._rev
    });
  }));
}
function Yf(e, t, n) {
  var r = qe(t) && !qe(e), i = Object.keys(n._attachments);
  return r ? e.get(n._id).then(function(a) {
    return Promise.all(i.map(function(u) {
      return Hf(a, n, u) ? t.getAttachment(n._id, u) : e.getAttachment(a._id, u);
    }));
  }).catch(function(a) {
    if (a.status !== 404)
      throw a;
    return fi(t, n);
  }) : fi(t, n);
}
function Xf(e) {
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
function Zf(e, t, n, r) {
  n = de(n);
  var i = [], a = !0;
  function u() {
    var m = Xf(n);
    if (!!m.docs.length)
      return e.bulkGet(m).then(function(O) {
        if (r.cancelled)
          throw new Error("cancelled");
        return Promise.all(O.results.map(function($) {
          return Promise.all($.docs.map(function(S) {
            var A = S.ok;
            return S.error && (a = !1), !A || !A._attachments ? A : Yf(t, e, A).then(function(g) {
              var h = Object.keys(A._attachments);
              return g.forEach(function(f, l) {
                var d = A._attachments[h[l]];
                delete d.stub, delete d.length, d.data = f;
              }), A;
            });
          }));
        })).then(function($) {
          i = i.concat(Wt($).filter(Boolean));
        });
      });
  }
  function o(m) {
    return m._attachments && Object.keys(m._attachments).length > 0;
  }
  function s(m) {
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
        $.deleted || !$.doc || !oi($.value.rev) || o($.doc) || s($.doc) || ($.doc._conflicts && delete $.doc._conflicts, i.push($.doc), delete n[$.id]);
      });
    });
  }
  function b() {
    var m = Object.keys(n).filter(function(O) {
      var $ = n[O].missing;
      return $.length === 1 && oi($[0]);
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
var si = 1, ci = "pouchdb", Vf = 5, Ie = 0;
function Or(e, t, n, r, i) {
  return e.get(t).catch(function(a) {
    if (a.status === 404)
      return (e.adapter === "http" || e.adapter === "https") && qn(404, "PouchDB is just checking if a remote checkpoint exists."), {
        session_id: r,
        _id: t,
        history: [],
        replicator: ci,
        version: si
      };
    throw a;
  }).then(function(a) {
    if (!i.cancelled && a.last_seq !== n)
      return a.history = (a.history || []).filter(function(u) {
        return u.session_id !== r;
      }), a.history.unshift({
        last_seq: n,
        session_id: r
      }), a.history = a.history.slice(0, Vf), a.version = si, a.replicator = ci, a.session_id = r, a.last_seq = n, e.put(a).catch(function(u) {
        if (u.status === 409)
          return Or(e, t, n, r, i);
        throw u;
      });
  });
}
function Bt(e, t, n, r, i) {
  this.src = e, this.target = t, this.id = n, this.returnValue = r, this.opts = i || {};
}
Bt.prototype.writeCheckpoint = function(e, t) {
  var n = this;
  return this.updateTarget(e, t).then(function() {
    return n.updateSource(e, t);
  });
};
Bt.prototype.updateTarget = function(e, t) {
  return this.opts.writeTargetCheckpoint ? Or(this.target, this.id, e, t, this.returnValue) : Promise.resolve(!0);
};
Bt.prototype.updateSource = function(e, t) {
  if (this.opts.writeSourceCheckpoint) {
    var n = this;
    return Or(this.src, this.id, e, t, this.returnValue).catch(function(r) {
      if (Oa(r))
        return n.opts.writeSourceCheckpoint = !1, !0;
      throw r;
    });
  } else
    return Promise.resolve(!0);
};
var li = {
  undefined: function(e, t) {
    return oe(e.last_seq, t.last_seq) === 0 ? t.last_seq : 0;
  },
  1: function(e, t) {
    return es(t, e).last_seq;
  }
};
Bt.prototype.getCheckpoint = function() {
  var e = this;
  return e.opts && e.opts.writeSourceCheckpoint && !e.opts.writeTargetCheckpoint ? e.src.get(e.id).then(function(t) {
    return t.last_seq || Ie;
  }).catch(function(t) {
    if (t.status !== 404)
      throw t;
    return Ie;
  }) : e.target.get(e.id).then(function(t) {
    return e.opts && e.opts.writeTargetCheckpoint && !e.opts.writeSourceCheckpoint ? t.last_seq || Ie : e.src.get(e.id).then(function(n) {
      if (t.version !== n.version)
        return Ie;
      var r;
      return t.version ? r = t.version.toString() : r = "undefined", r in li ? li[r](t, n) : Ie;
    }, function(n) {
      if (n.status === 404 && t.last_seq)
        return e.src.put({
          _id: e.id,
          last_seq: Ie
        }).then(function() {
          return Ie;
        }, function(r) {
          return Oa(r) ? (e.opts.writeSourceCheckpoint = !1, t.last_seq) : Ie;
        });
      throw n;
    });
  }).catch(function(t) {
    if (t.status !== 404)
      throw t;
    return Ie;
  });
};
function es(e, t) {
  return e.session_id === t.session_id ? {
    last_seq: e.last_seq,
    history: e.history
  } : Aa(e.history, t.history);
}
function Aa(e, t) {
  var n = e[0], r = e.slice(1), i = t[0], a = t.slice(1);
  if (!n || t.length === 0)
    return {
      last_seq: Ie,
      history: []
    };
  var u = n.session_id;
  if (Qn(u, t))
    return {
      last_seq: n.last_seq,
      history: e
    };
  var o = i.session_id;
  return Qn(o, r) ? {
    last_seq: i.last_seq,
    history: a
  } : Aa(r, a);
}
function Qn(e, t) {
  var n = t[0], r = t.slice(1);
  return !e || t.length === 0 ? !1 : e === n.session_id ? !0 : Qn(e, r);
}
function Oa(e) {
  return typeof e.status == "number" && Math.floor(e.status / 100) === 4;
}
var di = 0;
function ts(e, t, n, r) {
  if (e.retry === !1) {
    t.emit("error", n), t.removeAllListeners();
    return;
  }
  if (typeof e.back_off_function != "function" && (e.back_off_function = Eu), t.emit("requestError", n), t.state === "active" || t.state === "pending") {
    t.emit("paused", n), t.state = "stopped";
    var i = function() {
      e.current_back_off = di;
    }, a = function() {
      t.removeListener("active", i);
    };
    t.once("paused", a), t.once("active", i);
  }
  e.current_back_off = e.current_back_off || di, e.current_back_off = e.back_off_function(e.current_back_off), setTimeout(r, e.current_back_off);
}
function ns(e) {
  return Object.keys(e).sort(oe).reduce(function(t, n) {
    return t[n] = e[n], t;
  }, {});
}
function rs(e, t, n) {
  var r = n.doc_ids ? n.doc_ids.sort(oe) : "", i = n.filter ? n.filter.toString() : "", a = "", u = "", o = "";
  return n.selector && (o = JSON.stringify(n.selector)), n.filter && n.query_params && (a = JSON.stringify(ns(n.query_params))), n.filter && n.filter === "_view" && (u = n.view.toString()), Promise.all([e.id(), t.id()]).then(function(s) {
    var _ = s[0] + s[1] + i + u + a + r + o;
    return new Promise(function(b) {
      _r(_, b);
    });
  }).then(function(s) {
    return s = s.replace(/\//g, ".").replace(/\+/g, "_"), "_local/" + s;
  });
}
function Sa(e, t, n, r, i) {
  var a = [], u, o = {
    seq: 0,
    changes: [],
    docs: []
  }, s = !1, _ = !1, b = !1, c = 0, m = n.continuous || n.live || !1, O = n.batch_size || 100, $ = n.batches_limit || 10, S = n.style || "all_docs", A = !1, g = n.doc_ids, h = n.selector, f, l, d = [], y = fn();
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
    return l ? Promise.resolve() : rs(e, t, n).then(function(k) {
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
      }, l = new Bt(e, t, f, r, P);
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
              r.emit("denied", de(F));
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
    i.last_seq = c = u.seq;
    var k = de(i);
    return d.length && (k.docs = d, typeof u.pending == "number" && (k.pending = u.pending, delete u.pending), r.emit("change", k)), s = !0, l.writeCheckpoint(u.seq, y).then(function() {
      if (r.emit("checkpoint", {
        checkpoint: u.seq
      }), s = !1, r.cancelled)
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
    return Zf(e, t, u.diffs, r).then(function(k) {
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
    if (!b && !(r.cancelled && (i.status = "cancelled", s)))
      if (i.status = i.status || "complete", i.end_time = new Date().toISOString(), i.last_seq = c, b = !0, k) {
        k = V(k), k.result = i;
        var P = (k.name || "").toLowerCase();
        P === "unauthorized" || P === "forbidden" ? (r.emit("error", k), r.removeAllListeners()) : ts(n, r, k, function() {
          Sa(e, t, n, r);
        });
      } else
        r.emit("complete", i), r.removeAllListeners();
  }
  function v(k, P, q) {
    if (r.cancelled)
      return U();
    typeof P == "number" && (o.pending = P);
    var T = lr(n)(k);
    !T || (o.seq = k.seq || q, o.changes.push(k), r.emit("checkpoint", {
      pending_batch: o.seq
    }), _e(function() {
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
      !u && k.results.length === 0 ? (s = !0, l.writeCheckpoint(k.last_seq, y).then(function() {
        s = !1, i.last_seq = c = k.last_seq, P();
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
        c = k, j = {
          since: c,
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
    s = !1, G("writeCheckpoint completed with error", k);
  }
  if (r.cancelled) {
    U();
    return;
  }
  r._addedListeners || (r.once("cancel", U), typeof n.complete == "function" && (r.once("error", n.complete), r.once("complete", function(k) {
    n.complete(null, k);
  })), r._addedListeners = !0), typeof n.since == "undefined" ? C() : R().then(function() {
    return s = !0, l.writeCheckpoint(n.since, y);
  }).then(function() {
    if (s = !1, r.cancelled) {
      U();
      return;
    }
    c = n.since, C();
  }).catch(I);
}
he.exports(ln, ve.exports);
function ln() {
  ve.exports.call(this), this.cancelled = !1, this.state = "pending";
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
ln.prototype.cancel = function() {
  this.cancelled = !0, this.state = "cancelled", this.emit("cancel");
};
ln.prototype.ready = function(e, t) {
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
function Xt(e, t) {
  var n = t.PouchConstructor;
  return typeof e == "string" ? new n(e, t) : e;
}
function Gn(e, t, n, r) {
  if (typeof n == "function" && (r = n, n = {}), typeof n == "undefined" && (n = {}), n.doc_ids && !Array.isArray(n.doc_ids))
    throw V(un, "`doc_ids` filter parameter is not a list.");
  n.complete = r, n = de(n), n.continuous = n.continuous || n.live, n.retry = "retry" in n ? n.retry : !1, n.PouchConstructor = n.PouchConstructor || this;
  var i = new ln(), a = Xt(e, n), u = Xt(t, n);
  return Sa(a, u, n, i), i;
}
he.exports(Sr, ve.exports);
function is(e, t, n, r) {
  return typeof n == "function" && (r = n, n = {}), typeof n == "undefined" && (n = {}), n = de(n), n.PouchConstructor = n.PouchConstructor || this, e = Xt(e, n), t = Xt(t, n), new Sr(e, t, n, r);
}
function Sr(e, t, n, r) {
  var i = this;
  this.canceled = !1;
  var a = n.push ? He({}, n, n.push) : n, u = n.pull ? He({}, n, n.pull) : n;
  this.push = Gn(e, t, a), this.pull = Gn(t, e, u), this.pushPaused = !0, this.pullPaused = !0;
  function o(f) {
    i.emit("change", {
      direction: "pull",
      change: f
    });
  }
  function s(f) {
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
  var S = {};
  function A(f) {
    return function(l, d) {
      var y = l === "change" && (d === o || d === s), j = l === "denied" && (d === b || d === _), R = l === "paused" && (d === m || d === c), B = l === "active" && (d === $ || d === O);
      (y || j || R || B) && (l in S || (S[l] = {}), S[l][f] = !0, Object.keys(S[l]).length === 2 && i.removeAllListeners(l));
    };
  }
  n.live && (this.push.on("complete", i.pull.cancel.bind(i.pull)), this.pull.on("complete", i.push.cancel.bind(i.push)));
  function g(f, l, d) {
    f.listeners(l).indexOf(d) == -1 && f.on(l, d);
  }
  this.on("newListener", function(f) {
    f === "change" ? (g(i.pull, "change", o), g(i.push, "change", s)) : f === "denied" ? (g(i.pull, "denied", b), g(i.push, "denied", _)) : f === "active" ? (g(i.pull, "active", $), g(i.push, "active", O)) : f === "paused" && (g(i.pull, "paused", m), g(i.push, "paused", c));
  }), this.on("removeListener", function(f) {
    f === "change" ? (i.pull.removeListener("change", o), i.push.removeListener("change", s)) : f === "denied" ? (i.pull.removeListener("denied", b), i.push.removeListener("denied", _)) : f === "active" ? (i.pull.removeListener("active", $), i.push.removeListener("active", O)) : f === "paused" && (i.pull.removeListener("paused", m), i.push.removeListener("paused", c));
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
Sr.prototype.cancel = function() {
  this.canceled || (this.canceled = !0, this.push.cancel(), this.pull.cancel());
};
function as(e) {
  e.replicate = Gn, e.sync = is, Object.defineProperty(e.prototype, "replicate", {
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
H.plugin(Af).plugin(If).plugin(Wf).plugin(as);
he.exports(ie, Error);
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
var us = new ie(500, "unknown_error", "Database encountered an unknown error");
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
function Wn(e) {
  if (typeof e != "object") {
    var t = e;
    e = us, e.data = t;
  }
  return "error" in e && e.error === "conflict" && (e.name = "conflict", e.status = 409), "name" in e || (e.name = e.error || "unknown"), "status" in e || (e.status = 500), "message" in e || (e.message = e.message || e.reason), "stack" in e || (e.stack = new Error().stack), e;
}
var Qt = Headers;
function dn(e) {
  return "$" + e;
}
function xa(e) {
  return e.substring(1);
}
function Le() {
  this._store = {};
}
Le.prototype.get = function(e) {
  var t = dn(e);
  return this._store[t];
};
Le.prototype.set = function(e, t) {
  var n = dn(e);
  return this._store[n] = t, !0;
};
Le.prototype.has = function(e) {
  var t = dn(e);
  return t in this._store;
};
Le.prototype.keys = function() {
  return Object.keys(this._store).map((e) => xa(e));
};
Le.prototype.delete = function(e) {
  var t = dn(e), n = t in this._store;
  return delete this._store[t], n;
};
Le.prototype.forEach = function(e) {
  for (var t = Object.keys(this._store), n = 0, r = t.length; n < r; n++) {
    var i = t[n], a = this._store[i];
    i = xa(i), e(a, i);
  }
};
Object.defineProperty(Le.prototype, "size", {
  get: function() {
    return Object.keys(this._store).length;
  }
});
function Rt(e) {
  if (this._store = new Le(), e && Array.isArray(e))
    for (var t = 0, n = e.length; t < n; t++)
      this.add(e[t]);
}
Rt.prototype.add = function(e) {
  return this._store.set(e, !0);
};
Rt.prototype.has = function(e) {
  return this._store.has(e);
};
Rt.prototype.forEach = function(e) {
  this._store.forEach(function(t, n) {
    e(n);
  });
};
Object.defineProperty(Rt.prototype, "size", {
  get: function() {
    return this._store.size;
  }
});
function os() {
  if (typeof Symbol == "undefined" || typeof Map == "undefined" || typeof Set == "undefined")
    return !1;
  var e = Object.getOwnPropertyDescriptor(Map, Symbol.species);
  return e && "get" in e && Map[Symbol.species] === Map;
}
var St, it;
os() ? (St = Set, it = Map) : (St = Rt, it = Le);
var fs = function(e) {
  return atob(e);
};
function ss(e, t) {
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
function cs(e) {
  for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), i = 0; i < t; i++)
    r[i] = e.charCodeAt(i);
  return n;
}
function ls(e, t) {
  return ss([cs(e)], {
    type: t
  });
}
function ds(e, t) {
  return ls(fs(e), t);
}
function vs(e, t, n) {
  for (var r = "", i = n - e.length; r.length < i; )
    r += t;
  return r;
}
function hs(e, t, n) {
  var r = vs(e, t, n);
  return r + e;
}
var Ea = -324, Hn = 3, Yn = "";
function se(e, t) {
  if (e === t)
    return 0;
  e = Ve(e), t = Ve(t);
  var n = Xn(e), r = Xn(t);
  if (n - r !== 0)
    return n - r;
  switch (typeof e) {
    case "number":
      return e - t;
    case "boolean":
      return e < t ? -1 : 1;
    case "string":
      return ws(e, t);
  }
  return Array.isArray(e) ? ms(e, t) : bs(e, t);
}
function Ve(e) {
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
          e[r] = Ve(t[r]);
      } else {
        if (e instanceof Date)
          return e.toJSON();
        if (e !== null) {
          e = {};
          for (var i in t)
            if (Object.prototype.hasOwnProperty.call(t, i)) {
              var a = t[i];
              typeof a != "undefined" && (e[i] = Ve(a));
            }
        }
      }
  }
  return e;
}
function ys(e) {
  if (e !== null)
    switch (typeof e) {
      case "boolean":
        return e ? 1 : 0;
      case "number":
        return $s(e);
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
  return e = Ve(e), Xn(e) + Yn + ys(e) + t;
}
function gs(e, t) {
  var n = t, r, i = e[t] === "1";
  if (i)
    r = 0, t++;
  else {
    var a = e[t] === "0";
    t++;
    var u = "", o = e.substring(t, t + Hn), s = parseInt(o, 10) + Ea;
    for (a && (s = -s), t += Hn; ; ) {
      var _ = e[t];
      if (_ === "\0")
        break;
      u += _, t++;
    }
    u = u.split("."), u.length === 1 ? r = parseInt(u, 10) : r = parseFloat(u[0] + "." + u[1]), a && (r = r - 10), s !== 0 && (r = parseFloat(r + "e" + s));
  }
  return {
    num: r,
    length: t - n
  };
}
function ps(e, t) {
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
function _s(e) {
  for (var t = [], n = [], r = 0; ; ) {
    var i = e[r++];
    if (i === "\0") {
      if (t.length === 1)
        return t.pop();
      ps(t, n);
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
        var a = gs(e, r);
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
        var s = {
          element: [],
          index: t.length
        };
        t.push(s.element), n.push(s);
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
function ms(e, t) {
  for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) {
    var i = se(e[r], t[r]);
    if (i !== 0)
      return i;
  }
  return e.length === t.length ? 0 : e.length > t.length ? 1 : -1;
}
function ws(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function bs(e, t) {
  for (var n = Object.keys(e), r = Object.keys(t), i = Math.min(n.length, r.length), a = 0; a < i; a++) {
    var u = se(n[a], r[a]);
    if (u !== 0 || (u = se(e[n[a]], t[r[a]]), u !== 0))
      return u;
  }
  return n.length === r.length ? 0 : n.length > r.length ? 1 : -1;
}
function Xn(e) {
  var t = ["boolean", "number", "string", "object"], n = t.indexOf(typeof e);
  if (~n)
    return e === null ? 1 : Array.isArray(e) ? 5 : n < 3 ? n + 2 : n + 3;
  if (Array.isArray(e))
    return 5;
}
function $s(e) {
  if (e === 0)
    return "1";
  var t = e.toExponential().split(/e\+?/), n = parseInt(t[1], 10), r = e < 0, i = r ? "0" : "2", a = (r ? -n : n) - Ea, u = hs(a.toString(), "0", Hn);
  i += Yn + u;
  var o = Math.abs(parseFloat(t[0]));
  r && (o = 10 - o);
  var s = o.toFixed(20);
  return s = s.replace(/\.?0+$/, ""), i += Yn + s, i;
}
function ka(e) {
  return Gt.hash(e);
}
function As(e) {
  return typeof ArrayBuffer != "undefined" && e instanceof ArrayBuffer || typeof Blob != "undefined" && e instanceof Blob;
}
function Os(e) {
  if (typeof e.slice == "function")
    return e.slice(0);
  var t = new ArrayBuffer(e.byteLength), n = new Uint8Array(t), r = new Uint8Array(e);
  return n.set(r), t;
}
function Ss(e) {
  if (e instanceof ArrayBuffer)
    return Os(e);
  var t = e.size, n = e.type;
  return typeof e.slice == "function" ? e.slice(0, t, n) : e.webkitSlice(0, t, n);
}
var Ca = Function.prototype.toString, xs = Ca.call(Object);
function Es(e) {
  var t = Object.getPrototypeOf(e);
  if (t === null)
    return !0;
  var n = t.constructor;
  return typeof n == "function" && n instanceof n && Ca.call(n) == xs;
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
  if (As(e))
    return Ss(e);
  if (!Es(e))
    return e;
  t = {};
  for (n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      var i = Ne(e[n]);
      typeof i != "undefined" && (t[n] = i);
    }
  return t;
}
function ks(e) {
  var t = !1;
  return Be(function(n) {
    if (t)
      throw new Error("once called more than once");
    t = !0, e.apply(this, n);
  });
}
function Lt(e) {
  return Be(function(t) {
    t = Ne(t);
    var n = this, r = typeof t[t.length - 1] == "function" ? t.pop() : !1, i = new Promise(function(a, u) {
      var o;
      try {
        var s = ks(function(_, b) {
          _ ? u(_) : a(b);
        });
        t.push(s), o = e.apply(n, t), o && typeof o.then == "function" && a(o);
      } catch (_) {
        u(_);
      }
    });
    return r && i.then(function(a) {
      r(null, a);
    }, r), i;
  });
}
function Cs(e, t) {
  for (var n = {}, r = 0, i = t.length; r < i; r++) {
    var a = t[r];
    a in e && (n[a] = e[a]);
  }
  return n;
}
var Zn;
try {
  localStorage.setItem("_pouch_check_localstorage", 1), Zn = !!localStorage.getItem("_pouch_check_localstorage");
} catch (e) {
  Zn = !1;
}
function ja() {
  return Zn;
}
he.exports(Dt, ve.exports);
function js(e) {
  ja() && addEventListener("storage", function(t) {
    e.emit(t.key);
  });
}
function Dt() {
  ve.exports.call(this), this._listeners = {}, js(this);
}
Dt.prototype.addListener = function(e, t, n, r) {
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
    var o = Cs(r, ["style", "include_docs", "attachments", "conflicts", "filter", "doc_ids", "view", "since", "query_params", "binary", "return_docs"]);
    function s() {
      a = !1;
    }
    n.changes(o).on("change", function(_) {
      _.seq > r.since && !r.cancelled && (r.since = _.seq, r.onChange(_));
    }).on("complete", function() {
      a === "waiting" && _e(u), a = !1;
    }).on("error", s);
  }
  this._listeners[t] = u, this.on(e, u);
};
Dt.prototype.removeListener = function(e, t) {
  t in this._listeners && (ve.exports.prototype.removeListener.call(this, e, this._listeners[t]), delete this._listeners[t]);
};
Dt.prototype.notifyLocalWindows = function(e) {
  ja() && (localStorage[e] = localStorage[e] === "a" ? "b" : "a");
};
Dt.prototype.notify = function(e) {
  this.emit(e), this.notifyLocalWindows(e);
};
function Vn(e) {
  if (typeof console != "undefined" && typeof console[e] == "function") {
    var t = Array.prototype.slice.call(arguments, 1);
    console[e].apply(console, t);
  }
}
var er;
typeof Object.assign == "function" ? er = Object.assign : er = function(e) {
  for (var t = Object(e), n = 1; n < arguments.length; n++) {
    var r = arguments[n];
    if (r != null)
      for (var i in r)
        Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
  }
  return t;
};
var xr = er;
function vi(e) {
  for (var t = [], n = 0, r = e.length; n < r; n++)
    t = t.concat(e[n]);
  return t;
}
function et(e) {
  return typeof e._remote == "boolean" ? e._remote : typeof e.type == "function" ? (Vn("warn", "db.type() is deprecated and will be removed in a future version of PouchDB"), e.type() === "http") : !1;
}
function vn(e, t, n) {
  return e.get(t).catch(function(r) {
    if (r.status !== 404)
      throw r;
    return {};
  }).then(function(r) {
    var i = r._rev, a = n(r);
    return a ? (a._id = t, a._rev = i, Is(e, a, n)) : {
      updated: !1,
      rev: i
    };
  });
}
function Is(e, t, n) {
  return e.put(t).then(function(r) {
    return {
      updated: !0,
      rev: r.rev
    };
  }, function(r) {
    if (r.status !== 409)
      throw r;
    return vn(e, t._id, n);
  });
}
function Je(e) {
  this.status = 400, this.name = "query_parse_error", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, Je);
  } catch (t) {
  }
}
he.exports(Je, Error);
function Er(e) {
  this.status = 404, this.name = "not_found", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, Er);
  } catch (t) {
  }
}
he.exports(Er, Error);
function kr(e) {
  this.status = 500, this.name = "invalid_value", this.message = e, this.error = !0;
  try {
    Error.captureStackTrace(this, kr);
  } catch (t) {
  }
}
he.exports(kr, Error);
function Ia(e, t) {
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
function Ps(e) {
  return Be(function(t) {
    var n = t.pop(), r = e.apply(this, t);
    return typeof n == "function" && Ia(r, n), r;
  });
}
function qs(e, t) {
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
function Sn(e, t) {
  return function() {
    var n = arguments, r = this;
    return e.add(function() {
      return t.apply(r, n);
    });
  };
}
function hi(e) {
  var t = new St(e), n = new Array(t.size), r = -1;
  return t.forEach(function(i) {
    n[++r] = i;
  }), n;
}
function xn(e) {
  var t = new Array(e.size), n = -1;
  return e.forEach(function(r, i) {
    t[++n] = i;
  }), t;
}
function xt() {
  this.promise = new Promise(function(e) {
    e();
  });
}
xt.prototype.add = function(e) {
  return this.promise = this.promise.catch(function() {
  }).then(function() {
    return e();
  }), this.promise;
};
xt.prototype.finish = function() {
  return this.promise;
};
function yi(e) {
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
function Ts(e, t) {
  return yi(e) + yi(t) + "undefined";
}
function gi(e, t, n, r, i, a) {
  var u = Ts(n, r), o;
  if (!i && (o = e._cachedViews = e._cachedViews || {}, o[u]))
    return o[u];
  var s = e.info().then(function(_) {
    var b = _.db_name + "-mrview-" + (i ? "temp" : ka(u));
    function c(m) {
      m.views = m.views || {};
      var O = t;
      O.indexOf("/") === -1 && (O = t + "/" + t);
      var $ = m.views[O] = m.views[O] || {};
      if (!$[b])
        return $[b] = !0, m;
    }
    return vn(e, "_local/" + a, c).then(function() {
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
  return o && (o[u] = s), s;
}
var pi = {}, _i = new xt(), Bs = 50;
function En(e) {
  return e.indexOf("/") === -1 ? [e, e] : e.split("/");
}
function Rs(e) {
  return e.length === 1 && /^1-/.test(e[0].rev);
}
function mi(e, t) {
  try {
    e.emit("error", t);
  } catch (n) {
    Vn("error", `The user's map/reduce function threw an uncaught error.
You can debug this error by doing:
myDatabase.on('error', function (err) { debugger; });
Please double-check your map/reduce function.`), Vn("error", t);
  }
}
function Ls(e, t, n, r) {
  function i(v, p, w) {
    try {
      p(w);
    } catch (x) {
      mi(v, x);
    }
  }
  function a(v, p, w, x, C) {
    try {
      return {
        output: p(w, x, C)
      };
    } catch (I) {
      return mi(v, I), {
        error: I
      };
    }
  }
  function u(v, p) {
    var w = se(v.key, p.key);
    return w !== 0 ? w : se(v.value, p.value);
  }
  function o(v, p, w) {
    return w = w || 0, typeof p == "number" ? v.slice(w, p + w) : w > 0 ? v.slice(w) : v;
  }
  function s(v) {
    var p = v.value, w = p && typeof p == "object" && p._id || v.id;
    return w;
  }
  function _(v) {
    v.rows.forEach(function(p) {
      var w = p.doc && p.doc._attachments;
      !w || Object.keys(w).forEach(function(x) {
        var C = w[x];
        w[x].data = ds(C.data, C.content_type);
      });
    });
  }
  function b(v) {
    return function(p) {
      return v.include_docs && v.attachments && v.binary && _(p), p;
    };
  }
  function c(v, p, w, x) {
    var C = p[v];
    typeof C != "undefined" && (x && (C = encodeURIComponent(JSON.stringify(C))), w.push(v + "=" + C));
  }
  function m(v) {
    if (typeof v != "undefined") {
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
        return new Je('Invalid value for integer: "' + v + '"');
      if (v < 0)
        return new Je('Invalid value for positive integer: "' + v + '"');
    }
  }
  function S(v, p) {
    var w = v.descending ? "endkey" : "startkey", x = v.descending ? "startkey" : "endkey";
    if (typeof v[w] != "undefined" && typeof v[x] != "undefined" && se(v[w], v[x]) > 0)
      throw new Je("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");
    if (p.reduce && v.reduce !== !1) {
      if (v.include_docs)
        throw new Je("{include_docs:true} is invalid for reduce");
      if (v.keys && v.keys.length > 1 && !v.group && !v.group_level)
        throw new Je("Multi-key fetches for reduce views must use {group: true}");
    }
    ["group_level", "limit", "skip"].forEach(function(C) {
      var I = $(v[C]);
      if (I)
        throw I;
    });
  }
  function A(v, p, w) {
    var x = [], C, I = "GET", k, P;
    if (c("reduce", w, x), c("include_docs", w, x), c("attachments", w, x), c("limit", w, x), c("descending", w, x), c("group", w, x), c("group_level", w, x), c("skip", w, x), c("stale", w, x), c("conflicts", w, x), c("startkey", w, x, !0), c("start_key", w, x, !0), c("endkey", w, x, !0), c("end_key", w, x, !0), c("inclusive_end", w, x), c("key", w, x, !0), c("update_seq", w, x), x = x.join("&"), x = x === "" ? "" : "?" + x, typeof w.keys != "undefined") {
      var q = 2e3, T = "keys=" + encodeURIComponent(JSON.stringify(w.keys));
      T.length + x.length + 1 <= q ? x += (x[0] === "?" ? "&" : "?") + T : (I = "POST", typeof p == "string" ? C = {
        keys: w.keys
      } : p.keys = w.keys);
    }
    if (typeof p == "string") {
      var D = En(p);
      return v.fetch("_design/" + D[0] + "/_view/" + D[1] + x, {
        headers: new Qt({
          "Content-Type": "application/json"
        }),
        method: I,
        body: JSON.stringify(C)
      }).then(function(E) {
        return k = E.ok, P = E.status, E.json();
      }).then(function(E) {
        if (!k)
          throw E.status = P, Wn(E);
        return E.rows.forEach(function(F) {
          if (F.value && F.value.error && F.value.error === "builtin_reduce_error")
            throw new Error(F.reason);
        }), E;
      }).then(b(w));
    }
    return C = C || {}, Object.keys(p).forEach(function(E) {
      Array.isArray(p[E]) ? C[E] = p[E] : C[E] = p[E].toString();
    }), v.fetch("_temp_view" + x, {
      headers: new Qt({
        "Content-Type": "application/json"
      }),
      method: "POST",
      body: JSON.stringify(C)
    }).then(function(E) {
      return k = E.ok, P = E.status, E.json();
    }).then(function(E) {
      if (!k)
        throw E.status = P, Wn(E);
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
      return Rs(P) ? Promise.resolve(C) : p.db.get(x).catch(f(C));
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
      for (var W = [], te = new St(), M = 0, N = F.rows.length; M < N; M++) {
        var z = F.rows[M], Q = z.doc;
        if (!!Q && (W.push(Q), te.add(Q._id), Q._deleted = !k.has(Q._id), !Q._deleted)) {
          var ee = k.get(Q._id);
          "value" in ee && (Q.value = ee.value);
        }
      }
      var X = xn(k);
      return X.forEach(function(ye) {
        if (!te.has(ye)) {
          var Se = {
            _id: ye
          }, gt = k.get(ye);
          "value" in gt && (Se.value = gt.value), W.push(Se);
        }
      }), E.keys = hi(X.concat(E.keys)), W.push(E), W;
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
      var I = xn(p);
      return Promise.all(I.map(function(k) {
        return l(k, v, p);
      })).then(function(k) {
        var P = vi(k);
        return C.seq = w, P.push(C), v.db.bulkDocs({
          docs: P
        });
      });
    });
  }
  function y(v) {
    var p = typeof v == "string" ? v : v.name, w = pi[p];
    return w || (w = pi[p] = new xt()), w;
  }
  function j(v, p) {
    return Sn(y(v), function() {
      return R(v, p);
    })();
  }
  function R(v, p) {
    var w, x;
    function C(M, N) {
      var z = {
        id: x._id,
        key: Ve(M)
      };
      typeof N != "undefined" && N !== null && (z.value = Ve(N)), w.push(z);
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
    var D = new xt();
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
      for (var N = new it(), z = 0, Q = M.length; z < Q; z++) {
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
      for (var N = new it(), z, Q = 0, ee = M.length; Q < ee; Q++) {
        var X = M[Q], ye = [X.key, X.id];
        Q > 0 && se(X.key, z) === 0 && ye.push(Q), N.set(ke(ye), X), z = X.key;
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
      if (x && Array.isArray(W) && (W = W.slice(0, k)), F && se(F.groupKey, W) === 0) {
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
      if (D.error && D.error instanceof kr)
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
    return Sn(y(v), function() {
      return K(v, p);
    })();
  }
  function K(v, p) {
    var w, x = v.reduceFun && p.reduce !== !1, C = p.skip || 0;
    typeof p.keys != "undefined" && !p.keys.length && (p.limit = 0, delete p.keys);
    function I(M) {
      return M.include_docs = !0, v.db.allDocs(M).then(function(N) {
        return w = N.total_rows, N.rows.map(function(z) {
          if ("value" in z.doc && typeof z.doc.value == "object" && z.doc.value !== null) {
            var Q = Object.keys(z.doc.value).sort(), ee = ["id", "key", "value"];
            if (!(Q < ee || Q > ee))
              return z.doc.value;
          }
          var X = _s(z.doc._id);
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
      if (x ? N = B(v, M, p) : typeof p.keys == "undefined" ? N = {
        total_rows: w,
        offset: C,
        rows: M
      } : N = {
        total_rows: w,
        offset: C,
        rows: o(M, p.limit, p.skip)
      }, p.update_seq && (N.update_seq = v.seq), p.include_docs) {
        var z = hi(M.map(s));
        return v.sourceDB.allDocs({
          keys: z,
          include_docs: !0,
          conflicts: p.conflicts,
          attachments: p.attachments,
          binary: p.binary
        }).then(function(Q) {
          var ee = new it();
          return Q.rows.forEach(function(X) {
            ee.set(X.id, X.doc);
          }), M.forEach(function(X) {
            var ye = s(X), Se = ee.get(ye);
            Se && (X.doc = Se);
          }), N;
        });
      } else
        return N;
    }
    if (typeof p.keys != "undefined") {
      var P = p.keys, q = P.map(function(M) {
        var N = {
          startkey: ke([M]),
          endkey: ke([M, {}])
        };
        return p.update_seq && (N.update_seq = !0), I(N);
      });
      return Promise.all(q).then(vi).then(k);
    } else {
      var T = {
        descending: p.descending
      };
      p.update_seq && (T.update_seq = !0);
      var D, E;
      if ("start_key" in p && (D = p.start_key), "startkey" in p && (D = p.startkey), "end_key" in p && (E = p.end_key), "endkey" in p && (E = p.endkey), typeof D != "undefined" && (T.startkey = p.descending ? ke([D, {}]) : ke([D])), typeof E != "undefined") {
        var F = p.inclusive_end !== !1;
        p.descending && (F = !F), T.endkey = ke(F ? [E, {}] : [E]);
      }
      if (typeof p.key != "undefined") {
        var W = ke([p.key]), te = ke([p.key, {}]);
        T.descending ? (T.endkey = W, T.startkey = te) : (T.startkey = W, T.endkey = te);
      }
      return x || (typeof p.limit == "number" && (T.limit = p.limit), T.skip = C), I(T).then(k);
    }
  }
  function Z(v) {
    return v.fetch("_view_cleanup", {
      headers: new Qt({
        "Content-Type": "application/json"
      }),
      method: "POST"
    }).then(function(p) {
      return p.json();
    });
  }
  function Y(v) {
    return v.get("_local/" + e).then(function(p) {
      var w = new it();
      Object.keys(p.views).forEach(function(C) {
        var I = En(C), k = "_design/" + I[0], P = I[1], q = w.get(k);
        q || (q = new St(), w.set(k, q)), q.add(P);
      });
      var x = {
        keys: xn(w),
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
          return Sn(y(q), function() {
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
    if (et(v))
      return A(v, p, w);
    var x = {
      changes_batch_size: v.__opts.view_update_changes_batch_size || Bs
    };
    if (typeof p != "string")
      return S(w, p), _i.add(function() {
        var q = gi(v, "temp_view/temp_view", p.map, p.reduce, !0, e);
        return q.then(function(T) {
          return qs(j(T, x).then(function() {
            return L(T, w);
          }), function() {
            return T.db.destroy();
          });
        });
      }), _i.finish();
    var C = p, I = En(C), k = I[0], P = I[1];
    return v.get("_design/" + k).then(function(q) {
      var T = q.views && q.views[P];
      if (!T)
        throw new Er("ddoc " + q._id + " has no view named " + P);
      r(q, P), S(w, T);
      var D = gi(v, C, T.map, T.reduce, !1, e);
      return D.then(function(E) {
        return w.stale === "ok" || w.stale === "update_after" ? (w.stale === "update_after" && _e(function() {
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
    return Ia(C, w), C;
  }
  var U = Ps(function() {
    var v = this;
    return typeof v._viewCleanup == "function" ? h(v) : et(v) ? Z(v) : Y(v);
  });
  return {
    query: G,
    viewCleanup: U
  };
}
function hn(e, t) {
  for (var n = e, r = 0, i = t.length; r < i; r++) {
    var a = t[r];
    if (n = n[a], !n)
      break;
  }
  return n;
}
function Ds(e, t, n) {
  for (var r = 0, i = t.length; r < i - 1; r++) {
    var a = t[r];
    e = e[a] = e[a] || {};
  }
  e[t[i - 1]] = n;
}
function Cr(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function ht(e) {
  for (var t = [], n = "", r = 0, i = e.length; r < i; r++) {
    var a = e[r];
    r > 0 && e[r - 1] === "\\" && (a === "$" || a === ".") ? n = n.substring(0, n.length - 1) + a : a === "." ? (t.push(n), n = "") : n += a;
  }
  return t.push(n), t;
}
var Ns = ["$or", "$nor", "$not"];
function Pa(e) {
  return Ns.indexOf(e) > -1;
}
function be(e) {
  return Object.keys(e)[0];
}
function jr(e) {
  return e[be(e)];
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
      }), Pa(i))
        if (a instanceof Array) {
          if (n[i]) {
            n[i] = !1, t[i] = a;
            return;
          }
          var u = [];
          t[i].forEach(function(s) {
            Object.keys(a).forEach(function(_) {
              var b = a[_], c = Math.max(Object.keys(s).length, Object.keys(b).length), m = Et([s, b]);
              Object.keys(m).length <= c || u.push(m);
            });
          }), t[i] = u;
        } else
          t[i] = Et([a]);
      else {
        var o = t[i] = t[i] || {};
        Object.keys(a).forEach(function(s) {
          var _ = a[s];
          if (s === "$gt" || s === "$gte")
            return Fs(s, _, o);
          if (s === "$lt" || s === "$lte")
            return Ms(s, _, o);
          if (s === "$ne")
            return Us(_, o);
          if (s === "$eq")
            return zs(_, o);
          if (s === "$regex")
            return Ks(_, o);
          o[s] = _;
        });
      }
    });
  }), t;
}
function Fs(e, t, n) {
  typeof n.$eq == "undefined" && (typeof n.$gte != "undefined" ? e === "$gte" ? t > n.$gte && (n.$gte = t) : t >= n.$gte && (delete n.$gte, n.$gt = t) : typeof n.$gt != "undefined" ? e === "$gte" ? t > n.$gt && (delete n.$gt, n.$gte = t) : t > n.$gt && (n.$gt = t) : n[e] = t);
}
function Ms(e, t, n) {
  typeof n.$eq == "undefined" && (typeof n.$lte != "undefined" ? e === "$lte" ? t < n.$lte && (n.$lte = t) : t <= n.$lte && (delete n.$lte, n.$lt = t) : typeof n.$lt != "undefined" ? e === "$lte" ? t < n.$lt && (delete n.$lt, n.$lte = t) : t < n.$lt && (n.$lt = t) : n[e] = t);
}
function Us(e, t) {
  "$ne" in t ? t.$ne.push(e) : t.$ne = [e];
}
function zs(e, t) {
  delete t.$gt, delete t.$gte, delete t.$lt, delete t.$lte, delete t.$ne, t.$eq = e;
}
function Ks(e, t) {
  "$regex" in t ? t.$regex.push(e) : t.$regex = [e];
}
function qa(e) {
  for (var t in e) {
    if (Array.isArray(e))
      for (var n in e)
        e[n].$and && (e[n] = Et(e[n].$and));
    var r = e[t];
    typeof r == "object" && qa(r);
  }
  return e;
}
function Ta(e, t) {
  for (var n in e) {
    n === "$and" && (t = !0);
    var r = e[n];
    typeof r == "object" && (t = Ta(r, t));
  }
  return t;
}
function Ba(e) {
  var t = Ne(e), n = !1;
  Ta(t, !1) && (t = qa(t), "$and" in t && (t = Et(t.$and)), n = !0), ["$or", "$nor"].forEach(function(o) {
    o in t && t[o].forEach(function(s) {
      for (var _ = Object.keys(s), b = 0; b < _.length; b++) {
        var c = _[b], m = s[c];
        (typeof m != "object" || m === null) && (s[c] = {
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
function Js(e) {
  function t(n) {
    return e.map(function(r) {
      var i = be(r), a = ht(i), u = hn(n, a);
      return u;
    });
  }
  return function(n, r) {
    var i = t(n.doc), a = t(r.doc), u = se(i, a);
    return u !== 0 ? u : Cr(n.doc._id, r.doc._id);
  };
}
function Ra(e, t, n) {
  if (e = e.filter(function(u) {
    return st(u.doc, t.selector, n);
  }), t.sort) {
    var r = Js(t.sort);
    e = e.sort(r), typeof t.sort[0] != "string" && jr(t.sort[0]) === "desc" && (e = e.reverse());
  }
  if ("limit" in t || "skip" in t) {
    var i = t.skip || 0, a = ("limit" in t ? t.limit : e.length) + i;
    e = e.slice(i, a);
  }
  return e;
}
function st(e, t, n) {
  return n.every(function(r) {
    var i = t[r], a = ht(r), u = hn(e, a);
    return Pa(r) ? Qs(r, i, e) : Zt(i, e, a, u);
  });
}
function Zt(e, t, n, r) {
  return e ? typeof e == "object" ? Object.keys(e).every(function(i) {
    var a = e[i];
    if (i.indexOf("$") === 0)
      return wi(i, t, a, n, r);
    var u = ht(i);
    if (r === void 0 && typeof a != "object" && u.length > 0)
      return !1;
    var o = hn(r, u);
    return typeof a == "object" ? Zt(a, t, n, o) : wi("$eq", t, a, u, o);
  }) : e === r : !0;
}
function Qs(e, t, n) {
  return e === "$or" ? t.some(function(r) {
    return st(n, r, Object.keys(r));
  }) : e === "$not" ? !st(n, t, Object.keys(t)) : !t.find(function(r) {
    return st(n, r, Object.keys(r));
  });
}
function wi(e, t, n, r, i) {
  if (!$i[e])
    throw new Error('unknown operator "' + e + '" - should be one of $eq, $lte, $lt, $gt, $gte, $exists, $ne, $in, $nin, $size, $mod, $regex, $elemMatch, $type, $allMatch or $all');
  return $i[e](t, n, r, i);
}
function mt(e) {
  return typeof e != "undefined" && e !== null;
}
function ze(e) {
  return typeof e != "undefined";
}
function Gs(e, t) {
  if (typeof e != "number" || parseInt(e, 10) !== e)
    return !1;
  var n = t[0], r = t[1];
  return e % n === r;
}
function bi(e, t) {
  return t.some(function(n) {
    return e instanceof Array ? e.some(function(r) {
      return se(n, r) === 0;
    }) : se(n, e) === 0;
  });
}
function Ws(e, t) {
  return t.every(function(n) {
    return e.some(function(r) {
      return se(n, r) === 0;
    });
  });
}
function Hs(e, t) {
  return e.length === t;
}
function Ys(e, t) {
  var n = new RegExp(t);
  return n.test(e);
}
function Xs(e, t) {
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
var $i = {
  $elemMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" ? r.some(function(i) {
      return st(i, t, Object.keys(t));
    }) : r.some(function(i) {
      return Zt(t, e, n, i);
    });
  },
  $allMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" ? r.every(function(i) {
      return st(i, t, Object.keys(t));
    }) : r.every(function(i) {
      return Zt(t, e, n, i);
    });
  },
  $eq: function(e, t, n, r) {
    return ze(r) && se(r, t) === 0;
  },
  $gte: function(e, t, n, r) {
    return ze(r) && se(r, t) >= 0;
  },
  $gt: function(e, t, n, r) {
    return ze(r) && se(r, t) > 0;
  },
  $lte: function(e, t, n, r) {
    return ze(r) && se(r, t) <= 0;
  },
  $lt: function(e, t, n, r) {
    return ze(r) && se(r, t) < 0;
  },
  $exists: function(e, t, n, r) {
    return t ? ze(r) : !ze(r);
  },
  $mod: function(e, t, n, r) {
    return mt(r) && Gs(r, t);
  },
  $ne: function(e, t, n, r) {
    return t.every(function(i) {
      return se(r, i) !== 0;
    });
  },
  $in: function(e, t, n, r) {
    return mt(r) && bi(r, t);
  },
  $nin: function(e, t, n, r) {
    return mt(r) && !bi(r, t);
  },
  $size: function(e, t, n, r) {
    return mt(r) && Array.isArray(r) && Hs(r, t);
  },
  $all: function(e, t, n, r) {
    return Array.isArray(r) && Ws(r, t);
  },
  $regex: function(e, t, n, r) {
    return mt(r) && typeof r == "string" && t.every(function(i) {
      return Ys(r, i);
    });
  },
  $type: function(e, t, n, r) {
    return Xs(r, t);
  }
};
function yn(e, t) {
  if (typeof t != "object")
    throw new Error("Selector error: expected a JSON object");
  t = Ba(t);
  var n = {
    doc: e
  }, r = Ra([n], {
    selector: t
  }, Object.keys(t));
  return r && r.length === 1;
}
function La(e) {
  return e = Ne(e), e.index || (e.index = {}), ["type", "name", "ddoc"].forEach(function(t) {
    e.index[t] && (e[t] = e.index[t], delete e.index[t]);
  }), e.fields && (e.index.fields = e.fields, delete e.fields), e.type || (e.type = "json"), e;
}
function Zs(e, t, n) {
  var r = "", i = t, a = !0;
  if (["$in", "$nin", "$or", "$and", "$mod", "$nor", "$all"].indexOf(e) !== -1 && (Array.isArray(t) || (r = "Query operator " + e + " must be an array.")), ["$not", "$elemMatch", "$allMatch"].indexOf(e) !== -1 && (!Array.isArray(t) && typeof t == "object" && t !== null || (r = "Query operator " + e + " must be an object.")), e === "$mod" && Array.isArray(t))
    if (t.length !== 2)
      r = "Query operator $mod must be in the format [divisor, remainder], where divisor and remainder are both integers.";
    else {
      var u = t[0], o = t[1];
      u === 0 && (r = "Query operator $mod's divisor cannot be 0, cannot divide by zero.", a = !1), (typeof u != "number" || parseInt(u, 10) !== u) && (r = "Query operator $mod's divisor is not an integer.", i = u), parseInt(o, 10) !== o && (r = "Query operator $mod's remainder is not an integer.", i = o);
    }
  if (e === "$exists" && typeof t != "boolean" && (r = "Query operator $exists must be a boolean."), e === "$type") {
    var s = ["null", "boolean", "number", "string", "array", "object"], _ = '"' + s.slice(0, s.length - 1).join('", "') + '", or "' + s[s.length - 1] + '"';
    (typeof t != "string" || s.indexOf(t) == -1) && (r = "Query operator $type must be a string. Supported values: " + _ + ".");
  }
  if (e === "$size" && parseInt(t, 10) !== t && (r = "Query operator $size must be a integer."), e === "$regex" && typeof t != "string" && (console.log("here", n), n ? r = "Query operator $regex must be a string." : t instanceof RegExp || (r = "Query operator $regex must be a string or an instance of a javascript regular expression.")), r) {
    if (a) {
      var b = i === null ? " " : Array.isArray(i) ? " array" : " " + typeof i, c = typeof i == "object" && i !== null ? JSON.stringify(i, null, "	") : i;
      r += " Received" + b + ": " + c;
    }
    throw new Error(r);
  }
}
var Vs = ["$all", "$allMatch", "$and", "$elemMatch", "$exists", "$in", "$mod", "$nin", "$nor", "$not", "$or", "$regex", "$size", "$type"], ec = ["$in", "$nin", "$mod", "$all"], tc = ["$eq", "$gt", "$gte", "$lt", "$lte"];
function Vt(e, t) {
  if (Array.isArray(e))
    for (var n of e)
      typeof n == "object" && u !== null && Vt(n, t);
  else
    for (var r = Object.keys(e), i = 0; i < r.length; i++) {
      var a = r[i], u = e[a];
      Vs.indexOf(a) !== -1 && Zs(a, u, t), tc.indexOf(a) === -1 && ec.indexOf(a) === -1 && typeof u == "object" && u !== null && Vt(u, t);
    }
}
function Nt(e, t, n, r) {
  var i, a;
  n.headers = new Qt({
    "Content-type": "application/json"
  }), e.fetch(t, n).then(function(u) {
    return i = u.status, a = u.ok, u.json();
  }).then(function(u) {
    if (a)
      r(null, u);
    else {
      u.status = i;
      var o = Wn(u);
      r(o);
    }
  }).catch(r);
}
function nc(e, t, n) {
  t = La(t), Nt(e, "_index", {
    method: "POST",
    body: JSON.stringify(t)
  }, n);
}
function rc(e, t, n) {
  Vt(t.selector, !0), Nt(e, "_find", {
    method: "POST",
    body: JSON.stringify(t)
  }, n);
}
function ic(e, t, n) {
  Nt(e, "_explain", {
    method: "POST",
    body: JSON.stringify(t)
  }, n);
}
function ac(e, t) {
  Nt(e, "_index", {
    method: "GET"
  }, t);
}
function uc(e, t, n) {
  var r = t.ddoc, i = t.type || "json", a = t.name;
  if (!r)
    return n(new Error("you must provide an index's ddoc"));
  if (!a)
    return n(new Error("you must provide an index's name"));
  var u = "_index/" + [r, i, a].map(encodeURIComponent).join("/");
  Nt(e, u, {
    method: "DELETE"
  }, n);
}
function Da(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = -1; ++r < t; )
      n[r] = arguments[r];
    return e.call(this, n);
  };
}
function Ft(e) {
  return Da(function(t) {
    var n = t.pop(), r = e.apply(this, t);
    return oc(r, n), r;
  });
}
function oc(e, t) {
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
var Ir = Da(function(e) {
  for (var t = [], n = 0, r = e.length; n < r; n++) {
    var i = e[n];
    Array.isArray(i) ? t = t.concat(Ir.apply(null, i)) : t.push(i);
  }
  return t;
});
function Pr(e) {
  for (var t = {}, n = 0, r = e.length; n < r; n++)
    t = xr(t, e[n]);
  return t;
}
function fc(e, t) {
  for (var n = {}, r = 0, i = t.length; r < i; r++) {
    var a = ht(t[r]), u = hn(e, a);
    typeof u != "undefined" && Ds(n, a, u);
  }
  return n;
}
function Na(e, t) {
  for (var n = 0, r = Math.min(e.length, t.length); n < r; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function sc(e, t) {
  return e.length > t.length ? !1 : Na(e, t);
}
function cc(e, t) {
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
function lc(e) {
  for (var t = {}, n = 0, r = e.length; n < r; n++)
    t[e[n]] = !0;
  return t;
}
function dc(e, t) {
  for (var n = null, r = -1, i = 0, a = e.length; i < a; i++) {
    var u = e[i], o = t(u);
    o > r && (r = o, n = u);
  }
  return n;
}
function Ai(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var n = 0, r = e.length; n < r; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function vc(e) {
  for (var t = {}, n = 0; n < e.length; n++)
    t["$" + e[n]] = !0;
  return Object.keys(t).map(function(r) {
    return r.substring(1);
  });
}
function hc(e, t, n) {
  return function(r) {
    if (!(n && !yn(r, n))) {
      for (var i = [], a = 0, u = e.length; a < u; a++) {
        for (var o = ht(e[a]), s = r, _ = 0, b = o.length; _ < b; _++) {
          var c = o[_];
          if (s = s[c], typeof s == "undefined")
            return;
        }
        i.push(s);
      }
      t(i);
    }
  };
}
function yc(e, t, n) {
  var r = ht(e);
  return function(i) {
    if (!(n && !yn(i, n))) {
      for (var a = i, u = 0, o = r.length; u < o; u++) {
        var s = r[u];
        if (a = a[s], typeof a == "undefined")
          return;
      }
      t(a);
    }
  };
}
function gc(e, t, n) {
  return function(r) {
    n && !yn(r, n) || t(r[e]);
  };
}
function pc(e, t, n) {
  return function(r) {
    if (!(n && !yn(r, n))) {
      for (var i = [], a = 0, u = e.length; a < u; a++)
        i.push(r[e[a]]);
      t(i);
    }
  };
}
function _c(e) {
  for (var t = 0, n = e.length; t < n; t++) {
    var r = e[t];
    if (r.indexOf(".") !== -1)
      return !1;
  }
  return !0;
}
function mc(e, t, n) {
  var r = _c(e), i = e.length === 1;
  return r ? i ? gc(e[0], t, n) : pc(e, t, n) : i ? yc(e[0], t, n) : hc(e, t, n);
}
function wc(e, t) {
  const n = Object.keys(e.fields), r = e.partial_filter_selector;
  return mc(n, t, r);
}
function bc() {
  throw new Error("reduce not supported");
}
function $c(e, t) {
  var n = e.views[t];
  if (!n.map || !n.map.fields)
    throw new Error("ddoc " + e._id + " with view " + t + " doesn't have map.fields defined. maybe it wasn't created by this plugin?");
}
var Ac = Ls("indexes", wc, bc, $c);
function qr(e) {
  return e._customFindAbstractMapper || Ac;
}
function Oc(e) {
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
function Sc(e) {
  var t = [];
  return typeof e == "string" ? t.push(e) : t = e, t.map(function(n) {
    return n.replace("_design/", "");
  });
}
function Fa(e) {
  return e.fields = e.fields.map(function(t) {
    if (typeof t == "string") {
      var n = {};
      return n[t] = "asc", n;
    }
    return t;
  }), e;
}
function xc(e, t) {
  for (var n = [], r = 0; r < t.def.fields.length; r++) {
    var i = be(t.def.fields[r]);
    n.push(e[i]);
  }
  return n;
}
function Ec(e, t, n) {
  for (var r = n.def.fields, i = 0, a = e.length; i < a; i++) {
    var u = e[i], o = xc(u.doc, n);
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
function kc(e) {
  var t = Ne(e);
  return delete t.startkey, delete t.endkey, delete t.inclusive_start, delete t.inclusive_end, "endkey" in e && (t.startkey = e.endkey), "startkey" in e && (t.endkey = e.startkey), "inclusive_start" in e && (t.inclusive_end = e.inclusive_start), "inclusive_end" in e && (t.inclusive_start = e.inclusive_end), t;
}
function Cc(e) {
  var t = e.fields.filter(function(n) {
    return jr(n) === "asc";
  });
  if (t.length !== 0 && t.length !== e.fields.length)
    throw new Error("unsupported mixed sorting");
}
function jc(e, t) {
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
function Ic(e) {
  if (typeof e.selector != "object")
    throw new Error("you must provide a selector when you find()");
}
function Pc(e, t) {
  var n = Object.keys(e), r = t ? t.map(be) : [], i;
  return n.length >= r.length ? i = n : i = r, r.length === 0 ? {
    fields: i
  } : (i = i.sort(function(a, u) {
    var o = r.indexOf(a);
    o === -1 && (o = Number.MAX_VALUE);
    var s = r.indexOf(u);
    return s === -1 && (s = Number.MAX_VALUE), o < s ? -1 : o > s ? 1 : 0;
  }), {
    fields: i,
    sortOrder: t.map(be)
  });
}
function qc(e, t) {
  t = La(t);
  var n = Ne(t.index);
  t.index = Fa(t.index), Cc(t.index);
  var r;
  function i() {
    return r || (r = ka(JSON.stringify(t)));
  }
  var a = t.name || "idx-" + i(), u = t.ddoc || "idx-" + i(), o = "_design/" + u, s = !1, _ = !1;
  function b(c) {
    return c._rev && c.language !== "query" && (s = !0), c.language = "query", c.views = c.views || {}, _ = !!c.views[a], _ ? !1 : (c.views[a] = {
      map: {
        fields: Pr(t.index.fields)
      },
      reduce: "_count",
      options: {
        def: n
      }
    }, c);
  }
  return e.constructor.emit("debug", ["find", "creating index", o]), vn(e, o, b).then(function() {
    if (s)
      throw new Error('invalid language for ddoc with id "' + o + '" (should be "query")');
  }).then(function() {
    var c = u + "/" + a;
    return qr(e).query.call(e, c, {
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
function Ma(e) {
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
    return n.indexes = Ir(n.indexes, t.rows.filter(function(r) {
      return r.doc.language === "query";
    }).map(function(r) {
      var i = r.doc.views !== void 0 ? Object.keys(r.doc.views) : [];
      return i.map(function(a) {
        var u = r.doc.views[a];
        return {
          ddoc: r.id,
          name: a,
          type: "json",
          def: Fa(u.options.def)
        };
      });
    })), n.indexes.sort(function(r, i) {
      return Cr(r.name, i.name);
    }), n.total_rows = n.indexes.length, n;
  });
}
var en = null, tr = {
  "\uFFFF": {}
};
const Tc = {
  queryOpts: {
    limit: 0,
    startkey: tr,
    endkey: en
  },
  inMemoryFields: []
};
function Bc(e, t) {
  for (var n = e.def.fields.map(be), r = 0, i = n.length; r < i; r++) {
    var a = n[r];
    if (t === a)
      return !0;
  }
  return !1;
}
function Rc(e, t) {
  var n = e[t], r = be(n);
  return r !== "$eq";
}
function Ua(e, t) {
  var n = t.def.fields.map(be);
  return e.slice().sort(function(r, i) {
    var a = n.indexOf(r), u = n.indexOf(i);
    return a === -1 && (a = Number.MAX_VALUE), u === -1 && (u = Number.MAX_VALUE), Cr(a, u);
  });
}
function Lc(e, t, n) {
  n = Ua(n, e);
  for (var r = !1, i = 0, a = n.length; i < a; i++) {
    var u = n[i];
    if (r || !Bc(e, u))
      return n.slice(i);
    i < a - 1 && Rc(t, u) && (r = !0);
  }
  return [];
}
function Dc(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    var r = e[n];
    Object.keys(r).forEach(function(i) {
      i === "$ne" && t.push(n);
    });
  }), t;
}
function Nc(e, t, n, r) {
  var i = Ir(
    e,
    Lc(t, n, r),
    Dc(n)
  );
  return Ua(vc(i), t);
}
function Fc(e, t, n) {
  if (t) {
    var r = sc(t, e), i = Na(n, e);
    return r && i;
  }
  return cc(n, e);
}
var Mc = ["$eq", "$gt", "$gte", "$lt", "$lte"];
function za(e) {
  return Mc.indexOf(e) === -1;
}
function Uc(e, t) {
  var n = e[0], r = t[n];
  if (typeof r == "undefined")
    return !0;
  var i = Object.keys(r).length === 1 && be(r) === "$ne";
  return !i;
}
function zc(e, t, n, r) {
  var i = e.def.fields.map(be), a = Fc(i, t, n);
  return a ? Uc(i, r) : !1;
}
function Kc(e, t, n, r) {
  return r.filter(function(i) {
    return zc(i, n, t, e);
  });
}
function Jc(e, t, n, r, i) {
  var a = Kc(e, t, n, r);
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
  var o = lc(t);
  function s(m) {
    for (var O = m.def.fields.map(be), $ = 0, S = 0, A = O.length; S < A; S++) {
      var g = O[S];
      o[g] && $++;
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
  return dc(a, s);
}
function Qc(e, t) {
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
    startkey: en
  };
}
function Gc(e, t) {
  var n = be(t.def.fields[0]), r = e[n] || {}, i = [], a = Object.keys(r), u;
  return a.forEach(function(o) {
    za(o) && i.push(n);
    var s = r[o], _ = Qc(o, s);
    u ? u = Pr([u, _]) : u = _;
  }), {
    queryOpts: u,
    inMemoryFields: i
  };
}
function Wc(e, t) {
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
function Hc(e, t) {
  var n = t.def.fields.map(be), r = [], i = [], a = [], u, o;
  function s(B) {
    u !== !1 && i.push(en), o !== !1 && a.push(tr), r = n.slice(B);
  }
  for (var _ = 0, b = n.length; _ < b; _++) {
    var c = n[_], m = e[c];
    if (!m || !Object.keys(m).length) {
      s(_);
      break;
    } else if (Object.keys(m).some(za)) {
      s(_);
      break;
    } else if (_ > 0) {
      var O = "$gt" in m || "$gte" in m || "$lt" in m || "$lte" in m, $ = Object.keys(e[n[_ - 1]]), S = Ai($, ["$eq"]), A = Ai($, Object.keys(m)), g = O && !S && !A;
      if (g) {
        s(_);
        break;
      }
    }
    for (var h = Object.keys(m), f = null, l = 0; l < h.length; l++) {
      var d = h[l], y = m[d], j = Wc(d, y);
      f ? f = Pr([f, j]) : f = j;
    }
    i.push("startkey" in f ? f.startkey : en), a.push("endkey" in f ? f.endkey : tr), "inclusive_start" in f && (u = f.inclusive_start), "inclusive_end" in f && (o = f.inclusive_end);
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
function Yc(e) {
  return Object.keys(e).map(function(n) {
    return e[n];
  }).some(function(n) {
    return typeof n == "object" && Object.keys(n).length === 0;
  });
}
function Xc(e) {
  return {
    queryOpts: {
      startkey: null
    },
    inMemoryFields: [Object.keys(e)]
  };
}
function Zc(e, t) {
  return t.defaultUsed ? Xc(e) : t.def.fields.length === 1 ? Gc(e, t) : Hc(e, t);
}
function Vc(e, t) {
  var n = e.selector, r = e.sort;
  if (Yc(n))
    return xr({}, Tc, {
      index: t[0]
    });
  var i = Pc(n, r), a = i.fields, u = i.sortOrder, o = Jc(n, a, u, t, e.use_index), s = Zc(n, o), _ = s.queryOpts, b = s.inMemoryFields, c = Nc(b, o, n, a), m = {
    queryOpts: _,
    index: o,
    inMemoryFields: c
  };
  return m;
}
function el(e) {
  return e.ddoc.substring(8) + "/" + e.name;
}
function tl(e, t) {
  var n = Ne(t);
  return n.descending ? ("endkey" in n && typeof n.endkey != "string" && (n.endkey = ""), "startkey" in n && typeof n.startkey != "string" && (n.limit = 0)) : ("startkey" in n && typeof n.startkey != "string" && (n.startkey = ""), "endkey" in n && typeof n.endkey != "string" && (n.limit = 0)), "key" in n && typeof n.key != "string" && (n.limit = 0), n.limit > 0 && n.indexes_count && (n.original_limit = n.limit, n.limit += n.indexes_count), e.allDocs(n).then(function(r) {
    return r.rows = r.rows.filter(function(i) {
      return !/^_design\//.test(i.id);
    }), n.original_limit && (n.limit = n.original_limit), r.rows = r.rows.slice(0, n.limit), r;
  });
}
function Ka(e, t, n) {
  return t.selector && (Vt(t.selector, !1), t.selector = Ba(t.selector)), t.sort && (t.sort = Oc(t.sort)), t.use_index && (t.use_index = Sc(t.use_index)), Ic(t), Ma(e).then(function(r) {
    e.constructor.emit("debug", ["find", "planning query", t]);
    var i = Vc(t, r.indexes);
    e.constructor.emit("debug", ["find", "query plan", i]);
    var a = i.index;
    jc(t, a);
    var u = xr({
      include_docs: !0,
      reduce: !1,
      indexes_count: r.total_rows
    }, i.queryOpts);
    if ("startkey" in u && "endkey" in u && se(u.startkey, u.endkey) > 0)
      return {
        docs: []
      };
    var o = t.sort && typeof t.sort[0] != "string" && jr(t.sort[0]) === "desc";
    return o && (u.descending = !0, u = kc(u)), i.inMemoryFields.length || ("limit" in t && (u.limit = t.limit), "skip" in t && (u.skip = t.skip)), n ? Promise.resolve(i, u) : Promise.resolve().then(function() {
      if (a.name === "_all_docs")
        return tl(e, u);
      var s = el(a);
      return qr(e).query.call(e, s, u);
    }).then(function(s) {
      u.inclusive_start === !1 && (s.rows = Ec(s.rows, u.startkey, a)), i.inMemoryFields.length && (s.rows = Ra(s.rows, t, i.inMemoryFields));
      var _ = {
        docs: s.rows.map(function(b) {
          var c = b.doc;
          return t.fields ? fc(c, t.fields) : c;
        })
      };
      return a.defaultUsed && (_.warning = "No matching index found, create an index to optimize query time."), _;
    });
  });
}
function nl(e, t) {
  return Ka(e, t, !0).then(function(n) {
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
function rl(e, t) {
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
  return vn(e, n, i).then(function() {
    return qr(e).viewCleanup.apply(e);
  }).then(function() {
    return {
      ok: !0
    };
  });
}
var il = Ft(qc), al = Ft(Ka), ul = Ft(nl), ol = Ft(Ma), fl = Ft(rl), yt = {};
yt.createIndex = Lt(function(e, t) {
  if (typeof e != "object")
    return t(new Error("you must provide an index to create"));
  var n = et(this) ? nc : il;
  n(this, e, t);
});
yt.find = Lt(function(e, t) {
  if (typeof t == "undefined" && (t = e, e = void 0), typeof e != "object")
    return t(new Error("you must provide search parameters to find()"));
  var n = et(this) ? rc : al;
  n(this, e, t);
});
yt.explain = Lt(function(e, t) {
  if (typeof t == "undefined" && (t = e, e = void 0), typeof e != "object")
    return t(new Error("you must provide search parameters to explain()"));
  var n = et(this) ? ic : ul;
  n(this, e, t);
});
yt.getIndexes = Lt(function(e) {
  var t = et(this) ? ac : ol;
  t(this, e);
});
yt.deleteIndex = Lt(function(e, t) {
  if (typeof e != "object")
    return t(new Error("you must provide an index to delete"));
  var n = et(this) ? uc : fl;
  n(this, e, t);
});
function kt(...e) {
  return [].concat(...e).filter((t) => !cl(t) && !ll(t) && !vl(t)).flat();
}
function sl(e = null) {
  const t = new Date();
  return typeof e == "number" && t.setSeconds(t.getSeconds() + e), t;
}
function Ct(e, t) {
  if (e instanceof Map)
    return Array.from(e).map(([r, i]) => Ct(i, t));
  if (Array.isArray(e))
    return e.map((r) => Ct(r, t));
  if (t = kt(t), !t.length)
    return e;
  const n = t.map((r) => dl(e) ? e[r] : e);
  if (!!n.length)
    return n.length === 1 ? n.shift() : n;
}
function Ja(...e) {
  return [].concat(...e).shift();
}
function cl(e) {
  return e === !1;
}
function ll(e) {
  return e === null;
}
function dl(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Qa(e) {
  return typeof e == "string";
}
function vl(e) {
  return e === void 0;
}
function Tr(e, t, n = []) {
  if (e instanceof Map)
    return e;
  if (t === void 0)
    throw new Error(
      "You must specify an attribute for the map's key."
    );
  const r = new Map(
    kt(n).map((i) => [i, void 0])
  );
  return kt(e).reduce((i, a) => {
    const u = typeof t == "function" ? t(a) : a[t];
    return i.set(u, a);
  }, Object.assign(r, {
    first(...i) {
      return Ct(this.toArray().shift(), [...i]);
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
function Ga(e, ...t) {
  return e instanceof Promise ? e : typeof e == "function" ? Promise.resolve(e(...t)) : Promise.resolve(e);
}
function Br(e, t = (n) => n) {
  if (!!e.size)
    return e.size === 1 ? t(e.first()) : Object.fromEntries(
      Array.from(e).map(([n, r]) => [n, t(r)])
    );
}
function Oi(e, t) {
  return ue(this, null, function* () {
    const n = Object.entries(t);
    for (const [r, i] of n)
      t[r] = i && (yield e.remove(i));
    return Br(Tr(t, "id"));
  });
}
function hl(e) {
  e && console.warn(e);
}
const yl = {
  cache(...e) {
    return ue(this, null, function* () {
      const [t, n, r] = e;
      yield this.clearExpiredCache(t);
      const i = yield this.findCache(t);
      if (e.length <= 1 || i.length) {
        const _ = Tr(i, "_id", t);
        return Br(_, (b) => Ct(b, "$value"));
      }
      if (!Qa(t))
        throw new Error(
          "The key must be a string when cache() is being used a setter."
        );
      const a = r instanceof Date ? r : typeof r == "number" ? sl(r) : null;
      let u = yield Ga(n);
      u !== void 0 && (u = JSON.parse(JSON.stringify(u)));
      const { _rev: o } = Ja(i) || {}, s = Object.assign({
        _id: t,
        _rev: o,
        $value: u,
        $expiredAt: a
      });
      return yield this.put(s), u;
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
    return ue(this, null, function* () {
      const t = yield this.findCache(kt(e), new Date(), !0);
      return yield Promise.all(
        Object.entries(t).map(([n, r]) => r && this.remove(r._id, r._rev))
      );
    });
  },
  createCacheIndex() {
    return ue(this, null, function* () {
      return yield this.createIndex({
        index: {
          fields: ["$expiredAt", "$value"]
        }
      });
    });
  },
  findCache(e = void 0, t = void 0, n = !1) {
    return ue(this, null, function* () {
      t === void 0 && (t = new Date());
      const { docs: r, warning: i } = yield this.find(
        this.cacheSelector(kt(e), t, n)
      );
      return hl(i), r;
    });
  },
  findExpiredCache(e, t = null) {
    return ue(this, null, function* () {
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
    return ue(this, null, function* () {
      return yield Oi(this, yield this.findCache(e));
    });
  },
  removeCache(e) {
    return ue(this, null, function* () {
      return yield Oi(this, yield this.findCache(e));
    });
  }
}, gl = {
  config(...e) {
    return ue(this, null, function* () {
      const [t, n] = e, r = yield this.findConfig(t);
      if (e.length <= 1) {
        const o = Tr(r, "_id", t);
        return Br(o, (s) => Ct(s, "$value"));
      }
      if (!Qa(t))
        throw new Error(
          "The key must be a string when config() is being used a setter."
        );
      let i = yield Ga(n);
      i !== void 0 && (i = JSON.parse(JSON.stringify(i)));
      const { _rev: a } = Ja(r) || {}, u = Object.assign({
        _id: t,
        _rev: a,
        $value: i,
        $config: !0
      });
      return yield this.put(u), i;
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
    return ue(this, null, function* () {
      return yield this.createIndex({
        index: {
          fields: ["$config"]
        }
      });
    });
  }
};
H.plugin(yt);
H.plugin(yl);
H.plugin(gl);
let Oe;
function Fe() {
  if (!Oe)
    throw new Error("You must initialize with init() before accessing the database.");
  return !0;
}
function pl(e, t) {
  return Oe || (Oe = new H(e, t));
}
function Nl() {
  return ue(this, null, function* () {
    return Fe() && {
      cache: yield Oe.createCacheIndex(),
      config: yield Oe.createConfigIndex()
    };
  });
}
function Fl() {
  return ue(this, null, function* () {
    return Fe() && (yield Oe.createCacheIndex());
  });
}
function Ml() {
  return ue(this, null, function* () {
    return Fe() && (yield Oe.createConfigIndex());
  });
}
function Ul(...e) {
  return ue(this, null, function* () {
    return Fe() && (yield Oe.cache(...e));
  });
}
function zl(...e) {
  return ue(this, null, function* () {
    return Fe() && (yield Oe.config(...e));
  });
}
function Kl(...e) {
  return ue(this, null, function* () {
    return Fe() && (yield Oe.purge(...e));
  });
}
function Jl(...e) {
  return ue(this, null, function* () {
    return Fe() && (yield Oe.removeCache(...e));
  });
}
function Ql(...e) {
  return ue(this, null, function* () {
    return Fe() && (yield Oe.removeConfig(...e));
  });
}
const kn = (e) => e instanceof Date, _l = (e) => Object.keys(e).length === 0, nr = (e) => e != null && typeof e == "object", Si = (e, ...t) => Object.prototype.hasOwnProperty.call(e, ...t), Cn = (e) => nr(e) && _l(e), Wa = (e, t) => {
  if (e === t)
    return {};
  if (!nr(e) || !nr(t))
    return t;
  const n = e, r = t, i = Object.keys(n).reduce((a, u) => (Si(r, u) || (a[u] = void 0), a), {});
  return kn(n) || kn(r) ? n.valueOf() == r.valueOf() ? {} : r : Object.keys(r).reduce((a, u) => {
    if (!Si(n, u))
      return a[u] = r[u], a;
    const o = Wa(n[u], r[u]);
    return Cn(o) && !kn(o) && (Cn(n[u]) || !Cn(r[u])) || (a[u] = o), a;
  }, i);
};
var ml = "Expected a function", xi = 0 / 0, wl = "[object Symbol]", bl = /^\s+|\s+$/g, $l = /^[-+]0x[0-9a-f]+$/i, Al = /^0b[01]+$/i, Ol = /^0o[0-7]+$/i, Sl = parseInt, xl = typeof self == "object" && self && self.Object === Object && self, El = xl || Function("return this")(), kl = Object.prototype, Cl = kl.toString, jl = Math.max, Il = Math.min, jn = function() {
  return El.Date.now();
};
function Pl(e, t, n) {
  var r, i, a, u, o, s, _ = 0, b = !1, c = !1, m = !0;
  if (typeof e != "function")
    throw new TypeError(ml);
  t = Ei(t) || 0, rr(n) && (b = !!n.leading, c = "maxWait" in n, a = c ? jl(Ei(n.maxWait) || 0, t) : a, m = "trailing" in n ? !!n.trailing : m);
  function O(y) {
    var j = r, R = i;
    return r = i = void 0, _ = y, u = e.apply(R, j), u;
  }
  function $(y) {
    return _ = y, o = setTimeout(g, t), b ? O(y) : u;
  }
  function S(y) {
    var j = y - s, R = y - _, B = t - j;
    return c ? Il(B, a - R) : B;
  }
  function A(y) {
    var j = y - s, R = y - _;
    return s === void 0 || j >= t || j < 0 || c && R >= a;
  }
  function g() {
    var y = jn();
    if (A(y))
      return h(y);
    o = setTimeout(g, S(y));
  }
  function h(y) {
    return o = void 0, m && r ? O(y) : (r = i = void 0, u);
  }
  function f() {
    o !== void 0 && clearTimeout(o), _ = 0, r = s = i = o = void 0;
  }
  function l() {
    return o === void 0 ? u : h(jn());
  }
  function d() {
    var y = jn(), j = A(y);
    if (r = arguments, i = this, s = y, j) {
      if (o === void 0)
        return $(s);
      if (c)
        return o = setTimeout(g, t), O(s);
    }
    return o === void 0 && (o = setTimeout(g, t)), u;
  }
  return d.cancel = f, d.flush = l, d;
}
function rr(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function ql(e) {
  return !!e && typeof e == "object";
}
function Tl(e) {
  return typeof e == "symbol" || ql(e) && Cl.call(e) == wl;
}
function Ei(e) {
  if (typeof e == "number")
    return e;
  if (Tl(e))
    return xi;
  if (rr(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = rr(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(bl, "");
  var n = Al.test(e);
  return n || Ol.test(e) ? Sl(e.slice(2), n ? 2 : 8) : $l.test(e) ? xi : +e;
}
var Bl = Pl;
function Rl(e, t) {
  return ue(this, null, function* () {
    for (const [n, r] of Object.entries(t.state.value))
      for (const i of Object.keys(r)) {
        const a = yield e.config(`${n}.${i}`);
        a !== void 0 && (r[i] = JSON.parse(JSON.stringify(a)));
      }
  });
}
const Gl = (e) => {
  console.log("pouch plugin");
  const t = pl(e.database || "pinia-pouchdb-plugin");
  return (n) => {
    console.log("install callback"), n.app.component(e.component || "PouchDB", {
      render(i) {
        return Rr(Ha, Rr({
          setup() {
            return ue(this, null, function* () {
              yield Rl(t, n.pinia);
            });
          },
          render() {
            return i.$slots.default(n);
          }
        }));
      }
    });
    let r = JSON.parse(JSON.stringify(n.pinia.state)) || {};
    Ya(n.pinia.state, Bl(() => ue(void 0, null, function* () {
      for (const [i, a] of Object.entries(n.pinia.state.value)) {
        const u = JSON.parse(JSON.stringify(a)), o = Wa(r[i] || {}, u);
        for (let s of Object.keys(o))
          yield t.config(`${i}.${s}`, a[s]);
        r[i] = u;
      }
    }), e.wait || 100), {
      deep: !0
    });
  };
};
export {
  Ul as cache,
  zl as config,
  Fl as createCacheIndex,
  Ml as createConfigIndex,
  Nl as createIndex,
  Oe as db,
  pl as init,
  Rl as load,
  Kl as purge,
  Jl as removeCache,
  Ql as removeConfig,
  Gl as usePouchPlugin
};
