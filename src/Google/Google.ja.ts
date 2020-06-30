/// <reference types="lipsurf-types/extension"/>
import Google from './Google';

Google.languages!.ja = {
    niceName: "Google検索",
    description: "Googleで検索",
    authors: "Miko, Hiroki",
    homophones: {
        'google': 'ぐーぐる'
    },
    commands: {
        "Search": {
            name: "検索",
            description: "検索するテキスト(*)を組み合わせてください",
            match: ["けんさく*", "ぐーぐる*", "ぐぐる*"],
        }
    }
};
