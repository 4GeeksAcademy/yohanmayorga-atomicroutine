const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: null,
			profile: JSON.parse(localStorage.getItem("profile")) || null,
			token: localStorage.getItem("token") || null,
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
					setStore({ "user": data.user })
					return true

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

					localStorage.setItem("token", data.token)
					setStore({ token: data.token })
					getActions().getProfile()

					return true;
				} catch (error) {
					return false
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
