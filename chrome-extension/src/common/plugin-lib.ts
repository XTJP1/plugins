/*
 *  Library used by plugins (needs to be included in content-script)
 */
/// <reference path="../@types/store.d.ts" />
import { NO_COLLISION_UNIQUE_ATTR } from "../common/constants";
import { getOptions } from "./store-lib";
//import { storage } from "./browser-interface";
// TODO: make these settings
const SCROLL_TIME = 450;
const SCROLL_DISTANCE = 450;
let msgTracker = {};


window.addEventListener('message', function(evt) {
    let msg = evt.data;
    let id = msg.id;
    if (msg.isTop) {
        msgTracker[id].cb(msg.data);
        delete msgTracker[id];
    }
}, false);


export function retrialAndError(f, f_check, delay, times) {
    return new Promise((resolve, reject) => {
        if (times > 0) {
            let res = Promise.resolve(f);
            res.then((res0) => {
                if (!f_check && res0) {
                    resolve();
                } else {
                    setTimeout(function() {
                        if (f_check) {
                            let res = f_check();
                            if (!res) {
                                return retrialAndError(f, f_check, delay, times - 1);
                            } else {
                                return resolve(res);
                            }
                        } else  {
                            return retrialAndError(f, f_check, delay, times - 1);
                        }
                    }, delay);
                }
            });
        } else {
            return resolve();
        }
    });
}

// we define all the members so that typeof PluginBase[member] works
// and we can distinguish what the private methods are of the plugin are
export abstract class PluginBase {
    static friendlyName: string = '';
    static description: string = '';
    static apiVersion: string = '';
    static version: string = '';
    static match: RegExp | RegExp[] = [];

    static commands: IPluginDefCommand[] = [];
    static homophones: IPluginDefHomophones = {};
    static init?: () => void;

    // called when plugin is deactivated (speech recg paused)
    // in page context
    static destroy?: () => void;

    // don't allow non-static properties
    [propName: string]: never;
    // limit the static members to be functions (doesn't work yet)
    // https://github.com/Microsoft/TypeScript/issues/6480
    // static [propName: string]: null | () => any;

    static util: IPluginUtil = {
        // automatically remove these overlays when add-on is deactivated
        // if hold == true, rerender the overlay even when page changes
        addOverlay: (contents, extraCss=null, id=null, domLoc=document.body, hold=false): HTMLIFrameElement => {
            let iframe = document.createElement('iframe');
            iframe.setAttribute(NO_COLLISION_UNIQUE_ATTR, '');
            iframe.className = `${NO_COLLISION_UNIQUE_ATTR}-iframe`;
            if (extraCss)
                $(iframe).css(extraCss);
            if (id)
                iframe.id = id;
            domLoc.appendChild(iframe);
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(contents);
            iframe.contentWindow.document.close();
            return iframe;
        },

        // meta: get's all the installed plugins
        getOptions: async function(): Promise<IOptions> {
            return getOptions();
        },

        scrollToAnimated: ($ele) => {
            $("html, body").animate({ scrollTop: $ele.offset().top }, SCROLL_TIME);
        },

        // send msg to beacon replacement
        // returns an array of results where results are arrays of all the elements that match
        // in the same frame
        queryAllFrames: function(tagName, attrs): Promise<any[]> {
            return new Promise((resolve, reject) => {
                let msgName = 'get_send';
                let id = +new Date();
                msgTracker[id] = {
                    cb: function(res) {
                        resolve(res);
                    }
                };
                // post to self
                window.postMessage({ id: id, name: msgName, data: { tagName, attrs } }, window.location.href);
                //let frames = $('iframe');
                //for (let i = 0; i < frames.length; i++) {
                    //// filter out `about:...`
                    //try {
                        //if (frames[i].src.startsWith('http://') || frames[i].src.startsWith('https://')) {
                            //counts[id].pending += 1;
                            //frames[i].contentWindow.postMessage({ id: id, name: msgName, data: { tagName, attrs } }, frames[i].src);
                        //}
                    //} catch (e) { }
                //}
            });
        },

        // We generate a unique id for the message to prevent the issue of generic window onMessage
        // handlers that relay duplicated messages.
        // id            is the special unique element attribute id that gets assigned to all the
        //               elements matched when queryAllFrames is used.
        // fnNames       an array or string of the function names to be called on the element
        // selector      if null then id is used by default
        postToAllFrames: function(id, fnNames, selector=null) {
            let msgName = 'post_send';
            let frames = $('iframe');
            fnNames = typeof fnNames === "object" ? fnNames: [fnNames];
            let msg = { id: +new Date(), name: msgName, data: { id, selector, fnNames  }};
            // also do the main frame
            window.postMessage(msg, window.location.href);
            frames.each((i, frame: any) => {
                try {
                    if (!frame.src.startsWith('http://') && !frame.src.startsWith('https://')) {
                        return;
                    }
                } catch (e) {}
                frame.contentWindow.postMessage(msg, frame.src);
            })
        },

        // Only checks if the top of the element is in view
        isInView: function($ele) {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();

            var elemTop = $ele.offset().top;

            return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
        },


        // return a promise that resolves with a response
        sendMsgToBeacon: function(msg) {
            return retrialAndError(new Promise((resolve, reject) => {
                console.log(`send msg to beacon msg: ${JSON.stringify(msg)}`);
                chrome.runtime.sendMessage({ bubbleDown: msg }, function(resp) {
                    if (resp) {
                        return resolve(resp);
                    } else {
                        return reject();
                    }
                });
            }), null, 2000, 2);
        },

        // TODO: make scroll distance a configurable property
        getScrollDistance: () => {
            return SCROLL_DISTANCE;
        },

        getNoCollisionUniqueAttr: () => {
            return NO_COLLISION_UNIQUE_ATTR;
        },

        // pick<T extends object, U extends keyof T>(
        //     object: T,
        //      ...props: Array<Many<U>>
        // ): Pick<T, U>;
        pick: (O, ...K) => K.reduce((o, k) => (o[k]=O[k], o), {}),
    };
}
