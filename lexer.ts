
export interface Token {
    type: string;
    value: string | [] | string[] |undefined;
    tag: string,
    key: number,
    classname: string | null,
    ref?: string | null,
    src?: string | null,
    template?: string | null,
    list?: string | [] | string[] |undefined,
    alt?: string | [] | string[] |undefined
  }
  
  export interface Node {
    type: string;
    body: Token[]
  }
  
   /**
   * @function txtLexer txtMarkup lexer
      @example const lexer = txtLexer(txt)
   */
  export function txtLexer(txt:string):string[] {
      const src = txt.split("\n");
  
      const tokens:string[] = [];
  
      src.map((value:string) => {
        if (value !== "") {
            tokens.push(value)
        }
      })
  
      return tokens
  }