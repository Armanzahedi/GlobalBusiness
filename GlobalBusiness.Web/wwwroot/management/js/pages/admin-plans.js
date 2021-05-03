var Page = function () {

    // #region initPlans

    var _initPlans = function () {
        $(".card-pricing").each(function () {
            var $card = $(this),
                $btn = $('<button class="btn btn-success btn-fab btn-icon btn-round btn-edit"><i class="mi mi-sm">edit</i></button>')
                    .data("id", $card.data("id")).tooltip({ title: i18n.edit });

            $card.append($btn);
        });
    };

    // #endregion

    // #region handle btn edit click

    var _handleBtnEditClick = function () {
        $(".btn-edit").on("click", function () {
            var $btn = $(this),
                id = $btn.data("id");
            $btn.tooltip("hide");
            var name = $btn.closest(".card").find(".card-pricing-name").text();

            App.loadModal({
                url: App.url("form/" + id),
                method: "GET",
                loading: $btn.closest(".card"),
                onModalShow: function (_event, modal) {
                    var $modal = $(modal),
                        $form = $modal.find("form");
                    //App.materialize($modal);
                    App.validateForm($form);
                    $modal.find(".modal-title").text($modal.find(".modal-title").text().replace("{name}", name));
                },
                onSubmit: function (modal) {
                    var $modal = $(modal),
                        $form = $modal.find("form");

                    if (!$form.valid())
                        return false;

                    var data = App.serializeForm($form);
                    App.ajax({
                        url: $form.attr("action"),
                        data: data,
                        toast: true,
                        reload: true,
                        loading: $form
                    })
                }
            });
        });
    };

    // #endregion

    //
    // Return objects assigned to module
    //

    return {
        init: function () {
            _initPlans();
        },
        todo: {

        },
        events: {
            onBtnEditClick: _handleBtnEditClick
        }
    };
}();