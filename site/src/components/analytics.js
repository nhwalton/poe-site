import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

const analytics = Analytics({
  app: 'app-name',
  plugins: [
    googleAnalytics({
      trackingId: 'UA-158247637-1',
    })
  ]
})

export default analytics