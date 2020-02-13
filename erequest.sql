-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2020 at 03:01 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.2.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `erequest`
--

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `id` int(11) NOT NULL,
  `branch` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `branch`) VALUES
(1, 'Antipolo'),
(2, 'Bacolod'),
(3, 'Baguio'),
(4, 'Baler'),
(5, 'Baliuag'),
(6, 'Bataan'),
(7, 'Batangas'),
(8, 'Benguet'),
(9, 'Bohol'),
(10, 'Bukidnon'),
(11, 'Bulacan'),
(12, 'Butuan'),
(13, 'Cabanatuan'),
(14, 'Cagayan De Oro'),
(15, 'Cainta'),
(16, 'Calamba'),
(17, 'Capiz'),
(18, 'Cauayan'),
(19, 'Cavite'),
(20, 'Cebu'),
(21, 'Consolacion'),
(22, 'Dagupan'),
(23, 'Dau'),
(24, 'Davao'),
(25, 'Digos City'),
(26, 'Digos Trike'),
(27, 'Dumaguete'),
(28, 'Gapan'),
(29, 'General Santos'),
(30, 'Harrison Plaza'),
(31, 'Head Office'),
(32, 'Ilocos Norte'),
(33, 'Iloilo'),
(34, 'Imus'),
(35, 'Intramuros'),
(36, 'Isabela'),
(37, 'Kabankalan'),
(38, 'Kidapawan'),
(39, 'Koronadal'),
(40, 'La Trinidad'),
(41, 'La Union'),
(42, 'Lagro'),
(43, 'Laguna'),
(44, 'Laoag'),
(45, 'Las Piñas'),
(46, 'Lipa'),
(47, 'Makati'),
(48, 'Malaybalay'),
(49, 'Malolos'),
(50, 'Mandaluyong'),
(51, 'Manila'),
(52, 'MBL'),
(53, 'Meycauayan'),
(54, 'Muntinlupa'),
(55, 'Naga'),
(56, 'Negros Occidental'),
(57, 'Negros Oriental'),
(58, 'Nueva Ecija'),
(59, 'Olongapo'),
(60, 'Pampanga'),
(61, 'Parañaque'),
(62, 'Pasay'),
(63, 'Pasig'),
(64, 'POEA'),
(65, 'Quezon Avenue'),
(66, 'Quezon City'),
(67, 'Roxas'),
(68, 'San Fernando, PA'),
(69, 'San Jose'),
(70, 'San Mateo'),
(71, 'San Pablo'),
(72, 'Santiago'),
(73, 'SC Koronadal'),
(74, 'SC Panabo'),
(75, 'SME Antipolo'),
(76, 'SME Marikina'),
(77, 'Tacloban'),
(78, 'Tagbilaran'),
(79, 'Tacloban'),
(80, 'Tagbilaran'),
(81, 'Tagum'),
(82, 'Talavera'),
(83, 'Tanay'),
(84, 'Tandang Sora'),
(85, 'Tarlac'),
(86, 'Tuguegarao'),
(87, 'Tuguegarao City'),
(88, 'Valencia'),
(89, 'Valenzuela');

-- --------------------------------------------------------

--
-- Table structure for table `credentials`
--

