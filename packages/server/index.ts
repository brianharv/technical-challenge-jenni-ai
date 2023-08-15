import express, { Response, NextFunction, Application } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app: Application = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  console.log('connection established');

  socket.on('send-text', (response: string) => {
    socket.broadcast.emit('text-received', response);
  });
});

io.on('disconnect', (socket: Socket) => {
  socket.emit('user disconnected');
});

app.get('/health', (_, res: Response, next: NextFunction) => {
  res.json({ data: 'health check' }).status(200);
  next();
});

server.listen(4000, () => console.log('Server running on port 4000'));
