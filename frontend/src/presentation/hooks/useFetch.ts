import axios from "axios";
import { useState, useEffect } from "react";
import { EmployeeModel } from "../pages/home-page";

export abstract class Method {
  public static get GET (): string { return "GET"; }
  public static get POST (): string { return "POST"; }
}

interface FetchData {
  value: EmployeeModel[]
  loading: boolean
  error: boolean
  setNeedRefresh: Function
}

function useFetch (path: string, method: string, body: any): FetchData {
  const URL = 'http://localhost:3000' + path;
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const [needRefresh, setNeedRefresh] = useState<boolean>(false);

  useEffect(() => {
    setNeedRefresh(false);
    axios({
      url: URL,
      method: method ? method : "GET",
      data: body,
      headers: makeDefaultHeaders()
    })
      .then(async (response) => {
        setValue(response.data);
      })
      .catch((error: Error) => {
        setError(true);
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
