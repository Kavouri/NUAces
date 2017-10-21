-- MySQL dump 10.13  Distrib 5.7.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: aces
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `userId` int(10) DEFAULT NULL,
  `title` varchar(512) DEFAULT NULL,
  UNIQUE KEY `admins_userId_uindex` (`userId`),
  CONSTRAINT `admins_users_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `userId` int(10) NOT NULL,
  `eventId` int(10) NOT NULL,
  `attendence` tinyint(1) NOT NULL,
  `dateAttended` date DEFAULT NULL,
  `attendanceSubmitted` datetime DEFAULT NULL,
  KEY `attendance_students_userId_fk` (`userId`),
  KEY `attendance_events_eventId_fk` (`eventId`),
  CONSTRAINT `attendance_events_eventId_fk` FOREIGN KEY (`eventId`) REFERENCES `events` (`eventId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `attendance_students_userId_fk` FOREIGN KEY (`userId`) REFERENCES `students` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `eventId` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `description` int(10) DEFAULT NULL,
  `endDate` date NOT NULL,
  `startTime` date NOT NULL,
  `recurring` tinyint(1) NOT NULL,
  `column_7` int(11) DEFAULT NULL,
  `partnerId` int(10) DEFAULT NULL,
  `createdBy` int(10) DEFAULT NULL,
  PRIMARY KEY (`eventId`),
  KEY `events_servicepartners_partnerId_fk` (`partnerId`),
  KEY `events_users_userId_fk` (`createdBy`),
  CONSTRAINT `events_servicepartners_partnerId_fk` FOREIGN KEY (`partnerId`) REFERENCES `service_partners` (`partnerId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `events_users_userId_fk` FOREIGN KEY (`createdBy`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_partners`
--

DROP TABLE IF EXISTS `service_partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_partners` (
  `partnerId` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) NOT NULL,
  `address` varchar(1024) NOT NULL,
  `addedBy` int(10) NOT NULL,
  PRIMARY KEY (`partnerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_partners`
--

LOCK TABLES `service_partners` WRITE;
/*!40000 ALTER TABLE `service_partners` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_partners`
--

DROP TABLE IF EXISTS `student_partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_partners` (
  `userId` int(10) NOT NULL,
  `partnerId` int(10) NOT NULL,
  PRIMARY KEY (`userId`,`partnerId`),
  KEY `student_partners_servicepartners_partnerId_fk` (`partnerId`),
  CONSTRAINT `student_partners_servicepartners_partnerId_fk` FOREIGN KEY (`partnerId`) REFERENCES `service_partners` (`partnerId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_partners_students_userId_fk` FOREIGN KEY (`userId`) REFERENCES `students` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_partners`
--

LOCK TABLES `student_partners` WRITE;
/*!40000 ALTER TABLE `student_partners` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `userId` int(10) NOT NULL,
  `address` varchar(1024) DEFAULT NULL,
  `college` varchar(512) NOT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `students_users_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userId` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `age` int(10) NOT NULL,
  `email` varchar(512) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-20 17:37:43
