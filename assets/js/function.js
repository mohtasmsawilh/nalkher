$(document).on('click', '.show_more', function() {
  var ID = $(this).attr('id');
  var Gapp = $("input[name=Gapp]").val();
  var Gtype = $("input[name=Gtype]").val();
  var type = $("input[name=type]").val();
  var app = $("input[name=Gshare]").val();
  if (Gapp != 'admin') {
    if (Gapp == 'myposts') {
      Gapp = 'myposts&app=' + type;
    } else if (Gapp != "home" && Gapp) {
      Gapp = 'More_' + Gapp;
    } else {
      Gapp = "Moreposts";
    }
  } else {
    if (Gtype == 'posts') {
      Gapp = 'Pactive&app=' + type;
    } else if (Gtype == 'share') {
      Gapp = 'Gshare';
    } else {
      Gapp = type;
    }
  }
  var ajax_url = '../inc/ajax.php?step=' + Gapp;
  //$(this).addClass("btn-floating");
  $('.icon_more').hide();
  $('.loding').show();
  $.ajax({
    type: 'POST',
    url: ajax_url,
    data: {
      'id': ID,
      'Gapp': Gapp,
      'Gtype': Gtype,
      'type': type,
      'app': app
    },
    success: function(html) {
      $('#show_more_main' + ID).remove();
      $('.java').remove();
      $('.users').append(html);
      $('.gshare').append(html);
      $('.posts').append(html);
      $('.images').append(html);
      $('.videos').append(html);
      $('.myposts').append(html);
      $('.pposts').append(html);

    }
  });
});

function Ls(type) {
  var userid = $('input[name=userid]').val();
  var lev = $('input[name=lev]').val();
  var tw = $('input[name=tw]').val();
  var fb = $('input[name=fb]').val();
  var Ytoken = $('input[name=Ytoken]').val();
  if (!type) {
    if (fb) {
      return userid;
    } else {
      return false;
    }
  } else if (type == 'tw') {
    if (tw) {
      return tw;
    } else {
      return false;
    }


  } else if (type == 'Ytoken') {
    if (Ytoken) {
      return Ytoken;
    } else {
      return false;
    }


  } else {
    if (lev) {
      return true;
    } else {
      return false;
    }
  }
}

function fb_share(id) {
  if (Ls()) {
    loding_msg('من فضلك انتظر جارى النشر الان', 0, 1000);
    $.ajax({
      type: "POST",
      url: '../inc/ajax.php?step=post_now',
      data: {
        'pid': id
      },
      success: function(data) {
        if (data.st == 'error') {

          error_msg(data.msg);
        } else {
          success_msg(data.msg);
        }


        $('textarea[name=post]').val("");
        remove_img_dialog(0, 1);
        remove_video();
        //Getpost(data.pid);

      },
      dataType: 'json'
    });
  } else {

    $.ajax({
      type: "POST",
      url: '../inc/ajax.php?step=post_num',
      data: {
        'pid': id
      },
      success: function(data) {
        if (data.st == "success") {
          login('fb');
        }
      },
      dataType: 'json'
    });
  }
  return false;
}

function login(type, L, M) {
  if (!M) {
    error_msg("يتوجب عليك تسجيل الدخول");
  } else {
    loding_msg("جارى تحويلك للاشتراك");
  }
  if (L == "" || !L) {
    var lo = window.location.href;
    setCookie("url", lo, 1);
  }
  if (type == "fb") {
    location.replace("../rfb.html");
  } else if (type == "youtube") {
    location.replace("../insert.php?you=true");
  } else {
    location.replace("../twitter.html");

  }
}

function Getposts() {
  $('.posts').load('../inc/ajax.php?step=Getposts');

}

function GetGP(GP) {

  if (GP == "groups") {
    document.getElementById("pages").checked = false;
  } else {
    document.getElementById("groups").checked = false;
  }
  $('.GP').html('<div class="col s12 m12" style=" text-align:center;"><img  src="/assets/images/ripple.svg" alt="" class="responsive-img"  /></div>');
  $('.GP').load('../inc/ajax.php?step=GetGP&GP=' + GP);

}

function add() {
  if (Ls()) {
    location.replace("../");
  } else {
    login('fb', 1);
  }
}
///////////////////////////////////////////////////////
function register() {
  $.ajax({
    type: "POST",
    url: "../inc/ajax.php?step=Mail",
    data: $('#form').serialize(),
    dataType: 'json',
    success: function(data) {
      if (data.result != "success") {
        error_msg(data.msg);
      } else {
        success_msg(data.msg);
        mailchimp();
        $('#form').find("input,textarea").val("");
      }
    }
  });
}

function register_sms() {
  $.ajax({
    type: "POST",
    url: "../inc/ajax.php?step=Sms",
    data: $('#form').serialize(),
    dataType: 'json',
    success: function(data) {
      if (data.result != "success") {
        error_msg(data.msg);
      } else {
        success_msg(data.msg);
        $('#form').find("input,textarea").val("");
      }
    }
  });
}

