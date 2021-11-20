let orderId = localStorage.getItem("orderId");
let priceTotal = localStorage.getItem("priceTotal");



//création de positionConfirmation pour ciblé l'endroit ou on va placer le HTML

const positionConfirmation = document.querySelector("#recapCommande");

//Structure de notre HTML
const structureConfiramation =
    `
    <h2>Récapitulatif de votre commande</h2>
    <div class="messageCommande">
        <p>Merci pour votre commande</p>
        <p>Votre commande : <span class="gras" id="numberOrder">${orderId}</span> a bien été traité</p>
        <p>Le montant total est de : <span class="gras" id="priceTotal">${priceTotal}</span>€</p>
        <p>Au plaisir de vous revoir</p>
    </div>
    `;
//Injection du HTML
positionConfirmation.insertAdjacentHTML("afterbegin", structureConfiramation);
//localStorage.clear();





