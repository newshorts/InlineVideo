### SYNOPSIS 
InlineVideo.js is intended to allow users on an iphone to play videos inline in the safari browser, circumventing the default fullscreen behavior.  

### CHANGELOG
* 0.0.3
    * Changed implementation of adding and removing event listener for touchstart
* 0.0.2
    * Re-coded in ES6
    * Removed jquery dependency
    * Removed event listeners onproess, onmetadata, onloadeddata, onloadstart
    * Removed function of auto converting video tags with "playsinline" attribute 
    * Removed create canvas element with Javascript
    * Removed play, stop buttons created with JavaScript 

### TODO
* Add function to play an audio file along with the video
* To write a fall back to native feature if the mobile device is Android

### HOW TO USE
* Please refer to the code in the [example file](http://wewearglasses.github.io/InlineVideo/example)