namespace PreAssignment {

    export class Animal {
        private name: string;
        private age: number;
        constructor(_name: string, _age: number) { 
            this.name = _name;
            this.age = _age;
        }

        get(): object {
            return {
                "name": this.name,
                "age": this.age
            };
        }
        getHeaderHTML(): string { //Headerissa mapataan kaikki avaimet html:äksi ja joinataan lopussa.
            let html = "";
            html += "<div class='row header'>";
            html += this.getKeys().map(x => `<div class='col-1'>${x}</div>`).join("\n");
            html += "</div>";
            return html;
        }
        getKeys(): string[] { // Haetaan avaimet this.get() objektista, käytetään Headerin laittamiseen.
            return Object.keys(this.get());
        }
        getValues(): any[] { //Haetaan valuet this.get() objektista, tämä on vähän muodollinen funktio muista ohjelmointikielistä.
            // En ole paljoa käyttänyt js/ts niin en ole varma tästä onko tämä peruskäytäntönä.
            return Object.values(this.get())
        }
        toHTML(): string { //muuntaa yhden objektin html merkkijonoksi, vastaamaan aikasempaa printCats funktiossa olevaa riviä
            let html: string = `<div class='row header'>`;
            for(const value of this.getValues()) {
                html+= `<div class='col-1'>${value}</div>`;
            }
            
            html += "</div>";
            return html
        }
    }

    export class Cat extends Animal {} // Kaikki funktionaaliteetti on Animals -luokassa

    export class Dog extends Animal { // Tänne tulee uusi ominaisuus, 'color'
        // getissä ja konstruktorissa ovat ainoat muutokset, superin gettiin lisätään colori
        private color: string;

        constructor(_name: string, _age: number, _color: string) {
            super(_name, _age);
            this.color = _color;
        }

        get(): object { // lisätään colori superin get() palauttavalla objektiin. Muistaakseni kutsutaan Spread syntaksiksi
            let fromSuper = super.get()
            let fromDog = {"color" : this.color}
            return {...fromSuper, ...fromDog}
        }
    }

    export function PrintCats(cats: Cat[], addHeader: boolean): string {
        /*Dog ja cats ovat samanlaiset funktiot oikeastaan, 
        ne voisi varmaankin yhdistää kun molemmat on perinyt Animal luokasta.*/

        /*Jos addHeader tosi, niin lisätään headeri luokasta,
        mikäli on cats arrayssa jotain (Aikasempi olisi heittänyt indeksivirheen).
        Lopussa mapataan kaikki catsit/dogsit html muuttujiin. */
        var html: string;
        html = "";
		if (addHeader && 0 < cats.length) {
            html += cats[0].getHeaderHTML()
		}
        html += cats.map(x => x.toHTML()).join("\n");
        return html;
    }

    export function PrintDogs(dogs: Dog[], addHeader: boolean): string {
        var html: string;
        html = "";
		if (addHeader && 0 < dogs.length) {
            html += dogs[0].getHeaderHTML()
		}
        html += dogs.map(x => x.toHTML()).join("\n");
        return html;
    }
}

// This is just init data, ignore code below this line in the task
const catsInitData = ["Leo","Bella","Milo","Charlie","Kitty","Lucy","Nala","Simba","Jack","Loki"];
const dogsInitData = ["Max", "Coco", "Rex", "Bella", "Scooby", "Rocky", "Daisy", "Fluffy", "Buddy", "Duke"];

document.addEventListener("DOMContentLoaded", function () {
    var catArray: PreAssignment.Cat[] = [];
    var dogArray: PreAssignment.Dog[] = [];
    var age: number = 0;

    for (var i in catsInitData) {
        catArray.push(new PreAssignment.Cat(catsInitData[i], ++age));
        dogArray.push(new PreAssignment.Dog(dogsInitData[i], age, (age % 2 == 0 ? "brown" : age % 3 == 0 ? "yellow" : "black")));
    }

    let catsContainer = document.getElementById('catsContainer');
    if (catsContainer) {
        (catsContainer as HTMLFormElement).innerHTML = PreAssignment.PrintCats(catArray, true);
    }
    let dogsContainer = document.getElementById('dogsContainer');
    if (dogsContainer) {
        (dogsContainer as HTMLFormElement).innerHTML = PreAssignment.PrintDogs(dogArray, true);
    }
});
