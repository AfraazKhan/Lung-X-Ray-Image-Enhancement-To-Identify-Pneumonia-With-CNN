baseurl = 'http://localhost/crm/api/';
baseurl1 = 'http://localhost/crm/';

//baseurl = 'http://localhost/myprojects/zesttour/zest_crm/api/';
//baseurl1 = 'http://localhost/myprojects/zesttour/zest_crm/';

$(".goBack").click(function() {
    window.history.back();
});
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// Tooltip
$(function() {
        $('[data-toggle="tooltip"]').tooltip()
    })
    ///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// Input
$(".clear-input").click(function() {
    $(this).parent(".input-wrapper").find(".form-control").focus();
    $(this).parent(".input-wrapper").find(".form-control").val("");
    $(this).parent(".input-wrapper").removeClass("not-empty");
});
// active
$(".form-group .form-control").focus(function() {
        $(this).parent(".input-wrapper").addClass("active");
    }).blur(function() {
        $(this).parent(".input-wrapper").removeClass("active");
    })
    // empty check
$(".form-group .form-control").keyup(function() {
    var inputCheck = $(this).val().length;
    if (inputCheck > 0) {
        $(this).parent(".input-wrapper").addClass("not-empty");
    } else {
        $(this).parent(".input-wrapper").removeClass("not-empty");
    }
});
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// Searchbox Toggle
$(".toggle-searchbox").click(function() {
    $("#search").fadeToggle(200);
    $("#search .form-control").focus();
});
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// Owl Carousel
// $('.carousel-full').owlCarousel({
//     loop: true,
//     margin: 8,
//     nav: false,
//     items: 1,
//     dots: false,
// });
// $('.carousel-single').owlCarousel({
//     stagePadding: 30,
//     loop: true,
//     margin: 16,
//     nav: false,
//     items: 1,
//     dots: false,
// });
// $('.carousel-multiple').owlCarousel({
//     stagePadding: 32,
//     loop: true,
//     margin: 16,
//     nav: false,
//     items: 2,
//     dots: false,
// });
// $('.carousel-small').owlCarousel({
//     stagePadding: 32,
//     loop: true,
//     margin: 8,
//     nav: false,
//     items: 4,
//     dots: false,
// });
// $('.carousel-slider').owlCarousel({
//     loop: true,
//     margin: 8,
//     nav: false,
//     items: 1,
//     dots: true,
// });


