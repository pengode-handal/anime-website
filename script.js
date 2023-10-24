const searchButton = document.querySelector('.cari');
searchButton.addEventListener('click', function() {
    input = document.querySelector('.input-judul');
    fetch(`https://api.jikan.moe/v4/anime?q=${input.value}&limit=8`)
        .then(response => response.json())
        .then(response => {
            let cards = '';
            const animeh = response.data;
            animeh.forEach(d => cards += isiCards(d));
            const nimekKontainer = document.querySelector('.animeh');
            nimekKontainer.innerHTML = cards;
            const tombolAnimeh = document.querySelectorAll('.tombol-nimek');
            tombolAnimeh.forEach(tombol => {
                tombol.addEventListener('click', function() {

                    const malid = this.dataset.malid;
                    fetch(`https://api.jikan.moe/v4/anime/${malid}`)
                        .then(hasil => hasil.json())
                        .then(data => {
                            const isiModal = detailAnime(data.data);
                            document.querySelector('.modal-judul').textContent = data.data.title;
                            document.querySelector('.modal-body').innerHTML = isiModal;
                        });
                });
            });
        });
});
input = document.getElementById('judul')
input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.querySelector('.cari').click();
    }
});

function isiCards(data) {
    return `
    <div class="col col-md-3 my-3">
                <div class="card card-hebat">
                    <img src="${data.images.jpg.image_url}" alt="Gambar animeh" class="card-img-top poster-animeh">
                    <div class="card-body card-body-pd">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text"><small class="text-body-secondary">${data.title_japanese}</small></p>
                    </div>
                    <a href="#" class="btn btn-primary tombol-nimek" data-bs-toggle="modal" data-bs-target="#detailAnime" data-malid="${data.mal_id}" >Detail</a>
                </div>
            </div>
    `
}

function detailAnime(data) {
    return `
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-3-fix modal-tengah ">
                <img src="${data.images.webp.image_url}" alt="" class="img-fluid">
                <h5 class="card-title btn btn-batas btn-danger">${data.score}</h5>
            </div>
            <div class="col-md">
                <ul class="list-group">
                    <li class="list-group-item">Rank: ${data.rank}</li>
                    <li class="list-group-item">Broadcast: ${data.broadcast}</li>
                    <li class="list-group-item">Aired: ${data.aired.string}</li>
                    <li class="list-group-item">Rating: ${data.rating}</li>
                    <li class="list-group-item">Type: ${data.type}</li>
                    <li class="list-group-item">Status: ${data.status}</li>
                </ul>
            </div>
        </div>
    </div>`;
}