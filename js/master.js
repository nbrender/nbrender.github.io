var hours, minutes, months, days, to, past, nbsps;
var progress;
var chars = 'abcdefghijklmnopqrstuvwxyz';
 
var changed = function() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var month = now.getMonth();
    var day = now.getDate();
    var midnight = 0;
    var offset;
    var next;

    if (hour == 23) {
        midnight = 1;
    }
    hour = hour % 12;
    minute = minute - minute % 5;

    for (var i in minutes) {
        minutes[i].removeClass('on');
    }
    for (var i in hours) {
        hours[i].removeClass('on');
    }
    for (var i in months) {
        months[i].removeClass('on');
    }
    for (var i in days) {
        days[i].removeClass('on');
    }
 
    to.removeClass('on');
    past.removeClass('on');
 
    if (minute > 30) {
        hours[(hour + 1) % 12].addClass('on');
        to.addClass('on');
    } else {
        if (midnight == 0) {
            hours[hour].addClass('on');
        } else {
            hours[12].addClass('on');
        }
        if (minute !== 0) {
            past.addClass('on');
        }
    }
    months[month].addClass('on');
    days[day].addClass('on');
 
    offset = (minute > 30)?(60-minute):minute;

    if (offset in minutes) {
        minutes[offset].addClass('on');
    } else if (offset === 25) {
        minutes[20].addClass('on');
        minutes[5].addClass('on');
    }

    now.setTime(Date.now());
    next = new Date(now.getTime());
    next.setMinutes(minute + 5);
    next.setSeconds(0);
    next.setMilliseconds(0);
    console.log((next - now) / 1000);
    setTimeout(changed, next - now);
    
}
 
var adjustProgress = function() {
    var now = new Date();
    var passed = (now.getMinutes() % 5) * 60 + now.getSeconds();
    var percent = passed / (5 * 60) * 100;

    progress.width(percent+'%').css('transition', 'width 1s linear');
 
    if (percent < .5) {
        progress.hide();
        setTimeout(function() {
            progress.fadeIn();
        }, 500);
    }
 
    setTimeout(adjustProgress, 1000);
};
 
var first = function() {
    nbsps.each(function() {
        var c = chars.charAt(Math.floor(Math.random() * chars.length));
        $(this).text(c);
        });
 
    setTimeout(function() {
        progress.fadeIn();
    }, 1000);
};
 
$(function() {
    minutes = {
        0:  $('#clock #m_0'),
        5:  $('#clock #m_5'),
        10: $('#clock #m_10'),
        15: $('#clock #m_15'),
        20: $('#clock #m_20'),
        30: $('#clock #m_30'),
    };
 
    hours = {
        0:  $('#clock #h_0'),
        1:  $('#clock #h_1'),
        2:  $('#clock #h_2'),
        3:  $('#clock #h_3'),
        4:  $('#clock #h_4'),
        5:  $('#clock #h_5'),
        6:  $('#clock #h_6'),
        7:  $('#clock #h_7'),
        8:  $('#clock #h_8'),
        9:  $('#clock #h_9'),
        10: $('#clock #h_10'),
        11: $('#clock #h_11'),
        12: $('#clock #h_12'),
    }
 
    months = {
        0:  $('#clock #mm_0'),
        1:  $('#clock #mm_1'),
        2:  $('#clock #mm_2'),
        3:  $('#clock #mm_3'),
        4:  $('#clock #mm_4'),
        5:  $('#clock #mm_5'),
        6:  $('#clock #mm_6'),
        7:  $('#clock #mm_7'),
        8:  $('#clock #mm_8'),
        9:  $('#clock #mm_9'),
        10: $('#clock #mm_10'),
        11: $('#clock #mm_11'),
    }
 
    days = {
        1:  $('#clock #d_1'),
        2:  $('#clock #d_2'),
        3:  $('#clock #d_3'),
        4:  $('#clock #d_4'),
        5:  $('#clock #d_5'),
        6:  $('#clock #d_6'),
        7:  $('#clock #d_7'),
        8:  $('#clock #d_8'),
        9:  $('#clock #d_9'),
        10: $('#clock #d_10'),
        11: $('#clock #d_11'),
        12: $('#clock #d_12'),
        13: $('#clock #d_13'),
        14: $('#clock #d_14'),
        15: $('#clock #d_15'),
        16: $('#clock #d_16'),
        17: $('#clock #d_17'),
        18: $('#clock #d_18'),
        19: $('#clock #d_19'),
        20: $('#clock #d_20'),
        21: $('#clock #d_21'),
        22: $('#clock #d_22'),
        23: $('#clock #d_23'),
        24: $('#clock #d_24'),
        25: $('#clock #d_25'),
        26: $('#clock #d_26'),
        27: $('#clock #d_27'),
        28: $('#clock #d_28'),
        29: $('#clock #d_29'),
        30: $('#clock #d_30'),
        31: $('#clock #d_31'),
    }
 
    to = $('#clock #to');
    past = $('#clock #past');
    nbsps = $('#clock .nbsp');
    progress = $('#progressbar');
  
    changed();
    adjustProgress();
 
    first();
});