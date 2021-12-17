import './style.css'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

let app = document.querySelector('#app');

let { data } = await supabase
    .from('items')
    .select('*')

console.log(data)

// C'est noël, pas de chrono, pas de pression et de l'entraide afin de réaliser les étapes ci-dessous :

// Step 1 :
//
// Afficher un paragraphe dans app avec "Hello world" comme contenu à l'aide de innerHTML 

// Step 2 :
//
// Remplacer "Hello world" par le nombre de produits que vous récupérez depuis data, exemple : <p>Il y a 3 produits en base de donnée</p>

// Step 3 :
//
// Ajouter un produit depuis supabase et vérifier que le décompte est mis à jour

// Step 4 :
//
// Gérer le pluriel : (Il y a 1 produit => Il y a 2 produits)

// Step 5 :
//
// Ajouter le nom de chaque item dans app 
// Attention il ne faudra pas perdre le nombre de produits
//
// Pour cela vous aurez besoin de :
// - tableau data
// - innerHTML
// - une boucle au choix
//
// Vous pouvez vous aider du code ci-dessous :

// let people = [
//   {firstName: "john", lastName: "doe"}, 
//   {firstName: "janette", lastName: "doe"}
// ]

// people.forEach(function (person) {
//   console.log(person.firstName)
// })

// Step 6 :
//
// Ajouter un peu de fun avec un style de noël

// Step 7 :
//
// Dans la boucle du step 5, ajouter un bouton (+) pour chaque item, qui déclenche une alerte contenant le prix lors du clic 
// Pour cela vous aurez besoin de addEventListener

// Step 8 : 
//
// Créer une variable somme qui s'initialise à 0
//
// modifier le addEventListener pour qu'à chaque clic, la somme s'incrémente de la valeur du prix de l'item.
//
// En haut de la page afficher un icone de panier avec la valeur de la somme

// Bravo vous pouvez prendre un screenshot de votre application et donner des idées à vos proches :p

// Pour celles et ceux arrivés jusque ici, quelques idées pour aller plus loin :

// Ajouter un formulaire qui permet d'ajouter un nouveau produit à la liste (voir API DOCS)
// Ajouter un bouton de suppression de l'item (addEvenListener + API DOCS)
// Ajouter un champ image dans supabase qui contient l'url d'une image de l'item et l'afficher sur la partie front

// N'hésitez pas à tester toute autre bonne idée !

let totalBasket = 0;
let basket = document.createElement("div");
basket.id = "basket";
basket.innerText = `Mon panier: ${totalBasket}€`;

app.innerHTML = `<p>Il y a ${data.length} produit${data.length > 1 ? 's' : ''} en base de donnée</p>`

for(const ITEM of data){
    let article = document.createElement("article");
    let btnDelete = document.createElement("button");
    btnDelete.classList = "btnDelete hide";
    btnDelete.innerText = "X";
    article.addEventListener("pointerenter", function(){
        btnDelete.classList.toggle("hide");
    });
    article.addEventListener("pointerleave", function(){
        btnDelete.classList.toggle("hide");
    });
    btnDelete.addEventListener("click", () => deleteArticle(ITEM.id));
    
    let articleName = document.createElement("h3");
    articleName.innerText = ITEM.name;
    
    let button = document.createElement("button");
    button.classList = "btnAddBasket";
    button.innerText = "Ajouter au panier";
    button.addEventListener("click", () => addToBasket(ITEM));

    article.appendChild(articleName);
    article.appendChild(btnDelete);
    article.appendChild(button);

    app.appendChild(article);
}

app.prepend(basket);

function addToBasket(item){
    totalBasket += item.price;
    basket.innerText = `Mon panier: ${totalBasket}€`;
}


// Form to add article
let form = document.createElement('div');
form.id = "form";
let labelName = document.createElement('label');
labelName.setAttribute('for', 'labelName');
labelName.innerText = "Nom du produit";
let inputName = document.createElement('input');
inputName.id = "labelName";
let labelPrice = document.createElement('label');
labelPrice.setAttribute('for', 'labelPrice');
labelPrice.innerText = "Prix du produit";
let inputPrice = document.createElement('input');
inputPrice.id = "labelPrice";
let submit = document.createElement("button");
submit.innerText = "Ajouter un article";
submit.addEventListener("click", () =>  addArticle(inputName.value, inputPrice.value));

form.appendChild(labelName);
form.appendChild(inputName);
form.appendChild(labelPrice);
form.appendChild(inputPrice);
form.appendChild(submit);
app.insertBefore(form, document.querySelector('p'));

async function addArticle(name, price){
    let {data, error} = await supabase.from('items').insert([
        { name: name, price: price },
    ]);

    location.reload();
}

async function deleteArticle(id){
    let {data, error} = await supabase.from('items').delete().eq('id', id);

    location.reload();
}