const express = require('express');
const webpush = require('web-push');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const VAPID_PUBLIC_KEY = 'BNZzDOwgQwNDbaoXbWqRAkB894ugc3xR1C3UXnPyewsPWSEdAbJ1THPy7hzOea_3pJsflLF_Nm4yMj4PbG44UsU';
const VAPID_PRIVATE_KEY = 'cWcrU2Myt2mIUM3-u1F4wyUBhwS_2vbCCGZqbQOD_bA';

webpush.setVapidDetails(
  'mailto:charlinhocjc@gmail.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

let subscriptions = [];

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/send-notification', async (req, res) => {
  const { title, body } = req.body;
  
  const notifications = subscriptions.map(subscription => {
    return webpush.sendNotification(subscription, JSON.stringify({
      title,
      body
    }));
  });

  try {
    await Promise.all(notifications);
    res.status(200).json({ message: 'Notificações enviadas com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar notificações:', error);
    res.status(500).json({ error: 'Falha ao enviar notificações' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});