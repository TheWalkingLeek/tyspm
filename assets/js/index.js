$(document).ready(() => {
  Vue.component('playlist-show', {
    props: ['id', 'name'],

    data: function() {
      return {
        apiUrl: 'https://www.googleapis.com/youtube/v3/',
        videos: [],
        currentVideo: null,
      };
    },

    methods: {
      findVideos(pageToken) {
        if (this.resultAmount <= 0 && this.resultAmount > 50) return;
        this.$http
          .get(this.apiUrl + 'playlistItems', {
            params: {
              part: 'snippet',
              order: 'order',
              maxResults: 50,
              playlistId: this.id,
              key: key.apiKey,
              pageToken: pageToken,
            },
          })
          .then(
            response => {
              this.videos = this.videos.concat(response.body.items);
              if (response.body.nextPageToken) {
                this.findVideos(response.body.nextPageToken);
              } else {
                debugger;
                this.videos = this.videos.reverse();
                this.currentVideo = this.videos.pop();
              }
            },
            response => {
              console.log('lel');
            },
          );
      },

      nextVideo() {
        this.currentVideo = this.videos.pop();
      },
    },

    template: `<div>
    <h2>{{ name }}</h2>
    <button @click="findVideos">Find Videos</button>
    <div><video-show v-if="currentVideo" :id="currentVideo.snippet.resourceId.videoId"></video-show>
    <button v-if="currentVideo" @click="nextVideo">Next Video</button></div></div>
    `,
  }),
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
          apiUrl: 'https://www.googleapis.com/youtube/v3/',
          selected: false,
          resultAmount: 10,
          searchQuery: '',
          videos: [],
          currentVideo: null,
          playlists: [],
        };
      },
      methods: {
        selectChannel() {
          this.selected = true;
        },

        nextVideo() {
          this.currentVideo = this.videos.pop();
        },

        findVideos() {
          if (!this.searchQuery) this.searchQuery = '';
          if (this.resultAmount <= 0 && this.resultAmount > 50) return;
          this.$http
            .get(this.apiUrl + 'search', {
              params: {
                part: 'snippet',
                order: 'date',
                channelId: this.id,
                q: this.searchQuery,
                maxResults: this.resultAmount,
                key: key.apiKey,
              },
            })
            .then(
              response => {
                this.videos = response.body.items;

                this.currentVideo = response.body.items.pop();
              },
              response => {
                console.log('lel');
              },
            );
        },

        findPlaylists() {
          this.$http
            .get(this.apiUrl + 'playlists', {
              params: {
                part: 'snippet',
                channelId: this.id,
                maxResults: 50,
                key: key.apiKey,
              },
            })
            .then(
              response => {
                this.playlists = response.body.items;
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
    <h2>Playlists</h2>
    <button @click="findPlaylists">Find Playlists</button>
    <div>
      <ul>
        <li v-for="playlist in playlists">
          <playlist-show :id="playlist.id" :name="playlist.snippet.title"></playlist-show>
        </li>
      </ul>
    </div>
    <h2>Videos</h2>
    <label>Amount of Videos</label><input v-model="resultAmount">
    <label>Searchquery</label><input v-model="searchQuery"><button @click="findVideos">Find Videos</button></div>
    <div><video-show v-if="currentVideo" :id="currentVideo.id.videoId"></video-show>
    <button v-if="currentVideo" @click="nextVideo">Next Video</button></div>
    </div>`,
    });

  new Vue({
    el: '#app',
    data: function() {
      return {
        apiUrl:
          'https://www.googleapis.com/youtube/v3/channels?key=' + key.apiKey,
        channelName: '',
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
