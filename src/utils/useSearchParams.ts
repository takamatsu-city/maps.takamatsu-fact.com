import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createSearchParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';

export type SetURLSearchParams = (
  arg: URLSearchParams | ((prevSearchParams: URLSearchParams) => URLSearchParams),
) => void;

/**
 * A convenient wrapper for reading and writing search parameters via the
 * URLSearchParams interface.
 */
export function useSearchParams(): [URLSearchParams, SetURLSearchParams] {
  const location = useLocation();
  const navigate = useNavigate();
  const currentLocationRef = useRef(location.search);
  const [ searchParams, setInternalSearchParams ] = useState(createSearchParams(location.search));

  useEffect(() => {
    currentLocationRef.current = location.search;

    const newSearchParams = createSearchParams(location.search);
    setInternalSearchParams(newSearchParams);
  }, [location.search]);

  const setSearchParams = useCallback<SetURLSearchParams>((arg) => {
    if (typeof arg !== 'function') {
      setInternalSearchParams(arg);
      navigate(`?${arg.toString()}`);
    } else {
      const newSearchParams = arg(createSearchParams(currentLocationRef.current));
      setInternalSearchParams(newSearchParams);
      navigate(`?${newSearchParams.toString()}`);
    }
  }, [navigate]);

  return [searchParams, setSearchParams];
}
