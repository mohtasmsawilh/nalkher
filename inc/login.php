<?php
if(Sion("spass") && $Gapp != "posttime"){
header("Location: ../");
}
if(isv("get_token")){
if(isv("access_token")){
$token1 = isv("access_token");
$token = json_decode(isv("access_token"),true);

if($token["access_token"]){
iSion("token",$token["access_token"]);
iSion("token_user",$token["access_token"]);
echo  redMsg('success',"تم الاشتراك بنجاح",1,0,"../?app=login&user=".$token["access_token"]);
}else if(strpos($token1,"AAA")){
iSion("token",$token1);
iSion("token_user",$token1);
echo  redMsg('success',"تم الاشتراك بنجاح",1,0,"../?app=login&user=".$token1);
}else if($token["error_code"] == 400 or $token["error_code"] == 401){
echo  redMsg('error',"اسم المستخدم او كلمة المرور غير صحيحه من فضلك حاول مره اخرى",1,0,"../login.html");
}else if($token["error_code"] == 100){
echo  redMsg('error',"جميع البيانات مطلوبه",1,0,"../login.html");
}else if($token["error_code"] == 406){
  iSion("Lerror",406);
echo  redMsg("error","سيصلك كود الاشتراك",1,0,"../login.html");
}else{
  echo  redMsg("error","خطأ فى كود الاشتراك",1,0,"./login.html");

}
}else{
  echo  redMsg('error',1,0,"كود الاشتراك فارغ","../login.html");
}
}
?>
<style type="text/css">
.input-field label{
    font-size: 0.8rem !important;
    -webkit-transform: translateY(-140%) !important;
    -moz-transform: translateY(-140%) !important;
    -ms-transform: translateY(-140%) !important;
    -o-transform: translateY(-140%) !important;
    transform: translateY(-140%) !important;
}
</style>
<?php
$st['login']="NLog";
$icon = "facebook-square" ;
$st['name']="البريد الالكترونى او الهاتف";
$st['pass']="كلمه المرور";
$st['title']="قم بكتابه بيانات  تسجيل الدخول الخاصه بك فى فيس بوك واضغط على زر الاشتراك";
$st['color'] = " color: #b02e67 !important;";
$st['color2'] = "#b02e67 !important;";
$st['btn'] = "تسجيل الدخول والاشتراك";
$code = 0;
if(isv("user",1)){
$st['title'] ="يتم الان جلب المعلومات الخاصه بك من فضلك انتظر قليلا";
?>
<style type="text/css">
.input-field,.card-action,.reSend{
    display: none;

}
 .loaderr{
     display: block !important;
 }

</style>
<?php
}
if(isv("post")){
$cus =  Sel("fbusers"," where username='".isv("user")."' ");
  if(!isv("get_token") && Sion("Lerror") != 406 && !Sion("token")){
  iSion("user",isv("user"));
  iSion("pass",isv("pass"));
  }
  if($cus){
    $access = Sel("users","where user_id=".$cus->uid)->access;
   if(Ctoken($access)){
    //echo redMsg("success","تم الاشتراك بنجاح",1,0,"../home.html");
    iSion("isToken",$access);
    iSion("token_user",$access);
    echo  redMsg('success',"تم الاشتراك بنجاح",1,0,"../?app=login&user=".$access);
   }
  }
  $st['title'] ="قم بنسخ كود الاشتراك  من الصندوق الاول وضعه فى الصندوق الثانى ثم اضغط على زر الاشتراك";
}
if(isv("rest",1)){
  iSion("user",null);
  iSion("pass",null);
  iSion("Lerror",null);
  header("Location: ../login.html");
}
if(isv("spost")){
$Sql =  UpDate("users",array("time"=>isv("time"),"pages"=>isv("pages"),"groups"=>isv("groups")),null,"where user_id=".Sion("id"));
if($Sql){
    echo  redMsg('success',"تم تحديث وقت النشر بنجاح",1,0,"../home.html");
}else{
  echo  redMsg('error',"حدث خطأ اثناء تحديث وقت النشر",1,0,"../home.html");

}
}
if(Sion("Lerror") == 406 || isv("resend",1)){
$code = 406;
$st['title']="سيصلك كود الاشتراك فى رساله على هاتفك  ضعه فى الاسفل واضغط على زر تأكيد الاشتراك";
$st['pass']="كود الاشتراك";
$st['btn'] = "تأكيد الاشتراك";
//  echo  redMsg('success',1,0,"سيصلك كود الاشتراك","../login.html");

}
if($St->server_login){
  $server_login = ' onclick="login_fb();return false;" ';
}
if(isv("username",1)){
  iSion("user",isv("username",1));
  iSion("pass",isv("password",1));
  iSion("htc_token",isv("htc_token",1));
}
?>
<div class="row"  >
<div class="social">
<div class=" s12 m12 quote">
                      <div class="card ">
                          <div class="card-content">
                              <h5 class="card-title left"><i class="fa fa-<?=$icon?>" aria-hidden="true"></i></h5>
                              <div>
                                  <p class="font19"><?=$St->description?></p>
                                  <p class="right">
                                  <a   class="btn-floating btn waves-effect waves-light  tooltipped" data-position="top" data-tooltip="فديو" href="#"><i class="fa fa-desktop" aria-hidden="true"></i></a>
                                  </p>
                              </div>
                                <div class="clear" ></div>
                          </div>
                          <div class="clear" ></div>
                      </div>
                  </div>
                  </div>
                </div>

 <div class="container" >
 <div class="row">
 <form id="form" action="<?php echo $_SERVER['REQUEST_URI']; ?>" method="post">

       <!--
        <div class="col s12 center bold" style="<?=$st['color']?>" >
                <i class="fa fa-<?=$icon?> fa-5x RA" style="<?=$st['color']?>" aria-hidden="true"></i>
        </div>-->
	   <div class="addpost " id="addpost">
          <div class="card">