CREATE TABLE `credentials` (
  `username` varchar(25) NOT NULL,
  `pass` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `credentials`
--

INSERT INTO `credentials` (`username`, `pass`) VALUES
('a', '92eb5ffee6ae2fec3ad71c777531578f'),
('admin', '21232f297a57a5a743894a0e4a801fc3'),
('Employee Number 1', 'f8c8b903cb2e4f297e4b96d4b9c1e98a'),
('Gen', '4804dc3c133b11589338a62893ae614c'),
('gm', '92073d2fe26e543ce222cc0fb0b7d7a0'),
('head', '0e32740b5ca002653dc59ebc03e6ffc8'),
('johndee17', '208bf0c2bcf087c7ca231b449bf4e2f8'),
('pandaan', '74d489e0ff51554044dd3d1809e0db7c'),
('user', 'ee11cbb19052e40b07aac0ca060c23ee'),
('user1', 'ee11cbb19052e40b07aac0ca060c23ee'),
('velasco', '157a8551480389ec4c467f34373cf14d');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `Department` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `Department`) VALUES
(1, 'Accounting'),
(2, 'Admin'),
(3, 'AO'),
(4, 'Audit'),
(5, 'Biz Dev'),
(6, 'Check Prep'),
(7, 'CRD'),
(8, 'Crecom'),
(9, 'HR'),
(10, 'IT'),
(11, 'Legal'),
(12, 'Loans'),
(13, 'Marketing'),
(14, 'Marketing Coordinator'),
(15, 'MBL'),
(16, 'Releasing'),
(17, 'Tax'),
(18, 'Tele New'),
(19, 'Tele Renew'),
(20, 'Treasury');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `id` int(11) NOT NULL,
  `user` varchar(20) DEFAULT NULL,
  `item` varchar(6000) DEFAULT NULL,
  `purpose` varchar(500) DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `checker` varchar(20) DEFAULT NULL,
  `check_date` datetime DEFAULT NULL,
  `admin` varchar(20) DEFAULT NULL,
  `admin_date` datetime DEFAULT NULL,
  `gm` varchar(20) DEFAULT NULL,
  `gm_date` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `addition` tinyint(1) DEFAULT 0,
  `replacement` tinyint(1) DEFAULT 0,
  `head` varchar(20) DEFAULT NULL,
  `head_date` datetime DEFAULT NULL,
  `date_received` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`id`, `user`, `item`, `purpose`, `date`, `checker`, `check_date`, `admin`, `admin_date`, `gm`, `gm_date`, `status`, `addition`, `replacement`, `head`, `head_date`, `date_received`) VALUES
