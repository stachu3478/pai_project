window.onload = function () {
  const passwordInput = document.getElementsByName('password')[0]
  const repeatPasswordInput = document.getElementsByName('password')[0]
  const submitInput = document.querySelector('button[type="submit"]')

  function passwordChanged() {
    const passwordOk = passwordInput.value === repeatPasswordInput.value && passwordInput.value
    submitInput.disabled = !passwordOk
  }

  passwordInput.addEventListener('change', passwordChanged)
  repeatPasswordInput.addEventListener('change', passwordChanged)
}