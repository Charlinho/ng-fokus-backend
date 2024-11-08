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

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});