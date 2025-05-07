import { JSXElementConstructor, ReactElement, ReactNode } from "react";

export interface QuizInterests {
  chatting: string;
  chattingDescription:
    | string
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | ReactNode;
  bugs: string;
  bugsDescription:
    | string
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | ReactNode;
  webdev: string;
  webDevDescription:
    | string
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | ReactNode;
  graphics: string;
  graphicsDescription:
    | string
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | ReactNode;
  release: string;
  releaseDescription:
    | string
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | ReactNode;
  sig: string;
  sigDescription:
    | string
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | ReactNode;
  docs: string;
  docsDescription:
    | string
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | ReactNode;
  noSelection: string;
}
