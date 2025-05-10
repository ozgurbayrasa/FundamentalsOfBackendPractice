const http = require('http');
const PORT = 3000;


const server = http.createServer((req, res) => {
  if (req.url.startsWith('/smallfile')) {
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Small file content');
    }, 2000); 
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <body>
          <h1>Connection Pool Test</h1>
          <button onclick="startTest()">Start Fetch Test</button>
          <script>
            function startTest() {
              for (let i = 0; i < 10; i++) {
                fetch('/smallfile?i=' + i)
                  .then(res => console.log('Fetched file', i))
                  .catch(err => console.error('Error fetching', i, err));
              }
            }
          </script>
        </body>
      </html>
    `);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
