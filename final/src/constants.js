export const LOGIN_STATUS = {
  PENDING: 'pending',
  NOT_LOGGED_IN: 'notLoggedIn',
  IS_LOGGED_IN: 'loggedIn',
};

export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_GAMENAME: 'required-gamename',
  REQUIRED_RATING: 'required-rating',
  REQUIRED_OVERVIEW: 'required-overview',
  REQUIRED_GENRE: 'required-genre',
  REQUIRED_PRICE: 'required-price',
  REQUIRED_SALESPRICE: 'required-salesprice', 
  REQUIRED_LOWPRICE: 'required-lowprice',
};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
  [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',

  [SERVER.REQUIRED_GAMENAME]: 'Ensure game name is not empty or already exists.',
  [SERVER.REQUIRED_RATING]: 'Please enter a valid (numbers) rating',
  [SERVER.REQUIRED_OVERVIEW]: 'Please enter overview',
  [SERVER.REQUIRED_GENRE]: 'Please enter a valid (letters) genre',
  [SERVER.REQUIRED_PRICE]: 'Please enter a valid (numbers) price',
  [SERVER.REQUIRED_SALESPRICE]: 'Please enter a valid sales price (a number) that is lower than the original price',
  [SERVER.REQUIRED_LOWPRICE]: 'Please enter a valid (numbers) low price',

  default: 'Something went wrong.  Please try again',
};

