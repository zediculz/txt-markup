
export interface Token {
  type: string;
  value: string | [] | string[] |undefined;
  element: string,
  key: number,
  classname: string | null
  ref?: string | null
}

export interface Node {
  type: string;
  body: Token[]
}


function astLexer(txt:string) {
    const src = txt.split("\n");

    const tokens:string[] = [];

    src.map((value:string) => {
        if (value !== "") {
            tokens.push(value)
        }
    })

    return tokens
}


function astRunTime(src: string[]):Node {
   
    const tokens: Token[] = [];

    while (src.length > 0) {
        const line = src[0];
        
        if (line !== "" && line[0] === "#") {
            const headers = src.shift()!.split("#");
    
            const len = headers.length - 1;
            console.log(len < 6)
            if (len < 6) {
                const element = `h${len}`;
                const value = headers[len]
                const refCheck = value.split("=")
                const ref = refCheck[1] === undefined ? null : refCheck[1]
                const classname = refCheck[1] === undefined ? "header-box" : "header-ref-box"

                const obj: Token = {
                    type: "Header",
                    value: refCheck[0],
                    element,
                    key: src.length,
                    ref,
                    classname
                };

                tokens.push(obj);
            } else {
                src.shift()
            }


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
                classname: "bold-box"
            };

            tokens.push(obj);

        }  else if (line !== "" && line[0] === "!") {
            const value = src.shift()?.split("!")[1];

            const obj = {
                type: "Paragraph",
                value,
                element: "p",
                key: src.length,
                classname: "highlight-box"
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
                classname: "paragraph-box"
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


/**
 * @function txtMarkUp convert a formatted text file to HTML Ast Node. 
    @returns Node
    @example const result = txtMarkup(textSource)
 */
export function txtMarkUp(textSource: string):Node {
    const lexer = astLexer(textSource)
    const ast = astRunTime(lexer)
    return ast
}