function mailchimp(msg) {
  $.ajax({
    type: $('#form').attr('method'),
    url: $('#form').attr('action'),
    data: $('#form').serialize(),
    cache: false,
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    error: function(err) {
      if (msg) error_msg("Could not connect to the registration server. Please try again later.");
    },
    success: function(data) {
      if (data.result != "success") {
        if (msg)
          error_msg(data.msg);
      } else {
        if (msg)
          success_msg(data.msg);
      }
    }
  });
  return false;
}


////////////////////////cookie////////////////////////////
function setCookie(cname, cvalue, exdays, dd) {
  if (dd == 1) {
    dd = exdays * 60;
  } else if (dd == 2) {
    dd = exdays;
  } else {
    dd = exdays * 24 * 60;
  }
  var d = new Date();
  d.setTime(d.getTime() + (dd * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
////////////////////////////////////////////////////
function stop_task(id) {
  $.ajax({
    type: "POST",
    url: '../inc/ajax.php?step=stop_task',
    data: {
      'id': id
    },
    success: function(data) {
      if (data.st == 'error') {
        error_msg(data.msg);
      } else {
        success_msg(data.msg);
      }
    },
    dataType: 'json'
  });

}

function re(id, type) {
  loding_msg("جارى التحميل", 1);
  var type = $('input[name=type]').val();
  var Gtype = $('input[name=Gtype]').val();
  $.ajax({
    type: "POST",
    url: '../inc/ajax.php?step=Ruser',
    data: {
      'id': id,
      'type': type,
      'Gtype': Gtype
    },
    success: function(data) {
      if (data.st == 'error') {

        error_msg(data.msg);
      } else {
        $('div[id="t' + id + '"]').fadeOut(function() {
          $(this).remove();
        });
        $('tr[id="t' + id + '"]').fadeOut(function() {
          $(this).remove();
        });

        // Getpost(id);
        success_msg(data.msg);
      }


    },
    dataType: 'json'
  });

  return false;
}

function ban(id, type) {
  loding_msg("جارى التحميل", 1);

  $.ajax({
    type: "POST",
    url: '../inc/ajax.php?step=block',
    data: {
      'id': id,
      'type': type
    },
    success: function(data) {
      if (data.st == 'error') {

        error_msg(data.msg);
      } else {
        /*                          $('div[id="t'+ id +'"]').fadeOut(function(){
                                       $(this).remove();
                                   });
        */ // Getpost(id);
        success_msg(data.msg);
      }


    },
    dataType: 'json'
  });

  return false;
}

function unban(id, type) {
  loding_msg("جارى التحميل", 1);
  $.ajax({
    type: "POST",
    url: '../inc/ajax.php?step=unblock',
    data: {
      'id': id,
      'type': type
    },
    success: function(data) {
      if (data.st == 'error') {

        error_msg(data.msg);
      } else {
        /*                          $('div[id="t'+ id +'"]').fadeOut(function(){
                                       $(this).remove();
                                   });
        */ // Getpost(id);
        success_msg(data.msg);
      }


    },
    dataType: 'json'
  });

  return false;
}

function check(id, type) {
  loding_msg("جارى التحميل", 1);

  $.ajax({
    type: "POST",
    url: '../inc/ajax.php?step=Cuser',
    data: {
      'id': id,
      'type': type
    },
    success: function(data) {
      if (data.st == 'error') {

        error_msg(data.msg);
      } else {
        /*      $('div[id="t'+ id +'"]').fadeOut(function(){
                   //$(this).remove();
               });
        */ // Getpost(id);
        success_msg(data.msg);
      }


    },
    dataType: 'json'
  });

  return false;
}


////////////////////////////////////////////////
function Dpost(id) {
  $.ajax({
    type: "POST",
    url: '../inc/ajax.php?step=Dpost',
    data: {
      'id': id
    },
    success: function(data) {
      if (data.st == 'error') {

        error_msg(data.msg);
      } else {
        success_msg(data.msg);
      }
    },
    dataType: 'json'
  });

}

function Getpost(id) {
  var Gapp = $("input[name=Gapp]").val();
  if (!Gapp || Gapp == 'home') {
    $.ajax({
      type: "POST",
      url: '../inc/ajax.php?step=Moreposts',
      data: {
        'pid': id
      },
      success: function(data) {
        if (data.st == 'error') {

          //error_msg('حدث خطأ ما لم يتم النشر ');
        } else {
          // success_msg('تم اضافة المنشور بنجاح');
        }
        $('.posts').prepend(data);
      }
    });
  }

}



////////////////////////////////////////////////
function remove_img_dialog(type, t) {
  if (!type) {
    type = 0;
  }
  $(".uimage").hide();
  $(".eimage").hide();
  $(".image").attr('src', '');
  $('.textfilde').addClass('m12');
  $("input[name=type]").val(type);
  $("input[name=etype]").val(type);
  $("input[name=url]").val('');
  $("input[name=eurl]").val('');
  if (!t) {
    success_msg("تم حذف الصوره بنجاح", 0)
  }
}

function remove_video() {
  $('label[for=linetext-1]').text('المنشور');
  $('.title_video').hide();
  $('.url_video').hide();
  $('.remove').show();
  $('.uimage').hide();
  $('.textfilde').addClass('m12');
  $("input[name=url]").val('');
  $("input[name=title]").val('');
  $("input[name=eurl]").val('');
  $(".image").attr('src', '');


}

function popup(url) {
  var redirectWindow = window.open(url, '_blank');
  $.ajax({
    type: 'POST',
    url: '/echo/json/',
    success: function(data) {
      redirectWindow.location;
    }
  });
}


////////////////////////tost////////////////////////////
function DeleteAll(id) {
  if (!id) {
    $.dialog({
      //content: '<div class="row center" ><div class="col s6 m6 right"> <a style="    width: 100%;" onclick="DeleteAll(\'users\')" class="btn waves-effect waves-light">الاساسى</a></div><div class="col s6 m6"> <a style="    width: 100%;" onclick="DeleteAll(\'users2\')" class="btn waves-effect waves-light">الاحتياطى</a></div></div>',
      content: 'url:../inc/ajax.php?step=DeleteAll&id=' + id,
      title: false,
      rtl: true,
      //confirm: function(){},
      closeIconClass: 'fa fa-close',
      cancelButton: false, // hides the cancel button.
      confirmButton: false, // hides the confirm button.
      closeIcon: true, // hides the close icon.

    });
  } else {
    $.ajax({
      type: "POST",
      url: '../inc/ajax.php?step=nosend',
      data: {
        'id': id
      },
      success: function(data) {
        if (data.st == 'error') {
          error_msg(data.msg);
        } else {
          success_msg(data.msg);
        }
      },
      dataType: 'json'
    });

  }
}

function Rapp(id) {
  $.ajax({
    type: "POST",
    url: '../inc/ajax.php?step=Rapp',
    data: {
      'id': id
    },
    success: function(data) {
      if (data.st == 'error') {
        error_msg(data.msg);
        //location.href = location.href+ "#" +data.msg;
      } else {
        success_msg(data.msg);
      }
    },
    dataType: 'json'
  });


}

/////////////////////toasts/////////////////////////
function success_msg(text, h, time) {
  $('.material-tooltip').hide();
  $('.toast-info').hide();
  if (!time) {
    time = 5500;
  }
  if (!h && h == 55) {
    h = '<a class="hide_tost" onclick="hide_tost()"><i class="fa fa-times" aria-hidden="true"></i></a>';
  } else {
    h = '';
  }
  //Materialize.toast(h + '<b>' + text + '</b>&nbsp;<i class="fa fa-check fa-lg" aria-hidden="true"></i>', time,"green lighten-1 truncate white-text");
  toastr.success(text, null, {
    timeOut: time
  });
}

function soon_msg(text, h, time) {
  $('.material-tooltip').hide();
  $('.toast-info').hide();
  if (!time) {
    time = 5500;
  }
  if (!h && h == 55) {
    h = '<a class="hide_tost" onclick="hide_tost()"><i class="fa fa-times" aria-hidden="true"></i></a>';
  } else {
    h = '';
  }
  //Materialize.toast(h + '<b>' + text + '</b>&nbsp;<i class="fa fa-smile-o fa-lg" aria-hidden="true"></i>', time,"green soon lighten-1 truncate white-text center");
  toastr.info(text, null, {
    timeOut: time
  });
}

function msg_msg(text, h, time) {
  $('.material-tooltip').hide();
  if (!time) {
    time = 5500;
  }
  if (!h && h == 55) {
    h = '<a class="hide_tost" onclick="hide_tost()"><i class="fa fa-times" aria-hidden="true"></i></a>';
  } else {
    h = '';
  }
  Materialize.toast(h + '<b>' + text + '</b>&nbsp;<i class="fa fa-envelope-o fa-lg" aria-hidden="true"></i>', time, "green lighten-1 truncate white-text center");

}

function error_msg(text, h, time) {
  $('.material-tooltip').hide();
  $('.toast-info').hide();
  if (!time) {
    time = 5500;
  }
  if (!h && h == 55) {
    h = '<a class="hide_tost" onclick="hide_tost()"><i class="fa fa-times" aria-hidden="true"></i></a>';
  } else {
    h = '';
  }
  //Materialize.toast(h +'<b>' + text + '</b>&nbsp;<i class="fa fa-exclamation-circle fa-lg" aria-hidden="true"></i>', time,"red lighten-1 truncate white-text center");
  toastr.error(text, null, {
    timeOut: time
  });
}

function loding_msg(text, h, time) {
  $('.material-tooltip').hide();
  if (!time) {
    time = 5000;
  }
  // time = 5000;
  if (!h && h == 55) {
    h = '<a class="hide_tost" onclick="hide_tost()"><i class="fa fa-times" aria-hidden="true"></i></a>';
  } else {
    h = '';
  }
  //Materialize.toast(h + '<b>' + text + '</b>&nbsp;<img style="width: 25px;height: 25px;" src="../assets/images/spin.svg" alt="" />', time,"loader truncate teal lighten-1 white-text center");
  toastr.info(text, null, {
    timeOut: time
  });
}

function hide_tost() {
  $('.toast').hide();
}
