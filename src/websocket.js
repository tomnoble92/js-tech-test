

  export const socketPromise = () => new Promise((resolve,socket) => {
    socket = new WebSocket('ws://localhost:8889/', 'echo-protocol')
    socket.onopen = () => {
      resolve(socket)
    }
  })