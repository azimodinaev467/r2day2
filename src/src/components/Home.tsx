import { useEffect, useState } from 'react'
import { useTodo } from './store/Todo.store'

const Home = () => {
  const { data, getData, deleteData, postData, editData } = useTodo();
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    getData()
  }, [])

  

  const handleStartEdit = (id: number, name: string) => {
    setEditId(id);
    setEditName(name);
  };

  const handleSaveEdit = (id: number) => {
    if (editName.trim()) {
      editData(id, editName);
      setEditId(null);
      setEditName('');
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditName('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <button type="submit">add</button>
      </form>

      {data.map((e) => (
        <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}>
          {editId === e.id ? (
            <>
              <input
                type="text"
                value={editName}
                onChange={(ev) => setEditName(ev.target.value)}
              />
              <button onClick={() => handleSaveEdit(e.id)}>save</button>
              <button onClick={handleCancelEdit}>cancel</button>
            </>
          ) : (
            <>
              <h1 style={{ margin: 0 }}>{e.name}</h1>
              <button onClick={() => deleteData(e.id)}>delete</button>
              <button onClick={() => handleStartEdit(e.id, e.name)}>edit</button>
            </>
          )}
        </div>
      ))}
    </>
  )
}

export default Home
