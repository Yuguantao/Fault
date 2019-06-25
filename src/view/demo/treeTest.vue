<template>
  <el-col style="width:300px">
    <Tree :datas="menus" ></Tree>
  </el-col>
</template>

<script>
import Tree from "../../components/commonTree.vue";
import { getTree } from "../../api/usersApi";
export default {
  data() {
    return {
      menus: []
    };
  },
  components: {
    Tree
  },
  created() {
    this.getTreeData();
  },
  methods: {
    // 获取树形数据
    getTreeData() {
      let code = 1;
      getTree(code)
        .then(data => {
          if (data === undefined || data === null) {
            this.$message({
              message: "数据请求失败，请重试！",
              type: "error"
            });
          } else {
            let last = data.treeData01;
            this.menus = last.data;
          }
        })
        .catch(error => {
          this.$message({
            message: "服务器请求出错，请重试！",
            type: "error"
          });
        });
    }
  }
};
</script>