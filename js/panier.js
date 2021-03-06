let storageProducts = JSON.parse(localStorage.getItem("produits"));
const order = document.querySelector("#table_order");
const panierVide = document.querySelector("#order");
let structureOrder = [];
if (storageProducts) {

    for (k = 0; k < storageProducts.length; k++) {

        structureOrder = structureOrder + `
        
            <tr>
                <td>${storageProducts[k].name}</td>
                <td>${storageProducts[k].color}</td>
                <td>${storageProducts[k].price},00€</td>
                <td>${storageProducts[k].price},00€</td>
            </tr>
    
        `;

    }


    order.innerHTML = structureOrder;

} else {
    panierVide.innerHTML = '<span class="panier_vide">Votre Panier est vide</span>';
}
// création de la variable de calcul du prix total
let priceTotalCalcul = [];

for (let l = 0; l < storageProducts.length; l++) {
    let priceOrder = storageProducts[l].price;
    priceTotalCalcul.push(priceOrder);
}
// calcul des prix et création du prix total
const addition = (accumulator, currentValue) => accumulator + currentValue;
const priceTotal = priceTotalCalcul.reduce(addition);


//on affiche sur notre page le prix total
const priceHtml = document.querySelector('#priceTotal');
priceHtml.innerHTML = `${priceTotal},00€`;
localStorage.setItem("priceTotal", JSON.stringify(priceTotal));


//affichage du formulaire
const affichageForm = () => {

    const positionForm = document.querySelector('#order');

    const structureForm = `
    <form class="row g-3 needs-validation" novalidate>
    <div class="col-md-4">
        <label for="validationCustom01" class="form-label">Nom</label><span id="nomInfosManquante" class="infosManquante"></span>
        <input type="text" class="form-control" id="nom" placeholder="Nom" required>

    </div>
    <div class="col-md-4">
        <label for="validationCustom02" class="form-label">Prénom</label><span id="prenomInfosManquante" class="infosManquante"></span>
        <input type="text" class="form-control" id="prenom" placeholder="Prénom" required>

    </div>
    <div class="col-md-4">
        <label for="validationCustomUsername" class="form-label">email</label><span id="emailInfosManquante" class="infosManquante"></span>
        <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend">@</span>
            <input type="email" placeholder="exemple@exemple.com"
                class="form-control" id="email" aria-describedby="inputGroupPrepend"
                required>

        </div>
    </div>
    <div class="col-md-6">
        <label for="validationCustom03" class="form-label">adresse</label><span id="adresseInfosManquante" class="infosManquante"></span>
        <input type="text" class="form-control" id="adresse" required>

    </div>
    <div class="col-md-3">
        <label for="validationCustom03" class="form-label">Ville</label><span id="villeInfosManquante" class="infosManquante"></span>
        <input type="text" class="form-control" id="ville" placeholder="Ville" required>

    </div>
    

    <div class="col-12">
        <button class="btn btn-secondary btn-send" id="btn-commande" type="submit">Passer la commande</button>
    </div>
</form>
    `;

    positionForm.insertAdjacentHTML('afterend', structureForm);

}

affichageForm();

//création de la varible qu'on va écouter 
const btnCommande = document.querySelector('#btn-commande');

btnCommande.addEventListener('click', (event) => {
    event.preventDefault();

    //récupère les infos du formulaire et les place dans contact
    const contact = {
        lastName: document.querySelector('#nom').value,
        firstName: document.querySelector('#prenom').value,
        email: document.querySelector('#email').value,
        address: document.querySelector('#adresse').value,
        city: document.querySelector('#ville').value,

    };
    //Gestion des regex 

    const regExPrenomNomVille = (value) => {
        return /^[A-Za-z\-çéèêà]{3,20}$/.test(value);
    }
    const regExEmail = (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    }
    const regExAdresse = (value) => {
        return /^[A-Za-z0-9" "]{5,50}$/.test(value);
    }

    function lastNameControl() {
        //Validation du nom
        const leNom = contact.lastName;
        if (regExPrenomNomVille(leNom)) {
            document.querySelector("#nomInfosManquante").textContent = "";
            return true
        } else {
            document.querySelector("#nomInfosManquante").textContent = " Veuillez bien remplir ce champ.";
            return false;
        }

    }
    function firstNameControl() {
        //Validation du prenom
        const lePrenom = contact.firstName;
        if (regExPrenomNomVille(lePrenom)) {
            document.querySelector("#prenomInfosManquante").textContent = "";
            return true
        } else {
            document.querySelector("#prenomInfosManquante").textContent = " Veuillez bien remplir ce champ.";
            return false;
        }

    }
    function emailControl() {
        //Validation de l'email
        const lemail = contact.email;
        if (regExEmail(lemail)) {
            document.querySelector("#emailInfosManquante").textContent = "";
            return true
        } else {
            document.querySelector("#emailInfosManquante").textContent = " Veuillez bien remplir ce champ.";
            return false;
        }

    }
    function addressControl() {
        //Validation de l'adresse
        const ladresse = contact.address;
        if (regExAdresse(ladresse)) {
            document.querySelector("#adresseInfosManquante").textContent = "";
            return true
        } else {
            document.querySelector("#adresseInfosManquante").textContent = " Veuillez bien remplir ce champ.";
            return false;
        }

    }

    function cityControl() {
        //Validation de la ville
        const laVille = contact.city;
        if (regExPrenomNomVille(laVille)) {
            document.querySelector("#villeInfosManquante").textContent = "";
            return true
        } else {
            document.querySelector("#villeInfosManquante").textContent = " Veuillez bien remplir ce champ.";
            return false;
        }

    }




    //condition tout doit être correct avant d'être envoyé dans le localStorage
    if (firstNameControl() && lastNameControl() && cityControl() && emailControl() && addressControl()) {
        //mettre les données du formulaire dans le local storage
        localStorage.setItem("contact", JSON.stringify(contact));
    } else {

    }

    //création de products pour recevoir une réponse du serveur
    let products = [];
    //on push le products dans le localStorage
    products.push;

    //création de aEnvoyer pour regrouper les deux variable à envoyer
    const aEnvoyer = {
        contact, products

    };

    //option va servir dans le fetch pour envoyer les données au serveur et recevoir une reponse 
    const option = {
        method: 'POST',
        body: JSON.stringify(aEnvoyer),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch('http://localhost:3000/api/teddies/order', option)
        .then(res => res.json())
        .then(data => {
            console.table(data);
            console.log(data.orderId);

            //mettre l'id dans le localStorage
            localStorage.setItem('orderId', data.orderId);

            //rediection vers la page confirmation.html
            window.location = "confirmation.html";
        });





})