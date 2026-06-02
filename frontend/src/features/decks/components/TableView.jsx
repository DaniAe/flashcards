export default function TableView({decks, editDeck, handleDelete}) {
  return (
    <div className='container d-flex flex-column'>
      <div className='row'>
        <div className='col'>
          <div className='table-responsive'>
            <table className='table table-striped rounded-top overflow-hidden mt-4'>
              <thead className='table-dark'>
                <tr>
                  <td></td>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Image URL</th>
                  <th>Cards</th>
                </tr>
              </thead>
              <tbody id='items'>
                {decks.map((deck) => (
                  <tr key={deck._id}>
                    <td>
                      <a onClick={() => editDeck(deck)}>
                        <i className='bi bi-pencil-square text-primary'></i>
                      </a>
                      &nbsp;
                      <a onClick={() => handleDelete(deck)}>
                        <i className='bi bi-trash-fill text-danger'></i>
                      </a>
                    </td>
                    <td>{deck.name}</td>
                    <td>{deck.description}</td>
                    <td>{deck.imgUrl}</td>
                    <td>{deck.cards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
