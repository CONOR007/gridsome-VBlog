<template>
    <div>
        <section class="page-header" :style="'background-image: linear-gradient(120deg, ' + vblog.backgroundColorLeft + ', ' + vblog.backgroundColorRight + ');color: ' + vblog.fontColor + ';'">
            <div style="position:absolute; top:20px; right:20px; z-index:2;">
                <el-tooltip effect="dark" :content="fullButton.full ? '退出' : '全屏'" placement="bottom-end">
                    <el-button @click="full" :icon="fullButton.full ? 'el-icon-close' : 'el-icon-rank'" circle></el-button>
                </el-tooltip>
            </div>
            <div v-for="(item, index) in randomIcon" :key="'ri' + index" :style="'position:absolute; top:' + item.top + 'px; left:' + item.left + 'px; z-index:1;'">
                <font :style="'font-size: ' + item.size + 'px;color:#fff;'">
                    <b>♪</b>
                </font>
            </div>
            <h1 class="project-name">{{ vblog.blogTitle }}</h1>
            <h2 class="project-tagline">{{ vblog.blogDescribe }}</h2>
            <a :href="'https://github.com/' + vblog.githubUsername" class="btn" target="_blank">GitHub主页</a>
            <a href="https://github.com/GitHub-Laziji/vblog" class="btn" target="_blank" v-if="!vblog.mini">博客源码</a>
        </section>
        <div style="position:relative;  z-index:2;margin: auto;margin-top:-30px;width:64rem;">
            <el-card shadow="never" :body-style="{ padding: '0px' }">
                <el-row>
                    <el-col :span="10">
                        <el-menu @select="selectTopbar" :default-active="topbar.active" mode="horizontal" menu-trigger="click">
                            <el-submenu index="#more">
                                <template slot="title">了解博主</template>
                                <el-menu-item index="#githubHome">github主页</el-menu-item>
                                <el-menu-item index="#blog">其他博客</el-menu-item>
                            </el-submenu>
                            <el-submenu index="#webSites" v-if="vblog.webSites.split(',').length > 0">
                                <template slot="title">其他网站</template>
                                <el-menu-item :index="'#webSites-' + index" v-for="(item, index) in vblog.webSites.split(',')" :key="'#webSites' + index">{{ item }}</el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                    <el-col :span="4" :offset="8" style="text-align: right;">
                        <div style="font-size: 20px;color:#606266;margin-top: 5px">
                            <b>{{ vblog.githubUsername }}</b>
                        </div>
                        <div style="color:#606266;">
                            <i class="el-icon-location"></i>&nbsp;{{ vblog.location ? vblog.location : '未填写地址' }}
                            <br />
                        </div>
                    </el-col>
                    <el-col :span="2" style="text-align: center;">
                        <img v-popover:bigAvatar :src="'http://strapi.jiailing.com' + vblog.avatarUrl.url" style="margin-top: 4px;margin-right: 10px;width:52px; height:52px; border-radius:5px; border: 1px solid #EBEEF5" />
                        <el-popover ref="bigAvatar" placement="top-start" :title="vblog.githubUsername" width="200" trigger="hover">
                            <i class="el-icon-star-on"></i>&emsp;{{ vblog.name }}
                            <br />
                            <i class="el-icon-location"></i>&emsp;{{ vblog.location }}
                            <br />
                            <img :src="'http://strapi.jiailing.com' + vblog.avatarUrl.url" style="width: 200px;height: 200px;" />
                        </el-popover>
                    </el-col>
                </el-row>
            </el-card>
        </div>

        <section class="main-content">
            <el-row>
                <el-col :span="6" style="padding-right:10px">
                    <sidebar></sidebar>
                </el-col>
                <el-col :span="18" style="padding-left:10px">
                    <section>
                        <slot />
                    </section>
                </el-col>
            </el-row>
        </section>

        <section class="foot">
            <foot></foot>
        </section>
    </div>
</template>

