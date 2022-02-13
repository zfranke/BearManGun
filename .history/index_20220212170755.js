#!/usr/bin/env node

//Modules for app
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

/** 
 * @description - Thiis is a app based on the Fireship.io tutorial for CLI Apps
 * @author - Zach Franke 
 * @version - 0.0.1
*/

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Bear Man Gun - The Game \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a living process in the form of a game.
    There will be a choice given of Bear, Man or Gun.
    You must pick the right option or I am ${chalk.bgRed('killed')}
    and you will ${chalk.bgOrange('lose')}.
    
    So just get them all right....okay?
  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That is correct!` });
  } else {
    spinner.error({ text: `Ah, that was not right. Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} !\n you win!`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');

    console.log(
      chalk.green(
        `Programming isn't about what you know; it's about making the command line look cool - Fireship.io`
      )
    );
    process.exit(0);
  });
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'System chooses: Bear\n',
    choices: [
      'Bear',
      'Gun',
      'Man',
    ],
  });

  return handleAnswer(answers.question_1 === 'Gun');
}

async function question2() {
  const answers = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: 'System chooses: Bear\n',
    choices: [
      'Bear',
      'Gun',
      'Man',
    ],
  });

  return handleAnswer(answers.question_1 === 'Gun');
}

//Game Logic Run Sequence

console.clear();
await welcome();
await askName();
await question1();
winner();