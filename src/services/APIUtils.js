import axios from "axios";

import { API_BASE_URL } from "../constants";

export const getUnreadMessages = async () => {
  return axios.get(`${API_BASE_URL}/v1/messages/${8}/message`);
};

export const getAllMessages = async () => {
  return axios.get(`${API_BASE_URL}/v1/messages/${8}/message-all`);
};

export const getAllActors = async () => {
  return axios.get(`${API_BASE_URL}/v1/actors/all-actors`);
};

export const convertToRead = async (values) => {
  return axios.post(`${API_BASE_URL}/v1/messages/message-read`, values);
};

export const deleteMessage = async (values) => {
  return axios.delete(`${API_BASE_URL}/v1/messages`, { data: values });
};

export const createMessage = async (values) => {
  return axios.post(`${API_BASE_URL}/v1/messages`, values);
};
