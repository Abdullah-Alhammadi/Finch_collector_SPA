import sendRequest from "./sendRequest";
const BASE = "/api/toys/";

export function index() {
  return sendRequest(BASE);
}

export function show(id) {
  return sendRequest(`${BASE}${id}/`);
}


export function create(data) {
  return sendRequest(BASE, "POST", data);
}


export function update(id, data) {
  return sendRequest(`${BASE}${id}/`, "PUT", data);
}


export function deleteToy(id) {
  return sendRequest(`${BASE}${id}/`, "DELETE"); 
}
