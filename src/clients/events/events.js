import Userbuddy from '../../userbuddy';
import validateProperties from '../../helpers/validate-properties';
import getCurrentTimestamp from '../../helpers/current-timestamp';

export default class UBEvents {
  constructor() {
    // No variables to set
  }

  _trackUsage() {
    this.track({
      name: '$Usage',
      properties: {},
    });
  }

  track({
    name,
    properties,
  }) {
    const params = validateProperties(properties);
    Userbuddy._service.post({
      path: '/events/single',
      data: {
        name,
        timestamp: getCurrentTimestamp(),
        params,
      },
    })
      .then(() => {
        console.log(`Userbuddy event ${name} was tracked successfully.`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _trackMany({
    events,
  }) {
    events.map((event) => {
      if (!event.name) {
        throw Error('Userbuddy event property "name" is unknown');
      }
      if (!event.params) {
        throw Error('Userbuddy event property "name" is unknown');
      }
      event.params = validateProperties(event.params);
      event.timestamp = getCurrentTimestamp();

      return event;
    });

    Userbuddy._service.post({
      path: '/events/many',
      data: {
        list: events,
      },
    })
      .then(() => {
        console.log(`Userbuddy ${events.length} events were tracked successfully.`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}