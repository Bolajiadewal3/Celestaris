import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';





async function loadSectorData(sector) {
    console.log(`trying!!`);

    console.log(`data/${sector}.json`);

    const response = await fetch(`data/${sector}.json`);

    const data = await response.json();
    return data;
}



export async function displayProjects(sector, callback, num = -1) {
    //let num;
    //if(sector === "landing") {num = -1;}


    
    const sectorData = await loadSectorData(sector);
    const projects = sectorData.projects;

   /* projects.forEach(project => {
        //console.log(`Title: ${project.title}`);
        //console.log(`Abstract: ${project.abstract}`);
        //console.log(`Site Link: ${project.siteLink}`);
        //console.log(`Model: ${project.model}`);
    });*/

    const loadingManager = new THREE.LoadingManager();

    const loader = new GLTFLoader(loadingManager);

    let modelsLoaded = 0;
    const totalModels = projects.length;
    THREE.Cache.enabled = true;

        //console.log(`Sector: ${sector.num}`);

// Load the models into the scene
    projects.forEach(project => {
    loader.load(project.model, (gltf) => {
        const modelObj = gltf.scene;
        //scene.add(modelObj);





        project.object = modelObj;
        project.place = modelsLoaded;
        project.index = num;


        console.log(`${project.model} loaded with a place of ${project.place} and an index of ${project.index}`);

        //console.dir(project);
        modelsLoaded++;


        if (modelsLoaded === totalModels) {
            //console.log('All models loaded!');
            ////console.log("Passing projects to callback:", projects);
            //console.dir(projects);

            callback(projects, sector); // Call the callback function once all models are loaded
        }


    });
});
    
    
    return true;
}





