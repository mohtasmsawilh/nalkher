<?php
$localhost="localhost";
$UserDb="id3740887_root";    /// ��� ������ �������
$PassDb="mohtasm10@@"; ///  ��������
$NameDb="id3740887_app";  /// ��� �������
/************************************************/
/*@mysql_connect($localhost,$UserDb,$PassDb)or die('<div style="text-align: center;font-size: 21px;"><p style="font-weight:bold;color:red;">Error</p><br>'.mysql_error()."</div>");
@mysql_select_db($NameDb);
@mysql_query("set character_set_server='utf8'");

date_default_timezone_set("Africa/Cairo");*/

$url = parse_url(getenv("CLEARDB_DATABASE_URL"));
$url = parse_url(getenv('JAWSDB_URL'));
$server = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$database = substr($url["path"], 1);

//echo $database;
$DBcon = new mysqli($server, $username, $password, $database);
if ($DBcon->connect_error) {
    die("Connection failed: " . $DBcon->connect_error);
}
date_default_timezone_set("Africa/Cairo");
mysqli_query($DBcon, "SET NAMES 'utf8'");
mysqli_query($DBcon, "set character_set_server='utf8'");
