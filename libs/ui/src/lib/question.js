import React from 'react';
import { css } from '@emotion/react';

import QuestionLabel from './question.label';
import NpsInput from './nps.input';

export function Question(props) {
  return (
    <div>
      <QuestionLabel isRequired={props.question.required}>
        {props.question.label}
      </QuestionLabel>

      {renderQuestionInput(props.question)}
    </div>
  );

  function renderQuestionInput(question) {
    switch (question.type) {
      case 'nps':
        return (
          <NpsInput
            min={question.range_min}
            max={question.range_max}
            value={props.value}
            onChange={props.onChange}
          />
        );
      case 'textarea':
        return (
          <textarea
            css={css`
              width: 100%;
              line-height: 26px;
              padding: 6px 10px;
              font-size: 16px;
              resize: vertical;
            `}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        );
      default:
        return null;
    }
  }
}
