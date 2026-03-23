async function readData() {
  let res = await fetch('/items');
  let lstDecks = await res.json();

  let output = '';
  for (i = 0; i < lstDecks.length; i++) {
    output += `
    <tr>
      <td>
        <i class="bi bi-pencil-square text-primary"></i>
        &nbsp;
        <i class="bi bi-trash-fill text-danger"></i>
      </td>
      <td> ${lstDecks[i].name} </td>
      <td> ${lstDecks[i].description} </td>
      <td> ${lstDecks[i].imgUrl} </td>
      <td> ${lstDecks[i].cards} </td>
    </tr>
    `;
  }

  document.getElementById('items').innerHTML = output;
}

readData();

const formContainer = document.getElementById('form_container');

function openDeckForm() {
  formContainer.classList.remove('d-none');
}

function removeDeckForm() {
  formContainer.classList.add('d-none');
}
