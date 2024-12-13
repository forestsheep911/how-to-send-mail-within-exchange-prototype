const { ClientSecretCredential } = require("@azure/identity");
const { Client } = require("@microsoft/graph");
require("isomorphic-fetch");

// 配置凭据信息
const config = {
    clientId: "您的应用程序ID",
    clientSecret: "您的客户端密钥",
    tenantId: "您的目录ID"
};

// 创建认证客户端
const credential = new ClientSecretCredential(
    config.tenantId,
    config.clientId,
    config.clientSecret
);

// 创建Graph客户端
const client = Client.init({
    authProvider: async (done) => {
        try {
            const token = await credential.getToken("https://graph.microsoft.com/.default");
            done(null, token.token);
        } catch (error) {
            done(error, null);
        }
    },
});

// 发送邮件函数
async function sendMail() {
    try {
        const message = {
            subject: '测试邮件',
            body: {
                contentType: 'Text',
                content: '这是一封测试邮件的内容'
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: 'recipient@example.com'  // 替换为实际的收件人邮箱
                    }
                }
            ]
        };

        await client.api('/users/您的邮箱地址/sendMail')  // 替换为您的邮箱地址
            .post({
                message: message
            });

        console.log('邮件发送成功！');
    } catch (error) {
        console.error('发送邮件时出错：', error);
    }
}

// 执行发送
sendMail();const { ClientSecretCredential } = require("@azure/identity");
const { Client } = require("@microsoft/graph");
require("isomorphic-fetch");

// 配置凭据信息
const config = {
    clientId: "您的应用程序ID",
    clientSecret: "您的客户端密钥",
    tenantId: "您的目录ID"
};

// 创建认证客户端
const credential = new ClientSecretCredential(
    config.tenantId,
    config.clientId,
    config.clientSecret
);

// 创建Graph客户端
const client = Client.init({
    authProvider: async (done) => {
        try {
            const token = await credential.getToken("https://graph.microsoft.com/.default");
            done(null, token.token);
        } catch (error) {
            done(error, null);
        }
    },
});

// 发送邮件函数
async function sendMail() {
    try {
        const message = {
            subject: '测试邮件',
            body: {
                contentType: 'Text',
                content: '这是一封测试邮件的内容'
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: 'recipient@example.com'  // 替换为实际的收件人邮箱
                    }
                }
            ]
        };

        await client.api('/users/您的邮箱地址/sendMail')  // 替换为您的邮箱地址
            .post({
                message: message
            });

        console.log('邮件发送成功！');
    } catch (error) {
        console.error('发送邮件时出错：', error);
    }
}

// 执行发送
sendMail();