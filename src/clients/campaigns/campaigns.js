import Userbuddy from '../../userbuddy';
import CampaignViewManager from '../../view-managers/campaigns/campaign-view-manager';
import content from './test-data/content.json';
import survey from './test-data/survey.json';
import review from './test-data/review.json';

export default class UBEvents {
  constructor() {
    this.eligible = [];
  }

  displayIfEligible({ name }) {
    CampaignViewManager.maybeDisplayNext({ campaignName: name });
  }

  _getEligible() {
    Userbuddy._service.get({
      path: '/campaigns',
    })
      .then((response) => {
        this.eligible = [
          ...response.data.campaigns,
          // TODO: remove hardcoded ones
          survey,
          review,
          content,
        ];
        this._maybeDisplayNext();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _complete({campaign}) {
    CampaignViewManager.isCampaignActivelyDisplayed = false;
    Userbuddy.events.track({
      name: '$CampaignParticipation',
      properties: {
        '$campaignId': campaign.id,
        '$didParticipate': true,
      },
    });
    this._remove({campaign});
  }

  _dismiss({campaign}) {
    CampaignViewManager.isCampaignActivelyDisplayed = false;
    Userbuddy.events.track({
      name: '$CampaignParticipation',
      params: {
        '$campaignId': campaign.id,
        '$didParticipate': false,
      }
    });
    this._remove({campaign});
  }

  _remove({campaign}) {
    const findIndex = this.eligible.findIndex((val) => val.id === campaign.id);
    if (findIndex >= 0) {
      this.eligible.splice(findIndex, 1);
      this._maybeDisplayNext();
    }
  }

  _maybeDisplayNext() {
    if (this.eligible.length > 0) {
      CampaignViewManager.maybeDisplayNext();
    }
  }

}