import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const scoresList = [
  {
    score: 1,
    emojii: '😡',
  },
  {
    score: 2,
    emojii: '😤',
  },
  {
    score: 3,
    emojii: '😦',
  },
  {
    score: 4,
    emojii: '😕',
  },
  {
    score: 5,
    emojii: '😐',
  },
  {
    score: 6,
    emojii: '🙂',
  },
  {
    score: 7,
    emojii: '😊',
  },
  {
    score: 8,
    emojii: '🤗',
  },
  {
    score: 9,
    emojii: '🤩',
  },
  {
    score: 10,
    emojii: '🥳',
  },
];

const StyledScoreItems = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const StyledScoreItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  border: 2px grey solid;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 7%);
  padding-bottom: 8px;
  margin: 0 2px;
  color: #404040;

  ${(props) =>
    props.isSelected
      ? css`
          color: #fff;
          background: #40c9b2;
          border-color: #2a9381;
          text-shadow: 1px 1px 1px rgb(0 0 0 / 10%);
        `
      : null}

  &:hover {
    cursor: pointer;
    border-color: lightblue;
  }
  &:focus {
    outline: 0;
  }
`;

export function NpsInput(props) {
  const options = useMemo(
    () =>
      scoresList.filter(
        (item) => item.score >= props.min && item.score <= props.max
      ),
    [props.min, props.max]
  );
  return (
    <StyledScoreItems>
      {options.map((item) => (
        <StyledScoreItem
          key={item.score}
          isSelected={props.value === item.score}
          onClick={() => props.onChange(item.score)}
        >
          <div>{item.emojii}</div>
          <div>{item.score}</div>
        </StyledScoreItem>
      ))}
    </StyledScoreItems>
  );
}

export default NpsInput;
