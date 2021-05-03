var Page = function () {


    //
    // Setup module components
    //

    // #region _initWizardForm

    var _initWizardForm = function () {
        // Code for the Validator
        var $validator = App.validateForm("#form-add");
        Page.wizard.$el = $('.card-wizard');

        // Wizard Initialization
        Page.wizard.$el.bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'nextSelector': '.btn-next',
            'previousSelector': '.btn-previous',

            onNext: function ($tab, navigation, index) {
                var $valid = Page.$form.valid();
                if (!$valid) {
                    $validator.focusInvalid();
                    if ($tab.index() == 0)
                        App.notify(i18n.chooseType, "danger");
                    return false;
                }
                switch (index) {
                    case 0:
                        return loadForm();
                    default:
                }
            },

            onInit: function (tab, navigation, index) {
                //check number of tabs and fill the entire row
                var $total = navigation.find('li').length;
                var $wizard = navigation.closest('.card-wizard');

                first_li = navigation.find('li:first-child a').html();
                $moving_div = $("<div class='moving-tab'></div>");
                $moving_div.append(first_li);
                $('.card-wizard .wizard-navigation').append($moving_div);

                refreshAnimation($wizard, index);

                $('.moving-tab').css('transition', 'transform 0s');
            },

            onTabClick: function ($tab, navigation, index) {
                var $valid = Page.$form.valid();
                if (!$valid) {
                    $validator.focusInvalid();
                    if ($tab.index() == 0)
                        App.notify(i18n.chooseType, "danger");
                    return false;
                }
                switch (index) {
                    case 0:
                        return loadForm();
                    default:
                }
            },

            onTabShow: function (tab, navigation, index) {
                var $total = navigation.find('li').length;
                var $current = index + 1;

                var $wizard = navigation.closest('.card-wizard');

                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $($wizard).find('.btn-next').hide();
                    $($wizard).find('.btn-finish').show();
                } else {
                    $($wizard).find('.btn-next').show();
                    $($wizard).find('.btn-finish').hide();
                }

                button_text = navigation.find('li:nth-child(' + $current + ') a').html();

                setTimeout(function () {
                    $('.moving-tab').html(button_text);
                }, 150);

                var checkbox = $('.footer-checkbox');

                if (!index == 0) {
                    $(checkbox).css({
                        'opacity': '0',
                        'visibility': 'hidden',
                        'position': 'absolute'
                    });
                } else {
                    $(checkbox).css({
                        'opacity': '1',
                        'visibility': 'visible'
                    });
                }

                refreshAnimation($wizard, index);
            }
        });

        function loadForm() {
            var type = Page.$form.find('input[name=radioName]:checked')
        }

        // Prepare the preview for profile picture
        $("#wizard-picture").change(function () {
            readURL(this);
        });

        $('[data-toggle="wizard-radio"]').click(function () {
            wizard = $(this).closest('.card-wizard');
            wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
            $(this).addClass('active');
            $(wizard).find('[type="radio"]').removeAttr('checked');
            $(this).find('[type="radio"]').attr('checked', 'true').trigger('change');
        });

        $('[data-toggle="wizard-checkbox"]').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('[type="checkbox"]').removeAttr('checked');
            } else {
                $(this).addClass('active');
                $(this).find('[type="checkbox"]').attr('checked', 'true');
            }
        });

        $('.set-full-height').css('height', 'auto');

        //Function to show image before upload



        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        $(window).resize(function () {
            $('.card-wizard').each(function () {
                $wizard = $(this);

                index = $wizard.bootstrapWizard('currentIndex');
                refreshAnimation($wizard, index);

                $('.moving-tab').css({
                    'transition': 'transform 0s'
                });
            });
        });

        function refreshAnimation($wizard, index) {
            $total = $wizard.find('.nav li').length;
            $li_width = 100 / $total;

            total_steps = $wizard.find('.nav li').length;
            move_distance = $wizard.find('.nav').width() / total_steps;
            index_temp = index;
            vertical_level = 0;

            mobile_device = $(document).width() < 600 && $total > 3;

            if (mobile_device) {
                move_distance = $wizard.width() / 2;
                index_temp = index % 2;
                $li_width = 50;
            }

            $wizard.find('.nav li').css('width', $li_width + '%');

            step_width = move_distance;
            move_distance = move_distance * index_temp;

            // $current = index + 1;
            //
            // if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
            // move_distance -= 8;
            // } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
            //     move_distance += 8;
            // }

            if (mobile_device) {
                vertical_level = parseInt(index / 2);
                vertical_level = vertical_level * 38;
            }

            $wizard.find('.moving-tab').css('width', step_width);
            $('.moving-tab').css({
                'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
                'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

            });
        }
    };

    // #endregion

    // #region radio type change

    var _radioTypeChangeEvent = function () {
        Page.$form.find('input[name=type]').on('change', function () {
            Page.wizard.type = Page.$form.find('input[name=type]:checked').val();
            if (Page.wizard.timeout)
                clearTimeout(Page.wizard.timeout)
            Page.wizard.timeout = setTimeout(function () {
                App.ajax({
                    url: App.url("/admin/users/form"),
                    data: { type: Page.wizard.type },
                    // loading: Page.$form,
                    success: function (d) {
                        var $dom = $(d);
                        $('#wizard-essential').empty()
                            .append($dom.filter('#content-essential').html());
                        $('#wizard-info').empty()
                            .append($dom.filter('#content-info').html());

                        App.materialize($('#wizard-essential').removeData());
                        App.materialize($('#wizard-info').removeData());


                        App.uploadAvatarModal({
                            id: "#file-avatar",
                            name: "Avatar",
                            url: App.url('upload-avatar')
                        });
                        Page.initSelect2();
                    }
                });
            }, 1000);
        });
    };

    // #endregion

    // #region init Select2

    var _initSelect2 = function () {
        App.select2({
            id: Page.$form.find('[name=city]').get(0),
            map: function (item) {
                return {
                    text: item[App.lang + "Name"],
                    id: item.id,
                    state: item.state
                };
            },
            url: App.url("get-cities"),
            templateResult: function (data) {
                var $div = $('<div />').addClass('select2-item')
                    .append(
                        data.text +
                        '<small class="d-block text-muted">' + data.state + '</small>'
                    );

                return $('<div />').append($div).html();
            },
            templateSelection: function (data) {
                var text = '<div>' + data.text + '</div>';
                return text;
            }
        });

        App.select2({
            id: Page.$form.find('[name=provider]').get(0),
            data: function () {
                return { cityId: Page.$form.find('[name=city]').val() };
            },
            map: function (item) {
                return {
                    text: item.name,
                    id: item.id,
                    city: item.city,
                    avatar: item.avatar
                };
            },
            url: App.url("get-providers"),
            templateResult: function (data) {
                var $div = $('<div />').addClass('select2-item-user')
                    .append(
                        '<img class="rounded" src="' + data.avatar + '" />' +
                        data.text +
                        '<small class="d-block text-muted">' + data.city + '</small>'
                    );

                return $('<div />').append($div).html();
            },
            templateSelection: function (data) {
                var text = '<div>' + data.text + '</div>';
                return text;
            }
        });

        App.select2({
            id: Page.$form.find('[name=speciality]').get(0),
            map: function (item) {
                var lang = $('body').attr('lang');
                return {
                    text: item[lang + "Name"],
                    id: item.id,
                };
            },
            url: App.url("get-specialities"),
            templateResult: function (data) {
                var text = '<div>' + data.text + '</div>';
                return text;
            },
            templateSelection: function (data) {
                var text = '<div>' + data.text + '</div>';
                return text;
            }
        });
    };

    // #endregion

    // #region _handleFormSubmit

    var _handleFormSubmit = function () {
        var $form = $('#form-add');
        $form.on('submit', function (e) {
            e.preventDefault();
            if ($form.valid()) {
                var data = App.serializeForm($form);


                if ($("#select-speciality").length) {
                    data.specialities = [];
                    //hint: add specialities to array
                    //======== remove this later and make it multiple select
                    data.specialities.push(data.speciality);
                    delete data.speciality;
                }


                App.ajax({
                    url: App.url('add-' + data.type),
                    data: data,
                    toast: true,
                    loading: $form,
                });
            }
            return false;
        });
    };

    // #endregion

    //
    // Return objects assigned to module
    //

    return {
        init: function () {
            _initWizardForm();
            _radioTypeChangeEvent();
            _handleFormSubmit();

            setTimeout(function () {
                $('.card.card-wizard').addClass('active');
            }, 600);
        },
        wizard: {
            $el: null,
            alreayLoaded: false,
            type: null,
        },
        $form: $('#form-add'),
        initSelect2: _initSelect2
    };
}();
