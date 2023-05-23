let page = 1;
let perPage = 10;





//main function that gets the data and displays it
let loadMovieData = function (title = null) {
    getMovieData(title)
    .then((movies) => {
        movieRows = createMovieHtml(movies);
        document.getElementById("table-body").innerHTML = movieRows;
        document.getElementById("current-page").innerHTML = page;
        addRowsEvent(document.querySelectorAll("tr"));
    });
}

//function that gets the data from the server
let getMovieData = function(title) {
    let url = title
        ? `https://zany-plum-lobster-shoe.cyclic.app/api/movies?page=${page}&perPage=${perPage}&title=${title}`
        : `https://zany-plum-lobster-shoe.cyclic.app/api/movies?page=${page}&perPage=${perPage}`;

    return new Promise((resolve, reject) => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            resolve(data);
        });
    });
}

//function that displays the data
let createMovieHtml = function(data) {
    let allRows = ``;
    data.map((movie) => {
        let plot = movie.plot;
        if (movie.plot == null || movie.plot == undefined || movie.plot == '') plot = "N/A";

        let hour = Math.floor(movie.runtime / 60);
        let minute = (runtime % 60).toString().padStart(2, '0');
        let runtime = `${hour}:${minute}`;

        allRows += `
            <th id="${movie._id}">
                <td>${movie.year}</td>
                <td>${movie.title}</td>
                <td>${plot}</td>
                <td>${movie.rated}</td>
                <td>${runtime}</td>
            </th>
        `
    })
    return allRows;
}

//add event listeners to the movie rows
let addRowsEvent = function(rows) {
    rows.map((row) => {
        row.addEventListener("click", (e) => {
            let id = e.target.id;
            let url = `https://zany-plum-lobster-shoe.cyclic.app/api/movies/${id}`;
        });   
    })
}