$(document).on('show.bs.modal.show', '.modal', function(event) {
    if ($('.modal.show').length > 1) {
        var zIndex = 1060 + (10 * $('.modal.show').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    } else if ($('.modal.show').length == 1) {
        var zIndex = 1060 + (10 * $('.modal.show').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    } else {
        var zIndex = 1060 - (10 * $('.modal.show').length);

        $('.modal.show').css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    }
});
///////////////////////////////////////////////////////////////////////////


function show_toast(message, type, not_type, pos = 'top', bg = 'inverse') {

    var random = Math.floor(Math.random() * 10);
    if (type == 'danger') {
        $text_type = 'name="close-circle-outline" class="text-danger"'
    } else {
        $text_type = 'name="checkmark-circle" class="text-success"';
    }
    if (not_type == 'big') {
        $('body').append('<div id="toast' + random + '" class="toast-box text-center toast-' + pos + ' show"><div class="in"><ion-icon ' + $text_type + '></ion-icon><div class="text">' + message + '</div></div></div>')
    } else {
        $('body').append('<div id="toast' + random + '" class="toast-box bg-' + bg + ' text-center toast-' + pos + ' show"><div class="in w-100 p-0"><div class="text">' + message + '</div></div></div>')
    }
    setTimeout(() => {
        $('#toast' + random).removeClass('show');
        $('#toast' + random).remove();
    }, 3000);
    setTimeout(() => {
        $('#toast' + random).remove();
    }, 3500);
}



function set_id(value) {

    $('#DialogForm .id').val(value)

}





function validate(form_id, fun, parameter = false) {
    // alert(form_id + ',' + fun + ',' + parameter)

    var error = 0
    $(form_id + ' .input-danger').remove()
    $(form_id + ' input:visible,' + form_id + ' textarea:visible,' + form_id + ' select:visible').each(function() {
        $(this).parent().parent().find('.input-danger').remove()
        if ($(this).attr("data-required") == 'yes' && $(this).val() == null) {
            $(this).parent().parent().append('<div class="input-danger">This field is required</div>')
            $(this).parent().parent().addClass('text-danger')
            error++
        } else if ($(this).attr("data-required") == 'yes' && $(this).val() == '') {
            $(this).parent().parent().append('<div class="input-danger">This field is required</div>')
            $(this).parent().parent().addClass('text-danger')
            error++
        } else if ($(this).attr("data-pattern") !== undefined && !$(this).val().trim().match($(this).attr("data-pattern")) && $(this).val().trim() != '') {
            $(this).parent().parent().append('<div class="input-danger">' + $(this).attr('data-validation-message') + '</div>')
            $(this).parent().parent().addClass('text-danger')
            error++
        } else if ($(this).attr("data-match") !== undefined && $(this).val().trim() != $('#' + $(this).attr("data-match")).val().trim() && $(this).val().trim() != '') {
            $(this).parent().parent().append('<div class="input-danger">' + $(this).attr('data-validation-message') + '</div>')
            $(this).parent().parent().addClass('text-danger')
            error++
        } else if ($(this).attr("minlength") !== undefined) 
        {
            if($(this).attr('minlength') > $(this).val().length && $(this).val() != '')
            {
                $(this).parent().parent().append('<div class="input-danger"> Minimum length ' + $(this).attr('minlength') + '</div>')
                $(this).parent().parent().addClass('text-danger')
                error++
            }
        } else if ($(this).attr("data-unique-fun") !== undefined && $(this).val().trim() != '') {
            unique_fun = $(this).attr("data-unique-fun");
            request = $(this).attr("data-request");
            form = $(this).attr("data-form");
            $(this).parent().parent().parent().find('.error').html('')

            var fun_error = window[unique_fun]($(this), request, form, false);

            if (typeof fun_error != 'undefined' && fun_error != 'ok') {
                if ($(this).attr("data-show-toast") !== undefined) {
                    $(this).parent().parent().parent().find('.error').html('')
                    $(this).parent().parent().parent().find('.error').html(fun_error)
                } else {
                    $(this).parent().parent().parent().find('.error').html('')
                    $(this).parent().parent().append('<div class="input-danger">' + fun_error + '</div>')
                    $(this).parent().parent().addClass('text-danger')
                }
                error++
            } else {
                $(this).siblings('.help-block').remove()
                $(this).parent().parent().removeClass('text-danger')
            }

        } else {
            $(this).siblings('.help-block').remove()
            $(this).parent().parent().removeClass('text-danger')
        }
    })
    if (error == 0) {
        if (fun != '') {
            if (parameter == false) {
                window[fun]()
            } else {
                window[fun](parameter)
            }
        }
    }
}

validate_onupdate()


function validate_onupdate() {
    var error = 0;
    $('input,textarea').keyup(function() {

        $(this).parent().parent().find('.input-danger').remove()
        $(this).parent().parent().removeClass('text-danger')
        if ($(this).attr("data-required") == 'yes' && $(this).val().trim() == '') {
            $(this).parent().parent().append('<div class="input-danger">This field is required</div>')
            $(this).parent().parent().addClass('text-danger')
            error++
        } else if ($(this).attr("data-pattern") !== undefined && !$(this).val().trim().match($(this).attr("data-pattern")) && $(this).val().trim() != '') {
            $(this).parent().parent().append('<div class="input-danger">' + $(this).attr('data-validation-message') + '</div>')
            $(this).parent().parent().addClass('text-danger')
            error++
        } else if ($(this).attr("data-match") !== undefined && $(this).val().trim() != $('#' + $(this).attr("data-match")).val().trim() && $(this).val().trim() != '') {
            $(this).parent().parent().append('<div class="input-danger">' + $(this).attr('data-validation-message') + '</div>')
            $(this).parent().parent().addClass('text-danger')
            error++
        } else if ($(this).attr("data-unique-fun") !== undefined && $(this).val().trim() != '') {
            unique_fun = $(this).attr("data-unique-fun");
            request = $(this).attr("data-request");
            form = $(this).attr("data-form");
            var fun_error = window[unique_fun]($(this), request, form, true);

            $(this).parent().parent().parent().find('.error').html('')
            if (typeof fun_error != 'undefined' && fun_error != 'ok') {
                if ($(this).attr("data-show-toast") !== undefined) {
                    $(this).parent().parent().parent().find('.error').html('')
                    $(this).parent().parent().parent().find('.error').html(fun_error)
                } else {
                    $(this).parent().parent().parent().find('.error').html('')
                    $(this).parent().parent().append('<div class="input-danger">' + fun_error + '</div>')
                    $(this).parent().parent().addClass('text-danger')
                }
                error++
            } else {
                $(this).siblings('.input-danger').remove()
                $(this).parent().parent().removeClass('text-danger')
            }
        } else {
            $(this).siblings('.input-danger').remove()
            $(this).parent().parent().removeClass('text-danger')
        }
    })
    $('select').change(function() {
        $(this).siblings('.input-danger').remove()
        if ($(this).attr("data-required") == 'yes' && $(this).val() == '') {
            $(this).parent().parent().append('<div class="input-danger">This field is required</div>')
            $(this).parent().parent().addClass('text-danger')
        } else if ($(this).attr("data-pattern") !== undefined && !$(this).val().trim().match($(this).attr("data-pattern"))) {
            $(this).parent().parent().append('<div class="input-danger">' + $(this).attr('data-validation-message') + '</div>')
            $(this).parent().parent().addClass('text-danger')
        } else {
            $(this).siblings('.input-danger').remove()
            $(this).parent().parent().removeClass('text-danger')
        }
    })
}

// email exist ends
function check_email_exist(event, req, form) {

    let searchParams = new URLSearchParams(window.location.search)
    let id = searchParams.get('id')
    $id = id;




    var returnval;
    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: $(form).find('select, textarea, input').serialize() + '&req=' + req + '&id=' + $id,
        async: false,
        success: function(html) {


            if (html.trim() == 'ok') {
                $(event).parent().parent().removeClass('has-error')
            } else {
                $(this).parent().parent().parent().find('.error').html('')
                $(this).parent().parent().append('<div class="input-danger">' + html + '</div>')
                $(this).parent().parent().addClass('text-danger')

                // $(event).siblings('.help-block').remove()
                // $(event).parent().parent().addClass('has-error')
                // $(event).parent().append('<div class="help-block text-danger"><ul role="alert"><li class="text-danger">' + html + '</li></ul></div>')
            }
            returnval = html.trim();
        }
    });
    return returnval;
}



