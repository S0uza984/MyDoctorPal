-- CreateTable
CREATE TABLE `anotacao` (
    `ID_Anotacao` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Consulta` INTEGER NOT NULL,
    `Conteudo` VARCHAR(200) NULL,

    INDEX `ID_Consulta`(`ID_Consulta`),
    PRIMARY KEY (`ID_Anotacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consultas` (
    `ID_Consulta` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Medico` INTEGER NOT NULL,
    `ID_Paciente` INTEGER NOT NULL,
    `Data_` DATE NOT NULL,
    `Horario` TIME(0) NOT NULL,
    `Descricao` VARCHAR(200) NULL,
    `Status_` ENUM('CONFIRMADA', 'NEGADA') NULL DEFAULT 'CONFIRMADA',

    INDEX `ID_Medico`(`ID_Medico`),
    INDEX `ID_Paciente`(`ID_Paciente`),
    PRIMARY KEY (`ID_Consulta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `formularios` (
    `ID_Formulario` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Paciente` INTEGER NOT NULL,
    `Altura` INTEGER NOT NULL,
    `Peso` INTEGER NOT NULL,
    `Sexo` ENUM('Masculino', 'Feminino') NULL,
    `Cirurgia` BOOLEAN NULL,
    `Cirurgia_Resposta` VARCHAR(100) NULL,
    `Med_Continuo` BOOLEAN NULL,
    `Med_Continuo_Resposta` VARCHAR(100) NULL,
    `Med_Controlado` BOOLEAN NULL,
    `Med_Controlado_Resposta` VARCHAR(100) NULL,

    INDEX `ID_Paciente`(`ID_Paciente`),
    PRIMARY KEY (`ID_Formulario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicos` (
    `ID_Medico` INTEGER NOT NULL AUTO_INCREMENT,
    `ID` INTEGER NOT NULL,
    `CRM` CHAR(6) NOT NULL,
    `Especialidade` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `CRM`(`CRM`),
    INDEX `ID`(`ID`),
    PRIMARY KEY (`ID_Medico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pacientes` (
    `ID_Paciente` INTEGER NOT NULL AUTO_INCREMENT,
    `ID` INTEGER NOT NULL,
    `Nascimento` DATE NOT NULL,

    INDEX `ID`(`ID`),
    PRIMARY KEY (`ID_Paciente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `CPF` CHAR(11) NOT NULL,
    `Nome` VARCHAR(100) NOT NULL,
    `Email` VARCHAR(100) NOT NULL,
    `Senha` VARCHAR(30) NOT NULL,
    `Telefone` CHAR(11) NOT NULL,

    UNIQUE INDEX `Email`(`Email`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `anotacao` ADD CONSTRAINT `anotacao_ibfk_1` FOREIGN KEY (`ID_Consulta`) REFERENCES `consultas`(`ID_Consulta`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `consultas` ADD CONSTRAINT `consultas_ibfk_1` FOREIGN KEY (`ID_Medico`) REFERENCES `medicos`(`ID_Medico`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `consultas` ADD CONSTRAINT `consultas_ibfk_2` FOREIGN KEY (`ID_Paciente`) REFERENCES `pacientes`(`ID_Paciente`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `formularios` ADD CONSTRAINT `formularios_ibfk_1` FOREIGN KEY (`ID_Paciente`) REFERENCES `pacientes`(`ID_Paciente`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `medicos` ADD CONSTRAINT `medicos_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `usuarios`(`ID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `usuarios`(`ID`) ON DELETE CASCADE ON UPDATE NO ACTION;
