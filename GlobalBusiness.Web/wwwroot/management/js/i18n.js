/**
 * @typedef {object} i18n
 **/
i18n = {
    en: {
        errorMsg: "An error occurred. Please try again",
        error: "Error",
        edit: 'Edit',
        delete: 'Delete',
        actions: 'actions',

        ensure: 'Are you sure?',
        cancel: 'Cancel',
        yes: 'Yes',
        no: 'No',
        ok: 'ok',
        submit: 'submit',
        deleteDesc: 'you can\'t recover data after delete',
        select1: "Please Select 1 Row!",
        selectMin1: "Please Select Atleast 1 Row!",
        export: 'export',
        print: 'print',
        showCount: 'Show Count',
        validate: 'Please fill required fields!',
        noNotification: 'No notifications for now!',
        view: 'View',
        close: 'close',

        validation: {
            //    remote: "Please fix this field.",
            //    required: "This field is required.",
            //    email: "Please enter a valid email address.",
            irphone: "Please enter a valid phone.",
            uniqueMsg: "this {name} is already taken",
            //    url: "Please enter a valid URL.",
            //    date: "Please enter a valid date.",
            //    dateISO: "Please enter a valid date.",
            //    number: "Please enter a valid number.",
            //    equalTo: "Please enter the same value again.",
            //    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
            //    minlength: jQuery.validator.format("Please enter at least {0} characters."),
            //    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
        },
        dataTable: {
            "lengthMenu": "_MENU_",
        }
    },

    /**
     * 
     * @param {string} key key
     * @param {object} value value
     */
    add: function (key, value) {
        if (!i18n.extra)
            i18n.extra = {};
        i18n.extra[key] = value;
    },

    /**
     * @param {string} lang current language
     * @return {object} return localized i18n
     */
    init: function (lang) {
        var temp = i18n[lang];
        if (i18n.extra)
            for (var key in i18n.extra) {
                if (!i18n.extra.hasOwnProperty(key)) continue;
                temp[key] = i18n.extra[key];
            }
        return i18n = temp;
    }
};