function logout() {
    localStorage.removeItem("user_id_crm");
    localStorage.removeItem("user_email_crm");
    localStorage.removeItem("user_type_crm");

    window.location.href = "login.html"
}

function savedata(e) {



    $name = $(e).attr('data-value');





    $id = $(e).attr('data-name');
    if ($(e).attr("data-type") !== undefined) {
        $value = $(e).val();
    } else {
        $value = $(e).html();
    }

    console.log('req=5' + '&id=' + $id + '&value=' + $value + '&name=' + $name)
    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: 'req=5' + '&id=' + $id + '&value=' + $value + '&name=' + $name,
        success: function(html) {
            console.log(html)


            if (html.trim() == 'ok') {

            } else {


            }


        }
    });
}







function delete_it(id) {
    //  alert(id);
    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: 'req=6&id=' + id,
        success: function(html) {
            //console.log(html)

            if (html.trim() == 'ok') {

                show_toast("Data Deleted", "success", 'big', "center", "inverse");
                get_post();

            } else {


            }


        }

    });

}
//airline_filter()

function airline_filter() {
    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: 'req=7',
        success: function(html) {
            //console.log(html)

            // if (html.trim() == 'ok') {

            //     get_post();

            // } else {


            // }


        }

    });
}

function set_delete_id(value) {

    $('#delete_pop #delete').val(value)

}

