/*
	jCode-1.5.js - Contains jCode library
	Rules:
	- 'this' returns the plugin object created by the plugin script or library object to be used again in chaining
	- 'GQuery' is the global element for jCode, so use that in all functions
	- Functions that don't require a selector won't require the selector parameter, just $.function()
	- Plugins will be added through jCode.extend({},"") with {} being your plugin values and functions and "" being your plugin name
	- Plugins can only be accessed through the name of the plugin like so: $(selector, plugin_name).function()
	- If a plugin doesn't require use of the selectors, it can be added without using jCode.extend(), just use jCode.plugin_value = value;
	- Extra things cannot be added to existing plugins through extend. However, you can use the plugins namespace and add with dot notation - jCode.mod.lib.function = function(){}
	
	Tutorials can be found at www.nerdsatwork.inc/coding_comp/jcode
	Downloads for company-built plugins and extensions and other apps can be found be at www.nerdsatwork.inc/software/downloads
	Debug/Crawlers can be built into the code
	jCode hasn't and won't be scanned by JSLint, JSHint, or ESLint or by any JS scanner tool, it says everything is wrong per its syntax style
*/
(function(window){
	"use strict";
	//Begin locale library object
	//Simple parsing functions
	var get = function(query) {
		if(typeof query === "string") {
			if(query === "body") {
				return document.body;
			} else {
				return document.querySelectorAll(query);
			}
		} else {
			return query;
		}
	}, GQuery = null;
	var jCode = function(selector, context) {
		//Selector can be string, element, function, or object for element initialization, page load properties, or plugin initialization
		//Let 
		if(typeof selector === "function") {
			window.onload = selector;
		} else if(typeof selector === "string" && typeof context === "string") {
			GQuery = get(selector);
			return jCode.mod[context];
		} else {
			GQuery = get(selector);
			return jCode.mod.lib;
		}
	};
	jCode.mod = {};
	jCode.extend = function(plugin, name) {
		if(typeof plugin === "object") {
			//Begin plugin initalization
			if(name === null) {
				console.log('Name not supplied, plugin cannot be added without a name');
				return false;
			} else {
				if(jCode.mod[name]) {
					console.log('This plugin already exists!');
					return false;
				} else {
					jCode.mod[name] = plugin;
				}
			}
			return;
		} else {
			console.log('Plugin parameter not an object, cannot add plugin');
		}
	};

	var _$ = window.$,
	_jCode = window.jCode;
	jCode.noConflict = function(deep) {
		if (window.$ === jCode) {
			window.$ = _$;
		}
		if (deep && window.jCode === jCode) {
			window.jCode = _jCode;
		}
		return jCode;
	};
	//Important to make sure jCode is set to the window
	window.$ = window.jCode = window.prototype = jCode;
	//Build Library
	jCode.extend({
		text : function(value) {
			if(value === null) {
				for(var i = 0; i < GQuery.length; i++) {
					GQuery[i].textContent;
				}
			} else {
				for(var i = 0; i < GQuery.length; i++) {
					GQuery[i].textContent = value;
				}
			}
			return this;
		},
		html : function(value) {
			if(value === null) {
				for(var i = 0; i < GQuery.length; i++) {
					GQuery[i].innerHTML;
				}
			} else {
				for(var i = 0; i < GQuery.length; i++) {
					GQuery[i].innerHTML = value;
				}
			}
			return this;
		},
		css : function(property, value) {
			if(value === null) {
				for(var i = 0; i < GQuery.length; i++) {
					GQuery[i].style[property];
				}
			} else {
				if(typeof property === "object") {
					var key = Object.keys(property);
					var val = Object.values(property);
					//Key.length will always = val.length
					for(var j = 0; j < key.length; j++) {
						for(var i = 0; i < GQuery.length; i++) {
							GQuery[i].style[key[j]] = val[j];
						}
					}
				} else {
					for(var i = 0; i < GQuery.length; i++) {
						GQuery[i].style[property] = value;
					}
				}
			}
			return this;
		},
		attr : function(name, value) {
			if(value === null) {
				for(var i = 0; i < GQuery.length; i++) {
					GQuery[i].getAttribute(name);
				}
			} else {
				for(var i = 0; i < GQuery.length; i++) {
					GQuery[i].setAttribute(name,value);
				}
			}
			return this;
		},
		on : function(type, func, func2, cap) {
			for(var i = 0; i < GQuery.length; i++) {
				//LT IE 8 Support for event listeners
				if (document.body.attachEvent) {
					//Run through and use the attachEvent property
					if (typeof func2 === "function") {
						if (type === "click") {
							cap = true;
							GQuery[i].attachEvent('mousedown', func, cap);
							GQuery[i].attachEvent('mouseup', func2, cap);
						} else if (type === "hover") {
							cap = true;
							GQuery[i].attachEvent('mouseover', func, cap);
							GQuery[i].attachEvent('mouseout', func2, cap);
						} else {
							console.warn('jCode\n\nFunction 2 supplied but type cannot use it, returning null');
							return null && this;
						}
					} else {
						cap = func2;
						GQuery[i].attachEvent(type, func, cap);
					}
				} else if (document.body.addEventListener) {
					if (typeof func2 === "function") {
						if (type === "click") {
							cap = true;
							GQuery[i].addEventListener('mousedown', func, cap);
							GQuery[i].addEventListener('mouseup', func2, cap);
						} else if (type === "hover") {
							cap = true;
							GQuery[i].addEventListener('mouseover', func, cap);
							GQuery[i].addEventListener('mouseout', func2, cap);
						} else {
							console.warn('jCode\n\nFunction 2 supplied but type cannot use it, returning null');
							return null && this;
						}
					} else {
						cap = func2;
						GQuery[i].addEventListener(type, func, cap);
					}
				}
			}
			return this;
		},
		bind : function(type, func, func2, cap) {
			this.on(type, func, func2, cap);
			return this;
		},
		contains : function(type, opt) {
			var arrBool = [];
			if(opt === null) {
				for(var i = 0; i < GQuery.length; i++) {
					//Containment arrays
					var syms = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '\\', '{', '}', '|', ';', '\'', '\"', ':', ', ', '.', '\/', '<', '>', '?', '`', '~'],
						num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
						alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
						caps = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
						alphaNum = [],
						numCap = [];
					alphaNum.push(alpha,num);
					numCap.push(caps, num);
					//Checking
					if(type === "symbols") {
						for(var j = 0; j < syms.length; j++) {
							if(GQuery[i].indexOf(syms[j]) > -1) {
								arrBool.push(true);
							} else {
								arrBool.push(false);
							}
						}
					} else if(type === "num") {
						for(var j = 0; j < num.length; j++) {
							if(GQuery[i].indexOf(num[j]) > -1) {
								arrBool.push(true);
							} else {
								arrBool.push(false);
							}
						}
					} else if(type === "alpha") {
						for(var j = 0; j < alpha.length; j++) {
							if(GQuery[i].indexOf(alpha[j]) > -1) {
								arrBool.push(true);
							} else {
								arrBool.push(false);
							}
						}
					} else if(type === "alphaCap") {
						for(var j = 0; j < caps.length; j++) {
							if(GQuery[i].indexOf(caps[j]) > -1) {
								arrBool.push(true);
							} else {
								arrBool.push(false);
							}
						}
					} else if(type === "alphaNum") {
						for(var j = 0; j < alphaNum.length; j++) {
							if(GQuery[i].indexOf(alphaNum[j]) > -1) {
								arrBool.push(true);
							} else {
								arrBool.push(false);
							}
						}
					} else if(type === "alphaCapNum") {
						for(var j = 0; j < numCap.length; j++) {
							if(GQuery[i].indexOf(numCap[j]) > -1) {
								arrBool.push(true);
							} else {
								arrBool.push(false);
							}
						}
					} else {
						console.log('No type defined, returning everything');
						this.contains("symbols");
						this.contains("num");
						this.contains("alpha");
						this.contains("alphaCap");
						this.contains("alphaNum");
						this.contains("alphaCapNum");
					}
				}
			} else {
				for(var i = 0; i < GQuery.length; i++) {
					for(var j = 0; j < opt.length; j++) {
						if(GQuery[i].indexOf(opt[j]) > -1) {
							arrBool.push(true);
						} else {
							arrBool.push(false);
						}
					}
				}
			}
			if(arrBool.length <= 1) {
				return arrBool[0] && this;
			} else {
				return arrBool && this;
			}
		},
		click : function(func, func2) {
			for(var i = 0; i < GQuery.length; i++) {
				if(func2 == null) {
					GQuery[i].addEventListener('click',func,false);
				} else {
					GQuery[i].addEventListener('mousedown',func,false);
					GQuery[i].addEventListener('mouseup',func2,false);
				}
			}
			return this;
		},
		toggleClass : function(name) {
			for(var i = 0; i < GQuery.length; i++) {
				if(arguments.length > 1) {
					for(var j = 0; j < arguments.length; j++) {
						if(GQuery[i].classList.contains(arguments[j])) {
							GQuery[i].classList.remove(arguments[j]);
						} else {
							GQuery[i].classList.add(arguments[j]);
						}
					}
				} else {
					if(GQuery[i].classList.contains(name)) {
						GQuery[i].classList.remove(name);
					} else {
						GQuery[i].classList.add(name);
					}
				}
			}
			return this;
		},
		addClass : function(name) {
			for(var i = 0; i < GQuery.length; i++) {
				if (arguments.length > 1) {
					for (var j = 0; j < arguments.length; j++) {
						GQuery[i].classList.add(arguments[j]);
					}
				} else {
					GQuery[i].classList.add(name);
				}
			}
			return this;
		},
		removeClass : function(name) {
			for(var i = 0; i < GQuery.length; i++) {
				if (arguments.length > 1) {
					for (var j = 0; j < arguments.length; j++) {
						GQuery[i].classList.remove(arguments[j]);
					}
				} else {
					GQuery[i].classList.remove(name);
				}
			}
			return this;
		},
		find : function(find, rep) {
			for(var i = 0; i < GQuery.length; i++) {
				var elem = GQuery[i].value;
				if (rep === null) {
					//Just return whether the character was found and its place(s)
					if (elem.indexOf(find) > -1) {
						var count = 0, pos = [];
						for (var j = 0, k = 0; j < elem.length; j++) {
							if (elem.substring(j) === find) {
								count++;
								pos[k] = j;
								k++;
							}
						}
						return {count: count,pos: pos};
					} else {
						return false && this;
					}
				} else {
					//Replace the found text with an overwrite, finding positions in the process
					if (elem.indexOf(find) > -1) {
						for(var j = 0; j < elem.length; j++) {
							if(elem.substring(j) === find) {
								return elem.replace(find, rep) && this;
							}
						}
					} else {
						return this;
					}
				}
			}
		},
		val : function() {
			for(var i = 0; i < GQuery.length; i++) {
				if (typeof GQuery[i] === "string") {
					return String(GQuery[i].value);
				} else if (typeof GQuery[i] === "number") {
					return Number(GQuery[i].value);
				} else if (typeof GQuery[i] === "object") {
					return Object.create(GQuery[i]);
				} else if (GQuery[i] || !GQuery[i]) {
					return Boolean(GQuery[i]);
				} else {
					console.warn('jCode\n\nTypeError: Couldn\'t parse type!');
				}
			}
			return this;
		},
		append : function(text, block) {
			//Create elements
			var span = document.createElement("span");
			var div = document.createElement("div");
			//Append text
			span.innerHTML = text;
			div.innerHTML = text;
			for(var i = 0; i < GQuery.length; i++) {
				if(block === null) {
					//Default inline
					block = false;
				}
				if (block) {
					if(GQuery[i].value === "") {
						GQuery[i].innerHTML = text;
					} else {
						GQuery[i].appendChild(div);
					}
				} else {
					if(GQuery[i].value === "") {
						GQuery[i].innerHTML = text;
					} else {
						GQuery[i].appendChild(span);
					}
				}
			}
			return this;
		},
		prepend : function(text, block) {
			//Create elements
			var span = document.createElement("span");
			var div = document.createElement("div");
			//Append text
			span.innerHTML = text;
			div.innerHTML = text;
			for(var i = 0; i < GQuery.length; i++) {
				if(block === null) {
					//Default inline
					block = false;
				}
				if (block) {
					if(GQuery[i].value === "") {
						GQuery[i].innerHTML = text;
					} else {
						GQuery[i].insertBefore(div, GQuery[i].childNodes[0]);
					}
				} else {
					if(GQuery[i].value === "") {
						GQuery[i].innerHTML = text;
					} else {
						GQuery[i].insertBefore(span, GQuery[i].childNodes[0]);
					}
				}
			}
			return this;
		},
		toggleAttr : function(name,value, optval) {
			for(var i = 0; i < GQuery.length; i++) {
				if(optval !== null) {
					if(GQuery[i].getAttribute(name) === value) {
						GQuery[i].setAttribute(name,optval);
					} else {
						GQuery[i].setAttribute(name,value);
					}
				} else {
					if(GQuery[i].getAttribute(name) === value) {
						GQuery[i].setAttribute(name,'');
					} else {
						GQuery[i].setAttribute(name,value);
					}
				}
			}
			return this;
		},
		CSSlist : ["align-content","align-items","align-self","all","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-shadow","box-sizing","caption-size","clear","clip","color","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","content","counter-increment","counter-reset","cursor","direction","display","empty-cells","filter","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","font","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","hanging-punctuation","height","justify-content","left","letter-spacing","line-height","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","max-height","max-width","min-height","min-width","nav-down","nav-index","nav-left","nav-right","nav-up","opacity","order","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page-break-after","page-break-before","page-break-inside","perspective","perspective-origin","position","quotes","resize","right","tab-size","table-layout","text-align","text-align-last","text-decoration","text-decoration-color","text-decoration-line","text-decoration-style","text-indent","text-justify","text-overflow","text-shadow","text-transform","top","transform","trasnform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","user-select","vertical-align","visibility","white-space","width","word-break","word-spacing","word-wrap","z-index"]
	},"lib");
	//Build functions that don't use selector(s)
	//Math functions
	jCode.math = {
		random : function (floor, ceil) {
			var randomNumber = Math.floor((Math.random() * ceil) + floor);
			return randomNumber && this;
		},
		//Missing sides must be deemed null when used
		triSides : function (right, a, b, c, A, B, C) {
			if (right) {
				if (a === null) {
					//Solve for a
					//Use sine
					return Math.asin(B / C);
				} else if (b === null) {
					//Solve for b
					//Use cosine
					return;
				} else if (c === null) {
					//Solve for c
					//Use tangent
					return;
				}
			} else {
				if (a === null) {
					return;
				} else if (b === null) {
					return;
				} else if (c === null) {
					return;
				}
			}
		}
	};
	//Check console to see userAgent details
	jCode.detectOS = function () {
		var agent = navigator.userAgent,
			os = null,
			cos = ["Android", "iOS", "Mac OS X", "Mac OS", "Linux", "Windows 10", "Windows 8.1", "Windows 8", "Windows 7", "Windows Vista", "Windows XP"],
			rel = ["Android", "/(iPhone|iPad|iPod)/", "Mac OS X", "/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/", "/(Linux|X11)/", "/(Windows 10.0|Windows NT 10.0)/", "/(Windows 8.1|Windows NT 6.3)/", "/(Windows 8|Windows NT 6.2)/", "/(Windows 7|Windows NT 6.1)/", "Windows NT 6.0", "/(Windows NT 5.1|Windows XP)/"],
			id = 0;
		console.log(agent);
		for (id; id < cos.length; id++) {
			if (agent.indexOf(rel[id]) > -1) {
				os = cos[id];
				break;
			}
		}
		return os;
	};
	jCode.concat = function () {
		var args = arguments, argArr = [], concat = "";
		for(var i = 0; i < args.length; i++) {
			argArr.push(String(args[i]));
		}
		//Now that array is built, loop through the already parsed strings and concatenate them
		for(var i = 0; i < argArr.length; i++) {
			concat = concat + argArr[i];
		}
		return concat;
	};
	jCode.ajax = {
		reqObj : function() {
			var xobj;
			if (window.XMLHttpRequest) {
				xobj = new XMLHttpRequest();
			} else {
				xobj = new ActiveXObject("Microsoft.XMLHTTP");
			}
			return xobj;
		},
		get : function(file, asynch, callback){
			//Handle LT IE 6
			var xobj;
			if (window.XMLHttpRequest) {
				xobj = new XMLHttpRequest();
			} else {
				xobj = new ActiveXObject("Microsoft.XMLHTTP");
			}
			//Move on when xobj is set
			xobj.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					if(jCode.checkCallback(callback)) {
						callback();
					} else {
						console.log('jCode\n\nCallback not a function, not calling');
					}
					return this.responseText;
				} else if(status == 404) {
					console.warn('jCode\n\nPage was not found');
					return;
				} else if(status == 403) {
					console.warn('jCode\n\nPage is forbidden');
					return;
				}
			};
			xobj.open("GET", file, asynch);
			xobj.send();
		},
		post : function(file, asynch, filter, callback){
			//Handle LT IE 6
			var xobj;
			if (window.XMLHttpRequest) {
				xobj = new XMLHttpRequest();
			} else {
				xobj = new ActiveXObject("Microsoft.XMLHTTP");
			}
			//Move on when xobj is set
			xobj.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					if(jCode.checkCallback(callback)) {
						callback();
					} else {
						console.log('jCode\n\nCallback not a function, not calling');
					}
					return this.responseText;
				} else if(status == 404) {
					console.warn('jCode\n\nPage was not found');
					return;
				} else if(status == 403) {
					console.warn('jCode\n\nPage is forbidden');
					return;
				}
			};
			xobj.open("POST", file, asynch);
			xobj.send(filter);
		}
	};
	jCode.wait = function(func,time) {
		if(typeof func !== "function") {
			console.log('Supplied parameter isn\'t a function!');
			return;
		} else {
			if(time === null) {
				time = 1000;
			}
			return setTimeout(func,time);
		}
	};
	jCode.loopWait = function(func,time) {
		if(typeof func !== "function") {
			if(typeof func === "string" && time === null && func === "clear") {
				return clearInterval(jCode.looping);
			}
			console.log('Supplied parameter isn\'t a function!');
			return;
		} else {
			console.log('Looping Timed Function Stored under jCode.looping, using clearInterval($.looping) or $.loopWait(\'clear\') to clear!');
			if(time === null) {
				time = 1000;
			}
			jCode.looping = setInterval(func,time);
			return this;
		}
	};
	jCode.timing = {
		setFunc : function(func,time) {
			this.func = func;
			this.time = time;
		},
		clearFunc : function() {
			delete this.func;
			delete this.time;
		},
		exec : function(type) {
			if(type === null) {
				type = true;
			}
			if(type) {
				//Single waited execute
				setTimeout(this.func,this.time);
			} else {
				//Looping waited execute
				jCode.looping = setInterval(this.func,this.time);
			}
		},
		clearLoop : function() {
			clearInterval(jCode.looping);
		}
	};
	jCode.objectCreator = {
		globalObj : function(obj,name) {
			if(typeof obj !== "object") {
				console.log('objCreate: Object input not valid!');
				return this;
			} else {
				window[name] = obj;
				return this;
			}
		},
		//Please note that this is not set under jCode.mod where plugins are stored!
		libObj : function(obj,name) {
			if(typeof obj !== "object") {
				console.log('objCreate: Object input not valid!');
				return this;
			} else {
				jCode[name] = obj;
				return this;
			}
		},
		writeObj : function(data, objName) {
			if(objName === null) {
				//Default to jCode.mod.objCreate
				jCode.mod.objCreate = new Object.create(data);
			} else {
				//assume accessing anything but library object
				window[objName] = new Object.create(data);
			}
		},
		readObj : function(objName) {
			if(objName === null) {
				return jCode.mod.objCreate;
			} else {
				return window[objName];
			}
		},
		deleteObj : function(name,location) {
			if(location === null) {
				location = true;
			} else {
				location = false;
				if(location) {
					location = jCode.mod;
				} else {
					location = window;
				}
				delete location[name];
			}
		}
	};
	jCode.include = function(type) {
		//use arguments passed through to include scripts
		var args = arguments || {}, include = [];
		if(type === null) {
			console.log('Please define a type as defaulting will cause bugs');
			return false;
		}
		if(type === "js") {
			if(args === {} || args === null) {
				console.log("No names input, returning false");
				return false;
			} else {
				for(var i = 1; i < args.length; i++) {
					//Start building array of scripts to include in page
					include.push(args[i]);
				}
				console.log(include);
				//Run through include array and apply them to a script tag
				(function appendScript() {
					for(var i = 0; i < include.length; i++){
						if(document.body) {
							var script = document.createElement('script');
							console.log(include[i]);
							script.setAttribute('src',include[i]);
							return document.body.appendChild(script);
						} else {
							window.requestAnimationFrame(appendScript);
						}
					}
				})();
			}
		} else if(type === "css") {
			if(args === {} || args === null) {
				console.log("No names input, returning false");
				return false;
			} else {
				var media;
				if(typeof args[1] !== "number") {
					media = 'screen';
					for(var i = 1; i < args.length; i++) {
						include.push(args[i]);
					}
				} else {
					media = args[1];
					for(var i = 2; i < args.length; i++) {
						include.push(args[i]);
					}
				}
				
				for(var i = 0; i < include.length; i++) {
					var link = document.createElement('link');
					link.setAttribute('media',media);
					link.setAttribute('rel','stylesheet');
					link.setAttribute('href',include[i]);
					document.getElementsByTagName('head')[0].appendChild(link);
				}
			}
		} else if(type === "other") {
			
		} else {
			console.log('Type doesn\'t exist');
			return false;
		}
		
	}
})(typeof window !== "undefined" ? window : this);