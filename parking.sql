-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2020 at 01:11 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parking`
--

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(5, '2014_10_12_000000_create_users_table', 1),
(6, '2014_10_12_100000_create_password_resets_table', 1),
(7, '2020_11_17_130450_adds_api_token_to_users_table', 1),
(8, '2020_11_17_143825_create_data_parkings_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `parkings`
--

CREATE TABLE `parkings` (
  `kode_parkings` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nomor_polisi` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `tanggal` date NOT NULL,
  `jam_masuk` time NOT NULL,
  `jam_keluar` time DEFAULT NULL,
  `biaya` bigint(20) NOT NULL,
  `sudah_bayar` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `parkings`
--

INSERT INTO `parkings` (`kode_parkings`, `nomor_polisi`, `tanggal`, `jam_masuk`, `jam_keluar`, `biaya`, `sudah_bayar`, `created_at`, `updated_at`) VALUES
('P-12Sf7p5SSQ', 'B 001Z', '2020-11-22', '18:50:48', '18:52:21', 3000, 1, '2020-11-22 11:50:48', '2020-11-22 11:52:21'),
('P-3Z9Pkq0AmE', 'B 001A', '2020-11-22', '18:55:24', '18:58:59', 3000, 1, '2020-11-22 11:55:24', '2020-11-22 11:58:59'),
('P-eTmBnkQ4na', 'B 001D', '2020-11-22', '18:31:10', '18:52:55', 3000, 1, '2020-11-22 11:31:10', '2020-11-22 11:52:55'),
('P-Mn1mMpahT7', 'B 001G', '2020-11-22', '18:52:07', '18:54:15', 3000, 1, '2020-11-22 11:52:07', '2020-11-22 11:54:15'),
('P-rg7915DDMl', 'B 001E', '2020-11-22', '18:54:00', NULL, 3000, 0, '2020-11-22 11:54:00', '2020-11-22 11:54:00'),
('P-Tq46Ztj9jD', 'B 001A', '2020-11-22', '18:31:35', '18:55:03', 3000, 1, '2020-11-22 11:31:35', '2020-11-22 11:55:03'),
('P-ZudeWGJauN', 'B 001M', '2020-11-22', '18:58:51', NULL, 3000, 0, '2020-11-22 11:58:51', '2020-11-22 11:58:51');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `api_token` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `role`, `remember_token`, `created_at`, `updated_at`, `api_token`) VALUES
(1, 'Juan Valerian Delima', 'juanvaleriand', '$2y$10$lxXNGqlrWQObuSo3MYkq4OoBwjH3dDyXQxs/jGBfcNt.hDlj/vRMu', 'admin', NULL, '2020-11-19 13:23:28', '2020-11-22 12:10:04', 'w66c2HOj0lmL0DYwqcbUxjMWcfxQdipyGzmvaRCW9UVXChkKx04On9E7ei8t'),
(2, 'Bastian Delima', 'bastiandelima', '$2y$10$uqLufhEEL9eRfy4i6m5cI.6XqON3jWirtFax.c2UmN2sjdhk0ENVu', 'user', NULL, '2020-11-20 11:17:48', '2020-11-22 12:10:45', 'VhE05BoL4DVIYlHsmBbJTESyJ3xgqEgl3wG4DLFbDPBthsiBtJxIpXeRJvJT');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parkings`
--
ALTER TABLE `parkings`
  ADD PRIMARY KEY (`kode_parkings`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_username_index` (`username`),
  ADD KEY `password_resets_token_index` (`token`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_api_token_unique` (`api_token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
