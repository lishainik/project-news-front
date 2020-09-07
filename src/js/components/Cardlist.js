export default class CardList {
  constructor(container, createFunc, moreButton, api) {
    this.container = container;
    this.createFunc = createFunc;
    this.array = [];
    this.index = 0;
    this.button = moreButton;
    this.keyword = '';
    this.api = api;
    this.logged = false;
  }

  addCards(result) {
    this.array = result;
  }

  checkIfLogged() {
    return this.api.getMe()
      .then((res) => {
        if (res.ok) {
          return res;
        }
        return Promise.reject();
      })
      .then(() => {
        this.logged = true;
        return this.logged;
      })
      .catch((err) => {
        this.logged = false;
        return err;
      });
  }

  render() {
    const result = this.index + 3;

    this.checkIfLogged()
      .then(() => {
        for (; this.index < result; this.index += 1) {
          if (this.index === this.array.length) {
            return this.button.classList.add('button__place_results-hidden');
          }
          const element = this.array[this.index];
          const card = this.createFunc(element.title,
            element.publishedAt, element.description,
            element.urlToImage, element.source.name, element.url, this.api, this.keyword);
          this.container.appendChild(card.createCard(this.logged));
        }
        return this.index;
      });
  }

  reset() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    this.array.length = 0;
    this.index = 0;
    this.button.classList.remove('button__place_results-hidden');
  }
}
