// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [
      {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: 'http://liucong.icu:1337',
        queryLimit: 1000, // 默认查询100条数据
        typeName:'Strapi',
        contentTypes: ['Vblog','blog', 'followings', 'followers','Projects'], // StrapiPost
        // contentTypes: ['Vblogs','project', 'blog', 'followings', 'followers'], // StrapiPost
        // singleTypes: ['Vblog'],//单个节点
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        loginData: {
          identifier: '',
          password: ''
        }
      }
    }
  ]
}
