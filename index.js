const container = document.getElementById('container');
const spinner = document.getElementById('spinner');

axios.interceptors.request.use((c) => {
	setSpinner(true);
	return c;
})

axios.interceptors.response.use((c) => {
	setTimeout(() => setSpinner(false), 500);
	return c.data;
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
	const toast = createElement('div', 'alert alert-danger', undefined, undefined, undefined, JSON.stringify(e));
	toast.setAttribute('role', 'alert');
	const wrapper = document.getElementById('toast');
	wrapper.innerHTML = '';
	wrapper.appendChild(toast);
}

function renderForm(s) {
	const nameLabel = createElement('label', { for: 'name', class: 'form-control' });
	const name = createElement('input', { type: 'text', value: s.name, name: 'name', class: 'form-control' });
	const nameGroup = createElement('div', { children: [nameLabel, name], class: 'form-group' });
	const form = createElement('form', { children: [nameGroup], class: 'form-control' });
	return form;
}

function editStudent(s) {
	console.log(s);
	clearContainer();
	/*container.appendChild(renderForm(s));*/
}

function renderStudent(student) {
	const h5 = createElement('h5', { text: `Name: ${student.name}`, class: 'card-title' });
	const p = createElement('p', { class: 'card-text', text: `Hi, my name is ${student.name}, I'm a ${student.species} and I'm ${student.age} years old!` });
	const btn = createElement('button', { class: 'btn btn-primary', onclick: () => editStudent(student), text: 'Edit me' });
	const body = createElement('div', { class: 'card-body', children: [h5, p, btn] })
	const img = createElement('img', { src: student.avatar, class: 'card-img-top' });
	console.log(img);
	console.log(body);
	const element = createElement('div', { class: 'card', style: "width: 18rem;", children: [img, body] });
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