const subscribes = {};

function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  isValid = isValid && username.length < 20;
  return isValid;
}

export default {
  isValidUsername,
  subscribes,
};