
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

export default function validateProperties(properties) {
  return Object.fromEntries(
    // convert to array, map, and then fromEntries gives back the object
    Object.entries(properties).map(([key, val]) => {
      if (!['string', 'number', 'boolean'].includes(typeof val)) {
        throw Error(`Userbuddy property ${key} is invalid. Must be of type string, number, or boolean.`);
      }
      return [key, {
        value: val,
        dataType: (typeof val).capitalize(),
      }];
    })
  );
}