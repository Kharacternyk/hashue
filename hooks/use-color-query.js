import {useEffect, useState} from "react";
import {toHex} from "../functions/to-hex";

export const useColorQuery = () => {
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [{ queryString, trimmedQueryString, queryBytes }, setQuery] =
    useState(getQueryFromUrl);

  useEffect(() => {
    const restoreQueryString = () => {
      setQuery(getQueryFromUrl());
    };

    addEventListener("popstate", restoreQueryString);

    return () => {
      removeEventListener("popstate", restoreQueryString);
    };
  }, []);

  return {
    queryString,
    queryBytes,
    trimmedQueryString,
    setQueryString: (newQueryString) => {
      const trimmedNewQueryString = newQueryString.trim();

      if (trimmedNewQueryString === trimmedQueryString) {
        setQuery({
          queryBytes,
          queryString: newQueryString,
          trimmedQueryString,
        });
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
        queryString: newQueryString,
        queryBytes: newQueryBytes,
        trimmedQueryString: trimmedNewQueryString,
      });
    },
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
    queryString: trimmedQueryString,
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
  queryString: "",
  trimmedQueryString: "",
  queryBytes: new Uint8Array(),
};
const codecParameters = ["utf-8", { fatal: true }];
const encoder = new TextEncoder(...codecParameters);
const decoder = new TextDecoder(...codecParameters);
