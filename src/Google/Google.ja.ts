  
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
        },  
        "I'm Feeling Lucky": {
            name: "I'm Feeling Lucky",
            description: 'Google検索で"I\'m Feeling Lucky"をクリックしたときと同じ動作をします。検索ワードの検索結果でGoogleが正しいと判断した場合に一番最初のページに移動します。',
            match: ["らっきー*"]
        },
        "Google Calendar": {
            name: "Googleカレンダー",
            description: "Googleカレンダーを開きます",
            match: ["かれんだー", "ぐーぐるかれんだー"]
        },
        "Add Event to Google Calendar": {
            name: "Googleカレンダーに予定を追加",
            description: "Googleカレンダーに予定を追加します",
            match: ["ぐーぐるかれんだーによていをついか", "ぐーぐるかれんだーについか"]
        }
    }
};
