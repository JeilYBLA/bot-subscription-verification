require('dotenv').config();
const { Bot, GrammyError, HttpError, InlineKeyboard, InputFile } = require('grammy');

const bot = new Bot(process.env.BOT_TOKEN);

const chanelID = process.env.CHANNEL_ID;

// прописываем доступные команды в окне menu
bot.api.setMyCommands([
    { command: 'start', description: 'Начало работы' },
]);

// команда start
bot.command('start', async (ctx) => {
    const кeyboard = new InlineKeyboard()
        .text('Проверить подписку', 'check');
    await ctx.reply('Здравствуйте, подишитесь на наш канал {канал} и получите файл "Как увеличить доход при помощи дизайна."', { reply_markup: кeyboard });
});

// после команды start и вызова инлайн-клавиатуры прописываем команду check с помощью callbackQuery, которая используется в связке с InlineKeyboard
bot.callbackQuery('check', async (ctx) => {
    const userID = ctx.from.id;
    await ctx.answerCallbackQuery();

    try {
        //  Вытаскиваем инфу о подписке
        const chatMember = await ctx.api.getChatMember(chanelID, userID);
        // Проверяем подписку
        if (chatMember.status === 'member' || chatMember.status === 'creator' || chatMember.status === 'administrator') {
        
        // Отправляем файл
            await ctx.reply("Спасибо за вашу подписку, вот ваш файл: ");
        
            await bot.api.sendDocument(ctx.chat.id, new InputFile('путь к файлу'));
              
        } else {
            await ctx.reply("Извините, но вы не подписаны на канал. Подпишитесь и попробуйте еще раз:)");
        }
    } catch (error) {
        await ctx.reply(' Сейчас невозможно проверить подписку, попробуйте позже.');
        console.error('Ошибка:', error.response?.description || error);
    }
});


bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e);
    } else {
      console.error("Unknown error:", e);
    }
  });

bot.start();