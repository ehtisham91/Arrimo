import { getLocalStorage } from "../Common/utils";

const headers = {
  "Content-Type": "application/json",
};

const authenticatedRequestHeaders = {
  ...headers,
  token: getLocalStorage("token"),
};

const createReqObject = (url, method, header, data = {}) => {
  return {
    url: `${process.env.REACT_APP_API_URL}${url}`,
    headers: header,
    data: JSON.stringify(data),
    method,
  };
};

export const getAllEventsReq = () => {
  return createReqObject("/events/", "GET", headers, {});
};

export const getSingleEventReq = (uuid) => {
  return createReqObject(
    `/events/${uuid}`,
    "GET",
    authenticatedRequestHeaders,
    {}
  );
};

export const createEventReq = (data) => {
  return createReqObject("/events/", "POST", authenticatedRequestHeaders, data);
};

export const deleteEventReq = (uuid) => {
  return createReqObject(
    `/events/${uuid}`,
    "DELETE",
    authenticatedRequestHeaders,
    {}
  );
};

export const updateEventReq = (uuid, data) => {
  return createReqObject(
    `/events/${uuid}`,
    "PUT",
    authenticatedRequestHeaders,
    data
  );
};

export const getAllUsersReq = () => {
  return createReqObject("/users/", "GET", headers, {});
};

export const getSingleUserReq = (uuid) => {
  return createReqObject(
    `/users/${uuid}`,
    "GET",
    authenticatedRequestHeaders,
    {}
  );
};
export const createUserReq = (data) => {
  return createReqObject("/users/", "POST", authenticatedRequestHeaders, data);
};
export const deleteUserReq = (uuid) => {
  return createReqObject(
    `/users/${uuid}`,
    "DELETE",
    authenticatedRequestHeaders,
    {}
  );
};
export const updateUserReq = (uuid, data) => {
  return createReqObject(
    `/users/${uuid}`,
    "PUT",
    authenticatedRequestHeaders,
    data
  );
};

export const loginReq = (data) => {
  return createReqObject(`/users/login`, "POST", headers, data);
};
