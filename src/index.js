const MailService = require('./services/mail.service');

async function main() {
    try {
        await MailService.sendMail({
            to: 'forestsheep@hotmail.com',
            subject: '测试邮件',
            content: '这是一封测试邮件的内容'
        });
        console.log('邮件发送成功！');
    } catch (error) {
        console.error('程序执行出错：', error);
    }
}

main();