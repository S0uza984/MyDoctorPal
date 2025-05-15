/*
  Warnings:

  - You are about to drop the column `Alergias` on the `formularios` table. All the data in the column will be lost.
  - You are about to drop the column `Alergias_Resposta` on the `formularios` table. All the data in the column will be lost.
  - You are about to drop the column `Condicao_Medica_Resposta` on the `formularios` table. All the data in the column will be lost.
  - You are about to drop the column `Medicamento_Resposta` on the `formularios` table. All the data in the column will be lost.
  - You are about to alter the column `Condicao_Medica` on the `formularios` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(100)`.
  - You are about to alter the column `Medicamento` on the `formularios` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `formularios` DROP COLUMN `Alergias`,
    DROP COLUMN `Alergias_Resposta`,
    DROP COLUMN `Condicao_Medica_Resposta`,
    DROP COLUMN `Medicamento_Resposta`,
    ADD COLUMN `Alergia` VARCHAR(100) NULL,
    MODIFY `Condicao_Medica` VARCHAR(100) NULL,
    MODIFY `Medicamento` VARCHAR(100) NULL;
