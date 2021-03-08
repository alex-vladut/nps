import React from 'react';
import { css } from '@emotion/react';

export function ThankYou(props) {
  return (
    <div
      css={css`
        text-align: center;
      `}
    >
      <h1>{props.message}</h1>
      <div
        css={css`
          font-size: 18px;
          color: #364155;
        `}
      >
        Your feedback is appreciated.
      </div>
      <div
        css={css`
          font-size: 70px;
          margin-top: 1em;
        `}
      >
        🤩
      </div>
    </div>
  );
}