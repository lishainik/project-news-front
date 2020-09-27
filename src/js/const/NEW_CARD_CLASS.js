import Card from '../components/Card';

const NEW_CARD_CLASS = (title, date, description,
  image, source, link, api, keyword) => (new Card(title, date, description, image,
  source, link, api, keyword));

export default NEW_CARD_CLASS;
