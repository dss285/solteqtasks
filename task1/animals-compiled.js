var PreAssignment;
(function (PreAssignment) {
    class Animal {
        constructor(_name, _age) {
            this.name = _name;
            this.age = _age;
        }
        get() {
            return {
                "name": this.name,
                "age": this.age
            };
        }
        getHeaderHTML() {
            let html = "";
            html += "<div class='row header'>";
            html += this.getKeys().map(x => `<div class='col-1'>${x}</div>`).join("\n");
            html += "</div>";
            return html;
        }
        getKeys() {
            return Object.keys(this.get());
        }
        getValues() {
            // En ole paljoa käyttänyt js/ts niin en ole varma tästä
            return Object.values(this.get());
        }
        toHTML() {
            let html = `<div class='row header'>`;
            for (const value of this.getValues()) {
                html += `<div class='col-1'>${value}</div>`;
            }
            html += "</div>";
            return html;
        }
    }
    PreAssignment.Animal = Animal;
    class Cat extends Animal {
    } // Kaikki funktionaaliteetti on Animals -luokassa
    PreAssignment.Cat = Cat;
    class Dog extends Animal {
        constructor(_name, _age, _color) {
            super(_name, _age);
            this.color = _color;
        }
        get() {
            let fromSuper = super.get();
            let fromDog = { "color": this.color };
            return Object.assign(Object.assign({}, fromSuper), fromDog);
        }
    }
    PreAssignment.Dog = Dog;
    function PrintCats(cats, addHeader) {
        /*Dog ja cats ovat samanlaiset funktiot oikeastaan,
        ne voisi varmaankin yhdistää kun molemmat on perinyt Animal luokasta.*/
        /*Jos addHeader tosi, niin lisätään headeri luokasta,
        mikäli on cats arrayssa jotain (Aikasempi olisi heittänyt indeksivirheen).
        Lopussa mapataan kaikki catsit/dogsit html muuttujiin. */
        var html;
        html = "";
        if (addHeader && 0 < cats.length) {
            html += cats[0].getHeaderHTML();
        }
        html += cats.map(x => x.toHTML()).join("\n");
        return html;
    }
    PreAssignment.PrintCats = PrintCats;
    function PrintDogs(dogs, addHeader) {
        var html;
        html = "";
        if (addHeader && 0 < dogs.length) {
            html += dogs[0].getHeaderHTML();
        }
        html += dogs.map(x => x.toHTML()).join("\n");
        return html;
    }
    PreAssignment.PrintDogs = PrintDogs;
})(PreAssignment || (PreAssignment = {}));
// This is just init data, ignore code below this line in the task
const catsInitData = ["Leo", "Bella", "Milo", "Charlie", "Kitty", "Lucy", "Nala", "Simba", "Jack", "Loki"];
const dogsInitData = ["Max", "Coco", "Rex", "Bella", "Scooby", "Rocky", "Daisy", "Fluffy", "Buddy", "Duke"];
document.addEventListener("DOMContentLoaded", function () {
    var catArray = [];
    var dogArray = [];
    var age = 0;
    for (var i in catsInitData) {
        catArray.push(new PreAssignment.Cat(catsInitData[i], ++age));
        dogArray.push(new PreAssignment.Dog(dogsInitData[i], age, (age % 2 == 0 ? "brown" : age % 3 == 0 ? "yellow" : "black")));
    }
    let catsContainer = document.getElementById('catsContainer');
    if (catsContainer) {
        catsContainer.innerHTML = PreAssignment.PrintCats(catArray, true);
    }
    let dogsContainer = document.getElementById('dogsContainer');
    if (dogsContainer) {
        dogsContainer.innerHTML = PreAssignment.PrintDogs(dogArray, true);
    }
});
