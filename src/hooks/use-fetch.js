// import { csvToJson } from "convert-csv-to-json";
import { useCallback, useEffect, useReducer, useState } from "react";
import { csvToJSON } from "../utils/functions";

const initalState = {
  status: "fetching",
  error: null,
  data: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return { ...state, status: "fetching", error: null };
    case "SUCCESS":
      return { ...state, status: "success", error: null, data: action.payload };
    case "FAILED":
      return { ...state, status: "failed", error: action.payload, data: [] };
    default:
      return state;
  }
};
function useFetch({ activeTab, openedTabs }) {
  const [state, dispatch] = useReducer(reducer, initalState);

  const [isRefetch, setIsRefetch] = useState(false);

  const handleRefetch = () => {
    setIsRefetch(true);
  };
  const fetchFile = useCallback(() => {
    dispatch({ type: "PENDING" });

    // Check if the data is already cached.
    const cache = JSON.parse(sessionStorage.getItem("queries") || "{}");

    if (cache[activeTab] && !isRefetch) {
      dispatch({ type: "SUCCESS", payload: cache[activeTab] });
      return;
    }

    fetch(
      `https://api.github.com/repos/graphql-compose/graphql-compose-examples/contents/examples/northwind/data/csv/${activeTab}.csv?ref=master`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const results = csvToJSON(data.content);

        dispatch({ type: "SUCCESS", payload: results });

        // Cache Results in session storage
        cache[activeTab] = results;
        sessionStorage.setItem("queries", JSON.stringify(cache));
      })
      .catch((error) => dispatch({ type: "FAILED", payload: error.message }))
      .finally(() => setIsRefetch(false));
  }, [activeTab, isRefetch]);

  useEffect(() => {
    // only fetch file when it's confirmed to be opened
    openedTabs.includes(activeTab) && fetchFile();
  }, [activeTab, openedTabs, fetchFile]);

  return { ...state, refetch: handleRefetch };
}

export default useFetch;
