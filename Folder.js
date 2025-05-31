export class Folder{
    files= [];
    folders = [];

    constructor(name, path) {
        this.name = name;
        this.path = path;
    }
    getName() {return this.name;}
    getPath() {return this.path;}
    setName(name) {this.name = name;}
    setPath(path) {this.path = path;}
    getFiles() {return this.files;}
    getFolders() {return this.folders;}
    addFile(file) {this.files.push(file);}
    addFolder(folder) {this.folders.push(folder);}

    getFileByName(name) {
        return this.files.find(file => file.getName() === name);
    }
    getFolderByName(name) {
        return this.folders.find(folder => folder.getName() === name);
    }
}
export class File {
    constructor(name, path, content) {
        this.name = name;
        this.path = path;
        this.content = content;
    }
    getName() {return this.name;}
    getPath() {return this.path;}
    getContent() {return this.content;}
    setName(name) {this.name = name;}
    setPath(path) {this.path = path;}
    setContent(content) {this.content = content;}
}
export class Arbo{
    //Idee du truc ["root",["projets",["projet1",[],"projet2",[]]],["passions",["passion1",[],"passion2",[]]]]
    constructor(tab) {
        this.tree = this.createArbo(tab);
    }
    createArbo(tab) {
        let folder = new Folder(tab[0], '');
        console.log(tab);
        if( tab[1] != [] && tab[1] != undefined) {
            tab[1].forEach(file => {
                if(tab[1][1] != [] && tab[1][1] != undefined){
                    folder.addFolder(this.createArbo(file));
                }else {
                    folder.addFile(new File(file, '', ''));
                }
            });
            // let subFolder = this.createArbo(tab[1]);
            // folder.addFolder(subFolder);
        }else {
            let file = new File(tab[0], '', '');
            folder.addFile(file);
        }


        return folder;
    }
    listFolders(folder) {
        let folders = [];
        folder.getFolders().forEach(subFolder => {
            folders.push(subFolder.getName());
        });
        return folders;
    }
}
