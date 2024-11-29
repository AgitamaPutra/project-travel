-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(191) NOT NULL,
    `service_id` VARCHAR(191) NOT NULL,
    `acquirer_id` VARCHAR(191) NOT NULL,
    `channel_id` VARCHAR(191) NOT NULL,
    `transaction_status` VARCHAR(191) NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `transaction_request_id` VARCHAR(191) NOT NULL,
    `order_invoice_number` VARCHAR(191) NOT NULL,
    `order_amount` DOUBLE NOT NULL,
    `virtual_account_number` VARCHAR(191) NOT NULL,
    `request_id` VARCHAR(191) NULL,
    `reference` VARCHAR(191) NULL,
    `channel_type` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
