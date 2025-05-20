import type { Node, Token } from "./lexer.ts";

/**
  @function txtRunTime generate txtMarkUp Node 
  @returns Node
  @example const ast = txtMarkup(textSource)
*/
export function txtRunTime(src: string[]):Node {
  const tokens: Token[] = [];

  while (src.length > 0) {
    const line = src[0];

    if (line !== "" && line[0] === "#") {
        //Header tag
      const headers = src.shift()!.split("#");

      const len = headers.length - 1;
      if (len < 6) {
        const tag = `h${len}`;
        const val= headers[len];
        const refCheck = val.split("=");
       
        const ref = refCheck[1] === undefined ? null : refCheck[1]?.trim();
        const classname = refCheck[1] === undefined ? "header-box" : "header-ref-box";

        const value = refCheck[0]?.trim()

        const template = `<${tag}>${value}</${tag}>`

        const obj: Token = {
          type: "HeaderTag",
          value,
          tag,
          key: src.length,
          ref,
          classname,
          template
        };

        tokens.push(obj);
      } else {
        src.shift();
      }
    } else if (line !== " " && line[0] === "-") {
        //listTag
      const value = src.shift()?.split("-")[1]?.trim();

      const title = value?.split("=")[0]?.trim()
      const body = value?.split("=")[1]

      const lists = body?.split(",");

      const trimLists: string[] = [];
      lists?.flatMap((list) => {
        if(list !== "") {
          trimLists.push(list?.trim())
        }
      });

      const template = `<ul>${trimLists.flatMap((value) => `<li>${value}</li>`)}</ul>`

      const obj = {
        key: src.length,
        type: "ListTag",
        value: title,
        tag: "ul",
        classname: "list-box",
        list: trimLists,
        template
      };

      tokens.push(obj);
    } else if (line !== " " && line[0] === "*") {
        //Bold Tag
      const value = src.shift()?.split("*")[1]?.trim();
        const template = `<b>${value}</b>`

      const obj = {
        type: "BoldTag",
        value,
        tag: "b",
        key: src.length,
        classname: "bold-box",
        template
      };

      tokens.push(obj);
    } else if (line !== " " && line[0] === "!") { 
       //image tag
      const imgValue = src.shift()?.split("!")[1];
      const value = imgValue?.split("=")[0]?.trim();
      const alt = imgValue?.split("=")[1]?.trim();
      
      const template = `<img src={${value}} alt=${alt} />`

      const obj = {
        type: "ImageTag",
        value,
        tag: "img",
        key: src.length,
        classname: "image-box",
        template, 
        alt
      };

      tokens.push(obj);

    } else if (line !== " " && line[0] === ">") { 
         //highlighted paragraph
      const value = src.shift()?.split(">")[1]?.trim();
      const template = `<p>${value}</p>`

      const obj = {
        type: "ParagraphTag",
        value,
        tag: "p",
        key: src.length,
        classname: "highlight-box",
        template
      };

      tokens.push(obj);

    } else if (line !== " ") {
        const value = src.shift()?.trim()
        const template = `<p>${value}</p>`

      const obj = {
        type: "ParagraphTag",
        value,
        tag: "p",
        key: src.length,
        classname: "paragraph-box",
        template
      };

      tokens.push(obj);
    } else {
      src.shift();
    }
  }

  return {
    type: "NodeType",
    body: tokens,
  };
}
