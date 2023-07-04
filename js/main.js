const options = {

    method: 'GET',
    headers: {
      'app_id': '${process.env.APP_ID}',
      'app_secret': '${process.env.APP_SECRET}',
      'default_graph_version': '${process.env.DEFAULT_GRAPH_VERSION}'
    }
  };
  
  let mostrar_post = document.getElementById('publicacionesContainer');

  let posts = [];
  let loadedPosts = 0;
  let postsPerPage = 3;
  
  function loadPosts() {
    let remainingPosts = posts.length - loadedPosts;
    
    if (remainingPosts > 0) {
      let endIndex = loadedPosts + postsPerPage;
      let postsToLoad = posts.slice(loadedPosts, endIndex);
  
      postsToLoad.forEach(numero => {
        const post = document.createElement('article');
    
        post.innerHTML = `
          <img loading="lazy" class="" width="400" height="300" src="${numero.full_picture ?? '../assets/imgs/sco.webp'}" alt="Sample photo">
          <i class="fa fa-facebook"></i>
          <div class="text">
            <h3>SCO Consultores</h3>
            <div class="module line-clamp">
              <p>${numero.message ? formatMessage(numero.message) : ''}</p>
            </div>
            <a href="${numero.permalink_url}" target="_blank" class="btn btn-boton-azul btn-block">Seguir viendo</a>
          </div>
        `;
        mostrar_post.appendChild(post);
      });
  
      loadedPosts += postsToLoad.length;
    }
  
  
    if (loadedPosts >= posts.length) {

      document.getElementById('loadMoreButton').style.display = 'none';
    }
  }
  
  fetch(`https://graph.facebook.com/${process.env.FACEBOOK_PAGE_ID}/posts?fields=full_picture,permalink_url,message&access_token=${process.env.ACCESS_TOKEN}`, options)
    .then(res => res.json())
    .then(response => {
      posts = response.data;
  
      loadPosts();
    });
  
  function formatMessage(message) {
    const words = message.split(' ');
    const truncatedWords = words.slice(0, 10);
    const truncatedMessage = truncatedWords.join(' ');
  
    if (words.length > 10) {
      return truncatedMessage + '...';
    } else {
      return truncatedMessage;
    }
  }
  