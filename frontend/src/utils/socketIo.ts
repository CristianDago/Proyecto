const BASE_URL = "http://localhost:3000"; // Cambia esto por la URL de tu backend

export const fetchData = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};
