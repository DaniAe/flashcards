let lstDecks = [];

async function readData() {
  let res = await fetch('/items');
  lstDecks = await res.json();

  let output = '';
  for (i = 0; i < lstDecks.length; i++) {
    output += `
    <tr>
      <td>
        <a onclick="editDeck(${i})">
          <i class="bi bi-pencil-square text-primary"></i>
        </a>
        &nbsp;
        <a href="/deleteitem/${lstDecks[i].name}"><i class="bi bi-trash-fill text-danger"></i></a>
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

  document.getElementById('deck_name').value = '';
  document.getElementById('deck_desc').value = '';
  document.getElementById('img_url').value = '';
  document.getElementById('original_name').value = '';

  document.querySelector('.create-new-deck').textContent = 'Add Deck';
}

function removeDeckForm() {
  formContainer.classList.add('d-none');
}

function editDeck(index) {
  openDeckForm();
  document.getElementById('deck_name').value = lstDecks[index].name;
  document.getElementById('deck_desc').value = lstDecks[index].description;
  document.getElementById('img_url').value = lstDecks[index].imgUrl;
  document.getElementById('original_name').value = lstDecks[index].name;

  document.querySelector('.create-new-deck').textContent = 'Update Deck';
}
