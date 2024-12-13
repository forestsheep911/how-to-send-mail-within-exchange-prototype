const GraphClient = require('../utils/graph.client');
const config = require('../config/graph.config');

class MailService {
    static async sendMail({ to, subject, content, contentType = 'Text' }) {
        try {
            const client = GraphClient.getInstance();
            
            const message = {
                subject,
                body: {
                    contentType,
                    content
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: to
                        }
                    }
                ]
            };

            await client.api(`/users/${config.senderEmail}/sendMail`)
                .post({
                    message: message
                });

            return { success: true, message: '邮件发送成功' };
        } catch (error) {
            console.error('发送邮件时出错：', error);
            throw error;
        }
    }
}

module.exports = MailService;