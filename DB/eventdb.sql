-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema eventdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `eventdb` ;

-- -----------------------------------------------------
-- Schema eventdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eventdb` DEFAULT CHARACTER SET utf8 ;
USE `eventdb` ;

-- -----------------------------------------------------
-- Table `Event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Event` ;

CREATE TABLE IF NOT EXISTS `Event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `location` VARCHAR(100) NULL,
  `description` VARCHAR(500) NULL,
  `date` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS groot@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'groot'@'localhost' IDENTIFIED BY 'iamgroot';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'groot'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `Event`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventdb`;
INSERT INTO `Event` (`id`, `name`, `location`, `description`, `date`) VALUES (1, 'SpaceX CRS-19', 'Cape Canaveral', 'An uncrewed SpaceX Dragon cargo spacecraft will lift off on a Falcon 9 rocket from Launch Complex 40 at Cape Canaveral Air Force Station in Florida, delivering supplies and equipment to the International Space Station.', '2019-12-04');
INSERT INTO `Event` (`id`, `name`, `location`, `description`, `date`) VALUES (2, 'Progress 74 Launch', 'Baikonur Cosmodrome', 'The uncrewed Russian Progress 74 cargo craft will launch to the International Space Station from the Baikonur Cosmodrome in Kazakhstan, delivering food, fuel and supplies.', '2019-12-06');
INSERT INTO `Event` (`id`, `name`, `location`, `description`, `date`) VALUES (3, 'SpaceX Falcon 9', 'Cape Canaveral', 'An uncrewed SpaceX Dragon cargo spacecraft will lift off on a Falcon 9 rocket from Launch Complex 40 at Cape Canaveral Air Force Station in Florida, delivering supplies and equipment to the International Space Station.', '2019-12-15');
INSERT INTO `Event` (`id`, `name`, `location`, `description`, `date`) VALUES (4, 'Commercial Crew Boeing Orbital Flight Test (Uncrewed)', 'Cape Canaveral', 'Boeing\'s CST-100 Starliner will launch atop a United Launch Alliance Atlas V rocket from Space Launch Complex 41 at Cape Canaveral Air Force Station in Florida. This is the first of two demonstration flights required to prove the space systems meet NASA’s requirements for certification to carry astronauts to and from the International Space Station.', '2019-12-17');

COMMIT;

