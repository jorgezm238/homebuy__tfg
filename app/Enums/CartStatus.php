<?php

namespace App\Enums;

enum CartStatus: string {
    case ESPERA = 'ESPERA';
    case FINALIZADO = 'FINALIZADO';
    case ABANDONADO = 'ABANDONADO';
}
