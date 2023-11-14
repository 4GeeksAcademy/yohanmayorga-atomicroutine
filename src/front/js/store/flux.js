const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: [],
			profile: JSON.parse(localStorage.getItem("profile")) || null,
			token: localStorage.getItem("token") || null,
			journals: [],
			lists: [],
			todos: [],
			habits: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction

			createUser: async (user) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/create",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(user)
						})
					const data = await resp.json()
					//setStore({ "user": data.user })
					setStore({ ...store, user: [...store.user, ...data.user] })
					return true;
				} catch (error) {
					return false
				}
			},

			loginUser: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/token",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ email, password })
						})
					const data = await resp.json()
			
					if (data.token != "") {
						if (data.token != undefined) {
							localStorage.setItem("token", data.token)
							setStore({ token: data.token })
							getActions().getProfile()
							return true;
						}
					}
				} catch (error) {
					// Return an error message
					return { error: error.message };
				}
			},

			getProfile: async () => {
				let store = getStore()

				if (!store.token) {
					return false
				}
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/profile",
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								"Authorization": "Bearer " + store.token
							},
						})
					const data = await resp.json()

					localStorage.setItem("profile", JSON.stringify(data))

					setStore({ profile: data })
				} catch (error) {
					showError()
				}
			},

			logOut: () => {
				localStorage.removeItem("token", "profile")
				localStorage.removeItem("profile")
				setStore({ token: null, profile: null })
			},

			deleteJournal: async (journal_id) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/deletejournal", {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ journal_id }),
					});

					if (resp.status === 200) {
						// El diario se eliminó correctamente
						return true;
					} else {
						// Hubo un error al eliminar el diario
						throw new Error(resp.statusText);
					}
				} catch (error) {
					// Hubo un error al hacer el fetch
					return false;
				}
			},

			deleteHabit: async (habitId) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/deletehabit", {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ habitId }),
					});

					if (resp.status === 200) {
						// El hábito se eliminó correctamente
						return true;
					} else {
						// Hubo un error al eliminar el hábito
						throw new Error(resp.statusText);
					}
				} catch (error) {
					// Hubo un error al hacer el fetch
					return false;
				}
			},

			deleteList: async (listId) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/deletelist", {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ listId }),
					});

					if (resp.status === 200) {
						// La lista se eliminó correctamente
						return true;
					} else {
						// Hubo un error al eliminar la lista
						throw new Error(resp.statusText);
					}
				} catch (error) {
					// Hubo un error al hacer el fetch
					return false;
				}
			},

			deletetodo: async (todoId) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/deletetodo", {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ todoId }),
					});

					if (resp.status === 200) {
						// La lista se eliminó correctamente
						return true;
					} else {
						// Hubo un error al eliminar la lista
						throw new Error(resp.statusText);
					}
				} catch (error) {
					// Hubo un error al hacer el fetch
					return false;
				}
			},


			updateJournal: async (idJournal, textJournal) => {
				const store = getStore();
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/updatejournal`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ idJournal, textJournal }),
						}
					);
					const data = await resp.json();
					setStore({
						...store, journals: store.journals.map((journal) => {
							if (journal.id === idJournal) {
								return { ...journal, textJournal };
							} else {
								return journal;
							}
						}),
					});
					return true;
				} catch (error) {
					return false;
				}
			},

			markCompleted: async (taskId, completed) => {
				const store = getStore();
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/markcompleted`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ taskId, completed }),
						}
					);
					const data = await resp.json();
					setStore({
						...store, todos: store.todos.map((todo) => {
							if (todo.id === taskId) {
								return { ...todo, completed };
							} else {
								return todo;
							}
						}),
					});
					return true;
				} catch (error) {
					return false;
				}
			},

			markHabitCompleted: async (habitId, completed) => {
				const store = getStore();
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/markhabitcompleted`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ habitId, completed }),
						}
					);
					const data = await resp.json();
					setStore({
						...store, habits: store.habits.map((habit) => {
							if (habit.id === habitId) {
								return { ...habit, completed };
							} else {
								return habit;
							}
						}),
					});
					return true;
				} catch (error) {
					return false;
				}
			},

			createJournal: async (journal) => {
				const store = getStore()
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/createjournal",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								"Authorization": "Bearer " + store.token
							},
							body: JSON.stringify(journal)
						})
					const data = await resp.json()
					setStore({ ...store, journals: [...store.journals, ...data.journal] })
					return true
				} catch (error) {
					return false
				}
			},

			createList: async (list) => {
				const store = getStore()
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/createlist",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								"Authorization": "Bearer " + store.token
							},
							body: JSON.stringify(list)
						})
					const data = await resp.json()
					setStore({ ...store, lists: [...store.lists, data.list] })
					return true
				} catch (error) {
					return false}
			},

			createHabit: async (habitItem) => {
				const store = getStore()
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/createhabit",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								"Authorization": "Bearer " + store.token
							},
							body: JSON.stringify(habitItem)
						})
					const data = await resp.json()
					setStore({ ...store, habits: [...store.habits, data.habit] })
					return true
				} catch (error) {
					return false}
			},

			addTodo: async (todo, list_id) => {
				const store = getStore()
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/addtodo",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								"Authorization": "Bearer " + store.token
							},
							body: JSON.stringify({todo, list_id})
						})
					const data = await resp.json()
					console.log(data.todo)
					setStore({ ...store, todos: [...store.todos, data.todo] })
					return true
				} catch (error) {
					return console.log(error)}
			},

			getJournals: async () => {
				const store = getStore()
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/journals")
					const data = await resp.json()
					setStore({ ...store, journals: [...data] })
					return true;
				} catch (error) {
					console.log(error)
				}
			},

			getHabits: async () => {
				const store = getStore()
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/habits")
					const data = await resp.json()
					setStore({ ...store, habits: [...data] })
					return true;
				} catch (error) {
					console.log(error)
				}
			},

			getLists: async () => {
				const store = getStore()
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/lists")
					const data = await resp.json()
					setStore({ ...store, lists: [...data] })
					return true;
				} catch (error) {
					console.log(error)
				}
			},

			getTasks: async () => {
				const store = getStore()
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/tasks")
					const data = await resp.json()
					setStore({ ...store, todos: [...data] })
					return true;
				} catch (error) {
					console.log(error)
				}
			},






			

			// Default examples
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
