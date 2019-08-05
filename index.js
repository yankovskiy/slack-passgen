const {App} = require('@slack/bolt');
const passgen = require('./passgen');
const dialog = require('./dialog');

const TOKEN = process.env.TOKEN;
const SIGNING_SECRET = process.env.SIGNING_SECRET;
const PORT = process.env.PORT || 3000;

const app = new App({
    token: TOKEN,
    signingSecret: SIGNING_SECRET
});

app.command('/passgen', async ({command, ack, say}) => {
    ack();

    await app.client.dialog.open({
        token: process.env.TOKEN,
        trigger_id: command.trigger_id,
        dialog: dialog.data
    });
});

app.action({callback_id: 'passgen'}, ({action, ack, respond}) => {
    const err = dialog.validate(action.submission);
    if (err) {
        ack({errors: err});
    } else {
        ack();
        let passwords = passgen(
            action.submission.symbols,
            action.submission.password_count,
            action.submission.password_length);
        let data = '```';
        for (let password of passwords) {
            data += `${password}\n`;
        }
        data += '```';

        respond({text: data, response_type: 'ephemeral'});
    }
});

(async () => {
    await app.start(PORT);

    console.log('⚡️ Bolt app is running!');
})();