function checkbox(place) {

    // if (('.checkempty').val() == '') {
    //     alert()
    // } else {

    var accept = $('.app input[type=checkbox]:checked').map(function() {
        return $(this).val();
    }).get();

    //      console.log(accept);

    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: 'check=' + accept + '&req=18' + '&place=' + place,
        success: function(html) {
            console.log(html)

        }
    });
}


function box_check(place) {
    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: 'req=19&place=' + place,
        success: function(html) {
            console.log(html)
            arrayValues = html.split(',')

            $.each(arrayValues, function(i, val) {

                if (val != '') {

                    $("input[value=" + val + "]").prop('checked', true);
                }
                //<input type="checkbox" value="<?php echo $rs['id']; ?>">

            });

            //console.log(value)
            //uncheckbox()
            //  redirect_acc(id, 'app-accepted')
        }
    });
}



function clr_check(place) {


    $("input:checkbox").prop('checked', $(this).prop("checked"));


    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: 'req=23&place=' + place,
        success: function(html) {
            get_post()
                //    $('#clr_checkbox').addClass('hidden')


            //console.log(value)
            //uncheckbox()
            //  redirect_acc(id, 'app-accepted')
        }
    });

}


// function data_as(id) {

//     user_id = localStorage.getItem("user_id_crm")
//         //console.log('req=26' + '&value=' + $('#as').val() + '&user_id=' + user_id)

//     $.ajax({
//         type: "POST",
//         url: baseurl + 'login.php',
//         data: 'req=26' + '&value=' + $('#as_' + id).val() + '&user_id=' + user_id + '&id=' + id,
//         success: function(html) {
//             //console.log(html)

//         }
//     });

// }

function data_as(id) {

    user_id = localStorage.getItem("user_id_crm")
        //console.log('req=26' + '&value=' + $('#as').val() + '&user_id=' + user_id)

    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: 'req=26' + '&value=' + $('#as_' + id).val() + '&user_id=' + user_id + '&id=' + id,
        success: function(html) {
            //console.log(html)

        }
    });

}

function data_pri(id) {

    user_id = localStorage.getItem("user_id_crm")
        //console.log('req=26' + '&value=' + $('#as').val() + '&user_id=' + user_id)

    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: 'req=38' + '&value=' + $('#coun_' + id).val() + '&user_id=' + user_id + '&id=' + id,
        success: function(html) {
            //console.log(html)

        }
    });

}

function data_source(id) {

    // user_id = localStorage.getItem("user_id_crm")
    //console.log('req=26' + '&value=' + $('#as').val() + '&user_id=' + user_id)

    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: 'req=27' + '&value=' + $('#source_' + id).val() + '&id=' + id,
        success: function(html) {
            console.log(html)

        }
    });

}

function data_country(id) {

    // user_id = localStorage.getItem("user_id_crm")
    //console.log('req=26' + '&value=' + $('#as').val() + '&user_id=' + user_id)

    $value = $('.country_options').find('option[value="' + $('#count_' + id).val() + '"]').attr('id')

    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: 'req=42' + '&value_id=' + $value + '&country=' + $('#count_' + id).val() + '&id=' + id,
        success: function(html) {
            console.log(html)

        }
    });

}

function data_university(id) {

    $('#univer_' + id).val($('#univer_' + id).val() + ',')
        // user_id = localStorage.getItem("user_id_crm")
        //console.log('req=26' + '&value=' + $('#as').val() + '&user_id=' + user_id)
        // value = $('.university_' + id).find('option[value="' + $('#univer_' + id).val() + '"]').attr('id')

    value = $('#university_' + id).val()
        // $('#new_uni_value_' + id).val(value)

    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: 'req=45' + '&value=' + value + '&id=' + id,
        success: function(html) {
            console.log(html)

        }
    });

}



