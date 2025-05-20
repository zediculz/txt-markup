import { txtRunTime } from "./ast.ts";
import { txtLexer } from "./lexer.ts";
import type { Node } from "./lexer.ts";
  
/**
 * @function txtMarkUp convert a formatted text file to HTML Ast Node. 
    @returns Node
    @example const result = txtMarkup(textSource)
  */
export default function txtMarkUp(textSource: string):Node {
    const lexer = txtLexer(textSource)
    return txtRunTime(lexer)
}

const ast = txtMarkUp("-list of something =one, two, three")
console.log(ast)