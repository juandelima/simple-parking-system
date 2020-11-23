<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Parking extends Model
{
    protected $table = 'parkings';

    protected $fillable = [
        'kode_parkings', 'nomor_polisi', 'tanggal', 'jam_masuk', 'jam_keluar', 'biaya'
    ];
}
