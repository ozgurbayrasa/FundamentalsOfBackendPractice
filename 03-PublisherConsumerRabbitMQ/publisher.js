// publisher.js

const amqp = require("amqplib");

const msg = { number: process.argv[2] };

async function connect() {
  try {
    const amqpServer = "amqps://jvadtapj:SjhJuAwZtSac7EEgO0uIGeICZAaWkpeW@kebnekaise.lmq.cloudamqp.com/jvadtapj";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();

    await channel.assertQueue("jobs");
    await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));

    console.log(`Job sent successfully ${msg.number}`);

    await channel.close();
    await connection.close();
  } catch (ex) {
    console.error(ex);
  }
}

connect();
