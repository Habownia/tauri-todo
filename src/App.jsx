import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import './App.css';

function App() {
	const [todos, setTodos] = useState([]);
	const [name, setName] = useState('');
	const [greetMsg, setGreetMsg] = useState('');

	//! tauri
	async function save() {
		// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
		setGreetMsg(await invoke('greet', { name }));
	}
	//!

	const [input, setInput] = useState('');

	function addTodos(e) {
		e.preventDefault();
		if (input.trim().length) {
			setTodos((prev) => [...prev, input]);
		}
	}

	const todosElements = todos.map((elem, index) => {
		return <li key={index}>{elem}</li>;
	});

	function save() {
		invoke('save_file', { todos });
	}

	return (
		<div>
			<h1>Todo App</h1>
			<ol>{todosElements}</ol>
			<form onSubmit={addTodos}>
				<input
					type='text'
					value={input}
					onChange={(e) => {
						console.log(e.target.value);
						setInput(e.target.value);
					}}
				/>
				<button type='submit'>Add</button>
				<button type='button' onClick={save}>
					Save on PC
				</button>
			</form>
		</div>
	);

	// return (
	//   <div className="container">
	//     <h1>Welcome to Tauri!</h1>

	//     <div className="row">
	//       <a href="https://vitejs.dev" target="_blank">
	//         <img src="/vite.svg" className="logo vite" alt="Vite logo" />
	//       </a>
	//       <a href="https://tauri.app" target="_blank">
	//         <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
	//       </a>
	//       <a href="https://reactjs.org" target="_blank">
	//         <img src={reactLogo} className="logo react" alt="React logo" />
	//       </a>
	//     </div>

	//     <p>Click on the Tauri, Vite, and React logos to learn more.</p>

	//     <div className="row">
	//       <form
	//         onSubmit={(e) => {
	//           e.preventDefault();
	//           greet();
	//         }}
	//       >
	//         <input
	//           id="greet-input"
	//           onChange={(e) => setName(e.currentTarget.value)}
	//           placeholder="Enter a name..."
	//         />
	//         <button type="submit">Greet</button>
	//       </form>
	//     </div>

	//     <p>{greetMsg}</p>
	//   </div>
	// );
}

export default App;
