import axios from 'axios';

const API_URL = 'http://192.168.221.176:3000';

export const fetchAboutDescription = async () => {
    const response = await axios.get(`${API_URL}/about`);
    console.log(response)
    return response.data;
};

export const fetchServices = async () => {
    const response = await axios.get(`${API_URL}/services`);
    return response.data; 
};
  
export const fetchProjects = async () => {
    const response = await axios.get(`${API_URL}/images`);
    return response.data; 
  };

export const fetchContactInfo = async () => {
    const response = await axios.get(`${API_URL}/contacts`); 
    return response.data; 
};

export const fetchProductsByType = async (type) => {
    const response = await axios.get(`${API_URL}/products/${type}`);
    return response.data;
};