function validateForm() {
  const form = document.querySelector('#form')
  const submitButton = document.querySelector('#submit-button')

  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.stopPropagation()
      event.preventDefault()
    }
  })

  submitButton.addEventListener('click', (event) => {
    form.classList.add('was-validated')
  })
}

validateForm()