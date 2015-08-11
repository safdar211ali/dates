/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*! jQuery UI - v1.11.1+CommonJS - 2014-09-17
* http://jqueryui.com
* Includes: widget.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */


(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );

	} else if (typeof exports === "object") {
		// Node/CommonJS:
		factory(require("jquery"));

	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
/*!
 * jQuery UI Widget 1.11.1
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */


var widget_uuid = 0,
	widget_slice = Array.prototype.slice;

$.cleanData = (function( orig ) {
	return function( elems ) {
		var events, elem, i;
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			try {

				// Only trigger remove when necessary to save time
				events = $._data( elem, "events" );
				if ( events && events.remove ) {
					$( elem ).triggerHandler( "remove" );
				}

			// http://bugs.jquery.com/ticket/8235
			} catch( e ) {}
		}
		orig( elems );
	};
})( $.cleanData );

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = (function() {
			var _super = function() {
					return base.prototype[ prop ].apply( this, arguments );
				},
				_superApply = function( args ) {
					return base.prototype[ prop ].apply( this, args );
				};
			return function() {
				var __super = this._super,
					__superApply = this._superApply,
					returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		})();
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );

	return constructor;
};

$.widget.extend = function( target ) {
	var input = widget_slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = widget_slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( options === "instance" ) {
					returnValue = instance;
					return false;
				}
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} );
					if ( instance._init ) {
						instance._init();
					}
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = widget_uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( arguments.length === 1 ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( arguments.length === 1 ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled", !!value );

			// If the widget is becoming disabled, then nothing is interactive
			if ( value ) {
				this.hoverable.removeClass( "ui-state-hover" );
				this.focusable.removeClass( "ui-state-focus" );
			}
		}

		return this;
	},

	enable: function() {
		return this._setOptions({ disabled: false });
	},
	disable: function() {
		return this._setOptions({ disabled: true });
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^([\w:-]*)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

var widget = $.widget;



}));
/*
 * jQuery Iframe Transport Plugin 1.8.3
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, require, window, document */


(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(require('jquery'));
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Helper variable to create unique names for the transport iframes:
    var counter = 0;

    // The iframe transport accepts four additional options:
    // options.fileInput: a jQuery collection of file input fields
    // options.paramName: the parameter name for the file form data,
    //  overrides the name property of the file input field(s),
    //  can be a string or an array of strings.
    // options.formData: an array of objects with name and value properties,
    //  equivalent to the return data of .serializeArray(), e.g.:
    //  [{name: 'a', value: 1}, {name: 'b', value: 2}]
    // options.initialIframeSrc: the URL of the initial iframe src,
    //  by default set to "javascript:false;"
    $.ajaxTransport('iframe', function (options) {
        if (options.async) {
            // javascript:false as initial iframe src
            // prevents warning popups on HTTPS in IE6:
            /*jshint scripturl: true */
            var initialIframeSrc = options.initialIframeSrc || 'javascript:false;',
            /*jshint scripturl: false */
                form,
                iframe,
                addParamChar;
            return {
                send: function (_, completeCallback) {
                    form = $('<form style="display:none;"></form>');
                    form.attr('accept-charset', options.formAcceptCharset);
                    addParamChar = /\?/.test(options.url) ? '&' : '?';
                    // XDomainRequest only supports GET and POST:
                    if (options.type === 'DELETE') {
                        options.url = options.url + addParamChar + '_method=DELETE';
                        options.type = 'POST';
                    } else if (options.type === 'PUT') {
                        options.url = options.url + addParamChar + '_method=PUT';
                        options.type = 'POST';
                    } else if (options.type === 'PATCH') {
                        options.url = options.url + addParamChar + '_method=PATCH';
                        options.type = 'POST';
                    }
                    // IE versions below IE8 cannot set the name property of
                    // elements that have already been added to the DOM,
                    // so we set the name along with the iframe HTML markup:
                    counter += 1;
                    iframe = $(
                        '<iframe src="' + initialIframeSrc +
                            '" name="iframe-transport-' + counter + '"></iframe>'
                    ).bind('load', function () {
                        var fileInputClones,
                            paramNames = $.isArray(options.paramName) ?
                                    options.paramName : [options.paramName];
                        iframe
                            .unbind('load')
                            .bind('load', function () {
                                var response;
                                // Wrap in a try/catch block to catch exceptions thrown
                                // when trying to access cross-domain iframe contents:
                                try {
                                    response = iframe.contents();
                                    // Google Chrome and Firefox do not throw an
                                    // exception when calling iframe.contents() on
                                    // cross-domain requests, so we unify the response:
                                    if (!response.length || !response[0].firstChild) {
                                        throw new Error();
                                    }
                                } catch (e) {
                                    response = undefined;
                                }
                                // The complete callback returns the
                                // iframe content document as response object:
                                completeCallback(
                                    200,
                                    'success',
                                    {'iframe': response}
                                );
                                // Fix for IE endless progress bar activity bug
                                // (happens on form submits to iframe targets):
                                $('<iframe src="' + initialIframeSrc + '"></iframe>')
                                    .appendTo(form);
                                window.setTimeout(function () {
                                    // Removing the form in a setTimeout call
                                    // allows Chrome's developer tools to display
                                    // the response result
                                    form.remove();
                                }, 0);
                            });
                        form
                            .prop('target', iframe.prop('name'))
                            .prop('action', options.url)
                            .prop('method', options.type);
                        if (options.formData) {
                            $.each(options.formData, function (index, field) {
                                $('<input type="hidden"/>')
                                    .prop('name', field.name)
                                    .val(field.value)
                                    .appendTo(form);
                            });
                        }
                        if (options.fileInput && options.fileInput.length &&
                                options.type === 'POST') {
                            fileInputClones = options.fileInput.clone();
                            // Insert a clone for each file input field:
                            options.fileInput.after(function (index) {
                                return fileInputClones[index];
                            });
                            if (options.paramName) {
                                options.fileInput.each(function (index) {
                                    $(this).prop(
                                        'name',
                                        paramNames[index] || options.paramName
                                    );
                                });
                            }
                            // Appending the file input fields to the hidden form
                            // removes them from their original location:
                            form
                                .append(options.fileInput)
                                .prop('enctype', 'multipart/form-data')
                                // enctype must be set as encoding for IE:
                                .prop('encoding', 'multipart/form-data');
                            // Remove the HTML5 form attribute from the input(s):
                            options.fileInput.removeAttr('form');
                        }
                        form.submit();
                        // Insert the file input fields at their original location
                        // by replacing the clones with the originals:
                        if (fileInputClones && fileInputClones.length) {
                            options.fileInput.each(function (index, input) {
                                var clone = $(fileInputClones[index]);
                                // Restore the original name and form properties:
                                $(input)
                                    .prop('name', clone.prop('name'))
                                    .attr('form', clone.attr('form'));
                                clone.replaceWith(input);
                            });
                        }
                    });
                    form.append(iframe).appendTo(document.body);
                },
                abort: function () {
                    if (iframe) {
                        // javascript:false as iframe src aborts the request
                        // and prevents warning popups on HTTPS in IE6.
                        // concat is used to avoid the "Script URL" JSLint error:
                        iframe
                            .unbind('load')
                            .prop('src', initialIframeSrc);
                    }
                    if (form) {
                        form.remove();
                    }
                }
            };
        }
    });

    // The iframe transport returns the iframe content document as response.
    // The following adds converters from iframe to text, json, html, xml
    // and script.
    // Please note that the Content-Type for JSON responses has to be text/plain
    // or text/html, if the browser doesn't include application/json in the
    // Accept header, else IE will show a download dialog.
    // The Content-Type for XML responses on the other hand has to be always
    // application/xml or text/xml, so IE properly parses the XML response.
    // See also
    // https://github.com/blueimp/jQuery-File-Upload/wiki/Setup#content-type-negotiation
    $.ajaxSetup({
        converters: {
            'iframe text': function (iframe) {
                return iframe && $(iframe[0].body).text();
            },
            'iframe json': function (iframe) {
                return iframe && $.parseJSON($(iframe[0].body).text());
            },
            'iframe html': function (iframe) {
                return iframe && $(iframe[0].body).html();
            },
            'iframe xml': function (iframe) {
                var xmlDoc = iframe && iframe[0];
                return xmlDoc && $.isXMLDoc(xmlDoc) ? xmlDoc :
                        $.parseXML((xmlDoc.XMLDocument && xmlDoc.XMLDocument.xml) ||
                            $(xmlDoc.body).html());
            },
            'iframe script': function (iframe) {
                return iframe && $.globalEval($(iframe[0].body).text());
            }
        }
    });

}));
/*
 * jQuery File Upload Plugin 5.42.3
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window, document, location, Blob, FormData */


(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'jquery.ui.widget'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(
            require('jquery'),
            require('./vendor/jquery.ui.widget')
        );
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Detect file input support, based on
    // http://viljamis.com/blog/2012/file-upload-support-on-mobile/
    $.support.fileInput = !(new RegExp(
        // Handle devices which give false positives for the feature detection:
        '(Android (1\\.[0156]|2\\.[01]))' +
            '|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)' +
            '|(w(eb)?OSBrowser)|(webOS)' +
            '|(Kindle/(1\\.0|2\\.[05]|3\\.0))'
    ).test(window.navigator.userAgent) ||
        // Feature detection for all other devices:
        $('<input type="file">').prop('disabled'));

    // The FileReader API is not actually used, but works as feature detection,
    // as some Safari versions (5?) support XHR file uploads via the FormData API,
    // but not non-multipart XHR file uploads.
    // window.XMLHttpRequestUpload is not available on IE10, so we check for
    // window.ProgressEvent instead to detect XHR2 file upload capability:
    $.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
    $.support.xhrFormDataFileUpload = !!window.FormData;

    // Detect support for Blob slicing (required for chunked uploads):
    $.support.blobSlice = window.Blob && (Blob.prototype.slice ||
        Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

    // Helper function to create drag handlers for dragover/dragenter/dragleave:
    function getDragHandler(type) {
        var isDragOver = type === 'dragover';
        return function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var dataTransfer = e.dataTransfer;
            if (dataTransfer && $.inArray('Files', dataTransfer.types) !== -1 &&
                    this._trigger(
                        type,
                        $.Event(type, {delegatedEvent: e})
                    ) !== false) {
                e.preventDefault();
                if (isDragOver) {
                    dataTransfer.dropEffect = 'copy';
                }
            }
        };
    }

    // The fileupload widget listens for change events on file input fields defined
    // via fileInput setting and paste or drop events of the given dropZone.
    // In addition to the default jQuery Widget methods, the fileupload widget
    // exposes the "add" and "send" methods, to add or directly send files using
    // the fileupload API.
    // By default, files added via file input selection, paste, drag & drop or
    // "add" method are uploaded immediately, but it is possible to override
    // the "add" callback option to queue file uploads.
    $.widget('blueimp.fileupload', {

        options: {
            // The drop target element(s), by the default the complete document.
            // Set to null to disable drag & drop support:
            dropZone: $(document),
            // The paste target element(s), by the default undefined.
            // Set to a DOM node or jQuery object to enable file pasting:
            pasteZone: undefined,
            // The file input field(s), that are listened to for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty,
            // can be a string or an array of strings:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // To limit the number of files uploaded with one XHR request,
            // set the following option to an integer greater than 0:
            limitMultiFileUploads: undefined,
            // The following option limits the number of files uploaded with one
            // XHR request to keep the request size under or equal to the defined
            // limit in bytes:
            limitMultiFileUploadSize: undefined,
            // Multipart file uploads add a number of bytes to each uploaded file,
            // therefore the following option adds an overhead for each file used
            // in the limitMultiFileUploadSize configuration:
            limitMultiFileUploadSizeOverhead: 512,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // To limit the number of concurrent uploads,
            // set the following option to an integer greater than 0:
            limitConcurrentUploads: undefined,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // Set the following option to the location of a redirect url on the
            // origin server, for cross-domain iframe transport uploads:
            redirect: undefined,
            // The parameter name for the redirect url, sent as part of the form
            // data and set to 'redirect' if this option is empty:
            redirectParamName: undefined,
            // Set the following option to the location of a postMessage window,
            // to enable postMessage transport uploads:
            postMessage: undefined,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,
            // Interval in milliseconds to calculate and trigger progress events:
            progressInterval: 100,
            // Interval in milliseconds to calculate progress bitrate:
            bitrateInterval: 500,
            // By default, uploads are started automatically when adding files:
            autoUpload: true,

            // Error and info messages:
            messages: {
                uploadedBytes: 'Uploaded bytes exceed file size'
            },

            // Translation function, gets the message key to be translated
            // and an object with context specific data as arguments:
            i18n: function (message, context) {
                message = this.messages[message] || message.toString();
                if (context) {
                    $.each(context, function (key, value) {
                        message = message.replace('{' + key + '}', value);
                    });
                }
                return message;
            },

            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function (form) {
                return form.serializeArray();
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop, paste or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uploads, else
            // once for each file selection.
            //
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows you to override plugin options as well as define ajax settings.
            //
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            //
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                if (data.autoUpload || (data.autoUpload !== false &&
                        $(this).fileupload('option', 'autoUpload'))) {
                    data.process().done(function () {
                        data.submit();
                    });
                }
            },

            // Other callbacks:

            // Callback for the submit event of each file upload:
            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);

            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);

            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);

            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);

            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);

            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);

            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);

            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);

            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);

            // Callback for change events of the fileInput(s):
            // change: function (e, data) {}, // .bind('fileuploadchange', func);

            // Callback for paste events to the pasteZone(s):
            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);

            // Callback for drop events of the dropZone(s):
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);

            // Callback for dragover events of the dropZone(s):
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

            // Callback for the start of each chunk upload request:
            // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);

            // Callback for successful chunk uploads:
            // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);

            // Callback for failed (abort or error) chunk uploads:
            // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);

            // Callback for completed (success, abort or error) chunk upload requests:
            // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);

            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false
        },

        // A list of options that require reinitializing event listeners and/or
        // special initialization code:
        _specialOptions: [
            'fileInput',
            'dropZone',
            'pasteZone',
            'multipart',
            'forceIframeTransport'
        ],

        _blobSlice: $.support.blobSlice && function () {
            var slice = this.slice || this.webkitSlice || this.mozSlice;
            return slice.apply(this, arguments);
        },

        _BitrateTimer: function () {
            this.timestamp = ((Date.now) ? Date.now() : (new Date()).getTime());
            this.loaded = 0;
            this.bitrate = 0;
            this.getBitrate = function (now, loaded, interval) {
                var timeDiff = now - this.timestamp;
                if (!this.bitrate || !interval || timeDiff > interval) {
                    this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
                    this.loaded = loaded;
                    this.timestamp = now;
                }
                return this.bitrate;
            };
        },

        _isXHRUpload: function (options) {
            return !options.forceIframeTransport &&
                ((!options.multipart && $.support.xhrFileUpload) ||
                $.support.xhrFormDataFileUpload);
        },

        _getFormData: function (options) {
            var formData;
            if ($.type(options.formData) === 'function') {
                return options.formData(options.form);
            }
            if ($.isArray(options.formData)) {
                return options.formData;
            }
            if ($.type(options.formData) === 'object') {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({name: name, value: value});
                });
                return formData;
            }
            return [];
        },

        _getTotal: function (files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },

        _initProgressObject: function (obj) {
            var progress = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            if (obj._progress) {
                $.extend(obj._progress, progress);
            } else {
                obj._progress = progress;
            }
        },

        _initResponseObject: function (obj) {
            var prop;
            if (obj._response) {
                for (prop in obj._response) {
                    if (obj._response.hasOwnProperty(prop)) {
                        delete obj._response[prop];
                    }
                }
            } else {
                obj._response = {};
            }
        },

        _onProgress: function (e, data) {
            if (e.lengthComputable) {
                var now = ((Date.now) ? Date.now() : (new Date()).getTime()),
                    loaded;
                if (data._time && data.progressInterval &&
                        (now - data._time < data.progressInterval) &&
                        e.loaded !== e.total) {
                    return;
                }
                data._time = now;
                loaded = Math.floor(
                    e.loaded / e.total * (data.chunkSize || data._progress.total)
                ) + (data.uploadedBytes || 0);
                // Add the difference from the previously loaded state
                // to the global loaded counter:
                this._progress.loaded += (loaded - data._progress.loaded);
                this._progress.bitrate = this._bitrateTimer.getBitrate(
                    now,
                    this._progress.loaded,
                    data.bitrateInterval
                );
                data._progress.loaded = data.loaded = loaded;
                data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(
                    now,
                    loaded,
                    data.bitrateInterval
                );
                // Trigger a custom progress event with a total data property set
                // to the file size(s) of the current upload and a loaded data
                // property calculated accordingly:
                this._trigger(
                    'progress',
                    $.Event('progress', {delegatedEvent: e}),
                    data
                );
                // Trigger a global progress event for all current file uploads,
                // including ajax calls queued for sequential file uploads:
                this._trigger(
                    'progressall',
                    $.Event('progressall', {delegatedEvent: e}),
                    this._progress
                );
            }
        },

        _initProgressListener: function (options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload) {
                $(xhr.upload).bind('progress', function (e) {
                    var oe = e.originalEvent;
                    // Make sure the progress event properties get copied over:
                    e.lengthComputable = oe.lengthComputable;
                    e.loaded = oe.loaded;
                    e.total = oe.total;
                    that._onProgress(e, options);
                });
                options.xhr = function () {
                    return xhr;
                };
            }
        },

        _isInstanceOf: function (type, obj) {
            // Cross-frame instanceof check
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        },

        _initXHRData: function (options) {
            var that = this,
                formData,
                file = options.files[0],
                // Ignore non-multipart setting if not supported:
                multipart = options.multipart || !$.support.xhrFileUpload,
                paramName = $.type(options.paramName) === 'array' ?
                    options.paramName[0] : options.paramName;
            options.headers = $.extend({}, options.headers);
            if (options.contentRange) {
                options.headers['Content-Range'] = options.contentRange;
            }
            if (!multipart || options.blob || !this._isInstanceOf('File', file)) {
                options.headers['Content-Disposition'] = 'attachment; filename="' +
                    encodeURI(file.name) + '"';
            }
            if (!multipart) {
                options.contentType = file.type || 'application/octet-stream';
                options.data = options.blob || file;
            } else if ($.support.xhrFormDataFileUpload) {
                if (options.postMessage) {
                    // window.postMessage does not allow sending FormData
                    // objects, so we just add the File/Blob objects to
                    // the formData array and let the postMessage window
                    // create the FormData object out of this array:
                    formData = this._getFormData(options);
                    if (options.blob) {
                        formData.push({
                            name: paramName,
                            value: options.blob
                        });
                    } else {
                        $.each(options.files, function (index, file) {
                            formData.push({
                                name: ($.type(options.paramName) === 'array' &&
                                    options.paramName[index]) || paramName,
                                value: file
                            });
                        });
                    }
                } else {
                    if (that._isInstanceOf('FormData', options.formData)) {
                        formData = options.formData;
                    } else {
                        formData = new FormData();
                        $.each(this._getFormData(options), function (index, field) {
                            formData.append(field.name, field.value);
                        });
                    }
                    if (options.blob) {
                        formData.append(paramName, options.blob, file.name);
                    } else {
                        $.each(options.files, function (index, file) {
                            // This check allows the tests to run with
                            // dummy objects:
                            if (that._isInstanceOf('File', file) ||
                                    that._isInstanceOf('Blob', file)) {
                                formData.append(
                                    ($.type(options.paramName) === 'array' &&
                                        options.paramName[index]) || paramName,
                                    file,
                                    file.uploadName || file.name
                                );
                            }
                        });
                    }
                }
                options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
        },

        _initIframeSettings: function (options) {
            var targetHost = $('<a></a>').prop('href', options.url).prop('host');
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
            // Add redirect url to form data on cross-domain uploads:
            if (options.redirect && targetHost && targetHost !== location.host) {
                options.formData.push({
                    name: options.redirectParamName || 'redirect',
                    value: options.redirect
                });
            }
        },

        _initDataSettings: function (options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
                if (options.postMessage) {
                    // Setting the dataType to postmessage enables the
                    // postMessage transport:
                    options.dataType = 'postmessage ' + (options.dataType || '');
                }
            } else {
                this._initIframeSettings(options);
            }
        },

        _getParamName: function (options) {
            var fileInput = $(options.fileInput),
                paramName = options.paramName;
            if (!paramName) {
                paramName = [];
                fileInput.each(function () {
                    var input = $(this),
                        name = input.prop('name') || 'files[]',
                        i = (input.prop('files') || [1]).length;
                    while (i) {
                        paramName.push(name);
                        i -= 1;
                    }
                });
                if (!paramName.length) {
                    paramName = [fileInput.prop('name') || 'files[]'];
                }
            } else if (!$.isArray(paramName)) {
                paramName = [paramName];
            }
            return paramName;
        },

        _initFormSettings: function (options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
                // If the given file input doesn't have an associated form,
                // use the default widget file input's form:
                if (!options.form.length) {
                    options.form = $(this.options.fileInput.prop('form'));
                }
            }
            options.paramName = this._getParamName(options);
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type ||
                ($.type(options.form.prop('method')) === 'string' &&
                    options.form.prop('method')) || ''
                ).toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT' &&
                    options.type !== 'PATCH') {
                options.type = 'POST';
            }
            if (!options.formAcceptCharset) {
                options.formAcceptCharset = options.form.attr('accept-charset');
            }
        },

        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },

        // jQuery 1.6 doesn't provide .state(),
        // while jQuery 1.8+ removed .isRejected() and .isResolved():
        _getDeferredState: function (deferred) {
            if (deferred.state) {
                return deferred.state();
            }
            if (deferred.isResolved()) {
                return 'resolved';
            }
            if (deferred.isRejected()) {
                return 'rejected';
            }
            return 'pending';
        },

        // Maps jqXHR callbacks to the equivalent
        // methods of the given Promise object:
        _enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },

        // Creates and returns a Promise object enhanced with
        // the jqXHR methods abort, success, error and complete:
        _getXHRPromise: function (resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },

        // Adds convenience methods to the data callback argument:
        _addConvenienceMethods: function (e, data) {
            var that = this,
                getPromise = function (args) {
                    return $.Deferred().resolveWith(that, args).promise();
                };
            data.process = function (resolveFunc, rejectFunc) {
                if (resolveFunc || rejectFunc) {
                    data._processQueue = this._processQueue =
                        (this._processQueue || getPromise([this])).pipe(
                            function () {
                                if (data.errorThrown) {
                                    return $.Deferred()
                                        .rejectWith(that, [data]).promise();
                                }
                                return getPromise(arguments);
                            }
                        ).pipe(resolveFunc, rejectFunc);
                }
                return this._processQueue || getPromise([this]);
            };
            data.submit = function () {
                if (this.state() !== 'pending') {
                    data.jqXHR = this.jqXHR =
                        (that._trigger(
                            'submit',
                            $.Event('submit', {delegatedEvent: e}),
                            this
                        ) !== false) && that._onSend(e, this);
                }
                return this.jqXHR || that._getXHRPromise();
            };
            data.abort = function () {
                if (this.jqXHR) {
                    return this.jqXHR.abort();
                }
                this.errorThrown = 'abort';
                that._trigger('fail', null, this);
                return that._getXHRPromise(false);
            };
            data.state = function () {
                if (this.jqXHR) {
                    return that._getDeferredState(this.jqXHR);
                }
                if (this._processQueue) {
                    return that._getDeferredState(this._processQueue);
                }
            };
            data.processing = function () {
                return !this.jqXHR && this._processQueue && that
                    ._getDeferredState(this._processQueue) === 'pending';
            };
            data.progress = function () {
                return this._progress;
            };
            data.response = function () {
                return this._response;
            };
        },

        // Parses the Range header from the server response
        // and returns the uploaded bytes:
        _getUploadedBytes: function (jqXHR) {
            var range = jqXHR.getResponseHeader('Range'),
                parts = range && range.split('-'),
                upperBytesPos = parts && parts.length > 1 &&
                    parseInt(parts[1], 10);
            return upperBytesPos && upperBytesPos + 1;
        },

        // Uploads a file in multiple, sequential requests
        // by splitting the file up in multiple blob chunks.
        // If the second parameter is true, only tests if the file
        // should be uploaded in chunks, but does not invoke any
        // upload requests:
        _chunkedUpload: function (options, testOnly) {
            options.uploadedBytes = options.uploadedBytes || 0;
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes,
                mcs = options.maxChunkSize || fs,
                slice = this._blobSlice,
                dfd = $.Deferred(),
                promise = dfd.promise(),
                jqXHR,
                upload;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) ||
                    options.data) {
                return false;
            }
            if (testOnly) {
                return true;
            }
            if (ub >= fs) {
                file.error = options.i18n('uploadedBytes');
                return this._getXHRPromise(
                    false,
                    options.context,
                    [null, 'error', file.error]
                );
            }
            // The chunk upload method:
            upload = function () {
                // Clone the options object for each chunk upload:
                var o = $.extend({}, options),
                    currentLoaded = o._progress.loaded;
                o.blob = slice.call(
                    file,
                    ub,
                    ub + mcs,
                    file.type
                );
                // Store the current chunk size, as the blob itself
                // will be dereferenced after data processing:
                o.chunkSize = o.blob.size;
                // Expose the chunk bytes position range:
                o.contentRange = 'bytes ' + ub + '-' +
                    (ub + o.chunkSize - 1) + '/' + fs;
                // Process the upload data (the blob and potential form data):
                that._initXHRData(o);
                // Add progress listeners for this chunk upload:
                that._initProgressListener(o);
                jqXHR = ((that._trigger('chunksend', null, o) !== false && $.ajax(o)) ||
                        that._getXHRPromise(false, o.context))
                    .done(function (result, textStatus, jqXHR) {
                        ub = that._getUploadedBytes(jqXHR) ||
                            (ub + o.chunkSize);
                        // Create a progress event if no final progress event
                        // with loaded equaling total has been triggered
                        // for this chunk:
                        if (currentLoaded + o.chunkSize - o._progress.loaded) {
                            that._onProgress($.Event('progress', {
                                lengthComputable: true,
                                loaded: ub - o.uploadedBytes,
                                total: ub - o.uploadedBytes
                            }), o);
                        }
                        options.uploadedBytes = o.uploadedBytes = ub;
                        o.result = result;
                        o.textStatus = textStatus;
                        o.jqXHR = jqXHR;
                        that._trigger('chunkdone', null, o);
                        that._trigger('chunkalways', null, o);
                        if (ub < fs) {
                            // File upload not yet complete,
                            // continue with the next chunk:
                            upload();
                        } else {
                            dfd.resolveWith(
                                o.context,
                                [result, textStatus, jqXHR]
                            );
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        o.jqXHR = jqXHR;
                        o.textStatus = textStatus;
                        o.errorThrown = errorThrown;
                        that._trigger('chunkfail', null, o);
                        that._trigger('chunkalways', null, o);
                        dfd.rejectWith(
                            o.context,
                            [jqXHR, textStatus, errorThrown]
                        );
                    });
            };
            this._enhancePromise(promise);
            promise.abort = function () {
                return jqXHR.abort();
            };
            upload();
            return promise;
        },

        _beforeSend: function (e, data) {
            if (this._active === 0) {
                // the start callback is triggered when an upload starts
                // and no other uploads are currently running,
                // equivalent to the global ajaxStart event:
                this._trigger('start');
                // Set timer for global bitrate progress calculation:
                this._bitrateTimer = new this._BitrateTimer();
                // Reset the global progress values:
                this._progress.loaded = this._progress.total = 0;
                this._progress.bitrate = 0;
            }
            // Make sure the container objects for the .response() and
            // .progress() methods on the data object are available
            // and reset to their initial state:
            this._initResponseObject(data);
            this._initProgressObject(data);
            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
            data._progress.total = data.total = this._getTotal(data.files) || 1;
            data._progress.bitrate = data.bitrate = 0;
            this._active += 1;
            // Initialize the global progress values:
            this._progress.loaded += data.loaded;
            this._progress.total += data.total;
        },

        _onDone: function (result, textStatus, jqXHR, options) {
            var total = options._progress.total,
                response = options._response;
            if (options._progress.loaded < total) {
                // Create a progress event if no final progress event
                // with loaded equaling total has been triggered:
                this._onProgress($.Event('progress', {
                    lengthComputable: true,
                    loaded: total,
                    total: total
                }), options);
            }
            response.result = options.result = result;
            response.textStatus = options.textStatus = textStatus;
            response.jqXHR = options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },

        _onFail: function (jqXHR, textStatus, errorThrown, options) {
            var response = options._response;
            if (options.recalculateProgress) {
                // Remove the failed (error or abort) file upload from
                // the global progress calculation:
                this._progress.loaded -= options._progress.loaded;
                this._progress.total -= options._progress.total;
            }
            response.jqXHR = options.jqXHR = jqXHR;
            response.textStatus = options.textStatus = textStatus;
            response.errorThrown = options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
        },

        _onAlways: function (jqXHRorResult, textStatus, jqXHRorError, options) {
            // jqXHRorResult, textStatus and jqXHRorError are added to the
            // options object via done and fail callbacks
            this._trigger('always', null, options);
        },

        _onSend: function (e, data) {
            if (!data.submit) {
                this._addConvenienceMethods(e, data);
            }
            var that = this,
                jqXHR,
                aborted,
                slot,
                pipe,
                options = that._getAJAXSettings(data),
                send = function () {
                    that._sending += 1;
                    // Set timer for bitrate progress calculation:
                    options._bitrateTimer = new that._BitrateTimer();
                    jqXHR = jqXHR || (
                        ((aborted || that._trigger(
                            'send',
                            $.Event('send', {delegatedEvent: e}),
                            options
                        ) === false) &&
                        that._getXHRPromise(false, options.context, aborted)) ||
                        that._chunkedUpload(options) || $.ajax(options)
                    ).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                        that._onAlways(
                            jqXHRorResult,
                            textStatus,
                            jqXHRorError,
                            options
                        );
                        that._sending -= 1;
                        that._active -= 1;
                        if (options.limitConcurrentUploads &&
                                options.limitConcurrentUploads > that._sending) {
                            // Start the next queued upload,
                            // that has not been aborted:
                            var nextSlot = that._slots.shift();
                            while (nextSlot) {
                                if (that._getDeferredState(nextSlot) === 'pending') {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                        if (that._active === 0) {
                            // The stop callback is triggered when all uploads have
                            // been completed, equivalent to the global ajaxStop event:
                            that._trigger('stop');
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads ||
                    (this.options.limitConcurrentUploads &&
                    this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    slot = $.Deferred();
                    this._slots.push(slot);
                    pipe = slot.pipe(send);
                } else {
                    this._sequence = this._sequence.pipe(send, send);
                    pipe = this._sequence;
                }
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe.abort = function () {
                    aborted = [undefined, 'abort', 'abort'];
                    if (!jqXHR) {
                        if (slot) {
                            slot.rejectWith(options.context, aborted);
                        }
                        return send();
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },

        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data),
                files = data.files,
                filesLength = files.length,
                limit = options.limitMultiFileUploads,
                limitSize = options.limitMultiFileUploadSize,
                overhead = options.limitMultiFileUploadSizeOverhead,
                batchSize = 0,
                paramName = this._getParamName(options),
                paramNameSet,
                paramNameSlice,
                fileSet,
                i,
                j = 0;
            if (limitSize && (!filesLength || files[0].size === undefined)) {
                limitSize = undefined;
            }
            if (!(options.singleFileUploads || limit || limitSize) ||
                    !this._isXHRUpload(options)) {
                fileSet = [files];
                paramNameSet = [paramName];
            } else if (!(options.singleFileUploads || limitSize) && limit) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i += limit) {
                    fileSet.push(files.slice(i, i + limit));
                    paramNameSlice = paramName.slice(i, i + limit);
                    if (!paramNameSlice.length) {
                        paramNameSlice = paramName;
                    }
                    paramNameSet.push(paramNameSlice);
                }
            } else if (!options.singleFileUploads && limitSize) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i = i + 1) {
                    batchSize += files[i].size + overhead;
                    if (i + 1 === filesLength ||
                            ((batchSize + files[i + 1].size + overhead) > limitSize) ||
                            (limit && i + 1 - j >= limit)) {
                        fileSet.push(files.slice(j, i + 1));
                        paramNameSlice = paramName.slice(j, i + 1);
                        if (!paramNameSlice.length) {
                            paramNameSlice = paramName;
                        }
                        paramNameSet.push(paramNameSlice);
                        j = i + 1;
                        batchSize = 0;
                    }
                }
            } else {
                paramNameSet = paramName;
            }
            data.originalFiles = files;
            $.each(fileSet || files, function (index, element) {
                var newData = $.extend({}, data);
                newData.files = fileSet ? element : [element];
                newData.paramName = paramNameSet[index];
                that._initResponseObject(newData);
                that._initProgressObject(newData);
                that._addConvenienceMethods(e, newData);
                result = that._trigger(
                    'add',
                    $.Event('add', {delegatedEvent: e}),
                    newData
                );
                return result;
            });
            return result;
        },

        _replaceFileInput: function (data) {
            var input = data.fileInput,
                inputClone = input.clone(true);
            // Add a reference for the new cloned file input to the data argument:
            data.fileInputClone = inputClone;
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // Avoid memory leaks with the detached file input:
            $.cleanData(input.unbind('remove'));
            // Replace the original file input element in the fileInput
            // elements set with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
            // If the widget has been initialized on the file input itself,
            // override this.element with the file input clone:
            if (input[0] === this.element[0]) {
                this.element = inputClone;
            }
        },

        _handleFileTreeEntry: function (entry, path) {
            var that = this,
                dfd = $.Deferred(),
                errorHandler = function (e) {
                    if (e && !e.entry) {
                        e.entry = entry;
                    }
                    // Since $.when returns immediately if one
                    // Deferred is rejected, we use resolve instead.
                    // This allows valid files and invalid items
                    // to be returned together in one set:
                    dfd.resolve([e]);
                },
                successHandler = function (entries) {
                    that._handleFileTreeEntries(
                        entries,
                        path + entry.name + '/'
                    ).done(function (files) {
                        dfd.resolve(files);
                    }).fail(errorHandler);
                },
                readEntries = function () {
                    dirReader.readEntries(function (results) {
                        if (!results.length) {
                            successHandler(entries);
                        } else {
                            entries = entries.concat(results);
                            readEntries();
                        }
                    }, errorHandler);
                },
                dirReader, entries = [];
            path = path || '';
            if (entry.isFile) {
                if (entry._file) {
                    // Workaround for Chrome bug #149735
                    entry._file.relativePath = path;
                    dfd.resolve(entry._file);
                } else {
                    entry.file(function (file) {
                        file.relativePath = path;
                        dfd.resolve(file);
                    }, errorHandler);
                }
            } else if (entry.isDirectory) {
                dirReader = entry.createReader();
                readEntries();
            } else {
                // Return an empy list for file system items
                // other than files or directories:
                dfd.resolve([]);
            }
            return dfd.promise();
        },

        _handleFileTreeEntries: function (entries, path) {
            var that = this;
            return $.when.apply(
                $,
                $.map(entries, function (entry) {
                    return that._handleFileTreeEntry(entry, path);
                })
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _getDroppedFiles: function (dataTransfer) {
            dataTransfer = dataTransfer || {};
            var items = dataTransfer.items;
            if (items && items.length && (items[0].webkitGetAsEntry ||
                    items[0].getAsEntry)) {
                return this._handleFileTreeEntries(
                    $.map(items, function (item) {
                        var entry;
                        if (item.webkitGetAsEntry) {
                            entry = item.webkitGetAsEntry();
                            if (entry) {
                                // Workaround for Chrome bug #149735:
                                entry._file = item.getAsFile();
                            }
                            return entry;
                        }
                        return item.getAsEntry();
                    })
                );
            }
            return $.Deferred().resolve(
                $.makeArray(dataTransfer.files)
            ).promise();
        },

        _getSingleFileInputFiles: function (fileInput) {
            fileInput = $(fileInput);
            var entries = fileInput.prop('webkitEntries') ||
                    fileInput.prop('entries'),
                files,
                value;
            if (entries && entries.length) {
                return this._handleFileTreeEntries(entries);
            }
            files = $.makeArray(fileInput.prop('files'));
            if (!files.length) {
                value = fileInput.prop('value');
                if (!value) {
                    return $.Deferred().resolve([]).promise();
                }
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                files = [{name: value.replace(/^.*\\/, '')}];
            } else if (files[0].name === undefined && files[0].fileName) {
                // File normalization for Safari 4 and Firefox 3:
                $.each(files, function (index, file) {
                    file.name = file.fileName;
                    file.size = file.fileSize;
                });
            }
            return $.Deferred().resolve(files).promise();
        },

        _getFileInputFiles: function (fileInput) {
            if (!(fileInput instanceof $) || fileInput.length === 1) {
                return this._getSingleFileInputFiles(fileInput);
            }
            return $.when.apply(
                $,
                $.map(fileInput, this._getSingleFileInputFiles)
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _onChange: function (e) {
            var that = this,
                data = {
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            this._getFileInputFiles(data.fileInput).always(function (files) {
                data.files = files;
                if (that.options.replaceFileInput) {
                    that._replaceFileInput(data);
                }
                if (that._trigger(
                        'change',
                        $.Event('change', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    that._onAdd(e, data);
                }
            });
        },

        _onPaste: function (e) {
            var items = e.originalEvent && e.originalEvent.clipboardData &&
                    e.originalEvent.clipboardData.items,
                data = {files: []};
            if (items && items.length) {
                $.each(items, function (index, item) {
                    var file = item.getAsFile && item.getAsFile();
                    if (file) {
                        data.files.push(file);
                    }
                });
                if (this._trigger(
                        'paste',
                        $.Event('paste', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    this._onAdd(e, data);
                }
            }
        },

        _onDrop: function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var that = this,
                dataTransfer = e.dataTransfer,
                data = {};
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                e.preventDefault();
                this._getDroppedFiles(dataTransfer).always(function (files) {
                    data.files = files;
                    if (that._trigger(
                            'drop',
                            $.Event('drop', {delegatedEvent: e}),
                            data
                        ) !== false) {
                        that._onAdd(e, data);
                    }
                });
            }
        },

        _onDragOver: getDragHandler('dragover'),

        _onDragEnter: getDragHandler('dragenter'),

        _onDragLeave: getDragHandler('dragleave'),

        _initEventHandlers: function () {
            if (this._isXHRUpload(this.options)) {
                this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop,
                    // event.preventDefault() on dragenter is required for IE10+:
                    dragenter: this._onDragEnter,
                    // dragleave is not required, but added for completeness:
                    dragleave: this._onDragLeave
                });
                this._on(this.options.pasteZone, {
                    paste: this._onPaste
                });
            }
            if ($.support.fileInput) {
                this._on(this.options.fileInput, {
                    change: this._onChange
                });
            }
        },

        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, 'dragenter dragleave dragover drop');
            this._off(this.options.pasteZone, 'paste');
            this._off(this.options.fileInput, 'change');
        },

        _setOption: function (key, value) {
            var reinit = $.inArray(key, this._specialOptions) !== -1;
            if (reinit) {
                this._destroyEventHandlers();
            }
            this._super(key, value);
            if (reinit) {
                this._initSpecialOptions();
                this._initEventHandlers();
            }
        },

        _initSpecialOptions: function () {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input[type="file"]') ?
                        this.element : this.element.find('input[type="file"]');
            } else if (!(options.fileInput instanceof $)) {
                options.fileInput = $(options.fileInput);
            }
            if (!(options.dropZone instanceof $)) {
                options.dropZone = $(options.dropZone);
            }
            if (!(options.pasteZone instanceof $)) {
                options.pasteZone = $(options.pasteZone);
            }
        },

        _getRegExp: function (str) {
            var parts = str.split('/'),
                modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
        },

        _isRegExpOption: function (key, value) {
            return key !== 'url' && $.type(value) === 'string' &&
                /^\/.*\/[igm]{0,3}$/.test(value);
        },

        _initDataAttributes: function () {
            var that = this,
                options = this.options,
                data = this.element.data();
            // Initialize options set via HTML5 data-attributes:
            $.each(
                this.element[0].attributes,
                function (index, attr) {
                    var key = attr.name.toLowerCase(),
                        value;
                    if (/^data-/.test(key)) {
                        // Convert hyphen-ated key to camelCase:
                        key = key.slice(5).replace(/-[a-z]/g, function (str) {
                            return str.charAt(1).toUpperCase();
                        });
                        value = data[key];
                        if (that._isRegExpOption(key, value)) {
                            value = that._getRegExp(value);
                        }
                        options[key] = value;
                    }
                }
            );
        },

        _create: function () {
            this._initDataAttributes();
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = 0;
            this._initProgressObject(this);
            this._initEventHandlers();
        },

        // This method is exposed to the widget API and allows to query
        // the number of active uploads:
        active: function () {
            return this._active;
        },

        // This method is exposed to the widget API and allows to query
        // the widget upload progress.
        // It returns an object with loaded, total and bitrate properties
        // for the running uploads:
        progress: function () {
            return this._progress;
        },

        // This method is exposed to the widget API and allows adding files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('add', {files: filesList});
        add: function (data) {
            var that = this;
            if (!data || this.options.disabled) {
                return;
            }
            if (data.fileInput && !data.files) {
                this._getFileInputFiles(data.fileInput).always(function (files) {
                    data.files = files;
                    that._onAdd(null, data);
                });
            } else {
                data.files = $.makeArray(data.files);
                this._onAdd(null, data);
            }
        },

        // This method is exposed to the widget API and allows sending files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files or fileInput property and can contain additional options:
        // .fileupload('send', {files: filesList});
        // The method returns a Promise object for the file upload call.
        send: function (data) {
            if (data && !this.options.disabled) {
                if (data.fileInput && !data.files) {
                    var that = this,
                        dfd = $.Deferred(),
                        promise = dfd.promise(),
                        jqXHR,
                        aborted;
                    promise.abort = function () {
                        aborted = true;
                        if (jqXHR) {
                            return jqXHR.abort();
                        }
                        dfd.reject(null, 'abort', 'abort');
                        return promise;
                    };
                    this._getFileInputFiles(data.fileInput).always(
                        function (files) {
                            if (aborted) {
                                return;
                            }
                            if (!files.length) {
                                dfd.reject();
                                return;
                            }
                            data.files = files;
                            jqXHR = that._onSend(null, data);
                            jqXHR.then(
                                function (result, textStatus, jqXHR) {
                                    dfd.resolve(result, textStatus, jqXHR);
                                },
                                function (jqXHR, textStatus, errorThrown) {
                                    dfd.reject(jqXHR, textStatus, errorThrown);
                                }
                            );
                        }
                    );
                    return this._enhancePromise(promise);
                }
                data.files = $.makeArray(data.files);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }

    });

}));



/*
 * JavaScript Templates 2.4.1
 * https://github.com/blueimp/JavaScript-Templates
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Inspired by John Resig's JavaScript Micro-Templating:
 * http://ejohn.org/blog/javascript-micro-templating/
 */

/*jslint evil: true, regexp: true, unparam: true */
/*global document, define */


(function ($) {
    "use strict";
    var tmpl = function (str, data) {
        var f = !/[^\w\-\.:]/.test(str) ? tmpl.cache[str] = tmpl.cache[str] ||
                tmpl(tmpl.load(str)) :
                    new Function(
                        tmpl.arg + ',tmpl',
                        "var _e=tmpl.encode" + tmpl.helper + ",_s='" +
                            str.replace(tmpl.regexp, tmpl.func) +
                            "';return _s;"
                    );
        return data ? f(data, tmpl) : function (data) {
            return f(data, tmpl);
        };
    };
    tmpl.cache = {};
    tmpl.load = function (id) {
        return document.getElementById(id).innerHTML;
    };
    tmpl.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g;
    tmpl.func = function (s, p1, p2, p3, p4, p5) {
        if (p1) { // whitespace, quote and backspace in HTML context
            return {
                "\n": "\\n",
                "\r": "\\r",
                "\t": "\\t",
                " " : " "
            }[p1] || "\\" + p1;
        }
        if (p2) { // interpolation: {%=prop%}, or unescaped: {%#prop%}
            if (p2 === "=") {
                return "'+_e(" + p3 + ")+'";
            }
            return "'+(" + p3 + "==null?'':" + p3 + ")+'";
        }
        if (p4) { // evaluation start tag: {%
            return "';";
        }
        if (p5) { // evaluation end tag: %}
            return "_s+='";
        }
    };
    tmpl.encReg = /[<>&"'\x00]/g;
    tmpl.encMap = {
        "<"   : "&lt;",
        ">"   : "&gt;",
        "&"   : "&amp;",
        "\""  : "&quot;",
        "'"   : "&#39;"
    };
    tmpl.encode = function (s) {
        /*jshint eqnull:true */
        return (s == null ? "" : "" + s).replace(
            tmpl.encReg,
            function (c) {
                return tmpl.encMap[c] || "";
            }
        );
    };
    tmpl.arg = "o";
    tmpl.helper = ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" +
        ",include=function(s,d){_s+=tmpl(s,d);}";
    if (typeof define === "function" && define.amd) {
        define(function () {
            return tmpl;
        });
    } else {
        $.tmpl = tmpl;
    }
}(this));
/*! Magnific Popup - v0.9.9 - 2013-11-15
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2013 Dmitry Semenov; */

;(function($) {

/*>>core*/
/**
 * 
 * Magnific Popup Core JS file
 * 
 */


/**
 * Private static constants
 */
var CLOSE_EVENT = 'Close',
	BEFORE_CLOSE_EVENT = 'BeforeClose',
	AFTER_CLOSE_EVENT = 'AfterClose',
	BEFORE_APPEND_EVENT = 'BeforeAppend',
	MARKUP_PARSE_EVENT = 'MarkupParse',
	OPEN_EVENT = 'Open',
	CHANGE_EVENT = 'Change',
	NS = 'mfp',
	EVENT_NS = '.' + NS,
	READY_CLASS = 'mfp-ready',
	REMOVING_CLASS = 'mfp-removing',
	PREVENT_CLOSE_CLASS = 'mfp-prevent-close';


/**
 * Private vars 
 */
var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
	MagnificPopup = function(){},
	_isJQ = !!(window.jQuery),
	_prevStatus,
	_window = $(window),
	_body,
	_document,
	_prevContentType,
	_wrapClasses,
	_currPopupType;


/**
 * Private functions
 */
var _mfpOn = function(name, f) {
		mfp.ev.on(NS + name + EVENT_NS, f);
	},
	_getEl = function(className, appendTo, html, raw) {
		var el = document.createElement('div');
		el.className = 'mfp-'+className;
		if(html) {
			el.innerHTML = html;
		}
		if(!raw) {
			el = $(el);
			if(appendTo) {
				el.appendTo(appendTo);
			}
		} else if(appendTo) {
			appendTo.appendChild(el);
		}
		return el;
	},
	_mfpTrigger = function(e, data) {
		mfp.ev.triggerHandler(NS + e, data);

		if(mfp.st.callbacks) {
			// converts "mfpEventName" to "eventName" callback and triggers it if it's present
			e = e.charAt(0).toLowerCase() + e.slice(1);
			if(mfp.st.callbacks[e]) {
				mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
			}
		}
	},
	_getCloseBtn = function(type) {
		if(type !== _currPopupType || !mfp.currTemplate.closeBtn) {
			mfp.currTemplate.closeBtn = $( mfp.st.closeMarkup.replace('%title%', mfp.st.tClose ) );
			_currPopupType = type;
		}
		return mfp.currTemplate.closeBtn;
	},
	// Initialize Magnific Popup only when called at least once
	_checkInstance = function() {
		if(!$.magnificPopup.instance) {
			mfp = new MagnificPopup();
			mfp.init();
			$.magnificPopup.instance = mfp;
		}
	},
	// CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
	supportsTransitions = function() {
		var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
			v = ['ms','O','Moz','Webkit']; // 'v' for vendor

		if( s['transition'] !== undefined ) {
			return true; 
		}
			
		while( v.length ) {
			if( v.pop() + 'Transition' in s ) {
				return true;
			}
		}
				
		return false;
	};



/**
 * Public functions
 */
MagnificPopup.prototype = {

	constructor: MagnificPopup,

	/**
	 * Initializes Magnific Popup plugin. 
	 * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
	 */
	init: function() {
		var appVersion = navigator.appVersion;
		mfp.isIE7 = appVersion.indexOf("MSIE 7.") !== -1; 
		mfp.isIE8 = appVersion.indexOf("MSIE 8.") !== -1;
		mfp.isLowIE = mfp.isIE7 || mfp.isIE8;
		mfp.isAndroid = (/android/gi).test(appVersion);
		mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
		mfp.supportsTransition = supportsTransitions();

		// We disable fixed positioned lightbox on devices that don't handle it nicely.
		// If you know a better way of detecting this - let me know.
		mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent) );
		_body = $(document.body);
		_document = $(document);

		mfp.popupsCache = {};
	},

	/**
	 * Opens popup
	 * @param  data [description]
	 */
	open: function(data) {

		var i;

		if(data.isObj === false) { 
			// convert jQuery collection to array to avoid conflicts later
			mfp.items = data.items.toArray();

			mfp.index = 0;
			var items = data.items,
				item;
			for(i = 0; i < items.length; i++) {
				item = items[i];
				if(item.parsed) {
					item = item.el[0];
				}
				if(item === data.el[0]) {
					mfp.index = i;
					break;
				}
			}
		} else {
			mfp.items = $.isArray(data.items) ? data.items : [data.items];
			mfp.index = data.index || 0;
		}

		// if popup is already opened - we just update the content
		if(mfp.isOpen) {
			mfp.updateItemHTML();
			return;
		}
		
		mfp.types = []; 
		_wrapClasses = '';
		if(data.mainEl && data.mainEl.length) {
			mfp.ev = data.mainEl.eq(0);
		} else {
			mfp.ev = _document;
		}

		if(data.key) {
			if(!mfp.popupsCache[data.key]) {
				mfp.popupsCache[data.key] = {};
			}
			mfp.currTemplate = mfp.popupsCache[data.key];
		} else {
			mfp.currTemplate = {};
		}



		mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data ); 
		mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;

		if(mfp.st.modal) {
			mfp.st.closeOnContentClick = false;
			mfp.st.closeOnBgClick = false;
			mfp.st.showCloseBtn = false;
			mfp.st.enableEscapeKey = false;
		}
		

		// Building markup
		// main containers are created only once
		if(!mfp.bgOverlay) {

			// Dark overlay
			mfp.bgOverlay = _getEl('bg').on('click'+EVENT_NS, function() {
				mfp.close();
			});

			mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click'+EVENT_NS, function(e) {
				if(mfp._checkIfClose(e.target)) {
					mfp.close();
				}
			});

			mfp.container = _getEl('container', mfp.wrap);
		}

		mfp.contentContainer = _getEl('content');
		if(mfp.st.preloader) {
			mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
		}


		// Initializing modules
		var modules = $.magnificPopup.modules;
		for(i = 0; i < modules.length; i++) {
			var n = modules[i];
			n = n.charAt(0).toUpperCase() + n.slice(1);
			mfp['init'+n].call(mfp);
		}
		_mfpTrigger('BeforeOpen');


		if(mfp.st.showCloseBtn) {
			// Close button
			if(!mfp.st.closeBtnInside) {
				mfp.wrap.append( _getCloseBtn() );
			} else {
				_mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item) {
					values.close_replaceWith = _getCloseBtn(item.type);
				});
				_wrapClasses += ' mfp-close-btn-in';
			}
		}

		if(mfp.st.alignTop) {
			_wrapClasses += ' mfp-align-top';
		}

	

		if(mfp.fixedContentPos) {
			mfp.wrap.css({
				overflow: mfp.st.overflowY,
				overflowX: 'hidden',
				overflowY: mfp.st.overflowY
			});
		} else {
			mfp.wrap.css({ 
				top: _window.scrollTop(),
				position: 'absolute'
			});
		}
		if( mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos) ) {
			mfp.bgOverlay.css({
				height: _document.height(),
				position: 'absolute'
			});
		}

		

		if(mfp.st.enableEscapeKey) {
			// Close on ESC key
			_document.on('keyup' + EVENT_NS, function(e) {
				if(e.keyCode === 27) {
					mfp.close();
				}
			});
		}

		_window.on('resize' + EVENT_NS, function() {
			mfp.updateSize();
		});


		if(!mfp.st.closeOnContentClick) {
			_wrapClasses += ' mfp-auto-cursor';
		}
		
		if(_wrapClasses)
			mfp.wrap.addClass(_wrapClasses);


		// this triggers recalculation of layout, so we get it once to not to trigger twice
		var windowHeight = mfp.wH = _window.height();

		
		var windowStyles = {};

		if( mfp.fixedContentPos ) {
            if(mfp._hasScrollBar(windowHeight)){
                var s = mfp._getScrollbarSize();
                if(s) {
                    windowStyles.marginRight = s;
                }
            }
        }

		if(mfp.fixedContentPos) {
			if(!mfp.isIE7) {
				windowStyles.overflow = 'hidden';
			} else {
				// ie7 double-scroll bug
				$('body, html').css('overflow', 'hidden');
			}
		}

		
		
		var classesToadd = mfp.st.mainClass;
		if(mfp.isIE7) {
			classesToadd += ' mfp-ie7';
		}
		if(classesToadd) {
			mfp._addClassToMFP( classesToadd );
		}

		// add content
		mfp.updateItemHTML();

		_mfpTrigger('BuildControls');


		// remove scrollbar, add margin e.t.c
		$('html').css(windowStyles);
		
		// add everything to DOM
		mfp.bgOverlay.add(mfp.wrap).prependTo( document.body );



		// Save last focused element
		mfp._lastFocusedEl = document.activeElement;
		
		// Wait for next cycle to allow CSS transition
		setTimeout(function() {
			
			if(mfp.content) {
				mfp._addClassToMFP(READY_CLASS);
				mfp._setFocus();
			} else {
				// if content is not defined (not loaded e.t.c) we add class only for BG
				mfp.bgOverlay.addClass(READY_CLASS);
			}
			
			// Trap the focus in popup
			_document.on('focusin' + EVENT_NS, mfp._onFocusIn);

		}, 16);

		mfp.isOpen = true;
		mfp.updateSize(windowHeight);
		_mfpTrigger(OPEN_EVENT);

		return data;
	},

	/**
	 * Closes the popup
	 */
	close: function() {
		if(!mfp.isOpen) return;
		_mfpTrigger(BEFORE_CLOSE_EVENT);

		mfp.isOpen = false;
		// for CSS3 animation
		if(mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition )  {
			mfp._addClassToMFP(REMOVING_CLASS);
			setTimeout(function() {
				mfp._close();
			}, mfp.st.removalDelay);
		} else {
			mfp._close();
		}
	},

	/**
	 * Helper for close() function
	 */
	_close: function() {
		_mfpTrigger(CLOSE_EVENT);

		var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';

		mfp.bgOverlay.detach();
		mfp.wrap.detach();
		mfp.container.empty();

		if(mfp.st.mainClass) {
			classesToRemove += mfp.st.mainClass + ' ';
		}

		mfp._removeClassFromMFP(classesToRemove);

		if(mfp.fixedContentPos) {
			var windowStyles = {marginRight: ''};
			if(mfp.isIE7) {
				$('body, html').css('overflow', '');
			} else {
				windowStyles.overflow = '';
			}
			$('html').css(windowStyles);
		}
		
		_document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
		mfp.ev.off(EVENT_NS);

		// clean up DOM elements that aren't removed
		mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
		mfp.bgOverlay.attr('class', 'mfp-bg');
		mfp.container.attr('class', 'mfp-container');

		// remove close button from target element
		if(mfp.st.showCloseBtn &&
		(!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
			if(mfp.currTemplate.closeBtn)
				mfp.currTemplate.closeBtn.detach();
		}


		if(mfp._lastFocusedEl) {
			$(mfp._lastFocusedEl).focus(); // put tab focus back
		}
		mfp.currItem = null;	
		mfp.content = null;
		mfp.currTemplate = null;
		mfp.prevHeight = 0;

		_mfpTrigger(AFTER_CLOSE_EVENT);
	},
	
	updateSize: function(winHeight) {

		if(mfp.isIOS) {
			// fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
			var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
			var height = window.innerHeight * zoomLevel;
			mfp.wrap.css('height', height);
			mfp.wH = height;
		} else {
			mfp.wH = winHeight || _window.height();
		}
		// Fixes #84: popup incorrectly positioned with position:relative on body
		if(!mfp.fixedContentPos) {
			mfp.wrap.css('height', mfp.wH);
		}

		_mfpTrigger('Resize');

	},

	/**
	 * Set content of popup based on current index
	 */
	updateItemHTML: function() {
		var item = mfp.items[mfp.index];

		// Detach and perform modifications
		mfp.contentContainer.detach();

		if(mfp.content)
			mfp.content.detach();

		if(!item.parsed) {
			item = mfp.parseEl( mfp.index );
		}

		var type = item.type;	

		_mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
		// BeforeChange event works like so:
		// _mfpOn('BeforeChange', function(e, prevType, newType) { });
		
		mfp.currItem = item;

		

		

		if(!mfp.currTemplate[type]) {
			var markup = mfp.st[type] ? mfp.st[type].markup : false;

			// allows to modify markup
			_mfpTrigger('FirstMarkupParse', markup);

			if(markup) {
				mfp.currTemplate[type] = $(markup);
			} else {
				// if there is no markup found we just define that template is parsed
				mfp.currTemplate[type] = true;
			}
		}

		if(_prevContentType && _prevContentType !== item.type) {
			mfp.container.removeClass('mfp-'+_prevContentType+'-holder');
		}
		
		var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
		mfp.appendContent(newContent, type);

		item.preloaded = true;

		_mfpTrigger(CHANGE_EVENT, item);
		_prevContentType = item.type;
		
		// Append container back after its content changed
		mfp.container.prepend(mfp.contentContainer);

		_mfpTrigger('AfterChange');
	},


	/**
	 * Set HTML content of popup
	 */
	appendContent: function(newContent, type) {
		mfp.content = newContent;
		
		if(newContent) {
			if(mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
				mfp.currTemplate[type] === true) {
				// if there is no markup, we just append close button element inside
				if(!mfp.content.find('.mfp-close').length) {
					mfp.content.append(_getCloseBtn());
				}
			} else {
				mfp.content = newContent;
			}
		} else {
			mfp.content = '';
		}

		_mfpTrigger(BEFORE_APPEND_EVENT);
		mfp.container.addClass('mfp-'+type+'-holder');

		mfp.contentContainer.append(mfp.content);
	},



	
	/**
	 * Creates Magnific Popup data object based on given data
	 * @param  {int} index Index of item to parse
	 */
	parseEl: function(index) {
		var item = mfp.items[index],
			type = item.type;

		if(item.tagName) {
			item = { el: $(item) };
		} else {
			item = { data: item, src: item.src };
		}

		if(item.el) {
			var types = mfp.types;

			// check for 'mfp-TYPE' class
			for(var i = 0; i < types.length; i++) {
				if( item.el.hasClass('mfp-'+types[i]) ) {
					type = types[i];
					break;
				}
			}

			item.src = item.el.attr('data-mfp-src');
			if(!item.src) {
				item.src = item.el.attr('href');
			}
		}

		item.type = type || mfp.st.type || 'inline';
		item.index = index;
		item.parsed = true;
		mfp.items[index] = item;
		_mfpTrigger('ElementParse', item);

		return mfp.items[index];
	},


	/**
	 * Initializes single popup or a group of popups
	 */
	addGroup: function(el, options) {
		var eHandler = function(e) {
			e.mfpEl = this;
			mfp._openClick(e, el, options);
		};

		if(!options) {
			options = {};
		} 

		var eName = 'click.magnificPopup';
		options.mainEl = el;
		
		if(options.items) {
			options.isObj = true;
			el.off(eName).on(eName, eHandler);
		} else {
			options.isObj = false;
			if(options.delegate) {
				el.off(eName).on(eName, options.delegate , eHandler);
			} else {
				options.items = el;
				el.off(eName).on(eName, eHandler);
			}
		}
	},
	_openClick: function(e, el, options) {
		var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;


		if(!midClick && ( e.which === 2 || e.ctrlKey || e.metaKey ) ) {
			return;
		}

		var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;

		if(disableOn) {
			if($.isFunction(disableOn)) {
				if( !disableOn.call(mfp) ) {
					return true;
				}
			} else { // else it's number
				if( _window.width() < disableOn ) {
					return true;
				}
			}
		}
		
		if(e.type) {
			e.preventDefault();

			// This will prevent popup from closing if element is inside and popup is already opened
			if(mfp.isOpen) {
				e.stopPropagation();
			}
		}
			

		options.el = $(e.mfpEl);
		if(options.delegate) {
			options.items = el.find(options.delegate);
		}
		mfp.open(options);
	},


	/**
	 * Updates text on preloader
	 */
	updateStatus: function(status, text) {

		if(mfp.preloader) {
			if(_prevStatus !== status) {
				mfp.container.removeClass('mfp-s-'+_prevStatus);
			}

			if(!text && status === 'loading') {
				text = mfp.st.tLoading;
			}

			var data = {
				status: status,
				text: text
			};
			// allows to modify status
			_mfpTrigger('UpdateStatus', data);

			status = data.status;
			text = data.text;

			mfp.preloader.html(text);

			mfp.preloader.find('a').on('click', function(e) {
				e.stopImmediatePropagation();
			});

			mfp.container.addClass('mfp-s-'+status);
			_prevStatus = status;
		}
	},


	/*
		"Private" helpers that aren't private at all
	 */
	// Check to close popup or not
	// "target" is an element that was clicked
	_checkIfClose: function(target) {

		if($(target).hasClass(PREVENT_CLOSE_CLASS)) {
			return;
		}

		var closeOnContent = mfp.st.closeOnContentClick;
		var closeOnBg = mfp.st.closeOnBgClick;

		if(closeOnContent && closeOnBg) {
			return true;
		} else {

			// We close the popup if click is on close button or on preloader. Or if there is no content.
			if(!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0]) ) {
				return true;
			}

			// if click is outside the content
			if(  (target !== mfp.content[0] && !$.contains(mfp.content[0], target))  ) {
				if(closeOnBg) {
					// last check, if the clicked element is in DOM, (in case it's removed onclick)
					if( $.contains(document, target) ) {
						return true;
					}
				}
			} else if(closeOnContent) {
				return true;
			}

		}
		return false;
	},
	_addClassToMFP: function(cName) {
		mfp.bgOverlay.addClass(cName);
		mfp.wrap.addClass(cName);
	},
	_removeClassFromMFP: function(cName) {
		this.bgOverlay.removeClass(cName);
		mfp.wrap.removeClass(cName);
	},
	_hasScrollBar: function(winHeight) {
		return (  (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()) );
	},
	_setFocus: function() {
		(mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
	},
	_onFocusIn: function(e) {
		if( e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target) ) {
			mfp._setFocus();
			return false;
		}
	},
	_parseMarkup: function(template, values, item) {
		var arr;
		if(item.data) {
			values = $.extend(item.data, values);
		}
		_mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item] );

		$.each(values, function(key, value) {
			if(value === undefined || value === false) {
				return true;
			}
			arr = key.split('_');
			if(arr.length > 1) {
				var el = template.find(EVENT_NS + '-'+arr[0]);

				if(el.length > 0) {
					var attr = arr[1];
					if(attr === 'replaceWith') {
						if(el[0] !== value[0]) {
							el.replaceWith(value);
						}
					} else if(attr === 'img') {
						if(el.is('img')) {
							el.attr('src', value);
						} else {
							el.replaceWith( '<img src="'+value+'" class="' + el.attr('class') + '" />' );
						}
					} else {
						el.attr(arr[1], value);
					}
				}

			} else {
				template.find(EVENT_NS + '-'+key).html(value);
			}
		});
	},

	_getScrollbarSize: function() {
		// thx David
		if(mfp.scrollbarSize === undefined) {
			var scrollDiv = document.createElement("div");
			scrollDiv.id = "mfp-sbm";
			scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
			document.body.appendChild(scrollDiv);
			mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			document.body.removeChild(scrollDiv);
		}
		return mfp.scrollbarSize;
	}

}; /* MagnificPopup core prototype end */




/**
 * Public static functions
 */
$.magnificPopup = {
	instance: null,
	proto: MagnificPopup.prototype,
	modules: [],

	open: function(options, index) {
		_checkInstance();	

		if(!options) {
			options = {};
		} else {
			options = $.extend(true, {}, options);
		}
			

		options.isObj = true;
		options.index = index || 0;
		return this.instance.open(options);
	},

	close: function() {
		return $.magnificPopup.instance && $.magnificPopup.instance.close();
	},

	registerModule: function(name, module) {
		if(module.options) {
			$.magnificPopup.defaults[name] = module.options;
		}
		$.extend(this.proto, module.proto);			
		this.modules.push(name);
	},

	defaults: {   

		// Info about options is in docs:
		// http://dimsemenov.com/plugins/magnific-popup/documentation.html#options
		
		disableOn: 0,	

		key: null,

		midClick: false,

		mainClass: '',

		preloader: true,

		focus: '', // CSS selector of input to focus after popup is opened
		
		closeOnContentClick: false,

		closeOnBgClick: true,

		closeBtnInside: false, 

		showCloseBtn: true,

		enableEscapeKey: true,

		modal: false,

		alignTop: false,
	
		removalDelay: 0,
		
		fixedContentPos: 'auto', 
	
		fixedBgPos: 'auto',

		overflowY: 'auto',

		closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',

		tClose: 'Close (Esc)',

		tLoading: 'Loading...'

	}
};



$.fn.magnificPopup = function(options) {
	_checkInstance();

	var jqEl = $(this);

	// We call some API method of first param is a string
	if (typeof options === "string" ) {

		if(options === 'open') {
			var items,
				itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
				index = parseInt(arguments[1], 10) || 0;

			if(itemOpts.items) {
				items = itemOpts.items[index];
			} else {
				items = jqEl;
				if(itemOpts.delegate) {
					items = items.find(itemOpts.delegate);
				}
				items = items.eq( index );
			}
			mfp._openClick({mfpEl:items}, jqEl, itemOpts);
		} else {
			if(mfp.isOpen)
				mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
		}

	} else {
		// clone options obj
		options = $.extend(true, {}, options);
		
		/*
		 * As Zepto doesn't support .data() method for objects 
		 * and it works only in normal browsers
		 * we assign "options" object directly to the DOM element. FTW!
		 */
		if(_isJQ) {
			jqEl.data('magnificPopup', options);
		} else {
			jqEl[0].magnificPopup = options;
		}

		mfp.addGroup(jqEl, options);

	}
	return jqEl;
};


//Quick benchmark
/*
var start = performance.now(),
	i,
	rounds = 1000;

for(i = 0; i < rounds; i++) {

}
console.log('Test #1:', performance.now() - start);

start = performance.now();
for(i = 0; i < rounds; i++) {

}
console.log('Test #2:', performance.now() - start);
*/


/*>>core*/

/*>>inline*/

var INLINE_NS = 'inline',
	_hiddenClass,
	_inlinePlaceholder, 
	_lastInlineElement,
	_putInlineElementsBack = function() {
		if(_lastInlineElement) {
			_inlinePlaceholder.after( _lastInlineElement.addClass(_hiddenClass) ).detach();
			_lastInlineElement = null;
		}
	};

$.magnificPopup.registerModule(INLINE_NS, {
	options: {
		hiddenClass: 'hide', // will be appended with `mfp-` prefix
		markup: '',
		tNotFound: 'Content not found'
	},
	proto: {

		initInline: function() {
			mfp.types.push(INLINE_NS);

			_mfpOn(CLOSE_EVENT+'.'+INLINE_NS, function() {
				_putInlineElementsBack();
			});
		},

		getInline: function(item, template) {

			_putInlineElementsBack();

			if(item.src) {
				var inlineSt = mfp.st.inline,
					el = $(item.src);

				if(el.length) {

					// If target element has parent - we replace it with placeholder and put it back after popup is closed
					var parent = el[0].parentNode;
					if(parent && parent.tagName) {
						if(!_inlinePlaceholder) {
							_hiddenClass = inlineSt.hiddenClass;
							_inlinePlaceholder = _getEl(_hiddenClass);
							_hiddenClass = 'mfp-'+_hiddenClass;
						}
						// replace target inline element with placeholder
						_lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
					}

					mfp.updateStatus('ready');
				} else {
					mfp.updateStatus('error', inlineSt.tNotFound);
					el = $('<div>');
				}

				item.inlineElement = el;
				return el;
			}

			mfp.updateStatus('ready');
			mfp._parseMarkup(template, {}, item);
			return template;
		}
	}
});

/*>>inline*/

/*>>ajax*/
var AJAX_NS = 'ajax',
	_ajaxCur,
	_removeAjaxCursor = function() {
		if(_ajaxCur) {
			_body.removeClass(_ajaxCur);
		}
	},
	_destroyAjaxRequest = function() {
		_removeAjaxCursor();
		if(mfp.req) {
			mfp.req.abort();
		}
	};

$.magnificPopup.registerModule(AJAX_NS, {

	options: {
		settings: null,
		cursor: 'mfp-ajax-cur',
		tError: '<a href="%url%">The content</a> could not be loaded.'
	},

	proto: {
		initAjax: function() {
			mfp.types.push(AJAX_NS);
			_ajaxCur = mfp.st.ajax.cursor;

			_mfpOn(CLOSE_EVENT+'.'+AJAX_NS, _destroyAjaxRequest);
			_mfpOn('BeforeChange.' + AJAX_NS, _destroyAjaxRequest);
		},
		getAjax: function(item) {

			if(_ajaxCur)
				_body.addClass(_ajaxCur);

			mfp.updateStatus('loading');

			var opts = $.extend({
				url: item.src,
				success: function(data, textStatus, jqXHR) {
					var temp = {
						data:data,
						xhr:jqXHR
					};

					_mfpTrigger('ParseAjax', temp);

					mfp.appendContent( $(temp.data), AJAX_NS );

					item.finished = true;

					_removeAjaxCursor();

					mfp._setFocus();

					setTimeout(function() {
						mfp.wrap.addClass(READY_CLASS);
					}, 16);

					mfp.updateStatus('ready');

					_mfpTrigger('AjaxContentAdded');
				},
				error: function() {
					_removeAjaxCursor();
					item.finished = item.loadError = true;
					mfp.updateStatus('error', mfp.st.ajax.tError.replace('%url%', item.src));
				}
			}, mfp.st.ajax.settings);

			mfp.req = $.ajax(opts);

			return '';
		}
	}
});





	

/*>>ajax*/

/*>>image*/
var _imgInterval,
	_getTitle = function(item) {
		if(item.data && item.data.title !== undefined) 
			return item.data.title;

		var src = mfp.st.image.titleSrc;

		if(src) {
			if($.isFunction(src)) {
				return src.call(mfp, item);
			} else if(item.el) {
				return item.el.attr(src) || '';
			}
		}
		return '';
	};

$.magnificPopup.registerModule('image', {

	options: {
		markup: '<div class="mfp-figure">'+
					'<div class="mfp-close"></div>'+
					'<figure>'+
						'<div class="mfp-img"></div>'+
						'<figcaption>'+
							'<div class="mfp-bottom-bar">'+
								'<div class="mfp-title"></div>'+
								'<div class="mfp-counter"></div>'+
							'</div>'+
						'</figcaption>'+
					'</figure>'+
				'</div>',
		cursor: 'mfp-zoom-out-cur',
		titleSrc: 'title', 
		verticalFit: true,
		tError: '<a href="%url%">The image</a> could not be loaded.'
	},

	proto: {
		initImage: function() {
			var imgSt = mfp.st.image,
				ns = '.image';

			mfp.types.push('image');

			_mfpOn(OPEN_EVENT+ns, function() {
				if(mfp.currItem.type === 'image' && imgSt.cursor) {
					_body.addClass(imgSt.cursor);
				}
			});

			_mfpOn(CLOSE_EVENT+ns, function() {
				if(imgSt.cursor) {
					_body.removeClass(imgSt.cursor);
				}
				_window.off('resize' + EVENT_NS);
			});

			_mfpOn('Resize'+ns, mfp.resizeImage);
			if(mfp.isLowIE) {
				_mfpOn('AfterChange', mfp.resizeImage);
			}
		},
		resizeImage: function() {
			var item = mfp.currItem;
			if(!item || !item.img) return;

			if(mfp.st.image.verticalFit) {
				var decr = 0;
				// fix box-sizing in ie7/8
				if(mfp.isLowIE) {
					decr = parseInt(item.img.css('padding-top'), 10) + parseInt(item.img.css('padding-bottom'),10);
				}
				item.img.css('max-height', mfp.wH-decr);
			}
		},
		_onImageHasSize: function(item) {
			if(item.img) {
				
				item.hasSize = true;

				if(_imgInterval) {
					clearInterval(_imgInterval);
				}
				
				item.isCheckingImgSize = false;

				_mfpTrigger('ImageHasSize', item);

				if(item.imgHidden) {
					if(mfp.content)
						mfp.content.removeClass('mfp-loading');
					
					item.imgHidden = false;
				}

			}
		},

		/**
		 * Function that loops until the image has size to display elements that rely on it asap
		 */
		findImageSize: function(item) {

			var counter = 0,
				img = item.img[0],
				mfpSetInterval = function(delay) {

					if(_imgInterval) {
						clearInterval(_imgInterval);
					}
					// decelerating interval that checks for size of an image
					_imgInterval = setInterval(function() {
						if(img.naturalWidth > 0) {
							mfp._onImageHasSize(item);
							return;
						}

						if(counter > 200) {
							clearInterval(_imgInterval);
						}

						counter++;
						if(counter === 3) {
							mfpSetInterval(10);
						} else if(counter === 40) {
							mfpSetInterval(50);
						} else if(counter === 100) {
							mfpSetInterval(500);
						}
					}, delay);
				};

			mfpSetInterval(1);
		},

		getImage: function(item, template) {

			var guard = 0,

				// image load complete handler
				onLoadComplete = function() {
					if(item) {
						if (item.img[0].complete) {
							item.img.off('.mfploader');
							
							if(item === mfp.currItem){
								mfp._onImageHasSize(item);

								mfp.updateStatus('ready');
							}

							item.hasSize = true;
							item.loaded = true;

							_mfpTrigger('ImageLoadComplete');
							
						}
						else {
							// if image complete check fails 200 times (20 sec), we assume that there was an error.
							guard++;
							if(guard < 200) {
								setTimeout(onLoadComplete,100);
							} else {
								onLoadError();
							}
						}
					}
				},

				// image error handler
				onLoadError = function() {
					if(item) {
						item.img.off('.mfploader');
						if(item === mfp.currItem){
							mfp._onImageHasSize(item);
							mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
						}

						item.hasSize = true;
						item.loaded = true;
						item.loadError = true;
					}
				},
				imgSt = mfp.st.image;


			var el = template.find('.mfp-img');
			if(el.length) {
				var img = document.createElement('img');
				img.className = 'mfp-img';
				item.img = $(img).on('load.mfploader', onLoadComplete).on('error.mfploader', onLoadError);
				img.src = item.src;

				// without clone() "error" event is not firing when IMG is replaced by new IMG
				// TODO: find a way to avoid such cloning
				if(el.is('img')) {
					item.img = item.img.clone();
				}
				if(item.img[0].naturalWidth > 0) {
					item.hasSize = true;
				}
			}

			mfp._parseMarkup(template, {
				title: _getTitle(item),
				img_replaceWith: item.img
			}, item);

			mfp.resizeImage();

			if(item.hasSize) {
				if(_imgInterval) clearInterval(_imgInterval);

				if(item.loadError) {
					template.addClass('mfp-loading');
					mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
				} else {
					template.removeClass('mfp-loading');
					mfp.updateStatus('ready');
				}
				return template;
			}

			mfp.updateStatus('loading');
			item.loading = true;

			if(!item.hasSize) {
				item.imgHidden = true;
				template.addClass('mfp-loading');
				mfp.findImageSize(item);
			} 

			return template;
		}
	}
});



/*>>image*/

/*>>zoom*/
var hasMozTransform,
	getHasMozTransform = function() {
		if(hasMozTransform === undefined) {
			hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
		}
		return hasMozTransform;		
	};

$.magnificPopup.registerModule('zoom', {

	options: {
		enabled: false,
		easing: 'ease-in-out',
		duration: 300,
		opener: function(element) {
			return element.is('img') ? element : element.find('img');
		}
	},

	proto: {

		initZoom: function() {
			var zoomSt = mfp.st.zoom,
				ns = '.zoom',
				image;
				
			if(!zoomSt.enabled || !mfp.supportsTransition) {
				return;
			}

			var duration = zoomSt.duration,
				getElToAnimate = function(image) {
					var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
						transition = 'all '+(zoomSt.duration/1000)+'s ' + zoomSt.easing,
						cssObj = {
							position: 'fixed',
							zIndex: 9999,
							left: 0,
							top: 0,
							'-webkit-backface-visibility': 'hidden'
						},
						t = 'transition';

					cssObj['-webkit-'+t] = cssObj['-moz-'+t] = cssObj['-o-'+t] = cssObj[t] = transition;

					newImg.css(cssObj);
					return newImg;
				},
				showMainContent = function() {
					mfp.content.css('visibility', 'visible');
				},
				openTimeout,
				animatedImg;

			_mfpOn('BuildControls'+ns, function() {
				if(mfp._allowZoom()) {

					clearTimeout(openTimeout);
					mfp.content.css('visibility', 'hidden');

					// Basically, all code below does is clones existing image, puts in on top of the current one and animated it
					
					image = mfp._getItemToZoom();

					if(!image) {
						showMainContent();
						return;
					}

					animatedImg = getElToAnimate(image); 
					
					animatedImg.css( mfp._getOffset() );

					mfp.wrap.append(animatedImg);

					openTimeout = setTimeout(function() {
						animatedImg.css( mfp._getOffset( true ) );
						openTimeout = setTimeout(function() {

							showMainContent();

							setTimeout(function() {
								animatedImg.remove();
								image = animatedImg = null;
								_mfpTrigger('ZoomAnimationEnded');
							}, 16); // avoid blink when switching images 

						}, duration); // this timeout equals animation duration

					}, 16); // by adding this timeout we avoid short glitch at the beginning of animation


					// Lots of timeouts...
				}
			});
			_mfpOn(BEFORE_CLOSE_EVENT+ns, function() {
				if(mfp._allowZoom()) {

					clearTimeout(openTimeout);

					mfp.st.removalDelay = duration;

					if(!image) {
						image = mfp._getItemToZoom();
						if(!image) {
							return;
						}
						animatedImg = getElToAnimate(image);
					}
					
					
					animatedImg.css( mfp._getOffset(true) );
					mfp.wrap.append(animatedImg);
					mfp.content.css('visibility', 'hidden');
					
					setTimeout(function() {
						animatedImg.css( mfp._getOffset() );
					}, 16);
				}

			});

			_mfpOn(CLOSE_EVENT+ns, function() {
				if(mfp._allowZoom()) {
					showMainContent();
					if(animatedImg) {
						animatedImg.remove();
					}
					image = null;
				}	
			});
		},

		_allowZoom: function() {
			return mfp.currItem.type === 'image';
		},

		_getItemToZoom: function() {
			if(mfp.currItem.hasSize) {
				return mfp.currItem.img;
			} else {
				return false;
			}
		},

		// Get element postion relative to viewport
		_getOffset: function(isLarge) {
			var el;
			if(isLarge) {
				el = mfp.currItem.img;
			} else {
				el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
			}

			var offset = el.offset();
			var paddingTop = parseInt(el.css('padding-top'),10);
			var paddingBottom = parseInt(el.css('padding-bottom'),10);
			offset.top -= ( $(window).scrollTop() - paddingTop );


			/*
			
			Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.

			 */
			var obj = {
				width: el.width(),
				// fix Zepto height+padding issue
				height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
			};

			// I hate to do this, but there is no another option
			if( getHasMozTransform() ) {
				obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
			} else {
				obj.left = offset.left;
				obj.top = offset.top;
			}
			return obj;
		}

	}
});



/*>>zoom*/

/*>>iframe*/

var IFRAME_NS = 'iframe',
	_emptyPage = '//about:blank',
	
	_fixIframeBugs = function(isShowing) {
		if(mfp.currTemplate[IFRAME_NS]) {
			var el = mfp.currTemplate[IFRAME_NS].find('iframe');
			if(el.length) { 
				// reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
				if(!isShowing) {
					el[0].src = _emptyPage;
				}

				// IE8 black screen bug fix
				if(mfp.isIE8) {
					el.css('display', isShowing ? 'block' : 'none');
				}
			}
		}
	};

$.magnificPopup.registerModule(IFRAME_NS, {

	options: {
		markup: '<div class="mfp-iframe-scaler">'+
					'<div class="mfp-close"></div>'+
					'<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>'+
				'</div>',

		srcAction: 'iframe_src',

		// we don't care and support only one default type of URL by default
		patterns: {
			youtube: {
				index: 'youtube.com', 
				id: 'v=', 
				src: '//www.youtube.com/embed/%id%?autoplay=1'
			},
			vimeo: {
				index: 'vimeo.com/',
				id: '/',
				src: '//player.vimeo.com/video/%id%?autoplay=1'
			},
			gmaps: {
				index: '//maps.google.',
				src: '%id%&output=embed'
			}
		}
	},

	proto: {
		initIframe: function() {
			mfp.types.push(IFRAME_NS);

			_mfpOn('BeforeChange', function(e, prevType, newType) {
				if(prevType !== newType) {
					if(prevType === IFRAME_NS) {
						_fixIframeBugs(); // iframe if removed
					} else if(newType === IFRAME_NS) {
						_fixIframeBugs(true); // iframe is showing
					} 
				}// else {
					// iframe source is switched, don't do anything
				//}
			});

			_mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function() {
				_fixIframeBugs();
			});
		},

		getIframe: function(item, template) {
			var embedSrc = item.src;
			var iframeSt = mfp.st.iframe;
				
			$.each(iframeSt.patterns, function() {
				if(embedSrc.indexOf( this.index ) > -1) {
					if(this.id) {
						if(typeof this.id === 'string') {
							embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id)+this.id.length, embedSrc.length);
						} else {
							embedSrc = this.id.call( this, embedSrc );
						}
					}
					embedSrc = this.src.replace('%id%', embedSrc );
					return false; // break;
				}
			});
			
			var dataObj = {};
			if(iframeSt.srcAction) {
				dataObj[iframeSt.srcAction] = embedSrc;
			}
			mfp._parseMarkup(template, dataObj, item);

			mfp.updateStatus('ready');

			return template;
		}
	}
});



/*>>iframe*/

/*>>gallery*/
/**
 * Get looped index depending on number of slides
 */
var _getLoopedId = function(index) {
		var numSlides = mfp.items.length;
		if(index > numSlides - 1) {
			return index - numSlides;
		} else  if(index < 0) {
			return numSlides + index;
		}
		return index;
	},
	_replaceCurrTotal = function(text, curr, total) {
		return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
	};

$.magnificPopup.registerModule('gallery', {

	options: {
		enabled: false,
		arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
		preload: [0,2],
		navigateByImgClick: true,
		arrows: true,

		tPrev: 'Previous (Left arrow key)',
		tNext: 'Next (Right arrow key)',
		tCounter: '%curr% of %total%'
	},

	proto: {
		initGallery: function() {

			var gSt = mfp.st.gallery,
				ns = '.mfp-gallery',
				supportsFastClick = Boolean($.fn.mfpFastClick);

			mfp.direction = true; // true - next, false - prev
			
			if(!gSt || !gSt.enabled ) return false;

			_wrapClasses += ' mfp-gallery';

			_mfpOn(OPEN_EVENT+ns, function() {

				if(gSt.navigateByImgClick) {
					mfp.wrap.on('click'+ns, '.mfp-img', function() {
						if(mfp.items.length > 1) {
							mfp.next();
							return false;
						}
					});
				}

				_document.on('keydown'+ns, function(e) {
					if (e.keyCode === 37) {
						mfp.prev();
					} else if (e.keyCode === 39) {
						mfp.next();
					}
				});
			});

			_mfpOn('UpdateStatus'+ns, function(e, data) {
				if(data.text) {
					data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
				}
			});

			_mfpOn(MARKUP_PARSE_EVENT+ns, function(e, element, values, item) {
				var l = mfp.items.length;
				values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
			});

			_mfpOn('BuildControls' + ns, function() {
				if(mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
					var markup = gSt.arrowMarkup,
						arrowLeft = mfp.arrowLeft = $( markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left') ).addClass(PREVENT_CLOSE_CLASS),			
						arrowRight = mfp.arrowRight = $( markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right') ).addClass(PREVENT_CLOSE_CLASS);

					var eName = supportsFastClick ? 'mfpFastClick' : 'click';
					arrowLeft[eName](function() {
						mfp.prev();
					});			
					arrowRight[eName](function() {
						mfp.next();
					});	

					// Polyfill for :before and :after (adds elements with classes mfp-a and mfp-b)
					if(mfp.isIE7) {
						_getEl('b', arrowLeft[0], false, true);
						_getEl('a', arrowLeft[0], false, true);
						_getEl('b', arrowRight[0], false, true);
						_getEl('a', arrowRight[0], false, true);
					}

					mfp.container.append(arrowLeft.add(arrowRight));
				}
			});

			_mfpOn(CHANGE_EVENT+ns, function() {
				if(mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);

				mfp._preloadTimeout = setTimeout(function() {
					mfp.preloadNearbyImages();
					mfp._preloadTimeout = null;
				}, 16);		
			});


			_mfpOn(CLOSE_EVENT+ns, function() {
				_document.off(ns);
				mfp.wrap.off('click'+ns);
			
				if(mfp.arrowLeft && supportsFastClick) {
					mfp.arrowLeft.add(mfp.arrowRight).destroyMfpFastClick();
				}
				mfp.arrowRight = mfp.arrowLeft = null;
			});

		}, 
		next: function() {
			mfp.direction = true;
			mfp.index = _getLoopedId(mfp.index + 1);
			mfp.updateItemHTML();
		},
		prev: function() {
			mfp.direction = false;
			mfp.index = _getLoopedId(mfp.index - 1);
			mfp.updateItemHTML();
		},
		goTo: function(newIndex) {
			mfp.direction = (newIndex >= mfp.index);
			mfp.index = newIndex;
			mfp.updateItemHTML();
		},
		preloadNearbyImages: function() {
			var p = mfp.st.gallery.preload,
				preloadBefore = Math.min(p[0], mfp.items.length),
				preloadAfter = Math.min(p[1], mfp.items.length),
				i;

			for(i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
				mfp._preloadItem(mfp.index+i);
			}
			for(i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
				mfp._preloadItem(mfp.index-i);
			}
		},
		_preloadItem: function(index) {
			index = _getLoopedId(index);

			if(mfp.items[index].preloaded) {
				return;
			}

			var item = mfp.items[index];
			if(!item.parsed) {
				item = mfp.parseEl( index );
			}

			_mfpTrigger('LazyLoad', item);

			if(item.type === 'image') {
				item.img = $('<img class="mfp-img" />').on('load.mfploader', function() {
					item.hasSize = true;
				}).on('error.mfploader', function() {
					item.hasSize = true;
					item.loadError = true;
					_mfpTrigger('LazyLoadError', item);
				}).attr('src', item.src);
			}


			item.preloaded = true;
		}
	}
});

/*
Touch Support that might be implemented some day

addSwipeGesture: function() {
	var startX,
		moved,
		multipleTouches;

		return;

	var namespace = '.mfp',
		addEventNames = function(pref, down, move, up, cancel) {
			mfp._tStart = pref + down + namespace;
			mfp._tMove = pref + move + namespace;
			mfp._tEnd = pref + up + namespace;
			mfp._tCancel = pref + cancel + namespace;
		};

	if(window.navigator.msPointerEnabled) {
		addEventNames('MSPointer', 'Down', 'Move', 'Up', 'Cancel');
	} else if('ontouchstart' in window) {
		addEventNames('touch', 'start', 'move', 'end', 'cancel');
	} else {
		return;
	}
	_window.on(mfp._tStart, function(e) {
		var oE = e.originalEvent;
		multipleTouches = moved = false;
		startX = oE.pageX || oE.changedTouches[0].pageX;
	}).on(mfp._tMove, function(e) {
		if(e.originalEvent.touches.length > 1) {
			multipleTouches = e.originalEvent.touches.length;
		} else {
			//e.preventDefault();
			moved = true;
		}
	}).on(mfp._tEnd + ' ' + mfp._tCancel, function(e) {
		if(moved && !multipleTouches) {
			var oE = e.originalEvent,
				diff = startX - (oE.pageX || oE.changedTouches[0].pageX);

			if(diff > 20) {
				mfp.next();
			} else if(diff < -20) {
				mfp.prev();
			}
		}
	});
},
*/


/*>>gallery*/

/*>>retina*/

var RETINA_NS = 'retina';

$.magnificPopup.registerModule(RETINA_NS, {
	options: {
		replaceSrc: function(item) {
			return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
		},
		ratio: 1 // Function or number.  Set to 1 to disable.
	},
	proto: {
		initRetina: function() {
			if(window.devicePixelRatio > 1) {

				var st = mfp.st.retina,
					ratio = st.ratio;

				ratio = !isNaN(ratio) ? ratio : ratio();

				if(ratio > 1) {
					_mfpOn('ImageHasSize' + '.' + RETINA_NS, function(e, item) {
						item.img.css({
							'max-width': item.img[0].naturalWidth / ratio,
							'width': '100%'
						});
					});
					_mfpOn('ElementParse' + '.' + RETINA_NS, function(e, item) {
						item.src = st.replaceSrc(item, ratio);
					});
				}
			}

		}
	}
});

/*>>retina*/

/*>>fastclick*/
/**
 * FastClick event implementation. (removes 300ms delay on touch devices)
 * Based on https://developers.google.com/mobile/articles/fast_buttons
 *
 * You may use it outside the Magnific Popup by calling just:
 *
 * $('.your-el').mfpFastClick(function() {
 *     console.log('Clicked!');
 * });
 *
 * To unbind:
 * $('.your-el').destroyMfpFastClick();
 * 
 * 
 * Note that it's a very basic and simple implementation, it blocks ghost click on the same element where it was bound.
 * If you need something more advanced, use plugin by FT Labs https://github.com/ftlabs/fastclick
 * 
 */

(function() {
	var ghostClickDelay = 1000,
		supportsTouch = 'ontouchstart' in window,
		unbindTouchMove = function() {
			_window.off('touchmove'+ns+' touchend'+ns);
		},
		eName = 'mfpFastClick',
		ns = '.'+eName;


	// As Zepto.js doesn't have an easy way to add custom events (like jQuery), so we implement it in this way
	$.fn.mfpFastClick = function(callback) {

		return $(this).each(function() {

			var elem = $(this),
				lock;

			if( supportsTouch ) {

				var timeout,
					startX,
					startY,
					pointerMoved,
					point,
					numPointers;

				elem.on('touchstart' + ns, function(e) {
					pointerMoved = false;
					numPointers = 1;

					point = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0];
					startX = point.clientX;
					startY = point.clientY;

					_window.on('touchmove'+ns, function(e) {
						point = e.originalEvent ? e.originalEvent.touches : e.touches;
						numPointers = point.length;
						point = point[0];
						if (Math.abs(point.clientX - startX) > 10 ||
							Math.abs(point.clientY - startY) > 10) {
							pointerMoved = true;
							unbindTouchMove();
						}
					}).on('touchend'+ns, function(e) {
						unbindTouchMove();
						if(pointerMoved || numPointers > 1) {
							return;
						}
						lock = true;
						e.preventDefault();
						clearTimeout(timeout);
						timeout = setTimeout(function() {
							lock = false;
						}, ghostClickDelay);
						callback();
					});
				});

			}

			elem.on('click' + ns, function() {
				if(!lock) {
					callback();
				}
			});
		});
	};

	$.fn.destroyMfpFastClick = function() {
		$(this).off('touchstart' + ns + ' click' + ns);
		if(supportsTouch) _window.off('touchmove'+ns+' touchend'+ns);
	};
})();

/*>>fastclick*/
 _checkInstance(); })(window.jQuery || window.Zepto);
/**
 * jquery.purr.js
 * Copyright (c) 2008 Net Perspective (net-perspective.com)
 * Licensed under the MIT License (http://www.opensource.org/licenses/mit-license.php)
 * 
 * @author R.A. Ray
 * @projectDescription	jQuery plugin for dynamically displaying unobtrusive messages in the browser. Mimics the behavior of the MacOS program "Growl."
 * @version 0.1.0
 * 
 * @requires jquery.js (tested with 1.2.6)
 * 
 * @param fadeInSpeed 					int - Duration of fade in animation in miliseconds
 * 													default: 500
 *	@param fadeOutSpeed  				int - Duration of fade out animationin miliseconds
 														default: 500
 *	@param removeTimer  				int - Timeout, in miliseconds, before notice is removed once it is the top non-sticky notice in the list
 														default: 4000
 *	@param isSticky 						bool - Whether the notice should fade out on its own or wait to be manually closed
 														default: false
 *	@param usingTransparentPNG 	bool - Whether or not the notice is using transparent .png images in its styling
 														default: false
 */


( function( $ ) {
	
	$.purr = function ( notice, options )
	{ 
		// Convert notice to a jQuery object
		notice = $( notice );
		
		// Add a class to denote the notice as not sticky
		if ( !options.isSticky )
		{
			notice.addClass( 'not-sticky' );
		};
		
		// Get the container element from the page
		var cont = document.getElementById( 'purr-container' );
		
		// If the container doesn't yet exist, we need to create it
		if ( !cont )
		{
			cont = '<div id="purr-container"></div>';
		}
		
		// Convert cont to a jQuery object
		cont = $( cont );
		
		// Add the container to the page
		$( 'body' ).append( cont );
			
		notify();

		function notify ()
		{	
			// Set up the close button
			var close = document.createElement( 'a' );
			$( close ).attr(	
				{
					className: 'close',
					href: '#close',
					innerHTML: 'Close'
				}
			)
				.appendTo( notice )
					.click( function ()
						{
							removeNotice();
							
							return false;
						}
					);
			
			// Add the notice to the page and keep it hidden initially
			notice.appendTo( cont )
				.hide();
				
			if ( jQuery.browser.msie && options.usingTransparentPNG )
			{
				// IE7 and earlier can't handle the combination of opacity and transparent pngs, so if we're using transparent pngs in our
				// notice style, we'll just skip the fading in.
				notice.show();
			}
			else
			{
				//Fade in the notice we just added
				notice.fadeIn( options.fadeInSpeed );
			}
			
			// Set up the removal interval for the added notice if that notice is not a sticky
			if ( !options.isSticky )
			{
				var topSpotInt = setInterval( function ()
				{
					// Check to see if our notice is the first non-sticky notice in the list
					if ( notice.prevAll( '.not-sticky' ).length == 0 )
					{ 
						// Stop checking once the condition is met
						clearInterval( topSpotInt );
						
						// Call the close action after the timeout set in options
						setTimeout( function ()
							{
								removeNotice();
							}, options.removeTimer
						);
					}
				}, 200 );	
			}
		}

		function removeNotice ()
		{
			// IE7 and earlier can't handle the combination of opacity and transparent pngs, so if we're using transparent pngs in our
			// notice style, we'll just skip the fading out.
			if ( jQuery.browser.msie && options.usingTransparentPNG )
			{
				notice.css( { opacity: 0	} )
					.animate( 
						{ 
							height: '0px' 
						}, 
						{ 
							duration: options.fadeOutSpeed, 
							complete:  function ()
								{
									notice.remove();
								} 
							} 
					);
			}
			else
			{
				// Fade the object out before reducing its height to produce the sliding effect
				notice.animate( 
					{ 
						opacity: '0'
					}, 
					{ 
						duration: options.fadeOutSpeed, 
						complete: function () 
							{
								notice.animate(
									{
										height: '0px'
									},
									{
										duration: options.fadeOutSpeed,
										complete: function ()
											{
												notice.remove();
											}
									}
								);
							}
					} 
				);
			}
		};
	};
	
	$.fn.purr = function ( options )
	{
		options = options || {};
		options.fadeInSpeed = options.fadeInSpeed || 500;
		options.fadeOutSpeed = options.fadeOutSpeed || 500;
		options.removeTimer = options.removeTimer || 4000;
		options.isSticky = options.isSticky || false;
		options.usingTransparentPNG = options.usingTransparentPNG || false;
		
		this.each( function() 
			{
				new $.purr( this, options );
			}
		);
		
		return this;
	};
})( jQuery );

/*!
	Autosize v1.18.9 - 2014-05-27
	Automatically adjust textarea height based on user input.
	(c) 2014 Jack Moore - http://www.jacklmoore.com/autosize
	license: http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {
    'use strict';
	var	defaults = {
		className: 'autosizejs',
		id: 'autosizejs',
		append: '\n',
		callback: false,
		resizeDelay: 10,
		placeholder: true
	},

	// border:0 is unnecessary, but avoids a bug in Firefox on OSX
	copy = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',

	// line-height is conditionally included because IE7/IE8/old Opera do not return the correct value.
	typographyStyles = [
		'fontFamily',
		'fontSize',
		'fontWeight',
		'fontStyle',
		'letterSpacing',
		'textTransform',
		'wordSpacing',
		'textIndent'
	],

	// to keep track which textarea is being mirrored when adjust() is called.
	mirrored,

	// the mirror element, which is used to calculate what size the mirrored element should be.
	mirror = $(copy).data('autosize', true)[0];

	// test that line-height can be accurately copied.
	mirror.style.lineHeight = '99px';
	if ($(mirror).css('lineHeight') === '99px') {
		typographyStyles.push('lineHeight');
	}
	mirror.style.lineHeight = '';

	$.fn.autosize = function (options) {
		if (!this.length) {
			return this;
		}

		options = $.extend({}, defaults, options || {});

		if (mirror.parentNode !== document.body) {
			$(document.body).append(mirror);
		}

		return this.each(function () {
			var
			ta = this,
			$ta = $(ta),
			maxHeight,
			minHeight,
			boxOffset = 0,
			callback = $.isFunction(options.callback),
			originalStyles = {
				height: ta.style.height,
				overflow: ta.style.overflow,
				overflowY: ta.style.overflowY,
				wordWrap: ta.style.wordWrap,
				resize: ta.style.resize
			},
			timeout,
			width = $ta.width(),
			taResize = $ta.css('resize');

			if ($ta.data('autosize')) {
				// exit if autosize has already been applied, or if the textarea is the mirror element.
				return;
			}
			$ta.data('autosize', true);

			if ($ta.css('box-sizing') === 'border-box' || $ta.css('-moz-box-sizing') === 'border-box' || $ta.css('-webkit-box-sizing') === 'border-box'){
				boxOffset = $ta.outerHeight() - $ta.height();
			}

			// IE8 and lower return 'auto', which parses to NaN, if no min-height is set.
			minHeight = Math.max(parseInt($ta.css('minHeight'), 10) - boxOffset || 0, $ta.height());

			$ta.css({
				overflow: 'hidden',
				overflowY: 'hidden',
				wordWrap: 'break-word' // horizontal overflow is hidden, so break-word is necessary for handling words longer than the textarea width
			});

			if (taResize === 'vertical') {
				$ta.css('resize','none');
			} else if (taResize === 'both') {
				$ta.css('resize', 'horizontal');
			}

			// The mirror width must exactly match the textarea width, so using getBoundingClientRect because it doesn't round the sub-pixel value.
			// window.getComputedStyle, getBoundingClientRect returning a width are unsupported, but also unneeded in IE8 and lower.
			function setWidth() {
				var width;
				var style = window.getComputedStyle ? window.getComputedStyle(ta, null) : false;
				
				if (style) {

					width = ta.getBoundingClientRect().width;

					if (width === 0 || typeof width !== 'number') {
						width = parseInt(style.width,10);
					}

					$.each(['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'], function(i,val){
						width -= parseInt(style[val],10);
					});
				} else {
					width = $ta.width();
				}

				mirror.style.width = Math.max(width,0) + 'px';
			}

			function initMirror() {
				var styles = {};

				mirrored = ta;
				mirror.className = options.className;
				mirror.id = options.id;
				maxHeight = parseInt($ta.css('maxHeight'), 10);

				// mirror is a duplicate textarea located off-screen that
				// is automatically updated to contain the same text as the
				// original textarea.  mirror always has a height of 0.
				// This gives a cross-browser supported way getting the actual
				// height of the text, through the scrollTop property.
				$.each(typographyStyles, function(i,val){
					styles[val] = $ta.css(val);
				});
				
				$(mirror).css(styles).attr('wrap', $ta.attr('wrap'));

				setWidth();

				// Chrome-specific fix:
				// When the textarea y-overflow is hidden, Chrome doesn't reflow the text to account for the space
				// made available by removing the scrollbar. This workaround triggers the reflow for Chrome.
				if (window.chrome) {
					var width = ta.style.width;
					ta.style.width = '0px';
					var ignore = ta.offsetWidth;
					ta.style.width = width;
				}
			}

			// Using mainly bare JS in this function because it is going
			// to fire very often while typing, and needs to very efficient.
			function adjust() {
				var height, original;

				if (mirrored !== ta) {
					initMirror();
				} else {
					setWidth();
				}

				if (!ta.value && options.placeholder) {
					// If the textarea is empty, copy the placeholder text into 
					// the mirror control and use that for sizing so that we 
					// don't end up with placeholder getting trimmed.
					mirror.value = ($ta.attr("placeholder") || '') + options.append;
				} else {
					mirror.value = ta.value + options.append;
				}

				mirror.style.overflowY = ta.style.overflowY;
				original = parseInt(ta.style.height,10);

				// Setting scrollTop to zero is needed in IE8 and lower for the next step to be accurately applied
				mirror.scrollTop = 0;

				mirror.scrollTop = 9e4;

				// Using scrollTop rather than scrollHeight because scrollHeight is non-standard and includes padding.
				height = mirror.scrollTop;

				if (maxHeight && height > maxHeight) {
					ta.style.overflowY = 'scroll';
					height = maxHeight;
				} else {
					ta.style.overflowY = 'hidden';
					if (height < minHeight) {
						height = minHeight;
					}
				}

				height += boxOffset;

				if (original !== height) {
					ta.style.height = height + 'px';
					if (callback) {
						options.callback.call(ta,ta);
					}
				}
			}

			function resize () {
				clearTimeout(timeout);
				timeout = setTimeout(function(){
					var newWidth = $ta.width();

					if (newWidth !== width) {
						width = newWidth;
						adjust();
					}
				}, parseInt(options.resizeDelay,10));
			}

			if ('onpropertychange' in ta) {
				if ('oninput' in ta) {
					// Detects IE9.  IE9 does not fire onpropertychange or oninput for deletions,
					// so binding to onkeyup to catch most of those occasions.  There is no way that I
					// know of to detect something like 'cut' in IE9.
					$ta.on('input.autosize keyup.autosize', adjust);
				} else {
					// IE7 / IE8
					$ta.on('propertychange.autosize', function(){
						if(event.propertyName === 'value'){
							adjust();
						}
					});
				}
			} else {
				// Modern Browsers
				$ta.on('input.autosize', adjust);
			}

			// Set options.resizeDelay to false if using fixed-width textarea elements.
			// Uses a timeout and width check to reduce the amount of times adjust needs to be called after window resize.

			if (options.resizeDelay !== false) {
				$(window).on('resize.autosize', resize);
			}

			// Event for manual triggering if needed.
			// Should only be needed when the value of the textarea is changed through JavaScript rather than user input.
			$ta.on('autosize.resize', adjust);

			// Event for manual triggering that also forces the styles to update as well.
			// Should only be needed if one of typography styles of the textarea change, and the textarea is already the target of the adjust method.
			$ta.on('autosize.resizeIncludeStyle', function() {
				mirrored = null;
				adjust();
			});

			$ta.on('autosize.destroy', function(){
				mirrored = null;
				clearTimeout(timeout);
				$(window).off('resize', resize);
				$ta
					.off('autosize')
					.off('.autosize')
					.css(originalStyles)
					.removeData('autosize');
			});

			// Call adjust in case the textarea already contains text.
			adjust();
		});
	};
}(window.jQuery || window.$)); // jQuery or jQuery-like library, such as Zepto
;
/*
 * BestInPlace (for jQuery)
 * version: 3.0.0.alpha (2014)
 *
 * By Bernat Farrero based on the work of Jan Varwig.
 * Examples at http://bernatfarrero.com
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @requires jQuery
 *
 * Usage:
 *
 * Attention.
 * The format of the JSON object given to the select inputs is the following:
 * [["key", "value"],["key", "value"]]
 * The format of the JSON object given to the checkbox inputs is the following:
 * ["falseValue", "trueValue"]

 */


function BestInPlaceEditor(e) {
    'use strict';
    this.element = e;
    this.initOptions();
    this.bindForm();
    this.initPlaceHolder();
    jQuery(this.activator).bind('click', {editor: this}, this.clickHandler);
}

BestInPlaceEditor.prototype = {
    // Public Interface Functions //////////////////////////////////////////////

    activate: function () {
        'use strict';
        var to_display;
        if (this.isPlaceHolder()) {
            to_display = "";
        } else if (this.original_content) {
            to_display = this.original_content;
        } else {
            switch (this.formType) {
                case 'input':
                case 'textarea':
                    if (this.display_raw) {
                        to_display = this.element.html().replace(/&amp;/gi, '&');
                    }
                    else {
                        var value = this.element.data('bipValue');
                        if (typeof value === 'undefined') {
                            to_display = '';
                        } else if (typeof value === 'string') {
                            to_display = this.element.data('bipValue').replace(/&amp;/gi, '&');
                        } else {
                            to_display = this.element.data('bipValue');
                        }
                    }
                    break;
                case 'select':
                    to_display = this.element.html();

            }
        }

        this.oldValue = this.isPlaceHolder() ? "" : this.element.html();
        this.display_value = to_display;
        jQuery(this.activator).unbind("click", this.clickHandler);
        this.activateForm();
        this.element.trigger(jQuery.Event("best_in_place:activate"));
    },

    abort: function () {
        'use strict';
        this.activateText(this.oldValue);
        jQuery(this.activator).bind('click', {editor: this}, this.clickHandler);
        this.element.trigger(jQuery.Event("best_in_place:abort"));
        this.element.trigger(jQuery.Event("best_in_place:deactivate"));
    },

    abortIfConfirm: function () {
        'use strict';
        if (!this.useConfirm) {
            this.abort();
            return;
        }

        if (confirm(BestInPlaceEditor.defaults.locales[''].confirmMessage)) {
            this.abort();
        }
    },

    update: function () {
        'use strict';
        var editor = this,
            value = this.getValue();

        // Avoid request if no change is made
        if (this.formType in {"input": 1, "textarea": 1} && value === this.oldValue) {
            this.abort();
            return true;
        }

        editor.ajax({
            "type": BestInPlaceEditor.defaults.ajaxMethod,
            "dataType": BestInPlaceEditor.defaults.ajaxDataType,
            "data": editor.requestData(),
            "success": function (data, status, xhr) {
                editor.loadSuccessCallback(data, status, xhr);
            },
            "error": function (request, error) {
                editor.loadErrorCallback(request, error);
            }
        });


        switch (this.formType) {
            case "select":
                this.previousCollectionValue = value;

                // search for the text for the span
                $.each(this.values, function(index, arr){ if (String(arr[0]) === String(value)) editor.element.html(arr[1]); });
                break;

            case "checkbox":
                $.each(this.values, function(index, arr){ if (String(arr[0]) === String(value)) editor.element.html(arr[1]); });
                break;

            default:
                if (value !== "") {
                    if (this.display_raw) {
                        editor.element.html(value);
                    } else {
                        editor.element.text(value);
                    }
                } else {
                    editor.element.html(this.placeHolder);
                }
        }

        editor.element.data('bipValue', value);
        editor.element.attr('data-bip-value', value);

        editor.element.trigger(jQuery.Event("best_in_place:update"));


    },

    activateForm: function () {
        'use strict';
        alert(BestInPlaceEditor.defaults.locales[''].uninitializedForm);
    },

    activateText: function (value) {
        'use strict';
        this.element.html(value);
        if (this.isPlaceHolder()) {
            this.element.html(this.placeHolder);
        }
    },

    // Helper Functions ////////////////////////////////////////////////////////

    initOptions: function () {
        // Try parent supplied info
        'use strict';
        var self = this;
        self.element.parents().each(function () {
            var $parent = jQuery(this);
            self.url = self.url || $parent.data("bipUrl");
            self.activator = self.activator || $parent.data("bipActivator");
            self.okButton = self.okButton || $parent.data("bipOkButton");
            self.okButtonClass = self.okButtonClass || $parent.data("bipOkButtonClass");
            self.cancelButton = self.cancelButton || $parent.data("bipCancelButton");
            self.cancelButtonClass = self.cancelButtonClass || $parent.data("bipCancelButtonClass");
            self.skipBlur = self.skipBlur || $parent.data("bipSkipBlur");
        });

        // Load own attributes (overrides all others)
        self.url = self.element.data("bipUrl") || self.url || document.location.pathname;
        self.collection = self.element.data("bipCollection") || self.collection;
        self.formType = self.element.data("bipType") || "input";
        self.objectName = self.element.data("bipObject") || self.objectName;
        self.attributeName = self.element.data("bipAttribute") || self.attributeName;
        self.activator = self.element.data("bipActivator") || self.element;
        self.okButton = self.element.data("bipOkButton") || self.okButton;
        self.okButtonClass = self.element.data("bipOkButtonClass") || self.okButtonClass || BestInPlaceEditor.defaults.okButtonClass;
        self.cancelButton = self.element.data("bipCancelButton") || self.cancelButton;
        self.cancelButtonClass = self.element.data("bipCancelButtonClass") || self.cancelButtonClass || BestInPlaceEditor.defaults.cancelButtonClass;
        self.skipBlur = self.element.data("bipSkipBlur") || self.skipBlur || BestInPlaceEditor.defaults.skipBlur;

        // Fix for default values of 0
        if (self.element.data("bipPlaceholder") == null) {
          self.placeHolder = BestInPlaceEditor.defaults.locales[''].placeHolder;
        } else {
          self.placeHolder = self.element.data("bipPlaceholder");
        }

        self.inner_class = self.element.data("bipInnerClass");
        self.html_attrs = self.element.data("bipHtmlAttrs");
        self.original_content = self.element.data("bipOriginalContent") || self.original_content;

        // if set the input won't be satinized
        self.display_raw = self.element.data("bip-raw");

        self.useConfirm = self.element.data("bip-confirm");

        if (self.formType === "select" || self.formType === "checkbox") {
            self.values = self.collection;
            self.collectionValue = self.element.data("bipValue") || self.collectionValue;
        }
    },

    bindForm: function () {
        'use strict';
        this.activateForm = BestInPlaceEditor.forms[this.formType].activateForm;
        this.getValue = BestInPlaceEditor.forms[this.formType].getValue;
    },


    initPlaceHolder: function () {
        'use strict';
        // TODO add placeholder for select and checkbox
        if (this.element.html() === "") {
            this.element.html(this.placeHolder);
        }
    },

    isPlaceHolder: function () {
        'use strict';
        // TODO: It only work when form is deactivated.
        // Condition will fail when form is activated
        return this.element.html() === "" || this.element.html() === this.placeHolder;
    },

    getValue: function () {
        'use strict';
        alert(BestInPlaceEditor.defaults.locales[''].uninitializedForm);
    },

    // Trim and Strips HTML from text
    sanitizeValue: function (s) {
        'use strict';
        return jQuery.trim(s);
    },

    /* Generate the data sent in the POST request */
    requestData: function () {
        'use strict';
        // To prevent xss attacks, a csrf token must be defined as a meta attribute
        var csrf_token = jQuery('meta[name=csrf-token]').attr('content'),
            csrf_param = jQuery('meta[name=csrf-param]').attr('content');

        var data = "_method=" + BestInPlaceEditor.defaults.ajaxMethod;
        data += "&" + this.objectName + '[' + this.attributeName + ']=' + encodeURIComponent(this.getValue());

        if (csrf_param !== undefined && csrf_token !== undefined) {
            data += "&" + csrf_param + "=" + encodeURIComponent(csrf_token);
        }
        return data;
    },

    ajax: function (options) {
        'use strict';
        options.url = this.url;
        options.beforeSend = function (xhr) {
            xhr.setRequestHeader("Accept", "application/json");
        };
        return jQuery.ajax(options);
    },

    // Handlers ////////////////////////////////////////////////////////////////

    loadSuccessCallback: function (data, status, xhr) {
        'use strict';
        data = jQuery.trim(data);
        //Update original content with current text.
        if (this.display_raw) {
          this.original_content = this.element.html();
        } else {
          this.original_content = this.element.text();
        }

        if (data && data !== "") {
            var response = jQuery.parseJSON(data);
            if (response !== null && response.hasOwnProperty("display_as")) {
                this.element.data('bip-original-content', this.element.text());
                this.element.html(response.display_as);
            }
        }

        this.element.trigger(jQuery.Event("best_in_place:success"), [data, status, xhr]);
        this.element.trigger(jQuery.Event("ajax:success"), [data, status, xhr]);

        // Binding back after being clicked
        jQuery(this.activator).bind('click', {editor: this}, this.clickHandler);
        this.element.trigger(jQuery.Event("best_in_place:deactivate"));

        if (this.collectionValue !== null && this.formType === "select") {
            this.collectionValue = this.previousCollectionValue;
            this.previousCollectionValue = null;
        }
    },

    loadErrorCallback: function (request, error) {
        'use strict';
        this.activateText(this.oldValue);

        this.element.trigger(jQuery.Event("best_in_place:error"), [request, error]);
        this.element.trigger(jQuery.Event("ajax:error"), request, error);

        // Binding back after being clicked
        jQuery(this.activator).bind('click', {editor: this}, this.clickHandler);
        this.element.trigger(jQuery.Event("best_in_place:deactivate"));
    },

    clickHandler: function (event) {
        'use strict';
        event.preventDefault();
        event.data.editor.activate();
    },

    setHtmlAttributes: function () {
        'use strict';
        var formField = this.element.find(this.formType);

        if (this.html_attrs) {
            var attrs = this.html_attrs;
            $.each(attrs, function (key, val) {
                formField.attr(key, val);
            });
        }
    },

    placeButtons: function (output, field) {
        'use strict';
        if (field.okButton) {
            output.append(
                jQuery(document.createElement('input'))
                    .attr('type', 'submit')
                    .attr('class', field.okButtonClass)
                    .attr('value', field.okButton)
            );
        }
        if (field.cancelButton) {
            output.append(
                jQuery(document.createElement('input'))
                    .attr('type', 'button')
                    .attr('class', field.cancelButtonClass)
                    .attr('value', field.cancelButton)
            );
        }
    }
};


// Button cases:
// If no buttons, then blur saves, ESC cancels
// If just Cancel button, then blur saves, ESC or clicking Cancel cancels (careful of blur event!)
// If just OK button, then clicking OK saves (careful of blur event!), ESC or blur cancels
// If both buttons, then clicking OK saves, ESC or clicking Cancel or blur cancels
BestInPlaceEditor.forms = {
    "input": {
        activateForm: function () {
            'use strict';
            var output = jQuery(document.createElement('form'))
                .addClass('form_in_place')
                .attr('action', 'javascript:void(0);')
                .attr('style', 'display:inline');
            var input_elt = jQuery(document.createElement('input'))
                .attr('type', 'text')
                .attr('name', this.attributeName)
                .val(this.display_value);

            // Add class to form input
            if (this.inner_class) {
                input_elt.addClass(this.inner_class);
            }

            output.append(input_elt);
            this.placeButtons(output, this);

            this.element.html(output);
            this.setHtmlAttributes();

            this.element.find("input[type='text']")[0].select();
            this.element.find("form").bind('submit', {editor: this}, BestInPlaceEditor.forms.input.submitHandler);
            if (this.cancelButton) {
                this.element.find("input[type='button']").bind('click', {editor: this}, BestInPlaceEditor.forms.input.cancelButtonHandler);
            }
            if (!this.okButton) {
                this.element.find("input[type='text']").bind('blur', {editor: this}, BestInPlaceEditor.forms.input.inputBlurHandler);
            }
            this.element.find("input[type='text']").bind('keyup', {editor: this}, BestInPlaceEditor.forms.input.keyupHandler);
            this.blurTimer = null;
            this.userClicked = false;
        },

        getValue: function () {
            'use strict';
            return this.sanitizeValue(this.element.find("input").val());
        },

        // When buttons are present, use a timer on the blur event to give precedence to clicks
        inputBlurHandler: function (event) {
            'use strict';
            if (event.data.editor.okButton) {
                event.data.editor.blurTimer = setTimeout(function () {
                    if (!event.data.editor.userClicked) {
                        event.data.editor.abort();
                    }
                }, 500);
            } else {
                if (event.data.editor.cancelButton) {
                    event.data.editor.blurTimer = setTimeout(function () {
                        if (!event.data.editor.userClicked) {
                            event.data.editor.update();
                        }
                    }, 500);
                } else {
                    event.data.editor.update();
                }
            }
        },

        submitHandler: function (event) {
            'use strict';
            event.data.editor.userClicked = true;
            clearTimeout(event.data.editor.blurTimer);
            event.data.editor.update();
        },

        cancelButtonHandler: function (event) {
            'use strict';
            event.data.editor.userClicked = true;
            clearTimeout(event.data.editor.blurTimer);
            event.data.editor.abort();
            event.stopPropagation(); // Without this, click isn't handled
        },

        keyupHandler: function (event) {
            'use strict';
            if (event.keyCode === 27) {
                event.data.editor.abort();
                event.stopImmediatePropagation();
            }
        }
    },

    "select": {
        activateForm: function () {
            'use strict';
            var output = jQuery(document.createElement('form'))
                    .attr('action', 'javascript:void(0)')
                    .attr('style', 'display:inline'),
                selected = '',
                select_elt = jQuery(document.createElement('select'))
                    .attr('class', this.inner_class !== null ? this.inner_class : ''),
                currentCollectionValue = this.collectionValue,
                key, value,
                a = this.values;

            $.each(a, function(index, arr){
                key = arr[0];
                value = arr[1];
                var option_elt = jQuery(document.createElement('option'))
                    .val(key)
                    .html(value);
                if (String(key) === String(currentCollectionValue)) option_elt.attr('selected', 'selected');
                select_elt.append(option_elt);
            });
            output.append(select_elt);

            this.element.html(output);
            this.setHtmlAttributes();
            this.element.find("select").bind('change', {editor: this}, BestInPlaceEditor.forms.select.blurHandler);
            this.element.find("select").bind('blur', {editor: this}, BestInPlaceEditor.forms.select.blurHandler);
            this.element.find("select").bind('keyup', {editor: this}, BestInPlaceEditor.forms.select.keyupHandler);
            this.element.find("select")[0].focus();

            // automatically click on the select so you
            // don't have to click twice
            try {
              var e = document.createEvent("MouseEvents");
              e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
              this.element.find("select")[0].dispatchEvent(e);
            }
            catch(e) {
              // browser doesn't support this, e.g. IE8
            }
        },

        getValue: function () {
            'use strict';
            return this.sanitizeValue(this.element.find("select").val());
        },

        blurHandler: function (event) {
            'use strict';
            event.data.editor.update();
        },

        keyupHandler: function (event) {
            'use strict';
            if (event.keyCode === 27) {
                event.data.editor.abort();
            }
        }
    },

    "checkbox": {
        activateForm: function () {
            'use strict';
            this.collectionValue = !this.getValue();
            this.setHtmlAttributes();
            this.update();
        },

        getValue: function () {
            'use strict';
            return this.collectionValue;
        }
    },

    "textarea": {
        activateForm: function () {
            'use strict';
            // grab width and height of text
            var width = this.element.css('width');
            var height = this.element.css('height');

            // construct form
            var output = jQuery(document.createElement('form'))
                .addClass('form_in_place')
                .attr('action', 'javascript:void(0);')
                .attr('style', 'display:inline');
            var textarea_elt = jQuery(document.createElement('textarea'))
                .attr('name', this.attributeName)
                .val(this.sanitizeValue(this.display_value));

            if (this.inner_class !== null) {
                textarea_elt.addClass(this.inner_class);
            }

            output.append(textarea_elt);

            this.placeButtons(output, this);

            this.element.html(output);
            this.setHtmlAttributes();

            // set width and height of textarea
            jQuery(this.element.find("textarea")[0]).css({'min-width': width, 'min-height': height});
            jQuery(this.element.find("textarea")[0]).autosize();

            this.element.find("textarea")[0].focus();
            this.element.find("form").bind('submit', {editor: this}, BestInPlaceEditor.forms.textarea.submitHandler);

            if (this.cancelButton) {
                this.element.find("input[type='button']").bind('click', {editor: this}, BestInPlaceEditor.forms.textarea.cancelButtonHandler);
            }

            if (!this.skipBlur) {
                this.element.find("textarea").bind('blur', {editor: this}, BestInPlaceEditor.forms.textarea.blurHandler);
            }
            this.element.find("textarea").bind('keyup', {editor: this}, BestInPlaceEditor.forms.textarea.keyupHandler);
            this.blurTimer = null;
            this.userClicked = false;
        },

        getValue: function () {
            'use strict';
            return this.sanitizeValue(this.element.find("textarea").val());
        },

        // When buttons are present, use a timer on the blur event to give precedence to clicks
        blurHandler: function (event) {
            'use strict';
            if (event.data.editor.okButton) {
                event.data.editor.blurTimer = setTimeout(function () {
                    if (!event.data.editor.userClicked) {
                        event.data.editor.abortIfConfirm();
                    }
                }, 500);
            } else {
                if (event.data.editor.cancelButton) {
                    event.data.editor.blurTimer = setTimeout(function () {
                        if (!event.data.editor.userClicked) {
                            event.data.editor.update();
                        }
                    }, 500);
                } else {
                    event.data.editor.update();
                }
            }
        },

        submitHandler: function (event) {
            'use strict';
            event.data.editor.userClicked = true;
            clearTimeout(event.data.editor.blurTimer);
            event.data.editor.update();
        },

        cancelButtonHandler: function (event) {
            'use strict';
            event.data.editor.userClicked = true;
            clearTimeout(event.data.editor.blurTimer);
            event.data.editor.abortIfConfirm();
            event.stopPropagation(); // Without this, click isn't handled
        },

        keyupHandler: function (event) {
            'use strict';
            if (event.keyCode === 27) {
                event.data.editor.abortIfConfirm();
            }
        }
    }
};

BestInPlaceEditor.defaults = {
    locales: {},
    ajaxMethod: "put",  //TODO Change to patch when support to 3.2 is dropped
    ajaxDataType: 'text',
    okButtonClass: '',
    cancelButtonClass: '',
    skipBlur: false
};

// Default locale
BestInPlaceEditor.defaults.locales[''] = {
    confirmMessage: "Are you sure you want to discard your changes?",
    uninitializedForm: "The form was not properly initialized. getValue is unbound",
    placeHolder: '-'
};

jQuery.fn.best_in_place = function () {
    'use strict';
    function setBestInPlace(element) {
        if (!element.data('bestInPlaceEditor')) {
            element.data('bestInPlaceEditor', new BestInPlaceEditor(element));
            return true;
        }
    }

    jQuery(this.context).delegate(this.selector, 'click', function () {
        var el = jQuery(this);
        if (setBestInPlace(el)) {
            el.click();
        }
    });

    this.each(function () {
        setBestInPlace(jQuery(this));
    });

    return this;
};



/*!
 * Copyright (c) 2011 Simo Kinnunen.
 * Licensed under the MIT license.
 *
 * @version ${Version}
 */


var Cufon = (function() {

	var api = function() {
		return api.replace.apply(null, arguments);
	};

	var DOM = api.DOM = {

		ready: (function() {

			var complete = false, readyStatus = { loaded: 1, complete: 1 };

			var queue = [], perform = function() {
				if (complete) return;
				complete = true;
				for (var fn; fn = queue.shift(); fn());
			};

			// Gecko, Opera, WebKit r26101+

			if (document.addEventListener) {
				document.addEventListener('DOMContentLoaded', perform, false);
				window.addEventListener('pageshow', perform, false); // For cached Gecko pages
			}

			// Old WebKit, Internet Explorer

			if (!window.opera && document.readyState) (function() {
				readyStatus[document.readyState] ? perform() : setTimeout(arguments.callee, 10);
			})();

			// Internet Explorer

			if (document.readyState && document.createStyleSheet) (function() {
				try {
					document.body.doScroll('left');
					perform();
				}
				catch (e) {
					setTimeout(arguments.callee, 1);
				}
			})();

			addEvent(window, 'load', perform); // Fallback

			return function(listener) {
				if (!arguments.length) perform();
				else complete ? listener() : queue.push(listener);
			};

		})(),

		root: function() {
			return document.documentElement || document.body;
		},

		strict: (function() {
			var doctype;
			// no doctype (doesn't always catch it though.. IE I'm looking at you)
			if (document.compatMode == 'BackCompat') return false;
			// WebKit, Gecko, Opera, IE9+
			doctype = document.doctype;
			if (doctype) {
				return !/frameset|transitional/i.test(doctype.publicId);
			}
			// IE<9, firstChild is the doctype even if there's an XML declaration
			doctype = document.firstChild;
			if (doctype.nodeType != 8 || /^DOCTYPE.+(transitional|frameset)/i.test(doctype.data)) {
				return false;
			}
			return true;
		})()

	};

	var CSS = api.CSS = {

		Size: function(value, base) {

			this.value = parseFloat(value);
			this.unit = String(value).match(/[a-z%]*$/)[0] || 'px';

			this.convert = function(value) {
				return value / base * this.value;
			};

			this.convertFrom = function(value) {
				return value / this.value * base;
			};

			this.toString = function() {
				return this.value + this.unit;
			};

		},

		addClass: function(el, className) {
			var current = el.className;
			el.className = current + (current && ' ') + className;
			return el;
		},

		color: cached(function(value) {
			var parsed = {};
			parsed.color = value.replace(/^rgba\((.*?),\s*([\d.]+)\)/, function($0, $1, $2) {
				parsed.opacity = parseFloat($2);
				return 'rgb(' + $1 + ')';
			});
			return parsed;
		}),

		// has no direct CSS equivalent.
		// @see http://msdn.microsoft.com/en-us/library/system.windows.fontstretches.aspx
		fontStretch: cached(function(value) {
			if (typeof value == 'number') return value;
			if (/%$/.test(value)) return parseFloat(value) / 100;
			return {
				'ultra-condensed': 0.5,
				'extra-condensed': 0.625,
				condensed: 0.75,
				'semi-condensed': 0.875,
				'semi-expanded': 1.125,
				expanded: 1.25,
				'extra-expanded': 1.5,
				'ultra-expanded': 2
			}[value] || 1;
		}),

		getStyle: function(el) {
			var view = document.defaultView;
			if (view && view.getComputedStyle) return new Style(view.getComputedStyle(el, null));
			if (el.currentStyle) return new Style(el.currentStyle);
			return new Style(el.style);
		},

		gradient: cached(function(value) {
			var gradient = {
				id: value,
				type: value.match(/^-([a-z]+)-gradient\(/)[1],
				stops: []
			}, colors = value.substr(value.indexOf('(')).match(/([\d.]+=)?(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)/ig);
			for (var i = 0, l = colors.length, stop; i < l; ++i) {
				stop = colors[i].split('=', 2).reverse();
				gradient.stops.push([ stop[1] || i / (l - 1), stop[0] ]);
			}
			return gradient;
		}),

		quotedList: cached(function(value) {
			// doesn't work properly with empty quoted strings (""), but
			// it's not worth the extra code.
			var list = [], re = /\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g, match;
			while (match = re.exec(value)) list.push(match[3] || match[1]);
			return list;
		}),

		recognizesMedia: cached(function(media) {
			var el = document.createElement('style'), sheet, container, supported;
			el.type = 'text/css';
			el.media = media;
			try { // this is cached anyway
				el.appendChild(document.createTextNode('/**/'));
			} catch (e) {}
			container = elementsByTagName('head')[0];
			container.insertBefore(el, container.firstChild);
			sheet = (el.sheet || el.styleSheet);
			supported = sheet && !sheet.disabled;
			container.removeChild(el);
			return supported;
		}),

		removeClass: function(el, className) {
			var re = RegExp('(?:^|\\s+)' + className +  '(?=\\s|$)', 'g');
			el.className = el.className.replace(re, '');
			return el;
		},

		supports: function(property, value) {
			var checker = document.createElement('span').style;
			if (checker[property] === undefined) return false;
			checker[property] = value;
			return checker[property] === value;
		},

		textAlign: function(word, style, position, wordCount) {
			if (style.get('textAlign') == 'right') {
				if (position > 0) word = ' ' + word;
			}
			else if (position < wordCount - 1) word += ' ';
			return word;
		},

		textShadow: cached(function(value) {
			if (value == 'none') return null;
			var shadows = [], currentShadow = {}, result, offCount = 0;
			var re = /(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;
			while (result = re.exec(value)) {
				if (result[0] == ',') {
					shadows.push(currentShadow);
					currentShadow = {};
					offCount = 0;
				}
				else if (result[1]) {
					currentShadow.color = result[1];
				}
				else {
					currentShadow[[ 'offX', 'offY', 'blur' ][offCount++]] = result[2];
				}
			}
			shadows.push(currentShadow);
			return shadows;
		}),

		textTransform: (function() {
			var map = {
				uppercase: function(s) {
					return s.toUpperCase();
				},
				lowercase: function(s) {
					return s.toLowerCase();
				},
				capitalize: function(s) {
					return s.replace(/(?:^|\s)./g, function($0) {
						return $0.toUpperCase();
					});
				}
			};
			return function(text, style) {
				var transform = map[style.get('textTransform')];
				return transform ? transform(text) : text;
			};
		})(),

		whiteSpace: (function() {
			var ignore = {
				inline: 1,
				'inline-block': 1,
				'run-in': 1
			};
			var wsStart = /^\s+/, wsEnd = /\s+$/;
			return function(text, style, node, previousElement, simple) {
				if (simple) return text.replace(wsStart, '').replace(wsEnd, ''); // @fixme too simple
				if (previousElement) {
					if (previousElement.nodeName.toLowerCase() == 'br') {
						text = text.replace(wsStart, '');
					}
				}
				if (ignore[style.get('display')]) return text;
				if (!node.previousSibling) text = text.replace(wsStart, '');
				if (!node.nextSibling) text = text.replace(wsEnd, '');
				return text;
			};
		})()

	};

	CSS.ready = (function() {

		// don't do anything in Safari 2 (it doesn't recognize any media type)
		var complete = !CSS.recognizesMedia('all'), hasLayout = false;

		var queue = [], perform = function() {
			complete = true;
			for (var fn; fn = queue.shift(); fn());
		};

		var links = elementsByTagName('link'), styles = elementsByTagName('style');

		var checkTypes = {
			'': 1,
			'text/css': 1
		};

		function isContainerReady(el) {
			if (!checkTypes[el.type.toLowerCase()]) return true;
			return el.disabled || isSheetReady(el.sheet, el.media || 'screen');
		}

		function isSheetReady(sheet, media) {
			// in Opera sheet.disabled is true when it's still loading,
			// even though link.disabled is false. they stay in sync if
			// set manually.
			if (!CSS.recognizesMedia(media || 'all')) return true;
			if (!sheet || sheet.disabled) return false;
			try {
				var rules = sheet.cssRules, rule;
				if (rules) {
					// needed for Safari 3 and Chrome 1.0.
					// in standards-conforming browsers cssRules contains @-rules.
					// Chrome 1.0 weirdness: rules[<number larger than .length - 1>]
					// returns the last rule, so a for loop is the only option.
					search: for (var i = 0, l = rules.length; rule = rules[i], i < l; ++i) {
						switch (rule.type) {
							case 2: // @charset
								break;
							case 3: // @import
								if (!isSheetReady(rule.styleSheet, rule.media.mediaText)) return false;
								break;
							default:
								// only @charset can precede @import
								break search;
						}
					}
				}
			}
			catch (e) {} // probably a style sheet from another domain
			return true;
		}

		function allStylesLoaded() {
			// Internet Explorer's style sheet model, there's no need to do anything
			if (document.createStyleSheet) return true;
			// standards-compliant browsers
			var el, i;
			for (i = 0; el = links[i]; ++i) {
				if (el.rel.toLowerCase() == 'stylesheet' && !isContainerReady(el)) return false;
			}
			for (i = 0; el = styles[i]; ++i) {
				if (!isContainerReady(el)) return false;
			}
			return true;
		}

		DOM.ready(function() {
			// getComputedStyle returns null in Gecko if used in an iframe with display: none
			if (!hasLayout) hasLayout = CSS.getStyle(document.body).isUsable();
			if (complete || (hasLayout && allStylesLoaded())) perform();
			else setTimeout(arguments.callee, 10);
		});

		return function(listener) {
			if (complete) listener();
			else queue.push(listener);
		};

	})();

	function Font(data) {

		var face = this.face = data.face, wordSeparators = {
			'\u0020': 1,
			'\u00a0': 1,
			'\u3000': 1
		};

		this.glyphs = (function(glyphs) {
			var key, fallbacks = {
				'\u2011': '\u002d',
				'\u00ad': '\u2011'
			};
			for (key in fallbacks) {
				if (!hasOwnProperty(fallbacks, key)) continue;
				if (!glyphs[key]) glyphs[key] = glyphs[fallbacks[key]];
			}
			return glyphs;
		})(data.glyphs);

		this.w = data.w;
		this.baseSize = parseInt(face['units-per-em'], 10);

		this.family = face['font-family'].toLowerCase();
		this.weight = face['font-weight'];
		this.style = face['font-style'] || 'normal';

		this.viewBox = (function () {
			var parts = face.bbox.split(/\s+/);
			var box = {
				minX: parseInt(parts[0], 10),
				minY: parseInt(parts[1], 10),
				maxX: parseInt(parts[2], 10),
				maxY: parseInt(parts[3], 10)
			};
			box.width = box.maxX - box.minX;
			box.height = box.maxY - box.minY;
			box.toString = function() {
				return [ this.minX, this.minY, this.width, this.height ].join(' ');
			};
			return box;
		})();

		this.ascent = -parseInt(face.ascent, 10);
		this.descent = -parseInt(face.descent, 10);

		this.height = -this.ascent + this.descent;

		this.spacing = function(chars, letterSpacing, wordSpacing) {
			var glyphs = this.glyphs, glyph,
				kerning, k,
				jumps = [],
				width = 0, w,
				i = -1, j = -1, chr;
			while (chr = chars[++i]) {
				glyph = glyphs[chr] || this.missingGlyph;
				if (!glyph) continue;
				if (kerning) {
					width -= k = kerning[chr] || 0;
					jumps[j] -= k;
				}
				w = glyph.w;
				if (isNaN(w)) w = +this.w; // may have been a String in old fonts
				if (w > 0) {
					w += letterSpacing;
					if (wordSeparators[chr]) w += wordSpacing;
				}
				width += jumps[++j] = ~~w; // get rid of decimals
				kerning = glyph.k;
			}
			jumps.total = width;
			return jumps;
		};

	}

	function FontFamily() {

		var styles = {}, mapping = {
			oblique: 'italic',
			italic: 'oblique'
		};

		this.add = function(font) {
			(styles[font.style] || (styles[font.style] = {}))[font.weight] = font;
		};

		this.get = function(style, weight) {
			var weights = styles[style] || styles[mapping[style]]
				|| styles.normal || styles.italic || styles.oblique;
			if (!weights) return null;
			// we don't have to worry about "bolder" and "lighter"
			// because IE's currentStyle returns a numeric value for it,
			// and other browsers use the computed value anyway
			weight = {
				normal: 400,
				bold: 700
			}[weight] || parseInt(weight, 10);
			if (weights[weight]) return weights[weight];
			// http://www.w3.org/TR/CSS21/fonts.html#propdef-font-weight
			// Gecko uses x99/x01 for lighter/bolder
			var up = {
				1: 1,
				99: 0
			}[weight % 100], alts = [], min, max;
			if (up === undefined) up = weight > 400;
			if (weight == 500) weight = 400;
			for (var alt in weights) {
				if (!hasOwnProperty(weights, alt)) continue;
				alt = parseInt(alt, 10);
				if (!min || alt < min) min = alt;
				if (!max || alt > max) max = alt;
				alts.push(alt);
			}
			if (weight < min) weight = min;
			if (weight > max) weight = max;
			alts.sort(function(a, b) {
				return (up
					? (a >= weight && b >= weight) ? a < b : a > b
					: (a <= weight && b <= weight) ? a > b : a < b) ? -1 : 1;
			});
			return weights[alts[0]];
		};

	}

	function HoverHandler() {

		function contains(node, anotherNode) {
			try {
				if (node.contains) return node.contains(anotherNode);
				return node.compareDocumentPosition(anotherNode) & 16;
			}
			catch(e) {} // probably a XUL element such as a scrollbar
			return false;
		}

		// mouseover/mouseout (standards) mode
		function onOverOut(e) {
			var related = e.relatedTarget;
			// there might be no relatedTarget if the element is right next
			// to the window frame
			if (related && contains(this, related)) return;
			trigger(this, e.type == 'mouseover');
		}

		// mouseenter/mouseleave (probably ie) mode
		function onEnterLeave(e) {
			if (!e) e = window.event;
			// ie model, we don't have access to "this", but
			// mouseenter/leave doesn't bubble so it's fine.
			trigger(e.target || e.srcElement, e.type == 'mouseenter');
		}

		function trigger(el, hoverState) {
			// A timeout is needed so that the event can actually "happen"
			// before replace is triggered. This ensures that styles are up
			// to date.
			setTimeout(function() {
				var options = sharedStorage.get(el).options;
				if (hoverState) {
					options = merge(options, options.hover);
					options._mediatorMode = 1;
				}
				api.replace(el, options, true);
			}, 10);
		}

		this.attach = function(el) {
			if (el.onmouseenter === undefined) {
				addEvent(el, 'mouseover', onOverOut);
				addEvent(el, 'mouseout', onOverOut);
			}
			else {
				addEvent(el, 'mouseenter', onEnterLeave);
				addEvent(el, 'mouseleave', onEnterLeave);
			}
		};

		this.detach = function(el) {
			if (el.onmouseenter === undefined) {
				removeEvent(el, 'mouseover', onOverOut);
				removeEvent(el, 'mouseout', onOverOut);
			}
			else {
				removeEvent(el, 'mouseenter', onEnterLeave);
				removeEvent(el, 'mouseleave', onEnterLeave);
			}
		};

	}

	function ReplaceHistory() {

		var list = [], map = {};

		function filter(keys) {
			var values = [], key;
			for (var i = 0; key = keys[i]; ++i) values[i] = list[map[key]];
			return values;
		}

		this.add = function(key, args) {
			map[key] = list.push(args) - 1;
		};

		this.repeat = function() {
			var snapshot = arguments.length ? filter(arguments) : list, args;
			for (var i = 0; args = snapshot[i++];) api.replace(args[0], args[1], true);
		};

	}

	function Storage() {

		var map = {}, at = 0;

		function identify(el) {
			return el.cufid || (el.cufid = ++at);
		}

		this.get = function(el) {
			var id = identify(el);
			return map[id] || (map[id] = {});
		};

	}

	function Style(style) {

		var custom = {}, sizes = {};

		this.extend = function(styles) {
			for (var property in styles) {
				if (hasOwnProperty(styles, property)) custom[property] = styles[property];
			}
			return this;
		};

		this.get = function(property) {
			return custom[property] != undefined ? custom[property] : style[property];
		};

		this.getSize = function(property, base) {
			return sizes[property] || (sizes[property] = new CSS.Size(this.get(property), base));
		};

		this.isUsable = function() {
			return !!style;
		};

	}

	function addEvent(el, type, listener) {
		if (el.addEventListener) {
			el.addEventListener(type, listener, false);
		}
		else if (el.attachEvent) {
			// we don't really need "this" right now, saves code
			el.attachEvent('on' + type, listener);
		}
	}

	function attach(el, options) {
		if (options._mediatorMode) return el;
		var storage = sharedStorage.get(el);
		var oldOptions = storage.options;
		if (oldOptions) {
			if (oldOptions === options) return el;
			if (oldOptions.hover) hoverHandler.detach(el);
		}
		if (options.hover && options.hoverables[el.nodeName.toLowerCase()]) {
			hoverHandler.attach(el);
		}
		storage.options = options;
		return el;
	}

	function cached(fun) {
		var cache = {};
		return function(key) {
			if (!hasOwnProperty(cache, key)) cache[key] = fun.apply(null, arguments);
			return cache[key];
		};
	}

	function getFont(el, style) {
		var families = CSS.quotedList(style.get('fontFamily').toLowerCase()), family;
		for (var i = 0; family = families[i]; ++i) {
			if (fonts[family]) return fonts[family].get(style.get('fontStyle'), style.get('fontWeight'));
		}
		return null;
	}

	function elementsByTagName(query) {
		return document.getElementsByTagName(query);
	}

	function hasOwnProperty(obj, property) {
		return obj.hasOwnProperty(property);
	}

	function merge() {
		var merged = {}, arg, key;
		for (var i = 0, l = arguments.length; arg = arguments[i], i < l; ++i) {
			for (key in arg) {
				if (hasOwnProperty(arg, key)) merged[key] = arg[key];
			}
		}
		return merged;
	}

	function process(font, text, style, options, node, el) {
		var fragment = document.createDocumentFragment(), processed;
		if (text === '') return fragment;
		var separate = options.separate;
		var parts = text.split(separators[separate]), needsAligning = (separate == 'words');
		if (needsAligning && HAS_BROKEN_REGEXP) {
			// @todo figure out a better way to do this
			if (/^\s/.test(text)) parts.unshift('');
			if (/\s$/.test(text)) parts.push('');
		}
		for (var i = 0, l = parts.length; i < l; ++i) {
			processed = engines[options.engine](font,
				needsAligning ? CSS.textAlign(parts[i], style, i, l) : parts[i],
				style, options, node, el, i < l - 1);
			if (processed) fragment.appendChild(processed);
		}
		return fragment;
	}

	function removeEvent(el, type, listener) {
		if (el.removeEventListener) {
			el.removeEventListener(type, listener, false);
		}
		else if (el.detachEvent) {
			el.detachEvent('on' + type, listener);
		}
	}

	function replaceElement(el, options) {
		var name = el.nodeName.toLowerCase();
		if (options.ignore[name]) return;
		if (options.ignoreClass && options.ignoreClass.test(el.className)) return;
		if (options.onBeforeReplace) options.onBeforeReplace(el, options);
		var replace = !options.textless[name], simple = (options.trim === 'simple');
		var style = CSS.getStyle(attach(el, options)).extend(options);
		// may cause issues if the element contains other elements
		// with larger fontSize, however such cases are rare and can
		// be fixed by using a more specific selector
		if (parseFloat(style.get('fontSize')) === 0) return;
		var font = getFont(el, style), node, type, next, anchor, text, lastElement;
		var isShy = options.softHyphens, anyShy = false, pos, shy, reShy = /\u00ad/g;
		var modifyText = options.modifyText;
		if (!font) return;
		for (node = el.firstChild; node; node = next) {
			type = node.nodeType;
			next = node.nextSibling;
			if (replace && type == 3) {
				if (isShy && el.nodeName.toLowerCase() != TAG_SHY) {
					pos = node.data.indexOf('\u00ad');
					if (pos >= 0) {
						node.splitText(pos);
						next = node.nextSibling;
						next.deleteData(0, 1);
						shy = document.createElement(TAG_SHY);
						shy.appendChild(document.createTextNode('\u00ad'));
						el.insertBefore(shy, next);
						next = shy;
						anyShy = true;
					}
				}
				// Node.normalize() is broken in IE 6, 7, 8
				if (anchor) {
					anchor.appendData(node.data);
					el.removeChild(node);
				}
				else anchor = node;
				if (next) continue;
			}
			if (anchor) {
				text = anchor.data;
				if (!isShy) text = text.replace(reShy, '');
				text = CSS.whiteSpace(text, style, anchor, lastElement, simple);
				// modify text only on the first replace
				if (modifyText) text = modifyText(text, anchor, el, options);
				el.replaceChild(process(font, text, style, options, node, el), anchor);
				anchor = null;
			}
			if (type == 1) {
				if (node.firstChild) {
					if (node.nodeName.toLowerCase() == 'cufon') {
						engines[options.engine](font, null, style, options, node, el);
					}
					else arguments.callee(node, options);
				}
				lastElement = node;
			}
		}
		if (isShy && anyShy) {
			updateShy(el);
			if (!trackingShy) addEvent(window, 'resize', updateShyOnResize);
			trackingShy = true;
		}
		if (options.onAfterReplace) options.onAfterReplace(el, options);
	}

	function updateShy(context) {
		var shys, shy, parent, glue, newGlue, next, prev, i;
		shys = context.getElementsByTagName(TAG_SHY);
		// unfortunately there doesn't seem to be any easy
		// way to avoid having to loop through the shys twice.
		for (i = 0; shy = shys[i]; ++i) {
			shy.className = C_SHY_DISABLED;
			glue = parent = shy.parentNode;
			if (glue.nodeName.toLowerCase() != TAG_GLUE) {
				newGlue = document.createElement(TAG_GLUE);
				newGlue.appendChild(shy.previousSibling);
				parent.insertBefore(newGlue, shy);
				newGlue.appendChild(shy);
			}
			else {
				// get rid of double glue (edge case fix)
				glue = glue.parentNode;
				if (glue.nodeName.toLowerCase() == TAG_GLUE) {
					parent = glue.parentNode;
					while (glue.firstChild) {
						parent.insertBefore(glue.firstChild, glue);
					}
					parent.removeChild(glue);
				}
			}
		}
		for (i = 0; shy = shys[i]; ++i) {
			shy.className = '';
			glue = shy.parentNode;
			parent = glue.parentNode;
			next = glue.nextSibling || parent.nextSibling;
			// make sure we're comparing same types
			prev = (next.nodeName.toLowerCase() == TAG_GLUE) ? glue : shy.previousSibling;
			if (prev.offsetTop >= next.offsetTop) {
				shy.className = C_SHY_DISABLED;
				if (prev.offsetTop < next.offsetTop) {
					// we have an annoying edge case, double the glue
					newGlue = document.createElement(TAG_GLUE);
					parent.insertBefore(newGlue, glue);
					newGlue.appendChild(glue);
					newGlue.appendChild(next);
				}
			}
		}
	}

	function updateShyOnResize() {
		if (ignoreResize) return; // needed for IE
		CSS.addClass(DOM.root(), C_VIEWPORT_RESIZING);
		clearTimeout(shyTimer);
		shyTimer = setTimeout(function() {
			ignoreResize = true;
			CSS.removeClass(DOM.root(), C_VIEWPORT_RESIZING);
			updateShy(document);
			ignoreResize = false;
		}, 100);
	}

	var HAS_BROKEN_REGEXP = ' '.split(/\s+/).length == 0;
	var TAG_GLUE = 'cufonglue';
	var TAG_SHY = 'cufonshy';
	var C_SHY_DISABLED = 'cufon-shy-disabled';
	var C_VIEWPORT_RESIZING = 'cufon-viewport-resizing';

	var sharedStorage = new Storage();
	var hoverHandler = new HoverHandler();
	var replaceHistory = new ReplaceHistory();
	var initialized = false;
	var trackingShy = false;
	var shyTimer;
	var ignoreResize = false;

	var engines = {}, fonts = {}, defaultOptions = {
		autoDetect: false,
		engine: null,
		forceHitArea: false,
		hover: false,
		hoverables: {
			a: true
		},
		ignore: {
			applet: 1,
			canvas: 1,
			col: 1,
			colgroup: 1,
			head: 1,
			iframe: 1,
			map: 1,
			noscript: 1,
			optgroup: 1,
			option: 1,
			script: 1,
			select: 1,
			style: 1,
			textarea: 1,
			title: 1,
			pre: 1
		},
		ignoreClass: null,
		modifyText: null,
		onAfterReplace: null,
		onBeforeReplace: null,
		printable: true,
		selector: (
				window.Sizzle
			||	(window.jQuery && function(query) { return jQuery(query); }) // avoid noConflict issues
			||	(window.dojo && dojo.query)
			||	(window.glow && glow.dom && glow.dom.get)
			||	(window.Ext && Ext.query)
			||	(window.YAHOO && YAHOO.util && YAHOO.util.Selector && YAHOO.util.Selector.query)
			||	(window.$$ && function(query) { return $$(query); })
			||	(window.$ && function(query) { return $(query); })
			||	(document.querySelectorAll && function(query) { return document.querySelectorAll(query); })
			||	elementsByTagName
		),
		separate: 'words', // 'none' and 'characters' are also accepted
		softHyphens: true,
		textless: {
			dl: 1,
			html: 1,
			ol: 1,
			table: 1,
			tbody: 1,
			thead: 1,
			tfoot: 1,
			tr: 1,
			ul: 1
		},
		textShadow: 'none',
		trim: 'advanced'
	};

	var separators = {
		// The first pattern may cause unicode characters above
		// code point 255 to be removed in Safari 3.0. Luckily enough
		// Safari 3.0 does not include non-breaking spaces in \s, so
		// we can just use a simple alternative pattern.
		words: /\s/.test('\u00a0') ? /[^\S\u00a0]+/ : /\s+/,
		characters: '',
		none: /^/
	};

	api.now = function() {
		DOM.ready();
		return api;
	};

	api.refresh = function() {
		replaceHistory.repeat.apply(replaceHistory, arguments);
		return api;
	};

	api.registerEngine = function(id, engine) {
		if (!engine) return api;
		engines[id] = engine;
		return api.set('engine', id);
	};

	api.registerFont = function(data) {
		if (!data) return api;
		var font = new Font(data), family = font.family;
		if (!fonts[family]) fonts[family] = new FontFamily();
		fonts[family].add(font);
		return api.set('fontFamily', '"' + family + '"');
	};

	api.replace = function(elements, options, ignoreHistory) {
		options = merge(defaultOptions, options);
		if (!options.engine) return api; // there's no browser support so we'll just stop here
		if (!initialized) {
			CSS.addClass(DOM.root(), 'cufon-active cufon-loading');
			CSS.ready(function() {
				// fires before any replace() calls, but it doesn't really matter
				CSS.addClass(CSS.removeClass(DOM.root(), 'cufon-loading'), 'cufon-ready');
			});
			initialized = true;
		}
		if (options.hover) options.forceHitArea = true;
		if (options.autoDetect) delete options.fontFamily;
		if (typeof options.ignoreClass == 'string') {
			options.ignoreClass = new RegExp('(?:^|\\s)(?:' + options.ignoreClass.replace(/\s+/g, '|') + ')(?:\\s|$)');
		}
		if (typeof options.textShadow == 'string') {
			options.textShadow = CSS.textShadow(options.textShadow);
		}
		if (typeof options.color == 'string' && /^-/.test(options.color)) {
			options.textGradient = CSS.gradient(options.color);
		}
		else delete options.textGradient;
		if (typeof elements == 'string') {
			if (!ignoreHistory) replaceHistory.add(elements, arguments);
			elements = [ elements ];
		}
		else if (elements.nodeType) elements = [ elements ];
		CSS.ready(function() {
			for (var i = 0, l = elements.length; i < l; ++i) {
				var el = elements[i];
				if (typeof el == 'string') api.replace(options.selector(el), options, true);
				else replaceElement(el, options);
			}
		});
		return api;
	};

	api.set = function(option, value) {
		defaultOptions[option] = value;
		return api;
	};

	return api;

})();

Cufon.registerEngine('vml', (function() {

	var ns = document.namespaces;
	if (!ns) return;
	ns.add('cvml', 'urn:schemas-microsoft-com:vml');
	ns = null;

	var check = document.createElement('cvml:shape');
	check.style.behavior = 'url(#default#VML)';
	if (!check.coordsize) return; // VML isn't supported
	check = null;

	var HAS_BROKEN_LINEHEIGHT = (document.documentMode || 0) < 8;

	document.write(('<style type="text/css">' +
		'cufoncanvas{text-indent:0;}' +
		'@media screen{' +
			'cvml\\:shape,cvml\\:rect,cvml\\:fill,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute;}' +
			'cufoncanvas{position:absolute;text-align:left;}' +
			'cufon{display:inline-block;position:relative;vertical-align:' +
			(HAS_BROKEN_LINEHEIGHT
				? 'middle'
				: 'text-bottom') +
			';}' +

			'cufon cufontext{position:absolute;left:-10000in;font-size:1px;text-align:left;}' +
			'cufonshy.cufon-shy-disabled,.cufon-viewport-resizing cufonshy{display:none;}' +
			'cufonglue{white-space:nowrap;display:inline-block;}' +
			'.cufon-viewport-resizing cufonglue{white-space:normal;}' +
			'a cufon{cursor:pointer}' + // ignore !important here
		'}' +
		'@media print{' +
			'cufon cufoncanvas{display:none;}' +
		'}' +
	'</style>').replace(/;/g, '!important;'));

	function getFontSizeInPixels(el, value) {
		return getSizeInPixels(el, /(?:em|ex|%)$|^[a-z-]+$/i.test(value) ? '1em' : value);
	}

	// Original by Dead Edwards.
	// Combined with getFontSizeInPixels it also works with relative units.
	function getSizeInPixels(el, value) {
		if (!isNaN(value) || /px$/i.test(value)) return parseFloat(value);
		var style = el.style.left, runtimeStyle = el.runtimeStyle.left;
		el.runtimeStyle.left = el.currentStyle.left;
		el.style.left = value.replace('%', 'em');
		var result = el.style.pixelLeft;
		el.style.left = style;
		el.runtimeStyle.left = runtimeStyle;
		return result;
	}

	function getSpacingValue(el, style, size, property) {
		var key = 'computed' + property, value = style[key];
		if (isNaN(value)) {
			value = style.get(property);
			style[key] = value = (value == 'normal') ? 0 : ~~size.convertFrom(getSizeInPixels(el, value));
		}
		return value;
	}

	var fills = {};

	function gradientFill(gradient) {
		var id = gradient.id;
		if (!fills[id]) {
			var stops = gradient.stops, fill = document.createElement('cvml:fill'), colors = [];
			fill.type = 'gradient';
			fill.angle = 180;
			fill.focus = '0';
			fill.method = 'none';
			fill.color = stops[0][1];
			for (var j = 1, k = stops.length - 1; j < k; ++j) {
				colors.push(stops[j][0] * 100 + '% ' + stops[j][1]);
			}
			fill.colors = colors.join(',');
			fill.color2 = stops[k][1];
			fills[id] = fill;
		}
		return fills[id];
	}

	return function(font, text, style, options, node, el, hasNext) {

		var redraw = (text === null);

		if (redraw) text = node.alt;

		var viewBox = font.viewBox;

		var size = style.computedFontSize || (style.computedFontSize = new Cufon.CSS.Size(getFontSizeInPixels(el, style.get('fontSize')) + 'px', font.baseSize));

		var wrapper, canvas;

		if (redraw) {
			wrapper = node;
			canvas = node.firstChild;
		}
		else {
			wrapper = document.createElement('cufon');
			wrapper.className = 'cufon cufon-vml';
			wrapper.alt = text;

			canvas = document.createElement('cufoncanvas');
			wrapper.appendChild(canvas);

			if (options.printable) {
				var print = document.createElement('cufontext');
				print.appendChild(document.createTextNode(text));
				wrapper.appendChild(print);
			}

			// ie6, for some reason, has trouble rendering the last VML element in the document.
			// we can work around this by injecting a dummy element where needed.
			// @todo find a better solution
			if (!hasNext) wrapper.appendChild(document.createElement('cvml:shape'));
		}

		var wStyle = wrapper.style;
		var cStyle = canvas.style;

		var height = size.convert(viewBox.height), roundedHeight = Math.ceil(height);
		var roundingFactor = roundedHeight / height;
		var stretchFactor = roundingFactor * Cufon.CSS.fontStretch(style.get('fontStretch'));
		var minX = viewBox.minX, minY = viewBox.minY;

		cStyle.height = roundedHeight;
		cStyle.top = Math.round(size.convert(minY - font.ascent));
		cStyle.left = Math.round(size.convert(minX));

		wStyle.height = size.convert(font.height) + 'px';

		var color = style.get('color');
		var chars = Cufon.CSS.textTransform(text, style).split('');

		var jumps = font.spacing(chars,
			getSpacingValue(el, style, size, 'letterSpacing'),
			getSpacingValue(el, style, size, 'wordSpacing')
		);

		if (!jumps.length) return null;

		var width = jumps.total;
		var fullWidth = -minX + width + (viewBox.width - jumps[jumps.length - 1]);

		var shapeWidth = size.convert(fullWidth * stretchFactor), roundedShapeWidth = Math.round(shapeWidth);

		var coordSize = fullWidth + ',' + viewBox.height, coordOrigin;
		var stretch = 'r' + coordSize + 'ns';

		var fill = options.textGradient && gradientFill(options.textGradient);

		var glyphs = font.glyphs, offsetX = 0;
		var shadows = options.textShadow;
		var i = -1, j = 0, chr;

		while (chr = chars[++i]) {

			var glyph = glyphs[chars[i]] || font.missingGlyph, shape;
			if (!glyph) continue;

			if (redraw) {
				// some glyphs may be missing so we can't use i
				shape = canvas.childNodes[j];
				while (shape.firstChild) shape.removeChild(shape.firstChild); // shadow, fill
			}
			else {
				shape = document.createElement('cvml:shape');
				canvas.appendChild(shape);
			}

			shape.stroked = 'f';
			shape.coordsize = coordSize;
			shape.coordorigin = coordOrigin = (minX - offsetX) + ',' + minY;
			shape.path = (glyph.d ? 'm' + glyph.d + 'xe' : '') + 'm' + coordOrigin + stretch;
			shape.fillcolor = color;

			if (fill) shape.appendChild(fill.cloneNode(false));

			// it's important to not set top/left or IE8 will grind to a halt
			var sStyle = shape.style;
			sStyle.width = roundedShapeWidth;
			sStyle.height = roundedHeight;

			if (shadows) {
				// due to the limitations of the VML shadow element there
				// can only be two visible shadows. opacity is shared
				// for all shadows.
				var shadow1 = shadows[0], shadow2 = shadows[1];
				var color1 = Cufon.CSS.color(shadow1.color), color2;
				var shadow = document.createElement('cvml:shadow');
				shadow.on = 't';
				shadow.color = color1.color;
				shadow.offset = shadow1.offX + ',' + shadow1.offY;
				if (shadow2) {
					color2 = Cufon.CSS.color(shadow2.color);
					shadow.type = 'double';
					shadow.color2 = color2.color;
					shadow.offset2 = shadow2.offX + ',' + shadow2.offY;
				}
				shadow.opacity = color1.opacity || (color2 && color2.opacity) || 1;
				shape.appendChild(shadow);
			}

			offsetX += jumps[j++];
		}

		// addresses flickering issues on :hover

		var cover = shape.nextSibling, coverFill, vStyle;

		if (options.forceHitArea) {

			if (!cover) {
				cover = document.createElement('cvml:rect');
				cover.stroked = 'f';
				cover.className = 'cufon-vml-cover';
				coverFill = document.createElement('cvml:fill');
				coverFill.opacity = 0;
				cover.appendChild(coverFill);
				canvas.appendChild(cover);
			}

			vStyle = cover.style;

			vStyle.width = roundedShapeWidth;
			vStyle.height = roundedHeight;

		}
		else if (cover) canvas.removeChild(cover);

		wStyle.width = Math.max(Math.ceil(size.convert(width * stretchFactor)), 0);

		if (HAS_BROKEN_LINEHEIGHT) {

			var yAdjust = style.computedYAdjust;

			if (yAdjust === undefined) {
				var lineHeight = style.get('lineHeight');
				if (lineHeight == 'normal') lineHeight = '1em';
				else if (!isNaN(lineHeight)) lineHeight += 'em'; // no unit
				style.computedYAdjust = yAdjust = 0.5 * (getSizeInPixels(el, lineHeight) - parseFloat(wStyle.height));
			}

			if (yAdjust) {
				wStyle.marginTop = Math.ceil(yAdjust) + 'px';
				wStyle.marginBottom = yAdjust + 'px';
			}

		}

		return wrapper;

	};

})());

Cufon.registerEngine('canvas', (function() {

	// Safari 2 doesn't support .apply() on native methods

	var check = document.createElement('canvas');
	if (!check || !check.getContext || !check.getContext.apply) return;
	check = null;

	var HAS_INLINE_BLOCK = Cufon.CSS.supports('display', 'inline-block');

	// Firefox 2 w/ non-strict doctype (almost standards mode)
	var HAS_BROKEN_LINEHEIGHT = !HAS_INLINE_BLOCK && (document.compatMode == 'BackCompat' || /frameset|transitional/i.test(document.doctype.publicId));

	var styleSheet = document.createElement('style');
	styleSheet.type = 'text/css';
	styleSheet.appendChild(document.createTextNode((
		'cufon{text-indent:0;}' +
		'@media screen,projection{' +
			'cufon{display:inline;display:inline-block;position:relative;vertical-align:middle;' +
			(HAS_BROKEN_LINEHEIGHT
				? ''
				: 'font-size:1px;line-height:1px;') +
			'}cufon cufontext{display:-moz-inline-box;display:inline-block;width:0;height:0;text-align:left;text-indent:-10000in;}' +
			(HAS_INLINE_BLOCK
				? 'cufon canvas{position:relative;}'
				: 'cufon canvas{position:absolute;}') +
			'cufonshy.cufon-shy-disabled,.cufon-viewport-resizing cufonshy{display:none;}' +
			'cufonglue{white-space:nowrap;display:inline-block;}' +
			'.cufon-viewport-resizing cufonglue{white-space:normal;}' +
		'}' +
		'@media print{' +
			'cufon{padding:0;}' + // Firefox 2
			'cufon canvas{display:none;}' +
		'}'
	).replace(/;/g, '!important;')));
	document.getElementsByTagName('head')[0].appendChild(styleSheet);

	function generateFromVML(path, context) {
		var atX = 0, atY = 0;
		var code = [], re = /([mrvxe])([^a-z]*)/g, match;
		generate: for (var i = 0; match = re.exec(path); ++i) {
			var c = match[2].split(',');
			switch (match[1]) {
				case 'v':
					code[i] = { m: 'bezierCurveTo', a: [ atX + ~~c[0], atY + ~~c[1], atX + ~~c[2], atY + ~~c[3], atX += ~~c[4], atY += ~~c[5] ] };
					break;
				case 'r':
					code[i] = { m: 'lineTo', a: [ atX += ~~c[0], atY += ~~c[1] ] };
					break;
				case 'm':
					code[i] = { m: 'moveTo', a: [ atX = ~~c[0], atY = ~~c[1] ] };
					break;
				case 'x':
					code[i] = { m: 'closePath' };
					break;
				case 'e':
					break generate;
			}
			context[code[i].m].apply(context, code[i].a);
		}
		return code;
	}

	function interpret(code, context) {
		for (var i = 0, l = code.length; i < l; ++i) {
			var line = code[i];
			context[line.m].apply(context, line.a);
		}
	}

	return function(font, text, style, options, node, el) {

		var redraw = (text === null);

		if (redraw) text = node.getAttribute('alt');

		var viewBox = font.viewBox;

		var size = style.getSize('fontSize', font.baseSize);

		var expandTop = 0, expandRight = 0, expandBottom = 0, expandLeft = 0;
		var shadows = options.textShadow, shadowOffsets = [];
		if (shadows) {
			for (var i = shadows.length; i--;) {
				var shadow = shadows[i];
				var x = size.convertFrom(parseFloat(shadow.offX));
				var y = size.convertFrom(parseFloat(shadow.offY));
				shadowOffsets[i] = [ x, y ];
				if (y < expandTop) expandTop = y;
				if (x > expandRight) expandRight = x;
				if (y > expandBottom) expandBottom = y;
				if (x < expandLeft) expandLeft = x;
			}
		}

		var chars = Cufon.CSS.textTransform(text, style).split('');

		var jumps = font.spacing(chars,
			~~size.convertFrom(parseFloat(style.get('letterSpacing')) || 0),
			~~size.convertFrom(parseFloat(style.get('wordSpacing')) || 0)
		);

		if (!jumps.length) return null; // there's nothing to render

		var width = jumps.total;

		expandRight += viewBox.width - jumps[jumps.length - 1];
		expandLeft += viewBox.minX;

		var wrapper, canvas;

		if (redraw) {
			wrapper = node;
			canvas = node.firstChild;
		}
		else {
			wrapper = document.createElement('cufon');
			wrapper.className = 'cufon cufon-canvas';
			wrapper.setAttribute('alt', text);

			canvas = document.createElement('canvas');
			wrapper.appendChild(canvas);

			if (options.printable) {
				var print = document.createElement('cufontext');
				print.appendChild(document.createTextNode(text));
				wrapper.appendChild(print);
			}
		}

		var wStyle = wrapper.style;
		var cStyle = canvas.style;

		var height = size.convert(viewBox.height);
		var roundedHeight = Math.ceil(height);
		var roundingFactor = roundedHeight / height;
		var stretchFactor = roundingFactor * Cufon.CSS.fontStretch(style.get('fontStretch'));
		var stretchedWidth = width * stretchFactor;

		var canvasWidth = Math.ceil(size.convert(stretchedWidth + expandRight - expandLeft));
		var canvasHeight = Math.ceil(size.convert(viewBox.height - expandTop + expandBottom));

		canvas.width = canvasWidth;
		canvas.height = canvasHeight;

		// needed for WebKit and full page zoom
		cStyle.width = canvasWidth + 'px';
		cStyle.height = canvasHeight + 'px';

		// minY has no part in canvas.height
		expandTop += viewBox.minY;

		cStyle.top = Math.round(size.convert(expandTop - font.ascent)) + 'px';
		cStyle.left = Math.round(size.convert(expandLeft)) + 'px';

		var wrapperWidth = Math.max(Math.ceil(size.convert(stretchedWidth)), 0) + 'px';

		if (HAS_INLINE_BLOCK) {
			wStyle.width = wrapperWidth;
			wStyle.height = size.convert(font.height) + 'px';
		}
		else {
			wStyle.paddingLeft = wrapperWidth;
			wStyle.paddingBottom = (size.convert(font.height) - 1) + 'px';
		}

		var g = canvas.getContext('2d'), scale = height / viewBox.height;

		// proper horizontal scaling is performed later
		g.scale(scale, scale * roundingFactor);
		g.translate(-expandLeft, -expandTop);
		g.save();

		function renderText() {
			var glyphs = font.glyphs, glyph, i = -1, j = -1, chr;
			g.scale(stretchFactor, 1);
			while (chr = chars[++i]) {
				var glyph = glyphs[chars[i]] || font.missingGlyph;
				if (!glyph) continue;
				if (glyph.d) {
					g.beginPath();
					if (glyph.code) interpret(glyph.code, g);
					else glyph.code = generateFromVML('m' + glyph.d, g);
					g.fill();
				}
				g.translate(jumps[++j], 0);
			}
			g.restore();
		}

		if (shadows) {
			for (var i = shadows.length; i--;) {
				var shadow = shadows[i];
				g.save();
				g.fillStyle = shadow.color;
				g.translate.apply(g, shadowOffsets[i]);
				renderText();
			}
		}

		var gradient = options.textGradient;
		if (gradient) {
			var stops = gradient.stops, fill = g.createLinearGradient(0, viewBox.minY, 0, viewBox.maxY);
			for (var i = 0, l = stops.length; i < l; ++i) {
				fill.addColorStop.apply(fill, stops[i]);
			}
			g.fillStyle = fill;
		}
		else g.fillStyle = style.get('color');

		renderText();

		return wrapper;

	};

})());
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright © 1988, 1990, 1993, 2002 Adobe Systems Incorporated.  All Rights
 * Reserved.
 * 
 * Trademark:
 * Helvetica is a Trademark of Heidelberger Druckmaschinen AG exclusively licensed
 * through Linotype Library GmbH, and may be registered in certain jurisdictions.
 * 
 * Full name:
 * HelveticaNeueLTStd-Roman
 * 
 * Designer:
 * Linotype Staff
 * 
 * Vendor URL:
 * http://www.adobe.com/type
 * 
 * License information:
 * http://www.adobe.com/type/legal.html
 */

Cufon.registerFont({"w":200,"face":{"font-family":"Helvetica Neue LT Std","font-weight":400,"font-stretch":"normal","units-per-em":"360","panose-1":"2 11 6 4 2 2 2 2 2 4","ascent":"257","descent":"-103","x-height":"4","bbox":"-8 -287 329 77","underline-thickness":"18","underline-position":"-18","stemh":"27","stemv":"31","unicode-range":"U+0020-U+007E"},"glyphs":{" ":{"w":100},"!":{"d":"64,-257v2,68,-4,130,-9,191r-16,0r-9,-112r0,-79r34,0xm27,0r0,-40r40,0r0,40r-40,0","w":93},"\"":{"d":"39,-164r0,-93r25,0r0,93r-25,0xm90,-164r0,-93r24,0r0,93r-24,0","w":153},"#":{"d":"37,0r10,-74r-35,0r0,-25r39,0r7,-54r-36,0r0,-24r40,0r10,-74r25,0r-11,74r45,0r10,-74r25,0r-10,74r32,0r0,24r-35,0r-8,54r33,0r0,25r-37,0r-10,74r-25,0r11,-74r-45,0r-10,74r-25,0xm128,-153r-45,0r-7,54r44,0"},"$":{"d":"90,-150r0,-84v-23,3,-41,16,-41,43v0,26,17,34,41,41xm110,-113r0,90v27,-2,47,-15,47,-46v0,-27,-21,-36,-47,-44xm9,-78r31,0v1,32,21,50,50,55r0,-95v-51,-12,-73,-28,-73,-70v0,-44,32,-72,73,-75r0,-24r20,0r0,24v39,5,62,30,71,71r-31,0v-5,-23,-18,-37,-40,-41r0,88v36,9,79,16,79,73v0,46,-33,74,-79,78r0,30r-20,0r0,-30v-47,-5,-77,-34,-81,-84"},"%":{"d":"211,-67v0,-39,14,-73,58,-73v45,0,58,33,58,72v0,37,-16,72,-58,72v-44,0,-58,-32,-58,-71xm238,-68v0,21,3,53,30,53v27,0,32,-31,32,-53v0,-21,-4,-52,-31,-52v-27,0,-31,30,-31,52xm33,-182v0,-39,14,-73,58,-73v45,0,58,33,58,72v0,37,-16,72,-58,72v-44,0,-58,-32,-58,-71xm60,-183v0,21,3,52,30,52v27,0,32,-30,32,-52v0,-21,-4,-52,-31,-52v-27,0,-31,30,-31,52xm68,8r193,-268r31,0r-193,268r-31,0","w":360},"&":{"d":"148,-53r-59,-71v-24,14,-45,27,-45,58v0,54,83,55,104,13xm192,0r-27,-32v-15,24,-45,36,-73,36v-69,0,-80,-49,-80,-70v0,-40,27,-61,60,-78v-14,-21,-28,-34,-28,-60v0,-28,21,-53,58,-53v32,0,62,18,62,53v0,31,-23,52,-48,66r46,57v5,-13,7,-26,8,-40r29,0v-3,30,-6,40,-17,63r50,58r-40,0xm99,-158v15,-9,34,-23,34,-45v0,-15,-11,-27,-29,-27v-14,0,-30,8,-30,27v0,15,14,31,25,45","w":226},"(":{"d":"97,71r-24,0v-72,-101,-76,-232,0,-334r24,0v-66,106,-64,228,0,334","w":93},")":{"d":"20,71r-24,0v66,-106,64,-228,0,-334r24,0v72,101,76,232,0,334","w":93},"*":{"d":"72,-257r0,41r39,-15r7,18r-39,13r24,33r-15,11r-25,-34r-23,34r-17,-11r24,-33r-38,-13r6,-18r38,15r0,-41r19,0","w":126},"+":{"d":"120,-182r0,79r79,0r0,24r-79,0r0,79r-24,0r0,-79r-79,0r0,-24r79,0r0,-79r24,0","w":216},",":{"d":"30,0r0,-40r40,0v2,47,0,82,-40,93r0,-18v16,-5,22,-23,21,-35r-21,0","w":100},"-":{"d":"18,-86r0,-28r104,0r0,28r-104,0","w":140},".":{"d":"30,0r0,-40r40,0r0,40r-40,0","w":100},"\/":{"d":"-6,6r106,-269r26,0r-106,269r-26,0","w":119},"0":{"d":"15,-125v0,-57,5,-130,85,-130v80,0,85,73,85,130v0,56,-5,129,-85,129v-80,0,-85,-73,-85,-129xm48,-126v0,38,0,103,52,103v52,0,53,-65,53,-103v0,-38,-1,-102,-53,-102v-52,0,-52,64,-52,102"},"1":{"d":"128,-255r0,255r-30,0r0,-183r-67,0r0,-24v35,0,67,-9,74,-48r23,0"},"2":{"d":"9,0v-3,-104,134,-103,136,-182v0,-28,-22,-46,-49,-46v-36,0,-51,32,-50,63r-30,0v-3,-52,28,-90,82,-90v45,0,80,25,80,73v0,87,-118,89,-134,155r131,0r0,27r-166,0"},"3":{"d":"78,-120r0,-26v33,5,61,-8,62,-41v0,-27,-19,-41,-45,-41v-33,0,-48,25,-48,55r-31,0v2,-49,28,-82,79,-82v44,0,78,21,78,68v1,23,-18,41,-35,52v31,7,46,31,46,62v0,51,-40,77,-88,77v-52,0,-86,-30,-85,-83r30,0v1,33,20,56,55,56v30,0,55,-18,55,-49v0,-39,-33,-54,-73,-48"},"4":{"d":"151,-255r0,168r34,0r0,27r-34,0r0,60r-29,0r0,-60r-112,0r0,-29r116,-166r25,0xm36,-87r86,0r-1,-125"},"5":{"d":"169,-251r0,27r-103,0r-13,74v50,-42,130,-9,130,69v0,43,-30,85,-89,85v-44,0,-80,-27,-81,-73r30,0v2,26,23,46,54,46v29,0,54,-19,54,-60v0,-58,-76,-77,-105,-34r-27,-1r24,-133r126,0"},"6":{"d":"103,-137v-34,0,-53,25,-53,57v0,32,20,57,53,57v33,0,51,-26,51,-56v0,-32,-16,-58,-51,-58xm180,-190r-31,0v-3,-23,-19,-38,-43,-38v-51,-1,-63,60,-61,97v37,-63,142,-29,142,50v0,37,-21,85,-85,85v-76,0,-88,-68,-88,-122v0,-70,21,-137,94,-137v42,0,68,24,72,65"},"7":{"d":"183,-251r0,26v-51,51,-93,145,-98,225r-34,0v6,-86,47,-165,101,-222r-134,0r0,-29r165,0"},"8":{"d":"47,-72v0,31,22,49,54,49v31,0,52,-21,52,-49v0,-28,-23,-49,-52,-49v-30,0,-54,19,-54,49xm23,-190v0,-42,36,-65,75,-65v89,-2,100,90,42,118v31,10,46,32,46,64v0,49,-38,77,-85,77v-49,0,-87,-25,-87,-77v0,-30,17,-54,45,-64v-21,-9,-36,-30,-36,-53xm56,-189v0,28,20,41,45,41v24,0,42,-15,42,-41v0,-26,-18,-39,-43,-39v-24,0,-44,13,-44,39"},"9":{"d":"147,-170v0,-31,-18,-58,-52,-58v-36,0,-50,29,-50,60v0,28,20,54,50,54v32,0,52,-26,52,-56xm18,-62r30,0v2,25,23,39,47,39v36,0,59,-36,57,-99v-35,66,-140,31,-140,-50v0,-49,35,-83,84,-83v48,0,88,26,88,122v0,88,-27,137,-89,137v-43,0,-73,-22,-77,-66"},":":{"d":"30,0r0,-40r40,0r0,40r-40,0xm70,-186r0,40r-40,0r0,-40r40,0","w":100},";":{"d":"30,0r0,-40r40,0v2,47,0,82,-40,93r0,-18v16,-5,22,-23,21,-35r-21,0xm70,-186r0,40r-40,0r0,-40r40,0","w":100},"<":{"d":"199,-185r0,24r-153,70r153,69r0,25r-182,-83r0,-22","w":216},"=":{"d":"199,-140r0,25r-182,0r0,-25r182,0xm17,-42r0,-25r182,0r0,25r-182,0","w":216},">":{"d":"17,3r0,-25r153,-69r-153,-70r0,-24r182,83r0,22","w":216},"?":{"d":"176,-191v0,62,-69,62,-62,128r-30,0v-9,-72,60,-70,60,-131v0,-26,-18,-42,-44,-42v-34,0,-50,26,-50,59r-30,0v-1,-49,30,-86,80,-86v44,0,76,26,76,72xm78,0r0,-40r40,0r0,40r-40,0"},"@":{"d":"151,-182v-34,0,-57,44,-57,75v0,20,13,35,31,35v31,0,55,-46,55,-76v0,-17,-14,-34,-29,-34xm222,-199r-34,120v0,6,3,11,9,11v22,0,50,-43,50,-82v0,-57,-48,-93,-98,-93v-62,0,-109,52,-109,115v0,107,141,153,200,71r23,0v-23,40,-67,63,-113,63v-76,0,-135,-60,-135,-136v0,-74,61,-133,134,-133v67,0,122,46,122,111v0,63,-50,104,-84,104v-13,0,-21,-9,-24,-23v-27,41,-96,25,-96,-33v0,-50,33,-102,84,-102v17,0,33,7,41,29r8,-22r22,0","w":288},"A":{"d":"-3,0r101,-257r38,0r100,257r-38,0r-28,-77r-108,0r-29,77r-36,0xm117,-226v-17,38,-29,81,-45,120r87,0","w":233},"B":{"d":"62,-118r0,89v57,-2,137,15,134,-46v-2,-60,-78,-39,-134,-43xm28,-257v83,3,192,-20,192,63v0,27,-15,48,-39,58v78,18,59,136,-29,136r-124,0r0,-257xm62,-228r0,81v51,-1,126,10,123,-41v-4,-60,-72,-34,-123,-40","w":246},"C":{"d":"243,-180r-34,0v-7,-36,-36,-54,-72,-54v-61,0,-87,50,-87,104v0,59,25,107,87,107v45,0,71,-32,74,-74r35,0v-6,64,-47,103,-112,103v-80,0,-119,-59,-119,-134v0,-75,43,-135,122,-135v54,0,98,28,106,83","w":259},"D":{"d":"28,0r0,-257r88,0v79,0,124,39,124,122v0,86,-38,135,-124,135r-88,0xm62,-228r0,199r57,0v23,0,87,-6,87,-101v0,-61,-23,-98,-86,-98r-58,0","w":253},"E":{"d":"28,0r0,-257r178,0r0,29r-144,0r0,81r134,0r0,29r-134,0r0,89r145,0r0,29r-179,0","w":219},"F":{"d":"28,0r0,-257r169,0r0,29r-135,0r0,81r118,0r0,29r-118,0r0,118r-34,0","w":206,"k":{"A":20,",":57,".":57}},"G":{"d":"229,0r-9,-32v-20,27,-52,38,-82,38v-77,0,-123,-62,-123,-129v0,-75,42,-140,123,-140v56,0,100,25,110,85r-34,0v-7,-39,-38,-56,-76,-56v-62,0,-88,54,-88,109v0,54,31,102,88,102v53,0,84,-37,82,-84r-82,0r0,-28r113,0r0,135r-22,0","w":273},"H":{"d":"28,0r0,-257r34,0r0,110r136,0r0,-110r34,0r0,257r-34,0r0,-118r-136,0r0,118r-34,0","w":259},"I":{"d":"30,0r0,-257r34,0r0,257r-34,0","w":93},"J":{"d":"159,-257r0,193v0,35,-18,70,-76,70v-54,0,-79,-33,-75,-91r34,0v-1,36,5,62,42,62v31,0,41,-18,41,-46r0,-188r34,0","w":186},"K":{"d":"28,0r0,-257r34,0r0,128r131,-128r44,0r-108,104r112,153r-43,0r-93,-130r-43,40r0,90r-34,0","w":240},"L":{"d":"28,0r0,-257r34,0r0,228r136,0r0,29r-170,0","k":{"T":33,"V":33,"W":20,"y":13,"Y":40}},"M":{"d":"29,0r0,-257r47,0r81,216r81,-216r47,0r0,257r-33,0r0,-214r-81,214r-29,0r-81,-214r0,214r-32,0","w":313},"N":{"d":"28,0r0,-257r36,0r136,208r0,-208r33,0r0,257r-38,0r-135,-206r0,206r-32,0","w":259},"O":{"d":"14,-129v0,-70,41,-134,123,-134v82,0,123,64,123,134v0,70,-41,135,-123,135v-82,0,-123,-65,-123,-135xm137,-234v-121,1,-120,210,0,211v120,-1,120,-210,0,-211","w":273},"P":{"d":"28,0r0,-257r113,0v51,0,79,28,79,76v0,48,-28,76,-79,76r-79,0r0,105r-34,0xm62,-228r0,94v55,0,129,9,123,-47v6,-55,-68,-47,-123,-47","w":233,"k":{"A":27,",":64,".":64}},"Q":{"d":"255,1r-17,21r-40,-31v-17,10,-37,15,-61,15v-82,0,-123,-65,-123,-135v0,-70,41,-134,123,-134v127,0,157,162,84,237xm144,-53r18,-20r34,27v53,-56,39,-188,-59,-188v-121,1,-120,210,0,211v13,0,24,-2,35,-7","w":273},"R":{"d":"62,-139v57,-4,130,17,131,-45v0,-25,-14,-44,-46,-44r-85,0r0,89xm198,0v-17,-27,9,-110,-52,-110r-84,0r0,110r-34,0r0,-257r121,0v86,-9,106,110,34,132v56,13,26,86,53,125r-38,0","w":246,"k":{"T":6,"V":6,"W":6,"Y":13}},"S":{"d":"186,-69v0,-73,-165,-28,-165,-119v0,-52,46,-75,93,-75v53,0,93,24,95,81r-32,0v-4,-37,-29,-52,-64,-52v-29,0,-58,11,-58,44v0,32,42,36,83,45v41,9,82,24,82,74v0,55,-53,77,-100,77v-58,0,-107,-28,-107,-91r33,0v0,43,36,62,75,62v31,0,65,-9,65,-46","w":233},"T":{"d":"86,0r0,-228r-85,0r0,-29r205,0r0,29r-85,0r0,228r-35,0","w":206,"k":{"w":40,"y":40,"A":33,",":40,".":40,"c":40,"e":40,"o":40,"-":46,"a":40,"r":33,"s":40,"u":33,":":40,";":40}},"U":{"d":"233,-257r0,164v0,65,-37,99,-101,99v-66,0,-105,-31,-105,-99r0,-164r34,0r0,164v0,45,26,70,71,70v101,0,58,-143,67,-234r34,0","w":259},"V":{"d":"221,-257r-92,257r-39,0r-90,-257r37,0r74,223r74,-223r36,0","w":219,"k":{"y":6,"A":17,",":46,".":46,"e":20,"o":20,"-":20,"a":20,"r":13,"u":13,":":17,";":17,"i":6}},"W":{"d":"329,-257r-69,257r-35,0r-60,-216r-59,216r-36,0r-66,-257r35,0r51,214r58,-214r37,0r58,214r52,-214r34,0","w":333,"k":{"A":9,",":27,".":27,"e":21,"o":21,"a":13,"r":6,"u":6,":":6,";":6}},"X":{"d":"0,0r89,-132r-84,-125r41,0r64,100r67,-100r38,0r-85,125r90,132r-41,0r-70,-106r-71,106r-38,0","w":219},"Y":{"d":"233,-257r-99,152r0,105r-34,0r0,-105r-99,-152r40,0r77,122r76,-122r39,0","w":233,"k":{"v":20,"A":27,",":50,".":50,"e":40,"o":40,"q":33,"-":40,"a":33,"u":27,":":33,";":33,"i":13,"p":27}},"Z":{"d":"8,0r0,-29r160,-199r-148,0r0,-29r188,0r0,29r-159,199r163,0r0,29r-204,0","w":219},"[":{"d":"93,-263r0,24r-38,0r0,286r38,0r0,24r-67,0r0,-334r67,0","w":93},"\\":{"d":"20,-263r106,269r-26,0r-106,-269r26,0","w":119},"]":{"d":"0,71r0,-24r39,0r0,-286r-39,0r0,-24r67,0r0,334r-67,0","w":93},"^":{"d":"18,-95r78,-156r24,0r78,156r-25,0r-65,-130r-64,130r-26,0","w":216},"_":{"d":"0,45r0,-18r180,0r0,18r-180,0","w":180},"a":{"d":"138,-96v-25,17,-94,1,-93,46v0,20,17,27,36,27v55,0,60,-27,57,-73xm188,-24r0,23v-18,9,-51,7,-48,-23v-31,41,-126,42,-127,-24v0,-42,31,-51,63,-57v34,-6,63,-4,63,-27v0,-48,-90,-40,-88,4r-31,0v2,-46,38,-62,79,-62v33,0,70,7,70,51r0,95v-1,19,4,24,19,20","w":193},"b":{"d":"168,-95v0,-35,-17,-68,-57,-68v-41,0,-57,35,-57,70v0,37,16,70,58,70v42,0,56,-36,56,-72xm24,0r0,-257r31,0r0,96v10,-21,34,-29,60,-29v57,0,86,44,86,97v0,53,-28,97,-85,97v-19,0,-47,-7,-61,-29r0,25r-31,0","w":213},"c":{"d":"181,-126r-32,0v-5,-23,-21,-37,-46,-37v-44,0,-58,34,-58,72v0,34,16,68,55,68v30,0,47,-17,51,-45r31,0v-7,45,-35,72,-82,72v-57,0,-87,-40,-87,-95v0,-56,29,-99,88,-99v42,0,76,20,80,64","w":193},"d":{"d":"189,-257r0,257r-30,0v-1,-8,2,-19,-1,-25v-10,21,-33,29,-59,29v-57,0,-86,-45,-86,-98v0,-82,93,-130,146,-67r0,-96r30,0xm45,-91v0,35,18,68,58,68v41,0,57,-35,57,-70v0,-37,-17,-70,-59,-70v-42,0,-56,36,-56,72","w":213},"e":{"d":"152,-59r30,0v-8,41,-38,63,-80,63v-59,0,-89,-41,-89,-98v0,-56,36,-96,87,-96v66,0,87,61,85,106r-140,0v-1,32,17,61,58,61v25,0,44,-12,49,-36xm45,-111r107,0v-1,-29,-23,-52,-53,-52v-32,0,-52,24,-54,52","w":193},"f":{"d":"36,0r0,-159r-32,0r0,-27r32,0v-8,-53,19,-85,71,-71r0,27v-18,-6,-41,-5,-41,18r0,26r36,0r0,27r-36,0r0,159r-30,0","w":106,"k":{"f":6}},"g":{"d":"98,-25v72,0,77,-137,2,-138v-39,0,-55,31,-55,67v0,33,13,71,53,71xm184,-186v-7,109,35,262,-87,262v-35,0,-75,-14,-77,-55r31,0v1,22,28,30,48,30v44,1,61,-37,55,-83v-10,23,-35,34,-58,34v-55,0,-83,-43,-83,-94v0,-44,22,-98,86,-98v24,-1,43,12,56,31r0,-27r29,0","w":206},"h":{"d":"23,0r0,-257r31,0r0,98v10,-22,37,-31,59,-31v94,-2,56,109,64,190r-30,0r0,-126v0,-23,-15,-37,-38,-37v-76,-1,-51,94,-55,163r-31,0"},"i":{"d":"25,0r0,-186r30,0r0,186r-30,0xm55,-257r0,37r-30,0r0,-37r30,0","w":79},"j":{"d":"55,-186r0,210v0,39,-24,51,-60,46r0,-26v19,1,30,1,30,-25r0,-205r30,0xm55,-257r0,37r-30,0r0,-37r30,0","w":79},"k":{"d":"25,0r0,-257r30,0r0,152r85,-81r41,0r-73,68r79,118r-39,0r-64,-97r-29,26r0,71r-30,0","w":186},"l":{"d":"25,0r0,-257r30,0r0,257r-30,0","w":79},"m":{"d":"23,0r0,-186r29,0v1,8,-2,21,1,27v22,-38,93,-46,111,0v25,-46,120,-44,120,23r0,136r-31,0r0,-122v0,-23,-6,-41,-36,-41v-72,-1,-42,99,-48,163r-31,0r0,-122v0,-24,-8,-41,-35,-41v-79,0,-40,93,-49,163r-31,0","w":307},"n":{"d":"23,0r0,-186r29,0v1,9,-2,22,1,29v13,-23,33,-33,60,-33v94,-2,56,109,64,190r-30,0r0,-126v0,-23,-15,-37,-38,-37v-76,-1,-51,94,-55,163r-31,0"},"o":{"d":"13,-93v0,-55,31,-97,90,-97v59,0,91,42,91,97v0,54,-32,97,-91,97v-59,0,-90,-43,-90,-97xm45,-93v0,45,26,70,58,70v32,0,58,-25,58,-70v0,-45,-26,-70,-58,-70v-32,0,-58,25,-58,70","w":206},"p":{"d":"168,-95v0,-35,-17,-68,-57,-68v-41,0,-57,35,-57,70v0,37,16,70,58,70v42,0,56,-36,56,-72xm24,71r0,-257r31,0r0,25v10,-21,34,-29,60,-29v57,0,86,44,86,97v0,53,-28,97,-85,97v-19,0,-47,-7,-61,-29r0,96r-31,0","w":213},"q":{"d":"189,-186r0,257r-30,0r-1,-96v-10,21,-33,29,-59,29v-57,0,-86,-45,-86,-98v0,-82,93,-130,146,-67r0,-25r30,0xm45,-91v0,35,18,68,58,68v41,0,57,-35,57,-70v0,-37,-17,-70,-59,-70v-42,0,-56,36,-56,72","w":213},"r":{"d":"22,0r0,-186r29,0r0,39v15,-30,36,-44,69,-43r0,32v-81,-4,-66,83,-67,158r-31,0","w":119,"k":{",":33,".":33,"c":6,"d":6,"e":6,"g":10,"n":-6,"o":6,"q":6,"-":20}},"s":{"d":"48,-140v10,47,121,19,121,86v0,44,-41,58,-79,58v-42,0,-77,-17,-79,-63r31,0v1,27,25,36,50,36v19,0,45,-4,45,-27v0,-50,-122,-19,-122,-88v0,-37,38,-52,70,-52v41,0,73,13,76,58r-31,0v-2,-24,-23,-31,-43,-31v-18,0,-39,4,-39,23","w":180},"t":{"d":"66,-242r0,56r37,0r0,27r-37,0r0,115v-4,19,18,17,37,17r0,27v-40,0,-68,3,-68,-41r0,-118r-32,0r0,-27r32,0r0,-56r31,0","w":113},"u":{"d":"177,-186r0,186r-29,0r0,-30v-13,23,-34,34,-61,34v-94,2,-56,-109,-64,-190r31,0r0,126v0,23,14,37,37,37v77,1,52,-93,56,-163r30,0"},"v":{"d":"175,-186r-68,186r-33,0r-69,-186r34,0r53,155r51,-155r32,0","w":180,"k":{",":27,".":27}},"w":{"d":"267,-186r-60,186r-32,0r-39,-148r-37,148r-33,0r-60,-186r34,0r43,152r37,-152r34,0r39,152r42,-152r32,0","w":272,"k":{",":20,".":20}},"x":{"d":"3,0r70,-98r-65,-88r40,0r44,65r47,-65r36,0r-64,86r72,100r-39,0r-52,-77r-52,77r-37,0","w":186},"y":{"d":"177,-186r-81,211v-17,44,-35,58,-75,46r0,-28v17,8,36,6,43,-12r13,-32r-74,-185r34,0r56,152r52,-152r32,0","w":180,"k":{",":27,".":27}},"z":{"d":"8,0r0,-23r112,-136r-105,0r0,-27r145,0r0,21r-114,138r119,0r0,27r-157,0","w":172},"{":{"d":"111,-263r0,21v-51,-11,-35,54,-35,97v0,35,-24,45,-31,50v8,1,31,11,31,48v0,38,-21,105,35,97r0,21v-39,3,-64,-5,-64,-47v0,-42,6,-108,-30,-108r0,-24v36,0,30,-66,30,-108v0,-42,25,-50,64,-47","w":119},"|":{"d":"28,77r0,-360r24,0r0,360r-24,0","w":79},"}":{"d":"9,71r0,-21v51,11,35,-54,35,-97v0,-35,24,-44,31,-49v-8,-1,-31,-12,-31,-49v0,-38,21,-105,-35,-97r0,-21v39,-3,64,5,64,47v0,42,-7,109,30,108r0,24v-35,0,-30,66,-30,108v0,42,-25,50,-64,47","w":119},"~":{"d":"70,-113v24,0,57,26,77,26v14,0,23,-15,31,-28r13,18v-11,15,-23,31,-45,31v-37,0,-91,-53,-108,2r-13,-18v8,-15,21,-31,45,-31","w":216},"'":{"d":"38,-164r0,-93r24,0r0,93r-24,0","w":100},"`":{"d":"39,-212r-47,-51r39,0r31,51r-23,0","w":79},"\u00a0":{"w":100}}});
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright © 1988, 1990, 1993, 2002 Adobe Systems Incorporated.  All Rights
 * Reserved. © 1981, 2002 Heidelberger Druckmaschinen AG. All rights reserved.
 * 
 * Trademark:
 * Helvetica is a trademark of Heidelberger Druckmaschinen AG, exclusively
 * licensed through Linotype Library GmbH, and may be registered in certain
 * jurisdictions.
 * 
 * Full name:
 * HelveticaNeueLTStd-LtIt
 * 
 * Designer:
 * Linotype Staff
 * 
 * Vendor URL:
 * http://www.adobe.com/type
 * 
 * License information:
 * http://www.adobe.com/type/legal.html
 */

Cufon.registerFont({"w":200,"face":{"font-family":"Helvetica Neue LT Std","font-weight":300,"font-style":"italic","font-stretch":"normal","units-per-em":"360","panose-1":"2 11 4 3 2 2 2 9 2 4","ascent":"257","descent":"-103","x-height":"5","bbox":"-49 -283 352 77","underline-thickness":"18","underline-position":"-18","slope":"-12","stemh":"19","stemv":"23","unicode-range":"U+0020-U+007E"},"glyphs":{" ":{"w":100},"!":{"d":"39,0r-31,0r9,-38r30,0xm44,-64r-14,0r19,-113r18,-80r24,0","w":100},"\"":{"d":"49,-170r0,-87r21,0r0,87r-21,0xm94,-170r0,-87r21,0r0,87r-21,0","w":133},"#":{"d":"179,-96r-4,16r-36,0r-11,80r-18,0r11,-80r-51,0r-11,80r-18,0r11,-80r-39,0r3,-16r38,0r8,-57r-39,0r3,-16r38,0r12,-80r18,0r-12,80r51,0r11,-80r18,0r-11,80r38,0r-4,16r-36,0r-8,57r38,0xm131,-153r-51,0r-8,57r51,0"},"$":{"d":"96,-146r21,-96v-33,0,-69,14,-69,52v0,30,25,36,48,44xm107,-120r-22,104v35,4,78,-15,78,-55v0,-33,-29,-42,-56,-49xm206,-182r-24,0v0,-38,-18,-54,-50,-58r-20,99v37,11,76,21,76,67v0,27,-24,84,-108,79r-6,31r-16,0r7,-33v-45,-6,-76,-35,-73,-88r24,0v-2,42,19,62,53,67r23,-106v-36,-8,-69,-25,-68,-65v0,-55,49,-73,97,-73r4,-19r16,0r-4,20v42,5,72,28,69,79"},"%":{"d":"73,-118v-32,0,-49,-20,-49,-50v0,-40,22,-86,67,-86v30,0,48,21,48,50v0,40,-20,86,-66,86xm73,-134v34,0,47,-41,47,-69v0,-20,-8,-35,-30,-35v-33,0,-47,43,-47,70v0,18,10,34,30,34xm209,5v-32,0,-48,-20,-48,-50v0,-40,22,-86,67,-86v30,0,48,21,48,50v0,40,-21,86,-67,86xm209,-11v34,0,47,-41,47,-69v0,-20,-8,-35,-30,-35v-33,0,-47,43,-47,70v0,18,10,34,30,34xm37,12r206,-272r19,0r-205,272r-20,0","w":299},"&":{"d":"100,-151v20,-11,53,-28,53,-55v0,-21,-16,-32,-35,-32v-48,0,-42,61,-18,87xm143,-47r-51,-79v-28,14,-63,31,-63,67v0,58,89,56,114,12xm176,-113r23,0v-5,24,-15,46,-31,67r30,46r-26,0r-19,-30v-35,51,-147,50,-147,-30v0,-45,40,-65,76,-82v-39,-38,-31,-115,37,-115v29,0,57,16,57,47v0,38,-37,58,-66,74r46,72v10,-13,16,-32,20,-49","w":219},"(":{"d":"56,69r-15,0v-49,-124,-15,-251,64,-331r19,0v-76,88,-107,203,-68,331","w":93},")":{"d":"31,-262r16,0v50,124,14,251,-65,331r-19,0v76,-88,109,-203,68,-331","w":93},"*":{"d":"62,-202r-36,-20r7,-12r37,20r10,-43r14,0r-9,45r41,-9r2,14r-41,9r21,36r-13,7r-22,-38r-31,33r-10,-10","w":126},"+":{"d":"99,-100r0,-81r19,0r0,81r81,0r0,19r-81,0r0,81r-19,0r0,-81r-81,0r0,-19r81,0","w":216},",":{"d":"-4,49r3,-14v17,-5,20,-20,24,-35r-15,0r9,-38r30,0v-11,36,-8,82,-51,87","w":100},"-":{"d":"14,-89r4,-20r90,0r-4,20r-90,0","w":133},".":{"d":"39,0r-31,0r9,-38r30,0","w":100},"\/":{"d":"141,-262r-148,267r-21,0r148,-267r21,0","w":119},"0":{"d":"78,5v-54,0,-69,-47,-69,-93v0,-63,33,-166,111,-166v54,0,71,40,71,88v0,68,-30,171,-113,171xm168,-168v0,-34,-10,-67,-51,-67v-61,0,-85,106,-85,154v0,35,11,67,51,67v63,0,85,-106,85,-154"},"1":{"d":"48,-189r5,-18v31,-5,63,-18,80,-45r17,0r-54,252r-23,0r45,-209v-22,12,-46,16,-70,20"},"2":{"d":"-4,0v1,-104,170,-98,170,-190v0,-31,-25,-45,-52,-45v-39,0,-61,31,-63,67r-22,0v2,-50,37,-86,87,-86v40,0,72,23,72,65v-2,93,-141,96,-166,168r141,0r-4,21r-163,0"},"3":{"d":"3,-80r23,0v-2,39,15,66,55,66v37,0,68,-25,68,-62v-1,-39,-31,-49,-68,-47r4,-19v41,1,80,-1,80,-49v0,-29,-23,-44,-49,-44v-37,0,-57,24,-63,60r-23,0v9,-48,37,-79,87,-79v37,0,71,21,71,62v0,31,-22,56,-53,61v25,6,37,27,37,53v0,53,-43,83,-89,83v-59,0,-81,-35,-80,-85"},"4":{"d":"147,-213r-121,131r93,0xm4,-84r154,-168r20,0r-37,170r39,0r-5,19r-37,0r-14,63r-23,0r14,-63r-115,0"},"5":{"d":"22,-121r41,-128r129,0r-6,21r-110,0r-26,81v44,-43,125,-13,125,54v0,57,-38,98,-96,98v-47,0,-77,-29,-74,-76r23,0v-3,36,18,57,54,57v78,0,103,-134,16,-134v-22,0,-44,8,-56,29"},"6":{"d":"157,-91v0,-33,-24,-54,-57,-54v-74,0,-91,131,-9,131v44,0,66,-37,66,-77xm13,-80v0,-74,35,-174,114,-174v43,0,70,22,70,66r-23,0v-1,-32,-17,-47,-49,-47v-54,0,-74,65,-84,106v34,-61,139,-36,139,41v0,54,-37,93,-92,93v-51,0,-75,-37,-75,-85"},"7":{"d":"40,-228r5,-21r161,0r-5,20v-63,61,-113,144,-139,229r-26,0v29,-93,81,-165,141,-228r-137,0"},"8":{"d":"29,-66v0,36,27,52,60,52v37,0,65,-23,65,-60v0,-37,-27,-50,-62,-50v-35,0,-63,22,-63,58xm176,-73v3,95,-170,110,-170,7v0,-41,32,-65,67,-72v-22,-7,-36,-27,-36,-50v-2,-83,150,-92,151,-5v1,33,-24,53,-53,61v28,8,41,31,41,59xm114,-235v-28,0,-54,17,-54,48v0,30,23,44,51,44v30,0,54,-17,54,-49v0,-30,-23,-43,-51,-43"},"9":{"d":"109,-235v-44,0,-67,37,-67,77v0,33,25,54,58,54v74,0,91,-131,9,-131xm186,-169v0,74,-34,176,-113,174v-43,0,-70,-21,-70,-65r23,0v1,32,16,46,48,46v53,1,78,-67,84,-106v-34,61,-138,36,-138,-41v0,-54,37,-93,92,-93v51,0,74,37,74,85"},":":{"d":"39,0r-31,0r9,-38r30,0xm71,-142r-30,0r8,-38r31,0","w":100},";":{"d":"-4,49r3,-14v17,-5,20,-20,24,-35r-15,0r9,-38r30,0v-11,36,-8,82,-51,87xm71,-142r-30,0r8,-38r31,0","w":100},"<":{"d":"199,-17r0,20r-182,-84r0,-20r182,-84r0,20r-160,74","w":216},"=":{"d":"199,-136r0,19r-181,0r0,-19r181,0xm199,-65r0,19r-181,0r0,-19r181,0","w":216},">":{"d":"17,-17r160,-74r-160,-74r0,-20r182,84r0,20r-182,84r0,-20","w":216},"?":{"d":"187,-202v0,68,-90,73,-94,136r-23,0v0,-69,95,-70,95,-133v0,-29,-21,-44,-49,-44v-38,0,-59,29,-62,66r-23,0v2,-52,34,-85,86,-85v36,0,70,20,70,60xm53,0r8,-38r31,0r-9,38r-30,0","w":193},"@":{"d":"153,-184v-37,0,-61,50,-61,84v0,22,13,34,30,34v33,0,60,-52,60,-84v0,-17,-15,-34,-29,-34xm202,-196r19,0r-35,104v-5,15,-7,30,5,30v32,0,61,-50,61,-90v0,-59,-47,-94,-102,-94v-67,0,-114,53,-114,119v0,66,48,116,114,116v35,0,72,-18,93,-48r19,0v-22,40,-67,64,-112,64v-77,0,-133,-59,-133,-135v0,-75,59,-132,132,-132v69,0,122,46,122,112v0,58,-43,104,-83,104v-12,0,-24,-8,-25,-24v-26,39,-94,26,-94,-29v0,-50,35,-104,86,-104v16,0,30,9,38,31","w":288},"A":{"d":"-27,0r157,-257r27,0r47,257r-26,0r-13,-80r-117,0r-48,80r-27,0xm140,-236v-29,43,-53,91,-80,135r102,0","w":226},"B":{"d":"53,-123r-22,102v71,-1,161,14,161,-57v0,-64,-81,-40,-139,-45xm2,0r56,-257v74,3,169,-20,170,59v0,33,-23,59,-56,64v27,3,44,26,44,53v-2,100,-117,79,-214,81xm78,-236r-20,92v64,-1,145,11,145,-52v0,-57,-73,-36,-125,-40","w":240},"C":{"d":"248,-176r-25,0v-1,-43,-29,-66,-71,-66v-77,0,-115,70,-115,140v0,53,32,87,85,87v41,0,74,-28,87,-73r24,0v-12,53,-49,93,-115,93v-67,0,-106,-44,-106,-109v0,-82,52,-158,140,-158v54,0,95,29,96,86","w":253},"D":{"d":"78,-236r-47,215r62,0v85,1,121,-67,121,-138v0,-74,-60,-82,-136,-77xm2,0r56,-257r82,0v74,0,98,41,98,103v0,81,-48,154,-140,154r-96,0","w":246},"E":{"d":"2,0r55,-257r172,0r-5,21r-147,0r-20,93r138,0r-5,21r-137,0r-22,101r151,0r-5,21r-175,0","w":206},"F":{"d":"2,0r55,-257r164,0r-4,21r-140,0r-20,93r124,0r-4,21r-124,0r-27,122r-24,0","w":193,"k":{"A":18,",":46,".":46}},"G":{"d":"254,-178r-24,0v-1,-43,-33,-64,-80,-64v-68,0,-113,69,-113,138v0,53,28,89,83,89v57,0,93,-41,102,-95r-88,0r5,-21r110,0r-27,131r-17,0v1,-14,6,-31,4,-43v-49,84,-197,54,-197,-59v0,-83,48,-160,140,-160v64,0,100,31,102,84","w":266},"H":{"d":"2,0r55,-257r24,0r-24,112r149,0r24,-112r24,0r-55,257r-24,0r27,-125r-149,0r-27,125r-24,0","w":253},"I":{"d":"2,0r54,-257r25,0r-55,257r-24,0","w":79},"J":{"d":"-4,-82r25,0v-12,36,2,67,41,67v37,0,49,-29,55,-59r39,-183r25,0r-41,192v-10,45,-31,70,-80,70v-49,0,-78,-35,-64,-87","w":180},"K":{"d":"2,0r55,-257r24,0r-29,138r166,-138r34,0r-131,107r91,150r-28,0r-81,-135r-58,46r-19,89r-24,0","w":233},"L":{"d":"2,0r55,-257r25,0r-51,236r142,0r-5,21r-166,0","w":193,"k":{"T":27,"V":27,"W":20,"y":13,"Y":33}},"M":{"d":"1,0r56,-257r35,0r40,231r141,-231r36,0r-55,257r-24,0r52,-233r-142,233r-25,0r-42,-236r-49,236r-23,0","w":306},"N":{"d":"0,0r55,-257r28,0r103,230r48,-230r24,0r-56,257r-27,0r-104,-230r-48,230r-23,0","w":253},"O":{"d":"234,-149v0,-53,-25,-93,-82,-93v-77,0,-115,70,-115,140v0,53,32,87,85,87v70,0,112,-70,112,-134xm118,5v-67,0,-106,-44,-106,-109v0,-82,52,-158,140,-158v66,0,106,42,106,107v0,84,-49,160,-140,160","w":266},"P":{"d":"2,0r55,-257v76,1,173,-17,172,63v0,53,-37,84,-88,84r-91,0r-24,110r-24,0xm77,-236r-22,105v69,0,150,11,150,-59v0,-62,-72,-43,-128,-46","w":226,"k":{"A":27,",":59,".":59}},"Q":{"d":"201,-22r33,30r-15,15r-36,-34v-75,41,-171,-1,-171,-93v0,-82,52,-158,140,-158v66,0,106,42,106,107v0,53,-20,103,-57,133xm138,-54r14,-14r32,30v66,-46,78,-204,-32,-204v-77,0,-115,70,-115,140v0,70,71,107,129,75","w":266},"R":{"d":"2,0r55,-257v77,3,176,-20,176,64v0,39,-29,65,-65,71v55,10,19,79,34,122r-26,0v-12,-40,22,-113,-35,-114r-91,0r-24,114r-24,0xm77,-236r-22,101v68,-1,151,14,154,-56v3,-64,-77,-41,-132,-45","w":233,"k":{"T":6,"y":-9}},"S":{"d":"219,-182r-25,0v0,-45,-24,-60,-68,-60v-32,0,-66,15,-66,52v1,39,42,41,71,51v34,12,69,22,69,65v0,25,-15,79,-99,79v-58,0,-100,-28,-97,-90r24,0v-3,50,28,70,75,70v33,0,73,-17,73,-56v0,-76,-140,-33,-140,-118v0,-51,45,-73,91,-73v52,0,95,21,92,80","w":226},"T":{"d":"25,-236r4,-21r201,0r-4,21r-88,0r-52,236r-24,0r51,-236r-88,0","k":{"w":33,"y":33,"A":24,",":40,".":40,"-":35,"a":33,"c":33,"e":33,"i":2,"o":33,"r":33,"s":33,"u":33,":":33,";":33}},"U":{"d":"17,-68v0,-67,25,-126,37,-189r24,0r-34,163v-11,50,17,80,68,79v46,0,74,-25,83,-68r36,-174r25,0r-37,176v-13,60,-51,86,-110,86v-45,0,-92,-19,-92,-73","w":253},"V":{"d":"63,0r-40,-257r25,0r34,236r131,-236r27,0r-148,257r-29,0","w":213,"k":{"y":6,"A":13,",":40,".":40,"-":20,"a":13,"e":13,"i":6,"o":13,"r":6,"u":6,":":20,";":20}},"W":{"d":"45,0r-19,-257r24,0r14,229r110,-229r29,0r18,226r106,-226r25,0r-124,257r-26,0r-18,-234r-112,234r-27,0","w":326,"k":{"A":9,",":27,".":27,"-":6,"a":6,"e":6,"i":-4,"o":6,":":13,";":13}},"X":{"d":"-24,0r118,-134r-64,-123r27,0r54,108r93,-108r29,0r-112,127r67,130r-26,0r-57,-114r-101,114r-28,0","w":206},"Y":{"d":"108,-127r107,-130r30,0r-129,153r-22,104r-25,0r23,-106r-68,-151r26,0","w":206,"k":{"v":13,"A":18,",":40,".":40,"-":27,"a":27,"e":27,"i":5,"o":27,"u":20,":":27,";":27,"p":20,"q":27}},"Z":{"d":"35,-236r5,-21r185,0r-4,20r-206,216r172,0r-5,21r-200,0r5,-22r205,-214r-157,0","w":206},"[":{"d":"48,69r-58,0r70,-331r59,0r-4,19r-35,0r-63,293r34,0","w":86},"\\":{"d":"127,5r-148,-267r21,0r148,267r-21,0","w":119},"]":{"d":"44,-262r58,0r-70,331r-59,0r4,-19r36,0r63,-293r-35,0","w":86},"^":{"d":"37,-86r-21,0r83,-163r18,0r83,163r-20,0r-72,-140","w":216},"_":{"d":"180,45r-180,0r0,-18r180,0r0,18","w":180},"a":{"d":"135,-99v-34,18,-116,-5,-116,52v0,24,20,33,42,33v50,1,66,-42,74,-85xm165,-150v0,32,-24,111,-24,126v1,9,13,7,21,6r-3,18v-22,6,-44,0,-38,-29v-23,46,-124,51,-124,-17v0,-61,77,-56,123,-63v15,-2,23,-12,23,-36v0,-22,-23,-27,-40,-27v-29,0,-53,11,-58,42r-23,0v6,-42,39,-61,79,-61v25,0,64,8,64,41","w":186},"b":{"d":"86,-14v51,0,78,-55,78,-100v0,-35,-16,-58,-53,-58v-50,0,-76,60,-76,102v0,31,17,56,51,56xm-4,0r55,-257r22,0r-21,104v13,-22,36,-38,64,-38v47,0,71,33,71,77v0,57,-35,119,-98,119v-31,0,-57,-16,-63,-47r-9,42r-21,0","w":206},"c":{"d":"175,-128r-22,0v2,-28,-18,-44,-45,-44v-54,0,-80,53,-80,101v0,33,17,57,52,57v30,0,51,-19,61,-46r22,0v-14,42,-41,65,-86,65v-46,0,-72,-30,-72,-76v0,-58,37,-120,101,-120v40,0,70,20,69,63","w":186},"d":{"d":"78,-14v52,0,81,-58,81,-104v0,-32,-19,-54,-52,-54v-52,0,-79,58,-79,103v0,32,16,55,50,55xm213,-257r-55,257r-22,0v2,-10,8,-24,7,-33v-16,24,-34,38,-67,38v-48,0,-71,-31,-71,-76v0,-57,40,-120,102,-120v30,-1,51,13,61,40r22,-106r23,0","w":206},"e":{"d":"174,-87r-145,0v-5,41,11,73,53,73v30,0,52,-19,61,-46r22,0v-12,41,-40,65,-84,65v-49,0,-76,-30,-76,-78v0,-59,36,-118,100,-118v57,0,79,45,69,104xm32,-106r121,0v3,-40,-14,-66,-50,-66v-37,0,-63,31,-71,66","w":186},"f":{"d":"107,-186r-5,19r-36,0r-37,167r-23,0r37,-167r-32,0r4,-19r32,0v5,-44,23,-83,79,-69r-4,19v-37,-11,-50,18,-52,50r37,0","w":93},"g":{"d":"30,-81v0,31,15,58,50,58v46,0,74,-50,74,-92v0,-33,-13,-57,-50,-57v-46,0,-74,50,-74,91xm193,-186r-35,167v-14,65,-36,93,-94,93v-38,0,-70,-16,-71,-60r22,0v0,32,26,41,53,41v58,0,64,-60,72,-93v-34,59,-132,36,-132,-42v0,-55,36,-111,95,-111v29,-1,54,16,61,43r8,-38r21,0"},"h":{"d":"-4,0r55,-257r23,0r-22,105v20,-47,122,-60,122,11v0,49,-20,94,-29,141r-23,0r29,-139v0,-24,-19,-33,-39,-33v-33,0,-63,30,-73,77r-20,95r-23,0","w":193},"i":{"d":"-4,0r40,-186r23,0r-40,186r-23,0xm44,-221r7,-36r23,0r-8,36r-22,0","w":66},"j":{"d":"-10,31r46,-217r23,0r-47,218v-5,29,-28,42,-61,35r4,-19v17,5,32,-2,35,-17xm44,-221r7,-36r23,0r-8,36r-22,0","w":66},"k":{"d":"-4,0r55,-257r22,0r-33,162r108,-91r31,0r-88,72r56,114r-25,0r-49,-100r-40,33r-14,67r-23,0","w":166},"l":{"d":"-4,0r55,-257r23,0r-55,257r-23,0","w":66},"m":{"d":"-4,0r40,-186r21,0r-7,33v19,-42,103,-58,112,1v18,-48,121,-56,116,10v-4,51,-19,95,-28,142r-23,0r29,-140v0,-18,-12,-32,-36,-32v-68,1,-68,111,-86,172r-22,0r28,-139v0,-18,-10,-33,-32,-33v-65,2,-75,108,-89,172r-23,0","w":299},"n":{"d":"-4,0r40,-186r21,0v-1,11,-7,25,-6,34v21,-46,123,-61,123,11v0,49,-20,94,-29,141r-23,0r29,-139v0,-24,-19,-33,-39,-33v-33,0,-63,30,-73,77r-20,95r-23,0","w":193},"o":{"d":"109,-191v43,0,73,27,73,73v0,63,-34,123,-103,123v-48,0,-74,-31,-74,-77v0,-61,38,-119,104,-119xm84,-14v50,0,75,-57,75,-100v0,-35,-18,-58,-54,-58v-50,0,-77,54,-77,98v0,36,18,60,56,60"},"p":{"d":"118,-172v-52,0,-81,59,-81,105v0,32,19,53,52,53v52,0,79,-58,79,-103v0,-32,-16,-55,-50,-55xm-17,69r55,-255r21,0v-2,11,-8,25,-7,34v16,-24,35,-39,68,-39v48,0,70,31,70,76v0,57,-39,120,-101,120v-30,0,-53,-14,-60,-42r-23,106r-23,0","w":206},"q":{"d":"109,-172v-51,0,-78,56,-78,101v0,35,16,57,53,57v50,0,76,-60,76,-102v0,-31,-17,-56,-51,-56xm199,-186r-54,255r-23,0r21,-102v-14,22,-37,38,-65,38v-47,0,-70,-33,-70,-77v0,-57,35,-119,98,-119v32,-1,55,19,65,42r8,-37r20,0","w":206},"r":{"d":"-4,0r40,-186r21,0v-2,14,-9,31,-9,43v16,-30,37,-48,79,-45r-5,23v-89,-8,-83,95,-103,165r-23,0","w":113,"k":{"v":-6,"y":-6,",":33,".":33,"-":20}},"s":{"d":"45,-140v0,45,99,32,99,89v0,42,-40,56,-75,56v-36,0,-71,-19,-69,-65r22,0v0,36,27,46,53,46v20,0,47,-10,47,-34v0,-50,-100,-33,-100,-92v0,-36,39,-51,69,-51v39,0,67,17,66,60r-23,0v2,-28,-17,-41,-43,-41v-20,0,-46,6,-46,32","w":173},"t":{"d":"11,-167r4,-19r34,0r12,-56r23,0r-12,56r37,0r-4,19r-38,0r-28,137v-1,17,24,13,39,11r-4,20v-35,6,-64,-2,-55,-45r26,-123r-34,0","w":106},"u":{"d":"185,-186r-40,186r-21,0r6,-34v-21,46,-123,61,-123,-11v0,-49,20,-94,29,-141r22,0r-28,139v0,24,19,33,39,33v67,2,79,-108,93,-172r23,0","w":193},"v":{"d":"42,0r-29,-186r23,0r23,160r87,-160r25,0r-105,186r-24,0","w":166,"k":{",":33,".":33}},"w":{"d":"32,0r-21,-186r24,0r15,159r77,-159r26,0r14,157r79,-157r24,0r-98,186r-24,0r-14,-156r-77,156r-25,0","w":266,"k":{",":27,".":27}},"x":{"d":"-21,0r89,-98r-44,-88r26,0r34,73r64,-73r27,0r-81,90r49,96r-26,0r-40,-81r-71,81r-27,0","w":166},"y":{"d":"-20,67r5,-18v42,9,51,-25,65,-49r-34,-186r24,0r27,158r86,-158r24,0r-132,230v-12,23,-36,28,-65,23","w":166,"k":{",":33,".":33}},"z":{"d":"16,-167r4,-19r139,0r-3,18r-145,149r119,0r-4,19r-147,0r4,-18r144,-149r-111,0","w":153},"{":{"d":"64,69v-70,7,-28,-79,-25,-129v0,-16,-5,-27,-18,-27r4,-19v64,-10,14,-171,108,-156v-3,7,1,22,-12,19v-23,-7,-30,62,-36,87v-8,40,-35,54,-39,60v7,0,23,37,13,58r-14,72v-2,9,8,19,23,16","w":119},"|":{"d":"31,77r0,-360r19,0r0,360r-19,0","w":79},"}":{"d":"47,-262v70,-8,28,78,25,128v0,16,5,27,18,27r-4,20v-65,10,-14,171,-108,156v3,-7,-1,-22,12,-19v23,6,32,-63,37,-88v9,-40,34,-53,38,-59v-7,0,-18,-36,-13,-59r15,-72v3,-10,-9,-18,-24,-15","w":119},"~":{"d":"70,-112v24,-1,56,23,77,23v14,0,23,-11,31,-24r13,13v-11,15,-23,31,-45,31v-37,0,-90,-50,-108,1r-13,-13v8,-15,21,-31,45,-31","w":216},"'":{"d":"55,-170r0,-87r21,0r0,87r-21,0","w":100},"`":{"d":"24,-262r27,0r29,51r-18,0","w":66},"\u00a0":{"w":100}}});
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright © 1988, 1990, 1993, 2002 Adobe Systems Incorporated.  All Rights
 * Reserved. © 1981, 2002 Heidelberger Druckmaschinen AG. All rights reserved.
 * 
 * Trademark:
 * Helvetica is a trademark of Heidelberger Druckmaschinen AG, exclusively
 * licensed through Linotype Library GmbH, and may be registered in certain
 * jurisdictions.
 * 
 * Full name:
 * HelveticaNeueLTStd-Md
 * 
 * Designer:
 * Linotype Staff
 * 
 * Vendor URL:
 * http://www.adobe.com/type
 * 
 * License information:
 * http://www.adobe.com/type/legal.html
 */

Cufon.registerFont({"w":200,"face":{"font-family":"Helvetica Neue LT Std","font-weight":500,"font-stretch":"normal","units-per-em":"360","panose-1":"2 11 6 4 2 2 2 2 2 4","ascent":"257","descent":"-103","x-height":"5","bbox":"-10 -291 338 77","underline-thickness":"18","underline-position":"-18","stemh":"32","stemv":"41","unicode-range":"U+0020-U+007E"},"glyphs":{" ":{"w":100},"!":{"d":"40,-72v-7,-59,-15,-117,-12,-185r45,0v2,68,-5,126,-12,185r-21,0xm26,0r0,-45r48,0r0,45r-48,0","w":100},"\"":{"d":"30,-156r0,-101r37,0r0,101r-37,0xm93,-156r0,-101r37,0r0,101r-37,0","w":159},"#":{"d":"178,-103r0,27r-34,0r-11,76r-29,0r11,-76r-40,0r-11,76r-28,0r10,-76r-34,0r0,-27r38,0r7,-46r-34,0r0,-27r37,0r11,-76r29,0r-11,76r40,0r10,-76r29,0r-10,76r31,0r0,27r-35,0r-6,46r30,0xm125,-149r-40,0r-6,46r40,0"},"$":{"d":"109,-110r0,84v26,-2,44,-14,44,-43v0,-27,-22,-35,-44,-41xm6,-78r41,0v0,32,13,51,46,52r0,-87v-39,-11,-81,-27,-81,-80v0,-46,38,-70,81,-70r0,-28r16,0r0,28v43,0,79,22,79,70r-41,0v-1,-24,-12,-38,-38,-38r0,76v44,12,85,28,85,80v0,54,-37,79,-85,81r0,28r-16,0r0,-28v-52,-1,-88,-30,-87,-84xm93,-159r0,-72v-26,0,-40,11,-40,36v0,23,20,31,40,36"},"%":{"d":"270,5v-44,0,-60,-33,-60,-72v0,-39,18,-71,60,-71v42,0,60,32,60,71v0,39,-16,72,-60,72xm243,-67v0,27,7,49,27,49v20,0,28,-22,28,-49v0,-24,-6,-48,-28,-48v-22,0,-27,24,-27,48xm90,-114v-44,0,-60,-32,-60,-71v0,-39,18,-72,60,-72v42,0,60,33,60,72v0,39,-16,71,-60,71xm62,-185v0,27,7,48,27,48v20,0,28,-21,28,-48v0,-24,-6,-49,-28,-49v-22,0,-27,25,-27,49xm94,9r140,-270r27,0r-139,270r-28,0","w":360},"&":{"d":"109,-233v-15,0,-28,12,-28,29v0,17,15,30,24,43v15,-10,30,-21,30,-42v0,-17,-10,-30,-26,-30xm143,-56r-51,-63v-15,9,-39,17,-39,48v0,28,17,44,41,44v30,0,41,-19,49,-29xm188,0r-23,-29v-40,58,-153,40,-153,-42v0,-36,29,-60,59,-75v-13,-17,-26,-34,-26,-56v0,-37,28,-61,63,-61v33,0,64,20,64,61v0,30,-22,53,-47,66r40,48v3,-8,6,-18,8,-35r36,0v-3,22,-8,45,-20,63r49,60r-50,0","w":233},"(":{"d":"103,69r-34,0v-63,-88,-70,-237,0,-332r34,0v-58,99,-59,233,0,332","w":100},")":{"d":"-3,-263r34,0v63,88,70,237,0,332r-34,0v58,-99,59,-233,0,-332","w":100},"*":{"d":"47,-192r-40,-14r8,-23r39,15r0,-43r25,0r0,43r39,-15r9,23r-41,14r25,34r-19,14r-26,-36r-24,36r-20,-14","w":133},"+":{"d":"90,-109r0,-73r36,0r0,73r73,0r0,36r-73,0r0,73r-36,0r0,-73r-73,0r0,-36r73,0","w":216},",":{"d":"25,0r0,-49r50,0v4,55,-3,98,-49,106r0,-22v16,-4,24,-20,24,-35r-25,0","w":100},"-":{"d":"18,-78r0,-39r104,0r0,39r-104,0","w":140},".":{"d":"25,0r0,-49r50,0r0,49r-50,0","w":100},"\/":{"d":"-8,6r103,-269r40,0r-104,269r-39,0","w":126},"0":{"d":"100,-29v36,0,46,-44,46,-97v0,-53,-10,-97,-46,-97v-36,0,-46,44,-46,97v0,53,10,97,46,97xm100,-257v72,0,87,74,87,131v0,57,-15,131,-87,131v-72,0,-87,-74,-87,-131v0,-57,15,-131,87,-131"},"1":{"d":"19,-178r0,-32v35,0,68,-12,74,-42r33,0r0,252r-45,0r0,-178r-62,0"},"2":{"d":"186,-180v0,75,-103,96,-123,143r123,0r0,37r-172,0v0,-41,21,-71,55,-95v33,-23,75,-44,76,-83v0,-18,-7,-45,-42,-45v-32,0,-42,28,-43,63r-41,0v0,-56,30,-97,86,-97v62,0,81,45,81,77"},"3":{"d":"82,-117r0,-31v27,1,56,-8,56,-39v0,-21,-16,-36,-39,-36v-28,0,-43,26,-42,52r-41,0v2,-49,32,-86,83,-86v39,0,80,22,80,67v1,26,-14,44,-36,55v28,6,46,31,46,63v0,48,-41,77,-89,77v-58,0,-88,-35,-89,-88r41,0v-1,31,16,54,48,54v27,0,48,-16,48,-45v0,-39,-34,-44,-66,-43"},"4":{"d":"188,-92r0,32r-32,0r0,60r-39,0r0,-60r-108,0r0,-40r108,-152r39,0r0,160r32,0xm117,-203v-28,35,-51,75,-77,111r77,0r0,-111"},"5":{"d":"17,-114r27,-138r131,0r0,37r-100,0v-3,21,-12,45,-12,65v46,-47,125,-4,125,65v0,40,-25,90,-87,90v-49,0,-86,-27,-88,-77r41,0v3,27,19,43,46,43v35,0,47,-25,47,-56v0,-49,-69,-74,-89,-29r-41,0"},"6":{"d":"103,-29v30,0,44,-26,44,-53v0,-27,-14,-51,-44,-51v-30,0,-46,23,-46,51v0,27,16,53,46,53xm183,-188r-41,0v-2,-21,-16,-35,-37,-35v-44,-1,-51,56,-51,87v37,-62,134,-19,134,55v0,49,-34,86,-84,86v-74,0,-92,-59,-92,-132v0,-60,24,-130,95,-130v40,0,74,28,76,69"},"7":{"d":"13,-215r0,-37r172,0r0,34v-53,59,-88,127,-94,218r-45,0v5,-80,45,-157,97,-215r-130,0"},"8":{"d":"100,-27v27,0,48,-17,48,-47v0,-28,-21,-44,-48,-44v-27,0,-48,16,-48,44v0,30,21,47,48,47xm100,5v-51,0,-89,-30,-89,-79v0,-32,18,-55,46,-62v-63,-26,-36,-130,43,-121v79,-9,108,94,43,121v82,25,44,141,-43,141xm100,-225v-22,0,-40,14,-40,39v0,24,17,37,40,37v23,0,40,-13,40,-37v0,-25,-18,-39,-40,-39"},"9":{"d":"97,-223v-30,0,-44,25,-44,52v0,27,14,53,44,53v31,0,46,-25,46,-53v0,-27,-15,-52,-46,-52xm17,-64r41,0v2,21,16,35,37,35v44,1,51,-56,51,-87v-37,60,-134,23,-134,-55v0,-49,32,-86,87,-86v71,0,89,59,89,132v0,60,-24,130,-95,130v-40,0,-74,-28,-76,-69"},":":{"d":"25,-134r0,-48r50,0r0,48r-50,0xm25,0r0,-49r50,0r0,49r-50,0","w":100},";":{"d":"25,0r0,-49r50,0v4,55,-3,98,-49,106r0,-22v16,-4,24,-20,24,-35r-25,0xm25,-134r0,-48r50,0r0,48r-50,0","w":100},"<":{"d":"199,-34r0,37r-182,-81r0,-26r182,-81r0,37r-134,57","w":216},"=":{"d":"199,-146r0,37r-182,0r0,-37r182,0xm199,-73r0,37r-182,0r0,-37r182,0","w":216},">":{"d":"17,-34r134,-57r-134,-57r0,-37r182,81r0,26r-182,81r0,-37","w":216},"?":{"d":"80,-70v-8,-73,58,-66,58,-119v0,-29,-23,-40,-36,-40v-30,0,-43,22,-43,54r-41,0v0,-53,33,-88,86,-88v44,0,79,27,79,73v0,67,-66,52,-64,120r-39,0xm75,0r0,-45r48,0r0,45r-48,0"},"@":{"d":"130,-78v28,0,49,-38,49,-64v0,-17,-13,-32,-28,-32v-30,0,-50,36,-50,63v0,19,11,33,29,33xm221,-195r-26,95v-4,11,-6,24,4,24v22,0,47,-33,47,-77v0,-54,-43,-87,-96,-87v-61,0,-104,48,-104,108v0,109,126,150,188,79r25,0v-62,106,-241,57,-241,-80v0,-73,60,-130,132,-130v64,0,120,43,120,105v0,72,-56,108,-85,108v-12,0,-19,-9,-22,-21v-29,38,-92,16,-92,-36v0,-64,79,-133,119,-68r6,-20r25,0","w":288},"A":{"d":"120,-213v-16,35,-26,75,-40,111r79,0xm-3,0r99,-257r48,0r99,257r-48,0r-24,-68r-103,0r-24,68r-47,0","w":240},"B":{"d":"72,-117r0,80v51,-3,123,15,123,-40v0,-54,-72,-38,-123,-40xm27,0r0,-257v83,4,202,-23,202,64v0,27,-16,43,-37,55v31,7,48,31,48,66v0,40,-28,72,-95,72r-118,0xm72,-220r0,71v47,-3,112,14,112,-36v0,-53,-67,-30,-112,-35","w":253},"C":{"d":"246,-175r-45,0v-8,-30,-27,-51,-64,-51v-55,0,-78,48,-78,97v0,49,23,98,78,98v40,0,61,-30,65,-67r44,0v-4,62,-47,104,-109,104v-77,0,-123,-62,-123,-135v0,-73,46,-134,123,-134v58,0,104,33,109,88","w":259},"D":{"d":"72,-220r0,183r45,0v71,0,85,-41,85,-92v0,-51,-14,-91,-85,-91r-45,0xm27,0r0,-257r107,0v79,0,113,57,113,128v0,71,-34,129,-113,129r-107,0","w":259},"E":{"d":"27,0r0,-257r185,0r0,39r-140,0r0,67r130,0r0,37r-130,0r0,75r143,0r0,39r-188,0","w":226},"F":{"d":"27,0r0,-257r178,0r0,39r-133,0r0,67r117,0r0,37r-117,0r0,114r-45,0","w":213,"k":{"A":20,",":46,".":46}},"G":{"d":"252,-135r0,135r-29,0r-7,-30v-73,86,-201,7,-201,-99v0,-73,47,-134,124,-134v56,0,103,30,110,88r-44,0v-4,-34,-34,-51,-66,-51v-55,0,-79,48,-79,97v0,49,24,98,79,98v46,0,71,-26,72,-70r-69,0r0,-34r110,0","w":273},"H":{"d":"26,0r0,-257r45,0r0,102r117,0r0,-102r45,0r0,257r-45,0r0,-116r-117,0r0,116r-45,0","w":259},"I":{"d":"27,0r0,-257r45,0r0,257r-45,0","w":100},"J":{"d":"166,-257r0,174v0,45,-11,89,-85,89v-59,-1,-79,-40,-76,-96r45,0v-1,33,3,59,35,59v29,0,36,-17,36,-49r0,-177r45,0","w":193},"K":{"d":"27,0r0,-257r45,0r0,117r115,-117r55,0r-102,103r109,154r-56,0r-84,-123r-37,37r0,86r-45,0","w":246},"L":{"d":"27,0r0,-257r45,0r0,218r131,0r0,39r-176,0","w":206,"k":{"T":33,"V":33,"W":20,"y":13,"Y":40}},"M":{"d":"27,0r0,-257r63,0r72,201r69,-201r62,0r0,257r-42,0r-1,-198r-71,198r-38,0r-72,-198r0,198r-42,0","w":320},"N":{"d":"26,0r0,-257r47,0r118,189r0,-189r43,0r0,257r-48,0r-118,-189r0,189r-42,0","w":259},"O":{"d":"137,-263v77,0,123,61,123,134v0,73,-46,135,-123,135v-77,0,-123,-62,-123,-135v0,-73,46,-134,123,-134xm137,-226v-55,0,-78,48,-78,97v0,49,23,98,78,98v55,0,78,-49,78,-98v0,-49,-23,-97,-78,-97","w":273},"P":{"d":"72,-220r0,85v52,-3,111,15,111,-43v0,-60,-61,-38,-111,-42xm27,0r0,-257r114,0v73,0,87,48,87,80v0,32,-14,78,-87,78r-69,0r0,99r-45,0","w":240,"k":{"A":27,",":61,".":61}},"Q":{"d":"166,-37r-26,-22r21,-25r32,27v42,-55,27,-169,-56,-169v-55,0,-78,48,-78,97v0,59,42,117,107,92xm224,-30r33,29r-22,24r-38,-32v-91,48,-183,-25,-183,-120v0,-73,46,-134,123,-134v118,0,160,156,87,233","w":273},"R":{"d":"72,-220r0,80v50,-2,120,14,118,-41v-2,-60,-68,-33,-118,-39xm27,0r0,-257r123,0v56,0,85,25,85,69v0,50,-35,60,-42,66v15,2,38,13,38,54v0,30,4,58,14,68r-48,0v-15,-44,4,-106,-58,-106r-67,0r0,106r-45,0","w":253,"k":{"T":6,"V":6,"W":6,"Y":13}},"S":{"d":"12,-86r45,0v0,40,29,55,65,55v62,0,67,-56,33,-70v-18,-8,-42,-11,-77,-21v-44,-12,-56,-39,-56,-66v0,-51,48,-75,94,-75v54,0,98,28,98,82r-45,0v-2,-33,-24,-45,-55,-45v-21,0,-47,7,-47,33v0,44,65,38,104,53v33,12,50,38,50,65v0,58,-51,81,-102,81v-59,0,-106,-28,-107,-92","w":233},"T":{"d":"3,-218r0,-39r208,0r0,39r-82,0r0,218r-45,0r0,-218r-81,0","w":213,"k":{"w":40,"y":40,"A":33,",":40,".":40,"c":40,"e":40,"o":40,"-":46,"a":36,"r":33,"s":40,"u":33,":":30,";":30}},"U":{"d":"24,-93r0,-164r45,0r0,150v0,35,3,74,61,74v58,0,60,-39,60,-74r0,-150r45,0r0,164v0,66,-42,99,-105,99v-63,0,-106,-33,-106,-99","w":259},"V":{"d":"84,0r-86,-257r47,0r65,203r66,-203r46,0r-88,257r-50,0","w":219,"k":{"y":6,"A":20,",":46,".":46,"e":20,"o":20,"-":20,"a":20,"r":13,"u":13,":":17,";":17,"i":-4}},"W":{"d":"70,0r-68,-257r46,0r47,197r52,-197r46,0r51,197r48,-197r46,0r-71,257r-46,0r-52,-197r-53,197r-46,0","w":339,"k":{"A":9,",":27,".":27,"e":6,"o":6,"-":10,"a":13,"r":6,"u":6,":":6,";":6}},"X":{"d":"90,-133r-85,-124r54,0r58,91r61,-91r50,0r-85,124r91,133r-54,0r-64,-98r-66,98r-51,0","w":233},"Y":{"d":"94,0r0,-101r-96,-156r52,0r68,115r67,-115r50,0r-96,156r0,101r-45,0","w":233,"k":{"v":20,"A":27,",":40,".":40,"e":33,"o":33,"q":37,"-":40,"a":33,"u":31,":":33,";":33,"i":3,"p":31}},"Z":{"d":"20,-218r0,-39r195,0r0,34r-149,184r153,0r0,39r-211,0r0,-37r150,-181r-138,0","w":226},"[":{"d":"26,69r0,-332r80,0r0,32r-41,0r0,267r41,0r0,33r-80,0","w":106},"\\":{"d":"31,-263r104,269r-40,0r-103,-269r39,0","w":126},"]":{"d":"81,-263r0,332r-81,0r0,-33r42,0r0,-267r-42,0r0,-32r81,0","w":106},"^":{"d":"67,-121r-37,0r65,-131r26,0r65,131r-37,0r-41,-89","w":216},"_":{"d":"180,45r-180,0r0,-18r180,0r0,18","w":180},"a":{"d":"136,-93v-26,16,-83,-1,-83,42v9,39,81,30,83,-12r0,-30xm177,-137r0,96v-1,15,8,15,20,13r0,28v-22,7,-54,9,-57,-18v-37,36,-127,33,-128,-31v0,-46,36,-53,71,-58v30,-4,56,-3,56,-27v0,-40,-81,-31,-80,5r-41,0v3,-48,44,-62,85,-62v36,0,74,15,74,54"},"b":{"d":"114,-27v72,0,67,-133,0,-132v-35,0,-52,26,-52,66v0,37,19,66,52,66xm23,0r0,-257r41,0r0,95v11,-18,35,-29,56,-29v59,0,87,45,87,99v0,50,-25,97,-80,97v-25,0,-53,-7,-65,-31r0,26r-39,0","w":219},"c":{"d":"188,-124r-41,0v-3,-23,-19,-35,-42,-35v-21,0,-51,11,-51,68v0,31,13,64,49,64v24,0,40,-16,44,-43r41,0v-8,48,-37,75,-85,75v-58,0,-90,-41,-90,-96v0,-56,30,-100,91,-100v43,0,80,21,84,67"},"d":{"d":"106,-159v-71,1,-70,131,-1,132v37,0,52,-34,52,-66v0,-41,-19,-66,-51,-66xm197,-257r0,257r-39,0v-1,-8,2,-19,-1,-25v-11,21,-34,30,-57,30v-59,0,-87,-43,-87,-99v-2,-100,92,-123,143,-68r0,-95r41,0","w":219},"e":{"d":"190,-82r-136,0v-9,54,81,78,95,24r39,0v-9,41,-43,63,-84,63v-58,0,-91,-41,-91,-98v0,-53,35,-98,90,-98v59,0,94,53,87,109xm54,-109r95,0v-1,-26,-18,-50,-46,-50v-28,0,-48,22,-49,50"},"f":{"d":"3,-156r0,-30r31,0v-5,-64,29,-80,80,-69r0,33v-15,-4,-40,-7,-39,17r0,19r35,0r0,30r-35,0r0,156r-41,0r0,-156r-31,0","w":113,"k":{"f":6}},"g":{"d":"103,-32v67,0,69,-128,0,-127v-67,1,-66,127,0,127xm194,-186r0,176v0,56,-33,84,-92,84v-37,0,-79,-14,-83,-58r41,0v5,23,24,27,45,27v44,0,53,-34,47,-76v-12,21,-33,33,-56,33v-59,0,-83,-45,-83,-98v0,-77,97,-128,140,-63r0,-25r41,0","w":213},"h":{"d":"22,0r0,-257r41,0r0,95v26,-47,122,-37,122,34r0,128r-41,0r0,-117v-1,-29,-12,-42,-36,-42v-65,2,-41,96,-45,159r-41,0","w":206},"i":{"d":"23,0r0,-186r41,0r0,186r-41,0xm23,-218r0,-39r41,0r0,39r-41,0","w":86},"j":{"d":"23,14r0,-200r41,0r0,202v3,44,-28,65,-72,56r0,-32v21,4,31,-1,31,-26xm23,-218r0,-39r41,0r0,39r-41,0","w":86},"k":{"d":"23,0r0,-257r41,0r0,146r74,-75r50,0r-71,68r78,118r-50,0r-57,-90r-24,23r0,67r-41,0","w":193},"l":{"d":"23,0r0,-257r41,0r0,257r-41,0","w":86},"m":{"d":"22,0r0,-186r38,0v1,8,-3,22,2,26v16,-37,93,-45,109,0v27,-46,121,-45,121,31r0,129r-41,0r0,-109v0,-30,-2,-50,-34,-50v-63,1,-34,101,-40,159r-41,0r0,-120v0,-26,-8,-39,-33,-39v-57,0,-37,101,-40,159r-41,0","w":313},"n":{"d":"22,0r0,-186r38,0v1,9,-2,21,1,28v27,-52,124,-42,124,30r0,128r-41,0r0,-117v-1,-29,-12,-42,-36,-42v-65,2,-41,96,-45,159r-41,0","w":206},"o":{"d":"107,-27v72,-1,71,-131,0,-132v-72,1,-71,131,0,132xm107,5v-60,0,-94,-41,-94,-98v0,-57,34,-98,94,-98v60,0,94,41,94,98v0,57,-34,98,-94,98","w":213},"p":{"d":"114,-27v72,0,67,-133,0,-132v-35,0,-52,26,-52,66v0,37,19,66,52,66xm23,69r0,-255r39,0r0,25v12,-21,34,-30,58,-30v59,0,87,45,87,99v0,50,-25,97,-80,97v-24,0,-50,-8,-63,-29r0,93r-41,0","w":219},"q":{"d":"54,-93v0,32,14,66,51,66v36,0,52,-27,52,-66v0,-40,-18,-66,-52,-66v-34,0,-51,32,-51,66xm197,-186r0,255r-41,0r-1,-93v-13,21,-38,29,-62,29v-55,0,-80,-47,-80,-97v0,-54,28,-99,87,-99v25,-1,44,11,58,30r0,-25r39,0","w":219},"r":{"d":"22,0r0,-186r38,0v1,11,-2,27,1,36v6,-24,36,-47,70,-40r0,40v-41,-9,-68,13,-68,61r0,89r-41,0","w":126,"k":{",":33,".":33,"c":6,"d":6,"e":6,"n":-6,"o":6,"q":6,"-":20}},"s":{"d":"12,-60r41,0v2,24,20,33,42,33v15,0,42,-4,41,-25v-1,-22,-31,-24,-61,-31v-30,-6,-60,-17,-60,-55v0,-76,151,-71,156,4r-43,0v-4,-19,-20,-25,-38,-25v-12,0,-33,3,-33,19v0,20,30,23,60,30v30,7,60,18,60,55v0,44,-44,60,-83,60v-47,0,-81,-21,-82,-65","w":186},"t":{"d":"3,-156r0,-30r31,0r0,-56r41,0r0,56r37,0r0,30r-37,0r0,100v-4,25,15,27,37,24r0,32v-44,8,-78,-4,-78,-46r0,-110r-31,0","w":119},"u":{"d":"185,-186r0,186r-40,0v-1,-8,2,-20,-1,-26v-30,54,-122,36,-122,-42r0,-118r41,0r0,114v0,33,13,45,35,45v72,-1,39,-96,46,-159r41,0","w":206},"v":{"d":"71,0r-68,-186r45,0r48,143r45,-143r43,0r-67,186r-46,0","w":186,"k":{",":27,".":27}},"w":{"d":"62,0r-57,-186r43,0r37,139r35,-139r42,0r34,139r38,-139r41,0r-58,186r-42,0r-35,-138r-35,138r-43,0","w":280,"k":{",":20,".":20}},"x":{"d":"1,0r71,-98r-65,-88r50,0r39,57r40,-57r48,0r-63,86r71,100r-49,0r-48,-69r-45,69r-49,0","w":193},"y":{"d":"72,-1r-71,-185r45,0r49,139r48,-139r42,0r-72,196v-12,42,-37,74,-94,62r0,-35v33,12,49,-11,53,-38","w":186,"k":{",":33,".":33}},"z":{"d":"15,-154r0,-32r151,0r0,29r-106,125r112,0r0,32r-164,0r0,-29r103,-125r-96,0","w":180},"{":{"d":"-1,-81r0,-32v10,0,33,-6,33,-27r0,-74v7,-48,36,-52,79,-49r0,32v-24,-4,-44,5,-40,25r0,71v1,30,-27,34,-37,38v12,1,37,5,37,40v0,40,-23,102,40,93r0,33v-44,3,-79,-1,-79,-50r0,-71v0,-23,-23,-29,-33,-29","w":106},"|":{"d":"22,77r0,-360r36,0r0,360r-36,0","w":79},"}":{"d":"108,-113r0,32v-10,0,-34,5,-34,26r0,74v-7,48,-35,53,-79,50r0,-33v24,4,44,-5,40,-25r0,-70v-1,-30,28,-35,38,-39v-12,-1,-38,-5,-38,-40v0,-40,23,-102,-40,-93r0,-32v44,-2,79,0,79,49r0,71v0,23,24,30,34,30","w":106},"~":{"d":"70,-122v23,0,56,24,77,25v14,0,23,-14,31,-25r13,31v-11,15,-23,31,-45,31v-36,0,-90,-50,-108,0r-13,-31v8,-15,21,-31,45,-31","w":216},"'":{"d":"32,-156r0,-101r36,0r0,101r-36,0","w":100},"`":{"d":"-10,-263r48,0r33,51r-30,0","w":86},"\u00a0":{"w":100}}});
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright © 1988, 1990, 1993, 2002 Adobe Systems Incorporated.  All Rights
 * Reserved. © 1981, 2002 Heidelberger Druckmaschinen AG. All rights reserved.
 * 
 * Trademark:
 * Helvetica is a trademark of Heidelberger Druckmaschinen AG, exclusively
 * licensed through Linotype Library GmbH, and may be registered in certain
 * jurisdictions.
 * 
 * Full name:
 * HelveticaNeueLTStd-Hv
 * 
 * Designer:
 * Linotype Staff
 * 
 * Vendor URL:
 * http://www.adobe.com/type
 * 
 * License information:
 * http://www.adobe.com/type/legal.html
 */

Cufon.registerFont({"w":226,"face":{"font-family":"Helvetica Neue LT Std","font-weight":750,"font-stretch":"normal","units-per-em":"360","panose-1":"2 11 8 4 2 2 2 2 2 4","ascent":"257","descent":"-103","x-height":"5","bbox":"-13 -295 347 77","underline-thickness":"18","underline-position":"-18","stemh":"52","stemv":"61","unicode-range":"U+0020-U+007E"},"glyphs":{" ":{"w":113},"!":{"d":"85,-257v3,66,-9,117,-17,172r-29,0v-8,-55,-20,-106,-17,-172r63,0xm20,0r0,-67r67,0r0,67r-67,0","w":106},"\"":{"d":"106,-127r0,-130r52,0r0,130r-52,0xm22,-127r0,-130r52,0r0,130r-52,0","w":180},"#":{"d":"191,-106r0,38r-28,0r-9,68r-41,0r9,-68r-29,0r-9,68r-42,0r9,-68r-26,0r0,-38r32,0r5,-40r-26,0r0,-38r32,0r9,-67r41,0r-9,67r29,0r10,-67r41,0r-9,67r22,0r0,38r-28,0r-5,40r22,0xm133,-146r-29,0r-6,40r29,0"},"$":{"d":"124,-98r0,52v16,-1,34,-8,34,-25v0,-14,-13,-21,-34,-27xm107,-165r0,-46v-14,0,-31,6,-31,24v0,12,13,17,31,22xm107,-103v-45,-12,-98,-24,-98,-80v0,-55,51,-77,98,-79r0,-33r17,0r0,33v48,3,93,28,93,84r-67,0v1,-18,-11,-27,-26,-31r0,49v47,11,100,24,101,81v0,60,-48,82,-101,84r0,33r-17,0r0,-33v-57,-2,-105,-27,-105,-90r67,0v1,26,15,36,38,39r0,-57"},"%":{"d":"69,-185v0,14,0,40,20,40v19,0,19,-26,19,-40v0,-14,0,-40,-19,-40v-20,0,-20,26,-20,40xm27,-185v0,-39,20,-69,62,-69v42,0,61,28,61,69v0,40,-17,69,-61,69v-44,0,-62,-29,-62,-69xm217,-66v0,-39,20,-69,62,-69v42,0,61,28,61,69v0,40,-17,69,-61,69v-44,0,-62,-29,-62,-69xm259,-66v0,14,0,40,20,40v19,0,19,-26,19,-40v0,-14,0,-40,-19,-40v-20,0,-20,26,-20,40xm129,10r-35,0r145,-271r36,0","w":366},"&":{"d":"139,-63r-38,-45v-13,6,-30,19,-30,34v0,36,50,37,68,11xm190,0r-18,-22v-51,49,-161,29,-160,-51v0,-37,28,-61,59,-75v-48,-39,-12,-114,50,-114v39,0,73,25,73,66v0,30,-18,51,-44,64r27,32v5,-8,8,-16,9,-25r53,0v-2,23,-13,45,-29,62r54,63r-74,0xm120,-168v24,-8,36,-48,2,-51v-31,2,-19,40,-2,51","w":259},"(":{"d":"58,-262r52,0v-52,99,-53,225,0,325r-52,0v-60,-105,-59,-221,0,-325","w":106},")":{"d":"-3,-262r52,0v59,104,60,220,0,325r-52,0v52,-100,52,-226,0,-325","w":106},"*":{"d":"107,-180r28,37r-29,22r-27,-39r-26,39r-29,-21r29,-38r-44,-13r11,-34r42,16r0,-46r36,0r0,46r41,-16r11,34","w":159},"+":{"d":"82,-117r0,-65r52,0r0,65r65,0r0,52r-65,0r0,65r-52,0r0,-65r-65,0r0,-52r65,0","w":216},",":{"d":"23,0r0,-67r67,0r0,59v0,51,-40,68,-67,71r0,-29v19,-5,28,-15,30,-34r-30,0","w":113},"-":{"d":"129,-72r-112,0r0,-52r112,0r0,52","w":146},".":{"d":"23,0r0,-67r67,0r0,67r-67,0","w":113},"\/":{"d":"-3,5r97,-267r56,0r-97,267r-56,0","w":146},"0":{"d":"113,-46v40,0,42,-47,42,-80v0,-33,-2,-78,-42,-78v-39,0,-41,45,-41,78v0,33,2,80,41,80xm112,3v-71,0,-99,-62,-99,-129v0,-67,28,-128,99,-128v73,0,102,61,102,128v0,67,-29,129,-102,129"},"1":{"d":"98,-154r-60,0r0,-45v35,1,71,-12,74,-52r51,0r0,251r-65,0r0,-154"},"2":{"d":"210,-175v1,70,-80,82,-116,123r119,0r0,52r-201,0v-4,-64,64,-104,104,-127v20,-11,33,-25,33,-42v0,-19,-13,-32,-32,-32v-32,0,-42,24,-42,51r-57,0v-4,-62,35,-104,98,-104v50,0,94,25,94,79"},"3":{"d":"93,-111r0,-42v26,0,56,2,56,-26v0,-16,-16,-25,-36,-25v-25,0,-38,12,-38,35r-58,0v1,-56,42,-85,96,-85v44,0,94,18,94,69v1,23,-14,44,-35,50v29,8,43,28,43,58v0,57,-52,80,-102,80v-59,0,-107,-30,-103,-94r58,0v-1,30,14,45,45,45v21,0,40,-9,40,-31v0,-34,-29,-37,-60,-34"},"4":{"d":"182,-108r33,0r0,52r-33,0r0,56r-61,0r0,-56r-110,0r0,-57r112,-138r59,0r0,143xm59,-108r64,0v-1,-26,2,-57,-1,-81"},"5":{"d":"8,-78r61,0v6,48,82,38,82,-9v0,-44,-59,-55,-79,-22r-56,0r25,-142r158,0r0,52r-111,0v-2,15,-9,33,-9,46v49,-41,133,-9,133,63v0,62,-45,93,-103,93v-55,0,-97,-21,-101,-81"},"6":{"d":"75,-85v0,22,15,39,39,39v26,0,43,-18,43,-39v0,-23,-15,-42,-43,-42v-23,0,-39,19,-39,42xm153,-186v-2,-16,-15,-23,-30,-23v-34,-1,-51,38,-49,64v42,-59,140,-15,140,56v0,60,-46,92,-101,92v-74,0,-100,-63,-100,-127v0,-70,34,-130,110,-130v45,0,80,22,88,68r-58,0"},"7":{"d":"58,0v-6,-49,55,-180,84,-195r-120,0r0,-56r182,0r0,49v-30,21,-90,142,-80,202r-66,0"},"8":{"d":"114,-113v-22,0,-42,12,-42,36v0,25,20,35,42,35v21,0,42,-9,42,-35v0,-23,-19,-36,-42,-36xm10,-74v-1,-30,22,-53,49,-60v-24,-6,-38,-27,-38,-51v0,-50,51,-69,93,-69v43,0,93,19,93,69v1,24,-16,45,-37,52v29,6,47,27,47,59v0,55,-53,77,-103,77v-49,0,-104,-18,-104,-77xm114,-209v-20,0,-38,8,-38,29v0,40,75,40,76,0v0,-21,-18,-29,-38,-29"},"9":{"d":"111,-123v26,0,42,-19,42,-42v0,-22,-16,-39,-42,-39v-23,0,-40,18,-40,39v0,23,15,42,40,42xm74,-65v2,15,18,23,34,23v32,1,47,-33,45,-63v-42,58,-140,15,-140,-59v0,-54,44,-90,96,-90v73,0,105,56,105,123v0,72,-30,134,-110,134v-46,0,-78,-22,-87,-68r57,0"},":":{"d":"90,-187r0,67r-67,0r0,-67r67,0xm23,0r0,-67r67,0r0,67r-67,0","w":113},";":{"d":"23,0r0,-67r67,0r0,59v0,52,-40,68,-67,71r0,-29v19,-5,28,-15,30,-34r-30,0xm90,-187r0,67r-67,0r0,-67r67,0","w":113},"<":{"d":"199,3r-182,-69r0,-51r182,-68r0,55r-110,39r110,38r0,56","w":216},"=":{"d":"199,-162r0,52r-182,0r0,-52r182,0xm199,-72r0,51r-182,0r0,-51r182,0","w":216},">":{"d":"17,3r0,-56r110,-38r-110,-39r0,-55r182,68r0,51","w":216},"?":{"d":"71,-85v-11,-66,58,-61,58,-104v0,-14,-11,-22,-24,-22v-22,0,-32,14,-31,38r-63,0v1,-57,38,-89,94,-89v45,0,90,23,90,73v0,35,-17,48,-44,65v-19,12,-24,17,-24,39r-56,0xm66,0r0,-67r66,0r0,67r-66,0","w":206},"@":{"d":"139,-91v41,4,72,-67,8,-67v-38,-3,-51,66,-8,67xm186,-176r3,-17r34,0r-16,86v-1,6,-4,20,3,20v15,0,33,-16,33,-55v0,-58,-39,-87,-94,-87v-60,0,-98,42,-98,101v0,91,107,126,172,79r35,0v-66,101,-245,49,-245,-79v0,-77,61,-134,137,-134v63,0,125,41,125,108v0,82,-68,104,-89,104v-14,1,-20,-7,-23,-17v-29,40,-94,5,-94,-47v0,-61,75,-114,117,-62","w":288},"A":{"d":"127,-186v-12,28,-19,61,-30,90r59,0xm-3,0r96,-257r68,0r96,257r-70,0r-16,-46r-89,0r-16,46r-69,0","w":253},"B":{"d":"90,-113r0,59v37,-2,90,11,90,-28v0,-43,-51,-29,-90,-31xm23,0r0,-257v88,7,213,-30,213,64v0,23,-14,42,-34,52v27,8,45,32,45,61v0,106,-126,76,-224,80xm90,-205r0,49v33,-3,79,12,79,-24v0,-38,-46,-22,-79,-25","w":259},"C":{"d":"261,-165r-67,0v-4,-26,-24,-40,-52,-40v-82,0,-81,153,0,153v31,0,49,-18,52,-48r67,0v-4,66,-53,105,-118,105v-78,0,-128,-59,-128,-134v0,-75,50,-133,128,-133v55,0,116,35,118,97","w":273},"D":{"d":"23,0r0,-257r111,0v79,0,126,47,126,127v0,84,-48,130,-126,130r-111,0xm90,-199r0,141v64,3,103,-8,103,-72v0,-60,-41,-73,-103,-69","w":273},"E":{"d":"23,0r0,-257r205,0r0,54r-138,0r0,45r126,0r0,51r-126,0r0,49r141,0r0,58r-208,0","w":246},"F":{"d":"23,0r0,-257r189,0r0,54r-122,0r0,52r106,0r0,52r-106,0r0,99r-67,0","w":219,"k":{"A":20,",":46,".":46}},"G":{"d":"260,-141r0,141r-43,0r-4,-28v-73,81,-200,3,-200,-101v0,-75,50,-133,128,-133v53,0,111,28,117,92r-67,0v-2,-22,-24,-35,-51,-35v-82,0,-81,153,0,153v33,0,55,-16,59,-39r-47,0r0,-50r108,0","w":280},"H":{"d":"22,0r0,-257r67,0r0,94r88,0r0,-94r67,0r0,257r-67,0r0,-106r-88,0r0,106r-67,0","w":266},"I":{"d":"23,0r0,-257r67,0r0,257r-67,0","w":113},"J":{"d":"190,-257r0,176v0,58,-30,86,-90,86v-72,-1,-92,-43,-90,-107r63,0v-1,26,-1,52,26,50v15,0,24,-9,24,-34r0,-171r67,0","w":213},"K":{"d":"23,0r0,-257r67,0r0,99r85,-99r83,0r-95,101r107,156r-84,0r-69,-108r-27,29r0,79r-67,0","w":266},"L":{"d":"23,0r0,-257r67,0r0,199r120,0r0,58r-187,0","w":219,"k":{"T":46,"V":40,"W":27,"y":20,"Y":46}},"M":{"d":"23,0r0,-257r99,0r45,171r44,-171r99,0r0,257r-63,0r-1,-195r-54,195r-51,0r-55,-195r0,195r-63,0","w":333},"N":{"d":"22,0r0,-257r69,0r90,158r0,-158r63,0r0,257r-69,0r-90,-160r0,160r-63,0","w":266},"O":{"d":"13,-129v0,-75,46,-133,127,-133v81,0,127,58,127,133v0,75,-46,134,-127,134v-81,0,-127,-59,-127,-134xm140,-205v-82,0,-81,153,0,153v81,0,82,-153,0,-153","w":280},"P":{"d":"23,0r0,-257v99,3,213,-25,215,83v2,86,-65,92,-148,88r0,86r-67,0xm90,-203r0,65v37,-1,81,8,81,-32v0,-41,-43,-32,-81,-33","w":246,"k":{"A":27,",":46,".":46}},"Q":{"d":"266,-5r-31,32r-35,-35v-92,43,-187,-24,-187,-121v0,-75,46,-133,127,-133v121,0,161,148,95,227xm133,-73r30,-32r25,25v25,-46,13,-125,-48,-125v-82,0,-81,153,0,153v5,0,9,-1,13,-2","w":280},"R":{"d":"186,0v-16,-36,4,-94,-45,-94r-51,0r0,94r-67,0r0,-257v94,5,221,-26,221,72v0,28,-13,55,-40,65v49,14,28,78,48,120r-66,0xm90,-203r0,58v38,-1,88,10,87,-31v-1,-37,-51,-25,-87,-27","w":259,"k":{"T":6,"V":-2,"W":6,"Y":13}},"S":{"d":"8,-86r67,0v1,30,21,40,49,40v20,0,41,-8,41,-27v0,-23,-37,-27,-74,-37v-37,-10,-75,-27,-75,-74v0,-107,208,-106,208,4r-67,0v1,-23,-21,-31,-42,-31v-14,0,-32,5,-32,22v0,20,37,24,74,34v37,10,75,28,75,74v0,65,-55,86,-112,86v-59,0,-112,-25,-112,-91","w":240},"T":{"d":"227,-257r0,58r-77,0r0,199r-67,0r0,-199r-77,0r0,-58r221,0","w":233,"k":{"w":40,"y":40,"A":33,",":40,".":40,"c":40,"e":40,"o":40,"-":46,"a":40,"r":33,"s":40,"u":33,":":31,";":31}},"U":{"d":"245,-257r0,151v0,75,-34,111,-112,111v-78,0,-112,-36,-112,-111r0,-151r67,0r0,155v0,33,12,50,45,50v33,0,45,-17,45,-50r0,-155r67,0","w":266},"V":{"d":"237,-257r-83,257r-77,0r-81,-257r70,0r51,191r50,-191r70,0","w":233,"k":{"y":6,"A":18,",":46,".":46,"e":20,"o":20,"-":20,"a":20,"r":13,"u":13,":":18,";":18,"i":6}},"W":{"d":"347,-257r-71,257r-67,0r-36,-177r-35,177r-69,0r-69,-257r67,0r37,188r38,-188r63,0r38,188r37,-188r67,0","w":346,"k":{"y":6,"A":13,",":33,".":33,"e":13,"o":13,"-":6,"a":20,"r":13,"u":13,":":13,";":5,"i":6}},"X":{"d":"-3,0r92,-135r-84,-122r79,0r43,80r45,-80r77,0r-83,122r90,135r-81,0r-48,-86r-53,86r-77,0","w":253},"Y":{"d":"247,-257r-93,161r0,96r-67,0r0,-96r-94,-161r76,0r51,104r51,-104r76,0","w":240,"k":{"v":20,"A":27,",":40,".":40,"e":33,"o":33,"q":33,"-":40,"a":33,"u":27,":":24,";":24,"i":5,"p":27}},"Z":{"d":"9,0r0,-55r131,-144r-123,0r0,-58r210,0r0,52r-135,147r139,0r0,58r-222,0","w":240},"[":{"d":"25,63r0,-325r106,0r0,51r-49,0r0,222r49,0r0,52r-106,0","w":133},"\\":{"d":"53,-262r97,267r-56,0r-97,-267r56,0","w":146},"]":{"d":"108,-262r0,325r-105,0r0,-52r48,0r0,-222r-48,0r0,-51r105,0","w":133},"^":{"d":"74,-120r-57,0r58,-131r66,0r58,131r-58,0r-33,-85","w":216},"_":{"d":"180,45r-180,0r0,-18r180,0r0,18","w":180},"a":{"d":"135,-87v-18,10,-63,4,-63,33v0,15,11,22,25,22v29,0,39,-16,38,-55xm18,-129v1,-46,44,-63,89,-63v44,0,87,9,87,62v0,46,-6,93,7,130r-62,0v-2,-6,-2,-12,-3,-18v-37,38,-126,33,-126,-33v0,-61,67,-56,109,-65v10,-2,16,-5,16,-17v0,-29,-59,-26,-60,4r-57,0","w":213},"b":{"d":"21,0r0,-257r61,0r0,91v13,-17,31,-26,54,-26v53,0,79,45,79,94v0,53,-25,103,-84,103v-23,1,-38,-11,-52,-27r0,22r-58,0xm117,-145v-17,0,-37,11,-37,50v0,33,9,54,37,54v48,-1,51,-103,0,-104"},"c":{"d":"202,-118r-60,0v0,-16,-15,-27,-30,-27v-57,0,-51,102,-3,104v21,0,32,-12,35,-32r59,0v-5,50,-44,78,-94,78v-56,0,-97,-38,-97,-95v0,-59,37,-102,97,-102v46,0,89,25,93,74","w":213},"d":{"d":"110,-145v-53,1,-49,103,0,104v53,-1,49,-105,0,-104xm206,-257r0,257r-59,0r0,-22v-12,18,-30,27,-52,27v-59,0,-83,-50,-83,-103v0,-49,25,-94,78,-94v23,0,41,8,54,25r0,-90r62,0"},"e":{"d":"73,-113r76,0v-1,-21,-16,-38,-37,-38v-22,0,-35,15,-39,38xm210,-78r-137,0v-4,44,60,57,76,21r58,0v-11,43,-51,62,-93,62v-61,0,-102,-36,-102,-99v0,-57,45,-98,100,-98v67,0,101,51,98,114","w":219},"f":{"d":"34,0r0,-147r-30,0r0,-40r30,0v-4,-66,39,-74,100,-69r0,43v-22,-3,-43,-3,-39,26r37,0r0,40r-37,0r0,147r-61,0","w":133,"k":{"f":6}},"g":{"d":"143,-98v0,-24,-9,-47,-36,-47v-49,0,-49,90,-1,90v26,0,37,-20,37,-43xm77,6v2,16,14,20,33,20v35,0,34,-33,31,-61v-11,17,-29,27,-49,27v-57,0,-82,-40,-82,-93v0,-75,91,-125,133,-62r0,-24r58,0r0,164v0,31,-6,89,-93,89v-44,0,-85,-10,-92,-60r61,0","w":219},"h":{"d":"21,0r0,-257r61,0r0,96v9,-19,35,-31,57,-31v62,0,68,45,68,72r0,120r-62,0r0,-90v0,-26,3,-52,-30,-52v-55,0,-26,90,-33,142r-61,0"},"i":{"d":"23,0r0,-187r61,0r0,187r-61,0xm84,-257r0,47r-61,0r0,-47r61,0","w":106},"j":{"d":"84,-187r0,187v3,60,-36,66,-93,63r0,-50v17,0,32,1,32,-17r0,-183r61,0xm84,-257r0,47r-61,0r0,-47r61,0","w":106},"k":{"d":"21,0r0,-257r61,0r0,132r56,-62r70,0r-68,71r77,116r-74,0r-45,-75r-16,15r0,60r-61,0","w":213},"l":{"d":"23,0r0,-257r61,0r0,257r-61,0","w":106},"m":{"d":"21,0r0,-187r59,0v1,8,-2,20,1,26v19,-39,88,-44,108,-1v15,-20,33,-30,58,-30v100,0,56,108,66,192r-61,0r0,-110v0,-20,-10,-32,-26,-32v-26,0,-29,21,-29,51r0,91r-61,0r0,-106v0,-22,-6,-36,-23,-36v-47,0,-27,95,-31,142r-61,0","w":333},"n":{"d":"21,0r0,-187r59,0v1,8,-2,20,1,26v11,-19,36,-31,58,-31v62,0,68,45,68,72r0,120r-62,0r0,-90v0,-26,3,-52,-30,-52v-55,0,-26,90,-33,142r-61,0"},"o":{"d":"110,-145v-51,2,-51,102,0,104v51,-2,51,-102,0,-104xm12,-93v0,-56,40,-99,98,-99v58,0,98,43,98,99v0,56,-40,98,-98,98v-58,0,-98,-42,-98,-98","w":219},"p":{"d":"117,-145v-17,0,-37,11,-37,50v0,33,9,54,37,54v48,-1,51,-103,0,-104xm21,63r0,-250r58,0v1,7,-2,17,1,22v12,-18,29,-27,51,-27v59,0,84,50,84,103v0,49,-26,94,-79,94v-23,0,-41,-8,-54,-25r0,83r-61,0"},"q":{"d":"110,-145v-50,1,-52,103,-1,104v17,0,38,-12,38,-51v0,-25,-8,-53,-37,-53xm206,-187r0,250r-62,0r0,-84v-13,17,-31,26,-54,26v-53,0,-78,-45,-78,-94v0,-53,24,-103,83,-103v22,0,40,9,52,27r0,-22r59,0"},"r":{"d":"23,0r0,-187r59,0v1,10,-2,25,1,33v11,-28,36,-40,70,-35r0,56v-34,-13,-69,8,-69,40r0,93r-61,0","w":153,"k":{",":33,".":33,"c":6,"d":6,"e":6,"g":6,"o":6,"q":6,"-":20}},"s":{"d":"128,-132v0,-16,-13,-20,-28,-21v-10,0,-26,1,-26,14v0,18,41,21,69,27v38,8,48,36,48,51v0,50,-48,66,-90,66v-44,0,-89,-15,-91,-67r58,0v-2,32,62,40,62,8v0,-14,-19,-17,-30,-20v-39,-10,-87,-11,-87,-61v0,-45,48,-57,85,-57v41,0,84,11,86,60r-56,0","w":200},"t":{"d":"133,-187r0,40r-38,0r0,85v-1,21,20,18,38,17r0,45v-58,6,-99,2,-99,-64r0,-83r-31,0r0,-40r31,0r0,-56r61,0r0,56r38,0","w":140},"u":{"d":"206,-187r0,187r-59,0v-1,-8,2,-20,-1,-26v-12,19,-35,31,-57,31v-96,3,-63,-108,-69,-192r61,0r0,109v0,25,12,33,31,33v13,0,33,-9,33,-42r0,-100r61,0"},"v":{"d":"194,-187r-62,187r-71,0r-62,-187r64,0r35,124r34,-124r62,0","w":193,"k":{",":27,".":27}},"w":{"d":"300,-187r-58,187r-62,0r-31,-124r-29,124r-62,0r-58,-187r62,0r32,121r27,-121r58,0r28,121r31,-121r62,0","w":299,"k":{",":20,".":20}},"x":{"d":"-3,0r65,-98r-59,-89r68,0r26,45r26,-45r65,0r-58,88r66,99r-68,0r-32,-54r-31,54r-68,0","w":193},"y":{"d":"196,-187r-74,204v-17,51,-51,46,-107,46r0,-50v23,1,47,0,46,-21v-15,-63,-44,-120,-64,-179r65,0r36,122r36,-122r62,0","w":193,"k":{",":33,".":33}},"z":{"d":"8,0r0,-48r93,-92r-86,0r0,-47r164,0r0,47r-93,93r100,0r0,47r-178,0","w":193},"{":{"d":"128,-262r0,43v-48,-9,-34,41,-34,82v0,29,-28,32,-41,36v15,1,41,4,41,38v0,35,-21,88,34,82r0,44v-51,2,-90,2,-91,-54r0,-62v0,-23,-23,-25,-32,-25r0,-43v9,0,32,-2,32,-22r0,-68v1,-57,41,-52,91,-51","w":133},"|":{"d":"14,77r0,-360r52,0r0,360r-52,0","w":79},"}":{"d":"5,63r0,-44v48,9,34,-41,34,-82v0,-35,28,-35,41,-39v-15,-1,-41,-7,-41,-35v0,-35,21,-88,-34,-82r0,-43v50,0,91,-7,91,51r0,68v0,20,23,22,32,22r0,43v-9,0,-32,2,-32,25r0,62v-1,57,-39,56,-91,54","w":133},"~":{"d":"70,-129v24,0,56,23,77,24v14,0,23,-13,31,-26r13,47v-11,15,-23,31,-45,31v-36,0,-90,-50,-108,2r-13,-47v8,-15,21,-31,45,-31","w":216},"'":{"d":"27,-127r0,-130r52,0r0,130r-52,0","w":106},"`":{"d":"52,-261r35,54r-43,0r-57,-54r65,0","w":106},"\u00a0":{"w":113}}});
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright (c) 2011, Edgar Tolentino, Pablo Impallari, Igino Marini
 * (impallari.com), with Reserved Font Name Dosis.
 * 
 * Trademark:
 * Dosis is a trademark of Edgar Tolentino, Pablo Impallari, Igino Marini.
 * 
 * Description:
 * Dosis is a very simple, monoline rounded sans serif. We like you to have some
 * freedom over how the letters should look, so we bundled Dosis with a few
 * alternates that you can use to make your text look the way you want to.
 * 
 * Manufacturer:
 * Edgar Tolentino, Pablo Impallari, Igino Marini
 * 
 * Designer:
 * Edgar Tolentino, Pablo Impallari, Igino Marini
 * 
 * Vendor URL:
 * www.impallari.com
 * 
 * License information:
 * http://scripts.sil.org/OFL
 */

Cufon.registerFont({"w":174,"face":{"font-family":"Dosis","font-weight":400,"font-stretch":"normal","units-per-em":"360","panose-1":"2 1 5 3 2 2 2 6 0 3","ascent":"288","descent":"-72","x-height":"3","bbox":"-12.5534 -277.496 275.269 84.0441","underline-thickness":"9.36","underline-position":"-9","unicode-range":"U+0020-U+007E"},"glyphs":{" ":{"w":72},"!":{"d":"37,2v-9,0,-16,-6,-16,-16v0,-10,6,-17,16,-17v10,0,16,7,16,17v0,8,-8,16,-16,16xm27,-68r-4,-186v-1,-7,7,-15,14,-14v7,0,13,7,13,14r-4,186v0,6,-5,8,-9,9v-6,0,-10,-3,-10,-9","w":73},"\"":{"d":"14,-269v1,-10,24,-9,23,0r-4,53v0,6,-2,9,-8,9v-5,0,-8,-3,-8,-9xm60,-269v1,-9,23,-9,24,0r-4,53v0,6,-2,9,-8,9v-5,0,-8,-3,-8,-9","w":97,"k":{"x":3,"v":4,"p":4,"@":20,"4":17,"\/":25,".":25,"u":4,"w":4,"y":3,"g":6,"s":5,"z":4,",":25,"a":5,"m":4,"n":4,"r":4,"-":25,"c":6,"d":6,"e":6,"o":6,"q":6,"A":14,"J":16}},"#":{"d":"63,-20v0,8,-13,11,-18,5v-7,-22,6,-51,7,-76v-15,-2,-43,7,-43,-9v0,-17,31,-6,47,-9r9,-58v-15,-3,-43,8,-43,-9v0,-18,31,-5,46,-9r11,-66v3,-10,22,-7,20,5r-9,61r45,0r11,-66v3,-10,22,-7,20,5r-9,61v20,-3,61,2,36,18r-39,0r-10,58v20,-2,62,-1,37,18r-40,0r-11,72v-3,12,-22,7,-21,-4r10,-68r-45,0xm77,-109r46,0r9,-58r-46,0","w":209},"$":{"d":"86,-1v-31,2,-68,-18,-72,-39v9,-30,30,9,45,11v8,3,17,5,27,5r0,-105v-34,-11,-65,-23,-65,-68v0,-41,29,-59,65,-61v-5,-16,11,-24,17,-12r0,11v26,-2,74,18,44,35v-7,-2,-30,-15,-44,-13r0,89v33,13,61,29,61,75v0,41,-24,66,-61,71v1,10,1,21,-9,21v-9,1,-8,-10,-8,-20xm87,-237v-43,-2,-56,44,-33,67v6,7,19,12,33,17r0,-84xm102,-24v39,-1,49,-53,29,-80v-7,-8,-16,-14,-29,-19r0,99","w":179},"%":{"d":"59,-126v-49,0,-46,-48,-45,-96v1,-27,18,-41,45,-41v49,0,46,48,45,96v-1,27,-18,41,-45,41xm33,-222v0,32,-13,79,26,79v40,0,27,-46,27,-79v0,-17,-9,-25,-27,-25v-18,0,-26,8,-26,25xm78,4v-4,10,-17,6,-18,-3r138,-274v3,-8,18,-2,17,6xm213,1v-49,0,-44,-48,-44,-96v0,-27,18,-41,44,-41v50,0,45,47,45,96v0,28,-18,41,-45,41xm187,-95v0,33,-13,80,26,80v39,0,27,-47,27,-80v0,-17,-9,-25,-27,-25v-18,0,-26,8,-26,25","w":272},"&":{"d":"167,-32v-39,63,-157,37,-155,-41v1,-36,23,-60,49,-72v-15,-19,-26,-34,-29,-63v-7,-69,109,-80,124,-27v0,6,-5,11,-11,11v-15,-7,-21,-28,-47,-25v-47,-4,-49,59,-25,85r90,100v7,-16,11,-38,12,-66v1,-8,2,-9,11,-10v7,0,10,5,10,13v0,29,-6,55,-18,79v11,14,26,24,35,40v0,9,-10,14,-17,7xm75,-130v-19,12,-38,25,-39,55v-3,59,91,78,116,28","w":219,"k":{"y":4,"w":3,"u":3,"t":2,"Y":24,"W":14,"U":2,"T":25,"'":12,"\"":12,"v":3,"V":14}},"'":{"d":"14,-269v1,-10,24,-9,23,0r-4,53v0,6,-2,9,-8,9v-5,0,-8,-3,-8,-9","w":50,"k":{"x":3,"v":4,"p":4,"@":20,"4":17,"\/":25,".":25,"u":4,"w":4,"y":3,"g":6,"s":5,"z":4,",":25,"a":5,"m":4,"n":4,"r":4,"-":25,"c":6,"d":6,"e":6,"o":6,"q":6,"A":14,"J":16}},"(":{"d":"89,7v-38,1,-67,-23,-67,-61r0,-156v-1,-35,31,-66,67,-66v16,0,14,20,3,21v-26,-1,-45,21,-46,45r0,156v2,26,18,40,46,40v6,0,9,3,9,10v0,7,-4,11,-12,11","w":107,"k":{"y":11,"w":11,"u":8,"q":7,"o":7,"e":7,"d":7,"c":7,"Q":5,"O":5,"G":5,"C":5,"{":7,"v":11,"9":5,"8":6,"6":8,"4":15,"1":4,"0":8,"(":5}},")":{"d":"85,-54v1,38,-28,62,-66,61v-8,0,-12,-4,-12,-11v0,-7,2,-10,8,-10v28,1,47,-13,47,-40r0,-156v-1,-24,-21,-46,-47,-45v-4,0,-8,-5,-8,-11v0,-7,3,-10,11,-10v36,-2,67,30,67,66r0,156","w":107,"k":{"}":5,"]":5,")":5}},"*":{"d":"50,-140v-7,8,-22,-3,-15,-13r29,-38r-46,-13v-10,-2,-6,-20,4,-20r48,17v3,-18,-12,-53,8,-56v18,4,5,38,8,56r48,-17v8,-1,14,18,3,20r-45,12v10,15,23,28,31,45v1,9,-14,14,-18,6r-27,-40","w":155,"k":{"Z":5,"T":6,"J":27,"A":11}},"+":{"d":"78,-20v-20,-2,-8,-37,-11,-56v-19,-4,-53,10,-56,-10v2,-20,37,-8,56,-11v3,-20,-9,-54,11,-56v19,3,7,37,10,56v20,3,54,-9,56,11v-3,19,-37,7,-56,10v-3,19,9,54,-10,56","w":155,"k":{"7":21,"1":7}},",":{"d":"33,26v-3,8,-18,4,-15,-6r7,-19v-17,-5,-12,-33,6,-32v27,10,15,22,2,57","w":61,"k":{"v":10,"V":18,"6":4,"4":7,"1":4,"0":4,"\"":25,"'":25,"T":17,"U":4,"W":17,"Y":20,"w":9,"y":10,"C":4,"G":4,"O":4,"Q":4}},"-":{"d":"130,-86v1,6,-5,10,-9,10r-93,0v-6,0,-9,-3,-9,-10v-1,-6,3,-11,9,-11r93,0v5,0,10,5,9,11","w":148,"k":{"x":12,"v":6,"X":6,"V":12,"\"":25,"'":25,"T":18,"W":12,"Y":21,"w":5,"y":6,"s":5,"z":13,"Z":8,"a":4,"S":9}},".":{"d":"47,-14v0,22,-33,19,-33,0v0,-10,7,-17,17,-17v8,0,16,8,16,17","w":61,"k":{"'":25,"\"":25,"v":10,"V":18,"6":4,"4":7,"1":4,"0":4,"T":17,"U":4,"W":17,"Y":20,"w":9,"y":10,"C":4,"G":4,"O":4,"Q":4}},"\/":{"d":"25,4v-2,10,-18,5,-18,-3r138,-274v4,-8,19,-3,18,6","w":170,"k":{"x":12,"v":10,"p":15,"9":4,"8":6,"6":7,"4":27,"2":4,"0":7,"\/":85}},"0":{"d":"96,2v-48,0,-75,-25,-75,-77r0,-111v-2,-51,27,-77,75,-77v48,0,76,27,75,77r0,111v1,51,-27,77,-75,77xm45,-186v0,66,-23,166,51,166v74,0,51,-100,51,-166v0,-36,-17,-55,-51,-55v-34,0,-51,19,-51,55xm96,-117v-7,0,-13,-6,-13,-13v0,-8,5,-13,13,-13v8,0,13,5,13,13v0,7,-6,13,-13,13","w":191,"k":{"T":4,".":4,",":4,"}":8,"]":9,"\/":5,")":8}},"1":{"d":"21,-199v-5,8,-19,2,-16,-7v7,-20,24,-34,35,-52v5,-10,19,-7,19,3r0,246v-1,11,-24,12,-24,0r0,-214","w":83},"2":{"d":"23,0v-17,-1,-9,-27,-11,-44v12,-73,114,-74,122,-149v3,-25,-21,-49,-49,-48v-26,1,-43,16,-43,43v-3,12,-24,14,-24,-5v0,-35,32,-60,68,-60v72,0,95,96,40,132v-29,35,-95,40,-89,109r115,0v4,0,9,5,8,11v1,6,-4,11,-8,11r-129,0","w":171,"k":{"=":5,"4":12,"+":21}},"3":{"d":"85,2v-42,1,-73,-25,-75,-59v0,-9,3,-13,11,-13v8,0,12,3,12,10v2,24,20,40,51,40v37,0,52,-21,52,-61v0,-32,-19,-48,-51,-48v-6,0,-9,-3,-9,-10v0,-7,3,-10,9,-10v32,0,45,-14,45,-46v0,-31,-14,-47,-44,-47v-29,-1,-45,15,-46,39v0,8,-4,11,-12,11v-10,1,-12,-4,-12,-13v0,-38,30,-54,71,-58v76,-8,84,100,36,124v26,11,37,31,37,65v0,50,-28,75,-75,76","w":175,"k":{"}":6,"]":7,")":6}},"4":{"d":"127,-9v0,12,-23,12,-23,0r0,-53r-92,0v-8,0,-11,-9,-8,-16r91,-178v5,-14,27,-6,21,7r-83,164r71,0r0,-69v0,-6,4,-9,12,-9v6,-1,11,3,11,9r0,69v14,0,31,-3,29,12v2,14,-16,11,-29,11r0,53","w":159,"k":{"Y":6,"W":5,"T":6,"'":6,"\"":6,"}":5,"]":5,"\\":9,"V":5,"7":8,"4":-2,")":5}},"5":{"d":"85,2v-43,1,-74,-24,-75,-61v0,-8,4,-12,12,-12v8,0,12,3,12,10v-1,27,24,41,51,41v36,0,51,-23,51,-61v0,-54,-47,-56,-101,-53v-11,0,-13,-5,-12,-16r7,-104v1,-6,4,-9,8,-9r101,0v5,0,8,4,8,11v0,7,-3,11,-8,11r-88,0r-5,86v69,-5,113,10,113,81v0,50,-27,75,-74,76","w":170},"6":{"d":"96,2v-48,0,-75,-25,-75,-77r0,-111v-2,-51,27,-77,75,-77v42,0,74,24,75,61v0,7,-5,11,-12,11v-8,0,-12,-4,-12,-10v0,-25,-25,-40,-51,-40v-56,0,-53,55,-51,110v38,-46,142,-25,126,56v1,51,-27,77,-75,77xm45,-86v0,42,13,68,51,67v37,0,51,-23,51,-63v0,-35,-17,-53,-51,-53v-34,0,-51,16,-51,49","w":186,"k":{"}":5,"]":6,")":6}},"7":{"d":"33,-200v0,12,-23,12,-23,0v0,-22,-10,-63,11,-63r127,0v18,1,12,35,8,50r-107,209v-4,10,-23,3,-22,-7v33,-73,74,-140,109,-211r0,-19r-103,0r0,41","w":165,"k":{"J":16,"A":13,".":26,",":26,"=":10,"4":20,"\/":35,"+":26,"#":8}},"8":{"d":"90,2v-84,8,-100,-121,-35,-146v-21,-9,-32,-27,-32,-56v0,-42,22,-63,67,-63v76,0,89,97,36,119v27,10,39,35,39,72v0,49,-29,70,-75,74xm91,-19v35,0,50,-22,50,-60v0,-36,-17,-53,-51,-53v-36,0,-51,19,-51,58v0,35,19,55,52,55xm46,-198v0,30,14,44,44,44v30,0,45,-14,45,-44v0,-29,-15,-44,-45,-44v-30,0,-44,15,-44,44","w":180,"k":{"}":6,"]":6,")":6}},"9":{"d":"90,2v-42,1,-74,-24,-75,-61v0,-7,5,-12,12,-12v8,0,12,4,12,11v0,25,25,40,51,40v56,0,53,-55,51,-110v-37,47,-142,24,-126,-56v-1,-50,27,-77,75,-77v48,0,75,26,75,77r0,111v2,52,-27,76,-75,77xm141,-175v0,-42,-12,-67,-51,-67v-37,0,-51,22,-51,63v0,36,17,52,51,53v34,0,51,-16,51,-49","w":186,"k":{"T":4,".":4,",":4,"}":8,"]":9,"\/":5,")":9}},":":{"d":"53,-14v0,22,-33,19,-33,0v0,-10,7,-17,17,-17v8,0,16,8,16,17xm53,-135v0,22,-33,19,-33,0v0,-10,7,-17,17,-17v8,0,16,8,16,17","w":73,"k":{"V":7,"T":17,"W":7,"Y":15}},";":{"d":"40,26v-3,8,-20,3,-16,-6r8,-19v-17,-5,-12,-32,5,-32v28,9,16,22,3,57xm55,-135v0,22,-33,19,-33,0v0,-10,7,-17,17,-17v8,0,16,8,16,17","w":75,"k":{"V":7,"T":17,"W":7,"Y":15}},"<":{"d":"123,-43v9,6,1,18,-7,19r-101,-66v-8,-4,-8,-15,0,-20r101,-65v9,0,16,13,7,18r-86,57","w":144},"=":{"d":"32,-49v-5,0,-9,-5,-8,-11v-1,-5,4,-10,8,-10r91,0v4,0,10,4,9,10v1,6,-4,11,-9,11r-91,0xm32,-122v-5,0,-9,-5,-8,-11v-1,-5,4,-10,8,-10r91,0v4,0,10,4,9,10v1,6,-4,11,-9,11r-91,0","w":156,"k":{"7":10}},">":{"d":"32,-26v-6,6,-15,-3,-15,-10v0,-3,1,-5,4,-7r86,-57r-86,-57v-9,-5,-2,-18,7,-18v37,19,66,44,101,65v8,5,8,15,0,20","w":143},"?":{"d":"111,-202v4,-52,-71,-55,-94,-28v-4,0,-9,-5,-9,-10v2,-16,32,-28,55,-28v41,0,68,24,68,64v0,67,-68,62,-60,136v0,6,-4,9,-10,9v-6,0,-10,-4,-10,-11v-9,-76,56,-69,60,-132xm78,-14v0,23,-33,19,-33,0v0,-9,7,-17,16,-17v10,0,17,7,17,17","w":143},"@":{"d":"118,37v-61,0,-99,-47,-99,-115v0,-72,38,-123,113,-123v73,0,111,43,111,116v0,38,-9,71,-44,73v-18,2,-32,-10,-34,-23v-20,29,-92,29,-90,-19v1,-40,41,-41,86,-41v9,-44,-47,-42,-69,-28v-4,0,-8,-6,-8,-10v19,-31,105,-22,97,28v3,30,-11,76,20,78v16,0,24,-18,24,-55v1,-64,-31,-101,-94,-101v-66,0,-90,41,-94,105v-5,79,64,119,134,87v4,0,8,4,8,8v-3,13,-41,21,-61,20xm162,-80v-32,1,-67,-4,-67,26v0,16,11,24,28,23v27,0,44,-17,39,-49","w":257,"k":{"Y":14,"W":6,"T":16,"'":17,"\"":17,"V":7}},"A":{"d":"31,-6v-4,11,-26,6,-23,-7r75,-244v2,-11,27,-11,29,0r75,247v0,9,-21,15,-24,4r-16,-56r-100,0xm53,-82r88,0r-44,-145","w":194,"k":{"v":8,"\\":13,"V":14,"?":4,"*":11}},"B":{"d":"38,0v-5,0,-11,-4,-11,-9r0,-245v7,-18,47,-7,70,-9v47,-4,74,16,74,61v0,28,-13,50,-31,59v26,10,37,31,37,69v0,77,-64,78,-139,74xm51,-22v56,2,102,5,102,-59v0,-55,-49,-53,-102,-51r0,110xm147,-199v0,-50,-49,-42,-96,-42r0,88v48,0,96,6,96,-46","w":193,"k":{"z":4,"y":3,"w":3,"s":2,"Z":2,"Y":3,"T":5,"}":5,"x":5,"v":3,"]":5,"X":3,")":5}},"C":{"d":"99,2v-46,-2,-75,-27,-75,-77r0,-111v0,-50,30,-76,76,-77v42,-2,73,24,74,60v1,12,-3,13,-12,14v-7,0,-12,-3,-12,-9v-1,-29,-19,-42,-50,-43v-75,-3,-44,99,-52,166v-7,61,84,75,100,25v2,-9,1,-25,14,-23v9,0,12,2,12,14v0,37,-34,63,-75,61","w":188,"k":{"x":4,"v":7,"w":7,"y":7,"g":3,"s":2,"z":2}},"D":{"d":"102,0v-25,0,-66,9,-75,-9r0,-246v8,-17,51,-8,75,-8v48,0,75,26,75,77r0,109v1,52,-28,77,-75,77xm153,-77v-5,-67,23,-168,-51,-164r-51,0r0,219v55,3,106,2,102,-55","w":201,"k":{"}":5,"x":3,"p":3,"]":5,"X":4,")":5,"T":6,"Y":4,"u":2,"g":2,"s":2,"z":2,",":4,".":4,"Z":3,"a":2,"b":2,"f":2,"h":2,"k":2,"i":2,"j":2,"l":2,"m":2,"n":2,"r":2}},"E":{"d":"38,0v-5,0,-10,-4,-11,-9r0,-245v0,-5,5,-10,11,-9r128,0v6,0,9,3,9,10v1,6,-4,12,-9,12r-115,0r0,99v22,4,62,-10,66,11v0,6,-3,9,-9,9r-57,0r0,100r115,0v6,0,10,5,9,11v0,7,-3,11,-9,11r-128,0","w":182,"k":{"v":27,"4":4,"&":3,"u":13,"w":26,"y":27,"g":2,"-":14,"C":5,"G":5,"O":5,"Q":5,"c":9,"d":9,"e":9,"o":9,"q":9}},"F":{"d":"51,-9v0,6,-5,10,-12,9v-8,0,-12,-3,-12,-9r0,-245v0,-5,5,-10,11,-9r128,0v12,0,11,22,0,22r-115,0r0,99v22,4,62,-10,66,11v0,6,-3,9,-9,9r-57,0r0,113","w":177,"k":{"z":40,"y":39,"w":38,"u":38,"s":40,"r":38,"q":39,"o":39,"n":38,"m":38,"g":39,"f":6,"e":39,"d":39,"c":39,"a":46,"S":3,"Q":6,"O":6,"J":44,"G":6,"C":6,"A":35,";":17,":":17,".":30,"-":23,",":30,"x":40,"v":38,"p":38,"@":19,"6":4,"4":18,"0":4,"\/":25,"&":6}},"G":{"d":"99,2v-48,0,-76,-26,-75,-77r0,-111v-1,-50,27,-76,75,-77v42,-1,76,23,75,62v0,8,-4,12,-12,12v-8,0,-12,-3,-12,-9v0,-29,-20,-43,-51,-43v-74,0,-51,100,-51,166v0,34,17,55,51,55v51,0,54,-45,51,-98v-19,-3,-54,9,-56,-10v-1,-5,3,-10,8,-10r64,0v6,0,8,3,8,9r0,54v2,52,-27,77,-75,77","w":194,"k":{"x":4,"v":2,"p":2,"X":2,"T":3,"Y":2,"w":2,"y":2,"z":4,"m":2,"n":2,"r":2}},"H":{"d":"51,-9v-1,12,-24,11,-24,0r0,-246v0,-6,4,-8,12,-8v8,0,12,2,12,8r0,108r104,0r0,-108v0,-6,4,-8,12,-8v8,0,12,2,12,8r0,246v-1,11,-24,12,-24,0r0,-117r-104,0r0,117","w":206,"k":{"p":2,"u":3,"g":3,"b":2,"f":2,"h":2,"k":2,"l":2,"m":2,"n":2,"r":2,"c":2,"d":2,"e":2,"o":2,"q":2}},"I":{"d":"51,-9v-1,12,-24,11,-24,0r0,-246v0,-6,4,-8,12,-8v8,0,12,2,12,8r0,246","w":78,"k":{"p":2,"u":3,"g":3,"b":2,"f":2,"h":2,"k":2,"l":2,"m":2,"n":2,"r":2,"c":2,"d":2,"e":2,"o":2,"q":2}},"J":{"d":"84,2v-42,1,-76,-25,-76,-63v0,-8,4,-12,12,-12v8,0,12,3,12,9v0,28,21,44,51,44v34,1,52,-20,51,-55r0,-166v-21,-3,-58,10,-59,-12v-1,-6,4,-10,9,-10r63,0v7,0,11,3,11,9r0,179v2,52,-27,76,-74,77","w":184,"k":{"x":2,"p":3,"\/":4,"u":3,"g":3,"s":3,"z":3,",":4,".":4,"a":2,"f":2,"i":2,"j":2,"m":3,"n":3,"r":3,"c":2,"d":2,"e":2,"o":2,"q":2,"A":2}},"K":{"d":"51,-9v-1,12,-24,11,-24,0r0,-246v0,-6,4,-8,12,-8v8,0,12,2,12,8r0,128r104,-133v8,-9,26,4,19,14r-78,97r90,137v0,10,-14,19,-22,7r-83,-125r-30,38r0,83","w":187,"k":{"v":14,"&":3,"u":4,"w":14,"y":15,"-":5,"C":5,"G":5,"O":5,"Q":5,"c":3,"d":3,"e":3,"o":3,"q":3}},"L":{"d":"38,0v-5,0,-10,-4,-11,-9r0,-246v0,-6,4,-8,12,-8v8,0,12,2,12,8r0,233r103,0v5,0,8,4,8,11v0,7,-3,11,-8,11r-116,0","w":166,"k":{"v":34,"\\":20,"V":30,"?":5,"6":4,"4":10,"0":4,"*":27,"&":2,"\"":25,"'":25,"T":36,"U":6,"W":29,"Y":33,"u":9,"w":34,"y":34,"-":22,"C":6,"G":6,"O":6,"Q":6,"c":5,"d":5,"e":5,"o":5,"q":5,"t":3}},"M":{"d":"51,-9v-1,12,-24,11,-24,0r0,-243v3,-19,23,-11,31,5r62,120r62,-120v6,-11,12,-16,19,-16v8,0,12,3,12,11r0,243v-1,12,-24,11,-24,0r0,-203r-59,113v-5,10,-14,11,-19,0r-60,-114r0,204","w":240,"k":{"p":2,"u":3,"g":3,"b":2,"f":2,"h":2,"k":2,"l":2,"m":2,"n":2,"r":2,"c":2,"d":2,"e":2,"o":2,"q":2}},"N":{"d":"51,-9v-1,12,-24,11,-24,0r0,-245v4,-16,23,-9,31,7r97,192r0,-200v0,-6,4,-8,12,-8v8,0,12,2,12,8r0,246v-6,14,-20,10,-28,-5r-100,-194r0,199","w":206,"k":{"p":2,"u":3,"g":3,"b":2,"f":2,"h":2,"k":2,"l":2,"m":2,"n":2,"r":2,"c":2,"d":2,"e":2,"o":2,"q":2}},"O":{"d":"99,2v-48,0,-76,-26,-75,-77r0,-111v-1,-50,27,-77,75,-77v48,0,75,26,75,77r0,111v2,52,-27,77,-75,77xm48,-186v0,66,-23,166,51,166v74,0,51,-100,51,-166v0,-36,-17,-55,-51,-55v-34,0,-51,19,-51,55","w":198,"k":{"}":5,"x":3,"p":3,"]":5,"X":4,")":5,"T":6,"Y":4,"u":2,"g":2,"s":2,"z":2,",":4,".":4,"Z":3,"a":2,"b":2,"f":2,"h":2,"k":2,"i":2,"j":2,"l":2,"m":2,"n":2,"r":2}},"P":{"d":"51,-9v-1,12,-24,11,-24,0r0,-246v0,-5,3,-8,10,-8v78,-4,141,-2,141,80v0,72,-55,81,-127,76r0,98xm51,-127v57,3,103,2,103,-59v0,-58,-48,-57,-103,-55r0,114","w":189,"k":{"u":3,"s":4,"r":3,"q":9,"o":9,"n":3,"m":3,"g":7,"e":9,"d":9,"c":9,"a":5,"Z":4,"J":41,"A":14,".":31,"-":18,",":31,"}":6,"p":3,"]":6,"X":3,"@":4,"4":6,"\/":18,")":6,"&":2}},"Q":{"d":"90,2v-42,-4,-67,-29,-66,-77r0,-111v-1,-50,27,-77,75,-77v48,0,75,26,75,77r0,111v1,48,-24,73,-65,77v-1,14,5,37,-9,37v-16,1,-8,-23,-10,-37xm48,-186v0,63,-21,161,42,165v2,-13,-6,-35,10,-35v15,0,7,22,9,35v63,-4,41,-103,41,-165v0,-36,-17,-55,-51,-55v-34,0,-51,19,-51,55","w":198,"k":{"}":5,"x":3,"p":3,"]":5,"X":4,")":5,"T":6,"Y":4,"u":2,"g":2,"s":2,"z":2,",":4,".":4,"Z":3,"a":2,"b":2,"f":2,"h":2,"k":2,"i":2,"j":2,"l":2,"m":2,"n":2,"r":2}},"R":{"d":"51,-9v-1,12,-24,11,-24,0r0,-246v0,-5,3,-8,9,-8v73,-3,142,-4,142,71v0,40,-19,63,-56,69r57,111v-3,14,-18,18,-27,0r-55,-108r-46,0r0,111xm51,-140v53,2,103,3,103,-51v0,-52,-50,-53,-103,-50r0,101","w":190,"k":{"4":4,"T":3,"u":3,"g":2,"c":4,"d":4,"e":4,"o":4,"q":4}},"S":{"d":"163,-72v0,89,-129,95,-150,36v9,-32,30,10,45,12v62,28,113,-52,57,-90v-36,-24,-97,-24,-96,-84v0,-46,32,-64,77,-66v28,-1,82,15,50,35v-29,-17,-108,-24,-103,28v7,73,120,35,120,129","w":177,"k":{"x":5,"v":6,"w":5,"y":6,"z":4}},"T":{"d":"14,-241v-12,0,-12,-22,0,-22r145,0v12,0,12,22,0,22r-60,0r0,232v-1,11,-23,12,-24,0r0,-232r-61,0","w":173,"k":{"x":29,"v":30,"p":33,"@":17,"6":4,"4":15,"0":4,"\/":18,"*":6,"&":6,"u":34,"w":30,"y":29,"g":33,"s":30,"z":29,",":17,".":17,"a":30,"f":6,"m":33,"n":33,"r":33,"-":18,"C":6,"G":6,"O":6,"Q":6,"c":32,"d":32,"e":32,"o":32,"q":32,"A":20,":":17,";":17,"J":29,"S":3}},"U":{"d":"102,2v-48,0,-77,-25,-76,-77r0,-180v0,-6,4,-8,12,-8v8,0,12,2,12,8r0,180v0,35,18,55,52,55v34,0,52,-20,52,-55r0,-180v0,-6,4,-8,12,-8v8,0,11,2,11,8r0,180v2,52,-27,77,-75,77","w":203,"k":{"x":2,"p":3,"\/":4,"u":3,"g":3,"s":3,"z":3,",":4,".":4,"a":2,"f":2,"i":2,"j":2,"m":3,"n":3,"r":3,"c":2,"d":2,"e":2,"o":2,"q":2,"A":2}},"V":{"d":"163,-257v3,-11,27,-6,23,6r-75,245v-2,11,-25,11,-28,0r-76,-247v0,-9,21,-15,23,-4r67,221","w":193,"k":{"z":9,"y":5,"w":5,"u":14,"s":17,"r":15,"q":19,"o":19,"n":15,"m":15,"g":18,"f":2,"e":19,"d":19,"c":19,"a":18,"J":23,"A":14,";":7,":":7,".":18,"-":12,",":18,"x":9,"v":5,"p":15,"@":9,"4":9,"\/":16,"&":3}},"W":{"d":"252,-257v3,-11,26,-6,23,6r-71,245v-1,11,-25,11,-28,0r-34,-128r-34,128v-1,11,-26,10,-29,0r-71,-247v-1,-10,21,-15,23,-4r62,221r36,-134v2,-12,22,-12,25,0r36,134","w":283,"k":{"x":8,"v":5,"p":14,"@":8,"4":8,"\/":15,"&":3,"u":13,"w":5,"y":5,"g":17,"s":15,"z":9,",":17,".":17,"a":16,"f":2,"m":14,"n":14,"r":14,"-":12,"c":18,"d":18,"e":18,"o":18,"q":18,"A":13,":":6,";":6,"J":21}},"X":{"d":"34,-11v-5,18,-22,13,-25,0v17,-44,43,-80,63,-121r-63,-121v2,-13,21,-16,26,1r52,99r52,-99v5,-17,23,-15,26,-1v-18,43,-43,80,-63,121r64,121v-4,13,-17,17,-26,0r-53,-101","k":{"y":13,"w":13,"u":8,"q":5,"o":5,"e":5,"d":5,"c":5,"Q":4,"O":4,"G":4,"C":4,"-":6,"v":13,"&":2}},"Y":{"d":"107,-9v0,12,-23,12,-23,0r-1,-95r-76,-149v0,-10,19,-15,22,-3r66,131r67,-131v3,-12,21,-7,22,3v-21,55,-54,99,-77,152r0,92","w":191,"k":{"x":22,"v":18,"p":25,"@":16,"4":15,"\/":19,"&":5,"u":27,"w":18,"y":17,"g":34,"s":30,"z":23,",":20,".":20,"a":30,"f":4,"m":26,"n":26,"r":26,"-":21,"C":4,"G":4,"O":4,"Q":4,"c":35,"d":35,"e":35,"o":35,"q":35,"A":22,":":15,";":15,"J":31}},"Z":{"d":"166,-11v1,6,-3,11,-9,11r-140,0v-10,1,-9,-10,-6,-17r120,-224r-109,0v-6,0,-10,-5,-9,-11v-1,-6,3,-11,9,-11r131,0v11,-1,10,10,6,17r-120,224r118,0v6,0,10,5,9,11","k":{"v":21,"p":2,"4":9,"&":2,"u":13,"w":20,"y":20,"g":3,"f":2,"m":2,"n":2,"r":2,"-":22,"C":3,"G":3,"O":3,"Q":3,"c":10,"d":10,"e":10,"o":10,"q":10,"t":3}},"[":{"d":"93,8v-23,-3,-61,9,-69,-9r0,-266v7,-18,47,-5,69,-9v5,0,10,4,9,10v0,20,-35,8,-54,11r0,241v19,3,54,-9,54,11v1,6,-4,10,-9,11","w":109,"k":{"y":11,"w":11,"u":8,"q":7,"o":7,"e":7,"d":7,"c":7,"Q":5,"O":5,"G":5,"C":5,"{":7,"v":11,"9":5,"8":7,"6":9,"4":15,"1":4,"0":9,"(":5}},"\\":{"d":"116,-12v2,11,-14,17,-18,6r-90,-256v-1,-10,15,-12,18,-4","w":124,"k":{"y":5,"w":5,"Y":15,"W":11,"T":14,"'":16,"\"":16,"v":5,"V":12}},"]":{"d":"73,8v-22,-4,-66,11,-66,-11v0,-20,35,-8,54,-11r0,-241v-19,-3,-54,9,-54,-11v0,-21,45,-6,66,-10v6,-1,12,4,12,9r0,266v-1,5,-6,9,-12,9","w":109},"^":{"d":"11,-214v-5,3,-12,-3,-11,-8v11,-16,32,-28,54,-29r38,21v7,2,4,17,-3,17r-41,-21","w":96},"_":{"d":"118,0v11,0,12,21,0,21r-115,0v-6,0,-9,-3,-9,-10v-1,-6,3,-11,9,-11r115,0","w":120},"`":{"d":"52,-229v9,4,1,17,-6,16r-41,-21v-9,-3,-4,-18,4,-18","w":55},"a":{"d":"114,-25v-28,41,-103,38,-103,-20v0,-49,49,-50,102,-49v2,-32,-12,-58,-42,-58v-13,0,-34,7,-39,11v-6,1,-10,-7,-9,-13v2,-12,30,-18,48,-18v81,0,64,88,65,163v0,12,-22,12,-22,0r0,-16xm113,-78v-37,1,-77,-4,-79,31v-1,20,14,30,32,30v27,0,55,-24,47,-61","w":157,"k":{"v":3,"\\":13,"V":17,"?":8,"\"":6,"'":6,"T":35,"U":4,"W":16,"Y":37,"w":3,"y":3,"C":3,"G":3,"O":3,"Q":3,"S":2,"B":3,"D":3,"E":3,"F":3,"H":3,"I":3,"K":3,"L":3,"M":3,"N":3,"P":3,"R":3}},"b":{"d":"45,-9v0,11,-22,12,-22,0r0,-257v0,-12,23,-12,23,0r0,121v25,-52,121,-21,112,40v8,59,-15,108,-63,108v-22,0,-42,-13,-50,-28r0,16xm90,-151v-43,0,-48,47,-44,96v1,13,25,37,44,36v39,-2,45,-40,45,-86v0,-24,-22,-47,-45,-46","k":{"}":7,"x":3,"]":7,"\\":12,"X":5,"V":19,"?":9,")":7,"\"":6,"'":6,"T":32,"U":2,"W":18,"Y":35,"y":1,"z":3,"Z":5,"S":3,"B":2,"D":2,"E":2,"F":2,"H":2,"I":2,"K":2,"L":2,"M":2,"N":2,"P":2,"R":2}},"c":{"d":"86,3v-59,1,-69,-43,-69,-107v0,-41,25,-70,69,-68v27,-5,71,22,40,34v-28,-22,-86,-16,-86,34v0,46,0,85,47,85v19,0,31,-8,41,-14v6,0,11,6,11,12v-3,16,-31,24,-53,24","w":147,"k":{"\\":6,"V":12,"?":6,"&":5,"\"":3,"'":3,"T":35,"W":11,"Y":27,"-":14,"C":4,"G":4,"O":4,"Q":4,"c":2,"d":2,"e":2,"o":2,"q":2,"J":3,"S":3}},"d":{"d":"16,-105v-7,-59,87,-93,112,-40r0,-121v1,-11,24,-12,24,0r0,257v-1,11,-23,12,-23,0r0,-16v-49,64,-132,5,-113,-80xm85,-151v-38,1,-45,39,-45,85v0,23,21,49,44,47v20,3,44,-22,44,-36v3,-48,0,-96,-43,-96","k":{"C":2,"G":2,"O":2,"Q":2,"B":2,"D":2,"E":2,"F":2,"H":2,"I":2,"K":2,"L":2,"M":2,"N":2,"P":2,"R":2}},"e":{"d":"94,3v-59,1,-78,-42,-78,-109v0,-36,32,-66,69,-66v36,0,67,28,67,65v0,49,-71,22,-112,29v-11,60,62,72,98,46v6,-2,10,7,10,11v-4,14,-32,24,-54,24xm85,-153v-28,0,-50,24,-45,58r72,0v13,0,17,-2,18,-13v1,-24,-21,-45,-45,-45","w":164,"k":{"\\":11,"V":18,"?":8,"\"":6,"'":6,"T":31,"U":2,"W":16,"Y":31,"S":3}},"f":{"d":"46,-9v-1,11,-22,12,-23,0r0,-199v0,-38,32,-71,73,-67v12,0,13,22,0,22v-45,-4,-54,35,-50,83v20,3,56,-9,60,9v-2,20,-40,6,-60,10r0,142","w":109,"k":{"q":6,"o":6,"g":4,"e":6,"d":6,"c":6,"J":30,"A":14,".":13,"-":17,",":13,"\/":13,"&":8}},"g":{"d":"82,84v-37,1,-73,-15,-73,-48v0,-18,11,-32,31,-40v-27,-8,-26,-39,-2,-50v-39,-33,-22,-118,42,-118v17,0,31,5,42,15v5,-11,14,-22,26,-23v5,0,11,4,10,9v-3,13,-21,9,-26,24v34,52,-13,133,-80,101v-26,15,0,30,18,31v38,4,83,6,83,47v0,35,-33,52,-71,52xm130,33v0,-30,-38,-28,-66,-32v-21,7,-32,17,-32,32v0,23,24,33,50,33v26,0,48,-10,48,-33xm80,-155v-28,0,-39,23,-39,55v0,24,14,42,39,42v29,0,39,-23,39,-55v0,-24,-15,-43,-39,-42","w":162,"k":{"X":6,"V":3,"?":9,"T":29,"W":3,"Y":14,"Z":7,"A":3,"J":3}},"h":{"d":"46,-9v-1,11,-22,12,-23,0r0,-257v0,-12,23,-12,23,0r0,121v25,-52,111,-20,111,40r0,96v-1,12,-22,11,-23,0r0,-96v1,-24,-22,-47,-45,-46v-22,1,-43,20,-43,46r0,96","w":178,"k":{"v":3,"\\":13,"V":18,"?":9,"\"":6,"'":6,"T":35,"U":4,"W":17,"Y":38,"w":3,"y":3,"C":3,"G":3,"O":3,"Q":3,"S":2,"B":3,"D":3,"E":3,"F":3,"H":3,"I":3,"K":3,"L":3,"M":3,"N":3,"P":3,"R":3}},"i":{"d":"34,-221v-9,0,-16,-7,-16,-15v0,-19,31,-19,32,0v0,8,-8,15,-16,15xm46,-9v-1,11,-22,12,-23,0r0,-153v0,-4,5,-9,11,-8v6,-1,12,3,12,8r0,153","w":68,"k":{"U":2,"C":2,"G":2,"O":2,"Q":2}},"j":{"d":"-1,84v-14,1,-16,-22,-2,-22v26,0,26,-20,26,-47r0,-177v0,-5,5,-9,11,-8v6,-1,12,3,12,8r0,177v0,45,-15,69,-47,69xm34,-221v-9,0,-16,-7,-16,-15v0,-19,31,-19,32,0v0,8,-8,15,-16,15","w":68,"k":{"U":2,"C":2,"G":2,"O":2,"Q":2}},"k":{"d":"46,-9v0,11,-23,12,-23,0r0,-257v0,-12,23,-12,23,0r0,175v32,-26,59,-57,93,-80v8,-1,17,12,10,18r-53,46v20,33,46,60,63,96v1,9,-13,18,-19,8r-61,-89r-33,29r0,54","w":164,"k":{"\\":5,"V":11,"?":5,"&":6,"T":28,"W":10,"Y":24,"g":2,"-":11,"C":5,"G":5,"O":5,"Q":5,"c":5,"d":5,"e":5,"o":5,"q":5}},"l":{"d":"49,-9v0,11,-23,12,-23,0r0,-257v0,-12,23,-12,23,0r0,257","w":74,"k":{"C":2,"G":2,"O":2,"Q":2,"B":2,"D":2,"E":2,"F":2,"H":2,"I":2,"K":2,"L":2,"M":2,"N":2,"P":2,"R":2}},"m":{"d":"46,-9v-1,11,-22,12,-23,0r0,-153v0,-4,5,-9,11,-8v13,-2,11,12,11,25v8,-15,25,-27,48,-27v26,0,44,17,51,36v22,-58,116,-39,116,31r0,96v-1,11,-23,11,-24,0v-3,-57,17,-141,-41,-142v-21,1,-42,20,-42,44r0,98v0,6,-4,9,-12,9v-8,0,-11,-3,-11,-9v-3,-58,16,-142,-41,-142v-22,0,-43,20,-43,46r0,96","w":280,"k":{"v":3,"\\":13,"V":18,"?":9,"\"":6,"'":6,"T":35,"U":4,"W":17,"Y":38,"w":3,"y":3,"C":3,"G":3,"O":3,"Q":3,"S":2,"B":3,"D":3,"E":3,"F":3,"H":3,"I":3,"K":3,"L":3,"M":3,"N":3,"P":3,"R":3}},"n":{"d":"46,-9v-1,11,-22,12,-23,0r0,-153v0,-5,5,-9,11,-8v13,-2,11,12,11,25v25,-52,112,-20,112,40r0,96v-1,12,-22,11,-23,0r0,-96v1,-24,-22,-47,-45,-46v-22,1,-43,20,-43,46r0,96","w":178,"k":{"v":3,"\\":13,"V":18,"?":9,"\"":6,"'":6,"T":35,"U":4,"W":17,"Y":38,"w":3,"y":3,"C":3,"G":3,"O":3,"Q":3,"S":2,"B":3,"D":3,"E":3,"F":3,"H":3,"I":3,"K":3,"L":3,"M":3,"N":3,"P":3,"R":3}},"o":{"d":"84,3v-49,-2,-68,-46,-68,-108v0,-36,32,-68,68,-67v50,1,69,44,69,106v0,35,-34,70,-69,69xm84,-151v-38,1,-45,39,-45,85v0,24,21,48,45,47v39,-1,45,-40,45,-86v0,-24,-22,-47,-45,-46","w":168,"k":{"}":7,"x":3,"]":7,"\\":12,"X":5,"V":19,"?":9,")":7,"\"":6,"'":6,"T":32,"U":2,"W":18,"Y":35,"y":1,"z":3,"Z":5,"S":3,"B":2,"D":2,"E":2,"F":2,"H":2,"I":2,"K":2,"L":2,"M":2,"N":2,"P":2,"R":2}},"p":{"d":"46,75v0,11,-23,12,-23,0r0,-237v0,-4,5,-9,11,-8v13,-2,11,12,11,25v26,-52,121,-20,113,40v8,59,-15,108,-63,108v-21,0,-41,-13,-49,-28r0,100xm90,-151v-43,0,-48,47,-44,96v1,13,25,37,44,36v39,-2,45,-40,45,-86v0,-24,-22,-47,-45,-46","k":{"}":7,"x":3,"]":7,"\\":12,"X":5,"V":19,"?":9,")":7,"\"":6,"'":6,"T":32,"U":2,"W":18,"Y":35,"y":1,"z":3,"Z":5,"S":3,"B":2,"D":2,"E":2,"F":2,"H":2,"I":2,"K":2,"L":2,"M":2,"N":2,"P":2,"R":2}},"q":{"d":"16,-105v-7,-60,87,-93,113,-40v0,-13,-2,-27,11,-25v6,-1,11,4,12,8r0,237v-1,11,-24,12,-24,0r0,-100v-49,64,-131,4,-112,-80xm85,-151v-38,1,-45,39,-45,85v0,23,21,49,44,47v20,3,44,-22,44,-36v3,-48,0,-96,-43,-96","k":{"Z":2,"Y":25,"W":14,"U":3,"T":34,"S":2,"R":2,"Q":3,"P":2,"O":3,"N":2,"M":2,"L":2,"K":2,"I":2,"H":2,"G":3,"F":2,"E":2,"D":2,"C":3,"B":2,"'":4,"\"":4,"\\":9,"V":15,"?":8}},"r":{"d":"46,-9v0,11,-23,12,-23,0r0,-153v0,-4,5,-9,11,-8v13,-2,11,13,11,26v10,-18,30,-31,61,-28v4,0,11,5,10,10v0,11,-10,11,-22,11v-25,-1,-48,24,-48,53r0,89","w":119,"k":{"}":10,"]":12,"X":17,"V":4,"?":15,"\/":15,")":12,"&":11,"\"":3,"'":3,"T":30,"W":3,"Y":18,"g":4,"s":1,",":16,".":16,"Z":23,"-":19,"c":6,"d":6,"e":6,"o":6,"q":6,"A":17,"J":32}},"s":{"d":"126,-44v0,57,-99,60,-114,21v6,-27,32,11,56,6v22,1,37,-8,37,-26v0,-51,-89,-22,-89,-80v0,-51,80,-64,105,-32v-3,24,-30,0,-48,2v-28,-3,-49,30,-27,46v27,19,80,14,80,63","w":138,"k":{"\\":9,"V":13,"?":8,"\"":5,"'":5,"T":30,"U":2,"W":13,"Y":29,"-":4}},"t":{"d":"100,-11v0,10,-10,11,-21,11v-38,0,-57,-18,-57,-53r0,-190v0,-10,23,-11,23,0r0,73v19,3,52,-9,55,9v-1,19,-37,6,-55,10r0,98v-1,28,15,33,44,32v6,0,11,4,11,10","w":106,"k":{"\\":5,"V":6,"?":6,"&":4,"T":30,"W":5,"Y":18,"-":15,"c":3,"d":3,"e":3,"o":3,"q":3,"J":2}},"u":{"d":"89,3v-36,0,-68,-33,-68,-68r0,-96v0,-11,23,-12,23,0r0,96v0,23,22,46,45,46v23,0,45,-22,45,-46r0,-97v1,-10,23,-11,24,0r0,97v1,34,-35,68,-69,68","w":178,"k":{"}":7,"]":8,"\\":8,"X":8,"V":14,"?":10,"\/":4,")":8,"\"":4,"'":4,"T":34,"U":3,"W":13,"Y":27,"Z":9,"C":2,"G":2,"O":2,"Q":2,"A":3,"S":3,"B":3,"D":3,"E":3,"F":3,"H":3,"I":3,"K":3,"L":3,"M":3,"N":3,"P":3,"R":3}},"v":{"d":"123,-164v3,-13,22,-6,23,3r-60,158v-1,8,-20,8,-21,0r-60,-157v0,-9,19,-16,23,-6r48,130","w":151,"k":{"Z":17,"Y":19,"W":5,"T":30,"S":2,"J":12,"A":8,".":10,"-":6,",":10,"'":4,"\"":4,"}":10,"]":11,"\\":5,"X":13,"V":6,"?":12,"\/":9,")":11,"&":3}},"w":{"d":"212,-166v3,-10,24,-4,22,5v-15,56,-39,104,-57,158v-2,8,-17,8,-19,0r-38,-117r-37,116v-1,10,-19,9,-20,0r-58,-157v0,-9,19,-15,23,-5r46,129r37,-117v1,-9,16,-8,19,0r35,118","w":240,"k":{"}":10,"]":11,"\\":5,"X":13,"V":6,"?":12,"\/":9,")":11,"&":3,"\"":4,"'":4,"T":30,"W":5,"Y":18,",":9,".":9,"Z":16,"-":6,"A":8,"J":11,"S":2}},"x":{"d":"30,-1v-7,10,-27,-2,-20,-13r48,-72r-48,-75v0,-7,15,-16,21,-8r43,66r43,-66v7,-9,26,2,19,13r-47,70r50,77v0,8,-16,17,-21,8r-44,-67","w":147,"k":{"q":3,"o":3,"e":3,"d":3,"c":3,"Y":22,"W":8,"T":29,"Q":3,"O":3,"J":3,"G":3,"C":3,"-":12,"'":3,"\"":3,"\\":5,"V":8,"?":6,"&":5}},"y":{"d":"123,-167v4,-10,23,-3,23,6r-70,189v-14,28,-24,52,-60,56v-7,0,-11,-4,-11,-11v5,-21,29,-7,38,-31v9,-13,17,-29,22,-49r-60,-154v0,-10,19,-16,23,-6r49,132","w":151,"k":{"}":10,"]":10,"\\":4,"X":13,"V":5,"?":12,"\/":9,")":11,"&":3,"\"":3,"'":3,"T":30,"W":5,"Y":18,",":10,".":10,"Z":16,"-":6,"A":8,"J":11}},"z":{"d":"18,0v-9,0,-12,-11,-6,-18r88,-132r-79,0v-11,0,-11,-20,0,-20r102,0v9,-1,12,11,6,18r-89,131r87,0v5,0,10,5,9,11v1,6,-5,10,-9,10r-109,0","w":144,"k":{"\\":7,"V":10,"?":7,"&":4,"\"":4,"'":4,"T":30,"U":3,"W":9,"Y":24,"-":14,"C":2,"G":2,"O":2,"Q":2,"c":3,"d":3,"e":3,"o":3,"q":3,"J":2}},"{":{"d":"32,-121v0,-13,-23,-3,-21,-18v-2,-13,22,-4,21,-17r-6,-61v-1,-32,33,-59,67,-59v15,0,15,21,3,21v-23,0,-47,18,-47,40v0,26,19,67,-6,77v26,10,6,60,6,89v0,23,25,36,47,35v6,0,9,3,9,10v0,7,-5,11,-13,11v-34,1,-69,-22,-66,-55","w":111,"k":{"y":10,"w":10,"u":7,"q":6,"o":6,"e":6,"d":6,"c":6,"Q":5,"O":5,"G":5,"C":5,"{":6,"v":10,"9":5,"8":6,"6":8,"4":14,"1":4,"0":8,"(":5}},"|":{"d":"48,-1v-1,12,-24,11,-24,0r0,-267v0,-10,24,-11,24,0r0,267","w":72},"}":{"d":"86,-48v1,34,-33,56,-67,55v-8,0,-12,-4,-12,-11v0,-7,2,-10,8,-10v22,1,47,-11,47,-35v0,-30,-20,-76,6,-89v-24,-10,-6,-51,-6,-77v0,-22,-24,-41,-47,-40v-4,0,-9,-5,-8,-11v0,-6,5,-10,12,-10v34,-2,71,27,67,59r-7,61v1,12,22,4,22,17v0,13,-20,6,-22,18","w":111,"k":{"}":6,"]":7,")":6}},"~":{"d":"50,-90v-9,-2,-22,11,-27,12v-5,0,-6,-3,-6,-9v13,-47,80,9,104,-19v5,-1,7,5,7,8v-7,35,-54,13,-78,8","w":144},"\u00a0":{"w":72}}});
Cufon.replace('#header .login_sec .col a', { fontFamily:'Helvetica Neue LT Std', fontWeight: 400, hover: true});
Cufon.replace('#top_sec .search_box h1', { fontFamily:'Dosis', fontWeight: 400, hover: true});
Cufon.replace('#top_sec h4', { fontFamily:'Helvetica Neue LT Std', fontWeight: 400, hover: true});
Cufon.replace('.form_container .form_list li a', { fontFamily:'Helvetica Neue LT Std', fontWeight: 400, hover: true});
Cufon.replace('.btm_search_detail .simple_search', { fontFamily:'Helvetica Neue LT Std', fontWeight: 400, hover: true});
Cufon.replace('.age_detail', { fontFamily:'Helvetica Neue LT Std', fontWeight: 300, hover: true});
Cufon.replace('.img_detail h3', { fontFamily:'Helvetica Neue LT Std', fontWeight: 500, hover: true});
Cufon.replace('.img_detail h4', { fontFamily:'Helvetica Neue LT Std', fontWeight: 300, hover: true});
Cufon.replace('.img_detail small', { fontFamily:'Helvetica Neue LT Std', fontWeight: 300, hover: true});
Cufon.replace('.img_detail1 .profile_btn', { fontFamily:'Helvetica Neue LT Std', fontWeight: 400, hover: true});
Cufon.replace('.img_detail1 h4', { fontFamily:'Helvetica Neue LT Std', fontWeight: 300, hover: true});
Cufon.replace('.img_detail1 h4 span', { fontFamily:'Helvetica Neue LT Std', fontWeight: 500, hover: true});
Cufon.replace('.top_box .left_box h2', { fontFamily:'Helvetica Neue LT Std', fontWeight: 750, hover: true});
Cufon.replace('.top_box .left_box h3', { fontFamily:'Helvetica Neue LT Std', fontWeight: 500, hover: true});
Cufon.replace('.top_box .left_box .text_detail', { fontFamily:'Helvetica Neue LT Std', fontWeight: 500, hover: true});
Cufon.replace('.top_box .right_box .pic_detail3 h4', { fontFamily:'Helvetica Neue LT Std', fontWeight: 400, hover: true});
Cufon.replace('.testimonial_box h4', { fontFamily:'Helvetica Neue LT Std', fontWeight: 400, hover: true});
Cufon.replace('.slider_container h4', { fontFamily:'Helvetica Neue LT Std', fontWeight: 500, hover: true});
Cufon.replace('.profile_middle_container h3', { fontFamily:'Helvetica Neue LT Std', fontWeight: 500, hover: true});
Cufon.replace('.profile_middle_container h2', { fontFamily:'Helvetica Neue LT Std', fontWeight: 400, hover: true});
Cufon.replace('.profile_middle_container .btm_text', { fontFamily:'Helvetica Neue LT Std', fontWeight: 400, hover: true});
Cufon.replace('.profile_btm_container h2', { fontFamily:'Helvetica Neue LT Std', fontWeight: 500, hover: true});
Cufon.replace('.fb_con', { fontFamily:'Helvetica Neue LT Std', fontWeight: 400, hover: true});
Cufon.replace('.scroll_link a', { fontFamily:'Helvetica Neue LT Std', fontWeight: 500, hover: true});

Cufon.replace('.form_container .row .col label', { fontFamily:'Helvetica Neue LT Std', fontWeight: 300, hover: true});
Cufon.replace('.btn_link li', { fontFamily:'Helvetica Neue LT Std', fontWeight: 300, hover: true});
Cufon.replace('.jqTransformSelectWrapper div span', { fontFamily:'Helvetica Neue LT Std', fontWeight: 300, hover: true});
Cufon.replace('.jqTransformSelectWrapper ul', { fontFamily:'Helvetica Neue LT Std', fontWeight: 300, hover: true});

Cufon.replace('.field label', { fontFamily:'Helvetica Neue LT Std', fontWeight: 300, hover: true});
Cufon.replace('input', { fontFamily:'Helvetica Neue LT Std', fontWeight: 300, hover: true});
Cufon.replace('option', { fontFamily:'Helvetica Neue LT Std', fontWeight: 300, hover: true});
Cufon.replace('select', { fontFamily:'Helvetica Neue LT Std', fontWeight: 300, hover: true});
Cufon.replace('.plan h1, .plan h2, .plan p', { fontFamily:'Helvetica Neue LT Std', fontWeight: 300, hover: true});
Cufon.replace('.sm_form_container p, .sm_form_container a, .sm_form_container h1, .sm_form_container input ', { fontFamily:'Helvetica Neue LT Std', fontWeight: 300, hover: true});

/*Cufon.replace('#content_page .left_section ul li', { fontFamily:'Helvetica', fontWeight: 700, hover: true});
Cufon.replace('#content_page .left_section ul li ul li span', { fontFamily:'Helvetica', fontWeight: 700, hover: true});*/

Cufon.replace('.msg_row h2', { fontFamily:'Helvetica Neue LT Std', fontWeight: 600, hover: true});
Cufon.replace('.msg_row strong', { fontFamily:'Helvetica Neue LT Std', fontWeight:500, hover: true});

Cufon.replace('.tab_contr .unread .col_2 span', { fontFamily:'Helvetica Neue LT Std', fontWeight:500, hover: true});

Cufon.replace('.mail_box .tab_row ul li > a', { fontFamily:'helveticaneueltstdroman', fontWeight:400, hover: true});
Cufon.replace('.tab_contr .unread .col_1 strong', { fontFamily:'Helvetica Neue LT Std', fontWeight: 500, hover: true});


Cufon.replace('.tab_contr .unread .col_1 small', { fontFamily:'helveticaneueltstdltit', fontWeight: 300, hover: true});














(function($){
        if($("#jqTransformDisable").length > 0) {
    return;
  }else{
        var defaultOptions = {preloadImg:true};
        var jqTransformImgPreloaded = false;
 
        var jqTransformPreloadHoverFocusImg = function(strImgUrl) {
                //guillemets to remove for ie
                strImgUrl = strImgUrl.replace(/^url\((.*)\)/,'$1').replace(/^\"(.*)\"$/,'$1');
                var imgHover = new Image();
                imgHover.src = strImgUrl.replace(/\.([a-zA-Z]*)$/,'-hover.$1');
                var imgFocus = new Image();
                imgFocus.src = strImgUrl.replace(/\.([a-zA-Z]*)$/,'-focus.$1');                        
        };
 
       
        /***************************
          Labels
        ***************************/
        var jqTransformGetLabel = function(objfield){
                var selfForm = $(objfield.get(0).form);
                var oLabel = objfield.next();
                if(!oLabel.is('label')) {
                        oLabel = objfield.prev();
                        if(oLabel.is('label')){
                                var inputname = objfield.attr('id');
                                if(inputname){
                                        oLabel = selfForm.find('label[for="'+inputname+'"]');
                                }
                        }
                }
                if(oLabel.is('label')){return oLabel.css('cursor','pointer');}
                return false;
        };
       
        /* Hide all open selects */
        var jqTransformHideSelect = function(oTarget){
                var ulVisible = $('.jqTransformSelectWrapper ul:visible');
                ulVisible.each(function(){
                        var oSelect = $(this).parents(".jqTransformSelectWrapper:first").find("select").get(0);
                        //do not hide if click on the label object associated to the select
                        if( !(oTarget && oSelect.oLabel && oSelect.oLabel.get(0) == oTarget.get(0)) ){$(this).hide();}
                });
        };
        /* Check for an external click */
        var jqTransformCheckExternalClick = function(event) {
                if ($(event.target).parents('.jqTransformSelectWrapper').length === 0) { jqTransformHideSelect($(event.target)); }
        };
 
        /* Apply document listener */
        var jqTransformAddDocumentListener = function (){
                $(document).mousedown(jqTransformCheckExternalClick);
        };     
                       
        /* Add a new handler for the reset action */
        var jqTransformReset = function(f){
                var sel;
                $('.jqTransformSelectWrapper select', f).each(function(){sel = (this.selectedIndex<0) ? 0 : this.selectedIndex; $('ul', $(this).parent()).each(function(){$('a:eq('+ sel +')', this).click();});});
                $('a.jqTransformCheckbox, a.jqTransformRadio', f).removeClass('jqTransformChecked');
                $('input:checkbox, input:radio', f).each(function(){if(this.checked){$('a', $(this).parent()).addClass('jqTransformChecked');}});
        };
 
        /***************************
          Buttons
         ***************************/
        $.fn.jqTransInputButton = function(){
                return this.each(function(){
                        var newBtn = $('<button id="'+ this.id +'" name="'+ this.name +'" type="'+ this.type +'" class="'+ this.className +' jqTransformButton"><span><span>'+ $(this).attr('value') +'</span></span>')
                                .hover(function(){newBtn.addClass('jqTransformButton_hover');},function(){newBtn.removeClass('jqTransformButton_hover')})
                                .mousedown(function(){newBtn.addClass('jqTransformButton_click')})
                                .mouseup(function(){newBtn.removeClass('jqTransformButton_click')})
                        ;
                        $(this).replaceWith(newBtn);
                });
        };
       
        /***************************
          Text Fields
         ***************************/
        $.fn.jqTransInputText = function(){
                return this.each(function(){
                        var $input = $(this);
       
                        if($input.hasClass('jqtranformdone') || !$input.is('input')) {return;}
                        $input.addClass('jqtranformdone');
       
                        var oLabel = jqTransformGetLabel($(this));
                        oLabel && oLabel.bind('click',function(){$input.focus();});
       
                        var inputSize=$input.width();
                        if($input.attr('size')){
                                inputSize = $input.attr('size')*10;
                                $input.css('width',inputSize);
                        }
                       
                        $input.addClass("jqTransformInput").wrap('<div class="jqTransformInputWrapper"><div class="jqTransformInputInner"><div></div></div></div>');
                        var $wrapper = $input.parent().parent().parent();
                        $wrapper.css("width", inputSize+10);
                        $input
                                .focus(function(){$wrapper.addClass("jqTransformInputWrapper_focus");})
                                .blur(function(){$wrapper.removeClass("jqTransformInputWrapper_focus");})
                                .hover(function(){$wrapper.addClass("jqTransformInputWrapper_hover");},function(){$wrapper.removeClass("jqTransformInputWrapper_hover");})
                        ;
       
                        /* If this is safari we need to add an extra class */
                        $.browser.safari && $wrapper.addClass('jqTransformSafari');
                        $.browser.safari && $input.css('width',$wrapper.width()+16);
                        this.wrapper = $wrapper;
                       
                });
        };
       
        /***************************
          Check Boxes
         ***************************/  
        $.fn.jqTransCheckBox = function(){
                return this.each(function(){
                        if($(this).hasClass('jqTransformHidden')) {return;}
 
                        var $input = $(this);
                        var inputSelf = this;
 
                        //set the click on the label
                        var oLabel=jqTransformGetLabel($input);
                        oLabel && oLabel.click(function(){aLink.trigger('click');});
                       
                        var aLink = $('<a href="#" class="jqTransformCheckbox"></a>');
                        //wrap and add the link
                        $input.addClass('jqTransformHidden').wrap('<span class="jqTransformCheckboxWrapper"></span>').parent().prepend(aLink);
                        //on change, change the class of the link
                        $input.change(function(){
                                this.checked && aLink.addClass('jqTransformChecked') || aLink.removeClass('jqTransformChecked');
                                return true;
                        });
                        // Click Handler, trigger the click and change event on the input
                        aLink.click(function(){
                                //do nothing if the original input is disabled
                                if($input.attr('disabled')){return false;}
                                //trigger the envents on the input object
                                $input.trigger('click').trigger("change");     
                                return false;
                        });
 
                        // set the default state
                        this.checked && aLink.addClass('jqTransformChecked');          
                });
        };
        /***************************
          Radio Buttons
         ***************************/  
        $.fn.jqTransRadio = function(){
                return this.each(function(){
                        if($(this).hasClass('jqTransformHidden')) {return;}
 
                        var $input = $(this);
                        var inputSelf = this;
                               
                        oLabel = jqTransformGetLabel($input);
                        oLabel && oLabel.click(function(){aLink.trigger('click');});
       
                        var aLink = $('<a href="#" class="jqTransformRadio" rel="'+ this.name +'"></a>');
                        $input.addClass('jqTransformHidden').wrap('<span class="jqTransformRadioWrapper"></span>').parent().prepend(aLink);
                       
                        $input.change(function(){
                                inputSelf.checked && aLink.addClass('jqTransformChecked') || aLink.removeClass('jqTransformChecked');
                                return true;
                        });
                        // Click Handler
                        aLink.click(function(){
                                if($input.attr('disabled')){return false;}
                                $input.trigger('click').trigger('change');
       
                                // uncheck all others of same name input radio elements
                                $('input[name="'+$input.attr('name')+'"]',inputSelf.form).not($input).each(function(){
                                        $(this).attr('type')=='radio' && $(this).trigger('change');
                                });
       
                                return false;                                  
                        });
                        // set the default state
                        inputSelf.checked && aLink.addClass('jqTransformChecked');
                });
        };
       
        /***************************
          TextArea
         ***************************/  
        $.fn.jqTransTextarea = function(){
                return this.each(function(){
                        var textarea = $(this);
       
                        if(textarea.hasClass('jqtransformdone')) {return;}
                        textarea.addClass('jqtransformdone');
       
                        oLabel = jqTransformGetLabel(textarea);
                        oLabel && oLabel.click(function(){textarea.focus();});
                       
                        var strTable = '<table cellspacing="0" cellpadding="0" border="0" class="jqTransformTextarea">';
                        strTable +='<tr><td id="jqTransformTextarea-tl"></td><td id="jqTransformTextarea-tm"></td><td id="jqTransformTextarea-tr"></td></tr>';
                        strTable +='<tr><td id="jqTransformTextarea-ml">&nbsp;</td><td id="jqTransformTextarea-mm"><div></div></td><td id="jqTransformTextarea-mr">&nbsp;</td></tr>';  
                        strTable +='<tr><td id="jqTransformTextarea-bl"></td><td id="jqTransformTextarea-bm"></td><td id="jqTransformTextarea-br"></td></tr>';
                        strTable +='</table>';                                 
                        var oTable = $(strTable)
                                        .insertAfter(textarea)
                                        .hover(function(){
                                                !oTable.hasClass('jqTransformTextarea-focus') && oTable.addClass('jqTransformTextarea-hover');
                                        },function(){
                                                oTable.removeClass('jqTransformTextarea-hover');                                       
                                        })
                                ;
                               
                        textarea
                                .focus(function(){oTable.removeClass('jqTransformTextarea-hover').addClass('jqTransformTextarea-focus');})
                                .blur(function(){oTable.removeClass('jqTransformTextarea-focus');})
                                .appendTo($('#jqTransformTextarea-mm div',oTable))
                        ;
                        this.oTable = oTable;
                        if($.browser.safari){
                                $('#jqTransformTextarea-mm',oTable)
                                        .addClass('jqTransformSafariTextarea')
                                        .find('div')
                                                .css('height',textarea.height())
                                                .css('width',textarea.width())
                                ;
                        }
                });
        };
       
        /***************************
          Select
         ***************************/  
        $.fn.jqTransSelect = function(){
                return this.each(function(index){
                        var $select = $(this);
 
                        if($select.hasClass('jqTransformHidden')) {return;}
                        if($select.attr('multiple')) {return;}
 
                        var oLabel  =  jqTransformGetLabel($select);
                        /* First thing we do is Wrap it */
                        var $wrapper = $select
                                .addClass('jqTransformHidden')
                                .wrap('<div class="jqTransformSelectWrapper"></div>')
                                .parent()
                                .css({zIndex: 10-index})
                        ;
                       
                        /* Now add the html for the select */
                        $wrapper.prepend('<div><span></span><a href="#" class="jqTransformSelectOpen"></a></div><ul></ul>');
                        var $ul = $('ul', $wrapper).css('width',$select.width()).hide();
                        /* Now we add the options */
                        $('option', this).each(function(i){
                                var oLi = $('<li><a href="#" index="'+ i +'">'+ $(this).html() +'</a></li>');
                                $ul.append(oLi);
                        });
                       
                        /* Add click handler to the a */
                        $ul.find('a').click(function(){
                                        $('a.selected', $wrapper).removeClass('selected');
                                        $(this).addClass('selected');  
                                        /* Fire the onchange event */
                                        //if ($select[0].selectedIndex != $(this).attr('index') && $select[0].onchange) { $select[0].selectedIndex = $(this).attr('index'); $select[0].onchange(); }
                                        if ($select[0].selectedIndex != $(this).attr('index')) { $select[0].selectedIndex = $(this).attr('index'); $select.change(); }
                               
                                //Redundent code
                                        //$select[0].selectedIndex = $(this).attr('index');
                                        $('span:eq(0)', $wrapper).html($(this).html());
                                        $ul.hide();
                                        return false;
                        });
                        /* Set the default */
                        $('a:eq('+ this.selectedIndex +')', $ul).click();
                        $('span:first', $wrapper).click(function(){$("a.jqTransformSelectOpen",$wrapper).trigger('click');});
                        oLabel && oLabel.click(function(){$("a.jqTransformSelectOpen",$wrapper).trigger('click');});
                        this.oLabel = oLabel;
                       
                        /* Apply the click handler to the Open */
                        var oLinkOpen = $('a.jqTransformSelectOpen', $wrapper)
                                .click(function(){
                                        //Check if box is already open to still allow toggle, but close all other selects
                                        if( $ul.css('display') == 'none' ) {jqTransformHideSelect();}
                                        if($select.attr('disabled')){return false;}
 
                                        $ul.slideToggle('fast', function(){                                    
                                                var offSet = ($('a.selected', $ul).offset().top - $ul.offset().top);
                                                $ul.animate({scrollTop: offSet});
                                        });
                                        return false;
                                })
                        ;
 
                        // Set the new width
                        var iSelectWidth = $select.outerWidth();
                        var oSpan = $('span:first',$wrapper);
                        var newWidth = (iSelectWidth > oSpan.innerWidth())?iSelectWidth+oLinkOpen.outerWidth():$wrapper.width();
                        $wrapper.css('width',newWidth);
                        $ul.css('width',newWidth-2);
                        oSpan.css({width:iSelectWidth});
               
                        // Calculate the height if necessary, less elements that the default height
                        //show the ul to calculate the block, if ul is not displayed li height value is 0
                        $ul.css({display:'block',visibility:'hidden'});
                        var iSelectHeight = ($('li',$ul).length)*($('li:first',$ul).height());//+1 else bug ff
                        (iSelectHeight < $ul.height()) && $ul.css({height:iSelectHeight,'overflow':'hidden'});//hidden else bug with ff
                        $ul.css({display:'none',visibility:'visible'});
                       
                });
        };
        $.fn.jqTransform = function(options){
                var opt = $.extend({},defaultOptions,options);
               
                /* each form */
                 return this.each(function(){
                        var selfForm = $(this);
                        if(selfForm.hasClass('jqtransformdone')) {return;}
                        selfForm.addClass('jqtransformdone');
                       
                        $('input:submit, input:reset, input[type="button"]', this).jqTransInputButton();                       
                        $('input:text, input:password', this).jqTransInputText();                      
                        $('input:checkbox', this).jqTransCheckBox();
                        $('input:radio', this).jqTransRadio();
                        $('textarea', this).jqTransTextarea();
                       
                        if( $('select', this).jqTransSelect().length > 0 ){jqTransformAddDocumentListener();}
                        selfForm.bind('reset',function(){var action = function(){jqTransformReset(this);}; window.setTimeout(action, 10);});
                       
                        //preloading dont needed anymore since normal, focus and hover image are the same one
                        /*if(opt.preloadImg && !jqTransformImgPreloaded){
                                jqTransformImgPreloaded = true;
                                var oInputText = $('input:text:first', selfForm);
                                if(oInputText.length > 0){
                                        //pour ie on eleve les ""
                                        var strWrapperImgUrl = oInputText.get(0).wrapper.css('background-image');
                                        jqTransformPreloadHoverFocusImg(strWrapperImgUrl);                                     
                                        var strInnerImgUrl = $('div.jqTransformInputInner',$(oInputText.get(0).wrapper)).css('background-image');
                                        jqTransformPreloadHoverFocusImg(strInnerImgUrl);
                                }
                               
                                var oTextarea = $('textarea',selfForm);
                                if(oTextarea.length > 0){
                                        var oTable = oTextarea.get(0).oTable;
                                        $('td',oTable).each(function(){
                                                var strImgBack = $(this).css('background-image');
                                                jqTransformPreloadHoverFocusImg(strImgBack);
                                        });
                                }
                        }*/
                       
                       
                }); /* End Form each */
                               
        };/* End the Plugin */
  }
})(jQuery);
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
;
(function() {


}).call(this);
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
;
/*
 * Dropit v1.1.0
 * http://dev7studios.com/dropit
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */


;(function($) {

    $.fn.dropit = function(method) {

        var methods = {

            init : function(options) {
                this.dropit.settings = $.extend({}, this.dropit.defaults, options);
                return this.each(function() {
                    var $el = $(this),
                         el = this,
                         settings = $.fn.dropit.settings;

                    // Hide initial submenus
                    $el.addClass('dropit')
                    .find('>'+ settings.triggerParentEl +':has('+ settings.submenuEl +')').addClass('dropit-trigger')
                    .find(settings.submenuEl).addClass('dropit-submenu').hide();

                    // Open on click
                    $el.on(settings.action, settings.triggerParentEl +':has('+ settings.submenuEl +') > '+ settings.triggerEl +'', function(){
                        // Close click menu's if clicked again
                        if(settings.action == 'click' && $(this).parents(settings.triggerParentEl).hasClass('dropit-open')){
                            settings.beforeHide.call(this);
                            $(this).parents(settings.triggerParentEl).removeClass('dropit-open').find(settings.submenuEl).hide();
                            settings.afterHide.call(this);
                            return false;
                        }

                        // Hide open menus
                        settings.beforeHide.call(this);
                        $('.dropit-open').removeClass('dropit-open').find('.dropit-submenu').hide();
                        settings.afterHide.call(this);

                        // Open this menu
                        settings.beforeShow.call(this);
                        $(this).parents(settings.triggerParentEl).addClass('dropit-open').find(settings.submenuEl).show();
                        settings.afterShow.call(this);

                        return false;
                    });

                    // Close if outside click
                    $(document).on('click', function(){
                        settings.beforeHide.call(this);
                        $('.dropit-open').removeClass('dropit-open').find('.dropit-submenu').hide();
                        settings.afterHide.call(this);
                    });

                    // If hover
                    if(settings.action == 'mouseenter'){
                        $el.on('mouseleave', function(){
                            settings.beforeHide.call(this);
                            $(this).removeClass('dropit-open').find(settings.submenuEl).hide();
                            settings.afterHide.call(this);
                        });
                    }

                    settings.afterLoad.call(this);
                });
            }

        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in dropit plugin!');
        }

    };

    $.fn.dropit.defaults = {
        action: 'click', // The open action for the trigger
        submenuEl: 'ul', // The submenu element
        triggerEl: 'a', // The trigger element
        triggerParentEl: 'li', // The trigger parent element
        afterLoad: function(){}, // Triggers when plugin has loaded
        beforeShow: function(){}, // Triggers before submenu is shown
        afterShow: function(){}, // Triggers after submenu is shown
        beforeHide: function(){}, // Triggers before submenu is hidden
        afterHide: function(){} // Triggers before submenu is hidden
    };

    $.fn.dropit.settings = {};

})(jQuery);
(function() {


}).call(this);
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright © 1988, 1990, 1993, 2002 Adobe Systems Incorporated.  All Rights
 * Reserved. © 1981, 2002 Heidelberger Druckmaschinen AG. All rights reserved.
 * 
 * Trademark:
 * Helvetica is a trademark of Heidelberger Druckmaschinen AG, exclusively
 * licensed through Linotype Library GmbH, and may be registered in certain
 * jurisdictions.
 * 
 * Designer:
 * Linotype Staff
 * 
 * Vendor URL:
 * http://www.adobe.com/type
 * 
 * License information:
 * http://www.adobe.com/type/legal.html
 */

Cufon.registerFont({"w":200,"face":{"font-family":"helveticaneueltstdltit","font-weight":300,"font-style":"italic","font-stretch":"normal","units-per-em":"360","panose-1":"2 11 4 3 2 2 2 9 2 4","ascent":"257","descent":"-103","x-height":"5","bbox":"-49 -283 352 77","underline-thickness":"18","underline-position":"-18","slope":"-12","unicode-range":"U+0020-U+007E"},"glyphs":{" ":{"w":100},"!":{"d":"39,0r-31,0r9,-38r30,0xm44,-64r-14,0r19,-113r18,-80r24,0","w":100},"\"":{"d":"49,-170r0,-87r21,0r0,87r-21,0xm94,-170r0,-87r21,0r0,87r-21,0","w":133},"#":{"d":"179,-96r-4,16r-36,0r-11,80r-18,0r11,-80r-51,0r-11,80r-18,0r11,-80r-39,0r3,-16r38,0r8,-57r-39,0r3,-16r38,0r12,-80r18,0r-12,80r51,0r11,-80r18,0r-11,80r38,0r-4,16r-36,0r-8,57r38,0xm131,-153r-51,0r-8,57r51,0"},"$":{"d":"117,-242v-48,-6,-91,44,-57,79v8,8,22,12,36,17xm85,-16v63,16,115,-78,38,-99v-4,-1,-9,-3,-16,-5xm24,-189v2,-54,42,-74,97,-73r4,-19r16,0r-4,20v42,6,72,30,69,79r-24,0v-1,-37,-17,-53,-50,-58r-20,99v35,11,76,21,76,67v0,57,-45,80,-108,79r-6,31r-16,0r7,-33v-46,-6,-75,-36,-73,-88r24,0v-2,39,16,61,53,67r23,-106v-37,-8,-70,-29,-68,-65"},"%":{"d":"139,-204v-1,45,-21,85,-66,86v-29,0,-49,-20,-49,-50v0,-42,25,-87,67,-86v29,0,49,21,48,50xm43,-168v0,17,11,34,30,34v31,0,47,-38,47,-69v0,-23,-10,-35,-30,-35v-34,0,-47,36,-47,70xm276,-81v-1,45,-22,84,-67,86v-29,0,-48,-20,-48,-50v0,-43,24,-86,67,-86v29,0,49,21,48,50xm179,-45v0,17,11,34,30,34v31,0,47,-38,47,-69v0,-23,-10,-35,-30,-35v-34,0,-47,36,-47,70xm37,12r206,-272r19,0r-205,272r-20,0","w":299},"&":{"d":"118,-238v-48,0,-42,64,-18,87v30,-18,53,-24,53,-55v0,-20,-14,-32,-35,-32xm29,-59v0,58,87,56,114,12r-51,-79v-30,15,-63,27,-63,67xm119,-257v54,0,76,62,34,92v-17,12,-27,19,-43,29r46,72v9,-11,15,-27,20,-49r23,0v-6,26,-16,48,-31,67r30,46r-26,0r-19,-30v-36,54,-150,47,-147,-30v2,-51,40,-63,76,-82v-14,-20,-24,-32,-25,-60v-1,-33,28,-55,62,-55","w":219},"'":{"d":"55,-170r0,-87r21,0r0,87r-21,0","w":100},"(":{"d":"124,-262v-70,82,-109,196,-68,331r-15,0v-48,-136,-21,-237,64,-331r19,0","w":93},")":{"d":"-37,69v70,-82,111,-196,68,-331r16,0v48,136,20,237,-65,331r-19,0","w":93},"*":{"d":"62,-202r-36,-20r7,-12r37,20r10,-43r14,0r-9,45r41,-9r2,14r-41,9r21,36r-13,7r-22,-38r-31,33r-10,-10","w":126},"+":{"d":"99,-100r0,-81r19,0r0,81r81,0r0,19r-81,0r0,81r-19,0r0,-81r-81,0r0,-19r81,0","w":216},",":{"d":"-4,49r3,-14v15,-7,20,-17,24,-35r-15,0r9,-38r30,0v-11,36,-8,82,-51,87","w":100},"-":{"d":"14,-89r4,-20r90,0r-4,20r-90,0","w":133},".":{"d":"39,0r-31,0r9,-38r30,0","w":100},"\/":{"d":"141,-262r-148,267r-21,0r148,-267r21,0","w":119},"0":{"d":"191,-166v0,85,-29,171,-113,171v-52,0,-69,-40,-69,-93v0,-82,29,-161,111,-166v51,-3,71,37,71,88xm83,-14v66,-4,80,-85,85,-154v7,-83,-86,-82,-107,-26v-28,42,-56,184,22,180"},"1":{"d":"48,-189r5,-18v38,-6,65,-21,80,-45r17,0r-54,252r-23,0r45,-209v-16,8,-40,15,-70,20"},"2":{"d":"114,-235v-38,0,-62,31,-63,67r-22,0v1,-48,37,-86,87,-86v66,0,94,76,50,119v-44,42,-118,54,-144,114r141,0r-4,21r-163,0v6,-108,161,-95,170,-190v3,-29,-23,-45,-52,-45"},"3":{"d":"172,-78v7,75,-104,110,-151,61v-14,-14,-19,-37,-18,-63r23,0v-2,39,16,66,55,66v37,0,68,-26,68,-62v0,-38,-28,-49,-68,-47r4,-19v48,3,80,-11,80,-49v0,-27,-22,-44,-49,-44v-38,0,-58,25,-63,60r-23,0v9,-47,34,-79,87,-79v39,0,71,23,71,62v0,33,-25,56,-53,61v23,5,35,27,37,53"},"4":{"d":"147,-213r-121,131r93,0xm4,-84r154,-168r20,0r-37,170r39,0r-5,19r-37,0r-14,63r-23,0r14,-63r-115,0"},"5":{"d":"28,-71v-5,36,19,57,54,57v77,0,102,-134,16,-134v-26,0,-45,10,-56,29r-20,-2r41,-128r129,0r-6,21r-110,0r-26,81v41,-42,133,-13,125,54v9,80,-95,129,-151,78v-15,-13,-20,-32,-19,-56r23,0"},"6":{"d":"91,-14v42,0,66,-37,66,-77v1,-33,-25,-54,-57,-54v-37,0,-65,36,-64,72v0,33,22,59,55,59xm13,-80v0,-102,74,-221,165,-157v13,9,19,27,19,49r-23,0v4,-57,-75,-56,-99,-22v-15,22,-27,51,-34,81v12,-20,36,-35,67,-35v43,-1,72,34,72,76v1,53,-39,93,-92,93v-49,0,-75,-36,-75,-85"},"7":{"d":"40,-228r5,-21r161,0r-5,20v-58,57,-113,141,-139,229r-26,0v26,-84,81,-168,141,-228r-137,0"},"8":{"d":"92,-124v-35,-1,-64,23,-63,58v0,34,25,52,60,52v37,0,65,-24,65,-60v0,-36,-26,-50,-62,-50xm135,-133v23,8,41,28,41,60v0,48,-44,79,-90,78v-45,0,-80,-25,-80,-71v0,-41,33,-66,67,-72v-21,-7,-35,-25,-36,-50v-1,-40,36,-67,76,-66v40,0,75,20,75,61v0,32,-24,56,-53,60xm165,-192v0,-29,-22,-43,-51,-43v-28,-1,-54,19,-54,48v0,29,22,44,51,44v31,1,54,-19,54,-49"},"9":{"d":"164,-176v0,-33,-22,-59,-55,-59v-41,-1,-67,36,-67,77v0,33,25,54,58,54v38,0,65,-36,64,-72xm186,-169v0,102,-72,220,-165,158v-14,-9,-18,-27,-18,-49r23,0v-5,57,75,55,98,21v14,-21,29,-54,34,-81v-12,20,-36,34,-66,35v-44,1,-72,-34,-72,-76v0,-54,38,-93,92,-93v49,0,74,37,74,85"},":":{"d":"39,0r-31,0r9,-38r30,0xm71,-142r-30,0r8,-38r31,0","w":100},";":{"d":"-4,49r3,-14v15,-7,20,-17,24,-35r-15,0r9,-38r30,0v-11,36,-8,82,-51,87xm71,-142r-30,0r8,-38r31,0","w":100},"<":{"d":"199,-17r0,20r-182,-84r0,-20r182,-84r0,20r-160,74","w":216},"=":{"d":"199,-136r0,19r-181,0r0,-19r181,0xm199,-65r0,19r-181,0r0,-19r181,0","w":216},">":{"d":"17,-17r160,-74r-160,-74r0,-20r182,84r0,20r-182,84r0,-20","w":216},"?":{"d":"187,-202v0,73,-86,67,-94,136r-23,0v0,-66,93,-79,95,-133v0,-28,-20,-44,-49,-44v-38,0,-60,30,-62,66r-23,0v2,-50,33,-85,86,-85v37,0,70,22,70,60xm53,0r8,-38r31,0r-9,38r-30,0","w":193},"@":{"d":"182,-150v1,-15,-15,-34,-29,-34v-34,-1,-61,50,-61,84v0,21,12,34,30,34v37,0,57,-47,60,-84xm69,-99v2,-53,33,-102,86,-104v18,0,31,11,38,31r9,-24r19,0r-35,104v-6,20,-5,30,5,30v34,0,61,-54,61,-90v0,-57,-47,-94,-102,-94v-66,0,-114,53,-114,119v0,64,50,117,114,116v40,0,76,-22,93,-48r19,0v-19,35,-61,64,-112,64v-76,0,-133,-61,-133,-135v0,-72,60,-132,132,-132v68,0,122,46,122,112v0,49,-38,104,-83,104v-15,0,-23,-9,-25,-24v-31,42,-96,24,-94,-29","w":288},"A":{"d":"-27,0r157,-257r27,0r47,257r-26,0r-13,-80r-117,0r-48,80r-27,0xm140,-236v-29,43,-53,91,-80,135r102,0","w":226},"B":{"d":"31,-21v71,0,158,12,161,-57v3,-56,-82,-44,-139,-45xm216,-81v1,99,-118,80,-214,81r56,-257v73,3,171,-18,170,59v0,35,-24,59,-56,64v25,3,44,25,44,53xm203,-196v1,-56,-73,-37,-125,-40r-20,92v64,0,144,11,145,-52","w":240},"C":{"d":"12,-104v0,-115,114,-201,209,-136v19,13,27,36,27,64r-25,0v0,-42,-29,-66,-71,-66v-79,0,-112,61,-115,140v-1,52,33,88,85,87v45,-1,77,-34,87,-73r24,0v-11,53,-51,93,-115,93v-65,0,-106,-44,-106,-109","w":253},"D":{"d":"93,-21v83,-1,118,-57,121,-138v3,-75,-60,-82,-136,-77r-47,215r62,0xm238,-154v-1,91,-50,154,-140,154r-96,0r56,-257r82,0v69,0,98,35,98,103","w":246},"E":{"d":"2,0r55,-257r172,0r-5,21r-147,0r-20,93r138,0r-5,21r-137,0r-22,101r151,0r-5,21r-175,0","w":206},"F":{"d":"2,0r55,-257r164,0r-4,21r-140,0r-20,93r124,0r-4,21r-124,0r-27,122r-24,0","w":193,"k":{"A":18,",":46,".":46}},"G":{"d":"12,-102v1,-91,50,-158,140,-160v60,-1,100,28,102,84r-24,0v-2,-43,-34,-64,-80,-64v-71,0,-108,65,-113,138v-6,86,100,116,151,62v18,-18,29,-40,34,-68r-88,0r5,-21r110,0r-27,131r-17,0v1,-14,6,-31,4,-43v-21,32,-51,48,-93,48v-66,1,-105,-41,-104,-107","w":266},"H":{"d":"2,0r55,-257r24,0r-24,112r149,0r24,-112r24,0r-55,257r-24,0r27,-125r-149,0r-27,125r-24,0","w":253},"I":{"d":"2,0r54,-257r25,0r-55,257r-24,0","w":79},"J":{"d":"114,-12v-35,32,-121,22,-121,-41v0,-10,1,-20,3,-29r25,0v-11,38,2,69,41,67v37,-1,48,-26,55,-59r39,-183r25,0r-41,192v-5,24,-14,41,-26,53","w":180},"K":{"d":"2,0r55,-257r24,0r-29,138r166,-138r34,0r-131,107r91,150r-28,0r-81,-135r-58,46r-19,89r-24,0","w":233},"L":{"d":"2,0r55,-257r25,0r-51,236r142,0r-5,21r-166,0","w":193,"k":{"T":27,"V":27,"W":20,"y":13,"Y":33}},"M":{"d":"1,0r56,-257r35,0r40,231r141,-231r36,0r-55,257r-24,0r52,-233r-142,233r-25,0r-42,-236r-49,236r-23,0","w":306},"N":{"d":"0,0r55,-257r28,0r103,230r48,-230r24,0r-56,257r-27,0r-104,-230r-48,230r-23,0","w":253},"O":{"d":"122,-15v69,-3,111,-62,112,-134v0,-54,-28,-94,-82,-93v-79,2,-112,61,-115,140v-1,52,33,89,85,87xm258,-155v-1,93,-50,158,-140,160v-65,1,-107,-44,-106,-109v1,-90,51,-156,140,-158v65,-1,106,42,106,107","w":266},"P":{"d":"229,-194v0,52,-36,84,-88,84r-91,0r-24,110r-24,0r55,-257v77,1,172,-15,172,63xm55,-131v70,1,150,10,150,-59v0,-59,-73,-44,-128,-46","w":226,"k":{"A":27,",":59,".":59}},"Q":{"d":"258,-155v0,59,-23,106,-57,133r33,30r-15,15r-36,-34v-75,42,-176,-1,-171,-93v5,-89,51,-156,140,-158v65,-1,106,42,106,107xm37,-102v-4,69,70,108,129,75r-28,-27r14,-14r32,30v64,-39,77,-208,-32,-204v-79,3,-111,61,-115,140","w":266},"R":{"d":"176,0v-10,-34,19,-114,-35,-114r-91,0r-24,114r-24,0r55,-257v77,3,176,-21,176,64v0,40,-31,67,-65,71v52,6,20,82,34,122r-26,0xm209,-191v0,-64,-77,-41,-132,-45r-22,101v69,0,154,13,154,-56","w":233,"k":{"T":6,"y":-9}},"S":{"d":"36,-189v0,-75,109,-91,159,-54v17,13,25,33,24,61r-25,0v-1,-45,-23,-57,-68,-60v-46,-3,-90,48,-54,79v38,33,125,19,128,89v3,82,-118,99,-172,57v-18,-15,-25,-38,-24,-68r24,0v-2,49,26,70,75,70v35,0,75,-20,73,-56v-2,-47,-54,-46,-89,-58v-34,-11,-51,-30,-51,-60","w":226},"T":{"d":"25,-236r4,-21r201,0r-4,21r-88,0r-52,236r-24,0r51,-236r-88,0","k":{"w":33,"y":33,"A":24,",":40,".":40,"-":35,"a":33,"c":33,"e":33,"i":2,"o":33,"r":33,"s":33,"u":33,":":33,";":33}},"U":{"d":"109,5v-60,0,-103,-33,-90,-94r35,-168r24,0r-34,163v-24,75,75,100,123,61v14,-12,23,-28,28,-50r36,-174r25,0r-37,176v-12,58,-48,86,-110,86","w":253},"V":{"d":"63,0r-40,-257r25,0r34,236r131,-236r27,0r-148,257r-29,0","w":213,"k":{"y":6,"A":13,",":40,".":40,"-":20,"a":13,"e":13,"i":6,"o":13,"r":6,"u":6,":":20,";":20}},"W":{"d":"45,0r-19,-257r24,0r14,229r110,-229r29,0r18,226r106,-226r25,0r-124,257r-26,0r-18,-234r-112,234r-27,0","w":326,"k":{"A":9,",":27,".":27,"-":6,"a":6,"e":6,"i":-4,"o":6,":":13,";":13}},"X":{"d":"-24,0r118,-134r-64,-123r27,0r54,108r93,-108r29,0r-112,127r67,130r-26,0r-57,-114r-101,114r-28,0","w":206},"Y":{"d":"108,-127r107,-130r30,0r-129,153r-22,104r-25,0r23,-106r-68,-151r26,0","w":206,"k":{"v":13,"A":18,",":40,".":40,"-":27,"a":27,"e":27,"i":5,"o":27,"u":20,":":27,";":27,"p":20,"q":27}},"Z":{"d":"35,-236r5,-21r185,0r-4,20r-206,216r172,0r-5,21r-200,0r5,-22r205,-214r-157,0","w":206},"[":{"d":"48,69r-58,0r70,-331r59,0r-4,19r-35,0r-63,293r34,0","w":86},"\\":{"d":"127,5r-148,-267r21,0r148,267r-21,0","w":119},"]":{"d":"44,-262r58,0r-70,331r-59,0r4,-19r36,0r63,-293r-35,0","w":86},"^":{"d":"37,-86r-21,0r83,-163r18,0r83,163r-20,0r-72,-140","w":216},"_":{"d":"180,45r-180,0r0,-18r180,0r0,18","w":180},"`":{"d":"24,-262r27,0r29,51r-18,0","w":66},"a":{"d":"19,-47v0,40,62,40,86,19v18,-16,25,-47,29,-72v-28,19,-115,1,-115,53xm121,-28v-18,39,-127,53,-124,-18v3,-60,67,-57,123,-63v16,-5,23,-13,23,-36v0,-18,-14,-27,-40,-27v-35,0,-54,14,-58,42r-23,0v5,-39,35,-62,79,-61v32,1,64,9,64,41v0,45,-18,85,-24,126v0,8,12,7,21,6r-3,18v-22,6,-44,0,-38,-28","w":186},"b":{"d":"35,-70v-1,32,19,57,51,56v50,-2,78,-47,78,-100v0,-36,-17,-59,-53,-58v-50,2,-75,51,-76,102xm89,5v-34,1,-57,-18,-63,-47r-9,42r-21,0r55,-257r22,0r-21,104v12,-21,33,-38,64,-38v46,-1,71,31,71,77v-2,64,-35,117,-98,119","w":206},"c":{"d":"5,-71v0,-83,81,-153,152,-104v14,10,19,26,18,47r-22,0v2,-26,-19,-45,-45,-44v-54,2,-80,46,-80,101v0,33,18,57,52,57v31,0,53,-22,61,-46r22,0v-14,44,-42,65,-86,65v-46,0,-72,-31,-72,-76","w":186},"d":{"d":"28,-69v0,34,16,56,50,55v52,-2,80,-51,81,-104v0,-32,-19,-55,-52,-54v-51,3,-79,49,-79,103xm5,-71v1,-64,38,-118,102,-120v34,-1,51,15,61,40r22,-106r23,0r-55,257r-22,0v2,-10,8,-24,7,-33v-15,24,-32,38,-67,38v-47,1,-72,-30,-71,-76","w":206},"e":{"d":"105,-191v56,0,79,47,69,104r-145,0v-6,42,12,73,53,73v31,0,54,-20,61,-46r22,0v-13,43,-41,65,-84,65v-48,1,-76,-31,-76,-78v0,-59,39,-118,100,-118xm153,-106v12,-64,-59,-85,-96,-47v-13,13,-21,29,-25,47r121,0","w":186},"f":{"d":"107,-186r-5,19r-36,0r-37,167r-23,0r37,-167r-32,0r4,-19r32,0v5,-45,23,-83,79,-69r-4,19v-38,-11,-50,18,-52,50r37,0","w":93},"g":{"d":"104,-172v-44,0,-74,48,-74,91v0,32,19,58,50,58v43,0,74,-48,74,-92v0,-38,-16,-57,-50,-57xm103,-191v31,-2,56,19,61,43r8,-38r21,0v-21,76,-23,189,-66,239v-33,39,-143,26,-134,-39r22,0v-4,51,77,49,99,20v14,-18,20,-48,26,-72v-10,20,-36,34,-64,34v-44,1,-68,-33,-68,-76v1,-61,36,-108,95,-111"},"h":{"d":"148,-120v20,-54,-51,-66,-81,-31v-30,35,-34,99,-48,151r-23,0r55,-257r23,0r-22,105v21,-57,138,-53,119,33r-26,119r-23,0","w":193},"i":{"d":"-4,0r40,-186r23,0r-40,186r-23,0xm44,-221r7,-36r23,0r-8,36r-22,0","w":66},"j":{"d":"-10,31r46,-217r23,0r-47,218v-5,29,-27,42,-61,35v3,-10,0,-24,17,-17v11,0,19,-7,22,-19xm44,-221r7,-36r23,0r-8,36r-22,0","w":66},"k":{"d":"-4,0r55,-257r22,0r-33,162r108,-91r31,0r-88,72r56,114r-25,0r-49,-100r-40,33r-14,67r-23,0","w":166},"l":{"d":"-4,0r55,-257r23,0r-55,257r-23,0","w":66},"m":{"d":"138,-121v6,-26,-2,-54,-30,-51v-72,7,-72,106,-89,172r-23,0r40,-186r21,0r-7,33v16,-37,106,-61,111,1v16,-19,34,-39,66,-39v93,0,30,128,23,191r-23,0r29,-140v0,-42,-62,-38,-79,-9v-21,35,-31,101,-43,149r-22,0","w":299},"n":{"d":"148,-120v20,-54,-51,-66,-81,-31v-30,35,-34,99,-48,151r-23,0r40,-186r21,0v-1,11,-7,25,-6,34v18,-45,127,-60,123,11v-3,49,-20,94,-29,141r-23,0","w":193},"o":{"d":"5,-72v1,-67,38,-117,104,-119v45,-1,73,28,73,73v1,65,-38,123,-103,123v-48,0,-75,-30,-74,-77xm28,-74v0,37,19,61,56,60v49,-2,75,-50,75,-100v0,-34,-19,-59,-54,-58v-49,2,-77,46,-77,98"},"p":{"d":"168,-117v0,-33,-16,-56,-50,-55v-52,2,-80,51,-81,105v-1,32,19,54,52,53v52,-2,79,-51,79,-103xm89,5v-33,1,-54,-16,-60,-42r-23,106r-23,0r55,-255r21,0v-2,11,-8,25,-7,34v15,-24,33,-38,68,-39v46,-1,71,30,70,76v-1,63,-37,118,-101,120","w":206},"q":{"d":"160,-116v1,-32,-19,-57,-51,-56v-51,2,-78,48,-78,101v0,36,17,59,53,57v49,-2,75,-51,76,-102xm106,-191v31,-1,56,19,65,42r8,-37r20,0r-54,255r-23,0r21,-102v-12,21,-34,38,-65,38v-46,1,-71,-32,-70,-77v1,-64,35,-117,98,-119","w":206},"r":{"d":"-4,0r40,-186r21,0v-2,14,-9,31,-9,43v20,-34,40,-47,79,-45v-3,10,0,29,-18,22v-77,5,-71,102,-90,166r-23,0","w":113,"k":{"v":-6,"y":-6,",":33,".":33,"-":20}},"s":{"d":"144,-51v0,57,-86,71,-125,40v-14,-11,-20,-27,-19,-49r22,0v-1,33,23,43,53,46v41,5,65,-44,25,-63v-32,-15,-76,-18,-78,-63v-2,-51,83,-65,118,-37v12,10,17,26,17,46r-23,0v2,-26,-16,-42,-43,-41v-23,0,-50,7,-46,32v8,49,99,28,99,89","w":173},"t":{"d":"11,-167r4,-19r34,0r12,-56r23,0r-12,56r37,0r-4,19r-38,0r-28,137v-1,20,24,11,39,11r-4,20v-40,6,-64,-4,-55,-45r26,-123r-34,0","w":106},"u":{"d":"32,-66v-18,55,52,66,82,31v30,-35,34,-99,48,-151r23,0r-40,186r-21,0r6,-34v-18,45,-128,60,-123,-11v3,-49,20,-94,29,-141r22,0","w":193},"v":{"d":"42,0r-29,-186r23,0r23,160r87,-160r25,0r-105,186r-24,0","w":166,"k":{",":33,".":33}},"w":{"d":"32,0r-21,-186r24,0r15,159r77,-159r26,0r14,157r79,-157r24,0r-98,186r-24,0r-14,-156r-77,156r-25,0","w":266,"k":{",":27,".":27}},"x":{"d":"-21,0r89,-98r-44,-88r26,0r34,73r64,-73r27,0r-81,90r49,96r-26,0r-40,-81r-71,81r-27,0","w":166},"y":{"d":"-20,67r5,-18v40,10,51,-25,65,-49r-34,-186r24,0r27,158r86,-158r24,0r-132,230v-11,23,-35,28,-65,23","w":166,"k":{",":33,".":33}},"z":{"d":"16,-167r4,-19r139,0r-3,18r-145,149r119,0r-4,19r-147,0r4,-18r144,-149r-111,0","w":153},"{":{"d":"46,-97v33,26,1,93,-1,131v0,15,9,17,23,16r-4,19v-71,6,-27,-79,-25,-129v0,-18,-6,-27,-18,-27r4,-19v61,-4,13,-170,108,-156v-3,7,1,22,-12,19v-41,10,-24,88,-49,119v-11,13,-15,20,-26,27","w":119},"|":{"d":"31,77r0,-360r19,0r0,360r-19,0","w":79},"}":{"d":"65,-96v-31,-26,-1,-97,2,-132v1,-15,-10,-16,-24,-15r4,-19v72,-7,27,78,25,128v0,18,6,27,18,27r-4,20v-61,3,-13,170,-108,156v3,-7,-1,-22,12,-19v42,-10,24,-87,49,-120v10,-13,14,-20,26,-26","w":119},"~":{"d":"147,-89v16,-1,23,-12,31,-24r13,13v-12,16,-21,31,-45,31v-35,0,-89,-54,-108,1r-13,-13v11,-21,26,-31,45,-31v14,0,65,25,77,23","w":216},"\u00a0":{"w":100}}});
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright © 1988, 1990, 1993, 2002 Adobe Systems Incorporated.  All Rights
 * Reserved.
 * 
 * Trademark:
 * Helvetica is a Trademark of Heidelberger Druckmaschinen AG exclusively licensed
 * through Linotype Library GmbH, and may be registered in certain jurisdictions.
 * 
 * Designer:
 * Linotype Staff
 * 
 * Vendor URL:
 * http://www.adobe.com/type
 * 
 * License information:
 * http://www.adobe.com/type/legal.html
 */

Cufon.registerFont({"w":200,"face":{"font-family":"helveticaneueltstdroman","font-weight":400,"font-stretch":"normal","units-per-em":"360","panose-1":"2 11 6 4 2 2 2 2 2 4","ascent":"257","descent":"-103","x-height":"4","bbox":"-8 -287 329 77","underline-thickness":"18","underline-position":"-18","unicode-range":"U+0020-U+007E"},"glyphs":{" ":{"w":100},"!":{"d":"64,-257v2,68,-4,130,-9,191r-16,0r-9,-112r0,-79r34,0xm27,0r0,-40r40,0r0,40r-40,0","w":93},"\"":{"d":"39,-164r0,-93r25,0r0,93r-25,0xm90,-164r0,-93r24,0r0,93r-24,0","w":153},"#":{"d":"37,0r10,-74r-35,0r0,-25r39,0r7,-54r-36,0r0,-24r40,0r10,-74r25,0r-11,74r45,0r10,-74r25,0r-10,74r32,0r0,24r-35,0r-8,54r33,0r0,25r-37,0r-10,74r-25,0r11,-74r-45,0r-10,74r-25,0xm128,-153r-45,0r-7,54r44,0"},"$":{"d":"90,-234v-33,-2,-55,44,-31,69v7,6,17,11,31,15r0,-84xm110,-113r0,90v43,2,62,-49,35,-74v-7,-7,-20,-12,-35,-16xm132,-139v83,14,67,152,-22,145r0,30r-20,0r0,-30v-48,-4,-77,-36,-81,-84r31,0v0,32,22,51,50,55r0,-95v-46,-12,-71,-21,-73,-70v-1,-42,33,-73,73,-75r0,-24r20,0r0,24v37,5,61,28,71,71r-31,0v-5,-24,-18,-37,-40,-41r0,88"},"%":{"d":"269,4v-42,0,-58,-30,-58,-71v0,-41,15,-74,58,-73v38,0,58,24,58,72v0,40,-18,72,-58,72xm238,-68v0,35,10,53,30,53v21,0,32,-18,32,-53v0,-35,-11,-52,-31,-52v-21,0,-31,17,-31,52xm91,-111v-42,0,-58,-30,-58,-71v0,-41,15,-74,58,-73v38,0,58,24,58,72v0,40,-18,72,-58,72xm60,-183v0,35,10,52,30,52v21,0,32,-17,32,-52v0,-35,-11,-52,-31,-52v-21,0,-31,17,-31,52xm68,8r193,-268r31,0r-193,268r-31,0","w":360},"&":{"d":"44,-66v0,51,82,57,104,13r-59,-71v-26,15,-45,23,-45,58xm199,-121v-3,31,-5,39,-17,63r50,58r-40,0r-27,-32v-13,22,-40,36,-73,36v-50,1,-80,-25,-80,-70v0,-44,27,-60,60,-78v-12,-18,-28,-31,-28,-60v0,-32,24,-54,58,-53v33,0,63,19,62,53v0,26,-16,48,-48,66r46,57v5,-13,7,-26,8,-40r29,0xm104,-230v-40,-3,-31,53,-10,66v3,3,5,5,5,6v30,-8,53,-69,5,-72","w":226},"'":{"d":"38,-164r0,-93r24,0r0,93r-24,0","w":100},"(":{"d":"17,-97v0,-65,25,-125,56,-166r24,0v-64,98,-64,236,0,334r-24,0v-33,-51,-56,-96,-56,-168","w":93},")":{"d":"76,-95v1,66,-25,125,-56,166r-24,0v64,-98,64,-236,0,-334r24,0v32,51,55,96,56,168","w":93},"*":{"d":"72,-257r0,41r39,-15r7,18r-39,13r24,33r-15,11r-25,-34r-23,34r-17,-11r24,-33r-38,-13r6,-18r38,15r0,-41r19,0","w":126},"+":{"d":"120,-182r0,79r79,0r0,24r-79,0r0,79r-24,0r0,-79r-79,0r0,-24r79,0r0,-79r24,0","w":216},",":{"d":"30,0r0,-40r40,0v3,47,-2,85,-40,93r0,-18v14,-3,22,-19,21,-35r-21,0","w":100},"-":{"d":"18,-86r0,-28r104,0r0,28r-104,0","w":140},".":{"d":"30,0r0,-40r40,0r0,40r-40,0","w":100},"\/":{"d":"-6,6r106,-269r26,0r-106,269r-26,0","w":119},"0":{"d":"100,4v-71,-1,-85,-57,-85,-129v0,-73,14,-129,85,-130v72,0,85,57,85,130v0,72,-14,129,-85,129xm100,-228v-57,1,-52,67,-52,124v0,40,8,82,52,81v57,-1,53,-69,52,-124v-1,-41,-9,-81,-52,-81"},"1":{"d":"128,-255r0,255r-30,0r0,-183r-67,0r0,-24v43,0,68,-16,74,-48r23,0"},"2":{"d":"96,-228v-33,0,-51,30,-50,63r-30,0v-3,-52,30,-90,82,-90v45,0,81,28,80,73v0,92,-112,83,-134,155r131,0r0,27r-166,0v-4,-106,130,-93,136,-182v2,-27,-22,-46,-49,-46"},"3":{"d":"151,-72v0,-37,-32,-55,-73,-48r0,-26v32,5,62,-10,62,-41v0,-27,-19,-41,-45,-41v-32,-1,-48,23,-48,55r-31,0v3,-48,28,-82,79,-82v76,0,105,93,43,119v26,8,46,29,46,63v0,74,-103,100,-151,55v-15,-15,-22,-35,-22,-61r30,0v1,34,20,56,55,56v30,0,55,-19,55,-49"},"4":{"d":"151,-255r0,168r34,0r0,27r-34,0r0,60r-29,0r0,-60r-112,0r0,-29r116,-166r25,0xm36,-87r86,0r-1,-125"},"5":{"d":"151,-83v0,-56,-74,-79,-105,-34r-27,-1r24,-133r126,0r0,27r-103,0r-13,74v48,-43,139,-4,130,69v7,72,-92,111,-146,66v-15,-13,-24,-32,-24,-54r30,0v1,26,25,47,54,46v33,-1,54,-25,54,-60"},"6":{"d":"154,-79v0,-33,-17,-58,-51,-58v-34,0,-53,24,-53,57v0,32,20,57,53,57v32,0,51,-25,51,-56xm14,-118v0,-76,20,-137,94,-137v42,0,69,25,72,65r-31,0v-1,-23,-19,-38,-43,-38v-38,0,-63,35,-61,97v37,-62,150,-30,142,50v-5,51,-31,84,-85,85v-59,0,-88,-40,-88,-122"},"7":{"d":"51,0v6,-93,50,-168,101,-222r-134,0r0,-29r165,0r0,26v-47,46,-92,142,-98,225r-34,0"},"8":{"d":"101,-121v-29,0,-54,20,-54,49v0,30,23,49,54,49v29,0,52,-20,52,-49v0,-28,-24,-49,-52,-49xm59,-137v-19,-7,-36,-28,-36,-53v-1,-40,35,-65,75,-65v78,0,104,93,42,118v30,10,46,31,46,64v1,48,-38,77,-85,77v-50,0,-87,-27,-87,-77v0,-33,19,-55,45,-64xm100,-228v-24,0,-44,15,-44,39v0,27,18,42,45,41v24,0,42,-15,42,-41v0,-24,-18,-39,-43,-39"},"9":{"d":"95,-114v31,0,52,-25,52,-56v0,-33,-19,-58,-52,-58v-35,0,-49,27,-50,60v-1,27,22,54,50,54xm12,-172v0,-49,36,-83,84,-83v58,0,88,41,88,122v0,120,-67,166,-143,120v-15,-9,-21,-28,-23,-49r30,0v1,23,21,39,47,39v36,0,59,-36,57,-99v-10,20,-32,35,-59,35v-51,1,-81,-34,-81,-85"},":":{"d":"30,0r0,-40r40,0r0,40r-40,0xm70,-186r0,40r-40,0r0,-40r40,0","w":100},";":{"d":"30,0r0,-40r40,0v3,46,-2,84,-40,93r0,-18v14,-3,22,-19,21,-35r-21,0xm70,-186r0,40r-40,0r0,-40r40,0","w":100},"<":{"d":"199,-185r0,24r-153,70r153,69r0,25r-182,-83r0,-22","w":216},"=":{"d":"199,-140r0,25r-182,0r0,-25r182,0xm17,-42r0,-25r182,0r0,25r-182,0","w":216},">":{"d":"17,3r0,-25r153,-69r-153,-70r0,-24r182,83r0,22","w":216},"?":{"d":"131,-225v-34,-28,-88,0,-81,48r-30,0v-2,-49,31,-86,80,-86v45,0,76,28,76,72v0,64,-67,60,-62,128r-30,0v-11,-70,60,-71,60,-131v0,-13,-5,-24,-13,-31xm78,0r0,-40r40,0r0,40r-40,0"},"@":{"d":"180,-148v0,-16,-14,-34,-29,-34v-31,0,-57,44,-57,75v0,19,13,35,31,35v29,0,55,-48,55,-76xm67,-104v0,-49,35,-104,84,-102v19,0,34,9,41,29r8,-22r22,0r-34,120v0,7,3,11,9,11v25,0,50,-52,50,-82v0,-53,-46,-93,-98,-93v-60,0,-109,54,-109,115v0,62,51,116,111,114v37,0,72,-20,89,-43r23,0v-21,36,-62,62,-113,63v-75,2,-135,-62,-135,-136v0,-72,62,-133,134,-133v65,0,124,47,122,111v-2,57,-34,97,-84,104v-14,2,-21,-11,-24,-23v-31,45,-96,21,-96,-33","w":288},"A":{"d":"-3,0r101,-257r38,0r100,257r-38,0r-28,-77r-108,0r-29,77r-36,0xm117,-226v-17,38,-29,81,-45,120r87,0","w":233},"B":{"d":"62,-29v58,-2,134,15,134,-46v0,-56,-79,-41,-134,-43r0,89xm181,-136v84,18,51,136,-29,136r-124,0r0,-257r93,0v70,-2,95,14,99,63v2,29,-17,49,-39,58xm185,-188v0,-57,-71,-36,-123,-40r0,81v52,-2,123,14,123,-41","w":246},"C":{"d":"15,-128v0,-75,45,-135,122,-135v57,0,99,32,106,83r-34,0v-6,-34,-34,-53,-72,-54v-58,-1,-87,48,-87,104v0,60,28,107,87,107v45,0,71,-32,74,-74r35,0v-6,62,-45,103,-112,103v-78,0,-119,-58,-119,-134","w":259},"D":{"d":"116,-257v80,1,124,41,124,122v0,90,-42,135,-124,135r-88,0r0,-257r88,0xm206,-130v0,-62,-24,-98,-86,-98r-58,0r0,199r57,0v60,0,87,-39,87,-101","w":253},"E":{"d":"28,0r0,-257r178,0r0,29r-144,0r0,81r134,0r0,29r-134,0r0,89r145,0r0,29r-179,0","w":219},"F":{"d":"28,0r0,-257r169,0r0,29r-135,0r0,81r118,0r0,29r-118,0r0,118r-34,0","w":206,"k":{"A":20,",":57,".":57}},"G":{"d":"50,-125v-2,54,34,102,88,102v50,0,84,-36,82,-84r-82,0r0,-28r113,0r0,135r-22,0r-9,-32v-15,24,-46,37,-82,38v-72,2,-123,-60,-123,-129v1,-77,45,-141,123,-140v61,1,102,29,110,85r-34,0v-5,-37,-36,-56,-76,-56v-62,0,-87,47,-88,109","w":273},"H":{"d":"28,0r0,-257r34,0r0,110r136,0r0,-110r34,0r0,257r-34,0r0,-118r-136,0r0,118r-34,0","w":259},"I":{"d":"30,0r0,-257r34,0r0,257r-34,0","w":93},"J":{"d":"84,-23v30,0,41,-17,41,-46r0,-188r34,0r0,193v-1,44,-27,70,-76,70v-54,0,-80,-33,-75,-91r34,0v-1,37,5,63,42,62","w":186},"K":{"d":"28,0r0,-257r34,0r0,128r131,-128r44,0r-108,104r112,153r-43,0r-93,-130r-43,40r0,90r-34,0","w":240},"L":{"d":"28,0r0,-257r34,0r0,228r136,0r0,29r-170,0","k":{"T":33,"V":33,"W":20,"y":13,"Y":40}},"M":{"d":"29,0r0,-257r47,0r81,216r81,-216r47,0r0,257r-33,0r0,-214r-81,214r-29,0r-81,-214r0,214r-32,0","w":313},"N":{"d":"28,0r0,-257r36,0r136,208r0,-208r33,0r0,257r-38,0r-135,-206r0,206r-32,0","w":259},"O":{"d":"137,6v-79,0,-123,-56,-123,-135v0,-79,45,-134,123,-134v78,0,123,55,123,134v0,79,-44,135,-123,135xm137,-234v-59,0,-89,46,-89,105v0,60,29,106,89,106v59,0,89,-46,89,-106v-1,-59,-30,-105,-89,-105","w":273},"P":{"d":"220,-181v0,48,-30,76,-79,76r-79,0r0,105r-34,0r0,-257r113,0v49,0,79,28,79,76xm62,-228r0,94v55,0,123,10,123,-47v0,-56,-68,-47,-123,-47","w":233,"k":{"A":27,",":64,".":64}},"Q":{"d":"137,-263v122,-6,159,165,84,237r34,27r-17,21r-40,-31v-88,45,-190,-18,-184,-120v4,-78,45,-130,123,-134xm48,-129v-2,72,53,125,124,99r-28,-23r18,-20r34,27v55,-52,34,-192,-59,-188v-59,3,-87,46,-89,105","w":273},"R":{"d":"193,-184v0,-60,-75,-42,-131,-44r0,89v57,-3,131,15,131,-45xm198,0v-16,-37,5,-110,-52,-110r-84,0r0,110r-34,0r0,-257v85,3,200,-21,199,67v0,34,-17,57,-44,66v55,5,26,90,53,124r-38,0","w":246,"k":{"T":6,"V":6,"W":6,"Y":13}},"S":{"d":"57,-134v-73,-37,-21,-129,57,-129v56,0,94,27,95,81r-32,0v4,-65,-121,-72,-122,-8v20,72,162,14,165,119v3,81,-122,96,-177,54v-20,-15,-30,-38,-30,-68r33,0v-1,42,33,63,75,62v34,0,68,-11,65,-46v-5,-57,-86,-43,-129,-65","w":233},"T":{"d":"86,0r0,-228r-85,0r0,-29r205,0r0,29r-85,0r0,228r-35,0","w":206,"k":{"w":40,"y":40,"A":33,",":40,".":40,"c":40,"e":40,"o":40,"-":46,"a":40,"r":33,"s":40,"u":33,":":40,";":40}},"U":{"d":"132,-23v44,0,68,-25,67,-70r0,-164r34,0r0,164v1,64,-37,100,-101,99v-68,0,-105,-32,-105,-99r0,-164r34,0r0,164v0,46,25,70,71,70","w":259},"V":{"d":"221,-257r-92,257r-39,0r-90,-257r37,0r74,223r74,-223r36,0","w":219,"k":{"y":6,"A":17,",":46,".":46,"e":20,"o":20,"-":20,"a":20,"r":13,"u":13,":":17,";":17,"i":6}},"W":{"d":"329,-257r-69,257r-35,0r-60,-216r-59,216r-36,0r-66,-257r35,0r51,214r58,-214r37,0r58,214r52,-214r34,0","w":333,"k":{"A":9,",":27,".":27,"e":21,"o":21,"a":13,"r":6,"u":6,":":6,";":6}},"X":{"d":"0,0r89,-132r-84,-125r41,0r64,100r67,-100r38,0r-85,125r90,132r-41,0r-70,-106r-71,106r-38,0","w":219},"Y":{"d":"233,-257r-99,152r0,105r-34,0r0,-105r-99,-152r40,0r77,122r76,-122r39,0","w":233,"k":{"v":20,"A":27,",":50,".":50,"e":40,"o":40,"q":33,"-":40,"a":33,"u":27,":":33,";":33,"i":13,"p":27}},"Z":{"d":"8,0r0,-29r160,-199r-148,0r0,-29r188,0r0,29r-159,199r163,0r0,29r-204,0","w":219},"[":{"d":"93,-263r0,24r-38,0r0,286r38,0r0,24r-67,0r0,-334r67,0","w":93},"\\":{"d":"20,-263r106,269r-26,0r-106,-269r26,0","w":119},"]":{"d":"0,71r0,-24r39,0r0,-286r-39,0r0,-24r67,0r0,334r-67,0","w":93},"^":{"d":"18,-95r78,-156r24,0r78,156r-25,0r-65,-130r-64,130r-26,0","w":216},"_":{"d":"0,45r0,-18r180,0r0,18r-180,0","w":180},"`":{"d":"39,-212r-47,-51r39,0r31,51r-23,0","w":79},"a":{"d":"138,-96v-27,18,-94,1,-93,46v0,19,17,27,36,27v43,1,63,-26,57,-73xm169,-44v-2,18,2,24,19,20r0,23v-19,10,-51,6,-48,-23v-29,41,-127,41,-127,-24v0,-68,83,-47,123,-74v10,-24,-7,-41,-39,-41v-30,0,-45,11,-46,35r-31,0v2,-44,33,-63,79,-62v47,0,70,17,70,51r0,95","w":193},"b":{"d":"112,-23v40,0,57,-33,56,-72v0,-37,-20,-68,-57,-68v-39,0,-57,33,-57,70v-1,39,19,70,58,70xm116,4v-25,0,-51,-12,-61,-29r0,25r-31,0r0,-257r31,0r0,96v9,-19,33,-29,60,-29v54,-1,86,44,86,97v0,54,-31,98,-85,97","w":213},"c":{"d":"13,-91v0,-56,31,-99,88,-99v44,0,77,23,80,64r-32,0v-3,-24,-20,-37,-46,-37v-43,0,-58,31,-58,72v0,36,17,68,55,68v30,0,47,-18,51,-45r31,0v-6,43,-34,72,-82,72v-56,0,-87,-39,-87,-95","w":193},"d":{"d":"98,-190v26,0,49,13,61,29r0,-96r30,0r0,257r-30,0v-1,-8,2,-19,-1,-25v-8,19,-32,29,-59,29v-54,2,-86,-44,-86,-98v0,-54,31,-96,85,-96xm101,-163v-40,0,-56,34,-56,72v0,37,21,68,58,68v39,0,57,-33,57,-70v0,-39,-19,-70,-59,-70","w":213},"e":{"d":"45,-84v-11,63,94,86,107,25r30,0v-7,38,-36,63,-80,63v-59,0,-84,-41,-89,-98v-8,-93,129,-134,162,-47v7,18,10,35,10,57r-140,0xm152,-111v2,-45,-61,-69,-91,-37v-9,10,-15,22,-16,37r107,0","w":193},"f":{"d":"107,-230v-17,-6,-41,-5,-41,18r0,26r36,0r0,27r-36,0r0,159r-30,0r0,-159r-32,0r0,-27r32,0v-8,-54,20,-85,71,-71r0,27","w":106,"k":{"f":6}},"g":{"d":"45,-96v1,39,15,70,53,71v39,1,55,-34,55,-72v0,-35,-17,-66,-53,-66v-37,0,-55,31,-55,67xm13,-92v1,-58,28,-97,86,-98v27,-1,43,12,56,31r0,-27r29,0r0,170v11,89,-96,118,-151,69v-9,-8,-13,-19,-13,-32r31,0v0,21,26,30,48,30v40,0,61,-34,55,-83v-8,20,-32,34,-58,34v-52,1,-84,-42,-83,-94","w":206},"h":{"d":"109,-163v-75,0,-52,94,-55,163r-31,0r0,-257r31,0r0,98v8,-20,32,-31,59,-31v91,0,58,110,64,190r-30,0r0,-126v0,-22,-15,-37,-38,-37"},"i":{"d":"25,0r0,-186r30,0r0,186r-30,0xm55,-257r0,37r-30,0r0,-37r30,0","w":79},"j":{"d":"-5,44v22,2,30,-2,30,-25r0,-205r30,0r0,210v2,37,-23,52,-60,46r0,-26xm55,-257r0,37r-30,0r0,-37r30,0","w":79},"k":{"d":"25,0r0,-257r30,0r0,152r85,-81r41,0r-73,68r79,118r-39,0r-64,-97r-29,26r0,71r-30,0","w":186},"l":{"d":"25,0r0,-257r30,0r0,257r-30,0","w":79},"m":{"d":"103,-163v-70,0,-44,97,-49,163r-31,0r0,-186r29,0v1,8,-2,21,1,27v20,-39,97,-44,111,0v11,-17,31,-31,58,-31v94,0,54,112,62,190r-31,0r0,-122v0,-27,-7,-41,-36,-41v-71,0,-43,98,-48,163r-31,0r0,-122v-1,-26,-8,-42,-35,-41","w":307},"n":{"d":"109,-163v-75,0,-52,94,-55,163r-31,0r0,-186r29,0v1,9,-2,22,1,29v13,-23,32,-33,60,-33v91,0,58,110,64,190r-30,0r0,-126v0,-22,-15,-37,-38,-37"},"o":{"d":"103,4v-57,0,-90,-42,-90,-97v0,-56,33,-97,90,-97v57,0,91,40,91,97v0,56,-34,97,-91,97xm103,-163v-37,0,-58,31,-58,70v0,40,21,70,58,70v37,0,58,-29,58,-70v0,-40,-21,-70,-58,-70","w":206},"p":{"d":"112,-23v40,0,57,-33,56,-72v0,-37,-20,-68,-57,-68v-39,0,-57,33,-57,70v-1,39,19,70,58,70xm116,4v-25,0,-51,-12,-61,-29r0,96r-31,0r0,-257r31,0r0,25v9,-19,33,-29,60,-29v54,-1,86,44,86,97v0,54,-31,98,-85,97","w":213},"q":{"d":"98,-190v26,0,49,13,61,29r0,-25r30,0r0,257r-30,0r-1,-96v-8,19,-32,29,-59,29v-54,2,-86,-44,-86,-98v0,-54,31,-96,85,-96xm101,-163v-40,0,-56,34,-56,72v0,37,21,68,58,68v39,0,57,-33,57,-70v0,-39,-19,-70,-59,-70","w":213},"r":{"d":"120,-158v-81,-6,-67,82,-67,158r-31,0r0,-186r29,0r0,39v13,-27,31,-44,69,-43r0,32","w":119,"k":{",":33,".":33,"c":6,"d":6,"e":6,"g":10,"n":-6,"o":6,"q":6,"-":20}},"s":{"d":"150,-92v47,36,1,102,-60,96v-45,-5,-77,-19,-79,-63r31,0v0,26,23,36,50,36v51,0,57,-41,22,-52v-40,-13,-98,-10,-99,-63v-1,-35,36,-53,70,-52v49,0,74,19,76,58r-31,0v-1,-22,-19,-31,-43,-31v-38,-8,-54,38,-14,47v27,6,57,9,77,24","w":180},"t":{"d":"103,0v-41,0,-68,2,-68,-41r0,-118r-32,0r0,-27r32,0r0,-56r31,0r0,56r37,0r0,27r-37,0r0,115v-3,22,18,16,37,17r0,27","w":113},"u":{"d":"91,-23v75,0,53,-93,56,-163r30,0r0,186r-29,0r0,-30v-13,23,-33,34,-61,34v-90,0,-58,-110,-64,-190r31,0r0,126v0,22,14,37,37,37"},"v":{"d":"175,-186r-68,186r-33,0r-69,-186r34,0r53,155r51,-155r32,0","w":180,"k":{",":27,".":27}},"w":{"d":"267,-186r-60,186r-32,0r-39,-148r-37,148r-33,0r-60,-186r34,0r43,152r37,-152r34,0r39,152r42,-152r32,0","w":272,"k":{",":20,".":20}},"x":{"d":"3,0r70,-98r-65,-88r40,0r44,65r47,-65r36,0r-64,86r72,100r-39,0r-52,-77r-52,77r-37,0","w":186},"y":{"d":"177,-186r-81,211v-11,37,-33,58,-75,46r0,-28v36,19,46,-20,56,-44r-74,-185r34,0r56,152r52,-152r32,0","w":180,"k":{",":27,".":27}},"z":{"d":"8,0r0,-23r112,-136r-105,0r0,-27r145,0r0,21r-114,138r119,0r0,27r-157,0","w":172},"{":{"d":"17,-108v71,-15,-21,-177,94,-155r0,21v-73,-14,0,129,-66,147v40,7,31,68,31,114v0,30,10,33,35,31r0,21v-39,6,-64,-12,-64,-47v-1,-44,9,-104,-30,-108r0,-24","w":119},"|":{"d":"28,77r0,-360r24,0r0,360r-24,0","w":79},"}":{"d":"103,-84v-71,15,21,177,-94,155r0,-21v74,14,0,-129,66,-146v-39,-8,-30,-67,-31,-114v0,-30,-9,-34,-35,-32r0,-21v39,-6,64,12,64,47v1,44,-10,104,30,108r0,24","w":119},"~":{"d":"146,-66v-21,2,-59,-26,-78,-26v-12,0,-22,10,-30,28r-13,-18v25,-56,81,-19,122,-5v16,-3,23,-17,31,-28r13,18v-12,15,-20,30,-45,31","w":216},"\u00a0":{"w":100}}});
/*!
 * imagesLoaded PACKAGED v3.1.5
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */


(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("eventEmitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(this,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function c(e){this.img=e}function f(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];if("IMG"===n.nodeName&&this.addImage(n),n.nodeType&&(1===n.nodeType||9===n.nodeType))for(var i=n.querySelectorAll("img"),r=0,o=i.length;o>r;r++){var s=i[r];this.addImage(s)}}},s.prototype.addImage=function(e){var t=new c(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),c.prototype=new t,c.prototype.check=function(){var e=v[this.img.src]||new f(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},c.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return f.prototype=new t,f.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},f.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},f.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},f.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},f.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},f.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});
/*jshint undef: true */
/*global jQuery: true */

/*
   --------------------------------
   Infinite Scroll
   --------------------------------
   + https://github.com/paulirish/infinite-scroll
   + version 2.0b2.120519
   + Copyright 2011/12 Paul Irish & Luke Shumard
   + Licensed under the MIT license

   + Documentation: http://infinite-scroll.com/
*/


(function (window, $, undefined) {
    "use strict";

    $.infinitescroll = function infscr(options, callback, element) {
        this.element = $(element);

        // Flag the object in the event of a failed creation
        if (!this._create(options, callback)) {
            this.failed = true;
        }
    };

    $.infinitescroll.defaults = {
        loading: {
            finished: undefined,
            finishedMsg: "<em>No More Messages found.</em>",
            img: "data:image/gif;base64,R0lGODlh3AATAPQeAPDy+MnQ6LW/4N3h8MzT6rjC4sTM5r/I5NHX7N7j8c7U6tvg8OLl8uXo9Ojr9b3G5MfP6Ovu9tPZ7PT1+vX2+tbb7vf4+8/W69jd7rC73vn5/O/x+K243ai02////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgD/ACwAAAAA3AATAAAF/6AnjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEj0BAScpHLJbDqf0Kh0Sq1ar9isdioItAKGw+MAKYMFhbF63CW438f0mg1R2O8EuXj/aOPtaHx7fn96goR4hmuId4qDdX95c4+RBIGCB4yAjpmQhZN0YGYGXitdZBIVGAsLoq4BBKQDswm1CQRkcG6ytrYKubq8vbfAcMK9v7q7EMO1ycrHvsW6zcTKsczNz8HZw9vG3cjTsMIYqQkCLBwHCgsMDQ4RDAYIqfYSFxDxEfz88/X38Onr16+Bp4ADCco7eC8hQYMAEe57yNCew4IVBU7EGNDiRn8Z831cGLHhSIgdFf9chIeBg7oA7gjaWUWTVQAGE3LqBDCTlc9WOHfm7PkTqNCh54rePDqB6M+lR536hCpUqs2gVZM+xbrTqtGoWqdy1emValeXKzggYBBB5y1acFNZmEvXAoN2cGfJrTv3bl69Ffj2xZt3L1+/fw3XRVw4sGDGcR0fJhxZsF3KtBTThZxZ8mLMgC3fRatCbYMNFCzwLEqLgE4NsDWs/tvqdezZf13Hvk2A9Szdu2X3pg18N+68xXn7rh1c+PLksI/Dhe6cuO3ow3NfV92bdArTqC2Ebd3A8vjf5QWfH6Bg7Nz17c2fj69+fnq+8N2Lty+fuP78/eV2X13neIcCeBRwxorbZrA1ANoCDGrgoG8RTshahQ9iSKEEzUmYIYfNWViUhheCGJyIP5E4oom7WWjgCeBFAJNv1DVV01MAdJhhjdkplWNzO/5oXI846njjVEIqR2OS2B1pE5PVscajkxhMycqLJghQSwT40PgfAl4GqNSXYdZXJn5gSkmmmmJu1aZYb14V51do+pTOCmA40AqVCIhG5IJ9PvYnhIFOxmdqhpaI6GeHCtpooisuutmg+Eg62KOMKuqoTaXgicQWoIYq6qiklmoqFV0UoeqqrLbq6quwxirrrLTWauutJ4QAACH5BAUKABwALAcABADOAAsAAAX/IPd0D2dyRCoUp/k8gpHOKtseR9yiSmGbuBykler9XLAhkbDavXTL5k2oqFqNOxzUZPU5YYZd1XsD72rZpBjbeh52mSNnMSC8lwblKZGwi+0QfIJ8CncnCoCDgoVnBHmKfByGJimPkIwtiAeBkH6ZHJaKmCeVnKKTHIihg5KNq4uoqmEtcRUtEREMBggtEr4QDrjCuRC8h7/BwxENeicSF8DKy82pyNLMOxzWygzFmdvD2L3P0dze4+Xh1Arkyepi7dfFvvTtLQkZBC0T/FX3CRgCMOBHsJ+EHYQY7OinAGECgQsB+Lu3AOK+CewcWjwxQeJBihtNGHSoQOE+iQ3//4XkwBBhRZMcUS6YSXOAwIL8PGqEaSJCiYt9SNoCmnJPAgUVLChdaoFBURN8MAzl2PQphwQLfDFd6lTowglHve6rKpbjhK7/pG5VinZP1qkiz1rl4+tr2LRwWU64cFEihwEtZgbgR1UiHaMVvxpOSwBA37kzGz9e8G+B5MIEKLutOGEsAH2ATQwYfTmuX8aETWdGPZmiZcccNSzeTCA1Sw0bdiitC7LBWgu8jQr8HRzqgpK6gX88QbrB14z/kF+ELpwB8eVQj/JkqdylAudji/+ts3039vEEfK8Vz2dlvxZKG0CmbkKDBvllRd6fCzDvBLKBDSCeffhRJEFebFk1k/Mv9jVIoIJZSeBggwUaNeB+Qk34IE0cXlihcfRxkOAJFFhwGmKlmWDiakZhUJtnLBpnWWcnKaAZcxI0piFGGLBm1mc90kajSCveeBVWKeYEoU2wqeaQi0PetoE+rr14EpVC7oAbAUHqhYExbn2XHHsVqbcVew9tx8+XJKk5AZsqqdlddGpqAKdbAYBn1pcczmSTdWvdmZ17c1b3FZ99vnTdCRFM8OEcAhLwm1NdXnWcBBSMRWmfkWZqVlsmLIiAp/o1gGV2vpS4lalGYsUOqXrddcKCmK61aZ8SjEpUpVFVoCpTj4r661Km7kBHjrDyc1RAIQAAIfkEBQoAGwAsBwAEAM4ACwAABf/gtmUCd4goQQgFKj6PYKi0yrrbc8i4ohQt12EHcal+MNSQiCP8gigdz7iCioaCIvUmZLp8QBzW0EN2vSlCuDtFKaq4RyHzQLEKZNdiQDhRDVooCwkbfm59EAmKi4SGIm+AjIsKjhsqB4mSjT2IOIOUnICeCaB/mZKFNTSRmqVpmJqklSqskq6PfYYCDwYHDC4REQwGCBLGxxIQDsHMwhAIX8bKzcENgSLGF9PU1j3Sy9zX2NrgzQziChLk1BHWxcjf7N046tvN82715czn9Pryz6Ilc4ACj4EBOCZM8KEnAYYADBRKnACAYUMFv1wotIhCEcaJCisqwJFgAUSQGyX/kCSVUUTIdKMwJlyo0oXHlhskwrTJciZHEXsgaqS4s6PJiCAr1uzYU8kBBSgnWFqpoMJMUjGtDmUwkmfVmVypakWhEKvXsS4nhLW5wNjVroJIoc05wSzTr0PtiigpYe4EC2vj4iWrFu5euWIMRBhacaVJhYQBEFjA9jHjyQ0xEABwGceGAZYjY0YBOrRLCxUp29QM+bRkx5s7ZyYgVbTqwwti2ybJ+vLtDYpycyZbYOlptxdx0kV+V7lC5iJAyyRrwYKxAdiz82ng0/jnAdMJFz0cPi104Ec1Vj9/M6F173vKL/feXv156dw11tlqeMMnv4V5Ap53GmjQQH97nFfg+IFiucfgRX5Z8KAgbUlQ4IULIlghhhdOSB6AgX0IVn8eReghen3NRIBsRgnH4l4LuEidZBjwRpt6NM5WGwoW0KSjCwX6yJSMab2GwwAPDXfaBCtWpluRTQqC5JM5oUZAjUNS+VeOLWpJEQ7VYQANW0INJSZVDFSnZphjSikfmzE5N4EEbQI1QJmnWXCmHulRp2edwDXF43txukenJwvI9xyg9Q26Z3MzGUcBYFEChZh6DVTq34AU8Iflh51Sd+CnKFYQ6mmZkhqfBKfSxZWqA9DZanWjxmhrWwi0qtCrt/43K6WqVjjpmhIqgEGvculaGKklKstAACEAACH5BAUKABwALAcABADOAAsAAAX/ICdyQmaMYyAUqPgIBiHPxNpy79kqRXH8wAPsRmDdXpAWgWdEIYm2llCHqjVHU+jjJkwqBTecwItShMXkEfNWSh8e1NGAcLgpDGlRgk7EJ/6Ae3VKfoF/fDuFhohVeDeCfXkcCQqDVQcQhn+VNDOYmpSWaoqBlUSfmowjEA+iEAEGDRGztAwGCDcXEA60tXEiCrq8vREMEBLIyRLCxMWSHMzExnbRvQ2Sy7vN0zvVtNfU2tLY3rPgLdnDvca4VQS/Cpk3ABwSLQkYAQwT/P309vcI7OvXr94jBQMJ/nskkGA/BQBRLNDncAIAiDcG6LsxAWOLiQzmeURBKWSLCQbv/1F0eDGinJUKR47YY1IEgQASKk7Yc7ACRwZm7mHweRJoz59BJUogisKCUaFMR0x4SlJBVBFTk8pZivTR0K73rN5wqlXEAq5Fy3IYgHbEzQ0nLy4QSoCjXLoom96VOJEeCosK5n4kkFfqXjl94wa+l1gvAcGICbewAOAxY8l/Ky/QhAGz4cUkGxu2HNozhwMGBnCUqUdBg9UuW9eUynqSwLHIBujePef1ZGQZXcM+OFuEBeBhi3OYgLyqcuaxbT9vLkf4SeqyWxSQpKGB2gQpm1KdWbu72rPRzR9Ne2Nu9Kzr/1Jqj0yD/fvqP4aXOt5sW/5qsXXVcv1Nsp8IBUAmgswGF3llGgeU1YVXXKTN1FlhWFXW3gIE+DVChApysACHHo7Q4A35lLichh+ROBmLKAzgYmYEYDAhCgxKGOOMn4WR4kkDaoBBOxJtdNKQxFmg5JIWIBnQc07GaORfUY4AEkdV6jHlCEISSZ5yTXpp1pbGZbkWmcuZmQCaE6iJ0FhjMaDjTMsgZaNEHFRAQVp3bqXnZED1qYcECOz5V6BhSWCoVJQIKuKQi2KFKEkEFAqoAo7uYSmO3jk61wUUMKmknJ4SGimBmAa0qVQBhAAAIfkEBQoAGwAsBwAEAM4ACwAABf/gJm5FmRlEqhJC+bywgK5pO4rHI0D3pii22+Mg6/0Ej96weCMAk7cDkXf7lZTTnrMl7eaYoy10JN0ZFdco0XAuvKI6qkgVFJXYNwjkIBcNBgR8TQoGfRsJCRuCYYQQiI+ICosiCoGOkIiKfSl8mJkHZ4U9kZMbKaI3pKGXmJKrngmug4WwkhA0lrCBWgYFCCMQFwoQDRHGxwwGCBLMzRLEx8iGzMMO0cYNeCMKzBDW19lnF9DXDIY/48Xg093f0Q3s1dcR8OLe8+Y91OTv5wrj7o7B+7VNQqABIoRVCMBggsOHE36kSoCBIcSH3EbFangxogJYFi8CkJhqQciLJEf/LDDJEeJIBT0GsOwYUYJGBS0fjpQAMidGmyVP6sx4Y6VQhzs9VUwkwqaCCh0tmKoFtSMDmBOf9phg4SrVrROuasRQAaxXpVUhdsU6IsECZlvX3kwLUWzRt0BHOLTbNlbZG3vZinArge5Dvn7wbqtQkSYAAgtKmnSsYKVKo2AfW048uaPmG386i4Q8EQMBAIAnfB7xBxBqvapJ9zX9WgRS2YMpnvYMGdPK3aMjt/3dUcNI4blpj7iwkMFWDXDvSmgAlijrt9RTR78+PS6z1uAJZIe93Q8g5zcsWCi/4Y+C8bah5zUv3vv89uft30QP23punGCx5954oBBwnwYaNCDY/wYrsYeggnM9B2Fpf8GG2CEUVWhbWAtGouEGDy7Y4IEJVrbSiXghqGKIo7z1IVcXIkKWWR361QOLWWnIhwERpLaaCCee5iMBGJQmJGyPFTnbkfHVZGRtIGrg5HALEJAZbu39BuUEUmq1JJQIPtZilY5hGeSWsSk52G9XqsmgljdIcABytq13HyIM6RcUA+r1qZ4EBF3WHWB29tBgAzRhEGhig8KmqKFv8SeCeo+mgsF7YFXa1qWSbkDpom/mqR1PmHCqJ3fwNRVXjC7S6CZhFVCQ2lWvZiirhQq42SACt25IK2hv8TprriUV1usGgeka7LFcNmCldMLi6qZMgFLgpw16Cipb7bC1knXsBiEAACH5BAUKABsALAcABADOAAsAAAX/4FZsJPkUmUGsLCEUTywXglFuSg7fW1xAvNWLF6sFFcPb42C8EZCj24EJdCp2yoegWsolS0Uu6fmamg8n8YYcLU2bXSiRaXMGvqV6/KAeJAh8VgZqCX+BexCFioWAYgqNi4qAR4ORhRuHY408jAeUhAmYYiuVlpiflqGZa5CWkzc5fKmbbhIpsAoQDRG8vQwQCBLCwxK6vb5qwhfGxxENahvCEA7NzskSy7vNzzzK09W/PNHF1NvX2dXcN8K55cfh69Luveol3vO8zwi4Yhj+AQwmCBw4IYclDAAJDlQggVOChAoLKkgFkSCAHDwWLKhIEOONARsDKryogFPIiAUb/95gJNIiw4wnI778GFPhzBKFOAq8qLJEhQpiNArjMcHCmlTCUDIouTKBhApELSxFWiGiVKY4E2CAekPgUphDu0742nRrVLJZnyrFSqKQ2ohoSYAMW6IoDpNJ4bLdILTnAj8KUF7UeENjAKuDyxIgOuGiOI0EBBMgLNew5AUrDTMGsFixwBIaNCQuAXJB57qNJ2OWm2Aj4skwCQCIyNkhhtMkdsIuodE0AN4LJDRgfLPtn5YDLdBlraAByuUbBgxQwICxMOnYpVOPej074OFdlfc0TqC62OIbcppHjV4o+LrieWhfT8JC/I/T6W8oCl29vQ0XjLdBaA3s1RcPBO7lFvpX8BVoG4O5jTXRQRDuJ6FDTzEWF1/BCZhgbyAKE9qICYLloQYOFtahVRsWYlZ4KQJHlwHS/IYaZ6sZd9tmu5HQm2xi1UaTbzxYwJk/wBF5g5EEYOBZeEfGZmNdFyFZmZIR4jikbLThlh5kUUVJGmRT7sekkziRWUIACABk3T4qCsedgO4xhgGcY7q5pHJ4klBBTQRJ0CeHcoYHHUh6wgfdn9uJdSdMiebGJ0zUPTcoS286FCkrZxnYoYYKWLkBowhQoBeaOlZAgVhLidrXqg2GiqpQpZ4apwSwRtjqrB3muoF9BboaXKmshlqWqsWiGt2wphJkQbAU5hoCACH5BAUKABsALAcABADOAAsAAAX/oGFw2WZuT5oZROsSQnGaKjRvilI893MItlNOJ5v5gDcFrHhKIWcEYu/xFEqNv6B1N62aclysF7fsZYe5aOx2yL5aAUGSaT1oTYMBwQ5VGCAJgYIJCnx1gIOBhXdwiIl7d0p2iYGQUAQBjoOFSQR/lIQHnZ+Ue6OagqYzSqSJi5eTpTxGcjcSChANEbu8DBAIEsHBChe5vL13G7fFuscRDcnKuM3H0La3EA7Oz8kKEsXazr7Cw9/Gztar5uHHvte47MjktznZ2w0G1+D3BgirAqJmJMAQgMGEgwgn5Ei0gKDBhBMALGRYEOJBb5QcWlQo4cbAihZz3GgIMqFEBSM1/4ZEOWPAgpIIJXYU+PIhRG8ja1qU6VHlzZknJNQ6UanCjQkWCIGSUGEjAwVLjc44+DTqUQtPPS5gejUrTa5TJ3g9sWCr1BNUWZI161StiQUDmLYdGfesibQ3XMq1OPYthrwuA2yU2LBs2cBHIypYQPPlYAKFD5cVvNPtW8eVGbdcQADATsiNO4cFAPkvHpedPzc8kUcPgNGgZ5RNDZG05reoE9s2vSEP79MEGiQGy1qP8LA4ZcdtsJE48ONoLTBtTV0B9LsTnPceoIDBDQvS7W7vfjVY3q3eZ4A339J4eaAmKqU/sV58HvJh2RcnIBsDUw0ABqhBA5aV5V9XUFGiHfVeAiWwoFgJJrIXRH1tEMiDFV4oHoAEGlaWhgIGSGBO2nFomYY3mKjVglidaNYJGJDkWW2xxTfbjCbVaOGNqoX2GloR8ZeTaECS9pthRGJH2g0b3Agbk6hNANtteHD2GJUucfajCQBy5OOTQ25ZgUPvaVVQmbKh9510/qQpwXx3SQdfk8tZJOd5b6JJFplT3ZnmmX3qd5l1eg5q00HrtUkUn0AKaiGjClSAgKLYZcgWXwocGRcCFGCKwSB6ceqphwmYRUFYT/1WKlOdUpipmxW0mlCqHjYkAaeoZlqrqZ4qd+upQKaapn/AmgAegZ8KUtYtFAQQAgAh+QQFCgAbACwHAAQAzgALAAAF/+C2PUcmiCiZGUTrEkKBis8jQEquKwU5HyXIbEPgyX7BYa5wTNmEMwWsSXsqFbEh8DYs9mrgGjdK6GkPY5GOeU6ryz7UFopSQEzygOGhJBjoIgMDBAcBM0V/CYqLCQqFOwobiYyKjn2TlI6GKC2YjJZknouaZAcQlJUHl6eooJwKooobqoewrJSEmyKdt59NhRKFMxLEEA4RyMkMEAjDEhfGycqAG8TQx9IRDRDE3d3R2ctD1RLg0ttKEnbY5wZD3+zJ6M7X2RHi9Oby7u/r9g38UFjTh2xZJBEBMDAboogAgwkQI07IMUORwocSJwCgWDFBAIwZOaJIsOBjRogKJP8wTODw5ESVHVtm3AhzpEeQElOuNDlTZ0ycEUWKWFASqEahGwYUPbnxoAgEdlYSqDBkgoUNClAlIHbSAoOsqCRQnQHxq1axVb06FWFxLIqyaze0Tft1JVqyE+pWXMD1pF6bYl3+HTqAWNW8cRUFzmih0ZAAB2oGKukSAAGGRHWJgLiR6AylBLpuHKKUMlMCngMpDSAa9QIUggZVVvDaJobLeC3XZpvgNgCmtPcuwP3WgmXSq4do0DC6o2/guzcseECtUoO0hmcsGKDgOt7ssBd07wqesAIGZC1YIBa7PQHvb1+SFo+++HrJSQfB33xfav3i5eX3Hnb4CTJgegEq8tH/YQEOcIJzbm2G2EoYRLgBXFpVmFYDcREV4HIcnmUhiGBRouEMJGJGzHIspqgdXxK0yCKHRNXoIX4uorCdTyjkyNtdPWrA4Up82EbAbzMRxxZRR54WXVLDIRmRcag5d2R6ugl3ZXzNhTecchpMhIGVAKAYpgJjjsSklBEd99maZoo535ZvdamjBEpusJyctg3h4X8XqodBMx0tiNeg/oGJaKGABpogS40KSqiaEgBqlQWLUtqoVQnytekEjzo0hHqhRorppOZt2p923M2AAV+oBtpAnnPNoB6HaU6mAAIU+IXmi3j2mtFXuUoHKwXpzVrsjcgGOauKEjQrwq157hitGq2NoWmjh7z6Wmxb0m5w66+2VRAuXN/yFUAIACH5BAUKABsALAcABADOAAsAAAX/4CZuRiaM45MZqBgIRbs9AqTcuFLE7VHLOh7KB5ERdjJaEaU4ClO/lgKWjKKcMiJQ8KgumcieVdQMD8cbBeuAkkC6LYLhOxoQ2PF5Ys9PKPBMen17f0CCg4VSh32JV4t8jSNqEIOEgJKPlkYBlJWRInKdiJdkmQlvKAsLBxdABA4RsbIMBggtEhcQsLKxDBC2TAS6vLENdJLDxMZAubu8vjIbzcQRtMzJz79S08oQEt/guNiyy7fcvMbh4OezdAvGrakLAQwyABsELQkY9BP+//ckyPDD4J9BfAMh1GsBoImMeQUN+lMgUJ9CiRMa5msxoB9Gh/o8GmxYMZXIgxtR/yQ46S/gQAURR0pDwYDfywoyLPip5AdnCwsMFPBU4BPFhKBDi444quCmDKZOfwZ9KEGpCKgcN1jdALSpPqIYsabS+nSqvqplvYqQYAeDPgwKwjaMtiDl0oaqUAyo+3TuWwUAMPpVCfee0cEjVBGQq2ABx7oTWmQk4FglZMGN9fGVDMCuiH2AOVOu/PmyxM630gwM0CCn6q8LjVJ8GXvpa5Uwn95OTC/nNxkda1/dLSK475IjCD6dHbK1ZOa4hXP9DXs5chJ00UpVm5xo2qRpoxptwF2E4/IbJpB/SDz9+q9b1aNfQH08+p4a8uvX8B53fLP+ycAfemjsRUBgp1H20K+BghHgVgt1GXZXZpZ5lt4ECjxYR4ScUWiShEtZqBiIInRGWnERNnjiBglw+JyGnxUmGowsyiiZg189lNtPGACjV2+S9UjbU0JWF6SPvEk3QZEqsZYTk3UAaRSUnznJI5LmESCdBVSyaOWUWLK4I5gDUYVeV1T9l+FZClCAUVA09uSmRHBCKAECFEhW51ht6rnmWBXkaR+NjuHpJ40D3DmnQXt2F+ihZxlqVKOfQRACACH5BAUKABwALAcABADOAAsAAAX/ICdyUCkUo/g8mUG8MCGkKgspeC6j6XEIEBpBUeCNfECaglBcOVfJFK7YQwZHQ6JRZBUqTrSuVEuD3nI45pYjFuWKvjjSkCoRaBUMWxkwBGgJCXspQ36Bh4EEB0oKhoiBgyNLjo8Ki4QElIiWfJqHnISNEI+Ql5J9o6SgkqKkgqYihamPkW6oNBgSfiMMDQkGCBLCwxIQDhHIyQwQCGMKxsnKVyPCF9DREQ3MxMPX0cu4wt7J2uHWx9jlKd3o39MiuefYEcvNkuLt5O8c1ePI2tyELXGQwoGDAQf+iEC2xByDCRAjTlAgIUWCBRgCPJQ4AQBFXAs0coT40WLIjRxL/47AcHLkxIomRXL0CHPERZkpa4q4iVKiyp0tR/7kwHMkTUBBJR5dOCEBAVcKKtCAyOHpowXCpk7goABqBZdcvWploACpBKkpIJI1q5OD2rIWE0R1uTZu1LFwbWL9OlKuWb4c6+o9i3dEgw0RCGDUG9KlRw56gDY2qmCByZBaASi+TACA0TucAaTteCcy0ZuOK3N2vJlx58+LRQyY3Xm0ZsgjZg+oPQLi7dUcNXi0LOJw1pgNtB7XG6CBy+U75SYfPTSQAgZTNUDnQHt67wnbZyvwLgKiMN3oCZB3C76tdewpLFgIP2C88rbi4Y+QT3+8S5USMICZXWj1pkEDeUU3lOYGB3alSoEiMIjgX4WlgNF2EibIwQIXauWXSRg2SAOHIU5IIIMoZkhhWiJaiFVbKo6AQEgQXrTAazO1JhkBrBG3Y2Y6EsUhaGn95hprSN0oWpFE7rhkeaQBchGOEWnwEmc0uKWZj0LeuNV3W4Y2lZHFlQCSRjTIl8uZ+kG5HU/3sRlnTG2ytyadytnD3HrmuRcSn+0h1dycexIK1KCjYaCnjCCVqOFFJTZ5GkUUjESWaUIKU2lgCmAKKQIUjHapXRKE+t2og1VgankNYnohqKJ2CmKplso6GKz7WYCgqxeuyoF8u9IQAgA7",
            msg: null,
            msgText: "<em>Loading the next set of messages...</em>",
            selector: null,
            speed: 'fast',
            start: undefined
        },
        state: {
            isDuringAjax: false,
            isInvalidPage: false,
            isDestroyed: false,
            isDone: false, // For when it goes all the way through the archive.
            isPaused: false,
            isBeyondMaxPage: false,
            currPage: 1
        },
        debug: false,
        behavior: undefined,
        binder: $(window), // used to cache the selector
        nextSelector: "div.navigation a:first",
        navSelector: "div.navigation",
        contentSelector: null, // rename to pageFragment
        extraScrollPx: 150,
        itemSelector: "div.post",
        animate: false,
        pathParse: undefined,
        dataType: 'html',
        appendCallback: true,
        bufferPx: 40,
        errorCallback: function () { },
        infid: 0, //Instance ID
        pixelsFromNavToBottom: undefined,
        path: undefined, // Either parts of a URL as an array (e.g. ["/page/", "/"] or a function that takes in the page number and returns a URL
        prefill: false, // When the document is smaller than the window, load data until the document is larger or links are exhausted
        maxPage: undefined // to manually control maximum page (when maxPage is undefined, maximum page limitation is not work)
    };

    $.infinitescroll.prototype = {

        /*  
            ----------------------------
            Private methods
            ----------------------------
            */

        // Bind or unbind from scroll
        _binding: function infscr_binding(binding) {

            var instance = this,
            opts = instance.options;

            opts.v = '2.0b2.120520';

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_binding_'+opts.behavior] !== undefined) {
                this['_binding_'+opts.behavior].call(this);
                return;
            }

            if (binding !== 'bind' && binding !== 'unbind') {
                this._debug('Binding value  ' + binding + ' not valid');
                return false;
            }

            if (binding === 'unbind') {
                (this.options.binder).unbind('smartscroll.infscr.' + instance.options.infid);
            } else {
                (this.options.binder)[binding]('smartscroll.infscr.' + instance.options.infid, function () {
                    instance.scroll();
                });
            }

            this._debug('Binding', binding);
        },

        // Fundamental aspects of the plugin are initialized
        _create: function infscr_create(options, callback) {

            // Add custom options to defaults
            var opts = $.extend(true, {}, $.infinitescroll.defaults, options);
            this.options = opts;
            var $window = $(window);
            var instance = this;

            // Validate selectors
            if (!instance._validate(options)) {
                return false;
            }

            // Validate page fragment path
            var path = $(opts.nextSelector).attr('href');
            if (!path) {
                this._debug('Navigation selector not found');
                return false;
            }

            // Set the path to be a relative URL from root.
            opts.path = opts.path || this._determinepath(path);

            // contentSelector is 'page fragment' option for .load() / .ajax() calls
            opts.contentSelector = opts.contentSelector || this.element;

            // loading.selector - if we want to place the load message in a specific selector, defaulted to the contentSelector
            opts.loading.selector = opts.loading.selector || opts.contentSelector;

            // Define loading.msg
            opts.loading.msg = opts.loading.msg || $('<div id="infscr-loading"><img alt="Loading..." src="' + opts.loading.img + '" /><div>' + opts.loading.msgText + '</div></div>');

            // Preload loading.img
            (new Image()).src = opts.loading.img;

            // distance from nav links to bottom
            // computed as: height of the document + top offset of container - top offset of nav link
            if(opts.pixelsFromNavToBottom === undefined) {
                opts.pixelsFromNavToBottom = $(document).height() - $(opts.navSelector).offset().top;
                this._debug("pixelsFromNavToBottom: " + opts.pixelsFromNavToBottom);
            }

            var self = this;

            // determine loading.start actions
            opts.loading.start = opts.loading.start || function() {
                $(opts.navSelector).hide();
                opts.loading.msg
                .appendTo(opts.loading.selector)
                .show(opts.loading.speed, $.proxy(function() {
                    this.beginAjax(opts);
                }, self));
            };

            // determine loading.finished actions
            opts.loading.finished = opts.loading.finished || function() {
                if (!opts.state.isBeyondMaxPage)
                    opts.loading.msg.fadeOut(opts.loading.speed);
            };

            // callback loading
            opts.callback = function(instance, data, url) {
                if (!!opts.behavior && instance['_callback_'+opts.behavior] !== undefined) {
                    instance['_callback_'+opts.behavior].call($(opts.contentSelector)[0], data, url);
                }

                if (callback) {
                    callback.call($(opts.contentSelector)[0], data, opts, url);
                }

                if (opts.prefill) {
                    $window.bind("resize.infinite-scroll", instance._prefill);
                }
            };

            if (options.debug) {
                // Tell IE9 to use its built-in console
                if (Function.prototype.bind && (typeof console === 'object' || typeof console === 'function') && typeof console.log === "object") {
                    ["log","info","warn","error","assert","dir","clear","profile","profileEnd"]
                        .forEach(function (method) {
                            console[method] = this.call(console[method], console);
                        }, Function.prototype.bind);
                }
            }

            this._setup();

            // Setups the prefill method for use
            if (opts.prefill) {
                this._prefill();
            }

            // Return true to indicate successful creation
            return true;
        },

        _prefill: function infscr_prefill() {
            var instance = this;
            var $window = $(window);

            function needsPrefill() {
                return (instance.options.contentSelector.height() <= $window.height());
            }

            this._prefill = function() {
                if (needsPrefill()) {
                    instance.scroll();
                }

                $window.bind("resize.infinite-scroll", function() {
                    if (needsPrefill()) {
                        $window.unbind("resize.infinite-scroll");
                        instance.scroll();
                    }
                });
            };

            // Call self after setting up the new function
            this._prefill();
        },

        // Console log wrapper
        _debug: function infscr_debug() {
            if (true !== this.options.debug) {
                return;
            }

            if (typeof console !== 'undefined' && typeof console.log === 'function') {
                // Modern browsers
                // Single argument, which is a string
                if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
                    console.log( (Array.prototype.slice.call(arguments)).toString() );
                } else {
                    console.log( Array.prototype.slice.call(arguments) );
                }
            } else if (!Function.prototype.bind && typeof console !== 'undefined' && typeof console.log === 'object') {
                // IE8
                Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
            }
        },

        // find the number to increment in the path.
        _determinepath: function infscr_determinepath(path) {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_determinepath_'+opts.behavior] !== undefined) {
                return this['_determinepath_'+opts.behavior].call(this,path);
            }

            if (!!opts.pathParse) {

                this._debug('pathParse manual');
                return opts.pathParse(path, this.options.state.currPage+1);

            } else if (path.match(/^(.*?)\b2\b(.*?$)/)) {
                path = path.match(/^(.*?)\b2\b(.*?$)/).slice(1);

                // if there is any 2 in the url at all.    
            } else if (path.match(/^(.*?)2(.*?$)/)) {

                // page= is used in django:
                // http://www.infinite-scroll.com/changelog/comment-page-1/#comment-127
                if (path.match(/^(.*?page=)2(\/.*|$)/)) {
                    path = path.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                    return path;
                }

                path = path.match(/^(.*?)2(.*?$)/).slice(1);

            } else {

                // page= is used in drupal too but second page is page=1 not page=2:
                // thx Jerod Fritz, vladikoff
                if (path.match(/^(.*?page=)1(\/.*|$)/)) {
                    path = path.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                    return path;
                } else {
                    this._debug('Sorry, we couldn\'t parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.');
                    // Get rid of isInvalidPage to allow permalink to state
                    opts.state.isInvalidPage = true;  //prevent it from running on this page.
                }
            }
            this._debug('determinePath', path);
            return path;

        },

        // Custom error
        _error: function infscr_error(xhr) {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_error_'+opts.behavior] !== undefined) {
                this['_error_'+opts.behavior].call(this,xhr);
                return;
            }

            if (xhr !== 'destroy' && xhr !== 'end') {
                xhr = 'unknown';
            }

            this._debug('Error', xhr);

            if (xhr === 'end' || opts.state.isBeyondMaxPage) {
                this._showdonemsg();
            }

            opts.state.isDone = true;
            opts.state.currPage = 1; // if you need to go back to this instance
            opts.state.isPaused = false;
            opts.state.isBeyondMaxPage = false;
            this._binding('unbind');

        },

        // Load Callback
        _loadcallback: function infscr_loadcallback(box, data, url) {
            var opts = this.options,
            callback = this.options.callback, // GLOBAL OBJECT FOR CALLBACK
            result = (opts.state.isDone) ? 'done' : (!opts.appendCallback) ? 'no-append' : 'append',
            frag;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_loadcallback_'+opts.behavior] !== undefined) {
                this['_loadcallback_'+opts.behavior].call(this,box,data);
                return;
            }

            switch (result) {
                case 'done':
                    this._showdonemsg();
                    return false;

                case 'no-append':
                    if (opts.dataType === 'html') {
                        data = '<div>' + data + '</div>';
                        data = $(data).find(opts.itemSelector);
                    }
                    break;

                case 'append':
                    var children = box.children();
                    // if it didn't return anything
                    if (children.length === 0) {
                        return this._error('end');
                    }

                    // use a documentFragment because it works when content is going into a table or UL
                    frag = document.createDocumentFragment();
                    while (box[0].firstChild) {
                        frag.appendChild(box[0].firstChild);
                    }

                    this._debug('contentSelector', $(opts.contentSelector)[0]);
                    $(opts.contentSelector)[0].appendChild(frag);
                    // previously, we would pass in the new DOM element as context for the callback
                    // however we're now using a documentfragment, which doesn't have parents or children,
                    // so the context is the contentContainer guy, and we pass in an array
                    // of the elements collected as the first argument.

                    data = children.get();
                    break;
            }

            // loadingEnd function
            opts.loading.finished.call($(opts.contentSelector)[0],opts);

            // smooth scroll to ease in the new content
            if (opts.animate) {
                var scrollTo = $(window).scrollTop() + $(opts.loading.msg).height() + opts.extraScrollPx + 'px';
                $('html,body').animate({ scrollTop: scrollTo }, 800, function () { opts.state.isDuringAjax = false; });
            }

            if (!opts.animate) {
                // once the call is done, we can allow it again.
                opts.state.isDuringAjax = false;
            }

            callback(this, data, url);

            if (opts.prefill) {
                this._prefill();
            }
        },

        _nearbottom: function infscr_nearbottom() {

            var opts = this.options,
            pixelsFromWindowBottomToBottom = 0 + $(document).height() - (opts.binder.scrollTop()) - $(window).height();

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_nearbottom_'+opts.behavior] !== undefined) {
                return this['_nearbottom_'+opts.behavior].call(this);
            }

            this._debug('math:', pixelsFromWindowBottomToBottom, opts.pixelsFromNavToBottom);

            // if distance remaining in the scroll (including buffer) is less than the orignal nav to bottom....
            return (pixelsFromWindowBottomToBottom - opts.bufferPx < opts.pixelsFromNavToBottom);

        },

        // Pause / temporarily disable plugin from firing
        _pausing: function infscr_pausing(pause) {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_pausing_'+opts.behavior] !== undefined) {
                this['_pausing_'+opts.behavior].call(this,pause);
                return;
            }

            // If pause is not 'pause' or 'resume', toggle it's value
            if (pause !== 'pause' && pause !== 'resume' && pause !== null) {
                this._debug('Invalid argument. Toggling pause value instead');
            }

            pause = (pause && (pause === 'pause' || pause === 'resume')) ? pause : 'toggle';

            switch (pause) {
                case 'pause':
                    opts.state.isPaused = true;
                break;

                case 'resume':
                    opts.state.isPaused = false;
                break;

                case 'toggle':
                    opts.state.isPaused = !opts.state.isPaused;
                break;
            }

            this._debug('Paused', opts.state.isPaused);
            return false;

        },

        // Behavior is determined
        // If the behavior option is undefined, it will set to default and bind to scroll
        _setup: function infscr_setup() {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_setup_'+opts.behavior] !== undefined) {
                this['_setup_'+opts.behavior].call(this);
                return;
            }

            this._binding('bind');

            return false;

        },

        // Show done message
        _showdonemsg: function infscr_showdonemsg() {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_showdonemsg_'+opts.behavior] !== undefined) {
                this['_showdonemsg_'+opts.behavior].call(this);
                return;
            }

            opts.loading.msg
            .find('img')
            .hide()
            .parent()
            .find('div').html(opts.loading.finishedMsg).animate({ opacity: 1 }, 2000, function () {
                $(this).parent().fadeOut(opts.loading.speed);
            });

            // user provided callback when done    
            opts.errorCallback.call($(opts.contentSelector)[0],'done');
        },

        // grab each selector option and see if any fail
        _validate: function infscr_validate(opts) {
            for (var key in opts) {
                if (key.indexOf && key.indexOf('Selector') > -1 && $(opts[key]).length === 0) {
                    this._debug('Your ' + key + ' found no elements.');
                    return false;
                }
            }

            return true;
        },

        /*  
            ----------------------------
            Public methods
            ----------------------------
            */

        // Bind to scroll
        bind: function infscr_bind() {
            this._binding('bind');
        },

        // Destroy current instance of plugin
        destroy: function infscr_destroy() {
            this.options.state.isDestroyed = true;
            this.options.loading.finished();
            return this._error('destroy');
        },

        // Set pause value to false
        pause: function infscr_pause() {
            this._pausing('pause');
        },

        // Set pause value to false
        resume: function infscr_resume() {
            this._pausing('resume');
        },

        beginAjax: function infscr_ajax(opts) {
            var instance = this,
                path = opts.path,
                box, desturl, method, condition;

            // increment the URL bit. e.g. /page/3/
            opts.state.currPage++;

            // Manually control maximum page 
            if ( opts.maxPage != undefined && opts.state.currPage > opts.maxPage ){
                opts.state.isBeyondMaxPage = true;
                this.destroy();
                return;
            }

            // if we're dealing with a table we can't use DIVs
            box = $(opts.contentSelector).is('table, tbody') ? $('<tbody/>') : $('<div/>');

            desturl = (typeof path === 'function') ? path(opts.state.currPage) : path.join(opts.state.currPage);
            instance._debug('heading into ajax', desturl);

            method = (opts.dataType === 'html' || opts.dataType === 'json' ) ? opts.dataType : 'html+callback';
            if (opts.appendCallback && opts.dataType === 'html') {
                method += '+callback';
            }

            switch (method) {
                case 'html+callback':
                    instance._debug('Using HTML via .load() method');
                    box.load(desturl + ' ' + opts.itemSelector, undefined, function infscr_ajax_callback(responseText) {
                        instance._loadcallback(box, responseText, desturl);
                    });

                    break;

                case 'html':
                    instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
                    $.ajax({
                        // params
                        url: desturl,
                        dataType: opts.dataType,
                        complete: function infscr_ajax_callback(jqXHR, textStatus) {
                            condition = (typeof (jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === "success" || textStatus === "notmodified");
                            if (condition) {
                                instance._loadcallback(box, jqXHR.responseText, desturl);
                            } else {
                                instance._error('end');
                            }
                        }
                    });

                    break;
                case 'json':
                    instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
                    $.ajax({
                        dataType: 'json',
                        type: 'GET',
                        url: desturl,
                        success: function (data, textStatus, jqXHR) {
                            condition = (typeof (jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === "success" || textStatus === "notmodified");
                            if (opts.appendCallback) {
                                // if appendCallback is true, you must defined template in options.
                                // note that data passed into _loadcallback is already an html (after processed in opts.template(data)).
                                if (opts.template !== undefined) {
                                    var theData = opts.template(data);
                                    box.append(theData);
                                    if (condition) {
                                        instance._loadcallback(box, theData);
                                    } else {
                                        instance._error('end');
                                    }
                                } else {
                                    instance._debug("template must be defined.");
                                    instance._error('end');
                                }
                            } else {
                                // if appendCallback is false, we will pass in the JSON object. you should handle it yourself in your callback.
                                if (condition) {
                                    instance._loadcallback(box, data, desturl);
                                } else {
                                    instance._error('end');
                                }
                            }
                        },
                        error: function() {
                            instance._debug("JSON ajax request failed.");
                            instance._error('end');
                        }
                    });

                    break;
            }
        },

        // Retrieve next set of content items
        retrieve: function infscr_retrieve(pageNum) {
            pageNum = pageNum || null;

            var instance = this,
            opts = instance.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['retrieve_'+opts.behavior] !== undefined) {
                this['retrieve_'+opts.behavior].call(this,pageNum);
                return;
            }

            // for manual triggers, if destroyed, get out of here
            if (opts.state.isDestroyed) {
                this._debug('Instance is destroyed');
                return false;
            }

            // we dont want to fire the ajax multiple times
            opts.state.isDuringAjax = true;

            opts.loading.start.call($(opts.contentSelector)[0],opts);
        },

        // Check to see next page is needed
        scroll: function infscr_scroll() {

            var opts = this.options,
            state = opts.state;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['scroll_'+opts.behavior] !== undefined) {
                this['scroll_'+opts.behavior].call(this);
                return;
            }

            if (state.isDuringAjax || state.isInvalidPage || state.isDone || state.isDestroyed || state.isPaused) {
                return;
            }

            if (!this._nearbottom()) {
                return;
            }

            this.retrieve();

        },

        // Toggle pause value
        toggle: function infscr_toggle() {
            this._pausing();
        },

        // Unbind from scroll
        unbind: function infscr_unbind() {
            this._binding('unbind');
        },

        // update options
        update: function infscr_options(key) {
            if ($.isPlainObject(key)) {
                this.options = $.extend(true,this.options,key);
            }
        }
    };


    /*  
        ----------------------------
        Infinite Scroll function
        ----------------------------

        Borrowed logic from the following...

        jQuery UI
        - https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.widget.js

        jCarousel
        - https://github.com/jsor/jcarousel/blob/master/lib/jquery.jcarousel.js

        Masonry
        - https://github.com/desandro/masonry/blob/master/jquery.masonry.js     

*/

    $.fn.infinitescroll = function infscr_init(options, callback) {


        var thisCall = typeof options;

        switch (thisCall) {

            // method 
            case 'string':
                var args = Array.prototype.slice.call(arguments, 1);

                this.each(function () {
                    var instance = $.data(this, 'infinitescroll');

                    if (!instance) {
                        // not setup yet
                        // return $.error('Method ' + options + ' cannot be called until Infinite Scroll is setup');
                        return false;
                    }

                    if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                        // return $.error('No such method ' + options + ' for Infinite Scroll');
                        return false;
                    }

                    // no errors!
                    instance[options].apply(instance, args);
                });

            break;

            // creation 
            case 'object':

                this.each(function () {

                var instance = $.data(this, 'infinitescroll');

                if (instance) {

                    // update options of current instance
                    instance.update(options);

                } else {

                    // initialize new instance
                    instance = new $.infinitescroll(options, callback, this);

                    // don't attach if instantiation failed
                    if (!instance.failed) {
                        $.data(this, 'infinitescroll', instance);
                    }

                }

            });

            break;

        }

        return this;
    };



    /* 
     * smartscroll: debounced scroll event for jQuery *
     * https://github.com/lukeshumard/smartscroll
     * Based on smartresize by @louis_remi: https://github.com/lrbabe/jquery.smartresize.js *
     * Copyright 2011 Louis-Remi & Luke Shumard * Licensed under the MIT license. *
     */

    var event = $.event,
    scrollTimeout;

    event.special.smartscroll = {
        setup: function () {
            $(this).bind("scroll", event.special.smartscroll.handler);
        },
        teardown: function () {
            $(this).unbind("scroll", event.special.smartscroll.handler);
        },
        handler: function (event, execAsap) {
            // Save the context
            var context = this,
            args = arguments;

            // set correct event type
            event.type = "smartscroll";

            if (scrollTimeout) { clearTimeout(scrollTimeout); }
            scrollTimeout = setTimeout(function () {
                $(context).trigger('smartscroll', args);
            }, execAsap === "execAsap" ? 0 : 100);
        }
    };

    $.fn.smartscroll = function (fn) {
        return fn ? this.bind("smartscroll", fn) : this.trigger("smartscroll", ["execAsap"]);
    };


})(window, jQuery);
/*!
 * jquery.sumoselect - v1.2.0
 * http://hemantnegi.github.io/jquery.sumoselect
 * 2014-04-08
 *
 * Copyright 2014 Hemant Negi
 * Email : hemant.frnz@gmail.com
 * Compressor http://refresh-sf.com/yui/
 */


(function ($) {
    'namespace sumo';
    $.fn.SumoSelect = function (options) {

        // var is_visible_default = false;
        //$(document).click(function () { is_visible_default = false; });

        // This is the easiest way to have default options.
        var settings = $.extend({
            placeholder: 'Select Here',   // Dont change it here.
            csvDispCount: 3,              // display no. of items in multiselect. 0 to display all.
            captionFormat:'{0} Selected', // format of caption text. you can set your locale.
            floatWidth: 400,              // Screen width of device at which the list is rendered in floating popup fashion.
            forceCustomRendering: false,  // force the custom modal on all devices below floatWidth resolution.
            nativeOnDevice: ['Android', 'BlackBerry', 'iPhone', 'iPad', 'iPod', 'Opera Mini', 'IEMobile', 'Silk'], //'Windows'
            outputAsCSV: false,           // true to POST data as csv ( false for Html control array ie. deafault select )
            csvSepChar: ',',              // seperation char in csv mode
            okCancelInMulti: false,       //display ok cancel buttons in desktop mode multiselect also.
            triggerChangeCombined: true   // im multi select mode wether to trigger change event on individual selection or combined selection.

        }, options);

        var ret = this.each(function () {
            var selObj = this; // the original select object.
            if (this.sumo || !$(this).is('select')) return; //already initialized

            this.sumo = {
                E: $(selObj),   //the jquery object of original select element.
                is_multi: $(selObj).attr('multiple'),  //if its a mmultiple select
                select: '',
                caption: '',
                placeholder: '',
                optDiv: '',
                CaptionCont: '',
                is_floating: false,
                is_opened: false,
                //backdrop: '',
                mob:false, // if to open device default select
                Pstate: [],

                createElems: function () {
                    var O = this;
                    O.E.wrap('<div class="SumoSelect">');
                    O.select = O.E.parent();
                    O.caption = $('<span></span>');
                    O.CaptionCont = $('<p class="CaptionCont"><label><i></i></label></p>').addClass('SlectBox').attr('style', O.E.attr('style')).prepend(O.caption);
                    O.select.append(O.CaptionCont);

                    if(O.E.attr('disabled'))O.select.addClass('disabled')

                    //if output as csv and is a multiselect.
                    if (settings.outputAsCSV && O.is_multi && O.E.attr('name')) {
                        //create a hidden field to store csv value.
                        O.select.append($('<input class="HEMANT123" type="hidden" />').attr('name', O.E.attr('name')).val(O.getSelStr()));

                        // so it can not post the original select.
                        O.E.removeAttr('name');
                    }

                    //break for mobile rendring.. if forceCustomRendering is false
                    if (O.isMobile() && !settings.forceCustomRendering) {
                        O.setNativeMobile();
                        return;
                    }

                    //hide original select
                    O.E.hide();

                    //## Creating the list...
                    O.optDiv = $('<div class="optWrapper">');

                    //barnch for floating list in low res devices.
                    O.floatingList();

                    //Creating the markup for the available options
                    ul = $('<ul class="options">');
                    O.optDiv.append(ul);

                    $(O.E.children('option')).each(function (i, opt) {       // parsing options to li
                        opt = $(opt);
                        O.createLi(opt);
                    });

                    //if multiple then add the class multiple and add OK / CANCEL button
                    if (O.is_multi) O.multiSelelect();

                    //creating the backdrop element for clickoutside support.
                    //if (!$('.BackdropSelect').length) $('body').append('<div class="BackdropSelect">');
                   // O.backdrop = $('.BackdropSelect');

                    O.select.append(O.optDiv);
                    O.basicEvents();
                },

                //## Creates a LI element from a given option and binds events to it
                //## Adds it to UL at a given index (Last by default)
                createLi: function (opt,i) {
                    var O = this;
                    li = $('<li data-val="' + opt.val() + '"><label>' + opt.text() + '</label></li>');
                    if (O.is_multi) li.prepend('<span><i></i></span>');

                    if (opt.attr('disabled'))
                        li.addClass('disabled');
                    else
                        O.onOptClick(li);

                    if (opt.attr('selected'))
                        li.addClass('selected');

                    ul = O.optDiv.children('ul.options');
                    if (typeof i == "undefined")
                        ul.append(li);
                    else
                        ul.children('li').eq(i).before(li);

                    return li;
                },

                //## Returns the selected items as string in a Multiselect.
                getSelStr: function () {
                    // get the pre selected items.
                    sopt = [];
                    this.E.children('option:selected').each(function () { sopt.push($(this).val()); });
                    return sopt.join(settings.csvSepChar);
                },

                //## THOSE OK/CANCEL BUTTONS ON MULTIPLE SELECT.
                multiSelelect: function () {
                    var O = this;
                    O.optDiv.addClass('multiple');
                    okbtn = $('<p class="btnOk">OK</p>').click(function () {

                        //if combined change event is set.
                        if (settings.triggerChangeCombined) {

                            //check for a change in the selection.
                            changed = false;
                            if (O.E.children('option:selected').length != O.Pstate.length) {
                                changed = true;
                            }
                            else {
                                O.E.children('option:selected').each(function () {
                                    if (O.Pstate.indexOf($(this).val()) < 0) changed = true;
                                });
                            }

                            if (changed) {
                                O.E.trigger('change');
                                O.setText();
                            }
                        }
                        O.hideOpts();
                    });
                    cancelBtn = $('<p class="btnCancel">Cancel</p>').click(function () {
                        //remove all selections
                        O.E.children('option:selected').each(function () { this.selected = false; });
                        O.optDiv.find('li.selected').removeClass('selected')

                        //restore selections from saved state.
                        for (i = 0; i < O.Pstate.length; i++) {
                            O.E.children('option[value="' + O.Pstate[i] + '"]')[0].selected = true;
                            O.optDiv.find('li[data-val="' + O.Pstate[i] + '"]').addClass('selected');
                        }
                        O.setText();
                        O.hideOpts();
                    });
                    O.optDiv.append($('<div class="MultiControls">').append(okbtn).append(cancelBtn));
                },

                showOpts: function () {
                    var O = this;
                    if (O.E.attr('disabled')) return; // if select is disabled then retrun
                    O.is_opened = true;
                    //O.backdrop.show();
                    O.optDiv.addClass('open');

                    // hide options on click outside.
                    $(document).on('click.sumo', function (e) {
                            if (!O.select.is(e.target)                  // if the target of the click isn't the container...
                                && O.select.has(e.target).length === 0) // ... nor a descendant of the container
                            {
                                O.hideOpts();
                                $(document).off('click.sumo');
                            }
                    });

                    if (O.is_floating) {
                        H = O.optDiv.children('ul').outerHeight() + 2;  // +2 is clear fix
                        if (O.is_multi) H = H + parseInt(O.optDiv.css('padding-bottom'));
                        O.optDiv.css('height', H);
                    }

                    //maintain state when ok/cancel buttons are available.
                    if (O.is_multi && (O.is_floating || settings.okCancelInMulti)) {
                        O.Pstate = [];
                        O.E.children('option:selected').each(function () { O.Pstate.push($(this).val()); });
                    }
                },
                hideOpts: function () {
                    var O = this;
                    O.is_opened = false;
                    //O.backdrop.hide();
                    O.optDiv.removeClass('open');
                },

                basicEvents: function () {
                    var O = this;
                    O.CaptionCont.click(function (evt) {
                        O.E.trigger('click');
                        if (O.is_opened) O.hideOpts(); else O.showOpts();
                        evt.stopPropagation();
                    });

                    //O.backdrop.click(function () { O.hideOpts(); });

                    O.E.on('blur', function () {
                        O.optDiv.removeClass('open');
                    });

                    $(window).on('resize.sumo', function () { O.floatingList(); });
                },

                onOptClick: function (li) {
                    var O = this;
                    li.click(function () {
                        var li = $(this);
                        txt = "";
                        if (O.is_multi) {
                            li.toggleClass('selected');
                            O.E.children('option[value="' + li.attr('data-val') + '"]')[0].selected = li.hasClass('selected');
                        }
                        else {
                            li.parent().find('li.selected').removeClass('selected'); //if not multiselect then remove all selections from this list
                            li.toggleClass('selected');
                            O.E.val(li.attr('data-val'));   //set the value of select element
                        }

                        //branch for combined change event.
                        if (!(O.is_multi && settings.triggerChangeCombined && (O.is_floating || settings.okCancelInMulti))) {
                            O.setText();
                            O.E.trigger('change');
                        }

                        if (!O.is_multi) O.hideOpts(); //if its not a multiselect then hide on single select.
                    });
                },

                setText: function () {
                    var O = this;
                    O.placeholder = "";
                    if (O.is_multi) {
                        sels = O.E.children(':selected').not(':disabled'); //selected options.

                        for (i = 0; i < sels.length; i++) {
                            if (i >= settings.csvDispCount && settings.csvDispCount) {
                                O.placeholder = settings.captionFormat.replace('{0}', sels.length);
                                //O.placeholder = i + '+ Selected';
                                break;
                            }
                            else O.placeholder += $(sels[i]).text() + ", ";
                        }
                        O.placeholder = O.placeholder.replace(/,([^,]*)$/, '$1'); //remove unexpected "," from last.
                    }
                    else {
                        O.placeholder = O.E.children(':selected').not(':disabled').text();
                    }

                    is_placeholder = false;

                    if (!O.placeholder) {

                        is_placeholder = true;

                        O.placeholder = O.E.attr('placeholder');
                        if (!O.placeholder)                  //if placeholder is there then set it
                        {
                            O.placeholder = O.E.children('option:disabled:selected').text();
                            //if (!O.placeholder && settings.placeholder === 'Select Here')
                            //    O.placeholder = O.E.val();
                        }
                    }

                    O.placeholder = O.placeholder ? O.placeholder : settings.placeholder

                    //set display text
                    O.caption.text(O.placeholder);

                    //set the hidden field if post as csv is true.
                    csvField = O.select.find('input.HEMANT123');
                    if (csvField.length) csvField.val(O.getSelStr());

                    //add class placeholder if its a placeholder text.
                    if (is_placeholder) O.caption.addClass('placeholder'); else O.caption.removeClass('placeholder');
                    return O.placeholder;
                },

                isMobile: function () {

                    // Adapted from http://www.detectmobilebrowsers.com
                    var ua = navigator.userAgent || navigator.vendor || window.opera;

                    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                    for (var i = 0; i < settings.nativeOnDevice.length; i++) if (ua.toLowerCase().indexOf(settings.nativeOnDevice[i].toLowerCase()) > 0) return settings.nativeOnDevice[i];
                    return false;
                },

                setNativeMobile: function () {
                    var O = this;
                    O.E.addClass('SelectClass')//.css('height', O.select.outerHeight());
					O.mob = true;
                    O.E.change(function () {
                        O.setText();
                    });
                },

                floatingList: function () {
                    var O = this;
                    //called on init and also on resize.
                    //O.is_floating = true if window width is < specified float width
                    O.is_floating = $(window).width() <= settings.floatWidth;

                    //set class isFloating
                    O.optDiv.toggleClass('isFloating', O.is_floating);

                    //remove height if not floating
                    if (!O.is_floating) O.optDiv.css('height', '');

                    //toggle class according to okCancelInMulti flag only when it is not floating
                    O.optDiv.toggleClass('okCancelInMulti', settings.okCancelInMulti && !O.is_floating);
                },

                //HELPERS FOR OUTSIDERS
                // validates range of given item operations
                vRange: function (i) {
                    var O = this;
                    opts = O.E.children('option');
                    if (opts.length <= i || i < 0) throw "index out of bounds"
                    return O;
                },

                //toggles selection on c as boolean.
                toggSel: function (c, i) {
                    var O = this.vRange(i);
                    if (O.E.children('option')[i].disabled) return;
                    O.E.children('option')[i].selected = c;
                    if(!O.mob)O.optDiv.find('ul.options li').eq(i).toggleClass('selected',c);
                    O.setText();
                },
                
                //toggles alloption on c as boolean.
                toggSelAll: function (c, i) {
                    var O = this.vRange(i);
                    O.E.find('option').each(function(index, el) {
                     if (O.E.find('option')[$(this).index()].disabled) return;
                    O.E.find('option')[$(this).index()].selected = c;
                    if(!O.mob)O.optDiv.find('ul.options li').eq($(this).index()).toggleClass('selected',c);
                    O.setText();
                    });

                  
                },

                //toggles disabled on c as boolean.
                toggDis: function (c, i) {
                    var O = this.vRange(i);
                    O.E.children('option')[i].disabled = c;
                    if(!O.mob)O.optDiv.find('ul.options li').eq(i).toggleClass('disabled', c);
                    O.setText();
                },


                /* outside accessibility options
                   which can be accessed from the element instance.
                */
                unload: function () {
                    var O = this;
                    O.select.before(O.E);
                    O.E.removeClass('SelectClass').show();

                    if (settings.outputAsCSV && O.is_multi && O.select.find('input.HEMANT123').length) {
                        O.E.attr('name', O.select.find('input.HEMANT123').attr('name')); // restore the name;
                    }
                    O.select.remove();
                    delete selObj.sumo;
                    return selObj;
                },

                //## add a new option to select at a given index.
                add: function (val, txt, i) {
                    if (typeof val == "undefined") throw "No value to add"

                    var O = this;
                    opts=O.E.children('option')
                    if (typeof txt == "number") { i = txt; txt = val; }
                    if (typeof txt == "undefined") { txt = val; }

                    opt = $("<option></option>").val(val).html(txt);

                    if (opts.length < i) throw "index out of bounds"

                    if (typeof i == "undefined" || opts.length == i) { // add it to the last if given index is last no or no index provides.
                        O.E.append(opt);
                        if(!O.mob)O.createLi(opt);
                    }
                    else {
                        opts.eq(i).before(opt);
                        if(!O.mob)O.createLi(opt, i);
                    }

                    return selObj;
                },

                //## removes an item at a given index.
                remove: function (i) {
                    var O = this.vRange(i);
                    O.E.children('option').eq(i).remove();
                    if(!O.mob)O.optDiv.find('ul.options li').eq(i).remove();
                    O.setText();
                },

                //## Select an iten at a given index.
                selectItem: function (i) { this.toggSel(true, i); },
                
                //## Select all items  of the select.
                SelectAll: function (i) { this.toggSelAll(true, i ); },

                //## UnSelect an iten at a given index.
                unSelectItem: function (i) { this.toggSel(false, i); },

                //## UnSelect all items of the select.
                unSelectAll: function (i) { this.toggSelAll(false, i ); },

                //## Disable an iten at a given index.
                disableItem: function (i) { this.toggDis(true, i) },

                //## Removes disabled an iten at a given index.
                enableItem: function (i) { this.toggDis(false, i) },

                //## disables the whole select elements these are getter and setters.
                get disabled() {
                    return this.E.attr('disabled') ? true : false
                },
                set disabled(val) {
                    var O = this;
                    O.select.toggleClass('disabled', val);
                    if (val) O.E.attr('disabled','disabled'); else O.E.removeAttr('disabled');
                },


                init: function () {
                    var O = this;
                    O.createElems();
                    O.setText();
                    return O
                }

            };

            selObj.sumo.init();
        });

        return ret.length == 1 ? ret[0] : ret;
    };


}(jQuery));

/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 1.4.1
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2015, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */


(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else if (typeof timestamp === "number") {
      return inWords(new Date(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowPast: true,
      allowFuture: false,
      localeTitle: false,
      cutoff: 0,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        inPast: 'any moment now',
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
      }
    },

    inWords: function(distanceMillis) {
      if(!this.settings.allowPast && ! this.settings.allowFuture) {
          throw 'timeago allowPast and allowFuture settings can not both be set to false.';
      }

      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      if(!this.settings.allowPast && distanceMillis >= 0) {
        return this.settings.strings.inPast;
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator || "";
      if ($l.wordSeparator === undefined) { separator = " "; }
      return $.trim([prefix, words, suffix].join(separator));
    },

    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      s = s.replace(/([\+\-]\d\d)$/," $100"); // +09 -> +0900
      return new Date(s);
    },
    datetime: function(elem) {
      var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    },
    isTime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
    }
  });

  // functions that can be called via $(el).timeago('action')
  // init is default when no action is given
  // functions are called with context of a single element
  var functions = {
    init: function(){
      var refresh_el = $.proxy(refresh, this);
      refresh_el();
      var $s = $t.settings;
      if ($s.refreshMillis > 0) {
        this._timeagoInterval = setInterval(refresh_el, $s.refreshMillis);
      }
    },
    update: function(time){
      var parsedTime = $t.parse(time);
      $(this).data('timeago', { datetime: parsedTime });
      if($t.settings.localeTitle) $(this).attr("title", parsedTime.toLocaleString());
      refresh.apply(this);
    },
    updateFromDOM: function(){
      $(this).data('timeago', { datetime: $t.parse( $t.isTime(this) ? $(this).attr("datetime") : $(this).attr("title") ) });
      refresh.apply(this);
    },
    dispose: function () {
      if (this._timeagoInterval) {
        window.clearInterval(this._timeagoInterval);
        this._timeagoInterval = null;
      }
    }
  };

  $.fn.timeago = function(action, options) {
    var fn = action ? functions[action] : functions.init;
    if(!fn){
      throw new Error("Unknown function name '"+ action +"' for timeago");
    }
    // each over objects here and call the requested function
    this.each(function(){
      fn.call(this, options);
    });
    return this;
  };

  function refresh() {
    //check if it's still visible
    if(!$.contains(document.documentElement,this)){
      //stop if it has been removed
      $(this).timeago("dispose");
      return this;
    }

    var data = prepareData(this);
    var $s = $t.settings;

    if (!isNaN(data.datetime)) {
      if ( $s.cutoff == 0 || Math.abs(distance(data.datetime)) < $s.cutoff) {
        $(this).text(inWords(data.datetime));
      }
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if ($t.settings.localeTitle) {
        element.attr("title", element.data('timeago').datetime.toLocaleString());
      } else if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}));
(function() {
  jQuery(function() {
    var bindLinkClick;
    $(document).ready(function() {
      return bindLinkClick();
    });
    return bindLinkClick = function() {
      return $("a[data-remote].letsgo_delete").bind("ajax:success", function(event, data, status, xhr) {
        $("div.lets_go .list").html(data);
        return bindLinkClick();
      });
    };
  });

}).call(this);
/*!
 * Masonry PACKAGED v3.1.5
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */


!function(a){function b(){}function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}return this}return this.each(function(){var d=a.data(this,b);d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d))})}}if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}var d=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],c):c(a.jQuery)}(window),function(a){function b(b){var c=a.event;return c.target=c.target||c.srcElement||b,c}var c=document.documentElement,d=function(){};c.addEventListener?d=function(a,b,c){a.addEventListener(b,c,!1)}:c.attachEvent&&(d=function(a,c,d){a[c+d]=d.handleEvent?function(){var c=b(a);d.handleEvent.call(d,c)}:function(){var c=b(a);d.call(a,c)},a.attachEvent("on"+c,a[c+d])});var e=function(){};c.removeEventListener?e=function(a,b,c){a.removeEventListener(b,c,!1)}:c.detachEvent&&(e=function(a,b,c){a.detachEvent("on"+b,a[b+c]);try{delete a[b+c]}catch(d){a[b+c]=void 0}});var f={bind:d,unbind:e};"function"==typeof define&&define.amd?define("eventie/eventie",f):"object"==typeof exports?module.exports=f:a.eventie=f}(this),function(a){function b(a){"function"==typeof a&&(b.isReady?a():f.push(a))}function c(a){var c="readystatechange"===a.type&&"complete"!==e.readyState;if(!b.isReady&&!c){b.isReady=!0;for(var d=0,g=f.length;g>d;d++){var h=f[d];h()}}}function d(d){return d.bind(e,"DOMContentLoaded",c),d.bind(e,"readystatechange",c),d.bind(a,"load",c),b}var e=a.document,f=[];b.isReady=!1,"function"==typeof define&&define.amd?(b.isReady="function"==typeof requirejs,define("doc-ready/doc-ready",["eventie/eventie"],d)):a.docReady=d(a.eventie)}(this),function(){function a(){}function b(a,b){for(var c=a.length;c--;)if(a[c].listener===b)return c;return-1}function c(a){return function(){return this[a].apply(this,arguments)}}var d=a.prototype,e=this,f=e.EventEmitter;d.getListeners=function(a){var b,c,d=this._getEvents();if(a instanceof RegExp){b={};for(c in d)d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])}else b=d[a]||(d[a]=[]);return b},d.flattenListeners=function(a){var b,c=[];for(b=0;b<a.length;b+=1)c.push(a[b].listener);return c},d.getListenersAsObject=function(a){var b,c=this.getListeners(a);return c instanceof Array&&(b={},b[a]=c),b||c},d.addListener=function(a,c){var d,e=this.getListenersAsObject(a),f="object"==typeof c;for(d in e)e.hasOwnProperty(d)&&-1===b(e[d],c)&&e[d].push(f?c:{listener:c,once:!1});return this},d.on=c("addListener"),d.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})},d.once=c("addOnceListener"),d.defineEvent=function(a){return this.getListeners(a),this},d.defineEvents=function(a){for(var b=0;b<a.length;b+=1)this.defineEvent(a[b]);return this},d.removeListener=function(a,c){var d,e,f=this.getListenersAsObject(a);for(e in f)f.hasOwnProperty(e)&&(d=b(f[e],c),-1!==d&&f[e].splice(d,1));return this},d.off=c("removeListener"),d.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)},d.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)},d.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;if("object"!=typeof b||b instanceof RegExp)for(d=c.length;d--;)f.call(this,b,c[d]);else for(d in b)b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e));return this},d.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();if("string"===c)delete d[a];else if(a instanceof RegExp)for(b in d)d.hasOwnProperty(b)&&a.test(b)&&delete d[b];else delete this._events;return this},d.removeAllListeners=c("removeEvent"),d.emitEvent=function(a,b){var c,d,e,f,g=this.getListenersAsObject(a);for(e in g)if(g.hasOwnProperty(e))for(d=g[e].length;d--;)c=g[e][d],c.once===!0&&this.removeListener(a,c.listener),f=c.listener.apply(this,b||[]),f===this._getOnceReturnValue()&&this.removeListener(a,c.listener);return this},d.trigger=c("emitEvent"),d.emit=function(a){var b=Array.prototype.slice.call(arguments,1);return this.emitEvent(a,b)},d.setOnceReturnValue=function(a){return this._onceReturnValue=a,this},d._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},d._getEvents=function(){return this._events||(this._events={})},a.noConflict=function(){return e.EventEmitter=f,a},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return a}):"object"==typeof module&&module.exports?module.exports=a:this.EventEmitter=a}.call(this),function(a){function b(a){if(a){if("string"==typeof d[a])return a;a=a.charAt(0).toUpperCase()+a.slice(1);for(var b,e=0,f=c.length;f>e;e++)if(b=c[e]+a,"string"==typeof d[b])return b}}var c="Webkit Moz ms Ms O".split(" "),d=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return b}):"object"==typeof exports?module.exports=b:a.getStyleProperty=b}(window),function(a){function b(a){var b=parseFloat(a),c=-1===a.indexOf("%")&&!isNaN(b);return c&&b}function c(){for(var a={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},b=0,c=g.length;c>b;b++){var d=g[b];a[d]=0}return a}function d(a){function d(a){if("string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var d=f(a);if("none"===d.display)return c();var e={};e.width=a.offsetWidth,e.height=a.offsetHeight;for(var k=e.isBorderBox=!(!j||!d[j]||"border-box"!==d[j]),l=0,m=g.length;m>l;l++){var n=g[l],o=d[n];o=h(a,o);var p=parseFloat(o);e[n]=isNaN(p)?0:p}var q=e.paddingLeft+e.paddingRight,r=e.paddingTop+e.paddingBottom,s=e.marginLeft+e.marginRight,t=e.marginTop+e.marginBottom,u=e.borderLeftWidth+e.borderRightWidth,v=e.borderTopWidth+e.borderBottomWidth,w=k&&i,x=b(d.width);x!==!1&&(e.width=x+(w?0:q+u));var y=b(d.height);return y!==!1&&(e.height=y+(w?0:r+v)),e.innerWidth=e.width-(q+u),e.innerHeight=e.height-(r+v),e.outerWidth=e.width+s,e.outerHeight=e.height+t,e}}function h(a,b){if(e||-1===b.indexOf("%"))return b;var c=a.style,d=c.left,f=a.runtimeStyle,g=f&&f.left;return g&&(f.left=a.currentStyle.left),c.left=b,b=c.pixelLeft,c.left=d,g&&(f.left=g),b}var i,j=a("boxSizing");return function(){if(j){var a=document.createElement("div");a.style.width="200px",a.style.padding="1px 2px 3px 4px",a.style.borderStyle="solid",a.style.borderWidth="1px 2px 3px 4px",a.style[j]="border-box";var c=document.body||document.documentElement;c.appendChild(a);var d=f(a);i=200===b(d.width),c.removeChild(a)}}(),d}var e=a.getComputedStyle,f=e?function(a){return e(a,null)}:function(a){return a.currentStyle},g=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],d):"object"==typeof exports?module.exports=d(require("get-style-property")):a.getSize=d(a.getStyleProperty)}(window),function(a,b){function c(a,b){return a[h](b)}function d(a){if(!a.parentNode){var b=document.createDocumentFragment();b.appendChild(a)}}function e(a,b){d(a);for(var c=a.parentNode.querySelectorAll(b),e=0,f=c.length;f>e;e++)if(c[e]===a)return!0;return!1}function f(a,b){return d(a),c(a,b)}var g,h=function(){if(b.matchesSelector)return"matchesSelector";for(var a=["webkit","moz","ms","o"],c=0,d=a.length;d>c;c++){var e=a[c],f=e+"MatchesSelector";if(b[f])return f}}();if(h){var i=document.createElement("div"),j=c(i,"div");g=j?c:f}else g=e;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return g}):window.matchesSelector=g}(this,Element.prototype),function(a){function b(a,b){for(var c in b)a[c]=b[c];return a}function c(a){for(var b in a)return!1;return b=null,!0}function d(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function e(a,e,f){function h(a,b){a&&(this.element=a,this.layout=b,this.position={x:0,y:0},this._create())}var i=f("transition"),j=f("transform"),k=i&&j,l=!!f("perspective"),m={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[i],n=["transform","transition","transitionDuration","transitionProperty"],o=function(){for(var a={},b=0,c=n.length;c>b;b++){var d=n[b],e=f(d);e&&e!==d&&(a[d]=e)}return a}();b(h.prototype,a.prototype),h.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},h.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},h.prototype.getSize=function(){this.size=e(this.element)},h.prototype.css=function(a){var b=this.element.style;for(var c in a){var d=o[c]||c;b[d]=a[c]}},h.prototype.getPosition=function(){var a=g(this.element),b=this.layout.options,c=b.isOriginLeft,d=b.isOriginTop,e=parseInt(a[c?"left":"right"],10),f=parseInt(a[d?"top":"bottom"],10);e=isNaN(e)?0:e,f=isNaN(f)?0:f;var h=this.layout.size;e-=c?h.paddingLeft:h.paddingRight,f-=d?h.paddingTop:h.paddingBottom,this.position.x=e,this.position.y=f},h.prototype.layoutPosition=function(){var a=this.layout.size,b=this.layout.options,c={};b.isOriginLeft?(c.left=this.position.x+a.paddingLeft+"px",c.right=""):(c.right=this.position.x+a.paddingRight+"px",c.left=""),b.isOriginTop?(c.top=this.position.y+a.paddingTop+"px",c.bottom=""):(c.bottom=this.position.y+a.paddingBottom+"px",c.top=""),this.css(c),this.emitEvent("layout",[this])};var p=l?function(a,b){return"translate3d("+a+"px, "+b+"px, 0)"}:function(a,b){return"translate("+a+"px, "+b+"px)"};h.prototype._transitionTo=function(a,b){this.getPosition();var c=this.position.x,d=this.position.y,e=parseInt(a,10),f=parseInt(b,10),g=e===this.position.x&&f===this.position.y;if(this.setPosition(a,b),g&&!this.isTransitioning)return void this.layoutPosition();var h=a-c,i=b-d,j={},k=this.layout.options;h=k.isOriginLeft?h:-h,i=k.isOriginTop?i:-i,j.transform=p(h,i),this.transition({to:j,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},h.prototype.goTo=function(a,b){this.setPosition(a,b),this.layoutPosition()},h.prototype.moveTo=k?h.prototype._transitionTo:h.prototype.goTo,h.prototype.setPosition=function(a,b){this.position.x=parseInt(a,10),this.position.y=parseInt(b,10)},h.prototype._nonTransition=function(a){this.css(a.to),a.isCleaning&&this._removeStyles(a.to);for(var b in a.onTransitionEnd)a.onTransitionEnd[b].call(this)},h.prototype._transition=function(a){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(a);var b=this._transn;for(var c in a.onTransitionEnd)b.onEnd[c]=a.onTransitionEnd[c];for(c in a.to)b.ingProperties[c]=!0,a.isCleaning&&(b.clean[c]=!0);if(a.from){this.css(a.from);var d=this.element.offsetHeight;d=null}this.enableTransition(a.to),this.css(a.to),this.isTransitioning=!0};var q=j&&d(j)+",opacity";h.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:q,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(m,this,!1))},h.prototype.transition=h.prototype[i?"_transition":"_nonTransition"],h.prototype.onwebkitTransitionEnd=function(a){this.ontransitionend(a)},h.prototype.onotransitionend=function(a){this.ontransitionend(a)};var r={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};h.prototype.ontransitionend=function(a){if(a.target===this.element){var b=this._transn,d=r[a.propertyName]||a.propertyName;if(delete b.ingProperties[d],c(b.ingProperties)&&this.disableTransition(),d in b.clean&&(this.element.style[a.propertyName]="",delete b.clean[d]),d in b.onEnd){var e=b.onEnd[d];e.call(this),delete b.onEnd[d]}this.emitEvent("transitionEnd",[this])}},h.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(m,this,!1),this.isTransitioning=!1},h.prototype._removeStyles=function(a){var b={};for(var c in a)b[c]="";this.css(b)};var s={transitionProperty:"",transitionDuration:""};return h.prototype.removeTransitionStyles=function(){this.css(s)},h.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},h.prototype.remove=function(){if(!i||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();var a=this;this.on("transitionEnd",function(){return a.removeElem(),!0}),this.hide()},h.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var a=this.layout.options;this.transition({from:a.hiddenStyle,to:a.visibleStyle,isCleaning:!0})},h.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var a=this.layout.options;this.transition({from:a.visibleStyle,to:a.hiddenStyle,isCleaning:!0,onTransitionEnd:{opacity:function(){this.isHidden&&this.css({display:"none"})}}})},h.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},h}var f=a.getComputedStyle,g=f?function(a){return f(a,null)}:function(a){return a.currentStyle};"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],e):(a.Outlayer={},a.Outlayer.Item=e(a.EventEmitter,a.getSize,a.getStyleProperty))}(window),function(a){function b(a,b){for(var c in b)a[c]=b[c];return a}function c(a){return"[object Array]"===l.call(a)}function d(a){var b=[];if(c(a))b=a;else if(a&&"number"==typeof a.length)for(var d=0,e=a.length;e>d;d++)b.push(a[d]);else b.push(a);return b}function e(a,b){var c=n(b,a);-1!==c&&b.splice(c,1)}function f(a){return a.replace(/(.)([A-Z])/g,function(a,b,c){return b+"-"+c}).toLowerCase()}function g(c,g,l,n,o,p){function q(a,c){if("string"==typeof a&&(a=h.querySelector(a)),!a||!m(a))return void(i&&i.error("Bad "+this.constructor.namespace+" element: "+a));this.element=a,this.options=b({},this.constructor.defaults),this.option(c);var d=++r;this.element.outlayerGUID=d,s[d]=this,this._create(),this.options.isInitLayout&&this.layout()}var r=0,s={};return q.namespace="outlayer",q.Item=p,q.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},b(q.prototype,l.prototype),q.prototype.option=function(a){b(this.options,a)},q.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),b(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},q.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},q.prototype._itemize=function(a){for(var b=this._filterFindItemElements(a),c=this.constructor.Item,d=[],e=0,f=b.length;f>e;e++){var g=b[e],h=new c(g,this);d.push(h)}return d},q.prototype._filterFindItemElements=function(a){a=d(a);for(var b=this.options.itemSelector,c=[],e=0,f=a.length;f>e;e++){var g=a[e];if(m(g))if(b){o(g,b)&&c.push(g);for(var h=g.querySelectorAll(b),i=0,j=h.length;j>i;i++)c.push(h[i])}else c.push(g)}return c},q.prototype.getItemElements=function(){for(var a=[],b=0,c=this.items.length;c>b;b++)a.push(this.items[b].element);return a},q.prototype.layout=function(){this._resetLayout(),this._manageStamps();var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,a),this._isLayoutInited=!0},q.prototype._init=q.prototype.layout,q.prototype._resetLayout=function(){this.getSize()},q.prototype.getSize=function(){this.size=n(this.element)},q.prototype._getMeasurement=function(a,b){var c,d=this.options[a];d?("string"==typeof d?c=this.element.querySelector(d):m(d)&&(c=d),this[a]=c?n(c)[b]:d):this[a]=0},q.prototype.layoutItems=function(a,b){a=this._getItemsForLayout(a),this._layoutItems(a,b),this._postLayout()},q.prototype._getItemsForLayout=function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.isIgnored||b.push(e)}return b},q.prototype._layoutItems=function(a,b){function c(){d.emitEvent("layoutComplete",[d,a])}var d=this;if(!a||!a.length)return void c();this._itemsOn(a,"layout",c);for(var e=[],f=0,g=a.length;g>f;f++){var h=a[f],i=this._getItemLayoutPosition(h);i.item=h,i.isInstant=b||h.isLayoutInstant,e.push(i)}this._processLayoutQueue(e)},q.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},q.prototype._processLayoutQueue=function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];this._positionItem(d.item,d.x,d.y,d.isInstant)}},q.prototype._positionItem=function(a,b,c,d){d?a.goTo(b,c):a.moveTo(b,c)},q.prototype._postLayout=function(){this.resizeContainer()},q.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var a=this._getContainerSize();a&&(this._setContainerMeasure(a.width,!0),this._setContainerMeasure(a.height,!1))}},q.prototype._getContainerSize=k,q.prototype._setContainerMeasure=function(a,b){if(void 0!==a){var c=this.size;c.isBorderBox&&(a+=b?c.paddingLeft+c.paddingRight+c.borderLeftWidth+c.borderRightWidth:c.paddingBottom+c.paddingTop+c.borderTopWidth+c.borderBottomWidth),a=Math.max(a,0),this.element.style[b?"width":"height"]=a+"px"}},q.prototype._itemsOn=function(a,b,c){function d(){return e++,e===f&&c.call(g),!0}for(var e=0,f=a.length,g=this,h=0,i=a.length;i>h;h++){var j=a[h];j.on(b,d)}},q.prototype.ignore=function(a){var b=this.getItem(a);b&&(b.isIgnored=!0)},q.prototype.unignore=function(a){var b=this.getItem(a);b&&delete b.isIgnored},q.prototype.stamp=function(a){if(a=this._find(a)){this.stamps=this.stamps.concat(a);for(var b=0,c=a.length;c>b;b++){var d=a[b];this.ignore(d)}}},q.prototype.unstamp=function(a){if(a=this._find(a))for(var b=0,c=a.length;c>b;b++){var d=a[b];e(d,this.stamps),this.unignore(d)}},q.prototype._find=function(a){return a?("string"==typeof a&&(a=this.element.querySelectorAll(a)),a=d(a)):void 0},q.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var a=0,b=this.stamps.length;b>a;a++){var c=this.stamps[a];this._manageStamp(c)}}},q.prototype._getBoundingRect=function(){var a=this.element.getBoundingClientRect(),b=this.size;this._boundingRect={left:a.left+b.paddingLeft+b.borderLeftWidth,top:a.top+b.paddingTop+b.borderTopWidth,right:a.right-(b.paddingRight+b.borderRightWidth),bottom:a.bottom-(b.paddingBottom+b.borderBottomWidth)}},q.prototype._manageStamp=k,q.prototype._getElementOffset=function(a){var b=a.getBoundingClientRect(),c=this._boundingRect,d=n(a),e={left:b.left-c.left-d.marginLeft,top:b.top-c.top-d.marginTop,right:c.right-b.right-d.marginRight,bottom:c.bottom-b.bottom-d.marginBottom};return e},q.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},q.prototype.bindResize=function(){this.isResizeBound||(c.bind(a,"resize",this),this.isResizeBound=!0)},q.prototype.unbindResize=function(){this.isResizeBound&&c.unbind(a,"resize",this),this.isResizeBound=!1},q.prototype.onresize=function(){function a(){b.resize(),delete b.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var b=this;this.resizeTimeout=setTimeout(a,100)},q.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},q.prototype.needsResizeLayout=function(){var a=n(this.element),b=this.size&&a;return b&&a.innerWidth!==this.size.innerWidth},q.prototype.addItems=function(a){var b=this._itemize(a);return b.length&&(this.items=this.items.concat(b)),b},q.prototype.appended=function(a){var b=this.addItems(a);b.length&&(this.layoutItems(b,!0),this.reveal(b))},q.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){var c=this.items.slice(0);this.items=b.concat(c),this._resetLayout(),this._manageStamps(),this.layoutItems(b,!0),this.reveal(b),this.layoutItems(c)}},q.prototype.reveal=function(a){var b=a&&a.length;if(b)for(var c=0;b>c;c++){var d=a[c];d.reveal()}},q.prototype.hide=function(a){var b=a&&a.length;if(b)for(var c=0;b>c;c++){var d=a[c];d.hide()}},q.prototype.getItem=function(a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.element===a)return d}},q.prototype.getItems=function(a){if(a&&a.length){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c],f=this.getItem(e);f&&b.push(f)}return b}},q.prototype.remove=function(a){a=d(a);var b=this.getItems(a);if(b&&b.length){this._itemsOn(b,"remove",function(){this.emitEvent("removeComplete",[this,b])});for(var c=0,f=b.length;f>c;c++){var g=b[c];g.remove(),e(g,this.items)}}},q.prototype.destroy=function(){var a=this.element.style;a.height="",a.position="",a.width="";for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];d.destroy()}this.unbindResize(),delete this.element.outlayerGUID,j&&j.removeData(this.element,this.constructor.namespace)},q.data=function(a){var b=a&&a.outlayerGUID;return b&&s[b]},q.create=function(a,c){function d(){q.apply(this,arguments)}return Object.create?d.prototype=Object.create(q.prototype):b(d.prototype,q.prototype),d.prototype.constructor=d,d.defaults=b({},q.defaults),b(d.defaults,c),d.prototype.settings={},d.namespace=a,d.data=q.data,d.Item=function(){p.apply(this,arguments)},d.Item.prototype=new p,g(function(){for(var b=f(a),c=h.querySelectorAll(".js-"+b),e="data-"+b+"-options",g=0,k=c.length;k>g;g++){var l,m=c[g],n=m.getAttribute(e);try{l=n&&JSON.parse(n)}catch(o){i&&i.error("Error parsing "+e+" on "+m.nodeName.toLowerCase()+(m.id?"#"+m.id:"")+": "+o);continue}var p=new d(m,l);j&&j.data(m,a,p)}}),j&&j.bridget&&j.bridget(a,d),d},q.Item=p,q}var h=a.document,i=a.console,j=a.jQuery,k=function(){},l=Object.prototype.toString,m="object"==typeof HTMLElement?function(a){return a instanceof HTMLElement}:function(a){return a&&"object"==typeof a&&1===a.nodeType&&"string"==typeof a.nodeName},n=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1};"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],g):a.Outlayer=g(a.eventie,a.docReady,a.EventEmitter,a.getSize,a.matchesSelector,a.Outlayer.Item)}(window),function(a){function b(a,b){var d=a.create("masonry");return d.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var a=this.cols;for(this.colYs=[];a--;)this.colYs.push(0);this.maxY=0},d.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var a=this.items[0],c=a&&a.element;this.columnWidth=c&&b(c).outerWidth||this.containerWidth}this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},d.prototype.getContainerWidth=function(){var a=this.options.isFitWidth?this.element.parentNode:this.element,c=b(a);this.containerWidth=c&&c.innerWidth},d.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth%this.columnWidth,d=b&&1>b?"round":"ceil",e=Math[d](a.size.outerWidth/this.columnWidth);e=Math.min(e,this.cols);for(var f=this._getColGroup(e),g=Math.min.apply(Math,f),h=c(f,g),i={x:this.columnWidth*h,y:g},j=g+a.size.outerHeight,k=this.cols+1-f.length,l=0;k>l;l++)this.colYs[h+l]=j;return i},d.prototype._getColGroup=function(a){if(2>a)return this.colYs;for(var b=[],c=this.cols+1-a,d=0;c>d;d++){var e=this.colYs.slice(d,d+a);b[d]=Math.max.apply(Math,e)}return b},d.prototype._manageStamp=function(a){var c=b(a),d=this._getElementOffset(a),e=this.options.isOriginLeft?d.left:d.right,f=e+c.outerWidth,g=Math.floor(e/this.columnWidth);g=Math.max(0,g);var h=Math.floor(f/this.columnWidth);h-=f%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var i=(this.options.isOriginTop?d.top:d.bottom)+c.outerHeight,j=g;h>=j;j++)this.colYs[j]=Math.max(i,this.colYs[j])},d.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var a={height:this.maxY};return this.options.isFitWidth&&(a.width=this._getContainerFitWidth()),a},d.prototype._getContainerFitWidth=function(){for(var a=0,b=this.cols;--b&&0===this.colYs[b];)a++;return(this.cols-a)*this.columnWidth-this.gutter},d.prototype.needsResizeLayout=function(){var a=this.containerWidth;return this.getContainerWidth(),a!==this.containerWidth},d}var c=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++){var e=a[c];if(e===b)return c}return-1};"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],b):a.Masonry=b(a.Outlayer,a.getSize)}(window);
(function() {


}).call(this);
(function() {
  jQuery(function() {
    return $('form#new_photo').fileupload({
      dataType: "script",
      add: function(e, data) {
        var file;
        file = data.files[0];
        data.context = $(tmpl("template-upload", file));
        $('#new_photo').append(data.context);
        return data.submit();
      },
      progress: function(e, data) {
        var progress;
        if (data.context) {
          progress = parseInt(data.loaded / data.total * 100, 10);
          return data.context.find('.bar').css('width', progress + '%');
        }
      },
      stop: function(e, data) {
        $('.upload').hide();
        return location.reload();
      }
    });
  });

}).call(this);
(function() {
  jQuery(function() {
    return $('#append_and_paginate').click(function(e) {
      var ajax_url, current_page, uri, url;
      console.log('clicked');
      e.preventDefault();
      url = $('.hiddenpage .next_page').attr('href');
      uri = url.split('?');
      ajax_url = uri[0] + '.js?' + uri[1];
      current_page = url[url.length - 1];
      if (ajax_url) {
        return $.get(ajax_url, function() {}).always(function(data) {
          var total_pages;
          console.log(data);
          console.log('current_page' + current_page);
          total_pages = $('.total_pages').val();
          console.log('total pages' + total_pages);
          $('#questions_div').append(data.responseText);
          console.log(total_pages === parseInt(current_page));
          if (total_pages === current_page) {
            $('#append_and_paginate').hide();
          } else {
            $('.hiddenpage .next_page').attr('href', uri[0] + '?page=' + (parseInt(current_page) + 1));
          }
        });
      }
    });
  });

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {
  var subscription;

  jQuery(function() {
    Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
    return subscription.setupForm();
  });

  subscription = {
    setupForm: function() {
      $('#pay_with_paypal').click(function() {
        $('#paypal_checkout').show();
        $('#billing_fields').hide();
        return true;
      });
      $('#pay_with_card').click(function() {
        $('#paypal_checkout').hide();
        $('#billing_fields').show();
        return true;
      });
      return $('#new_subscription').submit(function() {
        $('input[type=submit]').attr('disabled', true);
        if ($('#card_number').length) {
          subscription.processCard();
          return false;
        } else {
          return true;
        }
      });
    },
    processCard: function() {
      var card;
      card = {
        number: $('#card_number').val(),
        cvc: $('#card_code').val(),
        expMonth: $('#card_month').val(),
        expYear: $('#card_year').val()
      };
      return Stripe.createToken(card, subscription.handleStripeResponse);
    },
    handleStripeResponse: function(status, response) {
      if (status === 200) {
        $('#subscription_stripe_card_token').val(response.id);
        return $('#new_subscription')[0].submit();
      } else {
        $('#stripe_error').text(response.error.message);
        return $('input[type=submit]').attr('disabled', false);
      }
    }
  };

}).call(this);
(function() {
  jQuery(function() {
    $('.best_in_place').best_in_place();
    $('.converation').click(function(e) {
      var href;
      href = $(this).data('href');
      if (!$('.conversation_avatar').is(e.target)) {
        return window.location = href;
      }
    });
    $('.adv_search').click(function(e) {
      e.preventDefault;
      return $('.advanced_search_div').removeClass('hide');
    });
    $('.simple_search').click(function(e) {
      e.preventDefault;
      return $('.advanced_search_div').addClass('hide');
    });
    return $(document).on('click', '.common_box', function(e) {
      var href;
      console.log('target', e.target);
      if (!$('.message_btn').is(e.target) && $('.message_btn').has(e.target).length === 0 && !$('.save_btn').is(e.target) && $('.save_btn').has(e.target).length === 0 && !$('.report_btn').is(e.target) && $('.report_btn').has(e.target).length === 0) {
        href = '/users/' + $(this).data('user-id');
        return window.location = href;
      }
    });
  });

}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//

















$(function(){
  if($("#jqTransformDisable").length > 0) {
    return;
  }else{
  $('select').jqTransSelect();
  $(document).on('change','select',function(){
    var id = $(this).attr('id')
    fix_select('#'+id);
  })
  $('input[type=checkbox]').jqTransCheckBox();
  
  $('.img_box').imagesLoaded(function(){
    $('.box_detail').masonry({
  	  columnWidth: 80,
  	  itemSelector: '.common_box'
	  });
  });
	
  $('a#inbox_link, a#sentbox_link').click(function(e){
		e.preventDefault();
		var href = $(this).attr('href');
		console.log('href'+href);
		$(this).parent().siblings().removeClass('active');
		$(this).parent().addClass('active');
		$('.tab_contr').css('display','none');;
		$(href).css('display','block');
	})
  $('#signin_link').click(function () {
      $('#signin-dropdown').toggle();
      return false;
  });
  $('#signin-dropdown').click(function(e) {
      e.stopPropagation();
  });
  $(document).click(function() {
      $('#signin-dropdown').hide();
  });
  $('.select_conversations').on('click',function(){
    console.log('checking')
    if($(this).is(':checked')){
      $('.tab_contr:visible .conversation_checkbox').each(function(){
        $(this).prop('checked', true)
        console.log('length', $(this).closest('a.jqTransformCheckbox').length)
        $(this).parent().find('a.jqTransformCheckbox').addClass('jqTransformChecked')
      })
      console.log('unchecked')
    }
    else {
      $('.tab_contr:visible .conversation_checkbox').each(function(){
        $(this).prop('checked', false)
        $(this).parent().find('a.jqTransformCheckbox').removeClass('jqTransformChecked')
      })
      console.log('checked')
    }
  })
  // $(".jqtransform").jqTransform();
}
});

function fix_select(selector) {
    var i=$(selector).parent().find('div,ul').remove().css('zIndex');
    $(selector).unwrap().removeClass('jqTransformHidden').jqTransSelect();
    $(selector).parent().css('zIndex', i);
}

function deleteMsg(id){
	var ids = [];
	ids.push(id);        
	$.ajax({ type: "POST",  url:"/conversations/trash_all",  data:{ids: ids},
	  success:function(data){
		jQuery.each(ids, function (i, val) {
		  $("div.outer#msg_"+val).remove();
		});
	  }
	});
}



$( document ).ready(function() {
	$("abbr.timeago").timeago();
	window.asd = $('.SlectBox#relegion').SumoSelect({ 
			placeholder: 'Relegion',
			csvDispCount: 3 
		});
		
	window.asd = $('.SlectBox#children').SumoSelect({ 
			placeholder: 'Kids',
			csvDispCount: 3 
		});
	window.asd = $('.SlectBox#ethnicity').SumoSelect({ 
			placeholder: 'Ethnicity',
			csvDispCount: 3 
		});
	window.asd = $('.SlectBox#gender').SumoSelect({ 
		placeholder: 'Gender',
		csvDispCount: 3 
	});
	
	$('#header .main_dropdown').hover( function() { $('#header .main_dropdown .dropdown-menu').toggle(); } );
    if($(".notice, .flash").text().length){
          $(".notice_flash .flash_msg").text($(".notice, .flash").text());
	      $(".notice_flash").show();
	      setTimeout(function(){
		    $(".notice_flash").hide();
	      }, 5000);
	}                 
    $(".notice, .flash").hide();
	$(".notice_flash .close").on('click', function(){
	  $(".notice_flash").hide();
	});
	
	
	$('.message_btn').click(function () {
	  var user_id = $(this).data('user');
	  $('#user').val(user_id);
	  var avatar_url = $("#image_" + user_id).attr('src');
	  var username = $("#name_" + user_id).val();
	  var age = $("#age_" + user_id).val();
	  var gender = $("#gender_" + user_id).val();
	  var sexuality = $("#sexuality_" + user_id).val();
	  var city = $("#city_" + user_id).val();
	  var state = $("#state_" + user_id).val();
	  var html_content = "<div class=\"commoon_sec\">" +
				  "<div class=\"left_sec\"><img alt=\"Popup baby\" src=\"" + avatar_url + "\"></div>" +
				  "<div class=\"right_sec\" style=\"position:relative;\">" +
				  "<div class=\"top_box\" style=\"position:absolute; border: 1px solid #cccccc; width: 456px; border-radius: 6px; height: 140px; background-color: #F7F7F7;\">" +
				  "<div class=\"left_box\" style=\"float:right; text-align:left; width: 68%;\">" +
				  "<h2>" + username + "</h2><h3>" + age + ", " + gender + ", " + sexuality + "</br>" +
				  city + ", " + state + "</h3></div></div></div></div>";
	  $("div.common_sec").html(html_content);
	  Cufon.refresh();
	})

      
	
});
 $( document ).ajaxComplete(function(event, xhr, settings) {
	     var ct = xhr.getResponseHeader("content-type") || "";
	     if (ct.indexOf('json') > -1) {
             var myArr = JSON.parse(xhr.responseText);
             if(myArr && myArr.notice.length) {
                 $(".notice_flash .flash_msg").text(myArr.notice);
                 $(".notice_flash").show();
                 setTimeout(function () {
                     $(".notice_flash").hide();
                 }, 5000);
             }
         }
	});

