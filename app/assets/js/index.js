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

if (isElem('.slider-stages')) {
	let sliderStages = new Swiper(".slider-stages", {
		effect: "fade",
		allowTouchMove: false,
		navigation: {
			nextEl: ".slider-stages-next",
			prevEl: ".slider-stages-prev",
		},
		pagination: {
			el: ".slider-stages-pagination",
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (index + 1) + "</span>";
			},
		},
	});
}

if (isElem('#map')) {
	//map 
	ymaps.ready(init);
	function init() {
		// Создание карты.
		var myMap = new ymaps.Map("map", {
			controls: [],
			center: [53.87447458814268, 27.676578589935176],
			zoom: 14
		});

		myMap.behaviors.disable('drag');

		let MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
			`<div class="my-balloon">
				{{properties.balloonContent}}
			</div>`
		);

		let myPlacemark = new ymaps.Placemark([53.87447458814268, 27.676578589935176],
			{
				balloonContent: `Томская улица, 65к2`
			},
			{
				hideIconOnBalloonOpen: false,
				preset: 'islands#icon',
				iconColor: '#ea4335',
				balloonShadow: true,
				balloonLayout: MyBalloonLayout,
			});

		myMap.geoObjects.add(myPlacemark);
		myPlacemark.balloon.open();
	}
}

// tel mask
if (document.querySelector('input[type="tel"]')) {
	const inputsTel = document.querySelectorAll('input[type="tel"]');
	const im = new Inputmask('+375 (99) 999-99-99');
	im.mask(inputsTel);
}

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

