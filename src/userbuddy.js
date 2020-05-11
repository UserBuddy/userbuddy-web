import Service from './service/service';
import UBEvents from './clients/events/events';
import UBCampaigns from './clients/campaigns/campaigns';
import UBPerson from './clients/person/person';

export default class Userbuddy {
  constructor({apiKey, appVersion = null}) {
    this._service = new Service({apiKey, appVersion});
    this._events = new UBEvents();
    this._campaigns = new UBCampaigns();
    this._person = new UBPerson();
  }

  static get _service() {
    if (!Userbuddy._instance) {
      throw Error("Userbuddy client has not yet been initialized");
    }
    return Userbuddy._instance._service;
  }

  static get events() {
    if (!Userbuddy._instance) {
      throw Error("Userbuddy client has not yet been initialized");
    }
    return Userbuddy._instance._events;
  }

  static get campaigns() {
    if (!Userbuddy._instance) {
      throw Error("Userbuddy client has not yet been initialized");
    }
    return Userbuddy._instance._campaigns;
  }

  static get person() {
    if (!Userbuddy._instance) {
      throw Error("Userbuddy client has not yet been initialized");
    }
    return Userbuddy._instance._person;
  }

  static initialize({apiKey, appVersion = null}) {
    Userbuddy._instance = new Userbuddy({
      apiKey,
      appVersion,
    });
    Userbuddy.events._trackUsage();
    Userbuddy.campaigns._getEligible();
  }
}
