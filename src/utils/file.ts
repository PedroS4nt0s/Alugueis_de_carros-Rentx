import fs from "fs";//file System

export const deleteFile = async(filename: string) => { //função para remover os files antigos 
    try {
        await fs.promises.stat(filename)
    } catch {
        return;
    }
    await fs.promises.unlink(filename);//remove o arquivo de acordo com o file name
};