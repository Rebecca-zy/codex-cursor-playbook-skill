const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const successMessage = document.getElementById('successMessage');
const togglePasswordBtn = document.getElementById('togglePassword');
const loginBtn = document.getElementById('loginBtn');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(el, msg) {
  el.textContent = msg;
}

function clearMessages() {
  setError(emailError, '');
  setError(passwordError, '');
  successMessage.textContent = '';
}

function validate() {
  let ok = true;
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!emailRegex.test(email)) {
    setError(emailError, 'Please enter a valid email address.');
    ok = false;
  }

  if (password.length < 6) {
    setError(passwordError, 'Password must be at least 6 characters.');
    ok = false;
  }

  return ok;
}

function setLoading(loading) {
  loginBtn.classList.toggle('loading', loading);
  loginBtn.disabled = loading;
  loginBtn.querySelector('.btn-text').textContent = loading ? 'Signing in...' : 'Login';
}

togglePasswordBtn.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
  togglePasswordBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  togglePasswordBtn.setAttribute('aria-pressed', String(isPassword));
});

emailInput.addEventListener('input', () => {
  if (emailError.textContent) setError(emailError, '');
});

passwordInput.addEventListener('input', () => {
  if (passwordError.textContent) setError(passwordError, '');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearMessages();

  if (!validate()) return;

  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    successMessage.textContent = 'Success! You are signed in.';
    form.reset();
    passwordInput.type = 'password';
    togglePasswordBtn.textContent = 'Show';
    togglePasswordBtn.setAttribute('aria-label', 'Show password');
    togglePasswordBtn.setAttribute('aria-pressed', 'false');
  }, 1200);
});
