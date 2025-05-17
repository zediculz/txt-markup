
export interface Token {
    type: string;
    value: string | [] | string[] |undefined;
    tag: string,
    key: number,
    classname: string | null,
    ref?: string | null,
    src?: string | null,
    template?: string | null,
    list?: string | [] | string[] |undefined
  }
  
  export interface Node {
    type: string;
    body: Token[]
  }
  
  
  export function txtLexer(txt:string) {
      const src = txt.split("\n");
  
      const tokens:string[] = [];
  
      src.map((value:string) => {
        if (value !== "") {
            tokens.push(value)
        }
      })
  
      return tokens
  }