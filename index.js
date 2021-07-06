const TelegramApi = require('node-telegram-bot-api')


const {gameOptions, againOptions} = require('./options')

const token = '1842684909:AAGW56fUQROQRoy3Z5R9J7AthJSd4lXIf5M'


const bot = new TelegramApi(token, {polling: true})

const chats = {}

bot.setMyCommands([
  {command: '/start', description: 'Начальное приветсвие'},
  {command: '/info', description: 'Получить информацию о пользователе'},
  {command: '/game', description: 'Начать игру'},
])


const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать! ')
  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatId] = randomNumber
  await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const start = () => {
  bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id


    if(text === '/start') {
      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/c62/4a8/c624a88d-1fe3-403a-b41a-3cdb9bf05b8a/3.webp')
      return bot.sendMessage(chatId, 'Добро Пожаловать в телеграм бот')
    }

    if(text === '/info') {
      return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
    }

    if(text === '/game') {
      return startGame(chatId)
    }

    return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!)')
  })
}


bot.on('callback_query', async msg => {
  const data = msg.data
  const chatId = msg.message.chat.id

  if(data === '/again') {
    return startGame(chatId)
  }

  if(data == chats[chatId]) {
    return bot.sendMessage(chatId, `Поздравляем, ты отгадал цифру ${chats[chatId]}`, againOptions)
  } else {
    return bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)
  }
})

start()
