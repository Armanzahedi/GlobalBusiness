// Preloader
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        $(".socket-wrapper").stop().fadeOut(function () {
            $(this).remove();
        });
    }, 0);

});

// Convert svg to Image
$('img.svg').each(function () {
    var $img = $(this);
    if ($img.hasClass("ignoreSvg") === false) {

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
    }
});

// Activating the Correct nav
var navActive = $('#nav_active').val();
var navItemActive = $('#nav_item_active').val();

if (navActive != null && navActive !== "") {
    $('#nav_' + navActive + '').addClass("active");
    if ($('#nav_' + navActive + '_childs').length) {
        $('#nav_' + navActive + '_childs').removeClass("collapse");
        $('#nav_' + navActive + '_childs').addClass("show");
        $('#nav_' + navActive + '_trigger').attr("aria-expanded","true");
        //$('#nav_' + navActive + '_childs').css("display", "");
        //$('#nav_' + navActive + '_childs').css("overflow", "");
    }
}

if (navItemActive != null && navItemActive !== "") {
    $('#nav_item_' + navItemActive + '').addClass("active");
}

$.extend(true, $.fn.dataTable.defaults, {
   // dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'>>
			//<'row'<'col-sm-12'tr>>
			//<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
    dom: "<'row'<'col-sm-12 d-flex col-md-6'fl>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    serverSide: true,
    processing: true,
    responsive: true,
    //pagingType: "full_numbers",
    //"language": {
    //    "url": "//cdn.datatables.net/plug-ins/1.10.18/i18n/Persian.json"
    //},
    "initComplete": function (settings, json) {
        $("[name='datatable_length']").css("margin-left", "0.5rem");
        $("[name='datatable_length']").css("color", "gray");
    }
});
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

$(document).ajaxError(function (event, xhr, ajaxOptions, thrownError) {
    if (xhr.status === 403 || xhr.status === 401) {
        toastr.error("You don't have the required permission to access this section.", "Error");
    } else {
        toastr.error(xhr.responseText.split(':')[0], "Error");
    }
});
function openModal(link) {
    $.get(link, function (result) {
        $("#myModal").modal();
        //if (title != null) {
        //    $("#myModalLabel").html(title);
        //}
        $("#myModalBody").html(result);
        var title = $("#title").val();
        if (title != null && title !== undefined) {
            $("#myModalLabel").html(title);
        } else {
            $("#myModalLabel").html("");
        }
    });
}
function copy(btn,input) {
    var $btn = $(btn), 
        $input = $("#"+input);
    if ($btn.hasClass("btn-success"))
        return false;
    $input.get(0).select();
    $input.get(0).setSelectionRange(0, 99999);
    document.execCommand("copy");
    toastr.success("Link copied to your clipboard", "success");

    //show success
    $btn.removeClass("btn-info").addClass("btn-success").children("i").text("check_circle");

    setTimeout(function () {
        $btn.addClass("btn-info").removeClass("btn-success").children("i").text("content_copy");
    }, 2000);
};
