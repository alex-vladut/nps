import React, { useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';

import { Question, CompanyName, SubmitButton, ThankYou } from '@nps/ui';
import { useSearchParams } from '@nps/utils';

import { useFetchSurvey } from './useFetchSurvey';

import { environment } from '../environments/environment';

const StyledContent = styled.div`
  max-width: 800px;
  margin: 30px auto;
  background-color: white;
  padding: 2em;
  min-height: 50vh;
`;

const StyledSubmitSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2em;
`;

const comparisonFns = {
  lessthan: (first, second) => first < second,
  greaterthan: (first, second) => first > second,
};

export function App() {
  const params = useSearchParams();
  const { data, loading, error } = useFetchSurvey(params.survey_id);
  const [values, setValues] = useState({});
  const initialPage = useMemo(() =>
    data?.pages.find((page) => !page.conditions)
  );
  const [currentPage, setCurrentPage] = useState();
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (currentPage || !initialPage) return;
    setCurrentPage(initialPage);
  }, [currentPage, initialPage]);

  if (loading || !data || !currentPage) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Something went wrong...</div>;
  }

  const handleOnValueChange = (name, newValue) => {
    setValues({ ...values, [name]: newValue });
  };

  const handleOnSubmit = async () => {
    if (currentPage.id === initialPage.id) {
      // assuming a single page can be active at a given time
      const nextPage = data.pages
        .filter((page) => !!page.conditions)
        .find((page) => evaluateConditions(page.conditions));
      setCurrentPage(nextPage);
    } else {
      try {
        await fetch(
          `${environment.npsApi}/surveys/${data.survey_id}/responses`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          }
        );
        setFinished(true);
      } catch (err) {
        // TODO show error notification
        console.error(err);
      }
    }
  };

  return (
    <>
      <Global
        styles={css`
          body {
            background-color: #f4f4f4;
          }
        `}
      />
      <StyledContent>
        <CompanyName name={data.company_name} />
        {finished ? (
          <ThankYou message={data.thank_you_text} />
        ) : (
          <>
            {currentPage.questions.map((question) => (
              <Question
                key={question.name}
                question={question}
                value={values[question.name]}
                onChange={(e) => handleOnValueChange(question.name, e)}
              />
            ))}
            <StyledSubmitSection>
              <SubmitButton
                isDisabled={isSubmitDisabled()}
                onClick={handleOnSubmit}
              >
                Next
              </SubmitButton>
            </StyledSubmitSection>
          </>
        )}
      </StyledContent>
    </>
  );

  function evaluateConditions(conditions) {
    // assuming the condition are evaluated as AND even though not specified
    return conditions.every(evaluateCondition);
  }

  function evaluateCondition(condition) {
    return comparisonFns[condition.test](
      values[condition.question],
      condition.value
    );
  }

  function isSubmitDisabled() {
    return currentPage.questions.some(
      (question) => question.required && !values[question.name]
    );
  }
}

export default App;
