import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewStack] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput= useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewStack("");
    taskInput.current?.focus()
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i,1);
    setTasks(newTasks)
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="cold-ls-6 offset-ls-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewStack(e.target.value)}
                  value={newTask}
                  className="form-control"
                  ref={taskInput}
                  autoFocus
                />
                <button className="btn btn-success w-100 mt-4">Save</button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => (
            <div className="card card-body mt-2" key={i}>
              <h2 className="text-center mb-4" style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h2>
              <div className="d-flex justify-content-center gap-5 flex-wrap">
                <button
                  className="btn btn-secondary px-5 mx-5"
                  onClick={() => toggleDoneTask(i)}
                >
                  {t.done ? "✓" : "✗"}
                </button>
                <button
                  className="btn btn-danger px-5 mx-5"
                  onClick={() => removeTask(i)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
