const express = require('express');
const fs = require('fs');
const fetch = require('cross-fetch');
const app = express();

const APPLICATION_ID = fs.readFileSync('.token', 'utf8');

app.use(express.json());
app.get('/login', (req, res) => {
  const realm = req.query.realm;

  res.redirect(
    `https://api.worldoftanks.${realm}/wot/auth/login/?application_id=${APPLICATION_ID}&expires_at=600&redirect_uri=http://localhost:3000/authenticated/`
  );
});

app.post('/time', async (req, res) => {
  const { accessToken, accountId } = req.body;

  const json = await (
    await fetch(
      `https://api.worldoftanks.eu/wot/account/info/?application_id=350d62f4514e16a540067fa3750a3769&account_id=${accountId}&access_token=${accessToken}`
    )
  ).json();

  res.send(json);
});

app.use('/', express.static('assets'));
app.listen(3000);
