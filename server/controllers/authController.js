const users = require("../models/users");
let id = 1;

module.exports = {
	login: (req, res) => {
		const { username, password } = req.body;
		let user = users.find(ele => {
			return ele.username === username && ele.password === password;
		});
		console.log(user);

		if (user) {
			console.log(user);
			req.session.user.username = user.username;
			res.status(200).send(req.session.user);
		} else {
			res.status(500).send("Unauthorized");
		}
	},
	register: (req, res) => {
		const { username, password } = req.body;
		users.push({ username, password, id });
		id++;
		req.session.user.username = username;
		res.status(200).send(req.session.user);
	},
	signout: (req, res) => {
		req.session.destroy();
		res.status(200).send(req.session);
	},
	getUser: (req, res) => {
		res.status(200).send(req.session.user);
	}
};
