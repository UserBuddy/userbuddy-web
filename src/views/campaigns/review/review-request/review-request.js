import getNode from '../../../../helpers/html-node';
import {
  flexHorizontal,
} from '../../../styles/display';
import {
  primaryButton, secondaryButton,
} from '../../../styles/buttons';
import {
  title, subtitle,
} from '../../../styles/typography';

export default class ReviewRequest {
  constructor({ review, onFinish }) {
    this.review = review;

    const html = `
      <div id="ub-review">
        <div id="ub-title">
          ${this._title}
        </div>
        <div id="ub-subtitle">
          ${this._subtitle}
        </div>
        <div id="ub-button-container">
          <div style="flex: 1;"></div>
          <button id="ub-submit">
            Leave Review
          </button>
          <div style="flex: 1;"></div>
        </div>
        <div id="ub-button-container-2">
          <div style="flex: 1;"></div>
          <button id="ub-dismiss">
            No Thanks
          </button>
          <div style="flex: 1;"></div>
        </div>
      </div>
    `;

    const node = getNode(html);
    node.style.cssText = `
      padding-bottom: 24px;
    `;

    const titleNode = node.querySelector('#ub-title');
    titleNode.style.cssText = `
      ${title}
      margin-bottom: 8px;
    `;

    const subtitleNode = node.querySelector('#ub-subtitle');
    subtitleNode.style.cssText = subtitle;

    const buttonsContainer = node.querySelector('#ub-button-container');
    buttonsContainer.style.cssText = `
      ${flexHorizontal}
      margin-top: 12px;
    `;
    const button = buttonsContainer.querySelector('#ub-submit');
    button.addEventListener("click", function() {
      window.open(review.webLink, '_blank');
      onFinish(true);
    });
    button.style.cssText = `
      ${primaryButton}
    `;

    const buttonsContainer2 = node.querySelector('#ub-button-container-2');
    buttonsContainer2.style.cssText = `
      ${flexHorizontal}
      margin-top: 12px;
    `;
    const button2 = buttonsContainer2.querySelector('#ub-dismiss');
    button2.addEventListener("click", function() {
      onFinish(false);
    });
    button2.style.cssText = `
      ${secondaryButton}
    `;

    this.container = node;
  }

  get _title() {
    return this.review.title;
  }

  get _subtitle() {
    return this.review.subtitle;
  }

  get node() {
    return this.container;
  }
}