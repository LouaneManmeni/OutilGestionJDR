<?php
include "cors.php";
include "fonction.php";
include "sqlcmd.php";

$rep=array();
$action=$postData["action"];
$db=CoBD();

if ($action=="INI")
{
    $joueurs=array();
    $ennemis=array();
    $sql="SELECT * FROM entiter";
    $res=$db->query($sql);
    while($row=$res->fetch_assoc())
    {
        $idJoueur=$row["id"];
        $idCouleur=$row["couleurId"];

        $sql="SELECT * FROM couleur WHERE id=$idCouleur";
        $res2=$db->query($sql);
        $row2=$res2->fetch_assoc();
        $row["couleurFiche"]=$row2;

        $status=array();
        $sql="SELECT status.* 
        FROM status 
        INNER JOIN effet ON status.id = effet.idStatus
        WHERE idEntiter='$idJoueur'";
        $res3=$db->query($sql);
        while($row3=$res3->fetch_assoc())
        {
            $status[]=$row3;
        }
        $row["status"]=$status;
        if ($row["JouE"]=="J")
        {
            $joueurs[]=$row;
        }
        elseif($row["JouE"]=="E")
        {
            $ennemis[]=$row;
        }
    }
    $rep["joueurs"]=$joueurs;
    $rep["ennemis"]=$ennemis;
}

if ($action=="ENREGISTRER_ENTITER")
{
    $entiter=$postData["entiter"];
    $idJoueur=$entiter["id"];
    $idCouleur=$entiter["couleurFiche"]["id"];

    $sql="SELECT COUNT(*) as NB FROM entiter WHERE id='$idJoueur'";
    $res=$db->query($sql);
    $row=$res->fetch_assoc();

    $cmd= new sqlCmd();
    $cmd->Add("nom",$entiter["nom"],"s");
    $cmd->Add("pvMax",$entiter["pvMax"],"n");
    $cmd->Add("pv",$entiter["pv"],"n");
    $cmd->Add("mpMax",$entiter["mpMax"],"n");
    $cmd->Add("mp",$entiter["mp"],"n");
    $cmd->Add("JouE",$entiter["JouE"],"s");
    $cmd->Add("couleurId",$idCouleur,"n");
    if ($row["NB"]>0)
    {
        $sql = $cmd->MakeUpdateQuery("entiter","id='$idJoueur'");
    }
    else
    {
        $cmd->Add("id",$idJoueur,"s");
        $sql = $cmd->MakeInsertQuery("entiter");
    }
    $res=$db->query($sql);

    $rep["sql"]=enregistrerStatus($db,$entiter);
}

if($action=="ENREGISTRER_STATUS")
{
    $rep["sql"]=enregistrerStatus($db,$postData["entiter"]);
}

function enregistrerStatus($db,$uneEntiter)
{
    $s=array();
    $idEntiter=$uneEntiter["id"];
    foreach($uneEntiter["status"] as $unStatus)
    {   
        $idStatus=$unStatus["id"];
        $sql="SELECT COUNT(*) as NB FROM status WHERE id='$idStatus'";
        $res=$db->query($sql);
        $row=$res->fetch_assoc();
        
        $cmd= new sqlCmd();
        $cmd->Add("nom",$unStatus["nom"],"s");
        $cmd->Add("dureeMax",$unStatus["dureeMax"],"n");
        $cmd->Add("duree",$unStatus["duree"],"n");
        $cmd->Add("effet",$unStatus["effet"],"s");
        $cmd->Add("pvmp",$unStatus["pvmp"],"s");
        if ($row["NB"]>0)
        {
            $sql = $cmd->MakeUpdateQuery("status","id='$idStatus'");
        }
        else
        {
            $cmd->Add("id",$idStatus,"s");
            $sql = $cmd->MakeInsertQuery("status");
        }
        $s[]=$sql;
        $res=$db->query($sql);

        $sql="SELECT COUNT(*) as NB FROM effet WHERE idEntiter='$idEntiter' AND idStatus='$idStatus'";
        $res=$db->query($sql);
        $row=$res->fetch_assoc();

        if ($row["NB"]==0)
        {   
            $cmd= new sqlCmd();
            $cmd->Add("idEntiter",$idEntiter,"s");
            $cmd->Add("idStatus",$idStatus,"s");
            $sql = $cmd->MakeInsertQuery("effet");
            $s[]=$sql;
            $res=$db->query($sql);
        }
    }
    return $s;
}

if($action=="SUPPRIMER_ENTITER")
{
    $idEntiter=$postData["idEntiter"];
    $sql="SELECT idStatus FROM effet WHERE idEntiter='$idEntiter'";
    $res=$db->query($sql);
    while($row=$res->fetch_assoc())
    {
        $idStatus=$row["idStatus"];
        $sql="SELECT COUNT(*) as NB FROM effet WHERE idStatus='$idStatus'";
        $res2=$db->query($sql);
        $row2=$res2->fetch_assoc();
        $sql="DELETE FROM effet WHERE idEntiter='$idEntiter' AND idStatus='$idStatus'";
        $re3s=$db->query($sql);
        if ($row2["NB"]==1){
            $sql="DELETE FROM status WHERE id='$idStatus'";
            $res4=$db->query($sql);
        }
    }
    $sql="DELETE FROM ENTITER WHERE id='$idEntiter'";
    $res2=$db->query($sql);

}

$db->close();
echo json_encode($rep);