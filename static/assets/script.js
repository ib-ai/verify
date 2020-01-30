$(document).ready(function() {

    $('#check input[type="checkbox"]').click( () => {
        if($('#check input[type="checkbox"]').prop('checked') == true) {
            $('#next').css('background-color', '#43b581');
            $('#ruleWarn').hide(500);
        } else {
            $('#next').css('background-color', '#f04747');
        }
    })

    
    $('#next').click( (e) => { 
        e.preventDefault();
        if($('#check input[type="checkbox"]').prop('checked') == false) {
            $('#ruleWarn').show(500);
        } else {
            $('#ruleWarn').hide(500);
            $('#rules').hide(500);
            $('#faq').show(500);
        }
    });

    $('#year-role').change((e) => { 
        e.preventDefault();
        if($('#year-role').val() != '__select') {
            $('#verify').css("background-color", "#7289da");
            $('#verify').attr("disabled", false);
            // $('#yearWarn').hide(500);
        } else {
            $('#verify').css("background-color", "#a4b1de");
            $('#verify').attr("disabled", true);
        }  
    })

    //Doesn't work cause I disbaled the button :)
    // $('#verify').click(() => {
    //     if($('#year-role').val() == '__select') {
    //         $('#yearWarn').show(500);
    //     }
    // })

    $('button.themeSwitch').click((e) => {
        e.preventDefault();
        if($('body').hasClass('light') == false) {
            $('body').addClass('light');
        } else {
            $('body').removeClass('light');
        }
    })

    $('#acceptCookies').click((e) => {
        e.preventDefault();
        $('#cookieDialogue').hide();
    })

    $('li').hover(function() {
            let currId = this.id.slice(4);
            $(`#rule${currId} .ruleText`).css('display', 'block');
            
        }, function () {
            let currId = this.id.slice(4);
            $(`#rule${currId} .ruleText`).css('display', 'none');
        }
    );

});
