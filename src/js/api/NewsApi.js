export default class NewsApi {
  constructor(key) {
    this.key = key;
  }

  getNews(keypharse) {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    return fetch(`https://nomoreparties.co/news/v2/everything?q=${keypharse}&apiKey=${this.key}&from=${weekAgo.toISOString()}&to=${now.toISOString()}&language=ru&pageSize=100`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'));
      })
      .then((result) => result)
      .catch((err) => err);
  }
}
