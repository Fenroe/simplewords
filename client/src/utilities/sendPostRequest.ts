interface IValues {
  email?: string;
  password?: string;
}

interface Data {
  account?: object;
  credentials?: object[];
  credential?: object;
  accessToken?: string;
  refreshToken?: string;
}

interface ResponseData {
  success: boolean;
  message: string;
  data?: Data;
}

/**Send a POST request to a specified endpoint and return the data in JSON format */
export const sendPostRequest = async (values: IValues, endpoint: string) => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
