


const search = () =>{
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("pro-container")
    const product = document.querySelectorAll(".pro")
    const pname = document.getElementsByTagName("h5")

    for(var i = 0; i < pname.length; i++){
        let match = product[i].getElementsByTagName('h5')[0];

        if(match){
           let textvalue = match.textContent || match.innerHTML

           if(textvalue.toUpperCase().indexOf(searchbox) > -1){
                product[i].style.display = "";  
           }
           else{
            product[i].style.display = "none";
           }
        }
    }
}

/*const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () =>{
        select.classList.toggle('select-clicked');
        select.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () =>{
            selected.innerText = option.innerText;

            select.classList.remove('select-clicked');
            select.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');

            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
});
 <form>
        <div class="dropdown">
            <div class="select">
                <span class="select">Filtrare</span>
                <div class="caret"></div>
            </div>
            <ul class="menu">
                <li class="active">Toate produsele</li>
                <li>Cercei</li>
                <li>Altele</li>
            </ul>
        </div>

    </form>

*/

let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

cartIcon.onclick = () =>{
    cart.classList.add("active");

}
closeCart.onclick = () =>{
    cart.classList.remove("active");
    
}

if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
} else{
    ready();
}

function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for(var i  = 0; i< removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for(var i  = 0; i< quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }
    var addCart = document.getElementsByClassName('add-cart')
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked)
    }
    document
        .getElementsByClassName('btn-buy')[0]
        .addEventListener('click', buyButtonClicked)

    function buyButtonClicked(){
        alert('Comanda ta a fost procesata')
        var cartContent = document.getElementsByClassName('cart-content')[0]
        while(cartContent.hasChildNodes()){
            cartContent.removeChild(cartContent.firstChild)
        }
        updatetotal();
    }

}

function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText
    var price = shopProducts.getElementsByClassName('price')[0].innerText
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src
    console.log(title, price, productImg);
    addProductToCart(title, price, productImg);
    updatetotal();

}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div")
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName("cart-content")[0]
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title")
    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
        alert("Deja ai acest produs in cosul de cumparaturi")
        return;
        }
    }
    


var cartBoxContent = '<img src="img/poza1.png" alt="" class="cart-img"> <div class="detail-box"> <div class="cart-product-title">Ochi de dragon</div><div class="cart-price">30RON</div><input type="number" value="1" class="cart-quantity"></div><i class="fa-solid fa-trash cart-remove"></i>'
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0]
            .addEventListener('click', removeCartItem )
cartShopBox.getElementsByClassName('cart-quantity')[0]
            .addEventListener('change', quantityChanged )
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove()
    updatetotal();

}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updatetotal();
}

function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0]
    var cartBoxes = cartContent.getElementsByClassName("cart-box")
    var total=0;
    for(var i  = 0; i  < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0]
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
        var price = parseFloat(priceElement.innerText.replace("RON", ""));
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
        document.getElementsByClassName('total-price')[0].innerText = total + "RON"

    
}

