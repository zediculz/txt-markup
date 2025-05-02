
import { astLexer, astRunTime } from "./src/index.ts";

const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("eg.txt");
const file = decoder.decode(data)


const lexer = astLexer(file)
const ast = astRunTime(lexer)

console.log(ast)