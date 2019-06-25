<template>
  <div class="main">
    <el-form :model="sendVal.form" class="formCss">
      <el-form-item label="广告名称" class="formLabel">
        <el-input v-model="sendVal.form.name" autocomplete="off" class="formInput"></el-input>
      </el-form-item>
      <el-form-item label="选择投放周期" class="formLabel">
        <el-select v-model="sendVal.form.region" placeholder="请选择活动区域" class="formInput">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div @click="openMask">打开弹窗</div>
    <dialog-bar
      v-model="sendVal"
      title="舜泰广场"
      v-on:cancel="clickCancel()"
      @confirm="clickConfirm()"
    ></dialog-bar>
  </div>
</template>
<script>
import dialogBar from "./testdialog.vue";

export default {
  components: {
    "dialog-bar": dialogBar
  },
  data() {
    return {
      sendVal: {
        showFlg: false,
        form: {
          name: "",
          region: ""
        }
      },
      options: [
        {
          value: "1",
          label: "上海"
        },
        {
          value: "0",
          label: "北京"
        }
      ]
    };
  },
  methods: {
    openMask(index) {
      this.sendVal.showFlg = true;
      /* this.sendVal.form = { name: "asss", region: "1" }; */
    },
    clickCancel() {
      console.log("取消" + this.sendVal.form.name);
    },
    clickConfirm() {
      console.log("点击了confirm");
    }
  }
};
</script>
<style lang="less" scoped>
</style>