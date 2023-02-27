<?php
header('Access-Control-Allow-Origin: *');
include('db.php');
ini_set('max_input_time', 300000000);
ini_set('max_execution_time', 3000000000);
$datetime = date('Y-m-d H:i:s');
$today = date('Y/m/d');
$admin_email = 'abdul@zesttour.com';
extract($_REQUEST);
if ($req == 1) {
    //print_r($_REQUEST);
$sql2 = mysqli_query($connect, "select * from login where email='$email' AND password='$password'");
if (mysqli_num_rows($sql2) > 0) {
    while($rs = mysqli_fetch_assoc($sql2))
    {
        echo $rs['name'].',,$'.$rs['id'].',,$'."ok";
    }

} else {
    echo "Invalid Username or Password Please try again";
}
}
if ($req == 2) {
    //print_r($_REQUEST);
if(mysqli_query($connect, "insert into login (`name`,`email`,`password`) values ('$name','$email','$password')"))
{
    echo "ok";
}
}
if($req==3)
{
    //print_r($_REQUEST);
    $sql1 = mysqli_query($connect,"select * from login where `email` = '$email'");
    if(mysqli_num_rows($sql1) > 0)
    {
        if(mysqli_query($connect,"update login set `password` = '$newpassword' where `email` ='$email'"))
        //echo "update login set `password` = '$newpassword' where `email` ='$email'";
            echo "ok";
    }
  
    else{
        echo "user does not exist try again";
        window.location.reload();
    }
}
if ($req == 4) {
    //print_r($_REQUEST);
   // echo "insert into users (`dr`,`name`,`pneumonia`,`age`,`confusion`,`rr`,`bp`,`uremia`) values ('$dr_id','$pname','none','$age','$confusion','$rr','$bp','$uremia')";
if(mysqli_query($connect, "insert into users (`dr`,`name`,`pneumonia`,`age`,`confusion`,`rr`,`bp`,`uremia`) values ('$dr_id','$pname','none','$age','$confusion','$rr','$bp','$uremia')"))
{
    echo 'ok';
}
}
?>