let swag = require("../models/swag");

module.exports = {
	add: (req, res) => {
		const { id } = req.params;
		const { user } = req.session;
		console.log(id);
		const index = swag.findIndex(ele => {
			return ele.id === +id;
		});
		if (index !== -1) {
			let selectedSwag = swag[index];
			user.cart.push(selectedSwag);
			user.total += selectedSwag.price;
		}
		res.status(200).send(user);
	},
	delete: (req, res) => {
		const { id } = req.params;
		const { user } = req.session;
		const index = user.cart.findIndex(ele => {
			return ele.id === +id;
		});
		let selectedSwag = swag.find(ele => ele.id === +id);
		if (index !== -1) {
			user.cart.user.cart.splice(index, 1);
			user.total -= selectedSwag.price;
		}
		res.status(200).send(user);
	},
	checkout: (req, res) => {
		const { user } = req.session;
		user.cart = [];
		user.total = 0;
		res.status(200).send(user);
	}
};