function uni_list(id) {


    $value = $('.country_options').find('option[value="' + $('#count_' + id).val() + '"]').attr('id');
    //alert('req=44' + '&value=' + $value + '&id=' + id)
    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: 'req=44' + '&value=' + $value + '&id=' + id,
        success: function(html) {
            $('.universitys_' + id).html(html)
            console.log(html)
            $('.dropdown-menu.multiple').on('click', function(event) {
                event.stopPropagation();
            });
            new_val = $('#university_' + id).val()
            if (new_val.includes(",")) {
                new_val = new_val.split(',')
                $.each(new_val, function(i, val) {
                    val = val.replace('\n', '')
                    if (val.trim() != '') {
                        $('.un_id_' + val).addClass('selected')
                    }
                });
            } else {
                $('.un_id_' + new_val).addClass('selected')
            }

            value = '';
            $('.universitys_' + id + ' .selected').each(function() {
                if (value == '') {
                    value = $(this).attr('data-id');
                } else {
                    value += ',' + $(this).attr('data-id');
                }
            })
            $('#univer_' + id).val(value)
        }
    });

}

function uni_put(id) {
    $value = $('.country_options').find('option[value="' + $('#count_' + id).val() + '"]').attr('id');
    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: 'req=44' + '&value=' + $value + '&id=' + id,
        success: function(html) {
            $('.universitys_' + id).html(html)
            $('.dropdown-menu.multiple').on('click', function(event) {
                event.stopPropagation();
            });

        }
    });

}
// function uni_list(id) {
//     alert(id)
//     $.ajax({

//         type: "POST",
//         url: baseurl + 'login.php',
//         data: 'req=44' + '&value=' + $('#count_' + id).val(),
//         success: function(html) {

//             //console.log(html)
//             $('#univer_' + id).attr('uni-value', '');
//             $('.university_' + id).html('');

//             arrayValues = html.split(',');
//             // console.log(arrayValues);

//             $('.university_' + id).append('<option value="NA">');


//             $.each(arrayValues, function(i, val) {
//                 arrayValues1 = arrayValues[i].split('$$$');

//                 val = arrayValues1[0].replace('\n', '')
//                 id = arrayValues1[1].replace('\n', '')
//                 if (val.trim() != '') {
//                     console.log(('#univer_' + id).attr('uni-value', ' +id+ '))
//                     $('#univer_' + id).attr('uni-value', id);
//                     console.log('<option value="' + val.trim() + '" id="' + id.trim() + '"">')
//                     $('.university_' + id).append('<option value="' + val.trim() + '" id="' + id.trim() + '">');

//                 }

//             });


//         }
//     });

// }


function set_id_new(value, id) {



    $(id).val(value)

}

function newname(place, name, email_place, email) {

    $(place).val(name)
    $(email_place).val(email)

}

function get_source_detail(id) {

    $('#add_parent .modal-title').html('Edit Parent')
    $user_id = localStorage.getItem("user_id_crm");
    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: 'req=49&id=' + id,
        success: function(html) {
            html = html.split(',,$');
            $('#source_name').val(html[0])
            $('#source_contact').val(html[2])
            $('#source_Email').val(html[1])
            $('#source_address').val(html[3])
        }

    });

}

function search_function(input, target, parents) {

    var input = document.getElementById(input);

    var filter = input.value.toLowerCase();
    if (filter.length > 0) {
        $(target).each(function() {
            if ($(this).text().toLowerCase().indexOf(filter) != -1) {
                $(this).removeClass('not-matching');
            } else {
                $(this).addClass('not-matching');
            }
            setTimeout(function() {
                if ($(parents).hasClass('.not-matching')) {
                    $(parents).addClass('hidden')
                }
            }, 200)
        })
    }
    if (filter.length <= 0) {
        $(target).removeClass('not-matching');
    }
}

