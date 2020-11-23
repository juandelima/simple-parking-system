<?php

namespace App\Http\Controllers;

use App\Parking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ParkingController extends Controller
{
    public function index() {
        $getAll = Parking::orderBy('created_at', 'desc')->get();
        return response()->json(['data' => $getAll], 200);
    }

    public function getDataById($kode_parkings) {
        return Parking::where('kode_parkings', $kode_parkings)->get();
    }

    public function save(Request $request) {
        $this->validator($request->all())->validate();
        $parkings = $this->create($request->all());
        return response()->json($parkings, 200);
    }

    public function update(Request $request, $kode_parkings) {
        $this->validatorUpdate($request->all())->validate();
        $parkings = $this->edit($request->all(), $kode_parkings);
        return response()->json($parkings, 200);
    }

    protected function validator(array $data) {
        return Validator::make($data, [
            'nomor_polisi' => 'required|max:10',
            'tanggal' => 'required',
            'biaya' => 'required'
        ]);
    }

    protected function validatorUpdate(array $data) {
        return Validator::make($data, [
            'biaya' => 'required',
        ]);
    }

    protected function create(array $data) {
        return Parking::create([
            'kode_parkings' => 'P-'.$this->generateCode(),
            'nomor_polisi' => $data['nomor_polisi'],
            'tanggal' => $data['tanggal'],
            'jam_masuk' => date('H:i:s'),
            'biaya' => 3000
        ]);
    }

    protected function edit(array $data, $kode_parkings) {
        return Parking::where('kode_parkings', $kode_parkings)->update([
            'biaya' => $data['biaya'],
            'jam_keluar' => date('H:i:s'),
            'sudah_bayar' => 1
        ]);
    }

    public function searchByDate($tanggal_awal, $tanggal_akhir) {
        $from = date($tanggal_awal);
        $to = date($tanggal_akhir);
        return Parking::orderBy('created_at', 'desc')->whereBetween('tanggal', [$from, $to])->get();
    }

    protected function generateCode() {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
        $randomString = ''; 
        for ($i = 0; $i < 10; $i++) { 
            $index = rand(0, strlen($characters) - 1); 
            $randomString .= $characters[$index]; 
        } 
        return $randomString;
    }
}
