const nav = document.querySelector('.nav');
const navBtn = document.querySelector('.burger__btn');
const navItems = document.querySelectorAll('.nav-link');
const bars = document.querySelector('.fa-bars');
const scrollSpySections = document.querySelectorAll('.scroll-section');

const username = document.querySelector('#username');
const email = document.querySelector('#email');
const number = document.querySelector('#number');
const btnSend = document.querySelector('.btn-send');
const btnClose = document.querySelector('.close-btn');
const popup = document.querySelector('.popup');

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');
	formBox.classList.add('error');
	errorMsg.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === '') {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice()}`);
	}
};

const checkEmail = (email) => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'E-mail jest niepoprawny');
	}
};

const checkError = () => {
	const allInputs = document.querySelectorAll('.form-box');
	let errorCount = 0;

	allInputs.forEach((el) => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		popup.classList.add('show-popup');
	}
};

const close = () => {
	popup.classList.remove('show-popup');
};

const handleScrollSpy = () => {
	if (document.body.classList.contains('main-page')) {
		const sections = [];
		scrollSpySections.forEach((section) => {
			if (window.scrollY <= section.offsetTop + section.offsetHeight - 103) {
				sections.push(section.id);

				const activeSection = document.querySelector(
					`[href*="${sections[0]}"]`
				);

				navItems.forEach((item) => item.classList.remove('active'));

				activeSection.classList.add('active');
			}
		});
	}
};

const handleNav = () => {
	nav.classList.toggle('nav-active');
	bars.classList.toggle('btn-active');
	bars.classList.toggle('fa-x');
	document.body.classList.toggle('sticky-body');

	navItems.forEach((items) => {
		items.addEventListener('click', () => {
			nav.classList.remove('nav-active');
			bars.classList.remove('fa-x');
			document.body.classList.remove('sticky-body');
		});
	});
};

window.addEventListener('scroll', handleScrollSpy);
navBtn.addEventListener('click', handleNav);
btnClose.addEventListener('click', close);

btnSend.addEventListener('click', (e) => {
	e.preventDefault();

	checkForm([username, email, number]);
	checkError();
	checkEmail(email);
	checkLength(username, 3);
});
