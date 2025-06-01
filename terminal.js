import { Arbo, File, Folder } from './Folder.js';

const CommandList = ['help', "ls","cd"];
let currentRep = ["MatthiasC:"];
let arboData = null;
// position dans l'arborescence
let pos = null;
//on load le json
async function loadArbo() {
    try {
        const rep = await fetch('tree.json');
        const data = await rep.json();
        return data;
    } catch (error) {
        console.error("Error loading tree.json:", error);
        return null;
    }
}
function help() {
    consoleRep("Available commands:");
    CommandList.forEach(command => {
        consoleRep(`- ${command}`);
    });
}
function ls() {
    consoleRep("Available files:");
    if (pos) {
        pos.folders.forEach(Folder => {
            consoleRep(`- ${Folder.name}`);
        });
    }
}
function quoi() {
    consoleRep("Feur!");
}

function updatecurrentRep() {
    const pos = document.getElementById('pos');
    let res = currentRep.join('/');
    res += '$';
    pos.innerHTML = res;
}

function cd(folderName) {
    if (pos && pos.folders) {
        console.log("Current position:", pos);
        pos.folders.find(f => console.log(f.name));
        pos.folders.find(f => console.log(f.name == "Projets"));
        const folder = pos.folders.find(f => f.name == folderName);
        if (folder) {
            pos = folder;
            consoleRep(`Changed directory to ${folderName}`);
            currentRep.push(folderName);
            updatecurrentRep();
        } else {
            consoleRep(`-emci: ${folderName}: No such directory`);
        }
    }
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
        let argsV = vals.slice(1);
        CommandDico[vals[0]](argsV);
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


document.addEventListener('DOMContentLoaded',async () => {
    const screen = document.getElementById('terminal-screen');
    const terminal = document.getElementById('terminal-input');
    arboData = await loadArbo();
    pos = arboData;
    console.log("arbo loaded", arboData);
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
    'quoi': quoi,
    'cd': cd,
};