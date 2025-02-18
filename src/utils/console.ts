import chalk from 'chalk';

export const logBigMessage = (message: string): void => {
    console.log(
        '--------------------------------------------------------------------\n' +
            `${message}\n` +
            '--------------------------------------------------------------------'
    );
};

export const logRunningScript = (sript: string) =>
    console.log(chalk.green(`Running script: ${sript}`));
