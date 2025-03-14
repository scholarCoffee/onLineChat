const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
const cors = require('cors');

app.use(cors());

const MAX_USERS = 50;
let onlineUsers = [];

io.on('connection', (socket) => {
    if (onlineUsers.length >= MAX_USERS) {
        socket.emit('room-full');
        socket.disconnect();
        return;
    }

    socket.on('join', (nickname) => {
        const user = { id: socket.id, nickname };
        onlineUsers.push(user);
        io.emit('user-joined', user);
        io.emit('online-users', onlineUsers);
    });

    socket.on('send-message', (message) => {
        io.emit('receive-message', message);
    });

    socket.on('send-image', (imageData) => {
        io.emit('receive-image', imageData);
    });

    socket.on('disconnect', () => {
        const index = onlineUsers.findIndex(user => user.id === socket.id);
        if (index!== -1) {
            const disconnectedUser = onlineUsers.splice(index, 1)[0];
            io.emit('user-left', disconnectedUser);
            io.emit('online-users', onlineUsers);
        }
    });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log(`Server running on port ${port}`);
});