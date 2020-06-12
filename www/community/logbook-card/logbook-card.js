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
function t(t,e,s,n){var r,i=arguments.length,a=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,s):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,s,n);else for(var o=t.length-1;o>=0;o--)(r=t[o])&&(a=(i<3?r(a):i>3?r(e,s,a):r(e,s))||a);return i>3&&a&&Object.defineProperty(e,s,a),a
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
 */}const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},n=`{{lit-${String(Math.random()).slice(2)}}}`,r=`\x3c!--${n}--\x3e`,i=new RegExp(`${n}|${r}`);class a{constructor(t,e){this.parts=[],this.element=e;const s=[],r=[],a=document.createTreeWalker(e.content,133,null,!1);let l=0,d=-1,h=0;const{strings:p,values:{length:m}}=t;for(;h<m;){const t=a.nextNode();if(null!==t){if(d++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let n=0;for(let t=0;t<s;t++)o(e[t].name,"$lit$")&&n++;for(;n-- >0;){const e=p[h],s=u.exec(e)[2],n=s.toLowerCase()+"$lit$",r=t.getAttribute(n);t.removeAttribute(n);const a=r.split(i);this.parts.push({type:"attribute",index:d,name:s,strings:a}),h+=a.length-1}}"TEMPLATE"===t.tagName&&(r.push(t),a.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(n)>=0){const n=t.parentNode,r=e.split(i),a=r.length-1;for(let e=0;e<a;e++){let s,i=r[e];if(""===i)s=c();else{const t=u.exec(i);null!==t&&o(t[2],"$lit$")&&(i=i.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),s=document.createTextNode(i)}n.insertBefore(s,t),this.parts.push({type:"node",index:++d})}""===r[a]?(n.insertBefore(c(),t),s.push(t)):t.data=r[a],h+=a}}else if(8===t.nodeType)if(t.data===n){const e=t.parentNode;null!==t.previousSibling&&d!==l||(d++,e.insertBefore(c(),t)),l=d,this.parts.push({type:"node",index:d}),null===t.nextSibling?t.data="":(s.push(t),d--),h++}else{let e=-1;for(;-1!==(e=t.data.indexOf(n,e+1));)this.parts.push({type:"node",index:-1}),h++}}else a.currentNode=r.pop()}for(const t of s)t.parentNode.removeChild(t)}}const o=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},l=t=>-1!==t.index,c=()=>document.createComment(""),u=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function d(t,e){const{element:{content:s},parts:n}=t,r=document.createTreeWalker(s,133,null,!1);let i=p(n),a=n[i],o=-1,l=0;const c=[];let u=null;for(;r.nextNode();){o++;const t=r.currentNode;for(t.previousSibling===u&&(u=null),e.has(t)&&(c.push(t),null===u&&(u=t)),null!==u&&l++;void 0!==a&&a.index===o;)a.index=null!==u?-1:a.index-l,i=p(n,i),a=n[i]}c.forEach(t=>t.parentNode.removeChild(t))}const h=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},p=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(l(e))return s}return-1};
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
const m=new WeakMap,f=t=>"function"==typeof t&&m.has(t),g={},v={};
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
class y{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],n=this.template.parts,r=document.createTreeWalker(t,133,null,!1);let i,a=0,o=0,c=r.nextNode();for(;a<n.length;)if(i=n[a],l(i)){for(;o<i.index;)o++,"TEMPLATE"===c.nodeName&&(s.push(c),r.currentNode=c.content),null===(c=r.nextNode())&&(r.currentNode=s.pop(),c=r.nextNode());if("node"===i.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,i.name,i.strings,this.options));a++}else this.__parts.push(void 0),a++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */const _=` ${n} `;class b{constructor(t,e,s,n){this.strings=t,this.values=e,this.type=s,this.processor=n}getHTML(){const t=this.strings.length-1;let e="",s=!1;for(let i=0;i<t;i++){const t=this.strings[i],a=t.lastIndexOf("\x3c!--");s=(a>-1||s)&&-1===t.indexOf("--\x3e",a+1);const o=u.exec(t);e+=null===o?t+(s?_:r):t.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+n}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
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
 */const w=t=>null===t||!("object"==typeof t||"function"==typeof t),S=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class x{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new P(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let n=0;n<e;n++){s+=t[n];const e=this.parts[n];if(void 0!==e){const t=e.value;if(w(t)||!S(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class P{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===g||w(t)&&t===this.value||(this.value=t,f(t)||(this.committer.dirty=!0))}commit(){for(;f(this.value);){const t=this.value;this.value=g,t(this)}this.value!==g&&this.committer.commit()}}class N{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(c()),this.endNode=t.appendChild(c())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=c()),t.__insert(this.endNode=c())}insertAfterPart(t){t.__insert(this.startNode=c()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=g,t(this)}const t=this.__pendingValue;t!==g&&(w(t)?t!==this.value&&this.__commitText(t):t instanceof b?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):S(t)?this.__commitIterable(t):t===v?(this.value=v,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof y&&this.value.template===e)this.value.update(t.values);else{const s=new y(e,t.processor,this.options),n=s._clone();s.update(t.values),this.__commitNode(n),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,n=0;for(const r of t)s=e[n],void 0===s&&(s=new N(this.options),e.push(s),0===n?s.appendIntoPart(this):s.insertAfterPart(e[n-1])),s.setValue(r),s.commit(),n++;n<e.length&&(e.length=n,this.clear(s&&s.endNode))}clear(t=this.startNode){s(this.startNode.parentNode,t.nextSibling,this.endNode)}}class D{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=g,t(this)}if(this.__pendingValue===g)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=g}}class M extends x{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new k(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class k extends P{}let C=!1;(()=>{try{const t={get capture(){return C=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class A{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=g,t(this)}if(this.__pendingValue===g)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=T(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=g}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const T=t=>t&&(C?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
 */;function O(t){let e=E.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},E.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const r=t.strings.join(n);return s=e.keyString.get(r),void 0===s&&(s=new a(t,t.getTemplateElement()),e.keyString.set(r,s)),e.stringsArray.set(t.strings,s),s}const E=new Map,$=new WeakMap;
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
 */const V=new
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
class{handleAttributeExpressions(t,e,s,n){const r=e[0];if("."===r){return new M(t,e.slice(1),s).parts}return"@"===r?[new A(t,e.slice(1),n.eventContext)]:"?"===r?[new D(t,e.slice(1),s)]:new x(t,e,s).parts}handleTextExpression(t){return new N(t)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const H=(t,...e)=>new b(t,e,"html",V)
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
 */,j=(t,e)=>`${t}--${e}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const Y=t=>e=>{const s=j(e.type,t);let r=E.get(s);void 0===r&&(r={stringsArray:new WeakMap,keyString:new Map},E.set(s,r));let i=r.stringsArray.get(e.strings);if(void 0!==i)return i;const o=e.strings.join(n);if(i=r.keyString.get(o),void 0===i){const s=e.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(s,t),i=new a(e,s),r.keyString.set(o,i)}return r.stringsArray.set(e.strings,i),i},I=["html","svg"],R=new Set,z=(t,e,s)=>{R.add(t);const n=s?s.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:i}=r;if(0===i)return void window.ShadyCSS.prepareTemplateStyles(n,t);const a=document.createElement("style");for(let t=0;t<i;t++){const e=r[t];e.parentNode.removeChild(e),a.textContent+=e.textContent}(t=>{I.forEach(e=>{const s=E.get(j(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),d(t,s)})})})(t);const o=n.content;s?function(t,e,s=null){const{element:{content:n},parts:r}=t;if(null==s)return void n.appendChild(e);const i=document.createTreeWalker(n,133,null,!1);let a=p(r),o=0,l=-1;for(;i.nextNode();){for(l++,i.currentNode===s&&(o=h(e),s.parentNode.insertBefore(e,s));-1!==a&&r[a].index===l;){if(o>0){for(;-1!==a;)r[a].index+=o,a=p(r,a);return}a=p(r,a)}}}(s,a,o.firstChild):o.insertBefore(a,o.firstChild),window.ShadyCSS.prepareTemplateStyles(n,t);const l=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){o.insertBefore(a,o.firstChild);const t=new Set;t.add(a),d(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const L={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},q=(t,e)=>e!==t&&(e==e||t==t),F={attribute:!0,type:String,converter:L,reflect:!1,hasChanged:q};class W extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const n=this._attributeNameForProperty(s,e);void 0!==n&&(this._attributeToPropertyMap.set(n,s),t.push(n))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=F){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,s,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this._requestUpdate(t,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||F}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=q){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,n=e.converter||L,r="function"==typeof n?n:n.fromAttribute;return r?r(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,n=e.converter;return(n&&n.toAttribute||L.toAttribute)(t,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=F){const n=this.constructor,r=n._attributeNameForProperty(t,s);if(void 0!==r){const t=n._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,n=s._attributeToPropertyMap.get(t);if(void 0!==n){const t=s.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}_requestUpdate(t,e){let s=!0;if(void 0!==t){const n=this.constructor,r=n.getPropertyOptions(t);n._valueHasChanged(this[t],e,r.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,r))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}W.finalized=!0;
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
const B=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(s){s.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};function J(t){return(e,s)=>void 0!==s?((t,e,s)=>{e.constructor.createProperty(s,t)})(t,e,s):B(t,e)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const Z="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class G{constructor(t,e){if(e!==X)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(Z?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const K=(t,...e)=>{const s=e.reduce((e,s,n)=>e+(t=>{if(t instanceof G)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[n+1],t[0]);return new G(s,X)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const Q={};class tt extends W{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(void 0===t)this._styles=[];else if(Array.isArray(t)){const e=(t,s)=>t.reduceRight((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t),s),s=e(t,new Set),n=[];s.forEach(t=>n.unshift(t)),this._styles=n}else this._styles=[t]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Z?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==Q&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return Q}}tt.finalized=!0,tt.render=(t,e,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const r=n.scopeName,i=$.has(e),a=U&&11===e.nodeType&&!!e.host,o=a&&!R.has(r),l=o?document.createDocumentFragment():e;if(((t,e,n)=>{let r=$.get(e);void 0===r&&(s(e,e.firstChild),$.set(e,r=new N(Object.assign({templateFactory:O},n))),r.appendInto(e)),r.setValue(t),r.commit()})(t,l,Object.assign({templateFactory:Y(r)},n)),o){const t=$.get(l);$.delete(l);const n=t.value instanceof y?t.value.template:void 0;z(r,l,n),s(e,e.firstChild),e.appendChild(l),$.set(e,t)}!i&&a&&window.ShadyCSS.styleElement(e.host)};
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
const et=new WeakMap,st=(nt=t=>e=>{if(!(e instanceof P)||e instanceof k||"style"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:s}=e,{style:n}=s.element;let r=et.get(e);void 0===r&&(n.cssText=s.strings.join(" "),et.set(e,r=new Set)),r.forEach(e=>{e in t||(r.delete(e),-1===e.indexOf("-")?n[e]=null:n.removeProperty(e))});for(const e in t)r.add(e),-1===e.indexOf("-")?n[e]=t[e]:n.setProperty(e,t[e])},(...t)=>{const e=nt(...t);return m.set(e,!0),e});var nt,rt=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,it="[^\\s]+",at=/\[([^]*?)\]/gm;function ot(t,e){for(var s=[],n=0,r=t.length;n<r;n++)s.push(t[n].substr(0,e));return s}var lt=function(t){return function(e,s){var n=s[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return n>-1?n:null}};function ct(t){for(var e=[],s=1;s<arguments.length;s++)e[s-1]=arguments[s];for(var n=0,r=e;n<r.length;n++){var i=r[n];for(var a in i)t[a]=i[a]}return t}var ut=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dt=["January","February","March","April","May","June","July","August","September","October","November","December"],ht=ot(dt,3),pt={dayNamesShort:ot(ut,3),dayNames:ut,monthNamesShort:ht,monthNames:dt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},mt=ct({},pt),ft=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},gt={D:function(t){return String(t.getDate())},DD:function(t){return ft(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return ft(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return ft(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return ft(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return ft(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return ft(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return ft(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return ft(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return ft(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return ft(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return ft(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+ft(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+ft(Math.floor(Math.abs(e)/60),2)+":"+ft(Math.abs(e)%60,2)}},vt=function(t){return+t-1},yt=[null,"[1-9]\\d?"],_t=[null,it],bt=["isPm",it,function(t,e){var s=t.toLowerCase();return s===e.amPm[0]?0:s===e.amPm[1]?1:null}],wt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var s=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?s:-s}return 0}],St=(lt("monthNamesShort"),lt("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"}),xt=function(t,e,s){if(void 0===e&&(e=St.default),void 0===s&&(s={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var n=[];e=(e=St[e]||e).replace(at,(function(t,e){return n.push(e),"@@@"}));var r=ct(ct({},mt),s);return(e=e.replace(rt,(function(e){return gt[e](t,r)}))).replace(/@@@/g,(function(){return n.shift()}))};var Pt=xt,Nt=function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleDateString(e,{year:"numeric",month:"long",day:"numeric"})}:function(t){return Pt(t,"mediumDate")},Dt=function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleString(e,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(t){return Pt(t,"haDateTime")},Mt=function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleTimeString(e,{hour:"numeric",minute:"2-digit"})}:function(t){return Pt(t,"shortTime")};function kt(t){return t.substr(0,t.indexOf("."))}function Ct(t,e,s){if("unknown"===e.state||"unavailable"===e.state)return t("state.default."+e.state);if(e.attributes.unit_of_measurement)return e.state+" "+e.attributes.unit_of_measurement;var n=function(t){return kt(t.entity_id)}(e);if("input_datetime"===n){var r;if(!e.attributes.has_time)return r=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day),Nt(r,s);if(!e.attributes.has_date){var i=new Date;return r=new Date(i.getFullYear(),i.getMonth(),i.getDay(),e.attributes.hour,e.attributes.minute),Mt(r,s)}return r=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day,e.attributes.hour,e.attributes.minute),Dt(r,s)}return e.attributes.device_class&&t("component."+n+".state."+e.attributes.device_class+"."+e.state)||t("component."+n+".state._."+e.state)||e.state}var At="hass:bookmark",Tt={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function Ot(t,e){if(t in Tt)return Tt[t];switch(t){case"alarm_control_panel":switch(e){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return e&&"off"===e?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===e?"hass:window-closed":"hass:window-open";case"lock":return e&&"unlocked"===e?"hass:lock-open":"hass:lock";case"media_player":return e&&"off"!==e&&"idle"!==e?"hass:cast-connected":"hass:cast";case"zwave":switch(e){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+t+" ("+e+")"),At}}var Et={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},$t={binary_sensor:function(t){var e=t.state&&"off"===t.state;switch(t.attributes.device_class){case"battery":return e?"hass:battery":"hass:battery-outline";case"cold":return e?"hass:thermometer":"hass:snowflake";case"connectivity":return e?"hass:server-network-off":"hass:server-network";case"door":return e?"hass:door-closed":"hass:door-open";case"garage_door":return e?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return e?"hass:shield-check":"hass:alert";case"heat":return e?"hass:thermometer":"hass:fire";case"light":return e?"hass:brightness-5":"hass:brightness-7";case"lock":return e?"hass:lock":"hass:lock-open";case"moisture":return e?"hass:water-off":"hass:water";case"motion":return e?"hass:walk":"hass:run";case"occupancy":return e?"hass:home-outline":"hass:home";case"opening":return e?"hass:square":"hass:square-outline";case"plug":return e?"hass:power-plug-off":"hass:power-plug";case"presence":return e?"hass:home-outline":"hass:home";case"sound":return e?"hass:music-note-off":"hass:music-note";case"vibration":return e?"hass:crop-portrait":"hass:vibrate";case"window":return e?"hass:window-closed":"hass:window-open";default:return e?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(t){var e="closed"!==t.state;switch(t.attributes.device_class){case"garage":return e?"hass:garage-open":"hass:garage";case"door":return e?"hass:door-open":"hass:door-closed";case"shutter":return e?"hass:window-shutter-open":"hass:window-shutter";case"blind":return e?"hass:blinds-open":"hass:blinds";case"window":return e?"hass:window-open":"hass:window-closed";default:return Ot("cover",t.state)}},sensor:function(t){var e=t.attributes.device_class;if(e&&e in Et)return Et[e];if("battery"===e){var s=Number(t.state);if(isNaN(s))return"hass:battery-unknown";var n=10*Math.round(s/10);return n>=100?"hass:battery":n<=0?"hass:battery-alert":"hass:battery-"+n}var r=t.attributes.unit_of_measurement;return"°C"===r||"°F"===r?"hass:thermometer":Ot("sensor")},input_datetime:function(t){return t.attributes.has_date?t.attributes.has_time?Ot("input_datetime"):"hass:calendar":"hass:clock"}};const Vt={state:!0,duration:!0,start_date:!0,end_date:!0,icon:!0,separator:!1},Ht={second:"${value}s",seconds:"${value}s",minute:"${value}m",minutes:"${value}m",hour:"${value}h",hours:"${value}h",day:"${value}d",days:"${value}d"},jt={width:1,style:"solid",color:"var(--divider-color)"};var Ut={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning"},Yt={common:Ut},It={version:"Version",invalid_configuration:"Configuration invalide",show_warning:"Afficher les warning"},Rt={common:It},zt={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},Lt={common:zt};const qt={en:Object.freeze({__proto__:null,common:Ut,default:Yt}),fr:Object.freeze({__proto__:null,common:It,default:Rt}),nb:Object.freeze({__proto__:null,common:zt,default:Lt})};function Ft(t,e="",s=""){const n=t.split(".")[0],r=t.split(".")[1],i=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let a;try{a=qt[i][n][r]}catch(t){a=qt.en[n][r]}return void 0===a&&(a=qt.en[n][r]),""!==e&&""!==s&&(a=a.replace(e,s)),a}console.info(`%c  LOGBOOK-CARD \n%c  ${Ft("common.version")} 1.2.0    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");let Wt=class extends tt{constructor(){super(...arguments),this.MAX_UPDATE_DURATION=5e3}setConfig(t){if(!t)throw new Error(Ft("common.invalid_configuration"));if(!t.entity)throw new Error("Please define an entity.");if(void 0!==t.max_items&&!Number.isInteger(t.max_items))throw new Error("max_items must be an Integer.");if(t.hiddenState&&!Array.isArray(t.hiddenState))throw new Error("hiddenState must be an array");if(t.state_map&&!Array.isArray(t.state_map))throw new Error("state_map must be an array");if(t.attributes&&!Array.isArray(t.attributes))throw new Error("attributes must be an array");if(t.desc&&"boolean"!=typeof t.desc)throw new Error("desc must be a boolean");if(t.collapse&&!Number.isInteger(t.collapse))throw new Error("collapse must be a number");if(t.collapse&&t.max_items&&t.collapse>t.max_items)throw new Error("collapse must be greater than max-items");this.config=Object.assign(Object.assign({history:5,hiddenState:[],desc:!0,max_items:-1,no_event:"No event on the period",state_map:[],attributes:[]},t),{show:Object.assign(Object.assign({},Vt),t.show),duration_labels:Object.assign(Object.assign({},Ht),t.duration_labels),separator_style:Object.assign(Object.assign({},jt),t.separator_style)})}mapState(t){var e,s;const n=null===(s=null===(e=this.config)||void 0===e?void 0:e.state_map)||void 0===s?void 0:s.find(e=>e.value===t.state);return void 0!==n&&n.label?n.label:this.hass?Ct(this.hass.localize,t,this.hass.selectedLanguage):t.state}mapIcon(t){var e,s;const n=null===(s=null===(e=this.config)||void 0===e?void 0:e.state_map)||void 0===s?void 0:s.find(e=>e.value===t.state);return void 0!==n&&n.icon?n.icon:function(t){if(!t)return At;if(t.attributes.icon)return t.attributes.icon;var e=kt(t.entity_id);return e in $t?$t[e](t):Ot(e,t.state)}(t)}squashSameState(t,e){const s=t[t.length-1];return!s||s.state!==e.state&&"unknown"!==e.state?t.push(e):(s.end=e.end,s.duration+=e.duration),t}extractAttributes(t){var e,s;return null==(null===(e=this.config)||void 0===e?void 0:e.attributes)?[]:null===(s=this.config)||void 0===s?void 0:s.attributes.reduce((e,s)=>(t.attributes[s.value]&&e.push({name:s.label?s.label:s.value,value:this.formatAttributeValue(t.attributes[s.value],s.type)}),e),[])}formatDuration(t,e,s){return 1===s?t.replace("${value}",s.toString()):e.replace("${value}",s.toString())}getDuration(t,e){if(!t)return"";const s=t/1e3;if(s<60){const t=Math.round(s);return this.formatDuration(e.second,e.seconds,t)}const n=s/60;if(n<60){const t=Math.round(n);return this.formatDuration(e.minute,e.minutes,t)}const r=n/60;if(r<24){const t=Math.round(r);return this.formatDuration(e.hour,e.hours,t)}const i=Math.round(r/24);return this.formatDuration(e.day,e.days,i)}formatAttributeValue(t,e){return"date"===e?this._displayDate(new Date(t)):t}_displayDate(t){var e,s,n,r;return(null===(e=this.config)||void 0===e?void 0:e.date_format)?xt(t,null!==(n=null===(s=this.config)||void 0===s?void 0:s.date_format)&&void 0!==n?n:void 0):Dt(t,(null===(r=this.hass)||void 0===r?void 0:r.language)||"en")}updateHistory(){var t,e;const s=this.hass;if(s&&this.config&&this.config.entity){const n=this.config.entity in s.states?s.states[this.config.entity]:null;if(n){this.config.title=null!==(e=null===(t=this.config)||void 0===t?void 0:t.title)&&void 0!==e?e:n.attributes.friendly_name+" History";const r="history/period/"+new Date((new Date).setDate((new Date).getDate()-this.config.history)).toISOString()+"?filter_entity_id="+this.config.entity+"&end_time="+(new Date).toISOString();let i=[];s.callApi("GET",r).then(t=>{var e,s;i=t[0].map(t=>({state:t.state,label:this.mapState(t),start:new Date(t.last_changed),attributes:this.extractAttributes(t),icon:this.mapIcon(t)})).map((t,e,s)=>e<s.length-1?Object.assign(Object.assign({},t),{end:s[e+1].start}):Object.assign(Object.assign({},t),{end:new Date})).map(t=>Object.assign(Object.assign({},t),{duration:t.end-t.start})).reduce(this.squashSameState,[]).filter(t=>{var e;return!(null===(e=this.config)||void 0===e?void 0:e.hiddenState.includes(t.state))}).map(t=>{var e,s;return Object.assign(Object.assign({},t),{duration:this.getDuration(t.duration,null!==(s=null===(e=this.config)||void 0===e?void 0:e.duration_labels)&&void 0!==s?s:Ht)})}),i&&(null===(e=this.config)||void 0===e?void 0:e.desc)&&(i=i.reverse()),i&&this.config&&this.config.max_items>0&&(i=i.splice(0,null===(s=this.config)||void 0===s?void 0:s.max_items)),this.history=i})}this.lastHistoryChanged=new Date}}shouldUpdate(t){return!!t.has("history")||(t.delete("history"),(!this.lastHistoryChanged||function(t,e,s){if(e.has("config")||s)return!0;if(t.config.entity){var n=e.get("hass");return!n||n.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!1)||(new Date).getTime()-this.lastHistoryChanged.getTime()>this.MAX_UPDATE_DURATION)&&this.updateHistory(),!1)}render(){return this.config&&this.hass?H`
      <ha-card .header=${this.config.title} tabindex="0" aria-label=${""+this.config.title}>
        <div class="card-content grid" style="[[contentStyle]]">
          ${this.renderHistory(this.history,this.config)}
        </div>
      </ha-card>
    `:H``}renderHistory(t,e){if(!t||0===(null==t?void 0:t.length))return H`
        <p>
          ${e.no_event}
        </p>
      `;if(e.collapse&&t.length>e.collapse){const s="expander"+Math.random().toString(10).substr(2);return H`
        ${this.renderHistoryItems(t.slice(0,e.collapse))}
        <input type="checkbox" class="expand" id="${s}" />
        <label for="${s}"><div>&lsaquo;</div></label>
        <div>
          ${this.renderHistoryItems(t.slice(e.collapse))}
        </div>
      `}return this.renderHistoryItems(t)}renderHistoryItems(t){return H`
      ${null==t?void 0:t.map((t,e,s)=>this.renderHistoryItem(t,e+1===s.length))}
    `}renderHistoryItem(t,e){var s,n,r,i,a;return H`
      <div class="item">
        ${this.renderIcon(t)}
        <div class="item-content">
          ${(null===(n=null===(s=this.config)||void 0===s?void 0:s.show)||void 0===n?void 0:n.state)?H`
                <span>${t.label}</span>
              `:H``}
          ${(null===(i=null===(r=this.config)||void 0===r?void 0:r.show)||void 0===i?void 0:i.duration)?H`
                <span class="duration">${t.duration}</span>
              `:H``}
          ${this.renderHistoryDate(t)}${null===(a=t.attributes)||void 0===a?void 0:a.map(this.renderAttributes)}
        </div>
      </div>
      ${e?"":this.renderSeparator()}
    `}renderSeparator(){var t,e,s,n,r,i,a,o;const l={border:"0","border-top":`${null===(e=null===(t=this.config)||void 0===t?void 0:t.separator_style)||void 0===e?void 0:e.width}px ${null===(n=null===(s=this.config)||void 0===s?void 0:s.separator_style)||void 0===n?void 0:n.style} ${null===(i=null===(r=this.config)||void 0===r?void 0:r.separator_style)||void 0===i?void 0:i.color}`};if(null===(o=null===(a=this.config)||void 0===a?void 0:a.show)||void 0===o?void 0:o.separator)return H`
        <hr style=${st(l)} aria-hidden="true" />
      `}renderIcon(t){var e,s;if(null===(s=null===(e=this.config)||void 0===e?void 0:e.show)||void 0===s?void 0:s.icon)return H`
        <div class="item-icon">
          <ha-icon .icon=${t.icon}></ha-icon>
        </div>
      `}renderHistoryDate(t){var e,s,n,r,i,a,o,l;return(null===(s=null===(e=this.config)||void 0===e?void 0:e.show)||void 0===s?void 0:s.end_date)&&(null===(r=null===(n=this.config)||void 0===n?void 0:n.show)||void 0===r?void 0:r.end_date)?H`
        <div class="date">${this._displayDate(t.start)} - ${this._displayDate(t.end)}</div>
      `:(null===(a=null===(i=this.config)||void 0===i?void 0:i.show)||void 0===a?void 0:a.end_date)?H`
        <div class="date">${this._displayDate(t.end)}</div>
      `:(null===(l=null===(o=this.config)||void 0===o?void 0:o.show)||void 0===l?void 0:l.start_date)?H`
        <div class="date">${this._displayDate(t.start)}</div>
      `:H``}renderAttributes(t){return H`
      <div class="attribute">
        <div class="key">${t.name}</div>
        <div class="value">${t.value}</div>
      </div>
    `}static get styles(){return K`
      .warning {
        display: block;
        color: black;
        background-color: #fce588;
        padding: 8px;
      }
      .item {
        clear: both;
        padding: 5px 0;
        display: flex;
        line-height: var(--paper-font-body1_-_line-height);
      }
      .item-content {
        flex: 1;
      }
      .item-icon {
        flex: 0 0 40px;
        color: var(--paper-item-icon-color, #44739e);
      }
      .duration {
        font-size: 0.85em;
        font-style: italic;
        float: right;
      }
      .date,
      .attribute {
        font-size: 0.7em;
      }
      .attribute {
        display: flex;
        justify-content: space-between;
      }
      .expand {
        display: none;
      }
      .expand + label {
        display: block;
        text-align: right;
        cursor: pointer;
      }
      .expand + label > div {
        display: inline-block;
        transform: rotate(-90deg);
        font-size: 26px;
        height: 29px;
        width: 29px;
        text-align: center;
      }
      .expand + label > div,
      .expand + label + div {
        transition: 0.5s ease-in-out;
      }
      .expand:checked + label > div {
        transform: rotate(-90deg) scaleX(-1);
      }
      .expand + label + div {
        max-height: 0;
        overflow: hidden;
      }
      .expand:checked + label + div {
        max-height: 1000px;
      }
    `}};var Bt;t([J()],Wt.prototype,"hass",void 0),t([J()],Wt.prototype,"config",void 0),t([J()],Wt.prototype,"history",void 0),Wt=t([(Bt="logbook-card",t=>"function"==typeof t?((t,e)=>(window.customElements.define(t,e),e))(Bt,t):((t,e)=>{const{kind:s,elements:n}=e;return{kind:s,elements:n,finisher(e){window.customElements.define(t,e)}}})(Bt,t))],Wt);export{Wt as LogbookCard};
