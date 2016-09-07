(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/*! cash-dom 1.3.4, https://github.com/kenwheeler/cash @license MIT */
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof exports !== "undefined") {
    module.exports = factory();
  } else {
    root.cash = root.$ = factory();
  }
})(this, function () {
  var doc = document, win = window, ArrayProto = Array.prototype, slice = ArrayProto.slice, filter = ArrayProto.filter, push = ArrayProto.push;

  var noop = function () {}, isFunction = function (item) {
    return typeof item === typeof noop;
  }, isString = function (item) {
    return typeof item === typeof "";
  };

  var idMatch = /^#[\w-]*$/, classMatch = /^\.[\w-]*$/, htmlMatch = /<.+>/, singlet = /^\w+$/;

  function find(selector, context) {
    context = context || doc;
    var elems = (classMatch.test(selector) ? context.getElementsByClassName(selector.slice(1)) : singlet.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector));
    return elems;
  }

  var frag, tmp;
  function parseHTML(str) {
    frag = frag || doc.createDocumentFragment();
    tmp = tmp || frag.appendChild(doc.createElement("div"));
    tmp.innerHTML = str;
    return tmp.childNodes;
  }

  function onReady(fn) {
    if (doc.readyState !== "loading") {
      fn();
    } else {
      doc.addEventListener("DOMContentLoaded", fn);
    }
  }

  function Init(selector, context) {
    if (!selector) {
      return this;
    }

    // If already a cash collection, don't do any further processing
    if (selector.cash && selector !== win) {
      return selector;
    }

    var elems = selector, i = 0, length;

    if (isString(selector)) {
      elems = (idMatch.test(selector) ?
      // If an ID use the faster getElementById check
      doc.getElementById(selector.slice(1)) : htmlMatch.test(selector) ?
      // If HTML, parse it into real elements
      parseHTML(selector) :
      // else use `find`
      find(selector, context));

      // If function, use as shortcut for DOM ready
    } else if (isFunction(selector)) {
      onReady(selector);return this;
    }

    if (!elems) {
      return this;
    }

    // If a single DOM element is passed in or received via ID, return the single element
    if (elems.nodeType || elems === win) {
      this[0] = elems;
      this.length = 1;
    } else {
      // Treat like an array and loop through each item.
      length = this.length = elems.length;
      for (; i < length; i++) {
        this[i] = elems[i];
      }
    }

    return this;
  }

  function cash(selector, context) {
    return new Init(selector, context);
  }

  var fn = cash.fn = cash.prototype = Init.prototype = { // jshint ignore:line
    constructor: cash,
    cash: true,
    length: 0,
    push: push,
    splice: ArrayProto.splice,
    map: ArrayProto.map,
    init: Init
  };

  cash.parseHTML = parseHTML;
  cash.noop = noop;
  cash.isFunction = isFunction;
  cash.isString = isString;

  cash.extend = fn.extend = function (target) {
    target = target || {};

    var args = slice.call(arguments), length = args.length, i = 1;

    if (args.length === 1) {
      target = this;
      i = 0;
    }

    for (; i < length; i++) {
      if (!args[i]) {
        continue;
      }
      for (var key in args[i]) {
        if (args[i].hasOwnProperty(key)) {
          target[key] = args[i][key];
        }
      }
    }

    return target;
  };

  function each(collection, callback) {
    var l = collection.length, i = 0;

    for (; i < l; i++) {
      if (callback.call(collection[i], collection[i], i, collection) === false) {
        break;
      }
    }
  }

  function matches(el, selector) {
    var m = el && (el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector);
    return !!m && m.call(el, selector);
  }

  function unique(collection) {
    return cash(slice.call(collection).filter(function (item, index, self) {
      return self.indexOf(item) === index;
    }));
  }

  cash.extend({
    merge: function (first, second) {
      var len = +second.length, i = first.length, j = 0;

      for (; j < len; i++, j++) {
        first[i] = second[j];
      }

      first.length = i;
      return first;
    },

    each: each,
    matches: matches,
    unique: unique,
    isArray: Array.isArray,
    isNumeric: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

  });

  var uid = cash.uid = "_cash" + Date.now();

  function getDataCache(node) {
    return (node[uid] = node[uid] || {});
  }

  function setData(node, key, value) {
    return (getDataCache(node)[key] = value);
  }

  function getData(node, key) {
    var c = getDataCache(node);
    if (c[key] === undefined) {
      c[key] = node.dataset ? node.dataset[key] : cash(node).attr("data-" + key);
    }
    return c[key];
  }

  function removeData(node, key) {
    var c = getDataCache(node);
    if (c) {
      delete c[key];
    } else if (node.dataset) {
      delete node.dataset[key];
    } else {
      cash(node).removeAttr("data-" + name);
    }
  }

  fn.extend({
    data: function (name, value) {
      if (isString(name)) {
        return (value === undefined ? getData(this[0], name) : this.each(function (v) {
          return setData(v, name, value);
        }));
      }

      for (var key in name) {
        this.data(key, name[key]);
      }

      return this;
    },

    removeData: function (key) {
      return this.each(function (v) {
        return removeData(v, key);
      });
    }

  });

  var notWhiteMatch = /\S+/g;

  function getClasses(c) {
    return isString(c) && c.match(notWhiteMatch);
  }

  function hasClass(v, c) {
    return (v.classList ? v.classList.contains(c) : new RegExp("(^| )" + c + "( |$)", "gi").test(v.className));
  }

  function addClass(v, c, spacedName) {
    if (v.classList) {
      v.classList.add(c);
    } else if (spacedName.indexOf(" " + c + " ")) {
      v.className += " " + c;
    }
  }

  function removeClass(v, c) {
    if (v.classList) {
      v.classList.remove(c);
    } else {
      v.className = v.className.replace(c, "");
    }
  }

  fn.extend({
    addClass: function (c) {
      var classes = getClasses(c);

      return (classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          addClass(v, c, spacedName);
        });
      }) : this);
    },

    attr: function (name, value) {
      if (!name) {
        return undefined;
      }

      if (isString(name)) {
        if (value === undefined) {
          return this[0] ? this[0].getAttribute ? this[0].getAttribute(name) : this[0][name] : undefined;
        }

        return this.each(function (v) {
          if (v.setAttribute) {
            v.setAttribute(name, value);
          } else {
            v[name] = value;
          }
        });
      }

      for (var key in name) {
        this.attr(key, name[key]);
      }

      return this;
    },

    hasClass: function (c) {
      var check = false, classes = getClasses(c);
      if (classes && classes.length) {
        this.each(function (v) {
          check = hasClass(v, classes[0]);
          return !check;
        });
      }
      return check;
    },

    prop: function (name, value) {
      if (isString(name)) {
        return (value === undefined ? this[0][name] : this.each(function (v) {
          v[name] = value;
        }));
      }

      for (var key in name) {
        this.prop(key, name[key]);
      }

      return this;
    },

    removeAttr: function (name) {
      return this.each(function (v) {
        if (v.removeAttribute) {
          v.removeAttribute(name);
        } else {
          delete v[name];
        }
      });
    },

    removeClass: function (c) {
      if (!arguments.length) {
        return this.attr("class", "");
      }
      var classes = getClasses(c);
      return (classes ? this.each(function (v) {
        each(classes, function (c) {
          removeClass(v, c);
        });
      }) : this);
    },

    removeProp: function (name) {
      return this.each(function (v) {
        delete v[name];
      });
    },

    toggleClass: function (c, state) {
      if (state !== undefined) {
        return this[state ? "addClass" : "removeClass"](c);
      }
      var classes = getClasses(c);
      return (classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          if (hasClass(v, c)) {
            removeClass(v, c);
          } else {
            addClass(v, c, spacedName);
          }
        });
      }) : this);
    } });

  fn.extend({
    add: function (selector, context) {
      return unique(cash.merge(this, cash(selector, context)));
    },

    each: function (callback) {
      each(this, callback);
      return this;
    },

    eq: function (index) {
      return cash(this.get(index));
    },

    filter: function (selector) {
      return cash(filter.call(this, (isString(selector) ? function (e) {
        return matches(e, selector);
      } : selector)));
    },

    first: function () {
      return this.eq(0);
    },

    get: function (index) {
      if (index === undefined) {
        return slice.call(this);
      }
      return (index < 0 ? this[index + this.length] : this[index]);
    },

    index: function (elem) {
      var child = elem ? cash(elem)[0] : this[0], collection = elem ? this : cash(child).parent().children();
      return slice.call(collection).indexOf(child);
    },

    last: function () {
      return this.eq(-1);
    }

  });

  var camelCase = (function () {
    var camelRegex = /(?:^\w|[A-Z]|\b\w)/g, whiteSpace = /[\s-_]+/g;
    return function (str) {
      return str.replace(camelRegex, function (letter, index) {
        return letter[index === 0 ? "toLowerCase" : "toUpperCase"]();
      }).replace(whiteSpace, "");
    };
  }());

  var getPrefixedProp = (function () {
    var cache = {}, doc = document, div = doc.createElement("div"), style = div.style;

    return function (prop) {
      prop = camelCase(prop);
      if (cache[prop]) {
        return cache[prop];
      }

      var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1), prefixes = ["webkit", "moz", "ms", "o"], props = (prop + " " + (prefixes).join(ucProp + " ") + ucProp).split(" ");

      each(props, function (p) {
        if (p in style) {
          cache[p] = prop = cache[prop] = p;
          return false;
        }
      });

      return cache[prop];
    };
  }());

  cash.prefixedProp = getPrefixedProp;
  cash.camelCase = camelCase;

  fn.extend({
    css: function (prop, value) {
      if (isString(prop)) {
        prop = getPrefixedProp(prop);
        return (arguments.length > 1 ? this.each(function (v) {
          return v.style[prop] = value;
        }) : win.getComputedStyle(this[0])[prop]);
      }

      for (var key in prop) {
        this.css(key, prop[key]);
      }

      return this;
    }

  });

  function compute(el, prop) {
    return parseInt(win.getComputedStyle(el[0], null)[prop], 10) || 0;
  }

  each(["Width", "Height"], function (v) {
    var lower = v.toLowerCase();

    fn[lower] = function () {
      return this[0].getBoundingClientRect()[lower];
    };

    fn["inner" + v] = function () {
      return this[0]["client" + v];
    };

    fn["outer" + v] = function (margins) {
      return this[0]["offset" + v] + (margins ? compute(this, "margin" + (v === "Width" ? "Left" : "Top")) + compute(this, "margin" + (v === "Width" ? "Right" : "Bottom")) : 0);
    };
  });

  function registerEvent(node, eventName, callback) {
    var eventCache = getData(node, "_cashEvents") || setData(node, "_cashEvents", {});
    eventCache[eventName] = eventCache[eventName] || [];
    eventCache[eventName].push(callback);
    node.addEventListener(eventName, callback);
  }

  function removeEvent(node, eventName, callback) {
    var eventCache = getData(node, "_cashEvents")[eventName];
    if (callback) {
      node.removeEventListener(eventName, callback);
    } else {
      each(eventCache, function (event) {
        node.removeEventListener(eventName, event);
      });
      eventCache = [];
    }
  }

  fn.extend({
    off: function (eventName, callback) {
      return this.each(function (v) {
        return removeEvent(v, eventName, callback);
      });
    },

    on: function (eventName, delegate, callback, runOnce) {
      // jshint ignore:line

      var originalCallback;

      if (!isString(eventName)) {
        for (var key in eventName) {
          this.on(key, delegate, eventName[key]);
        }
        return this;
      }

      if (isFunction(delegate)) {
        callback = delegate;
        delegate = null;
      }

      if (eventName === "ready") {
        onReady(callback);
        return this;
      }

      if (delegate) {
        originalCallback = callback;
        callback = function (e) {
          var t = e.target;

          while (!matches(t, delegate)) {
            if (t === this) {
              return (t = false);
            }
            t = t.parentNode;
          }

          if (t) {
            originalCallback.call(t, e);
          }
        };
      }

      return this.each(function (v) {
        var finalCallback = callback;
        if (runOnce) {
          finalCallback = function () {
            callback.apply(this, arguments);
            removeEvent(v, eventName, finalCallback);
          };
        }
        registerEvent(v, eventName, finalCallback);
      });
    },

    one: function (eventName, delegate, callback) {
      return this.on(eventName, delegate, callback, true);
    },

    ready: onReady,

    trigger: function (eventName, data) {
      var evt = doc.createEvent("HTMLEvents");
      evt.data = data;
      evt.initEvent(eventName, true, false);
      return this.each(function (v) {
        return v.dispatchEvent(evt);
      });
    }

  });

  function encode(name, value) {
    return "&" + encodeURIComponent(name) + "=" + encodeURIComponent(value).replace(/%20/g, "+");
  }
  function isCheckable(field) {
    return field.type === "radio" || field.type === "checkbox";
  }

  var formExcludes = ["file", "reset", "submit", "button"];

  fn.extend({
    serialize: function () {
      var formEl = this[0].elements, query = "";

      each(formEl, function (field) {
        if (field.name && formExcludes.indexOf(field.type) < 0) {
          if (field.type === "select-multiple") {
            each(field.options, function (o) {
              if (o.selected) {
                query += encode(field.name, o.value);
              }
            });
          } else if (!isCheckable(field) || (isCheckable(field) && field.checked)) {
            query += encode(field.name, field.value);
          }
        }
      });

      return query.substr(1);
    },

    val: function (value) {
      if (value === undefined) {
        return this[0].value;
      } else {
        return this.each(function (v) {
          return v.value = value;
        });
      }
    }

  });

  function insertElement(el, child, prepend) {
    if (prepend) {
      var first = el.childNodes[0];
      el.insertBefore(child, first);
    } else {
      el.appendChild(child);
    }
  }

  function insertContent(parent, child, prepend) {
    var str = isString(child);

    if (!str && child.length) {
      each(child, function (v) {
        return insertContent(parent, v, prepend);
      });
      return;
    }

    each(parent, str ? function (v) {
      return v.insertAdjacentHTML(prepend ? "afterbegin" : "beforeend", child);
    } : function (v, i) {
      return insertElement(v, (i === 0 ? child : child.cloneNode(true)), prepend);
    });
  }

  fn.extend({
    after: function (selector) {
      cash(selector).insertAfter(this);
      return this;
    },

    append: function (content) {
      insertContent(this, content);
      return this;
    },

    appendTo: function (parent) {
      insertContent(cash(parent), this);
      return this;
    },

    before: function (selector) {
      cash(selector).insertBefore(this);
      return this;
    },

    clone: function () {
      return cash(this.map(function (v) {
        return v.cloneNode(true);
      }));
    },

    empty: function () {
      this.html("");
      return this;
    },

    html: function (content) {
      if (content === undefined) {
        return this[0].innerHTML;
      }
      var source = (content.nodeType ? content[0].outerHTML : content);
      return this.each(function (v) {
        return v.innerHTML = source;
      });
    },

    insertAfter: function (selector) {
      var _this = this;


      cash(selector).each(function (el, i) {
        var parent = el.parentNode, sibling = el.nextSibling;
        _this.each(function (v) {
          parent.insertBefore((i === 0 ? v : v.cloneNode(true)), sibling);
        });
      });

      return this;
    },

    insertBefore: function (selector) {
      var _this2 = this;
      cash(selector).each(function (el, i) {
        var parent = el.parentNode;
        _this2.each(function (v) {
          parent.insertBefore((i === 0 ? v : v.cloneNode(true)), el);
        });
      });
      return this;
    },

    prepend: function (content) {
      insertContent(this, content, true);
      return this;
    },

    prependTo: function (parent) {
      insertContent(cash(parent), this, true);
      return this;
    },

    remove: function () {
      return this.each(function (v) {
        return v.parentNode.removeChild(v);
      });
    },

    text: function (content) {
      if (content === undefined) {
        return this[0].textContent;
      }
      return this.each(function (v) {
        return v.textContent = content;
      });
    }

  });

  var docEl = doc.documentElement;

  fn.extend({
    position: function () {
      var el = this[0];
      return {
        left: el.offsetLeft,
        top: el.offsetTop
      };
    },

    offset: function () {
      var rect = this[0].getBoundingClientRect();
      return {
        top: rect.top + win.pageYOffset - docEl.clientTop,
        left: rect.left + win.pageXOffset - docEl.clientLeft
      };
    },

    offsetParent: function () {
      return cash(this[0].offsetParent);
    }

  });

  function directCompare(el, selector) {
    return el === selector;
  }

  fn.extend({
    children: function (selector) {
      var elems = [];
      this.each(function (el) {
        push.apply(elems, el.children);
      });
      elems = unique(elems);

      return (!selector ? elems : elems.filter(function (v) {
        return matches(v, selector);
      }));
    },

    closest: function (selector) {
      if (!selector || matches(this[0], selector)) {
        return this;
      }
      return this.parent().closest(selector);
    },

    is: function (selector) {
      if (!selector) {
        return false;
      }

      var match = false, comparator = (isString(selector) ? matches : selector.cash ? function (el) {
        return selector.is(el);
      } : directCompare);

      this.each(function (el, i) {
        match = comparator(el, selector, i);
        return !match;
      });

      return match;
    },

    find: function (selector) {
      if (!selector) {
        return cash();
      }

      var elems = [];
      this.each(function (el) {
        push.apply(elems, find(selector, el));
      });

      return unique(elems);
    },

    has: function (selector) {
      return filter.call(this, function (el) {
        return cash(el).find(selector).length !== 0;
      });
    },

    next: function () {
      return cash(this[0].nextElementSibling);
    },

    not: function (selector) {
      return filter.call(this, function (el) {
        return !matches(el, selector);
      });
    },

    parent: function () {
      var result = this.map(function (item) {
        return item.parentElement || doc.body.parentNode;
      });

      return unique(result);
    },

    parents: function (selector) {
      var last, result = [];

      this.each(function (item) {
        last = item;

        while (last !== doc.body.parentNode) {
          last = last.parentElement;

          if (!selector || (selector && matches(last, selector))) {
            result.push(last);
          }
        }
      });

      return unique(result);
    },

    prev: function () {
      return cash(this[0].previousElementSibling);
    },

    siblings: function () {
      var collection = this.parent().children(), el = this[0];

      return filter.call(collection, function (i) {
        return i !== el;
      });
    }

  });


  return cash;
});
},{}],2:[function(require,module,exports){
/*! skrollr 0.6.26 (2014-06-08) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
(function(e,t,r){"use strict";function n(r){if(o=t.documentElement,a=t.body,K(),it=this,r=r||{},ut=r.constants||{},r.easing)for(var n in r.easing)U[n]=r.easing[n];yt=r.edgeStrategy||"set",ct={beforerender:r.beforerender,render:r.render,keyframe:r.keyframe},ft=r.forceHeight!==!1,ft&&(Vt=r.scale||1),mt=r.mobileDeceleration||x,dt=r.smoothScrolling!==!1,gt=r.smoothScrollingDuration||E,vt={targetTop:it.getScrollTop()},Gt=(r.mobileCheck||function(){return/Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent||navigator.vendor||e.opera)})(),Gt?(st=t.getElementById("skrollr-body"),st&&at(),X(),Dt(o,[y,S],[T])):Dt(o,[y,b],[T]),it.refresh(),St(e,"resize orientationchange",function(){var e=o.clientWidth,t=o.clientHeight;(t!==$t||e!==Mt)&&($t=t,Mt=e,_t=!0)});var i=Y();return function l(){Z(),bt=i(l)}(),it}var o,a,i={get:function(){return it},init:function(e){return it||new n(e)},VERSION:"0.6.26"},l=Object.prototype.hasOwnProperty,s=e.Math,c=e.getComputedStyle,f="touchstart",u="touchmove",m="touchcancel",p="touchend",d="skrollable",g=d+"-before",v=d+"-between",h=d+"-after",y="skrollr",T="no-"+y,b=y+"-desktop",S=y+"-mobile",k="linear",w=1e3,x=.004,E=200,A="start",F="end",C="center",D="bottom",H="___skrollable_id",I=/^(?:input|textarea|button|select)$/i,P=/^\s+|\s+$/g,N=/^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,O=/\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,V=/^(@?[a-z\-]+)\[(\w+)\]$/,z=/-([a-z0-9_])/g,q=function(e,t){return t.toUpperCase()},L=/[\-+]?[\d]*\.?[\d]+/g,M=/\{\?\}/g,$=/rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,_=/[a-z\-]+-gradient/g,B="",G="",K=function(){var e=/^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;if(c){var t=c(a,null);for(var n in t)if(B=n.match(e)||+n==n&&t[n].match(e))break;if(!B)return B=G="",r;B=B[0],"-"===B.slice(0,1)?(G=B,B={"-webkit-":"webkit","-moz-":"Moz","-ms-":"ms","-o-":"O"}[B]):G="-"+B.toLowerCase()+"-"}},Y=function(){var t=e.requestAnimationFrame||e[B.toLowerCase()+"RequestAnimationFrame"],r=Pt();return(Gt||!t)&&(t=function(t){var n=Pt()-r,o=s.max(0,1e3/60-n);return e.setTimeout(function(){r=Pt(),t()},o)}),t},R=function(){var t=e.cancelAnimationFrame||e[B.toLowerCase()+"CancelAnimationFrame"];return(Gt||!t)&&(t=function(t){return e.clearTimeout(t)}),t},U={begin:function(){return 0},end:function(){return 1},linear:function(e){return e},quadratic:function(e){return e*e},cubic:function(e){return e*e*e},swing:function(e){return-s.cos(e*s.PI)/2+.5},sqrt:function(e){return s.sqrt(e)},outCubic:function(e){return s.pow(e-1,3)+1},bounce:function(e){var t;if(.5083>=e)t=3;else if(.8489>=e)t=9;else if(.96208>=e)t=27;else{if(!(.99981>=e))return 1;t=91}return 1-s.abs(3*s.cos(1.028*e*t)/t)}};n.prototype.refresh=function(e){var n,o,a=!1;for(e===r?(a=!0,lt=[],Bt=0,e=t.getElementsByTagName("*")):e.length===r&&(e=[e]),n=0,o=e.length;o>n;n++){var i=e[n],l=i,s=[],c=dt,f=yt,u=!1;if(a&&H in i&&delete i[H],i.attributes){for(var m=0,p=i.attributes.length;p>m;m++){var g=i.attributes[m];if("data-anchor-target"!==g.name)if("data-smooth-scrolling"!==g.name)if("data-edge-strategy"!==g.name)if("data-emit-events"!==g.name){var v=g.name.match(N);if(null!==v){var h={props:g.value,element:i,eventType:g.name.replace(z,q)};s.push(h);var y=v[1];y&&(h.constant=y.substr(1));var T=v[2];/p$/.test(T)?(h.isPercentage=!0,h.offset=(0|T.slice(0,-1))/100):h.offset=0|T;var b=v[3],S=v[4]||b;b&&b!==A&&b!==F?(h.mode="relative",h.anchors=[b,S]):(h.mode="absolute",b===F?h.isEnd=!0:h.isPercentage||(h.offset=h.offset*Vt))}}else u=!0;else f=g.value;else c="off"!==g.value;else if(l=t.querySelector(g.value),null===l)throw'Unable to find anchor target "'+g.value+'"'}if(s.length){var k,w,x;!a&&H in i?(x=i[H],k=lt[x].styleAttr,w=lt[x].classAttr):(x=i[H]=Bt++,k=i.style.cssText,w=Ct(i)),lt[x]={element:i,styleAttr:k,classAttr:w,anchorTarget:l,keyFrames:s,smoothScrolling:c,edgeStrategy:f,emitEvents:u,lastFrameIndex:-1},Dt(i,[d],[])}}}for(Et(),n=0,o=e.length;o>n;n++){var E=lt[e[n][H]];E!==r&&(J(E),et(E))}return it},n.prototype.relativeToAbsolute=function(e,t,r){var n=o.clientHeight,a=e.getBoundingClientRect(),i=a.top,l=a.bottom-a.top;return t===D?i-=n:t===C&&(i-=n/2),r===D?i+=l:r===C&&(i+=l/2),i+=it.getScrollTop(),0|i+.5},n.prototype.animateTo=function(e,t){t=t||{};var n=Pt(),o=it.getScrollTop();return pt={startTop:o,topDiff:e-o,targetTop:e,duration:t.duration||w,startTime:n,endTime:n+(t.duration||w),easing:U[t.easing||k],done:t.done},pt.topDiff||(pt.done&&pt.done.call(it,!1),pt=r),it},n.prototype.stopAnimateTo=function(){pt&&pt.done&&pt.done.call(it,!0),pt=r},n.prototype.isAnimatingTo=function(){return!!pt},n.prototype.isMobile=function(){return Gt},n.prototype.setScrollTop=function(t,r){return ht=r===!0,Gt?Kt=s.min(s.max(t,0),Ot):e.scrollTo(0,t),it},n.prototype.getScrollTop=function(){return Gt?Kt:e.pageYOffset||o.scrollTop||a.scrollTop||0},n.prototype.getMaxScrollTop=function(){return Ot},n.prototype.on=function(e,t){return ct[e]=t,it},n.prototype.off=function(e){return delete ct[e],it},n.prototype.destroy=function(){var e=R();e(bt),wt(),Dt(o,[T],[y,b,S]);for(var t=0,n=lt.length;n>t;t++)ot(lt[t].element);o.style.overflow=a.style.overflow="",o.style.height=a.style.height="",st&&i.setStyle(st,"transform","none"),it=r,st=r,ct=r,ft=r,Ot=0,Vt=1,ut=r,mt=r,zt="down",qt=-1,Mt=0,$t=0,_t=!1,pt=r,dt=r,gt=r,vt=r,ht=r,Bt=0,yt=r,Gt=!1,Kt=0,Tt=r};var X=function(){var n,i,l,c,d,g,v,h,y,T,b,S;St(o,[f,u,m,p].join(" "),function(e){var o=e.changedTouches[0];for(c=e.target;3===c.nodeType;)c=c.parentNode;switch(d=o.clientY,g=o.clientX,T=e.timeStamp,I.test(c.tagName)||e.preventDefault(),e.type){case f:n&&n.blur(),it.stopAnimateTo(),n=c,i=v=d,l=g,y=T;break;case u:I.test(c.tagName)&&t.activeElement!==c&&e.preventDefault(),h=d-v,S=T-b,it.setScrollTop(Kt-h,!0),v=d,b=T;break;default:case m:case p:var a=i-d,k=l-g,w=k*k+a*a;if(49>w){if(!I.test(n.tagName)){n.focus();var x=t.createEvent("MouseEvents");x.initMouseEvent("click",!0,!0,e.view,1,o.screenX,o.screenY,o.clientX,o.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null),n.dispatchEvent(x)}return}n=r;var E=h/S;E=s.max(s.min(E,3),-3);var A=s.abs(E/mt),F=E*A+.5*mt*A*A,C=it.getScrollTop()-F,D=0;C>Ot?(D=(Ot-C)/F,C=Ot):0>C&&(D=-C/F,C=0),A*=1-D,it.animateTo(0|C+.5,{easing:"outCubic",duration:A})}}),e.scrollTo(0,0),o.style.overflow=a.style.overflow="hidden"},j=function(){var e,t,r,n,a,i,l,c,f,u,m,p=o.clientHeight,d=At();for(c=0,f=lt.length;f>c;c++)for(e=lt[c],t=e.element,r=e.anchorTarget,n=e.keyFrames,a=0,i=n.length;i>a;a++)l=n[a],u=l.offset,m=d[l.constant]||0,l.frame=u,l.isPercentage&&(u*=p,l.frame=u),"relative"===l.mode&&(ot(t),l.frame=it.relativeToAbsolute(r,l.anchors[0],l.anchors[1])-u,ot(t,!0)),l.frame+=m,ft&&!l.isEnd&&l.frame>Ot&&(Ot=l.frame);for(Ot=s.max(Ot,Ft()),c=0,f=lt.length;f>c;c++){for(e=lt[c],n=e.keyFrames,a=0,i=n.length;i>a;a++)l=n[a],m=d[l.constant]||0,l.isEnd&&(l.frame=Ot-l.offset+m);e.keyFrames.sort(Nt)}},W=function(e,t){for(var r=0,n=lt.length;n>r;r++){var o,a,s=lt[r],c=s.element,f=s.smoothScrolling?e:t,u=s.keyFrames,m=u.length,p=u[0],y=u[u.length-1],T=p.frame>f,b=f>y.frame,S=T?p:y,k=s.emitEvents,w=s.lastFrameIndex;if(T||b){if(T&&-1===s.edge||b&&1===s.edge)continue;switch(T?(Dt(c,[g],[h,v]),k&&w>-1&&(xt(c,p.eventType,zt),s.lastFrameIndex=-1)):(Dt(c,[h],[g,v]),k&&m>w&&(xt(c,y.eventType,zt),s.lastFrameIndex=m)),s.edge=T?-1:1,s.edgeStrategy){case"reset":ot(c);continue;case"ease":f=S.frame;break;default:case"set":var x=S.props;for(o in x)l.call(x,o)&&(a=nt(x[o].value),0===o.indexOf("@")?c.setAttribute(o.substr(1),a):i.setStyle(c,o,a));continue}}else 0!==s.edge&&(Dt(c,[d,v],[g,h]),s.edge=0);for(var E=0;m-1>E;E++)if(f>=u[E].frame&&u[E+1].frame>=f){var A=u[E],F=u[E+1];for(o in A.props)if(l.call(A.props,o)){var C=(f-A.frame)/(F.frame-A.frame);C=A.props[o].easing(C),a=rt(A.props[o].value,F.props[o].value,C),a=nt(a),0===o.indexOf("@")?c.setAttribute(o.substr(1),a):i.setStyle(c,o,a)}k&&w!==E&&("down"===zt?xt(c,A.eventType,zt):xt(c,F.eventType,zt),s.lastFrameIndex=E);break}}},Z=function(){_t&&(_t=!1,Et());var e,t,n=it.getScrollTop(),o=Pt();if(pt)o>=pt.endTime?(n=pt.targetTop,e=pt.done,pt=r):(t=pt.easing((o-pt.startTime)/pt.duration),n=0|pt.startTop+t*pt.topDiff),it.setScrollTop(n,!0);else if(!ht){var a=vt.targetTop-n;a&&(vt={startTop:qt,topDiff:n-qt,targetTop:n,startTime:Lt,endTime:Lt+gt}),vt.endTime>=o&&(t=U.sqrt((o-vt.startTime)/gt),n=0|vt.startTop+t*vt.topDiff)}if(Gt&&st&&i.setStyle(st,"transform","translate(0, "+-Kt+"px) "+Tt),ht||qt!==n){zt=n>qt?"down":qt>n?"up":zt,ht=!1;var l={curTop:n,lastTop:qt,maxTop:Ot,direction:zt},s=ct.beforerender&&ct.beforerender.call(it,l);s!==!1&&(W(n,it.getScrollTop()),qt=n,ct.render&&ct.render.call(it,l)),e&&e.call(it,!1)}Lt=o},J=function(e){for(var t=0,r=e.keyFrames.length;r>t;t++){for(var n,o,a,i,l=e.keyFrames[t],s={};null!==(i=O.exec(l.props));)a=i[1],o=i[2],n=a.match(V),null!==n?(a=n[1],n=n[2]):n=k,o=o.indexOf("!")?Q(o):[o.slice(1)],s[a]={value:o,easing:U[n]};l.props=s}},Q=function(e){var t=[];return $.lastIndex=0,e=e.replace($,function(e){return e.replace(L,function(e){return 100*(e/255)+"%"})}),G&&(_.lastIndex=0,e=e.replace(_,function(e){return G+e})),e=e.replace(L,function(e){return t.push(+e),"{?}"}),t.unshift(e),t},et=function(e){var t,r,n={};for(t=0,r=e.keyFrames.length;r>t;t++)tt(e.keyFrames[t],n);for(n={},t=e.keyFrames.length-1;t>=0;t--)tt(e.keyFrames[t],n)},tt=function(e,t){var r;for(r in t)l.call(e.props,r)||(e.props[r]=t[r]);for(r in e.props)t[r]=e.props[r]},rt=function(e,t,r){var n,o=e.length;if(o!==t.length)throw"Can't interpolate between \""+e[0]+'" and "'+t[0]+'"';var a=[e[0]];for(n=1;o>n;n++)a[n]=e[n]+(t[n]-e[n])*r;return a},nt=function(e){var t=1;return M.lastIndex=0,e[0].replace(M,function(){return e[t++]})},ot=function(e,t){e=[].concat(e);for(var r,n,o=0,a=e.length;a>o;o++)n=e[o],r=lt[n[H]],r&&(t?(n.style.cssText=r.dirtyStyleAttr,Dt(n,r.dirtyClassAttr)):(r.dirtyStyleAttr=n.style.cssText,r.dirtyClassAttr=Ct(n),n.style.cssText=r.styleAttr,Dt(n,r.classAttr)))},at=function(){Tt="translateZ(0)",i.setStyle(st,"transform",Tt);var e=c(st),t=e.getPropertyValue("transform"),r=e.getPropertyValue(G+"transform"),n=t&&"none"!==t||r&&"none"!==r;n||(Tt="")};i.setStyle=function(e,t,r){var n=e.style;if(t=t.replace(z,q).replace("-",""),"zIndex"===t)n[t]=isNaN(r)?r:""+(0|r);else if("float"===t)n.styleFloat=n.cssFloat=r;else try{B&&(n[B+t.slice(0,1).toUpperCase()+t.slice(1)]=r),n[t]=r}catch(o){}};var it,lt,st,ct,ft,ut,mt,pt,dt,gt,vt,ht,yt,Tt,bt,St=i.addEvent=function(t,r,n){var o=function(t){return t=t||e.event,t.target||(t.target=t.srcElement),t.preventDefault||(t.preventDefault=function(){t.returnValue=!1,t.defaultPrevented=!0}),n.call(this,t)};r=r.split(" ");for(var a,i=0,l=r.length;l>i;i++)a=r[i],t.addEventListener?t.addEventListener(a,n,!1):t.attachEvent("on"+a,o),Yt.push({element:t,name:a,listener:n})},kt=i.removeEvent=function(e,t,r){t=t.split(" ");for(var n=0,o=t.length;o>n;n++)e.removeEventListener?e.removeEventListener(t[n],r,!1):e.detachEvent("on"+t[n],r)},wt=function(){for(var e,t=0,r=Yt.length;r>t;t++)e=Yt[t],kt(e.element,e.name,e.listener);Yt=[]},xt=function(e,t,r){ct.keyframe&&ct.keyframe.call(it,e,t,r)},Et=function(){var e=it.getScrollTop();Ot=0,ft&&!Gt&&(a.style.height=""),j(),ft&&!Gt&&(a.style.height=Ot+o.clientHeight+"px"),Gt?it.setScrollTop(s.min(it.getScrollTop(),Ot)):it.setScrollTop(e,!0),ht=!0},At=function(){var e,t,r=o.clientHeight,n={};for(e in ut)t=ut[e],"function"==typeof t?t=t.call(it):/p$/.test(t)&&(t=t.slice(0,-1)/100*r),n[e]=t;return n},Ft=function(){var e=st&&st.offsetHeight||0,t=s.max(e,a.scrollHeight,a.offsetHeight,o.scrollHeight,o.offsetHeight,o.clientHeight);return t-o.clientHeight},Ct=function(t){var r="className";return e.SVGElement&&t instanceof e.SVGElement&&(t=t[r],r="baseVal"),t[r]},Dt=function(t,n,o){var a="className";if(e.SVGElement&&t instanceof e.SVGElement&&(t=t[a],a="baseVal"),o===r)return t[a]=n,r;for(var i=t[a],l=0,s=o.length;s>l;l++)i=It(i).replace(It(o[l])," ");i=Ht(i);for(var c=0,f=n.length;f>c;c++)-1===It(i).indexOf(It(n[c]))&&(i+=" "+n[c]);t[a]=Ht(i)},Ht=function(e){return e.replace(P,"")},It=function(e){return" "+e+" "},Pt=Date.now||function(){return+new Date},Nt=function(e,t){return e.frame-t.frame},Ot=0,Vt=1,zt="down",qt=-1,Lt=Pt(),Mt=0,$t=0,_t=!1,Bt=0,Gt=!1,Kt=0,Yt=[];"function"==typeof define&&define.amd?define("skrollr",function(){return i}):"undefined"!=typeof module&&module.exports?module.exports=i:e.skrollr=i})(window,document);
},{}],3:[function(require,module,exports){
(function (global){
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.smoothScroll = factory(root);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

	'use strict';

	//
	// Variables
	//

	var smoothScroll = {}; // Object for public APIs
	var supports = 'querySelector' in document && 'addEventListener' in root; // Feature test
	var settings, eventTimeout, fixedHeader, headerHeight, animationInterval;

	// Default settings
	var defaults = {
		selector: '[data-scroll]',
		selectorHeader: '[data-scroll-header]',
		speed: 500,
		easing: 'easeInOutCubic',
		offset: 0,
		updateURL: true,
		callback: function () {}
	};


	//
	// Methods
	//

	/**
	 * Merge two or more objects. Returns a new object.
	 * @private
	 * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
	 * @param {Object}   objects  The objects to merge together
	 * @returns {Object}          Merged values of defaults and options
	 */
	var extend = function () {

		// Variables
		var extended = {};
		var deep = false;
		var i = 0;
		var length = arguments.length;

		// Check if a deep merge
		if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
			deep = arguments[0];
			i++;
		}

		// Merge the object into the extended object
		var merge = function (obj) {
			for ( var prop in obj ) {
				if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
					// If deep merge and property is an object, merge properties
					if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
						extended[prop] = extend( true, extended[prop], obj[prop] );
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for ( ; i < length; i++ ) {
			var obj = arguments[i];
			merge(obj);
		}

		return extended;

	};

	/**
	 * Get the height of an element.
	 * @private
	 * @param  {Node} elem The element to get the height of
	 * @return {Number}    The element's height in pixels
	 */
	var getHeight = function ( elem ) {
		return Math.max( elem.scrollHeight, elem.offsetHeight, elem.clientHeight );
	};

	/**
	 * Get the closest matching element up the DOM tree.
	 * @private
	 * @param  {Element} elem     Starting element
	 * @param  {String}  selector Selector to match against (class, ID, data attribute, or tag)
	 * @return {Boolean|Element}  Returns null if not match found
	 */
	var getClosest = function ( elem, selector ) {

		// Variables
		var firstChar = selector.charAt(0);
		var supports = 'classList' in document.documentElement;
		var attribute, value;

		// If selector is a data attribute, split attribute from value
		if ( firstChar === '[' ) {
			selector = selector.substr(1, selector.length - 2);
			attribute = selector.split( '=' );

			if ( attribute.length > 1 ) {
				value = true;
				attribute[1] = attribute[1].replace( /"/g, '' ).replace( /'/g, '' );
			}
		}

		// Get closest match
		for ( ; elem && elem !== document; elem = elem.parentNode ) {

			// If selector is a class
			if ( firstChar === '.' ) {
				if ( supports ) {
					if ( elem.classList.contains( selector.substr(1) ) ) {
						return elem;
					}
				} else {
					if ( new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test( elem.className ) ) {
						return elem;
					}
				}
			}

			// If selector is an ID
			if ( firstChar === '#' ) {
				if ( elem.id === selector.substr(1) ) {
					return elem;
				}
			}

			// If selector is a data attribute
			if ( firstChar === '[' ) {
				if ( elem.hasAttribute( attribute[0] ) ) {
					if ( value ) {
						if ( elem.getAttribute( attribute[0] ) === attribute[1] ) {
							return elem;
						}
					} else {
						return elem;
					}
				}
			}

			// If selector is a tag
			if ( elem.tagName.toLowerCase() === selector ) {
				return elem;
			}

		}

		return null;

	};

	/**
	 * Escape special characters for use with querySelector
	 * @public
	 * @param {String} id The anchor ID to escape
	 * @author Mathias Bynens
	 * @link https://github.com/mathiasbynens/CSS.escape
	 */
	smoothScroll.escapeCharacters = function ( id ) {

		// Remove leading hash
		if ( id.charAt(0) === '#' ) {
			id = id.substr(1);
		}

		var string = String(id);
		var length = string.length;
		var index = -1;
		var codeUnit;
		var result = '';
		var firstCodeUnit = string.charCodeAt(0);
		while (++index < length) {
			codeUnit = string.charCodeAt(index);
			// Note: there’s no need to special-case astral symbols, surrogate
			// pairs, or lone surrogates.

			// If the character is NULL (U+0000), then throw an
			// `InvalidCharacterError` exception and terminate these steps.
			if (codeUnit === 0x0000) {
				throw new InvalidCharacterError(
					'Invalid character: the input contains U+0000.'
				);
			}

			if (
				// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
				// U+007F, […]
				(codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
				// If the character is the first character and is in the range [0-9]
				// (U+0030 to U+0039), […]
				(index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
				// If the character is the second character and is in the range [0-9]
				// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
				(
					index === 1 &&
					codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
					firstCodeUnit === 0x002D
				)
			) {
				// http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
				result += '\\' + codeUnit.toString(16) + ' ';
				continue;
			}

			// If the character is not handled by one of the above rules and is
			// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
			// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
			// U+005A), or [a-z] (U+0061 to U+007A), […]
			if (
				codeUnit >= 0x0080 ||
				codeUnit === 0x002D ||
				codeUnit === 0x005F ||
				codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
				codeUnit >= 0x0041 && codeUnit <= 0x005A ||
				codeUnit >= 0x0061 && codeUnit <= 0x007A
			) {
				// the character itself
				result += string.charAt(index);
				continue;
			}

			// Otherwise, the escaped character.
			// http://dev.w3.org/csswg/cssom/#escape-a-character
			result += '\\' + string.charAt(index);

		}

		return '#' + result;

	};

	/**
	 * Calculate the easing pattern
	 * @private
	 * @link https://gist.github.com/gre/1650294
	 * @param {String} type Easing pattern
	 * @param {Number} time Time animation should take to complete
	 * @returns {Number}
	 */
	var easingPattern = function ( type, time ) {
		var pattern;
		if ( type === 'easeInQuad' ) pattern = time * time; // accelerating from zero velocity
		if ( type === 'easeOutQuad' ) pattern = time * (2 - time); // decelerating to zero velocity
		if ( type === 'easeInOutQuad' ) pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
		if ( type === 'easeInCubic' ) pattern = time * time * time; // accelerating from zero velocity
		if ( type === 'easeOutCubic' ) pattern = (--time) * time * time + 1; // decelerating to zero velocity
		if ( type === 'easeInOutCubic' ) pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
		if ( type === 'easeInQuart' ) pattern = time * time * time * time; // accelerating from zero velocity
		if ( type === 'easeOutQuart' ) pattern = 1 - (--time) * time * time * time; // decelerating to zero velocity
		if ( type === 'easeInOutQuart' ) pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
		if ( type === 'easeInQuint' ) pattern = time * time * time * time * time; // accelerating from zero velocity
		if ( type === 'easeOutQuint' ) pattern = 1 + (--time) * time * time * time * time; // decelerating to zero velocity
		if ( type === 'easeInOutQuint' ) pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
		return pattern || time; // no easing, no acceleration
	};

	/**
	 * Calculate how far to scroll
	 * @private
	 * @param {Element} anchor The anchor element to scroll to
	 * @param {Number} headerHeight Height of a fixed header, if any
	 * @param {Number} offset Number of pixels by which to offset scroll
	 * @returns {Number}
	 */
	var getEndLocation = function ( anchor, headerHeight, offset ) {
		var location = 0;
		if (anchor.offsetParent) {
			do {
				location += anchor.offsetTop;
				anchor = anchor.offsetParent;
			} while (anchor);
		}
		location = location - headerHeight - offset;
		return location >= 0 ? location : 0;
	};

	/**
	 * Determine the document's height
	 * @private
	 * @returns {Number}
	 */
	var getDocumentHeight = function () {
		return Math.max(
			root.document.body.scrollHeight, root.document.documentElement.scrollHeight,
			root.document.body.offsetHeight, root.document.documentElement.offsetHeight,
			root.document.body.clientHeight, root.document.documentElement.clientHeight
		);
	};

	/**
	 * Convert data-options attribute into an object of key/value pairs
	 * @private
	 * @param {String} options Link-specific options as a data attribute string
	 * @returns {Object}
	 */
	var getDataOptions = function ( options ) {
		return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse( options );
	};

	/**
	 * Update the URL
	 * @private
	 * @param {Element} anchor The element to scroll to
	 * @param {Boolean} url Whether or not to update the URL history
	 */
	var updateUrl = function ( anchor, url ) {
		if ( root.history.pushState && (url || url === 'true') && root.location.protocol !== 'file:' ) {
			root.history.pushState( null, null, [root.location.protocol, '//', root.location.host, root.location.pathname, root.location.search, anchor].join('') );
		}
	};

	var getHeaderHeight = function ( header ) {
		return header === null ? 0 : ( getHeight( header ) + header.offsetTop );
	};

	/**
	 * Start/stop the scrolling animation
	 * @public
	 * @param {Element} anchor The element to scroll to
	 * @param {Element} toggle The element that toggled the scroll event
	 * @param {Object} options
	 */
	smoothScroll.animateScroll = function ( anchor, toggle, options ) {

		// Options and overrides
		var overrides = getDataOptions( toggle ? toggle.getAttribute('data-options') : null );
		var animateSettings = extend( settings || defaults, options || {}, overrides ); // Merge user options with defaults

		// Selectors and variables
		var isNum = Object.prototype.toString.call( anchor ) === '[object Number]' ? true : false;
		var anchorElem = isNum ? null : ( anchor === '#' ? root.document.documentElement : root.document.querySelector(anchor) );
		if ( !isNum && !anchorElem ) return;
		var startLocation = root.pageYOffset; // Current location on the page
		if ( !fixedHeader ) { fixedHeader = root.document.querySelector( animateSettings.selectorHeader ); }  // Get the fixed header if not already set
		if ( !headerHeight ) { headerHeight = getHeaderHeight( fixedHeader ); } // Get the height of a fixed header if one exists and not already set
		var endLocation = isNum ? anchor : getEndLocation( anchorElem, headerHeight, parseInt(animateSettings.offset, 10) ); // Location to scroll to
		var distance = endLocation - startLocation; // distance to travel
		var documentHeight = getDocumentHeight();
		var timeLapsed = 0;
		var percentage, position;

		// Update URL
		if ( !isNum ) {
			updateUrl(anchor, animateSettings.updateURL);
		}

		/**
		 * Stop the scroll animation when it reaches its target (or the bottom/top of page)
		 * @private
		 * @param {Number} position Current position on the page
		 * @param {Number} endLocation Scroll to location
		 * @param {Number} animationInterval How much to scroll on this loop
		 */
		var stopAnimateScroll = function (position, endLocation, animationInterval) {
			var currentLocation = root.pageYOffset;
			if ( position == endLocation || currentLocation == endLocation || ( (root.innerHeight + currentLocation) >= documentHeight ) ) {
				clearInterval(animationInterval);
				if ( !isNum ) {
					anchorElem.focus();
				}
				animateSettings.callback( anchor, toggle ); // Run callbacks after animation complete
			}
		};

		/**
		 * Loop scrolling animation
		 * @private
		 */
		var loopAnimateScroll = function () {
			timeLapsed += 16;
			percentage = ( timeLapsed / parseInt(animateSettings.speed, 10) );
			percentage = ( percentage > 1 ) ? 1 : percentage;
			position = startLocation + ( distance * easingPattern(animateSettings.easing, percentage) );
			root.scrollTo( 0, Math.floor(position) );
			stopAnimateScroll(position, endLocation, animationInterval);
		};

		/**
		 * Set interval timer
		 * @private
		 */
		var startAnimateScroll = function () {
			clearInterval(animationInterval);
			animationInterval = setInterval(loopAnimateScroll, 16);
		};

		/**
		 * Reset position to fix weird iOS bug
		 * @link https://github.com/cferdinandi/smooth-scroll/issues/45
		 */
		if ( root.pageYOffset === 0 ) {
			root.scrollTo( 0, 0 );
		}

		// Start scrolling animation
		startAnimateScroll();

	};

	/**
	 * If smooth scroll element clicked, animate scroll
	 * @private
	 */
	var eventHandler = function (event) {

		// Don't run if right-click or command/control + click
		if ( event.button !== 0 || event.metaKey || event.ctrlKey ) return;

		// If a smooth scroll link, animate it
		var toggle = getClosest( event.target, settings.selector );
		if ( toggle && toggle.tagName.toLowerCase() === 'a' ) {
			event.preventDefault(); // Prevent default click event
			var hash = smoothScroll.escapeCharacters( toggle.hash ); // Escape hash characters
			smoothScroll.animateScroll( hash, toggle, settings); // Animate scroll
		}

	};

	/**
	 * On window scroll and resize, only run events at a rate of 15fps for better performance
	 * @private
	 * @param  {Function} eventTimeout Timeout function
	 * @param  {Object} settings
	 */
	var eventThrottler = function (event) {
		if ( !eventTimeout ) {
			eventTimeout = setTimeout(function() {
				eventTimeout = null; // Reset timeout
				headerHeight = getHeaderHeight( fixedHeader ); // Get the height of a fixed header if one exists
			}, 66);
		}
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	smoothScroll.destroy = function () {

		// If plugin isn't already initialized, stop
		if ( !settings ) return;

		// Remove event listeners
		root.document.removeEventListener( 'click', eventHandler, false );
		root.removeEventListener( 'resize', eventThrottler, false );

		// Reset varaibles
		settings = null;
		eventTimeout = null;
		fixedHeader = null;
		headerHeight = null;
		animationInterval = null;
	};

	/**
	 * Initialize Smooth Scroll
	 * @public
	 * @param {Object} options User settings
	 */
	smoothScroll.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		smoothScroll.destroy();

		// Selectors and variables
		settings = extend( defaults, options || {} ); // Merge user options with defaults
		fixedHeader = root.document.querySelector( settings.selectorHeader ); // Get the fixed header
		headerHeight = getHeaderHeight( fixedHeader );

		// When a toggle is clicked, run the click handler
		root.document.addEventListener('click', eventHandler, false );
		if ( fixedHeader ) { root.addEventListener( 'resize', eventThrottler, false ); }

	};


	//
	// Public APIs
	//

	return smoothScroll;

});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
'use strict';

var _cashDom = require('cash-dom');

var _cashDom2 = _interopRequireDefault(_cashDom);

var _smoothScroll = require('smooth-scroll/src/js/smooth-scroll.js');

var _smoothScroll2 = _interopRequireDefault(_smoothScroll);

var _skrollr = require('skrollr');

var _skrollr2 = _interopRequireDefault(_skrollr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// SmoothScroll


// import 'gsap/src/uncompressed/plugins/CSSPlugin.js'
// import 'gsap/src/uncompressed/TimelineLite.js'
// import 'gsap/src/uncompressed/easing/EasePack.js'

(0, _cashDom2.default)('a').each(function (a) {
  var href = a.href;
  var hash = '';
  var hashIndex = a.href.indexOf('#');
  if (hashIndex > -1) {
    hash = href.substring(0, hashIndex).replace(location.origin, '');
    if (hash === window.location.pathname) {
      (0, _cashDom2.default)(a).attr('data-scroll', true);
    }
  }
});
_smoothScroll2.default.init({
  speed: 1000
});

// Skrollr Effects
if (/Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || window.opera)) {
  // do nothing, this is mobile!
} else {
  _skrollr2.default.init({
    forceHeight: false
  });
}

// Page-level logic
window.pages = {
  home: home
};
window.edit = edit;

mobileMenu();

// ########################################################################
//
// ########################################################################


function mobileMenu() {
  var nav = (0, _cashDom2.default)('nav');
  var menu = (0, _cashDom2.default)('.show-menu');
  var menuLinks = (0, _cashDom2.default)('nav a');

  var toggleMenu = function toggleMenu() {
    return nav.toggleClass('menu-open');
  };
  menu.on('click', toggleMenu);

  var clickLink = function clickLink(e) {
    var self = (0, _cashDom2.default)(this);
    if (nav.hasClass('menu-open')) {
      nav.removeClass('menu-open');
    }
  };
  menuLinks.on('click', clickLink);
}

function home() {}

function edit(state) {
  document.body.contentEditable = state !== undefined ? state : !!document.body.contentEditable;
}

// ########################################################################
// Utils
// ########################################################################

},{"cash-dom":1,"skrollr":2,"smooth-scroll/src/js/smooth-scroll.js":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY2FzaC1kb20vZGlzdC9jYXNoLmpzIiwibm9kZV9tb2R1bGVzL3Nrcm9sbHIvZGlzdC9za3JvbGxyLm1pbi5qcyIsIm5vZGVfbW9kdWxlcy9zbW9vdGgtc2Nyb2xsL3NyYy9qcy9zbW9vdGgtc2Nyb2xsLmpzIiwic3JjL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyMkJBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDamZBOzs7O0FBTUE7Ozs7QUFDQTs7Ozs7O0FBR0E7OztBQVJBO0FBQ0E7QUFDQTs7QUFPQSx1QkFBRSxHQUFGLEVBQU8sSUFBUCxDQUFZLGFBQUs7QUFDZixNQUFNLE9BQU8sRUFBRSxJQUFmO0FBQ0EsTUFBSSxPQUFPLEVBQVg7QUFDQSxNQUFNLFlBQVksRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFlLEdBQWYsQ0FBbEI7QUFDQSxNQUFJLFlBQVksQ0FBQyxDQUFqQixFQUFvQjtBQUNsQixXQUFPLEtBQUssU0FBTCxDQUFlLENBQWYsRUFBa0IsU0FBbEIsRUFBNkIsT0FBN0IsQ0FBcUMsU0FBUyxNQUE5QyxFQUFzRCxFQUF0RCxDQUFQO0FBQ0EsUUFBSSxTQUFTLE9BQU8sUUFBUCxDQUFnQixRQUE3QixFQUF1QztBQUNyQyw2QkFBRSxDQUFGLEVBQUssSUFBTCxDQUFVLGFBQVYsRUFBeUIsSUFBekI7QUFDRDtBQUNGO0FBQ0YsQ0FWRDtBQVdBLHVCQUFhLElBQWIsQ0FBa0I7QUFDaEIsU0FBTztBQURTLENBQWxCOztBQUlBO0FBQ0EsSUFBSyxzQ0FBRCxDQUF5QyxJQUF6QyxDQUE4QyxVQUFVLFNBQVYsSUFBdUIsVUFBVSxNQUFqQyxJQUEyQyxPQUFPLEtBQWhHLENBQUosRUFBNEc7QUFDMUc7QUFDRCxDQUZELE1BRU87QUFDTCxvQkFBUSxJQUFSLENBQWE7QUFDWCxpQkFBYTtBQURGLEdBQWI7QUFHRDs7QUFFRDtBQUNBLE9BQU8sS0FBUCxHQUFlO0FBQ2I7QUFEYSxDQUFmO0FBR0EsT0FBTyxJQUFQLEdBQWMsSUFBZDs7QUFFQTs7QUFPQTtBQUNBO0FBQ0E7OztBQUdBLFNBQVMsVUFBVCxHQUF1QjtBQUNyQixNQUFNLE1BQU0sdUJBQUUsS0FBRixDQUFaO0FBQ0EsTUFBTSxPQUFPLHVCQUFFLFlBQUYsQ0FBYjtBQUNBLE1BQU0sWUFBWSx1QkFBRSxPQUFGLENBQWxCOztBQUVBLE1BQU0sYUFBYSxTQUFiLFVBQWE7QUFBQSxXQUFNLElBQUksV0FBSixDQUFnQixXQUFoQixDQUFOO0FBQUEsR0FBbkI7QUFDQSxPQUFLLEVBQUwsQ0FBUSxPQUFSLEVBQWlCLFVBQWpCOztBQUVBLE1BQU0sWUFBWSxTQUFaLFNBQVksQ0FBVSxDQUFWLEVBQWE7QUFDN0IsUUFBTSxPQUFPLHVCQUFFLElBQUYsQ0FBYjtBQUNBLFFBQUksSUFBSSxRQUFKLENBQWEsV0FBYixDQUFKLEVBQStCO0FBQzdCLFVBQUksV0FBSixDQUFnQixXQUFoQjtBQUNEO0FBQ0YsR0FMRDtBQU1BLFlBQVUsRUFBVixDQUFhLE9BQWIsRUFBc0IsU0FBdEI7QUFDRDs7QUFFRCxTQUFTLElBQVQsR0FBaUIsQ0FFaEI7O0FBRUQsU0FBUyxJQUFULENBQWUsS0FBZixFQUFzQjtBQUNwQixXQUFTLElBQVQsQ0FBYyxlQUFkLEdBQWdDLFVBQVUsU0FBVixHQUFzQixLQUF0QixHQUE4QixDQUFDLENBQUMsU0FBUyxJQUFULENBQWMsZUFBOUU7QUFDRDs7QUFHRDtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qISBjYXNoLWRvbSAxLjMuNCwgaHR0cHM6Ly9naXRodWIuY29tL2tlbndoZWVsZXIvY2FzaCBAbGljZW5zZSBNSVQgKi9cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICByb290LmNhc2ggPSByb290LiQgPSBmYWN0b3J5KCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRvYyA9IGRvY3VtZW50LCB3aW4gPSB3aW5kb3csIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsIHNsaWNlID0gQXJyYXlQcm90by5zbGljZSwgZmlsdGVyID0gQXJyYXlQcm90by5maWx0ZXIsIHB1c2ggPSBBcnJheVByb3RvLnB1c2g7XG5cbiAgdmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fSwgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBpdGVtID09PSB0eXBlb2Ygbm9vcDtcbiAgfSwgaXNTdHJpbmcgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gdHlwZW9mIFwiXCI7XG4gIH07XG5cbiAgdmFyIGlkTWF0Y2ggPSAvXiNbXFx3LV0qJC8sIGNsYXNzTWF0Y2ggPSAvXlxcLltcXHctXSokLywgaHRtbE1hdGNoID0gLzwuKz4vLCBzaW5nbGV0ID0gL15cXHcrJC87XG5cbiAgZnVuY3Rpb24gZmluZChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IGRvYztcbiAgICB2YXIgZWxlbXMgPSAoY2xhc3NNYXRjaC50ZXN0KHNlbGVjdG9yKSA/IGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShzZWxlY3Rvci5zbGljZSgxKSkgOiBzaW5nbGV0LnRlc3Qoc2VsZWN0b3IpID8gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZShzZWxlY3RvcikgOiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICByZXR1cm4gZWxlbXM7XG4gIH1cblxuICB2YXIgZnJhZywgdG1wO1xuICBmdW5jdGlvbiBwYXJzZUhUTUwoc3RyKSB7XG4gICAgZnJhZyA9IGZyYWcgfHwgZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB0bXAgPSB0bXAgfHwgZnJhZy5hcHBlbmRDaGlsZChkb2MuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgdG1wLmlubmVySFRNTCA9IHN0cjtcbiAgICByZXR1cm4gdG1wLmNoaWxkTm9kZXM7XG4gIH1cblxuICBmdW5jdGlvbiBvblJlYWR5KGZuKSB7XG4gICAgaWYgKGRvYy5yZWFkeVN0YXRlICE9PSBcImxvYWRpbmdcIikge1xuICAgICAgZm4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBJbml0KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gSWYgYWxyZWFkeSBhIGNhc2ggY29sbGVjdGlvbiwgZG9uJ3QgZG8gYW55IGZ1cnRoZXIgcHJvY2Vzc2luZ1xuICAgIGlmIChzZWxlY3Rvci5jYXNoICYmIHNlbGVjdG9yICE9PSB3aW4pIHtcbiAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICB2YXIgZWxlbXMgPSBzZWxlY3RvciwgaSA9IDAsIGxlbmd0aDtcblxuICAgIGlmIChpc1N0cmluZyhzZWxlY3RvcikpIHtcbiAgICAgIGVsZW1zID0gKGlkTWF0Y2gudGVzdChzZWxlY3RvcikgP1xuICAgICAgLy8gSWYgYW4gSUQgdXNlIHRoZSBmYXN0ZXIgZ2V0RWxlbWVudEJ5SWQgY2hlY2tcbiAgICAgIGRvYy5nZXRFbGVtZW50QnlJZChzZWxlY3Rvci5zbGljZSgxKSkgOiBodG1sTWF0Y2gudGVzdChzZWxlY3RvcikgP1xuICAgICAgLy8gSWYgSFRNTCwgcGFyc2UgaXQgaW50byByZWFsIGVsZW1lbnRzXG4gICAgICBwYXJzZUhUTUwoc2VsZWN0b3IpIDpcbiAgICAgIC8vIGVsc2UgdXNlIGBmaW5kYFxuICAgICAgZmluZChzZWxlY3RvciwgY29udGV4dCkpO1xuXG4gICAgICAvLyBJZiBmdW5jdGlvbiwgdXNlIGFzIHNob3J0Y3V0IGZvciBET00gcmVhZHlcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSB7XG4gICAgICBvblJlYWR5KHNlbGVjdG9yKTtyZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoIWVsZW1zKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBJZiBhIHNpbmdsZSBET00gZWxlbWVudCBpcyBwYXNzZWQgaW4gb3IgcmVjZWl2ZWQgdmlhIElELCByZXR1cm4gdGhlIHNpbmdsZSBlbGVtZW50XG4gICAgaWYgKGVsZW1zLm5vZGVUeXBlIHx8IGVsZW1zID09PSB3aW4pIHtcbiAgICAgIHRoaXNbMF0gPSBlbGVtcztcbiAgICAgIHRoaXMubGVuZ3RoID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVHJlYXQgbGlrZSBhbiBhcnJheSBhbmQgbG9vcCB0aHJvdWdoIGVhY2ggaXRlbS5cbiAgICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoID0gZWxlbXMubGVuZ3RoO1xuICAgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzW2ldID0gZWxlbXNbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmdW5jdGlvbiBjYXNoKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBJbml0KHNlbGVjdG9yLCBjb250ZXh0KTtcbiAgfVxuXG4gIHZhciBmbiA9IGNhc2guZm4gPSBjYXNoLnByb3RvdHlwZSA9IEluaXQucHJvdG90eXBlID0geyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICBjb25zdHJ1Y3RvcjogY2FzaCxcbiAgICBjYXNoOiB0cnVlLFxuICAgIGxlbmd0aDogMCxcbiAgICBwdXNoOiBwdXNoLFxuICAgIHNwbGljZTogQXJyYXlQcm90by5zcGxpY2UsXG4gICAgbWFwOiBBcnJheVByb3RvLm1hcCxcbiAgICBpbml0OiBJbml0XG4gIH07XG5cbiAgY2FzaC5wYXJzZUhUTUwgPSBwYXJzZUhUTUw7XG4gIGNhc2gubm9vcCA9IG5vb3A7XG4gIGNhc2guaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4gIGNhc2guaXNTdHJpbmcgPSBpc1N0cmluZztcblxuICBjYXNoLmV4dGVuZCA9IGZuLmV4dGVuZCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICB0YXJnZXQgPSB0YXJnZXQgfHwge307XG5cbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKSwgbGVuZ3RoID0gYXJncy5sZW5ndGgsIGkgPSAxO1xuXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICB0YXJnZXQgPSB0aGlzO1xuICAgICAgaSA9IDA7XG4gICAgfVxuXG4gICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFhcmdzW2ldKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3NbaV0pIHtcbiAgICAgICAgaWYgKGFyZ3NbaV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gYXJnc1tpXVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICBmdW5jdGlvbiBlYWNoKGNvbGxlY3Rpb24sIGNhbGxiYWNrKSB7XG4gICAgdmFyIGwgPSBjb2xsZWN0aW9uLmxlbmd0aCwgaSA9IDA7XG5cbiAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoY29sbGVjdGlvbltpXSwgY29sbGVjdGlvbltpXSwgaSwgY29sbGVjdGlvbikgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hdGNoZXMoZWwsIHNlbGVjdG9yKSB7XG4gICAgdmFyIG0gPSBlbCAmJiAoZWwubWF0Y2hlcyB8fCBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm9NYXRjaGVzU2VsZWN0b3IpO1xuICAgIHJldHVybiAhIW0gJiYgbS5jYWxsKGVsLCBzZWxlY3Rvcik7XG4gIH1cblxuICBmdW5jdGlvbiB1bmlxdWUoY29sbGVjdGlvbikge1xuICAgIHJldHVybiBjYXNoKHNsaWNlLmNhbGwoY29sbGVjdGlvbikuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xuICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZihpdGVtKSA9PT0gaW5kZXg7XG4gICAgfSkpO1xuICB9XG5cbiAgY2FzaC5leHRlbmQoe1xuICAgIG1lcmdlOiBmdW5jdGlvbiAoZmlyc3QsIHNlY29uZCkge1xuICAgICAgdmFyIGxlbiA9ICtzZWNvbmQubGVuZ3RoLCBpID0gZmlyc3QubGVuZ3RoLCBqID0gMDtcblxuICAgICAgZm9yICg7IGogPCBsZW47IGkrKywgaisrKSB7XG4gICAgICAgIGZpcnN0W2ldID0gc2Vjb25kW2pdO1xuICAgICAgfVxuXG4gICAgICBmaXJzdC5sZW5ndGggPSBpO1xuICAgICAgcmV0dXJuIGZpcnN0O1xuICAgIH0sXG5cbiAgICBlYWNoOiBlYWNoLFxuICAgIG1hdGNoZXM6IG1hdGNoZXMsXG4gICAgdW5pcXVlOiB1bmlxdWUsXG4gICAgaXNBcnJheTogQXJyYXkuaXNBcnJheSxcbiAgICBpc051bWVyaWM6IGZ1bmN0aW9uIChuKSB7XG4gICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmIGlzRmluaXRlKG4pO1xuICAgIH1cblxuICB9KTtcblxuICB2YXIgdWlkID0gY2FzaC51aWQgPSBcIl9jYXNoXCIgKyBEYXRlLm5vdygpO1xuXG4gIGZ1bmN0aW9uIGdldERhdGFDYWNoZShub2RlKSB7XG4gICAgcmV0dXJuIChub2RlW3VpZF0gPSBub2RlW3VpZF0gfHwge30pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RGF0YShub2RlLCBrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIChnZXREYXRhQ2FjaGUobm9kZSlba2V5XSA9IHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERhdGEobm9kZSwga2V5KSB7XG4gICAgdmFyIGMgPSBnZXREYXRhQ2FjaGUobm9kZSk7XG4gICAgaWYgKGNba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjW2tleV0gPSBub2RlLmRhdGFzZXQgPyBub2RlLmRhdGFzZXRba2V5XSA6IGNhc2gobm9kZSkuYXR0cihcImRhdGEtXCIgKyBrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gY1trZXldO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRGF0YShub2RlLCBrZXkpIHtcbiAgICB2YXIgYyA9IGdldERhdGFDYWNoZShub2RlKTtcbiAgICBpZiAoYykge1xuICAgICAgZGVsZXRlIGNba2V5XTtcbiAgICB9IGVsc2UgaWYgKG5vZGUuZGF0YXNldCkge1xuICAgICAgZGVsZXRlIG5vZGUuZGF0YXNldFtrZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYXNoKG5vZGUpLnJlbW92ZUF0dHIoXCJkYXRhLVwiICsgbmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBkYXRhOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgIGlmIChpc1N0cmluZyhuYW1lKSkge1xuICAgICAgICByZXR1cm4gKHZhbHVlID09PSB1bmRlZmluZWQgPyBnZXREYXRhKHRoaXNbMF0sIG5hbWUpIDogdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcmV0dXJuIHNldERhdGEodiwgbmFtZSwgdmFsdWUpO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICAgIHRoaXMuZGF0YShrZXksIG5hbWVba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByZW1vdmVEYXRhOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiByZW1vdmVEYXRhKHYsIGtleSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgdmFyIG5vdFdoaXRlTWF0Y2ggPSAvXFxTKy9nO1xuXG4gIGZ1bmN0aW9uIGdldENsYXNzZXMoYykge1xuICAgIHJldHVybiBpc1N0cmluZyhjKSAmJiBjLm1hdGNoKG5vdFdoaXRlTWF0Y2gpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFzQ2xhc3ModiwgYykge1xuICAgIHJldHVybiAodi5jbGFzc0xpc3QgPyB2LmNsYXNzTGlzdC5jb250YWlucyhjKSA6IG5ldyBSZWdFeHAoXCIoXnwgKVwiICsgYyArIFwiKCB8JClcIiwgXCJnaVwiKS50ZXN0KHYuY2xhc3NOYW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRDbGFzcyh2LCBjLCBzcGFjZWROYW1lKSB7XG4gICAgaWYgKHYuY2xhc3NMaXN0KSB7XG4gICAgICB2LmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgfSBlbHNlIGlmIChzcGFjZWROYW1lLmluZGV4T2YoXCIgXCIgKyBjICsgXCIgXCIpKSB7XG4gICAgICB2LmNsYXNzTmFtZSArPSBcIiBcIiArIGM7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3ModiwgYykge1xuICAgIGlmICh2LmNsYXNzTGlzdCkge1xuICAgICAgdi5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2LmNsYXNzTmFtZSA9IHYuY2xhc3NOYW1lLnJlcGxhY2UoYywgXCJcIik7XG4gICAgfVxuICB9XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBhZGRDbGFzczogZnVuY3Rpb24gKGMpIHtcbiAgICAgIHZhciBjbGFzc2VzID0gZ2V0Q2xhc3NlcyhjKTtcblxuICAgICAgcmV0dXJuIChjbGFzc2VzID8gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZhciBzcGFjZWROYW1lID0gXCIgXCIgKyB2LmNsYXNzTmFtZSArIFwiIFwiO1xuICAgICAgICBlYWNoKGNsYXNzZXMsIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgYWRkQ2xhc3ModiwgYywgc3BhY2VkTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSkgOiB0aGlzKTtcbiAgICB9LFxuXG4gICAgYXR0cjogZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbMF0gPyB0aGlzWzBdLmdldEF0dHJpYnV0ZSA/IHRoaXNbMF0uZ2V0QXR0cmlidXRlKG5hbWUpIDogdGhpc1swXVtuYW1lXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICBpZiAodi5zZXRBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHYuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdltuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXR0cihrZXksIG5hbWVba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBoYXNDbGFzczogZnVuY3Rpb24gKGMpIHtcbiAgICAgIHZhciBjaGVjayA9IGZhbHNlLCBjbGFzc2VzID0gZ2V0Q2xhc3NlcyhjKTtcbiAgICAgIGlmIChjbGFzc2VzICYmIGNsYXNzZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICAgIGNoZWNrID0gaGFzQ2xhc3ModiwgY2xhc3Nlc1swXSk7XG4gICAgICAgICAgcmV0dXJuICFjaGVjaztcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hlY2s7XG4gICAgfSxcblxuICAgIHByb3A6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKGlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiAodmFsdWUgPT09IHVuZGVmaW5lZCA/IHRoaXNbMF1bbmFtZV0gOiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICB2W25hbWVdID0gdmFsdWU7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICAgICAgdGhpcy5wcm9wKGtleSwgbmFtZVtrZXldKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIHJlbW92ZUF0dHI6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGlmICh2LnJlbW92ZUF0dHJpYnV0ZSkge1xuICAgICAgICAgIHYucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSB2W25hbWVdO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIChjKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cihcImNsYXNzXCIsIFwiXCIpO1xuICAgICAgfVxuICAgICAgdmFyIGNsYXNzZXMgPSBnZXRDbGFzc2VzKGMpO1xuICAgICAgcmV0dXJuIChjbGFzc2VzID8gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGVhY2goY2xhc3NlcywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZW1vdmVDbGFzcyh2LCBjKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSA6IHRoaXMpO1xuICAgIH0sXG5cbiAgICByZW1vdmVQcm9wOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICBkZWxldGUgdltuYW1lXTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB0b2dnbGVDbGFzczogZnVuY3Rpb24gKGMsIHN0YXRlKSB7XG4gICAgICBpZiAoc3RhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpc1tzdGF0ZSA/IFwiYWRkQ2xhc3NcIiA6IFwicmVtb3ZlQ2xhc3NcIl0oYyk7XG4gICAgICB9XG4gICAgICB2YXIgY2xhc3NlcyA9IGdldENsYXNzZXMoYyk7XG4gICAgICByZXR1cm4gKGNsYXNzZXMgPyB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdmFyIHNwYWNlZE5hbWUgPSBcIiBcIiArIHYuY2xhc3NOYW1lICsgXCIgXCI7XG4gICAgICAgIGVhY2goY2xhc3NlcywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICBpZiAoaGFzQ2xhc3ModiwgYykpIHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzKHYsIGMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRDbGFzcyh2LCBjLCBzcGFjZWROYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSkgOiB0aGlzKTtcbiAgICB9IH0pO1xuXG4gIGZuLmV4dGVuZCh7XG4gICAgYWRkOiBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICAgIHJldHVybiB1bmlxdWUoY2FzaC5tZXJnZSh0aGlzLCBjYXNoKHNlbGVjdG9yLCBjb250ZXh0KSkpO1xuICAgIH0sXG5cbiAgICBlYWNoOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgIGVhY2godGhpcywgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGVxOiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgIHJldHVybiBjYXNoKHRoaXMuZ2V0KGluZGV4KSk7XG4gICAgfSxcblxuICAgIGZpbHRlcjogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gY2FzaChmaWx0ZXIuY2FsbCh0aGlzLCAoaXNTdHJpbmcoc2VsZWN0b3IpID8gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXMoZSwgc2VsZWN0b3IpO1xuICAgICAgfSA6IHNlbGVjdG9yKSkpO1xuICAgIH0sXG5cbiAgICBmaXJzdDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZXEoMCk7XG4gICAgfSxcblxuICAgIGdldDogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gc2xpY2UuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoaW5kZXggPCAwID8gdGhpc1tpbmRleCArIHRoaXMubGVuZ3RoXSA6IHRoaXNbaW5kZXhdKTtcbiAgICB9LFxuXG4gICAgaW5kZXg6IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICB2YXIgY2hpbGQgPSBlbGVtID8gY2FzaChlbGVtKVswXSA6IHRoaXNbMF0sIGNvbGxlY3Rpb24gPSBlbGVtID8gdGhpcyA6IGNhc2goY2hpbGQpLnBhcmVudCgpLmNoaWxkcmVuKCk7XG4gICAgICByZXR1cm4gc2xpY2UuY2FsbChjb2xsZWN0aW9uKS5pbmRleE9mKGNoaWxkKTtcbiAgICB9LFxuXG4gICAgbGFzdDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZXEoLTEpO1xuICAgIH1cblxuICB9KTtcblxuICB2YXIgY2FtZWxDYXNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FtZWxSZWdleCA9IC8oPzpeXFx3fFtBLVpdfFxcYlxcdykvZywgd2hpdGVTcGFjZSA9IC9bXFxzLV9dKy9nO1xuICAgIHJldHVybiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoY2FtZWxSZWdleCwgZnVuY3Rpb24gKGxldHRlciwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxldHRlcltpbmRleCA9PT0gMCA/IFwidG9Mb3dlckNhc2VcIiA6IFwidG9VcHBlckNhc2VcIl0oKTtcbiAgICAgIH0pLnJlcGxhY2Uod2hpdGVTcGFjZSwgXCJcIik7XG4gICAgfTtcbiAgfSgpKTtcblxuICB2YXIgZ2V0UHJlZml4ZWRQcm9wID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FjaGUgPSB7fSwgZG9jID0gZG9jdW1lbnQsIGRpdiA9IGRvYy5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLCBzdHlsZSA9IGRpdi5zdHlsZTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgcHJvcCA9IGNhbWVsQ2FzZShwcm9wKTtcbiAgICAgIGlmIChjYWNoZVtwcm9wXSkge1xuICAgICAgICByZXR1cm4gY2FjaGVbcHJvcF07XG4gICAgICB9XG5cbiAgICAgIHZhciB1Y1Byb3AgPSBwcm9wLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcC5zbGljZSgxKSwgcHJlZml4ZXMgPSBbXCJ3ZWJraXRcIiwgXCJtb3pcIiwgXCJtc1wiLCBcIm9cIl0sIHByb3BzID0gKHByb3AgKyBcIiBcIiArIChwcmVmaXhlcykuam9pbih1Y1Byb3AgKyBcIiBcIikgKyB1Y1Byb3ApLnNwbGl0KFwiIFwiKTtcblxuICAgICAgZWFjaChwcm9wcywgZnVuY3Rpb24gKHApIHtcbiAgICAgICAgaWYgKHAgaW4gc3R5bGUpIHtcbiAgICAgICAgICBjYWNoZVtwXSA9IHByb3AgPSBjYWNoZVtwcm9wXSA9IHA7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGNhY2hlW3Byb3BdO1xuICAgIH07XG4gIH0oKSk7XG5cbiAgY2FzaC5wcmVmaXhlZFByb3AgPSBnZXRQcmVmaXhlZFByb3A7XG4gIGNhc2guY2FtZWxDYXNlID0gY2FtZWxDYXNlO1xuXG4gIGZuLmV4dGVuZCh7XG4gICAgY3NzOiBmdW5jdGlvbiAocHJvcCwgdmFsdWUpIHtcbiAgICAgIGlmIChpc1N0cmluZyhwcm9wKSkge1xuICAgICAgICBwcm9wID0gZ2V0UHJlZml4ZWRQcm9wKHByb3ApO1xuICAgICAgICByZXR1cm4gKGFyZ3VtZW50cy5sZW5ndGggPiAxID8gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcmV0dXJuIHYuc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgfSkgOiB3aW4uZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzWzBdKVtwcm9wXSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wKSB7XG4gICAgICAgIHRoaXMuY3NzKGtleSwgcHJvcFtrZXldKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGNvbXB1dGUoZWwsIHByb3ApIHtcbiAgICByZXR1cm4gcGFyc2VJbnQod2luLmdldENvbXB1dGVkU3R5bGUoZWxbMF0sIG51bGwpW3Byb3BdLCAxMCkgfHwgMDtcbiAgfVxuXG4gIGVhY2goW1wiV2lkdGhcIiwgXCJIZWlnaHRcIl0sIGZ1bmN0aW9uICh2KSB7XG4gICAgdmFyIGxvd2VyID0gdi50b0xvd2VyQ2FzZSgpO1xuXG4gICAgZm5bbG93ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClbbG93ZXJdO1xuICAgIH07XG5cbiAgICBmbltcImlubmVyXCIgKyB2XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzWzBdW1wiY2xpZW50XCIgKyB2XTtcbiAgICB9O1xuXG4gICAgZm5bXCJvdXRlclwiICsgdl0gPSBmdW5jdGlvbiAobWFyZ2lucykge1xuICAgICAgcmV0dXJuIHRoaXNbMF1bXCJvZmZzZXRcIiArIHZdICsgKG1hcmdpbnMgPyBjb21wdXRlKHRoaXMsIFwibWFyZ2luXCIgKyAodiA9PT0gXCJXaWR0aFwiID8gXCJMZWZ0XCIgOiBcIlRvcFwiKSkgKyBjb21wdXRlKHRoaXMsIFwibWFyZ2luXCIgKyAodiA9PT0gXCJXaWR0aFwiID8gXCJSaWdodFwiIDogXCJCb3R0b21cIikpIDogMCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJFdmVudChub2RlLCBldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGV2ZW50Q2FjaGUgPSBnZXREYXRhKG5vZGUsIFwiX2Nhc2hFdmVudHNcIikgfHwgc2V0RGF0YShub2RlLCBcIl9jYXNoRXZlbnRzXCIsIHt9KTtcbiAgICBldmVudENhY2hlW2V2ZW50TmFtZV0gPSBldmVudENhY2hlW2V2ZW50TmFtZV0gfHwgW107XG4gICAgZXZlbnRDYWNoZVtldmVudE5hbWVdLnB1c2goY2FsbGJhY2spO1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUV2ZW50KG5vZGUsIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgZXZlbnRDYWNoZSA9IGdldERhdGEobm9kZSwgXCJfY2FzaEV2ZW50c1wiKVtldmVudE5hbWVdO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBlYWNoKGV2ZW50Q2FjaGUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudCk7XG4gICAgICB9KTtcbiAgICAgIGV2ZW50Q2FjaGUgPSBbXTtcbiAgICB9XG4gIH1cblxuICBmbi5leHRlbmQoe1xuICAgIG9mZjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZUV2ZW50KHYsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIG9uOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBkZWxlZ2F0ZSwgY2FsbGJhY2ssIHJ1bk9uY2UpIHtcbiAgICAgIC8vIGpzaGludCBpZ25vcmU6bGluZVxuXG4gICAgICB2YXIgb3JpZ2luYWxDYWxsYmFjaztcblxuICAgICAgaWYgKCFpc1N0cmluZyhldmVudE5hbWUpKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBldmVudE5hbWUpIHtcbiAgICAgICAgICB0aGlzLm9uKGtleSwgZGVsZWdhdGUsIGV2ZW50TmFtZVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRnVuY3Rpb24oZGVsZWdhdGUpKSB7XG4gICAgICAgIGNhbGxiYWNrID0gZGVsZWdhdGU7XG4gICAgICAgIGRlbGVnYXRlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50TmFtZSA9PT0gXCJyZWFkeVwiKSB7XG4gICAgICAgIG9uUmVhZHkoY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgIG9yaWdpbmFsQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciB0ID0gZS50YXJnZXQ7XG5cbiAgICAgICAgICB3aGlsZSAoIW1hdGNoZXModCwgZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICBpZiAodCA9PT0gdGhpcykge1xuICAgICAgICAgICAgICByZXR1cm4gKHQgPSBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ID0gdC5wYXJlbnROb2RlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0KSB7XG4gICAgICAgICAgICBvcmlnaW5hbENhbGxiYWNrLmNhbGwodCwgZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZhciBmaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIGlmIChydW5PbmNlKSB7XG4gICAgICAgICAgZmluYWxDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCh2LCBldmVudE5hbWUsIGZpbmFsQ2FsbGJhY2spO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmVnaXN0ZXJFdmVudCh2LCBldmVudE5hbWUsIGZpbmFsQ2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIG9uZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZGVsZWdhdGUsIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5vbihldmVudE5hbWUsIGRlbGVnYXRlLCBjYWxsYmFjaywgdHJ1ZSk7XG4gICAgfSxcblxuICAgIHJlYWR5OiBvblJlYWR5LFxuXG4gICAgdHJpZ2dlcjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgdmFyIGV2dCA9IGRvYy5jcmVhdGVFdmVudChcIkhUTUxFdmVudHNcIik7XG4gICAgICBldnQuZGF0YSA9IGRhdGE7XG4gICAgICBldnQuaW5pdEV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gdi5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgZnVuY3Rpb24gZW5jb2RlKG5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIFwiJlwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLnJlcGxhY2UoLyUyMC9nLCBcIitcIik7XG4gIH1cbiAgZnVuY3Rpb24gaXNDaGVja2FibGUoZmllbGQpIHtcbiAgICByZXR1cm4gZmllbGQudHlwZSA9PT0gXCJyYWRpb1wiIHx8IGZpZWxkLnR5cGUgPT09IFwiY2hlY2tib3hcIjtcbiAgfVxuXG4gIHZhciBmb3JtRXhjbHVkZXMgPSBbXCJmaWxlXCIsIFwicmVzZXRcIiwgXCJzdWJtaXRcIiwgXCJidXR0b25cIl07XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBmb3JtRWwgPSB0aGlzWzBdLmVsZW1lbnRzLCBxdWVyeSA9IFwiXCI7XG5cbiAgICAgIGVhY2goZm9ybUVsLCBmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgaWYgKGZpZWxkLm5hbWUgJiYgZm9ybUV4Y2x1ZGVzLmluZGV4T2YoZmllbGQudHlwZSkgPCAwKSB7XG4gICAgICAgICAgaWYgKGZpZWxkLnR5cGUgPT09IFwic2VsZWN0LW11bHRpcGxlXCIpIHtcbiAgICAgICAgICAgIGVhY2goZmllbGQub3B0aW9ucywgZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAgICAgaWYgKG8uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBxdWVyeSArPSBlbmNvZGUoZmllbGQubmFtZSwgby52YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIWlzQ2hlY2thYmxlKGZpZWxkKSB8fCAoaXNDaGVja2FibGUoZmllbGQpICYmIGZpZWxkLmNoZWNrZWQpKSB7XG4gICAgICAgICAgICBxdWVyeSArPSBlbmNvZGUoZmllbGQubmFtZSwgZmllbGQudmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBxdWVyeS5zdWJzdHIoMSk7XG4gICAgfSxcblxuICAgIHZhbDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpc1swXS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICByZXR1cm4gdi52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSk7XG5cbiAgZnVuY3Rpb24gaW5zZXJ0RWxlbWVudChlbCwgY2hpbGQsIHByZXBlbmQpIHtcbiAgICBpZiAocHJlcGVuZCkge1xuICAgICAgdmFyIGZpcnN0ID0gZWwuY2hpbGROb2Rlc1swXTtcbiAgICAgIGVsLmluc2VydEJlZm9yZShjaGlsZCwgZmlyc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5zZXJ0Q29udGVudChwYXJlbnQsIGNoaWxkLCBwcmVwZW5kKSB7XG4gICAgdmFyIHN0ciA9IGlzU3RyaW5nKGNoaWxkKTtcblxuICAgIGlmICghc3RyICYmIGNoaWxkLmxlbmd0aCkge1xuICAgICAgZWFjaChjaGlsZCwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIGluc2VydENvbnRlbnQocGFyZW50LCB2LCBwcmVwZW5kKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVhY2gocGFyZW50LCBzdHIgPyBmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIHYuaW5zZXJ0QWRqYWNlbnRIVE1MKHByZXBlbmQgPyBcImFmdGVyYmVnaW5cIiA6IFwiYmVmb3JlZW5kXCIsIGNoaWxkKTtcbiAgICB9IDogZnVuY3Rpb24gKHYsIGkpIHtcbiAgICAgIHJldHVybiBpbnNlcnRFbGVtZW50KHYsIChpID09PSAwID8gY2hpbGQgOiBjaGlsZC5jbG9uZU5vZGUodHJ1ZSkpLCBwcmVwZW5kKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZuLmV4dGVuZCh7XG4gICAgYWZ0ZXI6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgY2FzaChzZWxlY3RvcikuaW5zZXJ0QWZ0ZXIodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgYXBwZW5kOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaW5zZXJ0Q29udGVudCh0aGlzLCBjb250ZW50KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBhcHBlbmRUbzogZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgaW5zZXJ0Q29udGVudChjYXNoKHBhcmVudCksIHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGJlZm9yZTogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBjYXNoKHNlbGVjdG9yKS5pbnNlcnRCZWZvcmUodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjYXNoKHRoaXMubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiB2LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgIH0pKTtcbiAgICB9LFxuXG4gICAgZW1wdHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuaHRtbChcIlwiKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBodG1sOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaWYgKGNvbnRlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpc1swXS5pbm5lckhUTUw7XG4gICAgICB9XG4gICAgICB2YXIgc291cmNlID0gKGNvbnRlbnQubm9kZVR5cGUgPyBjb250ZW50WzBdLm91dGVySFRNTCA6IGNvbnRlbnQpO1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gdi5pbm5lckhUTUwgPSBzb3VyY2U7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgaW5zZXJ0QWZ0ZXI6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuXG4gICAgICBjYXNoKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIChlbCwgaSkge1xuICAgICAgICB2YXIgcGFyZW50ID0gZWwucGFyZW50Tm9kZSwgc2libGluZyA9IGVsLm5leHRTaWJsaW5nO1xuICAgICAgICBfdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSgoaSA9PT0gMCA/IHYgOiB2LmNsb25lTm9kZSh0cnVlKSksIHNpYmxpbmcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgICAgY2FzaChzZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoZWwsIGkpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgIF90aGlzMi5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSgoaSA9PT0gMCA/IHYgOiB2LmNsb25lTm9kZSh0cnVlKSksIGVsKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBwcmVwZW5kOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaW5zZXJ0Q29udGVudCh0aGlzLCBjb250ZW50LCB0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBwcmVwZW5kVG86IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgIGluc2VydENvbnRlbnQoY2FzaChwYXJlbnQpLCB0aGlzLCB0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh2KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB0ZXh0OiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaWYgKGNvbnRlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpc1swXS50ZXh0Q29udGVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHYudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIHZhciBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBwb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGVsID0gdGhpc1swXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IGVsLm9mZnNldExlZnQsXG4gICAgICAgIHRvcDogZWwub2Zmc2V0VG9wXG4gICAgICB9O1xuICAgIH0sXG5cbiAgICBvZmZzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZWN0ID0gdGhpc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQgLSBkb2NFbC5jbGllbnRUb3AsXG4gICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbi5wYWdlWE9mZnNldCAtIGRvY0VsLmNsaWVudExlZnRcbiAgICAgIH07XG4gICAgfSxcblxuICAgIG9mZnNldFBhcmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNhc2godGhpc1swXS5vZmZzZXRQYXJlbnQpO1xuICAgIH1cblxuICB9KTtcblxuICBmdW5jdGlvbiBkaXJlY3RDb21wYXJlKGVsLCBzZWxlY3Rvcikge1xuICAgIHJldHVybiBlbCA9PT0gc2VsZWN0b3I7XG4gIH1cblxuICBmbi5leHRlbmQoe1xuICAgIGNoaWxkcmVuOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHZhciBlbGVtcyA9IFtdO1xuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBwdXNoLmFwcGx5KGVsZW1zLCBlbC5jaGlsZHJlbik7XG4gICAgICB9KTtcbiAgICAgIGVsZW1zID0gdW5pcXVlKGVsZW1zKTtcblxuICAgICAgcmV0dXJuICghc2VsZWN0b3IgPyBlbGVtcyA6IGVsZW1zLmZpbHRlcihmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gbWF0Y2hlcyh2LCBzZWxlY3Rvcik7XG4gICAgICB9KSk7XG4gICAgfSxcblxuICAgIGNsb3Nlc3Q6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgaWYgKCFzZWxlY3RvciB8fCBtYXRjaGVzKHRoaXNbMF0sIHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCgpLmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICAgIH0sXG5cbiAgICBpczogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1hdGNoID0gZmFsc2UsIGNvbXBhcmF0b3IgPSAoaXNTdHJpbmcoc2VsZWN0b3IpID8gbWF0Y2hlcyA6IHNlbGVjdG9yLmNhc2ggPyBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yLmlzKGVsKTtcbiAgICAgIH0gOiBkaXJlY3RDb21wYXJlKTtcblxuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChlbCwgaSkge1xuICAgICAgICBtYXRjaCA9IGNvbXBhcmF0b3IoZWwsIHNlbGVjdG9yLCBpKTtcbiAgICAgICAgcmV0dXJuICFtYXRjaDtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSxcblxuICAgIGZpbmQ6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gY2FzaCgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZWxlbXMgPSBbXTtcbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgcHVzaC5hcHBseShlbGVtcywgZmluZChzZWxlY3RvciwgZWwpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdW5pcXVlKGVsZW1zKTtcbiAgICB9LFxuXG4gICAgaGFzOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgcmV0dXJuIGNhc2goZWwpLmZpbmQoc2VsZWN0b3IpLmxlbmd0aCAhPT0gMDtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gY2FzaCh0aGlzWzBdLm5leHRFbGVtZW50U2libGluZyk7XG4gICAgfSxcblxuICAgIG5vdDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gZmlsdGVyLmNhbGwodGhpcywgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHJldHVybiAhbWF0Y2hlcyhlbCwgc2VsZWN0b3IpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHBhcmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJlc3VsdCA9IHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnBhcmVudEVsZW1lbnQgfHwgZG9jLmJvZHkucGFyZW50Tm9kZTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdW5pcXVlKHJlc3VsdCk7XG4gICAgfSxcblxuICAgIHBhcmVudHM6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgdmFyIGxhc3QsIHJlc3VsdCA9IFtdO1xuXG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgbGFzdCA9IGl0ZW07XG5cbiAgICAgICAgd2hpbGUgKGxhc3QgIT09IGRvYy5ib2R5LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICBsYXN0ID0gbGFzdC5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgICAgaWYgKCFzZWxlY3RvciB8fCAoc2VsZWN0b3IgJiYgbWF0Y2hlcyhsYXN0LCBzZWxlY3RvcikpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChsYXN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdW5pcXVlKHJlc3VsdCk7XG4gICAgfSxcblxuICAgIHByZXY6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjYXNoKHRoaXNbMF0ucHJldmlvdXNFbGVtZW50U2libGluZyk7XG4gICAgfSxcblxuICAgIHNpYmxpbmdzOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29sbGVjdGlvbiA9IHRoaXMucGFyZW50KCkuY2hpbGRyZW4oKSwgZWwgPSB0aGlzWzBdO1xuXG4gICAgICByZXR1cm4gZmlsdGVyLmNhbGwoY29sbGVjdGlvbiwgZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIGkgIT09IGVsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH0pO1xuXG5cbiAgcmV0dXJuIGNhc2g7XG59KTsiLCIvKiEgc2tyb2xsciAwLjYuMjYgKDIwMTQtMDYtMDgpIHwgQWxleGFuZGVyIFByaW56aG9ybiAtIGh0dHBzOi8vZ2l0aHViLmNvbS9Qcmluemhvcm4vc2tyb2xsciB8IEZyZWUgdG8gdXNlIHVuZGVyIHRlcm1zIG9mIE1JVCBsaWNlbnNlICovXG4oZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4ocil7aWYobz10LmRvY3VtZW50RWxlbWVudCxhPXQuYm9keSxLKCksaXQ9dGhpcyxyPXJ8fHt9LHV0PXIuY29uc3RhbnRzfHx7fSxyLmVhc2luZylmb3IodmFyIG4gaW4gci5lYXNpbmcpVVtuXT1yLmVhc2luZ1tuXTt5dD1yLmVkZ2VTdHJhdGVneXx8XCJzZXRcIixjdD17YmVmb3JlcmVuZGVyOnIuYmVmb3JlcmVuZGVyLHJlbmRlcjpyLnJlbmRlcixrZXlmcmFtZTpyLmtleWZyYW1lfSxmdD1yLmZvcmNlSGVpZ2h0IT09ITEsZnQmJihWdD1yLnNjYWxlfHwxKSxtdD1yLm1vYmlsZURlY2VsZXJhdGlvbnx8eCxkdD1yLnNtb290aFNjcm9sbGluZyE9PSExLGd0PXIuc21vb3RoU2Nyb2xsaW5nRHVyYXRpb258fEUsdnQ9e3RhcmdldFRvcDppdC5nZXRTY3JvbGxUb3AoKX0sR3Q9KHIubW9iaWxlQ2hlY2t8fGZ1bmN0aW9uKCl7cmV0dXJuL0FuZHJvaWR8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50fHxuYXZpZ2F0b3IudmVuZG9yfHxlLm9wZXJhKX0pKCksR3Q/KHN0PXQuZ2V0RWxlbWVudEJ5SWQoXCJza3JvbGxyLWJvZHlcIiksc3QmJmF0KCksWCgpLER0KG8sW3ksU10sW1RdKSk6RHQobyxbeSxiXSxbVF0pLGl0LnJlZnJlc2goKSxTdChlLFwicmVzaXplIG9yaWVudGF0aW9uY2hhbmdlXCIsZnVuY3Rpb24oKXt2YXIgZT1vLmNsaWVudFdpZHRoLHQ9by5jbGllbnRIZWlnaHQ7KHQhPT0kdHx8ZSE9PU10KSYmKCR0PXQsTXQ9ZSxfdD0hMCl9KTt2YXIgaT1ZKCk7cmV0dXJuIGZ1bmN0aW9uIGwoKXtaKCksYnQ9aShsKX0oKSxpdH12YXIgbyxhLGk9e2dldDpmdW5jdGlvbigpe3JldHVybiBpdH0saW5pdDpmdW5jdGlvbihlKXtyZXR1cm4gaXR8fG5ldyBuKGUpfSxWRVJTSU9OOlwiMC42LjI2XCJ9LGw9T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxzPWUuTWF0aCxjPWUuZ2V0Q29tcHV0ZWRTdHlsZSxmPVwidG91Y2hzdGFydFwiLHU9XCJ0b3VjaG1vdmVcIixtPVwidG91Y2hjYW5jZWxcIixwPVwidG91Y2hlbmRcIixkPVwic2tyb2xsYWJsZVwiLGc9ZCtcIi1iZWZvcmVcIix2PWQrXCItYmV0d2VlblwiLGg9ZCtcIi1hZnRlclwiLHk9XCJza3JvbGxyXCIsVD1cIm5vLVwiK3ksYj15K1wiLWRlc2t0b3BcIixTPXkrXCItbW9iaWxlXCIsaz1cImxpbmVhclwiLHc9MWUzLHg9LjAwNCxFPTIwMCxBPVwic3RhcnRcIixGPVwiZW5kXCIsQz1cImNlbnRlclwiLEQ9XCJib3R0b21cIixIPVwiX19fc2tyb2xsYWJsZV9pZFwiLEk9L14oPzppbnB1dHx0ZXh0YXJlYXxidXR0b258c2VsZWN0KSQvaSxQPS9eXFxzK3xcXHMrJC9nLE49L15kYXRhKD86LShfXFx3KykpPyg/Oi0/KC0/XFxkKlxcLj9cXGQrcD8pKT8oPzotPyhzdGFydHxlbmR8dG9wfGNlbnRlcnxib3R0b20pKT8oPzotPyh0b3B8Y2VudGVyfGJvdHRvbSkpPyQvLE89L1xccyooQD9bXFx3XFwtXFxbXFxdXSspXFxzKjpcXHMqKC4rPylcXHMqKD86O3wkKS9naSxWPS9eKEA/W2EtelxcLV0rKVxcWyhcXHcrKVxcXSQvLHo9Ly0oW2EtejAtOV9dKS9nLHE9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC50b1VwcGVyQ2FzZSgpfSxMPS9bXFwtK10/W1xcZF0qXFwuP1tcXGRdKy9nLE09L1xce1xcP1xcfS9nLCQ9L3JnYmE/XFwoXFxzKi0/XFxkK1xccyosXFxzKi0/XFxkK1xccyosXFxzKi0/XFxkKy9nLF89L1thLXpcXC1dKy1ncmFkaWVudC9nLEI9XCJcIixHPVwiXCIsSz1mdW5jdGlvbigpe3ZhciBlPS9eKD86T3xNb3p8d2Via2l0fG1zKXwoPzotKD86b3xtb3p8d2Via2l0fG1zKS0pLztpZihjKXt2YXIgdD1jKGEsbnVsbCk7Zm9yKHZhciBuIGluIHQpaWYoQj1uLm1hdGNoKGUpfHwrbj09biYmdFtuXS5tYXRjaChlKSlicmVhaztpZighQilyZXR1cm4gQj1HPVwiXCIscjtCPUJbMF0sXCItXCI9PT1CLnNsaWNlKDAsMSk/KEc9QixCPXtcIi13ZWJraXQtXCI6XCJ3ZWJraXRcIixcIi1tb3otXCI6XCJNb3pcIixcIi1tcy1cIjpcIm1zXCIsXCItby1cIjpcIk9cIn1bQl0pOkc9XCItXCIrQi50b0xvd2VyQ2FzZSgpK1wiLVwifX0sWT1mdW5jdGlvbigpe3ZhciB0PWUucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxlW0IudG9Mb3dlckNhc2UoKStcIlJlcXVlc3RBbmltYXRpb25GcmFtZVwiXSxyPVB0KCk7cmV0dXJuKEd0fHwhdCkmJih0PWZ1bmN0aW9uKHQpe3ZhciBuPVB0KCktcixvPXMubWF4KDAsMWUzLzYwLW4pO3JldHVybiBlLnNldFRpbWVvdXQoZnVuY3Rpb24oKXtyPVB0KCksdCgpfSxvKX0pLHR9LFI9ZnVuY3Rpb24oKXt2YXIgdD1lLmNhbmNlbEFuaW1hdGlvbkZyYW1lfHxlW0IudG9Mb3dlckNhc2UoKStcIkNhbmNlbEFuaW1hdGlvbkZyYW1lXCJdO3JldHVybihHdHx8IXQpJiYodD1mdW5jdGlvbih0KXtyZXR1cm4gZS5jbGVhclRpbWVvdXQodCl9KSx0fSxVPXtiZWdpbjpmdW5jdGlvbigpe3JldHVybiAwfSxlbmQ6ZnVuY3Rpb24oKXtyZXR1cm4gMX0sbGluZWFyOmZ1bmN0aW9uKGUpe3JldHVybiBlfSxxdWFkcmF0aWM6ZnVuY3Rpb24oZSl7cmV0dXJuIGUqZX0sY3ViaWM6ZnVuY3Rpb24oZSl7cmV0dXJuIGUqZSplfSxzd2luZzpmdW5jdGlvbihlKXtyZXR1cm4tcy5jb3MoZSpzLlBJKS8yKy41fSxzcXJ0OmZ1bmN0aW9uKGUpe3JldHVybiBzLnNxcnQoZSl9LG91dEN1YmljOmZ1bmN0aW9uKGUpe3JldHVybiBzLnBvdyhlLTEsMykrMX0sYm91bmNlOmZ1bmN0aW9uKGUpe3ZhciB0O2lmKC41MDgzPj1lKXQ9MztlbHNlIGlmKC44NDg5Pj1lKXQ9OTtlbHNlIGlmKC45NjIwOD49ZSl0PTI3O2Vsc2V7aWYoISguOTk5ODE+PWUpKXJldHVybiAxO3Q9OTF9cmV0dXJuIDEtcy5hYnMoMypzLmNvcygxLjAyOCplKnQpL3QpfX07bi5wcm90b3R5cGUucmVmcmVzaD1mdW5jdGlvbihlKXt2YXIgbixvLGE9ITE7Zm9yKGU9PT1yPyhhPSEwLGx0PVtdLEJ0PTAsZT10LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKSk6ZS5sZW5ndGg9PT1yJiYoZT1bZV0pLG49MCxvPWUubGVuZ3RoO28+bjtuKyspe3ZhciBpPWVbbl0sbD1pLHM9W10sYz1kdCxmPXl0LHU9ITE7aWYoYSYmSCBpbiBpJiZkZWxldGUgaVtIXSxpLmF0dHJpYnV0ZXMpe2Zvcih2YXIgbT0wLHA9aS5hdHRyaWJ1dGVzLmxlbmd0aDtwPm07bSsrKXt2YXIgZz1pLmF0dHJpYnV0ZXNbbV07aWYoXCJkYXRhLWFuY2hvci10YXJnZXRcIiE9PWcubmFtZSlpZihcImRhdGEtc21vb3RoLXNjcm9sbGluZ1wiIT09Zy5uYW1lKWlmKFwiZGF0YS1lZGdlLXN0cmF0ZWd5XCIhPT1nLm5hbWUpaWYoXCJkYXRhLWVtaXQtZXZlbnRzXCIhPT1nLm5hbWUpe3ZhciB2PWcubmFtZS5tYXRjaChOKTtpZihudWxsIT09dil7dmFyIGg9e3Byb3BzOmcudmFsdWUsZWxlbWVudDppLGV2ZW50VHlwZTpnLm5hbWUucmVwbGFjZSh6LHEpfTtzLnB1c2goaCk7dmFyIHk9dlsxXTt5JiYoaC5jb25zdGFudD15LnN1YnN0cigxKSk7dmFyIFQ9dlsyXTsvcCQvLnRlc3QoVCk/KGguaXNQZXJjZW50YWdlPSEwLGgub2Zmc2V0PSgwfFQuc2xpY2UoMCwtMSkpLzEwMCk6aC5vZmZzZXQ9MHxUO3ZhciBiPXZbM10sUz12WzRdfHxiO2ImJmIhPT1BJiZiIT09Rj8oaC5tb2RlPVwicmVsYXRpdmVcIixoLmFuY2hvcnM9W2IsU10pOihoLm1vZGU9XCJhYnNvbHV0ZVwiLGI9PT1GP2guaXNFbmQ9ITA6aC5pc1BlcmNlbnRhZ2V8fChoLm9mZnNldD1oLm9mZnNldCpWdCkpfX1lbHNlIHU9ITA7ZWxzZSBmPWcudmFsdWU7ZWxzZSBjPVwib2ZmXCIhPT1nLnZhbHVlO2Vsc2UgaWYobD10LnF1ZXJ5U2VsZWN0b3IoZy52YWx1ZSksbnVsbD09PWwpdGhyb3cnVW5hYmxlIHRvIGZpbmQgYW5jaG9yIHRhcmdldCBcIicrZy52YWx1ZSsnXCInfWlmKHMubGVuZ3RoKXt2YXIgayx3LHg7IWEmJkggaW4gaT8oeD1pW0hdLGs9bHRbeF0uc3R5bGVBdHRyLHc9bHRbeF0uY2xhc3NBdHRyKTooeD1pW0hdPUJ0Kyssaz1pLnN0eWxlLmNzc1RleHQsdz1DdChpKSksbHRbeF09e2VsZW1lbnQ6aSxzdHlsZUF0dHI6ayxjbGFzc0F0dHI6dyxhbmNob3JUYXJnZXQ6bCxrZXlGcmFtZXM6cyxzbW9vdGhTY3JvbGxpbmc6YyxlZGdlU3RyYXRlZ3k6ZixlbWl0RXZlbnRzOnUsbGFzdEZyYW1lSW5kZXg6LTF9LER0KGksW2RdLFtdKX19fWZvcihFdCgpLG49MCxvPWUubGVuZ3RoO28+bjtuKyspe3ZhciBFPWx0W2Vbbl1bSF1dO0UhPT1yJiYoSihFKSxldChFKSl9cmV0dXJuIGl0fSxuLnByb3RvdHlwZS5yZWxhdGl2ZVRvQWJzb2x1dGU9ZnVuY3Rpb24oZSx0LHIpe3ZhciBuPW8uY2xpZW50SGVpZ2h0LGE9ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxpPWEudG9wLGw9YS5ib3R0b20tYS50b3A7cmV0dXJuIHQ9PT1EP2ktPW46dD09PUMmJihpLT1uLzIpLHI9PT1EP2krPWw6cj09PUMmJihpKz1sLzIpLGkrPWl0LmdldFNjcm9sbFRvcCgpLDB8aSsuNX0sbi5wcm90b3R5cGUuYW5pbWF0ZVRvPWZ1bmN0aW9uKGUsdCl7dD10fHx7fTt2YXIgbj1QdCgpLG89aXQuZ2V0U2Nyb2xsVG9wKCk7cmV0dXJuIHB0PXtzdGFydFRvcDpvLHRvcERpZmY6ZS1vLHRhcmdldFRvcDplLGR1cmF0aW9uOnQuZHVyYXRpb258fHcsc3RhcnRUaW1lOm4sZW5kVGltZTpuKyh0LmR1cmF0aW9ufHx3KSxlYXNpbmc6VVt0LmVhc2luZ3x8a10sZG9uZTp0LmRvbmV9LHB0LnRvcERpZmZ8fChwdC5kb25lJiZwdC5kb25lLmNhbGwoaXQsITEpLHB0PXIpLGl0fSxuLnByb3RvdHlwZS5zdG9wQW5pbWF0ZVRvPWZ1bmN0aW9uKCl7cHQmJnB0LmRvbmUmJnB0LmRvbmUuY2FsbChpdCwhMCkscHQ9cn0sbi5wcm90b3R5cGUuaXNBbmltYXRpbmdUbz1mdW5jdGlvbigpe3JldHVybiEhcHR9LG4ucHJvdG90eXBlLmlzTW9iaWxlPWZ1bmN0aW9uKCl7cmV0dXJuIEd0fSxuLnByb3RvdHlwZS5zZXRTY3JvbGxUb3A9ZnVuY3Rpb24odCxyKXtyZXR1cm4gaHQ9cj09PSEwLEd0P0t0PXMubWluKHMubWF4KHQsMCksT3QpOmUuc2Nyb2xsVG8oMCx0KSxpdH0sbi5wcm90b3R5cGUuZ2V0U2Nyb2xsVG9wPWZ1bmN0aW9uKCl7cmV0dXJuIEd0P0t0OmUucGFnZVlPZmZzZXR8fG8uc2Nyb2xsVG9wfHxhLnNjcm9sbFRvcHx8MH0sbi5wcm90b3R5cGUuZ2V0TWF4U2Nyb2xsVG9wPWZ1bmN0aW9uKCl7cmV0dXJuIE90fSxuLnByb3RvdHlwZS5vbj1mdW5jdGlvbihlLHQpe3JldHVybiBjdFtlXT10LGl0fSxuLnByb3RvdHlwZS5vZmY9ZnVuY3Rpb24oZSl7cmV0dXJuIGRlbGV0ZSBjdFtlXSxpdH0sbi5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3ZhciBlPVIoKTtlKGJ0KSx3dCgpLER0KG8sW1RdLFt5LGIsU10pO2Zvcih2YXIgdD0wLG49bHQubGVuZ3RoO24+dDt0Kyspb3QobHRbdF0uZWxlbWVudCk7by5zdHlsZS5vdmVyZmxvdz1hLnN0eWxlLm92ZXJmbG93PVwiXCIsby5zdHlsZS5oZWlnaHQ9YS5zdHlsZS5oZWlnaHQ9XCJcIixzdCYmaS5zZXRTdHlsZShzdCxcInRyYW5zZm9ybVwiLFwibm9uZVwiKSxpdD1yLHN0PXIsY3Q9cixmdD1yLE90PTAsVnQ9MSx1dD1yLG10PXIsenQ9XCJkb3duXCIscXQ9LTEsTXQ9MCwkdD0wLF90PSExLHB0PXIsZHQ9cixndD1yLHZ0PXIsaHQ9cixCdD0wLHl0PXIsR3Q9ITEsS3Q9MCxUdD1yfTt2YXIgWD1mdW5jdGlvbigpe3ZhciBuLGksbCxjLGQsZyx2LGgseSxULGIsUztTdChvLFtmLHUsbSxwXS5qb2luKFwiIFwiKSxmdW5jdGlvbihlKXt2YXIgbz1lLmNoYW5nZWRUb3VjaGVzWzBdO2ZvcihjPWUudGFyZ2V0OzM9PT1jLm5vZGVUeXBlOyljPWMucGFyZW50Tm9kZTtzd2l0Y2goZD1vLmNsaWVudFksZz1vLmNsaWVudFgsVD1lLnRpbWVTdGFtcCxJLnRlc3QoYy50YWdOYW1lKXx8ZS5wcmV2ZW50RGVmYXVsdCgpLGUudHlwZSl7Y2FzZSBmOm4mJm4uYmx1cigpLGl0LnN0b3BBbmltYXRlVG8oKSxuPWMsaT12PWQsbD1nLHk9VDticmVhaztjYXNlIHU6SS50ZXN0KGMudGFnTmFtZSkmJnQuYWN0aXZlRWxlbWVudCE9PWMmJmUucHJldmVudERlZmF1bHQoKSxoPWQtdixTPVQtYixpdC5zZXRTY3JvbGxUb3AoS3QtaCwhMCksdj1kLGI9VDticmVhaztkZWZhdWx0OmNhc2UgbTpjYXNlIHA6dmFyIGE9aS1kLGs9bC1nLHc9ayprK2EqYTtpZig0OT53KXtpZighSS50ZXN0KG4udGFnTmFtZSkpe24uZm9jdXMoKTt2YXIgeD10LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudHNcIik7eC5pbml0TW91c2VFdmVudChcImNsaWNrXCIsITAsITAsZS52aWV3LDEsby5zY3JlZW5YLG8uc2NyZWVuWSxvLmNsaWVudFgsby5jbGllbnRZLGUuY3RybEtleSxlLmFsdEtleSxlLnNoaWZ0S2V5LGUubWV0YUtleSwwLG51bGwpLG4uZGlzcGF0Y2hFdmVudCh4KX1yZXR1cm59bj1yO3ZhciBFPWgvUztFPXMubWF4KHMubWluKEUsMyksLTMpO3ZhciBBPXMuYWJzKEUvbXQpLEY9RSpBKy41Km10KkEqQSxDPWl0LmdldFNjcm9sbFRvcCgpLUYsRD0wO0M+T3Q/KEQ9KE90LUMpL0YsQz1PdCk6MD5DJiYoRD0tQy9GLEM9MCksQSo9MS1ELGl0LmFuaW1hdGVUbygwfEMrLjUse2Vhc2luZzpcIm91dEN1YmljXCIsZHVyYXRpb246QX0pfX0pLGUuc2Nyb2xsVG8oMCwwKSxvLnN0eWxlLm92ZXJmbG93PWEuc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIn0saj1mdW5jdGlvbigpe3ZhciBlLHQscixuLGEsaSxsLGMsZix1LG0scD1vLmNsaWVudEhlaWdodCxkPUF0KCk7Zm9yKGM9MCxmPWx0Lmxlbmd0aDtmPmM7YysrKWZvcihlPWx0W2NdLHQ9ZS5lbGVtZW50LHI9ZS5hbmNob3JUYXJnZXQsbj1lLmtleUZyYW1lcyxhPTAsaT1uLmxlbmd0aDtpPmE7YSsrKWw9blthXSx1PWwub2Zmc2V0LG09ZFtsLmNvbnN0YW50XXx8MCxsLmZyYW1lPXUsbC5pc1BlcmNlbnRhZ2UmJih1Kj1wLGwuZnJhbWU9dSksXCJyZWxhdGl2ZVwiPT09bC5tb2RlJiYob3QodCksbC5mcmFtZT1pdC5yZWxhdGl2ZVRvQWJzb2x1dGUocixsLmFuY2hvcnNbMF0sbC5hbmNob3JzWzFdKS11LG90KHQsITApKSxsLmZyYW1lKz1tLGZ0JiYhbC5pc0VuZCYmbC5mcmFtZT5PdCYmKE90PWwuZnJhbWUpO2ZvcihPdD1zLm1heChPdCxGdCgpKSxjPTAsZj1sdC5sZW5ndGg7Zj5jO2MrKyl7Zm9yKGU9bHRbY10sbj1lLmtleUZyYW1lcyxhPTAsaT1uLmxlbmd0aDtpPmE7YSsrKWw9blthXSxtPWRbbC5jb25zdGFudF18fDAsbC5pc0VuZCYmKGwuZnJhbWU9T3QtbC5vZmZzZXQrbSk7ZS5rZXlGcmFtZXMuc29ydChOdCl9fSxXPWZ1bmN0aW9uKGUsdCl7Zm9yKHZhciByPTAsbj1sdC5sZW5ndGg7bj5yO3IrKyl7dmFyIG8sYSxzPWx0W3JdLGM9cy5lbGVtZW50LGY9cy5zbW9vdGhTY3JvbGxpbmc/ZTp0LHU9cy5rZXlGcmFtZXMsbT11Lmxlbmd0aCxwPXVbMF0seT11W3UubGVuZ3RoLTFdLFQ9cC5mcmFtZT5mLGI9Zj55LmZyYW1lLFM9VD9wOnksaz1zLmVtaXRFdmVudHMsdz1zLmxhc3RGcmFtZUluZGV4O2lmKFR8fGIpe2lmKFQmJi0xPT09cy5lZGdlfHxiJiYxPT09cy5lZGdlKWNvbnRpbnVlO3N3aXRjaChUPyhEdChjLFtnXSxbaCx2XSksayYmdz4tMSYmKHh0KGMscC5ldmVudFR5cGUsenQpLHMubGFzdEZyYW1lSW5kZXg9LTEpKTooRHQoYyxbaF0sW2csdl0pLGsmJm0+dyYmKHh0KGMseS5ldmVudFR5cGUsenQpLHMubGFzdEZyYW1lSW5kZXg9bSkpLHMuZWRnZT1UPy0xOjEscy5lZGdlU3RyYXRlZ3kpe2Nhc2VcInJlc2V0XCI6b3QoYyk7Y29udGludWU7Y2FzZVwiZWFzZVwiOmY9Uy5mcmFtZTticmVhaztkZWZhdWx0OmNhc2VcInNldFwiOnZhciB4PVMucHJvcHM7Zm9yKG8gaW4geClsLmNhbGwoeCxvKSYmKGE9bnQoeFtvXS52YWx1ZSksMD09PW8uaW5kZXhPZihcIkBcIik/Yy5zZXRBdHRyaWJ1dGUoby5zdWJzdHIoMSksYSk6aS5zZXRTdHlsZShjLG8sYSkpO2NvbnRpbnVlfX1lbHNlIDAhPT1zLmVkZ2UmJihEdChjLFtkLHZdLFtnLGhdKSxzLmVkZ2U9MCk7Zm9yKHZhciBFPTA7bS0xPkU7RSsrKWlmKGY+PXVbRV0uZnJhbWUmJnVbRSsxXS5mcmFtZT49Zil7dmFyIEE9dVtFXSxGPXVbRSsxXTtmb3IobyBpbiBBLnByb3BzKWlmKGwuY2FsbChBLnByb3BzLG8pKXt2YXIgQz0oZi1BLmZyYW1lKS8oRi5mcmFtZS1BLmZyYW1lKTtDPUEucHJvcHNbb10uZWFzaW5nKEMpLGE9cnQoQS5wcm9wc1tvXS52YWx1ZSxGLnByb3BzW29dLnZhbHVlLEMpLGE9bnQoYSksMD09PW8uaW5kZXhPZihcIkBcIik/Yy5zZXRBdHRyaWJ1dGUoby5zdWJzdHIoMSksYSk6aS5zZXRTdHlsZShjLG8sYSl9ayYmdyE9PUUmJihcImRvd25cIj09PXp0P3h0KGMsQS5ldmVudFR5cGUsenQpOnh0KGMsRi5ldmVudFR5cGUsenQpLHMubGFzdEZyYW1lSW5kZXg9RSk7YnJlYWt9fX0sWj1mdW5jdGlvbigpe190JiYoX3Q9ITEsRXQoKSk7dmFyIGUsdCxuPWl0LmdldFNjcm9sbFRvcCgpLG89UHQoKTtpZihwdClvPj1wdC5lbmRUaW1lPyhuPXB0LnRhcmdldFRvcCxlPXB0LmRvbmUscHQ9cik6KHQ9cHQuZWFzaW5nKChvLXB0LnN0YXJ0VGltZSkvcHQuZHVyYXRpb24pLG49MHxwdC5zdGFydFRvcCt0KnB0LnRvcERpZmYpLGl0LnNldFNjcm9sbFRvcChuLCEwKTtlbHNlIGlmKCFodCl7dmFyIGE9dnQudGFyZ2V0VG9wLW47YSYmKHZ0PXtzdGFydFRvcDpxdCx0b3BEaWZmOm4tcXQsdGFyZ2V0VG9wOm4sc3RhcnRUaW1lOkx0LGVuZFRpbWU6THQrZ3R9KSx2dC5lbmRUaW1lPj1vJiYodD1VLnNxcnQoKG8tdnQuc3RhcnRUaW1lKS9ndCksbj0wfHZ0LnN0YXJ0VG9wK3QqdnQudG9wRGlmZil9aWYoR3QmJnN0JiZpLnNldFN0eWxlKHN0LFwidHJhbnNmb3JtXCIsXCJ0cmFuc2xhdGUoMCwgXCIrLUt0K1wicHgpIFwiK1R0KSxodHx8cXQhPT1uKXt6dD1uPnF0P1wiZG93blwiOnF0Pm4/XCJ1cFwiOnp0LGh0PSExO3ZhciBsPXtjdXJUb3A6bixsYXN0VG9wOnF0LG1heFRvcDpPdCxkaXJlY3Rpb246enR9LHM9Y3QuYmVmb3JlcmVuZGVyJiZjdC5iZWZvcmVyZW5kZXIuY2FsbChpdCxsKTtzIT09ITEmJihXKG4saXQuZ2V0U2Nyb2xsVG9wKCkpLHF0PW4sY3QucmVuZGVyJiZjdC5yZW5kZXIuY2FsbChpdCxsKSksZSYmZS5jYWxsKGl0LCExKX1MdD1vfSxKPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD0wLHI9ZS5rZXlGcmFtZXMubGVuZ3RoO3I+dDt0Kyspe2Zvcih2YXIgbixvLGEsaSxsPWUua2V5RnJhbWVzW3RdLHM9e307bnVsbCE9PShpPU8uZXhlYyhsLnByb3BzKSk7KWE9aVsxXSxvPWlbMl0sbj1hLm1hdGNoKFYpLG51bGwhPT1uPyhhPW5bMV0sbj1uWzJdKTpuPWssbz1vLmluZGV4T2YoXCIhXCIpP1Eobyk6W28uc2xpY2UoMSldLHNbYV09e3ZhbHVlOm8sZWFzaW5nOlVbbl19O2wucHJvcHM9c319LFE9ZnVuY3Rpb24oZSl7dmFyIHQ9W107cmV0dXJuICQubGFzdEluZGV4PTAsZT1lLnJlcGxhY2UoJCxmdW5jdGlvbihlKXtyZXR1cm4gZS5yZXBsYWNlKEwsZnVuY3Rpb24oZSl7cmV0dXJuIDEwMCooZS8yNTUpK1wiJVwifSl9KSxHJiYoXy5sYXN0SW5kZXg9MCxlPWUucmVwbGFjZShfLGZ1bmN0aW9uKGUpe3JldHVybiBHK2V9KSksZT1lLnJlcGxhY2UoTCxmdW5jdGlvbihlKXtyZXR1cm4gdC5wdXNoKCtlKSxcIns/fVwifSksdC51bnNoaWZ0KGUpLHR9LGV0PWZ1bmN0aW9uKGUpe3ZhciB0LHIsbj17fTtmb3IodD0wLHI9ZS5rZXlGcmFtZXMubGVuZ3RoO3I+dDt0KyspdHQoZS5rZXlGcmFtZXNbdF0sbik7Zm9yKG49e30sdD1lLmtleUZyYW1lcy5sZW5ndGgtMTt0Pj0wO3QtLSl0dChlLmtleUZyYW1lc1t0XSxuKX0sdHQ9ZnVuY3Rpb24oZSx0KXt2YXIgcjtmb3IociBpbiB0KWwuY2FsbChlLnByb3BzLHIpfHwoZS5wcm9wc1tyXT10W3JdKTtmb3IociBpbiBlLnByb3BzKXRbcl09ZS5wcm9wc1tyXX0scnQ9ZnVuY3Rpb24oZSx0LHIpe3ZhciBuLG89ZS5sZW5ndGg7aWYobyE9PXQubGVuZ3RoKXRocm93XCJDYW4ndCBpbnRlcnBvbGF0ZSBiZXR3ZWVuIFxcXCJcIitlWzBdKydcIiBhbmQgXCInK3RbMF0rJ1wiJzt2YXIgYT1bZVswXV07Zm9yKG49MTtvPm47bisrKWFbbl09ZVtuXSsodFtuXS1lW25dKSpyO3JldHVybiBhfSxudD1mdW5jdGlvbihlKXt2YXIgdD0xO3JldHVybiBNLmxhc3RJbmRleD0wLGVbMF0ucmVwbGFjZShNLGZ1bmN0aW9uKCl7cmV0dXJuIGVbdCsrXX0pfSxvdD1mdW5jdGlvbihlLHQpe2U9W10uY29uY2F0KGUpO2Zvcih2YXIgcixuLG89MCxhPWUubGVuZ3RoO2E+bztvKyspbj1lW29dLHI9bHRbbltIXV0sciYmKHQ/KG4uc3R5bGUuY3NzVGV4dD1yLmRpcnR5U3R5bGVBdHRyLER0KG4sci5kaXJ0eUNsYXNzQXR0cikpOihyLmRpcnR5U3R5bGVBdHRyPW4uc3R5bGUuY3NzVGV4dCxyLmRpcnR5Q2xhc3NBdHRyPUN0KG4pLG4uc3R5bGUuY3NzVGV4dD1yLnN0eWxlQXR0cixEdChuLHIuY2xhc3NBdHRyKSkpfSxhdD1mdW5jdGlvbigpe1R0PVwidHJhbnNsYXRlWigwKVwiLGkuc2V0U3R5bGUoc3QsXCJ0cmFuc2Zvcm1cIixUdCk7dmFyIGU9YyhzdCksdD1lLmdldFByb3BlcnR5VmFsdWUoXCJ0cmFuc2Zvcm1cIikscj1lLmdldFByb3BlcnR5VmFsdWUoRytcInRyYW5zZm9ybVwiKSxuPXQmJlwibm9uZVwiIT09dHx8ciYmXCJub25lXCIhPT1yO258fChUdD1cIlwiKX07aS5zZXRTdHlsZT1mdW5jdGlvbihlLHQscil7dmFyIG49ZS5zdHlsZTtpZih0PXQucmVwbGFjZSh6LHEpLnJlcGxhY2UoXCItXCIsXCJcIiksXCJ6SW5kZXhcIj09PXQpblt0XT1pc05hTihyKT9yOlwiXCIrKDB8cik7ZWxzZSBpZihcImZsb2F0XCI9PT10KW4uc3R5bGVGbG9hdD1uLmNzc0Zsb2F0PXI7ZWxzZSB0cnl7QiYmKG5bQit0LnNsaWNlKDAsMSkudG9VcHBlckNhc2UoKSt0LnNsaWNlKDEpXT1yKSxuW3RdPXJ9Y2F0Y2gobyl7fX07dmFyIGl0LGx0LHN0LGN0LGZ0LHV0LG10LHB0LGR0LGd0LHZ0LGh0LHl0LFR0LGJ0LFN0PWkuYWRkRXZlbnQ9ZnVuY3Rpb24odCxyLG4pe3ZhciBvPWZ1bmN0aW9uKHQpe3JldHVybiB0PXR8fGUuZXZlbnQsdC50YXJnZXR8fCh0LnRhcmdldD10LnNyY0VsZW1lbnQpLHQucHJldmVudERlZmF1bHR8fCh0LnByZXZlbnREZWZhdWx0PWZ1bmN0aW9uKCl7dC5yZXR1cm5WYWx1ZT0hMSx0LmRlZmF1bHRQcmV2ZW50ZWQ9ITB9KSxuLmNhbGwodGhpcyx0KX07cj1yLnNwbGl0KFwiIFwiKTtmb3IodmFyIGEsaT0wLGw9ci5sZW5ndGg7bD5pO2krKylhPXJbaV0sdC5hZGRFdmVudExpc3RlbmVyP3QuYWRkRXZlbnRMaXN0ZW5lcihhLG4sITEpOnQuYXR0YWNoRXZlbnQoXCJvblwiK2EsbyksWXQucHVzaCh7ZWxlbWVudDp0LG5hbWU6YSxsaXN0ZW5lcjpufSl9LGt0PWkucmVtb3ZlRXZlbnQ9ZnVuY3Rpb24oZSx0LHIpe3Q9dC5zcGxpdChcIiBcIik7Zm9yKHZhciBuPTAsbz10Lmxlbmd0aDtvPm47bisrKWUucmVtb3ZlRXZlbnRMaXN0ZW5lcj9lLnJlbW92ZUV2ZW50TGlzdGVuZXIodFtuXSxyLCExKTplLmRldGFjaEV2ZW50KFwib25cIit0W25dLHIpfSx3dD1mdW5jdGlvbigpe2Zvcih2YXIgZSx0PTAscj1ZdC5sZW5ndGg7cj50O3QrKyllPVl0W3RdLGt0KGUuZWxlbWVudCxlLm5hbWUsZS5saXN0ZW5lcik7WXQ9W119LHh0PWZ1bmN0aW9uKGUsdCxyKXtjdC5rZXlmcmFtZSYmY3Qua2V5ZnJhbWUuY2FsbChpdCxlLHQscil9LEV0PWZ1bmN0aW9uKCl7dmFyIGU9aXQuZ2V0U2Nyb2xsVG9wKCk7T3Q9MCxmdCYmIUd0JiYoYS5zdHlsZS5oZWlnaHQ9XCJcIiksaigpLGZ0JiYhR3QmJihhLnN0eWxlLmhlaWdodD1PdCtvLmNsaWVudEhlaWdodCtcInB4XCIpLEd0P2l0LnNldFNjcm9sbFRvcChzLm1pbihpdC5nZXRTY3JvbGxUb3AoKSxPdCkpOml0LnNldFNjcm9sbFRvcChlLCEwKSxodD0hMH0sQXQ9ZnVuY3Rpb24oKXt2YXIgZSx0LHI9by5jbGllbnRIZWlnaHQsbj17fTtmb3IoZSBpbiB1dCl0PXV0W2VdLFwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dD10LmNhbGwoaXQpOi9wJC8udGVzdCh0KSYmKHQ9dC5zbGljZSgwLC0xKS8xMDAqciksbltlXT10O3JldHVybiBufSxGdD1mdW5jdGlvbigpe3ZhciBlPXN0JiZzdC5vZmZzZXRIZWlnaHR8fDAsdD1zLm1heChlLGEuc2Nyb2xsSGVpZ2h0LGEub2Zmc2V0SGVpZ2h0LG8uc2Nyb2xsSGVpZ2h0LG8ub2Zmc2V0SGVpZ2h0LG8uY2xpZW50SGVpZ2h0KTtyZXR1cm4gdC1vLmNsaWVudEhlaWdodH0sQ3Q9ZnVuY3Rpb24odCl7dmFyIHI9XCJjbGFzc05hbWVcIjtyZXR1cm4gZS5TVkdFbGVtZW50JiZ0IGluc3RhbmNlb2YgZS5TVkdFbGVtZW50JiYodD10W3JdLHI9XCJiYXNlVmFsXCIpLHRbcl19LER0PWZ1bmN0aW9uKHQsbixvKXt2YXIgYT1cImNsYXNzTmFtZVwiO2lmKGUuU1ZHRWxlbWVudCYmdCBpbnN0YW5jZW9mIGUuU1ZHRWxlbWVudCYmKHQ9dFthXSxhPVwiYmFzZVZhbFwiKSxvPT09cilyZXR1cm4gdFthXT1uLHI7Zm9yKHZhciBpPXRbYV0sbD0wLHM9by5sZW5ndGg7cz5sO2wrKylpPUl0KGkpLnJlcGxhY2UoSXQob1tsXSksXCIgXCIpO2k9SHQoaSk7Zm9yKHZhciBjPTAsZj1uLmxlbmd0aDtmPmM7YysrKS0xPT09SXQoaSkuaW5kZXhPZihJdChuW2NdKSkmJihpKz1cIiBcIituW2NdKTt0W2FdPUh0KGkpfSxIdD1mdW5jdGlvbihlKXtyZXR1cm4gZS5yZXBsYWNlKFAsXCJcIil9LEl0PWZ1bmN0aW9uKGUpe3JldHVyblwiIFwiK2UrXCIgXCJ9LFB0PURhdGUubm93fHxmdW5jdGlvbigpe3JldHVybituZXcgRGF0ZX0sTnQ9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5mcmFtZS10LmZyYW1lfSxPdD0wLFZ0PTEsenQ9XCJkb3duXCIscXQ9LTEsTHQ9UHQoKSxNdD0wLCR0PTAsX3Q9ITEsQnQ9MCxHdD0hMSxLdD0wLFl0PVtdO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJza3JvbGxyXCIsZnVuY3Rpb24oKXtyZXR1cm4gaX0pOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWk6ZS5za3JvbGxyPWl9KSh3aW5kb3csZG9jdW1lbnQpOyIsIihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAoIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcblx0XHRkZWZpbmUoW10sIGZhY3Rvcnkocm9vdCkpO1xuXHR9IGVsc2UgaWYgKCB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QpO1xuXHR9IGVsc2Uge1xuXHRcdHJvb3Quc21vb3RoU2Nyb2xsID0gZmFjdG9yeShyb290KTtcblx0fVxufSkodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB0aGlzLndpbmRvdyB8fCB0aGlzLmdsb2JhbCwgZnVuY3Rpb24gKHJvb3QpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gVmFyaWFibGVzXG5cdC8vXG5cblx0dmFyIHNtb290aFNjcm9sbCA9IHt9OyAvLyBPYmplY3QgZm9yIHB1YmxpYyBBUElzXG5cdHZhciBzdXBwb3J0cyA9ICdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCAmJiAnYWRkRXZlbnRMaXN0ZW5lcicgaW4gcm9vdDsgLy8gRmVhdHVyZSB0ZXN0XG5cdHZhciBzZXR0aW5ncywgZXZlbnRUaW1lb3V0LCBmaXhlZEhlYWRlciwgaGVhZGVySGVpZ2h0LCBhbmltYXRpb25JbnRlcnZhbDtcblxuXHQvLyBEZWZhdWx0IHNldHRpbmdzXG5cdHZhciBkZWZhdWx0cyA9IHtcblx0XHRzZWxlY3RvcjogJ1tkYXRhLXNjcm9sbF0nLFxuXHRcdHNlbGVjdG9ySGVhZGVyOiAnW2RhdGEtc2Nyb2xsLWhlYWRlcl0nLFxuXHRcdHNwZWVkOiA1MDAsXG5cdFx0ZWFzaW5nOiAnZWFzZUluT3V0Q3ViaWMnLFxuXHRcdG9mZnNldDogMCxcblx0XHR1cGRhdGVVUkw6IHRydWUsXG5cdFx0Y2FsbGJhY2s6IGZ1bmN0aW9uICgpIHt9XG5cdH07XG5cblxuXHQvL1xuXHQvLyBNZXRob2RzXG5cdC8vXG5cblx0LyoqXG5cdCAqIE1lcmdlIHR3byBvciBtb3JlIG9iamVjdHMuIFJldHVybnMgYSBuZXcgb2JqZWN0LlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59ICBkZWVwICAgICBJZiB0cnVlLCBkbyBhIGRlZXAgKG9yIHJlY3Vyc2l2ZSkgbWVyZ2UgW29wdGlvbmFsXVxuXHQgKiBAcGFyYW0ge09iamVjdH0gICBvYmplY3RzICBUaGUgb2JqZWN0cyB0byBtZXJnZSB0b2dldGhlclxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSAgICAgICAgICBNZXJnZWQgdmFsdWVzIG9mIGRlZmF1bHRzIGFuZCBvcHRpb25zXG5cdCAqL1xuXHR2YXIgZXh0ZW5kID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gVmFyaWFibGVzXG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIGRlZXAgPSBmYWxzZTtcblx0XHR2YXIgaSA9IDA7XG5cdFx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cblx0XHQvLyBDaGVjayBpZiBhIGRlZXAgbWVyZ2Vcblx0XHRpZiAoIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCggYXJndW1lbnRzWzBdICkgPT09ICdbb2JqZWN0IEJvb2xlYW5dJyApIHtcblx0XHRcdGRlZXAgPSBhcmd1bWVudHNbMF07XG5cdFx0XHRpKys7XG5cdFx0fVxuXG5cdFx0Ly8gTWVyZ2UgdGhlIG9iamVjdCBpbnRvIHRoZSBleHRlbmRlZCBvYmplY3Rcblx0XHR2YXIgbWVyZ2UgPSBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRmb3IgKCB2YXIgcHJvcCBpbiBvYmogKSB7XG5cdFx0XHRcdGlmICggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKCBvYmosIHByb3AgKSApIHtcblx0XHRcdFx0XHQvLyBJZiBkZWVwIG1lcmdlIGFuZCBwcm9wZXJ0eSBpcyBhbiBvYmplY3QsIG1lcmdlIHByb3BlcnRpZXNcblx0XHRcdFx0XHRpZiAoIGRlZXAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ialtwcm9wXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nICkge1xuXHRcdFx0XHRcdFx0ZXh0ZW5kZWRbcHJvcF0gPSBleHRlbmQoIHRydWUsIGV4dGVuZGVkW3Byb3BdLCBvYmpbcHJvcF0gKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZXh0ZW5kZWRbcHJvcF0gPSBvYmpbcHJvcF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIExvb3AgdGhyb3VnaCBlYWNoIG9iamVjdCBhbmQgY29uZHVjdCBhIG1lcmdlXG5cdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHR2YXIgb2JqID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0bWVyZ2Uob2JqKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZXh0ZW5kZWQ7XG5cblx0fTtcblxuXHQvKipcblx0ICogR2V0IHRoZSBoZWlnaHQgb2YgYW4gZWxlbWVudC5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtICB7Tm9kZX0gZWxlbSBUaGUgZWxlbWVudCB0byBnZXQgdGhlIGhlaWdodCBvZlxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ9ICAgIFRoZSBlbGVtZW50J3MgaGVpZ2h0IGluIHBpeGVsc1xuXHQgKi9cblx0dmFyIGdldEhlaWdodCA9IGZ1bmN0aW9uICggZWxlbSApIHtcblx0XHRyZXR1cm4gTWF0aC5tYXgoIGVsZW0uc2Nyb2xsSGVpZ2h0LCBlbGVtLm9mZnNldEhlaWdodCwgZWxlbS5jbGllbnRIZWlnaHQgKTtcblx0fTtcblxuXHQvKipcblx0ICogR2V0IHRoZSBjbG9zZXN0IG1hdGNoaW5nIGVsZW1lbnQgdXAgdGhlIERPTSB0cmVlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0gIHtFbGVtZW50fSBlbGVtICAgICBTdGFydGluZyBlbGVtZW50XG5cdCAqIEBwYXJhbSAge1N0cmluZ30gIHNlbGVjdG9yIFNlbGVjdG9yIHRvIG1hdGNoIGFnYWluc3QgKGNsYXNzLCBJRCwgZGF0YSBhdHRyaWJ1dGUsIG9yIHRhZylcblx0ICogQHJldHVybiB7Qm9vbGVhbnxFbGVtZW50fSAgUmV0dXJucyBudWxsIGlmIG5vdCBtYXRjaCBmb3VuZFxuXHQgKi9cblx0dmFyIGdldENsb3Nlc3QgPSBmdW5jdGlvbiAoIGVsZW0sIHNlbGVjdG9yICkge1xuXG5cdFx0Ly8gVmFyaWFibGVzXG5cdFx0dmFyIGZpcnN0Q2hhciA9IHNlbGVjdG9yLmNoYXJBdCgwKTtcblx0XHR2YXIgc3VwcG9ydHMgPSAnY2xhc3NMaXN0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cdFx0dmFyIGF0dHJpYnV0ZSwgdmFsdWU7XG5cblx0XHQvLyBJZiBzZWxlY3RvciBpcyBhIGRhdGEgYXR0cmlidXRlLCBzcGxpdCBhdHRyaWJ1dGUgZnJvbSB2YWx1ZVxuXHRcdGlmICggZmlyc3RDaGFyID09PSAnWycgKSB7XG5cdFx0XHRzZWxlY3RvciA9IHNlbGVjdG9yLnN1YnN0cigxLCBzZWxlY3Rvci5sZW5ndGggLSAyKTtcblx0XHRcdGF0dHJpYnV0ZSA9IHNlbGVjdG9yLnNwbGl0KCAnPScgKTtcblxuXHRcdFx0aWYgKCBhdHRyaWJ1dGUubGVuZ3RoID4gMSApIHtcblx0XHRcdFx0dmFsdWUgPSB0cnVlO1xuXHRcdFx0XHRhdHRyaWJ1dGVbMV0gPSBhdHRyaWJ1dGVbMV0ucmVwbGFjZSggL1wiL2csICcnICkucmVwbGFjZSggLycvZywgJycgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBHZXQgY2xvc2VzdCBtYXRjaFxuXHRcdGZvciAoIDsgZWxlbSAmJiBlbGVtICE9PSBkb2N1bWVudDsgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZSApIHtcblxuXHRcdFx0Ly8gSWYgc2VsZWN0b3IgaXMgYSBjbGFzc1xuXHRcdFx0aWYgKCBmaXJzdENoYXIgPT09ICcuJyApIHtcblx0XHRcdFx0aWYgKCBzdXBwb3J0cyApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCBzZWxlY3Rvci5zdWJzdHIoMSkgKSApIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoIG5ldyBSZWdFeHAoJyhefFxcXFxzKScgKyBzZWxlY3Rvci5zdWJzdHIoMSkgKyAnKFxcXFxzfCQpJykudGVzdCggZWxlbS5jbGFzc05hbWUgKSApIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBzZWxlY3RvciBpcyBhbiBJRFxuXHRcdFx0aWYgKCBmaXJzdENoYXIgPT09ICcjJyApIHtcblx0XHRcdFx0aWYgKCBlbGVtLmlkID09PSBzZWxlY3Rvci5zdWJzdHIoMSkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgc2VsZWN0b3IgaXMgYSBkYXRhIGF0dHJpYnV0ZVxuXHRcdFx0aWYgKCBmaXJzdENoYXIgPT09ICdbJyApIHtcblx0XHRcdFx0aWYgKCBlbGVtLmhhc0F0dHJpYnV0ZSggYXR0cmlidXRlWzBdICkgKSB7XG5cdFx0XHRcdFx0aWYgKCB2YWx1ZSApIHtcblx0XHRcdFx0XHRcdGlmICggZWxlbS5nZXRBdHRyaWJ1dGUoIGF0dHJpYnV0ZVswXSApID09PSBhdHRyaWJ1dGVbMV0gKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBlbGVtO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgc2VsZWN0b3IgaXMgYSB0YWdcblx0XHRcdGlmICggZWxlbS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHNlbGVjdG9yICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbTtcblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXG5cdH07XG5cblx0LyoqXG5cdCAqIEVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgZm9yIHVzZSB3aXRoIHF1ZXJ5U2VsZWN0b3Jcblx0ICogQHB1YmxpY1xuXHQgKiBAcGFyYW0ge1N0cmluZ30gaWQgVGhlIGFuY2hvciBJRCB0byBlc2NhcGVcblx0ICogQGF1dGhvciBNYXRoaWFzIEJ5bmVuc1xuXHQgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9DU1MuZXNjYXBlXG5cdCAqL1xuXHRzbW9vdGhTY3JvbGwuZXNjYXBlQ2hhcmFjdGVycyA9IGZ1bmN0aW9uICggaWQgKSB7XG5cblx0XHQvLyBSZW1vdmUgbGVhZGluZyBoYXNoXG5cdFx0aWYgKCBpZC5jaGFyQXQoMCkgPT09ICcjJyApIHtcblx0XHRcdGlkID0gaWQuc3Vic3RyKDEpO1xuXHRcdH1cblxuXHRcdHZhciBzdHJpbmcgPSBTdHJpbmcoaWQpO1xuXHRcdHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuXHRcdHZhciBpbmRleCA9IC0xO1xuXHRcdHZhciBjb2RlVW5pdDtcblx0XHR2YXIgcmVzdWx0ID0gJyc7XG5cdFx0dmFyIGZpcnN0Q29kZVVuaXQgPSBzdHJpbmcuY2hhckNvZGVBdCgwKTtcblx0XHR3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuXHRcdFx0Y29kZVVuaXQgPSBzdHJpbmcuY2hhckNvZGVBdChpbmRleCk7XG5cdFx0XHQvLyBOb3RlOiB0aGVyZeKAmXMgbm8gbmVlZCB0byBzcGVjaWFsLWNhc2UgYXN0cmFsIHN5bWJvbHMsIHN1cnJvZ2F0ZVxuXHRcdFx0Ly8gcGFpcnMsIG9yIGxvbmUgc3Vycm9nYXRlcy5cblxuXHRcdFx0Ly8gSWYgdGhlIGNoYXJhY3RlciBpcyBOVUxMIChVKzAwMDApLCB0aGVuIHRocm93IGFuXG5cdFx0XHQvLyBgSW52YWxpZENoYXJhY3RlckVycm9yYCBleGNlcHRpb24gYW5kIHRlcm1pbmF0ZSB0aGVzZSBzdGVwcy5cblx0XHRcdGlmIChjb2RlVW5pdCA9PT0gMHgwMDAwKSB7XG5cdFx0XHRcdHRocm93IG5ldyBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IoXG5cdFx0XHRcdFx0J0ludmFsaWQgY2hhcmFjdGVyOiB0aGUgaW5wdXQgY29udGFpbnMgVSswMDAwLidcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKFxuXHRcdFx0XHQvLyBJZiB0aGUgY2hhcmFjdGVyIGlzIGluIHRoZSByYW5nZSBbXFwxLVxcMUZdIChVKzAwMDEgdG8gVSswMDFGKSBvciBpc1xuXHRcdFx0XHQvLyBVKzAwN0YsIFvigKZdXG5cdFx0XHRcdChjb2RlVW5pdCA+PSAweDAwMDEgJiYgY29kZVVuaXQgPD0gMHgwMDFGKSB8fCBjb2RlVW5pdCA9PSAweDAwN0YgfHxcblx0XHRcdFx0Ly8gSWYgdGhlIGNoYXJhY3RlciBpcyB0aGUgZmlyc3QgY2hhcmFjdGVyIGFuZCBpcyBpbiB0aGUgcmFuZ2UgWzAtOV1cblx0XHRcdFx0Ly8gKFUrMDAzMCB0byBVKzAwMzkpLCBb4oCmXVxuXHRcdFx0XHQoaW5kZXggPT09IDAgJiYgY29kZVVuaXQgPj0gMHgwMDMwICYmIGNvZGVVbml0IDw9IDB4MDAzOSkgfHxcblx0XHRcdFx0Ly8gSWYgdGhlIGNoYXJhY3RlciBpcyB0aGUgc2Vjb25kIGNoYXJhY3RlciBhbmQgaXMgaW4gdGhlIHJhbmdlIFswLTldXG5cdFx0XHRcdC8vIChVKzAwMzAgdG8gVSswMDM5KSBhbmQgdGhlIGZpcnN0IGNoYXJhY3RlciBpcyBhIGAtYCAoVSswMDJEKSwgW+KApl1cblx0XHRcdFx0KFxuXHRcdFx0XHRcdGluZGV4ID09PSAxICYmXG5cdFx0XHRcdFx0Y29kZVVuaXQgPj0gMHgwMDMwICYmIGNvZGVVbml0IDw9IDB4MDAzOSAmJlxuXHRcdFx0XHRcdGZpcnN0Q29kZVVuaXQgPT09IDB4MDAyRFxuXHRcdFx0XHQpXG5cdFx0XHQpIHtcblx0XHRcdFx0Ly8gaHR0cDovL2Rldi53My5vcmcvY3Nzd2cvY3Nzb20vI2VzY2FwZS1hLWNoYXJhY3Rlci1hcy1jb2RlLXBvaW50XG5cdFx0XHRcdHJlc3VsdCArPSAnXFxcXCcgKyBjb2RlVW5pdC50b1N0cmluZygxNikgKyAnICc7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiB0aGUgY2hhcmFjdGVyIGlzIG5vdCBoYW5kbGVkIGJ5IG9uZSBvZiB0aGUgYWJvdmUgcnVsZXMgYW5kIGlzXG5cdFx0XHQvLyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gVSswMDgwLCBpcyBgLWAgKFUrMDAyRCkgb3IgYF9gIChVKzAwNUYpLCBvclxuXHRcdFx0Ly8gaXMgaW4gb25lIG9mIHRoZSByYW5nZXMgWzAtOV0gKFUrMDAzMCB0byBVKzAwMzkpLCBbQS1aXSAoVSswMDQxIHRvXG5cdFx0XHQvLyBVKzAwNUEpLCBvciBbYS16XSAoVSswMDYxIHRvIFUrMDA3QSksIFvigKZdXG5cdFx0XHRpZiAoXG5cdFx0XHRcdGNvZGVVbml0ID49IDB4MDA4MCB8fFxuXHRcdFx0XHRjb2RlVW5pdCA9PT0gMHgwMDJEIHx8XG5cdFx0XHRcdGNvZGVVbml0ID09PSAweDAwNUYgfHxcblx0XHRcdFx0Y29kZVVuaXQgPj0gMHgwMDMwICYmIGNvZGVVbml0IDw9IDB4MDAzOSB8fFxuXHRcdFx0XHRjb2RlVW5pdCA+PSAweDAwNDEgJiYgY29kZVVuaXQgPD0gMHgwMDVBIHx8XG5cdFx0XHRcdGNvZGVVbml0ID49IDB4MDA2MSAmJiBjb2RlVW5pdCA8PSAweDAwN0Fcblx0XHRcdCkge1xuXHRcdFx0XHQvLyB0aGUgY2hhcmFjdGVyIGl0c2VsZlxuXHRcdFx0XHRyZXN1bHQgKz0gc3RyaW5nLmNoYXJBdChpbmRleCk7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPdGhlcndpc2UsIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cblx0XHRcdC8vIGh0dHA6Ly9kZXYudzMub3JnL2Nzc3dnL2Nzc29tLyNlc2NhcGUtYS1jaGFyYWN0ZXJcblx0XHRcdHJlc3VsdCArPSAnXFxcXCcgKyBzdHJpbmcuY2hhckF0KGluZGV4KTtcblxuXHRcdH1cblxuXHRcdHJldHVybiAnIycgKyByZXN1bHQ7XG5cblx0fTtcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlIHRoZSBlYXNpbmcgcGF0dGVyblxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAbGluayBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9ncmUvMTY1MDI5NFxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBFYXNpbmcgcGF0dGVyblxuXHQgKiBAcGFyYW0ge051bWJlcn0gdGltZSBUaW1lIGFuaW1hdGlvbiBzaG91bGQgdGFrZSB0byBjb21wbGV0ZVxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfVxuXHQgKi9cblx0dmFyIGVhc2luZ1BhdHRlcm4gPSBmdW5jdGlvbiAoIHR5cGUsIHRpbWUgKSB7XG5cdFx0dmFyIHBhdHRlcm47XG5cdFx0aWYgKCB0eXBlID09PSAnZWFzZUluUXVhZCcgKSBwYXR0ZXJuID0gdGltZSAqIHRpbWU7IC8vIGFjY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHlcblx0XHRpZiAoIHR5cGUgPT09ICdlYXNlT3V0UXVhZCcgKSBwYXR0ZXJuID0gdGltZSAqICgyIC0gdGltZSk7IC8vIGRlY2VsZXJhdGluZyB0byB6ZXJvIHZlbG9jaXR5XG5cdFx0aWYgKCB0eXBlID09PSAnZWFzZUluT3V0UXVhZCcgKSBwYXR0ZXJuID0gdGltZSA8IDAuNSA/IDIgKiB0aW1lICogdGltZSA6IC0xICsgKDQgLSAyICogdGltZSkgKiB0aW1lOyAvLyBhY2NlbGVyYXRpb24gdW50aWwgaGFsZndheSwgdGhlbiBkZWNlbGVyYXRpb25cblx0XHRpZiAoIHR5cGUgPT09ICdlYXNlSW5DdWJpYycgKSBwYXR0ZXJuID0gdGltZSAqIHRpbWUgKiB0aW1lOyAvLyBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5XG5cdFx0aWYgKCB0eXBlID09PSAnZWFzZU91dEN1YmljJyApIHBhdHRlcm4gPSAoLS10aW1lKSAqIHRpbWUgKiB0aW1lICsgMTsgLy8gZGVjZWxlcmF0aW5nIHRvIHplcm8gdmVsb2NpdHlcblx0XHRpZiAoIHR5cGUgPT09ICdlYXNlSW5PdXRDdWJpYycgKSBwYXR0ZXJuID0gdGltZSA8IDAuNSA/IDQgKiB0aW1lICogdGltZSAqIHRpbWUgOiAodGltZSAtIDEpICogKDIgKiB0aW1lIC0gMikgKiAoMiAqIHRpbWUgLSAyKSArIDE7IC8vIGFjY2VsZXJhdGlvbiB1bnRpbCBoYWxmd2F5LCB0aGVuIGRlY2VsZXJhdGlvblxuXHRcdGlmICggdHlwZSA9PT0gJ2Vhc2VJblF1YXJ0JyApIHBhdHRlcm4gPSB0aW1lICogdGltZSAqIHRpbWUgKiB0aW1lOyAvLyBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5XG5cdFx0aWYgKCB0eXBlID09PSAnZWFzZU91dFF1YXJ0JyApIHBhdHRlcm4gPSAxIC0gKC0tdGltZSkgKiB0aW1lICogdGltZSAqIHRpbWU7IC8vIGRlY2VsZXJhdGluZyB0byB6ZXJvIHZlbG9jaXR5XG5cdFx0aWYgKCB0eXBlID09PSAnZWFzZUluT3V0UXVhcnQnICkgcGF0dGVybiA9IHRpbWUgPCAwLjUgPyA4ICogdGltZSAqIHRpbWUgKiB0aW1lICogdGltZSA6IDEgLSA4ICogKC0tdGltZSkgKiB0aW1lICogdGltZSAqIHRpbWU7IC8vIGFjY2VsZXJhdGlvbiB1bnRpbCBoYWxmd2F5LCB0aGVuIGRlY2VsZXJhdGlvblxuXHRcdGlmICggdHlwZSA9PT0gJ2Vhc2VJblF1aW50JyApIHBhdHRlcm4gPSB0aW1lICogdGltZSAqIHRpbWUgKiB0aW1lICogdGltZTsgLy8gYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eVxuXHRcdGlmICggdHlwZSA9PT0gJ2Vhc2VPdXRRdWludCcgKSBwYXR0ZXJuID0gMSArICgtLXRpbWUpICogdGltZSAqIHRpbWUgKiB0aW1lICogdGltZTsgLy8gZGVjZWxlcmF0aW5nIHRvIHplcm8gdmVsb2NpdHlcblx0XHRpZiAoIHR5cGUgPT09ICdlYXNlSW5PdXRRdWludCcgKSBwYXR0ZXJuID0gdGltZSA8IDAuNSA/IDE2ICogdGltZSAqIHRpbWUgKiB0aW1lICogdGltZSAqIHRpbWUgOiAxICsgMTYgKiAoLS10aW1lKSAqIHRpbWUgKiB0aW1lICogdGltZSAqIHRpbWU7IC8vIGFjY2VsZXJhdGlvbiB1bnRpbCBoYWxmd2F5LCB0aGVuIGRlY2VsZXJhdGlvblxuXHRcdHJldHVybiBwYXR0ZXJuIHx8IHRpbWU7IC8vIG5vIGVhc2luZywgbm8gYWNjZWxlcmF0aW9uXG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZSBob3cgZmFyIHRvIHNjcm9sbFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGFuY2hvciBUaGUgYW5jaG9yIGVsZW1lbnQgdG8gc2Nyb2xsIHRvXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBoZWFkZXJIZWlnaHQgSGVpZ2h0IG9mIGEgZml4ZWQgaGVhZGVyLCBpZiBhbnlcblx0ICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgcGl4ZWxzIGJ5IHdoaWNoIHRvIG9mZnNldCBzY3JvbGxcblx0ICogQHJldHVybnMge051bWJlcn1cblx0ICovXG5cdHZhciBnZXRFbmRMb2NhdGlvbiA9IGZ1bmN0aW9uICggYW5jaG9yLCBoZWFkZXJIZWlnaHQsIG9mZnNldCApIHtcblx0XHR2YXIgbG9jYXRpb24gPSAwO1xuXHRcdGlmIChhbmNob3Iub2Zmc2V0UGFyZW50KSB7XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGxvY2F0aW9uICs9IGFuY2hvci5vZmZzZXRUb3A7XG5cdFx0XHRcdGFuY2hvciA9IGFuY2hvci5vZmZzZXRQYXJlbnQ7XG5cdFx0XHR9IHdoaWxlIChhbmNob3IpO1xuXHRcdH1cblx0XHRsb2NhdGlvbiA9IGxvY2F0aW9uIC0gaGVhZGVySGVpZ2h0IC0gb2Zmc2V0O1xuXHRcdHJldHVybiBsb2NhdGlvbiA+PSAwID8gbG9jYXRpb24gOiAwO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmUgdGhlIGRvY3VtZW50J3MgaGVpZ2h0XG5cdCAqIEBwcml2YXRlXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9XG5cdCAqL1xuXHR2YXIgZ2V0RG9jdW1lbnRIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIE1hdGgubWF4KFxuXHRcdFx0cm9vdC5kb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCwgcm9vdC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxuXHRcdFx0cm9vdC5kb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCwgcm9vdC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuXHRcdFx0cm9vdC5kb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCwgcm9vdC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG5cdFx0KTtcblx0fTtcblxuXHQvKipcblx0ICogQ29udmVydCBkYXRhLW9wdGlvbnMgYXR0cmlidXRlIGludG8gYW4gb2JqZWN0IG9mIGtleS92YWx1ZSBwYWlyc1xuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucyBMaW5rLXNwZWNpZmljIG9wdGlvbnMgYXMgYSBkYXRhIGF0dHJpYnV0ZSBzdHJpbmdcblx0ICogQHJldHVybnMge09iamVjdH1cblx0ICovXG5cdHZhciBnZXREYXRhT3B0aW9ucyA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcblx0XHRyZXR1cm4gIW9wdGlvbnMgfHwgISh0eXBlb2YgSlNPTiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIEpTT04ucGFyc2UgPT09ICdmdW5jdGlvbicpID8ge30gOiBKU09OLnBhcnNlKCBvcHRpb25zICk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0aGUgVVJMXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gYW5jaG9yIFRoZSBlbGVtZW50IHRvIHNjcm9sbCB0b1xuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IHVybCBXaGV0aGVyIG9yIG5vdCB0byB1cGRhdGUgdGhlIFVSTCBoaXN0b3J5XG5cdCAqL1xuXHR2YXIgdXBkYXRlVXJsID0gZnVuY3Rpb24gKCBhbmNob3IsIHVybCApIHtcblx0XHRpZiAoIHJvb3QuaGlzdG9yeS5wdXNoU3RhdGUgJiYgKHVybCB8fCB1cmwgPT09ICd0cnVlJykgJiYgcm9vdC5sb2NhdGlvbi5wcm90b2NvbCAhPT0gJ2ZpbGU6JyApIHtcblx0XHRcdHJvb3QuaGlzdG9yeS5wdXNoU3RhdGUoIG51bGwsIG51bGwsIFtyb290LmxvY2F0aW9uLnByb3RvY29sLCAnLy8nLCByb290LmxvY2F0aW9uLmhvc3QsIHJvb3QubG9jYXRpb24ucGF0aG5hbWUsIHJvb3QubG9jYXRpb24uc2VhcmNoLCBhbmNob3JdLmpvaW4oJycpICk7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBnZXRIZWFkZXJIZWlnaHQgPSBmdW5jdGlvbiAoIGhlYWRlciApIHtcblx0XHRyZXR1cm4gaGVhZGVyID09PSBudWxsID8gMCA6ICggZ2V0SGVpZ2h0KCBoZWFkZXIgKSArIGhlYWRlci5vZmZzZXRUb3AgKTtcblx0fTtcblxuXHQvKipcblx0ICogU3RhcnQvc3RvcCB0aGUgc2Nyb2xsaW5nIGFuaW1hdGlvblxuXHQgKiBAcHVibGljXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gYW5jaG9yIFRoZSBlbGVtZW50IHRvIHNjcm9sbCB0b1xuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IHRvZ2dsZSBUaGUgZWxlbWVudCB0aGF0IHRvZ2dsZWQgdGhlIHNjcm9sbCBldmVudFxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKi9cblx0c21vb3RoU2Nyb2xsLmFuaW1hdGVTY3JvbGwgPSBmdW5jdGlvbiAoIGFuY2hvciwgdG9nZ2xlLCBvcHRpb25zICkge1xuXG5cdFx0Ly8gT3B0aW9ucyBhbmQgb3ZlcnJpZGVzXG5cdFx0dmFyIG92ZXJyaWRlcyA9IGdldERhdGFPcHRpb25zKCB0b2dnbGUgPyB0b2dnbGUuZ2V0QXR0cmlidXRlKCdkYXRhLW9wdGlvbnMnKSA6IG51bGwgKTtcblx0XHR2YXIgYW5pbWF0ZVNldHRpbmdzID0gZXh0ZW5kKCBzZXR0aW5ncyB8fCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSwgb3ZlcnJpZGVzICk7IC8vIE1lcmdlIHVzZXIgb3B0aW9ucyB3aXRoIGRlZmF1bHRzXG5cblx0XHQvLyBTZWxlY3RvcnMgYW5kIHZhcmlhYmxlc1xuXHRcdHZhciBpc051bSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCggYW5jaG9yICkgPT09ICdbb2JqZWN0IE51bWJlcl0nID8gdHJ1ZSA6IGZhbHNlO1xuXHRcdHZhciBhbmNob3JFbGVtID0gaXNOdW0gPyBudWxsIDogKCBhbmNob3IgPT09ICcjJyA/IHJvb3QuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IDogcm9vdC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFuY2hvcikgKTtcblx0XHRpZiAoICFpc051bSAmJiAhYW5jaG9yRWxlbSApIHJldHVybjtcblx0XHR2YXIgc3RhcnRMb2NhdGlvbiA9IHJvb3QucGFnZVlPZmZzZXQ7IC8vIEN1cnJlbnQgbG9jYXRpb24gb24gdGhlIHBhZ2Vcblx0XHRpZiAoICFmaXhlZEhlYWRlciApIHsgZml4ZWRIZWFkZXIgPSByb290LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIGFuaW1hdGVTZXR0aW5ncy5zZWxlY3RvckhlYWRlciApOyB9ICAvLyBHZXQgdGhlIGZpeGVkIGhlYWRlciBpZiBub3QgYWxyZWFkeSBzZXRcblx0XHRpZiAoICFoZWFkZXJIZWlnaHQgKSB7IGhlYWRlckhlaWdodCA9IGdldEhlYWRlckhlaWdodCggZml4ZWRIZWFkZXIgKTsgfSAvLyBHZXQgdGhlIGhlaWdodCBvZiBhIGZpeGVkIGhlYWRlciBpZiBvbmUgZXhpc3RzIGFuZCBub3QgYWxyZWFkeSBzZXRcblx0XHR2YXIgZW5kTG9jYXRpb24gPSBpc051bSA/IGFuY2hvciA6IGdldEVuZExvY2F0aW9uKCBhbmNob3JFbGVtLCBoZWFkZXJIZWlnaHQsIHBhcnNlSW50KGFuaW1hdGVTZXR0aW5ncy5vZmZzZXQsIDEwKSApOyAvLyBMb2NhdGlvbiB0byBzY3JvbGwgdG9cblx0XHR2YXIgZGlzdGFuY2UgPSBlbmRMb2NhdGlvbiAtIHN0YXJ0TG9jYXRpb247IC8vIGRpc3RhbmNlIHRvIHRyYXZlbFxuXHRcdHZhciBkb2N1bWVudEhlaWdodCA9IGdldERvY3VtZW50SGVpZ2h0KCk7XG5cdFx0dmFyIHRpbWVMYXBzZWQgPSAwO1xuXHRcdHZhciBwZXJjZW50YWdlLCBwb3NpdGlvbjtcblxuXHRcdC8vIFVwZGF0ZSBVUkxcblx0XHRpZiAoICFpc051bSApIHtcblx0XHRcdHVwZGF0ZVVybChhbmNob3IsIGFuaW1hdGVTZXR0aW5ncy51cGRhdGVVUkwpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFN0b3AgdGhlIHNjcm9sbCBhbmltYXRpb24gd2hlbiBpdCByZWFjaGVzIGl0cyB0YXJnZXQgKG9yIHRoZSBib3R0b20vdG9wIG9mIHBhZ2UpXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAcGFyYW0ge051bWJlcn0gcG9zaXRpb24gQ3VycmVudCBwb3NpdGlvbiBvbiB0aGUgcGFnZVxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBlbmRMb2NhdGlvbiBTY3JvbGwgdG8gbG9jYXRpb25cblx0XHQgKiBAcGFyYW0ge051bWJlcn0gYW5pbWF0aW9uSW50ZXJ2YWwgSG93IG11Y2ggdG8gc2Nyb2xsIG9uIHRoaXMgbG9vcFxuXHRcdCAqL1xuXHRcdHZhciBzdG9wQW5pbWF0ZVNjcm9sbCA9IGZ1bmN0aW9uIChwb3NpdGlvbiwgZW5kTG9jYXRpb24sIGFuaW1hdGlvbkludGVydmFsKSB7XG5cdFx0XHR2YXIgY3VycmVudExvY2F0aW9uID0gcm9vdC5wYWdlWU9mZnNldDtcblx0XHRcdGlmICggcG9zaXRpb24gPT0gZW5kTG9jYXRpb24gfHwgY3VycmVudExvY2F0aW9uID09IGVuZExvY2F0aW9uIHx8ICggKHJvb3QuaW5uZXJIZWlnaHQgKyBjdXJyZW50TG9jYXRpb24pID49IGRvY3VtZW50SGVpZ2h0ICkgKSB7XG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwoYW5pbWF0aW9uSW50ZXJ2YWwpO1xuXHRcdFx0XHRpZiAoICFpc051bSApIHtcblx0XHRcdFx0XHRhbmNob3JFbGVtLmZvY3VzKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YW5pbWF0ZVNldHRpbmdzLmNhbGxiYWNrKCBhbmNob3IsIHRvZ2dsZSApOyAvLyBSdW4gY2FsbGJhY2tzIGFmdGVyIGFuaW1hdGlvbiBjb21wbGV0ZVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBMb29wIHNjcm9sbGluZyBhbmltYXRpb25cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBsb29wQW5pbWF0ZVNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRpbWVMYXBzZWQgKz0gMTY7XG5cdFx0XHRwZXJjZW50YWdlID0gKCB0aW1lTGFwc2VkIC8gcGFyc2VJbnQoYW5pbWF0ZVNldHRpbmdzLnNwZWVkLCAxMCkgKTtcblx0XHRcdHBlcmNlbnRhZ2UgPSAoIHBlcmNlbnRhZ2UgPiAxICkgPyAxIDogcGVyY2VudGFnZTtcblx0XHRcdHBvc2l0aW9uID0gc3RhcnRMb2NhdGlvbiArICggZGlzdGFuY2UgKiBlYXNpbmdQYXR0ZXJuKGFuaW1hdGVTZXR0aW5ncy5lYXNpbmcsIHBlcmNlbnRhZ2UpICk7XG5cdFx0XHRyb290LnNjcm9sbFRvKCAwLCBNYXRoLmZsb29yKHBvc2l0aW9uKSApO1xuXHRcdFx0c3RvcEFuaW1hdGVTY3JvbGwocG9zaXRpb24sIGVuZExvY2F0aW9uLCBhbmltYXRpb25JbnRlcnZhbCk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFNldCBpbnRlcnZhbCB0aW1lclxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIHN0YXJ0QW5pbWF0ZVNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwoYW5pbWF0aW9uSW50ZXJ2YWwpO1xuXHRcdFx0YW5pbWF0aW9uSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChsb29wQW5pbWF0ZVNjcm9sbCwgMTYpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBSZXNldCBwb3NpdGlvbiB0byBmaXggd2VpcmQgaU9TIGJ1Z1xuXHRcdCAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9jZmVyZGluYW5kaS9zbW9vdGgtc2Nyb2xsL2lzc3Vlcy80NVxuXHRcdCAqL1xuXHRcdGlmICggcm9vdC5wYWdlWU9mZnNldCA9PT0gMCApIHtcblx0XHRcdHJvb3Quc2Nyb2xsVG8oIDAsIDAgKTtcblx0XHR9XG5cblx0XHQvLyBTdGFydCBzY3JvbGxpbmcgYW5pbWF0aW9uXG5cdFx0c3RhcnRBbmltYXRlU2Nyb2xsKCk7XG5cblx0fTtcblxuXHQvKipcblx0ICogSWYgc21vb3RoIHNjcm9sbCBlbGVtZW50IGNsaWNrZWQsIGFuaW1hdGUgc2Nyb2xsXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgZXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHQvLyBEb24ndCBydW4gaWYgcmlnaHQtY2xpY2sgb3IgY29tbWFuZC9jb250cm9sICsgY2xpY2tcblx0XHRpZiAoIGV2ZW50LmJ1dHRvbiAhPT0gMCB8fCBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXkgKSByZXR1cm47XG5cblx0XHQvLyBJZiBhIHNtb290aCBzY3JvbGwgbGluaywgYW5pbWF0ZSBpdFxuXHRcdHZhciB0b2dnbGUgPSBnZXRDbG9zZXN0KCBldmVudC50YXJnZXQsIHNldHRpbmdzLnNlbGVjdG9yICk7XG5cdFx0aWYgKCB0b2dnbGUgJiYgdG9nZ2xlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnICkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCBkZWZhdWx0IGNsaWNrIGV2ZW50XG5cdFx0XHR2YXIgaGFzaCA9IHNtb290aFNjcm9sbC5lc2NhcGVDaGFyYWN0ZXJzKCB0b2dnbGUuaGFzaCApOyAvLyBFc2NhcGUgaGFzaCBjaGFyYWN0ZXJzXG5cdFx0XHRzbW9vdGhTY3JvbGwuYW5pbWF0ZVNjcm9sbCggaGFzaCwgdG9nZ2xlLCBzZXR0aW5ncyk7IC8vIEFuaW1hdGUgc2Nyb2xsXG5cdFx0fVxuXG5cdH07XG5cblx0LyoqXG5cdCAqIE9uIHdpbmRvdyBzY3JvbGwgYW5kIHJlc2l6ZSwgb25seSBydW4gZXZlbnRzIGF0IGEgcmF0ZSBvZiAxNWZwcyBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBldmVudFRpbWVvdXQgVGltZW91dCBmdW5jdGlvblxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IHNldHRpbmdzXG5cdCAqL1xuXHR2YXIgZXZlbnRUaHJvdHRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRpZiAoICFldmVudFRpbWVvdXQgKSB7XG5cdFx0XHRldmVudFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRldmVudFRpbWVvdXQgPSBudWxsOyAvLyBSZXNldCB0aW1lb3V0XG5cdFx0XHRcdGhlYWRlckhlaWdodCA9IGdldEhlYWRlckhlaWdodCggZml4ZWRIZWFkZXIgKTsgLy8gR2V0IHRoZSBoZWlnaHQgb2YgYSBmaXhlZCBoZWFkZXIgaWYgb25lIGV4aXN0c1xuXHRcdFx0fSwgNjYpO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogRGVzdHJveSB0aGUgY3VycmVudCBpbml0aWFsaXphdGlvbi5cblx0ICogQHB1YmxpY1xuXHQgKi9cblx0c21vb3RoU2Nyb2xsLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBJZiBwbHVnaW4gaXNuJ3QgYWxyZWFkeSBpbml0aWFsaXplZCwgc3RvcFxuXHRcdGlmICggIXNldHRpbmdzICkgcmV0dXJuO1xuXG5cdFx0Ly8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVyc1xuXHRcdHJvb3QuZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgZXZlbnRIYW5kbGVyLCBmYWxzZSApO1xuXHRcdHJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIGV2ZW50VGhyb3R0bGVyLCBmYWxzZSApO1xuXG5cdFx0Ly8gUmVzZXQgdmFyYWlibGVzXG5cdFx0c2V0dGluZ3MgPSBudWxsO1xuXHRcdGV2ZW50VGltZW91dCA9IG51bGw7XG5cdFx0Zml4ZWRIZWFkZXIgPSBudWxsO1xuXHRcdGhlYWRlckhlaWdodCA9IG51bGw7XG5cdFx0YW5pbWF0aW9uSW50ZXJ2YWwgPSBudWxsO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIFNtb290aCBTY3JvbGxcblx0ICogQHB1YmxpY1xuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBVc2VyIHNldHRpbmdzXG5cdCAqL1xuXHRzbW9vdGhTY3JvbGwuaW5pdCA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcblxuXHRcdC8vIGZlYXR1cmUgdGVzdFxuXHRcdGlmICggIXN1cHBvcnRzICkgcmV0dXJuO1xuXG5cdFx0Ly8gRGVzdHJveSBhbnkgZXhpc3RpbmcgaW5pdGlhbGl6YXRpb25zXG5cdFx0c21vb3RoU2Nyb2xsLmRlc3Ryb3koKTtcblxuXHRcdC8vIFNlbGVjdG9ycyBhbmQgdmFyaWFibGVzXG5cdFx0c2V0dGluZ3MgPSBleHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9ICk7IC8vIE1lcmdlIHVzZXIgb3B0aW9ucyB3aXRoIGRlZmF1bHRzXG5cdFx0Zml4ZWRIZWFkZXIgPSByb290LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIHNldHRpbmdzLnNlbGVjdG9ySGVhZGVyICk7IC8vIEdldCB0aGUgZml4ZWQgaGVhZGVyXG5cdFx0aGVhZGVySGVpZ2h0ID0gZ2V0SGVhZGVySGVpZ2h0KCBmaXhlZEhlYWRlciApO1xuXG5cdFx0Ly8gV2hlbiBhIHRvZ2dsZSBpcyBjbGlja2VkLCBydW4gdGhlIGNsaWNrIGhhbmRsZXJcblx0XHRyb290LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRIYW5kbGVyLCBmYWxzZSApO1xuXHRcdGlmICggZml4ZWRIZWFkZXIgKSB7IHJvb3QuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIGV2ZW50VGhyb3R0bGVyLCBmYWxzZSApOyB9XG5cblx0fTtcblxuXG5cdC8vXG5cdC8vIFB1YmxpYyBBUElzXG5cdC8vXG5cblx0cmV0dXJuIHNtb290aFNjcm9sbDtcblxufSk7IiwiaW1wb3J0ICQgZnJvbSAnY2FzaC1kb20nXG5cbi8vIGltcG9ydCAnZ3NhcC9zcmMvdW5jb21wcmVzc2VkL3BsdWdpbnMvQ1NTUGx1Z2luLmpzJ1xuLy8gaW1wb3J0ICdnc2FwL3NyYy91bmNvbXByZXNzZWQvVGltZWxpbmVMaXRlLmpzJ1xuLy8gaW1wb3J0ICdnc2FwL3NyYy91bmNvbXByZXNzZWQvZWFzaW5nL0Vhc2VQYWNrLmpzJ1xuXG5pbXBvcnQgc21vb3RoU2Nyb2xsIGZyb20gJ3Ntb290aC1zY3JvbGwvc3JjL2pzL3Ntb290aC1zY3JvbGwuanMnXG5pbXBvcnQgc2tyb2xsciBmcm9tICdza3JvbGxyJ1xuXG5cbi8vIFNtb290aFNjcm9sbFxuJCgnYScpLmVhY2goYSA9PiB7XG4gIGNvbnN0IGhyZWYgPSBhLmhyZWZcbiAgbGV0IGhhc2ggPSAnJ1xuICBjb25zdCBoYXNoSW5kZXggPSBhLmhyZWYuaW5kZXhPZignIycpXG4gIGlmIChoYXNoSW5kZXggPiAtMSkge1xuICAgIGhhc2ggPSBocmVmLnN1YnN0cmluZygwLCBoYXNoSW5kZXgpLnJlcGxhY2UobG9jYXRpb24ub3JpZ2luLCAnJylcbiAgICBpZiAoaGFzaCA9PT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICAkKGEpLmF0dHIoJ2RhdGEtc2Nyb2xsJywgdHJ1ZSlcbiAgICB9XG4gIH1cbn0pXG5zbW9vdGhTY3JvbGwuaW5pdCh7XG4gIHNwZWVkOiAxMDAwXG59KVxuXG4vLyBTa3JvbGxyIEVmZmVjdHNcbmlmICgoL0FuZHJvaWR8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5L2kpLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvdy5vcGVyYSkpIHtcbiAgLy8gZG8gbm90aGluZywgdGhpcyBpcyBtb2JpbGUhXG59IGVsc2Uge1xuICBza3JvbGxyLmluaXQoe1xuICAgIGZvcmNlSGVpZ2h0OiBmYWxzZVxuICB9KVxufVxuXG4vLyBQYWdlLWxldmVsIGxvZ2ljXG53aW5kb3cucGFnZXMgPSB7XG4gIGhvbWVcbn1cbndpbmRvdy5lZGl0ID0gZWRpdFxuXG5tb2JpbGVNZW51KClcblxuXG5cblxuXG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy9cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5cbmZ1bmN0aW9uIG1vYmlsZU1lbnUgKCkge1xuICBjb25zdCBuYXYgPSAkKCduYXYnKVxuICBjb25zdCBtZW51ID0gJCgnLnNob3ctbWVudScpXG4gIGNvbnN0IG1lbnVMaW5rcyA9ICQoJ25hdiBhJylcblxuICBjb25zdCB0b2dnbGVNZW51ID0gKCkgPT4gbmF2LnRvZ2dsZUNsYXNzKCdtZW51LW9wZW4nKVxuICBtZW51Lm9uKCdjbGljaycsIHRvZ2dsZU1lbnUpXG5cbiAgY29uc3QgY2xpY2tMaW5rID0gZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zdCBzZWxmID0gJCh0aGlzKVxuICAgIGlmIChuYXYuaGFzQ2xhc3MoJ21lbnUtb3BlbicpKSB7XG4gICAgICBuYXYucmVtb3ZlQ2xhc3MoJ21lbnUtb3BlbicpXG4gICAgfVxuICB9XG4gIG1lbnVMaW5rcy5vbignY2xpY2snLCBjbGlja0xpbmspXG59XG5cbmZ1bmN0aW9uIGhvbWUgKCkge1xuXG59XG5cbmZ1bmN0aW9uIGVkaXQgKHN0YXRlKSB7XG4gIGRvY3VtZW50LmJvZHkuY29udGVudEVkaXRhYmxlID0gc3RhdGUgIT09IHVuZGVmaW5lZCA/IHN0YXRlIDogISFkb2N1bWVudC5ib2R5LmNvbnRlbnRFZGl0YWJsZVxufVxuXG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gVXRpbHNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIl19
