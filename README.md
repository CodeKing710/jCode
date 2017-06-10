# jCode
This is an open-source framework for the use of the public.
You cannot credit this library as your own working.

Instructions:
You put this in your code like you would any JS framework.
`<script src="`*jCode Path*`/jcode-2.5.js"></script>`

This is a summary of what you would see in jCode. More is found on the tutorial page (Coming Soon!).

**Selecting Elements**
Selecting elements can be done using element objects such as `document.getElementById(`*name*`)`, or by a CSS input string, such as `"p > div:last-child"`. jCode is designed to handle element selection across all browsers. The only issue it has is IE as it doesn't support the `document.querySelectorAll()` function. To save lines and compile-time, I didn't yet implement IE selection to the library. If you'd like, you can build an IE selection plugin using jCode's plugin tools.

**Using functions and chains**
jCode is a SMART library, meaning it is self-aware of what each function is doing. For example, if I want to input text into a div with an ID of "hello" and then go on to bind an event listener to the div, I can do that like so: `$("div#hello").text("Hello World!").on("blur",function(){});`. Not all functions in jCode can chain like that. If you were to omit the value in the `text()` function, it would return the text inside, but not bind the event listener. The `text()` function has already returned at that point with the text value, and not the object the function is stored under, so at that point you cannot use any of the other functions in the library. Some functions don't even have the option to do one or the other, some are always unchainable, and others are always chainable. The event listener function has nothing to return, so it just returns the object with all the functions in it. 

I won't go into too much detail of how it works as that is covered in the tutorials (Coming Soon!). If you'd like to go into the library yourself, download the uncompressed version of jCode and look through yourself. The library has a very basic set of debuggers built into it so the library could possibly break in some form or fashion, but at least it tells you what went wrong. Download the compressed version for faster startup time. This library is modeled after jQuery, but has so many less lines. Less lines means less compile-time and less compile-time means faster load and overall a grand total of using less memory for your application! How nice! Happy Coding with the jCode library!
