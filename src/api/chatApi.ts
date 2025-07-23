export type ChatRequestDTO = {
  question: string;
};

export type ChatResponseDTO = {
  answer: string;
};

export async function sendChatMessage(
  data: ChatRequestDTO,
): Promise<ChatResponseDTO> {
  const response = await fetch('http://localhost:8000/chatbot', {
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
