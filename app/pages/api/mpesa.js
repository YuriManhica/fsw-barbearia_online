import axios from "axios";
import { getAccessToken } from "";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { amount, phone, reference, wallet_id } = req.body;

  try {
    const token = await getAccessToken();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_E2PAYMENTS_BASE_URL}/v1/c2b/mpesa-payment/${wallet_id}`,
      {
        client_id: process.env.NEXT_PUBLIC_E2PAYMENTS_CLIENT_ID,
        amount,
        phone,
        reference,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Erro ao realizar transação:", error.response?.data || error);
    res.status(500).json({ message: "Erro ao processar a transação" });
  }
}
