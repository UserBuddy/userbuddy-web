import Cookies from 'js-cookie';

function generateUuid() {
  // eslint-disable-next-line func-names
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function getDeviceId() {
  let deviceId = Cookies.get('$userbuddy-device-id');
  if (!deviceId) {
    deviceId = generateUuid();
    Cookies.set('$userbuddy-device-id', deviceId, { expires: 10000 });
  }

  return deviceId;
}
