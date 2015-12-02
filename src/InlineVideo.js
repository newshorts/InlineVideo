/**
 * @wewearglasses
 * Forked from original repo and re-wrote in ES6
 * 
 * Date: 02-12-2015
 * Babel command: babel watch InlineVideo.js --out-file ../dist/InlineVideo.js --presets es2015
 * Uglify command: glifyjs InlineVideo.js --compress --mangle --output InlineVideo.min.js
*/


/*!
 * Inline Video Player v0.0.1
 * http://iwearshorts.com/
 *
 * Includes jQuery js
 * https://jquery.com/
 *
 * Copyright 2015 Mike Newell
 * Released under the MIT license
 * https://tldrlegal.com/license/mit-license
 *
 * Date: 2015-18-07
 * 
 * 
 */


class InlineVideo{
    constructor(video_identifier,canvas_identifier,framerate=30){
        this._load_started=false;
        this.video = document.querySelector(video_identifier);
        this.canvas = document.querySelector(canvas_identifier);
        this.video.parentNode.removeChild(this.video);
        this.framerate=framerate;
        // !Notice: Mobile browsers require the user to initiate a user interaction first before the video can play.
        // A touch event is added to the window to capture this user interaction
        // TODO: Anyone has a better solution to solve "this" problem for event listener? This method gives the correct "this" but the event listener cannot be removed because it is an arrow functiono 
        window.addEventListener('touchstart',evt=>this._start_load());
        this._start_load();
         // On IOS it will be webkitRequestAnimationFrame. Hopefully they will drop the prefix in the future
         // !Notice: Dropped other prefix since this is for IOS only
        if ( !window.requestAnimationFrame ) {
            window.requestAnimationFrame = window.webkitRequestAnimationFrame 
            window.cancelRequestAnimationFrame = window.webkitCancelRequestAnimationFrame
        }
    }
    
    play(){
        this.last_frame_time=Date.now();
        this.animation_request=requestAnimationFrame((t)=>this.render_frame(t));
    }
    
    pause(){
        cancelAnimationFrame(this.animation_request);
    }
    
    rewind(){
        this.video.currentTime=0;
        this.pause();
        this.play();
    }
    
    render_frame(t){
        var time=Date.now();
        var elapsed = (time - this.last_frame_time)/1000;
        if(elapsed > 1.0/this.framerate){
            this.last_frame_time = time;
            this.video.currentTime+=elapsed;
            this.canvas.getContext('2d').drawImage(this.video,0,0);
        }
        // if we are at the end of the video stop
        if(this.video.currentTime < this.video.duration) {
            this.animation_request=requestAnimationFrame((t)=>this.render_frame(t));
        }
    }
    
    /**
     * Start to load the video
     * Bound to the 'touchstart' event on window,
     */
    _start_load(){
        if(!this._load_started){
            this.video.load();
            this._load_started=true;
        }
    }
}