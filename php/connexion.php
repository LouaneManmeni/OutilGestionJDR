<?php
include "cors.php";
include "fonction.php";
include "sqlcmd.php";

$rep=array();
$action=$postData["action"];
$db=CoBD();

if ($action=="CONNEXION")
{
    $identifiant = $postData['identifiant'];
    $motdepasse = $postData['motdepasse'];
    $identifiant = stripslashes($identifiant);
    $motdepasse = stripslashes($motdepasse);
    $rep["authentification"] = "Identifiant ou mot de passe incorrect.";

    if ($identifiant == '' || $motdepasse == '') {
        $rep["authentification"] = "Veillez saisir votre identifiant et/ou votre mot de passe.";
    }
    else
    {
        $sql = "SELECT * FROM utilisateur WHERE nom='$identifiant'";
        $result = $db->query($sql);
        if (!$result)
        {
            $rep["authentification"] = "Identifiant ou mot de passe incorrect.";
        }
        else{
            while ($row = $result->fetch_assoc())
            {
                if ($row["mdp"] == $motdepasse)
                {
                    $rep["authentification"] = "oui";
                    $rep["utilisateur"]["id"]=$row["id"];
                    $rep["utilisateur"]["nom"]=$row["nom"];
                }
                else
                {
                    $rep["authentification"] = "Identifiant ou mot de passe incorrect.";
                }
            }
        }
    }
}

$db->close();
echo json_encode($rep);