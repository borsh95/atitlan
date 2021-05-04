const search = document.querySelector('.search');
const searchIc = document.querySelector('.search__ic');

searchIc.onclick = (e) => {
	search.classList.toggle('active');
}

document.addEventListener('click', closeSearch);

function closeSearch(e) {
	if (!e.target.closest('.search')) {
		search.classList.remove('active');
	}
}

if (document.querySelector('.search')) {
	const search = document.querySelector('.search');
	const searchIc = document.querySelector('.search__ic');

	searchIc.onclick = (e) => {
		search.classList.toggle('active');
	}

	document.addEventListener('click', closeSearch);

	function closeSearch(e) {
		if (!e.target.closest('.search')) {
			search.classList.remove('active');
		}
	}
}

burgerMenu()
function burgerMenu() {
	const hamburgerBtn = document.querySelector('.hamburger');
	const burgerBlock = document.querySelector('.header__burger');
	const bodyEl = document.querySelector('body');

	hamburgerBtn.addEventListener('click', workMenu);

	window.addEventListener('resize', function () {
		if (document.documentElement.clientWidth > 1024 && burgerBlock.classList.contains('active')) {
			workMenu();
		}
	});

	function workMenu() {
		hamburgerBtn.classList.toggle('active');

		let coordsHamburgerBlock = burgerBlock.getBoundingClientRect();
		let isActive = hamburgerBtn.classList.contains('active');

		burgerBlock.style.height = (isActive) ? `calc(100vh - ${coordsHamburgerBlock.top}px)` : '';
		burgerBlock.classList[isActive ? 'add' : 'remove']('active');
		bodyEl.style.overflow = (isActive) ? 'hidden' : '';
	}
}

//map 
if (document.querySelector('#location')) {
	ymaps.ready(init);
	function init() {
		// Создание карты.
		var myMap = new ymaps.Map("location", {
			controls: [],
			center: [53.92967011903505, 27.384130772488792],
			zoom: 14
		});

		myMap.behaviors.disable('drag');
	}
}

const dropdownEl = document.querySelectorAll('[data-dropdown="wrapp"]');
dropdownEl.forEach(item => dropdownList(item));

//Выпадающий список
function dropdownList(dropWrappEl) {
	const dropdownList = dropWrappEl.querySelector('[data-dropdown="list"]');
	const dropdownBtn = dropWrappEl.querySelector('[data-dropdown="btn"]');

	dropdownBtn.addEventListener('click', toggleDropdown);

	function toggleDropdown() {
		this.classList.toggle('active');
		dropWrappEl.classList.toggle('active');
		isActive = dropdownBtn.classList.contains('active');

		dropdownList.style.minHeight = isActive ? dropdownList.scrollHeight + 'px' : '';
	}

	return {
		toggleDropdown
	}
}

