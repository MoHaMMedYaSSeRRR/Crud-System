var productName = document.getElementById('ProductNameInput')
var productPrice = document.getElementById('ProductPriceInput')
var productCategory = document.getElementById('ProductCategortInput')
var productDescription = document.getElementById('ProductDescriptionInput')
var updateBtn = document.getElementById('updateBtn')
var addBtn = document.getElementById('addBtn')
var wrongMessage=document.getElementById('alertMessage')
var tmp;

var productsContainer;

if (localStorage.getItem('myProducts') != null) {
    productsContainer = JSON.parse(localStorage.getItem('myProducts'))
    displayProduct(productsContainer)
}
else {
    productsContainer = []
}

function addProduct() {
    if(validateProductName() ==true)
    {
        var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDescription.value
    }
    productsContainer.push(product)
    localStorage.setItem('myProducts', JSON.stringify(productsContainer))
    clearform()
    displayProduct(productsContainer)
    }
    
    
}


function displayProduct(productList) {
    var cartoona = ``
    for (var i = 0; i < productList.length; i++) {
        cartoona += ` <tr>
        <td>`+ i + `</td>
            <td>`+ productList[i].name + `</td>
            <td>`+ productList[i].price + `</td>
            <td>`+ productList[i].category + `</td>
            <td>`+ productList[i].desc + `</td>
            <td><button onclick='setFormToUpdate(${i})' class="btn btn-outline-warning btn-sm ">Update</button></td>
            <td><button onclick='deleteProducts(${i})' class="btn btn-outline-danger btn-sm ">Delete</button></td>
      </tr>  `
    }
    document.getElementById('tableBody').innerHTML = cartoona;
}

function clearform() {
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDescription.value = ''
}


function searchProduct(searchTerm) {
    var searchResult = [];
    for (let i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
            searchResult.push(productsContainer[i])
        }

    }
    displayProduct(searchResult)
}

function deleteProducts(deletedIndex) {
    productsContainer.splice(deletedIndex, 1)
    localStorage.setItem('myProducts', JSON.stringify(productsContainer))
    displayProduct(productsContainer)
}

function setFormToUpdate(updatedIndex) {
    productName.value = productsContainer[updatedIndex].name
    productPrice.value = productsContainer[updatedIndex].price
    productCategory.value = productsContainer[updatedIndex].category
    productDescription.value = productsContainer[updatedIndex].desc
    tmp = updatedIndex
    updateBtn.classList.replace('d-none', 'd-inlineblock')
    addBtn.classList.add('d-none')
}
function onUpdate() {
    productsContainer[tmp].name = productName.value
    productsContainer[tmp].price = productPrice.value
    productsContainer[tmp].category = productCategory.value
    productsContainer[tmp].desc = productDescription.value

    displayProduct(productsContainer)
     clearform()
     addBtn.classList.replace('d-none', 'd-inlineblock')
     updateBtn.classList.add('d-none')
}

function validateProductName(){
    var regex =/^[A-Z][a-z]{3,8}$/;
    if(regex.test(productName.value)==true ){
        productName.classList.replace('is-invalid', 'is-valid')
        
        wrongMessage.classList.add('d-none')

        return true ;
    }
    else {
        productName.classList.add('is-invalid')
        wrongMessage.classList.replace('d-none', 'd-block' )
 
        return false ;
    }
    

}