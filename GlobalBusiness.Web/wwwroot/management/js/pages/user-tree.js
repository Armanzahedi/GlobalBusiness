var Page = function () {

    // #region init charts

    var _initCharts = function () {
        var gradientChartOptionsConfigurationBlue = {
            maintainAspectRatio: false,
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
            responsive: true,
            scales: {
                yAxes: [{
                    barPercentage: 1.6,
                    gridLines: {
                        drawBorder: false,
                        color: 'rgba(29,140,248,0.0)',
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        suggestedMin: 60,
                        suggestedMax: 125,
                        padding: 20,
                        fontColor: "#9e9e9e"
                    }
                }],

                xAxes: [{
                    barPercentage: 1.6,
                    gridLines: {
                        drawBorder: false,
                        color: 'rgba(29,140,248,0.1)',
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        padding: 20,
                        fontColor: "#9e9e9e"
                    }
                }]
            }
        };


        var ctx = document.getElementById("chart-left-branch").getContext("2d");

        var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, 'rgba(255, 207, 64,0.2)');
        gradientStroke.addColorStop(0.8, 'rgba(255, 207, 64,0.1)');
        gradientStroke.addColorStop(0, 'rgba(230, 174, 3,0)'); //blue colors


        new Chart(ctx, {
            type: 'line',
            responsive: true,
            data: {
                labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                datasets: [{
                    label: "Data",
                    fill: true,
                    backgroundColor: gradientStroke,
                    borderColor: '#ffcf40',
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: '#ffcf40',
                    pointBorderColor: 'rgba(255,255,255,0)',
                    pointHoverBackgroundColor: '#ffcf40',
                    pointBorderWidth: 20,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 15,
                    pointRadius: 4,
                    pointRadius: 4,
                    data: [80, 100, 70, 80, 120, 80],
                }]
            },
            options: gradientChartOptionsConfigurationBlue
        });



        var ctx = document.getElementById("chart-right-branch").getContext("2d");

        var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, 'rgba(255, 207, 64,0.2)');
        gradientStroke.addColorStop(0.8, 'rgba(255, 207, 64,0.1)');
        gradientStroke.addColorStop(0, 'rgba(230, 174, 3,0)'); //blue colors


        new Chart(ctx, {
            type: 'line',
            responsive: true,
            data: {
                labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                datasets: [{
                    label: "Data",
                    fill: true,
                    backgroundColor: gradientStroke,
                    borderColor: '#ffcf40',
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: '#ffcf40',
                    pointBorderColor: 'rgba(255,255,255,0)',
                    pointHoverBackgroundColor: '#ffcf40',
                    pointBorderWidth: 20,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 15,
                    pointRadius: 4,
                    pointRadius: 4,
                    data: [0,0,0,0,0,0],
                }]
            },
            options: gradientChartOptionsConfigurationBlue
        });
    }

    // #endregion

    // #region initLinkBtnClick

    var _initLinkBtnClick = function () {
        $(document).on('click', "[data-action=link]", function () {
            var $btn = $(this);
            App.loadModal({
                url: App.url("link"),
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

    // #region getChildren

    var _getChildren = function (id) {
        return App.ajax({
            url: App.url("get-children"),
            data: { id: id || window.userId },
            loading: Page.$tree
        })
    };

    // #endregion

    // #region initTree

    var _initTree = function () {
        var xhr = _getChildren();
        xhr.then(function (result) {
            console.log(result);

            var resize = false;
            if (result.leftChild) {
                resize = true;
                _renderChildren(result.leftChild);
            }
            if (result.rightChild) {
                resize = true;
                _renderChildren(result.rightChild);
            }

            if (resize)
                _resizeTree(true);
        })
    };

    // #endregion

    // #region _initTreeEvents

    var _initTreeEvents = function () {
        $(document).on("click", ".tree-business .node .node-avatar", function (event) {
            //Page.$tree.find(".is-focused").removeClass("is-focused");
            Page.$tree.find(".active").removeClass("active");

            var $child = $(this).closest(".child").addClass("active"),//.addClass("is-focused"),
                id = $child.find(".node").data("id");

            //$child.toggleClass("child-zoom");

            //if ($child.hasClass("child-zoom")) {
            //}
            //else
            //    zoom.out();

            if ($child.hasClass("has-child")) {
                zoomto(event, $child);
                return false;
            }

            var xhr = _getChildren(id);
            xhr.then(function (result) {
                console.log(result);
                var resize = false;
                if (result.leftChild) {
                    resize = true;
                    _renderChildren(result.leftChild);
                }
                if (result.rightChild) {
                    resize = true;
                    _renderChildren(result.rightChild);
                }

                var $active = _getActive();

                if (resize)
                    _resizeTree(true);
                else
                    zoomto(event, $child);
            });


        }).on("click", ".tree-business .child", function (event) {
        });

        $(window).on("resize", function () {
            _resizeTree(false);
        });

        function zoomto(event,$child) {
            event.preventDefault();
            zoom.to({ element: $child.children(".node").get(0) });
        }
    };

    // #endregion

    // #region renderChildren

    var _renderChildren = function (user) {
        var $active = _getActive(),
            $child = $("<div />").addClass("child").addClass(user.direction),
            $node = $("<div />").addClass("node").appendTo($child)
                .data("id", user.userId),
            $path = $("<div />").addClass("node-path").appendTo($node),
            $pic = $("<div />").addClass("node-avatar").append("<div class=\"node-img\"><img src=\"" + user.avatar + "\" /></div>").appendTo($node),
            $name = $("<div />").addClass("node-username").text(user.username).appendTo($pic),
            $package = _renderPackage(user).appendTo($pic);

        $active.addClass("has-child").append($child);
    };

    var _renderPackage = function (user) {
        var $icon;
        switch (user.plan) {
            default:
                $icon = $("<span class=\"badge badge-default node-badge\">&nbsp;</span>");
                break;
        }
        return $icon.tooltip({ title: user.plan ?? "No Package" });
    };

    // #endregion

    // #region getActive

    var _getActive = function () {
        var $activeNode = Page.$tree.find(".active").first();
        if (!$activeNode.length)
            $activeNode = Page.$tree;

        return $activeNode;
    };

    // #endregion

    // #region _resizeTree

    var _resizeTree = function (increase) {
        var padding = 15, pic = 70, childHeight = 50,
            diff = (2 * padding) + pic + childHeight,
            $tree = Page.$tree,
            depth = $tree.data("depth") || 0;

        if (increase) {
            $tree.data("depth", depth + 1);
            $tree.animate({ height: "+=" + diff }, 0);

        }
        else depth--;


        _sclaeTree(1);
        var originalWidth = $tree.css("width", "auto").width(),
            goalWidth = originalWidth * Math.pow(1.2, depth),
            scale = originalWidth / goalWidth;
        _sclaeTree(scale);
        Page.$tree.css("width", goalWidth);
    };


    var _sclaeTree = function (scale) {
        Page.$tree.css("transform", "scale(" + scale + "," + scale + ")");
    };

    // #endregion


    //
    // Return objects assigned to module
    //

    return {
        init: function () {
            _initLinkBtnClick();
            _initTree();
            _initTreeEvents();
            _initCharts();
        },
        todo: {

        },
        events: {

        },


        $tree: $(".tree-container")
    };
}();