const GraphClient = require('../utils/graph.client');
const config = require('../config/graph.config');

class MailService {
    static async sendMail({ to, cc, bcc, subject, content, contentType = 'Text', attachments = [] }) {
        try {
            const client = GraphClient.getInstance();

            const message = {
                subject,
                body: {
                    contentType,
                    content
                },
                toRecipients: Array.isArray(to) ? to.map(email => ({
                    emailAddress: { address: email }
                })) : [{
                    emailAddress: { address: to }
                }],
                ccRecipients: cc ? (Array.isArray(cc) ? cc.map(email => ({
                    emailAddress: { address: email }
                })) : [{
                    emailAddress: { address: cc }
                }]) : [],
                bccRecipients: bcc ? (Array.isArray(bcc) ? bcc.map(email => ({
                    emailAddress: { address: email }
                })) : [{
                    emailAddress: { address: bcc }
                }]) : [],
                attachments: attachments.map(file => ({
                    '@odata.type': '#microsoft.graph.fileAttachment',
                    name: file.name,
                    contentType: file.contentType,
                    contentBytes: file.contentBytes
                }))
            };

            await client.api(`/users/${config.senderEmail}/sendMail`)
                .post({ message });

            return { success: true, message: '邮件发送成功' };
        } catch (error) {
            console.error('发送邮件时出错：', error);
            throw error;
        }
    }
}

module.exports = MailService;