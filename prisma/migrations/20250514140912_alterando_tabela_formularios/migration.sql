/*
  Warnings:

  - You are about to drop the column `Cirurgia` on the `formularios` table. All the data in the column will be lost.
  - You are about to drop the column `Cirurgia_Resposta` on the `formularios` table. All the data in the column will be lost.
  - You are about to drop the column `Med_Continuo` on the `formularios` table. All the data in the column will be lost.
  - You are about to drop the column `Med_Continuo_Resposta` on the `formularios` table. All the data in the column will be lost.
  - You are about to drop the column `Med_Controlado` on the `formularios` table. All the data in the column will be lost.
  - You are about to drop the column `Med_Controlado_Resposta` on the `formularios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `formularios` DROP COLUMN `Cirurgia`,
    DROP COLUMN `Cirurgia_Resposta`,
    DROP COLUMN `Med_Continuo`,
    DROP COLUMN `Med_Continuo_Resposta`,
    DROP COLUMN `Med_Controlado`,
    DROP COLUMN `Med_Controlado_Resposta`,
    ADD COLUMN `Alergias` BOOLEAN NULL,
    ADD COLUMN `Alergias_Resposta` VARCHAR(100) NULL,
    ADD COLUMN `Condicao_Medica` BOOLEAN NULL,
    ADD COLUMN `Condicao_Medica_Resposta` VARCHAR(100) NULL,
    ADD COLUMN `Medicamento` BOOLEAN NULL,
    ADD COLUMN `Medicamento_Resposta` VARCHAR(100) NULL;
