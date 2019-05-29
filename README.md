# The youtube spoiler prevention machine

So this is a basic vuejs app used to get youtube videos from a specific channel one by one so you don't get spoiled any results.

## Prerequisites

- [yarn](https://yarnpkg.com/en/docs/install)

Yarn is not necessary. It's only used for the webserver. You can also just open the file in your browser and skip all the yarn fuzz.

## Setup

- git clone `https://github.com/TheWalkingLeek/tyspm.git`
- adjust the api config
- yarn
- yarn serve

## API Config

First of all, you obviously need to register an [Youtube Data V3 API Key](https://www.youtube.com/intl/de/yt/dev/api-resources/).
After this you need to create an `/config/api.js` file:
`const key = { apiKey: '{YOUR_API_KEY}', };`
