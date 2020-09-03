function init() {
    fetch("https://kea-alt-del.dk/t5/api/categories").then(r => r.json()).then(
        function (data) {
            categoriesReceived(data)
        })
}

init();

function categoriesReceived(cats) {
    //createNavigation(cats);
    createSections(cats);
    fetchProducts();
}

function createSections(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        section.setAttribute("id", category);
        const h1 = document.createElement("h1");
        h1.textContent = category;
        section.appendChild(h1);
        document.querySelector(".productlist").appendChild(section);
    })
}

function fetchProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            dataReceived(data);
        })

    function dataReceived(products) {
        //loop through products
        products.forEach(showProduct);
    }
}

//executed once for each product
function showProduct(myProduct) {
    console.log(myProduct);
    //finding the template
    const temp = document.querySelector("#productTemplate").content;
    //clone the template
    const myCopy = temp.cloneNode(true);

    //img
    const img = myCopy.querySelector(".product_img");
    img.setAttribute("src", `https://kea-alt-del.dk/t5/site/imgs/small/${myProduct.image}-sm.jpg`);
    //fill in the template
    myCopy.querySelector(".name").textContent = myProduct.name;
    myCopy.querySelector(".prize").textContent = myProduct.price + " dkk";
    myCopy.querySelector(".short").textContent = myProduct.shortdescription;
    myCopy.querySelector(".alcohol").textContent = myProduct.alcohol + "%";
    myCopy.querySelector(".discount").textContent = myProduct.discount + "% off";
    myCopy.querySelector(".laktose").textContent = myProduct.laktose;


    //vegetarian
    if (myProduct.vegetarian) {
        myCopy.querySelector(".vegetarian").classList.remove("hidden");
    }

    //discount
    if (myProduct.discount) {
        myCopy.querySelector(".discount").classList.remove("hidden");
    }

    //alcohol
    if (myProduct.alcohol) {
        myCopy.querySelector(".alcohol").classList.remove("hidden");
    }

    //soldout
    if (myProduct.soldout) {
        const p = document.createElement("p");
        p.textContent = "Sold Out";
        p.classList.add("soldout");
        myCopy.querySelector("article").appendChild(p);
    }

    const article = myCopy.querySelector("article");

    if (myProduct.vegetarian) {
        article.classList.add("vegetarian");
    }

    if (myProduct.laktose) {
        article.classList.add("laktose");
    }

    if (myProduct.alcohol) {
        article.classList.add("alcohol");
    }


    //append
    const parentElem = document.querySelector("section#" + myProduct.category);
    parentElem.appendChild(myCopy);
}

const modal = document.querySelector(".modal-background");
//once we have our data, ....
function showDetails(data) {
  console.log(data)
  modal.querySelector(".modal-name").textContent = data.name;
  modal.querySelector(".modal-description").textContent = data.longdescription;
    modal.querySelector(".modal-prize").textContent = data.prize;
  modal.classList.remove("hide");
}


//close the modal when clicked

modal.addEventListener("click", () => {
  modal.classList.add("hide");
});
