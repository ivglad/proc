export default function vipGuest({ to, from, next, store }) {
  const user = store.user
  console.log('vipGuest', user)
  if (user?.role === 'vip' && to.fullPath.indexOf('/vip') === -1) {
    return next({
      path: '/vip',
    })
  }

  return next()
}
