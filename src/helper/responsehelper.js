const send = (res, responseData, data = {}, pageData = {}) => {
  const { code, message } = responseData;

  return res.status(code || 500).send({
    responseCode: code || 500,
    responseMessage: message || "Something went wrong",
    pageData: pageData,
    responseData: data,
  });
};

const setErrmsg = (responseObj, customMsg = "") => {
  return {
    code: responseObj?.code || 500,
    message: customMsg || responseObj?.message || "Error",
  };
};

export { send, setErrmsg };