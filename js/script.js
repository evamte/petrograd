function init() {
    fetch("https://kea-alt-del.dk/t5/api/categories").then(r=> r.json()).then(
    function (data) {
        categoriesReceived(data)
    })
}

init();

function categoriesReceived (cats) {
    //createNavigation(cats);
    createSections(cats);
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
//fetch Products
fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response){
    console.log(response);
    return response.json();
})
    .then(function (data){
    dataReceived(data);
})

function dataReceived(products) {
    //loop through products
    products.forEach(showProduct);
}

//executed once for each product
function showProduct(myProduct) {
    console.log(myProduct);
    //finding the template
    const temp = document.querySelector("#productTemplate").content;
    //clone the template
    const myCopy = temp.cloneNode(true);
    //fill in the template
    myCopy.querySelector(".name").textContent = myProduct.name;
    const parentElem = document.querySelector("section#" + myProduct.category);
    //append
    parentElem.appendChild(myCopy);
    }













