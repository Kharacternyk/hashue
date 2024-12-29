import {useEffect, useState} from "react";
import {toHex} from "../lib/to-hex";

export const useColorQuery = () => {
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [{ trimmedQueryString, queryBytes }, setQuery] =
    useState(getQueryFromUrl);
  const [queryString, setQueryString] = useState(trimmedQueryString);

  useEffect(() => {
    const restoreQueryString = () => {
      const query = getQueryFromUrl();
      setQuery(query);
      setQueryString(query.trimmedQueryString);
    };

    addEventListener("popstate", restoreQueryString);

    return () => {
      removeEventListener("popstate", restoreQueryString);
    };
  }, []);
  useEffect(() => {
    const token = { id: null };

    token.id = setTimeout(() => {
      token.id = null;

      const trimmedNewQueryString = queryString.trim();

      if (trimmedNewQueryString === trimmedQueryString) {
        return;
      }

      const newQueryBytes = encoder.encode(trimmedNewQueryString);
      const newPathname =
        newQueryBytes.length === 0
          ? "/"
          : `/${prefixSegments.join("/")}/${toHex(newQueryBytes)}`;
      const historyState = [null, "", newPathname];

      if (isFirstInteraction) {
        history.pushState(...historyState);
        setIsFirstInteraction(false);
      } else {
        history.replaceState(...historyState);
      }

      setQuery({
        queryBytes: newQueryBytes,
        trimmedQueryString: trimmedNewQueryString,
      });
    }, 100);

    return () => {
      if (token.id !== null) {
        clearTimeout(token.id);
      }
    };
  }, [queryString]);

  return {
    queryString,
    queryBytes,
    trimmedQueryString,
    setQueryString,
  };
};

const getQueryFromUrl = () => {
  const segments = getSegments(location.pathname);

  if (segments.length < prefixSegments.length + 1) {
    return emptyQuery;
  }

  for (let i = 0; i < prefixSegments.length; ++i) {
    if (segments[i] !== prefixSegments[i]) {
      return emptyQuery;
    }
  }

  const bytesHex = segments[prefixSegments.length];

  if (bytesHex.length % 2 > 0) {
    return emptyQuery;
  }

  const queryBytes = new Uint8Array(bytesHex.length / 2);

  for (let i = 0; i < queryBytes.length; ++i) {
    const byte = parseInt(bytesHex.slice(i * 2, i * 2 + 2), 16);

    if (isNaN(byte)) {
      return emptyQuery;
    }

    queryBytes[i] = byte;
  }

  let queryString;

  try {
    queryString = decoder.decode(queryBytes);
  } catch (_) {
    return emptyQuery;
  }

  const trimmedQueryString = queryString.trim();

  return {
    trimmedQueryString,
    queryBytes:
      trimmedQueryString === queryString
        ? queryBytes
        : encoder.encode(trimmedQueryString),
  };
};

const getSegments = (pathname) =>
  pathname.split("/").filter((segment) => segment.length > 0);
const prefixSegments = ["sha256"];
const emptyQuery = {
  trimmedQueryString: "",
  queryBytes: new Uint8Array(),
};
const codecParameters = ["utf-8", { fatal: true }];
const encoder = new TextEncoder(...codecParameters);
const decoder = new TextDecoder(...codecParameters);
