import React, { useState } from 'react';
import { Card, Input, Button, Spin } from 'antd';
import { request, gql } from 'graphql-request';

const endpoint = 'https://chatgpt-graphql-worker.renektonchr.workers.dev/graphql'; // 替换为你的 Cloudflare Worker URL

const CHAT_MUTATION = gql`
  mutation Chat($message: String!, $conversationId: ID) {
    chat(message: $message, conversationId: $conversationId) {
      id
      text
      conversationId
    }
  }
`;

type ChatRole = 'user' | 'bot';
interface ChatMessage {
  role: ChatRole;
  content: string;
}

const ChatGPTPanel: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res: { chat: { id: string; text: string; conversationId: string } } = await request(endpoint, CHAT_MUTATION, {
        message: input,
        conversationId: conversationId,
      });
      setConversationId(res.chat.conversationId);
      setMessages([...newMessages, { role: 'bot', content: res.chat.text }]);
    } catch (e) {
      setMessages([...newMessages, { role: 'bot', content: '出错了，请稍后再试。' }]);
    }
    setLoading(false);
  };

  return (
    <Card title="ChatGPT 聊天" className="max-w-xl mx-auto mt-8">
      <div className="h-80 overflow-y-auto bg-gray-50 p-4 rounded mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={msg.role === 'user' ? 'bg-blue-100 text-blue-800 px-2 py-1 rounded' : 'bg-gray-200 text-gray-800 px-2 py-1 rounded'}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <Spin />}
      </div>
      <Input.TextArea
        rows={2}
        value={input}
        onChange={e => setInput(e.target.value)}
        onPressEnter={e => { if (!e.shiftKey) { e.preventDefault(); sendMessage(); } }}
        placeholder="请输入你的问题..."
        disabled={loading}
      />
      <Button
        type="primary"
        className="mt-2 w-full"
        onClick={sendMessage}
        loading={loading}
      >
        发送
      </Button>
    </Card>
  );
};

export default ChatGPTPanel;