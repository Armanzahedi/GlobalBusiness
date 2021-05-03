var Page = function () {


    //
    // Setup module components
    //

    // #region init data table

    var _initDataTable = function () {
        Page.dataTable = App.dataTable({

            table: "#datatable",
            buttons: [
                {
                    action: 'edit',
                    callback: App.comingSoon,
                    className: "info",
                    icon: "edit",
                    title: i18n.edit,
                    select: 'single'
                },
                {
                    action: 'access',
                    callback: App.comingSoon,
                    className: "warning",
                    icon: "fingerprint",
                    title: "change access",
                    select: 'single'
                },
                {
                    action: 'delete',
                    callback: App.comingSoon,
                    className: "danger",
                    icon: "clear",
                    title: i18n.delete,
                    select: 'multiple'
                }],
            columnDefs: [{
                className: 'row-avatar',
                targets: 1,
                "orderable": false,
                render: function (_data, _type, row) {
                    return '<img class="img-row rounded-circle" src="' + row['avatar'] + '" />';
                }
            }],
            ajax: {
                url: '/admin/users/get-paginated',
                data: function (d) {
                    d.type = window.userType;
                }
            }

        }).load();
    };

    // #endregion

    // #region init Select2

    var _initSelect2 = function (id) {
        var $select2 = App.select2({
            url: App.url("get-roles"),
            data: function () {
                return {
                    id: id
                }
            },
            id: $("#modal-access").find('[name=roles]').get(0),
            map: function (item) {
                return {
                    text: item.title,
                    id: item.roleName,
                    selected: item.userHasIt,
                };
            },
            templateResult: function (data) {
                var text = '<div>' + data.text + '</div>';
                return text;
            },
            templateSelection: function (data) {
                var text = '<div>' + data.text + '</div>';
                return text;
            },
            min: Infinity
        });
    };

    // #endregion




    //
    // Return objects assigned to module
    //

    return {
        init: function () {
            _initDataTable();
        },
        initSelect2: _initSelect2,

        /**@type {DataTable} */
        dataTable: null
    };
}(), $card = $('#datatable').parents('.card');


// #region datatable event => onEditRowClick()

function onEditRowClick(ids) {
    var url = App.url("edit");
    App.loadModal({
        url: url,
        method: "GET",
        className: "modal-lg",
        data: { id: ids[0] },
        loading: $card,
        onModalShow: function () {
            App.floatingLabels();
            App.uniform();
            App.validateForm('#edit-form');
            App.datePicker("#BirthDate");
            App.datePicker("#HireDate");
            $('#Phone').inputmask({ regex: '[0][9][0-9]{9}' });
            $('#Email').inputmask({ alias: "email" });

            App.uploadAvatarModal({
                id: "#file-avatar",
                name: "Avatar",
                url: App.url('upload-avatar')
            });
        },
        onSubmit: function (modal) {
            var form = $('#edit-form');
            if (form.valid()) {
                var data = App.serializeForm(form);
                App.ajax({
                    url: url,
                    loading: '#datatable',
                    data: data,
                    success: function () {
                        Page.dataTable.load();
                        modal.modal('hide');
                    },
                    toast: true
                });
            }
        }
    });
}

// #endregion

// #region datatable event => onDeleteRowClick()

function onDeleteRowClick(ids) {
    var url = App.url("delete");
    App.confirm({
        content: i18n.deleteDesc,
        call: function () {
            App.ajax({
                url: url,
                loading: $card,
                data: { ids: ids },
                success: Page.dataTable.load,
                toast: true
            });
        }
    });
}

// #endregion

// #region dataTable event => onNewRowClick()

function onNewRowClick() {
    var url = App.url('/admin/users/add');
    App.goTo(url, true);
}

// #endregion

// #region dataTable event => onAccessRowClick()

function onAccessRowClick(ids) {
    var url = App.url("access-levels");

    App.loadModal({
        url: url,
        method: "GET",
        data: { id: ids.length ? ids[0] : null },
        className: "modal-sm",
        loading: $card,
        onModalShow: function (_e, modal) {
            $(modal).one('shown.bs.modal', function () {
                Page.initSelect2(ids[0]);
            });
        },
        onSubmit: function (modal) {
            var val = $('#select-access').val();
            var form = $('#access-form');
            if (form.valid()) {
                var data = App.serializeForm(form);
                data.roles = val;
                App.ajax({
                    url: url,
                    loading: $card,
                    data: data,
                    success: function () {
                        modal.modal('hide');
                    },
                    toast: true
                });
            }
        }
    });
}

// #endregion
