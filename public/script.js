const getAnimals = async () => {
    try{
        return (await fetch("/api/animals")).json();
    }catch(error){
        console.log(error);
    }
};

const showAnimals = async () => {
    let animals = await getAnimals();
    let animalsDiv = document.getElementById("animals-list");
    animals.forEach((animal) => {
        const section = document.createElement("section");
        animalsDiv.append(section);

        const a = document.createElement("a");
        a.href = "#"
        section.append(a);

        h3 = document.createElement("h3");
        h3.innerHTML = animal.name;
        a.append(h3);

        a.onclick = (e) => {
            e.preventDefault();
            displayAnimals(animal);
        };
    });
};

const displayAnimals = (animal) => {
    const animalsInfo = document.getElementById("animals-info");
    animalsInfo.innerHTML = " ";

    const color = document.createElement("p");
    color.innerHTML = `<strong>Color: </strong> ${animal.color}`;
    animalsInfo.append(color);

    const family = document.createElement("p");
    family.innerHTML = `<strong>Family: </strong> ${animal.family}`;
    animalsInfo.append(family);

    const place = document.createElement("p");
    place.innerHTML = `<strong>Place: </strong> ${animal.place}`;
    animalsInfo.append(place);

    const growth = document.createElement("p");
    growth.innerHTML = `<strong>Growth: </strong> ${animal.growth}`;
    animalsInfo.append(growth);

    const image = document.createElement("img");
    image.src = animal.image;
    animalsInfo.append(image);

    const d = document.createElement("ul");
    animalsInfo.appendChild(d); 
    aniaml.forEach((item) => { 
        const li = document.createElement("li");
        d.appendChild(li);
        li.innerHTML = item;
    });

    const deleteLink = document.createElement("a");
    deleteLink.innerHTML = "&#x2715;";
    deleteLink.id = "delete"; 
    aimalsInfo.appendChild(deleteLink);

    const editLink = document.createElement("a");
    editLink.innerHTML = "&#9998;";
    editLink.id = "edit"; 
    animalsInfo.appendChild(editLink);

    deleteLink.onclick = (e) => {
        e.preventDefault();
        
    };

    editLink.onclick = (e) => {
        e.preventDefault();
        document.querySelector(".dialog").classList.remove("transparent");
        document.getElementById("title").innerHTML = "Edit Exotic Animal Info";
    };

    populateEditForm(animal);
};

const populateEditForm = (animal) => {

};

const addExoticAnimal = async(e) => {
    e.preventDefault();
    const form =  document.getElementById("edit-animal");
    const formData = new FormData(form);
    const imageInput = form.querySelector("#image");
    if (imageInput && imageInput.files.length > 0) {
        formData.append("image", imageInput.files[0]);
    }

    formData.append("animal", getAnimal());
    formData.append("name", form.name.value);
    formData.append("color", form.color.value);
    formData.append("family", form.family.value);
    formData.append("place", form.place.value);
    formData.append("growth", form.growth.value);
    

    let response;

    if(form._id.value == -1){
        formData.delete("_id");
        formData.delete("img");
        

        console.log(...formData);

        response = await fetch("/api/animals", {
            method: "POST",
            body: formData
        });

    }

    if(response.status != 200){
        console.log("Posting Error");
        return;
    }

    
    resetForm();
    document.querySelector(".dialog").classList.add("transparent");
    showAnimals();
};

const getAniamls = () => {
    const inputs = document.querySelectorAll("#description input");
    let animals = [];

    inputs.forEach((input) => {
        animals.push(input.value);
    });

    return animals;
};

const resetForm = () => {
    const form = document.getElementById("edit-animal");
    form.reset();
    form._id = "-1";
    document.getElementById("description").innerHTML = "";
};

const showHideAdd = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("title").innerHTML = "Add Animal";
    resetForm();
};




window.onload = () => {
    showAnimals();
    document.getElementById("edit-animal").onsubmit = addAnimal;
    document.getElementById("add").onclick = showHideAdd;

    document.querySelector(".close").onclick = () => {
        document.querySelector(".dialog").classList.add("transparent");
    };

    
};