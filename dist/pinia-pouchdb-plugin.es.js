var M = (e, t, n) => new Promise((r, i) => {
  var a = (c) => {
    try {
      s(n.next(c));
    } catch (g) {
      i(g);
    }
  }, o = (c) => {
    try {
      s(n.throw(c));
    } catch (g) {
      i(g);
    }
  }, s = (c) => c.done ? r(c.value) : Promise.resolve(c.value).then(a, o);
  s((n = n.apply(e, t)).next());
});
import { defineComponent as fo, h as Ft, Suspense as lo, createApp as ho } from "vue";
const yn = (e) => e instanceof Date, vo = (e) => Object.keys(e).length === 0, jn = (e) => e != null && typeof e == "object", Jr = (e, ...t) => Object.prototype.hasOwnProperty.call(e, ...t), pn = (e) => jn(e) && vo(e), yo = () => /* @__PURE__ */ Object.create(null), on = (e, t) => {
  if (e === t)
    return {};
  if (!jn(e) || !jn(t))
    return t;
  const n = Object.keys(e).reduce((r, i) => (Jr(t, i) || (r[i] = void 0), r), yo());
  return yn(e) || yn(t) ? e.valueOf() == t.valueOf() ? {} : t : Object.keys(t).reduce((r, i) => {
    if (!Jr(e, i))
      return r[i] = t[i], r;
    const a = on(e[i], t[i]);
    return pn(a) && !yn(a) && (pn(e[i]) || !pn(t[i])) || (r[i] = a), r;
  }, n);
};
function po(e, t) {
  return M(this, null, function* () {
    for (const [n, r] of Object.entries(t.state.value))
      for (const i of Object.keys(r)) {
        const a = yield e.config(`${n}.${i}`);
        a !== void 0 && (r[i] = JSON.parse(JSON.stringify(a)));
      }
  });
}
const nd = (e) => (t) => {
  let n = JSON.parse(JSON.stringify(t.store.$state)) || {};
  t.store.$subscribe((r, i) => M(void 0, null, function* () {
    const a = JSON.parse(JSON.stringify(i)), o = on(n || {}, a);
    for (let s of Object.keys(o))
      yield e.database.config(
        `${t.store.$id}.${s}`,
        t.store[s]
      );
    n = a;
  }));
};
function go(e, t, n) {
  const { pinia: r, database: i, stores: a, loaded: o } = t || {}, s = fo({
    render() {
      return Ft(lo, Ft(Object.assign({
        setup: () => M(this, null, function* () {
          if (a)
            for (const c of a)
              c();
          yield po(i, r), o && o();
        }),
        render() {
          return Ft(e);
        }
      }, n)));
    }
  });
  return Ft(s, {}, { default: () => e });
}
function rd(e, t) {
  const n = ho(go(e, {
    database: t.database,
    pinia: t.pinia,
    stores: t.stores,
    loaded: t.loaded && function() {
      t.loaded(n);
    }
  }, {
    beforeMount: function() {
      t.mounted && t.beforeMount(n);
    },
    mounted: function() {
      t.mounted && t.mounted(n);
    }
  }));
  return n;
}
function Fi(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      if (this instanceof r) {
        var i = [null];
        i.push.apply(i, arguments);
        var a = Function.bind.apply(t, i);
        return new a();
      }
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
const _o = {}, mo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _o
}, Symbol.toStringTag, { value: "Module" })), wo = /* @__PURE__ */ Fi(mo);
var dr = {};
dr.test = function() {
  return typeof window.queueMicrotask == "function";
};
dr.install = function(e) {
  return function() {
    window.queueMicrotask(e);
  };
};
var hr = {}, Ui = window.MutationObserver || window.WebKitMutationObserver;
hr.test = function() {
  return Ui;
};
hr.install = function(e) {
  var t = 0, n = new Ui(e), r = window.document.createTextNode("");
  return n.observe(r, {
    characterData: !0
  }), function() {
    r.data = t = ++t % 2;
  };
};
var vr = {};
vr.test = function() {
  return window.setImmediate ? !1 : typeof window.MessageChannel != "undefined";
};
vr.install = function(e) {
  var t = new window.MessageChannel();
  return t.port1.onmessage = e, function() {
    t.port2.postMessage(0);
  };
};
var yr = {};
yr.test = function() {
  return "document" in window && "onreadystatechange" in window.document.createElement("script");
};
yr.install = function(e) {
  return function() {
    var t = window.document.createElement("script");
    return t.onreadystatechange = function() {
      e(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null;
    }, window.document.documentElement.appendChild(t), e;
  };
};
var pr = {};
pr.test = function() {
  return !0;
};
pr.install = function(e) {
  return function() {
    setTimeout(e, 0);
  };
};
var Ot = [wo, dr, hr, vr, yr, pr], ct, Ge, St = -1, Ne = [], Pn = !1;
function bo() {
  !ct || !Ge || (ct = !1, Ge.length ? Ne = Ge.concat(Ne) : St = -1, Ne.length && Ki());
}
function Ki() {
  if (!ct) {
    Pn = !1, ct = !0;
    for (var e = Ne.length, t = setTimeout(bo); e; ) {
      for (Ge = Ne, Ne = []; Ge && ++St < e; )
        Ge[St].run();
      St = -1, e = Ne.length;
    }
    Ge = null, St = -1, ct = !1, clearTimeout(t);
  }
}
var zi, wt = -1, $o = Ot.length;
for (; ++wt < $o; )
  if (Ot[wt] && Ot[wt].test && Ot[wt].test()) {
    zi = Ot[wt].install(Ki);
    break;
  }
function Qi(e, t) {
  this.fun = e, this.array = t;
}
Qi.prototype.run = function() {
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
var we = Oo;
function Oo(e) {
  var t = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var n = 1; n < arguments.length; n++)
      t[n - 1] = arguments[n];
  Ne.push(new Qi(e, t)), !Pn && !ct && (Pn = !0, zi());
}
var In = {}, So = {
  get exports() {
    return In;
  },
  set exports(e) {
    In = e;
  }
};
(function(e, t) {
  (function(n) {
    e.exports = n();
  })(function(n) {
    var r = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    function i(p, v) {
      var u = p[0], l = p[1], y = p[2], _ = p[3];
      u += (l & y | ~l & _) + v[0] - 680876936 | 0, u = (u << 7 | u >>> 25) + l | 0, _ += (u & l | ~u & y) + v[1] - 389564586 | 0, _ = (_ << 12 | _ >>> 20) + u | 0, y += (_ & u | ~_ & l) + v[2] + 606105819 | 0, y = (y << 17 | y >>> 15) + _ | 0, l += (y & _ | ~y & u) + v[3] - 1044525330 | 0, l = (l << 22 | l >>> 10) + y | 0, u += (l & y | ~l & _) + v[4] - 176418897 | 0, u = (u << 7 | u >>> 25) + l | 0, _ += (u & l | ~u & y) + v[5] + 1200080426 | 0, _ = (_ << 12 | _ >>> 20) + u | 0, y += (_ & u | ~_ & l) + v[6] - 1473231341 | 0, y = (y << 17 | y >>> 15) + _ | 0, l += (y & _ | ~y & u) + v[7] - 45705983 | 0, l = (l << 22 | l >>> 10) + y | 0, u += (l & y | ~l & _) + v[8] + 1770035416 | 0, u = (u << 7 | u >>> 25) + l | 0, _ += (u & l | ~u & y) + v[9] - 1958414417 | 0, _ = (_ << 12 | _ >>> 20) + u | 0, y += (_ & u | ~_ & l) + v[10] - 42063 | 0, y = (y << 17 | y >>> 15) + _ | 0, l += (y & _ | ~y & u) + v[11] - 1990404162 | 0, l = (l << 22 | l >>> 10) + y | 0, u += (l & y | ~l & _) + v[12] + 1804603682 | 0, u = (u << 7 | u >>> 25) + l | 0, _ += (u & l | ~u & y) + v[13] - 40341101 | 0, _ = (_ << 12 | _ >>> 20) + u | 0, y += (_ & u | ~_ & l) + v[14] - 1502002290 | 0, y = (y << 17 | y >>> 15) + _ | 0, l += (y & _ | ~y & u) + v[15] + 1236535329 | 0, l = (l << 22 | l >>> 10) + y | 0, u += (l & _ | y & ~_) + v[1] - 165796510 | 0, u = (u << 5 | u >>> 27) + l | 0, _ += (u & y | l & ~y) + v[6] - 1069501632 | 0, _ = (_ << 9 | _ >>> 23) + u | 0, y += (_ & l | u & ~l) + v[11] + 643717713 | 0, y = (y << 14 | y >>> 18) + _ | 0, l += (y & u | _ & ~u) + v[0] - 373897302 | 0, l = (l << 20 | l >>> 12) + y | 0, u += (l & _ | y & ~_) + v[5] - 701558691 | 0, u = (u << 5 | u >>> 27) + l | 0, _ += (u & y | l & ~y) + v[10] + 38016083 | 0, _ = (_ << 9 | _ >>> 23) + u | 0, y += (_ & l | u & ~l) + v[15] - 660478335 | 0, y = (y << 14 | y >>> 18) + _ | 0, l += (y & u | _ & ~u) + v[4] - 405537848 | 0, l = (l << 20 | l >>> 12) + y | 0, u += (l & _ | y & ~_) + v[9] + 568446438 | 0, u = (u << 5 | u >>> 27) + l | 0, _ += (u & y | l & ~y) + v[14] - 1019803690 | 0, _ = (_ << 9 | _ >>> 23) + u | 0, y += (_ & l | u & ~l) + v[3] - 187363961 | 0, y = (y << 14 | y >>> 18) + _ | 0, l += (y & u | _ & ~u) + v[8] + 1163531501 | 0, l = (l << 20 | l >>> 12) + y | 0, u += (l & _ | y & ~_) + v[13] - 1444681467 | 0, u = (u << 5 | u >>> 27) + l | 0, _ += (u & y | l & ~y) + v[2] - 51403784 | 0, _ = (_ << 9 | _ >>> 23) + u | 0, y += (_ & l | u & ~l) + v[7] + 1735328473 | 0, y = (y << 14 | y >>> 18) + _ | 0, l += (y & u | _ & ~u) + v[12] - 1926607734 | 0, l = (l << 20 | l >>> 12) + y | 0, u += (l ^ y ^ _) + v[5] - 378558 | 0, u = (u << 4 | u >>> 28) + l | 0, _ += (u ^ l ^ y) + v[8] - 2022574463 | 0, _ = (_ << 11 | _ >>> 21) + u | 0, y += (_ ^ u ^ l) + v[11] + 1839030562 | 0, y = (y << 16 | y >>> 16) + _ | 0, l += (y ^ _ ^ u) + v[14] - 35309556 | 0, l = (l << 23 | l >>> 9) + y | 0, u += (l ^ y ^ _) + v[1] - 1530992060 | 0, u = (u << 4 | u >>> 28) + l | 0, _ += (u ^ l ^ y) + v[4] + 1272893353 | 0, _ = (_ << 11 | _ >>> 21) + u | 0, y += (_ ^ u ^ l) + v[7] - 155497632 | 0, y = (y << 16 | y >>> 16) + _ | 0, l += (y ^ _ ^ u) + v[10] - 1094730640 | 0, l = (l << 23 | l >>> 9) + y | 0, u += (l ^ y ^ _) + v[13] + 681279174 | 0, u = (u << 4 | u >>> 28) + l | 0, _ += (u ^ l ^ y) + v[0] - 358537222 | 0, _ = (_ << 11 | _ >>> 21) + u | 0, y += (_ ^ u ^ l) + v[3] - 722521979 | 0, y = (y << 16 | y >>> 16) + _ | 0, l += (y ^ _ ^ u) + v[6] + 76029189 | 0, l = (l << 23 | l >>> 9) + y | 0, u += (l ^ y ^ _) + v[9] - 640364487 | 0, u = (u << 4 | u >>> 28) + l | 0, _ += (u ^ l ^ y) + v[12] - 421815835 | 0, _ = (_ << 11 | _ >>> 21) + u | 0, y += (_ ^ u ^ l) + v[15] + 530742520 | 0, y = (y << 16 | y >>> 16) + _ | 0, l += (y ^ _ ^ u) + v[2] - 995338651 | 0, l = (l << 23 | l >>> 9) + y | 0, u += (y ^ (l | ~_)) + v[0] - 198630844 | 0, u = (u << 6 | u >>> 26) + l | 0, _ += (l ^ (u | ~y)) + v[7] + 1126891415 | 0, _ = (_ << 10 | _ >>> 22) + u | 0, y += (u ^ (_ | ~l)) + v[14] - 1416354905 | 0, y = (y << 15 | y >>> 17) + _ | 0, l += (_ ^ (y | ~u)) + v[5] - 57434055 | 0, l = (l << 21 | l >>> 11) + y | 0, u += (y ^ (l | ~_)) + v[12] + 1700485571 | 0, u = (u << 6 | u >>> 26) + l | 0, _ += (l ^ (u | ~y)) + v[3] - 1894986606 | 0, _ = (_ << 10 | _ >>> 22) + u | 0, y += (u ^ (_ | ~l)) + v[10] - 1051523 | 0, y = (y << 15 | y >>> 17) + _ | 0, l += (_ ^ (y | ~u)) + v[1] - 2054922799 | 0, l = (l << 21 | l >>> 11) + y | 0, u += (y ^ (l | ~_)) + v[8] + 1873313359 | 0, u = (u << 6 | u >>> 26) + l | 0, _ += (l ^ (u | ~y)) + v[15] - 30611744 | 0, _ = (_ << 10 | _ >>> 22) + u | 0, y += (u ^ (_ | ~l)) + v[6] - 1560198380 | 0, y = (y << 15 | y >>> 17) + _ | 0, l += (_ ^ (y | ~u)) + v[13] + 1309151649 | 0, l = (l << 21 | l >>> 11) + y | 0, u += (y ^ (l | ~_)) + v[4] - 145523070 | 0, u = (u << 6 | u >>> 26) + l | 0, _ += (l ^ (u | ~y)) + v[11] - 1120210379 | 0, _ = (_ << 10 | _ >>> 22) + u | 0, y += (u ^ (_ | ~l)) + v[2] + 718787259 | 0, y = (y << 15 | y >>> 17) + _ | 0, l += (_ ^ (y | ~u)) + v[9] - 343485551 | 0, l = (l << 21 | l >>> 11) + y | 0, p[0] = u + p[0] | 0, p[1] = l + p[1] | 0, p[2] = y + p[2] | 0, p[3] = _ + p[3] | 0;
    }
    function a(p) {
      var v = [], u;
      for (u = 0; u < 64; u += 4)
        v[u >> 2] = p.charCodeAt(u) + (p.charCodeAt(u + 1) << 8) + (p.charCodeAt(u + 2) << 16) + (p.charCodeAt(u + 3) << 24);
      return v;
    }
    function o(p) {
      var v = [], u;
      for (u = 0; u < 64; u += 4)
        v[u >> 2] = p[u] + (p[u + 1] << 8) + (p[u + 2] << 16) + (p[u + 3] << 24);
      return v;
    }
    function s(p) {
      var v = p.length, u = [1732584193, -271733879, -1732584194, 271733878], l, y, _, j, I, P;
      for (l = 64; l <= v; l += 64)
        i(u, a(p.substring(l - 64, l)));
      for (p = p.substring(l - 64), y = p.length, _ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], l = 0; l < y; l += 1)
        _[l >> 2] |= p.charCodeAt(l) << (l % 4 << 3);
      if (_[l >> 2] |= 128 << (l % 4 << 3), l > 55)
        for (i(u, _), l = 0; l < 16; l += 1)
          _[l] = 0;
      return j = v * 8, j = j.toString(16).match(/(.*?)(.{0,8})$/), I = parseInt(j[2], 16), P = parseInt(j[1], 16) || 0, _[14] = I, _[15] = P, i(u, _), u;
    }
    function c(p) {
      var v = p.length, u = [1732584193, -271733879, -1732584194, 271733878], l, y, _, j, I, P;
      for (l = 64; l <= v; l += 64)
        i(u, o(p.subarray(l - 64, l)));
      for (p = l - 64 < v ? p.subarray(l - 64) : new Uint8Array(0), y = p.length, _ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], l = 0; l < y; l += 1)
        _[l >> 2] |= p[l] << (l % 4 << 3);
      if (_[l >> 2] |= 128 << (l % 4 << 3), l > 55)
        for (i(u, _), l = 0; l < 16; l += 1)
          _[l] = 0;
      return j = v * 8, j = j.toString(16).match(/(.*?)(.{0,8})$/), I = parseInt(j[2], 16), P = parseInt(j[1], 16) || 0, _[14] = I, _[15] = P, i(u, _), u;
    }
    function g(p) {
      var v = "", u;
      for (u = 0; u < 4; u += 1)
        v += r[p >> u * 8 + 4 & 15] + r[p >> u * 8 & 15];
      return v;
    }
    function w(p) {
      var v;
      for (v = 0; v < p.length; v += 1)
        p[v] = g(p[v]);
      return p.join("");
    }
    w(s("hello")), typeof ArrayBuffer != "undefined" && !ArrayBuffer.prototype.slice && function() {
      function p(v, u) {
        return v = v | 0 || 0, v < 0 ? Math.max(v + u, 0) : Math.min(v, u);
      }
      ArrayBuffer.prototype.slice = function(v, u) {
        var l = this.byteLength, y = p(v, l), _ = l, j, I, P, F;
        return u !== n && (_ = p(u, l)), y > _ ? new ArrayBuffer(0) : (j = _ - y, I = new ArrayBuffer(j), P = new Uint8Array(I), F = new Uint8Array(this, y, j), P.set(F), I);
      };
    }();
    function f(p) {
      return /[\u0080-\uFFFF]/.test(p) && (p = unescape(encodeURIComponent(p))), p;
    }
    function m(p, v) {
      var u = p.length, l = new ArrayBuffer(u), y = new Uint8Array(l), _;
      for (_ = 0; _ < u; _ += 1)
        y[_] = p.charCodeAt(_);
      return v ? y : l;
    }
    function S(p) {
      return String.fromCharCode.apply(null, new Uint8Array(p));
    }
    function A(p, v, u) {
      var l = new Uint8Array(p.byteLength + v.byteLength);
      return l.set(new Uint8Array(p)), l.set(new Uint8Array(v), p.byteLength), u ? l : l.buffer;
    }
    function E(p) {
      var v = [], u = p.length, l;
      for (l = 0; l < u - 1; l += 2)
        v.push(parseInt(p.substr(l, 2), 16));
      return String.fromCharCode.apply(String, v);
    }
    function $() {
      this.reset();
    }
    return $.prototype.append = function(p) {
      return this.appendBinary(f(p)), this;
    }, $.prototype.appendBinary = function(p) {
      this._buff += p, this._length += p.length;
      var v = this._buff.length, u;
      for (u = 64; u <= v; u += 64)
        i(this._hash, a(this._buff.substring(u - 64, u)));
      return this._buff = this._buff.substring(u - 64), this;
    }, $.prototype.end = function(p) {
      var v = this._buff, u = v.length, l, y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], _;
      for (l = 0; l < u; l += 1)
        y[l >> 2] |= v.charCodeAt(l) << (l % 4 << 3);
      return this._finish(y, u), _ = w(this._hash), p && (_ = E(_)), this.reset(), _;
    }, $.prototype.reset = function() {
      return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, $.prototype.getState = function() {
      return {
        buff: this._buff,
        length: this._length,
        hash: this._hash.slice()
      };
    }, $.prototype.setState = function(p) {
      return this._buff = p.buff, this._length = p.length, this._hash = p.hash, this;
    }, $.prototype.destroy = function() {
      delete this._hash, delete this._buff, delete this._length;
    }, $.prototype._finish = function(p, v) {
      var u = v, l, y, _;
      if (p[u >> 2] |= 128 << (u % 4 << 3), u > 55)
        for (i(this._hash, p), u = 0; u < 16; u += 1)
          p[u] = 0;
      l = this._length * 8, l = l.toString(16).match(/(.*?)(.{0,8})$/), y = parseInt(l[2], 16), _ = parseInt(l[1], 16) || 0, p[14] = y, p[15] = _, i(this._hash, p);
    }, $.hash = function(p, v) {
      return $.hashBinary(f(p), v);
    }, $.hashBinary = function(p, v) {
      var u = s(p), l = w(u);
      return v ? E(l) : l;
    }, $.ArrayBuffer = function() {
      this.reset();
    }, $.ArrayBuffer.prototype.append = function(p) {
      var v = A(this._buff.buffer, p, !0), u = v.length, l;
      for (this._length += p.byteLength, l = 64; l <= u; l += 64)
        i(this._hash, o(v.subarray(l - 64, l)));
      return this._buff = l - 64 < u ? new Uint8Array(v.buffer.slice(l - 64)) : new Uint8Array(0), this;
    }, $.ArrayBuffer.prototype.end = function(p) {
      var v = this._buff, u = v.length, l = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], y, _;
      for (y = 0; y < u; y += 1)
        l[y >> 2] |= v[y] << (y % 4 << 3);
      return this._finish(l, u), _ = w(this._hash), p && (_ = E(_)), this.reset(), _;
    }, $.ArrayBuffer.prototype.reset = function() {
      return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, $.ArrayBuffer.prototype.getState = function() {
      var p = $.prototype.getState.call(this);
      return p.buff = S(p.buff), p;
    }, $.ArrayBuffer.prototype.setState = function(p) {
      return p.buff = m(p.buff, !0), $.prototype.setState.call(this, p);
    }, $.ArrayBuffer.prototype.destroy = $.prototype.destroy, $.ArrayBuffer.prototype._finish = $.prototype._finish, $.ArrayBuffer.hash = function(p, v) {
      var u = c(new Uint8Array(p)), l = w(u);
      return v ? E(l) : l;
    }, $;
  });
})(So);
const Ht = In;
var Ut, ko = new Uint8Array(16);
function Ao() {
  if (!Ut && (Ut = typeof crypto != "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != "undefined" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !Ut))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Ut(ko);
}
const xo = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function Eo(e) {
  return typeof e == "string" && xo.test(e);
}
var ye = [];
for (var gn = 0; gn < 256; ++gn)
  ye.push((gn + 256).toString(16).substr(1));
function Co(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = (ye[e[t + 0]] + ye[e[t + 1]] + ye[e[t + 2]] + ye[e[t + 3]] + "-" + ye[e[t + 4]] + ye[e[t + 5]] + "-" + ye[e[t + 6]] + ye[e[t + 7]] + "-" + ye[e[t + 8]] + ye[e[t + 9]] + "-" + ye[e[t + 10]] + ye[e[t + 11]] + ye[e[t + 12]] + ye[e[t + 13]] + ye[e[t + 14]] + ye[e[t + 15]]).toLowerCase();
  if (!Eo(n))
    throw TypeError("Stringified UUID is invalid");
  return n;
}
function gr(e, t, n) {
  e = e || {};
  var r = e.random || (e.rng || Ao)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (var i = 0; i < 16; ++i)
      t[n + i] = r[i];
    return t;
  }
  return Co(r);
}
var sn = {};
sn.stringify = function(t) {
  var n = [];
  n.push({
    obj: t
  });
  for (var r = "", i, a, o, s, c, g, w, f, m, S, A; i = n.pop(); )
    if (a = i.obj, o = i.prefix || "", s = i.val || "", r += o, s)
      r += s;
    else if (typeof a != "object")
      r += typeof a == "undefined" ? null : JSON.stringify(a);
    else if (a === null)
      r += "null";
    else if (Array.isArray(a)) {
      for (n.push({
        val: "]"
      }), c = a.length - 1; c >= 0; c--)
        g = c === 0 ? "" : ",", n.push({
          obj: a[c],
          prefix: g
        });
      n.push({
        val: "["
      });
    } else {
      w = [];
      for (f in a)
        a.hasOwnProperty(f) && w.push(f);
      for (n.push({
        val: "}"
      }), c = w.length - 1; c >= 0; c--)
        m = w[c], S = a[m], A = c > 0 ? "," : "", A += JSON.stringify(m) + ":", n.push({
          obj: S,
          prefix: A
        });
      n.push({
        val: "{"
      });
    }
  return r;
};
function at(e, t, n) {
  var r = n[n.length - 1];
  e === r.element && (n.pop(), r = n[n.length - 1]);
  var i = r.element, a = r.index;
  if (Array.isArray(i))
    i.push(e);
  else if (a === t.length - 2) {
    var o = t.pop();
    i[o] = e;
  } else
    t.push(e);
}
sn.parse = function(e) {
  for (var t = [], n = [], r = 0, i, a, o, s, c, g, w, f, m; ; ) {
    if (i = e[r++], i === "}" || i === "]" || typeof i == "undefined") {
      if (t.length === 1)
        return t.pop();
      at(t.pop(), t, n);
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
        r += 3, at(null, t, n);
        break;
      case "t":
        r += 3, at(!0, t, n);
        break;
      case "f":
        r += 4, at(!1, t, n);
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
          if (o = e[r++], /[\d\.\-e\+]/.test(o))
            a += o;
          else {
            r--;
            break;
          }
        at(parseFloat(a), t, n);
        break;
      case '"':
        for (s = "", c = void 0, g = 0; w = e[r++], w !== '"' || c === "\\" && g % 2 === 1; )
          s += w, c = w, c === "\\" ? g++ : g = 0;
        at(JSON.parse('"' + s + '"'), t, n);
        break;
      case "[":
        f = {
          element: [],
          index: t.length
        }, t.push(f.element), n.push(f);
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
var ke = {}, To = {
  get exports() {
    return ke;
  },
  set exports(e) {
    ke = e;
  }
}, ft = typeof Reflect == "object" ? Reflect : null, Gr = ft && typeof ft.apply == "function" ? ft.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, Jt;
ft && typeof ft.ownKeys == "function" ? Jt = ft.ownKeys : Object.getOwnPropertySymbols ? Jt = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Jt = function(t) {
  return Object.getOwnPropertyNames(t);
};
function qo(e) {
  console && console.warn && console.warn(e);
}
var Ji = Number.isNaN || function(t) {
  return t !== t;
};
function ie() {
  ie.init.call(this);
}
To.exports = ie;
ke.once = Bo;
ie.EventEmitter = ie;
ie.prototype._events = void 0;
ie.prototype._eventsCount = 0;
ie.prototype._maxListeners = void 0;
var Wr = 10;
function un(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(ie, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Wr;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || Ji(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    Wr = e;
  }
});
ie.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
ie.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || Ji(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function Gi(e) {
  return e._maxListeners === void 0 ? ie.defaultMaxListeners : e._maxListeners;
}
ie.prototype.getMaxListeners = function() {
  return Gi(this);
};
ie.prototype.emit = function(t) {
  for (var n = [], r = 1; r < arguments.length; r++)
    n.push(arguments[r]);
  var i = t === "error", a = this._events;
  if (a !== void 0)
    i = i && a.error === void 0;
  else if (!i)
    return !1;
  if (i) {
    var o;
    if (n.length > 0 && (o = n[0]), o instanceof Error)
      throw o;
    var s = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw s.context = o, s;
  }
  var c = a[t];
  if (c === void 0)
    return !1;
  if (typeof c == "function")
    Gr(c, this, n);
  else
    for (var g = c.length, w = Zi(c, g), r = 0; r < g; ++r)
      Gr(w[r], this, n);
  return !0;
};
function Wi(e, t, n, r) {
  var i, a, o;
  if (un(n), a = e._events, a === void 0 ? (a = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (a.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n), a = e._events), o = a[t]), o === void 0)
    o = a[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = a[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), i = Gi(e), i > 0 && o.length > i && !o.warned) {
    o.warned = !0;
    var s = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    s.name = "MaxListenersExceededWarning", s.emitter = e, s.type = t, s.count = o.length, qo(s);
  }
  return e;
}
ie.prototype.addListener = function(t, n) {
  return Wi(this, t, n, !1);
};
ie.prototype.on = ie.prototype.addListener;
ie.prototype.prependListener = function(t, n) {
  return Wi(this, t, n, !0);
};
function jo() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Hi(e, t, n) {
  var r = {
    fired: !1,
    wrapFn: void 0,
    target: e,
    type: t,
    listener: n
  }, i = jo.bind(r);
  return i.listener = n, r.wrapFn = i, i;
}
ie.prototype.once = function(t, n) {
  return un(n), this.on(t, Hi(this, t, n)), this;
};
ie.prototype.prependOnceListener = function(t, n) {
  return un(n), this.prependListener(t, Hi(this, t, n)), this;
};
ie.prototype.removeListener = function(t, n) {
  var r, i, a, o, s;
  if (un(n), i = this._events, i === void 0)
    return this;
  if (r = i[t], r === void 0)
    return this;
  if (r === n || r.listener === n)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[t], i.removeListener && this.emit("removeListener", t, r.listener || n));
  else if (typeof r != "function") {
    for (a = -1, o = r.length - 1; o >= 0; o--)
      if (r[o] === n || r[o].listener === n) {
        s = r[o].listener, a = o;
        break;
      }
    if (a < 0)
      return this;
    a === 0 ? r.shift() : Po(r, a), r.length === 1 && (i[t] = r[0]), i.removeListener !== void 0 && this.emit("removeListener", t, s || n);
  }
  return this;
};
ie.prototype.off = ie.prototype.removeListener;
ie.prototype.removeAllListeners = function(t) {
  var n, r, i;
  if (r = this._events, r === void 0)
    return this;
  if (r.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : r[t] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete r[t]), this;
  if (arguments.length === 0) {
    var a = Object.keys(r), o;
    for (i = 0; i < a.length; ++i)
      o = a[i], o !== "removeListener" && this.removeAllListeners(o);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (n = r[t], typeof n == "function")
    this.removeListener(t, n);
  else if (n !== void 0)
    for (i = n.length - 1; i >= 0; i--)
      this.removeListener(t, n[i]);
  return this;
};
function Xi(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var i = r[t];
  return i === void 0 ? [] : typeof i == "function" ? n ? [i.listener || i] : [i] : n ? Io(i) : Zi(i, i.length);
}
ie.prototype.listeners = function(t) {
  return Xi(this, t, !0);
};
ie.prototype.rawListeners = function(t) {
  return Xi(this, t, !1);
};
ie.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : Yi.call(e, t);
};
ie.prototype.listenerCount = Yi;
function Yi(e) {
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
ie.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Jt(this._events) : [];
};
function Zi(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function Po(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function Io(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function Bo(e, t) {
  return new Promise(function(n, r) {
    function i(o) {
      e.removeListener(t, a), r(o);
    }
    function a() {
      typeof e.removeListener == "function" && e.removeListener("error", i), n([].slice.call(arguments));
    }
    Vi(e, t, a, {
      once: !0
    }), t !== "error" && Ro(e, i, {
      once: !0
    });
  });
}
function Ro(e, t, n) {
  typeof e.on == "function" && Vi(e, "error", t, n);
}
function Vi(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function i(a) {
      r.once && e.removeEventListener(t, i), n(a);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
function cn(e) {
  return "$" + e;
}
function ea(e) {
  return e.substring(1);
}
function Le() {
  this._store = {};
}
Le.prototype.get = function(e) {
  var t = cn(e);
  return this._store[t];
};
Le.prototype.set = function(e, t) {
  var n = cn(e);
  return this._store[n] = t, !0;
};
Le.prototype.has = function(e) {
  var t = cn(e);
  return t in this._store;
};
Le.prototype.keys = function() {
  return Object.keys(this._store).map((e) => ea(e));
};
Le.prototype.delete = function(e) {
  var t = cn(e), n = t in this._store;
  return delete this._store[t], n;
};
Le.prototype.forEach = function(e) {
  for (var t = Object.keys(this._store), n = 0, r = t.length; n < r; n++) {
    var i = t[n], a = this._store[i];
    i = ea(i), e(a, i);
  }
};
Object.defineProperty(Le.prototype, "size", {
  get: function() {
    return Object.keys(this._store).length;
  }
});
function jt(e) {
  if (this._store = new Le(), e && Array.isArray(e))
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
function Lo() {
  if (typeof Symbol == "undefined" || typeof Map == "undefined" || typeof Set == "undefined")
    return !1;
  var e = Object.getOwnPropertyDescriptor(Map, Symbol.species);
  return e && "get" in e && Map[Symbol.species] === Map;
}
var vt, be;
Lo() ? (vt = Set, be = Map) : (vt = jt, be = Le);
function Do(e) {
  return typeof ArrayBuffer != "undefined" && e instanceof ArrayBuffer || typeof Blob != "undefined" && e instanceof Blob;
}
function No(e) {
  if (typeof e.slice == "function")
    return e.slice(0);
  var t = new ArrayBuffer(e.byteLength), n = new Uint8Array(t), r = new Uint8Array(e);
  return n.set(r), t;
}
function Mo(e) {
  if (e instanceof ArrayBuffer)
    return No(e);
  var t = e.size, n = e.type;
  return typeof e.slice == "function" ? e.slice(0, t, n) : e.webkitSlice(0, t, n);
}
var ta = Function.prototype.toString, Fo = ta.call(Object);
function Uo(e) {
  var t = Object.getPrototypeOf(e);
  if (t === null)
    return !0;
  var n = t.constructor;
  return typeof n == "function" && n instanceof n && ta.call(n) == Fo;
}
function ve(e) {
  var t, n, r;
  if (!e || typeof e != "object")
    return e;
  if (Array.isArray(e)) {
    for (t = [], n = 0, r = e.length; n < r; n++)
      t[n] = ve(e[n]);
    return t;
  }
  if (e instanceof Date && isFinite(e))
    return e.toISOString();
  if (Do(e))
    return Mo(e);
  if (!Uo(e))
    return e;
  t = {};
  for (n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      var i = ve(e[n]);
      typeof i != "undefined" && (t[n] = i);
    }
  return t;
}
function na(e) {
  var t = !1;
  return function(...n) {
    if (t)
      throw new Error("once called more than once");
    t = !0, e.apply(this, n);
  };
}
function ra(e) {
  return function(...t) {
    t = ve(t);
    var n = this, r = typeof t[t.length - 1] == "function" ? t.pop() : !1, i = new Promise(function(a, o) {
      var s;
      try {
        var c = na(function(g, w) {
          g ? o(g) : a(w);
        });
        t.push(c), s = e.apply(n, t), s && typeof s.then == "function" && a(s);
      } catch (g) {
        o(g);
      }
    });
    return r && i.then(function(a) {
      r(null, a);
    }, r), i;
  };
}
function Ko(e, t, n) {
  if (e.constructor.listeners("debug").length) {
    for (var r = ["api", e.name, t], i = 0; i < n.length - 1; i++)
      r.push(n[i]);
    e.constructor.emit("debug", r);
    var a = n[n.length - 1];
    n[n.length - 1] = function(o, s) {
      var c = ["api", e.name, t];
      c = c.concat(o ? ["error", o] : ["success", s]), e.constructor.emit("debug", c), a(o, s);
    };
  }
}
function ue(e, t) {
  return ra(function(...n) {
    if (this._closed)
      return Promise.reject(new Error("database is closed"));
    if (this._destroyed)
      return Promise.reject(new Error("database is destroyed"));
    var r = this;
    return Ko(r, e, n), this.taskqueue.isReady ? t.apply(this, n) : new Promise(function(i, a) {
      r.taskqueue.addTask(function(o) {
        o ? a(o) : i(r[e].apply(r, n));
      });
    });
  });
}
function Pt(e, t) {
  for (var n = {}, r = 0, i = t.length; r < i; r++) {
    var a = t[r];
    a in e && (n[a] = e[a]);
  }
  return n;
}
var zo = 6;
function Hr(e) {
  return e;
}
function Qo(e) {
  return [{
    ok: e
  }];
}
function ia(e, t, n) {
  var r = t.docs, i = new be();
  r.forEach(function(E) {
    i.has(E.id) ? i.get(E.id).push(E) : i.set(E.id, [E]);
  });
  var a = i.size, o = 0, s = new Array(a);
  function c() {
    var E = [];
    s.forEach(function($) {
      $.docs.forEach(function(p) {
        E.push({
          id: $.id,
          docs: [p]
        });
      });
    }), n(null, {
      results: E
    });
  }
  function g() {
    ++o === a && c();
  }
  function w(E, $, p) {
    s[E] = {
      id: $,
      docs: p
    }, g();
  }
  var f = [];
  i.forEach(function(E, $) {
    f.push($);
  });
  var m = 0;
  function S() {
    if (!(m >= f.length)) {
      var E = Math.min(m + zo, f.length), $ = f.slice(m, E);
      A($, m), m += $.length;
    }
  }
  function A(E, $) {
    E.forEach(function(p, v) {
      var u = $ + v, l = i.get(p), y = Pt(l[0], ["atts_since", "attachments"]);
      y.open_revs = l.map(function(j) {
        return j.rev;
      }), y.open_revs = y.open_revs.filter(Hr);
      var _ = Hr;
      y.open_revs.length === 0 && (delete y.open_revs, _ = Qo), ["revs", "attachments", "binary", "ajax", "latest"].forEach(function(j) {
        j in t && (y[j] = t[j]);
      }), e.get(p, y, function(j, I) {
        var P;
        j ? P = [{
          error: j
        }] : P = _(I), w(u, p, P), S();
      });
    });
  }
  S();
}
var Bn;
try {
  localStorage.setItem("_pouch_check_localstorage", 1), Bn = !!localStorage.getItem("_pouch_check_localstorage");
} catch (e) {
  Bn = !1;
}
function Xt() {
  return Bn;
}
class Jo extends ke {
  constructor() {
    super(), this._listeners = {}, Xt() && addEventListener("storage", function(t) {
      this.emit(t.key);
    });
  }
  addListener(t, n, r, i) {
    if (this._listeners[n])
      return;
    var a = !1, o = this;
    function s() {
      if (!o._listeners[n])
        return;
      if (a) {
        a = "waiting";
        return;
      }
      a = !0;
      var c = Pt(i, ["style", "include_docs", "attachments", "conflicts", "filter", "doc_ids", "view", "since", "query_params", "binary", "return_docs"]);
      function g() {
        a = !1;
      }
      r.changes(c).on("change", function(w) {
        w.seq > i.since && !i.cancelled && (i.since = w.seq, i.onChange(w));
      }).on("complete", function() {
        a === "waiting" && we(s), a = !1;
      }).on("error", g);
    }
    this._listeners[n] = s, this.on(t, s);
  }
  removeListener(t, n) {
    n in this._listeners && (super.removeListener(t, this._listeners[n]), delete this._listeners[n]);
  }
  notifyLocalWindows(t) {
    Xt() && (localStorage[t] = localStorage[t] === "a" ? "b" : "a");
  }
  notify(t) {
    this.emit(t), this.notifyLocalWindows(t);
  }
}
function Ae(e) {
  if (typeof console != "undefined" && typeof console[e] == "function") {
    var t = Array.prototype.slice.call(arguments, 1);
    console[e].apply(console, t);
  }
}
function Go(e, t) {
  var n = 6e5;
  e = parseInt(e, 10) || 0, t = parseInt(t, 10), t !== t || t <= e ? t = (e || 1) << 1 : t = t + 1, t > n && (e = n >> 1, t = n);
  var r = Math.random(), i = t - e;
  return ~~(i * r + e);
}
function Wo(e) {
  var t = 0;
  return e || (t = 2e3), Go(e, t);
}
function Rn(e, t) {
  Ae("info", "The above " + e + " is totally normal. " + t);
}
var Ln;
typeof Object.assign == "function" ? Ln = Object.assign : Ln = function(e) {
  for (var t = Object(e), n = 1; n < arguments.length; n++) {
    var r = arguments[n];
    if (r != null)
      for (var i in r)
        Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
  }
  return t;
};
var Ye = Ln;
let oe = class extends Error {
  constructor(t, n, r) {
    super(), this.status = t, this.name = n, this.message = r, this.error = !0;
  }
  toString() {
    return JSON.stringify({
      status: this.status,
      name: this.name,
      message: this.message,
      reason: this.reason
    });
  }
};
new oe(401, "unauthorized", "Name or password is incorrect.");
var Ho = new oe(400, "bad_request", "Missing JSON list of 'docs'"), Oe = new oe(404, "not_found", "missing"), yt = new oe(409, "conflict", "Document update conflict"), aa = new oe(400, "bad_request", "_id field must contain a string"), Xo = new oe(412, "missing_id", "_id is required for puts"), Yo = new oe(400, "bad_request", "Only reserved document ids may start with underscore.");
new oe(412, "precondition_failed", "Database not open");
var _r = new oe(500, "unknown_error", "Database encountered an unknown error"), oa = new oe(500, "badarg", "Some query argument is invalid");
new oe(400, "invalid_request", "Request was invalid");
var Zo = new oe(400, "query_parse_error", "Some query parameter is invalid"), Xr = new oe(500, "doc_validation", "Bad special document member"), fn = new oe(400, "bad_request", "Something wrong with the request"), _n = new oe(400, "bad_request", "Document must be a JSON object");
new oe(404, "not_found", "Database not found");
var mr = new oe(500, "indexed_db_went_bad", "unknown");
new oe(500, "web_sql_went_bad", "unknown");
new oe(500, "levelDB_went_went_bad", "unknown");
new oe(403, "forbidden", "Forbidden by design doc validate_doc_update function");
var sa = new oe(400, "bad_request", "Invalid rev format");
new oe(412, "file_exists", "The database could not be created, the file already exists.");
var Vo = new oe(412, "missing_stub", "A pre-existing attachment stub wasn't found");
new oe(413, "invalid_url", "Provided URL is invalid");
function te(e, t) {
  function n(r) {
    for (var i = Object.getOwnPropertyNames(e), a = 0, o = i.length; a < o; a++)
      typeof e[i[a]] != "function" && (this[i[a]] = e[i[a]]);
    this.stack === void 0 && (this.stack = new Error().stack), r !== void 0 && (this.reason = r);
  }
  return n.prototype = oe.prototype, new n(t);
}
function pt(e) {
  if (typeof e != "object") {
    var t = e;
    e = _r, e.data = t;
  }
  return "error" in e && e.error === "conflict" && (e.name = "conflict", e.status = 409), "name" in e || (e.name = e.error || "unknown"), "status" in e || (e.status = 500), "message" in e || (e.message = e.message || e.reason), "stack" in e || (e.stack = new Error().stack), e;
}
function es(e, t, n) {
  try {
    return !e(t, n);
  } catch (i) {
    var r = "Filter function threw: " + i.toString();
    return te(fn, r);
  }
}
function wr(e) {
  var t = {}, n = e.filter && typeof e.filter == "function";
  return t.query = e.query_params, function(i) {
    i.doc || (i.doc = {});
    var a = n && es(e.filter, i.doc, t);
    if (typeof a == "object")
      return a;
    if (a)
      return !1;
    if (!e.include_docs)
      delete i.doc;
    else if (!e.attachments)
      for (var o in i.doc._attachments)
        Object.prototype.hasOwnProperty.call(i.doc._attachments, o) && (i.doc._attachments[o].stub = !0);
    return !0;
  };
}
function Yt(e) {
  for (var t = [], n = 0, r = e.length; n < r; n++)
    t = t.concat(e[n]);
  return t;
}
function ua(e) {
  var t;
  if (e ? typeof e != "string" ? t = te(aa) : /^_/.test(e) && !/^_(design|local)/.test(e) && (t = te(Yo)) : t = te(Xo), t)
    throw t;
}
function Be(e) {
  return typeof e._remote == "boolean" ? e._remote : typeof e.type == "function" ? (Ae("warn", "db.type() is deprecated and will be removed in a future version of PouchDB"), e.type() === "http") : !1;
}
function ts(e, t) {
  return "listenerCount" in e ? e.listenerCount(t) : ke.listenerCount(e, t);
}
function Dn(e) {
  if (!e)
    return null;
  var t = e.split("/");
  return t.length === 2 ? t : t.length === 1 ? [e, e] : null;
}
function Yr(e) {
  var t = Dn(e);
  return t ? t.join("/") : null;
}
var Zr = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"], Vr = "queryKey", ns = /(?:^|&)([^&=]*)=?([^&]*)/g, rs = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
function ca(e) {
  for (var t = rs.exec(e), n = {}, r = 14; r--; ) {
    var i = Zr[r], a = t[r] || "", o = ["user", "password"].indexOf(i) !== -1;
    n[i] = o ? decodeURIComponent(a) : a;
  }
  return n[Vr] = {}, n[Zr[12]].replace(ns, function(s, c, g) {
    c && (n[Vr][c] = g);
  }), n;
}
function br(e, t) {
  var n = [], r = [];
  for (var i in t)
    Object.prototype.hasOwnProperty.call(t, i) && (n.push(i), r.push(t[i]));
  return n.push(e), Function.apply(null, n).apply(null, r);
}
function Zt(e, t, n) {
  return e.get(t).catch(function(r) {
    if (r.status !== 404)
      throw r;
    return {};
  }).then(function(r) {
    var i = r._rev, a = n(r);
    return a ? (a._id = t, a._rev = i, is(e, a, n)) : {
      updated: !1,
      rev: i
    };
  });
}
function is(e, t, n) {
  return e.put(t).then(function(r) {
    return {
      updated: !0,
      rev: r.rev
    };
  }, function(r) {
    if (r.status !== 409)
      throw r;
    return Zt(e, t._id, n);
  });
}
var $r = function(e) {
  return atob(e);
}, It = function(e) {
  return btoa(e);
};
function Or(e, t) {
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
function as(e) {
  for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), i = 0; i < t; i++)
    r[i] = e.charCodeAt(i);
  return n;
}
function Sr(e, t) {
  return Or([as(e)], {
    type: t
  });
}
function kr(e, t) {
  return Sr($r(e), t);
}
function os(e) {
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
    t(os(a));
  }, r ? n.readAsBinaryString(e) : n.readAsArrayBuffer(e);
}
function la(e, t) {
  fa(e, function(n) {
    t(n);
  });
}
function Ar(e, t) {
  la(e, function(n) {
    t(It(n));
  });
}
function ss(e, t) {
  var n = new FileReader();
  n.onloadend = function(r) {
    var i = r.target.result || new ArrayBuffer(0);
    t(i);
  }, n.readAsArrayBuffer(e);
}
var us = self.setImmediate || self.setTimeout, cs = 32768;
function fs(e) {
  return It(e);
}
function ls(e, t, n) {
  return e.webkitSlice ? e.webkitSlice(t, n) : e.slice(t, n);
}
function ds(e, t, n, r, i) {
  (n > 0 || r < t.size) && (t = ls(t, n, r)), ss(t, function(a) {
    e.append(a), i();
  });
}
function hs(e, t, n, r, i) {
  (n > 0 || r < t.length) && (t = t.substring(n, r)), e.appendBinary(t), i();
}
function xr(e, t) {
  var n = typeof e == "string", r = n ? e.length : e.size, i = Math.min(cs, r), a = Math.ceil(r / i), o = 0, s = n ? new Ht() : new Ht.ArrayBuffer(), c = n ? hs : ds;
  function g() {
    us(f);
  }
  function w() {
    var m = s.end(!0), S = fs(m);
    t(S), s.destroy();
  }
  function f() {
    var m = o * i, S = m + i;
    o++, o < a ? c(s, e, m, S, g) : c(s, e, m, S, w);
  }
  f();
}
function da(e) {
  return Ht.hash(e);
}
function ha(e, t) {
  if (!t)
    return gr().replace(/-/g, "").toLowerCase();
  var n = Ye({}, e);
  return delete n._rev_tree, da(JSON.stringify(n));
}
var ln = gr;
function Ze(e) {
  for (var t, n, r, i = e.rev_tree.slice(), a; a = i.pop(); ) {
    var o = a.ids, s = o[2], c = a.pos;
    if (s.length) {
      for (var g = 0, w = s.length; g < w; g++)
        i.push({
          pos: c + 1,
          ids: s[g]
        });
      continue;
    }
    var f = !!o[1].deleted, m = o[0];
    (!t || (r !== f ? r : n !== c ? n < c : t < m)) && (t = m, n = c, r = f);
  }
  return n + "-" + t;
}
function Ve(e, t) {
  for (var n = e.slice(), r; r = n.pop(); )
    for (var i = r.pos, a = r.ids, o = a[2], s = t(o.length === 0, i, a[0], r.ctx, a[1]), c = 0, g = o.length; c < g; c++)
      n.push({
        pos: i + 1,
        ids: o[c],
        ctx: s
      });
}
function vs(e, t) {
  return e.pos - t.pos;
}
function Er(e) {
  var t = [];
  Ve(e, function(i, a, o, s, c) {
    i && t.push({
      rev: a + "-" + o,
      pos: a,
      opts: c
    });
  }), t.sort(vs).reverse();
  for (var n = 0, r = t.length; n < r; n++)
    delete t[n].pos;
  return t;
}
function Cr(e) {
  for (var t = Ze(e), n = Er(e.rev_tree), r = [], i = 0, a = n.length; i < a; i++) {
    var o = n[i];
    o.rev !== t && !o.opts.deleted && r.push(o.rev);
  }
  return r;
}
function ys(e) {
  var t = [];
  return Ve(e.rev_tree, function(n, r, i, a, o) {
    o.status === "available" && !n && (t.push(r + "-" + i), o.status = "missing");
  }), t;
}
function ps(e, t) {
  let n = [];
  const r = e.slice();
  let i;
  for (; i = r.pop(); ) {
    const {
      pos: a,
      ids: o
    } = i, s = `${a}-${o[0]}`, c = o[2];
    if (n.push(s), s === t) {
      if (c.length !== 0)
        throw new Error("The requested revision is not a leaf");
      return n.reverse();
    }
    (c.length === 0 || c.length > 1) && (n = []);
    for (let g = 0, w = c.length; g < w; g++)
      r.push({
        pos: a + 1,
        ids: c[g]
      });
  }
  if (n.length === 0)
    throw new Error("The requested revision does not exist");
  return n.reverse();
}
function va(e) {
  for (var t = [], n = e.slice(), r; r = n.pop(); ) {
    var i = r.pos, a = r.ids, o = a[0], s = a[1], c = a[2], g = c.length === 0, w = r.history ? r.history.slice() : [];
    w.push({
      id: o,
      opts: s
    }), g && t.push({
      pos: i + 1 - w.length,
      ids: w
    });
    for (var f = 0, m = c.length; f < m; f++)
      n.push({
        pos: i + 1,
        ids: c[f],
        history: w
      });
  }
  return t.reverse();
}
function gs(e, t) {
  return e.pos - t.pos;
}
function _s(e, t, n) {
  for (var r = 0, i = e.length, a; r < i; )
    a = r + i >>> 1, n(e[a], t) < 0 ? r = a + 1 : i = a;
  return r;
}
function ms(e, t, n) {
  var r = _s(e, t, n);
  e.splice(r, 0, t);
}
function ei(e, t) {
  for (var n, r, i = t, a = e.length; i < a; i++) {
    var o = e[i], s = [o.id, o.opts, []];
    r ? (r[2].push(s), r = s) : n = r = s;
  }
  return n;
}
function ws(e, t) {
  return e[0] < t[0] ? -1 : 1;
}
function ti(e, t) {
  for (var n = [{
    tree1: e,
    tree2: t
  }], r = !1; n.length > 0; ) {
    var i = n.pop(), a = i.tree1, o = i.tree2;
    (a[1].status || o[1].status) && (a[1].status = a[1].status === "available" || o[1].status === "available" ? "available" : "missing");
    for (var s = 0; s < o[2].length; s++) {
      if (!a[2][0]) {
        r = "new_leaf", a[2][0] = o[2][s];
        continue;
      }
      for (var c = !1, g = 0; g < a[2].length; g++)
        a[2][g][0] === o[2][s][0] && (n.push({
          tree1: a[2][g],
          tree2: o[2][s]
        }), c = !0);
      c || (r = "new_branch", ms(a[2], o[2][s], ws));
    }
  }
  return {
    conflicts: r,
    tree: e
  };
}
function ya(e, t, n) {
  var r = [], i = !1, a = !1, o;
  if (!e.length)
    return {
      tree: [t],
      conflicts: "new_leaf"
    };
  for (var s = 0, c = e.length; s < c; s++) {
    var g = e[s];
    if (g.pos === t.pos && g.ids[0] === t.ids[0])
      o = ti(g.ids, t.ids), r.push({
        pos: g.pos,
        ids: o.tree
      }), i = i || o.conflicts, a = !0;
    else if (n !== !0) {
      var w = g.pos < t.pos ? g : t, f = g.pos < t.pos ? t : g, m = f.pos - w.pos, S = [], A = [];
      for (A.push({
        ids: w.ids,
        diff: m,
        parent: null,
        parentIdx: null
      }); A.length > 0; ) {
        var E = A.pop();
        if (E.diff === 0) {
          E.ids[0] === f.ids[0] && S.push(E);
          continue;
        }
        for (var $ = E.ids[2], p = 0, v = $.length; p < v; p++)
          A.push({
            ids: $[p],
            diff: E.diff - 1,
            parent: E.ids,
            parentIdx: p
          });
      }
      var u = S[0];
      u ? (o = ti(u.ids, f.ids), u.parent[2][u.parentIdx] = o.tree, r.push({
        pos: w.pos,
        ids: w.ids
      }), i = i || o.conflicts, a = !0) : r.push(g);
    } else
      r.push(g);
  }
  return a || r.push(t), r.sort(gs), {
    tree: r,
    conflicts: i || "internal_node"
  };
}
function bs(e, t) {
  for (var n = va(e), r, i, a = 0, o = n.length; a < o; a++) {
    var s = n[a], c = s.ids, g;
    if (c.length > t) {
      r || (r = {});
      var w = c.length - t;
      g = {
        pos: s.pos + w,
        ids: ei(c, w)
      };
      for (var f = 0; f < w; f++) {
        var m = s.pos + f + "-" + c[f].id;
        r[m] = !0;
      }
    } else
      g = {
        pos: s.pos,
        ids: ei(c, 0)
      };
    i ? i = ya(i, g, !0).tree : i = [g];
  }
  return r && Ve(i, function(S, A, E) {
    delete r[A + "-" + E];
  }), {
    tree: i,
    revs: r ? Object.keys(r) : []
  };
}
function pa(e, t, n) {
  var r = ya(e, t), i = bs(r.tree, n);
  return {
    tree: i.tree,
    stemmedRevs: i.revs,
    conflicts: r.conflicts
  };
}
function $s(e, t) {
  for (var n = e.slice(), r = t.split("-"), i = parseInt(r[0], 10), a = r[1], o; o = n.pop(); ) {
    if (o.pos === i && o.ids[0] === a)
      return !0;
    for (var s = o.ids[2], c = 0, g = s.length; c < g; c++)
      n.push({
        pos: o.pos + 1,
        ids: s[c]
      });
  }
  return !1;
}
function Os(e) {
  return e.ids;
}
function Re(e, t) {
  t || (t = Ze(e));
  for (var n = t.substring(t.indexOf("-") + 1), r = e.rev_tree.map(Os), i; i = r.pop(); ) {
    if (i[0] === n)
      return !!i[1].deleted;
    r = r.concat(i[2]);
  }
}
function Xe(e) {
  return /^_local/.test(e);
}
function Ss(e, t) {
  for (var n = t.rev_tree.slice(), r; r = n.pop(); ) {
    var i = r.pos, a = r.ids, o = a[0], s = a[1], c = a[2], g = c.length === 0, w = r.history ? r.history.slice() : [];
    if (w.push({
      id: o,
      pos: i,
      opts: s
    }), g)
      for (var f = 0, m = w.length; f < m; f++) {
        var S = w[f], A = S.pos + "-" + S.id;
        if (A === e)
          return i + "-" + o;
      }
    for (var E = 0, $ = c.length; E < $; E++)
      n.push({
        pos: i + 1,
        ids: c[E],
        history: w
      });
  }
  throw new Error("Unable to resolve latest revision for id " + t.id + ", rev " + e);
}
function ks(e, t, n, r) {
  try {
    e.emit("change", t, n, r);
  } catch (i) {
    Ae("error", 'Error in .on("change", function):', i);
  }
}
function As(e, t, n) {
  var r = [{
    rev: e._rev
  }];
  n.style === "all_docs" && (r = Er(t.rev_tree).map(function(a) {
    return {
      rev: a.rev
    };
  }));
  var i = {
    id: t.id,
    changes: r,
    doc: e
  };
  return Re(t, e._rev) && (i.deleted = !0), n.conflicts && (i.doc._conflicts = Cr(t), i.doc._conflicts.length || delete i.doc._conflicts), i;
}
class xs extends ke {
  constructor(t, n, r) {
    super(), this.db = t, n = n ? ve(n) : {};
    var i = n.complete = na((s, c) => {
      s ? ts(this, "error") > 0 && this.emit("error", s) : this.emit("complete", c), this.removeAllListeners(), t.removeListener("destroyed", a);
    });
    r && (this.on("complete", function(s) {
      r(null, s);
    }), this.on("error", r));
    const a = () => {
      this.cancel();
    };
    t.once("destroyed", a), n.onChange = (s, c, g) => {
      this.isCancelled || ks(this, s, c, g);
    };
    var o = new Promise(function(s, c) {
      n.complete = function(g, w) {
        g ? c(g) : s(w);
      };
    });
    this.once("cancel", function() {
      t.removeListener("destroyed", a), n.complete(null, {
        status: "cancelled"
      });
    }), this.then = o.then.bind(o), this.catch = o.catch.bind(o), this.then(function(s) {
      i(null, s);
    }, i), t.taskqueue.isReady ? this.validateChanges(n) : t.taskqueue.addTask((s) => {
      s ? n.complete(s) : this.isCancelled ? this.emit("cancel") : this.validateChanges(n);
    });
  }
  cancel() {
    this.isCancelled = !0, this.db.taskqueue.isReady && this.emit("cancel");
  }
  validateChanges(t) {
    var n = t.complete;
    X._changesFilterPlugin ? X._changesFilterPlugin.validate(t, (r) => {
      if (r)
        return n(r);
      this.doChanges(t);
    }) : this.doChanges(t);
  }
  doChanges(t) {
    var n = t.complete;
    if (t = ve(t), "live" in t && !("continuous" in t) && (t.continuous = t.live), t.processChange = As, t.since === "latest" && (t.since = "now"), t.since || (t.since = 0), t.since === "now") {
      this.db.info().then((i) => {
        if (this.isCancelled) {
          n(null, {
            status: "cancelled"
          });
          return;
        }
        t.since = i.update_seq, this.doChanges(t);
      }, n);
      return;
    }
    if (X._changesFilterPlugin) {
      if (X._changesFilterPlugin.normalize(t), X._changesFilterPlugin.shouldFilter(this, t))
        return X._changesFilterPlugin.filter(this, t);
    } else
      ["doc_ids", "filter", "selector", "view"].forEach(function(i) {
        i in t && Ae("warn", 'The "' + i + '" option was passed in to changes/replicate, but pouchdb-changes-filter plugin is not installed, so it was ignored. Please install the plugin to enable filtering.');
      });
    "descending" in t || (t.descending = !1), t.limit = t.limit === 0 ? 1 : t.limit, t.complete = n;
    var r = this.db._changes(t);
    if (r && typeof r.cancel == "function") {
      const i = this.cancel;
      this.cancel = (...a) => {
        r.cancel(), i.apply(this, a);
      };
    }
  }
}
function ni(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function mn(e, t) {
  return function(n, r) {
    n || r[0] && r[0].error ? (n = n || r[0], n.docId = t, e(n)) : e(null, r.length ? r[0] : r);
  };
}
function Es(e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    if (n._deleted)
      delete n._attachments;
    else if (n._attachments)
      for (var r = Object.keys(n._attachments), i = 0; i < r.length; i++) {
        var a = r[i];
        n._attachments[a] = Pt(n._attachments[a], ["data", "digest", "content_type", "length", "revpos", "stub"]);
      }
  }
}
function Cs(e, t) {
  var n = ni(e._id, t._id);
  if (n !== 0)
    return n;
  var r = e._revisions ? e._revisions.start : 0, i = t._revisions ? t._revisions.start : 0;
  return ni(r, i);
}
function Ts(e) {
  var t = {}, n = [];
  return Ve(e, function(r, i, a, o) {
    var s = i + "-" + a;
    return r && (t[s] = 0), o !== void 0 && n.push({
      from: o,
      to: s
    }), s;
  }), n.reverse(), n.forEach(function(r) {
    t[r.from] === void 0 ? t[r.from] = 1 + t[r.to] : t[r.from] = Math.min(t[r.from], 1 + t[r.to]);
  }), t;
}
function qs(e) {
  var t = "limit" in e ? e.keys.slice(e.skip, e.limit + e.skip) : e.skip > 0 ? e.keys.slice(e.skip) : e.keys;
  e.keys = t, e.skip = 0, delete e.limit, e.descending && (t.reverse(), e.descending = !1);
}
function ga(e) {
  var t = e._compactionQueue[0], n = t.opts, r = t.callback;
  e.get("_local/compaction").catch(function() {
    return !1;
  }).then(function(i) {
    i && i.last_seq && (n.last_seq = i.last_seq), e._compact(n, function(a, o) {
      a ? r(a) : r(null, o), we(function() {
        e._compactionQueue.shift(), e._compactionQueue.length && ga(e);
      });
    });
  });
}
function js(e, t, n) {
  return e.get("_local/purges").then(function(r) {
    const i = r.purgeSeq + 1;
    return r.purges.push({
      docId: t,
      rev: n,
      purgeSeq: i
    }), r.purges.length > self.purged_infos_limit && r.purges.splice(0, r.purges.length - self.purged_infos_limit), r.purgeSeq = i, r;
  }).catch(function(r) {
    if (r.status !== 404)
      throw r;
    return {
      _id: "_local/purges",
      purges: [{
        docId: t,
        rev: n,
        purgeSeq: 0
      }],
      purgeSeq: 0
    };
  }).then(function(r) {
    return e.put(r);
  });
}
function Ps(e) {
  return e.charAt(0) === "_" ? e + " is not a valid attachment name, attachment names cannot start with '_'" : !1;
}
class _a extends ke {
  _setup() {
    this.post = ue("post", function(t, n, r) {
      if (typeof n == "function" && (r = n, n = {}), typeof t != "object" || Array.isArray(t))
        return r(te(_n));
      this.bulkDocs({
        docs: [t]
      }, n, mn(r, t._id));
    }).bind(this), this.put = ue("put", function(t, n, r) {
      if (typeof n == "function" && (r = n, n = {}), typeof t != "object" || Array.isArray(t))
        return r(te(_n));
      if (ua(t._id), Xe(t._id) && typeof this._putLocal == "function")
        return t._deleted ? this._removeLocal(t, r) : this._putLocal(t, r);
      const i = (o) => {
        typeof this._put == "function" && n.new_edits !== !1 ? this._put(t, n, o) : this.bulkDocs({
          docs: [t]
        }, n, mn(o, t._id));
      };
      n.force && t._rev ? (a(), i(function(o) {
        var s = o ? null : {
          ok: !0,
          id: t._id,
          rev: t._rev
        };
        r(o, s);
      })) : i(r);
      function a() {
        var o = t._rev.split("-"), s = o[1], c = parseInt(o[0], 10), g = c + 1, w = ha();
        t._revisions = {
          start: g,
          ids: [w, s]
        }, t._rev = g + "-" + w, n.new_edits = !1;
      }
    }).bind(this), this.putAttachment = ue("putAttachment", function(t, n, r, i, a) {
      var o = this;
      typeof a == "function" && (a = i, i = r, r = null), typeof a == "undefined" && (a = i, i = r, r = null), a || Ae("warn", "Attachment", n, "on document", t, "is missing content_type");
      function s(c) {
        var g = "_rev" in c ? parseInt(c._rev, 10) : 0;
        return c._attachments = c._attachments || {}, c._attachments[n] = {
          content_type: a,
          data: i,
          revpos: ++g
        }, o.put(c);
      }
      return o.get(t).then(function(c) {
        if (c._rev !== r)
          throw te(yt);
        return s(c);
      }, function(c) {
        if (c.reason === Oe.message)
          return s({
            _id: t
          });
        throw c;
      });
    }).bind(this), this.removeAttachment = ue("removeAttachment", function(t, n, r, i) {
      this.get(t, (a, o) => {
        if (a) {
          i(a);
          return;
        }
        if (o._rev !== r) {
          i(te(yt));
          return;
        }
        if (!o._attachments)
          return i();
        delete o._attachments[n], Object.keys(o._attachments).length === 0 && delete o._attachments, this.put(o, i);
      });
    }).bind(this), this.remove = ue("remove", function(t, n, r, i) {
      var a;
      typeof n == "string" ? (a = {
        _id: t,
        _rev: n
      }, typeof r == "function" && (i = r, r = {})) : (a = t, typeof n == "function" ? (i = n, r = {}) : (i = r, r = n)), r = r || {}, r.was_delete = !0;
      var o = {
        _id: a._id,
        _rev: a._rev || r.rev
      };
      if (o._deleted = !0, Xe(o._id) && typeof this._removeLocal == "function")
        return this._removeLocal(a, i);
      this.bulkDocs({
        docs: [o]
      }, r, mn(i, o._id));
    }).bind(this), this.revsDiff = ue("revsDiff", function(t, n, r) {
      typeof n == "function" && (r = n, n = {});
      var i = Object.keys(t);
      if (!i.length)
        return r(null, {});
      var a = 0, o = new be();
      function s(g, w) {
        o.has(g) || o.set(g, {
          missing: []
        }), o.get(g).missing.push(w);
      }
      function c(g, w) {
        var f = t[g].slice(0);
        Ve(w, function(m, S, A, E, $) {
          var p = S + "-" + A, v = f.indexOf(p);
          v !== -1 && (f.splice(v, 1), $.status !== "available" && s(g, p));
        }), f.forEach(function(m) {
          s(g, m);
        });
      }
      i.map(function(g) {
        this._getRevisionTree(g, function(w, f) {
          if (w && w.status === 404 && w.message === "missing")
            o.set(g, {
              missing: t[g]
            });
          else {
            if (w)
              return r(w);
            c(g, f);
          }
          if (++a === i.length) {
            var m = {};
            return o.forEach(function(S, A) {
              m[A] = S;
            }), r(null, m);
          }
        });
      }, this);
    }).bind(this), this.bulkGet = ue("bulkGet", function(t, n) {
      ia(this, t, n);
    }).bind(this), this.compactDocument = ue("compactDocument", function(t, n, r) {
      this._getRevisionTree(t, (i, a) => {
        if (i)
          return r(i);
        var o = Ts(a), s = [], c = [];
        Object.keys(o).forEach(function(g) {
          o[g] > n && s.push(g);
        }), Ve(a, function(g, w, f, m, S) {
          var A = w + "-" + f;
          S.status === "available" && s.indexOf(A) !== -1 && c.push(A);
        }), this._doCompaction(t, c, r);
      });
    }).bind(this), this.compact = ue("compact", function(t, n) {
      typeof t == "function" && (n = t, t = {}), t = t || {}, this._compactionQueue = this._compactionQueue || [], this._compactionQueue.push({
        opts: t,
        callback: n
      }), this._compactionQueue.length === 1 && ga(this);
    }).bind(this), this.get = ue("get", function(t, n, r) {
      if (typeof n == "function" && (r = n, n = {}), typeof t != "string")
        return r(te(aa));
      if (Xe(t) && typeof this._getLocal == "function")
        return this._getLocal(t, r);
      var i = [];
      const a = () => {
        var c = [], g = i.length;
        if (!g)
          return r(null, c);
        i.forEach((w) => {
          this.get(t, {
            rev: w,
            revs: n.revs,
            latest: n.latest,
            attachments: n.attachments,
            binary: n.binary
          }, function(f, m) {
            if (f)
              c.push({
                missing: w
              });
            else {
              for (var S, A = 0, E = c.length; A < E; A++)
                if (c[A].ok && c[A].ok._rev === m._rev) {
                  S = !0;
                  break;
                }
              S || c.push({
                ok: m
              });
            }
            g--, g || r(null, c);
          });
        });
      };
      if (n.open_revs) {
        if (n.open_revs === "all")
          this._getRevisionTree(t, function(c, g) {
            if (c)
              return r(c);
            i = Er(g).map(function(w) {
              return w.rev;
            }), a();
          });
        else if (Array.isArray(n.open_revs)) {
          i = n.open_revs;
          for (var o = 0; o < i.length; o++) {
            var s = i[o];
            if (!(typeof s == "string" && /^\d+-/.test(s)))
              return r(te(sa));
          }
          a();
        } else
          return r(te(_r, "function_clause"));
        return;
      }
      return this._get(t, n, (c, g) => {
        if (c)
          return c.docId = t, r(c);
        var w = g.doc, f = g.metadata, m = g.ctx;
        if (n.conflicts) {
          var S = Cr(f);
          S.length && (w._conflicts = S);
        }
        if (Re(f, w._rev) && (w._deleted = !0), n.revs || n.revs_info) {
          for (var A = w._rev.split("-"), E = parseInt(A[0], 10), $ = A[1], p = va(f.rev_tree), v = null, u = 0; u < p.length; u++) {
            var l = p[u], y = l.ids.map(function(G) {
              return G.id;
            }).indexOf($), _ = y === E - 1;
            (_ || !v && y !== -1) && (v = l);
          }
          if (!v)
            return c = new Error("invalid rev tree"), c.docId = t, r(c);
          var j = v.ids.map(function(G) {
            return G.id;
          }).indexOf(w._rev.split("-")[1]) + 1, I = v.ids.length - j;
          if (v.ids.splice(j, I), v.ids.reverse(), n.revs && (w._revisions = {
            start: v.pos + v.ids.length - 1,
            ids: v.ids.map(function(G) {
              return G.id;
            })
          }), n.revs_info) {
            var P = v.pos + v.ids.length;
            w._revs_info = v.ids.map(function(G) {
              return P--, {
                rev: P + "-" + G.id,
                status: G.opts.status
              };
            });
          }
        }
        if (n.attachments && w._attachments) {
          var F = w._attachments, U = Object.keys(F).length;
          if (U === 0)
            return r(null, w);
          Object.keys(F).forEach((G) => {
            this._getAttachment(w._id, G, F[G], {
              // Previously the revision handling was done in adapter.js
              // getAttachment, however since idb-next doesnt we need to
              // pass the rev through
              rev: w._rev,
              binary: n.binary,
              ctx: m
            }, function(z, J) {
              var W = w._attachments[G];
              W.data = J, delete W.stub, delete W.length, --U || r(null, w);
            });
          });
        } else {
          if (w._attachments)
            for (var Y in w._attachments)
              Object.prototype.hasOwnProperty.call(w._attachments, Y) && (w._attachments[Y].stub = !0);
          r(null, w);
        }
      });
    }).bind(this), this.getAttachment = ue("getAttachment", function(t, n, r, i) {
      r instanceof Function && (i = r, r = {}), this._get(t, r, (a, o) => {
        if (a)
          return i(a);
        if (o.doc._attachments && o.doc._attachments[n])
          r.ctx = o.ctx, r.binary = !0, this._getAttachment(t, n, o.doc._attachments[n], r, i);
        else
          return i(te(Oe));
      });
    }).bind(this), this.allDocs = ue("allDocs", function(t, n) {
      if (typeof t == "function" && (n = t, t = {}), t.skip = typeof t.skip != "undefined" ? t.skip : 0, t.start_key && (t.startkey = t.start_key), t.end_key && (t.endkey = t.end_key), "keys" in t) {
        if (!Array.isArray(t.keys))
          return n(new TypeError("options.keys must be an array"));
        var r = ["startkey", "endkey", "key"].filter(function(i) {
          return i in t;
        })[0];
        if (r) {
          n(te(Zo, "Query parameter `" + r + "` is not compatible with multi-get"));
          return;
        }
        if (!Be(this) && (qs(t), t.keys.length === 0))
          return this._allDocs({
            limit: 0
          }, n);
      }
      return this._allDocs(t, n);
    }).bind(this), this.close = ue("close", function(t) {
      return this._closed = !0, this.emit("closed"), this._close(t);
    }).bind(this), this.info = ue("info", function(t) {
      this._info((n, r) => {
        if (n)
          return t(n);
        r.db_name = r.db_name || this.name, r.auto_compaction = !!(this.auto_compaction && !Be(this)), r.adapter = this.adapter, t(null, r);
      });
    }).bind(this), this.id = ue("id", function(t) {
      return this._id(t);
    }).bind(this), this.bulkDocs = ue("bulkDocs", function(t, n, r) {
      if (typeof n == "function" && (r = n, n = {}), n = n || {}, Array.isArray(t) && (t = {
        docs: t
      }), !t || !t.docs || !Array.isArray(t.docs))
        return r(te(Ho));
      for (var i = 0; i < t.docs.length; ++i)
        if (typeof t.docs[i] != "object" || Array.isArray(t.docs[i]))
          return r(te(_n));
      var a;
      if (t.docs.forEach(function(c) {
        c._attachments && Object.keys(c._attachments).forEach(function(g) {
          a = a || Ps(g), c._attachments[g].content_type || Ae("warn", "Attachment", g, "on document", c._id, "is missing content_type");
        });
      }), a)
        return r(te(fn, a));
      "new_edits" in n || ("new_edits" in t ? n.new_edits = t.new_edits : n.new_edits = !0);
      var o = this;
      !n.new_edits && !Be(o) && t.docs.sort(Cs), Es(t.docs);
      var s = t.docs.map(function(c) {
        return c._id;
      });
      this._bulkDocs(t, n, function(c, g) {
        if (c)
          return r(c);
        if (n.new_edits || (g = g.filter(function(m) {
          return m.error;
        })), !Be(o))
          for (var w = 0, f = g.length; w < f; w++)
            g[w].id = g[w].id || s[w];
        r(null, g);
      });
    }).bind(this), this.registerDependentDatabase = ue("registerDependentDatabase", function(t, n) {
      var r = ve(this.__opts);
      this.__opts.view_adapter && (r.adapter = this.__opts.view_adapter);
      var i = new this.constructor(t, r);
      function a(o) {
        return o.dependentDbs = o.dependentDbs || {}, o.dependentDbs[t] ? !1 : (o.dependentDbs[t] = !0, o);
      }
      Zt(this, "_local/_pouch_dependentDbs", a).then(function() {
        n(null, {
          db: i
        });
      }).catch(n);
    }).bind(this), this.destroy = ue("destroy", function(t, n) {
      typeof t == "function" && (n = t, t = {});
      var r = "use_prefix" in this ? this.use_prefix : !0;
      const i = () => {
        this._destroy(t, (a, o) => {
          if (a)
            return n(a);
          this._destroyed = !0, this.emit("destroyed"), n(null, o || {
            ok: !0
          });
        });
      };
      if (Be(this))
        return i();
      this.get("_local/_pouch_dependentDbs", (a, o) => {
        if (a)
          return a.status !== 404 ? n(a) : i();
        var s = o.dependentDbs, c = this.constructor, g = Object.keys(s).map((w) => {
          var f = r ? w.replace(new RegExp("^" + c.prefix), "") : w;
          return new c(f, this.__opts).destroy();
        });
        Promise.all(g).then(i, n);
      });
    }).bind(this);
  }
  _compact(t, n) {
    var r = {
      return_docs: !1,
      last_seq: t.last_seq || 0
    }, i = [], a, o = 0;
    const s = (w) => {
      this.activeTasks.update(a, {
        completed_items: ++o
      }), i.push(this.compactDocument(w.id, 0));
    }, c = (w) => {
      this.activeTasks.remove(a, w), n(w);
    }, g = (w) => {
      var f = w.last_seq;
      Promise.all(i).then(() => Zt(this, "_local/compaction", (m) => !m.last_seq || m.last_seq < f ? (m.last_seq = f, m) : !1)).then(() => {
        this.activeTasks.remove(a), n(null, {
          ok: !0
        });
      }).catch(c);
    };
    this.info().then((w) => {
      a = this.activeTasks.add({
        name: "database_compaction",
        total_items: w.update_seq - r.last_seq
      }), this.changes(r).on("change", s).on("complete", g).on("error", c);
    });
  }
  changes(t, n) {
    return typeof t == "function" && (n = t, t = {}), t = t || {}, t.return_docs = "return_docs" in t ? t.return_docs : !t.live, new xs(this, t, n);
  }
  type() {
    return typeof this._type == "function" ? this._type() : this.adapter;
  }
}
_a.prototype.purge = ue("_purge", function(e, t, n) {
  if (typeof this._purge == "undefined")
    return n(te(_r, "Purge is not implemented in the " + this.adapter + " adapter."));
  var r = this;
  r._getRevisionTree(e, (i, a) => {
    if (i)
      return n(i);
    if (!a)
      return n(te(Oe));
    let o;
    try {
      o = ps(a, t);
    } catch (s) {
      return n(s.message || s);
    }
    r._purge(e, o, (s, c) => {
      if (s)
        return n(s);
      js(r, e, t).then(function() {
        return n(null, c);
      });
    });
  });
});
let Is = class {
  constructor() {
    this.isReady = !1, this.failed = !1, this.queue = [];
  }
  execute() {
    var t;
    if (this.failed)
      for (; t = this.queue.shift(); )
        t(this.failed);
    else
      for (; t = this.queue.shift(); )
        t();
  }
  fail(t) {
    this.failed = t, this.execute();
  }
  ready(t) {
    this.isReady = !0, this.db = t, this.execute();
  }
  addTask(t) {
    this.queue.push(t), this.failed && this.execute();
  }
};
function Bs(e, t) {
  var n = e.match(/([a-z-]*):\/\/(.*)/);
  if (n)
    return {
      name: /https?/.test(n[1]) ? n[1] + "://" + n[2] : n[2],
      adapter: n[1]
    };
  var r = X.adapters, i = X.preferredAdapters, a = X.prefix, o = t.adapter;
  if (!o)
    for (var s = 0; s < i.length; ++s) {
      if (o = i[s], o === "idb" && "websql" in r && Xt() && localStorage["_pouch__websqldb_" + a + e]) {
        Ae("log", 'PouchDB is downgrading "' + e + '" to WebSQL to avoid data loss, because it was already opened with WebSQL.');
        continue;
      }
      break;
    }
  var c = r[o], g = c && "use_prefix" in c ? c.use_prefix : !0;
  return {
    name: g ? a + e : e,
    adapter: o
  };
}
function Rs(e, t) {
  e.prototype = Object.create(t.prototype, {
    constructor: {
      value: e
    }
  });
}
function ma(e, t) {
  let n = function(...r) {
    if (!(this instanceof n))
      return new n(...r);
    t.apply(this, r);
  };
  return Rs(n, e), n;
}
function Ls(e) {
  function t(r) {
    e.removeListener("closed", n), r || e.constructor.emit("destroyed", e.name);
  }
  function n() {
    e.removeListener("destroyed", t), e.constructor.emit("unref", e);
  }
  e.once("destroyed", t), e.once("closed", n), e.constructor.emit("ref", e);
}
class ri extends _a {
  constructor(t, n) {
    super(), this._setup(t, n);
  }
  _setup(t, n) {
    if (super._setup(), n = n || {}, t && typeof t == "object" && (n = t, t = n.name, delete n.name), n.deterministic_revs === void 0 && (n.deterministic_revs = !0), this.__opts = n = ve(n), this.auto_compaction = n.auto_compaction, this.purged_infos_limit = n.purged_infos_limit || 1e3, this.prefix = X.prefix, typeof t != "string")
      throw new Error("Missing/invalid DB name");
    var r = (n.prefix || "") + t, i = Bs(r, n);
    if (n.name = i.name, n.adapter = n.adapter || i.adapter, this.name = t, this._adapter = n.adapter, X.emit("debug", ["adapter", "Picked adapter: ", n.adapter]), !X.adapters[n.adapter] || !X.adapters[n.adapter].valid())
      throw new Error("Invalid Adapter: " + n.adapter);
    if (n.view_adapter && (!X.adapters[n.view_adapter] || !X.adapters[n.view_adapter].valid()))
      throw new Error("Invalid View Adapter: " + n.view_adapter);
    this.taskqueue = new Is(), this.adapter = n.adapter, X.adapters[n.adapter].call(this, n, (a) => {
      if (a)
        return this.taskqueue.fail(a);
      Ls(this), this.emit("created", this), X.emit("created", this.name), this.taskqueue.ready(this);
    });
  }
}
const X = ma(ri, function(e, t) {
  ri.prototype._setup.call(this, e, t);
});
var Ds = typeof AbortController != "undefined" ? AbortController : function() {
  return {
    abort: function() {
    }
  };
}, wa = fetch, lt = Headers;
class Ns {
  constructor() {
    this.tasks = {};
  }
  list() {
    return Object.values(this.tasks);
  }
  add(t) {
    const n = gr();
    return this.tasks[n] = {
      id: n,
      name: t.name,
      total_items: t.total_items,
      created_at: new Date().toJSON()
    }, n;
  }
  get(t) {
    return this.tasks[t];
  }
  /* eslint-disable no-unused-vars */
  remove(t, n) {
    return delete this.tasks[t], this.tasks;
  }
  update(t, n) {
    const r = this.tasks[t];
    if (typeof r != "undefined") {
      const i = {
        id: r.id,
        name: r.name,
        created_at: r.created_at,
        total_items: n.total_items || r.total_items,
        completed_items: n.completed_items || r.completed_items,
        updated_at: new Date().toJSON()
      };
      this.tasks[t] = i;
    }
    return this.tasks;
  }
}
X.adapters = {};
X.preferredAdapters = [];
X.prefix = "_pouch_";
var ii = new ke();
function Ms(e) {
  Object.keys(ke.prototype).forEach(function(n) {
    typeof ke.prototype[n] == "function" && (e[n] = ii[n].bind(ii));
  });
  var t = e._destructionListeners = new be();
  e.on("ref", function(r) {
    t.has(r.name) || t.set(r.name, []), t.get(r.name).push(r);
  }), e.on("unref", function(r) {
    if (t.has(r.name)) {
      var i = t.get(r.name), a = i.indexOf(r);
      a < 0 || (i.splice(a, 1), i.length > 1 ? t.set(r.name, i) : t.delete(r.name));
    }
  }), e.on("destroyed", function(r) {
    if (t.has(r)) {
      var i = t.get(r);
      t.delete(r), i.forEach(function(a) {
        a.emit("destroyed", !0);
      });
    }
  });
}
Ms(X);
X.adapter = function(e, t, n) {
  t.valid() && (X.adapters[e] = t, n && X.preferredAdapters.push(e));
};
X.plugin = function(e) {
  if (typeof e == "function")
    e(X);
  else {
    if (typeof e != "object" || Object.keys(e).length === 0)
      throw new Error('Invalid plugin: got "' + e + '", expected an object or a function');
    Object.keys(e).forEach(function(t) {
      X.prototype[t] = e[t];
    });
  }
  return this.__defaults && (X.__defaults = Ye({}, this.__defaults)), X;
};
X.defaults = function(e) {
  let t = ma(X, function(n, r) {
    r = r || {}, n && typeof n == "object" && (r = n, n = r.name, delete r.name), r = Ye({}, t.__defaults, r), X.call(this, n, r);
  });
  return t.preferredAdapters = X.preferredAdapters.slice(), Object.keys(X).forEach(function(n) {
    n in t || (t[n] = X[n]);
  }), t.__defaults = Ye({}, this.__defaults, e), t;
};
X.fetch = function(e, t) {
  return wa(e, t);
};
X.prototype.activeTasks = X.activeTasks = new Ns();
var Fs = "8.0.0";
function Tr(e, t) {
  for (var n = e, r = 0, i = t.length; r < i; r++) {
    var a = t[r];
    if (n = n[a], !n)
      break;
  }
  return n;
}
function Us(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function qr(e) {
  for (var t = [], n = "", r = 0, i = e.length; r < i; r++) {
    var a = e[r];
    r > 0 && e[r - 1] === "\\" && (a === "$" || a === ".") ? n = n.substring(0, n.length - 1) + a : a === "." ? (t.push(n), n = "") : n += a;
  }
  return t.push(n), t;
}
var Ks = ["$or", "$nor", "$not"];
function ba(e) {
  return Ks.indexOf(e) > -1;
}
function $a(e) {
  return Object.keys(e)[0];
}
function zs(e) {
  return e[$a(e)];
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
      }), ba(i))
        if (a instanceof Array) {
          if (n[i]) {
            n[i] = !1, t[i] = a;
            return;
          }
          var o = [];
          t[i].forEach(function(c) {
            Object.keys(a).forEach(function(g) {
              var w = a[g], f = Math.max(Object.keys(c).length, Object.keys(w).length), m = Et([c, w]);
              Object.keys(m).length <= f || o.push(m);
            });
          }), t[i] = o;
        } else
          t[i] = Et([a]);
      else {
        var s = t[i] = t[i] || {};
        Object.keys(a).forEach(function(c) {
          var g = a[c];
          if (c === "$gt" || c === "$gte")
            return Qs(c, g, s);
          if (c === "$lt" || c === "$lte")
            return Js(c, g, s);
          if (c === "$ne")
            return Gs(g, s);
          if (c === "$eq")
            return Ws(g, s);
          if (c === "$regex")
            return Hs(g, s);
          s[c] = g;
        });
      }
    });
  }), t;
}
function Qs(e, t, n) {
  typeof n.$eq == "undefined" && (typeof n.$gte != "undefined" ? e === "$gte" ? t > n.$gte && (n.$gte = t) : t >= n.$gte && (delete n.$gte, n.$gt = t) : typeof n.$gt != "undefined" ? e === "$gte" ? t > n.$gt && (delete n.$gt, n.$gte = t) : t > n.$gt && (n.$gt = t) : n[e] = t);
}
function Js(e, t, n) {
  typeof n.$eq == "undefined" && (typeof n.$lte != "undefined" ? e === "$lte" ? t < n.$lte && (n.$lte = t) : t <= n.$lte && (delete n.$lte, n.$lt = t) : typeof n.$lt != "undefined" ? e === "$lte" ? t < n.$lt && (delete n.$lt, n.$lte = t) : t < n.$lt && (n.$lt = t) : n[e] = t);
}
function Gs(e, t) {
  "$ne" in t ? t.$ne.push(e) : t.$ne = [e];
}
function Ws(e, t) {
  delete t.$gt, delete t.$gte, delete t.$lt, delete t.$lte, delete t.$ne, t.$eq = e;
}
function Hs(e, t) {
  "$regex" in t ? t.$regex.push(e) : t.$regex = [e];
}
function Oa(e) {
  for (var t in e) {
    if (Array.isArray(e))
      for (var n in e)
        e[n].$and && (e[n] = Et(e[n].$and));
    var r = e[t];
    typeof r == "object" && Oa(r);
  }
  return e;
}
function Sa(e, t) {
  for (var n in e) {
    n === "$and" && (t = !0);
    var r = e[n];
    typeof r == "object" && (t = Sa(r, t));
  }
  return t;
}
function Xs(e) {
  var t = ve(e);
  Sa(t, !1) && (t = Oa(t), "$and" in t && (t = Et(t.$and))), ["$or", "$nor"].forEach(function(o) {
    o in t && t[o].forEach(function(s) {
      for (var c = Object.keys(s), g = 0; g < c.length; g++) {
        var w = c[g], f = s[w];
        (typeof f != "object" || f === null) && (s[w] = {
          $eq: f
        });
      }
    });
  }), "$not" in t && (t.$not = Et([t.$not]));
  for (var n = Object.keys(t), r = 0; r < n.length; r++) {
    var i = n[r], a = t[i];
    (typeof a != "object" || a === null) && (a = {
      $eq: a
    }), t[i] = a;
  }
  return Nn(t), t;
}
function Nn(e) {
  Object.keys(e).forEach(function(t) {
    var n = e[t];
    Array.isArray(n) ? n.forEach(function(r) {
      r && typeof r == "object" && Nn(r);
    }) : t === "$ne" ? e.$ne = [n] : t === "$regex" ? e.$regex = [n] : n && typeof n == "object" && Nn(n);
  });
}
function Ys(e, t, n) {
  for (var r = "", i = n - e.length; r.length < i; )
    r += t;
  return r;
}
function Zs(e, t, n) {
  var r = Ys(e, t, n);
  return r + e;
}
var ka = -324, Mn = 3, Fn = "";
function ce(e, t) {
  if (e === t)
    return 0;
  e = et(e), t = et(t);
  var n = Un(e), r = Un(t);
  if (n - r !== 0)
    return n - r;
  switch (typeof e) {
    case "number":
      return e - t;
    case "boolean":
      return e < t ? -1 : 1;
    case "string":
      return iu(e, t);
  }
  return Array.isArray(e) ? ru(e, t) : au(e, t);
}
function et(e) {
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
          e[r] = et(t[r]);
      } else {
        if (e instanceof Date)
          return e.toJSON();
        if (e !== null) {
          e = {};
          for (var i in t)
            if (Object.prototype.hasOwnProperty.call(t, i)) {
              var a = t[i];
              typeof a != "undefined" && (e[i] = et(a));
            }
        }
      }
  }
  return e;
}
function Vs(e) {
  if (e !== null)
    switch (typeof e) {
      case "boolean":
        return e ? 1 : 0;
      case "number":
        return ou(e);
      case "string":
        return e.replace(/\u0002/g, "").replace(/\u0001/g, "").replace(/\u0000/g, "");
      case "object":
        var t = Array.isArray(e), n = t ? e : Object.keys(e), r = -1, i = n.length, a = "";
        if (t)
          for (; ++r < i; )
            a += Ce(n[r]);
        else
          for (; ++r < i; ) {
            var o = n[r];
            a += Ce(o) + Ce(e[o]);
          }
        return a;
    }
  return "";
}
function Ce(e) {
  var t = "\0";
  return e = et(e), Un(e) + Fn + Vs(e) + t;
}
function eu(e, t) {
  var n = t, r, i = e[t] === "1";
  if (i)
    r = 0, t++;
  else {
    var a = e[t] === "0";
    t++;
    var o = "", s = e.substring(t, t + Mn), c = parseInt(s, 10) + ka;
    for (a && (c = -c), t += Mn; ; ) {
      var g = e[t];
      if (g === "\0")
        break;
      o += g, t++;
    }
    o = o.split("."), o.length === 1 ? r = parseInt(o, 10) : r = parseFloat(o[0] + "." + o[1]), a && (r = r - 10), c !== 0 && (r = parseFloat(r + "e" + c));
  }
  return {
    num: r,
    length: t - n
  };
}
function tu(e, t) {
  var n = e.pop();
  if (t.length) {
    var r = t[t.length - 1];
    n === r.element && (t.pop(), r = t[t.length - 1]);
    var i = r.element, a = r.index;
    if (Array.isArray(i))
      i.push(n);
    else if (a === e.length - 2) {
      var o = e.pop();
      i[o] = n;
    } else
      e.push(n);
  }
}
function nu(e) {
  for (var t = [], n = [], r = 0; ; ) {
    var i = e[r++];
    if (i === "\0") {
      if (t.length === 1)
        return t.pop();
      tu(t, n);
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
        var a = eu(e, r);
        t.push(a.num), r += a.length;
        break;
      case "4":
        for (var o = ""; ; ) {
          var s = e[r];
          if (s === "\0")
            break;
          o += s, r++;
        }
        o = o.replace(/\u0001\u0001/g, "\0").replace(/\u0001\u0002/g, "").replace(/\u0002\u0002/g, ""), t.push(o);
        break;
      case "5":
        var c = {
          element: [],
          index: t.length
        };
        t.push(c.element), n.push(c);
        break;
      case "6":
        var g = {
          element: {},
          index: t.length
        };
        t.push(g.element), n.push(g);
        break;
      default:
        throw new Error("bad collationIndex or unexpectedly reached end of input: " + i);
    }
  }
}
function ru(e, t) {
  for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) {
    var i = ce(e[r], t[r]);
    if (i !== 0)
      return i;
  }
  return e.length === t.length ? 0 : e.length > t.length ? 1 : -1;
}
function iu(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function au(e, t) {
  for (var n = Object.keys(e), r = Object.keys(t), i = Math.min(n.length, r.length), a = 0; a < i; a++) {
    var o = ce(n[a], r[a]);
    if (o !== 0 || (o = ce(e[n[a]], t[r[a]]), o !== 0))
      return o;
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
function ou(e) {
  if (e === 0)
    return "1";
  var t = e.toExponential().split(/e\+?/), n = parseInt(t[1], 10), r = e < 0, i = r ? "0" : "2", a = (r ? -n : n) - ka, o = Zs(a.toString(), "0", Mn);
  i += Fn + o;
  var s = Math.abs(parseFloat(t[0]));
  r && (s = 10 - s);
  var c = s.toFixed(20);
  return c = c.replace(/\.?0+$/, ""), i += Fn + c, i;
}
function su(e) {
  function t(n) {
    return e.map(function(r) {
      var i = $a(r), a = qr(i), o = Tr(n, a);
      return o;
    });
  }
  return function(n, r) {
    var i = t(n.doc), a = t(r.doc), o = ce(i, a);
    return o !== 0 ? o : Us(n.doc._id, r.doc._id);
  };
}
function uu(e, t, n) {
  if (e = e.filter(function(o) {
    return dt(o.doc, t.selector, n);
  }), t.sort) {
    var r = su(t.sort);
    e = e.sort(r), typeof t.sort[0] != "string" && zs(t.sort[0]) === "desc" && (e = e.reverse());
  }
  if ("limit" in t || "skip" in t) {
    var i = t.skip || 0, a = ("limit" in t ? t.limit : e.length) + i;
    e = e.slice(i, a);
  }
  return e;
}
function dt(e, t, n) {
  return n.every(function(r) {
    var i = t[r], a = qr(r), o = Tr(e, a);
    return ba(r) ? cu(r, i, e) : Vt(i, e, a, o);
  });
}
function Vt(e, t, n, r) {
  return e ? typeof e == "object" ? Object.keys(e).every(function(i) {
    var a = e[i];
    if (i.indexOf("$") === 0)
      return ai(i, t, a, n, r);
    var o = qr(i);
    if (r === void 0 && typeof a != "object" && o.length > 0)
      return !1;
    var s = Tr(r, o);
    return typeof a == "object" ? Vt(a, t, n, s) : ai("$eq", t, a, o, s);
  }) : e === r : !0;
}
function cu(e, t, n) {
  return e === "$or" ? t.some(function(r) {
    return dt(n, r, Object.keys(r));
  }) : e === "$not" ? !dt(n, t, Object.keys(t)) : !t.find(function(r) {
    return dt(n, r, Object.keys(r));
  });
}
function ai(e, t, n, r, i) {
  if (!si[e])
    throw new Error('unknown operator "' + e + '" - should be one of $eq, $lte, $lt, $gt, $gte, $exists, $ne, $in, $nin, $size, $mod, $regex, $elemMatch, $type, $allMatch or $all');
  return si[e](t, n, r, i);
}
function bt(e) {
  return typeof e != "undefined" && e !== null;
}
function Ke(e) {
  return typeof e != "undefined";
}
function fu(e, t) {
  if (typeof e != "number" || parseInt(e, 10) !== e)
    return !1;
  var n = t[0], r = t[1];
  return e % n === r;
}
function oi(e, t) {
  return t.some(function(n) {
    return e instanceof Array ? e.some(function(r) {
      return ce(n, r) === 0;
    }) : ce(n, e) === 0;
  });
}
function lu(e, t) {
  return t.every(function(n) {
    return e.some(function(r) {
      return ce(n, r) === 0;
    });
  });
}
function du(e, t) {
  return e.length === t;
}
function hu(e, t) {
  var n = new RegExp(t);
  return n.test(e);
}
function vu(e, t) {
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
var si = {
  $elemMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" && r[0] !== null ? r.some(function(i) {
      return dt(i, t, Object.keys(t));
    }) : r.some(function(i) {
      return Vt(t, e, n, i);
    });
  },
  $allMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" && r[0] !== null ? r.every(function(i) {
      return dt(i, t, Object.keys(t));
    }) : r.every(function(i) {
      return Vt(t, e, n, i);
    });
  },
  $eq: function(e, t, n, r) {
    return Ke(r) && ce(r, t) === 0;
  },
  $gte: function(e, t, n, r) {
    return Ke(r) && ce(r, t) >= 0;
  },
  $gt: function(e, t, n, r) {
    return Ke(r) && ce(r, t) > 0;
  },
  $lte: function(e, t, n, r) {
    return Ke(r) && ce(r, t) <= 0;
  },
  $lt: function(e, t, n, r) {
    return Ke(r) && ce(r, t) < 0;
  },
  $exists: function(e, t, n, r) {
    return t ? Ke(r) : !Ke(r);
  },
  $mod: function(e, t, n, r) {
    return bt(r) && fu(r, t);
  },
  $ne: function(e, t, n, r) {
    return t.every(function(i) {
      return ce(r, i) !== 0;
    });
  },
  $in: function(e, t, n, r) {
    return bt(r) && oi(r, t);
  },
  $nin: function(e, t, n, r) {
    return bt(r) && !oi(r, t);
  },
  $size: function(e, t, n, r) {
    return bt(r) && Array.isArray(r) && du(r, t);
  },
  $all: function(e, t, n, r) {
    return Array.isArray(r) && lu(r, t);
  },
  $regex: function(e, t, n, r) {
    return bt(r) && typeof r == "string" && t.every(function(i) {
      return hu(r, i);
    });
  },
  $type: function(e, t, n, r) {
    return vu(r, t);
  }
};
function yu(e, t) {
  if (typeof t != "object")
    throw new Error("Selector error: expected a JSON object");
  t = Xs(t);
  var n = {
    doc: e
  }, r = uu([n], {
    selector: t
  }, Object.keys(t));
  return r && r.length === 1;
}
function pu(e) {
  return br(`"use strict";
return ` + e + ";", {});
}
function gu(e) {
  var t = ["return function(doc) {", '  "use strict";', "  var emitted = false;", "  var emit = function (a, b) {", "    emitted = true;", "  };", "  var view = " + e + ";", "  view(doc);", "  if (emitted) {", "    return true;", "  }", "};"].join(`
`);
  return br(t, {});
}
function _u(e, t) {
  if (e.selector && e.filter && e.filter !== "_selector") {
    var n = typeof e.filter == "string" ? e.filter : "function";
    return t(new Error('selector invalid for filter "' + n + '"'));
  }
  t();
}
function mu(e) {
  e.view && !e.filter && (e.filter = "_view"), e.selector && !e.filter && (e.filter = "_selector"), e.filter && typeof e.filter == "string" && (e.filter === "_view" ? e.view = Yr(e.view) : e.filter = Yr(e.filter));
}
function wu(e, t) {
  return t.filter && typeof t.filter == "string" && !t.doc_ids && !Be(e.db);
}
function bu(e, t) {
  var n = t.complete;
  if (t.filter === "_view") {
    if (!t.view || typeof t.view != "string") {
      var r = te(fn, "`view` filter parameter not found or invalid.");
      return n(r);
    }
    var i = Dn(t.view);
    e.db.get("_design/" + i[0], function(o, s) {
      if (e.isCancelled)
        return n(null, {
          status: "cancelled"
        });
      if (o)
        return n(pt(o));
      var c = s && s.views && s.views[i[1]] && s.views[i[1]].map;
      if (!c)
        return n(te(Oe, s.views ? "missing json key: " + i[1] : "missing json key: views"));
      t.filter = gu(c), e.doChanges(t);
    });
  } else if (t.selector)
    t.filter = function(o) {
      return yu(o, t.selector);
    }, e.doChanges(t);
  else {
    var a = Dn(t.filter);
    e.db.get("_design/" + a[0], function(o, s) {
      if (e.isCancelled)
        return n(null, {
          status: "cancelled"
        });
      if (o)
        return n(pt(o));
      var c = s && s.filters && s.filters[a[1]];
      if (!c)
        return n(te(Oe, s && s.filters ? "missing json key: " + a[1] : "missing json key: filters"));
      t.filter = pu(c), e.doChanges(t);
    });
  }
}
function $u(e) {
  e._changesFilterPlugin = {
    validate: _u,
    normalize: mu,
    shouldFilter: wu,
    filter: bu
  };
}
X.plugin($u);
X.version = Fs;
function Aa(e) {
  return e.reduce(function(t, n) {
    return t[n] = !0, t;
  }, {});
}
var Ou = Aa([
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
  // replication documents
  "_replication_id",
  "_replication_state",
  "_replication_state_time",
  "_replication_state_reason",
  "_replication_stats",
  // Specific to Couchbase Sync Gateway
  "_removed"
]), Su = Aa([
  "_access",
  "_attachments",
  // replication documents
  "_replication_id",
  "_replication_state",
  "_replication_state_time",
  "_replication_state_reason",
  "_replication_stats"
]);
function ui(e) {
  if (!/^\d+-/.test(e))
    return te(sa);
  var t = e.indexOf("-"), n = e.substring(0, t), r = e.substring(t + 1);
  return {
    prefix: parseInt(n, 10),
    id: r
  };
}
function ku(e, t) {
  for (var n = e.start - e.ids.length + 1, r = e.ids, i = [r[0], t, []], a = 1, o = r.length; a < o; a++)
    i = [r[a], {
      status: "missing"
    }, [i]];
  return [{
    pos: n,
    ids: i
  }];
}
function xa(e, t, n) {
  n || (n = {
    deterministic_revs: !0
  });
  var r, i, a, o = {
    status: "available"
  };
  if (e._deleted && (o.deleted = !0), t)
    if (e._id || (e._id = ln()), i = ha(e, n.deterministic_revs), e._rev) {
      if (a = ui(e._rev), a.error)
        return a;
      e._rev_tree = [{
        pos: a.prefix,
        ids: [a.id, {
          status: "missing"
        }, [[i, o, []]]]
      }], r = a.prefix + 1;
    } else
      e._rev_tree = [{
        pos: 1,
        ids: [i, o, []]
      }], r = 1;
  else if (e._revisions && (e._rev_tree = ku(e._revisions, o), r = e._revisions.start, i = e._revisions.ids[0]), !e._rev_tree) {
    if (a = ui(e._rev), a.error)
      return a;
    r = a.prefix, i = a.id, e._rev_tree = [{
      pos: r,
      ids: [i, o, []]
    }];
  }
  ua(e._id), e._rev = r + "-" + i;
  var s = {
    metadata: {},
    data: {}
  };
  for (var c in e)
    if (Object.prototype.hasOwnProperty.call(e, c)) {
      var g = c[0] === "_";
      if (g && !Ou[c]) {
        var w = te(Xr, c);
        throw w.message = Xr.message + ": " + c, w;
      } else
        g && !Su[c] ? s.metadata[c.slice(1)] = e[c] : s.data[c] = e[c];
    }
  return s;
}
function Au(e) {
  try {
    return $r(e);
  } catch (n) {
    var t = te(oa, "Attachment is not a valid base64 string");
    return {
      error: t
    };
  }
}
function xu(e, t, n) {
  var r = Au(e.data);
  if (r.error)
    return n(r.error);
  e.length = r.length, t === "blob" ? e.data = Sr(r, e.content_type) : t === "base64" ? e.data = It(r) : e.data = r, xr(r, function(i) {
    e.digest = "md5-" + i, n();
  });
}
function Eu(e, t, n) {
  xr(e.data, function(r) {
    e.digest = "md5-" + r, e.length = e.data.size || e.data.length || 0, t === "binary" ? la(e.data, function(i) {
      e.data = i, n();
    }) : t === "base64" ? Ar(e.data, function(i) {
      e.data = i, n();
    }) : n();
  });
}
function Cu(e, t, n) {
  if (e.stub)
    return n();
  typeof e.data == "string" ? xu(e, t, n) : Eu(e, t, n);
}
function Tu(e, t, n) {
  if (!e.length)
    return n();
  var r = 0, i;
  e.forEach(function(o) {
    var s = o.data && o.data._attachments ? Object.keys(o.data._attachments) : [], c = 0;
    if (!s.length)
      return a();
    function g(f) {
      i = f, c++, c === s.length && a();
    }
    for (var w in o.data._attachments)
      Object.prototype.hasOwnProperty.call(o.data._attachments, w) && Cu(o.data._attachments[w], t, g);
  });
  function a() {
    r++, e.length === r && (i ? n(i) : n());
  }
}
function qu(e, t, n, r, i, a, o, s) {
  if ($s(t.rev_tree, n.metadata.rev) && !s)
    return r[i] = n, a();
  var c = t.winningRev || Ze(t), g = "deleted" in t ? t.deleted : Re(t, c), w = "deleted" in n.metadata ? n.metadata.deleted : Re(n.metadata), f = /^1-/.test(n.metadata.rev);
  if (g && !w && s && f) {
    var m = n.data;
    m._rev = c, m._id = n.metadata.id, n = xa(m, s);
  }
  var S = pa(t.rev_tree, n.metadata.rev_tree[0], e), A = s && (g && w && S.conflicts !== "new_leaf" || !g && S.conflicts !== "new_leaf" || g && !w && S.conflicts === "new_branch");
  if (A) {
    var E = te(yt);
    return r[i] = E, a();
  }
  var $ = n.metadata.rev;
  n.metadata.rev_tree = S.tree, n.stemmedRevs = S.stemmedRevs || [], t.rev_map && (n.metadata.rev_map = t.rev_map);
  var p = Ze(n.metadata), v = Re(n.metadata, p), u = g === v ? 0 : g < v ? -1 : 1, l;
  $ === p ? l = v : l = Re(n.metadata, $), o(n, p, v, l, !0, u, i, a);
}
function ju(e) {
  return e.metadata.rev_tree[0].ids[1].status === "missing";
}
function Pu(e, t, n, r, i, a, o, s, c) {
  e = e || 1e3;
  function g(E, $, p) {
    var v = Ze(E.metadata), u = Re(E.metadata, v);
    if ("was_delete" in s && u)
      return a[$] = te(Oe, "deleted"), p();
    var l = w && ju(E);
    if (l) {
      var y = te(yt);
      return a[$] = y, p();
    }
    var _ = u ? 0 : 1;
    o(E, v, u, u, !1, _, $, p);
  }
  var w = s.new_edits, f = new be(), m = 0, S = t.length;
  function A() {
    ++m === S && c && c();
  }
  t.forEach(function(E, $) {
    if (E._id && Xe(E._id)) {
      var p = E._deleted ? "_removeLocal" : "_putLocal";
      n[p](E, {
        ctx: i
      }, function(u, l) {
        a[$] = u || l, A();
      });
      return;
    }
    var v = E.metadata.id;
    f.has(v) ? (S--, f.get(v).push([E, $])) : f.set(v, [[E, $]]);
  }), f.forEach(function(E, $) {
    var p = 0;
    function v() {
      ++p < E.length ? u() : A();
    }
    function u() {
      var l = E[p], y = l[0], _ = l[1];
      if (r.has($))
        qu(e, r.get($), y, a, _, v, o, w);
      else {
        var j = pa([], y.metadata.rev_tree[0], e);
        y.metadata.rev_tree = j.tree, y.stemmedRevs = j.stemmedRevs || [], g(y, _, v);
      }
    }
    u();
  });
}
var Iu = 5, fe = "document-store", pe = "by-sequence", Se = "attach-store", We = "attach-seq-store", me = "meta-store", je = "local-store", Kn = "detect-blob-support";
function Bu(e) {
  try {
    return JSON.parse(e);
  } catch (t) {
    return sn.parse(e);
  }
}
function Ru(e) {
  try {
    return JSON.stringify(e);
  } catch (t) {
    return sn.stringify(e);
  }
}
function Ie(e) {
  return function(t) {
    var n = "unknown_error";
    t.target && t.target.error && (n = t.target.error.name || t.target.error.message), e(te(mr, n, t.type));
  };
}
function zn(e, t, n) {
  return {
    data: Ru(e),
    winningRev: t,
    deletedOrLocal: n ? "1" : "0",
    seq: e.seq,
    // highest seq for this doc
    id: e.id
  };
}
function He(e) {
  if (!e)
    return null;
  var t = Bu(e.data);
  return t.winningRev = e.winningRev, t.deleted = e.deletedOrLocal === "1", t.seq = e.seq, t;
}
function en(e) {
  if (!e)
    return e;
  var t = e._doc_id_rev.lastIndexOf(":");
  return e._id = e._doc_id_rev.substring(0, t - 1), e._rev = e._doc_id_rev.substring(t + 1), delete e._doc_id_rev, e;
}
function Ea(e, t, n, r) {
  n ? r(e ? typeof e != "string" ? e : kr(e, t) : Or([""], {
    type: t
  })) : e ? typeof e != "string" ? fa(e, function(i) {
    r(It(i));
  }) : r(e) : r("");
}
function Ca(e, t, n, r) {
  var i = Object.keys(e._attachments || {});
  if (!i.length)
    return r && r();
  var a = 0;
  function o() {
    ++a === i.length && r && r();
  }
  function s(c, g) {
    var w = c._attachments[g], f = w.digest, m = n.objectStore(Se).get(f);
    m.onsuccess = function(S) {
      w.body = S.target.result.body, o();
    };
  }
  i.forEach(function(c) {
    t.attachments && t.include_docs ? s(e, c) : (e._attachments[c].stub = !0, o());
  });
}
function Qn(e, t) {
  return Promise.all(e.map(function(n) {
    if (n.doc && n.doc._attachments) {
      var r = Object.keys(n.doc._attachments);
      return Promise.all(r.map(function(i) {
        var a = n.doc._attachments[i];
        if ("body" in a) {
          var o = a.body, s = a.content_type;
          return new Promise(function(c) {
            Ea(o, s, t, function(g) {
              n.doc._attachments[i] = Ye(Pt(a, ["digest", "content_type"]), {
                data: g
              }), c();
            });
          });
        }
      }));
    }
  }));
}
function Ta(e, t, n) {
  var r = [], i = n.objectStore(pe), a = n.objectStore(Se), o = n.objectStore(We), s = e.length;
  function c() {
    s--, s || g();
  }
  function g() {
    r.length && r.forEach(function(w) {
      var f = o.index("digestSeq").count(IDBKeyRange.bound(w + "::", w + "::￿", !1, !1));
      f.onsuccess = function(m) {
        var S = m.target.result;
        S || a.delete(w);
      };
    });
  }
  e.forEach(function(w) {
    var f = i.index("_doc_id_rev"), m = t + "::" + w;
    f.getKey(m).onsuccess = function(S) {
      var A = S.target.result;
      if (typeof A != "number")
        return c();
      i.delete(A);
      var E = o.index("seq").openCursor(IDBKeyRange.only(A));
      E.onsuccess = function($) {
        var p = $.target.result;
        if (p) {
          var v = p.value.digestSeq.split("::")[0];
          r.push(v), o.delete(p.primaryKey), p.continue();
        } else
          c();
      };
    };
  });
}
function Te(e, t, n) {
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
var xt = new Jo();
function Lu(e, t, n, r, i, a) {
  for (var o = t.docs, s, c, g, w, f, m, S, A, E = 0, $ = o.length; E < $; E++) {
    var p = o[E];
    p._id && Xe(p._id) || (p = o[E] = xa(p, n.new_edits, e), p.error && !S && (S = p));
  }
  if (S)
    return a(S);
  var v = !1, u = 0, l = new Array(o.length), y = new be(), _ = !1, j = r._meta.blobSupport ? "blob" : "base64";
  Tu(o, j, function(O) {
    if (O)
      return a(O);
    I();
  });
  function I() {
    var O = [fe, pe, Se, je, We, me], C = Te(i, O, "readwrite");
    if (C.error)
      return a(C.error);
    s = C.txn, s.onabort = Ie(a), s.ontimeout = Ie(a), s.oncomplete = G, c = s.objectStore(fe), g = s.objectStore(pe), w = s.objectStore(Se), f = s.objectStore(We), m = s.objectStore(me), m.get(me).onsuccess = function(B) {
      A = B.target.result, U();
    }, J(function(B) {
      if (B)
        return _ = !0, a(B);
      Y();
    });
  }
  function P() {
    v = !0, U();
  }
  function F() {
    Pu(e.revs_limit, o, r, y, s, l, W, n, P);
  }
  function U() {
    !A || !v || (A.docCount += u, m.put(A));
  }
  function Y() {
    if (!o.length)
      return;
    var O = 0;
    function C() {
      ++O === o.length && F();
    }
    function B(q) {
      var R = He(q.target.result);
      R && y.set(R.id, R), C();
    }
    for (var D = 0, T = o.length; D < T; D++) {
      var k = o[D];
      if (k._id && Xe(k._id)) {
        C();
        continue;
      }
      var x = c.get(k.metadata.id);
      x.onsuccess = B;
    }
  }
  function G() {
    _ || (xt.notify(r._meta.name), a(null, l));
  }
  function z(O, C) {
    var B = w.get(O);
    B.onsuccess = function(D) {
      if (D.target.result)
        C();
      else {
        var T = te(Vo, "unknown stub attachment with digest " + O);
        T.status = 412, C(T);
      }
    };
  }
  function J(O) {
    var C = [];
    if (o.forEach(function(k) {
      k.data && k.data._attachments && Object.keys(k.data._attachments).forEach(function(x) {
        var q = k.data._attachments[x];
        q.stub && C.push(q.digest);
      });
    }), !C.length)
      return O();
    var B = 0, D;
    function T() {
      ++B === C.length && O(D);
    }
    C.forEach(function(k) {
      z(k, function(x) {
        x && !D && (D = x), T();
      });
    });
  }
  function W(O, C, B, D, T, k, x, q) {
    O.metadata.winningRev = C, O.metadata.deleted = B;
    var R = O.data;
    R._id = O.metadata.id, R._rev = O.metadata.rev, D && (R._deleted = !0);
    var L = R._attachments && Object.keys(R._attachments).length;
    if (L)
      return d(O, C, B, T, x, q);
    u += k, U(), ee(O, C, B, T, x, q);
  }
  function ee(O, C, B, D, T, k) {
    var x = O.data, q = O.metadata;
    x._doc_id_rev = q.id + "::" + q.rev, delete x._id, delete x._rev;
    function R(ae) {
      var de = O.stemmedRevs || [];
      D && r.auto_compaction && (de = de.concat(ys(O.metadata))), de && de.length && Ta(de, O.metadata.id, s), q.seq = ae.target.result;
      var _e = zn(q, C, B), N = c.put(_e);
      N.onsuccess = Z;
    }
    function L(ae) {
      ae.preventDefault(), ae.stopPropagation();
      var de = g.index("_doc_id_rev"), _e = de.getKey(x._doc_id_rev);
      _e.onsuccess = function(N) {
        var K = g.put(x, N.target.result);
        K.onsuccess = R;
      };
    }
    function Z() {
      l[T] = {
        ok: !0,
        id: q.id,
        rev: q.rev
      }, y.set(O.metadata.id, O.metadata), h(O, q.seq, k);
    }
    var re = g.put(x);
    re.onsuccess = R, re.onerror = L;
  }
  function d(O, C, B, D, T, k) {
    var x = O.data, q = 0, R = Object.keys(x._attachments);
    function L() {
      q === R.length && ee(O, C, B, D, T, k);
    }
    function Z() {
      q++, L();
    }
    R.forEach(function(re) {
      var ae = O.data._attachments[re];
      if (ae.stub)
        q++, L();
      else {
        var de = ae.data;
        delete ae.data, ae.revpos = parseInt(C, 10);
        var _e = ae.digest;
        b(_e, de, Z);
      }
    });
  }
  function h(O, C, B) {
    var D = 0, T = Object.keys(O.data._attachments || {});
    if (!T.length)
      return B();
    function k() {
      ++D === T.length && B();
    }
    function x(R) {
      var L = O.data._attachments[R].digest, Z = f.put({
        seq: C,
        digestSeq: L + "::" + C
      });
      Z.onsuccess = k, Z.onerror = function(re) {
        re.preventDefault(), re.stopPropagation(), k();
      };
    }
    for (var q = 0; q < T.length; q++)
      x(T[q]);
  }
  function b(O, C, B) {
    var D = w.count(O);
    D.onsuccess = function(T) {
      var k = T.target.result;
      if (k)
        return B();
      var x = {
        digest: O,
        body: C
      }, q = w.put(x);
      q.onsuccess = B;
    };
  }
}
function qa(e, t, n, r, i) {
  r === -1 && (r = 1e3);
  var a = typeof e.getAll == "function" && typeof e.getAllKeys == "function" && r > 1 && !n, o, s, c;
  function g(S) {
    s = S.target.result, o && i(o, s, c);
  }
  function w(S) {
    o = S.target.result, s && i(o, s, c);
  }
  function f() {
    if (!o.length)
      return i();
    var S = o[o.length - 1], A;
    if (t && t.upper)
      try {
        A = IDBKeyRange.bound(S, t.upper, !0, t.upperOpen);
      } catch (E) {
        if (E.name === "DataError" && E.code === 0)
          return i();
      }
    else
      A = IDBKeyRange.lowerBound(S, !0);
    t = A, o = null, s = null, e.getAll(t, r).onsuccess = g, e.getAllKeys(t, r).onsuccess = w;
  }
  function m(S) {
    var A = S.target.result;
    if (!A)
      return i();
    i([A.key], [A.value], A);
  }
  a ? (c = {
    continue: f
  }, e.getAll(t, r).onsuccess = g, e.getAllKeys(t, r).onsuccess = w) : n ? e.openCursor(t, "prev").onsuccess = m : e.openCursor(t).onsuccess = m;
}
function Du(e, t, n) {
  if (typeof e.getAll == "function") {
    e.getAll(t).onsuccess = n;
    return;
  }
  var r = [];
  function i(a) {
    var o = a.target.result;
    o ? (r.push(o.value), o.continue()) : n({
      target: {
        result: r
      }
    });
  }
  e.openCursor(t).onsuccess = i;
}
function Nu(e, t, n) {
  var r = new Array(e.length), i = 0;
  e.forEach(function(a, o) {
    t.get(a).onsuccess = function(s) {
      s.target.result ? r[o] = s.target.result : r[o] = {
        key: a,
        error: "not_found"
      }, i++, i === e.length && n(e, r, {});
    };
  });
}
function Mu(e, t, n, r, i) {
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
function Fu(e, t, n) {
  var r = "startkey" in e ? e.startkey : !1, i = "endkey" in e ? e.endkey : !1, a = "key" in e ? e.key : !1, o = "keys" in e ? e.keys : !1, s = e.skip || 0, c = typeof e.limit == "number" ? e.limit : -1, g = e.inclusive_end !== !1, w, f;
  if (!o && (w = Mu(r, i, g, a, e.descending), f = w && w.error, f && !(f.name === "DataError" && f.code === 0)))
    return n(te(mr, f.name, f.message));
  var m = [fe, pe, me];
  e.attachments && m.push(Se);
  var S = Te(t, m, "readonly");
  if (S.error)
    return n(S.error);
  var A = S.txn;
  A.oncomplete = G, A.onabort = Ie(n);
  var E = A.objectStore(fe), $ = A.objectStore(pe), p = A.objectStore(me), v = $.index("_doc_id_rev"), u = [], l, y;
  p.get(me).onsuccess = function(z) {
    l = z.target.result.docCount;
  }, e.update_seq && _($, function(z) {
    z.target.result && z.target.result.length > 0 && (y = z.target.result[0]);
  });
  function _(z, J) {
    function W(ee) {
      var d = ee.target.result, h = void 0;
      return d && d.key && (h = d.key), J({
        target: {
          result: [h]
        }
      });
    }
    z.openCursor(null, "prev").onsuccess = W;
  }
  function j(z, J, W) {
    var ee = z.id + "::" + W;
    v.get(ee).onsuccess = function(h) {
      if (J.doc = en(h.target.result) || {}, e.conflicts) {
        var b = Cr(z);
        b.length && (J.doc._conflicts = b);
      }
      Ca(J.doc, e, A);
    };
  }
  function I(z, J) {
    var W = {
      id: J.id,
      key: J.id,
      value: {
        rev: z
      }
    }, ee = J.deleted;
    ee ? o && (u.push(W), W.value.deleted = !0, W.doc = null) : s-- <= 0 && (u.push(W), e.include_docs && j(J, W, z));
  }
  function P(z) {
    for (var J = 0, W = z.length; J < W && u.length !== c; J++) {
      var ee = z[J];
      if (ee.error && o) {
        u.push(ee);
        continue;
      }
      var d = He(ee), h = d.winningRev;
      I(h, d);
    }
  }
  function F(z, J, W) {
    W && (P(J), u.length < c && W.continue());
  }
  function U(z) {
    var J = z.target.result;
    e.descending && (J = J.reverse()), P(J);
  }
  function Y() {
    var z = {
      total_rows: l,
      offset: e.skip,
      rows: u
    };
    e.update_seq && y !== void 0 && (z.update_seq = y), n(null, z);
  }
  function G() {
    e.attachments ? Qn(u, e.binary).then(Y) : Y();
  }
  if (!(f || c === 0)) {
    if (o)
      return Nu(e.keys, E, F);
    if (c === -1)
      return Du(E, w, U);
    qa(E, w, e.descending, c + s, F);
  }
}
function Uu(e) {
  return new Promise(function(t) {
    var n = Or([""]), r = e.objectStore(Kn).put(n, "key");
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
function Ku(e, t) {
  var n = e.objectStore(fe).index("deletedOrLocal");
  n.count(IDBKeyRange.only("0")).onsuccess = function(r) {
    t(r.target.result);
  };
}
var Jn = !1, Gn = [];
function zu(e, t, n, r) {
  try {
    e(t, n);
  } catch (i) {
    r.emit("error", i);
  }
}
function ci() {
  Jn || !Gn.length || (Jn = !0, Gn.shift()());
}
function Qu(e, t, n) {
  Gn.push(function() {
    e(function(a, o) {
      zu(t, a, o, n), Jn = !1, we(function() {
        ci();
      });
    });
  }), ci();
}
function Ju(e, t, n, r) {
  if (e = ve(e), e.continuous) {
    var i = n + ":" + ln();
    return xt.addListener(n, i, t, e), xt.notify(n), {
      cancel: function() {
        xt.removeListener(n, i);
      }
    };
  }
  var a = e.doc_ids && new vt(e.doc_ids);
  e.since = e.since || 0;
  var o = e.since, s = "limit" in e ? e.limit : -1;
  s === 0 && (s = 1);
  var c = [], g = 0, w = wr(e), f = new be(), m, S, A, E;
  function $(I, P, F) {
    if (!F || !I.length)
      return;
    var U = new Array(I.length), Y = new Array(I.length);
    function G(W, ee) {
      var d = e.processChange(ee, W, e);
      o = d.seq = W.seq;
      var h = w(d);
      return typeof h == "object" ? Promise.reject(h) : h ? (g++, e.return_docs && c.push(d), e.attachments && e.include_docs ? new Promise(function(b) {
        Ca(ee, e, m, function() {
          Qn([d], e.binary).then(function() {
            b(d);
          });
        });
      }) : Promise.resolve(d)) : Promise.resolve();
    }
    function z() {
      for (var W = [], ee = 0, d = U.length; ee < d && g !== s; ee++) {
        var h = U[ee];
        if (h) {
          var b = Y[ee];
          W.push(G(b, h));
        }
      }
      Promise.all(W).then(function(O) {
        for (var C = 0, B = O.length; C < B; C++)
          O[C] && e.onChange(O[C]);
      }).catch(e.complete), g !== s && F.continue();
    }
    var J = 0;
    P.forEach(function(W, ee) {
      var d = en(W), h = I[ee];
      v(d, h, function(b, O) {
        Y[ee] = b, U[ee] = O, ++J === I.length && z();
      });
    });
  }
  function p(I, P, F, U) {
    if (F.seq !== P)
      return U();
    if (F.winningRev === I._rev)
      return U(F, I);
    var Y = I._id + "::" + F.winningRev, G = E.get(Y);
    G.onsuccess = function(z) {
      U(F, en(z.target.result));
    };
  }
  function v(I, P, F) {
    if (a && !a.has(I._id))
      return F();
    var U = f.get(I._id);
    if (U)
      return p(I, P, U, F);
    A.get(I._id).onsuccess = function(Y) {
      U = He(Y.target.result), f.set(I._id, U), p(I, P, U, F);
    };
  }
  function u() {
    e.complete(null, {
      results: c,
      last_seq: o
    });
  }
  function l() {
    !e.continuous && e.attachments ? Qn(c).then(u) : u();
  }
  var y = [fe, pe];
  e.attachments && y.push(Se);
  var _ = Te(r, y, "readonly");
  if (_.error)
    return e.complete(_.error);
  m = _.txn, m.onabort = Ie(e.complete), m.oncomplete = l, S = m.objectStore(pe), A = m.objectStore(fe), E = S.index("_doc_id_rev");
  var j = e.since && !e.descending ? IDBKeyRange.lowerBound(e.since, !0) : null;
  qa(S, j, e.descending, s, $);
}
var ot = new be(), wn, bn = new be();
function ja(e, t) {
  var n = this;
  Qu(function(r) {
    Gu(n, e, r);
  }, t, n.constructor);
}
function Gu(e, t, n) {
  var r = t.name, i = null, a = null;
  e._meta = null;
  function o($) {
    return function(p, v) {
      p && p instanceof Error && !p.reason && a && (p.reason = a), $(p, v);
    };
  }
  function s($) {
    var p = $.createObjectStore(fe, {
      keyPath: "id"
    });
    $.createObjectStore(pe, {
      autoIncrement: !0
    }).createIndex("_doc_id_rev", "_doc_id_rev", {
      unique: !0
    }), $.createObjectStore(Se, {
      keyPath: "digest"
    }), $.createObjectStore(me, {
      keyPath: "id",
      autoIncrement: !1
    }), $.createObjectStore(Kn), p.createIndex("deletedOrLocal", "deletedOrLocal", {
      unique: !1
    }), $.createObjectStore(je, {
      keyPath: "_id"
    });
    var v = $.createObjectStore(We, {
      autoIncrement: !0
    });
    v.createIndex("seq", "seq"), v.createIndex("digestSeq", "digestSeq", {
      unique: !0
    });
  }
  function c($, p) {
    var v = $.objectStore(fe);
    v.createIndex("deletedOrLocal", "deletedOrLocal", {
      unique: !1
    }), v.openCursor().onsuccess = function(u) {
      var l = u.target.result;
      if (l) {
        var y = l.value, _ = Re(y);
        y.deletedOrLocal = _ ? "1" : "0", v.put(y), l.continue();
      } else
        p();
    };
  }
  function g($) {
    $.createObjectStore(je, {
      keyPath: "_id"
    }).createIndex("_doc_id_rev", "_doc_id_rev", {
      unique: !0
    });
  }
  function w($, p) {
    var v = $.objectStore(je), u = $.objectStore(fe), l = $.objectStore(pe), y = u.openCursor();
    y.onsuccess = function(_) {
      var j = _.target.result;
      if (j) {
        var I = j.value, P = I.id, F = Xe(P), U = Ze(I);
        if (F) {
          var Y = P + "::" + U, G = P + "::", z = P + "::~", J = l.index("_doc_id_rev"), W = IDBKeyRange.bound(G, z, !1, !1), ee = J.openCursor(W);
          ee.onsuccess = function(d) {
            if (ee = d.target.result, !ee)
              u.delete(j.primaryKey), j.continue();
            else {
              var h = ee.value;
              h._doc_id_rev === Y && v.put(h), l.delete(ee.primaryKey), ee.continue();
            }
          };
        } else
          j.continue();
      } else
        p && p();
    };
  }
  function f($) {
    var p = $.createObjectStore(We, {
      autoIncrement: !0
    });
    p.createIndex("seq", "seq"), p.createIndex("digestSeq", "digestSeq", {
      unique: !0
    });
  }
  function m($, p) {
    var v = $.objectStore(pe), u = $.objectStore(Se), l = $.objectStore(We), y = u.count();
    y.onsuccess = function(_) {
      var j = _.target.result;
      if (!j)
        return p();
      v.openCursor().onsuccess = function(I) {
        var P = I.target.result;
        if (!P)
          return p();
        for (var F = P.value, U = P.primaryKey, Y = Object.keys(F._attachments || {}), G = {}, z = 0; z < Y.length; z++) {
          var J = F._attachments[Y[z]];
          G[J.digest] = !0;
        }
        var W = Object.keys(G);
        for (z = 0; z < W.length; z++) {
          var ee = W[z];
          l.put({
            seq: U,
            digestSeq: ee + "::" + U
          });
        }
        P.continue();
      };
    };
  }
  function S($) {
    function p(y) {
      return y.data ? He(y) : (y.deleted = y.deletedOrLocal === "1", y);
    }
    var v = $.objectStore(pe), u = $.objectStore(fe), l = u.openCursor();
    l.onsuccess = function(y) {
      var _ = y.target.result;
      if (!_)
        return;
      var j = p(_.value);
      j.winningRev = j.winningRev || Ze(j);
      function I() {
        var F = j.id + "::", U = j.id + "::￿", Y = v.index("_doc_id_rev").openCursor(IDBKeyRange.bound(F, U)), G = 0;
        Y.onsuccess = function(z) {
          var J = z.target.result;
          if (!J)
            return j.seq = G, P();
          var W = J.primaryKey;
          W > G && (G = W), J.continue();
        };
      }
      function P() {
        var F = zn(j, j.winningRev, j.deleted), U = u.put(F);
        U.onsuccess = function() {
          _.continue();
        };
      }
      if (j.seq)
        return P();
      I();
    };
  }
  e._remote = !1, e.type = function() {
    return "idb";
  }, e._id = ra(function($) {
    $(null, e._meta.instanceId);
  }), e._bulkDocs = function(p, v, u) {
    Lu(t, p, v, e, i, o(u));
  }, e._get = function(p, v, u) {
    var l, y, _, j = v.ctx;
    if (!j) {
      var I = Te(i, [fe, pe, Se], "readonly");
      if (I.error)
        return u(I.error);
      j = I.txn;
    }
    function P() {
      u(_, {
        doc: l,
        metadata: y,
        ctx: j
      });
    }
    j.objectStore(fe).get(p).onsuccess = function(F) {
      if (y = He(F.target.result), !y)
        return _ = te(Oe, "missing"), P();
      var U;
      if (v.rev)
        U = v.latest ? Ss(v.rev, y) : v.rev;
      else {
        U = y.winningRev;
        var Y = Re(y);
        if (Y)
          return _ = te(Oe, "deleted"), P();
      }
      var G = j.objectStore(pe), z = y.id + "::" + U;
      G.index("_doc_id_rev").get(z).onsuccess = function(J) {
        if (l = J.target.result, l && (l = en(l)), !l)
          return _ = te(Oe, "missing"), P();
        P();
      };
    };
  }, e._getAttachment = function($, p, v, u, l) {
    var y;
    if (u.ctx)
      y = u.ctx;
    else {
      var _ = Te(i, [fe, pe, Se], "readonly");
      if (_.error)
        return l(_.error);
      y = _.txn;
    }
    var j = v.digest, I = v.content_type;
    y.objectStore(Se).get(j).onsuccess = function(P) {
      var F = P.target.result.body;
      Ea(F, I, u.binary, function(U) {
        l(null, U);
      });
    };
  }, e._info = function(p) {
    var v, u, l = Te(i, [me, pe], "readonly");
    if (l.error)
      return p(l.error);
    var y = l.txn;
    y.objectStore(me).get(me).onsuccess = function(_) {
      u = _.target.result.docCount;
    }, y.objectStore(pe).openCursor(null, "prev").onsuccess = function(_) {
      var j = _.target.result;
      v = j ? j.key : 0;
    }, y.oncomplete = function() {
      p(null, {
        doc_count: u,
        update_seq: v,
        // for debugging
        idb_attachment_format: e._meta.blobSupport ? "binary" : "base64"
      });
    };
  }, e._allDocs = function(p, v) {
    Fu(p, i, o(v));
  }, e._changes = function(p) {
    return Ju(p, e, r, i);
  }, e._close = function($) {
    i.close(), ot.delete(r), $();
  }, e._getRevisionTree = function($, p) {
    var v = Te(i, [fe], "readonly");
    if (v.error)
      return p(v.error);
    var u = v.txn, l = u.objectStore(fe).get($);
    l.onsuccess = function(y) {
      var _ = He(y.target.result);
      _ ? p(null, _.rev_tree) : p(te(Oe));
    };
  }, e._doCompaction = function($, p, v) {
    var u = [fe, pe, Se, We], l = Te(i, u, "readwrite");
    if (l.error)
      return v(l.error);
    var y = l.txn, _ = y.objectStore(fe);
    _.get($).onsuccess = function(j) {
      var I = He(j.target.result);
      Ve(I.rev_tree, function(U, Y, G, z, J) {
        var W = Y + "-" + G;
        p.indexOf(W) !== -1 && (J.status = "missing");
      }), Ta(p, $, y);
      var P = I.winningRev, F = I.deleted;
      y.objectStore(fe).put(zn(I, P, F));
    }, y.onabort = Ie(v), y.oncomplete = function() {
      v();
    };
  }, e._getLocal = function($, p) {
    var v = Te(i, [je], "readonly");
    if (v.error)
      return p(v.error);
    var u = v.txn, l = u.objectStore(je).get($);
    l.onerror = Ie(p), l.onsuccess = function(y) {
      var _ = y.target.result;
      _ ? (delete _._doc_id_rev, p(null, _)) : p(te(Oe));
    };
  }, e._putLocal = function($, p, v) {
    typeof p == "function" && (v = p, p = {}), delete $._revisions;
    var u = $._rev, l = $._id;
    u ? $._rev = "0-" + (parseInt(u.split("-")[1], 10) + 1) : $._rev = "0-1";
    var y = p.ctx, _;
    if (!y) {
      var j = Te(i, [je], "readwrite");
      if (j.error)
        return v(j.error);
      y = j.txn, y.onerror = Ie(v), y.oncomplete = function() {
        _ && v(null, _);
      };
    }
    var I = y.objectStore(je), P;
    u ? (P = I.get(l), P.onsuccess = function(F) {
      var U = F.target.result;
      if (!U || U._rev !== u)
        v(te(yt));
      else {
        var Y = I.put($);
        Y.onsuccess = function() {
          _ = {
            ok: !0,
            id: $._id,
            rev: $._rev
          }, p.ctx && v(null, _);
        };
      }
    }) : (P = I.add($), P.onerror = function(F) {
      v(te(yt)), F.preventDefault(), F.stopPropagation();
    }, P.onsuccess = function() {
      _ = {
        ok: !0,
        id: $._id,
        rev: $._rev
      }, p.ctx && v(null, _);
    });
  }, e._removeLocal = function($, p, v) {
    typeof p == "function" && (v = p, p = {});
    var u = p.ctx;
    if (!u) {
      var l = Te(i, [je], "readwrite");
      if (l.error)
        return v(l.error);
      u = l.txn, u.oncomplete = function() {
        y && v(null, y);
      };
    }
    var y, _ = $._id, j = u.objectStore(je), I = j.get(_);
    I.onerror = Ie(v), I.onsuccess = function(P) {
      var F = P.target.result;
      !F || F._rev !== $._rev ? v(te(Oe)) : (j.delete(_), y = {
        ok: !0,
        id: _,
        rev: "0-0"
      }, p.ctx && v(null, y));
    };
  }, e._destroy = function($, p) {
    xt.removeAllListeners(r);
    var v = bn.get(r);
    v && v.result && (v.result.close(), ot.delete(r));
    var u = indexedDB.deleteDatabase(r);
    u.onsuccess = function() {
      bn.delete(r), Xt() && r in localStorage && delete localStorage[r], p(null, {
        ok: !0
      });
    }, u.onerror = Ie(p);
  };
  var A = ot.get(r);
  if (A)
    return i = A.idb, e._meta = A.global, we(function() {
      n(null, e);
    });
  var E = indexedDB.open(r, Iu);
  bn.set(r, E), E.onupgradeneeded = function($) {
    var p = $.target.result;
    if ($.oldVersion < 1)
      return s(p);
    var v = $.currentTarget.transaction;
    $.oldVersion < 3 && g(p), $.oldVersion < 4 && f(p);
    var u = [
      c,
      // v1 -> v2
      w,
      // v2 -> v3
      m,
      // v3 -> v4
      S
      // v4 -> v5
    ], l = $.oldVersion;
    function y() {
      var _ = u[l - 1];
      l++, _ && _(v, y);
    }
    y();
  }, E.onsuccess = function($) {
    i = $.target.result, i.onversionchange = function() {
      i.close(), ot.delete(r);
    }, i.onabort = function(P) {
      Ae("error", "Database has a window failure", P.target.error), a = P.target.error, i.close(), ot.delete(r);
    };
    var p = i.transaction([me, Kn, fe], "readwrite"), v = !1, u, l, y, _;
    function j() {
      typeof y == "undefined" || !v || (e._meta = {
        name: r,
        instanceId: _,
        blobSupport: y
      }, ot.set(r, {
        idb: i,
        window: e._meta
      }), n(null, e));
    }
    function I() {
      if (!(typeof l == "undefined" || typeof u == "undefined")) {
        var P = r + "_id";
        P in u ? _ = u[P] : u[P] = _ = ln(), u.docCount = l, p.objectStore(me).put(u);
      }
    }
    p.objectStore(me).get(me).onsuccess = function(P) {
      u = P.target.result || {
        id: me
      }, I();
    }, Ku(p, function(P) {
      l = P, I();
    }), wn || (wn = Uu(p)), wn.then(function(P) {
      y = P, j();
    }), p.oncomplete = function() {
      v = !0, j();
    }, p.onabort = Ie(n);
  }, E.onerror = function($) {
    var p = $.target.error && $.target.error.message;
    p ? p.indexOf("stored database is a higher version") !== -1 && (p = new Error('This DB was created with the newer "indexeddb" adapter, but you are trying to open it with the older "idb" adapter')) : p = "Failed to open indexedDB, are you in private browsing mode?", Ae("error", p), n(te(mr, p));
  };
}
ja.valid = function() {
  try {
    return typeof indexedDB != "undefined" && typeof IDBKeyRange != "undefined";
  } catch (e) {
    return !1;
  }
};
function Wu(e) {
  e.adapter("idb", ja, !0);
}
function Hu(e, t) {
  return new Promise(function(n, r) {
    var i = 0, a = 0, o = 0, s = e.length, c;
    function g() {
      i++, e[a++]().then(f, m);
    }
    function w() {
      ++o === s ? c ? r(c) : n() : S();
    }
    function f() {
      i--, w();
    }
    function m(A) {
      i--, c = c || A, w();
    }
    function S() {
      for (; i < t && a < s; )
        g();
    }
    S();
  });
}
const Xu = 25, Yu = 50, Kt = 5e3, Zu = 1e4;
let $n = {};
function On(e) {
  let t = e.doc || e.ok, n = t && t._attachments;
  n && Object.keys(n).forEach(function(r) {
    let i = n[r];
    i.data = kr(i.data, i.content_type);
  });
}
function ze(e) {
  return /^_design/.test(e) ? "_design/" + encodeURIComponent(e.slice(8)) : /^_local/.test(e) ? "_local/" + encodeURIComponent(e.slice(7)) : encodeURIComponent(e);
}
function fi(e) {
  return !e._attachments || !Object.keys(e._attachments) ? Promise.resolve() : Promise.all(Object.keys(e._attachments).map(function(t) {
    let n = e._attachments[t];
    if (n.data && typeof n.data != "string")
      return new Promise(function(r) {
        Ar(n.data, r);
      }).then(function(r) {
        n.data = r;
      });
  }));
}
function Vu(e) {
  if (!e.prefix)
    return !1;
  let t = ca(e.prefix).protocol;
  return t === "http" || t === "https";
}
function ec(e, t) {
  if (Vu(t)) {
    let i = t.name.substr(t.prefix.length);
    e = t.prefix.replace(/\/?$/, "/") + encodeURIComponent(i);
  }
  let n = ca(e);
  (n.user || n.password) && (n.auth = {
    username: n.user,
    password: n.password
  });
  let r = n.path.replace(/(^\/|\/$)/g, "").split("/");
  return n.db = r.pop(), n.db.indexOf("%") === -1 && (n.db = encodeURIComponent(n.db)), n.path = r.join("/"), n;
}
function he(e, t) {
  return Gt(e, e.db + "/" + t);
}
function Gt(e, t) {
  let n = e.path ? "/" : "";
  return e.protocol + "://" + e.host + (e.port ? ":" + e.port : "") + "/" + e.path + n + t;
}
function zt(e) {
  return "?" + Object.keys(e).map(function(t) {
    return t + "=" + encodeURIComponent(e[t]);
  }).join("&");
}
function tc(e) {
  let t = typeof navigator != "undefined" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "", n = t.indexOf("msie") !== -1, r = t.indexOf("trident") !== -1, i = t.indexOf("edge") !== -1, a = !("method" in e) || e.method === "GET";
  return (n || r || i) && a;
}
function Wn(e, t) {
  let n = this, r = ec(e.name, e), i = he(r, "");
  e = ve(e);
  const a = function(f, m) {
    return M(this, null, function* () {
      if (m = m || {}, m.headers = m.headers || new lt(), m.credentials = "include", e.auth || r.auth) {
        let E = e.auth || r.auth, $ = E.username + ":" + E.password, p = It(unescape(encodeURIComponent($)));
        m.headers.set("Authorization", "Basic " + p);
      }
      let S = e.headers || {};
      return Object.keys(S).forEach(function(E) {
        m.headers.append(E, S[E]);
      }), tc(m) && (f += (f.indexOf("?") === -1 ? "?" : "&") + "_nonce=" + Date.now()), yield (e.fetch || wa)(f, m);
    });
  };
  function o(f, m) {
    return ue(f, function(...S) {
      g().then(function() {
        return m.apply(this, S);
      }).catch(function(A) {
        S.pop()(A);
      });
    }).bind(n);
  }
  function s(f, m) {
    return M(this, null, function* () {
      let S = {};
      m = m || {}, m.headers = m.headers || new lt(), m.headers.get("Content-Type") || m.headers.set("Content-Type", "application/json"), m.headers.get("Accept") || m.headers.set("Accept", "application/json");
      const A = yield a(f, m);
      S.ok = A.ok, S.status = A.status;
      const E = yield A.json();
      if (S.data = E, !S.ok)
        throw S.data.status = S.status, pt(S.data);
      return Array.isArray(S.data) && (S.data = S.data.map(function($) {
        return $.error || $.missing ? pt($) : $;
      })), S;
    });
  }
  let c;
  function g() {
    return M(this, null, function* () {
      return e.skip_setup ? Promise.resolve() : c || (c = s(i).catch(function(f) {
        return f && f.status && f.status === 404 ? (Rn(404, "PouchDB is just detecting if the remote exists."), s(i, {
          method: "PUT"
        })) : Promise.reject(f);
      }).catch(function(f) {
        return f && f.status && f.status === 412 ? !0 : Promise.reject(f);
      }), c.catch(function() {
        c = null;
      }), c);
    });
  }
  we(function() {
    t(null, n);
  }), n._remote = !0, n.type = function() {
    return "http";
  }, n.id = o("id", function(f) {
    return M(this, null, function* () {
      let m;
      try {
        m = yield (yield a(Gt(r, ""))).json();
      } catch (A) {
        m = {};
      }
      let S = m && m.uuid ? m.uuid + r.db : he(r, "");
      f(null, S);
    });
  }), n.compact = o("compact", function(f, m) {
    return M(this, null, function* () {
      typeof f == "function" && (m = f, f = {}), f = ve(f), yield s(he(r, "_compact"), {
        method: "POST"
      });
      function S() {
        n.info(function(A, E) {
          E && !E.compact_running ? m(null, {
            ok: !0
          }) : setTimeout(S, f.interval || 200);
        });
      }
      S();
    });
  }), n.bulkGet = ue("bulkGet", function(f, m) {
    let S = this;
    function A(v) {
      return M(this, null, function* () {
        let u = {};
        f.revs && (u.revs = !0), f.attachments && (u.attachments = !0), f.latest && (u.latest = !0);
        try {
          const l = yield s(he(r, "_bulk_get" + zt(u)), {
            method: "POST",
            body: JSON.stringify({
              docs: f.docs
            })
          });
          f.attachments && f.binary && l.data.results.forEach(function(y) {
            y.docs.forEach(On);
          }), v(null, l.data);
        } catch (l) {
          v(l);
        }
      });
    }
    function E() {
      let v = Yu, u = Math.ceil(f.docs.length / v), l = 0, y = new Array(u);
      function _(j) {
        return function(I, P) {
          y[j] = P.results, ++l === u && m(null, {
            results: Yt(y)
          });
        };
      }
      for (let j = 0; j < u; j++) {
        let I = Pt(f, ["revs", "attachments", "binary", "latest"]);
        I.docs = f.docs.slice(j * v, Math.min(f.docs.length, (j + 1) * v)), ia(S, I, _(j));
      }
    }
    let $ = Gt(r, ""), p = $n[$];
    typeof p != "boolean" ? A(function(v, u) {
      v ? ($n[$] = !1, Rn(v.status, "PouchDB is just detecting if the remote supports the _bulk_get API."), E()) : ($n[$] = !0, m(null, u));
    }) : p ? A(m) : E();
  }), n._info = function(f) {
    return M(this, null, function* () {
      try {
        yield g();
        const S = yield (yield a(he(r, ""))).json();
        S.host = he(r, ""), f(null, S);
      } catch (m) {
        f(m);
      }
    });
  }, n.fetch = function(f, m) {
    return M(this, null, function* () {
      yield g();
      const S = f.substring(0, 1) === "/" ? Gt(r, f.substring(1)) : he(r, f);
      return a(S, m);
    });
  }, n.get = o("get", function(f, m, S) {
    return M(this, null, function* () {
      typeof m == "function" && (S = m, m = {}), m = ve(m);
      let A = {};
      m.revs && (A.revs = !0), m.revs_info && (A.revs_info = !0), m.latest && (A.latest = !0), m.open_revs && (m.open_revs !== "all" && (m.open_revs = JSON.stringify(m.open_revs)), A.open_revs = m.open_revs), m.rev && (A.rev = m.rev), m.conflicts && (A.conflicts = m.conflicts), m.update_seq && (A.update_seq = m.update_seq), f = ze(f);
      function E(v) {
        let u = v._attachments, l = u && Object.keys(u);
        if (!u || !l.length)
          return;
        function y(j) {
          return M(this, null, function* () {
            const I = u[j], P = ze(v._id) + "/" + w(j) + "?rev=" + v._rev, F = yield a(he(r, P));
            let U;
            "buffer" in F ? U = yield F.buffer() : U = yield F.blob();
            let Y;
            if (m.binary) {
              let G = Object.getOwnPropertyDescriptor(U.__proto__, "type");
              (!G || G.set) && (U.type = I.content_type), Y = U;
            } else
              Y = yield new Promise(function(G) {
                Ar(U, G);
              });
            delete I.stub, delete I.length, I.data = Y;
          });
        }
        let _ = l.map(function(j) {
          return function() {
            return y(j);
          };
        });
        return Hu(_, 5);
      }
      function $(v) {
        return Array.isArray(v) ? Promise.all(v.map(function(u) {
          if (u.ok)
            return E(u.ok);
        })) : E(v);
      }
      const p = he(r, f + zt(A));
      try {
        const v = yield s(p);
        m.attachments && (yield $(v.data)), S(null, v.data);
      } catch (v) {
        v.docId = f, S(v);
      }
    });
  }), n.remove = o("remove", function(f, m, S, A) {
    return M(this, null, function* () {
      let E;
      typeof m == "string" ? (E = {
        _id: f,
        _rev: m
      }, typeof S == "function" && (A = S, S = {})) : (E = f, typeof m == "function" ? (A = m, S = {}) : (A = S, S = m));
      const $ = E._rev || S.rev, p = he(r, ze(E._id)) + "?rev=" + $;
      try {
        const v = yield s(p, {
          method: "DELETE"
        });
        A(null, v.data);
      } catch (v) {
        A(v);
      }
    });
  });
  function w(f) {
    return f.split("/").map(encodeURIComponent).join("/");
  }
  n.getAttachment = o("getAttachment", function(f, m, S, A) {
    return M(this, null, function* () {
      typeof S == "function" && (A = S, S = {});
      const E = S.rev ? "?rev=" + S.rev : "", $ = he(r, ze(f)) + "/" + w(m) + E;
      let p;
      try {
        const u = yield a($, {
          method: "GET"
        });
        if (!u.ok)
          throw u;
        p = u.headers.get("content-type");
        let l;
        if (typeof process != "undefined" && !process.browser && typeof u.buffer == "function" ? l = yield u.buffer() : l = yield u.blob(), typeof process != "undefined" && !process.browser) {
          var v = Object.getOwnPropertyDescriptor(l.__proto__, "type");
          (!v || v.set) && (l.type = p);
        }
        A(null, l);
      } catch (u) {
        A(u);
      }
    });
  }), n.removeAttachment = o("removeAttachment", function(f, m, S, A) {
    return M(this, null, function* () {
      const E = he(r, ze(f) + "/" + w(m)) + "?rev=" + S;
      try {
        const $ = yield s(E, {
          method: "DELETE"
        });
        A(null, $.data);
      } catch ($) {
        A($);
      }
    });
  }), n.putAttachment = o("putAttachment", function(f, m, S, A, E, $) {
    return M(this, null, function* () {
      typeof E == "function" && ($ = E, E = A, A = S, S = null);
      const p = ze(f) + "/" + w(m);
      let v = he(r, p);
      if (S && (v += "?rev=" + S), typeof A == "string") {
        let u;
        try {
          u = $r(A);
        } catch (l) {
          return $(te(oa, "Attachment is not a valid base64 string"));
        }
        A = u ? Sr(u, E) : "";
      }
      try {
        const u = yield s(v, {
          headers: new lt({
            "Content-Type": E
          }),
          method: "PUT",
          body: A
        });
        $(null, u.data);
      } catch (u) {
        $(u);
      }
    });
  }), n._bulkDocs = function(f, m, S) {
    return M(this, null, function* () {
      f.new_edits = m.new_edits;
      try {
        yield g(), yield Promise.all(f.docs.map(fi));
        const A = yield s(he(r, "_bulk_docs"), {
          method: "POST",
          body: JSON.stringify(f)
        });
        S(null, A.data);
      } catch (A) {
        S(A);
      }
    });
  }, n._put = function(f, m, S) {
    return M(this, null, function* () {
      try {
        yield g(), yield fi(f);
        const A = yield s(he(r, ze(f._id)), {
          method: "PUT",
          body: JSON.stringify(f)
        });
        S(null, A.data);
      } catch (A) {
        A.docId = f && f._id, S(A);
      }
    });
  }, n.allDocs = o("allDocs", function(f, m) {
    return M(this, null, function* () {
      typeof f == "function" && (m = f, f = {}), f = ve(f);
      let S = {}, A, E = "GET";
      f.conflicts && (S.conflicts = !0), f.update_seq && (S.update_seq = !0), f.descending && (S.descending = !0), f.include_docs && (S.include_docs = !0), f.attachments && (S.attachments = !0), f.key && (S.key = JSON.stringify(f.key)), f.start_key && (f.startkey = f.start_key), f.startkey && (S.startkey = JSON.stringify(f.startkey)), f.end_key && (f.endkey = f.end_key), f.endkey && (S.endkey = JSON.stringify(f.endkey)), typeof f.inclusive_end != "undefined" && (S.inclusive_end = !!f.inclusive_end), typeof f.limit != "undefined" && (S.limit = f.limit), typeof f.skip != "undefined" && (S.skip = f.skip);
      let $ = zt(S);
      typeof f.keys != "undefined" && (E = "POST", A = {
        keys: f.keys
      });
      try {
        const p = yield s(he(r, "_all_docs" + $), {
          method: E,
          body: JSON.stringify(A)
        });
        f.include_docs && f.attachments && f.binary && p.data.rows.forEach(On), m(null, p.data);
      } catch (p) {
        m(p);
      }
    });
  }), n._changes = function(f) {
    let m = "batch_size" in f ? f.batch_size : Xu;
    f = ve(f), f.continuous && !("heartbeat" in f) && (f.heartbeat = Zu);
    let S = "timeout" in f ? f.timeout : 30 * 1e3;
    "timeout" in f && f.timeout && S - f.timeout < Kt && (S = f.timeout + Kt), "heartbeat" in f && f.heartbeat && S - f.heartbeat < Kt && (S = f.heartbeat + Kt);
    let A = {};
    "timeout" in f && f.timeout && (A.timeout = f.timeout);
    let E = typeof f.limit != "undefined" ? f.limit : !1, $ = E;
    if (f.style && (A.style = f.style), (f.include_docs || f.filter && typeof f.filter == "function") && (A.include_docs = !0), f.attachments && (A.attachments = !0), f.continuous && (A.feed = "longpoll"), f.seq_interval && (A.seq_interval = f.seq_interval), f.conflicts && (A.conflicts = !0), f.descending && (A.descending = !0), f.update_seq && (A.update_seq = !0), "heartbeat" in f && f.heartbeat && (A.heartbeat = f.heartbeat), f.filter && typeof f.filter == "string" && (A.filter = f.filter), f.view && typeof f.view == "string" && (A.filter = "_view", A.view = f.view), f.query_params && typeof f.query_params == "object")
      for (let I in f.query_params)
        Object.prototype.hasOwnProperty.call(f.query_params, I) && (A[I] = f.query_params[I]);
    let p = "GET", v;
    f.doc_ids ? (A.filter = "_doc_ids", p = "POST", v = {
      doc_ids: f.doc_ids
    }) : f.selector && (A.filter = "_selector", p = "POST", v = {
      selector: f.selector
    });
    let u = new Ds(), l;
    const y = function(I, P) {
      return M(this, null, function* () {
        if (f.aborted)
          return;
        A.since = I, typeof A.since == "object" && (A.since = JSON.stringify(A.since)), f.descending ? E && (A.limit = $) : A.limit = !E || $ > m ? m : $;
        let F = he(r, "_changes" + zt(A)), U = {
          signal: u.signal,
          method: p,
          body: JSON.stringify(v)
        };
        if (l = I, !f.aborted)
          try {
            yield g();
            const Y = yield s(F, U);
            P(null, Y.data);
          } catch (Y) {
            P(Y);
          }
      });
    };
    let _ = {
      results: []
    };
    const j = function(I, P) {
      if (f.aborted)
        return;
      let F = 0;
      if (P && P.results) {
        F = P.results.length, _.last_seq = P.last_seq;
        let Y = null, G = null;
        typeof P.pending == "number" && (Y = P.pending), (typeof _.last_seq == "string" || typeof _.last_seq == "number") && (G = _.last_seq), f.query_params, P.results = P.results.filter(function(z) {
          $--;
          let J = wr(f)(z);
          return J && (f.include_docs && f.attachments && f.binary && On(z), f.return_docs && _.results.push(z), f.onChange(z, Y, G)), J;
        });
      } else if (I) {
        f.aborted = !0, f.complete(I);
        return;
      }
      P && P.last_seq && (l = P.last_seq);
      let U = E && $ <= 0 || P && F < m || f.descending;
      f.continuous && !(E && $ <= 0) || !U ? we(function() {
        y(l, j);
      }) : f.complete(null, _);
    };
    return y(f.since || 0, j), {
      cancel: function() {
        f.aborted = !0, u.abort();
      }
    };
  }, n.revsDiff = o("revsDiff", function(f, m, S) {
    return M(this, null, function* () {
      typeof m == "function" && (S = m, m = {});
      try {
        const A = yield s(he(r, "_revs_diff"), {
          method: "POST",
          body: JSON.stringify(f)
        });
        S(null, A.data);
      } catch (A) {
        S(A);
      }
    });
  }), n._close = function(f) {
    f();
  }, n._destroy = function(f, m) {
    return M(this, null, function* () {
      try {
        const S = yield s(he(r, ""), {
          method: "DELETE"
        });
        m(null, S);
      } catch (S) {
        S.status === 404 ? m(null, {
          ok: !0
        }) : m(S);
      }
    });
  };
}
Wn.valid = function() {
  return !0;
};
function nc(e) {
  e.adapter("http", Wn, !1), e.adapter("https", Wn, !1);
}
let st = class extends Error {
  constructor(t) {
    super(), this.status = 400, this.name = "query_parse_error", this.message = t, this.error = !0;
    try {
      Error.captureStackTrace(this, st);
    } catch (n) {
    }
  }
}, jr = class extends Error {
  constructor(t) {
    super(), this.status = 404, this.name = "not_found", this.message = t, this.error = !0;
    try {
      Error.captureStackTrace(this, jr);
    } catch (n) {
    }
  }
}, Pr = class extends Error {
  constructor(t) {
    super(), this.status = 500, this.name = "invalid_value", this.message = t, this.error = !0;
    try {
      Error.captureStackTrace(this, Pr);
    } catch (n) {
    }
  }
};
function Pa(e, t) {
  return t && e.then(function(n) {
    we(function() {
      t(null, n);
    });
  }, function(n) {
    we(function() {
      t(n);
    });
  }), e;
}
function rc(e) {
  return function(...t) {
    var n = t.pop(), r = e.apply(this, t);
    return typeof n == "function" && Pa(r, n), r;
  };
}
function ic(e, t) {
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
function li(e) {
  var t = new vt(e), n = new Array(t.size), r = -1;
  return t.forEach(function(i) {
    n[++r] = i;
  }), n;
}
function kn(e) {
  var t = new Array(e.size), n = -1;
  return e.forEach(function(r, i) {
    t[++n] = i;
  }), t;
}
function di(e) {
  var t = "builtin " + e + " function requires map values to be numbers or number arrays";
  return new Pr(t);
}
function Hn(e) {
  for (var t = 0, n = 0, r = e.length; n < r; n++) {
    var i = e[n];
    if (typeof i != "number")
      if (Array.isArray(i)) {
        t = typeof t == "number" ? [t] : t;
        for (var a = 0, o = i.length; a < o; a++) {
          var s = i[a];
          if (typeof s != "number")
            throw di("_sum");
          typeof t[a] == "undefined" ? t.push(s) : t[a] += s;
        }
      } else
        throw di("_sum");
    else
      typeof t == "number" ? t += i : t[0] += i;
  }
  return t;
}
var ac = Ae.bind(null, "log"), oc = Array.isArray, sc = JSON.parse;
function Ia(e, t) {
  return br("return (" + e.replace(/;\s*$/, "") + ");", {
    emit: t,
    sum: Hn,
    log: ac,
    isArray: oc,
    toJSON: sc
  });
}
let Xn = class {
  constructor() {
    this.promise = new Promise(function(t) {
      t();
    });
  }
  add(t) {
    return this.promise = this.promise.catch(function() {
    }).then(function() {
      return t();
    }), this.promise;
  }
  finish() {
    return this.promise;
  }
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
function uc(e, t) {
  return hi(e) + hi(t) + "undefined";
}
function vi(e, t, n, r, i, a) {
  return M(this, null, function* () {
    const o = uc(n, r);
    let s;
    if (!i && (s = e._cachedViews = e._cachedViews || {}, s[o]))
      return s[o];
    const c = e.info().then(function(g) {
      return M(this, null, function* () {
        const w = g.db_name + "-mrview-" + (i ? "temp" : da(o));
        function f($) {
          $.views = $.views || {};
          let p = t;
          p.indexOf("/") === -1 && (p = t + "/" + t);
          const v = $.views[p] = $.views[p] || {};
          if (!v[w])
            return v[w] = !0, $;
        }
        yield Zt(e, "_local/" + a, f);
        const S = (yield e.registerDependentDatabase(w)).db;
        S.auto_compaction = !0;
        const A = {
          name: w,
          db: S,
          sourceDB: e,
          adapter: e.adapter,
          mapFun: n,
          reduceFun: r
        };
        let E;
        try {
          E = yield A.db.get("_local/lastSeq");
        } catch ($) {
          if ($.status !== 404)
            throw $;
        }
        return A.seq = E ? E.seq : 0, s && A.db.once("destroyed", function() {
          delete s[o];
        }), A;
      });
    });
    return s && (s[o] = c), c;
  });
}
var yi = {}, pi = new Xn(), cc = 50;
function An(e) {
  return e.indexOf("/") === -1 ? [e, e] : e.split("/");
}
function fc(e) {
  return e.length === 1 && /^1-/.test(e[0].rev);
}
function gi(e, t, n) {
  try {
    e.emit("error", t);
  } catch (r) {
    Ae("error", `The user's map/reduce function threw an uncaught error.
You can debug this error by doing:
myDatabase.on('error', function (err) { debugger; });
Please double-check your map/reduce function.`), Ae("error", t, n);
  }
}
function lc(e, t, n, r) {
  function i(d, h, b) {
    try {
      h(b);
    } catch (O) {
      gi(d, O, {
        fun: h,
        doc: b
      });
    }
  }
  function a(d, h, b, O, C) {
    try {
      return {
        output: h(b, O, C)
      };
    } catch (B) {
      return gi(d, B, {
        fun: h,
        keys: b,
        values: O,
        rereduce: C
      }), {
        error: B
      };
    }
  }
  function o(d, h) {
    const b = ce(d.key, h.key);
    return b !== 0 ? b : ce(d.value, h.value);
  }
  function s(d, h, b) {
    return b = b || 0, typeof h == "number" ? d.slice(b, h + b) : b > 0 ? d.slice(b) : d;
  }
  function c(d) {
    const h = d.value;
    return h && typeof h == "object" && h._id || d.id;
  }
  function g(d) {
    d.rows.forEach(function(h) {
      const b = h.doc && h.doc._attachments;
      b && Object.keys(b).forEach(function(O) {
        const C = b[O];
        b[O].data = kr(C.data, C.content_type);
      });
    });
  }
  function w(d) {
    return function(h) {
      return d.include_docs && d.attachments && d.binary && g(h), h;
    };
  }
  function f(d, h, b, O) {
    let C = h[d];
    typeof C != "undefined" && (O && (C = encodeURIComponent(JSON.stringify(C))), b.push(d + "=" + C));
  }
  function m(d) {
    if (typeof d != "undefined") {
      const h = Number(d);
      return !isNaN(h) && h === parseInt(d, 10) ? h : d;
    }
  }
  function S(d) {
    return d.group_level = m(d.group_level), d.limit = m(d.limit), d.skip = m(d.skip), d;
  }
  function A(d) {
    if (d) {
      if (typeof d != "number")
        return new st(`Invalid value for integer: "${d}"`);
      if (d < 0)
        return new st(`Invalid value for positive integer: "${d}"`);
    }
  }
  function E(d, h) {
    const b = d.descending ? "endkey" : "startkey", O = d.descending ? "startkey" : "endkey";
    if (typeof d[b] != "undefined" && typeof d[O] != "undefined" && ce(d[b], d[O]) > 0)
      throw new st("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");
    if (h.reduce && d.reduce !== !1) {
      if (d.include_docs)
        throw new st("{include_docs:true} is invalid for reduce");
      if (d.keys && d.keys.length > 1 && !d.group && !d.group_level)
        throw new st("Multi-key fetches for reduce views must use {group: true}");
    }
    ["group_level", "limit", "skip"].forEach(function(C) {
      const B = A(d[C]);
      if (B)
        throw B;
    });
  }
  function $(d, h, b) {
    return M(this, null, function* () {
      let O = [], C, B = "GET", D;
      if (f("reduce", b, O), f("include_docs", b, O), f("attachments", b, O), f("limit", b, O), f("descending", b, O), f("group", b, O), f("group_level", b, O), f("skip", b, O), f("stale", b, O), f("conflicts", b, O), f("startkey", b, O, !0), f("start_key", b, O, !0), f("endkey", b, O, !0), f("end_key", b, O, !0), f("inclusive_end", b, O), f("key", b, O, !0), f("update_seq", b, O), O = O.join("&"), O = O === "" ? "" : "?" + O, typeof b.keys != "undefined") {
        const q = `keys=${encodeURIComponent(JSON.stringify(b.keys))}`;
        q.length + O.length + 1 <= 2e3 ? O += (O[0] === "?" ? "&" : "?") + q : (B = "POST", typeof h == "string" ? C = {
          keys: b.keys
        } : h.keys = b.keys);
      }
      if (typeof h == "string") {
        const x = An(h), q = yield d.fetch("_design/" + x[0] + "/_view/" + x[1] + O, {
          headers: new lt({
            "Content-Type": "application/json"
          }),
          method: B,
          body: JSON.stringify(C)
        });
        D = q.ok;
        const R = yield q.json();
        if (!D)
          throw R.status = q.status, pt(R);
        return R.rows.forEach(function(L) {
          if (L.value && L.value.error && L.value.error === "builtin_reduce_error")
            throw new Error(L.reason);
        }), new Promise(function(L) {
          L(R);
        }).then(w(b));
      }
      C = C || {}, Object.keys(h).forEach(function(x) {
        Array.isArray(h[x]) ? C[x] = h[x] : C[x] = h[x].toString();
      });
      const T = yield d.fetch("_temp_view" + O, {
        headers: new lt({
          "Content-Type": "application/json"
        }),
        method: "POST",
        body: JSON.stringify(C)
      });
      D = T.ok;
      const k = yield T.json();
      if (!D)
        throw k.status = T.status, pt(k);
      return new Promise(function(x) {
        x(k);
      }).then(w(b));
    });
  }
  function p(d, h, b) {
    return new Promise(function(O, C) {
      d._query(h, b, function(B, D) {
        if (B)
          return C(B);
        O(D);
      });
    });
  }
  function v(d) {
    return new Promise(function(h, b) {
      d._viewCleanup(function(O, C) {
        if (O)
          return b(O);
        h(C);
      });
    });
  }
  function u(d) {
    return function(h) {
      if (h.status === 404)
        return d;
      throw h;
    };
  }
  function l(d, h, b) {
    return M(this, null, function* () {
      const O = "_local/doc_" + d, C = {
        _id: O,
        keys: []
      }, B = b.get(d), D = B[0], T = B[1];
      function k() {
        return fc(T) ? Promise.resolve(C) : h.db.get(O).catch(u(C));
      }
      function x(Z) {
        return Z.keys.length ? h.db.allDocs({
          keys: Z.keys,
          include_docs: !0
        }) : Promise.resolve({
          rows: []
        });
      }
      function q(Z, re) {
        const ae = [], de = new vt();
        for (let N = 0, K = re.rows.length; N < K; N++) {
          const ne = re.rows[N].doc;
          if (ne && (ae.push(ne), de.add(ne._id), ne._deleted = !D.has(ne._id), !ne._deleted)) {
            const V = D.get(ne._id);
            "value" in V && (ne.value = V.value);
          }
        }
        const _e = kn(D);
        return _e.forEach(function(N) {
          if (!de.has(N)) {
            const K = {
              _id: N
            }, Q = D.get(N);
            "value" in Q && (K.value = Q.value), ae.push(K);
          }
        }), Z.keys = li(_e.concat(Z.keys)), ae.push(Z), ae;
      }
      const R = yield k(), L = yield x(R);
      return q(R, L);
    });
  }
  function y(d) {
    return d.sourceDB.get("_local/purges").then(function(h) {
      const b = h.purgeSeq;
      return d.db.get("_local/purgeSeq").then(function(O) {
        return O._rev;
      }).catch(function(O) {
        if (O.status !== 404)
          throw O;
      }).then(function(O) {
        return d.db.put({
          _id: "_local/purgeSeq",
          _rev: O,
          purgeSeq: b
        });
      });
    }).catch(function(h) {
      if (h.status !== 404)
        throw h;
    });
  }
  function _(d, h, b) {
    var O = "_local/lastSeq";
    return d.db.get(O).catch(u({
      _id: O,
      seq: 0
    })).then(function(C) {
      var B = kn(h);
      return Promise.all(B.map(function(D) {
        return l(D, d, h);
      })).then(function(D) {
        var T = Yt(D);
        return C.seq = b, T.push(C), d.db.bulkDocs({
          docs: T
        });
      }).then(() => y(d));
    });
  }
  function j(d) {
    const h = typeof d == "string" ? d : d.name;
    let b = yi[h];
    return b || (b = yi[h] = new Xn()), b;
  }
  function I(d, h) {
    return M(this, null, function* () {
      return Sn(j(d), function() {
        return P(d, h);
      })();
    });
  }
  function P(d, h) {
    return M(this, null, function* () {
      let b, O, C;
      function B(N, K) {
        const Q = {
          id: O._id,
          key: et(N)
        };
        typeof K != "undefined" && K !== null && (Q.value = et(K)), b.push(Q);
      }
      const D = t(d.mapFun, B);
      let T = d.seq || 0;
      function k() {
        return d.sourceDB.info().then(function(N) {
          C = d.sourceDB.activeTasks.add({
            name: "view_indexing",
            total_items: N.update_seq - T
          });
        });
      }
      function x(N, K) {
        return function() {
          return _(d, N, K);
        };
      }
      let q = 0;
      const R = {
        view: d.name,
        indexed_docs: q
      };
      d.sourceDB.emit("indexing", R);
      const L = new Xn();
      function Z() {
        return M(this, null, function* () {
          const N = yield d.sourceDB.changes({
            return_docs: !0,
            conflicts: !0,
            include_docs: !0,
            style: "all_docs",
            since: T,
            limit: h.changes_batch_size
          }), K = yield re();
          return ae(N, K);
        });
      }
      function re() {
        return d.db.get("_local/purgeSeq").then(function(N) {
          return N.purgeSeq;
        }).catch(function(N) {
          if (N && N.status !== 404)
            throw N;
          return -1;
        }).then(function(N) {
          return d.sourceDB.get("_local/purges").then(function(K) {
            const Q = K.purges.filter(function(V, H) {
              return H > N;
            }).map((V) => V.docId), ne = Q.filter(function(V, H) {
              return Q.indexOf(V) === H;
            });
            return Promise.all(ne.map(function(V) {
              return d.sourceDB.get(V).then(function(H) {
                return {
                  docId: V,
                  doc: H
                };
              }).catch(function(H) {
                if (H.status !== 404)
                  throw H;
                return {
                  docId: V
                };
              });
            }));
          }).catch(function(K) {
            if (K && K.status !== 404)
              throw K;
            return [];
          });
        });
      }
      function ae(N, K) {
        var Q = N.results;
        if (!Q.length && !K.length)
          return;
        for (let H of K)
          if (Q.findIndex(function(Ee) {
            return Ee.id === H.docId;
          }) < 0) {
            const Ee = {
              _id: H.docId,
              doc: {
                _id: H.docId,
                _deleted: 1
              },
              changes: []
            };
            H.doc && (Ee.doc = H.doc, Ee.changes.push({
              rev: H.doc._rev
            })), Q.push(Ee);
          }
        var ne = de(Q);
        L.add(x(ne, T)), q = q + Q.length;
        const V = {
          view: d.name,
          last_seq: N.last_seq,
          results_count: Q.length,
          indexed_docs: q
        };
        if (d.sourceDB.emit("indexing", V), d.sourceDB.activeTasks.update(C, {
          completed_items: q
        }), !(Q.length < h.changes_batch_size))
          return Z();
      }
      function de(N) {
        const K = new be();
        for (let Q = 0, ne = N.length; Q < ne; Q++) {
          const V = N[Q];
          if (V.doc._id[0] !== "_") {
            b = [], O = V.doc, O._deleted || i(d.sourceDB, D, O), b.sort(o);
            const H = _e(b);
            K.set(V.doc._id, [H, V.changes]);
          }
          T = V.seq;
        }
        return K;
      }
      function _e(N) {
        const K = new be();
        let Q;
        for (let ne = 0, V = N.length; ne < V; ne++) {
          const H = N[ne], Ue = [H.key, H.id];
          ne > 0 && ce(H.key, Q) === 0 && Ue.push(ne), K.set(Ce(Ue), H), Q = H.key;
        }
        return K;
      }
      try {
        yield k(), yield Z(), yield L.finish(), d.seq = T, d.sourceDB.activeTasks.remove(C);
      } catch (N) {
        d.sourceDB.activeTasks.remove(C, N);
      }
    });
  }
  function F(d, h, b) {
    b.group_level === 0 && delete b.group_level;
    const O = b.group || b.group_level, C = n(d.reduceFun), B = [], D = isNaN(b.group_level) ? Number.POSITIVE_INFINITY : b.group_level;
    h.forEach(function(T) {
      const k = B[B.length - 1];
      let x = O ? T.key : null;
      if (O && Array.isArray(x) && (x = x.slice(0, D)), k && ce(k.groupKey, x) === 0) {
        k.keys.push([T.key, T.id]), k.values.push(T.value);
        return;
      }
      B.push({
        keys: [[T.key, T.id]],
        values: [T.value],
        groupKey: x
      });
    }), h = [];
    for (let T = 0, k = B.length; T < k; T++) {
      const x = B[T], q = a(d.sourceDB, C, x.keys, x.values, !1);
      if (q.error && q.error instanceof Pr)
        throw q.error;
      h.push({
        // CouchDB just sets the value to null if a non-built-in errors out
        value: q.error ? null : q.output,
        key: x.groupKey
      });
    }
    return {
      rows: s(h, b.limit, b.skip)
    };
  }
  function U(d, h) {
    return Sn(j(d), function() {
      return Y(d, h);
    })();
  }
  function Y(d, h) {
    return M(this, null, function* () {
      let b;
      const O = d.reduceFun && h.reduce !== !1, C = h.skip || 0;
      typeof h.keys != "undefined" && !h.keys.length && (h.limit = 0, delete h.keys);
      function B(T) {
        return M(this, null, function* () {
          T.include_docs = !0;
          const k = yield d.db.allDocs(T);
          return b = k.total_rows, k.rows.map(function(x) {
            if ("value" in x.doc && typeof x.doc.value == "object" && x.doc.value !== null) {
              const R = Object.keys(x.doc.value).sort(), L = ["id", "key", "value"];
              if (!(R < L || R > L))
                return x.doc.value;
            }
            const q = nu(x.doc._id);
            return {
              key: q[0],
              id: q[1],
              value: "value" in x.doc ? x.doc.value : null
            };
          });
        });
      }
      function D(T) {
        return M(this, null, function* () {
          let k;
          if (O ? k = F(d, T, h) : typeof h.keys == "undefined" ? k = {
            total_rows: b,
            offset: C,
            rows: T
          } : k = {
            total_rows: b,
            offset: C,
            rows: s(T, h.limit, h.skip)
          }, h.update_seq && (k.update_seq = d.seq), h.include_docs) {
            const q = li(T.map(c)), R = yield d.sourceDB.allDocs({
              keys: q,
              include_docs: !0,
              conflicts: h.conflicts,
              attachments: h.attachments,
              binary: h.binary
            });
            var x = new be();
            return R.rows.forEach(function(L) {
              x.set(L.id, L.doc);
            }), T.forEach(function(L) {
              var Z = c(L), re = x.get(Z);
              re && (L.doc = re);
            }), k;
          } else
            return k;
        });
      }
      if (typeof h.keys != "undefined") {
        const k = h.keys.map(function(R) {
          const L = {
            startkey: Ce([R]),
            endkey: Ce([R, {}])
          };
          return h.update_seq && (L.update_seq = !0), B(L);
        }), x = yield Promise.all(k), q = Yt(x);
        return D(q);
      } else {
        const T = {
          descending: h.descending
        };
        h.update_seq && (T.update_seq = !0);
        let k, x;
        if ("start_key" in h && (k = h.start_key), "startkey" in h && (k = h.startkey), "end_key" in h && (x = h.end_key), "endkey" in h && (x = h.endkey), typeof k != "undefined" && (T.startkey = h.descending ? Ce([k, {}]) : Ce([k])), typeof x != "undefined") {
          let R = h.inclusive_end !== !1;
          h.descending && (R = !R), T.endkey = Ce(R ? [x, {}] : [x]);
        }
        if (typeof h.key != "undefined") {
          const R = Ce([h.key]), L = Ce([h.key, {}]);
          T.descending ? (T.endkey = R, T.startkey = L) : (T.startkey = R, T.endkey = L);
        }
        O || (typeof h.limit == "number" && (T.limit = h.limit), T.skip = C);
        const q = yield B(T);
        return D(q);
      }
    });
  }
  function G(d) {
    return M(this, null, function* () {
      return (yield d.fetch("_view_cleanup", {
        headers: new lt({
          "Content-Type": "application/json"
        }),
        method: "POST"
      })).json();
    });
  }
  function z(d) {
    return M(this, null, function* () {
      try {
        const h = yield d.get("_local/" + e), b = new be();
        Object.keys(h.views).forEach(function(k) {
          const x = An(k), q = "_design/" + x[0], R = x[1];
          let L = b.get(q);
          L || (L = new vt(), b.set(q, L)), L.add(R);
        });
        const O = {
          keys: kn(b),
          include_docs: !0
        }, C = yield d.allDocs(O), B = {};
        C.rows.forEach(function(k) {
          const x = k.key.substring(8);
          b.get(k.key).forEach(function(q) {
            let R = x + "/" + q;
            h.views[R] || (R = q);
            const L = Object.keys(h.views[R]), Z = k.doc && k.doc.views && k.doc.views[q];
            L.forEach(function(re) {
              B[re] = B[re] || Z;
            });
          });
        });
        const T = Object.keys(B).filter(function(k) {
          return !B[k];
        }).map(function(k) {
          return Sn(j(k), function() {
            return new d.constructor(k, d.__opts).destroy();
          })();
        });
        return Promise.all(T).then(function() {
          return {
            ok: !0
          };
        });
      } catch (h) {
        if (h.status === 404)
          return {
            ok: !0
          };
        throw h;
      }
    });
  }
  function J(d, h, b) {
    return M(this, null, function* () {
      if (typeof d._query == "function")
        return p(d, h, b);
      if (Be(d))
        return $(d, h, b);
      const O = {
        changes_batch_size: d.__opts.view_update_changes_batch_size || cc
      };
      if (typeof h != "string")
        return E(b, h), pi.add(function() {
          return M(this, null, function* () {
            const C = yield vi(
              /* sourceDB */
              d,
              /* viewName */
              "temp_view/temp_view",
              /* mapFun */
              h.map,
              /* reduceFun */
              h.reduce,
              /* temporary */
              !0,
              /* localDocName */
              e
            );
            return ic(I(C, O).then(function() {
              return U(C, b);
            }), function() {
              return C.db.destroy();
            });
          });
        }), pi.finish();
      {
        const C = h, B = An(C), D = B[0], T = B[1], k = yield d.get("_design/" + D);
        if (h = k.views && k.views[T], !h)
          throw new jr(`ddoc ${k._id} has no view named ${T}`);
        r(k, T), E(b, h);
        const x = yield vi(
          /* sourceDB */
          d,
          /* viewName */
          C,
          /* mapFun */
          h.map,
          /* reduceFun */
          h.reduce,
          /* temporary */
          !1,
          /* localDocName */
          e
        );
        return b.stale === "ok" || b.stale === "update_after" ? (b.stale === "update_after" && we(function() {
          I(x, O);
        }), U(x, b)) : (yield I(x, O), U(x, b));
      }
    });
  }
  function W(d, h, b) {
    const O = this;
    typeof h == "function" && (b = h, h = {}), h = h ? S(h) : {}, typeof d == "function" && (d = {
      map: d
    });
    const C = Promise.resolve().then(function() {
      return J(O, d, h);
    });
    return Pa(C, b), C;
  }
  const ee = rc(function() {
    const d = this;
    return typeof d._viewCleanup == "function" ? v(d) : Be(d) ? G(d) : z(d);
  });
  return {
    query: W,
    viewCleanup: ee
  };
}
var xn = {
  _sum: function(e, t) {
    return Hn(t);
  },
  _count: function(e, t) {
    return t.length;
  },
  _stats: function(e, t) {
    function n(r) {
      for (var i = 0, a = 0, o = r.length; a < o; a++) {
        var s = r[a];
        i += s * s;
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
function dc(e) {
  if (/^_sum/.test(e))
    return xn._sum;
  if (/^_count/.test(e))
    return xn._count;
  if (/^_stats/.test(e))
    return xn._stats;
  if (/^_/.test(e))
    throw new Error(e + " is not a supported reduce function.");
}
function hc(e, t) {
  if (typeof e == "function" && e.length === 2) {
    var n = e;
    return function(r) {
      return n(r, t);
    };
  } else
    return Ia(e.toString(), t);
}
function vc(e) {
  var t = e.toString(), n = dc(t);
  return n || Ia(t);
}
function yc(e, t) {
  var n = e.views && e.views[t];
  if (typeof n.map != "string")
    throw new jr("ddoc " + e._id + " has no string view named " + t + ", instead found object of type: " + typeof n.map);
}
var pc = "mrviews", Ba = lc(pc, hc, vc, yc);
function gc(e, t, n) {
  return Ba.query.call(this, e, t, n);
}
function _c(e) {
  return Ba.viewCleanup.call(this, e);
}
var mc = {
  query: gc,
  viewCleanup: _c
};
function wc(e, t, n) {
  return !e._attachments || !e._attachments[n] || e._attachments[n].digest !== t._attachments[n].digest;
}
function _i(e, t) {
  var n = Object.keys(t._attachments);
  return Promise.all(n.map(function(r) {
    return e.getAttachment(t._id, r, {
      rev: t._rev
    });
  }));
}
function bc(e, t, n) {
  var r = Be(t) && !Be(e), i = Object.keys(n._attachments);
  return r ? e.get(n._id).then(function(a) {
    return Promise.all(i.map(function(o) {
      return wc(a, n, o) ? t.getAttachment(n._id, o) : e.getAttachment(a._id, o);
    }));
  }).catch(function(a) {
    if (a.status !== 404)
      throw a;
    return _i(t, n);
  }) : _i(t, n);
}
function $c(e) {
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
function Oc(e, t, n, r) {
  n = ve(n);
  var i = [], a = !0;
  function o() {
    var c = $c(n);
    if (c.docs.length)
      return e.bulkGet(c).then(function(g) {
        if (r.cancelled)
          throw new Error("cancelled");
        return Promise.all(g.results.map(function(w) {
          return Promise.all(w.docs.map(function(f) {
            var m = f.ok;
            return f.error && (a = !1), !m || !m._attachments ? m : bc(t, e, m).then(function(S) {
              var A = Object.keys(m._attachments);
              return S.forEach(function(E, $) {
                var p = m._attachments[A[$]];
                delete p.stub, delete p.length, p.data = E;
              }), m;
            });
          }));
        })).then(function(w) {
          i = i.concat(Yt(w).filter(Boolean));
        });
      });
  }
  function s() {
    return {
      ok: a,
      docs: i
    };
  }
  return Promise.resolve().then(o).then(s);
}
var mi = 1, wi = "pouchdb", Sc = 5, Pe = 0;
function Yn(e, t, n, r, i) {
  return e.get(t).catch(function(a) {
    if (a.status === 404)
      return (e.adapter === "http" || e.adapter === "https") && Rn(404, "PouchDB is just checking if a remote checkpoint exists."), {
        session_id: r,
        _id: t,
        history: [],
        replicator: wi,
        version: mi
      };
    throw a;
  }).then(function(a) {
    if (!i.cancelled && a.last_seq !== n)
      return a.history = (a.history || []).filter(function(o) {
        return o.session_id !== r;
      }), a.history.unshift({
        last_seq: n,
        session_id: r
      }), a.history = a.history.slice(0, Sc), a.version = mi, a.replicator = wi, a.session_id = r, a.last_seq = n, e.put(a).catch(function(o) {
        if (o.status === 409)
          return Yn(e, t, n, r, i);
        throw o;
      });
  });
}
class bi {
  constructor(t, n, r, i, a) {
    this.src = t, this.target = n, this.id = r, this.returnValue = i, this.opts = a || {};
  }
  writeCheckpoint(t, n) {
    var r = this;
    return this.updateTarget(t, n).then(function() {
      return r.updateSource(t, n);
    });
  }
  updateTarget(t, n) {
    return this.opts.writeTargetCheckpoint ? Yn(this.target, this.id, t, n, this.returnValue) : Promise.resolve(!0);
  }
  updateSource(t, n) {
    if (this.opts.writeSourceCheckpoint) {
      var r = this;
      return Yn(this.src, this.id, t, n, this.returnValue).catch(function(i) {
        if (Oi(i))
          return r.opts.writeSourceCheckpoint = !1, !0;
        throw i;
      });
    } else
      return Promise.resolve(!0);
  }
  getCheckpoint() {
    var t = this;
    return t.opts && t.opts.writeSourceCheckpoint && !t.opts.writeTargetCheckpoint ? t.src.get(t.id).then(function(n) {
      return n.last_seq || Pe;
    }).catch(function(n) {
      if (n.status !== 404)
        throw n;
      return Pe;
    }) : t.target.get(t.id).then(function(n) {
      return t.opts && t.opts.writeTargetCheckpoint && !t.opts.writeSourceCheckpoint ? n.last_seq || Pe : t.src.get(t.id).then(function(r) {
        if (n.version !== r.version)
          return Pe;
        var i;
        return n.version ? i = n.version.toString() : i = "undefined", i in $i ? $i[i](n, r) : Pe;
      }, function(r) {
        if (r.status === 404 && n.last_seq)
          return t.src.put({
            _id: t.id,
            last_seq: Pe
          }).then(function() {
            return Pe;
          }, function(i) {
            return Oi(i) ? (t.opts.writeSourceCheckpoint = !1, n.last_seq) : Pe;
          });
        throw r;
      });
    }).catch(function(n) {
      if (n.status !== 404)
        throw n;
      return Pe;
    });
  }
}
var $i = {
  undefined: function(e, t) {
    return ce(e.last_seq, t.last_seq) === 0 ? t.last_seq : 0;
  },
  1: function(e, t) {
    return kc(t, e).last_seq;
  }
};
function kc(e, t) {
  return e.session_id === t.session_id ? {
    last_seq: e.last_seq,
    history: e.history
  } : Ra(e.history, t.history);
}
function Ra(e, t) {
  var n = e[0], r = e.slice(1), i = t[0], a = t.slice(1);
  if (!n || t.length === 0)
    return {
      last_seq: Pe,
      history: []
    };
  var o = n.session_id;
  if (Zn(o, t))
    return {
      last_seq: n.last_seq,
      history: e
    };
  var s = i.session_id;
  return Zn(s, r) ? {
    last_seq: i.last_seq,
    history: a
  } : Ra(r, a);
}
function Zn(e, t) {
  var n = t[0], r = t.slice(1);
  return !e || t.length === 0 ? !1 : e === n.session_id ? !0 : Zn(e, r);
}
function Oi(e) {
  return typeof e.status == "number" && Math.floor(e.status / 100) === 4;
}
function La(e, t, n, r, i) {
  return this instanceof bi ? La : new bi(e, t, n, r, i);
}
var Si = 0;
function Ac(e, t, n, r) {
  if (e.retry === !1) {
    t.emit("error", n), t.removeAllListeners();
    return;
  }
  if (typeof e.back_off_function != "function" && (e.back_off_function = Wo), t.emit("requestError", n), t.state === "active" || t.state === "pending") {
    t.emit("paused", n), t.state = "stopped";
    var i = function() {
      e.current_back_off = Si;
    }, a = function() {
      t.removeListener("active", i);
    };
    t.once("paused", a), t.once("active", i);
  }
  e.current_back_off = e.current_back_off || Si, e.current_back_off = e.back_off_function(e.current_back_off), setTimeout(r, e.current_back_off);
}
function xc(e) {
  return Object.keys(e).sort(ce).reduce(function(t, n) {
    return t[n] = e[n], t;
  }, {});
}
function Ec(e, t, n) {
  var r = n.doc_ids ? n.doc_ids.sort(ce) : "", i = n.filter ? n.filter.toString() : "", a = "", o = "", s = "";
  return n.selector && (s = JSON.stringify(n.selector)), n.filter && n.query_params && (a = JSON.stringify(xc(n.query_params))), n.filter && n.filter === "_view" && (o = n.view.toString()), Promise.all([e.id(), t.id()]).then(function(c) {
    var g = c[0] + c[1] + i + o + a + r + s;
    return new Promise(function(w) {
      xr(g, w);
    });
  }).then(function(c) {
    return c = c.replace(/\//g, ".").replace(/\+/g, "_"), "_local/" + c;
  });
}
function Da(e, t, n, r, i) {
  var a = [], o, s = {
    seq: 0,
    changes: [],
    docs: []
  }, c = !1, g = !1, w = !1, f = 0, m = 0, S = n.continuous || n.live || !1, A = n.batch_size || 100, E = n.batches_limit || 10, $ = n.style || "all_docs", p = !1, v = n.doc_ids, u = n.selector, l, y, _ = [], j = ln(), I;
  i = i || {
    ok: !0,
    start_time: new Date().toISOString(),
    docs_read: 0,
    docs_written: 0,
    doc_write_failures: 0,
    errors: []
  };
  var P = {};
  r.ready(e, t);
  function F() {
    return y ? Promise.resolve() : Ec(e, t, n).then(function(k) {
      l = k;
      var x = {};
      n.checkpoint === !1 ? x = {
        writeSourceCheckpoint: !1,
        writeTargetCheckpoint: !1
      } : n.checkpoint === "source" ? x = {
        writeSourceCheckpoint: !0,
        writeTargetCheckpoint: !1
      } : n.checkpoint === "target" ? x = {
        writeSourceCheckpoint: !1,
        writeTargetCheckpoint: !0
      } : x = {
        writeSourceCheckpoint: !0,
        writeTargetCheckpoint: !0
      }, y = new La(e, t, l, r, x);
    });
  }
  function U() {
    if (_ = [], o.docs.length !== 0) {
      var k = o.docs, x = {
        timeout: n.timeout
      };
      return t.bulkDocs({
        docs: k,
        new_edits: !1
      }, x).then(function(q) {
        if (r.cancelled)
          throw d(), new Error("cancelled");
        var R = /* @__PURE__ */ Object.create(null);
        q.forEach(function(Z) {
          Z.error && (R[Z.id] = Z);
        });
        var L = Object.keys(R).length;
        i.doc_write_failures += L, i.docs_written += k.length - L, k.forEach(function(Z) {
          var re = R[Z._id];
          if (re) {
            i.errors.push(re);
            var ae = (re.name || "").toLowerCase();
            if (ae === "unauthorized" || ae === "forbidden")
              r.emit("denied", ve(re));
            else
              throw re;
          } else
            _.push(Z);
        });
      }, function(q) {
        throw i.doc_write_failures += k.length, q;
      });
    }
  }
  function Y() {
    if (o.error)
      throw new Error("There was a problem getting docs.");
    i.last_seq = m = o.seq;
    var k = ve(i);
    return _.length && (k.docs = _, typeof o.pending == "number" && (k.pending = o.pending, delete o.pending), r.emit("change", k)), c = !0, e.info().then(function(x) {
      var q = e.activeTasks.get(I);
      if (!(!o || !q)) {
        var R = q.completed_items || 0, L = parseInt(x.update_seq, 10) - parseInt(f, 10);
        e.activeTasks.update(I, {
          completed_items: R + o.changes.length,
          total_items: L
        });
      }
    }), y.writeCheckpoint(o.seq, j).then(function() {
      if (r.emit("checkpoint", {
        checkpoint: o.seq
      }), c = !1, r.cancelled)
        throw d(), new Error("cancelled");
      o = void 0, C();
    }).catch(function(x) {
      throw T(x), x;
    });
  }
  function G() {
    var k = {};
    return o.changes.forEach(function(x) {
      r.emit("checkpoint", {
        revs_diff: x
      }), x.id !== "_user/" && (k[x.id] = x.changes.map(function(q) {
        return q.rev;
      }));
    }), t.revsDiff(k).then(function(x) {
      if (r.cancelled)
        throw d(), new Error("cancelled");
      o.diffs = x;
    });
  }
  function z() {
    return Oc(e, t, o.diffs, r).then(function(k) {
      o.error = !k.ok, k.docs.forEach(function(x) {
        delete o.diffs[x._id], i.docs_read++, o.docs.push(x);
      });
    });
  }
  function J() {
    if (!(r.cancelled || o)) {
      if (a.length === 0) {
        W(!0);
        return;
      }
      o = a.shift(), r.emit("checkpoint", {
        start_next_batch: o.seq
      }), G().then(z).then(U).then(Y).then(J).catch(function(k) {
        ee("batch processing terminated with error", k);
      });
    }
  }
  function W(k) {
    if (s.changes.length === 0) {
      a.length === 0 && !o && ((S && P.live || g) && (r.state = "pending", r.emit("paused")), g && d());
      return;
    }
    (k || g || s.changes.length >= A) && (a.push(s), s = {
      seq: 0,
      changes: [],
      docs: []
    }, (r.state === "pending" || r.state === "stopped") && (r.state = "active", r.emit("active")), J());
  }
  function ee(k, x) {
    w || (x.message || (x.message = k), i.ok = !1, i.status = "aborting", a = [], s = {
      seq: 0,
      changes: [],
      docs: []
    }, d(x));
  }
  function d(k) {
    if (!w && !(r.cancelled && (i.status = "cancelled", c)))
      if (i.status = i.status || "complete", i.end_time = new Date().toISOString(), i.last_seq = m, w = !0, e.activeTasks.remove(I, k), k) {
        k = te(k), k.result = i;
        var x = (k.name || "").toLowerCase();
        x === "unauthorized" || x === "forbidden" ? (r.emit("error", k), r.removeAllListeners()) : Ac(n, r, k, function() {
          Da(e, t, n, r);
        });
      } else
        r.emit("complete", i), r.removeAllListeners();
  }
  function h(k, x, q) {
    if (r.cancelled)
      return d();
    typeof x == "number" && (s.pending = x);
    var R = wr(n)(k);
    if (!R) {
      var L = e.activeTasks.get(I);
      if (L) {
        var Z = L.completed_items || 0;
        e.activeTasks.update(I, {
          completed_items: ++Z
        });
      }
      return;
    }
    s.seq = k.seq || q, s.changes.push(k), r.emit("checkpoint", {
      pending_batch: s.seq
    }), we(function() {
      W(a.length === 0 && P.live);
    });
  }
  function b(k) {
    if (p = !1, r.cancelled)
      return d();
    if (k.results.length > 0)
      P.since = k.results[k.results.length - 1].seq, C(), W(!0);
    else {
      var x = function() {
        S ? (P.live = !0, C()) : g = !0, W(!0);
      };
      !o && k.results.length === 0 ? (c = !0, y.writeCheckpoint(k.last_seq, j).then(function() {
        if (c = !1, i.last_seq = m = k.last_seq, r.cancelled)
          throw d(), new Error("cancelled");
        x();
      }).catch(T)) : x();
    }
  }
  function O(k) {
    if (p = !1, r.cancelled)
      return d();
    ee("changes rejected", k);
  }
  function C() {
    if (!(!p && !g && a.length < E))
      return;
    p = !0;
    function k() {
      q.cancel();
    }
    function x() {
      r.removeListener("cancel", k);
    }
    r._changes && (r.removeListener("cancel", r._abortChanges), r._changes.cancel()), r.once("cancel", k);
    var q = e.changes(P).on("change", h);
    q.then(x, x), q.then(b).catch(O), n.retry && (r._changes = q, r._abortChanges = k);
  }
  function B(k) {
    return e.info().then(function(x) {
      var q = typeof n.since == "undefined" ? parseInt(x.update_seq, 10) - parseInt(k, 10) : parseInt(x.update_seq, 10);
      return I = e.activeTasks.add({
        name: `${S ? "continuous " : ""}replication from ${x.db_name}`,
        total_items: q
      }), k;
    });
  }
  function D() {
    F().then(function() {
      if (r.cancelled) {
        d();
        return;
      }
      return y.getCheckpoint().then(B).then(function(k) {
        m = k, f = k, P = {
          since: m,
          limit: A,
          batch_size: A,
          style: $,
          doc_ids: v,
          selector: u,
          return_docs: !0
          // required so we know when we're done
        }, n.filter && (typeof n.filter != "string" ? P.include_docs = !0 : P.filter = n.filter), "heartbeat" in n && (P.heartbeat = n.heartbeat), "timeout" in n && (P.timeout = n.timeout), n.query_params && (P.query_params = n.query_params), n.view && (P.view = n.view), C();
      });
    }).catch(function(k) {
      ee("getCheckpoint rejected with ", k);
    });
  }
  function T(k) {
    c = !1, ee("writeCheckpoint completed with error", k);
  }
  if (r.cancelled) {
    d();
    return;
  }
  r._addedListeners || (r.once("cancel", d), typeof n.complete == "function" && (r.once("error", n.complete), r.once("complete", function(k) {
    n.complete(null, k);
  })), r._addedListeners = !0), typeof n.since == "undefined" ? D() : F().then(function() {
    return c = !0, y.writeCheckpoint(n.since, j);
  }).then(function() {
    if (c = !1, r.cancelled) {
      d();
      return;
    }
    m = n.since, D();
  }).catch(T);
}
class Cc extends ke {
  constructor() {
    super(), this.cancelled = !1, this.state = "pending";
    const t = new Promise((n, r) => {
      this.once("complete", n), this.once("error", r);
    });
    this.then = function(n, r) {
      return t.then(n, r);
    }, this.catch = function(n) {
      return t.catch(n);
    }, this.catch(function() {
    });
  }
  cancel() {
    this.cancelled = !0, this.state = "cancelled", this.emit("cancel");
  }
  ready(t, n) {
    if (this._readyCalled)
      return;
    this._readyCalled = !0;
    const r = () => {
      this.cancel();
    };
    t.once("destroyed", r), n.once("destroyed", r);
    function i() {
      t.removeListener("destroyed", r), n.removeListener("destroyed", r);
    }
    this.once("complete", i), this.once("error", i);
  }
}
function tn(e, t) {
  var n = t.PouchConstructor;
  return typeof e == "string" ? new n(e, t) : e;
}
function Vn(e, t, n, r) {
  if (typeof n == "function" && (r = n, n = {}), typeof n == "undefined" && (n = {}), n.doc_ids && !Array.isArray(n.doc_ids))
    throw te(fn, "`doc_ids` filter parameter is not a list.");
  n.complete = r, n = ve(n), n.continuous = n.continuous || n.live, n.retry = "retry" in n ? n.retry : !1, n.PouchConstructor = n.PouchConstructor || this;
  var i = new Cc(n), a = tn(e, n), o = tn(t, n);
  return Da(a, o, n, i), i;
}
function Tc(e, t, n, r) {
  return typeof n == "function" && (r = n, n = {}), typeof n == "undefined" && (n = {}), n = ve(n), n.PouchConstructor = n.PouchConstructor || this, e = tn(e, n), t = tn(t, n), new qc(e, t, n, r);
}
class qc extends ke {
  constructor(t, n, r, i) {
    super(), this.canceled = !1;
    const a = r.push ? Ye({}, r, r.push) : r, o = r.pull ? Ye({}, r, r.pull) : r;
    this.push = Vn(t, n, a), this.pull = Vn(n, t, o), this.pushPaused = !0, this.pullPaused = !0;
    const s = (u) => {
      this.emit("change", {
        direction: "pull",
        change: u
      });
    }, c = (u) => {
      this.emit("change", {
        direction: "push",
        change: u
      });
    }, g = (u) => {
      this.emit("denied", {
        direction: "push",
        doc: u
      });
    }, w = (u) => {
      this.emit("denied", {
        direction: "pull",
        doc: u
      });
    }, f = () => {
      this.pushPaused = !0, this.pullPaused && this.emit("paused");
    }, m = () => {
      this.pullPaused = !0, this.pushPaused && this.emit("paused");
    }, S = () => {
      this.pushPaused = !1, this.pullPaused && this.emit("active", {
        direction: "push"
      });
    }, A = () => {
      this.pullPaused = !1, this.pushPaused && this.emit("active", {
        direction: "pull"
      });
    };
    let E = {};
    const $ = (u) => (l, y) => {
      (l === "change" && (y === s || y === c) || l === "denied" && (y === w || y === g) || l === "paused" && (y === m || y === f) || l === "active" && (y === A || y === S)) && (l in E || (E[l] = {}), E[l][u] = !0, Object.keys(E[l]).length === 2 && this.removeAllListeners(l));
    };
    r.live && (this.push.on("complete", this.pull.cancel.bind(this.pull)), this.pull.on("complete", this.push.cancel.bind(this.push)));
    function p(u, l, y) {
      u.listeners(l).indexOf(y) == -1 && u.on(l, y);
    }
    this.on("newListener", function(u) {
      u === "change" ? (p(this.pull, "change", s), p(this.push, "change", c)) : u === "denied" ? (p(this.pull, "denied", w), p(this.push, "denied", g)) : u === "active" ? (p(this.pull, "active", A), p(this.push, "active", S)) : u === "paused" && (p(this.pull, "paused", m), p(this.push, "paused", f));
    }), this.on("removeListener", function(u) {
      u === "change" ? (this.pull.removeListener("change", s), this.push.removeListener("change", c)) : u === "denied" ? (this.pull.removeListener("denied", w), this.push.removeListener("denied", g)) : u === "active" ? (this.pull.removeListener("active", A), this.push.removeListener("active", S)) : u === "paused" && (this.pull.removeListener("paused", m), this.push.removeListener("paused", f));
    }), this.pull.on("removeListener", $("pull")), this.push.on("removeListener", $("push"));
    const v = Promise.all([this.push, this.pull]).then((u) => {
      const l = {
        push: u[0],
        pull: u[1]
      };
      return this.emit("complete", l), i && i(null, l), this.removeAllListeners(), l;
    }, (u) => {
      if (this.cancel(), i ? i(u) : this.emit("error", u), this.removeAllListeners(), i)
        throw u;
    });
    this.then = function(u, l) {
      return v.then(u, l);
    }, this.catch = function(u) {
      return v.catch(u);
    };
  }
  cancel() {
    this.canceled || (this.canceled = !0, this.push.cancel(), this.pull.cancel());
  }
}
function jc(e) {
  e.replicate = Vn, e.sync = Tc, Object.defineProperty(e.prototype, "replicate", {
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
X.plugin(Wu).plugin(nc).plugin(mc).plugin(jc);
class se extends Error {
  constructor(t, n, r) {
    super(), this.status = t, this.name = n, this.message = r, this.error = !0;
  }
  toString() {
    return JSON.stringify({
      status: this.status,
      name: this.name,
      message: this.message,
      reason: this.reason
    });
  }
}
new se(401, "unauthorized", "Name or password is incorrect.");
new se(400, "bad_request", "Missing JSON list of 'docs'");
new se(404, "not_found", "missing");
new se(409, "conflict", "Document update conflict");
new se(400, "bad_request", "_id field must contain a string");
new se(412, "missing_id", "_id is required for puts");
new se(400, "bad_request", "Only reserved document ids may start with underscore.");
new se(412, "precondition_failed", "Database not open");
var Pc = new se(500, "unknown_error", "Database encountered an unknown error");
new se(500, "badarg", "Some query argument is invalid");
new se(400, "invalid_request", "Request was invalid");
new se(400, "query_parse_error", "Some query parameter is invalid");
new se(500, "doc_validation", "Bad special document member");
new se(400, "bad_request", "Something wrong with the request");
new se(400, "bad_request", "Document must be a JSON object");
new se(404, "not_found", "Database not found");
new se(500, "indexed_db_went_bad", "unknown");
new se(500, "web_sql_went_bad", "unknown");
new se(500, "levelDB_went_went_bad", "unknown");
new se(403, "forbidden", "Forbidden by design doc validate_doc_update function");
new se(400, "bad_request", "Invalid rev format");
new se(412, "file_exists", "The database could not be created, the file already exists.");
new se(412, "missing_stub", "A pre-existing attachment stub wasn't found");
new se(413, "invalid_url", "Provided URL is invalid");
function er(e) {
  if (typeof e != "object") {
    var t = e;
    e = Pc, e.data = t;
  }
  return "error" in e && e.error === "conflict" && (e.name = "conflict", e.status = 409), "name" in e || (e.name = e.error || "unknown"), "status" in e || (e.status = 500), "message" in e || (e.message = e.message || e.reason), "stack" in e || (e.stack = new Error().stack), e;
}
var Wt = Headers;
function dn(e) {
  return "$" + e;
}
function Na(e) {
  return e.substring(1);
}
function De() {
  this._store = {};
}
De.prototype.get = function(e) {
  var t = dn(e);
  return this._store[t];
};
De.prototype.set = function(e, t) {
  var n = dn(e);
  return this._store[n] = t, !0;
};
De.prototype.has = function(e) {
  var t = dn(e);
  return t in this._store;
};
De.prototype.keys = function() {
  return Object.keys(this._store).map((e) => Na(e));
};
De.prototype.delete = function(e) {
  var t = dn(e), n = t in this._store;
  return delete this._store[t], n;
};
De.prototype.forEach = function(e) {
  for (var t = Object.keys(this._store), n = 0, r = t.length; n < r; n++) {
    var i = t[n], a = this._store[i];
    i = Na(i), e(a, i);
  }
};
Object.defineProperty(De.prototype, "size", {
  get: function() {
    return Object.keys(this._store).length;
  }
});
function Bt(e) {
  if (this._store = new De(), e && Array.isArray(e))
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
function Ic() {
  if (typeof Symbol == "undefined" || typeof Map == "undefined" || typeof Set == "undefined")
    return !1;
  var e = Object.getOwnPropertyDescriptor(Map, Symbol.species);
  return e && "get" in e && Map[Symbol.species] === Map;
}
var Ct, ut;
Ic() ? (Ct = Set, ut = Map) : (Ct = Bt, ut = De);
var Bc = function(e) {
  return atob(e);
};
function Rc(e, t) {
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
function Lc(e) {
  for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), i = 0; i < t; i++)
    r[i] = e.charCodeAt(i);
  return n;
}
function Dc(e, t) {
  return Rc([Lc(e)], {
    type: t
  });
}
function Nc(e, t) {
  return Dc(Bc(e), t);
}
function Mc(e, t, n) {
  for (var r = "", i = n - e.length; r.length < i; )
    r += t;
  return r;
}
function Fc(e, t, n) {
  var r = Mc(e, t, n);
  return r + e;
}
var Ma = -324, tr = 3, nr = "";
function le(e, t) {
  if (e === t)
    return 0;
  e = tt(e), t = tt(t);
  var n = rr(e), r = rr(t);
  if (n - r !== 0)
    return n - r;
  switch (typeof e) {
    case "number":
      return e - t;
    case "boolean":
      return e < t ? -1 : 1;
    case "string":
      return Gc(e, t);
  }
  return Array.isArray(e) ? Jc(e, t) : Wc(e, t);
}
function tt(e) {
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
          e[r] = tt(t[r]);
      } else {
        if (e instanceof Date)
          return e.toJSON();
        if (e !== null) {
          e = {};
          for (var i in t)
            if (Object.prototype.hasOwnProperty.call(t, i)) {
              var a = t[i];
              typeof a != "undefined" && (e[i] = tt(a));
            }
        }
      }
  }
  return e;
}
function Uc(e) {
  if (e !== null)
    switch (typeof e) {
      case "boolean":
        return e ? 1 : 0;
      case "number":
        return Hc(e);
      case "string":
        return e.replace(/\u0002/g, "").replace(/\u0001/g, "").replace(/\u0000/g, "");
      case "object":
        var t = Array.isArray(e), n = t ? e : Object.keys(e), r = -1, i = n.length, a = "";
        if (t)
          for (; ++r < i; )
            a += qe(n[r]);
        else
          for (; ++r < i; ) {
            var o = n[r];
            a += qe(o) + qe(e[o]);
          }
        return a;
    }
  return "";
}
function qe(e) {
  var t = "\0";
  return e = tt(e), rr(e) + nr + Uc(e) + t;
}
function Kc(e, t) {
  var n = t, r, i = e[t] === "1";
  if (i)
    r = 0, t++;
  else {
    var a = e[t] === "0";
    t++;
    var o = "", s = e.substring(t, t + tr), c = parseInt(s, 10) + Ma;
    for (a && (c = -c), t += tr; ; ) {
      var g = e[t];
      if (g === "\0")
        break;
      o += g, t++;
    }
    o = o.split("."), o.length === 1 ? r = parseInt(o, 10) : r = parseFloat(o[0] + "." + o[1]), a && (r = r - 10), c !== 0 && (r = parseFloat(r + "e" + c));
  }
  return {
    num: r,
    length: t - n
  };
}
function zc(e, t) {
  var n = e.pop();
  if (t.length) {
    var r = t[t.length - 1];
    n === r.element && (t.pop(), r = t[t.length - 1]);
    var i = r.element, a = r.index;
    if (Array.isArray(i))
      i.push(n);
    else if (a === e.length - 2) {
      var o = e.pop();
      i[o] = n;
    } else
      e.push(n);
  }
}
function Qc(e) {
  for (var t = [], n = [], r = 0; ; ) {
    var i = e[r++];
    if (i === "\0") {
      if (t.length === 1)
        return t.pop();
      zc(t, n);
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
        var a = Kc(e, r);
        t.push(a.num), r += a.length;
        break;
      case "4":
        for (var o = ""; ; ) {
          var s = e[r];
          if (s === "\0")
            break;
          o += s, r++;
        }
        o = o.replace(/\u0001\u0001/g, "\0").replace(/\u0001\u0002/g, "").replace(/\u0002\u0002/g, ""), t.push(o);
        break;
      case "5":
        var c = {
          element: [],
          index: t.length
        };
        t.push(c.element), n.push(c);
        break;
      case "6":
        var g = {
          element: {},
          index: t.length
        };
        t.push(g.element), n.push(g);
        break;
      default:
        throw new Error("bad collationIndex or unexpectedly reached end of input: " + i);
    }
  }
}
function Jc(e, t) {
  for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) {
    var i = le(e[r], t[r]);
    if (i !== 0)
      return i;
  }
  return e.length === t.length ? 0 : e.length > t.length ? 1 : -1;
}
function Gc(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function Wc(e, t) {
  for (var n = Object.keys(e), r = Object.keys(t), i = Math.min(n.length, r.length), a = 0; a < i; a++) {
    var o = le(n[a], r[a]);
    if (o !== 0 || (o = le(e[n[a]], t[r[a]]), o !== 0))
      return o;
  }
  return n.length === r.length ? 0 : n.length > r.length ? 1 : -1;
}
function rr(e) {
  var t = ["boolean", "number", "string", "object"], n = t.indexOf(typeof e);
  if (~n)
    return e === null ? 1 : Array.isArray(e) ? 5 : n < 3 ? n + 2 : n + 3;
  if (Array.isArray(e))
    return 5;
}
function Hc(e) {
  if (e === 0)
    return "1";
  var t = e.toExponential().split(/e\+?/), n = parseInt(t[1], 10), r = e < 0, i = r ? "0" : "2", a = (r ? -n : n) - Ma, o = Fc(a.toString(), "0", tr);
  i += nr + o;
  var s = Math.abs(parseFloat(t[0]));
  r && (s = 10 - s);
  var c = s.toFixed(20);
  return c = c.replace(/\.?0+$/, ""), i += nr + c, i;
}
function Fa(e) {
  return Ht.hash(e);
}
function Xc(e) {
  return typeof ArrayBuffer != "undefined" && e instanceof ArrayBuffer || typeof Blob != "undefined" && e instanceof Blob;
}
function Yc(e) {
  if (typeof e.slice == "function")
    return e.slice(0);
  var t = new ArrayBuffer(e.byteLength), n = new Uint8Array(t), r = new Uint8Array(e);
  return n.set(r), t;
}
function Zc(e) {
  if (e instanceof ArrayBuffer)
    return Yc(e);
  var t = e.size, n = e.type;
  return typeof e.slice == "function" ? e.slice(0, t, n) : e.webkitSlice(0, t, n);
}
var Ua = Function.prototype.toString, Vc = Ua.call(Object);
function ef(e) {
  var t = Object.getPrototypeOf(e);
  if (t === null)
    return !0;
  var n = t.constructor;
  return typeof n == "function" && n instanceof n && Ua.call(n) == Vc;
}
function Me(e) {
  var t, n, r;
  if (!e || typeof e != "object")
    return e;
  if (Array.isArray(e)) {
    for (t = [], n = 0, r = e.length; n < r; n++)
      t[n] = Me(e[n]);
    return t;
  }
  if (e instanceof Date && isFinite(e))
    return e.toISOString();
  if (Xc(e))
    return Zc(e);
  if (!ef(e))
    return e;
  t = {};
  for (n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      var i = Me(e[n]);
      typeof i != "undefined" && (t[n] = i);
    }
  return t;
}
function tf(e) {
  var t = !1;
  return function(...n) {
    if (t)
      throw new Error("once called more than once");
    t = !0, e.apply(this, n);
  };
}
function Rt(e) {
  return function(...t) {
    t = Me(t);
    var n = this, r = typeof t[t.length - 1] == "function" ? t.pop() : !1, i = new Promise(function(a, o) {
      var s;
      try {
        var c = tf(function(g, w) {
          g ? o(g) : a(w);
        });
        t.push(c), s = e.apply(n, t), s && typeof s.then == "function" && a(s);
      } catch (g) {
        o(g);
      }
    });
    return r && i.then(function(a) {
      r(null, a);
    }, r), i;
  };
}
var ki;
try {
  localStorage.setItem("_pouch_check_localstorage", 1), ki = !!localStorage.getItem("_pouch_check_localstorage");
} catch (e) {
  ki = !1;
}
function ir(e) {
  if (typeof console != "undefined" && typeof console[e] == "function") {
    var t = Array.prototype.slice.call(arguments, 1);
    console[e].apply(console, t);
  }
}
var ar;
typeof Object.assign == "function" ? ar = Object.assign : ar = function(e) {
  for (var t = Object(e), n = 1; n < arguments.length; n++) {
    var r = arguments[n];
    if (r != null)
      for (var i in r)
        Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
  }
  return t;
};
var Ir = ar;
function Ai(e) {
  for (var t = [], n = 0, r = e.length; n < r; n++)
    t = t.concat(e[n]);
  return t;
}
function nt(e) {
  return typeof e._remote == "boolean" ? e._remote : typeof e.type == "function" ? (ir("warn", "db.type() is deprecated and will be removed in a future version of PouchDB"), e.type() === "http") : !1;
}
function hn(e, t, n) {
  return e.get(t).catch(function(r) {
    if (r.status !== 404)
      throw r;
    return {};
  }).then(function(r) {
    var i = r._rev, a = n(r);
    return a ? (a._id = t, a._rev = i, nf(e, a, n)) : {
      updated: !1,
      rev: i
    };
  });
}
function nf(e, t, n) {
  return e.put(t).then(function(r) {
    return {
      updated: !0,
      rev: r.rev
    };
  }, function(r) {
    if (r.status !== 409)
      throw r;
    return hn(e, t._id, n);
  });
}
class Je extends Error {
  constructor(t) {
    super(), this.status = 400, this.name = "query_parse_error", this.message = t, this.error = !0;
    try {
      Error.captureStackTrace(this, Je);
    } catch (n) {
    }
  }
}
class Br extends Error {
  constructor(t) {
    super(), this.status = 404, this.name = "not_found", this.message = t, this.error = !0;
    try {
      Error.captureStackTrace(this, Br);
    } catch (n) {
    }
  }
}
class Rr extends Error {
  constructor(t) {
    super(), this.status = 500, this.name = "invalid_value", this.message = t, this.error = !0;
    try {
      Error.captureStackTrace(this, Rr);
    } catch (n) {
    }
  }
}
function Ka(e, t) {
  return t && e.then(function(n) {
    we(function() {
      t(null, n);
    });
  }, function(n) {
    we(function() {
      t(n);
    });
  }), e;
}
function rf(e) {
  return function(...t) {
    var n = t.pop(), r = e.apply(this, t);
    return typeof n == "function" && Ka(r, n), r;
  };
}
function af(e, t) {
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
function En(e, t) {
  return function() {
    var n = arguments, r = this;
    return e.add(function() {
      return t.apply(r, n);
    });
  };
}
function xi(e) {
  var t = new Ct(e), n = new Array(t.size), r = -1;
  return t.forEach(function(i) {
    n[++r] = i;
  }), n;
}
function Cn(e) {
  var t = new Array(e.size), n = -1;
  return e.forEach(function(r, i) {
    t[++n] = i;
  }), t;
}
class or {
  constructor() {
    this.promise = new Promise(function(t) {
      t();
    });
  }
  add(t) {
    return this.promise = this.promise.catch(function() {
    }).then(function() {
      return t();
    }), this.promise;
  }
  finish() {
    return this.promise;
  }
}
function Ei(e) {
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
function of(e, t) {
  return Ei(e) + Ei(t) + "undefined";
}
function Ci(e, t, n, r, i, a) {
  return M(this, null, function* () {
    const o = of(n, r);
    let s;
    if (!i && (s = e._cachedViews = e._cachedViews || {}, s[o]))
      return s[o];
    const c = e.info().then(function(g) {
      return M(this, null, function* () {
        const w = g.db_name + "-mrview-" + (i ? "temp" : Fa(o));
        function f($) {
          $.views = $.views || {};
          let p = t;
          p.indexOf("/") === -1 && (p = t + "/" + t);
          const v = $.views[p] = $.views[p] || {};
          if (!v[w])
            return v[w] = !0, $;
        }
        yield hn(e, "_local/" + a, f);
        const S = (yield e.registerDependentDatabase(w)).db;
        S.auto_compaction = !0;
        const A = {
          name: w,
          db: S,
          sourceDB: e,
          adapter: e.adapter,
          mapFun: n,
          reduceFun: r
        };
        let E;
        try {
          E = yield A.db.get("_local/lastSeq");
        } catch ($) {
          if ($.status !== 404)
            throw $;
        }
        return A.seq = E ? E.seq : 0, s && A.db.once("destroyed", function() {
          delete s[o];
        }), A;
      });
    });
    return s && (s[o] = c), c;
  });
}
var Ti = {}, qi = new or(), sf = 50;
function Tn(e) {
  return e.indexOf("/") === -1 ? [e, e] : e.split("/");
}
function uf(e) {
  return e.length === 1 && /^1-/.test(e[0].rev);
}
function ji(e, t, n) {
  try {
    e.emit("error", t);
  } catch (r) {
    ir("error", `The user's map/reduce function threw an uncaught error.
You can debug this error by doing:
myDatabase.on('error', function (err) { debugger; });
Please double-check your map/reduce function.`), ir("error", t, n);
  }
}
function cf(e, t, n, r) {
  function i(d, h, b) {
    try {
      h(b);
    } catch (O) {
      ji(d, O, {
        fun: h,
        doc: b
      });
    }
  }
  function a(d, h, b, O, C) {
    try {
      return {
        output: h(b, O, C)
      };
    } catch (B) {
      return ji(d, B, {
        fun: h,
        keys: b,
        values: O,
        rereduce: C
      }), {
        error: B
      };
    }
  }
  function o(d, h) {
    const b = le(d.key, h.key);
    return b !== 0 ? b : le(d.value, h.value);
  }
  function s(d, h, b) {
    return b = b || 0, typeof h == "number" ? d.slice(b, h + b) : b > 0 ? d.slice(b) : d;
  }
  function c(d) {
    const h = d.value;
    return h && typeof h == "object" && h._id || d.id;
  }
  function g(d) {
    d.rows.forEach(function(h) {
      const b = h.doc && h.doc._attachments;
      b && Object.keys(b).forEach(function(O) {
        const C = b[O];
        b[O].data = Nc(C.data, C.content_type);
      });
    });
  }
  function w(d) {
    return function(h) {
      return d.include_docs && d.attachments && d.binary && g(h), h;
    };
  }
  function f(d, h, b, O) {
    let C = h[d];
    typeof C != "undefined" && (O && (C = encodeURIComponent(JSON.stringify(C))), b.push(d + "=" + C));
  }
  function m(d) {
    if (typeof d != "undefined") {
      const h = Number(d);
      return !isNaN(h) && h === parseInt(d, 10) ? h : d;
    }
  }
  function S(d) {
    return d.group_level = m(d.group_level), d.limit = m(d.limit), d.skip = m(d.skip), d;
  }
  function A(d) {
    if (d) {
      if (typeof d != "number")
        return new Je(`Invalid value for integer: "${d}"`);
      if (d < 0)
        return new Je(`Invalid value for positive integer: "${d}"`);
    }
  }
  function E(d, h) {
    const b = d.descending ? "endkey" : "startkey", O = d.descending ? "startkey" : "endkey";
    if (typeof d[b] != "undefined" && typeof d[O] != "undefined" && le(d[b], d[O]) > 0)
      throw new Je("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");
    if (h.reduce && d.reduce !== !1) {
      if (d.include_docs)
        throw new Je("{include_docs:true} is invalid for reduce");
      if (d.keys && d.keys.length > 1 && !d.group && !d.group_level)
        throw new Je("Multi-key fetches for reduce views must use {group: true}");
    }
    ["group_level", "limit", "skip"].forEach(function(C) {
      const B = A(d[C]);
      if (B)
        throw B;
    });
  }
  function $(d, h, b) {
    return M(this, null, function* () {
      let O = [], C, B = "GET", D;
      if (f("reduce", b, O), f("include_docs", b, O), f("attachments", b, O), f("limit", b, O), f("descending", b, O), f("group", b, O), f("group_level", b, O), f("skip", b, O), f("stale", b, O), f("conflicts", b, O), f("startkey", b, O, !0), f("start_key", b, O, !0), f("endkey", b, O, !0), f("end_key", b, O, !0), f("inclusive_end", b, O), f("key", b, O, !0), f("update_seq", b, O), O = O.join("&"), O = O === "" ? "" : "?" + O, typeof b.keys != "undefined") {
        const q = `keys=${encodeURIComponent(JSON.stringify(b.keys))}`;
        q.length + O.length + 1 <= 2e3 ? O += (O[0] === "?" ? "&" : "?") + q : (B = "POST", typeof h == "string" ? C = {
          keys: b.keys
        } : h.keys = b.keys);
      }
      if (typeof h == "string") {
        const x = Tn(h), q = yield d.fetch("_design/" + x[0] + "/_view/" + x[1] + O, {
          headers: new Wt({
            "Content-Type": "application/json"
          }),
          method: B,
          body: JSON.stringify(C)
        });
        D = q.ok;
        const R = yield q.json();
        if (!D)
          throw R.status = q.status, er(R);
        return R.rows.forEach(function(L) {
          if (L.value && L.value.error && L.value.error === "builtin_reduce_error")
            throw new Error(L.reason);
        }), new Promise(function(L) {
          L(R);
        }).then(w(b));
      }
      C = C || {}, Object.keys(h).forEach(function(x) {
        Array.isArray(h[x]) ? C[x] = h[x] : C[x] = h[x].toString();
      });
      const T = yield d.fetch("_temp_view" + O, {
        headers: new Wt({
          "Content-Type": "application/json"
        }),
        method: "POST",
        body: JSON.stringify(C)
      });
      D = T.ok;
      const k = yield T.json();
      if (!D)
        throw k.status = T.status, er(k);
      return new Promise(function(x) {
        x(k);
      }).then(w(b));
    });
  }
  function p(d, h, b) {
    return new Promise(function(O, C) {
      d._query(h, b, function(B, D) {
        if (B)
          return C(B);
        O(D);
      });
    });
  }
  function v(d) {
    return new Promise(function(h, b) {
      d._viewCleanup(function(O, C) {
        if (O)
          return b(O);
        h(C);
      });
    });
  }
  function u(d) {
    return function(h) {
      if (h.status === 404)
        return d;
      throw h;
    };
  }
  function l(d, h, b) {
    return M(this, null, function* () {
      const O = "_local/doc_" + d, C = {
        _id: O,
        keys: []
      }, B = b.get(d), D = B[0], T = B[1];
      function k() {
        return uf(T) ? Promise.resolve(C) : h.db.get(O).catch(u(C));
      }
      function x(Z) {
        return Z.keys.length ? h.db.allDocs({
          keys: Z.keys,
          include_docs: !0
        }) : Promise.resolve({
          rows: []
        });
      }
      function q(Z, re) {
        const ae = [], de = new Ct();
        for (let N = 0, K = re.rows.length; N < K; N++) {
          const ne = re.rows[N].doc;
          if (ne && (ae.push(ne), de.add(ne._id), ne._deleted = !D.has(ne._id), !ne._deleted)) {
            const V = D.get(ne._id);
            "value" in V && (ne.value = V.value);
          }
        }
        const _e = Cn(D);
        return _e.forEach(function(N) {
          if (!de.has(N)) {
            const K = {
              _id: N
            }, Q = D.get(N);
            "value" in Q && (K.value = Q.value), ae.push(K);
          }
        }), Z.keys = xi(_e.concat(Z.keys)), ae.push(Z), ae;
      }
      const R = yield k(), L = yield x(R);
      return q(R, L);
    });
  }
  function y(d) {
    return d.sourceDB.get("_local/purges").then(function(h) {
      const b = h.purgeSeq;
      return d.db.get("_local/purgeSeq").then(function(O) {
        return O._rev;
      }).catch(function(O) {
        if (O.status !== 404)
          throw O;
      }).then(function(O) {
        return d.db.put({
          _id: "_local/purgeSeq",
          _rev: O,
          purgeSeq: b
        });
      });
    }).catch(function(h) {
      if (h.status !== 404)
        throw h;
    });
  }
  function _(d, h, b) {
    var O = "_local/lastSeq";
    return d.db.get(O).catch(u({
      _id: O,
      seq: 0
    })).then(function(C) {
      var B = Cn(h);
      return Promise.all(B.map(function(D) {
        return l(D, d, h);
      })).then(function(D) {
        var T = Ai(D);
        return C.seq = b, T.push(C), d.db.bulkDocs({
          docs: T
        });
      }).then(() => y(d));
    });
  }
  function j(d) {
    const h = typeof d == "string" ? d : d.name;
    let b = Ti[h];
    return b || (b = Ti[h] = new or()), b;
  }
  function I(d, h) {
    return M(this, null, function* () {
      return En(j(d), function() {
        return P(d, h);
      })();
    });
  }
  function P(d, h) {
    return M(this, null, function* () {
      let b, O, C;
      function B(N, K) {
        const Q = {
          id: O._id,
          key: tt(N)
        };
        typeof K != "undefined" && K !== null && (Q.value = tt(K)), b.push(Q);
      }
      const D = t(d.mapFun, B);
      let T = d.seq || 0;
      function k() {
        return d.sourceDB.info().then(function(N) {
          C = d.sourceDB.activeTasks.add({
            name: "view_indexing",
            total_items: N.update_seq - T
          });
        });
      }
      function x(N, K) {
        return function() {
          return _(d, N, K);
        };
      }
      let q = 0;
      const R = {
        view: d.name,
        indexed_docs: q
      };
      d.sourceDB.emit("indexing", R);
      const L = new or();
      function Z() {
        return M(this, null, function* () {
          const N = yield d.sourceDB.changes({
            return_docs: !0,
            conflicts: !0,
            include_docs: !0,
            style: "all_docs",
            since: T,
            limit: h.changes_batch_size
          }), K = yield re();
          return ae(N, K);
        });
      }
      function re() {
        return d.db.get("_local/purgeSeq").then(function(N) {
          return N.purgeSeq;
        }).catch(function(N) {
          if (N && N.status !== 404)
            throw N;
          return -1;
        }).then(function(N) {
          return d.sourceDB.get("_local/purges").then(function(K) {
            const Q = K.purges.filter(function(V, H) {
              return H > N;
            }).map((V) => V.docId), ne = Q.filter(function(V, H) {
              return Q.indexOf(V) === H;
            });
            return Promise.all(ne.map(function(V) {
              return d.sourceDB.get(V).then(function(H) {
                return {
                  docId: V,
                  doc: H
                };
              }).catch(function(H) {
                if (H.status !== 404)
                  throw H;
                return {
                  docId: V
                };
              });
            }));
          }).catch(function(K) {
            if (K && K.status !== 404)
              throw K;
            return [];
          });
        });
      }
      function ae(N, K) {
        var Q = N.results;
        if (!Q.length && !K.length)
          return;
        for (let H of K)
          if (Q.findIndex(function(Ee) {
            return Ee.id === H.docId;
          }) < 0) {
            const Ee = {
              _id: H.docId,
              doc: {
                _id: H.docId,
                _deleted: 1
              },
              changes: []
            };
            H.doc && (Ee.doc = H.doc, Ee.changes.push({
              rev: H.doc._rev
            })), Q.push(Ee);
          }
        var ne = de(Q);
        L.add(x(ne, T)), q = q + Q.length;
        const V = {
          view: d.name,
          last_seq: N.last_seq,
          results_count: Q.length,
          indexed_docs: q
        };
        if (d.sourceDB.emit("indexing", V), d.sourceDB.activeTasks.update(C, {
          completed_items: q
        }), !(Q.length < h.changes_batch_size))
          return Z();
      }
      function de(N) {
        const K = new ut();
        for (let Q = 0, ne = N.length; Q < ne; Q++) {
          const V = N[Q];
          if (V.doc._id[0] !== "_") {
            b = [], O = V.doc, O._deleted || i(d.sourceDB, D, O), b.sort(o);
            const H = _e(b);
            K.set(V.doc._id, [H, V.changes]);
          }
          T = V.seq;
        }
        return K;
      }
      function _e(N) {
        const K = new ut();
        let Q;
        for (let ne = 0, V = N.length; ne < V; ne++) {
          const H = N[ne], Ue = [H.key, H.id];
          ne > 0 && le(H.key, Q) === 0 && Ue.push(ne), K.set(qe(Ue), H), Q = H.key;
        }
        return K;
      }
      try {
        yield k(), yield Z(), yield L.finish(), d.seq = T, d.sourceDB.activeTasks.remove(C);
      } catch (N) {
        d.sourceDB.activeTasks.remove(C, N);
      }
    });
  }
  function F(d, h, b) {
    b.group_level === 0 && delete b.group_level;
    const O = b.group || b.group_level, C = n(d.reduceFun), B = [], D = isNaN(b.group_level) ? Number.POSITIVE_INFINITY : b.group_level;
    h.forEach(function(T) {
      const k = B[B.length - 1];
      let x = O ? T.key : null;
      if (O && Array.isArray(x) && (x = x.slice(0, D)), k && le(k.groupKey, x) === 0) {
        k.keys.push([T.key, T.id]), k.values.push(T.value);
        return;
      }
      B.push({
        keys: [[T.key, T.id]],
        values: [T.value],
        groupKey: x
      });
    }), h = [];
    for (let T = 0, k = B.length; T < k; T++) {
      const x = B[T], q = a(d.sourceDB, C, x.keys, x.values, !1);
      if (q.error && q.error instanceof Rr)
        throw q.error;
      h.push({
        // CouchDB just sets the value to null if a non-built-in errors out
        value: q.error ? null : q.output,
        key: x.groupKey
      });
    }
    return {
      rows: s(h, b.limit, b.skip)
    };
  }
  function U(d, h) {
    return En(j(d), function() {
      return Y(d, h);
    })();
  }
  function Y(d, h) {
    return M(this, null, function* () {
      let b;
      const O = d.reduceFun && h.reduce !== !1, C = h.skip || 0;
      typeof h.keys != "undefined" && !h.keys.length && (h.limit = 0, delete h.keys);
      function B(T) {
        return M(this, null, function* () {
          T.include_docs = !0;
          const k = yield d.db.allDocs(T);
          return b = k.total_rows, k.rows.map(function(x) {
            if ("value" in x.doc && typeof x.doc.value == "object" && x.doc.value !== null) {
              const R = Object.keys(x.doc.value).sort(), L = ["id", "key", "value"];
              if (!(R < L || R > L))
                return x.doc.value;
            }
            const q = Qc(x.doc._id);
            return {
              key: q[0],
              id: q[1],
              value: "value" in x.doc ? x.doc.value : null
            };
          });
        });
      }
      function D(T) {
        return M(this, null, function* () {
          let k;
          if (O ? k = F(d, T, h) : typeof h.keys == "undefined" ? k = {
            total_rows: b,
            offset: C,
            rows: T
          } : k = {
            total_rows: b,
            offset: C,
            rows: s(T, h.limit, h.skip)
          }, h.update_seq && (k.update_seq = d.seq), h.include_docs) {
            const q = xi(T.map(c)), R = yield d.sourceDB.allDocs({
              keys: q,
              include_docs: !0,
              conflicts: h.conflicts,
              attachments: h.attachments,
              binary: h.binary
            });
            var x = new ut();
            return R.rows.forEach(function(L) {
              x.set(L.id, L.doc);
            }), T.forEach(function(L) {
              var Z = c(L), re = x.get(Z);
              re && (L.doc = re);
            }), k;
          } else
            return k;
        });
      }
      if (typeof h.keys != "undefined") {
        const k = h.keys.map(function(R) {
          const L = {
            startkey: qe([R]),
            endkey: qe([R, {}])
          };
          return h.update_seq && (L.update_seq = !0), B(L);
        }), x = yield Promise.all(k), q = Ai(x);
        return D(q);
      } else {
        const T = {
          descending: h.descending
        };
        h.update_seq && (T.update_seq = !0);
        let k, x;
        if ("start_key" in h && (k = h.start_key), "startkey" in h && (k = h.startkey), "end_key" in h && (x = h.end_key), "endkey" in h && (x = h.endkey), typeof k != "undefined" && (T.startkey = h.descending ? qe([k, {}]) : qe([k])), typeof x != "undefined") {
          let R = h.inclusive_end !== !1;
          h.descending && (R = !R), T.endkey = qe(R ? [x, {}] : [x]);
        }
        if (typeof h.key != "undefined") {
          const R = qe([h.key]), L = qe([h.key, {}]);
          T.descending ? (T.endkey = R, T.startkey = L) : (T.startkey = R, T.endkey = L);
        }
        O || (typeof h.limit == "number" && (T.limit = h.limit), T.skip = C);
        const q = yield B(T);
        return D(q);
      }
    });
  }
  function G(d) {
    return M(this, null, function* () {
      return (yield d.fetch("_view_cleanup", {
        headers: new Wt({
          "Content-Type": "application/json"
        }),
        method: "POST"
      })).json();
    });
  }
  function z(d) {
    return M(this, null, function* () {
      try {
        const h = yield d.get("_local/" + e), b = new ut();
        Object.keys(h.views).forEach(function(k) {
          const x = Tn(k), q = "_design/" + x[0], R = x[1];
          let L = b.get(q);
          L || (L = new Ct(), b.set(q, L)), L.add(R);
        });
        const O = {
          keys: Cn(b),
          include_docs: !0
        }, C = yield d.allDocs(O), B = {};
        C.rows.forEach(function(k) {
          const x = k.key.substring(8);
          b.get(k.key).forEach(function(q) {
            let R = x + "/" + q;
            h.views[R] || (R = q);
            const L = Object.keys(h.views[R]), Z = k.doc && k.doc.views && k.doc.views[q];
            L.forEach(function(re) {
              B[re] = B[re] || Z;
            });
          });
        });
        const T = Object.keys(B).filter(function(k) {
          return !B[k];
        }).map(function(k) {
          return En(j(k), function() {
            return new d.constructor(k, d.__opts).destroy();
          })();
        });
        return Promise.all(T).then(function() {
          return {
            ok: !0
          };
        });
      } catch (h) {
        if (h.status === 404)
          return {
            ok: !0
          };
        throw h;
      }
    });
  }
  function J(d, h, b) {
    return M(this, null, function* () {
      if (typeof d._query == "function")
        return p(d, h, b);
      if (nt(d))
        return $(d, h, b);
      const O = {
        changes_batch_size: d.__opts.view_update_changes_batch_size || sf
      };
      if (typeof h != "string")
        return E(b, h), qi.add(function() {
          return M(this, null, function* () {
            const C = yield Ci(
              /* sourceDB */
              d,
              /* viewName */
              "temp_view/temp_view",
              /* mapFun */
              h.map,
              /* reduceFun */
              h.reduce,
              /* temporary */
              !0,
              /* localDocName */
              e
            );
            return af(I(C, O).then(function() {
              return U(C, b);
            }), function() {
              return C.db.destroy();
            });
          });
        }), qi.finish();
      {
        const C = h, B = Tn(C), D = B[0], T = B[1], k = yield d.get("_design/" + D);
        if (h = k.views && k.views[T], !h)
          throw new Br(`ddoc ${k._id} has no view named ${T}`);
        r(k, T), E(b, h);
        const x = yield Ci(
          /* sourceDB */
          d,
          /* viewName */
          C,
          /* mapFun */
          h.map,
          /* reduceFun */
          h.reduce,
          /* temporary */
          !1,
          /* localDocName */
          e
        );
        return b.stale === "ok" || b.stale === "update_after" ? (b.stale === "update_after" && we(function() {
          I(x, O);
        }), U(x, b)) : (yield I(x, O), U(x, b));
      }
    });
  }
  function W(d, h, b) {
    const O = this;
    typeof h == "function" && (b = h, h = {}), h = h ? S(h) : {}, typeof d == "function" && (d = {
      map: d
    });
    const C = Promise.resolve().then(function() {
      return J(O, d, h);
    });
    return Ka(C, b), C;
  }
  const ee = rf(function() {
    const d = this;
    return typeof d._viewCleanup == "function" ? v(d) : nt(d) ? G(d) : z(d);
  });
  return {
    query: W,
    viewCleanup: ee
  };
}
function Lt(e, t) {
  for (var n = e, r = 0, i = t.length; r < i; r++) {
    var a = t[r];
    if (n = n[a], !n)
      break;
  }
  return n;
}
function ff(e, t, n) {
  for (var r = 0, i = t.length; r < i - 1; r++) {
    var a = t[r];
    e = e[a] = e[a] || {};
  }
  e[t[i - 1]] = n;
}
function Lr(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function rt(e) {
  for (var t = [], n = "", r = 0, i = e.length; r < i; r++) {
    var a = e[r];
    r > 0 && e[r - 1] === "\\" && (a === "$" || a === ".") ? n = n.substring(0, n.length - 1) + a : a === "." ? (t.push(n), n = "") : n += a;
  }
  return t.push(n), t;
}
var lf = ["$or", "$nor", "$not"];
function za(e) {
  return lf.indexOf(e) > -1;
}
function $e(e) {
  return Object.keys(e)[0];
}
function Dr(e) {
  return e[$e(e)];
}
function Tt(e) {
  var t = {}, n = {
    $or: !0,
    $nor: !0
  };
  return e.forEach(function(r) {
    Object.keys(r).forEach(function(i) {
      var a = r[i];
      if (typeof a != "object" && (a = {
        $eq: a
      }), za(i))
        if (a instanceof Array) {
          if (n[i]) {
            n[i] = !1, t[i] = a;
            return;
          }
          var o = [];
          t[i].forEach(function(c) {
            Object.keys(a).forEach(function(g) {
              var w = a[g], f = Math.max(Object.keys(c).length, Object.keys(w).length), m = Tt([c, w]);
              Object.keys(m).length <= f || o.push(m);
            });
          }), t[i] = o;
        } else
          t[i] = Tt([a]);
      else {
        var s = t[i] = t[i] || {};
        Object.keys(a).forEach(function(c) {
          var g = a[c];
          if (c === "$gt" || c === "$gte")
            return df(c, g, s);
          if (c === "$lt" || c === "$lte")
            return hf(c, g, s);
          if (c === "$ne")
            return vf(g, s);
          if (c === "$eq")
            return yf(g, s);
          if (c === "$regex")
            return pf(g, s);
          s[c] = g;
        });
      }
    });
  }), t;
}
function df(e, t, n) {
  typeof n.$eq == "undefined" && (typeof n.$gte != "undefined" ? e === "$gte" ? t > n.$gte && (n.$gte = t) : t >= n.$gte && (delete n.$gte, n.$gt = t) : typeof n.$gt != "undefined" ? e === "$gte" ? t > n.$gt && (delete n.$gt, n.$gte = t) : t > n.$gt && (n.$gt = t) : n[e] = t);
}
function hf(e, t, n) {
  typeof n.$eq == "undefined" && (typeof n.$lte != "undefined" ? e === "$lte" ? t < n.$lte && (n.$lte = t) : t <= n.$lte && (delete n.$lte, n.$lt = t) : typeof n.$lt != "undefined" ? e === "$lte" ? t < n.$lt && (delete n.$lt, n.$lte = t) : t < n.$lt && (n.$lt = t) : n[e] = t);
}
function vf(e, t) {
  "$ne" in t ? t.$ne.push(e) : t.$ne = [e];
}
function yf(e, t) {
  delete t.$gt, delete t.$gte, delete t.$lt, delete t.$lte, delete t.$ne, t.$eq = e;
}
function pf(e, t) {
  "$regex" in t ? t.$regex.push(e) : t.$regex = [e];
}
function Qa(e) {
  for (var t in e) {
    if (Array.isArray(e))
      for (var n in e)
        e[n].$and && (e[n] = Tt(e[n].$and));
    var r = e[t];
    typeof r == "object" && Qa(r);
  }
  return e;
}
function Ja(e, t) {
  for (var n in e) {
    n === "$and" && (t = !0);
    var r = e[n];
    typeof r == "object" && (t = Ja(r, t));
  }
  return t;
}
function Nr(e) {
  var t = Me(e);
  Ja(t, !1) && (t = Qa(t), "$and" in t && (t = Tt(t.$and))), ["$or", "$nor"].forEach(function(o) {
    o in t && t[o].forEach(function(s) {
      for (var c = Object.keys(s), g = 0; g < c.length; g++) {
        var w = c[g], f = s[w];
        (typeof f != "object" || f === null) && (s[w] = {
          $eq: f
        });
      }
    });
  }), "$not" in t && (t.$not = Tt([t.$not]));
  for (var n = Object.keys(t), r = 0; r < n.length; r++) {
    var i = n[r], a = t[i];
    (typeof a != "object" || a === null) && (a = {
      $eq: a
    }), t[i] = a;
  }
  return sr(t), t;
}
function sr(e) {
  Object.keys(e).forEach(function(t) {
    var n = e[t];
    Array.isArray(n) ? n.forEach(function(r) {
      r && typeof r == "object" && sr(r);
    }) : t === "$ne" ? e.$ne = [n] : t === "$regex" ? e.$regex = [n] : n && typeof n == "object" && sr(n);
  });
}
function gf(e) {
  function t(n) {
    return e.map(function(r) {
      var i = $e(r), a = rt(i), o = Lt(n, a);
      return o;
    });
  }
  return function(n, r) {
    var i = t(n.doc), a = t(r.doc), o = le(i, a);
    return o !== 0 ? o : Lr(n.doc._id, r.doc._id);
  };
}
function Ga(e, t, n) {
  if (e = e.filter(function(o) {
    return ht(o.doc, t.selector, n);
  }), t.sort) {
    var r = gf(t.sort);
    e = e.sort(r), typeof t.sort[0] != "string" && Dr(t.sort[0]) === "desc" && (e = e.reverse());
  }
  if ("limit" in t || "skip" in t) {
    var i = t.skip || 0, a = ("limit" in t ? t.limit : e.length) + i;
    e = e.slice(i, a);
  }
  return e;
}
function ht(e, t, n) {
  return n.every(function(r) {
    var i = t[r], a = rt(r), o = Lt(e, a);
    return za(r) ? _f(r, i, e) : nn(i, e, a, o);
  });
}
function nn(e, t, n, r) {
  return e ? typeof e == "object" ? Object.keys(e).every(function(i) {
    var a = e[i];
    if (i.indexOf("$") === 0)
      return Pi(i, t, a, n, r);
    var o = rt(i);
    if (r === void 0 && typeof a != "object" && o.length > 0)
      return !1;
    var s = Lt(r, o);
    return typeof a == "object" ? nn(a, t, n, s) : Pi("$eq", t, a, o, s);
  }) : e === r : !0;
}
function _f(e, t, n) {
  return e === "$or" ? t.some(function(r) {
    return ht(n, r, Object.keys(r));
  }) : e === "$not" ? !ht(n, t, Object.keys(t)) : !t.find(function(r) {
    return ht(n, r, Object.keys(r));
  });
}
function Pi(e, t, n, r, i) {
  if (!Bi[e])
    throw new Error('unknown operator "' + e + '" - should be one of $eq, $lte, $lt, $gt, $gte, $exists, $ne, $in, $nin, $size, $mod, $regex, $elemMatch, $type, $allMatch or $all');
  return Bi[e](t, n, r, i);
}
function $t(e) {
  return typeof e != "undefined" && e !== null;
}
function Qe(e) {
  return typeof e != "undefined";
}
function mf(e, t) {
  if (typeof e != "number" || parseInt(e, 10) !== e)
    return !1;
  var n = t[0], r = t[1];
  return e % n === r;
}
function Ii(e, t) {
  return t.some(function(n) {
    return e instanceof Array ? e.some(function(r) {
      return le(n, r) === 0;
    }) : le(n, e) === 0;
  });
}
function wf(e, t) {
  return t.every(function(n) {
    return e.some(function(r) {
      return le(n, r) === 0;
    });
  });
}
function bf(e, t) {
  return e.length === t;
}
function $f(e, t) {
  var n = new RegExp(t);
  return n.test(e);
}
function Of(e, t) {
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
var Bi = {
  $elemMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" && r[0] !== null ? r.some(function(i) {
      return ht(i, t, Object.keys(t));
    }) : r.some(function(i) {
      return nn(t, e, n, i);
    });
  },
  $allMatch: function(e, t, n, r) {
    return !Array.isArray(r) || r.length === 0 ? !1 : typeof r[0] == "object" && r[0] !== null ? r.every(function(i) {
      return ht(i, t, Object.keys(t));
    }) : r.every(function(i) {
      return nn(t, e, n, i);
    });
  },
  $eq: function(e, t, n, r) {
    return Qe(r) && le(r, t) === 0;
  },
  $gte: function(e, t, n, r) {
    return Qe(r) && le(r, t) >= 0;
  },
  $gt: function(e, t, n, r) {
    return Qe(r) && le(r, t) > 0;
  },
  $lte: function(e, t, n, r) {
    return Qe(r) && le(r, t) <= 0;
  },
  $lt: function(e, t, n, r) {
    return Qe(r) && le(r, t) < 0;
  },
  $exists: function(e, t, n, r) {
    return t ? Qe(r) : !Qe(r);
  },
  $mod: function(e, t, n, r) {
    return $t(r) && mf(r, t);
  },
  $ne: function(e, t, n, r) {
    return t.every(function(i) {
      return le(r, i) !== 0;
    });
  },
  $in: function(e, t, n, r) {
    return $t(r) && Ii(r, t);
  },
  $nin: function(e, t, n, r) {
    return $t(r) && !Ii(r, t);
  },
  $size: function(e, t, n, r) {
    return $t(r) && Array.isArray(r) && bf(r, t);
  },
  $all: function(e, t, n, r) {
    return Array.isArray(r) && wf(r, t);
  },
  $regex: function(e, t, n, r) {
    return $t(r) && typeof r == "string" && t.every(function(i) {
      return $f(r, i);
    });
  },
  $type: function(e, t, n, r) {
    return Of(r, t);
  }
};
function vn(e, t) {
  if (typeof t != "object")
    throw new Error("Selector error: expected a JSON object");
  t = Nr(t);
  var n = {
    doc: e
  }, r = Ga([n], {
    selector: t
  }, Object.keys(t));
  return r && r.length === 1;
}
function Wa(e) {
  return e = Me(e), e.index || (e.index = {}), ["type", "name", "ddoc"].forEach(function(t) {
    e.index[t] && (e[t] = e.index[t], delete e.index[t]);
  }), e.fields && (e.index.fields = e.fields, delete e.fields), e.type || (e.type = "json"), e;
}
function Sf(e, t, n) {
  var r = "", i = t, a = !0;
  if (["$in", "$nin", "$or", "$and", "$mod", "$nor", "$all"].indexOf(e) !== -1 && (Array.isArray(t) || (r = "Query operator " + e + " must be an array.")), ["$not", "$elemMatch", "$allMatch"].indexOf(e) !== -1 && (!Array.isArray(t) && typeof t == "object" && t !== null || (r = "Query operator " + e + " must be an object.")), e === "$mod" && Array.isArray(t))
    if (t.length !== 2)
      r = "Query operator $mod must be in the format [divisor, remainder], where divisor and remainder are both integers.";
    else {
      var o = t[0], s = t[1];
      o === 0 && (r = "Query operator $mod's divisor cannot be 0, cannot divide by zero.", a = !1), (typeof o != "number" || parseInt(o, 10) !== o) && (r = "Query operator $mod's divisor is not an integer.", i = o), parseInt(s, 10) !== s && (r = "Query operator $mod's remainder is not an integer.", i = s);
    }
  if (e === "$exists" && typeof t != "boolean" && (r = "Query operator $exists must be a boolean."), e === "$type") {
    var c = ["null", "boolean", "number", "string", "array", "object"], g = '"' + c.slice(0, c.length - 1).join('", "') + '", or "' + c[c.length - 1] + '"';
    (typeof t != "string" || c.indexOf(t) == -1) && (r = "Query operator $type must be a string. Supported values: " + g + ".");
  }
  if (e === "$size" && parseInt(t, 10) !== t && (r = "Query operator $size must be a integer."), e === "$regex" && typeof t != "string" && (n ? r = "Query operator $regex must be a string." : t instanceof RegExp || (r = "Query operator $regex must be a string or an instance of a javascript regular expression.")), r) {
    if (a) {
      var w = i === null ? " " : Array.isArray(i) ? " array" : " " + typeof i, f = typeof i == "object" && i !== null ? JSON.stringify(i, null, "	") : i;
      r += " Received" + w + ": " + f;
    }
    throw new Error(r);
  }
}
var kf = ["$all", "$allMatch", "$and", "$elemMatch", "$exists", "$in", "$mod", "$nin", "$nor", "$not", "$or", "$regex", "$size", "$type"], Af = ["$in", "$nin", "$mod", "$all"], xf = ["$eq", "$gt", "$gte", "$lt", "$lte"];
function rn(e, t) {
  if (Array.isArray(e))
    for (var n of e)
      typeof n == "object" && o !== null && rn(n, t);
  else
    for (var r = Object.keys(e), i = 0; i < r.length; i++) {
      var a = r[i], o = e[a];
      kf.indexOf(a) !== -1 && Sf(a, o, t), xf.indexOf(a) === -1 && Af.indexOf(a) === -1 && typeof o == "object" && o !== null && rn(o, t);
    }
}
function Dt(e, t, n, r) {
  var i, a;
  n.headers = new Wt({
    "Content-type": "application/json"
  }), e.fetch(t, n).then(function(o) {
    return i = o.status, a = o.ok, o.json();
  }).then(function(o) {
    if (a)
      r(null, o);
    else {
      o.status = i;
      var s = er(o);
      r(s);
    }
  }).catch(r);
}
function Ef(e, t, n) {
  t = Wa(t), Dt(e, "_index", {
    method: "POST",
    body: JSON.stringify(t)
  }, n);
}
function Cf(e, t, n) {
  rn(t.selector, !0), Dt(e, "_find", {
    method: "POST",
    body: JSON.stringify(t)
  }, n);
}
function Tf(e, t, n) {
  Dt(e, "_explain", {
    method: "POST",
    body: JSON.stringify(t)
  }, n);
}
function qf(e, t) {
  Dt(e, "_index", {
    method: "GET"
  }, t);
}
function jf(e, t, n) {
  var r = t.ddoc, i = t.type || "json", a = t.name;
  if (!r)
    return n(new Error("you must provide an index's ddoc"));
  if (!a)
    return n(new Error("you must provide an index's name"));
  var o = "_index/" + [r, i, a].map(encodeURIComponent).join("/");
  Dt(e, o, {
    method: "DELETE"
  }, n);
}
function Nt(e) {
  return function(...t) {
    var n = t.pop(), r = e.apply(this, t);
    return Pf(r, n), r;
  };
}
function Pf(e, t) {
  return e.then(function(n) {
    we(function() {
      t(null, n);
    });
  }, function(n) {
    we(function() {
      t(n);
    });
  }), e;
}
var Mr = function(...e) {
  for (var t = [], n = 0, r = e.length; n < r; n++) {
    var i = e[n];
    Array.isArray(i) ? t = t.concat(Mr.apply(null, i)) : t.push(i);
  }
  return t;
};
function Fr(e) {
  for (var t = {}, n = 0, r = e.length; n < r; n++)
    t = Ir(t, e[n]);
  return t;
}
function If(e, t) {
  for (var n = {}, r = 0, i = t.length; r < i; r++) {
    var a = rt(t[r]), o = Lt(e, a);
    typeof o != "undefined" && ff(n, a, o);
  }
  return n;
}
function Ha(e, t) {
  for (var n = 0, r = Math.min(e.length, t.length); n < r; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function Bf(e, t) {
  return e.length > t.length ? !1 : Ha(e, t);
}
function Rf(e, t) {
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
function Lf(e) {
  for (var t = {}, n = 0, r = e.length; n < r; n++)
    t[e[n]] = !0;
  return t;
}
function Df(e, t) {
  for (var n = null, r = -1, i = 0, a = e.length; i < a; i++) {
    var o = e[i], s = t(o);
    s > r && (r = s, n = o);
  }
  return n;
}
function Ri(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var n = 0, r = e.length; n < r; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function Nf(e) {
  for (var t = {}, n = 0; n < e.length; n++)
    t["$" + e[n]] = !0;
  return Object.keys(t).map(function(r) {
    return r.substring(1);
  });
}
function Mf(e, t, n) {
  return function(r) {
    if (!(n && !vn(r, n))) {
      for (var i = [], a = 0, o = e.length; a < o; a++) {
        for (var s = rt(e[a]), c = r, g = 0, w = s.length; g < w; g++) {
          var f = s[g];
          if (c = c[f], typeof c == "undefined")
            return;
        }
        i.push(c);
      }
      t(i);
    }
  };
}
function Ff(e, t, n) {
  var r = rt(e);
  return function(i) {
    if (!(n && !vn(i, n))) {
      for (var a = i, o = 0, s = r.length; o < s; o++) {
        var c = r[o];
        if (a = a[c], typeof a == "undefined")
          return;
      }
      t(a);
    }
  };
}
function Uf(e, t, n) {
  return function(r) {
    n && !vn(r, n) || t(r[e]);
  };
}
function Kf(e, t, n) {
  return function(r) {
    if (!(n && !vn(r, n))) {
      for (var i = [], a = 0, o = e.length; a < o; a++)
        i.push(r[e[a]]);
      t(i);
    }
  };
}
function zf(e) {
  for (var t = 0, n = e.length; t < n; t++) {
    var r = e[t];
    if (r.indexOf(".") !== -1)
      return !1;
  }
  return !0;
}
function Qf(e, t, n) {
  var r = zf(e), i = e.length === 1;
  return r ? i ? Uf(e[0], t, n) : Kf(e, t, n) : i ? Ff(e[0], t, n) : Mf(e, t, n);
}
function Jf(e, t) {
  const n = Object.keys(e.fields), r = e.partial_filter_selector;
  return Qf(n, t, r);
}
function Gf() {
  throw new Error("reduce not supported");
}
function Wf(e, t) {
  var n = e.views[t];
  if (!n.map || !n.map.fields)
    throw new Error("ddoc " + e._id + " with view " + t + " doesn't have map.fields defined. maybe it wasn't created by this plugin?");
}
var qn = cf(
  /* localDocName */
  "indexes",
  Jf,
  Gf,
  Wf
);
function Ur(e) {
  return e._customFindAbstractMapper ? {
    // Calls the _customFindAbstractMapper, but with a third argument:
    // the standard findAbstractMapper query/viewCleanup.
    // This allows the indexeddb adapter to support partial_filter_selector.
    query: function(n, r) {
      var i = qn.query.bind(this);
      return e._customFindAbstractMapper.query.call(this, n, r, i);
    },
    viewCleanup: function() {
      var n = qn.viewCleanup.bind(this);
      return e._customFindAbstractMapper.viewCleanup.call(this, n);
    }
  } : qn;
}
function Hf(e) {
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
function Xf(e) {
  var t = [];
  return typeof e == "string" ? t.push(e) : t = e, t.map(function(n) {
    return n.replace("_design/", "");
  });
}
function Xa(e) {
  return e.fields = e.fields.map(function(t) {
    if (typeof t == "string") {
      var n = {};
      return n[t] = "asc", n;
    }
    return t;
  }), e.partial_filter_selector && (e.partial_filter_selector = Nr(e.partial_filter_selector)), e;
}
function Yf(e, t) {
  for (var n = [], r = 0; r < t.def.fields.length; r++) {
    var i = $e(t.def.fields[r]);
    n.push(Lt(e, rt(i)));
  }
  return n;
}
function Zf(e, t, n) {
  for (var r = n.def.fields, i = 0, a = e.length; i < a; i++) {
    var o = e[i], s = Yf(o.doc, n);
    if (r.length === 1)
      s = s[0];
    else
      for (; s.length > t.length; )
        s.pop();
    if (Math.abs(le(s, t)) > 0)
      break;
  }
  return i > 0 ? e.slice(i) : e;
}
function Vf(e) {
  var t = Me(e);
  return delete t.startkey, delete t.endkey, delete t.inclusive_start, delete t.inclusive_end, "endkey" in e && (t.startkey = e.endkey), "startkey" in e && (t.endkey = e.startkey), "inclusive_start" in e && (t.inclusive_end = e.inclusive_start), "inclusive_end" in e && (t.inclusive_start = e.inclusive_end), t;
}
function el(e) {
  var t = e.fields.filter(function(n) {
    return Dr(n) === "asc";
  });
  if (t.length !== 0 && t.length !== e.fields.length)
    throw new Error("unsupported mixed sorting");
}
function tl(e, t) {
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
function nl(e) {
  if (typeof e.selector != "object")
    throw new Error("you must provide a selector when you find()");
}
function rl(e, t) {
  var n = Object.keys(e), r = t ? t.map($e) : [], i;
  return n.length >= r.length ? i = n : i = r, r.length === 0 ? {
    fields: i
  } : (i = i.sort(function(a, o) {
    var s = r.indexOf(a);
    s === -1 && (s = Number.MAX_VALUE);
    var c = r.indexOf(o);
    return c === -1 && (c = Number.MAX_VALUE), s < c ? -1 : s > c ? 1 : 0;
  }), {
    fields: i,
    sortOrder: t.map($e)
  });
}
function il(e, t) {
  t = Wa(t);
  var n = Me(t.index);
  t.index = Xa(t.index), el(t.index);
  var r;
  function i() {
    return r || (r = Fa(JSON.stringify(t)));
  }
  var a = t.name || "idx-" + i(), o = t.ddoc || "idx-" + i(), s = "_design/" + o, c = !1, g = !1;
  function w(f) {
    return f._rev && f.language !== "query" && (c = !0), f.language = "query", f.views = f.views || {}, g = !!f.views[a], g ? !1 : (f.views[a] = {
      map: {
        fields: Fr(t.index.fields),
        partial_filter_selector: t.index.partial_filter_selector
      },
      reduce: "_count",
      options: {
        def: n
      }
    }, f);
  }
  return e.constructor.emit("debug", ["find", "creating index", s]), hn(e, s, w).then(function() {
    if (c)
      throw new Error('invalid language for ddoc with id "' + s + '" (should be "query")');
  }).then(function() {
    var f = o + "/" + a;
    return Ur(e).query.call(e, f, {
      limit: 0,
      reduce: !1
    }).then(function() {
      return {
        id: s,
        name: a,
        result: g ? "exists" : "created"
      };
    });
  });
}
function Ya(e) {
  return e.allDocs({
    startkey: "_design/",
    endkey: "_design/￿",
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
    return n.indexes = Mr(n.indexes, t.rows.filter(function(r) {
      return r.doc.language === "query";
    }).map(function(r) {
      var i = r.doc.views !== void 0 ? Object.keys(r.doc.views) : [];
      return i.map(function(a) {
        var o = r.doc.views[a];
        return {
          ddoc: r.id,
          name: a,
          type: "json",
          def: Xa(o.options.def)
        };
      });
    })), n.indexes.sort(function(r, i) {
      return Lr(r.name, i.name);
    }), n.total_rows = n.indexes.length, n;
  });
}
var an = null, ur = {
  "￿": {}
};
const al = {
  queryOpts: {
    limit: 0,
    startkey: ur,
    endkey: an
  },
  inMemoryFields: []
};
function ol(e, t) {
  for (var n = e.def.fields.map($e), r = 0, i = n.length; r < i; r++) {
    var a = n[r];
    if (t === a)
      return !0;
  }
  return !1;
}
function sl(e, t) {
  var n = e[t], r = $e(n);
  return r !== "$eq";
}
function Za(e, t) {
  var n = t.def.fields.map($e);
  return e.slice().sort(function(r, i) {
    var a = n.indexOf(r), o = n.indexOf(i);
    return a === -1 && (a = Number.MAX_VALUE), o === -1 && (o = Number.MAX_VALUE), Lr(a, o);
  });
}
function ul(e, t, n) {
  n = Za(n, e);
  for (var r = !1, i = 0, a = n.length; i < a; i++) {
    var o = n[i];
    if (r || !ol(e, o))
      return n.slice(i);
    i < a - 1 && sl(t, o) && (r = !0);
  }
  return [];
}
function cl(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    var r = e[n];
    Object.keys(r).forEach(function(i) {
      i === "$ne" && t.push(n);
    });
  }), t;
}
function fl(e, t, n, r) {
  var i = Mr(
    // in-memory fields reported as necessary by the query planner
    e,
    // combine with another pass that checks for any we may have missed
    ul(t, n, r),
    // combine with another pass that checks for $ne's
    cl(n)
  );
  return Za(Nf(i), t);
}
function ll(e, t, n) {
  if (t) {
    var r = Bf(t, e), i = Ha(n, e);
    return r && i;
  }
  return Rf(n, e);
}
var dl = ["$eq", "$gt", "$gte", "$lt", "$lte"];
function Va(e) {
  return dl.indexOf(e) === -1;
}
function hl(e, t) {
  var n = e[0], r = t[n];
  if (typeof r == "undefined")
    return !0;
  var i = Object.keys(r).length === 1 && $e(r) === "$ne";
  return !i;
}
function vl(e, t, n, r) {
  var i = e.def.fields.map($e), a = ll(i, t, n);
  return a ? hl(i, r) : !1;
}
function yl(e, t, n, r) {
  return r.filter(function(i) {
    return vl(i, n, t, e);
  });
}
function pl(e, t, n, r, i) {
  var a = yl(e, t, n, r);
  if (a.length === 0) {
    if (i)
      throw {
        error: "no_usable_index",
        message: "There is no index available for this selector."
      };
    var o = r[0];
    return o.defaultUsed = !0, o;
  }
  if (a.length === 1 && !i)
    return a[0];
  var s = Lf(t);
  function c(m) {
    for (var S = m.def.fields.map($e), A = 0, E = 0, $ = S.length; E < $; E++) {
      var p = S[E];
      s[p] && A++;
    }
    return A;
  }
  if (i) {
    var g = "_design/" + i[0], w = i.length === 2 ? i[1] : !1, f = a.find(function(m) {
      return !!(w && m.ddoc === g && w === m.name || m.ddoc === g);
    });
    if (!f)
      throw {
        error: "unknown_error",
        message: "Could not find that index or could not use that index for the query"
      };
    return f;
  }
  return Df(a, c);
}
function gl(e, t) {
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
    startkey: an
  };
}
function _l(e, t) {
  var n = $e(t.def.fields[0]), r = e[n] || {}, i = [], a = Object.keys(r), o;
  return a.forEach(function(s) {
    Va(s) && i.push(n);
    var c = r[s], g = gl(s, c);
    o ? o = Fr([o, g]) : o = g;
  }), {
    queryOpts: o,
    inMemoryFields: i
  };
}
function ml(e, t) {
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
function wl(e, t) {
  var n = t.def.fields.map($e), r = [], i = [], a = [], o, s;
  function c(P) {
    o !== !1 && i.push(an), s !== !1 && a.push(ur), r = n.slice(P);
  }
  for (var g = 0, w = n.length; g < w; g++) {
    var f = n[g], m = e[f];
    if (!m || !Object.keys(m).length) {
      c(g);
      break;
    } else if (Object.keys(m).some(Va)) {
      c(g);
      break;
    } else if (g > 0) {
      var S = "$gt" in m || "$gte" in m || "$lt" in m || "$lte" in m, A = Object.keys(e[n[g - 1]]), E = Ri(A, ["$eq"]), $ = Ri(A, Object.keys(m)), p = S && !E && !$;
      if (p) {
        c(g);
        break;
      }
    }
    for (var v = Object.keys(m), u = null, l = 0; l < v.length; l++) {
      var y = v[l], _ = m[y], j = ml(y, _);
      u ? u = Fr([u, j]) : u = j;
    }
    i.push("startkey" in u ? u.startkey : an), a.push("endkey" in u ? u.endkey : ur), "inclusive_start" in u && (o = u.inclusive_start), "inclusive_end" in u && (s = u.inclusive_end);
  }
  var I = {
    startkey: i,
    endkey: a
  };
  return typeof o != "undefined" && (I.inclusive_start = o), typeof s != "undefined" && (I.inclusive_end = s), {
    queryOpts: I,
    inMemoryFields: r
  };
}
function bl(e) {
  return Object.keys(e).map(function(n) {
    return e[n];
  }).some(function(n) {
    return typeof n == "object" && Object.keys(n).length === 0;
  });
}
function $l(e) {
  return {
    queryOpts: {
      startkey: null
    },
    inMemoryFields: [Object.keys(e)]
  };
}
function Ol(e, t) {
  return t.defaultUsed ? $l(e) : t.def.fields.length === 1 ? _l(e, t) : wl(e, t);
}
function Sl(e, t) {
  var n = e.selector, r = e.sort;
  if (bl(n))
    return Ir({}, al, {
      index: t[0]
    });
  var i = rl(n, r), a = i.fields, o = i.sortOrder, s = pl(n, a, o, t, e.use_index), c = Ol(n, s), g = c.queryOpts, w = c.inMemoryFields, f = fl(w, s, n, a), m = {
    queryOpts: g,
    index: s,
    inMemoryFields: f
  };
  return m;
}
function kl(e) {
  return e.ddoc.substring(8) + "/" + e.name;
}
function Al(e, t) {
  var n = Me(t);
  return n.descending ? ("endkey" in n && typeof n.endkey != "string" && (n.endkey = ""), "startkey" in n && typeof n.startkey != "string" && (n.limit = 0)) : ("startkey" in n && typeof n.startkey != "string" && (n.startkey = ""), "endkey" in n && typeof n.endkey != "string" && (n.limit = 0)), "key" in n && typeof n.key != "string" && (n.limit = 0), n.limit > 0 && n.indexes_count && (n.original_limit = n.limit, n.limit += n.indexes_count), e.allDocs(n).then(function(r) {
    return r.rows = r.rows.filter(function(i) {
      return !/^_design\//.test(i.id);
    }), n.original_limit && (n.limit = n.original_limit), r.rows = r.rows.slice(0, n.limit), r;
  });
}
function eo(e, t, n) {
  return t.selector && (rn(t.selector, !1), t.selector = Nr(t.selector)), t.sort && (t.sort = Hf(t.sort)), t.use_index && (t.use_index = Xf(t.use_index)), nl(t), Ya(e).then(function(r) {
    e.constructor.emit("debug", ["find", "planning query", t]);
    var i = Sl(t, r.indexes);
    e.constructor.emit("debug", ["find", "query plan", i]);
    var a = i.index;
    tl(t, a);
    var o = Ir({
      include_docs: !0,
      reduce: !1,
      // Add amount of index for doAllDocs to use (related to issue #7810)
      indexes_count: r.total_rows
    }, i.queryOpts);
    if ("startkey" in o && "endkey" in o && le(o.startkey, o.endkey) > 0)
      return {
        docs: []
      };
    var s = t.sort && typeof t.sort[0] != "string" && Dr(t.sort[0]) === "desc";
    return s && (o.descending = !0, o = Vf(o)), i.inMemoryFields.length || ("limit" in t && (o.limit = t.limit), "skip" in t && (o.skip = t.skip)), n ? Promise.resolve(i, o) : Promise.resolve().then(function() {
      if (a.name === "_all_docs")
        return Al(e, o);
      var c = kl(a);
      return Ur(e).query.call(e, c, o);
    }).then(function(c) {
      o.inclusive_start === !1 && (c.rows = Zf(c.rows, o.startkey, a)), i.inMemoryFields.length && (c.rows = Ga(c.rows, t, i.inMemoryFields));
      var g = {
        docs: c.rows.map(function(w) {
          var f = w.doc;
          return t.fields ? If(f, t.fields) : f;
        })
      };
      return a.defaultUsed && (g.warning = "No matching index found, create an index to optimize query time."), g;
    });
  });
}
function xl(e, t) {
  return eo(e, t, !0).then(function(n) {
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
        //hardcoded to match CouchDB since its not supported,
        limit: t.limit,
        skip: t.skip,
        sort: t.sort || {},
        fields: t.fields,
        conflicts: !1,
        //hardcoded to match CouchDB since its not supported,
        r: [49]
        // hardcoded to match CouchDB since its not support
      },
      limit: t.limit,
      skip: t.skip || 0,
      fields: t.fields
    };
  });
}
function El(e, t) {
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
  return hn(e, n, i).then(function() {
    return Ur(e).viewCleanup.apply(e);
  }).then(function() {
    return {
      ok: !0
    };
  });
}
var Cl = Nt(il), Tl = Nt(eo), ql = Nt(xl), jl = Nt(Ya), Pl = Nt(El), _t = {};
_t.createIndex = Rt(function(e, t) {
  if (typeof e != "object")
    return t(new Error("you must provide an index to create"));
  var n = nt(this) ? Ef : Cl;
  n(this, e, t);
});
_t.find = Rt(function(e, t) {
  if (typeof t == "undefined" && (t = e, e = void 0), typeof e != "object")
    return t(new Error("you must provide search parameters to find()"));
  var n = nt(this) ? Cf : Tl;
  n(this, e, t);
});
_t.explain = Rt(function(e, t) {
  if (typeof t == "undefined" && (t = e, e = void 0), typeof e != "object")
    return t(new Error("you must provide search parameters to explain()"));
  var n = nt(this) ? Tf : ql;
  n(this, e, t);
});
_t.getIndexes = Rt(function(e) {
  var t = nt(this) ? qf : jl;
  t(this, e);
});
_t.deleteIndex = Rt(function(e, t) {
  if (typeof e != "object")
    return t(new Error("you must provide an index to delete"));
  var n = nt(this) ? jf : Pl;
  n(this, e, t);
});
var to = {}, Li = window.MutationObserver || window.WebKitMutationObserver, kt;
if (Li) {
  var Di = 0, Il = new Li(Qt), Ni = window.document.createTextNode("");
  Il.observe(Ni, {
    characterData: !0
  }), kt = function() {
    Ni.data = Di = ++Di % 2;
  };
} else if (!window.setImmediate && typeof window.MessageChannel != "undefined") {
  var Mi = new window.MessageChannel();
  Mi.port1.onmessage = Qt, kt = function() {
    Mi.port2.postMessage(0);
  };
} else
  "document" in window && "onreadystatechange" in window.document.createElement("script") ? kt = function() {
    var e = window.document.createElement("script");
    e.onreadystatechange = function() {
      Qt(), e.onreadystatechange = null, e.parentNode.removeChild(e), e = null;
    }, window.document.documentElement.appendChild(e);
  } : kt = function() {
    setTimeout(Qt, 0);
  };
var cr, At = [];
function Qt() {
  cr = !0;
  for (var e, t, n = At.length; n; ) {
    for (t = At, At = [], e = -1; ++e < n; )
      t[e]();
    n = At.length;
  }
  cr = !1;
}
var Bl = Rl;
function Rl(e) {
  At.push(e) === 1 && !cr && kt();
}
var Ll = Bl;
function mt() {
}
var ge = {}, no = ["REJECTED"], fr = ["FULFILLED"], ro = ["PENDING"], Dl = it;
function it(e) {
  if (typeof e != "function")
    throw new TypeError("resolver must be a function");
  this.state = ro, this.queue = [], this.outcome = void 0, e !== mt && io(this, e);
}
it.prototype.catch = function(e) {
  return this.then(null, e);
};
it.prototype.then = function(e, t) {
  if (typeof e != "function" && this.state === fr || typeof t != "function" && this.state === no)
    return this;
  var n = new this.constructor(mt);
  if (this.state !== ro) {
    var r = this.state === fr ? e : t;
    Kr(n, r, this.outcome);
  } else
    this.queue.push(new Mt(n, e, t));
  return n;
};
function Mt(e, t, n) {
  this.promise = e, typeof t == "function" && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), typeof n == "function" && (this.onRejected = n, this.callRejected = this.otherCallRejected);
}
Mt.prototype.callFulfilled = function(e) {
  ge.resolve(this.promise, e);
};
Mt.prototype.otherCallFulfilled = function(e) {
  Kr(this.promise, this.onFulfilled, e);
};
Mt.prototype.callRejected = function(e) {
  ge.reject(this.promise, e);
};
Mt.prototype.otherCallRejected = function(e) {
  Kr(this.promise, this.onRejected, e);
};
function Kr(e, t, n) {
  Ll(function() {
    var r;
    try {
      r = t(n);
    } catch (i) {
      return ge.reject(e, i);
    }
    r === e ? ge.reject(e, new TypeError("Cannot resolve promise with itself")) : ge.resolve(e, r);
  });
}
ge.resolve = function(e, t) {
  var n = ao(Nl, t);
  if (n.status === "error")
    return ge.reject(e, n.value);
  var r = n.value;
  if (r)
    io(e, r);
  else {
    e.state = fr, e.outcome = t;
    for (var i = -1, a = e.queue.length; ++i < a; )
      e.queue[i].callFulfilled(t);
  }
  return e;
};
ge.reject = function(e, t) {
  e.state = no, e.outcome = t;
  for (var n = -1, r = e.queue.length; ++n < r; )
    e.queue[n].callRejected(t);
  return e;
};
function Nl(e) {
  var t = e && e.then;
  if (e && (typeof e == "object" || typeof e == "function") && typeof t == "function")
    return function() {
      t.apply(e, arguments);
    };
}
function io(e, t) {
  var n = !1;
  function r(s) {
    n || (n = !0, ge.reject(e, s));
  }
  function i(s) {
    n || (n = !0, ge.resolve(e, s));
  }
  function a() {
    t(i, r);
  }
  var o = ao(a);
  o.status === "error" && r(o.value);
}
function ao(e, t) {
  var n = {};
  try {
    n.value = e(t), n.status = "success";
  } catch (r) {
    n.status = "error", n.value = r;
  }
  return n;
}
it.resolve = Ml;
function Ml(e) {
  return e instanceof this ? e : ge.resolve(new this(mt), e);
}
it.reject = Fl;
function Fl(e) {
  var t = new this(mt);
  return ge.reject(t, e);
}
it.all = Ul;
function Ul(e) {
  var t = this;
  if (Object.prototype.toString.call(e) !== "[object Array]")
    return this.reject(new TypeError("must be an array"));
  var n = e.length, r = !1;
  if (!n)
    return this.resolve([]);
  for (var i = new Array(n), a = 0, o = -1, s = new this(mt); ++o < n; )
    c(e[o], o);
  return s;
  function c(g, w) {
    t.resolve(g).then(f, function(m) {
      r || (r = !0, ge.reject(s, m));
    });
    function f(m) {
      i[w] = m, ++a === n && !r && (r = !0, ge.resolve(s, i));
    }
  }
}
it.race = Kl;
function Kl(e) {
  var t = this;
  if (Object.prototype.toString.call(e) !== "[object Array]")
    return this.reject(new TypeError("must be an array"));
  var n = e.length, r = !1;
  if (!n)
    return this.resolve([]);
  for (var i = -1, a = new this(mt); ++i < n; )
    o(e[i]);
  return a;
  function o(s) {
    t.resolve(s).then(function(c) {
      r || (r = !0, ge.resolve(a, c));
    }, function(c) {
      r || (r = !0, ge.reject(a, c));
    });
  }
}
var zl = typeof Promise == "function" ? Promise : Dl;
const Ql = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zl
}, Symbol.toStringTag, { value: "Module" })), Jl = /* @__PURE__ */ Fi(Ql);
(function(e) {
  var t = Jl;
  function n(i, a, o) {
    return typeof a != "string" ? t.reject(new Error("doc id is required")) : i.get(a).catch(function(s) {
      if (s.status !== 404)
        throw s;
      return {};
    }).then(function(s) {
      var c = s._rev, g = o(s);
      return g ? (g._id = a, g._rev = c, r(i, g, o)) : {
        updated: !1,
        rev: c,
        id: a
      };
    });
  }
  function r(i, a, o) {
    return i.put(a).then(function(s) {
      return {
        updated: !0,
        rev: s.rev,
        id: a._id
      };
    }, function(s) {
      if (s.status !== 409)
        throw s;
      return n(i, a._id, o);
    });
  }
  e.upsert = function(a, o, s) {
    var c = this, g = n(c, a, o);
    if (typeof s != "function")
      return g;
    g.then(function(w) {
      s(null, w);
    }, s);
  }, e.putIfNotExists = function(a, o, s) {
    var c = this;
    typeof a != "string" && (s = o, o = a, a = o._id);
    var g = function(f) {
      return f._rev ? !1 : o;
    }, w = n(c, a, g);
    if (typeof s != "function")
      return w;
    w.then(function(f) {
      s(null, f);
    }, s);
  }, typeof window != "undefined" && window.PouchDB && window.PouchDB.plugin(e);
})(to);
function gt(...e) {
  return [].concat(...e).filter((t) => !Wl(t) && !Hl(t) && !Yl(t)).flat();
}
function Gl(e = null) {
  const t = new Date();
  return typeof e == "number" && t.setSeconds(t.getSeconds() + e), t;
}
function qt(e, t) {
  if (e instanceof Map)
    return Array.from(e).map(([r, i]) => qt(i, t));
  if (Array.isArray(e))
    return e.map((r) => qt(r, t));
  if (t = gt(t), !t.length)
    return e;
  const n = t.map((r) => Xl(e) ? e[r] : e);
  if (n.length)
    return n.length === 1 ? n.shift() : n;
}
function oo(...e) {
  return [].concat(...e).shift();
}
function Wl(e) {
  return e === !1;
}
function Hl(e) {
  return e === null;
}
function Xl(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function so(e) {
  return typeof e == "string";
}
function Yl(e) {
  return e === void 0;
}
function zr(e, t, n = []) {
  if (e instanceof Map)
    return e;
  if (t === void 0)
    throw new Error(
      "You must specify an attribute for the map's key."
    );
  const r = new Map(
    gt(n).map((i) => [i, void 0])
  );
  return gt(e).reduce((i, a) => {
    const o = typeof t == "function" ? t(a) : a[t];
    return i.set(o, a);
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
function uo(e, ...t) {
  return e instanceof Promise ? e : typeof e == "function" ? Promise.resolve(e(...t)) : Promise.resolve(e);
}
function Qr(e, t = (n) => n) {
  if (e.size)
    return e.size === 1 ? t(e.first()) : Object.fromEntries(
      Array.from(e).map(([n, r]) => [n, t(r)])
    );
}
function lr(e, t) {
  return M(this, null, function* () {
    const n = Object.entries(t);
    for (const [r, i] of n)
      t[r] = i && (yield e.remove(i));
    return Qr(zr(t, "id"));
  });
}
function co(e) {
  e && console.warn(e);
}
const Zl = {
  /**
   * The primary method for interfacing with the cache documents. If a data
   * parameter is passed, the method will set the value to a single key. By
   * specified a length, the cache will expire after the specified date and
   * time. Otherwise, the method will act a getter, which can be used to
   * retrieve one or more documents. If an array of keys (or no keys) are
   * passed, an object of key/value pairs is return. Whereas, if only a single
   * key is passed, the method will just return the literal value.
   * 
   * @param {string|array} key 
   * @param {any} data 
   * @param {Date|number|null} length 
   * @returns {Promise}
   */
  cache(...e) {
    return M(this, null, function* () {
      const [t, n, r] = e;
      yield this.clearExpiredCache(t);
      const i = yield this.findCache(t);
      if (e.length <= 1 || i.length) {
        const g = zr(i, "_id", t);
        return Qr(g, (w) => qt(w, "$value"));
      }
      if (!so(t))
        throw new Error(
          "The key must be a string when cache() is being used a setter."
        );
      const a = r instanceof Date ? r : typeof r == "number" ? Gl(r) : null;
      let o = yield uo(n);
      o !== void 0 && (o = JSON.parse(JSON.stringify(o)));
      const { _rev: s } = oo(i) || {}, c = Object.assign({
        _id: t,
        _rev: s,
        $value: o,
        $expiredAt: a
      });
      return yield this.upsert(t, (g) => {
        if (Object.keys(on(c, g)).length > 0)
          return c;
      }), o;
    });
  },
  /**
   * Build the cache selector for the pouch-find plugin.
   * 
   * @param {string|array} key
   * @param {Date|number|null} expiration
   * @param {boolean} showExpired
   * @returns {object}
   */
  cacheSelector(e = [], t = null, n = !1) {
    return {
      selector: this.mergeCacheExpirationSelector({
        // If the keys array is empty, include all keys in the search
        _id: {
          [e.length ? "$in" : "$nin"]: e
        },
        // Check for the `$expiredAt` property, which ensures the doc is a
        // cached document.
        $expiredAt: {
          $exists: !0
        },
        // Check for the `$value` property, which ensures the doc is a
        // cached document
        $value: {
          $exists: !0
        }
      }, t, n)
    };
  },
  /**
   * Clear the expired cache using the specified keys
   * 
   * @param {string|array} key 
   * @returns {Promise}
   */
  clearExpiredCache(e) {
    return M(this, null, function* () {
      const t = yield this.findCache(gt(e), new Date(), !0);
      return yield Promise.all(
        Object.entries(t).map(([n, r]) => r && this.remove(r._id, r._rev))
      );
    });
  },
  /**
   * Create the cache database index.
   * 
   * @returns {Promise}
   */
  createCacheIndex() {
    return M(this, null, function* () {
      return yield this.createIndex({
        index: {
          fields: ["$expiredAt", "$value"]
        }
      });
    });
  },
  /**
   * Find the cache documents using the specified keys. This methods defaults
   * to only returning documents that have not expired using the current date
   * and time.
   * 
   * @param {string|array} key
   * @param {Date|number|null} expiration
   * @param {boolean} showExpired
   * @returns {Promise}
   */
  findCache(e = void 0, t = void 0, n = !1) {
    return M(this, null, function* () {
      t === void 0 && (t = new Date());
      const { docs: r, warning: i } = yield this.find(
        this.cacheSelector(gt(e), t, n)
      );
      return co(i), r;
    });
  },
  /**
   * Find the expired cache relative to the specified date and time. If no
   * expired specified, then use the current date and time.
   * 
   * @param {string|array} key
   * @param {Date|number|null} expiration
   * @returns {Promise}
   */
  findExpiredCache(e, t = null) {
    return M(this, null, function* () {
      return yield this.findCache(e, !0, t || new Date());
    });
  },
  /**
   * Merge the expiration selector with the subject.
   * 
   * @param {object} subject
   * @param {Date|number|null} expiration
   * @param {boolean} showExpired
   * @returns {object}
   */
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
  /**
   * Remove the cache documents using the specified key(s). This method is an
   * alias to `removeCache()` to keep the naming consistent, but also
   * backwards compatible with previous versions.
   * 
   * @alias removeCache
   * @param {array|string} key 
   * @returns {Promise}
   */
  purge(e) {
    return M(this, null, function* () {
      return yield lr(this, yield this.findCache(e));
    });
  },
  /**
   * Remove the cache documents using the specified key(s).
   * 
   * @param {array|string} key 
   * @returns {Promise}
   */
  removeCache(e) {
    return M(this, null, function* () {
      return yield lr(this, yield this.findCache(e));
    });
  }
}, Vl = {
  /**
   * The primary method for interfacing with the config documents. If a data
   * parameter is passed, the method will set the value to a single key.
   * Otherwise, the method will act a getter, which can be used to retrieve
   * one or more documents. If an array of keys (or no keys) are passed, an
   * an object of key/value pairs is return. Whereas, if only a single key is
   * passed, the method will just return the literal value.
   * 
   * @param {array|string} key
   * @param {any} data
   * @returns {Promise}
   */
  config(...e) {
    return M(this, null, function* () {
      const [t, n] = e, r = yield this.findConfig(t);
      if (e.length <= 1) {
        const s = zr(r, "_id", t);
        return Qr(s, (c) => qt(c, "$value"));
      }
      if (!so(t))
        throw new Error(
          "The key must be a string when config() is being used a setter."
        );
      let i = yield uo(n);
      i !== void 0 && (i = JSON.parse(JSON.stringify(i)));
      const { _rev: a } = oo(r) || {}, o = Object.assign({
        _id: t,
        _rev: a,
        $value: i,
        $config: !0
      });
      return yield this.upsert(t, (s) => {
        if (Object.keys(on(o, s)).length > 0)
          return o;
      }), i;
    });
  },
  /**
   * Build the config selector for the pouch-find plugin.
   * 
   * @param {array} key 
   * @returns {object}
   */
  configSelector(e = []) {
    return {
      selector: {
        // If the keys array is empty, include all keys in the search
        _id: {
          [e.length ? "$in" : "$nin"]: e
        },
        // Check for the `$expiredAt` property, which ensures the doc is
        // a  config document.
        $config: {
          $exists: !0
        }
      }
    };
  },
  /**
   * Create the config database index.
   * 
   * @returns {Promise}
   */
  createConfigIndex() {
    return M(this, null, function* () {
      return yield this.createIndex({
        index: {
          fields: ["$config"]
        }
      });
    });
  },
  /**
   * Find the config documents using the specified keys.
   * 
   * @param {array|string} key 
   * @returns {Promise}
   */
  findConfig(e) {
    return M(this, null, function* () {
      const { docs: t, warning: n } = yield this.find(
        this.configSelector(gt(e))
      );
      return co(n), t;
    });
  },
  /**
   * Remove the config documents using the specified key(s).
   * 
   * @param {array|string} key 
   * @returns {Promise}
   */
  removeConfig(e) {
    return M(this, null, function* () {
      return yield lr(this, yield this.findConfig(e));
    });
  }
};
X.plugin(_t);
X.plugin(to);
X.plugin(Zl);
X.plugin(Vl);
let xe;
function Fe() {
  if (!xe)
    throw new Error(
      "You must initialize with init() before accessing the database."
    );
  return !0;
}
function fd(e, t) {
  return xe || (xe = new X(e, t));
}
function ld() {
  return M(this, null, function* () {
    return Fe() && {
      // @ts-ignore
      cache: yield xe.createCacheIndex(),
      // @ts-ignore
      config: yield xe.createConfigIndex()
    };
  });
}
function dd() {
  return M(this, null, function* () {
    return Fe() && (yield xe.createCacheIndex());
  });
}
function hd() {
  return M(this, null, function* () {
    return Fe() && (yield xe.createConfigIndex());
  });
}
function vd(...e) {
  return M(this, null, function* () {
    return Fe() && (yield xe.cache(...e));
  });
}
function yd(...e) {
  return M(this, null, function* () {
    return Fe() && (yield xe.config(...e));
  });
}
function pd(...e) {
  return M(this, null, function* () {
    return Fe() && (yield xe.purge(...e));
  });
}
function gd(...e) {
  return M(this, null, function* () {
    return Fe() && (yield xe.removeCache(...e));
  });
}
function _d(...e) {
  return M(this, null, function* () {
    return Fe() && (yield xe.removeConfig(...e));
  });
}
export {
  vd as cache,
  yd as config,
  dd as createCacheIndex,
  hd as createConfigIndex,
  ld as createIndex,
  rd as createPouchApp,
  go as createPouchLoader,
  xe as db,
  fd as init,
  po as load,
  pd as purge,
  gd as removeCache,
  _d as removeConfig,
  nd as usePouchPlugin
};
