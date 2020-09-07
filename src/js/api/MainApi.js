export default class MainApi {
  constructor(root) {
    this.root = root;
  }

  createUser(email, password, name) {
    return fetch(`${this.root}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
  }

  loginUser(email, password) {
    return fetch(`${this.root}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  getMe() {
    return fetch(`${this.root}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  logOut() {
    return fetch(`${this.root}/signoff`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  createArticle(keyword,
    title,
    text,
    date,
    source,
    link,
    image) {
    return fetch(`${this.root}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    });
  }

  deleteArticle(id) {
    return fetch(`${this.root}/articles/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  }

  getArticles() {
    return fetch(`${this.root}/articles`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  }
}
