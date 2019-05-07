<template>
    <div class="video">
        <audio class="video__player" :src="videoSrc" controls="controls" loop="loop" autoplay="autoplay">

        </audio>

    </div>
</template>

<script>

    export default {
        name: "MyVideo",
        data() {
            return {
                video: null,
                isPaused: true,
                isMuted: false,
                videoTime: '00:00 / 00:00',
                isDragging: false,
                isControlVisible: false,
                hidingEvent: null,
                videoProgress: 0,
                draggingStartX: 0,
                dotOffsetX: 0,
                progress: null,
                videoSrc:''
            };
        },
        computed: {
            
        },
        methods: {

            initVideoSrc(){
                
                this.videoSrc = sessionStorage.getItem("url");
            }
        },
        mounted() {
            this.initVideoSrc()
        },
    };
</script>

<style scoped>
    .video {
        position: relative;
        width: 100%;
        height:100px;
    }
    .video__player {
        width: 100%;
        height: 100px;
    }
</style>
