const container = document.getElementById('container');
const spinner = document.getElementById('spinner');

axios.interceptors.request.use((c) => {
	setSpinner(true);
	return c;
})

axios.interceptors.response.use((c) => {
	setTimeout(() => setSpinner(false), 500);
	return c.data;
}, (e) => {
	if (e.response.status >= 400) {
		showErrorToast(e);
	}
	setSpinner(false);
	return e;
})

function setSpinner(show) {
	spinner.style.display = show ? 'block' : 'none';
}

function getUrl(s) {
	return `http://localhost:8000/${s}`;
}

function clearContainer() {
	container.innerHTML = '';
	container.style = '';
}

function createElement(tag, other) {
	const element = document.createElement(tag);
	other && Object.keys(other).forEach(key => {
		switch (key) {
			case 'text': element.appendChild(document.createTextNode(other[key])); break;
			case 'children': other[key].forEach(child => element.appendChild(child)); break;
			case 'onclick': element.onclick = other[key]; break;
			default: element.setAttribute(key, other[key]);
		}
	});
	return element;
}

function showErrorToast(e) {
	const toast = createElement('div', { class: 'alert alert-danger', text: e, role: 'alert' });
	const wrapper = document.getElementById('toast');
	wrapper.innerHTML = '';
	wrapper.appendChild(toast);
}

function getInputValue(id) {
	return document.getElementById(id).value;
}

const ids = ['name', 'avatar', 'age', 'grade', 'species'];

function getStudentFormValue() {
	const student = {};
	ids.forEach(id => student[id] = getInputValue(id));
	if (!student.avatar) {
		student.avatar = "file:///Users/cx02088/Downloads/avataaars.png";
	}
	return student;
}

function createStudent() {
	clearContainer();
	container.appendChild(renderForm());
}

function createInputGroup(type, value, name) {
	const label = createElement('label', { for: name, text: name[0].toUpperCase() + name.slice(1) });
	const input = createElement('input', { type: type, value: value, name: name, class: 'form-control', id: name });
	const group = createElement('div', { children: [label, input], class: 'form-group' });
	return group;
}

function renderForm(s) {
	const title = createElement('h1', { text: `${s ? 'Edit' : 'Create'} ${s ? s.name : 'student'}`, class: 'mt-10' });
	const inputs = ids.map(id => createInputGroup(['age', 'grade'].includes(id) ? 'number' : 'text', s ? s[id] : '', id));
	const button = createElement('button', { text: s ? 'Edit' : 'Create', onclick: (event) => s ? doEditStudent(event, s) : doCreateStudent(event), class: 'btn btn-primary' });
	const form = createElement('form', { children: [title, ...inputs, button] });
	return form;
}

function editStudent(s) {
	clearContainer();
	container.appendChild(renderForm(s));
}

function renderStudent(student) {
	const h5 = createElement('h5', { text: `Name: ${student.name}`, class: 'card-title' });
	const p = createElement('p', { class: 'card-text', text: `Hi, my name is ${student.name}, I'm a ${student.species} and I'm ${student.age} years old!` });
	const btn = createElement('button', { class: 'btn btn-primary', onclick: () => editStudent(student), text: 'Edit me' });
	const btn2 = createElement('button', { class: 'btn btn-danger ml-3', onclick: () => deleteStudent(student), text: 'Delete me' });
	const body = createElement('div', { class: 'card-body', children: [h5, p, btn, btn2] })
	const img = createElement('img', { src: student.avatar, class: 'card-img-top' });
	const element = createElement('div', { class: 'card', style: "width: 15rem;", children: [img, body] });
	return element;
}

function renderStudents(students) {
	clearContainer();
	container.style = 'display: flex; flex-wrap: wrap; justify-content: space-around';
	students.forEach(student => container.appendChild(renderStudent(student)));
}

function getStudents() {
	axios.get(getUrl('students'))
		.then(students => renderStudents(students))
		.catch(e => showErrorToast(e));
}

function doCreateStudent(e) {
	console.log("Complete your code");
}

function deleteStudent(s) {
	console.log("Complete your code");
}

function doEditStudent(e, s) {
	console.log("Complete your code");
}
