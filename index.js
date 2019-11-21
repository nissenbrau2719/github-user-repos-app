



function displayResults(responseJson) {
  console.log(responseJson);
  const repos = responseJson;
  $('#js-resultsList').empty();
  for (let i = 0; i < repos.length; i++) {
    $('#js-resultsList').append(
      `<li><h3>${repos[i].name}</h3>
      <p><a href="${repos[i].html_url}">${repos[i].html_url}</a></p></li>`
    )
  };
  $('#js-results').removeClass('hidden');
  $('#js-errorMessage').empty();
}


function getRepos(username) {
  const url = `https://api.github.com/users/${username}/repos`;
  const options = {

  };

  fetch(url)
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#js-errorMessage').text(`Something went wrong: ${error.message}`);
      $('#js-resultsList').empty();
      $('#js-results').addClass('hidden');
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();

    const username = $('#userSearch').val().trim();
    getRepos(username);
  });
}

$(watchForm);