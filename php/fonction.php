<?php

include "./config/params.php";

//Connexion a la base de donnée
function CoBD(){
    global $host, $user, $pass,$base;
    $mysqli = new mysqli($host, $user, $pass,$base);
    if ($mysqli->connect_errno) {
        $reponse["rep"]="Erreur connexion BD";
    }
    return $mysqli;
}