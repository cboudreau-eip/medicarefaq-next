export interface ArticleContentAddition {
  id: string;
  after: string;
  heading: string;
  blocks: Array<
    | {type:'paragraph';content:string}
    | {type:'list';ordered:boolean;items:string[]}
    | {type:'table';headers:string[];rows:string[][]}
  >;
}
