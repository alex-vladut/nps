import { useEffect, useRef, useState } from 'react';

import { environment } from '../environments/environment';

export function useFetchSurvey(surveyId) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const cancel = useRef(false);

  useEffect(() => {
    if (!surveyId) return;

    (async () => {
      if (cancel.current) return;

      setLoading(true);

      try {
        const data = await fetch(
          `${environment.npsApi}/surveys/${surveyId}`
        ).then((result) => result.json());
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      cancel.current = true;
    };
  }, [surveyId]);

  return { data, loading, error };
}
