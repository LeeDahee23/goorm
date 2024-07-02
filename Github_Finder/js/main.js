$(document).ready(function () {
  $('#searchUser').on('keyup', function (e) {
    let username = e.target.value;

    // Make request to Github
    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: '',
        client_secret: '',
      },
    }).done(function (user) {
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        data: {
          client_id: '',
          client_secret: '',
          sort: 'created: asc',
          per_page: 5,
        },
      }).done(function (repos) {
        $.each(repos, function (index, repo) {
          $('#repos').append(`
                <div class="well">
                    <div class="row">
                        <div class="col-md-7">
                            <strong>${repo.name}</strong> :${repo.description}
                        </div>
                        <div class="col-md-3">
                            <span class="badge text-bg-primary">Forks: ${repo.forks_count}</span>
                            <span class="badge text-bg-info">Watchers: ${repo.watchers}</span>
                            <span class="badge text-bg-success">Stars: ${repo.stargazers_count}</span>
                        </div>
                        <div class="col-md-2">
                            <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                        </div>
                    </div>
                </div>
            `);
        });
      });
      $('#profile').html(`
        <div class="card card-default">
            <div class="card-header">
                <h5 class="card-title">${user.name}</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <img class="thumbnail avatar" src="${user.avatar_url}">
                        <a target="_blank" class="btn btn-primary btn-block margin-top" href="${user.html_url}">View profile</a>
                    </div>
                    <div class="col-md-9">
                        <span class="badge text-bg-primary">Public Repos: ${user.public_repos}</span>
                        <span class="badge text-bg-secondary">Public Gists: ${user.public_gists}</span>
                        <span class="badge text-bg-success">Followers: ${user.followers}</span>
                        <span class="badge text-bg-danger">Following: ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/blog: ${user.blog}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                    </div>
                </div>
            </div>
        </div>
        <h3 class="page-header margin-top">Latest Repos</h3>
        <div id="repos"></div>
      `);
    });
  });
});
