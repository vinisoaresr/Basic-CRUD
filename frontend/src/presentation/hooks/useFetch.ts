import axios from "axios";
import { useState, useEffect } from "react";

abstract class fetchMethod {
  public static get GET (): string { return "GET"; }
  public static get POST (): string { return "POST"; }
}

function useFetch (path: string, method: fetchMethod, body: any) {
  const URL = 'localhost:3000' + path;
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState();
  const [error, setError] = useState();
  const [needRefresh, setNeedRefresh] = useState(false);

  useEffect(() => {
    setNeedRefresh(false);
    axios({
      url: URL,
      method: method ? method : "GET",
      data: body,
      headers: makeDefaultHeaders(),
    })
      .then(async (response) => {
        setValue(response.data);
      })
      .catch((error: Error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [path, needRefresh]);

  return { loading, value, error, setNeedRefresh };
}

function makeDefaultHeaders () {
  const header = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  };
  return header;
}

export default useFetch;
