// src/index.js
const SmtpMailService = require('./services/smtp.mail.service');
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    // 收件人信息
    const to = 'cybozushmobile@gmail.com';
    // const to = 'zhujun@cybozu.cn';
    const cc = ['cc1@example.com'];
    const bcc = ['bcc1@example.com'];
    const subject = '测试邮件222';
    const content = '这是一封包含多个附件的测试邮件。';
    const contentType = 'Text';

    // 附件列表，与之前相同
    const attachments = [];

    // 指定附件文件夹路径（项目根目录下的 'testfile' 文件夹）
    const testfileDir = path.join(__dirname, '../testfile');

    // 检查文件夹是否存在
    if (!fs.existsSync(testfileDir)) {
      console.error(`附件文件夹不存在：${testfileDir}`);
      return;
    }

    // 读取文件夹中的所有文件
    const files = fs.readdirSync(testfileDir);

    // 遍历文件列表，构建附件对��
    for (const fileName of files) {
      const filePath = path.join(testfileDir, fileName);
      const fileStat = fs.statSync(filePath);

      // 确保只处理文件，忽略子文件夹
      if (fileStat.isFile()) {
        // 对于 SMTP，附件直接使用文件路径即可
        attachments.push({
          filename: fileName,
          path: filePath,
        });

        console.log(`已添加附件：${fileName}`);
      }
    }

    // 检查是否有附件
    if (attachments.length === 0) {
      console.log('没有找到任何附件文件。');
      return;
    }

    // 使用 SMTP 方式发送邮件，使用设备代码流进行用户身份验证
    await SmtpMailService.sendMail({
      to,
      cc,
      bcc,
      subject,
      content,
      contentType,
    //   attachments,
    });

    console.log('邮件发送成功！');
  } catch (error) {
    console.error('程序执行出错：', error);
  }
}

main();