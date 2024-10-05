import { JSXElementConstructor, ReactElement, ReactNodeArray } from "react";

export interface QuizInterests {
  chatting: string;
  chattingDescription:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactNodeArray;
  bugs: string;
  bugsDescription:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactNodeArray;
  webdev: string;
  webDevDescription:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactNodeArray;
  graphics: string;
  graphicsDescription:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactNodeArray;
  release: string;
  releaseDescription:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactNodeArray;
  sig: string;
  sigDescription:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactNodeArray;
  docs: string;
  docsDescription:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactNodeArray;
  noSelection: string;
}
