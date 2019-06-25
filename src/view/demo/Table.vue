<template>
  <el-col style="padding:20px;height :65em;width:118em">
    <el-col :model="searchData" style="height:5em">
      <el-input placeholder="账号名称" v-model="searchData.name" style="width:280px" clearable></el-input>
      <label>性别:</label>
      <el-select v-model="searchData.sex" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" v-on:click="getUser">搜索</el-button>
    </el-col>
    <el-col>
      <el-table
        :data="usersList"
        stripe
        border
        style="line-height: 20px"
        v-loading="listLoading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="100"
          :formatter="formatSex"
          sortable
          align="center"
        ></el-table-column>
        <el-table-column prop="age" label="年龄" width="100" sortable align="center"></el-table-column>
        <el-table-column prop="birth" label="生日" width="120" sortable align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleAdd(scope.$index, scope.row)">Add</el-button>
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <!-- 分页 -->
    <el-col class="pagination">
      <el-pagination
        small
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-size="20"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-col>
    <!--编辑界面-->
    <update :show="shows" @renovate="getUser" :datas="editData"></update>
  </el-col>
</template>

<script>
import { getUserListPage, removeUser } from "../../api/demoApi";
import update from "./updateUser.vue";

export default {
  components: {
    update
  },
  data() {
    return {
      searchData: {
        name: "",
        sex: ""
      },
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
      shows: false,
      usersList: [],
      page: 1,
      total: 0,
      listLoading: false,
      //列表选中列
      multipleSelection: [],
      options: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "0",
          label: "女"
        }
      ]
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    //显示编辑界面
    handleEdit: function(index, row) {
      this.shows = true;
      this.editData.dialogTitle = "用户编辑";
      this.editData.editForm = Object.assign({}, row);
    },

    // 显示增加画面
    handleAdd: function(index, row) {
      this.shows = true;
      this.editData.dialogTitle = "新增用户";
    },

    //删除
    handleDelete: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getUser();
          });
        })
        .catch(() => {});
    },
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },

    // 选中行信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 获取当前页信息
    handleCurrentChange(val) {
      this.page = val;
      this.getUser();
    },
    // 获取用户列表
    getUser(data) {
      if (data !== undefined) {
        this.shows = data.shows;
        this.editData.editForm.id = 0;
        this.editData.editForm.name = "";
        this.editData.editForm.sex = -1;
        this.editData.editForm.age = 0;
        this.editData.editForm.birth = "";
        this.editData.editForm.address = "";
      }
      let para = {
        page: this.page,
        name: this.searchData.name,
        sex: this.searchData.sex
      };
      this.listLoading = true;
      getUserListPage(para).then(res => {
        this.total = res.data.total;
        this.usersList = res.data.users;
        this.listLoading = false;
      });
    }
  }
};
</script>

<style>
.pagination {
  height: 5em;
  margin-top: 15px;
}
.el-table td,
.el-table th {
  padding: 2px 0;
}
</style>
