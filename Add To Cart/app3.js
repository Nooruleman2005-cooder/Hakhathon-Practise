const Products = document.querySelector('.products-list');
const search = document.getElementById('search');
const serachInput = document.getElementById('searchInput');
let allProducts = [];

const getProducts = async () =>{
    try{
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    const first10 = data.products.slice(19, 28);
    console.log(first10);
    allProducts = data.products;
    Products.innerHTML = '';

    
    first10.map((product)=>{
        const productCard = document.createElement('div');
        productCard.classList.add('col-md-4', 'mb-4');
        productCard.innerHTML = `
                <div class="card">
                  <img src="${product.thumbnail}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><small class="text-body-secondary">${product.price}</small></p>
                    <button class="btn btn-outline-primary add-to-cart-btn" 
        data-id="${product.id}" 
        data-title="${product.title}"
        data-price="${product.price}"
        data-image="${product.thumbnail}">
        Add to Cart
      </button>
                  </div>
                </div>`;

              Products.appendChild(productCard);
    })

    }
    catch(err){
        console.log('Fetching Error', err);
    }
     
}

const filterProducts = (serchPro)=>{
  const filtered = allProducts.filter(product=>product.title.toLowerCase().includes(serchPro.toLowerCase()));
  Products.innerHTML = '';
  filtered.map((product)=>{
    const productCard = document.createElement('div');
    productCard.classList.add('col-md-4', 'mb-4');
    productCard.innerHTML = `
            <div class="card">
              <img src="${product.thumbnail}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text"><small class="text-body-secondary">${product.price}</small></p>
                <button class="btn btn-outline-primary add-to-cart-btn" 
        data-id="${product.id}" 
        data-title="${product.title}"
        data-price="${product.price}"
        data-image="${product.thumbnail}">
        Add to Cart
      </button>
              </div>
            </div>`;

          Products.appendChild(productCard);
});

if(filtered.length === 0){
  Products.innerHTML = `<li><p style="text-align:center;">No Products Found 😢</p></li>`;
}

}

search.addEventListener('submit',(e)=>{
  e.preventDefault();
  const searchValue = serachInput.value.trim();
  filterProducts(searchValue);
});

getProducts();

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart-btn')) {
    const btn = e.target;
    const product = {
      id: btn.dataset.id,
      title: btn.dataset.title,
      price: btn.dataset.price,
      image: btn.dataset.image,
      quantity: 0
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const exists = cart.find(item => item.id === product.id);
    if (!exists) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    window.location.href = '../Add To Cart/cart.html';
  }
});
