const TaskTable = require("../models/task.model");

const getAllTasks = async (req, res) => {
	try {
		//CRUD functions return promise , thats why i put try,catch to resolve it ..
		const allTasks = await TaskTable.findAll();
		res.send(allTasks);
		console.log(allTasks);
	} catch (error) {
		console.error(error);
	}
};

const postNewTask = async (req, res) => {
	const { title, description } = req.body;
	console.log("Received new task request:", title);
	try {
		const newTask = await TaskTable.create({ title, description });
		res.json(newTask.toJSON()); // when i added this line , TaskTable table got connected to pgadmin and i could see the table there !!!
		console.log("new task created : ", newTask);
		res.redirect("/tasks");
	} catch (error) {
		console.error(error);
	}
};

// const deleteTask = async (req, res) => {
// 	const taskID = req.params.id
// 	console.log("dddsadkajodjowajdiajfialfdnklnlnlkn");
// }
const deleteTask = async (req, res) => {
	const taskID = req.params.id;
	try {
		const numDeleted = await TaskTable.destroy({ where: { id: taskID } });
		if (numDeleted === 1) {
			// Task was deleted successfully
			res.sendStatus(204); // HTTP status code 204 means "No Content"
		} else {
			// Task was not found
			res.sendStatus(404); // HTTP status code 404 means "Not Found"
		}
	} catch (error) {
		console.error('Failed to delete task:', error);
		res.sendStatus(500); // HTTP status code 500 means "Internal Server Error"
	}
}

module.exports = { postNewTask, getAllTasks, deleteTask };
