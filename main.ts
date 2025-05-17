import { txtRunTime } from "./ast.ts";
import { txtLexer } from "./lexer.ts";
import type { Node } from "./lexer.ts";
  
  /**
   * @function txtMarkUp convert a formatted text file to HTML Ast Node. 
      @returns Node
      @example const result = txtMarkup(textSource)
   */
  export function txtMarkUp(textSource: string):Node {
      const lexer = txtLexer(textSource)
      const ast = txtRunTime(lexer)
      return ast
  }

  const ast = txtMarkUp("todo list")

  console.log(ast)