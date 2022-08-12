
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        
        // Abre arquivo PDF.
        openFileDialog: (callback) => {
          const {dialog} = require('electron').remote;
          dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
              { name: "PDF Files", extensions: ["pdf"] },
              { name: "All Files", extensions: ["*"] }
            ]
          }).then((fileNames)=>{
             if (fileNames === undefined) {
               console.log("No file selected");
             } else {
               callback(fileNames);
             }
          }).catch(err=>console.log('Handle Error',err))
          
        }
    }
);


