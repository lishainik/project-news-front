import { SPINNER_PRELOADER, RESULTS_ELEMENT, RESULTS_EMPTY } from '../const/const_main';

export default function spinnerSpinning(isSpinning) {
  if (isSpinning) {
    SPINNER_PRELOADER.classList.remove('results_hidden');
    RESULTS_ELEMENT.classList.add('results_hidden');
    RESULTS_EMPTY.classList.add('results_hidden');
  } else { SPINNER_PRELOADER.classList.add('results_hidden'); }
}
