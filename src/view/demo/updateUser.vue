<template>
  <el-dialog
    :title="editData.dialogTitle"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :before-close="handleDialogClose"
  >
    <el-form :model="editData.editForm" ref="editForm" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="editData.editForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="editData.editForm.sex">
          <el-radio class="radio" :label="1">男</el-radio>
          <el-radio class="radio" :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number v-model="editData.editForm.age" :min="0" :max="200"></el-input-number>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker type="date" placeholder="选择日期" v-model="editData.editForm.birth"></el-date-picker>
      </el-form-item>
      <el-form-item label="地址">
        <el-input type="textarea" v-model="editData.editForm.address"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="cellsumbit">取消</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
    </div>
  </el-dialog>
</template>
 
<script>
import { editUser } from "../../api/demoApi";
export default {
  data() {
    return {
      editData: {
        dialogTitle: "",
        editForm: {
          id: 0,
          name: "",
          sex: -1,
          age: 0,
          birth: "",
          address: ""
        }
      },
      editLoading: false,
      visible: false
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    datas: {
      type: Object
    }
  },

  // 监听
  watch: {
    show() {
      this.editData = this.datas;
      this.visible = this.show;
    }
  },

  // 组件创建时调用
  created() {
    console.log("222", this.show, this.visible);
  },
  // 组件更新时调用
  updated() {
    console.log("333", this.show, this.visible);
  },
  methods: {
    // 点击 X 关闭对话框的回调
    handleDialogClose() {
      /* return { shows: false }; */
      this.$emit("renovate", { shows: false });
    },
    // 取消按钮事件
    cellsumbit() {
      /* this.props.show = false; */
      this.visible = false;
      this.$emit("renovate", { shows: false });
    },
    // 点击确认按钮事件
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editData.editForm);
              editUser(para).then(res => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                /* this.$refs['editForm'].resetFields() */
                this.visible = false;
                this.$emit("renovate", { shows: false });
              });
            })
            .catch(() => {});
        }
      });
    }
  }
};
</script>