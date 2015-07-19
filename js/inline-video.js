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
 * TODO: look for the webkit-playsinline playsinline attributes and replace videos on iphones with canvas
 * 
 */

'use strict';

var InlineVideo = function(elem) {

    // global
    var __ = this;
    var lastTime;

    // private
    (function init() {
        // set self
//        __ = document.createElement('video');
//        __.preload = 'auto';

        // set container
//        var cleanContainer = function() { return (container.indexOf('.') === 0) ? container : '.' + container; };
//        __.container = (container instanceof jQuery) ? container : $( cleanContainer() );

        // map this videoplayer to the html5 video player
        __ = elem;
        
        // replace the video element with an inline element
        var poster = $(elem).attr('poster');
        __.posterLink = document.createElement('a');
        $(__.posterLink).addClass('inlineVideoPoster').html('<img src="'+poster+'" />');
        
        var inlineVideo = document.createElement('inlineVideo');
        $(inlineVideo).addClass('inlineVideoContainer').html(__.posterLink);
        $(elem).replaceWith(inlineVideo);
        __.container = $(inlineVideo);

        // set canvas
        __.canvasElem = document.createElement('canvas');
        $(__.canvasElem).addClass('inlineVideoPlayer');
        __.canvasElemCtx = __.canvasElem.getContext('2d');

        // controls
        __.playButton = document.createElement('button');
        $(__.playButton).text('play').addClass('inlineVideoPlayButton');

        __.pauseButton = document.createElement('button');
        $(__.pauseButton).text('pause').addClass('inlineVideoPauseButton');

    })();

    function handleOnLoadedData() {
        console.log(__.duration);

        // resize & inject our video player into the dom
        var player = [__.canvasElem, __.playButton, __.pauseButton];
        __.container.width(__.videoWidth).height(__.videoHeight).append(player);

        console.log("Start: " + __.seekable.start(0) + " End: " + __.seekable.end(0));
    }

    function handleProgress() {
        var end = __.buffered.end(0);
        var sofar = parseInt(((end / __.duration) * 100));
        console.log(sofar + '%');
    }

    function handlePlayButtonClicked() { 
        lastTime = Date.now();
        __.animationRequest = requestAnimationFrame(loop); 
    }

    function handlePauseButtonClicked() {
        cancelAnimationFrame(__.animationRequest);
        __.animationRequest = null;
    }
    
    function handlePosterLinkClicked() {
        __.load();
    }

    function renderFrame(elapsed) {
        // TODO: output the current video frame to canvas
        __.currentTime = __.currentTime + elapsed;
        __.canvasElemCtx.drawImage(__, 0, 0, __.videoWidth, __.videoHeight);
    }

    function loop() {
        var time = Date.now();
        var elapsed = (time - lastTime) / 1000;

        // render
        if(elapsed >= ((1000/25)/1000)) {
            renderFrame(elapsed);
            lastTime = time;
        }

        // if we are at the end of the video stop
        var currentTime = (Math.round(parseFloat(__.currentTime)*10000)/10000);
        var duration = (Math.round(parseFloat(__.duration)*10000)/10000);
        if(currentTime >= duration) {
            console.log('currentTime: ' + currentTime + ' duration: ' + duration);
            return;
        }

        __.animationRequest = requestAnimationFrame(loop);
    }

    // public


    // events
    __.onloadstart = function() { console.log(arguments); }; // fires when the loading starts
    __.onloadedmetadata = function() { console.log(arguments);  }; //  when we have metadata about the video
    __.onloadeddata = function() { console.log(arguments); handleOnLoadedData(arguments); }; // when we have the first frame
    __.onprogress = function() { handleProgress(arguments); };
    $(__.playButton).on('click', handlePlayButtonClicked);
    $(__.pauseButton).on('click', handlePauseButtonClicked);
    $(__.posterLink).on('click touchstart', handlePosterLinkClicked);

    return __;
};

(function($) {
    $(window).load(function() {
        var iOS = /iPhone|iPod/.test( navigator.userAgent );
        if(iOS || debug) {
            
            var videos = $('video[playsinline], video[webkit-playsinline]');
            var inlineVideos = [];
            
            for(var i = 0, len = videos.length; i < len; i++) {
                var video = new InlineVideo(videos[i]);
                inlineVideos.push(video);
            }
        
            console.log('inline videos:');
            console.log(inlineVideos);
        }
    });
})(jQuery);