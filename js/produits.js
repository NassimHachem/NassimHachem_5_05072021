const recupUrlId = window.location.search;
const urlId = recupUrlId.slice(1);


fetch(`http://localhost:3000/api/teddies/${urlId}`)
    .then(response => response.json())
    .then(data => {

        console.table(data);

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
                                <option>`+ data.colors[0] + `</option>
                                <option>`+ data.colors[1] + `</option>
                                <option>`+ data.colors[2] + `</option>
                                <option>`+ data.colors[3] + `</option>
                            </select>
                        </div>
                    </form>
                    <button href="" id="btn-envoyer-pannier" class="btn btn-secondary" type="submit"> Acheter : ` + data.price / 100 + `,00€</button>
                </div>
            </div>`;
        cardSelected.append(element);




        const btnEnvoyerPanier = document.querySelector('#btn-envoyer-pannier');

        btnEnvoyerPanier.addEventListener('click', (event) => {
            event.preventDefault();

            const idForm = document.querySelector('#couleur_selection');
            const choixForm = idForm.value;

            let optionProduit = {
                nomProduit: data.name,
                couleurProduit: choixForm,
                prix: data.price / 100,
            }
            console.log(optionProduit);

        })





    })
