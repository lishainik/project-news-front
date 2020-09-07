export default class UserInfoBlock {
  constructor(element, title, text, api) {
    this.element = element;
    this.title = title;
    this.text = text;
    this.api = api;
    this.object = [];
  }

  render() {
    this.renderText();
    this.renderName();
  }

  renderName() {
    this.api.getMe()
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject();
      })
      .then((result) => {
        this.title.querySelector('.user-info__name').textContent = result.name;
      })
      .catch((err) => err);

    this.api.getArticles()
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject();
      })
      .then((result) => {
        const articlesCounter = this.title.querySelector('.user-info__title-text');
        if (result.article.length === 0) {
          articlesCounter.textContent = ', у вас нет сохранённых статей';
        } else if (result.article.length === 1) {
          articlesCounter.textContent = ', у вас одна сохраненная статья';
        } else if (result.article.length === 2) {
          articlesCounter.textContent = ', у вас две сохранённых статьи';
        } else {
          articlesCounter.textContent = `, у вас ${result.article.length} сохранённых статей`;
        }
      });
  }

  renderText() {
    const firstTag = this.text.querySelector('.content-subtitle__tag_first');
    const secondTag = this.text.querySelector('.content-subtitle__tag_second');
    const restOfTags = this.text.querySelector('.content-subtitle__tag_third');
    const link = this.text.querySelector('.linkage');
    this.api.getArticles()
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject();
      })
      .then((result) => {
        const keywordArray = [];

        result.article.forEach((element) => {
          keywordArray.push(element.keyword);
        });
        const keywordRanked = keywordArray.reduce((prevVal, item) => {
          const prev = prevVal;
          if (!prev[item]) {
            prev[item] = 1;
          } else {
            prev[item] += 1;
          }

          return prev;
        }, {});

        const keywordRankingRes = Object.keys(keywordRanked);
        const first = keywordRankingRes[0];
        const second = keywordRankingRes[1];
        if (keywordRankingRes.length === 1) {
          firstTag.textContent = `${first}`;
          secondTag.textContent = '';
          restOfTags.textContent = '';
          link.textContent = '';
        } else if (keywordRankingRes.length === 2) {
          firstTag.textContent = `${first}`;
          secondTag.textContent = `${second}`;
          restOfTags.textContent = '';
          link.textContent = '';
        } else if (keywordRankingRes.length === 3) {
          firstTag.textContent = `${first}`;
          secondTag.textContent = `${second}`;
          restOfTags.textContent = '1 другому';
        } else {
          firstTag.textContent = `${first}`;
          secondTag.textContent = `${second}`;
          restOfTags.textContent = `${keywordRankingRes.length - 2} другим`;
        }
      });
  }
}
