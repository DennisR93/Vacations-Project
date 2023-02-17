-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2023 at 10:32 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(2, 1),
(2, 14);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `role`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `roleId`) VALUES
(1, 'Dennis', 'Rabinovitch', 'DennisR93', 'ad310bf60fb9ddcf787c214b50b2944abeef601e472456c718863cfd86d24e721fbee4b8474d40a3618c315370f7320cbc6148f7e61f4286e9e16d66382fd393', 1),
(2, 'Assaf', 'Fink', 'King100', 'ffdad2832cb78356da91c4eec38f5e53709fe984e96b924a8c5cd48ed75a7a0179cffaf038c59f93eb3b5a2b0c2a98b87b6d69e35c02fb7ad069a820cb6c5ef6', 2),
(3, 'Maria', 'Vareikis', 'MariaDB', '0ffa5dff62e15b857a1a16ee9bec323a5c1120d90f04e5f42213ce87b6227dfc44c37972d0e3278b7957ebf927e8355b4ba2a64f08325117e1c85f55f6e311a4', 2),
(4, 'Nicole', 'Zabarinsky', 'myFunction', '0ffa5dff62e15b857a1a16ee9bec323a5c1120d90f04e5f42213ce87b6227dfc44c37972d0e3278b7957ebf927e8355b4ba2a64f08325117e1c85f55f6e311a4', 2),
(5, 'Sivan', 'Klodet', 'TheKlodet', '0ffa5dff62e15b857a1a16ee9bec323a5c1120d90f04e5f42213ce87b6227dfc44c37972d0e3278b7957ebf927e8355b4ba2a64f08325117e1c85f55f6e311a4', 2),
(6, 'Gal', 'Vitrak', 'DoNotShareScreen', '0ffa5dff62e15b857a1a16ee9bec323a5c1120d90f04e5f42213ce87b6227dfc44c37972d0e3278b7957ebf927e8355b4ba2a64f08325117e1c85f55f6e311a4', 2),
(7, 'Nadav', 'Nadav', 'AssafQuestionPlease', '0ffa5dff62e15b857a1a16ee9bec323a5c1120d90f04e5f42213ce87b6227dfc44c37972d0e3278b7957ebf927e8355b4ba2a64f08325117e1c85f55f6e311a4', 2),
(8, 'Liza', 'Zelensky', 'TheCougher', '0ffa5dff62e15b857a1a16ee9bec323a5c1120d90f04e5f42213ce87b6227dfc44c37972d0e3278b7957ebf927e8355b4ba2a64f08325117e1c85f55f6e311a4', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(70) NOT NULL,
  `description` varchar(200) NOT NULL,
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `price` int(11) NOT NULL,
  `imageName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `checkIn`, `checkOut`, `price`, `imageName`) VALUES
(1, 'John Bryce', 'Full Stack Web Development course, with the best lecturer - Assaf Fink. You will learn all you need to be a Full Stack WEB developer.', '2022-03-22', '2023-01-20', 9999, '99f9356b-78de-4835-adad-7efe6ba31c37.jpg'),
(2, 'Germany', 'Welcome to the German October fest! Here you can have the best beers in the world, plus sausages!!!!', '2023-09-16', '2023-10-03', 1999, 'a4457510-4aa0-4fbf-b92a-18e1f524693e.jpg'),
(3, 'Dubai', 'Visit the magnificent city of UAE - Dubai. Here you will find all what you need, but we must warn you, it\'s not the cheap season!', '2023-08-01', '2023-08-22', 6000, 'ddbbc34d-42d1-4295-8ae0-ea57eda87252.jpg'),
(4, 'Norway', 'Northern Lights is a world wonder, and every one during their life must see this, so do you, so join us!', '2023-01-22', '2023-02-05', 4000, 'e46369f9-0c85-4b16-8d04-e5eefffe7025.jpg'),
(5, 'Egypt', 'One of the world wonders is the Egyptian Pyramids and Sphinx. We are traveling to Egypt to explore all it\'s secrets and we would like you to join us to this journey.', '2023-05-21', '2023-06-01', 1500, '31395fcf-1ae0-4da5-ad6e-8ba4ee6b2acb.jpg'),
(6, 'Miami - Florida', 'Miami is known for its beaches and palm trees. We know you live in Israel and you see it every day, but you must try the USA experience, so JOIN US! We warn you, it won\'t be cheap!', '2023-07-02', '2023-07-31', 10000, '26e50d61-12e4-4fee-aebc-c104c66cac7c.jpg'),
(7, 'Barcelona', 'This is a vacation for soccer lovers, here you will see FCB vs RMA at March 19th. Be ready the match is going to be HOT!', '2023-03-16', '2023-03-21', 1000, 'ed04c24a-16b6-4fd5-bb3a-8d966d21058c.jpg'),
(8, 'Rome', 'Have you ever wanted to visit Rome and see the Pope? Well now you can do it with our special vacation offer!', '2023-04-10', '2023-04-20', 3000, '02f01ca0-6c73-475e-8121-6d4e3c93047d.jpg'),
(9, 'Paris', 'Do you feel the love in the air? Well we hope you do, but if not you will feel it with this vacation. Romantic vacation for TWO in price of one!!!', '2023-06-01', '2023-06-11', 3000, 'ff3793ee-87a7-44f4-8a4d-aa2c272e6e2e.jpg'),
(10, 'Africa - Safari', 'Do you like meat? If you do, here we will help you feel as the meat you eat, this vacation is for Vegans that would like to see non Vegans feel as prey. Also you will be able to see amazing animals, a', '2023-09-10', '2023-09-21', 7000, '8ce53a97-1317-4d9d-97d8-a6f62e663f4a.jpg'),
(11, 'Maldives', 'The pearl of our tour company. This vacation will load you with good vibes, tasty food and all you have ever dreamed of. We have special promo for Full Stack graduates: Project100', '2023-01-22', '2023-02-09', 8000, 'bbc12a4d-da4e-4788-8366-43d4da0fd51d.jpg'),
(12, 'London', 'The great British Empire #1 city, is the best place to travel and enjoy peaceful vacation, also suits whole family!', '2023-10-09', '2023-10-17', 1000, '98705e5e-5b42-403f-a81a-1a8037b68908.jpg'),
(13, 'Australia ', 'Do you want to feel the ultimate \"souls games\" where literally everything tries to kill you? Then go to our Final Destination Australia! Please note you must sign up all kinds of release forms. Also y', '2023-01-13', '2023-01-27', 9000, 'a07c6f33-5800-4775-8b24-f43ad5f849e2.jpg'),
(14, 'Happy Birthday Assaf!', 'Happy Birthday Assaf! I wish you all the best and may all your dreams come true!', '2023-01-28', '2023-01-28', 9999, '1f6e6326-76d8-4715-b095-9aa5bd705eb7.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
