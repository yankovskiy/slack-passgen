const C = require('./const');

const dialog = {
    data: {
        callback_id: 'passgen',
        title: 'Генерация паролей',
        submit_label: 'Сгенерировать',
        elements: [
            {
                type: 'text',
                subtype: 'number',
                label: 'Длина пароля',
                name: 'password_length',
                value: '8'
            },
            {
                type: 'text',
                subtype: 'number',
                label: 'Количество паролей',
                name: 'password_count',
                value: '1'
            },
            {
                type: 'select',
                label: 'Символы в пароле',
                name: 'symbols',
                value: 'alfa_and_numbers',
                options: [
                    {label: 'Буквы и цифры', value: C.ALFA_AND_NUMBERS},
                    {label: 'Только цифры', value: C.NUMBERS_ONLY},
                    {label: 'Только буквы', value: C.ALFA_ONLY},
                    {label: 'Буквы, цифры, спецсимволы', value: C.ANY}
                ]
            }
        ]
    },

    validate: function (data) {
        const isNumber = /^\d+$/;
        let errors = [];
        if (!isNumber.test(data.password_length)) {
            errors.push({name: 'password_length', error: 'Должно быть число'});
        } else if (parseInt(data.password_length) < 6 || parseInt(data.password_length) > 24) {
            errors.push({name: 'password_length', error: 'Длина пароля должна быть от 6 до 24 символов'});
        }

        if (!isNumber.test(data.password_count)) {
            errors.push({name: 'password_count', error: 'Должно быть число'});
        } else if (parseInt(data.password_count) < 1 || parseInt(data.password_count) > 100) {
            errors.push({name: 'password_count', error: 'Количество паролей должно быть от 1 до 100'});
        }
        return errors.length > 0 ? errors : false;
    }
};

module.exports = dialog;