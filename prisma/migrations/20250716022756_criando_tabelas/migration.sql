-- CreateTable
CREATE TABLE `Usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `funcao` INTEGER NOT NULL DEFAULT 1,
    `telefone` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `turmaId` INTEGER NOT NULL,

    UNIQUE INDEX `Usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turmas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `professorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TurmasMateriais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TurmasToTurmasMateriais` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TurmasToTurmasMateriais_AB_unique`(`A`, `B`),
    INDEX `_TurmasToTurmasMateriais_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MateriasToTurmasMateriais` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MateriasToTurmasMateriais_AB_unique`(`A`, `B`),
    INDEX `_MateriasToTurmasMateriais_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `Turmas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TurmasToTurmasMateriais` ADD CONSTRAINT `_TurmasToTurmasMateriais_A_fkey` FOREIGN KEY (`A`) REFERENCES `Turmas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TurmasToTurmasMateriais` ADD CONSTRAINT `_TurmasToTurmasMateriais_B_fkey` FOREIGN KEY (`B`) REFERENCES `TurmasMateriais`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MateriasToTurmasMateriais` ADD CONSTRAINT `_MateriasToTurmasMateriais_A_fkey` FOREIGN KEY (`A`) REFERENCES `Materias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MateriasToTurmasMateriais` ADD CONSTRAINT `_MateriasToTurmasMateriais_B_fkey` FOREIGN KEY (`B`) REFERENCES `TurmasMateriais`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