function check_activity_id(text_id, id_id) {
    if ($(id_id).val() == '') {
        $(text_id).val('')
    }
}
$('.dropdown-menu.multiple').on('click', function(event) {
    event.stopPropagation();
});

function select_value(name, value, name_id, value_id, type = "single") {
    $(name_id).val(name)
    name_ids = value_id.replace('#', '.');
    name_ids = name_ids.replace('(', '')
    name_ids = name_ids.replace(')', '')
    name_ids = name_ids.split('_');
    //name_idss = name_ids.replace('language', '');
    if (type != 'multiple') {
        $(name_ids + 's_id .selected').removeClass('selected')
    }
    value = value.replace(/ /g, '_')
    if (type == 'multiple' && $(name_ids[0] + 's_' + name_ids[1] + ' ' + name_ids[0] + value).hasClass('selected')) {
        $(name_ids[0] + 's_' + name_ids[1] + ' ' + name_ids[0] + value).removeClass('selected')
    } else {
        //alert(name_ids[0] + 's_' + name_ids[1] + ' ' + name_ids[0] + value)
        $(name_ids[0] + 's_' + name_ids[1] + ' ' + name_ids[0] + value).addClass('selected ')
    }

    if (type != 'multiple') {
        $(name_ids + 's_id ' + name_idss + value).addClass('selected')
    }
    $(name_id).parent().parent().find('.input-danger').remove()
    $(name_id).parent().parent().removeClass('text-danger')
    $(name_id).parent().parent().removeClass('input-info');
    if (type == 'multiple') {
        value = name = '';
        $(name_ids[0] + 's_' + name_ids[1] + ' .selected').each(function() {
            if (value == '') {
                value = $(this).attr('data-text');
                name = $(this).attr('data-id');
            } else {
                value += ',' + $(this).attr('data-text');
                name += ',' + $(this).attr('data-id');
            }
        })
        $(name_id).val(name)
        $(value_id).val(value)
    } else {
        $(value_id).val(value)
    }
}

function get_universitys(id) {
    $('#university_table').html('');
    $('#view_university .modal-title').html('Selected University for ' + $(id).parent().siblings('.name').text())
    if ($(id).val().indexOf(',') != -1) {
        val = $(id).val().split(',')
        for ($i = 0; $i < val.length; $i++) {
            $('#university_table').append('<tr><th scope="row">' + ($i + 1) + ') ' + val[$i] + '</th></tr>')
        }
    } else {
        $('#university_table').append('<tr><th scope="row">1) ' + $(id).val() + '</th></tr>')
    }
}

function redirect(id, value) {
    window.location.href=value + '.html?id=' + id;
}

function cancel_clr(area) {
    $(area).val('');
}


