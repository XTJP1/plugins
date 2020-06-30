/**
 * TODO: add arrows, tab, enter tests for Google Sheets
 * 
 */
/// <reference types="lipsurf-types/extension"/>
declare const PluginBase: IPluginBase;

export function backendPressKey(codes: number|number[]) {
    // force into array
    const codesArr = (<number[]>[]).concat(codes);
    chrome.runtime.sendMessage({ type: 'pressKeys', payload: { codes: codesArr, nonChar: true } });
}

function pressKey(key: string, code: number = 0): boolean {
    backendPressKey(code);
    return true;
    // const activeEle = document.activeElement;
    // console.log(activeEle);
    // if (activeEle) {
    //     const code = key.charCodeAt(0);
    //     const evtDeets = {
    //         bubbles: true,
    //         cancelable: true,
    //         key,
    //         code: key,
    //         location: 0,
    //         // @ts-ignore
    //         keyCode: code,
    //         // deprecated, but we include it
    //         which: code,
    //     }
    //     activeEle.dispatchEvent(new KeyboardEvent("keydown", evtDeets));
    //     activeEle.dispatchEvent(new KeyboardEvent("keyup", evtDeets));
    //     activeEle.dispatchEvent(new KeyboardEvent("keypress", evtDeets));
    //     return true;
    // }
    // return false;
}

export default <IPlugin & IPluginBase> {...PluginBase, ...{
    niceName: 'キーボード',
    description: 'キーボードのキーを個別に声で押せます。',
    version: '3.4.3',
    match: /.*/,
    authors: "Miko, Hiroki",
    homophones: {
        // causes issues with "press tab"
        // 'preston': 'press down',
    },
    commands: [
        {
            name: 'Tabを押す',
            description: 'Tabキーを押すのと同じ動作をします。',
            match: 'たぶをおす',
            pageFn: () => {
                if (!pressKey("Tab", 9))
                    backendPressKey(9);
            }
        },
        {
            name: 'Enterを押す',
            description: 'Enterキーを押すのと同じ動作をします。',
            match: 'えんたーをおす',
            pageFn: () => {
                if (!pressKey("Enter", 13))
                    backendPressKey(13);
            }
        },
        {
            name: '↓を押す',
            description: '↓キーを押すのと同じ動作をします。',
            match: 'したをおす',
            pageFn: () => {
                // gmail down arrow needs forcus when selecting recipient
                if (!pressKey("ArrowDown", 40))
                    // not sure of the use case for this
                    backendPressKey(40);
            }
        },
        {
            name: '↑を押す',
            description: '↑キーを押すのと同じ動作をします。',
            match: 'うえをおす',
            pageFn: () => {
                if (!pressKey("ArrowUp", 38))
                    backendPressKey(38);
            }
        },
        {
            name: '←を押す',
            description: '←キーを押すのと同じ動作をします。',
            match: 'ひだりをおす',
            pageFn: () => {
                if (!pressKey("ArrowLeft", 37))
                    backendPressKey(37);
            }
        },
        {
            name: '→を押す',
            description: '→キーを押すのと同じ動作をします。',
            match: 'みぎをおす',
            pageFn: () => {
                if (!pressKey("ArrowRight", 39))
                    backendPressKey(39);
            }
        },
    ]
}};
