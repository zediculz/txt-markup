/* eslint-disable @typescript-eslint/no-explicit-any */
interface info {
    firstname: string,
    lastname: string
}

export interface CBT {
  cbt?: ListData | null
  act?: UserAct | null
}

export interface CLASS {
  class?: Subject | null
  currentPage?: number
}

export interface Activity {
  date: string
  Class?: CLASS|null
  Cbt?: CBT | null
}


export interface USER {
  id: number 
  userId: string
  status: string
  info: info
  score: 0 
  count: 0
  streak: number 
  power: number
  subjects: string[]
}

export interface Subject {
  id: number
  name: string
  code: string
  file: string
  pages: number
  note: string
}

export interface ListData {
    id: number;
    name: string;
    code: string;
    file: string;
}

export interface Token {
  type?: string;
  value?: string | [] | string[] |undefined;
  element: string,
  key: number,
  classname: string | null
  ref?: string | null
}

export interface Node {
  type: string;
  body: Token[]
}



export interface ASTValue {
  value: string|undefined;
  element: string|null;
  type: string
  parent?: string,
  word: string | null,
  key: number
}

export interface NodeEl {
  type: string;
  body: ASTValue[]
}

export interface Act {
  you: string 
  answer: string 
  correct: boolean
  page: number
  status: string,
  question: string 
}

export interface UserAct {
  score: number
  page: number 
  activity: Act[]
}

