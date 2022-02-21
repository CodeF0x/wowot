const authLinkElement = document.getElementById('auth-link-element');
// set server region eu as default
sessionStorage.setItem('realm', 'eu');

document.getElementById('realm-selection').addEventListener('change', (e) => {
  const realm = e.target.value;
  
  sessionStorage.setItem('realm', realm);
  authLinkElement.href = `/login?realm=${realm}`;
});
