burgerMenu()
function burgerMenu() {
	const hamburgerBtn = document.querySelector('.hamburger');
	const burgerBlock = document.querySelector('.header__burger');

	hamburgerBtn.addEventListener('click', toggleMenu)

	function toggleMenu() {
		hamburgerBtn.classList.toggle('active');

		if (hamburgerBtn.classList.contains('active')) {
			open();
		} else {
			close();
		}
	}

	function open() {
		burgerBlock.classList.add('open');
	}

	function close() {
		burgerBlock.classList.remove('open');
	}

	return {
		toggleMenu,
	}
}

document.querySelectorAll('[data-dropdown="wrapp"]').forEach(el => {
	dropdownList(el);
})

//Выпадающий список
function dropdownList(dropWrappEl) {
	const dropdownList = dropWrappEl.querySelector('[data-dropdown="list"]');
	const dropdownBtn = dropWrappEl.querySelector('[data-dropdown="btn"]');

	dropdownBtn.addEventListener('click', toggleDropdown);

	function toggleDropdown() {
		dropdownBtn.classList.toggle('active');
		dropWrappEl.classList.toggle('active');
		isActive = dropdownBtn.classList.contains('active');

		dropdownList.style.minHeight = isActive ? dropdownList.scrollHeight + 'px' : '';
	}

	return {
		toggleDropdown
	}
}

