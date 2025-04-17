// consumer.js
const amqp = require("amqplib");

async function connect() {
  try {
    const amqpServer = "amqps://jvadtapj:SjhJuAwZtSac7EEgO0uIGeICZAaWkpeW@kebnekaise.lmq.cloudamqp.com/jvadtapj";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();

    await channel.assertQueue("jobs");

    channel.consume("jobs", (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Received job with input ${input.number}`);

      if (input.number == 7) {
        channel.ack(message);
      }
    });

    console.log("Waiting for messages...");
  } catch (ex) {
    console.error(ex);
  }
}

connect();
