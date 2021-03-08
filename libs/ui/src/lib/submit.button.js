import React from 'react';
import { css } from '@emotion/react';

export function SubmitButton(props) {
  return (
    <button
      css={css`
        width: 220px;
        height: 50px;
        border-radius: 30px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        position: relative;
        cursor: pointer;

        ${props.isDisabled
          ? css`
              background-color: #f4f4f4;
              color: grey;
            `
          : css`
              border: 1px solid #0d3b70;
              background-color: #0d3b70;
              color: #fff;
              &:hover {
                background-color: #fff;
                color: #0d3b70;
              }
            `}

        &:focus {
          outline: 0;
        }
      `}
      disabled={props.isDisabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
