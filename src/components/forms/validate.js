import {required, length, validateForm} from "redux-form-validators";


export const validate = validateForm({
    newItem: [required({
            msg:  'Поле обязательно для заполнения'
        }),
        length({
            max: 35,
            msg:  'Максимальная длина 35 символов'
        })
    ],
    login: [required({
            msg:  'Поле обязательно для заполнения'
        })
    ],
    email: [required({
        msg:  'Поле обязательно для заполнения'
    })
    ],
    password: [required({
        msg:  'Поле обязательно для заполнения'
    })
    ]
});

