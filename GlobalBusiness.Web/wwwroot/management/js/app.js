/* ------------------------------------------------------------------------------
 *
 *  # Template JS core
 *
 *  Includes minimum required JS code for proper template functioning
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var App = function () {

    // #region Components

    // #region Tooltip

    // Tooltip
    var _componentTooltip = function () {

        // Initialize
        $('[data-toggle="tooltip"],[data-popup="tooltip"],[rel="tooltip"]').tooltip({});

        // Demo tooltips, remove in production
        var demoTooltipSelector = '[data-toggle="tooltip-demo"]';
        if ($(demoTooltipSelector).is(':visible')) {
            $(demoTooltipSelector).tooltip('show');
            setTimeout(function () {
                $(demoTooltipSelector).tooltip('hide');
            }, 2000);
        }
    };

    // #endregion

    // #region Popover

    // Popover
    var _componentPopover = function () {
        $('[data-toggle="popover"]').popover();
    };

    // #endregion

    // fixed navbar
    var _componentNavbar = function () {
        // Navbar
        var nav = $('.navbar-main');
        $(window).scroll(function () {
            if ($(this).scrollTop() > 80) {
                nav.addClass("fixed-header");
            } else {
                nav.removeClass("fixed-header");
            }
        });
    };

    // #endregion

    // #region jquery validate

    var _initJvalidate = function () {
        $.validator.addMethod('irphone', function (value, element) {
            return this.optional(element) || /^09[0-9]{9}$/.test(value);
        });
        $.validator.addMethod('username', function (value, element) {
            return this.optional(element) || /^[a-zA-Z0-9_]/.test(value);
        });
        $.validator.addMethod('select', function (value, element) {
            return this.optional(element) || $(element).find(':selected').length;
        });
        $.validator.addMethod('unique', function (value, element) {
            $(element).attr("data-unique", true);
            var isUnique = $(element).data("is-unique");
            return isUnique == undefined || isUnique;
        }, function (_value, element) {
                return i18n.validation.uniqueMsg.replaceAll("{name}", $(element).attr("placeholder"));
        });
        $.extend($.validator.messages, i18n.validation);
    };

    // #endregion

    // #region i18n

    var _initI18n = function () {
        var lang = $("body").prop("lang");
        i18n.init(lang);
    };

    // #endregion

    // #region Use first letter as an icon

    var _componentIconLetter = function () {

        // Grab first letter and insert to the icon
        $('.table tr').each(function () {

            // Title
            var $title = $(this).find('.letter-icon-title'),
                letter = $title.eq(0).text().charAt(0).toUpperCase();

            // Icon
            var $icon = $(this).find('.letter-icon');
            $icon.eq(0).text(letter);
        });
    };

    // #endregion

    // #region navbar fiexed top

    // Headroom.js
    var _componentHeadroom = function () {
        // Define elements
        var navbarTop = document.querySelector('.navbar-slide-top');


        //
        // Top navbar
        //

        if (navbarTop) {

            // Construct an instance of Headroom, passing the element
            var headroomTop = new Headroom(navbarTop, {
                offset: navbarTop.offsetHeight,
                tolerance: {
                    up: 10,
                    down: 10
                },
                // callback when pinned, `this` is headroom object
                //onPin: function () {
                //    $('.sidebar-fixed .sidebar-content').animate({
                //        top: $('.navbar').outerHeight()
                //    }, 200);
                //},
                onUnpin: function () {
                    $('.headroom').find('.show').removeClass('show');

                    //$('.sidebar-fixed .sidebar-content, .sidebar-fixed').animate({
                    //    top: 0
                    //}, 200);
                }
            });

            // Initialise
            headroomTop.init();
        }
    };

    // #endregion

    // #region findActiveMenu

    var _findActiveMenu = function () {
        var href = window.location.href.toLowerCase();//.replace("http://", "").replace("https://", "");
        var sharpindex = href.indexOf("?");
        if (sharpindex >= 0)
            href = href.slice(0, sharpindex);
        sharpindex = href.indexOf("#");
        if (sharpindex >= 0)
            href = href.slice(0, sharpindex);
        $('a[href="' + href + '"]:not(.breadcrumb-item),[data-href="' + href + '"]:not(.breadcrumb-item)').addClass("active").parents("li").addClass("active nav-item-open").children('.collapse').addClass("show");

    };

    // #endregion

    // #region _handleComponents

    var _handleComponents = function () {
        for (var key in App.components) {
            // skip loop if the property is from prototype
            if (!App.components.hasOwnProperty(key)) continue;
            App.components[key]();
        }
    };

    // #endregion

    // #region init toast

    var _initToast = function () {
        Noty.overrideDefaults({
            theme: 'limitless',
            layout: 'top' + (App.dir === "ltr" ? "Left" : "Right"),
            type: 'alert',
            timeout: 3000,
            animation: {
                open: 'animated faster fadeIn' + (App.dir !== "ltr" ? "Left" : "Right"), // Animate.css class names
                close: 'animated faster fadeOut' + (App.dir !== "ltr" ? "Left" : "Right") // Animate.css class names
            }
        });
    };

    // #endregion

    // #region _toastMessages

    var _toastMessages = function () {
        if (window.errorMsg)
            App.notify(window.errorMsg, 'danger');
        if (window.successMsg)
            App.notify(window.successMsg, 'success');
    };

    // #endregion

    // #region check app direction

    var _checkDirection = function () {
        App.dir = $('html').attr('dir');
        App.rtl = App.dir == "fa";
        App.lang = $('body').attr("lang");
    };

    // #endregion

    // #region clone array Extension

    var _cloneArray = function () {
        //clone an array
        Array.prototype.clone = function () {
            var copy = [];
            this.forEach(function (obj) {
                if (!(null === obj || "object" !== typeof obj))
                    obj = clone(obj);
                copy.push(obj);
            });
            return copy;
        };

        //clone an object
        function clone(obj) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
            }
            return copy;
        }
    };

    // #endregion

    // #region Change language

    var _intiChangeLanguage = function () {
        $("#change-lang").on("click", function () {
            var $btn = $(this),
                culture = $btn.data('value'),
                text = $btn.text();

            App.ajax({
                start: function () {
                    $btn.text('').html(' <div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>');
                },
                data: { culture: culture },
                url: App.url('/page/change-lang'),
                error: function () {
                    $btn.text(text);
                },
                reload: true
            });

        });
    };

    // #endregion

    // #region init img to svg
    //====================//
    //  init img to svg
    //====================//
    var _initImgToSvg = function () {
        $('img.svg').each(function () {
            var $img = $(this);
            var imgURL = $img.attr('src');
            var imgClass = $img.attr('class');

            $.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass);
                }
                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');
        });
    };
    ////////////////////////
    // #endregion

    // #region login
    //====================//
    //  login
    //====================//
    var _loginEvent = function () {
        $(".navbar").on("click", "[data-action=login]", function () {
            var $btn = $(this),
                text = $btn.text();

            App.loadModal({
                url: App.url("/page/login"),
                data: { partial: true },
                method: "GET",
                loading: $btn,
                onModalShow: function () {
                    var $formLogin = $("#form-login"),
                        $formSignup = $("#form-signup");

                    if (!$formLogin.length)
                        return;

                    App.validateForm($formLogin);
                    App.validateForm($formSignup);

                    var $modal = $("#modal-login"), $submit = $modal.find("[data-action=submit-form]");
                    $submit.on("click", function (e) {
                        e.preventDefault();
                        $(this).closest("form").trigger("submit");
                    });

                    $formLogin.on('submit', function (e) {
                        e.preventDefault();

                        var data = App.serializeForm($formLogin);

                        if ($formLogin.valid())
                            App.ajax({
                                url: $formLogin.attr('action'),
                                data: data,
                                loading: $formLogin,
                                toast: true
                            });
                    });

                    $formSignup.on('submit', function (e) {
                        e.preventDefault();

                        var data = App.serializeForm($formSignup);

                        if ($formSignup.valid())
                            App.ajax({
                                url: $formSignup.attr('action'),
                                data: data,
                                loading: $formSignup,
                                toast: true
                            });
                    });

                    $modal.on("click", "[data-action=toggle]", function (e) {
                        e.preventDefault();
                        var $body = $formLogin.closest(".modal-body");
                        App.block($body);

                        setTimeout(function () {
                            App.unblock($body);
                        }, 500);
                        changeTitle();
                    });

                    function changeTitle() {
                        var title;
                        if ($modal.find(".hover").length)
                            title = $formLogin.data("title");
                        else
                            title = $formSignup.data("title");

                        $modal.find(".card-title").text(title);
                    }
                }
            })
        });

    };
    ////////////////////////
    // #endregion

    // #region init modals

    var _initModals = function () {
        $('.modal.open-me').modal();
    };


    // #endregion

    // #region select2 defaults

    var _select2Defaults = function () {
        if (!$.fn.select2) return;

        $.fn.select2.amd.define('select2/i18n/fa', [], function () {
            // Russian
            return {
                errorLoading: function () {
                    return i18n.error;
                },
                inputTooLong: function (args) {
                    var overChars = args.input.length - args.maximum;
                    var message = '' + overChars + ' ';
                    if (overChars >= 2 && overChars <= 4) {
                        message += '';
                    } else if (overChars >= 5) {
                        message += '';
                    }
                    return message;
                },
                inputTooShort: function (args) {
                    var remainingChars = args.minimum - args.input.length;

                    var message = ' ' + remainingChars + ' ';

                    return message;
                },
                loadingMore: function () {
                    return '…';
                },
                maximumSelected: function (args) {
                    var message = ' ' + args.maximum + ' ';

                    if (args.maximum >= 2 && args.maximum <= 4) {
                        message += '';
                    } else if (args.maximum >= 5) {
                        message += '';
                    }

                    return message;
                },
                noResults: function () {
                    return '';
                },
                searching: function () {
                    return '';
                }
            };
        });
    };

    // #endregion

    //
    // Return objects assigned to module
    //

    return {

        // Disable transitions before page is fully loaded
        initBeforeLoad: function () {

        },

        // Enable transitions when page is fully loaded
        initAfterLoad: function () {
        },


        // Initialize all components
        initComponents: function () {
            _componentTooltip();
            _componentPopover();
            _componentNavbar();

            //check for notifications
            if ($("body").hasClass("dashboard"))
                Notifications.init();

            //_definePreBind();
            _checkDirection();
            _initI18n();
            _initJvalidate();
            _intiChangeLanguage();
            _initImgToSvg();
            _initModals();
            _select2Defaults();
            //_componentHeadroom();
            //_sidebarScroll();
            //_initToast();
            _findActiveMenu();
            _toastMessages();
            _handleComponents();
            _cloneArray();



            //====== events
            _loginEvent();
        },

        // Initialize all card actions
        initCardActions: function () {
            _cardActionCollapse();
            _cardActionFullscreen();
            _initEmbed();
        },

        // Dropdown submenu
        initDropdownSubmenu: function () {
            _dropdownSubmenu();
        },

        initHeaderElementsToggle: function () {
            _headerElements();
        },

        // Initialize core
        initCore: function () {
            App.initComponents();
            //App.initDropdownSubmenu();
            //App.initHeaderElementsToggle();
        },

        components: {},


        // #region Methods and Api

        // #region validate form

        validateForm: function (id, rules, notify) {
            var options = {
                highlight: function (element) {
                    $(element).closest('.form-group,.input-group').removeClass('has-success').addClass('has-danger');
                    $(element).closest('.form-check').removeClass('has-success').addClass('has-danger');
                },
                success: function (element) {
                    $(element).closest('.form-group,.input-group').removeClass('has-danger').addClass('has-success');
                    $(element).closest('.form-check').removeClass('has-danger').addClass('has-success');
                },
                errorPlacement: function (error, $element) {
                    if ($element.parent().hasClass("input-group")) {
                        $element.closest('.input-group').append(error);
                    }
                    else {
                        $element.closest('.form-group').append(error);
                    }
                }
            };


            //var options = {
            //    errorPlacement: function (error, element) {
            //        // Unstyled checkboxes, radios
            //        if (element.parents().hasClass('form-check')) {
            //            error.appendTo(element.parents('.form-check').parent());
            //        }

            //        // Input with icons and Select2
            //        else if (element.parents().hasClass('form-group-feedback') || element.hasClass('select2-hidden-accessible')) {
            //            error.appendTo(element.parent());
            //        }

            //        // Input group, styled file input
            //        else if (element.parent().is('.uniform-uploader, .uniform-select') || element.parents().hasClass('input-group')) {
            //            element.parent().removeClass('has-success').addClass("has-danger");
            //            error.appendTo(element.parent().parent());
            //        }

            //        // Other elements
            //        else {
            //            //var $icon = $('<i class="input-icon" data-toggle="tooltip" data-placement="top" data-container="body" data-animation="true"></i>')
            //            //    .attr('title',error)
            //            //element.parent().addClass("has-danger")
            //            //    .append();
            //            error.insertAfter(element);
            //        }
            //    },
            //    errorClass: 'validation-invalid-label',
            //    successClass: 'validation-valid-label',
            //    validClass: 'validation-valid-label',
            //    highlight: function (element, errorClass) {
            //        $(element).removeClass(errorClass);
            //    },
            //    unhighlight: function (element, errorClass) {
            //        $(element).removeClass(errorClass);
            //    },
            //    success: function (label) {
            //        label.parents('.has-danger').addClass('has-success').removeClass('has-danger');
            //        label.siblings('.has-danger').addClass('has-success').removeClass('has-danger');
            //        label.remove(); // remove to hide Success message
            //    },
            //    invalidHandler: function () {
            //        if (notify)
            //            App.notify(i18n.validate, 'danger');
            //    },
            //    onfocusout: function (element) {
            //        // "lazy" validation by default                    
            //        //if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
            //        //    this.element(element);
            //        //}



            //        //var $el = $(element);
            //        //if ($el.valid()) {
            //        //    $el.parents('.has-danger').removeClass('has-danger');
            //        //    $el.next().remove();
            //        //}
            //    },
            //    //debug: true
            //};



            options.ignore = ".select2-search__field, :hidden:not(.validate), .ql-container *, .no-validate, section.body:not(.current) *, .ck-editor *";
            if (rules) {
                //options.ignore = ["input[type=hidden], .select2-search__field", ""];
                options.rules = rules;
            }

            //$form.find("select").attr("data-msg-required", i18n.validate.required);
            var $form = id instanceof jQuery ? id : $(id);
            var $validator = $form.validate(options);

            $form.find("[type=text]").on("blur", function () {
                var $input = $(this), name = $input.attr("name"), value = $input.val();
                if ($input.data("unique") && value) {
                    App.ajax({
                        url: $input.closest("form").data("unique-url"),
                        data: { key: name, value: value },
                        loading: $input,
                        success: function (result) {
                            $input.data('is-unique', result.value);
                            if (!result.value) {
                                var error = {};
                                error[name] = i18n.validation.uniqueMsg.replaceAll("{name}", $input.attr("placeholder"));
                                $validator.showErrors(error);
                            }
                        }
                    })
                }
            });
            return $validator;
        },


        // #endregion

        // #region particles JS

        particles: function (tagId, type) {
            particles = {
                default: { "particles": { "number": { "value": 80, "density": { "enable": !0, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "", "width": 100, "height": 100 } }, "opacity": { "value": 1, "random": !1, "anim": { "enable": !1, "speed": 1, "opacity_min": 0.6, "sync": !1 } }, "size": { "value": 3, "random": !0, "anim": { "enable": !1, "speed": 40, "size_min": 0.1, "sync": !1 } }, "line_linked": { "enable": !0, "distance": 150, "color": "#ffffff", "opacity": 1, "width": 1 }, "move": { "enable": !0, "speed": 2, "direction": "none", "random": !1, "straight": !1, "out_mode": "out", "bounce": !1, "attract": { "enable": !1, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": !0, "mode": "grab" }, "onclick": { "enable": !0, "mode": "push" }, "resize": !0 }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": !0 },
                snow: { "particles": { "number": { "value": 400, "density": { "enable": !0, "value_area": 800 } }, "color": { "value": "#fff" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "", "width": 100, "height": 100 } }, "opacity": { "value": 0.5524033491425908, "random": !0, "anim": { "enable": !0, "speed": 1, "opacity_min": 0.1, "sync": !1 } }, "size": { "value": 2, "random": !0, "anim": { "enable": !1, "speed": 40, "size_min": 0.1, "sync": !1 } }, "line_linked": { "enable": !1, "distance": 500, "color": "#ffffff", "opacity": 0.4, "width": 2 }, "move": { "enable": !0, "speed": 1, "direction": "bottom", "random": !1, "straight": !1, "out_mode": "out", "bounce": !1, "attract": { "enable": !1, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": !1, "mode": "bubble" }, "onclick": { "enable": !1, "mode": "repulse" }, "resize": !0 }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 0.5 } }, "bubble": { "distance": 400, "size": 4, "duration": 0.3, "opacity": 1, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": !0 }
            };
            particlesJS(tagId, particles[type || "default"]);
        },

        // #endregion

        // #region datePicker

        /**
         * @typedef {object} datePickerOptions
         * @property {string} viewMode
         * @property {Date} minDate
         * @property {Date} maxDate
         */

        /**
         * @param {string} id datePickerOptions
         * @param {datePickerOptions} opt datePickerOptions
         * @returns {persianDatepicker} pdp object
         */
        datePicker: function (id, opt) {
            var type;
            switch ($("body").prop("lang")) {
                case 'fa':
                    type = "persian";
                    break;
                case 'en':
                default:
                    type = "gregorian";
                    break;
            }
            var dp = $(id + '-input'),
                value = dp.data("date");

            if (value)
                value = new Date(value);

            if (dp.is('[readonly]'))
                return;

            var pdt = dp.keydown(function (e) {
                e.preventDefault();
                return false;
            }).persianDatepicker({
                autoClose: true,
                format: 'YYYY/MM/DD',
                initialValue: value !== undefined,
                initialValueType: "gregorian",
                altField: id,
                calendarType: type,
                onSelect: convertUnixToIso,
                viewMode: opt.viewMode || 'day',
                maxDate: opt.maxDate,
                minDate: opt.minDate,
                toolbox: {
                    onToday: function () {
                        convertUnixToIso($(id).val());
                    }
                }
            });

            if (value)
                convertUnixToIso(value);

            return pdt;

            function convertUnixToIso(unix) {
                var val = Object.prototype.toString.call(unix) === '[object Date]' ?
                    unix.toISOString() :
                    new persianDate(unix).toDate().toISOString();
                $(id).val(val);
                dp.parents('.form-group').addClass("is-filled");
            }
        },

        // #endregion

        // #region timePicker

        timePicker: function (id) {
            var type;
            switch ($("body").prop("lang")) {
                case 'fa':
                    type = "persian";
                    break;
                case 'en':
                default:
                    type = "gregorian";
                    break;
            }
            var dp = $(id + '-input');

            if (dp.is('[readonly]'))
                return;

            var pdt = dp.keydown(function (e) {
                e.preventDefault();
                return false;
            }).persianDatepicker({
                onlyTimePicker: true,
                altField: id,
                formatter: function (unix) {
                    if ($(id).val()) {
                        var date = new persianDate(unix).toDate();
                        return addZero(date.getHours()) + ":" + addZero(date.getMinutes());
                    }
                },
                altFieldFormatter: function (unix) {
                    return new persianDate(unix).toDate().toISOString();
                },
                onSelect: function () {
                    dp.parents('.form-group').addClass("is-filled");
                },
                timePicker: {
                    minute: {
                        step: 30
                    },
                    second: {
                        enabled: false
                    },
                    enabled: true,
                },
                toolbox: {
                    calendarSwitch: {
                        enabled: true,
                    },
                    enabled: true,
                },
                position: [40, 0]
            });

            return pdt;

            function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
        },

        // #endregion

        // #region upload Avatar

        /**
         * @typedef {object} uploadAvatarOptions
         * @property {string} id id of element
         * @property {string} url url
         * @property {string} name form data name
         * @property {string} container parent of modal
         */

        /**
         * @param {uploadAvatarOptions} opt ajaxOptions
         */
        uploadAvatar: function (opt) {
            var $input = $(opt.id),
                $pb = $('<div class="progress m-2" style="height: 0.625rem;"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div>');


            $input.fileupload({
                url: opt.url,
                dataType: 'json',
                paramName: opt.name,
                replaceFileInput: false,

                start: function () {
                    $pb.insertAfter($input.parents('.fileinput').find('.fileinput-preview'));
                },

                progressall: function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $pb.children().css('width', progress + '%');
                },

                done: function (e, data) {
                    setTimeout(function () {
                        $pb.fadeOut(function () {
                            $pb.remove();
                        });
                    }, 1000);
                    var value = formatResult(data.result);

                    $input.next('[type=hidden]').val(value);
                },

                fail: function () {
                    App.notify(i18n.error, 'danger');
                }
            }).prop('disabled', !$.support.fileInput)
                .parent().addClass($.support.fileInput ? undefined : 'disabled');


            function formatResult(result) {
                if (!result || !result.length)
                    return false;

                var array = [], msg;
                $(result).each(function (i, e) {
                    if (!e.success) {
                        msg = e.message;
                        return false;
                    }
                    array.push(e.url);
                });

                if (!msg)
                    return array.toString();
                App.notify(msg, 'danger');
            }
        },

        // #endregion

        // #region upload Avatar in modal

        /**
         * @param {uploadAvatarOptions} opt ajaxOptions
         */
        uploadAvatarModal: function (opt) {
            var $input = $(opt.id);

            $input.parents('.fileinput').on('change.bs.fileinput', function (e, file) {
                e.preventDefault();
                if (file) {
                    var $modal_avatar = $('<div />').addClass('jmodal modal-pure'),
                        $img = $('<img />').attr('src', file.result).addClass('img-fluid'),
                        $fileinput = $(this),
                        $btnSubmit = $('<button />').addClass('btn btn-success btn-submit-jmodal legitRipple').text(i18n.submit),
                        $preview = $fileinput.find('.fileinput-preview');

                    App.block($preview);
                    $modal_avatar.append($img).append($btnSubmit);
                    var cropped = false;
                    $modal_avatar.appendTo('body')
                        .one('jmodal:open', function () {
                            $(this).parents('.blocker').css('background-color', 'rgba(0,0,0,0.2)');
                            $img.cropper({
                                aspectRatio: 1,
                                minContainerHeight: 300,
                                minContainerWidth: 300,
                                preview: $preview
                            });
                            $img.data('cropper');
                            App.unblock($preview);
                        })
                        .one('jmodal:close', function () {
                            $img.removeData('cropper');
                            App.unblock($preview);
                            if (!cropped)
                                $fileinput.fileinput('clear');
                        })
                        .jmodal({
                            closeText: '',
                            fadeDuration: 250,
                            escapeClose: false,
                            clickClose: false,
                        });

                    $btnSubmit.on('click', function () {
                        var $this = $(this),
                            data = $this.data(),
                            result;

                        if ($img.data('cropper')) {
                            data = $.extend({}, data);

                            result = $img.cropper('getCroppedCanvas', { width: 300, height: 300 }, data.secondOption);

                            if (result) {
                                var img = result.toDataURL('image/jpeg');
                                App.ajax({
                                    url: opt.url,
                                    loading: $preview,
                                    data: { file: img },
                                    success: function (d) {
                                        if (d.success) {
                                            $fileinput.find('input[name=' + opt.name + ']').val(d.url);
                                            $fileinput.find('.img-thumbnail img').attr('src', d.url).removeAttr('style');
                                            cropped = true;
                                            $.jmodal.close();
                                        }
                                        else {
                                            App.notify(d.message, 'danger');
                                        }
                                    }
                                });
                            }
                        }
                    });

                }
                // alert();
            });

        },

        // #endregion

        // #region upload image

        /**
         * @param {uploadAvatarOptions} opt ajaxOptions
         */
        uploadImage: function (opt) {
            var $input = $(opt.id);

            $input.parents('.fileinput').on('change.bs.fileinput', function (e, file) {
                e.preventDefault();
                if (file) {
                    var $modal_avatar = $('<div />').addClass('jmodal modal-pure'),
                        $img = $('<img />').attr('src', file.result).addClass('img-fluid'),
                        $fileinput = $(this),
                        $btnSubmit = $('<button />').addClass('btn btn-success btn-submit-jmodal legitRipple').text(i18n.submit),
                        $preview = $fileinput.find('.fileinput-preview');

                    App.block($preview);
                    $modal_avatar.append($img).append($btnSubmit);
                    var cropped = false;
                    $modal_avatar.appendTo('body')
                        .one('jmodal:open', function () {
                            $(this).parents('.blocker').css('background-color', 'rgba(0,0,0,0.2)');
                            $img.cropper({
                                aspectRatio: 1,
                                minContainerHeight: 300,
                                minContainerWidth: 300,
                                preview: $preview
                            });
                            $img.data('cropper');
                            App.unblock($preview);
                        })
                        .one('jmodal:close', function () {
                            $img.removeData('cropper');
                            App.unblock($preview);
                            if (!cropped)
                                $fileinput.fileinput('clear');
                        })
                        .jmodal({
                            closeText: '',
                            fadeDuration: 250,
                            escapeClose: false,
                            clickClose: false,
                        });

                    $btnSubmit.on('click', function () {
                        var $this = $(this),
                            data = $this.data(),
                            result;

                        if ($img.data('cropper')) {
                            data = $.extend({}, data);

                            result = $img.cropper('getCroppedCanvas', { width: 300, height: 300 }, data.secondOption);

                            if (result) {
                                var img = result.toDataURL('image/jpeg');
                                App.ajax({
                                    url: opt.url,
                                    loading: $preview,
                                    data: { file: img },
                                    success: function (d) {
                                        if (d.success) {
                                            $fileinput.find('input[name=' + opt.name + ']').val(d.url);
                                            $fileinput.find('.img-thumbnail img').attr('src', d.url).removeAttr('style');
                                            cropped = true;
                                            $.jmodal.close();
                                        }
                                        else {
                                            App.notify(d.message, 'danger');
                                        }
                                    }
                                });
                            }
                        }
                    });

                }
                // alert();
            });

        },

        // #endregion


        // #region ajax

        /**
         * @typedef {object} ajaxOptions
         * @property {string} url
         * @property {object} data
         * @property {boolean} toast
         * @property {boolean} reload
         * @property {string} loading id of element
         //* @property {string} redirect url
         * @property {function} start
         * @property {function} error
         * @property {function} success
         * @property {function} complete
         * @property {string} method
         */

        /**
         * @param {ajaxOptions} opt ajaxOptions
         * @returns {JQueryXHR} ajax object
         */
        ajax: function (opt) {
            if (typeof opt === 'string')
                opt = { url: opt };
            if (opt.start)
                opt.start();

            if (opt.loading)
                App.block(opt.loading);

            return $.ajax({
                url: opt.url,
                data: opt.data || undefined,
                method: opt.method || "POST",
                async: true,
                timeout: 50000,
                //contentType: 'Application/json; charset=UTF-8',
            }).done(function (d) {
                if (d === null || typeof d === 'object' && d.success !== undefined && !d.success)
                    App.notify(d.message, 'danger');
                else {
                    if (opt.toast && d.message != null && d.message.length)
                        App.notify(d.message, 'success');
                    if (opt.success)
                        opt.success(d);
                    //var href = opt.reload && location.href || opt.redirect;
                    var href = opt.reload && location.href || (opt.redirect ? (typeof opt.redirect === 'string' ? opt.redirect : opt.redirect(d)) : '');
                    if (href)
                        setTimeout(function () {
                            href = href.split('#')[0];
                            App.goTo(href);
                        }, 1000);
                    else if (d.redirect)
                        setTimeout(function () {
                            d.url = d.url.split('#')[0];
                            App.goTo(d.url);
                        }, 2000);
                }
            }).fail(function (e) {
                var dom_nodes = $($.parseHTML(e.responseText)),
                    msg = dom_nodes.filter('title').text();
                App.notify(msg || i18n.error, 'danger');
                if (opt.error)
                    opt.error(e);

            }).always(function (d) {
                if (opt.complete)
                    opt.complete();
                if (opt.loading && !d.redirect)
                    App.unblock(opt.loading);
            });
        },

        // #endregion

        // #region notify
        notify: function (message, type) {
            var icon;
            switch (type) {
                case 'danger':
                    icon = 'error';
                    break;

                case 'success':
                case 'info':
                case 'primary':
                default:
                    icon = 'notifications';
            }

            var dir = App.dir === 'ltr' ? 'right' : 'left';
            $.notify({
                icon: icon,
                message: message

            }, {
                type: type || 'info',
                timer: 4000,
                placement: {
                    from: 'top',
                    align: dir
                },
                offset: {
                    x: 15,
                    y: 75
                }
            });
        },

        // #endregion

        // #region Block ui

        block: function (el) {
            if (!(el instanceof jQuery))
                el = $(el);
            var color = "#999";

            if (el.is("input")) {
                var parent = el.closest(".input-group");
                if (!parent.length)
                    parent = el.closest(".form-group");
                parent.addClass("has-loading");
            }
            else {
                if (el.is("button")) {
                    el.data("color", el.css("color")).css("color", "transparent");
                    color = "#fff";
                }

                el.addClass("disabled").stop().fadeTo("slow", .5).block({
                    message: '<svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"> <circle fill="' + color + '" stroke="none" cx="30" cy="50" r="6"> <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"/> </circle> <circle fill="' + color + '" stroke="none" cx="50" cy="50" r="6"> <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"/> </circle> <circle fill="' + color + '" stroke="none" cx="70" cy="50" r="6"> <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"/> </circle> </svg>',
                    overlayCSS: {
                        backgroundColor: "transparent",
                        opacity: .5,
                        cursor: 'wait',
                        //'box-shadow': '0 0 0 1px #ddd'
                    },
                    css: {
                        border: 0,
                        padding: 0,
                        backgroundColor: 'none'
                    }
                });
            }
        },

        unblock: function (el) {
            if (!(el instanceof jQuery))
                el = $(el);

            if (el.is("input")) {
                var parent = el.closest(".input-group");
                if (!parent.length)
                    parent = el.closest(".form-group");
                parent.removeClass("has-loading");
            }
            else {
                if (el.is("button")) {
                    el.css("color", el.data("color"));
                    color = "#fff";
                }

                el.removeClass("disabled").stop().fadeTo("slow", 1).unblock();
            }
        },

        // #endregion

        // #region generateNumericPassword()

        generateNumericPassword: function () {
            var length = 8,
                charset = "0123456789",
                retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            return retVal;
        },

        // #endregion

        // #region dataTable
        /**
         * @typedef {object} DataTableButton
         * @property {string} className
         * @property {string} action
         * @property {function} callback
         * @property {string} title
         * @property {string} icon material icon
         * @property {('ctx'|'buttons'|'all')} placement where to show the command
         * @property {('single'|'multiple'|'singleOptional'|'none')} select
         */

        /**
         * @typedef {object} DataTableAjax
         * @property {function} data
         * @property {string} url
         * @property {function} dataSrc
         */

        /**
         * @typedef {object} DataTableOptions
         * @property {string} table table id
         * @property {object[]} columnDefs
         * @property {DataTableButton[]} buttons
         * @property {string} idKey
         * @property {boolean} selectable
         * @property {DataTableAjax} ajax
         * @property {boolean} hideCtx
         * @property {boolean} disablePrintButtons
         * @property {boolean} disablePaging
         * @property {boolean} responsive
         * @property {number} groupColumn
         * @property {object} additionalOptions
         * @property {string} dom,
         */

        /**
         * @typedef {object} DataTable
         * @property {object} table datatables.net object
         * @property {function} load
         * @property {function} on
         * @property {function} getIds
         */

        /**
         * @param {DataTableOptions} opt DataTableOptions
         * @return {DataTable} tDataTable
         */

        dataTable: function (opt) {
            var $tbl = $(opt.table),
                th = '<th style="width:50px" data-orderable="false"></th>',
                $card = $tbl.parents('.card');

            opt.responsive = opt.responsive === undefined || opt.responsive;

            $.extend($.fn.dataTable.defaults, {
                autoWidth: false,
                responsive: opt.responsive,
                language: i18n.dataTable,
                //dom: opt.dom || '<"datatable-header"fBl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
                dom: opt.dom || "<'row'<'col-sm-12 d-flex col-md-6'fl><'col-sm-12 text-dir-right col-md-6'B>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",

            });


            var tblOptions = {
                columnDefs: [],
                //------------
                buttons: opt.disablePrintButtons ? []
                    : [
                        //{ extend: 'csv', className: 'btn btn-link', text: '<i class="mi ">grid_on</i> ', attr: { title: i18n.export + " csv", "data-toggle": "tooltip" } },
                        { extend: 'excel', className: 'btn btn-link', text: '<i class="mi ">grid_on</i> ', attr: { title: i18n.export + " excel", "data-toggle": "tooltip" } },
                        { extend: 'pdf', className: 'btn btn-link', text: '<i class="mi ">picture_as_pdf</i> ', attr: { title: i18n.export + " pdf", "data-toggle": "tooltip" } },
                        { extend: 'print', className: 'btn btn-link', text: '<i class="mi ">print</i> ', attr: { title: i18n.print, "data-toggle": "tooltip" } }
                    ],
                //------------
                drawCallback: function (settings) {
                    if (opt.groupColumn !== undefined) {
                        var api = this.api();
                        var rows = api.rows({ page: 'current' }).nodes();
                        var last = null;

                        api.column(opt.groupColumn, { page: 'current' }).data().each(function (group, i) {
                            if (last !== group) {
                                $(rows).eq(i).before(
                                    '<tr class="group"><td colspan="50">' + group + '</td></tr>'
                                );

                                last = group;
                            }
                        });
                    }
                    App.unblock($card);
                }
            };

            //----- responsive

            if (opt.responsive) {
                $tbl.find('thead tr').prepend(th);
                tblOptions.columnDefs.push({
                    className: 'control',
                    orderable: false,
                    order: false,
                    ordering: false,
                    targets: 0,
                    render: function (data, type, row) {
                        return '';
                    }
                });
            }

            //----- paging
            if (opt.disablePaging) {
                tblOptions.paging = false;
                tblOptions.info = false;
            } else {
                tblOptions.lengthMenu = [[10, 20, 50, 100], [10, 20, 50, 100]];
                tblOptions.pagingType = 'full_numbers';
            }

            //----- selectable
            if (opt.selectable === undefined || opt.selectable) {
                tblOptions.columnDefs.push({
                    orderable: false,
                    className: 'select-checkbox all',
                    targets: -1,
                    render: function (data, type, row) {
                        return '';
                    }
                });
                console.log(tblOptions)
                tblOptions.select = {
                    style: 'os',
                    selector: 'tbody > tr'
                };
                $tbl.find('thead tr').append(th);
            }


            //----- ajax load
            if (opt.ajax === undefined || opt.ajax) {
                tblOptions.processing = true;
                tblOptions.serverSide = true;

                tblOptions.ajax = {
                    url: App.url((opt.ajax && opt.ajax.url) || "get-paginated"),
                    type: 'POST',
                };
                tblOptions.ajax = App.mergeObjects(opt.ajax, tblOptions.ajax)

                tblOptions.createdRow = function (row, data, dataIndex) {
                    $(row).attr('data-id', data[opt.idKey || "id"]);
                };

                tblOptions.initComplete = function (settings, json) {
                    $('[data-toggle="tooltip"],[rel="tooltip"]').tooltip({});
                    $tbl.parents('.card').find('.header-elements [data-action="reload"]').click(function () {
                        var card = $(this).parents('.card');
                        App.block(card);
                        dataTable.load();
                        App.unblock(card);
                    });

                    if (!opt.hideCtx) {
                        var items = {};
                        opt.buttons.forEach((btn) => {
                            if (btn.placement !== 'buttons')
                                items[btn.action] = {
                                    name: btn.title,
                                    icon: typeof btn.icon === 'string' ? function (opt, $itemElement, itemKey, item) {
                                        $itemElement.html('<i class="mi">' + btn.icon + '</i> ' + btn.title);
                                        return 'context-menu-icon-updated';
                                    } : btn.icon,
                                    callback: function (_key, _options) {
                                        var ids = dataTable.getIds();
                                        if (validateSelections(btn.select, ids.length) && btn.callback)
                                            btn.callback(ids);
                                    }
                                };
                        });

                        $tbl.contextMenu({
                            selector: 'tbody [role="row"]',
                            className: 'context-menu',
                            events: {
                                preShow: function (options) {
                                    var row = options[0];
                                    if (!$(row).hasClass('selected'))
                                        dataTable.table.rows().deselect();
                                    dataTable.table.rows(row).select();
                                }
                            },
                            zIndex: 10,
                            build: function ($trigger, e) {
                                return {
                                    callback: function () { },
                                    items: items
                                };
                            }
                        });
                    }
                    $tbl.parents('.dataTables_wrapper').find('.dataTables_length').tooltip({ title: i18n.showCount, container: 'body', });

                    if (opt.initComplete)
                        opt.initComplete(settings, json);
                };
            }
            //----- end ajax load

            //----- table buttons
            if (opt.buttons) {
                var btns = tblOptions.buttons;
                tblOptions.buttons = [];
                opt.buttons.forEach((btn) => {
                    if (btn.placement !== 'ctx')
                        tblOptions.buttons.push({
                            text: '<i class="mi ">' + btn.icon + '</i> ',
                            action: function () {
                                var ids = dataTable.getIds();
                                if (validateSelections(btn.select, ids.length) && btn.callback)
                                    btn.callback(ids);
                            },
                            className: 'btn btn-link text-' + btn.className,
                            attr: { title: btn.title, "data-toggle": "tooltip", "rel": "tooltip", "data-container": "body" }
                        });
                });
                tblOptions.buttons.push.apply(tblOptions.buttons, btns);
                tblOptions.buttons.reverse();
            }

            if (opt.columnDefs)
                Array.prototype.push.apply(tblOptions.columnDefs, opt.columnDefs);

            if (opt.additionalOptions)
                tblOptions = App.mergeObjects(opt.additionalOptions, tblOptions);

            /**
             * @type {DataTable}
             */
            var dataTable = {
                table: null,
                //---------------
                init: function () {
                    dataTable.table = $tbl.DataTable(tblOptions);
                    delete dataTable.init;

                    return dataTable;
                },
                //---------------
                load: function () {
                    App.block($card);
                    if (dataTable.table)
                        dataTable.table.ajax.reload();
                    else dataTable.init();

                    return dataTable;
                },
                //---------------
                on: function (event, target, call) {
                    dataTable.table.on(event, target, call);
                    return dataTable;
                },
                //---------------
                getIds: function () {
                    var data = dataTable.table.rows({ selected: true }).data();
                    var ids = [];
                    $(data).each(function (i, e) {
                        ids.push(e.id);
                    });
                    return ids;
                }
            };

            return dataTable;


            // #region validate Selections
            function validateSelections(select, arrayLength) {
                switch (select) {
                    case 'single':
                        if (arrayLength !== 1) {
                            App.alert({ content: i18n.select1, title: i18n.error });
                            return false;
                        }
                        break;
                    case 'singleOptional':
                        if (arrayLength > 1) {
                            App.alert({ content: i18n.select1, title: i18n.error });
                            return false;
                        }
                        break;
                    case 'multiple':
                        if (arrayLength <= 0) {
                            App.alert({ content: i18n.selectMin1, title: i18n.error });
                            return false;
                        }
                        break;
                }
                return true;
            }
            // #endregion

        },



        // #endregion

        // #region merge objects

        mergeObjects: function (obj1, obj2) {
            var obj3 = {};
            for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
            for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
            return obj3;
        },

        // #endregion

        // #region App.url()
        /**
         *
         * @param {string} u
         * @returns {string} absolute url
         */

        url: function (u) {
            if (u.startsWith('/'))
                return document.location.origin + u;

            var base = window.baseUrl;

            while (u.startsWith('../')) {
                var i = base.lastIndexOf('/');
                base = base.slice(0, i);
                u = u.slice(3);
            }
            if (u.endsWith('/'))
                u = u.slice(0, u.length - 2);
            return base + (u ? ("/" + u) : "");
        },

        urlExistes: function (url) {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            return http.status != 404;
        },

        // #endregion

        // #region confirm

        /**
         * @typedef {object} confirmOptions
         * @property {string} content
         * @property {string} title
         * @property {function} call
         * @property {function} cancel
         * @property {string} type confirm type
         */

        /**
         * @param {confirmOptions} opt confirmOptions
         * @returns {object} $confirm object
         */
        confirm: function (opt) {
            var jc = $.confirm({
                title: opt.title || i18n.ensure,
                content: opt.content,
                type: opt.type || 'orange',
                backgroundDismiss: true,
                rtl: App.dir === "rtl",

                theme: 'material',

                buttons: {
                    cancel: {
                        text: i18n.cancel,
                        action: opt.cancel
                    },
                    yes: {
                        text: i18n.yes,
                        btnClass: 'btn-green',
                        action: function () {
                            jc.showLoading(true);
                            if (opt.call)
                                opt.call();
                            jc.hideLoading(true);
                        }
                    }
                }
            });
            return jc;
        },

        // #endregion

        // #region prompt

        /**
         * @typedef {object} promptOptions
         * @property {string} title
         * @property {string} label
         * @property {function} call
         * @property {function} cancel
         * @property {string} initValue init value
         */

        /**
         * @param {promptOptions} opt promptOptions
         * @returns {object} $confirm object
         */
        prompt: function (opt) {
            var jc = $.confirm({
                title: opt.title,
                content: '<div class="confirm-prompt"><div class="form-group-float">' +
                    '<label class="form-group-float-label" for="">' + opt.label + '</label><input class="form-control input-prompt" name="prompt" data-rule-maxlength="100" placeholder="' + opt.label + '" type="text" />' +
                    '</div></div>',
                type: 'blue',
                backgroundDismiss: true,
                rtl: App.dir === "rtl",

                theme: 'material',

                buttons: {
                    cancel: {
                        text: i18n.cancel,
                        action: opt.cancel
                    },
                    submit: {
                        text: i18n.submit,
                        btnClass: 'btn-green',
                        action: function () {
                            jc.showLoading(true);
                            var val = this.$content.find('.input-prompt').val();
                            if (opt.call)
                                opt.call(val);
                            jc.hideLoading(true);
                        }
                    }
                },

                onContentReady: function () {
                    this.$content.find('.input-prompt').val(opt.initValue);
                    App.floatingLabels(this.$content.find('.confirm-prompt'));
                }
            });
            return jc;
        },

        // #endregion

        // #region alert

        /**
         * @typedef {object} alertOptions
         * @property {string} content
         * @property {string} title
         * @property {('success'|'warning'|'error'|'info'|'dark')} type
         * @property {function} callback
         */

        /**
         * @param {alertOptions} opt alertOptions
         * @returns {object} $alert object
         */
        alert: function (opt) {
            var icons = {
                success: { color: 'green', icon: 'done' },
                warning: { color: 'orange', icon: 'warning' },
                error: { color: 'red', icon: 'error' },
                info: { color: 'blue', icon: 'info' },
                dark: { color: 'dark', icon: 'info' }
            };
            return $.alert({
                title: opt.title,
                content: opt.content,
                backgroundDismiss: true,
                rtl: App.dir === "rtl",
                theme: 'material',
                type: opt.type ? icons[opt.type].color : icons.warning.color,
                icon: opt.type ? icons[opt.type].icon : icons.warning.icon,
                closeIcon: true,
                buttons: {
                    submit: {
                        text: i18n.ok,
                        action: opt.callback
                    }
                }
            });
        },

        // #endregion

        // #region serializeForm

        //serialize data function
        serializeForm: function ($form, skipEmpty) {
            if ($form instanceof jQuery)
                $form = $form.serializeArray();

            var obj = {};
            for (var i = 0; i < $form.length; i++) {
                var val = $form[i]['value'];
                if (skipEmpty && !val)
                    continue;

                if (obj[$form[i]['name']]) {
                    if (!Array.isArray(obj[$form[i]['name']]))
                        obj[$form[i]['name']] = [obj[$form[i]['name']]];

                    obj[$form[i]['name']].push(val);
                }
                else
                    obj[$form[i]['name']] = val;
            }
            return obj;
        },

        // #endregion

        // #region loadModal


        /**
         * @callback onModalSubmitCallback
         * @param {jQuery} modal jquery object of modal
         */

        /**
         * @typedef {object} LoadModalOptions
         * @property {string} url
         * @property {string} method
         * @property {string} className modal-lg | modal-sm
         * @property {string} loading id of element
         * @property {boolean} confirmOnHide
         * @property {object} data
         * @property {function} onModalShow
         * @property {onModalSubmitCallback} onSubmit
         */

        /**
         * @param {LoadModalOptions} opt LoadModalOptions
         */
        loadModal: function (opt) {
            App.ajax({
                url: opt.url,
                method: opt.method,
                data: opt.data,
                loading: opt.loading,
                success: function (data) {
                    var modal = $('#' + $(data).appendTo('body').attr('id'));
                    modal.on('show.bs.modal', function (e) {
                        if (opt.onModalShow)
                            opt.onModalShow(e, modal);
                    }).modal().on('hide.bs.modal', function (e) {
                        that = $(this);
                        if (opt.confirmOnHide) {
                            e.preventDefault();
                            App.confirm({
                                content: that.data('warning'),
                                call: function () {
                                    confirm = false;
                                    that.modal('hide');
                                }
                            });
                        }
                    }).on('hidden.bs.modal', function () {
                        $(this).off('click', '[data-action="submit"]')
                            .off('hide.bs.modal').remove();
                    }).on('click', '[data-action="submit"]', function (e) {
                        e.preventDefault();
                        if (opt.onSubmit)
                            opt.onSubmit(modal);
                        else modal.modal('hide');
                    }).find('.modal-dialog').addClass(opt.className);
                }
            });
        },

        // #endregion

        // #region signOut

        signOut: function (e) {
            App.confirm({
                title: i18n.signout,
                content: i18n.ensure,
                call: function () {
                    $('<form method="post" action="' + $(e).data('href') + '"></form>')
                        .appendTo("body").submit();
                }
            });
            return false;
        },

        // #endregion

        // #region goTo

        /**
         * @param {string} url url
         */
        goTo: function (url, newPage) {
            if (newPage) {
                var win = window.open(url, '_blank');
                win.focus();
                return win;
            }
            location.href = url;
        },

        // #endregion

        // #region editor

        /**
         * @typedef {object} EditorOptions
         * @property {string} id
         * @property {("balloon"|"classic")} type,
         * @property {boolean} readOnly
         */

        /**
         * @param {EditorOptions} opt EditorOptions
         * @returns {Editor} editor object
         */

        editor: function (opt) {
            var deferred = new $.Deferred(),
                editor;

            if (opt.type === "balloon")
                editor = BalloonEditor;
            else
                editor = ClassicEditor;

            var target = document.querySelector(opt.id);

            editor.create(target, {
                placeholder: target.dataset.placeholder,
                language: $("body").prop("lang"),
                readOnly: opt.readOnly
                // toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
            })
                .then(editor => {
                    deferred.resolve(editor);
                })
                .catch(error => {
                    console.error(error);
                });

            return deferred.promise();
        },

        // #endregion 

        // #region iframe in modal

        /**
         * @typedef {object} iframeModalOptions
         * @property {string} src
         * @property {boolean} loading
         */

        /**
         * @param {iframeModalOptions} opt iframeModalOptions
         */
        iframeModal: function (opt) {
            //App.block(opt.loading);

            var $modal = $('<div />').addClass('jmodal modal-pure').css('max-width', '80%').css('height', '100%'),
                $iframe = $('<iframe />').attr('src', opt.src).addClass('w-100 h-100 border-0')
                    .on('load', function () {
                        //$modal.removeClass('d-none').jmodal({
                        //    closeText: '',
                        //    fadeDuration: 250,
                        //    clickClose: true
                        //});
                    });

            $modal.append($iframe)
                .one('jmodal:close', function () {
                    $(this).remove();
                }).jmodal({
                    closeText: '',
                    fadeDuration: 250,
                    clickClose: true
                });


            //if (navigator.userAgent.indexOf("MSIE") > -1 && !window.opera) {
            //    iframe.onreadystatechange = function () {
            //        if (iframe.readyState == "complete") {
            //            //not sure if your code works but it is below for reference
            //            document.getElementById('myIFrame').class = ShowMe;
            //            //or this which will work
            //            //document.getElementById("myIFrame").className = "ShowMe";

            //        }
            //    };
            //}
            //else {
            //    iframe.onload = function () {
            //        //not sure if your code works but it is below for reference
            //        document.getElementById('myIFrame').class = ShowMe;
            //        //or this which will work
            //        //document.getElementById("myIFrame").className = "ShowMe";
            //    };
            //}




            //App.block($preview);
            //$modal_avatar.append($img).append($btnSubmit);
            //var cropped = false;
            //$modal_avatar.appendTo('body')
            //    .one('jmodal:open', function () {
            //        $(this).parents('.blocker').css('background-color', 'rgba(0,0,0,0.2)');
            //        $img.cropper({
            //            aspectRatio: 1,
            //            minContainerHeight: 300,
            //            minContainerWidth: $modal_avatar.width(),
            //            preview: $preview
            //        });
            //        $img.data('cropper');
            //        App.unblock($preview);
            //    })
            //    .one('jmodal:close', function () {
            //        $img.removeData('cropper');
            //        App.unblock($preview);
            //        if (!cropped)
            //            $fileinput.fileinput('clear');
            //    })
            //    .jmodal({
            //        closeText: '',
            //        fadeDuration: 250,
            //        clickClose: true
            //    });

        },

        // #endregion

        // #region card multiple body

        /**
         * @param {String} id card id
         */

        multipleBody: function (id) {
            var $card = $(id);
            $card.on('click', '[data-toggle="multiple-body"]', function (e) {
                e.preventDefault();

                var targetId = $(this).attr('href'),
                    $target = $(targetId),
                    $current = $(this).parents('.card-inner-body'),
                    width = $current.width();

                changeCardHeight($current, $target);


                var top = parseInt($current.parent().css('padding-top'));
                $current.addClass('animated position-absolute').width(width).removeClass('active').css('top', top + 'px');

                if ($current.data('previous')) {
                    $current.addClass('fadeOutRight');
                    $target.addClass('animated fadeInLeft active').css('display', 'block').removeData('previous', targetId);
                }
                else {
                    $current.addClass('fadeOutLeft');
                    $target.addClass('animated fadeInRight active').css('display', 'block').data('previous', targetId);
                }

            });


            function changeCardHeight($current, $target) {
                App.block($card);
                var finalHeight = $card.height() + $target.height() - $current.height();
                $card.animate({ height: finalHeight }, 800, () => {
                    App.unblock($card);
                    reset($current, $target);
                });
            }

            function reset($current, $target) {
                $current.removeClass('animated fadeOutLeft fadeOutRight position-absolute').removeData('previous')
                    .css('width', 'auto').css('display', 'none').css('top', 'auto');
                $target.removeClass('animated fadeInRight fadeInLeft');
                $card.css('height', 'auto')
            }
        },

        // #endregion

        // #region TreeView

        /**
         * @callback onActivateTreeNode
         * @param {Event} event
         * @param {object} data
         */

        /**
         * @typedef {object} TreeViewOptions
         * @property {string} id
         * @property {string} url
         * @property {object} data
         * @property {onActivateTreeNode} onActivate
         */

        /**
         * @typedef {object} TreeView
         * @property {object} tree  fancytree object
         * @property {function} load
         * @property {function} enable
         * @property {function} disable
         * @property {function} contains
         */

        /**
         * @param {TreeViewOptions} opt TreeViewOptions
         * @return {TreeView} treeView
         */
        treeView: function (opt) {
            // #region init

            var _init = function (call) {
                /**
                 * @type {TreeView}
                 */

                $(opt.id).fancytree({
                    //--- data
                    source: {
                        url: opt.url,
                        data: opt.data
                    },

                    //--- events
                    init: function (_event, data) {
                        if (!treeView.tree) {
                            data.tree.getFirstChild().setExpanded(true);//.setActive(true, { noEvents: true, noFocus: true });
                            //data.tree.getFirstChild().setActive(true);
                        }
                        treeView.tree = data.tree;
                        $(this).css('height', 'auto');
                        _preventScrollBar();
                        if (call)
                            call();
                    },
                    beforeExpand: function () {
                        $(this).children('ul').css('overflow', 'unset');
                    },
                    beforeCollapse: function () {
                        $(this).children('ul').css('overflow', 'unset');
                    },
                    expand: _preventScrollBar,
                    collapse: _preventScrollBar,
                    activate: function (_event, data) {
                        if (opt.onActivate)
                            opt.onActivate(_event, data);
                        data.node.setSelected(true);
                        return false;
                    },

                    //--- settings
                    clickFolderMode: 4, // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expands)
                    selectMode: 1,
                    autoScroll: false,
                });
            };

            // #endregion

            // #region load

            var _load = function (call) {
                if (this.tree)
                    this.tree.reload().done(call);
                else _init(call);
            };

            // #endregion

            // #region enable and disable

            var _enable = function () {
                if (this.tree)
                    this.tree.enable();
            };

            var _disable = function () {
                if (this.tree)
                    this.tree.enable(false);
            };

            // #endregion

            // #region active

            var _active = function (id) {
                if (this.tree)
                    this.tree.activateKey(id);
            };

            // #endregion

            // #region contains

            var _contains = function (id) {
                if (this.tree) {
                    var node = this.tree.getNodeByKey(id);
                    return node != null;
                }
                return false;
            };

            // #endregion

            /**
             * @type {TreeView}
             */
            var treeView = {
                load: _load,
                enable: _enable,
                disable: _disable,
                active: _active,
                contains: _contains,
                tree: null
            };
            return treeView;

            function _preventScrollBar() {
                var $ul = treeView.tree.$container;
                $ul.css('min-height', 'auto').css('min-height', ($ul.height() + 10) + 'px').css('overflow', 'auto');
            }
        },

        // #endregion

        // #region Selectpicker
        /**
         * @callback preprocessData
         * @param {object} data
         */

        /**
         * @typedef {object} SelectpickerOptions
         * @property {string} id
         * @property {string} url
         * @property {function} data
         * @property {boolean} clear
         * @property {preprocessData} preprocessData
         */


        /**
         * @param {SelectpickerOptions} opt SelectpickerOptions
         */
        selectpicker: function (opt) {
            var $select = $(opt.id);
            if (opt.url) {
                $select.selectpicker({
                    iconBase: "mi", tickIcon: "check",
                    liveSearch: true
                })
                    .ajaxSelectPicker({
                        ajax: {
                            url: opt.url,
                            data: function () {
                                var params = {
                                    q: '{{{q}}}'
                                };
                                return params;
                            }
                        },
                        locale: {
                            emptyTitle: $select.attr('title')
                        },
                        preprocessData: opt.preprocessData,
                        preserveSelected: false,
                        minLength: 2
                    });
                //.ajaxSelectPicker({
                //    ajax: {
                //        url: opt.url,
                //        data: opt.data,
                //        locale: {
                //            emptyTitle: $select.attr('title')
                //        },
                //        preprocessData: function (data) {
                //            opt.preprocessData(data)
                //        },
                //        preserveSelected: false
                //    }
                //});
                $select.trigger("change");
            }
            else {
                $select.selectpicker({
                    iconBase: "mi", tickIcon: "check"
                })
                if (opt.clear) {
                    $select.val('0');
                    $select.selectpicker('refresh')
                }
            }
        },

        // #endregion

        // #region Select2
        /**
         * @callback callbackDataItem
         * @param {object} data
         */

        /**
         * @typedef {object} Select2Options
         * @property {string} id
         * @property {string} url
         * @property {string} icon
         * @property {boolean} tags
         * @property {number} min minimumInputLength
         * @property {function} data
         * @property {callbackDataItem} map
         * @property {callbackDataItem} templateResult
         * @property {callbackDataItem} templateSelection
         */


        /**
         * @param {Select2Options} opt Select2Options
         */
        select2: function (opt) {
            var $select = $(opt.id);
            var $select2 = $select.select2({
                ajax: {
                    url: opt.url,
                    dataType: 'json',
                    type: "GET",
                    delay: 250,
                    data: function (params) {
                        var data = {
                            q: params.term, // search term
                            page: params.page
                        };
                        if (opt.data)
                            data = App.mergeObjects(data, opt.data());
                        return data;
                    },
                    success: function () {
                    },
                    processResults: function (data, params) {
                        params.page = params.page || 0;
                        var newData = $.map(data.results, opt.map
                            //function (item) {
                            //    return {
                            //        text: item.name,
                            //        id: item.id,
                            //        state: item.state
                            //    };
                            //}
                        );
                        return {
                            results: newData,
                            pagination: {
                                more: (params.page + 1) * 10 < data.totalCount
                            }
                        };
                    },
                },
                minimumResultsForSearch: opt.min || Infinity,
                escapeMarkup: function (markup) {
                    return markup;
                },
                templateResult: opt.templateResult,
                templateSelection: function (data) {
                    var icon = "";
                    if (opt.icon)
                        icon = '<i class="mi mr-3">' + opt.icon + '</i>';

                    if (opt.templateSelection) {
                        return icon + opt.templateSelection(data);
                    }
                    else {
                        return icon + data.text;
                    }
                },
                width: 'resolve',
                theme: "material",
                //theme: "bootstrap",
                allowClear: true,
                tags: opt.tags,
                createSearchChoice: opt.tags ? function (term, data) {
                    if ($(data).filter(function () {
                        return this.text.localeCompare(term) === 0;
                    }).length === 0) {
                        return {
                            id: term,
                            text: term
                        };
                    }
                } : undefined,
            });
            $(".select2-selection__arrow")
                .addClass("mi")
                .html("arrow_drop_down");

            //$select2.on("select2:clear", function () {
            //    $(this).trigger()
            //})
            return $select2;
        },

        // #endregion

        // #region floatingLabels

        materialize: function ($el) {
            $el.bootstrapMaterialDesign({ autofill: !1 });
        },

        // #endregion

        // #region imgToSvg
        imgToSvg: _initImgToSvg,
        // #endregion

        // #region populateform

        populateForm: function ($form, data) {
            $.each(data, function (key, value) {
                var ctrl = $('[name=' + key + ']', $form);
                switch (ctrl.prop("type")) {
                    case "radio": case "checkbox":
                        ctrl.each(function () {
                            if ($(this).attr('value') == value) $(this).attr("checked", value);
                        });
                        break;
                    default:
                        ctrl.val(value);
                }
            });
        },

        // #endregion


        // #region comingSoon

        comingSoon: function () {
            App.notify("Coming Soon...");
        }

        // #endregion

        // #endregion

    };
}();


