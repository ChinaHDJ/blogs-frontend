import chainWebpack from 'webpack-chain';

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        title: 'Blogs',
      },
    ],
  ],
  routes: [
    {
      path: '/',
      component: '../layouts',
      routes: [
        { path: '/', component: './Home' },
        { path: '/login', component: './Login' },
        { path: '/user', component: './User' },
        { path: '/user/:id', component: './User' },
      ],
    },
  ],

  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
};
