$(document).ready(() => {
  Vue.component('channel-show', {
    props: ['name', 'id'],
    template: '<li>{{ name }}{{ id }}</li>',
  });

  new Vue({
    el: '#app',
    data: function() {
      return {
        apiUrl:
          'https://www.googleapis.com/youtube/v3/channels?key=' + key.apiKey,
        channelName: 'cock',
        channels: [],
      };
    },
    methods: {
      findChannels: function() {
        if (this.channelName == '') return;
        this.$http
          .get(this.apiUrl, {
            params: {part: 'snippet', forUsername: this.channelName},
          })
          .then(
            response => {
              this.channels = response.body.items;
            },
            response => {
              console.log('lel');
            },
          );
      },
    },
  });
});
