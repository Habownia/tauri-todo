import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import './App.css';

function App() {
	const [todos, setTodos] = useState([]);

	const [input, setInput] = useState('');

	function addTodos(e) {
		e.preventDefault();
		// jeśli nie jest pusty to dodaje
		if (input.trim().length) {
			setTodos((prev) => [...prev, input]);
		}
	}

	// tworzy elementy tej todolisty
	const todosElements = todos.map((elem, index) => {
		return <li key={index}>{elem}</li>;
	});

	const [saveMessage, setSaveMessage] = useState('');

	async function save() {
		//! JSON musi mieć taki sam klucz jak w Ruscie argument (klucz w snake_case)
		setSaveMessage(await invoke('save_file', { data: todos }));

		//? ustawione żeby sprawdzić działanie timeouta (większa bajera)
		//? setSaveMessage('Zapisano!');
		const timer = setTimeout(() => {
			setSaveMessage('');
		}, 2000);
		return () => clearTimeout(timer);
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
			<h2>{saveMessage}</h2>
		</div>
	);
}

export default App;
