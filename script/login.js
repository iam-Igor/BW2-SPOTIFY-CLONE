let email = 'team8@epicode.com'
let password = 'epicode2023'

const form = document.getElementById('login-form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const emailInput = document.getElementById('login-email')
  const passwordInput = document.getElementById('login-password')
  if (emailInput.value === email && passwordInput.value === password) {
    location.assign('main.html')
  } else {
    const loginalert = document.getElementsByClassName('loginalert')[0]
    loginalert.classList.remove('d-none')
  }
})
