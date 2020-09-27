export default class Card {
  constructor(title, date, text, image, source, url, api, keyword) {
    this.title = title;
    this.date = date;
    this.text = text;
    this.image = image;
    this.source = source;
    this.url = url;
    this.api = api;
    this.keyword = keyword;
    this.id = '';
  }

  createCard(param) {
    const card = document.createElement('div');
    card.classList.add('card');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('card__img-container');

    const image = document.createElement('img');
    image.classList.add('card__img');
    image.src = this.image;
    image.alt = this.title;

    const buttons = document.createElement('div');
    buttons.classList.add('card__button-container');

    const remainderBtn = document.createElement('button');
    remainderBtn.classList.add('card__button', 'card__button_log', 'card__button_hidden');
    remainderBtn.textContent = 'Войдите, чтобы сохранять статьи';

    const saveBtn = document.createElement('button');
    saveBtn.classList.add('card__button', 'card__button_save');

    const content = document.createElement('div');
    content.classList.add('card__content');

    const date = document.createElement('p');
    date.classList.add('card__date');
    date.textContent = this.date.slice(0, 10);

    const articleTitle = document.createElement('h3');
    articleTitle.classList.add('content-title', 'content-title__place_card');
    articleTitle.textContent = `${this.title.substring(0, 100)}...`;

    const articleText = document.createElement('p');
    articleText.classList.add('card__article');
    if (this.text === null) { articleText.textContent = ''; } else { articleText.textContent = `${this.text.substring(0, 180 - this.title.length)}...`; }

    const articleSource = document.createElement('a');
    articleSource.setAttribute('href', this.url);
    articleSource.setAttribute('target', '_blank');
    articleSource.classList.add('card__source');
    articleSource.textContent = this.source;

    buttons.appendChild(remainderBtn);
    buttons.appendChild(saveBtn);

    imageContainer.appendChild(image);
    imageContainer.appendChild(buttons);

    content.appendChild(date);
    content.appendChild(articleTitle);
    content.appendChild(articleText);
    content.appendChild(articleSource);

    card.appendChild(imageContainer);
    card.appendChild(content);

    this.card = card;
    if (param === false) {
      this.card.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('card__button_save') && window.innerWidth > 900) {
          this.card.querySelector('.card__button_log').classList.remove('card__button_hidden');
        }
      });

      this.card.addEventListener('mouseout', (event) => {
        if (event.target.classList.contains('card__button_save') && window.innerWidth > 900) {
          this.card.querySelector('.card__button_log').classList.add('card__button_hidden');
        }
      });
    }

    if (param === true) {
      this.card.addEventListener('click', (event) => {
        if (event.target.classList.contains('card__button_save')) {
          this.api.createArticle(
            this.keyword,
            this.title,
            this.text,
            this.date,
            this.source,
            this.url,
            this.image,
          )
            .then((res) => {
              if (res.ok) {
                event.target.classList.remove('card__button_save');
                event.target.classList.add('card__button_saved');
                return res.json();
              }
              return Promise.reject();
            })
            .then((result) => {
              this.id = result.article._id;
            })
            .catch((err) => err);
        }
      });
      this.card.addEventListener('click', (event) => {
        if (event.target.classList.contains('card__button_saved')) {
          this.api.deleteArticle(this.id)
            .then((res) => {
              if (res.ok) {
                event.target.classList.add('card__button_save');
                event.target.classList.remove('card__button_saved');
                return res.json();
              }
              return Promise.reject();
            })
            .catch((err) => err);
        }
      });
    }
    return this.card;
  }

  deleteEventListeners() {
    this.card.removeEventListener('mouseover', (event) => {
      if (event.target.classList.contains('card__button_save') && window.innerWidth > 900) {
        this.card.querySelector('.card__button_log').classList.remove('card__button_hidden');
      }
    });

    this.card.removeEventListener('mouseout', (event) => {
      if (event.target.classList.contains('card__button_save') && window.innerWidth > 900) {
        this.card.querySelector('.card__button_log').classList.add('card__button_hidden');
      }
    });
  }

  removeCard() {
    this.removeEventListener();
  }
}
