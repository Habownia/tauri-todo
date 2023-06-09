import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { writeText, readText } from '@tauri-apps/api/clipboard';
import { message } from '@tauri-apps/api/dialog';

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
		return (
			<li
				key={index}
				onClick={async () => {
					//kopiuje element do schowka, a readText() pobiera ze schowka
					await writeText(elem);
				}}
			>
				{elem}
			</li>
		);
	});

	const [saveMessage, setSaveMessage] = useState('');

	async function save() {
		//! JSON musi mieć taki sam klucz jak w Ruscie argument (klucz w snake_case)
		setSaveMessage(await invoke('save_file', { data: todos }));
		// wysyła powiadomienie type: info|warning|error
		await message('Zapisano', { title: 'TODO', type: 'info' });

		//? ustawione żeby sprawdzić działanie timeouta (większa bajera)
		//? setSaveMessage('Zapisano!');
		// const timer = setTimeout(() => {
		// 	setSaveMessage('');
		// }, 2000);
		// return () => clearTimeout(timer);
	}

	return (
		<div>
			<h1>Todo App</h1>
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
			<div>
				<ol>{todosElements}</ol>
			</div>
			<h2>{saveMessage}</h2>
		</div>
	);
}

export default App;
