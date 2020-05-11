import Userbuddy from '../../userbuddy';
import validateProperties from '../../helpers/validate-properties';
import getCurrentTimestamp from '../../helpers/current-timestamp';

export default class UBPerson {
  constructor() {
    // No variables to set
  }

  set({
    properties,
  }) {
    validateProperties(properties);
    Userbuddy._service.post({
      path: '/person/properties',
      data: {
        timestamp: getCurrentTimestamp(),
        properties,
      },
    })
      .then(() => {
        console.log('Userbuddy properties set successfully.');
      })
      .catch((error) => {
        console.log(error);
      });
  }

}