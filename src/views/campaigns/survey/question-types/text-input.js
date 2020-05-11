import getNode from '../../../../helpers/html-node';
import {
  flexHorizontal,
} from '../../../styles/display';
import {
  textAreaInput,
  textAreaFocus,
} from '../../../styles/inputs';
import {
  primaryButton,
  secondaryButton,
} from '../../../styles/buttons';
import {
  title,
} from '../../../styles/typography';

export default class TextInput {
  constructor({ question, onSubmit }) {
    this.question = question;

    const html = `
      <div id="ub-text-input">
        <div id="ub-question-title">
          ${this._title}
        </div>
        <div id="ub-textarea-container">
          <textarea id="ub-textarea" autofocus placeholder="Enter text..."></textarea>
        </div>
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

    const textAreaContainer = node.querySelector('#ub-textarea-container');
    textAreaContainer.style.cssText = `
      width: 100%;
    `;
    const textArea = node.querySelector('#ub-textarea');
    textArea.style.cssText = `
      width: 100%;
      ${textAreaInput}
    `;
    textArea.addEventListener('focus', (event) => {
      event.target.style.cssText = `
        ${textAreaInput}
        ${textAreaFocus}
      `; 
    });
    
    textArea.addEventListener('blur', (event) => {
      event.target.style.cssText = `
        ${textAreaInput}
      `;
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
      dismissButton.addEventListener("click", function() {
        onSubmit(textArea.value);
      });
    }

    const submit = actionBar.querySelector('#ub-submit');
    submit.style.cssText = primaryButton;
    submit.addEventListener("click", function() {
      if (question.required && !textArea.value) return;
      onSubmit(textArea.value);
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