// #region Notification class

var Notifications = function () {
    var $wrapper = $('#notification-container'),
        $container = $wrapper.find(".dropdown-body").empty(),
        $topNotifIcon = $('#dd-notifications'),
        total = 0,
        text = $topNotifIcon.html();

    // #region get notifications

    var _getNotification = function () {
        App.ajax({
            url: App.url('/user/notifications/get'),
            start: function () {
                $topNotifIcon.html('').html(' <div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>');
            },
            complete: function () {
                $topNotifIcon.html(text);
            }
        }).done(function (data) {
            total = data.total;
            //navbar icon
            _ddIcon();

            if (data.total)
                $(data.list).each(function (_i, notif) {
                    $container.append(_formatNotification(notif));
                });
            else
                $wrapper.css("display", "none");
        });
    };

    // #endregion

    // #region change dropdown icon

    var _ddIcon = function () {
        $wrapper.find('[data-notification="total"]').text('(' + total + ')');
        if (total) {
            $topNotifIcon.find(".mi").text("notifications");
            $topNotifIcon.find(".notification").show().text(total);
        }
        else {
            $topNotifIcon.tooltip({ title: i18n.noNotification, });
            $topNotifIcon.find(".mi").text("notifications_none");
            $topNotifIcon.find(".notification").hide();
        }
    };

    // #endregion

    // #region format notification

    var _formatNotification = function (notif) {
        //notif.Title = notif.Title.replace("{source}", '<b>' + notif.Source + '</b>');
        //notif.Title = notif.Title.replace("{sender}", '<a href="' + App.url('/user/' + notif.SenderId) + '">' + notif.Sender + '</a>');

        var $notifView = $('<div />').addClass("dropdown-item p-3 m-0 shadow-0")
            .append(
                $('<div />').addClass("mr-3")
                    .append(_formatNotificationIcon(notif))
            )
            .append(
                $('<div />').addClass("media-body")
                    .append($("<a />").attr("href", notif.url).addClass("text-dark").html("<b>" + notif.title + "</b>"))
                    .append($("<span />").addClass("text-muted d-block mb-2 mt-1").text(notif.description)
                    )
                    .append(
                        $('<div />').addClass('font-size-xs text-muted mt-1 d-flex')
                            .append('<small class="text-grey-300" style="line-height:1.2rem"> ' + notif.createTime + ' </span>')
                            .append('<a class="ml-auto text-primary" href="' + notif.url + '"> ' + i18n.view + ' </a>')
                            .append('<span class="mx-1">|</span>')
                            .append('<a class="text-primary" data-id="' + notif.id + '" data-action="close" href="javascript:void(0);"> ' + i18n.close + ' </a>')
                    )
            );

        return $notifView;
    };

    // #endregion

    // #region format notification icon

    var _formatNotificationIcon = function (notif) {
        var type, icon;

        switch (notif.type) {
            case "AppointmentBooked":
                type = "success";
                icon = 'perm_contact_calendar';
                break;
            case "Welcome":
                type = "rose";
                icon = 'favorite';
                break;
            //case 1:
            //    type = "success";
            //    icon = 'description';
            //    break;
            //case 2:
            //    type = "purple";
            //    icon = 'gavel';
            //    break;
            //case 3:
            //    type = "warning";
            //    icon = 'assignment_late';
            //    break;
            //case 4:
            //    type = "info";
            //    icon = "assignment";
            //    break;
        }

        return '<a href="' + notif.url + '" class="btn-' + type + ' btn btn-fab btn-round"><i class="mi">' + icon + '</i></a>';
    };

    // #endregion

    // #region send seen notification

    var _seen = function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $media = $(this).parents('.dropdown-item'),
            id = $(this).data('id');

        App.ajax({
            url: App.url('/user/notifications/seen'),
            data: { ids: [id] },
            success: function () {
                _closeAnimate($media);
                total--;
                _ddIcon();
                if (!total)
                    $wrapper.slideUp("slow", function () {
                        $(this).css("display", "none");
                    });
            },
            loading: $media
        });
    };

    // #endregion

    // #region close notification animated

    var _closeAnimate = function ($media) {
        $media.addClass('animated fadeOutRight')
            .slideUp(function () {
                var $that = $(this);
                setTimeout(function () {
                    $that.remove();
                }, 200);
            });
    };

    // #endregion

    // #region clear notifications

    var _clear = function (e) {
        e.preventDefault();
        e.stopPropagation();

        App.ajax({
            url: App.url('/user/notifications/clear'),
            success: function () {
                // clear all animated
                var time = 1;
                $container.children().each(function (_i, e) {
                    setTimeout(function () {
                        _closeAnimate($(e));
                    }, time++ * 100);
                });

                // disable dd
                total = 0;
                _ddIcon();
                $wrapper.slideUp("slow", function () {
                    $(this).css("display", "none");
                });
            },
            loading: $container
        });
    };

    // #endregion

    // #region events

    var _handleEvents = function () {
        $container.on('click', '[data-action="close"]', _seen)
            .parents('.dropdown').find('[data-action="clear-all"]').on('click', _clear);
    };

    // #endregion

    return {
        init: function () {
            this.load();
            _handleEvents();
        },

        load: _getNotification,

    };

}();

// #endregion



// Initialize module
// ------------------------------

// When content is loaded
document.addEventListener('DOMContentLoaded', function () {
    App.initBeforeLoad();
    App.initCore();

    if (typeof Page !== 'undefined')
        Page.init();

    setTimeout(function () {
        $(".socket-wrapper").stop().fadeOut(function () {
            $(this).remove();
        });
    }, 0);

});

// When page is fully loaded
window.addEventListener('load', function () {
    App.initAfterLoad();

    if (typeof Page !== 'undefined' && Page.todo) {
        for (var event in Page.events)
            Page.events[event]();
        for (var task in Page.todo)
            Page.todo[task]();
    }
});

