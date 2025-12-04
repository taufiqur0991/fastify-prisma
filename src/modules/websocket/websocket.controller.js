const rooms = new Map();

function broadcast(roomName, message, sender = null) {
    const roomConnections = rooms.get(roomName);

    if (!roomConnections) {
        fastify.log.warn(`Room ${roomName} does not exist for broadcast.`);
        return;
    }

    roomConnections.forEach((connection) => {
        if (connection !== sender && connection.readyState === WebSocket.OPEN) {
            try {
                connection.send(message);
            } catch (error) {
                fastify.log.error(`Broadcast error in room ${roomName}:`, error);
                // Hapus koneksi yang gagal/error dari Set
                roomConnections.delete(connection);
                if (roomConnections.size === 0) {
                    rooms.delete(roomName); // Hapus ruangan jika sudah kosong
                }
            }
        }
    });
}

export async function websocketHandler(connection, request, fastify) {
  const roomName = request.params.room;
  const ip = request.headers.host;
  const { token } = request.query;

  if (!token) {
    console.log(`WebSocket: Token tidak ditemukan untuk koneksi ke ruangan ${roomName}`);
    connection.close(1001, 'Token tidak valid atau kadaluarsa');
    return;
  }

  let userPayload;

  try {
    // Verifikasi JWT
    userPayload = await fastify.jwt.verify(token);
    connection.username = userPayload.email;
    const identity = userPayload.email;
    // init room
    if (!rooms.has(roomName)) rooms.set(roomName, new Set());
    const room = rooms.get(roomName);
    room.add(connection);

    console.log(`${identity} joined room ${roomName}`);

    connection.roomName = roomName;

    connection.send(`Welcome to room ${roomName} (${room.size} users)`);

    broadcast(roomName, `${identity} joined`, connection);

    // incoming message
    connection.on("message", msg => {
      const text = msg.toString();
      const payload = JSON.stringify({
        room: roomName,
        user: identity,
        message: text
      });

      broadcast(roomName, payload, connection);
      if (connection.readyState === WebSocket.OPEN) {
          connection.send(`Echo in ${roomName}: ${text}`);
      }
    });

    // on close
    connection.on("close", () => {
      const r = connection.roomName;
      const username = connection.username;
      const clients = rooms.get(r);
      if (!clients) return;

      clients.delete(connection);

      broadcast(r, `${username} left room (${clients.size} remain)`);

      if (clients.size === 0) rooms.delete(r);
    });
  } catch (err) {
    console.log('WebSocket JWT Verification Error:', err.message);
    connection.close(1008, 'Token tidak valid atau kadaluarsa'); // Tutup koneksi dengan kode error
    return;
  }
}
