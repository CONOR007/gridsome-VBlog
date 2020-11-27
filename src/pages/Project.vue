<template>
<Layout>
  <div style="min-height: 600px">
    <el-card shadow="never" style="margin-bottom: 20px">
      <el-input placeholder="请输入关键字" clearable style="width: 300px"></el-input>
      <el-button icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
      <el-button icon="el-icon-share" type="warning" style="margin-left: 10px" plain circle></el-button>
    </el-card>

    <div v-if="projects&&projects.length>0">
      <el-card shadow="hover" v-for="({node: item},index) in projects" :key="'pro'+index" style="margin-bottom: 20px" v-if="!item.hide">
        <div slot="header">
          <el-row>
            <el-col :span="16">
              <span>
                <a style="text-decoration:none;cursor:pointer" @click="goDetails(item.name)">
                  <i class="el-icon-service"></i>&nbsp;&nbsp; {{item.name}}
                </a>
              </span>
            </el-col>
            <el-col :span="8">
              <div style="text-align: right;">
                <el-button @click="goGithub(item.url)" style="padding: 3px 0" type="text" icon="el-icon-back">前往GitHub</el-button>
                <el-button @click="$share('/user/project/details/'+item.name)" style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
          最近更新 {{item.updated_at}}
        </div>
        <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px">
          {{item.description}}
        </div>
        <div style="font-size: 1.1rem;color: #303133;padding: 10px 0px 0px 0px">
          <el-row>
            <el-col :span="16" style="padding-top: 5px">
              <el-tooltip effect="dark" :content="'star '+item.stargazersCount" placement="bottom">
                <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
              </el-tooltip>
              {{item.stargazersCount}}
              <el-tooltip effect="dark" :content="'watch '+item.watchersCount" placement="bottom">
                <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{item.watchersCount}}
              <el-tooltip effect="dark" :content="'fork '+item.forksCount" placement="bottom">
                <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{item.forksCount}}
            </el-col>
            <el-col :span="8" style="text-align: right;">
              <el-tag size="small" type="danger" v-if="item.license">{{item.license}}</el-tag>
              <el-tag size="small" type="success">{{item.language}}</el-tag>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <div style="text-align: center">
        <!--<el-pagination @current-change="list" background layout="prev, pager, next" :current-page.sync="query.page" :page-size="query.pageSize" :total="query.pageNumber*query.pageSize">
        </el-pagination>-->
      </div>
    </div>

    <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!projects||projects.length==0">
      <font style="font-size: 30px;color:#dddddd ">
        <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
      </font>
    </el-card>
  </div>
</Layout>
</template>

<page-query>
query{
  projects: allStrapiProjects {
    edges {
      node {
        id
        hide
        name
        url
        updated_at
        description
        stargazersCount
        watchersCount
        forksCount
        license
        language
      }
    }
  }
}
</page-query>

<script>
import {
  Pager
} from 'gridsome'
export default {
  name:'project',
  components: {
    Pager
  },
  computed: {
    projects() {
      return this.$page.projects.edges
    }
  }
}
</script>

<style>

</style>
