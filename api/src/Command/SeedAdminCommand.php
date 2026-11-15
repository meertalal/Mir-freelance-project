<?php

declare(strict_types=1);

namespace App\Command;

use App\Entity\Admin;
use App\Repository\AdminRepository;
use App\Support\Env;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:seed-admin',
    description: 'Create an admin account, or reset the password of an existing one.',
)]
final class SeedAdminCommand extends Command
{
    public function __construct(private readonly EntityManagerInterface $em)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('email', InputArgument::OPTIONAL, 'Admin email (defaults to ADMIN_EMAIL).')
            ->addArgument('password', InputArgument::OPTIONAL, 'Admin password (defaults to ADMIN_PASSWORD).')
            ->addArgument('name', InputArgument::OPTIONAL, 'Admin display name (defaults to ADMIN_NAME).');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $email = (string) ($input->getArgument('email') ?: Env::get('ADMIN_EMAIL', ''));
        $password = (string) ($input->getArgument('password') ?: Env::get('ADMIN_PASSWORD', ''));
        $name = (string) ($input->getArgument('name') ?: Env::get('ADMIN_NAME', 'Administrator'));

        if (!filter_var($email, \FILTER_VALIDATE_EMAIL)) {
            $output->writeln('<error>Provide a valid email, or set ADMIN_EMAIL.</error>');

            return Command::FAILURE;
        }

        if (strlen($password) < 8) {
            $output->writeln('<error>Provide a password of at least 8 characters, or set ADMIN_PASSWORD.</error>');

            return Command::FAILURE;
        }

        $repository = new AdminRepository($this->em);
        $admin = $repository->findOneByEmail($email);

        if ($admin === null) {
            $admin = new Admin($email, password_hash($password, \PASSWORD_DEFAULT), $name);
            $repository->save($admin);
            $output->writeln(sprintf('<info>Created admin %s (id %s).</info>', $admin->getEmail(), (string) $admin->getId()));

            return Command::SUCCESS;
        }

        $admin->setPasswordHash(password_hash($password, \PASSWORD_DEFAULT));
        $admin->setName($name);
        $admin->setActive(true);
        $repository->save($admin);

        $output->writeln(sprintf('<info>Updated password for admin %s.</info>', $admin->getEmail()));

        return Command::SUCCESS;
    }
}
