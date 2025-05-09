<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateDeleteTriggersForReservasAndCompras extends Migration
{
    public function up()
    {
        // 1) Asegúrate de eliminar cualquier trigger antiguo
        DB::unprepared('DROP TRIGGER IF EXISTS reservas_after_delete;');
        DB::unprepared('DROP TRIGGER IF EXISTS compras_after_delete;');

        // 2) Si existe la tabla reservas, crea su trigger
        if (Schema::hasTable('reservas')) {
            DB::unprepared(<<<'SQL'
CREATE TRIGGER reservas_after_delete
AFTER DELETE ON `reservas`
FOR EACH ROW
BEGIN
  IF NOT EXISTS(SELECT 1 FROM `reservas`  WHERE house_id = OLD.house_id)
     AND NOT EXISTS(SELECT 1 FROM `compras`   WHERE house_id = OLD.house_id)
  THEN
    UPDATE `casas` SET estado = 'disponible' WHERE id = OLD.house_id;
  END IF;
END;
SQL
            );
        }

        // 3) Si existe la tabla compras, crea su trigger
        if (Schema::hasTable('compras')) {
            DB::unprepared(<<<'SQL'
CREATE TRIGGER compras_after_delete
AFTER DELETE ON `compras`
FOR EACH ROW
BEGIN
  IF NOT EXISTS(SELECT 1 FROM `reservas`  WHERE house_id = OLD.house_id)
     AND NOT EXISTS(SELECT 1 FROM `compras`   WHERE house_id = OLD.house_id)
  THEN
    UPDATE `casas` SET estado = 'disponible' WHERE id = OLD.house_id;
  END IF;
END;
SQL
            );
        }
    }

    public function down()
    {
        DB::unprepared('DROP TRIGGER IF EXISTS reservas_after_delete;');
        DB::unprepared('DROP TRIGGER IF EXISTS compras_after_delete;');
    }
}
