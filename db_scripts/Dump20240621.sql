CREATE DATABASE  IF NOT EXISTS `gestion_documental` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gestion_documental`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gestion_documental
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity` (
  `idactivity` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `due_date` date NOT NULL,
  `idCreator` int DEFAULT NULL,
  PRIMARY KEY (`idactivity`,`due_date`),
  KEY `activity_creator_idx` (`idCreator`),
  CONSTRAINT `activity_creator` FOREIGN KEY (`idCreator`) REFERENCES `supervisor` (`idsupervisor`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (39,'Tarea Nº6 Tema 14','Completar los ejercicios de la imagen añadiendo una descripción para cada uno.','2024-06-14','2024-07-15',16),(40,'Entrega Justificante de Pago','Entregar el justificante de pago en pdf','2024-06-11','2024-09-15',17),(41,'Carnet de conducir','Adjuntar el carnet de conducir en vigor','2024-06-09','2024-08-15',17),(42,'Entrega TFM','Trabajo Fin de master','2024-05-14','2024-07-15',17),(43,'Learning Agreement','Convenio de créditos para el erasmus','2024-06-01','2024-07-18',17),(44,'Titulo Universitario','Adjuntar Titulo Universitario Cumplimentado','2024-06-10','2024-09-21',16);
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approval`
--

DROP TABLE IF EXISTS `approval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approval` (
  `idApproval` int NOT NULL AUTO_INCREMENT,
  `reviewed` tinyint(1) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL,
  `grade` double DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `idContribution` int NOT NULL,
  `idSupervisor` int DEFAULT NULL,
  PRIMARY KEY (`idApproval`),
  KEY `Approval_contribution_idx` (`idContribution`),
  KEY `Approval_supervisor_idx` (`idSupervisor`),
  CONSTRAINT `Approval_contribution` FOREIGN KEY (`idContribution`) REFERENCES `contribution` (`idcontribution`),
  CONSTRAINT `Approval_supervisor` FOREIGN KEY (`idSupervisor`) REFERENCES `supervisor` (`idsupervisor`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approval`
--

LOCK TABLES `approval` WRITE;
/*!40000 ALTER TABLE `approval` DISABLE KEYS */;
INSERT INTO `approval` VALUES (6,1,1,NULL,'No tanto',20,16),(7,1,1,7.5,'Muy buen trabajo!',17,16);
/*!40000 ALTER TABLE `approval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contribution`
--

DROP TABLE IF EXISTS `contribution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contribution` (
  `idcontribution` int NOT NULL AUTO_INCREMENT,
  `idActivity` int DEFAULT NULL,
  `idProfile` int DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `files` varchar(45) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`idcontribution`),
  KEY `Contribution_activity_idx` (`idActivity`),
  KEY `Contribution_profile_idx` (`idProfile`),
  CONSTRAINT `Contribution_activity` FOREIGN KEY (`idActivity`) REFERENCES `activity` (`idactivity`) ON DELETE SET NULL,
  CONSTRAINT `Contribution_profile` FOREIGN KEY (`idProfile`) REFERENCES `profile` (`idProfile`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contribution`
--

LOCK TABLES `contribution` WRITE;
/*!40000 ALTER TABLE `contribution` DISABLE KEYS */;
INSERT INTO `contribution` VALUES (17,39,2,'Adjunto la tarea en formato ZIP',NULL,'2024-06-14'),(18,41,2,'Carnet',NULL,'2024-06-14'),(19,40,2,'Contribu',NULL,'2024-06-14'),(20,39,5,'La tarea era muy dificil',NULL,'2024-06-09');
/*!40000 ALTER TABLE `contribution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `idProfile` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idProfile`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (2,'jorge@gmail.com','$2a$10$TMC5WrtZnk1BwoE8Xta3Re0rY8pCpku4eJNPKlMls37Yljo5yW1ti',NULL,NULL),(3,'pedro@gmail.com','aaa',NULL,NULL),(4,'supervisor@gmail.com','$2a$10$b5hFOQBTPAgGtljZ64E/WOUhAnNEF9kOYq.M6L90yGOBk8bKWR1MC',NULL,NULL),(5,'luis@gmail.com','$2a$10$GQFtZ3s6JABJxfXGlsJ.NOfKjZIhnQalR86yXDNpfEqQ85kX32goG',NULL,NULL);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supervisor`
--

DROP TABLE IF EXISTS `supervisor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supervisor` (
  `idsupervisor` int NOT NULL AUTO_INCREMENT,
  `idProfile` int NOT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idsupervisor`),
  UNIQUE KEY `idProfile_UNIQUE` (`idProfile`),
  CONSTRAINT `fk_supervisor_profile` FOREIGN KEY (`idProfile`) REFERENCES `profile` (`idProfile`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supervisor`
--

LOCK TABLES `supervisor` WRITE;
/*!40000 ALTER TABLE `supervisor` DISABLE KEYS */;
INSERT INTO `supervisor` VALUES (16,4,NULL),(17,3,NULL);
/*!40000 ALTER TABLE `supervisor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-21 13:31:23
