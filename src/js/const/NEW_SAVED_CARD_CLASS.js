import SavedCard from '../components/SavedCard';

const NEW_SAVED_CARD_CLASS = (title, date, description,
  image, source, link, api, keyword, id, container, userinfo) => (new SavedCard(title, date,
  description, image, source, link, api, keyword, id, container, userinfo));

export default NEW_SAVED_CARD_CLASS;
