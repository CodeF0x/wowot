const authLinkElement = document.getElementById('auth-link-element');

authLinkElement.addEventListener('change', (e) => {
  authLinkElement.href = `/login?realm=${e.target.value}`;
});
