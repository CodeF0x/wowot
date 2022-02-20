const authLinkElement = document.getElementById('auth-link-element');

document.getElementById('realm-selection').addEventListener('change', (e) => {
  authLinkElement.href = `/login?realm=${e.target.value}`;
});