<static-query>
query {
  vblog: allStrapiVblog {
    edges {
      node {
        githubUsername
        blogTitle
        blogDescribe
        htmlTitle
        fontColor
        useBackgroundImage
        backgroundColorLeft
        backgroundColorRight
        audioUrl
        mini
        webSites
        avatarUrl {
          url
        }
        location
        name
      }
    }
  }
}
</static-query>
<script>
import Sidebar from './components/Sidebar';
import Foot from './components/Foot';
export default {
    name: 'Default',
    components: {
        Sidebar,
        Foot,
    },
    data() {
        return {
            fullButton: {
                full: false,
            },
            topbar: {
                active: '',
            },
            randomIcon: [],
        };
    },
    mounted() {
      console.log(this.vblog);
        let width = window.innerWidth;
        for (let i = 0; i < 12; i++) {
            let temp = {};
            let left = this.randomInt(10, width - 310);
            if (left > width / 2 - 150) {
                left += 300;
            }
            temp['left'] = left;
            temp['top'] = this.randomInt(20, 300);
            temp['size'] = this.randomInt(20, 40);
            this.randomIcon.push(temp);
        }
    },
    computed: {
        vblog() {
            return this.$static.vblog.edges[0].node;
        },
    },
    methods: {
        //s<=r<e
        randomInt(s, e) {
            let d = e - s;
            if (d < 0) {
                return s;
            }
            let r = Math.random() * d + s;
            r = parseInt(r, 10);
            return r;
        },
        selectTopbar(index) {
            //取消菜单选中状态
            this.topbar.active = this.topbar.active == '' ? ' ' : '';
            switch (index) {
                case '#githubHome':
                    window.open('https://github.com/' + this.githubUsername);
                    break;
                case '#blog':
                    if (this.blog) {
                        window.open((this.blog.match(/https?:\/\//i) ? '' : 'https://') + this.blog);
                    } else {
                        this.$message({
                            message: '博主没有其他博客',
                            type: 'info',
                        });
                    }
                    break;
                default:
                    if (/#webSites-\d+/.test(index)) {
                        let i = parseInt(index.split('-')[1]);
                        let url = this.vblog.webSites.split(',')[i].url;
                        window.open((url.match(/https?:\/\//i) ? '' : 'https://') + url);
                    }
                    break;
            }
        },

        moveIcon(index) {
            let width = window.innerWidth;
            this.randomIcon[index]['top'] = this.randomInt(20, 300);
            let left = this.randomInt(10, width - 310);
            if (left > width / 2 - 150) {
                left += 300;
            }
            this.randomIcon[index]['left'] = left;
        },
        full() {
            if (!this.fullButton.full) {
                this.fullScreen();
                this.fullButton.full = true;
            } else {
                this.fullExit();
                this.fullButton.full = false;
            }
        },
        fullScreen() {
            var element = document.documentElement;
            if (window.ActiveXObject) {
                var WsShell = new ActiveXObject('WScript.Shell');
                WsShell.SendKeys('{F11}');
            } else if (element.requestFullScreen) {
                element.requestFullScreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }
        },
        fullExit() {
            var element = document.documentElement;
            if (window.ActiveXObject) {
                var WsShell = new ActiveXObject('WScript.Shell');
                WsShell.SendKeys('{F11}');
            } else if (element.requestFullScreen) {
                document.exitFullscreen();
            } else if (element.msRequestFullscreen) {
                document.msExitFullscreen();
            } else if (element.webkitRequestFullScreen) {
                document.webkitCancelFullScreen();
            } else if (element.mozRequestFullScreen) {
                document.mozCancelFullScreen();
            }
        },
    },
};
</script>
<style>
.page-header {
    padding: 5rem 6rem;
    color: #fff;
    text-align: center;
    background-color: #159957;
    background-image: linear-gradient(120deg, #155799, #159957);
}

.project-name {
    font-size: 3.25rem;
    margin-top: 0;
    margin-bottom: 0.1rem;
}

.project-tagline {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    font-weight: normal;
    opacity: 0.7;
}

.btn:hover {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
}

a:hover {
    text-decoration: underline;
}

a:active,
a:hover {
    outline: 0;
}

.btn {
    padding: 0.75rem 1rem;
    display: inline-block;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.7);
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    border-style: solid;
    border-width: 1px;
    border-radius: 0.3rem;
    transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}

a {
    color: #1e6bb8;
    text-decoration: none;
}

.btn + .btn {
    margin-left: 1rem;
}

.main-content {
    max-width: 64rem;
    padding: 30px 0px 30px 0px;
    margin: 0 auto;
    font-size: 1.1rem;
    word-wrap: break-word;
    min-height: 800px;
}

.foot {
    max-width: 67rem;
    margin: 0 auto;
    font-size: 12px !important;
    color: #586069 !important;
    word-wrap: break-word;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
