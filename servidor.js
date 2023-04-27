const http = require('http');
const fs = require('fs');

const host = '127.0.0.1';
const port = 8086;

const server = http.createServer((req, res) => {
  if (req.url == '/' && req.method == 'POST') {
    let body = [];
    req.on('data', bloque => {
      body.push(bloque);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      try {
        body = JSON.parse(body);
        if (body.sensor && typeof(body.sensor) == 'string' &&
            body.temperatura && typeof(body.temperatura) == 'number' &&
            body.fecha && Date.parse(body.fecha)) {
          let datos = {
            sensor: body.sensor,
            temperatura: body.temperatura,
            fecha: body.fecha
          }

          fs.writeFile('lecturas.json',JSON.stringify(datos) + ',\n', {flag:'a+'}, error => {
            if (error) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'text/html');
              res.end('<h1>500 - Error escribiendo en archivo');
            } else {
              res.statusCode = 200;
              res.end();
            }
          });
        } else {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'text/html');
          res.end('<h1>400 - Falta algún campo o no es válido');
        }
      } catch (error) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>400 - JSON no válido');
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>404 - Ruta no válida');
  }
});

server.listen(port, host, () => {
  console.log(`Servidor activo en http://${host}:${port}`);
});
