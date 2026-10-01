// 作品の追加・削除・並べ替えは、このファイルだけで管理します。
export const workCategories = [
  {id:'video', label:'ショート動画編集', initialCount:3},
  {id:'sns', label:'SNS投稿デザイン', initialCount:3},
  {id:'flyer', label:'チラシ・フライヤー', initialCount:3},
  {id:'slides', label:'資料・スライド', initialCount:3},
] as const;

export type WorkCategory = typeof workCategories[number]['id'];
export interface Work {
  id:string;
  title:string;
  category:WorkCategory;
  thumbnail?:string;
  thumbnailAlt?:string;
  description:string;
  scope:string;
  type:'client'|'original';
  url?:string;
}

// 公開可能な作品のみ追加。上に書いた作品からカテゴリ内で表示します。
export const works:Work[] = [];

// 一覧専用ページからも同じデータと分類処理を利用できます。
export function groupWorks(items:readonly Work[]) {
  return workCategories.map(category=>({
    ...category,
    initialCount:Math.max(1, Math.floor(category.initialCount)),
    items:items.filter(work=>work.category===category.id),
  })).filter(category=>category.items.length>0);
}
