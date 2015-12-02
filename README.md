### ABOUT THIS BRANCH
* Re-coded in ES6
* Removed jquery dependency
* Removed all event listeners, onproess, onmetadata, onloadeddata, onloadstart. Add them back if you need them
* Removed auto converting video tags with "playsinline" attribute. Instead, the developer pass in the video and canvas idendifier in the contructor
* Removed auto create canvas element. I think adding them in HTML code is more obvious and the developer has more control over the dimension and positioning

### CHANGELOG
* 0.0.3
    * Changed the ugliy implementation of add and remove event listener for touchstart to a more elegant way 

### TODO
* Add function to play an audio file along with the video
* To write a fall back to native feature if the mobile device is Android

### HOW TO USE
* Please refer to the example folder