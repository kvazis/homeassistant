/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function t(t, e, n, r) {
  var s,
      i = arguments.length,
      o = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, n, r);else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (o = (i < 3 ? s(o) : i > 3 ? s(e, n, o) : s(e, n)) || o);return i > 3 && o && Object.defineProperty(e, n, o), o;
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
}const e = "undefined" != typeof window && null != window.customElements && void 0 !== window.customElements.polyfillWrapFlushCallback,
      n = (t, e, n = null) => {
  for (; e !== n;) {
    const n = e.nextSibling;t.removeChild(e), e = n;
  }
},
      r = `{{lit-${String(Math.random()).slice(2)}}}`,
      s = `\x3c!--${r}--\x3e`,
      i = new RegExp(`${r}|${s}`);class o {
  constructor(t, e) {
    this.parts = [], this.element = e;const n = [],
          s = [],
          o = document.createTreeWalker(e.content, 133, null, !1);let l = 0,
        h = -1,
        u = 0;const { strings: p, values: { length: m } } = t;for (; u < m;) {
      const t = o.nextNode();if (null !== t) {
        if (h++, 1 === t.nodeType) {
          if (t.hasAttributes()) {
            const e = t.attributes,
                  { length: n } = e;let r = 0;for (let t = 0; t < n; t++) a(e[t].name, "$lit$") && r++;for (; r-- > 0;) {
              const e = p[u],
                    n = d.exec(e)[2],
                    r = n.toLowerCase() + "$lit$",
                    s = t.getAttribute(r);t.removeAttribute(r);const o = s.split(i);this.parts.push({ type: "attribute", index: h, name: n, strings: o }), u += o.length - 1;
            }
          }"TEMPLATE" === t.tagName && (s.push(t), o.currentNode = t.content);
        } else if (3 === t.nodeType) {
          const e = t.data;if (e.indexOf(r) >= 0) {
            const r = t.parentNode,
                  s = e.split(i),
                  o = s.length - 1;for (let e = 0; e < o; e++) {
              let n,
                  i = s[e];if ("" === i) n = c();else {
                const t = d.exec(i);null !== t && a(t[2], "$lit$") && (i = i.slice(0, t.index) + t[1] + t[2].slice(0, -"$lit$".length) + t[3]), n = document.createTextNode(i);
              }r.insertBefore(n, t), this.parts.push({ type: "node", index: ++h });
            }"" === s[o] ? (r.insertBefore(c(), t), n.push(t)) : t.data = s[o], u += o;
          }
        } else if (8 === t.nodeType) if (t.data === r) {
          const e = t.parentNode;null !== t.previousSibling && h !== l || (h++, e.insertBefore(c(), t)), l = h, this.parts.push({ type: "node", index: h }), null === t.nextSibling ? t.data = "" : (n.push(t), h--), u++;
        } else {
          let e = -1;for (; -1 !== (e = t.data.indexOf(r, e + 1));) this.parts.push({ type: "node", index: -1 }), u++;
        }
      } else o.currentNode = s.pop();
    }for (const t of n) t.parentNode.removeChild(t);
  }
}const a = (t, e) => {
  const n = t.length - e.length;return n >= 0 && t.slice(n) === e;
},
      l = t => -1 !== t.index,
      c = () => document.createComment(""),
      d = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(t, e) {
  const { element: { content: n }, parts: r } = t,
        s = document.createTreeWalker(n, 133, null, !1);let i = p(r),
      o = r[i],
      a = -1,
      l = 0;const c = [];let d = null;for (; s.nextNode();) {
    a++;const t = s.currentNode;for (t.previousSibling === d && (d = null), e.has(t) && (c.push(t), null === d && (d = t)), null !== d && l++; void 0 !== o && o.index === a;) o.index = null !== d ? -1 : o.index - l, i = p(r, i), o = r[i];
  }c.forEach(t => t.parentNode.removeChild(t));
}const u = t => {
  let e = 11 === t.nodeType ? 0 : 1;const n = document.createTreeWalker(t, 133, null, !1);for (; n.nextNode();) e++;return e;
},
      p = (t, e = -1) => {
  for (let n = e + 1; n < t.length; n++) {
    const e = t[n];if (l(e)) return n;
  }return -1;
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const m = new WeakMap(),
      f = t => "function" == typeof t && m.has(t),
      g = {},
      _ = {};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class y {
  constructor(t, e, n) {
    this.__parts = [], this.template = t, this.processor = e, this.options = n;
  }update(t) {
    let e = 0;for (const n of this.__parts) void 0 !== n && n.setValue(t[e]), e++;for (const t of this.__parts) void 0 !== t && t.commit();
  }_clone() {
    const t = e ? this.template.element.content.cloneNode(!0) : document.importNode(this.template.element.content, !0),
          n = [],
          r = this.template.parts,
          s = document.createTreeWalker(t, 133, null, !1);let i,
        o = 0,
        a = 0,
        c = s.nextNode();for (; o < r.length;) if (i = r[o], l(i)) {
      for (; a < i.index;) a++, "TEMPLATE" === c.nodeName && (n.push(c), s.currentNode = c.content), null === (c = s.nextNode()) && (s.currentNode = n.pop(), c = s.nextNode());if ("node" === i.type) {
        const t = this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling), this.__parts.push(t);
      } else this.__parts.push(...this.processor.handleAttributeExpressions(c, i.name, i.strings, this.options));o++;
    } else this.__parts.push(void 0), o++;return e && (document.adoptNode(t), customElements.upgrade(t)), t;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const v = ` ${r} `;class S {
  constructor(t, e, n, r) {
    this.strings = t, this.values = e, this.type = n, this.processor = r;
  }getHTML() {
    const t = this.strings.length - 1;let e = "",
        n = !1;for (let i = 0; i < t; i++) {
      const t = this.strings[i],
            o = t.lastIndexOf("\x3c!--");n = (o > -1 || n) && -1 === t.indexOf("--\x3e", o + 1);const a = d.exec(t);e += null === a ? t + (n ? v : s) : t.substr(0, a.index) + a[1] + a[2] + "$lit$" + a[3] + r;
    }return e += this.strings[t], e;
  }getTemplateElement() {
    const t = document.createElement("template");return t.innerHTML = this.getHTML(), t;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const w = t => null === t || !("object" == typeof t || "function" == typeof t),
      b = t => Array.isArray(t) || !(!t || !t[Symbol.iterator]);class C {
  constructor(t, e, n) {
    this.dirty = !0, this.element = t, this.name = e, this.strings = n, this.parts = [];for (let t = 0; t < n.length - 1; t++) this.parts[t] = this._createPart();
  }_createPart() {
    return new P(this);
  }_getValue() {
    const t = this.strings,
          e = t.length - 1;let n = "";for (let r = 0; r < e; r++) {
      n += t[r];const e = this.parts[r];if (void 0 !== e) {
        const t = e.value;if (w(t) || !b(t)) n += "string" == typeof t ? t : String(t);else for (const e of t) n += "string" == typeof e ? e : String(e);
      }
    }return n += t[e], n;
  }commit() {
    this.dirty && (this.dirty = !1, this.element.setAttribute(this.name, this._getValue()));
  }
}class P {
  constructor(t) {
    this.value = void 0, this.committer = t;
  }setValue(t) {
    t === g || w(t) && t === this.value || (this.value = t, f(t) || (this.committer.dirty = !0));
  }commit() {
    for (; f(this.value);) {
      const t = this.value;this.value = g, t(this);
    }this.value !== g && this.committer.commit();
  }
}class N {
  constructor(t) {
    this.value = void 0, this.__pendingValue = void 0, this.options = t;
  }appendInto(t) {
    this.startNode = t.appendChild(c()), this.endNode = t.appendChild(c());
  }insertAfterNode(t) {
    this.startNode = t, this.endNode = t.nextSibling;
  }appendIntoPart(t) {
    t.__insert(this.startNode = c()), t.__insert(this.endNode = c());
  }insertAfterPart(t) {
    t.__insert(this.startNode = c()), this.endNode = t.endNode, t.endNode = this.startNode;
  }setValue(t) {
    this.__pendingValue = t;
  }commit() {
    if (null === this.startNode.parentNode) return;for (; f(this.__pendingValue);) {
      const t = this.__pendingValue;this.__pendingValue = g, t(this);
    }const t = this.__pendingValue;t !== g && (w(t) ? t !== this.value && this.__commitText(t) : t instanceof S ? this.__commitTemplateResult(t) : t instanceof Node ? this.__commitNode(t) : b(t) ? this.__commitIterable(t) : t === _ ? (this.value = _, this.clear()) : this.__commitText(t));
  }__insert(t) {
    this.endNode.parentNode.insertBefore(t, this.endNode);
  }__commitNode(t) {
    this.value !== t && (this.clear(), this.__insert(t), this.value = t);
  }__commitText(t) {
    const e = this.startNode.nextSibling,
          n = "string" == typeof (t = null == t ? "" : t) ? t : String(t);e === this.endNode.previousSibling && 3 === e.nodeType ? e.data = n : this.__commitNode(document.createTextNode(n)), this.value = t;
  }__commitTemplateResult(t) {
    const e = this.options.templateFactory(t);if (this.value instanceof y && this.value.template === e) this.value.update(t.values);else {
      const n = new y(e, t.processor, this.options),
            r = n._clone();n.update(t.values), this.__commitNode(r), this.value = n;
    }
  }__commitIterable(t) {
    Array.isArray(this.value) || (this.value = [], this.clear());const e = this.value;let n,
        r = 0;for (const s of t) n = e[r], void 0 === n && (n = new N(this.options), e.push(n), 0 === r ? n.appendIntoPart(this) : n.insertAfterPart(e[r - 1])), n.setValue(s), n.commit(), r++;r < e.length && (e.length = r, this.clear(n && n.endNode));
  }clear(t = this.startNode) {
    n(this.startNode.parentNode, t.nextSibling, this.endNode);
  }
}class x {
  constructor(t, e, n) {
    if (this.value = void 0, this.__pendingValue = void 0, 2 !== n.length || "" !== n[0] || "" !== n[1]) throw new Error("Boolean attributes can only contain a single expression");this.element = t, this.name = e, this.strings = n;
  }setValue(t) {
    this.__pendingValue = t;
  }commit() {
    for (; f(this.__pendingValue);) {
      const t = this.__pendingValue;this.__pendingValue = g, t(this);
    }if (this.__pendingValue === g) return;const t = !!this.__pendingValue;this.value !== t && (t ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name), this.value = t), this.__pendingValue = g;
  }
}class M extends C {
  constructor(t, e, n) {
    super(t, e, n), this.single = 2 === n.length && "" === n[0] && "" === n[1];
  }_createPart() {
    return new E(this);
  }_getValue() {
    return this.single ? this.parts[0].value : super._getValue();
  }commit() {
    this.dirty && (this.dirty = !1, this.element[this.name] = this._getValue());
  }
}class E extends P {}let T = !1;(() => {
  try {
    const t = { get capture() {
        return T = !0, !1;
      } };window.addEventListener("test", t, t), window.removeEventListener("test", t, t);
  } catch (t) {}
})();class A {
  constructor(t, e, n) {
    this.value = void 0, this.__pendingValue = void 0, this.element = t, this.eventName = e, this.eventContext = n, this.__boundHandleEvent = t => this.handleEvent(t);
  }setValue(t) {
    this.__pendingValue = t;
  }commit() {
    for (; f(this.__pendingValue);) {
      const t = this.__pendingValue;this.__pendingValue = g, t(this);
    }if (this.__pendingValue === g) return;const t = this.__pendingValue,
          e = this.value,
          n = null == t || null != e && (t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive),
          r = null != t && (null == e || n);n && this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options), r && (this.__options = D(t), this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options)), this.value = t, this.__pendingValue = g;
  }handleEvent(t) {
    "function" == typeof this.value ? this.value.call(this.eventContext || this.element, t) : this.value.handleEvent(t);
  }
}const D = t => t && (T ? { capture: t.capture, passive: t.passive, once: t.once } : t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function k(t) {
  let e = V.get(t.type);void 0 === e && (e = { stringsArray: new WeakMap(), keyString: new Map() }, V.set(t.type, e));let n = e.stringsArray.get(t.strings);if (void 0 !== n) return n;const s = t.strings.join(r);return n = e.keyString.get(s), void 0 === n && (n = new o(t, t.getTemplateElement()), e.keyString.set(s, n)), e.stringsArray.set(t.strings, n), n;
}const V = new Map(),
      O = new WeakMap();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const Y = new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class {
  handleAttributeExpressions(t, e, n, r) {
    const s = e[0];if ("." === s) {
      return new M(t, e.slice(1), n).parts;
    }return "@" === s ? [new A(t, e.slice(1), r.eventContext)] : "?" === s ? [new x(t, e.slice(1), n)] : new C(t, e, n).parts;
  }handleTextExpression(t) {
    return new N(t);
  }
}();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined" != typeof window && (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.2.1");const R = (t, ...e) => new S(t, e, "html", Y)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,
      U = (t, e) => `${t}--${e}`;let H = !0;void 0 === window.ShadyCSS ? H = !1 : void 0 === window.ShadyCSS.prepareTemplateDom && (console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."), H = !1);const j = t => e => {
  const n = U(e.type, t);let s = V.get(n);void 0 === s && (s = { stringsArray: new WeakMap(), keyString: new Map() }, V.set(n, s));let i = s.stringsArray.get(e.strings);if (void 0 !== i) return i;const a = e.strings.join(r);if (i = s.keyString.get(a), void 0 === i) {
    const n = e.getTemplateElement();H && window.ShadyCSS.prepareTemplateDom(n, t), i = new o(e, n), s.keyString.set(a, i);
  }return s.stringsArray.set(e.strings, i), i;
},
      F = ["html", "svg"],
      $ = new Set(),
      z = (t, e, n) => {
  $.add(t);const r = n ? n.element : document.createElement("template"),
        s = e.querySelectorAll("style"),
        { length: i } = s;if (0 === i) return void window.ShadyCSS.prepareTemplateStyles(r, t);const o = document.createElement("style");for (let t = 0; t < i; t++) {
    const e = s[t];e.parentNode.removeChild(e), o.textContent += e.textContent;
  }(t => {
    F.forEach(e => {
      const n = V.get(U(e, t));void 0 !== n && n.keyString.forEach(t => {
        const { element: { content: e } } = t,
              n = new Set();Array.from(e.querySelectorAll("style")).forEach(t => {
          n.add(t);
        }), h(t, n);
      });
    });
  })(t);const a = r.content;n ? function (t, e, n = null) {
    const { element: { content: r }, parts: s } = t;if (null == n) return void r.appendChild(e);const i = document.createTreeWalker(r, 133, null, !1);let o = p(s),
        a = 0,
        l = -1;for (; i.nextNode();) {
      for (l++, i.currentNode === n && (a = u(e), n.parentNode.insertBefore(e, n)); -1 !== o && s[o].index === l;) {
        if (a > 0) {
          for (; -1 !== o;) s[o].index += a, o = p(s, o);return;
        }o = p(s, o);
      }
    }
  }(n, o, a.firstChild) : a.insertBefore(o, a.firstChild), window.ShadyCSS.prepareTemplateStyles(r, t);const l = a.querySelector("style");if (window.ShadyCSS.nativeShadow && null !== l) e.insertBefore(l.cloneNode(!0), e.firstChild);else if (n) {
    a.insertBefore(o, a.firstChild);const t = new Set();t.add(o), h(n, t);
  }
};window.JSCompiler_renameProperty = (t, e) => t;const q = { toAttribute(t, e) {
    switch (e) {case Boolean:
        return t ? "" : null;case Object:case Array:
        return null == t ? t : JSON.stringify(t);}return t;
  }, fromAttribute(t, e) {
    switch (e) {case Boolean:
        return null !== t;case Number:
        return null === t ? null : Number(t);case Object:case Array:
        return JSON.parse(t);}return t;
  } },
      L = (t, e) => e !== t && (e == e || t == t),
      I = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: L };class B extends HTMLElement {
  constructor() {
    super(), this._updateState = 0, this._instanceProperties = void 0, this._updatePromise = new Promise(t => this._enableUpdatingResolver = t), this._changedProperties = new Map(), this._reflectingProperties = void 0, this.initialize();
  }static get observedAttributes() {
    this.finalize();const t = [];return this._classProperties.forEach((e, n) => {
      const r = this._attributeNameForProperty(n, e);void 0 !== r && (this._attributeToPropertyMap.set(r, n), t.push(r));
    }), t;
  }static _ensureClassProperties() {
    if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
      this._classProperties = new Map();const t = Object.getPrototypeOf(this)._classProperties;void 0 !== t && t.forEach((t, e) => this._classProperties.set(e, t));
    }
  }static createProperty(t, e = I) {
    if (this._ensureClassProperties(), this._classProperties.set(t, e), e.noAccessor || this.prototype.hasOwnProperty(t)) return;const n = "symbol" == typeof t ? Symbol() : `__${t}`,
          r = this.getPropertyDescriptor(t, n, e);void 0 !== r && Object.defineProperty(this.prototype, t, r);
  }static getPropertyDescriptor(t, e, n) {
    return { get() {
        return this[e];
      }, set(n) {
        const r = this[t];this[e] = n, this._requestUpdate(t, r);
      }, configurable: !0, enumerable: !0 };
  }static getPropertyOptions(t) {
    return this._classProperties && this._classProperties.get(t) || I;
  }static finalize() {
    const t = Object.getPrototypeOf(this);if (t.hasOwnProperty("finalized") || t.finalize(), this.finalized = !0, this._ensureClassProperties(), this._attributeToPropertyMap = new Map(), this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
      const t = this.properties,
            e = [...Object.getOwnPropertyNames(t), ...("function" == typeof Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t) : [])];for (const n of e) this.createProperty(n, t[n]);
    }
  }static _attributeNameForProperty(t, e) {
    const n = e.attribute;return !1 === n ? void 0 : "string" == typeof n ? n : "string" == typeof t ? t.toLowerCase() : void 0;
  }static _valueHasChanged(t, e, n = L) {
    return n(t, e);
  }static _propertyValueFromAttribute(t, e) {
    const n = e.type,
          r = e.converter || q,
          s = "function" == typeof r ? r : r.fromAttribute;return s ? s(t, n) : t;
  }static _propertyValueToAttribute(t, e) {
    if (void 0 === e.reflect) return;const n = e.type,
          r = e.converter;return (r && r.toAttribute || q.toAttribute)(t, n);
  }initialize() {
    this._saveInstanceProperties(), this._requestUpdate();
  }_saveInstanceProperties() {
    this.constructor._classProperties.forEach((t, e) => {
      if (this.hasOwnProperty(e)) {
        const t = this[e];delete this[e], this._instanceProperties || (this._instanceProperties = new Map()), this._instanceProperties.set(e, t);
      }
    });
  }_applyInstanceProperties() {
    this._instanceProperties.forEach((t, e) => this[e] = t), this._instanceProperties = void 0;
  }connectedCallback() {
    this.enableUpdating();
  }enableUpdating() {
    void 0 !== this._enableUpdatingResolver && (this._enableUpdatingResolver(), this._enableUpdatingResolver = void 0);
  }disconnectedCallback() {}attributeChangedCallback(t, e, n) {
    e !== n && this._attributeToProperty(t, n);
  }_propertyToAttribute(t, e, n = I) {
    const r = this.constructor,
          s = r._attributeNameForProperty(t, n);if (void 0 !== s) {
      const t = r._propertyValueToAttribute(e, n);if (void 0 === t) return;this._updateState = 8 | this._updateState, null == t ? this.removeAttribute(s) : this.setAttribute(s, t), this._updateState = -9 & this._updateState;
    }
  }_attributeToProperty(t, e) {
    if (8 & this._updateState) return;const n = this.constructor,
          r = n._attributeToPropertyMap.get(t);if (void 0 !== r) {
      const t = n.getPropertyOptions(r);this._updateState = 16 | this._updateState, this[r] = n._propertyValueFromAttribute(e, t), this._updateState = -17 & this._updateState;
    }
  }_requestUpdate(t, e) {
    let n = !0;if (void 0 !== t) {
      const r = this.constructor,
            s = r.getPropertyOptions(t);r._valueHasChanged(this[t], e, s.hasChanged) ? (this._changedProperties.has(t) || this._changedProperties.set(t, e), !0 !== s.reflect || 16 & this._updateState || (void 0 === this._reflectingProperties && (this._reflectingProperties = new Map()), this._reflectingProperties.set(t, s))) : n = !1;
    }!this._hasRequestedUpdate && n && (this._updatePromise = this._enqueueUpdate());
  }requestUpdate(t, e) {
    return this._requestUpdate(t, e), this.updateComplete;
  }async _enqueueUpdate() {
    this._updateState = 4 | this._updateState;try {
      await this._updatePromise;
    } catch (t) {}const t = this.performUpdate();return null != t && (await t), !this._hasRequestedUpdate;
  }get _hasRequestedUpdate() {
    return 4 & this._updateState;
  }get hasUpdated() {
    return 1 & this._updateState;
  }performUpdate() {
    this._instanceProperties && this._applyInstanceProperties();let t = !1;const e = this._changedProperties;try {
      t = this.shouldUpdate(e), t ? this.update(e) : this._markUpdated();
    } catch (e) {
      throw t = !1, this._markUpdated(), e;
    }t && (1 & this._updateState || (this._updateState = 1 | this._updateState, this.firstUpdated(e)), this.updated(e));
  }_markUpdated() {
    this._changedProperties = new Map(), this._updateState = -5 & this._updateState;
  }get updateComplete() {
    return this._getUpdateComplete();
  }_getUpdateComplete() {
    return this._updatePromise;
  }shouldUpdate(t) {
    return !0;
  }update(t) {
    void 0 !== this._reflectingProperties && this._reflectingProperties.size > 0 && (this._reflectingProperties.forEach((t, e) => this._propertyToAttribute(e, this[e], t)), this._reflectingProperties = void 0), this._markUpdated();
  }updated(t) {}firstUpdated(t) {}
}B.finalized = !0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const W = (t, e) => "method" === e.kind && e.descriptor && !("value" in e.descriptor) ? Object.assign(Object.assign({}, e), { finisher(n) {
    n.createProperty(e.key, t);
  } }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, initializer() {
    "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this));
  }, finisher(n) {
    n.createProperty(e.key, t);
  } };function J(t) {
  return (e, n) => void 0 !== n ? ((t, e, n) => {
    e.constructor.createProperty(n, t);
  })(t, e, n) : W(t, e);
}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const Z = "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */(window.litElementVersions || (window.litElementVersions = [])).push("2.3.1");const K = {};class G extends B {
  static getStyles() {
    return this.styles;
  }static _getUniqueStyles() {
    if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this))) return;const t = this.getStyles();if (void 0 === t) this._styles = [];else if (Array.isArray(t)) {
      const e = (t, n) => t.reduceRight((t, n) => Array.isArray(n) ? e(n, t) : (t.add(n), t), n),
            n = e(t, new Set()),
            r = [];n.forEach(t => r.unshift(t)), this._styles = r;
    } else this._styles = [t];
  }initialize() {
    super.initialize(), this.constructor._getUniqueStyles(), this.renderRoot = this.createRenderRoot(), window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot && this.adoptStyles();
  }createRenderRoot() {
    return this.attachShadow({ mode: "open" });
  }adoptStyles() {
    const t = this.constructor._styles;0 !== t.length && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow ? Z ? this.renderRoot.adoptedStyleSheets = t.map(t => t.styleSheet) : this._needsShimAdoptedStyleSheets = !0 : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t => t.cssText), this.localName));
  }connectedCallback() {
    super.connectedCallback(), this.hasUpdated && void 0 !== window.ShadyCSS && window.ShadyCSS.styleElement(this);
  }update(t) {
    const e = this.render();super.update(t), e !== K && this.constructor.render(e, this.renderRoot, { scopeName: this.localName, eventContext: this }), this._needsShimAdoptedStyleSheets && (this._needsShimAdoptedStyleSheets = !1, this.constructor._styles.forEach(t => {
      const e = document.createElement("style");e.textContent = t.cssText, this.renderRoot.appendChild(e);
    }));
  }render() {
    return K;
  }
}G.finalized = !0, G.render = (t, e, r) => {
  if (!r || "object" != typeof r || !r.scopeName) throw new Error("The `scopeName` option is required.");const s = r.scopeName,
        i = O.has(e),
        o = H && 11 === e.nodeType && !!e.host,
        a = o && !$.has(s),
        l = a ? document.createDocumentFragment() : e;if (((t, e, r) => {
    let s = O.get(e);void 0 === s && (n(e, e.firstChild), O.set(e, s = new N(Object.assign({ templateFactory: k }, r))), s.appendInto(e)), s.setValue(t), s.commit();
  })(t, l, Object.assign({ templateFactory: j(s) }, r)), a) {
    const t = O.get(l);O.delete(l);const r = t.value instanceof y ? t.value.template : void 0;z(s, l, r), n(e, e.firstChild), e.appendChild(l), O.set(e, t);
  }!i && o && window.ShadyCSS.styleElement(e.host);
};
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const Q = new WeakMap(),
      X = (tt = t => e => {
  const n = Q.get(e);if (void 0 === t && e instanceof P) {
    if (void 0 !== n || !Q.has(e)) {
      const t = e.committer.name;e.committer.element.removeAttribute(t);
    }
  } else t !== n && e.setValue(t);Q.set(e, t);
}, (...t) => {
  const e = tt(...t);return m.set(e, !0), e;
});var tt,
    et = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,
    nt = "[^\\s]+",
    rt = /\[([^]*?)\]/gm;function st(t, e) {
  for (var n = [], r = 0, s = t.length; r < s; r++) n.push(t[r].substr(0, e));return n;
}var it = function (t) {
  return function (e, n) {
    var r = n[t].map(function (t) {
      return t.toLowerCase();
    }).indexOf(e.toLowerCase());return r > -1 ? r : null;
  };
};function ot(t) {
  for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];for (var r = 0, s = e; r < s.length; r++) {
    var i = s[r];for (var o in i) t[o] = i[o];
  }return t;
}var at = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    lt = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    ct = st(lt, 3),
    dt = { dayNamesShort: st(at, 3), dayNames: at, monthNamesShort: ct, monthNames: lt, amPm: ["am", "pm"], DoFn: function (t) {
    return t + ["th", "st", "nd", "rd"][t % 10 > 3 ? 0 : (t - t % 10 != 10 ? 1 : 0) * t % 10];
  } },
    ht = ot({}, dt),
    ut = function (t, e) {
  for (void 0 === e && (e = 2), t = String(t); t.length < e;) t = "0" + t;return t;
},
    pt = { D: function (t) {
    return String(t.getDate());
  }, DD: function (t) {
    return ut(t.getDate());
  }, Do: function (t, e) {
    return e.DoFn(t.getDate());
  }, d: function (t) {
    return String(t.getDay());
  }, dd: function (t) {
    return ut(t.getDay());
  }, ddd: function (t, e) {
    return e.dayNamesShort[t.getDay()];
  }, dddd: function (t, e) {
    return e.dayNames[t.getDay()];
  }, M: function (t) {
    return String(t.getMonth() + 1);
  }, MM: function (t) {
    return ut(t.getMonth() + 1);
  }, MMM: function (t, e) {
    return e.monthNamesShort[t.getMonth()];
  }, MMMM: function (t, e) {
    return e.monthNames[t.getMonth()];
  }, YY: function (t) {
    return ut(String(t.getFullYear()), 4).substr(2);
  }, YYYY: function (t) {
    return ut(t.getFullYear(), 4);
  }, h: function (t) {
    return String(t.getHours() % 12 || 12);
  }, hh: function (t) {
    return ut(t.getHours() % 12 || 12);
  }, H: function (t) {
    return String(t.getHours());
  }, HH: function (t) {
    return ut(t.getHours());
  }, m: function (t) {
    return String(t.getMinutes());
  }, mm: function (t) {
    return ut(t.getMinutes());
  }, s: function (t) {
    return String(t.getSeconds());
  }, ss: function (t) {
    return ut(t.getSeconds());
  }, S: function (t) {
    return String(Math.round(t.getMilliseconds() / 100));
  }, SS: function (t) {
    return ut(Math.round(t.getMilliseconds() / 10), 2);
  }, SSS: function (t) {
    return ut(t.getMilliseconds(), 3);
  }, a: function (t, e) {
    return t.getHours() < 12 ? e.amPm[0] : e.amPm[1];
  }, A: function (t, e) {
    return t.getHours() < 12 ? e.amPm[0].toUpperCase() : e.amPm[1].toUpperCase();
  }, ZZ: function (t) {
    var e = t.getTimezoneOffset();return (e > 0 ? "-" : "+") + ut(100 * Math.floor(Math.abs(e) / 60) + Math.abs(e) % 60, 4);
  }, Z: function (t) {
    var e = t.getTimezoneOffset();return (e > 0 ? "-" : "+") + ut(Math.floor(Math.abs(e) / 60), 2) + ":" + ut(Math.abs(e) % 60, 2);
  } },
    mt = function (t) {
  return +t - 1;
},
    ft = [null, "[1-9]\\d?"],
    gt = [null, nt],
    _t = ["isPm", nt, function (t, e) {
  var n = t.toLowerCase();return n === e.amPm[0] ? 0 : n === e.amPm[1] ? 1 : null;
}],
    yt = ["timezoneOffset", "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?", function (t) {
  var e = (t + "").match(/([+-]|\d\d)/gi);if (e) {
    var n = 60 * +e[1] + parseInt(e[2], 10);return "+" === e[0] ? n : -n;
  }return 0;
}],
    vt = (it("monthNamesShort"), it("monthNames"), { default: "ddd MMM DD YYYY HH:mm:ss", shortDate: "M/D/YY", mediumDate: "MMM D, YYYY", longDate: "MMMM D, YYYY", fullDate: "dddd, MMMM D, YYYY", isoDate: "YYYY-MM-DD", isoDateTime: "YYYY-MM-DDTHH:mm:ssZ", shortTime: "HH:mm", mediumTime: "HH:mm:ss", longTime: "HH:mm:ss.SSS" });var St = function (t, e, n) {
  if (void 0 === e && (e = vt.default), void 0 === n && (n = {}), "number" == typeof t && (t = new Date(t)), "[object Date]" !== Object.prototype.toString.call(t) || isNaN(t.getTime())) throw new Error("Invalid Date pass to format");var r = [];e = (e = vt[e] || e).replace(rt, function (t, e) {
    return r.push(e), "@@@";
  });var s = ot(ot({}, ht), n);return (e = e.replace(et, function (e) {
    return pt[e](t, s);
  })).replace(/@@@/g, function () {
    return r.shift();
  });
},
    wt = (function () {
  try {
    new Date().toLocaleDateString("i");
  } catch (t) {
    return "RangeError" === t.name;
  }
}(), function () {
  try {
    new Date().toLocaleString("i");
  } catch (t) {
    return "RangeError" === t.name;
  }
}(), function () {
  try {
    new Date().toLocaleTimeString("i");
  } catch (t) {
    return "RangeError" === t.name;
  }
}(), new Set(["call-service", "divider", "section", "weblink", "cast", "select"])),
    bt = { alert: "toggle", automation: "toggle", climate: "climate", cover: "cover", fan: "toggle", group: "group", input_boolean: "toggle", input_number: "input-number", input_select: "input-select", input_text: "input-text", light: "toggle", lock: "lock", media_player: "media-player", remote: "toggle", scene: "scene", script: "script", sensor: "sensor", timer: "timer", switch: "toggle", vacuum: "toggle", water_heater: "climate", input_datetime: "input-datetime" },
    Ct = function (t, e) {
  void 0 === e && (e = !1);var n = function (t, e) {
    return r("hui-error-card", { type: "error", error: t, config: e });
  },
      r = function (t, e) {
    var r = window.document.createElement(t);try {
      r.setConfig(e);
    } catch (r) {
      return console.error(t, r), n(r.message, e);
    }return r;
  };if (!t || "object" != typeof t || !e && !t.type) return n("No type defined", t);var s = t.type;if (s && s.startsWith("custom:")) s = s.substr("custom:".length);else if (e) {
    if (wt.has(s)) s = "hui-" + s + "-row";else {
      if (!t.entity) return n("Invalid config given.", t);var i = t.entity.split(".", 1)[0];s = "hui-" + (bt[i] || "text") + "-entity-row";
    }
  } else s = "hui-" + s + "-card";if (customElements.get(s)) return r(s, t);var o = n("Custom element doesn't exist: " + t.type + ".", t);o.style.display = "None";var a = setTimeout(function () {
    o.style.display = "";
  }, 2e3);return customElements.whenDefined(t.type).then(function () {
    clearTimeout(a), function (t, e, n, r) {
      r = r || {}, n = null == n ? {} : n;var s = new Event(e, { bubbles: void 0 === r.bubbles || r.bubbles, cancelable: Boolean(r.cancelable), composed: void 0 === r.composed || r.composed });s.detail = n, t.dispatchEvent(s);
    }(o, "ll-rebuild", {}, o);
  }), o;
};console.info("%c STACK-IN-CARD \n%c   Version 0.0.3   ", "color: orange; font-weight: bold; background: black", "color: white; font-weight: bold; background: dimgray");const Pt = window.loadCardHelpers ? window.loadCardHelpers() : void 0;let Nt = class extends G {
  set hass(t) {
    this._hass = t, this._card && (this._card.hass = t);
  }setConfig(t) {
    if (!t.cards) throw new Error("There is no cards parameter defined");this._config = Object.assign({ mode: "vertical" }, t), this._createCard({ type: `${this._config.mode}-stack`, cards: this._config.cards }).then(t => {
      this._card = t, this._waitForChildren(t, !1), window.setTimeout(() => {
        this._waitForChildren(t, !0);
      }, 500);
    });
  }render() {
    return this._hass && this._card && this._config ? R`
      <ha-card header=${X(this._config.title)}>
        <div>${this._card}</div>
      </ha-card>
    ` : R``;
  }_updateStyle(t, e) {
    t && (t.style.boxShadow = "none", e && "true" !== getComputedStyle(t).getPropertyValue("--keep-background").trim() && (t.style.background = "transparent"), t.style.borderRadius = "0");
  }_loopChildren(t, e) {
    t.childNodes.forEach(t => {
      t.style && (t.style.margin = "0px"), this._waitForChildren(t, e);
    });
  }_updateChildren(t, e) {
    if (t) if (t.shadowRoot) {
      const n = t.shadowRoot.querySelector("ha-card");if (n) this._updateStyle(n, e);else {
        const n = t.shadowRoot.getElementById("root") || t.shadowRoot.getElementById("card");if (!n) return;this._loopChildren(n, e);
      }
    } else "function" == typeof t.querySelector && t.querySelector("ha-card") && this._updateStyle(t.querySelector("ha-card"), e), this._loopChildren(t, e);
  }_waitForChildren(t, e) {
    t.updateComplete ? t.updateComplete.then(() => {
      this._updateChildren(t, e);
    }) : this._updateChildren(t, e);
  }async _createCard(t) {
    let e;return e = Pt ? (await Pt).createCardElement(t) : Ct(t), this._hass && (e.hass = this._hass), e && e.addEventListener("ll-rebuild", n => {
      n.stopPropagation(), this._rebuildCard(e, t);
    }, { once: !0 }), e;
  }async _rebuildCard(t, e) {
    const n = await this._createCard(e);return t.replaceWith(n), this._card = n, this._waitForChildren(this._card, !0), n;
  }getCardSize() {
    return this._card && "function" == typeof this._card.getCardSize ? this._card.getCardSize() : 1;
  }
};var xt;t([J()], Nt.prototype, "_card", void 0), t([J()], Nt.prototype, "_config", void 0), t([J()], Nt.prototype, "_hass", void 0), Nt = t([(xt = "stack-in-card", t => "function" == typeof t ? ((t, e) => (window.customElements.define(t, e), e))(xt, t) : ((t, e) => {
  const { kind: n, elements: r } = e;return { kind: n, elements: r, finisher(e) {
      window.customElements.define(t, e);
    } };
})(xt, t))], Nt);