array_country=array_university = new Array();
function get_country_list() 
    {
        let searchParams = new URLSearchParams(window.location.search)
        $id = searchParams.get('id')

        $.ajax({
            url: baseurl + 'university.php',
            type: "post",
            async: true,
            data: "req=5",
            success: function(data) {
                console.log(data)
                $('.country_list').html('')
                array_country = JSON.parse(data)
                console.log(array_country)
            }
        });
    }

    function search_data(e, classs, hiddenclass,array) 
    {
        arrayOfStr = eval(array);
        $(classs).html('')
        var filter = $(e).val()
        var filter = filter.toLowerCase();
        $j = 0;
        if (hiddenclass.indexOf(',') != -1) {
            hiddenclass = hiddenclass.split(',');
        } else {
            hiddenclass[0] = hiddenclass
        }

        if (filter.length > 1) {
            for (var $i in arrayOfStr) {
                if (typeof arrayOfStr[$i] !== 'function') {
                    if ($j <= 8) {
                        if (arrayOfStr[$i]['search_name'].toLowerCase().indexOf(filter) != -1) {
                            $location_name = arrayOfStr[$i]['search_name'];
                            funs='';
                            if(arrayOfStr[$i]['funs'] !== undefined)
                            {
                                funs=','+arrayOfStr[$i]['funs']
                            }
                            change = '';
                            for ($cc = 0; $cc < hiddenclass.length; $cc++) {
                                value = arrayOfStr[$i][hiddenclass[$cc].replace('#', '')];
                                if (change == '') {
                                    change += ",changetext('','" + value + "','" + hiddenclass[$cc] + "')"
                                    if (hiddenclass.length > 1) {
                                        change += ",";
                                    }

                                } else {
                                    change += "changetext('','" + value + "','" + hiddenclass[$cc] + "')"
                                    if (hiddenclass.length <= $cc) {
                                        change += ",";
                                    }

                                }

                            }
                            $(classs).append("<button class='dropdown-item text-capitalize' onClick=\"changetext('','" + $location_name + "','#" + $(e).attr('id') + "')" +funs+ change + "\" type='button'>" + boldString($location_name, filter) + "</button>")
                            $j++;
                        }
                    }
                }
            }
        } else {
            for (var $i in arrayOfStr) {
                if (typeof arrayOfStr[$i] !== 'function') {
                    if ($j <= 8) {
                        $location_name = arrayOfStr[$i]['search_name'];
                        funs='';
                        if(arrayOfStr[$i]['funs'] !== undefined)
                        {
                            funs=','+arrayOfStr[$i]['funs']
                        }
                        change = '';
                        for ($cc = 0; $cc < hiddenclass.length; $cc++) {
                            value = arrayOfStr[$i][hiddenclass[$cc].replace('#', '')];
                            if (change == '') {
                                change += ",changetext('','" + value + "','" + hiddenclass[$cc] + "')"
                                if (hiddenclass.length > 1) {
                                    change += ",";
                                }

                            } else {
                                change += "changetext('','" + value + "','" + hiddenclass[$cc] + "')"
                                if (hiddenclass.length <= $cc) {
                                    change += ",";
                                }

                            }

                        }

                        $(classs).append("<button class='dropdown-item text-capitalize' onClick=\"changetext('','" + $location_name + "','#" + $(e).attr('id') + "')" +funs+ change + "\" type='button'>" + boldString($location_name, filter) + "</button>")
                        $j++;
                    }
                }
            }
        }
    }

    function changetext(img, product, id) {
        $(id).val(product)
            //$('.country_data').removeClass('show')
    }

    function boldString(str, substr) {
        var strRegExp = new RegExp(substr, 'ig');
        return str.replaceAll(strRegExp, '<b>' + substr + '</b>');
    }
    function remove_hidden()
{
    $user_type_crm = localStorage.getItem("user_type_crm")
    if ($user_type_crm == 'assigned') 
    {
        $("#regis").remove();
        $("#add_pri_coun").remove();
        $("#edit_pri_coun").remove();
        $("#add_as_c").remove();
        $("#edit_as_cou").remove();
        $("#upload_table").remove();
        $("#removethisas").remove();
        $('#add_candidiate_modal .dont_remove,.student_data .dont_remove,#menu .dont_remove,#stage_details .dont_remove').remove()
        $('.student_data .remove,#stage_details .remove').removeClass('hidden')
    }
    if ($user_type_crm == 'primary' || $user_type_crm == 'admin') {
        $('#add_candidiate_modal .dont_remove,.student_data .dont_remove,#menu .dont_remove,#stage_details .dont_remove').remove()
        $('.student_data .remove,#stage_details .remove').removeClass('hidden')
    }
    if ($user_type_crm == 'presale') {
        $('#menu .remove').remove()
        $('#counts .remove').remove()
        $('#add_candidiate_modal .remove,.student_data .remove,#stage_details .remove,.stage_details .remove').remove()
        $('.student_data .dont_remove,#stage_details .dont_remove').removeClass('hidden')
    }
}
function get_first_date() {
    $.ajax({
        type: "POST",
        async: false,
        url: baseurl + 'login.php',
        data: 'req=73',
        success: function (html) {
            str_date = html;
            var d = new Date();
            $('#datetimepicker_reminder').datetimepicker({
                format: 'Y-m-d H:i',
                timepicker: true,
                //yesterday is minimum date
                minDate: d //tomorrow is maximum date
            });

            var currentDate = new Date();

            var nextDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
            var day = nextDay.getDate()
            var month = nextDay.getMonth() + 1
            var year = nextDay.getFullYear()
            next_date = month + '/' + day + '/' + year;

            var datef = new Date(str_date);
            var day = datef.getDate()
            var month = datef.getMonth() + 1
            var year = datef.getFullYear()
            start_date = month + '/' + day + '/' + year;
            $('#travel_date1').daterangepicker({
                singleDatePicker: true,
                maxDate: moment(),
                showDropdowns: true,
                autoUpdateInput: true,
                minDate:start_date,
                startDate: start_date,
                endDate: currentDate,
                linkedCalendars: true
            },
                function (start, end, label) {
                    setTimeout(function () {
                        data('hotel', 'date1')
                        $('#travel_date2').daterangepicker({
                            singleDatePicker: true,
                            showDropdowns: true,
                            autoUpdateInput: true,
                            minDate: start,
                            startDate: currentDate,
                            endDate: false,
                            linkedCalendars: true
                        },
                            function (start, end, label) {
                                setTimeout(function () {
                                    data('hotel', 'date2')
                                }, 500)
                            });
                    }, 500)
                });
            data('hotel', 'date1')
            $('#travel_date2').daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                autoUpdateInput: true,
                startDate: currentDate,
                endDate: false,
                linkedCalendars: true
            },
                function (start, end, label) {
                    setTimeout(function () {
                        data('hotel', 'date2')
                    }, 500)
                });
            data('hotel', 'date2')
        }
    });
    var link = location.pathname.substring(location.pathname.lastIndexOf('/')+1);
    if(link=='stage.html')
    {
        setTimeout(function () {
            stageing_filter();
        }, 500)
    }
}
//data('flight')
function data(type, cls) {
    var val = $('#travel_' + cls).val();
    date = val.split('-');
    from = date[0];
    const dates = new Date(from); // 2009-11-10
    const month = dates.toLocaleString('default', {
        month: 'short'
    });
    const week = dates.toLocaleDateString('default', {
        weekday: 'short'
    });
    if ($('#travel_date1').val() != '') {
        $('.travel_from_' + cls).val(dates.getDate() + ' ' + month + ' ' + dates.getFullYear());
    }

    to = date[0];
    const to_dates = new Date(to); // 2009-11-10
    const to_month = to_dates.toLocaleString('default', {
        month: 'short'
    });
    const to_week = to_dates.toLocaleDateString('default', {
        weekday: 'short'
    });
    if ($('#travel_date2').val() != '') {
        $('.travel_to_' + cls).val(to_dates.getDate() + ' ' + to_month + ' ' + to_dates.getFullYear());
    }
}
function dropdown_data_lead() {
    $.ajax({
        type: "POST",
        url: baseurl + 'login.php',
        data: 'req=85',
        success: function(html) {
            $('.source_of_lead_dropdown,.source_of_lead_option').html('');
            arrayValues = html.split(',')
                // console.log(arrayValues)
            $('.source_of_lead_dropdown').append('<option id="All" value="All">All</option>');
            $('.source_of_lead_option').append('<option data-id="All" value="NA">NA</option>');
            $.each(arrayValues, function(i, val) {
                arrayValues1 = val.split('//');
                val = arrayValues1[0].replace('\n', '')
                if (val.trim() != '') {
                    $('.source_of_lead_dropdown').append('<option value="' + arrayValues1[1] + '">' + val.trim() + '</option>');
                    $('.source_of_lead_option').append('<option data-id="' + arrayValues1[1] + '" value="' + val.trim() + '">' + val.trim() + '</option>');
                }
            });
        }
    });
}