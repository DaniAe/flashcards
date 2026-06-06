import TrashIcon from '../../../assets/icons/TrashIcon';
import EditIcon from '../../../assets/icons/EditIcon';

export default function TableView({ decks, editDeck, handleDelete }) {
  return (
    <div role='table' className=''>
      {/* rowgroup === thead */}
      <div
        role='rowgroup'
        className='w-full rounded-full bg-black text-white mb-6 py-2 px-3'
      >
        <div role='row' className='grid grid-cols-[1fr_1fr_10fr_10fr_2fr]'>
          <div role='columnheader'>Edit</div>
          <div role='columnheader'>Delete</div>

          <div role='columnheader'>Name</div>
          <div role='columnheader'>Description</div>
          <div role='columnheader'>Cards</div>
        </div>
      </div>

      {/* rowgroup === tbody */}
      <div role='rowgroup' className='w-full'>
        {decks.map((deck) => (
          <div
            role='row'
            className='grid grid-cols-[1fr_1fr_10fr_10fr_2fr] place-items-center rounded-full shadow-[0_0.1rem_0.5rem_rgba(0,0,0,0.2)] mb-6 p-3'
            key={deck._id}
          >
            <div role='cell'>
              <a onClick={() => editDeck(deck)}>
                <EditIcon />
              </a>
            </div>
            <div role='cell'>
              <a onClick={() => handleDelete(deck)}>
                <TrashIcon />
              </a>
            </div>

            <div role='cell'>{deck.name}</div>
            <div role='cell'>{deck.description}</div>
            <div role='cell'>{deck.cards}</div>
          </div>
        ))}
      </div>

      {/* <table className='mt-4 min-w-full border-separate border-spacing-y-4'>
        <thead className='text-white'>
          <tr className='bg-black'>
            <td className='rounded-l-full p-2'></td>
            <th className='p-2'>Name</th>
            <th className='p-2'>Description</th>
            <th className='rounded-r-full p-2'>Cards</th>
          </tr>
        </thead>

        <tbody id='items'>
          {decks.map((deck) => (
            <tr
              key={deck._id}
              className='bg-white shadow-sm border-2 border-gray-100'
            >
              <td className='rounded-l-full p-2'>
                <a onClick={() => editDeck(deck)}>
                  <EditIcon />
                </a>
                &nbsp;
                <a onClick={() => handleDelete(deck)}>
                  <TrashIcon />
                </a>
              </td>
              <td className='p-2'>{deck.name}</td>
              <td className='p-2'>{deck.description}</td>
              <td className='rounded-r-full p-2 bg-amber-200'>{deck.cards}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}
