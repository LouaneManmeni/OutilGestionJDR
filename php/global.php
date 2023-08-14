<?php
include "cors.php";
include "fonction.php";

$rep=array();
$action=$postData["action"];
$db=CoBD();

if ($action=="INI_COULEUR")
{
    $couleurs=array();
    $sql="SELECT * FROM couleur";
    $res=$db->query($sql);
    while($row=$res->fetch_assoc())
    {
        $couleurs[]=$row;
    }
    $rep["couleurs"]=$couleurs;
}

$db->close();
echo json_encode($rep);