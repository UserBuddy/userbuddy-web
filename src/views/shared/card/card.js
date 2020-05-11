import getNode from '../../../helpers/html-node';

export default class Card {
  constructor() {
    const html = `
      <div id="ub-card">
        <div id="ub-card-inner"></div>
      </div>
    `
    const card = getNode(html);
    
    card.style.cssText = `
      box-shadow: 0px 2px 4px rgba(0, 0, 0, .24);
      background-color: white;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      padding-left: 24px;
      padding-right: 24px;
      padding-top: 20px;
      border-radius: 12px;
    `;

    this.card = card;
  }

  get node() {
    return this.card;
  }

  set({ child }) {
    if (this.childNode) {
      this.childNode.parentNode.removeChild(this.childNode);
    }
    this.childNode = child;
    this.card.querySelector('#ub-card-inner').appendChild(child);
  }
}