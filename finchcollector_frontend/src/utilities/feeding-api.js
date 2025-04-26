// feeding-api.js
import sendRequest from "./sendRequest";

export function finchFeedings(finchId) {
  return sendRequest(`/api/finches/${finchId}/feedings/`);
}

export function create(formData, finchId) {
  return sendRequest(`/api/finches/${finchId}/feedings/`, "POST", formData);
}
