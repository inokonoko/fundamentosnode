const host = '127.0.0.1';
const port = 8086;
const nombreSensor = 'st101';

const enviaDatos = () => {
  fetch(`http://${host}:${port}`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      sensor: nombreSensor,
      temperatura: Math.random() * 29 - 5,
      fecha: new Date()
    })
  });

  setTimeout(enviaDatos, 9e5);
};

enviaDatos();

