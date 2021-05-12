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

if (isElem('[data-dropdown="wrapp"]')) {
	document.querySelectorAll('[data-dropdown="wrapp"]').forEach(el => {
		dropdownList(el);
	})
}

const accardionTables = accardion()();
accardionTables.init('.accardion');

function accardion() {
	return function () {
		let _mainElement = {}, // .accordion
			_items = {}; // .accordion-item

		return {
			init: function (element) {
				_mainElement = (typeof element === 'string' ? document.querySelector(element) : element);
				_items = _mainElement.querySelectorAll('.accardion__item');
				_setupListeners(_mainElement, 'click', _clickHandler);
			}
		}

		function _clickHandler(e) {
			if (!e.target.closest('.accardion__item-arrow')) {
				return;
			}
			e.preventDefault(); // отменям стандартное действие
			// получаем необходимые данные
			let header = e.target.closest('.accardion__item-header'),
				item = header.closest('.accardion__item'),
				itemActive = _getItem(_items, 'open');

			if (itemActive === undefined) {
				item.classList.add('open');
			} else {
				itemActive.classList.remove('open');

				if (itemActive !== item) item.classList.add('open');
			}
		}
	}

	function _setupListeners(elem, event, handler) {
		// добавим к элементу аккордиона обработчик события click
		elem.addEventListener(event, handler);
	}

	function _getItem(elements, className) { // функция для получения элемента с указанным классом
		var element = undefined;
		elements.forEach(function (item) {
			if (item.classList.contains(className)) {
				element = item;
			}
		});
		return element;
	};
}
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

function isElem(selector) {
	return (document.querySelector(selector)) ? true : false;
}

