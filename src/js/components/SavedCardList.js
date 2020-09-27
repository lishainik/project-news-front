export default class SavedCardList {
  constructor(container, api, createFunc, userinfo) {
    this.container = container;
    this.api = api;
    this.createFunc = createFunc;
    this.array = [];
    this.userinfo = userinfo;
  }

  renderAll() {
    this.api.getArticles()
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject();
      })
      .then((result) => {
        this.array = result.article;
      })
      .then(() => {
        this.array.forEach((element) => {
          const card = this.createFunc(element.title,
            element.date, element.text,
            element.image, element.source, element.link, this.api, element.keyword, element._id,
            this.container, this.userinfo);
          this.container.appendChild(card.createCard());
        });
      })
      .catch((err) => err);
  }
}
