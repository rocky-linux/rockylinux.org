import { JSXElementConstructor, ReactElement, ReactNode } from "react";

export interface QuizInterests {
  chatting: string;
  chattingDescription:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactNode;
  bugs: string;
  bugsDescription:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactNode;
  webdev: string;
  webDevDescription:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactNode;
  graphics: string;
  graphicsDescription:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactNode;
  release: string;
  releaseDescription:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactNode;
  sig: string;
  sigDescription:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactNode;
  docs: string;
  docsDescription:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactNode;
  noSelection: string;
}
