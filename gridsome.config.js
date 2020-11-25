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
        apiURL: 'http://strapi.jiailing.com',
        queryLimit: 1000, // 默认查询100条数据
        typeName:'Strapi',
        contentTypes: ['project', 'tag', 'blog', 'followings', 'followers'], // StrapiPost
        singleTypes: ['vblog'],
        // singleTypes: ['impressum'],//单个节点
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
