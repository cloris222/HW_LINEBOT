import 'dotenv/config'
import linebot from 'linebot'
import express from 'express'
import fetchMRTExits from './commands/fetchMRTExits.js'

const app = express()
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
  if (event.message.type === 'location') {
    console.log('indexevent', event)

    fetchMRTExits(event)
  }
})

const linebotParser = bot.parser()

app.post('/', linebotParser)

app.get('/', (req, res) => {
  res.status(200).send('ok')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})

// bot.listen('/', process.env.PORT || 3000, () => {
//   console.log('機器人啟動')
// })
