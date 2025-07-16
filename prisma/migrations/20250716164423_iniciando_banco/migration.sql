-- CreateTable
CREATE TABLE `Usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `funcao` INTEGER NOT NULL DEFAULT 1,
    `telefone` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `turmaId` INTEGER NULL,

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
    `turmaId` INTEGER NOT NULL,
    `materiasId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `Turmas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TurmasMateriais` ADD CONSTRAINT `TurmasMateriais_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `Turmas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TurmasMateriais` ADD CONSTRAINT `TurmasMateriais_materiasId_fkey` FOREIGN KEY (`materiasId`) REFERENCES `Materias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
