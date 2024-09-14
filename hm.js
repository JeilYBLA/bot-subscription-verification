const { Bot } = require('grammy');

const bot = new Bot('7339798384:AAGLK99V2LxsZj-4Q2ZHAc35R_lTHBWR6rs'); // Укажите токен вашего бота

bot.on('message:document', (ctx) => {
  const document = ctx.message.document;  // Получаем объект документа
  const fileId = document.file_id;        // Извлекаем file_id

  // Выводим file_id в консоль или отправляем в ответное сообщение
  console.log('file_id:', fileId);
  ctx.reply(`Вот ваш file_id: ${fileId}`);
});

bot.start();