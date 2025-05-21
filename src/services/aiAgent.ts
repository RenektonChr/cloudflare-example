interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const sendMessageToAgent = async (message: string): Promise<string> => {
  try {
    // TODO: 替换为实际的AI Agent API调用
    const response = await fetch('/api/ai-agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from AI Agent');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error communicating with AI Agent:', error);
    throw error;
  }
}; 