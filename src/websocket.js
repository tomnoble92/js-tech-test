
export function socketPromise(ws) {
  return new Promise(function(resolve, reject) {
      ws.onopen = function() {
          resolve(ws);
      };
      ws.onerror = function(err) {
          reject(err);
      };
  });
}