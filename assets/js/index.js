$(document).ready(() => {
  Vue.component('video-show', {
    props: ['id'],

    template: `
<iframe width="560" height="315" v-bind:src="'https://www.youtube.com/embed/' + this.id + '?controls=0'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `,
  }),
    Vue.component('channel-show', {
      props: ['name', 'id'],
      data: function() {
        return {
          apiUrl:
            'https://www.googleapis.com/youtube/v3/search?part=snippet&key=' +
            key.apiKey,
          selected: false,
          resultAmount: 10,
          searchQuery: 'WiiWare Chronicles',
          videos: [],
        };
      },
      methods: {
        selectChannel() {
          this.selected = true;
        },

        findVideos() {
          if (this.resultAmount <= 0 && this.resultAmount > 50) return;
          this.$http
            .get(this.apiUrl, {
              params: {
                channelId: this.id,
                q: this.searchQuery,
                maxResults: this.resultAmount,
              },
            })
            .then(
              response => {
                this.videos = response.body.items;
              },
              response => {
                console.log('lel');
              },
            );
        },
      },
      template: `<div>{{ name }}
    <button @click="selectChannel">select</button>
    <div v-if="selected">
    <label>Anzahl Videos</label><input v-model="resultAmount">
    <label>Suchbegriff</label><input v-model="searchQuery"><button @click="findVideos">Submit</button></div>
    <div><video-show v-for="video in videos" :id="video.id.videoId"></video-show></div>
    </div>`,
    });

  new Vue({
    el: '#app',
    data: function() {
      return {
        apiUrl:
          'https://www.googleapis.com/youtube/v3/channels?key=' + key.apiKey,
        channelName: 'scottthewoz',
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
