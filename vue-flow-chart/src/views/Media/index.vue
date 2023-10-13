<template>
    <div id="media">
        <h1>视频</h1>
        <div style="width: 98%;height: 98%;margin-top: 20px;">
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="选择摄像头">
                            <el-select v-model="formInline.videoId" placeholder="摄像头">
                                <el-option v-for="(item, index) in localDevice.videoIn " :key="index" :label="item.label"
                                    :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择麦克风">
                            <el-select v-model="formInline.audioInId" placeholder="麦克风">
                                <el-option v-for="(item, index) in localDevice.audioIn " :key="index" :label="item.label"
                                    :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择听筒">
                            <el-select v-model="formInline.audioOutId" placeholder="听筒">
                                <el-option v-for="(item, index) in localDevice.audioOut " :key="index" :label="item.label"
                                    :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="分辨率:Width">
                            <el-input v-model="formInline.width"></el-input>
                        </el-form-item>
                        <el-form-item label="分辨率:Height">
                            <el-input v-model="formInline.height"></el-input>
                        </el-form-item>
                        <el-form-item label="FPS">
                            <el-input v-model="formInline.frameRate"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <video id="localdemo01" ref="videoRef" autoplay controls muted></video>
            </el-row>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { reactive, mounted, ref } from "vue"
import { handleError, initInnerLocalDevice } from '@/hooks/media'

const localDevice = reactive({
    audioIn: [],
    videoIn: [],
    audioOut: []
})

const formInline = reactive({
    videoId: undefined,
    audioInId: undefined,
    audioOutId: undefined,
    width: 1080,
    height: 720,
    frameRate: 24,
})

const videoRef = ref(null);


mounted(() => {
    initInnerLocalDevice()
    localDevice.localDevice = localDevice
})

async function onSubmit() {
    let video = videoRef?.value;
    let stream = video?.srcObject
    if (stream) {
        stream.getAudioTracks().forEach((e: any) => {
            stream.removeTrack(e)
        })
        stream.getVideoTracks().forEach((e: any) => {
            stream.removeTrack(e)
        })
    }

    let newStream = await getTargetDeviceMedia(formInline.videoId, formInline.audioInId)
    video.srcObject = newStream
    video.muted = true

}

//获取设备 stream
async function getLocalUserMedia(constraints: any) {
    return await navigator.mediaDevices.getUserMedia(constraints)
}

//获取指定媒体设备id对应的媒体流
async function getTargetDeviceMedia(videoId: string, audioId: string) {
    const constraints: MediaStreamConstraints = {
        audio: { deviceId: audioId ? { exact: audioId } : undefined },
        video: {
            deviceId: videoId ? { exact: videoId } : undefined,
            width: formInline.width,
            height: formInline.height,
            frameRate: { ideal: formInline.frameRate, max: 24 }
        }
    };

    if (window.stream) {
        window.stream.getTracks().forEach((track: MediaStreamTrack) => {
            track.stop();
        });
    }

    return await getLocalUserMedia(constraints).catch(handleError);
}
</script>
  
<style scoped lang="scss">
#media {
    width: 100vw;
    height: 100vh;
    background-color: #d0caca;

    #localdemo01 {
        width: 500px;
        height: 400px;

    }
}
</style>
  