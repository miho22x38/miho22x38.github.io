export type Accent = 'butter' | 'coral' | 'blue';
export interface Service {id:string;title:string;description:string;examples?:string;accent:Accent;price:number;unit:string;basic:string[];conditions:string[];icon:'video'|'feed'|'flyer'|'slides'}
export interface Portrait {src:string;srcSet:string;width:number;height:number;alt:string}

