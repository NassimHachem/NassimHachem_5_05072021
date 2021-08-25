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
                    <p class="card-text">`+ data.description + `</p>
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
                    <a href="#" class="btn btn-secondary"> Acheter : ` + data.price / 100 + `,00€</a>
                </div>
            </div>`;

        cardSelected.append(element);
    })
