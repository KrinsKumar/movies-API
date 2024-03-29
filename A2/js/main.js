let page = 1;
let perPage = 10;



//when dom is loaded
document.addEventListener("DOMContentLoaded", () => {
    
    loadMovieData();

    //for previous page button
    document.querySelector("#previous-page")
    .addEventListener("click", () => {
        if (page > 1) {
            page--;
            loadMovieData();
        }
    });

    //for next page button
    document.querySelector("#next-page")
    .addEventListener("click", () => {
        page++;
        loadMovieData();
    });

    //for submit button in the search bar
    document.querySelector("#searchForm")
    .addEventListener("submit", (e) => {
        e.preventDefault();
        let title = document.querySelector("#title").value;
        if (title == "") title = null;
        loadMovieData(title);
    });

    //for clear from button
    document.querySelector("#clearForm")
    .addEventListener("click", () => {
        document.querySelector("#title").value = "";
        loadMovieData();
    });
});

//main function that gets the data and displays it
let loadMovieData = function (title = null) {
    getMovieData(title)
    .then((movies) => {
        movieRows = createMovieHtml(movies);
        document.getElementById("table-body").innerHTML = movieRows;
        document.getElementById("current-page").innerHTML = page;
        addRowsEvent(document.querySelectorAll("tr"));

        if (title == null) {
            document.querySelector('#pagination-container')
            .classList.remove("d-none");
        } else {
            page = 1;
            document.querySelector('#pagination-container')
            .classList.add("d-none");
        } 

    })
    .catch((err) => {
        console.log(err);
    });
}

//function that gets the data from the server
let getMovieData = function(title) {
    let url = title
        ? `http://localhost:8080/api/movies?page=${page}&perPage=${perPage}&title=${title}`
        : `http://localhost:8080/api/movies?page=${page}&perPage=${perPage}`;

    return new Promise((resolve, reject) => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);    
        });
    });
}

//function that displays the data
let createMovieHtml = function(data) {
    let allRows = ``;
    data.message.map((movie) => {
        let plot = movie.plot;
        if (movie.plot == null || movie.plot == undefined || movie.plot == '') plot = "N/A";

        let hour = Math.floor(movie.runtime / 60);
        let minute = (movie.runtime % 60).toString().padStart(2, '0');
        let runtime = `${hour}:${minute}`;

        allRows += `
            <tr id="${movie._id}">
                <td>${movie.year}</td>
                <td>${movie.title}</td>
                <td>${plot}</td>
                <td>${movie.rated}</td>
                <td>${runtime}</td>
            </tr>
        `
    })
    return allRows;
}

//add event listeners to the movie rows
let addRowsEvent = function(rows) {
    Array.from(rows).map((row) => {
        row.addEventListener("click", (e) => {
            let id = e.target.parentNode.id;
            let url = `http://localhost:8080/api/movies/${id}`;

            fetch(url)
            .then((res) => res.json())
            .then((data) => {
                document.querySelector(".modal-title").innerHTML = `${data.message.title}`;

                let directors = data.message.directors.join(", ");
                let cast = data.message.cast.join(", ");
                let body = `
                    <img class="img-fluid w-100" src="${data.message.poster}"><br><br>
                    <strong>Directed By:</strong> ${directors}<br><br>
                    <p>${data.message.fullplot}</p>
                    <strong>Cast:</strong> ${cast}<br><br>
                    <strong>Awards:</strong> ${data.message.awards.text}<br>
                    <strong>IMDB Rating:</strong> ${data.message.imdb.rating} (${data.message.imdb.votes} votes)
                `;

                document.querySelector(".modal-body").innerHTML = body;
                
                let myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
                myModal.show();
            });
        });   
    })
}