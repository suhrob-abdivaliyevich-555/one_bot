const TelegramBot = require('node-telegram-bot-api');
const TOKEN = `1767157159:AAHUHLTIQBww_zBC8CCqo4cVQaWcjwG4-T4`
const CLICK_BOT = `398062629:TEST:999999999_F91D8F69C042267444B74CC0B3C747757EB0E065`

const bot = new TelegramBot(TOKEN, {
    polling: true
})

bot.on('message', async(message)=> {
    const message_id = message.message_id;
    const chatId = message.chat.id;
    const name = message.from.first_name;
    const text = message.text

    if(text == '/start'){
        bot.sendMessage(chatId, `Salom <b>${name}</b>`, {
            parse_mode: "HTML", 
            reply_to_message_id: message_id
        })
    }else if(text == "/photo"){
        bot.sendPhoto(chatId, "https://picsum.photos/300",{
            caption: "Picsum to Image"
        })
    }else if(text == "/document"){
        bot.sendDocument(chatId, "https://eloquentjavascript.net/Eloquent_JavaScript.pdf")
    }else if(text == "/location"){
        bot.sendVenue(chatId, 41.924087, 54.349928, "Bizing uy", "Tosh Gres mavzusi")
    }else if(text == "/contact"){
        bot.sendContact(chatId, "+988993421009", "Suhrob Abduaxatov")
    }else if(text == "/game"){
        await bot.sendChatAction(chatId, "typing ")
        await bot.sendDice(chatId, {
            emoji:  `🏀`
        })
    }else if(text == "/whoami"){
        let photos = await bot.getUserProfilePhotos(chatId)
        await bot.sendPhoto(chatId, photos.photos[0][2]?.file_id)
    }else if(text == "/keyboard"){
        const keyboard = {
            resize_keyboard: true,
            one_time_keyboard: true, 
            keyboard: [
                [
                    {
                        text: "Toshkent",
                        request_poll: {
                            type: "quiz"
                        }
                    },
                    {
                        text: "Boshqa",
                        request_location: true
                    }
                ]
            ]
        }

        bot.sendMessage(chatId, `Salom <b>${name}</b>`, {
            parse_mode: "HTML", 
            reply_to_message_id: message_id,
            reply_markup: keyboard
        })
    }else if(text == '/payment'){
        let product = [{
            label: "Iphone X",
            amount:  (2000)*100
        }]

        bot.sendInvoice(chatId, "Asaxiy.uz dan hisob", "Internet do'kondagi buyurtma", "TEST", CLICK_BOT, "TEST", "UZS", product, {
            need_phone_number: true,
            need_shipping_address: true,
            need_email: true,
            need_name: true
        })
    }
})

bot.on('pre_checkout_query', (checkout)=> {
    console.log(checkout)
    bot.answerPreCheckoutQuery(checkout.id, true)
})

bot.on('successful_payment', (message)=> {
    bot.sendMessage(message.chat.id, `Buyurtmangiz qabul qilindi, tez orada olib boramiz`)
})
