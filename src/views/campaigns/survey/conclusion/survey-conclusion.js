import getNode from '../../../../helpers/html-node';
import {
  flexHorizontal,
} from '../../../styles/display';
import {
  primaryButton,
} from '../../../styles/buttons';
import {
  title,
} from '../../../styles/typography';

export default class SurveyConclusion {
  constructor({ conclusion, onDismiss }) {
    this.conclusion = conclusion;

    const html = `
      <div id="ub-thumb-rating">
        <div id="ub-image-wrapper">
          <img src="${conclusion.imageUrl}" alt="feelings" border="0"
            height=40
          >
        </div>
        <div id="ub-conclusion-title">
          ${this._title}
        </div>
        <div id="ub-button-container">
          <div style="flex: 1;"></div>
          <button id="ub-submit">
            Close
          </button>
          <div style="flex: 1;"></div>
        </div>
      </div>
    `;

    const node = getNode(html);
    node.style.cssText = `
      padding-bottom: 24px;
    `;

    const imageWrapper = node.querySelector('#ub-image-wrapper');
    imageWrapper.style.cssText = `
      ${flexHorizontal}
      margin-bottom: 16px;
      justify-content: center;
    `;
    if (!conclusion.imageUrl) {
      imageWrapper.parentNode.removeChild(imageWrapper);
    }

    const titleNode = node.querySelector('#ub-conclusion-title');
    titleNode.style.cssText = title;

    const buttonsContainer = node.querySelector('#ub-button-container');
    buttonsContainer.style.cssText = `
      ${flexHorizontal}
      margin-top: 12px;
    `;
    const button = buttonsContainer.querySelector('#ub-submit');
    button.addEventListener("click", function() {
      onDismiss();
    });
    button.style.cssText = `
      ${primaryButton}
      font-size: 15px;
    `;

    this.container = node;
  }

  get _title() {
    return this.conclusion.title;
  }

  get node() {
    return this.container;
  }
}