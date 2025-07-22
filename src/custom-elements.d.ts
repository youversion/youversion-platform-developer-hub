import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "sign-in-with-youversion-button": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      "bible-text": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      "votd-text": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export {}; 