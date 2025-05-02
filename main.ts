
import { txtMarkUp } from "./src/index.ts";

const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("eg.txt");
const file = decoder.decode(data)



const res = txtMarkUp(file)
console.log(res)