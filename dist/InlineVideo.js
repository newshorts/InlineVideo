'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var InlineVideo = (function () {
    function InlineVideo(video_identifier, canvas_identifier) {
        var audio_identifier = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
        var on_ended = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
        var on_load = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
        var framerate = arguments.length <= 5 || arguments[5] === undefined ? 25 : arguments[5];
        var fake_ios = arguments.length <= 6 || arguments[6] === undefined ? false : arguments[6];

        _classCallCheck(this, InlineVideo);

        this.video = document.querySelector(video_identifier);
        this.canvas = document.querySelector(canvas_identifier);
        this.framerate = framerate;
        if (audio_identifier) {
            this.audio = document.querySelector(audio_identifier);
        }
        this.ios = fake_ios || /iPad|iPhone|iPod/.test(navigator.platform);
        // On IOS it will be webkitRequestAnimationFrame. Hopefully they will drop the prefix in the future
        // !Notice: Dropped other prefix since this is for IOS only

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window.webkitRequestAnimationFrame;
            window.cancelRequestAnimationFrame = window.webkitCancelRequestAnimationFrame;
        }

        if (on_ended) {
            this.on_ended = on_ended;
            this.video.addEventListener('ended', on_ended);
        }

        if (on_load) {
            this.video.addEventListener('loadeddata', on_load);
        }
    }

    _createClass(InlineVideo, [{
        key: 'play',
        value: function play() {
            var _this = this;

            if (this.ios) {
                this.last_frame_time = Date.now();
                this.animation_request = requestAnimationFrame(function (t) {
                    return _this.render_frame(t);
                });
                if (this.audio) {
                    this.audio.play();
                }
            } else {
                this.video.play();
            }
        }
    }, {
        key: 'pause',
        value: function pause() {
            if (this.ios) {
                cancelAnimationFrame(this.animation_request);
                if (this.audio) {
                    this.audio.pause();
                }
            } else {
                this.video.pause();
            }
        }
    }, {
        key: 'rewind',
        value: function rewind() {
            if (this.ios) {
                this.video.currentTime = 0;
                this.pause();
                this.play();
                if (this.audio) {
                    this.audio.currentTime = 0;
                    this.audio.play();
                }
            } else {
                this.video.currentTime = 0;
                this.video.play();
            }
        }
    }, {
        key: 'render_frame',
        value: function render_frame(t) {
            var _this2 = this;

            var time = Date.now();
            var elapsed = (time - this.last_frame_time) / 1000.0;
            if (elapsed > 1.0 / this.framerate) {
                this.last_frame_time = time;
                this.video.currentTime += elapsed;
                this.canvas.getContext('2d').drawImage(this.video, 0, 0);
                console.log();
            }
            // if we are at the end of the video stop
            if (this.video.currentTime < this.video.duration) {
                this.animation_request = requestAnimationFrame(function (t) {
                    return _this2.render_frame(t);
                });
            } else {
                if (this.on_ended) {
                    this.on_ended();
                }
            }
        }
    }]);

    return InlineVideo;
})();
