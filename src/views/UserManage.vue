<template>
  <main id="UserManage">
    <div class="container">
      <div class="control">
        <q-input :dense="true" class="search" filled v-model="searchAccount">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="q-pt-md">
        <q-table
          class="table-class"
          :rows="rows"
          :columns="columns"
          row-key="account"
          separator="cell"
          no-data-label="查無使用者"
          no-results-label="查無使用者"
          :filter="searchAccount"
          hide-pagination>
          <template v-slot:header="">
            <q-tr>
              <q-th
                colspan="1"
                class="table-header-class"
                style="width:200px"
              >帳號</q-th>
              <q-th
                colspan="1"
                class="table-header-class"
                style="width:200px"
              >名稱</q-th>
              <q-th
                colspan="1"
                class="table-header-class"
                style="width:100px"
              >權限</q-th>
              <q-th
                colspan="1"
                class="table-header-class"
                style="width:80px"
              >刪除</q-th>
              <q-th
                colspan="1"
                class="table-header-class"
                style="width:80px"
              >編輯</q-th>
            </q-tr>
          </template>
          <template v-slot:body-cell-account="colValue">
            <q-td align="center" class="cell-class">{{colValue.row.account}}</q-td>
          </template>
          <template v-slot:body-cell-name="colValue">
            <q-td align="center" class="cell-class">{{colValue.row.name}}</q-td>
          </template>
          <template v-slot:body-cell-permission="colValue">
            <q-td align="center" class="cell-class">{{colValue.row.permission}}</q-td>
          </template>
          <template v-slot:body-cell-delete>
            <q-td align="center" class="cell-class">
              <div style="display:inline">
                <q-btn icon="delete" flat/>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-edit>
            <q-td align="center" class="cell-class">
              <div style="display:inline">
                <q-btn icon="edit" flat/>
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { reactive, onMounted, ref, Ref } from "vue";
import { apiGetAllUser } from "../apis/api/userRequest";
export default {
  setup() {
    onMounted(() => {
      getAllUser();
    });
    const searchAccount:Ref<string> = ref("");
    const columns = reactive([
      {
        name: "account",
        label: "帳號",
        field: "account",
      },
      {
        name: "name",
        label: "名稱",
        field: "name",
      },
      {
        name: "permission",
        label: "權限",
        field: "permission",
      },
      {
        name: "delete",
        label: "刪除",
        field: "delete",
      },
      {
        name: "edit",
        label: "編輯",
        field: "edit",
      }
    ]);

    const rows:Array<any> = reactive([]);

    function getAllUser() {
      apiGetAllUser().then((response:any)=>{
        response.data.forEach((object: any) => {
          rows.push(object);
        });
      });
    }

    return {
      columns,
      rows,
      getAllUser,
      searchAccount
    };
  },
};
</script>
