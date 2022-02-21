(async () => {
  const minutesOuput = document.getElementById('minutes');
  const hoursOuput = document.getElementById('hours');
  const daysOutput = document.getElementById('days');
  const nicknameOuput = document.getElementById('nickname');
  const logoutLink = document.getElementById('logout');
  const realm = sessionStorage.getItem('realm');
  let accessToken, accountId;

  const params = window.location.href.split('&');
  params.forEach((param) => {
    if (param.startsWith('access_token')) {
      accessToken = param.split('=')[1];
    } else if (param.startsWith('account_id')) {
      accountId = param.split('=')[1];
    }
  });

  if (!accessToken) {
    window.location.href = '/';
  }

  const json = await (
    await fetch(`/time`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken, accountId, realm }),
    })
  ).json();

  // who cares at this point
  if (json.error) {
    location.href = '/';
    return;
  }

  const nickName = json.data[accountId].nickname;
  const secondsWasted = json.data[accountId].private.battle_life_time;

  nicknameOuput.innerText = `Hello, ${nickName}!`;

  const minutesWasted = (secondsWasted / 60).toFixed(0);
  const hoursWasted = (minutesWasted / 60).toFixed(0);
  const daysWasted = (hoursWasted / 24).toFixed(0);

  minutesOuput.innerText = minutesWasted;
  hoursOuput.innerText = hoursWasted;
  daysOutput.innerText = daysWasted;

  logoutLink.href = `/logout?realm=${realm}&access_token=${accessToken}`;
})();
