const recupUrlId = window.location.search;
const urlId = recupUrlId.slice(1);


fetch(`http://localhost:3000/api/teddies/${urlId}`)
    .then(response => response.json())
    .then(data => {



        let cardSelected = $("#product_card_selected");

        let element =
            `<div class="card">
                <img class="card_img" src="`+ data.imageUrl + `" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">`+ data.name + `</h5>
                    <p id="card-text" class="card-text">`+ data.description + `</p>
                    <form>
                        <div class="couleur">
                            <label for="couleurSelection">Couleurs</label>
                            <select class="couleur_selection" id="couleur_selection">
                                
                            </select>
                        </div>
                    </form>
                    <button href="" id="btn-envoyer-panier" class="btn btn-secondary" type="submit" name="Ajouter-au-panier"> Acheter : ` + data.price / 100 + `,00€</button>
                </div>
            </div>`;



        cardSelected.append(element);

        //---------- Récupère le nombre de couleur------------------------- 
        const colorsQty = data.colors;
        let structureColors = [];


        for (let j = 0; j < colorsQty.length; j++) {
            structureColors = structureColors +
                `
                    <option>${colorsQty[j]}</option>
            `;

        }
        const positionColors = document.querySelector("#couleur_selection");
        positionColors.innerHTML = structureColors;






        //-------Récupère les données au click------------

        const btnEnvoyerPanier = document.querySelector('#btn-envoyer-panier');

        btnEnvoyerPanier.addEventListener('click', (event) => {
            event.preventDefault();

            const idForm = document.querySelector('#couleur_selection');
            const choixForm = idForm.value;

            let optionProduit = {
                id: data._id,
                name: data.name,
                color: choixForm,
                price: data.price / 100,
                quantity: 1,
            }


            //--------------------LocalStorage--------------------
            let storageproducts = JSON.parse(localStorage.getItem("produits"));

            const popupConfirmation = () => {
                if (window.confirm(`${data.name} ${choixForm} a bien été ajouté au panier. 
Consulter le panier : " OK ", ou revenir à l'accueil : " ANNULER "`)) {
                    window.location.href = "panier.html";
                } else {
                    window.location.href = "index.html";
                }
            }

            //on vérifie si il ya déjà des produits dans le localstorage
            if (storageproducts) {
                storageproducts.push(optionProduit);
                localStorage.setItem("produits", JSON.stringify(storageproducts));

                popupConfirmation();
            } else {
                storageproducts = [];
                storageproducts.push(optionProduit);
                localStorage.setItem("produits", JSON.stringify(storageproducts));

                popupConfirmation();
            }

        })















    })
