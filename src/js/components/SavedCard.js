export default class SavedCard {
  constructor(title, date, description, image, source, url, api, keyword, id, container, userinfo) {
    this.title = title;
    this.date = date;
    this.description = description;
    this.image = image;
    this.source = source;
    this.url = url;
    this.api = api;
    this.keyword = keyword;
    this.id = id;
    this.container = container;
    this.userinfo = userinfo;
  }

  createCard() {
    const card = document.createElement('div');
    card.classList.add('card');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('card__img-container');

    const image = document.createElement('img');
    image.classList.add('card__img');
    image.src = this.image;
    image.alt = this.title;

    const tag = document.createElement('p');
    tag.classList.add('card__button', 'card__tag');
    tag.textContent = this.keyword;

    const buttons = document.createElement('div');
    buttons.classList.add('card__button-container');

    const remainderBtn = document.createElement('button');
    remainderBtn.classList.add('card__button', 'card__button_log', 'card__button_hidden');
    remainderBtn.textContent = 'Убрать из сохраненных';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('card__button', 'card__button_delete');

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
    if (this.description === null) { articleText.textContent = ''; } else { articleText.textContent = `${this.description.substring(0, 180 - this.title.length)}...`; }

    const articleSource = document.createElement('a');
    articleSource.setAttribute('href', this.url);
    articleSource.setAttribute('target', '_blank');
    articleSource.classList.add('card__source');
    articleSource.textContent = this.source;

    buttons.appendChild(remainderBtn);
    buttons.appendChild(deleteBtn);

    imageContainer.appendChild(tag);
    imageContainer.appendChild(image);
    imageContainer.appendChild(buttons);

    content.appendChild(date);
    content.appendChild(articleTitle);
    content.appendChild(articleText);
    content.appendChild(articleSource);

    card.appendChild(imageContainer);
    card.appendChild(content);

    this.card = card;

    this.card.addEventListener('mouseover', (event) => {
      if (event.target.classList.contains('card__button_delete') && window.innerWidth > 900) {
        this.card.querySelector('.card__button_log').classList.remove('card__button_hidden');
      }
    });

    this.card.addEventListener('mouseout', (event) => {
      if (event.target.classList.contains('card__button_delete') && window.innerWidth > 900) {
        this.card.querySelector('.card__button_log').classList.add('card__button_hidden');
      }
    });

    this.card.addEventListener('click', (event) => {
      if (event.target.classList.contains('card__button_delete')) {
        this.api.deleteArticle(this.id)
          .then((res) => {
            if (res.ok) {
              this.container.removeChild(this.card);
              this.userinfo.render();
              return res.json();
            }
            return Promise.reject();
          })
          .catch((err) => err);
      }
    });
    return this.card;
  }
}
