import Userbuddy from '../../../userbuddy';
import Popup from '../../shared/popup/popup';
import ReviewRequest from './review-request/review-request';

export default class Review {
  constructor({ campaign }) {
    this.campaign = campaign;
    this.submitted = false;

    switch (campaign.display.type) {
      case "Popup":
        const popup = new Popup({ child: null });
        this.container = popup;
        break;
      default:
        console.log(`Userbuddy: cannot display review with unknown display type ${campaign.display.type}`);
        return;
    }

    this._display();
  }

  _display() {
    const review = this.campaign.typeData.review;
    if (!review) {
      throw Error("Userbuddy:: _displayNext(): campaign.typeData.review is null or undefined")
    }
    const reviewRequest = new ReviewRequest({
      review,
      onFinish: (didAccept) => {
        this._submit(didAccept);
      },
    });
    let child = reviewRequest.node;
    this.container.set({ child: child });
  }

  _submit(didAccept) {
    if (this.submitted) return;
    this.node.parentNode.removeChild(this.node);
    if (didAccept) {
      Userbuddy.campaigns._complete({
        campaign: this.campaign,
      });
    } else {
      Userbuddy.campaigns._dismiss({
        campaign: this.campaign,
      });
    }

    this.submitted = true;
  }

  get node() {
    return this.container.node;
  }
}
