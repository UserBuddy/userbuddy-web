
import Userbuddy from '../../userbuddy';
import Survey from '../../views/campaigns/survey/survey';
import Review from '../../views/campaigns/review/review';

export default class CampaignViewManager {
  static get campaigns() {
    return Userbuddy.campaigns.eligible;
  }
  static maybeDisplayNext() {
    if (CampaignViewManager.campaigns.length > 0) {
      const campaignToShow = CampaignViewManager.campaigns
        .find((val) => val.display.automatic);
      if (campaignToShow) {
        this._maybeDisplayWithDelay({
          campaign: campaignToShow,
        });
      }
    }
  }

  static maybeDisplay({ campaignName }) {
    const campaignToShow = CampaignViewManager.campaigns
      .find((val) => val.name === campaignName);
    if (campaignToShow) {
      this._maybeDisplayWithDelay({
        campaign: campaignToShow,
      });
    }
  }

  static _maybeDisplayWithDelay({campaign}) {
    if (CampaignViewManager.isCampaignActivelyDisplayed) {
      return;
    }
    CampaignViewManager.isCampaignActivelyDisplayed = true;
    const delay = campaign.display.delay;
    setTimeout(() => {
      this._display({ campaign });
    }, delay);
  }

  static _display({ campaign }) {
    switch (campaign.type) {
      case "Survey":
        this._displaySurvey({ campaign });
        break;
      case "Review":
        this._displayReview({ campaign });
        break;
      case "Content":
        this._displayContent({ campaign });
        break;
      default:
        break;
    }
  }

  static _displaySurvey({ campaign }) {
    const survey = new Survey({ campaign: campaign });
    document.body.appendChild(survey.node);
  }

  static _displayReview({ campaign }) {
    const review = new Review({ campaign, });
    document.body.appendChild(review.node);
  }

  static _displayContent({ campaign }) {
    
  }
}