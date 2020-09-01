//fetch API
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
    //append
    const parentElem = document.querySelector("section#main");
    parentElem.appendChild(myCopy);
}









