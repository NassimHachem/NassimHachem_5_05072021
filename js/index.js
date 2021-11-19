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
                        <a class="btn btn-secondary" href="produits.html?${data[i]._id}"> Acheter : ` + data[i].price / 100 + `,00€<a/>
                    </div>
                </div>`;
            card.append(element);
        }


    })
    .catch(error => alert("Erreur : Vérifier l'état du serveur "));

