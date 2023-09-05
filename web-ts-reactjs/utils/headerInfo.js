const headersInfo = () => {
  let myData;
  if (typeof localStorage !== "undefined") {
    myData = localStorage.getItem("accessToken");
  }
  console.log(myData);
  return {
    Authorization: `Bearer ${JSON.parse(myData || null) || null}`,
    "Content-Type": "application/json",
  };
};
export { headersInfo };
