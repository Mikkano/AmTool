const sheetId = '1AfGvTvzGCN9pPri3hi7aTS7YRNg4HZhsmum-NrSTCsA';
const sheetName = 'Clients';
const sheetRange = 'A2:C6';
const sheetURL = ('https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?sheet=' + sheetName + '&range=' + sheetRange);
const clientList = document.querySelector('.client-list')

const accountManagers = [];


let clientObjects = [];


class accountManager {
    constructor(trkOwner,sheetId,clientId,accessKey,){
    this.trkOwner = trkOwner;
    this.sheeid = sheetId;
    this.clientId = clientId;
    this.accessKey = accessKey;
}

}

const Kuba = new accountManager ('Kuba Jakóbczyk','1AfGvTvzGCN9pPri3hi7aTS7YRNg4HZhsmum-NrSTCsA','123','AZFDFFHG21');

console.log(Kuba);


class Client{
    constructor(name, mrr, mail){
        this.name = name;
        this.mrr = mrr;
        this.mail = mail;
    }
}

const client1 = new Client ("Andrzej", 200, "andrzejek@gmail.com")
console.log(client1);



// ------------------FETCH SECTION------------------------ //

fetch(sheetURL)
.then(res => res.text())
.then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0,-2));
console.log(data.table.rows[0].c[0].v);
console.log(data.table);


// names.push(data.table.rows[i].c[0].v);
// mrr.push(data.table.rows[i].c[1].v);
// emails.push(data.table.rows[i].c[2].v);


for (i = 0; i < data.table.rows.length; i++){
   let client = new Client (`${data.table.rows[i].c[0].v}`,`${data.table.rows[i].c[1].v}`,data.table.rows[i].c[2].v);

   clientObjects.push(client)

    }


});


// ------------------ D0M SECTION Clients Panel ------------------------------ //


const loadClients=()=>{

    for(i=0; i< clientObjects.length; i++){
    let newEl = document.createElement('li');
    newEl.className = `client${i}`;
    clientList.appendChild(newEl);

    let elementClientName = document.createElement('p');
    let elementClientMRR = document.createElement('p');
    let elementClientEmail = document.createElement('p');

    let buttonsEl = document.createElement('div');
    let pingBtn = document.createElement('button');
    let hrBtn = document.createElement('button');
    let pupBtn = document.createElement('button');

    pingBtn.className = `ping-${i}`;
    pupBtn.className = `pup-${i}`;
    hrBtn.className = `hr-${i}`;

    const liButtons = [pingBtn, pupBtn, hrBtn];

    liButtons.forEach(el => el.id ='libutton');

    pingBtn.textContent = 'PING';
    pupBtn.textContent = "P-UPDATE";
    hrBtn.textContent = 'HIGH-RISK';


    elementClientName.className = `name${i}`;
    elementClientMRR.className = `MRR${i}`;
    elementClientEmail.className = `email${i}`;

    const clientInfo =[ elementClientName, elementClientEmail, elementClientMRR,];

    clientInfo.forEach(info => info.classList.add('clientInfo'));

    elementClientName.textContent = clientObjects[i].name;
    elementClientMRR.textContent = clientObjects[i].mrr;
    elementClientEmail.textContent = clientObjects[i].mail;


for (b = 0; b < liButtons.length; b++){
    buttonsEl.appendChild(liButtons[b]);
}

    for (c =  0; c < clientInfo.length; c++){
newEl.appendChild(clientInfo[c])

    }

    newEl.appendChild(buttonsEl)
}



}

// ------------------ NAV Section ------------------------------ //


//---------------------MAIN-TABS-----------------------//

const mainSections = [...document.querySelectorAll('.main-tab')];

const sectionButtons = [...document.querySelectorAll('.section-button')];


const showSection=(event)=>{
    mainSections.forEach(section =>{
        section.innerHTML = '';
    });

    let sectionId = event.target.dataset.section;

     if(sectionId == 'section1' ){
        loadClients();
        console.log(sectionId)
     }else if(sectionId == 'section2'){
    console.log('load Events ratio')
    console.log(sectionId)
     }else{
        console.log(sectionId)
        console.log('load high risk')
     }
}







sectionButtons.forEach(button =>{
    button.addEventListener('click', showSection);


    });






