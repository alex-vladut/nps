import { useLocation } from 'react-router-dom';
import { parse } from 'qs';

export const useSearchParams = () => {
  const location = useLocation();
  return parse(location?.search, { ignoreQueryPrefix: true });
};
