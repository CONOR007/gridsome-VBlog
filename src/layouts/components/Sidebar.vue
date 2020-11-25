<template>
<div>
  <el-card shadow="never">
    <el-menu>
      <g-link class="nav-link" :to="item.path" v-for="item in routerMap" :key="item.id">
        <el-menu-item :class="{ 'is-active': path === item.path }">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </g-link>
    </el-menu>
  </el-card>
</div>
</template>

<script>
export default {
  data() {
    return {
      routerMap: [{
          id: 0,
          path: "/",
          name: "最新动态",
          icon: "el-icon-star-off",
        },
        {
          id: 1,
          path: "/social",
          name: "社交圈",
          icon: "el-icon-mobile-phone",
        },
        {
          id: 2,
          path: "/blog",
          name: "博客列表",
          icon: "el-icon-edit-outline",
        },
        {
          id: 3,
          path: "/project",
          name: "开源项目",
          icon: "el-icon-service",
        },
      ],
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
};
</script>
