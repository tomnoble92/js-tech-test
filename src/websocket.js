
export function socketPromise(ws) {
  return new Promise(function(resolve, reject) {
    ws = new WebSocket('ws://localhost:8889/', 'echo-protocol')
      ws.onopen = function() {
          resolve(ws);
      };
      ws.onerror = function(err) {
          reject(err);
      };
  });
}