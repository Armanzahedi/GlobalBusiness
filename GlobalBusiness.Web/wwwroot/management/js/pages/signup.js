var Page = function () {


    //
    // Setup module components
    //

    // #region initChangeForm

    var _initChangeForm = function () {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add('right-panel-active');
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });
    };

    // #endregion

    // #region login
    //====================//
    //  login
    //====================//
    var _initForm = function () {
        var $form = $("#form-auth");

        var rules = $("body").hasClass("register-page") ? {
            username: {
                unique: true,
            },
            email: {
                unique: true,
            },
            passportnumber: {
                unique: true,
            },
        } : null;
        App.validateForm($form, rules);
        $form.on('submit', function (e) {
            e.preventDefault();

            var data = App.serializeForm($form);

            if ($form.valid())
                App.ajax({
                    url: $form.attr('action'),
                    data: data,
                    loading: $form.find("button[type=submit]"),
                    toast: true
                });

            return false;
        });
    };
    ////////////////////////
    // #endregion

    // #region form components



    // #endregion



    //
    // Return objects assigned to module
    //

    return {
        init: function () {
            _initForm();
        },

        /**@type {DataTable} */
        dataTable: null
    };
}();
