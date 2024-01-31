
let canvas, ctx, canvasWidth, canvasHeight;

let statekA_JG, statekB_JG;
let kolorA_JG, kolorB_JG;

let kierunekRuchuA_JG
let kierunekArmatyA_JG
let predkoscRuchuA_JG
let kierunekRuchuB_JG
let kierunekArmatyB_JG
let predkoscRuchuB_JG
let strzalB_JG
let strzalA_JG

let statki_JG = []

let sekcjaA_JG = document.getElementById("statekA");
let sekcjaB_JG = document.getElementById("statekB");

function loadAll_JG(){
    document.getElementById("kolizja").innerHTML = "Statki";
    document.getElementById("ruchOkretu_JG").style.visibility = "visible";
    startCanvas_JG();
    czyscCanvas_JG();
    kolory_JG();
    statekA_JG = new Statek(kolorA_JG,...losujParametry_JG());
    statekA_JG.maluj();
    do {
        statekB_JG = new Statek(kolorB_JG, ...losujParametry_JG());
    } while (czyKolizja_JG(statekA_JG, statekB_JG));
    statekB_JG.maluj();

    statki_JG.push(statekA_JG);
    statki_JG.push(statekB_JG);

}

function nowaGra_JG(){
    loadAll_JG();
}

function aktualizujStatek_JG(){
    kierunekRuchuA_JG = parseInt(document.getElementById("kierunekRuchuA_JG").value) || 0;
    kierunekArmatyA_JG = parseInt(document.getElementById("kierunekArmatyA_JG").value) || 0;
    predkoscRuchuA_JG = parseInt(document.getElementById("predkoscRuchuA_JG").value) || 0;

    if (kierunekRuchuA_JG !== 0) {
        statekA_JG.katDziob += kierunekRuchuA_JG;
    }
    if (kierunekArmatyA_JG !== 0) {
        statekA_JG.katArmata += kierunekArmatyA_JG;
    }

    statekA_JG.x += predkoscRuchuA_JG * Math.cos(statekA_JG.katDziob * Math.PI / 180);
    statekA_JG.y += predkoscRuchuA_JG * Math.sin(statekA_JG.katDziob * Math.PI / 180);

    kierunekRuchuB_JG = parseInt(document.getElementById("kierunekRuchuB_JG").value) || 0;
    kierunekArmatyB_JG = parseInt(document.getElementById("kierunekArmatyB_JG").value) || 0;
    predkoscRuchuB_JG = parseInt(document.getElementById("predkoscRuchuB_JG").value) || 0;

    if (kierunekRuchuB_JG !== 0) {
        statekB_JG.katDziob += kierunekRuchuB_JG;
    }
    if (kierunekArmatyB_JG !== 0) {
        statekB_JG.katArmata += kierunekArmatyB_JG;
    }

    statekB_JG.x += predkoscRuchuB_JG * Math.cos(statekB_JG.katDziob * Math.PI / 180);
    statekB_JG.y += predkoscRuchuB_JG * Math.sin(statekB_JG.katDziob * Math.PI / 180);


    czyscCanvas_JG();
    strzalA_JG = document.getElementById("strzalA_JG").checked ;

    strzalB_JG = document.getElementById("strzalB_JG").checked ;
    if (strzalA_JG){
        statekA_JG.strzal();
    }
    if (strzalB_JG){
        statekB_JG.strzal();
    }

    statekA_JG.maluj();
    statekB_JG.maluj();

    if (czyKolizja_JG(statekA_JG, statekB_JG)) {
        document.getElementById("kolizja").innerHTML = "KOLIZJA STATKÓW KONIEC GRY"
        document.getElementById("ruchOkretu_JG").style.visibility = "hidden";
    }

    document.getElementById("kierunekRuchuA_JG").value = 0;
    document.getElementById("kierunekArmatyA_JG").value = 0;
    document.getElementById("predkoscRuchuA_JG").value = 0;
    document.getElementById("strzalA_JG").checked = false;

    document.getElementById("kierunekRuchuB_JG").value = 0;
    document.getElementById("kierunekArmatyB_JG").value = 0;
    document.getElementById("predkoscRuchuB_JG").value = 0;
    document.getElementById("strzalB_JG").checked = false;

}

function czyKolizja_JG(statA, statB) {
    const dx = statA.x - statB.x;
    const dy = statA.y - statB.y;
    const odleglosc = Math.sqrt(dx * dx + dy * dy);

    return odleglosc < statA.promien + statB.promien;
}

