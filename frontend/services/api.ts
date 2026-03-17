// services/api.ts
const API = "http://localhost:5000/api/product";

export const getProducts = async () => {
  return fetch(API).then(res => res.json());
};

export const createProduct = async (data: FormData) => {
  return fetch(API, {
    method: "POST",
    body: data
  });
};