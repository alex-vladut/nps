import React from 'react';
import { css } from '@emotion/react';

export function QuestionLabel(props) {
  return (
    <label
      css={css`
        text-align: center;
        font-size: 22px;
        font-weight: 700;
        line-height: 1.25;
        letter-spacing: 0.3px;
        display: block;
        margin: 0 0 20px;
        color: #1e2430;

        &:after {
          ${props.isRequired
            ? css`
                content: ' *';
                color: red;
              `
            : null}
        }
      `}
    >
      {props.children}
    </label>
  );
}

export default QuestionLabel;
