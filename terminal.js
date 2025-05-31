import { Arbo, File, Folder } from './Folder.js';
const CommandList = ['help', "ls"];
const arbo = new Arbo(["root",["projets",["projet1",[],"projet2",[]]],["passions",["passion1",[],"passion2",[]]]]);

function help() {
    consoleRep("Available commands:");
    CommandList.forEach(command => {
        consoleRep(`- ${command}`);
    });
}
function ls() {
    consoleRep("Available files:");
    arbo.tree.getFolders().forEach(folder => {
        consoleRep(`- ${folder.getName()}`);
        folder.getFiles().forEach(file => {
            consoleRep(`  - ${file.getName()}`);
        });
    }
    );
}
function quoi() {
    consoleRep("Feur!");
}
function consoleRep(message) {
    const screen = document.getElementById('terminal-screen');
    screen.innerHTML += `<div class="console-output">${message}</div>`;
    screen.scrollTop = screen.scrollHeight; // Scroll to the bottom
}
function analyseInput(command) {
    let vals = command.split(' ');
    //console.log(vals[0] in CommandDico);
    if (vals[0] in CommandDico) {
        CommandDico[vals[0]]();
        return;
    }
    consoleRep("-emci: "+vals[0]+": command not found");
}
function initScreen() {
    const screen = document.getElementById('terminal-screen');
    screen.innerHTML = ''; // Clear the screen
    consoleRep("Welcome to the terminal!");
    consoleRep("Type 'help' for a list of commands.");
}


document.addEventListener('DOMContentLoaded', () => {
    const screen = document.getElementById('terminal-screen');
    const terminal = document.getElementById('terminal-input');

    terminal.addEventListener('keydown', (event) => {
        //console.log(event.key);
        if (event.key === 'Enter') {
            //console.log(event.key);
            analyseInput(terminal.value);
            terminal.value = ''; 
        }
    });
    initScreen();
        
});
const CommandDico = {
    'help': help,
    'ls': ls,
    'quoi': quoi
};