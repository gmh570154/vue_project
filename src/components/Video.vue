<template>
    <div class="container">
        <div class="row main">
            <div class="col-md-12">
                <h2 class="top_title">
                    <span class="glyphicon glyphicon-menu-left" aria-hidden="true" >海贼王</span>
                </h2>
                <div class="container" style="width: 80%; margin: 30px auto">
                    <video v-show ="hls" id="video" controls loop="false" ref="video" width="50%"></video>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let Hls = require('hls.js');

export default {
    name: 'Video',
    data() {
      return {
        hls: ''
      };
    },
    mounted() {
        this.playVideo("http://192.168.110.128:82/out/play_list.m3u8");
    },
    methods: {
      videoPause() {
        if (this.hls) {
          this.$refs.video.pause();
          this.hls.destroy();
          this.hls = null;
        }
      },
      playVideo(source) {
        if (Hls.isSupported()) {
          this.hls = new Hls();
          this.hls.loadSource(source);
          this.hls.attachMedia(this.$refs.video);
          this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log('加载成功');
            this.$refs.video.play();
          });
          this.hls.on(Hls.Events.ERROR, (event, data) => {
            console.log(event, data);
            // 监听出错事件
            console.log('加载失败');
          });
        }
      },
      beforeDestroy() {
        this.videoPause();
      }
    }
}
</script>
