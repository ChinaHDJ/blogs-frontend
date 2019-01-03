export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      title: 'Blogs',
    }],
  ],
  routes: [
    {
      path: '/',
      component: '../layouts',
      routes: [
        { path: '/', component: './Home' },
        { path: '/login', component: './Login' }
      ]
    }],
}
