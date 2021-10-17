<template>
  <div class="root">
    <div class="container">
      <ul class="progressbar">
        <li :class="{ active: isActive1 }">活動基本資料</li>
        <li :class="{ active: isActive2 }">報名表設計</li>
        <li :class="{ active: isActive3 }">完成</li>
        <li :class="{ active: isActive4 }">預覽</li>
        <li :class="{ active: isActive5 }">送出申請</li>
        <li :class="{ active: isActive6 }">審核中</li>
        <li :class="{ active: isActive7 }">審核通過</li>
        <li :class="{ active: isActive8 }">發佈</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive1: true,
      isActive2: false,
      isActive3: false,
      isActive4: false,
      isActive5: false,
      isActive6: false,
      isActive7: false,
      isActive8: false,
    };
  },
  methods: {
    // 進度修改
    pageChange(activeFlag) {
      switch (activeFlag) {
        case "toFormDesign":
          this.isActive2 = true;
          break;

        case "toDesignCompleted":
          this.isActive3 = true;
          break;

        case "toPreview":
          this.isActive4 = true;
          break;

        case "toReview":
          this.isActive5 = true;
          this.isActive6 = true;
          break;

        case "toReviewPass":
          this.isActive7 = true;
          break;

        case "toRelease":
          this.isActive8 = true;
          break;

        default:
          break;
      }
    },
  },
};
</script>