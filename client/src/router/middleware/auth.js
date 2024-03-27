export default function auth({ to, from, next, store }) {
  const user = store.user
  console.log('auth', user)
  if (!user && to.path !== '/auth') {
    console.log('!auth', user)
    return next({
      path: '/auth',
    })
  }

  if (user && to.path === '/auth') {
    return next({
      path: '/',
    })
  }

  return next()
}
