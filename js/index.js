fetch('http://localhost:3000/api/teddies/')
    .then(response => response.json())
    .then(data => {

        let card = $("#product_card");

        for (let i = 0; data.length > i; i++) {
            let element =
                `<div class="card"><a href="produits.html?${data[i]._id}">
                    <img class="card_img" src="`+ data[i].imageUrl + `" alt="Card image cap"></a>
                    <div class="card-body">
                        <h5 class="card-title">`+ data[i].name + `</h5>
                        <p class="card-text">`+ data[i].description + `</p>
                        <form>
                            <div class="couleur">
                                <label for="couleurSelection">Couleurs</label>
                                <select class="couleur_selection" id="couleur_selection">
                                    <option>`+ data[i].colors[0] + `</option>
                                    <option>`+ data[i].colors[1] + `</option>
                                    <option>`+ data[i].colors[2] + `</option>
                                    <option>`+ data[i].colors[3] + `</option>
                                </select>
                            </div>
                        </form>
                        <a href="produits.html?${data[i]._id}" class="btn btn-secondary"> Acheter : ` + data[i].price / 100 + `,00€</a>
                    </div>
                </div>`;
            card.append(element);
        }

    })
    .catch(error => alert("Erreur : Vérifier l'état du serveur "));

