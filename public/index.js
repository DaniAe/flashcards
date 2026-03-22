const formContainer = document.getElementById('form_container');

function openDeckForm() {
  formContainer.classList.remove('d-none');
}

function removeDeckForm() {
  formContainer.classList.add('d-none');
}
