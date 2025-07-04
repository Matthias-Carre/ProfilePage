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
    printScreen("Available commands:");
    CommandList.forEach(command => {
        printScreen(`- ${command}`);
    });
}
function ls() {
    printScreen("Available files:");
    if (pos) {
        pos.folders.forEach(Folder => {
            printScreen(`- ${Folder.name}`);
        });
    }
}
function quoi() {
    printScreen("Feur!");
}

function updatecurrentRep() {
    const pos = document.getElementById('pos');
    let res = currentRep.join('/');
    res += '$';
    pos.innerHTML = res;
}
function cdRec(folderName){
    if (pos && pos.folders) {
        console.log("Current position:", pos);
        const folder = pos.folders.find(f => f.name == folderName);
        if (folder) {
            pos = folder;
            currentRep.push(folderName);
            
            return true;
        } else {
            return false;
        }
    }
}
//faire un apelle sur le foldername pour les cd de + de 1 folder et gerer les ../
function cd(folderName) {
    if(folderName[0][0] == '/') {
        console.log("racine");
    }else{
        console.log("folderName: ", folderName);
        let folders = folderName[0].split('/');
        console.log("folders: ", folders);
        folders.every(folder => {
            if (!cdRec(folder)){
                printScreen(`-emci: ${folder}: No such directory`);
                return false; 
            }
            printScreen(`Changed directory to ${folderName}`);
            updatecurrentRep();
        });
    }


}

function printScreen(message) {
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
    printScreen("-emci: "+vals[0]+": command not found");
}
function initScreen() {
    const screen = document.getElementById('terminal-screen');
    screen.innerHTML = ''; // Clear the screen
    printScreen("Welcome to the terminal!");
    printScreen("Type 'help' for a list of commands.");
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