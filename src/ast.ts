
import type { Node, Subject, Token } from "./types.ts";


/**@function astRunTime convert class document to readable ast node @example //h1 - #, h2 - ##, h3 - ###, p - direct, b - *, i - - */
export function astRunTime(txt: any):Node {
    const src = txt.split("\n");

    const tokens: Token[] = [];

    while (src.length > 0) {
        const line = src[0];
        if (line === "") {
            src.shift();
        } else if (line !== "" && line[0] === "#") {
            const line = src.shift()?.split("#");
            const len = line.length - 1;
            const element = `h${len}`;
            const value = line[len]
            const refCheck = value.split("=")
            const ref = refCheck[1] === undefined ? null : refCheck[1]
            const classname = refCheck[1] === undefined ? "" : "ref-box"
            const obj: Token = {
                type: "Header",
                value: refCheck[0],
                element,
                key: src.length,
                ref, classname
            };
            tokens.push(obj);
        } else if (line !== "" && line[0] === "-") {
            const value = src.shift()?.split("-")[1];
            const lists = value?.split(",")
            const obj = {
                key: src.length,
                type: "List",
                value: lists,
                element: "ul",
                classname: "list-box"
            };
            tokens.push(obj);
        } else if (line !== "" && line[0] === "*") {
            const value = src.shift()?.split("*")[1];
            const obj = {
                type: "Bold",
                value,
                element: "b",
                key: src.length,
            };
            tokens.push(obj);
        }  else if (line !== "" && line[0] === "!") {
            const value = src.shift()?.split("!")[1];
            const obj = {
                type: "Highlight",
                value,
                element: "p",
                key: src.length,
                classname: "highlight"
            };
            tokens.push(obj);
        } else if (line !== "" && line[0] === ">") {
            const value = src.shift()?.split(">")[1];
            const obj = {
                type: "Image",
                value,
                element: "img",
                key: src.length,
                classname: "image-box"
            };
            tokens.push(obj);
        } else if (line !== "") {
            const obj = {
                type: "Paragraph",
                value: src.shift(),
                element: "p",
                key: src.length,
            };
            tokens.push(obj);
        } else {
            src.shift();
        }
    }

    return {
        type: "Node",
        body: tokens,
    };
}


