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

function createElement(tag, className, style, onClick, children, text, src) {
	const element = document.createElement(tag);
	element.className = className;
	element.style = style;
	if (onClick) element.onclick = onClick;
	if (children) children.forEach(child => element.appendChild(child));
	if (text) element.appendChild(document.createTextNode(text));
	if (src) element.src = src;
	return element;
}

function showErrorToast(e) {
	const toast = createElement('div', 'alert alert-danger', undefined, undefined, undefined, JSON.stringify(e));
	toast.setAttribute('role', 'alert');
	const wrapper = document.getElementById('toast');
	wrapper.innerHTML = '';
	wrapper.appendChild(toast);
}

function editStudent(s) {
	console.log(s);
}

function renderStudent(student) {
	const h5 = createElement('h5', 'card-title', undefined, undefined, undefined, `Name: ${student.name}`);
	const p = createElement('p', 'card-text', undefined, undefined, undefined, `Hi, my name is ${student.name}, I'm a ${student.species} and I'm ${student.age} years old!`);
	const btn = createElement('button', 'btn btn-primary', undefined, () => editStudent(student), undefined, 'Edit me');
	const body = createElement('div', 'card-body', undefined, undefined, [h5, p, btn])
	const img = createElement('img', 'card-img-top', undefined, undefined, undefined, undefined, student.avatar);
	console.log(img);
	console.log(body);
	const element = createElement('div', 'card', "width: 18rem;", undefined, [img, body]);
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