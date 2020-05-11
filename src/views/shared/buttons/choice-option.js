import getNode from '../../../helpers/html-node';
import {
  flexHorizontal,
} from '../../styles/display';
import {
  choiceButton,
} from '../../styles/buttons';

export default class ChoiceOption {
  constructor({ option, optionId, selected, onSelect }) {
    this.option = option;

    const html = `
      <div id="ub-option">
        <div id="ub-option-id">${optionId}</div>
        <button id="ub-option-button">${option}</button>
      </div>
    `
    const container = getNode(html);
    container.style.cssText = `
      ${flexHorizontal}
      align-items: center;
      margin-bottom: 12px;
    `;
    
    const optionIdNode = container.querySelector('#ub-option-id');
    optionIdNode.style.cssText = `
      font-weight: 300;
      font-size: 13px;
      color: #8E8E93;
      margin-right: 8px;
    `;
    const optionButton = container.querySelector('#ub-option-button');
    optionButton.style.cssText = `
      ${choiceButton}
    `;
    optionButton.addEventListener("click", function() {
      if (this.isActive) {
        onSelect('');
      } else {
        onSelect(option);
      }
    });
    this.optionButton = optionButton;

    this.container = container;

    this.set({ selected });
  }

  get node() {
    return this.container;
  }

  get isActive() {
    return this.option === this.selected;
  }

  set({ selected }) {
    this.selected = selected;
    if (this.isActive) {
      this.optionButton.style.backgroundColor = "#007AFF";
      this.optionButton.style.color = "white";
    } else {
      this.optionButton.style.backgroundColor = "#F2F2F7";
      this.optionButton.style.color = "black";
    }
  }
}