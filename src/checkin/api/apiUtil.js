import { apiMap } from "./apiMap";

const axios = require("axios").default;

export const fetchSlots = async () => {
  const response = await axios.get(apiMap.slots);
  return response;
};

export const updateSlotData = async (data) => {
  const response = await axios.put(apiMap.slots, data);
  return response;
};

export const fetchMemberEnum = async () => {
  const response = await axios.get(apiMap.memberEnum);
  return response;
};
