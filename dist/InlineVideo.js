'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/**
 * @wewearglasses
 * Forked from original repo and re-wrote in ES6
 * 
 * Date: 01-12-2015
 * Babel command: babel watch InlineVideo.js --out-file ../dist/InlineVideo.js --presets es2015
*/

var InlineVideo = (function () {
    function InlineVideo(video_identifier, canvas_identifier) {
        var _this = this;

        var framerate = arguments.length <= 2 || arguments[2] === undefined ? 30 : arguments[2];

        _classCallCheck(this, InlineVideo);

        this._load_started = false;
        this.video = document.querySelector(video_identifier);
        this.canvas = document.querySelector(canvas_identifier);
        this.video.parentNode.removeChild(this.video);
        this.framerate = framerate;
        // !Notice: Mobile browsers require the user to initiate a user interaction first before the video can play.
        // A touch event is added to the window to capture this user interaction
        // Event listener is so annoying! Can't remove it once it is added
        window.addEventListener('touchstart', function (evt) {
            return _this._start_load();
        });
        this._start_load();
        // On IOS it will be webkitRequestAnimationFrame. Hopefully they will drop the prefix in the future
        // !Notice: Dropped other prefix since this is for IOS only
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window.webkitRequestAnimationFrame;
            window.cancelRequestAnimationFrame = window.webkitCancelRequestAnimationFrame;
        }
    }

    _createClass(InlineVideo, [{
        key: 'play',
        value: function play() {
            var _this2 = this;

            this.last_frame_time = Date.now();
            this.animation_request = requestAnimationFrame(function (t) {
                return _this2.render_frame(t);
            });
        }
    }, {
        key: 'pause',
        value: function pause() {
            cancelAnimationFrame(this.animation_request);
        }
    }, {
        key: 'rewind',
        value: function rewind() {
            this.video.currentTime = 0;
            this.pause();
            this.play();
        }
    }, {
        key: 'render_frame',
        value: function render_frame(t) {
            var _this3 = this;

            var time = Date.now();
            var elapsed = (time - this.last_frame_time) / 1000;
            if (elapsed > 1.0 / this.framerate) {
                this.last_frame_time = time;
                this.video.currentTime += elapsed;
                this.canvas.getContext('2d').drawImage(this.video, 0, 0);
            }
            // if we are at the end of the video stop
            if (this.video.currentTime < this.video.duration) {
                this.animation_request = requestAnimationFrame(function (t) {
                    return _this3.render_frame(t);
                });
            }
        }

        /**
         * Start to load the video
         * Bound to the 'touchstart' event on window,
         */

    }, {
        key: '_start_load',
        value: function _start_load() {
            if (!this._load_started) {
                this.video.load();
                this._load_started = true;
            }
        }
    }]);

    return InlineVideo;
})();
