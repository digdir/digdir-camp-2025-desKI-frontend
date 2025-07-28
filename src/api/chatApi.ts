export type ChatRequestDTO = {
  question: string;
  previous: string[];
};

export type ChatResponseDTO = {
  answer: string;
};

export async function sendChatMessage(
  data: ChatRequestDTO,
  source: 'brukerstotte' | 'servicedesk',
): Promise<ChatResponseDTO> {
  const endpoint =
    source === 'servicedesk'
      ? 'http://localhost:8000/servicedesk'
      : 'http://localhost:8000/brukerstotte';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return await response.json();
}