(13, 'user1', '[{\"item\":\"ITEM 1\"}]', 'TEST', '2020-02-05 11:03:48', NULL, NULL, 'admin', '2020-02-07 15:52:17', NULL, NULL, 'Declined by GM', 1, 0, NULL, NULL, NULL),
(14, 'johndee17', '[{\"item\":\"Macbook Air 128 GB RAM\"},{\"item\":\"Dell Laptop 128 GB RAM\"},{\"item\":\"Acer PC 128 GB RAM octacore\"}]', 'For faster programming purposes', '2020-02-07 17:07:01', 'velasco', '2020-02-07 17:19:53', 'admin', '2020-02-07 17:23:43', 'Gen', '2020-02-07 17:36:21', 'Received', 1, 0, 'head', '2020-02-07 17:15:00', '2020-02-10 11:34:25'),
(16, 'johndee17', '[{\"item\":\"10 pcs Swindling Chair\"}]', 'For replacement', '2020-02-07 17:08:44', 'velasco', '2020-02-07 17:23:10', 'admin', '2020-02-07 17:35:42', NULL, NULL, 'Declined by GM', 0, 1, 'head', '2020-02-07 17:21:40', NULL),
(18, 'johndee17', '[{\"item\":\"Windows 10 PC With 32 GB RAM\"}]', 'TEST', '2020-02-10 11:02:04', 'velasco', '2020-02-10 15:27:58', 'admin', '2020-02-10 15:35:31', 'Gen', '2020-02-10 17:43:49', 'Approved by GM', 0, 1, 'head', '2020-02-10 12:32:15', NULL),
(19, 'johndee17', '[{\"item\":\"ITEM 1\"}]', 'TEST', '2020-02-12 17:37:56', NULL, NULL, NULL, NULL, NULL, NULL, 'Pending', 1, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `requisition`
--

CREATE TABLE `requisition` (
  `id` int(11) NOT NULL,
  `item` varchar(6000) DEFAULT NULL,
  `req_date` datetime DEFAULT current_timestamp(),
  `status` varchar(20) DEFAULT 'Pending',
  `user` varchar(25) DEFAULT NULL,
  `check_remark` varchar(500) DEFAULT NULL,
  `app_remark` varchar(500) DEFAULT NULL,
  `check_date` datetime DEFAULT NULL,
  `app_date` datetime DEFAULT NULL,
  `checker` varchar(20) DEFAULT NULL,
  `approver` varchar(20) DEFAULT NULL,
  `date_received` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requisition`
--

INSERT INTO `requisition` (`id`, `item`, `req_date`, `status`, `user`, `check_remark`, `app_remark`, `check_date`, `app_date`, `checker`, `approver`, `date_received`) VALUES
(14, '[{\"qnty\":\"1\",\"type\":\"box\",\"part\":\"Ballpen (Black)\",\"amount\":\"160\",\"total\":\"160\"},{\"qnty\":\"1\",\"type\":\"rim\",\"part\":\"Bond Paper (Short)\",\"amount\":\"200\",\"total\":\"200\"},{\"qnty\":\"2\",\"type\":\"box\",\"part\":\"Bond Paper (Long)\",\"amount\":\"1000\",\"total\":\"2000\"}]', '2020-02-07 17:05:48', 'Received', 'johndee17', 'Checked', 'Approved', '2020-02-07 17:11:30', '2020-02-07 17:12:36', 'velasco', 'admin', '2020-02-12 17:12:00'),
(15, '[{\"qnty\":\"10\",\"type\":\"pcs\",\"part\":\"Bond Paper\",\"amount\":\"10\",\"total\":\"10\"},{\"qnty\":\"10\",\"type\":\"rim\",\"part\":\"10\",\"amount\":\"10\",\"total\":\"10\"}]', '2020-02-07 17:09:07', 'Declined', 'johndee17', 'CHECKED', NULL, '2020-02-10 12:29:02', NULL, 'velasco', NULL, NULL),
(16, '[{\"qnty\":\"100\",\"type\":\"box\",\"part\":\"100\",\"amount\":\"100\",\"total\":\"100\"}]', '2020-02-10 12:07:45', 'Checked', 'johndee17', 'TEST', NULL, '2020-02-10 12:51:00', NULL, 'velasco', NULL, NULL),
(17, '[{\"qnty\":\"10\",\"type\":\"pcs\",\"part\":\"Ballpen\",\"amount\":\"10\",\"total\":\"100\"}]', '2020-02-10 18:14:34', 'Pending', 'johndee17', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_data`
--

CREATE TABLE `user_data` (
  `fname` varchar(30) DEFAULT NULL,
  `lname` varchar(30) DEFAULT NULL,
  `user` varchar(30) DEFAULT NULL,
  `branch` varchar(30) DEFAULT NULL,
  `Department` varchar(30) DEFAULT NULL,
  `priv` varchar(30) DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_data`
--

INSERT INTO `user_data` (`fname`, `lname`, `user`, `branch`, `Department`, `priv`, `id`) VALUES
('Pandaan', 'John Dee Velasco', 'johndee17', 'Head Office', 'IT', 'emp', 1),
('General', 'Manager', 'gm', 'Head Office', 'Admin', 'gm', 7),
('Admin', 'Checker', 'velasco', 'Head Office', 'Admin', 'checker', 14),
('Admin', 'Approver', 'admin', 'Head Office', 'Admin', 'admin', 15),
('user', 'user', 'user', 'Head Office', 'IT', 'emp', 16),
('Department', 'Head', 'head', 'Head Office', 'IT', 'head', 17),
('user1', 'user1', 'user1', 'Head Office', 'Accounting', 'emp', 18),
('General', 'Manager', 'gm', 'Head Office', 'Admin', 'gm', 19),
('Gen.', 'Mngr', 'Gen', 'Head Office', 'Admin', 'gm', 20),
('a', 'a', 'a', 'Head Office', 'IT', 'head', 24);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `credentials`
--
ALTER TABLE `credentials`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requisition`
--
ALTER TABLE `requisition`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `requisition`
--
ALTER TABLE `requisition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user_data`
--
ALTER TABLE `user_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;