console.log("Let's get this party started!");

async function getGiphy(query) {
    const targetDiv = document.querySelector('#results');
    const newImg = document.createElement('img');
    const response = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`, 
    {params: {
        limit: 20,
    }})

    const chosenIdx = randomIdx(response.data.data.length);
    console.log(chosenIdx);

    newImg.src = response.data.data[chosenIdx].images.original.url;
    newImg.classList.add('sizing');
    targetDiv.append(newImg);
}


function randomIdx(dataLength) {
    return Math.floor(Math.random()* dataLength+1);
}


$('#submit').on('click', function(e) {
    try {
    e.preventDefault();
    getGiphy($('input').val());
    }
    catch(e) {
        alert('Image did not load!');
    }
})

$('#delete').on('click', function(e) {
    e.preventDefault();
    $('div').empty();
})



