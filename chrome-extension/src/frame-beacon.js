console.log(`beacon 1 ${window.location}`);

// https://youtu.be/jbeUVtEPZYU
//  https://www.youtube.com/embed/jbeUVtEPZYU?feature=oembed
var ytIdMatcher = /(?:youtube.com\/embed\/([\w-]*))|(?:youtube.com\/watch\?v=([\w-]*))|(?:youtu.be\/([\w-]*))/i;
var playing = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("received message");
	if (request.playVideo || request.pauseVideo) {
        console.log(`play: ${request.playVideo} - pause: ${request.pauseVideo}`);
        let ytId = null;
        try {
            ytIds = (request.playVideo || request.pauseVideo).match(ytIdMatcher);
            for (let el of ytIds) {
                if (el !== ytIds[0] && el) {
                    ytId = el;
                    break;
                }
            }
            console.log(`${ytId} - ${window.location.href}`);
            if (~window.location.href.indexOf(ytId)) {
                console.log('checking if need to click');
                if (playing && request.pauseVideo || !playing && request.playVideo) {
                    console.log('clicking');
                    playing = !playing;
                    // <button class="ytp-large-play-button ytp-button"><svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="m .66,37.62 c 0,0 .66,4.70 2.70,6.77 2.58,2.71 5.98,2.63 7.49,2.91 5.43,.52 23.10,.68 23.12,.68 .00,-1.3e-5 14.29,-0.02 23.81,-0.71 1.32,-0.15 4.22,-0.17 6.81,-2.89 2.03,-2.07 2.70,-6.77 2.70,-6.77 0,0 .67,-5.52 .67,-11.04 l 0,-5.17 c 0,-5.52 -0.67,-11.04 -0.67,-11.04 0,0 -0.66,-4.70 -2.70,-6.77 C 62.03,.86 59.13,.84 57.80,.69 48.28,0 34.00,0 34.00,0 33.97,0 19.69,0 10.18,.69 8.85,.84 5.95,.86 3.36,3.58 1.32,5.65 .66,10.35 .66,10.35 c 0,0 -0.55,4.50 -0.66,9.45 l 0,8.36 c .10,4.94 .66,9.45 .66,9.45 z" fill="#1f1f1e" fill-opacity="0.81"></path><path d="m 26.96,13.67 18.37,9.62 -18.37,9.55 -0.00,-19.17 z" fill="#fff"></path><path d="M 45.02,23.46 45.32,23.28 26.96,13.67 43.32,24.34 45.02,23.46 z" fill="#ccc"></path></svg></button>
                    document.getElementsByClassName('ytp-large-play-button')[0].click();
                }
                // Not working (cannot see response in rnh-cs.js) but can see it in background.js
                sendResponse(true);
            }
        } catch (e) {
            console.error('runtime ' + e);
        }
    }
});