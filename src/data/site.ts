import { works } from './works';
import type { Service,Portrait } from './types';
export const site = {
 name:'添田 美帆', role:'動画編集｜デザイン・資料作成',
 headline:['意図を汲み取り、','伝わる表現へ。'],
 intro:['チラシ、資料、ショート動画。','伝えたい内容やイメージを受け取り、','目的に合わせて、見やすく・伝わりやすく仕上げます。'],
 contactUrl:'https://docs.google.com/forms/d/e/1FAIpQLSewI9v_IHTlZCuCURC8Vurjn4m7P2HcvPZDtC-u3iYuRQkpQw/viewform?usp=dialog',
 cta:'制作について問い合わせる',ctaNote:'Googleフォームが開きます',externalNote:'新しいタブで開きます',
 shopUrl:'https://vkdhoj9tkzgf7dopngum.stores.jp/',shopLabel:'保育教材を見る',
 heroNote:'受け取ったものを、伝わる形に。', heroTags:['原稿','素材','イメージ'],heroResult:['見やすく','伝わりやすく'],
 serviceIntro:'伝えたい内容に合わせて、\n4つの制作でお手伝いします。',
 experienceIntro:'作品そのものを公開できない案件も含め、さまざまな業種・媒体の制作に携わってきました。',
 experienceNote:'守秘義務等の都合により、制作物を掲載していない案件があります。',
 priceIntro:'ご依頼内容や制作ボリュームに合わせて、お見積りいたします。まずは目安としてご覧ください。',
 priceAfter:'ご依頼内容や制作ボリュームに応じて、個別にお見積りいたします。継続でのご依頼も承っておりますので、お気軽にご相談ください。',
 priceCta:'「これをお願いすると、いくら？」という段階でもお気軽に。',
 common:['上記は料金の目安です。ご依頼内容や制作ボリュームに応じて、個別にお見積りいたします。','基本修正2回まで。','大幅なデザイン変更や確定後の原稿変更等は別途料金となります。','継続での制作依頼にも対応しています。'],
 profile:['公立保育園で約10年間、保育士として勤務。2025年3月の退職後、個人事業主として動画編集やSNS投稿デザイン、チラシ制作などを行っています。','制作で大切にしているのは、\n「伝えたいことが、見る人にきちんと伝わること」。','ただおしゃれに仕上げるだけではなく、文字の見やすさや情報の整理、伝わる順番まで意識しながら制作しています。','いただいた原稿や素材から意図をできるだけ汲み取り、一つひとつ丁寧に仕上げることを心がけています。'],
 partnerTitle:['制作部分を、','安心して任せられる存在に。'],
 partner:['リール・ショート動画の編集、SNS投稿デザイン、チラシなど、制作部分だけのご依頼にも対応しています。','そんな個人事業主・企業・店舗の方はもちろん、SNS運用をされている方・運用代行をされている方からのご依頼も歓迎しています。','たくさんの案件をこなすことよりも、一つひとつ丁寧に。継続してお任せいただけるような関係を大切にしていきたいと考えています。'],
 partnerNeeds:['SNS運用はできるけれど、制作まで手が回らない','動画編集や投稿画像だけ外注したい'],
 activityTitle:'こんな活動もしています。',activity:'約10年間の保育士経験を活かして、保育現場で使える教材の制作・販売も行っています。',
 contactTitle:['制作のご相談、','お待ちしています。'],contactLines:['「こんなものを作りたい」','「この内容でお願いできる？」'],contactBody:'そんな段階でも、お気軽にお問い合わせください。\n内容を確認のうえ、ご連絡いたします。',
 labels:{services:'できること',experience:'これまでの制作経験',works:'制作事例',pricing:'料金の目安',voices:'お客様の声',about:'私について',contact:'お問い合わせ'},
 ui:{skip:'本文へ移動',top:'ページの先頭へ',menu:'メニュー',details:'内容・条件を見る',common:'すべての制作に共通すること',original:'オリジナル制作',scope:'担当範囲',view:'制作事例を見る',copyright:'Miho Soeda',replay:'もう一度、整える',basic:'基本内容',conditions:'制作条件',voiceIntro:'制作をお任せいただいた方から、こんな言葉をいただきました。'}
};
export const services:Service[] = [
 {id:'video',title:'ショート動画編集',description:'素材や伝えたい内容をもとに、テロップ、強調、要約、テンポなどを調整。内容が伝わりやすく、見やすい動画へ仕上げます。',examples:'Instagramリール／YouTubeショート／商品・サービス紹介 など',accent:'butter',price:5000,unit:'本',icon:'video',basic:['カット','デザインテロップ','BGM／SE','素材挿入','簡易アニメーション'],conditions:['完成尺1分30秒まで','台本・素材支給の場合の料金','BGM選定・素材選定などが必要な場合は別途お見積り']},
 {id:'feed',title:'フィード投稿デザイン',description:'InstagramなどのSNS投稿画像を制作。情報の優先順位や文字の見やすさを意識しながら、伝わりやすいデザインへ仕上げます。',accent:'coral',price:2500,unit:'枚',icon:'feed',basic:['InstagramなどのSNS投稿画像を制作'],conditions:['原稿・素材支給の場合の料金','新規デザイン制作、素材選定、構成・原稿作成などが必要な場合は別途お見積り']},
 {id:'flyer',title:'チラシ・フライヤー',description:'サービス案内、イベント告知、販促、営業用など。情報を整理し、見る人が内容を理解しやすいチラシへ仕上げます。',accent:'blue',price:15000,unit:'片面',icon:'flyer',basic:['サービス案内・イベント告知・販促・営業用チラシなどを制作'],conditions:['原稿・素材支給を基本とする','両面制作は25,000円〜','情報量・構成・素材選定・図解など、制作内容により別途お見積り']},
 {id:'slides',title:'資料・スライド作成',description:'セミナー資料、サービス説明資料、営業資料など。文字を並べるだけではなく、情報の整理や読みやすさを意識して制作します。',accent:'butter',price:1500,unit:'ページ',icon:'slides',basic:['セミナー資料・サービス説明資料・営業資料などを制作'],conditions:['原稿・素材支給の場合の料金','構成・情報整理・素材選定・図解作成などが必要な場合は別途お見積り']}
];
export const experience = [
 {title:'動画編集',items:['女性起業家','整体院','歯科','美容クリニック','金融関連YouTube','商品紹介','不動産','NPO法人']},
 {title:'Instagramフィードデザイン',items:['警備会社','外壁工事会社','運送業']},
 {title:'チラシ',items:['採用支援関連']}
];
export const voices = [
 {theme:'意図を汲み取る',quote:'私の脳内イメージとドンピシャでした！',support:'私の意図を汲み取ってくださって反映してくださる',accent:'butter'},
 {theme:'分かりやすく編集する',quote:'テロップの使い分け、強調の仕方、要約のまとめ方などとても適切で見ていてとてもわかりやすかったです。',accent:'blue'},
 {theme:'世界観を反映する',quote:'世界観に合わせた細かいニュアンスや私らしさが最大限活かせるような編集にしてくださいます。',accent:'coral'}
] as const;

export const portrait:Portrait = {src:'./images/miho-v2-960.webp',srcSet:'./images/miho-v2-480.webp 480w, ./images/miho-v2-960.webp 960w',width:1122,height:1402,alt:'ノートパソコンを持つ添田美帆'};
export const navigation = [{id:'services',label:site.labels.services},{id:'experience',label:'制作経験'},...(works.length?[{id:'works',label:site.labels.works}]:[]),{id:'pricing',label:'料金'},{id:'voices',label:site.labels.voices},{id:'about',label:site.labels.about}];

