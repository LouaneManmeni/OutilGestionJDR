<?php
    /*
     * auteur : Marc Duren
     */

class sqlCmd
{
    public $m_fields = array();
    public $m_values = array();
    public $m_type = array(); //s=string,n=numeric,d=date,l=litteral,b=bool
    protected $m_command;

    protected function formated($n)
    {
        $v = $this->m_values[$n];
        $t = $this->m_type[$n];
        switch ($t) {
        case "n":
            if (strlen($v) === 0 || $v === "NaN") {
                return 'null';
            } else {
                return str_replace(',', '.', $v);
            }
            // no break
        case "d":
            if (strlen($v) == 0) {
                return "null";
            } else {
                return "'" . $v . "'";
            }
            // no break
        case "b":
            if (strlen($v) == 0) {
                return "null";
            } else {
                if ($v == "t" || $v == "Oui" || $v == "on" || $v == "true" || $v == "TRUE") {
                    return "TRUE";
                } else {
                    return "FALSE";
                }
            }
            // no break
        case "l":
            return $v;
        }
        return "'" . str_replace("'", "''", str_replace("\'", "'", $v)) . "'";
    }

    public function Add($tuple, $valeur, $type = "")
    {
        $this->m_fields[] = $tuple;
        $this->m_values[] = $valeur;
        if ($type == "") { //auto
            if (is_numeric($valeur)) {
                $this->m_type[] = "n";
            } else {
                $this->m_type[] = "s";
            }
        } else {
            $this->m_type[] = $type;
        }
        return count($this->m_type) - 1;
    }

    public function AddNull($tuple)
    {
        $this->m_fields[] = $tuple;
        $this->m_values[] = "null";
        $this->m_type[] = "l";
        return count($this->m_type) - 1;
    }

    public function MakeUpdateQuery($table, $sqlwhere)
    {
        $this->m_command = "UPDATE `$table` SET \n";
        for ($n = 0; $n < count($this->m_fields); $n++) {
            $f = $this->m_fields[$n];
            if ($n > 0) {
                $this->m_command .= ",\n";
            }
            $this->m_command .= "$f=" . $this->formated($n);
        }
        $this->m_command .= " \nWHERE $sqlwhere";
        return $this->m_command;
    }

    public function MakeInsertQuery($table)
    {
        $this->m_command = "INSERT INTO `$table` (\n";
        for ($n = 0; $n < count($this->m_fields); $n++) {
            if ($n > 0) {
                $this->m_command .= ",";
            }
            $this->m_command .= $this->m_fields[$n];
        }
        $this->m_command .= ") \nVALUES (";
        for ($n = 0; $n < count($this->m_values); $n++) {
            if ($n > 0) {
                $this->m_command .= ",";
            }
            $this->m_command .= $this->formated($n);
        }

        $this->m_command .= ")\n";
        return $this->m_command;
    }

    public function Clear()
    {
        unset($this->m_fields);
        unset($this->m_commands);
        unset($this->m_type);
        unset($this->m_command);
        $this->m_fields = array();
        $this->m_values = array();
        $this->m_type = array();
        $this->m_command = "";
    }

    public function GetSQL()
    {
        return $this->m_command;
    }
}

