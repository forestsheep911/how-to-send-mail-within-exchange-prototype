// src/services/smtp.mail.service.js
const nodemailer = require('nodemailer');
const { DeviceCodeCredential } = require('@azure/identity');
const config = require('../config/graph.config');

class SmtpMailService {
  static async sendMail({ to, cc, bcc, subject, content, contentType = 'text', attachments = [] }) {
    try {
      // 创建 DeviceCodeCredential 对���
      const credential = new DeviceCodeCredential({
        tenantId: config.tenantId,
        clientId: config.clientId,
        userPromptCallback: (deviceCodeInfo) => {
          console.log(deviceCodeInfo.message);
          // 在控制台输出设备代码信息，提示用户在浏览器中输入代码
        },
      });

      // 获取针对 SMTP 的访问令牌
      const smtpScope = 'https://outlook.office365.com/SMTP.Send';
      const accessToken = await credential.getToken([smtpScope]);

      // 创建 Nodemailer 传输器
      const transporter = nodemailer.createTransport({
        host: config.smtpHost,
        port: config.smtpPort,
        secure: false, // 对于端口 587，需要设置为 false
        auth: {
          type: 'OAuth2',
          user: config.senderEmail,
          accessToken: accessToken.token,
        },
      });

      // 构建邮件选项
      const mailOptions = {
        from: config.senderEmail,
        to: Array.isArray(to) ? to : [to],
        cc: cc ? (Array.isArray(cc) ? cc : [cc]) : undefined,
        bcc: bcc ? (Array.isArray(bcc) ? bcc : [bcc]) : undefined,
        subject,
        [contentType.toLowerCase() === 'html' ? 'html' : 'text']: content,
        attachments,
      };

      // 发送邮件
      await transporter.sendMail(mailOptions);

      console.log('邮件通过 SMTP 发送成功！');
    } catch (error) {
      console.error('通过 SMTP 发送邮件时出错：', error);
      throw error;
    }
  }
}

module.exports = SmtpMailService;