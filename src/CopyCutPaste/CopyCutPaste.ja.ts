/// <reference types="lipsurf-types/extension"/>
declare const PluginBase: IPluginBase;

function ensurePermission(perm: string) {
    return new Promise(cb => {
        chrome.permissions.contains({permissions: [perm]}, granted => {
            if (granted) {
                cb(true);
            } else {
                chrome.permissions.request({permissions: [perm]}, granted => {
                    cb(granted);
                });
            }
        });
    });
}

export default <IPluginBase & IPlugin> {...PluginBase, ...{
    niceName: 'コピー, 切り取り, 貼り付け',
    description: "このプラグインの使用前にマウスで権限を与える必要があります。",
    version: '3.4.3',
    match: /.*/,
    homophones: {
    },
    authors: "Miko, Hiroki",

    commands: [
        {
            name: 'コピー',
            description: '選択されたテキストをクリップボードにコピーします。',
            match: 'こぴー',
            fn: async () => {
                await ensurePermission('clipboardWrite');
            },
            pageFn: async () => {
                document.execCommand('copy');
            }
        },
        {
            name: '切り取り',
            description: "選択されたテキストをクリップボードに切り取ります。",
            // only works with the default ease levels...
            match: ['かっと', 'きりとり']
            fn: async () => {
                await ensurePermission('clipboardWrite');
            },
            pageFn: async () => {
                document.execCommand('cut');
            }
        },
        {
            name: '貼り付け',
            description: 'クリップボードの内容を貼り付けます。',
            match: ['はりつけ', 'ぺーすと']
            fn: async () => {
                await ensurePermission('clipboardRead');
            },
            pageFn: async () => {
                document.execCommand('paste');
            }
        }
    ],
}};
