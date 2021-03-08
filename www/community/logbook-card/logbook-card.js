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
function t(t,e,s,i){var n,r=arguments.length,a=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,s,i);else for(var o=t.length-1;o>=0;o--)(n=t[o])&&(a=(r<3?n(a):r>3?n(e,s,a):n(e,s))||a);return r>3&&a&&Object.defineProperty(e,s,a),a
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
 */}const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},i=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${i}--\x3e`,r=new RegExp(`${i}|${n}`);class a{constructor(t,e){this.parts=[],this.element=e;const s=[],n=[],a=document.createTreeWalker(e.content,133,null,!1);let l=0,d=-1,u=0;const{strings:p,values:{length:f}}=t;for(;u<f;){const t=a.nextNode();if(null!==t){if(d++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)o(e[t].name,"$lit$")&&i++;for(;i-- >0;){const e=p[u],s=h.exec(e)[2],i=s.toLowerCase()+"$lit$",n=t.getAttribute(i);t.removeAttribute(i);const a=n.split(r);this.parts.push({type:"attribute",index:d,name:s,strings:a}),u+=a.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),a.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(i)>=0){const i=t.parentNode,n=e.split(r),a=n.length-1;for(let e=0;e<a;e++){let s,r=n[e];if(""===r)s=c();else{const t=h.exec(r);null!==t&&o(t[2],"$lit$")&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),s=document.createTextNode(r)}i.insertBefore(s,t),this.parts.push({type:"node",index:++d})}""===n[a]?(i.insertBefore(c(),t),s.push(t)):t.data=n[a],u+=a}}else if(8===t.nodeType)if(t.data===i){const e=t.parentNode;null!==t.previousSibling&&d!==l||(d++,e.insertBefore(c(),t)),l=d,this.parts.push({type:"node",index:d}),null===t.nextSibling?t.data="":(s.push(t),d--),u++}else{let e=-1;for(;-1!==(e=t.data.indexOf(i,e+1));)this.parts.push({type:"node",index:-1}),u++}}else a.currentNode=n.pop()}for(const t of s)t.parentNode.removeChild(t)}}const o=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},l=t=>-1!==t.index,c=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function d(t,e){const{element:{content:s},parts:i}=t,n=document.createTreeWalker(s,133,null,!1);let r=p(i),a=i[r],o=-1,l=0;const c=[];let h=null;for(;n.nextNode();){o++;const t=n.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(c.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==a&&a.index===o;)a.index=null!==h?-1:a.index-l,r=p(i,r),a=i[r]}c.forEach(t=>t.parentNode.removeChild(t))}const u=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},p=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(l(e))return s}return-1};
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
const f=new WeakMap,g=t=>"function"==typeof t&&f.has(t),m={},_={};
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
class v{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],i=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let r,a=0,o=0,c=n.nextNode();for(;a<i.length;)if(r=i[a],l(r)){for(;o<r.index;)o++,"TEMPLATE"===c.nodeName&&(s.push(c),n.currentNode=c.content),null===(c=n.nextNode())&&(n.currentNode=s.pop(),c=n.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,r.name,r.strings,this.options));a++}else this.__parts.push(void 0),a++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */const y=` ${i} `;class b{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",s=!1;for(let r=0;r<t;r++){const t=this.strings[r],a=t.lastIndexOf("\x3c!--");s=(a>-1||s)&&-1===t.indexOf("--\x3e",a+1);const o=h.exec(t);e+=null===o?t+(s?y:n):t.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+i}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
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
 */const w=t=>null===t||!("object"==typeof t||"function"==typeof t),S=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class x{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new $(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let i=0;i<e;i++){s+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(w(t)||!S(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class ${constructor(t){this.value=void 0,this.committer=t}setValue(t){t===m||w(t)&&t===this.value||(this.value=t,g(t)||(this.committer.dirty=!0))}commit(){for(;g(this.value);){const t=this.value;this.value=m,t(this)}this.value!==m&&this.committer.commit()}}class C{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(c()),this.endNode=t.appendChild(c())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=c()),t.__insert(this.endNode=c())}insertAfterPart(t){t.__insert(this.startNode=c()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}const t=this.__pendingValue;t!==m&&(w(t)?t!==this.value&&this.__commitText(t):t instanceof b?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):S(t)?this.__commitIterable(t):t===_?(this.value=_,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof v&&this.value.template===e)this.value.update(t.values);else{const s=new v(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const n of t)s=e[i],void 0===s&&(s=new C(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(n),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){s(this.startNode.parentNode,t.nextSibling,this.endNode)}}class k{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=m}}class N extends x{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new P(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class P extends ${}let O=!1;(()=>{try{const t={get capture(){return O=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class D{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=M(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=m}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const M=t=>t&&(O?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
 */;function T(t){let e=A.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},A.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const n=t.strings.join(i);return s=e.keyString.get(n),void 0===s&&(s=new a(t,t.getTemplateElement()),e.keyString.set(n,s)),e.stringsArray.set(t.strings,s),s}const A=new Map,E=new WeakMap;
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
class{handleAttributeExpressions(t,e,s,i){const n=e[0];if("."===n){return new N(t,e.slice(1),s).parts}if("@"===n)return[new D(t,e.slice(1),i.eventContext)];if("?"===n)return[new k(t,e.slice(1),s)];return new x(t,e,s).parts}handleTextExpression(t){return new C(t)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const j=(t,...e)=>new b(t,e,"html",V)
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
 */,H=(t,e)=>`${t}--${e}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const I=t=>e=>{const s=H(e.type,t);let n=A.get(s);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},A.set(s,n));let r=n.stringsArray.get(e.strings);if(void 0!==r)return r;const o=e.strings.join(i);if(r=n.keyString.get(o),void 0===r){const s=e.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(s,t),r=new a(e,s),n.keyString.set(o,r)}return n.stringsArray.set(e.strings,r),r},R=["html","svg"],Y=new Set,z=(t,e,s)=>{Y.add(t);const i=s?s.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(i,t);const a=document.createElement("style");for(let t=0;t<r;t++){const e=n[t];e.parentNode.removeChild(e),a.textContent+=e.textContent}(t=>{R.forEach(e=>{const s=A.get(H(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),d(t,s)})})})(t);const o=i.content;s?function(t,e,s=null){const{element:{content:i},parts:n}=t;if(null==s)return void i.appendChild(e);const r=document.createTreeWalker(i,133,null,!1);let a=p(n),o=0,l=-1;for(;r.nextNode();){l++;for(r.currentNode===s&&(o=u(e),s.parentNode.insertBefore(e,s));-1!==a&&n[a].index===l;){if(o>0){for(;-1!==a;)n[a].index+=o,a=p(n,a);return}a=p(n,a)}}}(s,a,o.firstChild):o.insertBefore(a,o.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const l=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){o.insertBefore(a,o.firstChild);const t=new Set;t.add(a),d(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const q={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},L=(t,e)=>e!==t&&(e==e||t==t),F={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:L};class B extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=F){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdateInternal(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||F}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=L){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||q,n="function"==typeof i?i:i.fromAttribute;return n?n(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||q.toAttribute)(t,s)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=F){const i=this.constructor,n=i._attributeNameForProperty(t,s);if(void 0!==n){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,s){let i=!0;if(void 0!==t){const n=this.constructor;s=s||n.getPropertyOptions(t),n._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}B.finalized=!0;
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
const W=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(e){window.customElements.define(t,e)}}})(t,e),J=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(s){s.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};function Z(t){return(e,s)=>void 0!==s?((t,e,s)=>{e.constructor.createProperty(s,t)})(t,e,s):J(t,e)}function X(t){return Z({attribute:!1,hasChanged:null==t?void 0:t.hasChanged})}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const G=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol();class Q{constructor(t,e){if(e!==K)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(G?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const tt=(t,...e)=>{const s=e.reduce((e,s,i)=>e+(t=>{if(t instanceof Q)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]);return new Q(s,K)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const et={};class st extends B{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,s)=>t.reduceRight((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t),s),s=e(t,new Set),i=[];s.forEach(t=>i.unshift(t)),this._styles=i}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!G){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new Q(String(e),K)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?G?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==et&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return et}}st.finalized=!0,st.render=(t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,r=E.has(e),a=U&&11===e.nodeType&&!!e.host,o=a&&!Y.has(n),l=o?document.createDocumentFragment():e;if(((t,e,i)=>{let n=E.get(e);void 0===n&&(s(e,e.firstChild),E.set(e,n=new C(Object.assign({templateFactory:T},i))),n.appendInto(e)),n.setValue(t),n.commit()})(t,l,Object.assign({templateFactory:I(n)},i)),o){const t=E.get(l);E.delete(l);const i=t.value instanceof v?t.value.template:void 0;z(n,l,i),s(e,e.firstChild),e.appendChild(l),E.set(e,t)}!r&&a&&window.ShadyCSS.styleElement(e.host)};
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
const it=new WeakMap,nt=(rt=t=>e=>{if(!(e instanceof $)||e instanceof P||"style"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:s}=e,{style:i}=s.element;let n=it.get(e);void 0===n&&(i.cssText=s.strings.join(" "),it.set(e,n=new Set)),n.forEach(e=>{e in t||(n.delete(e),-1===e.indexOf("-")?i[e]=null:i.removeProperty(e))});for(const e in t)n.add(e),-1===e.indexOf("-")?i[e]=t[e]:i.setProperty(e,t[e])},(...t)=>{const e=rt(...t);return f.set(e,!0),e});var rt,at=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ot="[^\\s]+",lt=/\[([^]*?)\]/gm;function ct(t,e){for(var s=[],i=0,n=t.length;i<n;i++)s.push(t[i].substr(0,e));return s}var ht=function(t){return function(e,s){var i=s[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return i>-1?i:null}};function dt(t){for(var e=[],s=1;s<arguments.length;s++)e[s-1]=arguments[s];for(var i=0,n=e;i<n.length;i++){var r=n[i];for(var a in r)t[a]=r[a]}return t}var ut=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],pt=["January","February","March","April","May","June","July","August","September","October","November","December"],ft=ct(pt,3),gt={dayNamesShort:ct(ut,3),dayNames:ut,monthNamesShort:ft,monthNames:pt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},mt=dt({},gt),_t=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},vt={D:function(t){return String(t.getDate())},DD:function(t){return _t(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return _t(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return _t(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return _t(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return _t(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return _t(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return _t(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return _t(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return _t(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return _t(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return _t(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+_t(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+_t(Math.floor(Math.abs(e)/60),2)+":"+_t(Math.abs(e)%60,2)}},yt=function(t){return+t-1},bt=[null,"[1-9]\\d?"],wt=[null,ot],St=["isPm",ot,function(t,e){var s=t.toLowerCase();return s===e.amPm[0]?0:s===e.amPm[1]?1:null}],xt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var s=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?s:-s}return 0}],$t=(ht("monthNamesShort"),ht("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"}),Ct=function(t,e,s){if(void 0===e&&(e=$t.default),void 0===s&&(s={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var i=[];e=(e=$t[e]||e).replace(lt,(function(t,e){return i.push(e),"@@@"}));var n=dt(dt({},mt),s);return(e=e.replace(at,(function(e){return vt[e](t,n)}))).replace(/@@@/g,(function(){return i.shift()}))};var kt=Ct,Nt=function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleDateString(e,{year:"numeric",month:"long",day:"numeric"})}:function(t){return kt(t,"mediumDate")},Pt=function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleString(e,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(t){return kt(t,"haDateTime")},Ot=function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleTimeString(e,{hour:"numeric",minute:"2-digit"})}:function(t){return kt(t,"shortTime")};function Dt(t){return t.substr(0,t.indexOf("."))}function Mt(t,e,s){if("unknown"===e.state||"unavailable"===e.state)return t("state.default."+e.state);if(e.attributes.unit_of_measurement)return e.state+" "+e.attributes.unit_of_measurement;var i=function(t){return Dt(t.entity_id)}(e);if("input_datetime"===i){var n;if(!e.attributes.has_time)return n=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day),Nt(n,s);if(!e.attributes.has_date){var r=new Date;return n=new Date(r.getFullYear(),r.getMonth(),r.getDay(),e.attributes.hour,e.attributes.minute),Ot(n,s)}return n=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day,e.attributes.hour,e.attributes.minute),Pt(n,s)}return e.attributes.device_class&&t("component."+i+".state."+e.attributes.device_class+"."+e.state)||t("component."+i+".state._."+e.state)||e.state}var Tt="hass:bookmark",At=function(t,e,s,i){i=i||{},s=null==s?{}:s;var n=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return n.detail=s,t.dispatchEvent(n),n},Et={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function Vt(t,e){if(t in Et)return Et[t];switch(t){case"alarm_control_panel":switch(e){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return e&&"off"===e?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===e?"hass:window-closed":"hass:window-open";case"lock":return e&&"unlocked"===e?"hass:lock-open":"hass:lock";case"media_player":return e&&"off"!==e&&"idle"!==e?"hass:cast-connected":"hass:cast";case"zwave":switch(e){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+t+" ("+e+")"),Tt}}var jt={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},Ht={binary_sensor:function(t){var e=t.state&&"off"===t.state;switch(t.attributes.device_class){case"battery":return e?"hass:battery":"hass:battery-outline";case"cold":return e?"hass:thermometer":"hass:snowflake";case"connectivity":return e?"hass:server-network-off":"hass:server-network";case"door":return e?"hass:door-closed":"hass:door-open";case"garage_door":return e?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return e?"hass:shield-check":"hass:alert";case"heat":return e?"hass:thermometer":"hass:fire";case"light":return e?"hass:brightness-5":"hass:brightness-7";case"lock":return e?"hass:lock":"hass:lock-open";case"moisture":return e?"hass:water-off":"hass:water";case"motion":return e?"hass:walk":"hass:run";case"occupancy":return e?"hass:home-outline":"hass:home";case"opening":return e?"hass:square":"hass:square-outline";case"plug":return e?"hass:power-plug-off":"hass:power-plug";case"presence":return e?"hass:home-outline":"hass:home";case"sound":return e?"hass:music-note-off":"hass:music-note";case"vibration":return e?"hass:crop-portrait":"hass:vibrate";case"window":return e?"hass:window-closed":"hass:window-open";default:return e?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(t){var e="closed"!==t.state;switch(t.attributes.device_class){case"garage":return e?"hass:garage-open":"hass:garage";case"door":return e?"hass:door-open":"hass:door-closed";case"shutter":return e?"hass:window-shutter-open":"hass:window-shutter";case"blind":return e?"hass:blinds-open":"hass:blinds";case"window":return e?"hass:window-open":"hass:window-closed";default:return Vt("cover",t.state)}},sensor:function(t){var e=t.attributes.device_class;if(e&&e in jt)return jt[e];if("battery"===e){var s=Number(t.state);if(isNaN(s))return"hass:battery-unknown";var i=10*Math.round(s/10);return i>=100?"hass:battery":i<=0?"hass:battery-alert":"hass:battery-"+i}var n=t.attributes.unit_of_measurement;return"°C"===n||"°F"===n?"hass:thermometer":Vt("sensor")},input_datetime:function(t){return t.attributes.has_date?t.attributes.has_time?Vt("input_datetime"):"hass:calendar":"hass:clock"}};const Ut={state:!0,duration:!0,start_date:!0,end_date:!0,icon:!0,separator:!1},It={second:"${value}s",seconds:"${value}s",minute:"${value}m",minutes:"${value}m",hour:"${value}h",hours:"${value}h",day:"${value}d",days:"${value}d"},Rt={width:1,style:"solid",color:"var(--divider-color)"},Yt={required:{icon:"tune",name:"Required",secondary:"Required options for this card to function",show:!0},showOptions:{icon:"toggle-switch",name:"Show",secondary:"Customize what to display",show:!1},appearance:{icon:"palette",name:"Appearance",secondary:"Customize the title, number of events to display, etc",show:!1}};let zt=class extends st{constructor(){super(...arguments),this._initialized=!1}setConfig(t){this._config=t,this.loadCardHelpers()}get _title(){return this._config&&this._config.title||""}get _entity(){return this._config&&this._config.entity||""}get _history(){return this._config&&this._config.history||5}get _desc(){return!this._config||void 0===this._config.desc||this._config.desc}get _date_format(){return this._config&&this._config.date_format||""}get _no_event(){return this._config&&this._config.no_event||""}get _max_items(){return this._config&&this._config.max_items||-1}get _collapse(){if(this._config)return this._config.collapse}get _show_state(){var t;return!this._config||!this._config.show||(null===(t=this._config.show)||void 0===t?void 0:t.state)}get _show_duration(){var t;return!this._config||!this._config.show||(null===(t=this._config.show)||void 0===t?void 0:t.duration)}get _show_start_date(){var t;return!this._config||!this._config.show||(null===(t=this._config.show)||void 0===t?void 0:t.start_date)}get _show_end_date(){var t;return!this._config||!this._config.show||(null===(t=this._config.show)||void 0===t?void 0:t.end_date)}get _show_icon(){var t;return!this._config||!this._config.show||(null===(t=this._config.show)||void 0===t?void 0:t.icon)}get _show_separator(){var t;return!(!this._config||!this._config.show)&&(null===(t=this._config.show)||void 0===t?void 0:t.separator)}render(){if(!this.hass)return j``;const t=Object.keys(this.hass.states);return j`
      <div class="card-config">
        <div class="option" @click=${this._toggleOption} .option=${"required"}>
          <div class="row">
            <ha-icon .icon=${"mdi:"+Yt.required.icon}></ha-icon>
            <div class="title">${Yt.required.name}</div>
          </div>
          <div class="secondary">${Yt.required.secondary}</div>
        </div>
        ${Yt.required.show?j`
              <div class="values">
                <paper-dropdown-menu
                  label="Entity (Required)"
                  @value-changed=${this._valueChanged}
                  .configValue=${"entity"}
                >
                  <paper-listbox slot="dropdown-content" .selected=${t.indexOf(this._entity)}>
                    ${t.map(t=>j`
                        <paper-item>${t}</paper-item>
                      `)}
                  </paper-listbox>
                </paper-dropdown-menu>
              </div>
            `:""}
        <div class="option" @click=${this._toggleOption} .option=${"appearance"}>
          <div class="row">
            <ha-icon .icon=${"mdi:"+Yt.appearance.icon}></ha-icon>
            <div class="title">${Yt.appearance.name}</div>
          </div>
          <div class="secondary">${Yt.appearance.secondary}</div>
        </div>
        ${Yt.appearance.show?j`
              <div class="values">
                <paper-input
                  label="Title (Optional)"
                  .value=${this._title}
                  .configValue=${"title"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  type="number"
                  label="History: Numbers of days of history of the logbook"
                  min="1"
                  .value=${this._history}
                  .configValue=${"history"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  type="number"
                  min="-1"
                  label="Max Items: Maximum of events to display (-1 to display all events)"
                  .value=${this._max_items}
                  .configValue=${"max_items"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Text when no event"
                  .value=${this._no_event}
                  .configValue=${"no_event"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  type="number"
                  label="Collapse: Number of entities to show. Rest will be available in expandable section"
                  .value=${this._collapse}
                  .configValue=${"collapse"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Date format"
                  .value=${this._date_format}
                  .configValue=${"date_format"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <p>
                  <ha-formfield .label=${"Display events descending "+(this._desc?"on":"off")}>
                    <ha-switch
                      aria-label=${"Toggle desc "+(this._desc?"on":"off")}
                      .checked=${!1!==this._desc}
                      .configValue=${"desc"}
                      @change=${this._valueChanged}
                    ></ha-switch>
                  </ha-formfield>
                </p>
              </div>
            `:""}
        <div class="option" @click=${this._toggleOption} .option=${"showOptions"}>
          <div class="row">
            <ha-icon .icon=${"mdi:"+Yt.showOptions.icon}></ha-icon>
            <div class="title">${Yt.showOptions.name}</div>
          </div>
          <div class="secondary">${Yt.showOptions.secondary}</div>
        </div>
        ${Yt.showOptions.show?j`
              <div class="values">
                <p>
                  <ha-formfield .label=${"Display state"}>
                    <ha-switch
                      aria-label=${"Toggle display of state "+(this._show_state?"off":"on")}
                      .checked=${!1!==this._show_state}
                      .configValue=${"state"}
                      @change=${this._showOptionChanged}
                    ></ha-switch>
                  </ha-formfield>
                </p>
                <p>
                  <ha-formfield .label=${"Display duration"}>
                    <ha-switch
                      aria-label=${"Toggle display of duration "+(this._show_state?"off":"on")}
                      .checked=${!1!==this._show_duration}
                      .configValue=${"duration"}
                      @change=${this._showOptionChanged}
                    ></ha-switch>
                  </ha-formfield>
                </p>

                <ha-formfield .label=${"Display start date"}>
                  <ha-switch
                    aria-label=${"Toggle display of start date "+(this._show_start_date?"off":"on")}
                    .checked=${!1!==this._show_start_date}
                    .configValue=${"start_date"}
                    @change=${this._showOptionChanged}
                  ></ha-switch>
                </ha-formfield>
                </p>
                <p>
                  <ha-formfield .label=${"Display end date"}>
                    <ha-switch
                      aria-label=${"Toggle display of end date "+(this._show_end_date?"off":"on")}
                      .checked=${!1!==this._show_end_date}
                      .configValue=${"end_date"}
                      @change=${this._showOptionChanged}
                    ></ha-switch>
                  </ha-formfield>
                </p>
                <p>
                  <ha-formfield .label=${"Display icon"}>
                    <ha-switch
                      aria-label=${"Toggle display of icon "+(this._show_icon?"off":"on")}
                      .checked=${!0===this._show_icon}
                      .configValue=${"icon"}
                      @change=${this._showOptionChanged}
                    ></ha-switch>
                  </ha-formfield>
                </p>
                <p>
                  <ha-formfield .label=${"Display separator"}>
                    <ha-switch
                      aria-label=${"Toggle display of event separator "+(this._show_separator?"off":"on")}
                      .checked=${!1!==this._show_separator}
                      .configValue=${"separator"}
                      @change=${this._showOptionChanged}
                    ></ha-switch>
                  </ha-formfield>
                </p>  
              </div>
            `:""}
      </div>

      <p class="note">
        Note: Setting hiddenState, duration_labels, attributes, separator_style, state_map are available exclusively
        using Code Editor.
      </p>
    `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_toggleOption(t){this._toggleThing(t,Yt)}_toggleThing(t,e){const s=!e[t.target.option].show;for(const[t]of Object.entries(e))e[t].show=!1;e[t.target.option].show=s,this._toggle=!this._toggle}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;this["_"+e.configValue]!==e.value&&(e.configValue&&(""===e.value?delete this._config[e.configValue]:this._config=Object.assign(Object.assign({},this._config),{[e.configValue]:void 0!==e.checked?e.checked:e.attributes.type&&"number"===e.attributes.type.value&&Number.parseInt(e.value)?Number.parseInt(e.value):e.value})),At(this,"config-changed",{config:this._config}))}_showOptionChanged(t){if(!this._config||!this.hass)return;const e=t.target;e.configValue&&(this._config=Object.assign(Object.assign({},this._config),{show:Object.assign(Object.assign({},this._config.show||Ut),{[e.configValue]:e.checked})})),At(this,"config-changed",{config:this._config})}static get styles(){return tt`
      .option {
        padding: 4px 0px;
        cursor: pointer;
      }
      .row {
        display: flex;
        margin-bottom: -14px;
        pointer-events: none;
      }
      .title {
        padding-left: 16px;
        margin-top: -6px;
        pointer-events: none;
      }
      .secondary {
        padding-left: 40px;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .values {
        padding-left: 16px;
        background: var(--secondary-background-color);
      }
      ha-switch {
        padding-bottom: 8px;
      }
      .note {
        font-weight: bold;
      }
    `}};t([Z({attribute:!1})],zt.prototype,"hass",void 0),t([X()],zt.prototype,"_config",void 0),t([X()],zt.prototype,"_toggle",void 0),t([X()],zt.prototype,"_helpers",void 0),zt=t([W("logbook-card-editor")],zt);var qt={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning"},Lt={common:qt},Ft={version:"Version",invalid_configuration:"Configuration invalide",show_warning:"Afficher les warning"},Bt={common:Ft},Wt={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},Jt={common:Wt};const Zt={en:Object.freeze({__proto__:null,common:qt,default:Lt}),fr:Object.freeze({__proto__:null,common:Ft,default:Bt}),nb:Object.freeze({__proto__:null,common:Wt,default:Jt})};function Xt(t,e="",s=""){const i=t.split(".")[0],n=t.split(".")[1],r=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let a;try{a=Zt[r][i][n]}catch(t){a=Zt.en[i][n]}return void 0===a&&(a=Zt.en[i][n]),""!==e&&""!==s&&(a=a.replace(e,s)),a}console.info(`%c  LOGBOOK-CARD \n%c  ${Xt("common.version")} 1.3.2    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"logbook-card",name:"Logbook Card",preview:!0,description:"A custom card to display entity history"});let Gt=class extends st{constructor(){super(...arguments),this.MAX_UPDATE_DURATION=5e3}static async getConfigElement(){return document.createElement("logbook-card-editor")}static getStubConfig(t,e){return{entity:e[0]}}setConfig(t){if(!t)throw new Error(Xt("common.invalid_configuration"));if(!t.entity)throw new Error("Please define an entity.");if(void 0!==t.max_items&&!Number.isInteger(t.max_items))throw new Error("max_items must be an Integer.");if(t.hiddenState&&!Array.isArray(t.hiddenState))throw new Error("hiddenState must be an array");if(t.state_map&&!Array.isArray(t.state_map))throw new Error("state_map must be an array");if(t.attributes&&!Array.isArray(t.attributes))throw new Error("attributes must be an array");if(t.desc&&"boolean"!=typeof t.desc)throw new Error("desc must be a boolean");if(t.collapse&&!Number.isInteger(t.collapse))throw new Error("collapse must be a number");if(t.collapse&&t.max_items&&t.collapse>t.max_items)throw new Error("collapse must be greater than max-items");this.config=Object.assign(Object.assign({history:5,hiddenState:[],desc:!0,max_items:-1,no_event:"No event on the period",state_map:[],attributes:[]},t),{show:Object.assign(Object.assign({},Ut),t.show),duration_labels:Object.assign(Object.assign({},It),t.duration_labels),separator_style:Object.assign(Object.assign({},Rt),t.separator_style)})}mapState(t){var e,s;const i=null===(s=null===(e=this.config)||void 0===e?void 0:e.state_map)||void 0===s?void 0:s.find(e=>e.value===t.state);return void 0!==i&&i.label?i.label:this.hass?Mt(this.hass.localize,t,this.hass.selectedLanguage):t.state}mapIcon(t){var e,s;const i=null===(s=null===(e=this.config)||void 0===e?void 0:e.state_map)||void 0===s?void 0:s.find(e=>e.value===t.state);return void 0!==i&&i.icon?i.icon:function(t){if(!t)return Tt;if(t.attributes.icon)return t.attributes.icon;var e=Dt(t.entity_id);return e in Ht?Ht[e](t):Vt(e,t.state)}(t)}squashSameState(t,e){const s=t[t.length-1];return!s||s.state!==e.state&&"unknown"!==e.state?t.push(e):(s.end=e.end,s.duration+=e.duration),t}extractAttributes(t){var e,s;return null==(null===(e=this.config)||void 0===e?void 0:e.attributes)?[]:null===(s=this.config)||void 0===s?void 0:s.attributes.reduce((e,s)=>(t.attributes[s.value]&&e.push({name:s.label?s.label:s.value,value:this.formatAttributeValue(t.attributes[s.value],s.type)}),e),[])}formatDuration(t,e,s){return 1===s?t.replace("${value}",s.toString()):e.replace("${value}",s.toString())}getDuration(t,e){if(!t)return"";const s=t/1e3;if(s<60){const t=Math.round(s);return this.formatDuration(e.second,e.seconds,t)}const i=s/60;if(i<60){const t=Math.round(i);return this.formatDuration(e.minute,e.minutes,t)}const n=i/60;if(n<24){const t=Math.round(n);return this.formatDuration(e.hour,e.hours,t)}const r=Math.round(n/24);return this.formatDuration(e.day,e.days,r)}formatAttributeValue(t,e){return"date"===e?this._displayDate(new Date(t)):t}_displayDate(t){var e,s,i,n;return(null===(e=this.config)||void 0===e?void 0:e.date_format)?Ct(t,null!==(i=null===(s=this.config)||void 0===s?void 0:s.date_format)&&void 0!==i?i:void 0):Pt(t,(null===(n=this.hass)||void 0===n?void 0:n.language)||"en")}updateHistory(){var t,e,s;const i=this.hass;if(i&&this.config&&this.config.entity){const n=this.config.entity in i.states?i.states[this.config.entity]:null;if(n){this.config.title=null!==(e=null===(t=this.config)||void 0===t?void 0:t.title)&&void 0!==e?e:n.attributes.friendly_name+" History";const r="history/period/"+new Date((new Date).setDate((new Date).getDate()-(null!==(s=this.config.history)&&void 0!==s?s:5))).toISOString()+"?filter_entity_id="+this.config.entity+"&end_time="+(new Date).toISOString();let a=[];i.callApi("GET",r).then(t=>{var e,s;a=(t[0]||[]).map(t=>({state:t.state,label:this.mapState(t),start:new Date(t.last_changed),attributes:this.extractAttributes(t),icon:this.mapIcon(t)})).map((t,e,s)=>e<s.length-1?Object.assign(Object.assign({},t),{end:s[e+1].start}):Object.assign(Object.assign({},t),{end:new Date})).map(t=>Object.assign(Object.assign({},t),{duration:t.end-t.start})).reduce(this.squashSameState,[]).filter(t=>{var e,s;return!(null===(s=null===(e=this.config)||void 0===e?void 0:e.hiddenState)||void 0===s?void 0:s.includes(t.state))}).map(t=>{var e,s;return Object.assign(Object.assign({},t),{duration:this.getDuration(t.duration,null!==(s=null===(e=this.config)||void 0===e?void 0:e.duration_labels)&&void 0!==s?s:It)})}),a&&(null===(e=this.config)||void 0===e?void 0:e.desc)&&(a=a.reverse()),a&&this.config&&this.config.max_items&&this.config.max_items>0&&(a=a.splice(0,null===(s=this.config)||void 0===s?void 0:s.max_items)),this.history=a})}this.lastHistoryChanged=new Date}}shouldUpdate(t){return!!t.has("history")||(t.delete("history"),(!this.lastHistoryChanged||function(t,e,s){if(e.has("config")||s)return!0;if(t.config.entity){var i=e.get("hass");return!i||i.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!1)||(new Date).getTime()-this.lastHistoryChanged.getTime()>this.MAX_UPDATE_DURATION)&&this.updateHistory(),!1)}render(){return this.config&&this.hass?j`
      <ha-card .header=${this.config.title} tabindex="0" aria-label=${""+this.config.title}>
        <div class="card-content grid" style="[[contentStyle]]">
          ${this.renderHistory(this.history,this.config)}
        </div>
      </ha-card>
    `:j``}renderHistory(t,e){if(!t||0===(null==t?void 0:t.length))return j`
        <p>
          ${e.no_event}
        </p>
      `;if(e.collapse&&t.length>e.collapse){const s="expander"+Math.random().toString(10).substr(2);return j`
        ${this.renderHistoryItems(t.slice(0,e.collapse))}
        <input type="checkbox" class="expand" id="${s}" />
        <label for="${s}"><div>&lsaquo;</div></label>
        <div>
          ${this.renderHistoryItems(t.slice(e.collapse))}
        </div>
      `}return this.renderHistoryItems(t)}renderHistoryItems(t){return j`
      ${null==t?void 0:t.map((t,e,s)=>this.renderHistoryItem(t,e+1===s.length))}
    `}renderHistoryItem(t,e){var s,i,n,r,a;return j`
      <div class="item">
        ${this.renderIcon(t)}
        <div class="item-content">
          ${(null===(i=null===(s=this.config)||void 0===s?void 0:s.show)||void 0===i?void 0:i.state)?j`
                <span>${t.label}</span>
              `:j``}
          ${(null===(r=null===(n=this.config)||void 0===n?void 0:n.show)||void 0===r?void 0:r.duration)?j`
                <span class="duration">${t.duration}</span>
              `:j``}
          ${this.renderHistoryDate(t)}${null===(a=t.attributes)||void 0===a?void 0:a.map(this.renderAttributes)}
        </div>
      </div>
      ${e?"":this.renderSeparator()}
    `}renderSeparator(){var t,e,s,i,n,r,a,o;const l={border:"0","border-top":`${null===(e=null===(t=this.config)||void 0===t?void 0:t.separator_style)||void 0===e?void 0:e.width}px ${null===(i=null===(s=this.config)||void 0===s?void 0:s.separator_style)||void 0===i?void 0:i.style} ${null===(r=null===(n=this.config)||void 0===n?void 0:n.separator_style)||void 0===r?void 0:r.color}`};if(null===(o=null===(a=this.config)||void 0===a?void 0:a.show)||void 0===o?void 0:o.separator)return j`
        <hr style=${nt(l)} aria-hidden="true" />
      `}renderIcon(t){var e,s;if(null===(s=null===(e=this.config)||void 0===e?void 0:e.show)||void 0===s?void 0:s.icon)return j`
        <div class="item-icon">
          <ha-icon .icon=${t.icon}></ha-icon>
        </div>
      `}renderHistoryDate(t){var e,s,i,n,r,a,o,l;return(null===(s=null===(e=this.config)||void 0===e?void 0:e.show)||void 0===s?void 0:s.start_date)&&(null===(n=null===(i=this.config)||void 0===i?void 0:i.show)||void 0===n?void 0:n.end_date)?j`
        <div class="date">${this._displayDate(t.start)} - ${this._displayDate(t.end)}</div>
      `:(null===(a=null===(r=this.config)||void 0===r?void 0:r.show)||void 0===a?void 0:a.end_date)?j`
        <div class="date">${this._displayDate(t.end)}</div>
      `:(null===(l=null===(o=this.config)||void 0===o?void 0:o.show)||void 0===l?void 0:l.start_date)?j`
        <div class="date">${this._displayDate(t.start)}</div>
      `:j``}renderAttributes(t){return j`
      <div class="attribute">
        <div class="key">${t.name}</div>
        <div class="value">${t.value}</div>
      </div>
    `}static get styles(){return tt`
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
    `}};t([Z()],Gt.prototype,"hass",void 0),t([Z()],Gt.prototype,"config",void 0),t([Z()],Gt.prototype,"history",void 0),Gt=t([W("logbook-card")],Gt);export{Gt as LogbookCard};
