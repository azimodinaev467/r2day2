import { useState } from 'react'
import { useTodo } from '../store/Todo.store'

const Home = () => {
  const { data, deleteUser, addUser, editUser } = useTodo();
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editJob, setEditJob] = useState('');

  const handleAdd = () => {
    if (!name.trim()) return;
    addUser({
      id: Date.now(),
      name,
      job
    });
    setName('');
    setJob('');
  };

  const handleEdit = (e: { id: number, name: string, job: string }) => {
    setEditId(e.id);
    setEditName(e.name);
    setEditJob(e.job);
  };

  const handleSave = () => {
    if (!editName.trim()) return;
    editUser(editId!, editName, editJob);
    setEditId(null);
    setEditName('');
    setEditJob('');
  };

  return (
    <div>
      <div style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
        <input
          type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            fontSize: "14px"
          }}
        />
        <input type="text" placeholder="Job" value={job} onChange={(e) => setJob(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            fontSize: "14px"
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "8px 16px",
            backgroundColor: "#22c55e",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",

            fontSize: "14px",
            fontWeight: 500,
            transition: "background-color 0.2s"
          }}
        >
          Add
        </button>
      </div>

      {
        data.map((e) => {
          return (
            <div key={e.id}>
              <h1> {e.name}</h1>
              <p>{e.job}</p>

              {editId === e.id ? (
                <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
                  <input
                    type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
                    style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                  />
                  <input
                    type="text" value={editJob} onChange={(e) => setEditJob(e.target.value)}
                    style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                  />
                  <button
                    onClick={handleSave}
                    style={{
                      padding: "6px 14px",
                      backgroundColor: "#3b82f6",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: 500,
                      transition: "background-color 0.2s"
                    }}
                  >
                    save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEdit(e)}
                  style={{
                    padding: "6px 14px",
                    backgroundColor: "#f59e0b",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: 500,
                    transition: "background-color 0.2s"
                  }}
                >
                  edit
                </button>
              )}

              <button
                onClick={() => deleteUser(e.id)}
                style={{
                  padding: "6px 14px",
                  backgroundColor: "#ef4444",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",

                  fontSize: "14px",
                  fontWeight: 500,
                  transition: "background-color 0.2s"
                }}
              >
                delete
              </button>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home
