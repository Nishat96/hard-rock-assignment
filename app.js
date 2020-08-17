function getLyrics(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(lyricData => {
            const lyrics = lyricData.lyrics;
            const lyricsDisplay = document.getElementById('single-lyrics');
            lyricsDisplay.innerHTML = `<h2 class="text-success mb-4">${artist} - ${title}</h2>
                                        <pre class="lyric text-white">${lyrics}</pre>`
        })
        document.getElementById('search-result').innerHTML = '';
    }

function searchResult() {
    const songName = document.getElementById('input-song').value;
    document.getElementById('search-result').innerHTML = ''; 
    document.getElementById('single-lyrics').innerHTML = ''; 
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then(res => res.json())
    .then(Data => {
        const song = Data.data;
        for (let i = 0; i < 10; i++) {
            const newSong = song[i];
            const title = newSong.title;
            const artist = newSong.artist.name;
            const img = newSong.artist.picture_small;
         
            const result = document.getElementById('search-result');
            result.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                        <div class="col-md-2">
                                        <img class="img-thumbnail" src="${img}" alt="Cover Picture">
                                        </div>
                                        <div class="col-md-7">
                                        <h3 class="lyrics-name">${title}</h3>
                                        <p class="author lead">by <span>${artist}</span></p>
                                    </div>
                                    <div class="col-md-3 text-md-right text-center">
                                        <button onclick="getLyrics('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
                                    </div>
                                </div>`
        }
    })
}