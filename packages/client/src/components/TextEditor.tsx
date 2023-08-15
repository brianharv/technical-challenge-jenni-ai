import React, {useState, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

const TextEditor: React.FC = (): JSX.Element => {
  const [socket, setSocket] = useState<Socket>();
  const [textInput, setTextInput] = useState<string>('');

  // Handle connection
  useEffect(() => {
    const connection = io('http://localhost:4000')
    setSocket(connection)

    return () => {
      connection.disconnect()
    }
  }, []);

  // Send textarea input to server for broadcast
  useEffect(() => {
    if (!socket) return

    socket?.emit('send-text', textInput)
  }, [textInput]);

  // Handle updating client with broadcast from server
  useEffect(() => {
    if (!socket) return

    const handleTextReceived = (updates:string) => {
      setTextInput(updates)
    }

    socket.on('text-received', handleTextReceived)

    return () => {
      socket.off('text-received', handleTextReceived)
    }
  });

  return (
    <textarea
      onChange={(e) => setTextInput(e.target.value)}
      value={textInput}
      style={{"width": "500px", "height": "500px"}}
    />
  )
};

export default TextEditor;