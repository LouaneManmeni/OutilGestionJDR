<?php
include "cors.php";
include "fonction.php";
include "sqlcmd.php";

$rep=array();
$action=$postData["action"];
$db=CoBD();

if ($action=="INITIALISATION")
{
    $jeuDeRole=array();
    $idUtilisateur=$postData["idUtilisateur"];
    $sql="SELECT * 
    FROM jeuderole 
    INNER JOIN participe 
    ON jeuderole.id=participe.idJeuDeRole
    WHERE idUtilisateur='$idUtilisateur'";
    $res=$db->query($sql);
    while($row=$res->fetch_assoc())
    {
        $jeuDeRole[]=$row;
    }
    $rep["jeuDeRole"]=$jeuDeRole;
}

if ($action=="NB_TOUR")
{
    $idJDR=$postData["idJDR"];
    $nbTour=$postData["numTour"];
    $cmd= new sqlCmd();
    $cmd->Add("NbTour",$nbTour,"n");
    $sql = $cmd->MakeUpdateQuery("jeuderole","id='$idJDR'");
    $res=$db->query($sql);
}

$db->close();
echo json_encode($rep);