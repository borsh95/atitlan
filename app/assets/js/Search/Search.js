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
