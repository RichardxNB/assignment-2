/* 
<tr>
  <td>ALBUM NAME HERE</td>
  <td>RELEASE DATE HERE</td>
  <td>ARTIST NAME HERE</td>
  <td>GENRE HERE</td>
  <td>AVERAGE RATING HERE</td>
  <td>NUMBER OF RATINGS HERE</td>
</tr> 
*/
let albumStore

async function appInit() {
	const response = await fetch('public/data/albums.json')
	const data = await response.json()
	albumStore = [...data]

	render(albumStore, document.querySelector("tbody"))

	//getAlbumByArtist(data)
}
document.querySelector('#album-search-form').addEventListener('submit', onFilterRequest);
function onFilterRequest(e) {
	e.preventDefault();
	const formData = new FormData(e.currentTarget)
	const searchText = formData.get('search').trim().toLowerCase()
	const searchMinAlbumRating = formData.get('min-album-rating').trim().toLowerCase()
	getAlbumByArtist(searchText)
	getAlbumByAlbumName(searchText)
	getAlbumByRating(searchMinAlbumRating)
}

function render(data, container) {
	data.forEach((albumStore) => {
		const template = `
		<tr>
		<td>${albumStore.album}</td>
		<td>${albumStore.releaseDate}</td>
		<td>${albumStore.artistName}</td>
		<td>${albumStore.genres}</td>
		<td>${albumStore.averageRating}</td>
		<td>${albumStore.numberRatings}</td>
	  </tr>
	  `
		container.insertAdjacentHTML('afterbegin', template)
	})
}

appInit()

function getAlbumByArtist(string) {
	const results = albumStore
		.filter((album) => {
			if (album.artistName.toLowerCase().includes(string)) {
				return album.artistName
		}
	})
	document.querySelector("tbody").replaceChildren();

	console.log(results)
	renderResults(results, document.querySelector("tbody"))
}

function getAlbumByRating(number) {
	const results = albumStore
		.filter((album) => {
			if (album.averageRating >= number) {
				return album.averageRating >= number
			}
		})
	document.querySelector("tbody").replaceChildren();

	console.log(results)
	renderResults(results, document.querySelector("tbody"))
}

function getAlbumByAlbumName(string) {
	const results = albumStore
		.filter((album) => {
			if (album.albumName.toLowerCase().includes(string)) {
				return album.albumName.includes(string)
			}
		})
	document.querySelector("tbody").replaceChildren();

	console.log(results)
	renderResults(results, document.querySelector("tbody"))
}

function renderResults(data, container) {
	data.forEach((results) => {
		const template = `
		<tr>
		<td>${results.album}</td>
		<td>${results.releaseDate}</td>
		<td>${results.artistName}</td>
		<td>${results.genres}</td>
		<td>${results.averageRating}</td>
		<td>${results.numberRatings}</td>
	  </tr>
	  `
		container.insertAdjacentHTML('afterbegin', template)
	})
}