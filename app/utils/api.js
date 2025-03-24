import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_E2PAYMENTS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Função para gerar um token de acesso
export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_E2PAYMENTS_BASE_URL}/oauth/token`,
      {
        grant_type: "client_credentials",
        client_id: process.env.NEXT_PUBLIC_E2PAYMENTS_CLIENT_ID,
        client_secret: process.env.E2PAYMENTS_CLIENT_SECRET,
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Erro ao gerar token de acesso:", error);
    throw error;
  }
};

export default api;
