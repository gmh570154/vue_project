<template>
  <div class="video">
    <Video msg="some video info"/>
  </div>
</template>


<script>
// @ is an alias to /src
import Video from '@/components/Video.vue'

export default {
  name: 'VideoPage',
  components: {
    Video
  }
}
</script>