<template>
  <div class="dialog" v-show="showMask.showFlg">
    <div class="dialog-container">
      <div class="dialog-title">{{title}}</div>
      <el-form :model="showMask.form" class="formCss">
        <el-form-item label="广告名称" class="formLabel">
          <el-input v-model="showMask.form.name" autocomplete="off" class="formInput"></el-input>
        </el-form-item>
        <el-form-item label="选择投放周期" class="formLabel">
          <el-select v-model="showMask.form.region" placeholder="请选择活动区域" class="formInput">
            <template v-for="item in options">
            <el-option
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="btns">
        <el-button type="info" @click="closeBtn">{{"取消"}}</el-button>
        <el-button type="primary" @click="confirmBtn">{{"确认"}}</el-button>
      </div>
      <div class="close-btn" @click="closeMask">X</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      showFlg: false,
        form: {
          name: "",
          region: ""
        }
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showMask: {
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
    // 关闭弹框
    closeMask() {
      this.showMask.showFlg = false;
    },
    closeBtn() {
      this.$emit("cancel");
      this.closeMask();
    },
    confirmBtn() {
      this.$emit("confirm");
      this.closeMask();
    }
  },
  mounted() {
    // 在生命周期中，把获取的value值获取给showMash
    this.showMask = this.value;
  },
  watch: {
    value(newVal, oldVal) {
      // 监测value的变化，并赋值。
      this.showMask = newVal;
    },
    showMask(val) {
      // 此处监测showMask目的为关闭弹窗时，重新更换value值，注意emit的事件一定要为input。
      this.$emit("input", val);
    }
  }
};
</script>
<style lang="less" scoped>
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  .dialog-container {
    width: 500px;
    height: 380px;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    position: relative;
    .dialog-title {
      width: 100%;
      height: 60px;
      font-size: 18px;
      color: #696969;
      font-weight: 600;
      padding: 16px 50px 0 20px;
      box-sizing: border-box;
    }
    .inp {
      margin: 10px 0 0 20px;
      width: 200px;
      height: 40px;
      padding-left: 4px;
      border-radius: 4px;
      border: none;
      background: #efefef;
      outline: none;
      &:focus {
        border: 1px solid #509ee3;
      }
    }
    .formCss {
      padding-left: 20px;
      display: inline-table;
      /* justify-content: space-between; */
      // padding-top: 10px;
      .formLable {
        text-align: left;
        font-size: 14px;
        width: 30px;
      }
      .formInput {
        width: 240px;
      }
    }
    .btns {
      width: 100%;
      height: 60px;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: right;
      padding: 0 16px;
      box-sizing: border-box;
      & > div {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        padding: 0 14px;
        color: #ffffff;
        background: #f1f1f1;
        border-radius: 8px;
        margin-right: 12px;
        cursor: pointer;
      }
    }
    .close-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 30px;
      height: 30px;
      text-align: center;
      font-size: 18px;
      color: #696969;
      cursor: pointer;
      &:hover {
        color: #66b1ff;
      }
    }
  }
}
</style>