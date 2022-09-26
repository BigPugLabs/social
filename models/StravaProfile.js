const mongoose = require("mongoose");

const StravaProfileSchema = new mongoose.Schema({
  stravaID: {
    type: Number,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  avatar: {
    type: String,
    required: true,
  },
  city: {
    type: String
  },
  state: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  stravaCreatedAt: {
    type: String,
    required: true,
  },
  stravaUpdatedAt: {
    type: String,
    required: true,
  },
  authorizedAt: {
    type: Date,
    default: Date.now,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  tokenRefreshed: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StravaProfile", StravaProfileSchema);


/* sample profile from auth
{
  provider: 'strava',
  id: 1111111,
  displayName: 'Bob M',
  name: { first: 'Bob', last: 'M' },
  avatar: 'https://d3nn82uaxijpm6.cloudfront.net/assets/avatar/athlete/large-5493yg8r97e0g74543643.png',
  _raw: '{"id":1111111,"username":null,"resource_state":2,"firstname":"Bob","lastname":"M","bio":"","city":"Edinburgh","state":"Scotland","country":"United Kingdom","sex":"M","premium":false,"summit":false,"created_at":"2014-01-18T20:22:51Z","updated_at":"2022-09-19T22:19:51Z","badge_type_id":0,"weight":81.0,"profile_medium":"https://d3nn82uaxijpm6.cloudfront.net/assets/avatar/athlete/medium-5387gr7d7997gres7g3325325.png","profile":"https://d3nn82uaxijpm6.cloudfront.net/assets/avatar/athlete/large-800a7033c5232627361y22663f.png","friend":null,"follower":null}',
  _json: {
    id: 1111111,
    username: null,
    resource_state: 2,
    firstname: 'Bob',
    lastname: 'M',
    bio: '',
    city: 'Edinburgh',
    state: 'Scotland',
    country: 'United Kingdom',
    sex: 'M',
    premium: false,
    summit: false,
    created_at: '2014-01-18T20:22:51Z',
    updated_at: '2022-09-19T22:19:51Z',
    badge_type_id: 0,
    weight: 81,
    profile_medium: 'https://d3nn82uaxijpm6.cloudfront.net/assets/avatar/athlete/medium-0752395490475493ug90835902u05u.png',
    profile: 'https://d3nn82uaxijpm6.cloudfront.net/assets/avatar/athlete/large-5432u98ugkop4u53t84f.png',
    friend: null,
    follower: null
  }
}
*/