import getNode from '../../../../helpers/html-node';
import {
  flexHorizontal,
} from '../../../styles/display';
import {
  imageButton,
} from '../../../styles/buttons';
import {
  title,
} from '../../../styles/typography';

export default class ThumbRating {
  constructor({ question, onPress }) {
    this.question = question;

    const html = `
      <div id="ub-thumb-rating">
        <div id="ub-question-title">
          ${this._title}
        </div>
        <div id="ub-thumb-buttons">
          <div style="flex: 1;"></div>
          <button id="ub-thumbs-down">
            <img src="https://i.ibb.co/K0BXy93/thumb-down.png"
              alt="thumb-up" border="0"
              width=32 height=32
            >
          </button>
          <button id="ub-thumbs-up">
            <img src="https://i.ibb.co/9Y1VpVW/thumb-up.png"
              alt="thumb-up" border="0"
              width=32 height=32
            >
          </button>
          <div style="flex: 1;"></div>
        </div>
      </div>
    `;

    const node = getNode(html);
    node.style.cssText = `
      padding-bottom: 24px;
    `;
    const titleNode = node.querySelector('#ub-question-title');
    titleNode.style.cssText = title;

    const buttonsContainer = node.querySelector('#ub-thumb-buttons');
    buttonsContainer.style.cssText = `
      ${flexHorizontal}
      margin-top: 12px;
    `;
    const thumbsDown = buttonsContainer.querySelector('#ub-thumbs-down');
    thumbsDown.addEventListener("click", function() {
      onPress(false);
    });
    thumbsDown.style.cssText = `
      ${imageButton}
      margin-right: 32px;
    `;
    const thumbsUp = buttonsContainer.querySelector('#ub-thumbs-up');
    thumbsUp.style.cssText = imageButton;
    thumbsUp.addEventListener("click", function() {
      onPress(true);
    });

    this.container = node;
  }

  get _title() {
    return this.question.title;
  }

  get node() {
    return this.container;
  }
}