/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import limiter from '@adonisjs/limiter/services/main'

// 5 tentatives de connexion par IP toutes les 15 minutes
export const loginThrottle = limiter.define('login', (ctx) => {
  return limiter
    .allowRequests(5)
    .every('15 mins')
    .usingKey(`login_${ctx.request.ip()}`)
})