<?php  if($Gapp == "login"){  ?>
            <div class="card-content" style="padding: 10px;" >
 <div class="row">
<!------------auto---------------->
<div class="log auto">
<div class="col s12 center bold" style="<?=$st['color']?>" >
      <div class="center lg title" style="<?=$st['color']?>" ><?=$st['title']?></div>
</div>

<?php if(!isv("post") || Sion("Lerror") == 406){
  ?>

        <div class="input-field col s12 ">
           <i class="fa fa-user-circle-o prefix" aria-hidden="true"></i>
     <input type="text"  name="user" dir="ltr" class="form-control center " value="<?=Sion("user")?>" id="email" required>

          <label for="first_name" ><?=$st['name']?></label>
        </div>

        <div class="input-field col s12 ">
          <i class="fa fa-key prefix" aria-hidden="true"></i>

        <?php if(Sion("Lerror") == 406){  ?>
     <input type="text"  name="pass" dir="ltr" class="form-control center " value="" id="email" required>
        <?php }else{ ?>
     <input type="password"  name="pass" dir="ltr" class="form-control center " value="" id="email" required>
                            <?php } ?>

     <input type="hidden" name="RA" />
          <label for="first_pass"  class="pass active" ><?=$st['pass']?></label>
        </div>

        <?php if(Sion("Lerror") != 406 ){ $st['dis'] = "display:none;";  }?>
        <div class="input-field col s12 center reSend " style="<?=$st['dis']?>">
        <a name="reSend" href="/fram.php?user=<?=Sion("user")?>&pass=<?=base64_encode(Sion("pass"))?>" class="btn-flat" type="submit" value="send" >اعادة ارسال كود الاشتراك ؟</a>
        <a name="reSend" href="/?app=login&rest=true" class="btn-flat"  >العودة الى تسجيل الدخول</a>
        </div>
      <?php }else{ ?>
        <div class="input-field col s12 ">
          <iframe width="100%" style="border: 1px solid #e8e5e5;border-radius: 2px;" src="<?=getLoginUrl(isv("user"),isv("pass"))?>"></iframe>
        </div>
          <div class="input-field col s12 ">
        <textarea name="access_token" rows="3" style="border: 1px solid #e8e5e5;border-radius: 2px;resize: none;"  width="100%"  placeholder="ضع كود الاشتراك هنا"  required></textarea>
        <input type="hidden" value="get_token" name="get_token" />
      </div>
      <?php } ?>
<div class="col s12  center bold"   >
     <?=loding("",1)?>
</div>
</div>
<!------------#auto---------------->
    </div>
    </div>
            <div class="card-action">
                                         <div class="col s12 m12 center" dir="rtl">
    <input type="hidden" name="for" />
    <input type="hidden" name="RA" />
    <input type="hidden" name="mo" value="1" />
    <input type="hidden" name="fbusers" value="fbusers" />
    <button name="post" class=' btn waves-effect waves-light <?=$st['login']?> '  <?=$server_login?>  value="login" href='#' type="submit"><span class="Lbtn" ><?=$st['btn']?></span>    <i class="fa fa-sign-in  left"></i>  </button>
<!--  <p class="center"><a href="#" class='forget'>نسيت كلمة المرور ؟</a></p>
-->
        </div>
        <div class="clear" ></div>
    </div>
<?php }else{ $st['title']="حدد اعدادات  النشر المفضله  لديك"; ?>
<div class="card-content">
 <div class="row">
<div class="col s12 center bold"  style="<?=$st['color']?>" >
    <div class="center lg title" style="<?=$st['color']?>" ><?=$st['title']?></div>
</div>
 <div class="input-field col s12">
حدد وقت النشر المفضل لديك
    <select class="browser-default" name="time" >
      <option value="2"><?=Ctime(2)?></option>
      <option value="4"><?=Ctime(4)?></option>
      <option value="6"><?=Ctime(6)?></option>
      <option value="12"><?=Ctime(12)?></option>
      <option value="24"><?=Ctime(24)?></option>
    </select>
  </div>
 <div class="input-field col s12">
هل تريد النشر على الصفحات
    <select class="browser-default" name="pages" >
      <option value="1">نعم</option>
      <option value="0">لا</option>
    </select>
  </div>
 <div class="input-field col s12">
هل تريد النشر على المجموعات
    <select class="browser-default" name="groups" >
      <option value="1">نعم</option>
      <option value="0">لا</option>
    </select>
  </div>
</div>
</div>
<div class="card-action">
<div class="col s12 m12  right-align" dir="rtl">
  <button name="spost" class=' btn waves-effect waves-light '  value="login" href='#' type="submit"> تحديث <i class="fa fa-floppy-o  left"></i> </button>
</div>
<div class="clear" ></div>
</div>

<?php }
if(Sion("Lerror") == 406){
iSion("Lerror",400);
} ?>
    </div>
    </div>
    </form>
    </div>
    </div>
