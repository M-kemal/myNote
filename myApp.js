
"use strict";



let planlar = [];

if(localStorage.getItem("planlar") !== null) {
    planlar = JSON.parse(localStorage.getItem("planlar"));
    
}



const ul = document.querySelector("#plan-list");
const btnEkle = document.querySelector("#btnAddNewTask");
const inputText = document.querySelector("#txtTaskName");
const btnClear = document.querySelector("#btnClear");
const filters = document.querySelectorAll(".filters span")

let taskId;
let duzenlimi = false;

// Temizle ile bütün görevleri localstorage'dan sil
btnClear.addEventListener("click", allClear);

function allClear() {
    localStorage.clear();

}
// bu da seçileni sil olacak







tumPlanlar("all");

function tumPlanlar(filter) {

    ul.innerHTML = "";

    if(planlar.length == 0) {
        ul.innerHTML = "<p class='text-center'> Şu anda hiç bir göreviniz yok. </p>"
    }
    else {
        for(let plan of planlar) {

            let completed = plan.durum == "completed" ? "checked" : "";
        
            if(filter == plan.durum || filter == "all") {

                let li = `
                    <li class="task list-group-item">
                        <div class="form-check">
                            <input type="checkbox" onclick="isaretle(this)" id="${plan.id}" class="form-check-input" ${completed}>
                            <label for="${plan.id}" class="form-check-label ${completed}">${plan.planAdi}</label>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-regular fa-sun"></i>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a onclick="planSil(${plan.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Sil</a></li>
                                <li><a onclick='planDuzenle(${plan.id}, "${plan.planAdi}")' class="dropdown-item" href="#"><i class="fa-regular fa-pen-to-square"></i> Düzenle</a></li>
                            </ul>
                        </div>
                    </li>
                `;
                ul.insertAdjacentHTML("beforeend", li);
            }
        }
    }
   

};

btnEkle.addEventListener("click", yeniPlanEkle);
btnEkle.addEventListener("keypress", function() {
    if(event.key == "Enter") {
        btnEkle.click();
    }
});

for(let span of filters) {
    span.addEventListener("click", function() {
        document.querySelector("span.active").classList.remove("active");
        span.classList.add("active");
        tumPlanlar(span.id);
    })
}


function yeniPlanEkle(event) {
    
    if(inputText.value == "" || inputText.value[0] === " ") {
        alert("Satır başında boşluk kabul edilmez. Lütfen Boşluğu Sil.");
    } else{
        if(!duzenlimi) {
            // Eklemek İçin
            planlar.push({"id": planlar.length + 1, "planAdi": inputText.value, "durum": "pending"});
        } else {
        //düzenlemek için
            for(let plan of planlar) {
                if(plan.id == taskId) {
                    plan.planAdi = inputText.value;
                    
                }
                duzenlimi = false;
            }
        }
            inputText.value = "";
            tumPlanlar(document.querySelector("span.active").id);
    }
        event.preventDefault();
};


function planSil(id) {
    
    let silBunu;

    for(let index in planlar) {
        if(planlar[index].id == id) {
            silBunu = index;
        }
    }
    planlar.splice(silBunu, 1);
    localStorage.setItem("planlar", JSON.stringify(planlar));
    tumPlanlar(document.querySelector("span.active").id);
};

function planDuzenle(duzenId, duzenAdi) {

    taskId = duzenId;
    duzenlimi = true;
    inputText.value = duzenAdi;
    inputText.focus();
    inputText.classList.add("active");

    console.log("edit id:", duzenId);
    console.log("edit mode", duzenlimi);

}


// hepsini sil

btnClear.addEventListener("click", function() {
    planlar.splice(0, planlar.length);
    tumPlanlar();
});

function isaretle(kutuyuSec) {
    let label = kutuyuSec.nextElementSibling;
    let durum;

    if(kutuyuSec.checked) {
        label.classList.add("checked");
        durum = "completed";
    } else {
        label.classList.remove("checked");
        durum = "pending";
    }

    for(let plan of planlar) {
        if(plan.id == kutuyuSec.id) {
            plan.durum = durum;
        }
    }
    tumPlanlar(document.querySelector("span.active").id);

    localStorage.setItem("planlar", JSON.stringify(planlar));

}


ul.style.height = "40vh";













// let gorevListesi = [
//     {"id": 1, "gorevAdi": "Görev 1"},
//     {"id": 2, "gorevAdi": "Görev 2"},
//     {"id": 3, "gorevAdi": "Görev 3"},
//     {"id": 4, "gorevAdi": "Görev 4"}
// ];

// const ul = document.querySelector("#task-list");
// const taskInput = document.querySelector("#txtTaskName")
// let editId;
// let isEditTask = false;

// displayTask();

// function displayTask() {
//     ul.innerHTML = "";

//     for(let gorev of gorevListesi) {

//         let li = `

//             <li class="task list-group-item">
//                 <div class="from-check">
//                     <input type="checkbox" id="${gorev.id}" class="form-check-input">
//                     <label for="${gorev.id}" class="form-check-label">${gorev.gorevAdi}</label>
//                 </div>
//                 <div class="dropdown">
//                     <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                         <i class="fa-solid fa-ellipsis"></i>
//                     </button>
//                     <ul class="dropdown-menu">
//                     <li><a onclick='editTask(${gorev.id}, "${gorev.gorevAdi}")' class="dropdown-item" href="#"> <i class="fa-regular fa-pen-to-square"></i> Düzenle</a></li>
//                     <li><a onclick="deleteTask(${gorev.id})" class="dropdown-item" href="#"><i class="fa-regular fa-trash-can"></i> Sil</a></li>
//                 </div>
//             </li>
//         `;

//         ul.insertAdjacentHTML("beforeend", li);
//     }
// };

// // CLİCK EVENT KISMI

// document.querySelector("#btnAddNewTask").addEventListener("click", newTask);
// document.querySelector("#btnAddNewTask").addEventListener("keypress", function() {
//     if(Event.key == "Enter") {
//         document.getElementById("btnAddNewTask").click();
//     }
// });

// function newTask(event) {
    

//     if(taskInput.value == "") {
//         alert("Görev Girmelisiniz.");
//     } else {
//         gorevListesi.push({"id": gorevListesi.length + 1, "gorevAdi": taskInput.value})
     
//         taskInput.value = "";
        
//         displayTask();

//     }

//     event.preventDefault();
// };

// function deleteTask(id) {

//     let deletedId;

//     for (let index in gorevListesi) {
//         if(gorevListesi[index].id == id) {
//             deletedId = index;
//         }
//     }

//     gorevListesi.splice(deletedId, 1);
//     displayTask();
// }

// function editTask(editId, taskName) {


   

// }