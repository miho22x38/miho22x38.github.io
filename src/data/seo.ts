import { site } from './site';
export const seo = {
 title:`${site.name}｜${site.role}`,description:'添田美帆のポートフォリオ・サービス案内。ショート動画編集、SNS投稿デザイン、チラシ、資料・スライド作成に対応。制作経験と料金の目安をご紹介します。制作のご相談はお問い合わせフォームへ。',
 url:process.env.SITE_URL || 'https://miho22x38.github.io',
 robots:process.env.SITE_PUBLIC === 'true' ? 'index, follow' : 'noindex, nofollow'
};