function zmianaSekcji_JG() {
     sekcjaA_JG = document.getElementById("statekA");
     sekcjaB_JG = document.getElementById("statekB");

    if (sekcjaA_JG.style.display === "block") {
        sekcjaA_JG.style.display = "none";
        sekcjaB_JG.style.display = "block";
    } else {
        sekcjaA_JG.style.display = "block";
        sekcjaB_JG.style.display = "none";
    }
}

function startCanvas_JG(){
    canvas = document.getElementById("myCanvas_JG");
    ctx = canvas.getContext("2d");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
}
function czyscCanvas_JG(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
}
function kolory_JG(){
    kolorA_JG = "blue";
    kolorB_JG="green";
}

function Statek(kolor,x,y,promien,katDziob,katArmata){
    this.x = x;
    this.y = y;
    this.promien = promien;
    this.kolor = kolor;
    this.katDziob = katDziob;
    this.katArmata = katArmata;
}
Statek.prototype = {
    maluj(){

        let dlugoscArmaty = this.promien * 0.5;
        let dlugoscDziobu = this.promien * 1.5;


        ctx.beginPath();
        ctx.strokeStyle = this.kolor;
        ctx.arc(this.x,this.y,this.promien,0,Math.PI*2);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();

        let kat_JG = this.katDziob * Math.PI / 180;
        let liniaX_JG = this.x + dlugoscDziobu * Math.cos(kat_JG);
        let liniaY_JG = this.y + dlugoscDziobu * Math.sin(kat_JG);


        ctx.moveTo(this.x,this.y);
        ctx.lineTo(liniaX_JG, liniaY_JG);
        ctx.stroke();

        ctx.closePath();

        ctx.beginPath();

        let kat_JG2 = this.katArmata * Math.PI / 180;
        let liniaX_JG2 = this.x + dlugoscArmaty * Math.cos(kat_JG2);
        let liniaY_JG2 = this.y + dlugoscArmaty * Math.sin(kat_JG2);

        ctx.strokeStyle = "red";
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(liniaX_JG2, liniaY_JG2);
        ctx.stroke();

        ctx.closePath();
    },
    strzal() {
        let dlugoscStrzalu = this.promien * 2.5;

        let kat_JG3 = this.katArmata * Math.PI / 180;
        let liniaX_JG3 = this.x + dlugoscStrzalu * Math.cos(kat_JG3);
        let liniaY_JG3 = this.y + dlugoscStrzalu * Math.sin(kat_JG3);

        for (let i = 0; i < statki_JG.length; i++) {
            let drugiStatek_JG = statki_JG[i];

            if (czyKolizjaLiniaPunkt_JG(liniaX_JG3, liniaY_JG3, this.x, this.y, drugiStatek_JG.x, drugiStatek_JG.y, drugiStatek_JG.promien)) {
                document.getElementById("kolizja").innerHTML = "STATEK ZATOPIONY STRZAŁEM KONIEC GRY";
                document.getElementById("ruchOkretu_JG").style.visibility = "hidden";
            }
        }


        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(liniaX_JG3, liniaY_JG3);
        ctx.stroke();
        ctx.closePath();
    }
}

function czyKolizjaLiniaPunkt_JG(px, py, x1, y1, x2, y2, promien) {
    let dlugoscLini_JG = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    let punkt_JG = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / (dlugoscLini_JG * dlugoscLini_JG);


    let punktX_JG = x1 + punkt_JG * (x2 - x1);
    let punktY_JG = y1 + punkt_JG * (y2 - y1);


    if (punkt_JG >= 0 && punkt_JG <= 1 && Math.sqrt((px - punktX_JG) * (px - punktX_JG) + (py - punktY_JG) * (py - punktY_JG)) <= promien) {
        return true;
    }

    return false;
}

function losujParametry_JG(){
    let parametry_JG = [];
    parametry_JG[0] = 50+Math.ceil(Math.random()*350);
    parametry_JG[1] = 50+Math.ceil(Math.random()*200);
    parametry_JG[2] = 30;
    parametry_JG[3] = 10+Math.ceil(Math.random()*40);
    parametry_JG[4] = 20+Math.ceil(Math.random()*180);
    parametry_JG[5] = 20+Math.ceil(Math.random()*180);
    return parametry_JG;
}
