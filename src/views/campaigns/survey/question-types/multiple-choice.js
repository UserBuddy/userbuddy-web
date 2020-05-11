import getNode from '../../../../helpers/html-node';
import ChoiceOption from '../../../shared/buttons/choice-option';
import {
  flexHorizontal,
} from '../../../styles/display';
import {
  primaryButton,
  secondaryButton,
} from '../../../styles/buttons';
import {
  title,
} from '../../../styles/typography';

export default class MultipleChoice {
  constructor({ question, onSubmit }) {
    this.question = question;
    this.selected = '';
    this.onSubmit = onSubmit;

    const html = `
      <div id="ub-text-input">
        <div id="ub-question-title">
          ${this._title}
        </div>
        <div id="ub-question-container"></div>
        <div id="ub-action-bar">
          <div style="flex: 1;"></div>
          <button id="ub-dismiss">
            No Thanks
          </button>
          <button id="ub-submit">
            Submit
          </button>
        </div>
      </div>
    `;


    const node = getNode(html);
    node.style.cssText = `
      padding-bottom: 16px;
    `;
    const titleNode = node.querySelector('#ub-question-title');
    titleNode.style.cssText = title;

    const questionContainer = node.querySelector('#ub-question-container');
    questionContainer.style.cssText = `
      width: 100%;
    `;

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.optionButtons = question.options
      .map((option, index,) => {
        let optionId = index;
        if (question.options.length <= alphabet.length) {
          optionId = alphabet[index];
        }
        return new ChoiceOption({
          option,
          optionId: `${optionId}.`,
          selected: this.selected,
          onSelect: (newSelected) => {
            this.selected = newSelected;
            this.optionButtons.forEach((optionButton) => {
              optionButton.set({selected: newSelected});
            });
          },
        });
      });
    this.optionButtons.forEach((optionButton) => {
      questionContainer.appendChild(optionButton.node);
    });

    const actionBar = node.querySelector('#ub-action-bar');
    actionBar.style.cssText = `
      ${flexHorizontal}
      padding-top: 16px;
    `;

    const dismissButton = actionBar.querySelector('#ub-dismiss');
    if (question.required) {
      dismissButton.parentNode.removeChild(dismissButton);
    } else {
      dismissButton.style.cssText = `
        margin-right: 2px;
        ${secondaryButton}
      `;
      dismissButton.addEventListener("click", this.onSelected());
    }

    const submit = actionBar.querySelector('#ub-submit');
    submit.style.cssText = primaryButton;
    submit.addEventListener("click", this.onSelected());

    this.container = node;
  }

  onSelected() {
    return () => {
      if (this.question.required && !this.selected) return;
      this.onSubmit(this.selected);
    }
  }

  get _title() {
    return this.question.title;
  }

  get node() {
    return this.container;
  }
}