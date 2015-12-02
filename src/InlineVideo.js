/**
 * Inline Video Player 0.0.3
 * WE/WEAR/GLASSES
 * Forked from original repo and re-wrote in ES6
 * Date: 03-12-2015
 * 
 * Original repo 
 *      https://github.com/newshorts/InlineVideo
 *      Copyright 2015 Mike Newell
 *      Released under the MIT license
 *      https://tldrlegal.com/license/mit-license
 * 
 * 
 * Babel command: babel watch src/InlineVideo.js --out-file dist/InlineVideo.js --presets es2015
 * Uglify command: uglifyjs dist/InlineVideo.js --compress --mangle --output dist/InlineVideo.min.js
*/

class InlineVideo{
    constructor(video_identifier,canvas_identifier,framerate=30){
        // this._load_started=false;
        this.video = document.querySelector(video_identifier);
        this.canvas = document.querySelector(canvas_identifier);
        // this.video.parentNode.removeChild(this.video);
        this.framerate=framerate;
        // !Notice: Mobile browsers require the user to initiate a user interaction first before the video can play. A touch event is added to the window to capture this user interaction
        this.bound_start_load = (evt) => this._start_load(); 
        window.addEventListener('touchstart',this.bound_start_load);
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
    _start_load() {
        this.video.load();
        window.removeEventListener('touchstart', this.bound_start_load);
    }
}