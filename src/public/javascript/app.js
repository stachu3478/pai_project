window.onload = function () {
  const logoutButton = document.getElementsByClassName('logout-button')[0]

  logoutButton.addEventListener('click', () => {
    fetch({ url: '/users/sessions', method: 'delete' })
  })
}