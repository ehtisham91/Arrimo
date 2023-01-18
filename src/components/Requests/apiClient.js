import axios from "axios";

const apiClient = (url, method, data, headers) => {
  const config = {
    url,
    method,
    data,
    headers,
  };

  return new Promise(function (resolve, reject) {
    axios(config)
      .then((res) => resolve(res))
      .catch((err) => {
        reject(err);
      });
  });
};

export default apiClient;
