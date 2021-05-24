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

//accardion init
if (isElem('.accardion')) {
	const accardionTables = accardion()();
	accardionTables.init('.accardion');
}


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

//Стилизуем select
if (isElem('.b-select')) {
	const bSelectElements = document.querySelectorAll('.b-select');

	bSelectElements.forEach(select => bSelect(select));
}

if (isElem('#map')) {
	//map 
	ymaps.ready(init);
	function init() {
		// Создание карты.
		var myMap = new ymaps.Map("map", {
			controls: [],
			center: [53.87447458814268, 27.676578589935176],
			zoom: 15
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

//слайдер цены
if (document.querySelector('.filters-price__slider')) {
	const sliderPrice = document.querySelector('.filters-price__slider');
	const inputs = document.querySelectorAll('.filters-price .filters-inputs__input');

	noUiSlider.create(sliderPrice, {
		start: [500, 10000],
		connect: true,
		step: 1,
		range: {
			'min': [0],
			'max': [10000]
		}
	});

	sliderPrice.noUiSlider.on('update', function (values, handle) {
		inputs[handle].value = Math.round(values[handle]);
	});

	inputs.forEach(function (input, index) {
		input.addEventListener('change', function (e) {
			setRangeSlider(index, e.currentTarget.value)
		});
	});


	function setRangeSlider(i, value) {
		let arr = [null, null];
		arr[i] = value;

		sliderPrice.noUiSlider.set(arr);
	}
}

if (document.querySelector('.filters-inputs')) {
	document.querySelectorAll('.filters-inputs').forEach(function (inputsWrapp, ind) {
		restrictionEntry(inputsWrapp);
	});

}

//ограничение ввода в input number от и до
function restrictionEntry(inputsWrapp) {
	const inputs = document.querySelectorAll('input'),
		input1 = inputs[0],
		input2 = inputs[1];

	inputs.forEach(function (input) {
		input.addEventListener('change', () => {
			checkingValue(input);
		});
	});

	function checkingValue(input) {
		let val = +input.value;

		if (isNaN(val)) '';

		let min = +input.getAttribute('min') || 0;
		let max = +input.getAttribute('max') || 999999;

		input.value = (val < min) ? min : (val > max) ? max : val;
	}
}

//accardion
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

//галерея фото
if (isElem('.fotorama')) {
	$('.fotorama').fotorama({
		transition: 'crossfade',
	});
}

if (isElem('.bro-menu')) {
	broMenu('.bro-menu').init();
}

function broMenu(selector) {
	const $menu = typeof selector === "string" ? document.querySelector(selector) : selector;
	const $menuTitle = $menu.querySelector('.bro-menu__title');
	const $level_1 = $menu.lastElementChild;
	const $subMenuList = $menu.querySelectorAll('li ul');

	let $activeUl;
	let translate = 0;

	$menu.style.height = $menu.offsetHeight + 'px';

	const method = {
		init() {
			for (let submenu of $subMenuList) {
				const link = submenu.parentElement.firstElementChild;
				link.classList.add('bro-menu__next');

				_addBtnBack(submenu, link);
				_addBtnNext(link);
			}

			$menu.addEventListener('click', clickHandler);
		}
	}

	function clickHandler(e) {
		const target = e.target;

		if (target.closest('.bro-menu__next')) {
			e.preventDefault();

			const $nestedMenu = target.closest('li').querySelector('ul');

			if ($activeUl) $activeUl.classList.remove('active');

			$nestedMenu.classList.add('active');
			$nestedMenu.style.visibility = 'visible';
			translate -= 100;

			$level_1.style.transform = `translateX(${translate}%)`;
			$activeUl = $nestedMenu;
			_setHeighMenu();
		}
		else if (target.closest('.bro-menu__back')) {
			e.preventDefault();

			const $upperMenu = $activeUl.parentElement.closest('ul');
			$upperMenu.classList.add('active');

			$activeUl.style.visibility = '';

			translate += 100;

			$level_1.style.transform = `translateX(${translate}%)`;
			$activeUl.classList.remove('active');
			$activeUl = $upperMenu;
			_setHeighMenu();
		}
	}

	function _addBtnNext(elem) {
		elem.insertAdjacentHTML('beforeend', `
			${_getSvgBtn()}
		`);
	}

	function _addBtnBack(elem, link) {
		const href = link.getAttribute('href') || "#";

		elem.insertAdjacentHTML('afterbegin', `
			<li>
				<a class="bro-menu__back" href="${href}">
					${_getSvgBtn()}
					${link.textContent}
				</a>
			</li>
		`);
	}

	function _setHeighMenu() {
		$menu.style.height = $menuTitle.offsetHeight + $activeUl.offsetHeight + "px";
	}

	function _getSvgBtn(classBtn) {
		return `<svg viewBox="0 0 8 12" xmlns="http://www.w3.org/2000/svg"><path d="M1.70492 0L0.294922 1.41L4.87492 6L0.294922 10.59L1.70492 12L7.70492 6L1.70492 0Z" /></svg>`;
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

	return method;
}

//Стилизованный select
function bSelect(el) {
	let _this = el;
	let parent = _this.parentElement;
	let bSelectHeader = document.createElement('div');
	let bSelectValue;
	let bSelectList = document.createElement('ul');
	let bSelectItems;
	let isPlaceholder = false;

	//Добавляем классы
	parent.classList.add('b-select-container');
	bSelectHeader.classList.add('b-select__header');
	bSelectList.classList.add('b-select__list');

	//Добавляем элементы в шапку и выпадающий список
	bSelectHeader.insertAdjacentHTML('beforeend', '<span class="b-select__value"></span><svg width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8.95793 8.54864C9.82429 9.36404 11.1757 9.36404 12.0421 8.54864L19 2" stroke="#7C9CBF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>')
	bSelectValue = bSelectHeader.querySelector('.b-select__value');

	if (_this.getAttribute("b-select-name") != "false" && _this.getAttribute("b-select-name") != "undefined" && _this.getAttribute("b-select-name") !== undefined && _this.getAttribute("b-select-name") !== null) {
		bSelectValue.textContent = _this.getAttribute("b-select-name");
		bSelectValue.classList.add('select-name');
		_this.prepend(new Option(`${bSelectValue.textContent}`, "", false, true));
	}

	for (let i = 0; i < _this.options.length; i++) {
		let option = _this.options[i];

		let li = document.createElement('li');
		li.textContent = option.text;

		if (option.hasAttribute("selected")) {
			li.dataset.selected = 'selected';
			bSelectValue.textContent = option.text;
			_this.sectedIndex = i;
		}

		if (option.disabled) {
			li.dataset.disabled = 'disabled';
		}

		bSelectList.append(li)
	}

	if (bSelectValue.textContent === "") {
		let count = 0;

		while (_this.options[count].disabled) {
			count++;
		}

		bSelectList.children[count].dataset.selected = 'selected';
		bSelectValue.textContent = _this.options[count].text;
		_this.sectedIndex = count;
	}

	bSelectItems = bSelectList.children;

	bSelectHeader.addEventListener('click', function () {
		this.classList.toggle("active");
	});

	for (let i = 0; i < bSelectItems.length; i++) {
		bSelectItems[i].addEventListener('click', () => {
			_this.options[i].selected = true;
			bSelectValue.textContent = _this.options[i].text;
			bSelectList.querySelector('[data-selected="selected"]').removeAttribute('data-selected');
			bSelectItems[i].dataset.selected = 'selected';

			if (bSelectHeader.classList.contains('active')) {
				bSelectHeader.classList.remove('active');
			}

		});
	}

	document.documentElement.addEventListener('click', function (e) {
		let targetClick = e.target.closest('.b-select__header');

		if (!Object.is(targetClick, bSelectHeader) && bSelectHeader.classList.contains("active")) {
			bSelectHeader.classList.remove('active');
		}
	})

	parent.append(bSelectHeader);
	parent.append(bSelectList)
}

function isElem(selector) {
	return (document.querySelector(selector)) ? true : false;
}

