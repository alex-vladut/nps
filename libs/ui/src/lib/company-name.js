import React from 'react';
import { css } from '@emotion/react';

export function CompanyName(props) {
  return (
    <div
      css={css`
        margin: 20px;
        font-size: 24px;
        text-align: center;
        padding: 1em;
        border-bottom: 1px solid lightgray;
      `}
    >
      {props.name}
    </div>
  );
}
