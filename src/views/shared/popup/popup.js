import Card from '../card/card';

export default class Popup {
  constructor({child}) {
    const popupCard = new Card();
    popupCard.node.style.cssText = `
      ${popupCard.node.style.cssText}
      position: fixed;
      z-index: 9999;
      right: 16px;
      bottom: 16px;
      width: 300px;
    `;

    this.popupCard = popupCard;
    if (child) {
      this.set({ child: child });
    }
  }

  get node() {
    return this.popupCard.node;
  }

  set({ child }) {
    this.popupCard.set({ child: child })
  }
}