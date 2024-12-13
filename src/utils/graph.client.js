const { ClientSecretCredential } = require("@azure/identity");
const { Client } = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");
const config = require('../config/graph.config');

class GraphClient {
    static #instance;
    
    static getInstance() {
        if (!this.#instance) {
            const credential = new ClientSecretCredential(
                config.tenantId,
                config.clientId,
                config.clientSecret
            );

            this.#instance = Client.init({
                authProvider: async (done) => {
                    try {
                        const token = await credential.getToken("https://graph.microsoft.com/.default");
                        done(null, token.token);
                    } catch (error) {
                        done(error, null);
                    }
                },
            });
        }
        return this.#instance;
    }
}

module.exports = GraphClient;