<template>
  <main id="VerifyPage">
    <div class="container">
      <div class="btn-list">
        <q-btn>全部</q-btn>
        <div class="line"></div>
        <q-btn>待審</q-btn>
        <q-btn>已審</q-btn>
        <q-btn>上呈</q-btn>
        <div class="line"></div>
        <q-input
          :dense="true"
          class="search"
          outlined
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <table class="list-table">
        <tr>
          <th>活動名稱</th>
          <th>活動資訊</th>
          <th>狀態</th>
        </tr>
        <tr>
          <td>活動活動</td>
          <td>活動活動資訊</td>
          <td>待審</td>
        </tr>
        <tr>
          <td>活動活動</td>
          <td>活動活動資訊</td>
          <td>待審</td>
        </tr>
        <tr>
          <td>活動活動</td>
          <td>活動活動資訊</td>
          <td>待審</td>
        </tr>
        <tr>
          <td>活動活動</td>
          <td>活動活動資訊</td>
          <td>待審</td>
        </tr>
      </table>
    </div>
  </main>
</template>

<script>
export default {
  setup() {},
};
</script>
