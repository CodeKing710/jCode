# jCode
This is an open-source framework for the use of the public.

Instructions:
You put this in your code like you would any JS framework.

Selecting elements can be done the traditional way with `document.getElementById(name)`, or through CSS selectors. This only supports single name selectors such as `body` or `#id`, not anything too advanced. This framework is meant for beginner JS programmers to make their work shorter and more robust. It is extendable through plugins, which is done through `jCode.extend(obj,name)`. I feel this is unique because in other frameworks, you sometimes can't remember or find the plugin you want, so with a naming system, you can call them like `$(sel,plugName).plugFunc()` and know what you are targeting. This framework has just about the same functionality of, say jQuery or Bootstrap frameworks, with some more robust code and maybe some things you might not have thought could work. This relies very little on old technologies and has SOME support for IE 9 and less. Certain functions won't work in older browsers because of the newer technologies they use, but the main simple ones will work just fine. This does come packed with features, and the greatest part, not a single bug. Some things could be considered bugs, but they are just happy little accidents. Below is a list of all the functions. Source code is literally right there for the taking, edit as you please, use as you please, no need for crediting as the framework source already has credits in its comments at the top. The functions in this are chainable so you can run multiple commands across one line and apply to one element.

- `$(sel).text(text)` - Returns or sets the text in the element
- `$(sel).html(text)` -  Returns or sets the text in the element as HTML
- `$(sel).css(property/object,value)` - Returns or sets the css of an element. Supports object injection, omit value if used in this manner
- `$(sel).attr(attribute,value)` - Returns or sets the attribute specified of the element
- `$(sel).on(event,func1,func2/capture,capture)` and `$(sel).bind(event,func1,func2/cap,cap)` - Binds event listeners of the type to the element, with special "hover" and "click" events premade into the code. Supply the second function if using hover or special click.
- `$(sel).contains(preset,customCheck)` - Scans the elements text for either the preset type or custom array. customCheck must be an array of strings to check for, and preset must be left as a blank string or set to custom
- `$(sel).click(func1,func2)` - A shorthand way of setting a click event, supports the special click
- `$(sel).toggleClass(name,args)` - Used to toggle a class or set of classes depending on arguments passed through to and from the element.
- `$(sel).addClass(name,args)` - Used to add class(es) to an element
- `$(sel).removeClass(name,args)` - Used to remove class(es) from an element
- `$(sel).toggleAttr(name,value,switchValue)` - Used to toggle a specified attribute from an element, uses the switchValue as the other value to input and switch between the first one if supplied
- `$(sel).append(text,displayType)` - Used to append text to an element, parses as HTML, and gives you option to display new text as inline or block
- `$(sel).prepend(text,displayType)` - Used to prepend text to an element, same properties as append()
- `$(sel).find(value,replacement)` - Used to find text in an element, replaces if replacement supplied, still in beta, will return text positions and what was changed if replacement is supplied.
- `$(sel).val(actualValue)` - Used to get the exact type of the element. Still in beta, will return the type if actualValue not set false, will return the "value" or inner properties if set to true

This is the list of functions that don't require a selector. Some are objects with sub-functions while others are the raw functions.

- `$.noConflict()` - Used to remove the "$" character from the window and will force use of jCode. Can assign to a variable to create new shorthand
- `$.math` - Object containing basic math functions and advanced ones like randomizers and angle converters
- `$.detectOS()` - Will return the OS Type after detection is successful, will have a neighbor partner for detecting browsers in future versions. You can always add it yourself too!
- `$.concat(args)` - Will return a concatenated string of all the arguments passed through to the function
- `$.ajax` - Object containing all the necessary AJAX functions, from the returning of the object to the preset GET and POST methods that will do it all for you
- `$.wait(func,time)` - A beta function that will execute said callback function after said amount of time. Can also do this more simply with `setTimeout(func,time)`
- `$.loopWait(func,time)` - A beta function that will execute said callback after said amount of time repeatedly until told to stop by calling `clearInterval($.looping)` or by making the func parameter a string called "clear", which will run that for you.
- `$.timing` - A grand object of timing event functions that will set, run, and stop functions. Can be useful for animation
- `$.objectCreator` - An Object containing a bunch of functions to create window or library objects. Still in beta, works in theory, not as well in practice. Can once again edit and make work if you'd like, or you can wait until the next update comes out.
- `$.include(type,paths...)` - The last function in the library, added most recently, still in a beta, but works in practice. Type will be either "css", "js", or "other". Other will do nothing at the moment as I don't know what I want it to do. The paths arguments will be the paths to those files. This WILL NOT decipher if it is a css or js file, which is why we have type specifications. Errors will not be thrown so be careful! The path strings will be separated by commas and added accordingly.


