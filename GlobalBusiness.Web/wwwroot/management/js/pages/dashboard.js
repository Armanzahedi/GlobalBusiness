var Page = function () {

    // #region initCharts

    var _initCharts = function () {
        var ctx = document.getElementById("chart-capping").getContext("2d");
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["", ""],
                datasets: [{
                    label: "Emails",
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    backgroundColor: ['#ffcf40', '#e2e2e2'],
                    borderWidth: 0,
                    data: [60, 40]
                }]
            },
            options: {
                cutoutPercentage: 70,
                legend: {

                    display: false
                },

                tooltips: {
                    backgroundColor: '#f5f5f5',
                    titleFontColor: '#333',
                    bodyFontColor: '#666',
                    bodySpacing: 4,
                    xPadding: 12,
                    mode: "nearest",
                    intersect: 0,
                    position: "nearest"
                },

                scales: {
                    yAxes: [{
                        display: 0,
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            drawBorder: false,
                            zeroLineColor: "transparent",
                            color: 'rgba(255,255,255,0.05)'
                        }

                    }],

                    xAxes: [{
                        display: 0,
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: 'rgba(255,255,255,0.1)',
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            display: false,
                        }
                    }]
                },
            }
        });

    };

    // #endregion

    // #region initLinkBtnClick

    var _initLinkBtnClick = function () {
        $(document).on('click', "[data-action=link]", function () {
            var $btn = $(this);
            App.loadModal({
                url: App.url("/user/network/link"),
                data: { left: $btn.hasClass('left') },
                loading: $btn.closest(".btn-group"),

                onModalShow: function (_e, $modal) {
                    $modal.on("click", ".btn-copy", function () {
                        //copy to clipboard
                        var $btn = $(this),
                            $input = $($btn.data("target"));
                        if ($btn.hasClass("btn-success"))
                            return false;

                        $input.get(0).select();
                        $input.get(0).setSelectionRange(0, 99999)
                        document.execCommand("copy");
                        App.notify("Link copied to your clipboard", "success");

                        //show success
                        $btn.removeClass("btn-info").addClass("btn-success").children("i").text("check_circle");
                        setTimeout(function () {
                            $btn.addClass("btn-info").removeClass("btn-success").children("i").text("content_copy");
                        }, 2000);
                    });
                },

                onSubmit: function ($modal) {
                    var $input = $modal.find("#input-link");

                    if (navigator.share) {
                        navigator.share({
                            title: $input.data("user") + "'s " + $input.data("dir") + " link",
                            text: 'You can join us now with this link',
                            url: $input.val(),
                        })
                            .then(() => console.log('Successful share'))
                            .catch((error) => console.log('Error sharing', error));
                    }
                }
            })
        });
    }

    // #endregion

    //
    // Return objects assigned to module
    //

    return {
        init: function () {
            _initCharts();
            _initLinkBtnClick();
        },
        todo: {

        },
        events: {

        }
    };
}();