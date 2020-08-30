fetch("https://kea-alt-del.dk/t5/api/")
    .then(function(response){
    console.log(response);
    return response.json();
})
    .then(function(data){
    console.log(data);
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
    myCopy.querySelector(".data_name").textContent = myProduct.name;
    //append
    const parentElement = document.querySelector("section#main");
    parentElement.appendChild(myCopy);
}

