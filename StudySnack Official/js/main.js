let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector(".cart")
let closeCart = document.querySelector("#close-cart")

cartIcon.onclick = () =>{
    cart.classList.add("active")
}

closeCart.onclick = () =>{
    cart.classList.remove("active")
}


if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else{
    ready()
}

function ready(){
    var removeCartButtons = document.getElementsByClassName("cart-remove")
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem)
    }
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
}


// ...existing code...


// Update: When cart item is removed, set total price to 0
document.addEventListener('DOMContentLoaded', () => {
    const cartRemoveBtn = document.querySelector('.cart-remove');
    const totalPriceElement = document.querySelector('.total-price');

    if (cartRemoveBtn) {
        cartRemoveBtn.addEventListener('click', () => {
            totalPriceElement.textContent = '0k';
        });
    }
});

// ...existing code...

// ...existing code...

document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-bar');
  const clearBtn = document.getElementById('clear-search');
  const shopContent = document.querySelector('.shop-content');
  const productBoxes = shopContent.querySelectorAll('.product-box');

  function filterProducts() {
    const query = searchBar.value.trim().toLowerCase();
    let anyVisible = false;
    productBoxes.forEach(box => {
      const title = box.querySelector('.product-title').textContent.toLowerCase();
      if (title.includes(query)) {
        box.style.display = '';
        anyVisible = true;
      } else {
        box.style.display = 'none';
      }
    });
    clearBtn.style.display = query ? 'flex' : 'none';
  }

  searchBar.addEventListener('input', filterProducts);

  clearBtn.addEventListener('click', () => {
    searchBar.value = '';
    filterProducts();
  });

  // Show all products on page load
  filterProducts();
});

// ...existing code...

// ...existing code...

document.addEventListener('DOMContentLoaded', () => {
    const cartContent = document.querySelector('.cart-content');
    const totalPriceElement = document.querySelector('.total-price');
    const eraseAllBtn = document.querySelector('.btn-buy');

    if (eraseAllBtn) {
        eraseAllBtn.addEventListener('click', () => {
            // Custom confirmation dialog
            const confirmBox = document.createElement('div');
            confirmBox.style.position = 'fixed';
            confirmBox.style.top = '0';
            confirmBox.style.left = '0';
            confirmBox.style.width = '100vw';
            confirmBox.style.height = '100vh';
            confirmBox.style.background = 'rgba(0,0,0,0.3)';
            confirmBox.style.display = 'flex';
            confirmBox.style.alignItems = 'center';
            confirmBox.style.justifyContent = 'center';
            confirmBox.style.zIndex = '99999';

            confirmBox.innerHTML = `
                <div style="background:#fff;padding:24px 20px;border-radius:16px;box-shadow:0 2px 16px rgba(0,0,0,0.15);text-align:center;max-width:90vw;">
                    <div style="font-size:1.1rem;margin-bottom:18px;">Bạn có chắc muốn xóa hết ?</div>
                    <button id="confirm-erase" style="margin:0 8px 0 0;padding:8px 18px;background:#ff6600;color:#fff;border:none;border-radius:8px;cursor:pointer;">Xóa hết</button>
                    <button id="cancel-erase" style="padding:8px 18px;background:#eee;color:#333;border:none;border-radius:8px;cursor:pointer;">Hủy</button>
                </div>
            `;

            document.body.appendChild(confirmBox);

            document.getElementById('confirm-erase').onclick = () => {
                // Remove all cart-box elements
                const cartBoxes = cartContent.querySelectorAll('.cart-box');
                cartBoxes.forEach(cartBox => cartBox.remove());
                totalPriceElement.textContent = '0k';
                document.body.removeChild(confirmBox);
            };

            document.getElementById('cancel-erase').onclick = () => {
                document.body.removeChild(confirmBox);
            };
        });
    }
});

// ...existing code...


// ...existing code...

document.addEventListener('DOMContentLoaded', () => {
  const navBtns = document.querySelectorAll('.bottom-nav .nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Show/hide sections (example logic)
      if (btn.dataset.section === 'home') {
        document.getElementById('main')?.scrollIntoView({behavior: 'smooth'});
      } else if (btn.dataset.section === 'food') {
        document.querySelector('.shop')?.scrollIntoView({behavior: 'smooth'});
      } else if (btn.dataset.section === 'drink') {
        // If you have a drink section, scroll to it
        document.getElementById('drink-section')?.scrollIntoView({behavior: 'smooth'});
      }
    });
  });
});

// ...existing code...

// ...existing code...

document.addEventListener('DOMContentLoaded', () => {
  const navBtns = document.querySelectorAll('.bottom-nav .nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      navBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

// ...existing code...



// ...existing code...

// --- Cart Persistence with localStorage ---
function getCartData() {
    return JSON.parse(localStorage.getItem('studysnack_cart') || '[]');
}

function setCartData(cartData) {
    localStorage.setItem('studysnack_cart', JSON.stringify(cartData));
}

function saveCartToStorage() {
    const cartContent = document.querySelector('.cart-content');
    if (!cartContent) return;
    const cartBoxes = cartContent.querySelectorAll('.cart-box');
    const cartData = [];
    cartBoxes.forEach(cartBox => {
        const imgSrc = cartBox.querySelector('.cart-img')?.getAttribute('src');
        const product = cartBox.querySelector('.cart-product')?.textContent;
        const price = cartBox.querySelector('.cart-price')?.textContent;
        const quantity = cartBox.querySelector('.cart-quantity')?.value;
        // Get names
        const names = [];
        cartBox.querySelectorAll('.cart-name-text').forEach(nameEl => {
            names.push(nameEl.textContent);
        });
        cartData.push({ imgSrc, product, price, quantity, names });
    });
    setCartData(cartData);
}

function loadCartFromStorage() {
    const cartContent = document.querySelector('.cart-content');
    const totalPriceElement = document.querySelector('.total-price');
    if (!cartContent) return;
    cartContent.innerHTML = '';
    const cartData = getCartData();
    cartData.forEach(item => {
        const cartBox = document.createElement('div');
        cartBox.classList.add('cart-box');
        cartBox.innerHTML = `
            <img src="${item.imgSrc}" alt="" class="cart-img">
            <div class="detail-box">
              <div class="cart-product">${item.product}</div>
              <div class="cart-price">${item.price}</div>
              <div class="cart-box">
                <button class="decrease-btn">−</button>
                <input class="cart-quantity" type="number" min="0" inputmode="numeric" pattern="[0-9]*" value="${item.quantity}">
                <button class="add-btn">+</button>
              </div>
              <div class="cart-names-section">
                <div class="cart-names-list"></div>
                <div class="cart-names-input-row">
                  <input type="text" class="cart-name-input" placeholder="Tên...">
                  <button class="cart-name-add-btn">Thêm</button>
                </div>
              </div>
            </div>
            <i class='bx bx-trash cart-remove'></i>
        `;
        cartContent.appendChild(cartBox);

        // Restore names
        const namesList = cartBox.querySelector('.cart-names-list');
        item.names.forEach(nameValue => {
            const nameTag = document.createElement('span');
            nameTag.className = 'cart-name-tag';
            nameTag.innerHTML = `
                <span class="cart-name-text">${nameValue}</span>
                <button class="cart-name-edit-btn">chỉnh sửa</button>
            `;
            namesList.appendChild(nameTag);

            // Edit button logic
            const editBtn = nameTag.querySelector('.cart-name-edit-btn');
            const nameInput = cartBox.querySelector('.cart-name-input');
            editBtn.addEventListener('click', () => {
                nameInput.value = nameValue;
                namesList.removeChild(nameTag);
                let quantity = parseInt(cartBox.querySelector('.cart-quantity').value) || 0;
                cartBox.querySelector('.cart-quantity').value = Math.max(0, quantity - 1);
                updateCartTotal();
                saveCartToStorage();
                nameInput.focus();
            });
        });

        // Quantity and button logic
        const quantityInput = cartBox.querySelector('.cart-quantity');
        const addBtn = cartBox.querySelector('.add-btn');
        const decreaseBtn = cartBox.querySelector('.decrease-btn');
        const removeBtn = cartBox.querySelector('.cart-remove');
        const nameInput = cartBox.querySelector('.cart-name-input');
        const nameAddBtn = cartBox.querySelector('.cart-name-add-btn');

        function updateCartTotal() {
            let total = 0;
            document.querySelectorAll('.cart-box').forEach(box => {
                const priceElement = box.querySelector('.cart-price');
                const quantityInput = box.querySelector('.cart-quantity');
                if (priceElement && quantityInput) {
                    const pricePerItem = parseFloat(priceElement.textContent.replace('k', '').replace('K', '')) * 1000;
                    const quantity = parseInt(quantityInput.value) || 0;
                    total += pricePerItem * quantity;
                }
            });
            if (totalPriceElement) totalPriceElement.textContent = `${total / 1000}k`;
            saveCartToStorage();
        }

        quantityInput.addEventListener('change', updateCartTotal);
        quantityInput.addEventListener('input', updateCartTotal);

        addBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value) || 0;
            quantityInput.value = quantity + 1;
            updateCartTotal();
        });

        decreaseBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value) || 0;
            quantityInput.value = Math.max(0, quantity - 1);
            updateCartTotal();
        });

        removeBtn.addEventListener('click', () => {
            cartBox.remove();
            updateCartTotal();
            saveCartToStorage();
        });

        nameAddBtn.addEventListener('click', () => {
            const nameValue = nameInput.value.trim();
            if (nameValue) {
                const nameTag = document.createElement('span');
                nameTag.className = 'cart-name-tag';
                nameTag.innerHTML = `
                    <span class="cart-name-text">${nameValue}</span>
                    <button class="cart-name-edit-btn">chỉnh sửa</button>
                `;
                namesList.appendChild(nameTag);
                nameInput.value = '';
                let quantity = parseInt(quantityInput.value) || 0;
                quantityInput.value = quantity + 1;
                updateCartTotal();
                saveCartToStorage();

                // Edit button logic
                const editBtn = nameTag.querySelector('.cart-name-edit-btn');
                editBtn.addEventListener('click', () => {
                    nameInput.value = nameValue;
                    namesList.removeChild(nameTag);
                    let quantity = parseInt(quantityInput.value) || 0;
                    quantityInput.value = Math.max(0, quantity - 1);
                    updateCartTotal();
                    saveCartToStorage();
                    nameInput.focus();
                });
            }
        });

        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                nameAddBtn.click();
            }
        });

        // Initial total price update
        updateCartTotal();
    });
}

// Call loadCartFromStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
});

// ...existing code...

document.addEventListener('DOMContentLoaded', () => {
    const cartContent = document.querySelector('.cart-content');
    const productBoxes = document.querySelectorAll('.product-box');
    const totalPriceElement = document.querySelector('.total-price');

    function updateCartTotal() {
        let total = 0;
        const cartBoxes = cartContent.querySelectorAll('.cart-box');
        cartBoxes.forEach(cartBox => {
            const priceElement = cartBox.querySelector('.cart-price');
            const quantityInput = cartBox.querySelector('.cart-quantity');
            if (priceElement && quantityInput) {
                const pricePerItem = parseFloat(priceElement.textContent.replace('k', '').replace('K', '')) * 1000;
                const quantity = parseInt(quantityInput.value) || 0;
                total += pricePerItem * quantity;
            }
        });
        totalPriceElement.textContent = `${total / 1000}k`;
        saveCartToStorage();
    }

    productBoxes.forEach(productBox => {
        const addCartBtn = productBox.querySelector('.add-cart');
        addCartBtn.addEventListener('click', () => {
            // Get product info
            const imgSrc = productBox.querySelector('.product-img').getAttribute('src');
            const titleText = productBox.querySelector('.product-title').textContent;
            const priceText = productBox.querySelector('.price').textContent;

            // Prevent duplicate items in cart
            const cartProducts = cartContent.querySelectorAll('.cart-product');
            for (let i = 0; i < cartProducts.length; i++) {
                if (cartProducts[i].textContent.trim() === titleText.split('(')[0].trim()) {
                    alert('Sản phẩm đã có trong giỏ hàng!');
                    return;
                }
            }

            // Create cart-box element
            const cartBox = document.createElement('div');
            cartBox.classList.add('cart-box');
            cartBox.innerHTML = `
                <img src="${imgSrc}" alt="" class="cart-img">
                <div class="detail-box">
                  <div class="cart-product">
                    ${titleText.split('(')[0].trim()}
                  </div>
                  <div class="cart-price">
                    ${priceText}
                  </div>
                  <div class="cart-box">
                    <button class="decrease-btn">−</button>
                    <input class="cart-quantity" type="number" min="0" inputmode="numeric" pattern="[0-9]*" value="0">
                    <button class="add-btn">+</button>
                  </div>
                  <div class="cart-names-section">
                    <div class="cart-names-list"></div>
                    <div class="cart-names-input-row">
                      <input type="text" class="cart-name-input" placeholder="Tên...">
                      <button class="cart-name-add-btn">Thêm</button>
                    </div>
                  </div>
                </div>
                <i class='bx bx-trash cart-remove'></i>
            `;

            cartContent.appendChild(cartBox);

            // Add event listeners for quantity and remove
            const quantityInput = cartBox.querySelector('.cart-quantity');
            const addBtn = cartBox.querySelector('.add-btn');
            const decreaseBtn = cartBox.querySelector('.decrease-btn');
            const removeBtn = cartBox.querySelector('.cart-remove');

            // Mobile-friendly input attributes
            if (quantityInput) {
                quantityInput.setAttribute('inputmode', 'numeric');
                quantityInput.setAttribute('pattern', '[0-9]*');
                quantityInput.setAttribute('min', '1');
                quantityInput.setAttribute('type', 'number');
            }

            function updateTotalPriceAndCart() {
                updateCartTotal();
            }

            quantityInput.addEventListener('change', updateTotalPriceAndCart);

            quantityInput.addEventListener('input', () => {
                let quantity = parseInt(quantityInput.value);
                if (!quantity || quantity < 0) {
                    quantityInput.value = '';
                }
                updateTotalPriceAndCart();
            });

            addBtn.addEventListener('click', () => {
                let quantity = parseInt(quantityInput.value) || 0;
                quantityInput.value = quantity + 1;
                updateTotalPriceAndCart();
            });

            decreaseBtn.addEventListener('click', () => {
                let quantity = parseInt(quantityInput.value) || 0;
                if (quantity > 0) {
                    quantityInput.value = quantity - 1;
                } else {
                    quantityInput.value = 1;
                }
                updateTotalPriceAndCart();
            });

            // Remove item from cart
            removeBtn.addEventListener('click', () => {
                cartBox.remove();
                updateCartTotal();
            });

            // Names logic for each cart-box
            const namesList = cartBox.querySelector('.cart-names-list');
            const nameInput = cartBox.querySelector('.cart-name-input');
            const nameAddBtn = cartBox.querySelector('.cart-name-add-btn');

            nameAddBtn.addEventListener('click', () => {
                const nameValue = nameInput.value.trim();
                if (nameValue) {
                    const nameTag = document.createElement('span');
                    nameTag.className = 'cart-name-tag';
                    nameTag.innerHTML = `
                        <span class="cart-name-text">${nameValue}</span>
                        <button class="cart-name-edit-btn">chỉnh sửa</button>
                    `;
                    namesList.appendChild(nameTag);
                    nameInput.value = '';

                    // Increase quantity when adding a name
                    let quantity = parseInt(quantityInput.value) || 0;
                    quantityInput.value = quantity + 1;
                    updateTotalPriceAndCart();

                    // Edit button logic
                    const editBtn = nameTag.querySelector('.cart-name-edit-btn');
                    editBtn.addEventListener('click', () => {
                        const currentText = nameTag.querySelector('.cart-name-text').textContent;
                        nameInput.value = currentText;
                        namesList.removeChild(nameTag);
                        // Decrease quantity when removing a name for edit
                        let quantity = parseInt(quantityInput.value) || 0;
                        quantityInput.value = Math.max(0, quantity - 1);
                        updateTotalPriceAndCart();
                        nameInput.focus();
                    });
                }
            });

            // Allow Enter key to add name
            nameInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    nameAddBtn.click();
                }
            });

            // Initial total price update
            updateCartTotal();
        });
    });
});

// ...existing code...


function loadCartFromStorage() {
    const cartContent = document.querySelector('.cart-content');
    const totalPriceElement = document.querySelector('.total-price');
    if (!cartContent) return;
    cartContent.innerHTML = '';
    const cartData = getCartData();
    cartData.forEach(item => {
        // Only render if product and image are not empty
        if (!item.product || !item.imgSrc) return;

        const imgSrc = item.imgSrc;
        const product = item.product;
        const price = item.price || '';
        const quantity = item.quantity && !isNaN(item.quantity) ? item.quantity : '0';
        const names = Array.isArray(item.names) ? item.names.filter(n => n && n.trim()) : [];

        const cartBox = document.createElement('div');
        cartBox.classList.add('cart-box');
        cartBox.innerHTML = `
            <img src="${imgSrc}" alt="" class="cart-img">
            <div class="detail-box">
              <div class="cart-product">${product}</div>
              <div class="cart-price">${price}</div>
              <div class="cart-box">
                <button class="decrease-btn">−</button>
                <input class="cart-quantity" type="number" min="0" inputmode="numeric" pattern="[0-9]*" value="${quantity}">
                <button class="add-btn">+</button>
              </div>
              <div class="cart-names-section">
                <div class="cart-names-list"></div>
                <div class="cart-names-input-row">
                  <input type="text" class="cart-name-input" placeholder="Tên...">
                  <button class="cart-name-add-btn">Thêm</button>
                </div>
              </div>
            </div>
            <i class='bx bx-trash cart-remove'></i>
        `;
        cartContent.appendChild(cartBox);

        // Restore names
        const namesList = cartBox.querySelector('.cart-names-list');
        names.forEach(nameValue => {
            if (!nameValue || !nameValue.trim()) return;
            const nameTag = document.createElement('span');
            nameTag.className = 'cart-name-tag';
            nameTag.innerHTML = `
                <span class="cart-name-text">${nameValue}</span>
                <button class="cart-name-edit-btn">chỉnh sửa</button>
            `;
            namesList.appendChild(nameTag);

            // Edit button logic
            const editBtn = nameTag.querySelector('.cart-name-edit-btn');
            const nameInput = cartBox.querySelector('.cart-name-input');
            editBtn.addEventListener('click', () => {
                nameInput.value = nameValue;
                namesList.removeChild(nameTag);
                let quantity = parseInt(cartBox.querySelector('.cart-quantity').value) || 0;
                cartBox.querySelector('.cart-quantity').value = Math.max(0, quantity - 1);
                updateCartTotal();
                saveCartToStorage();
                nameInput.focus();
            });
        });

        // ...rest of your cart logic...
    });
}

// ...existing code...

function getCartData() {
    // Only return valid items
    const data = JSON.parse(localStorage.getItem('studysnack_cart') || '[]');
    return Array.isArray(data)
        ? data.filter(item => item && item.product && item.imgSrc)
        : [];
}

function setCartData(cartData) {
    localStorage.setItem('studysnack_cart', JSON.stringify(cartData));
}

function saveCartToStorage() {
    const cartContent = document.querySelector('.cart-content');
    if (!cartContent) return;
    const cartBoxes = cartContent.querySelectorAll('.cart-box');
    const cartData = [];
    cartBoxes.forEach(cartBox => {
        const imgSrc = cartBox.querySelector('.cart-img')?.getAttribute('src') || '';
        const product = cartBox.querySelector('.cart-product')?.textContent || '';
        const price = cartBox.querySelector('.cart-price')?.textContent || '';
        const quantity = cartBox.querySelector('.cart-quantity')?.value || '0';
        // Get names
        const names = [];
        cartBox.querySelectorAll('.cart-name-text').forEach(nameEl => {
            if (nameEl.textContent) names.push(nameEl.textContent);
        });
        // Only save valid items
        if (imgSrc && product) {
            cartData.push({ imgSrc, product, price, quantity, names });
        }
    });
    setCartData(cartData);
}

function loadCartFromStorage() {
    const cartContent = document.querySelector('.cart-content');
    const totalPriceElement = document.querySelector('.total-price');
    if (!cartContent) return;
    cartContent.innerHTML = '';
    const cartData = getCartData();
    cartData.forEach(item => {
        // Only render if product and image are not empty
        if (!item.product || !item.imgSrc) return;

        const imgSrc = item.imgSrc;
        const product = item.product;
        const price = item.price || '';
        const quantity = item.quantity && !isNaN(item.quantity) ? item.quantity : '0';
        const names = Array.isArray(item.names) ? item.names.filter(n => n && n.trim()) : [];

        const cartBox = document.createElement('div');
        cartBox.classList.add('cart-box');
        cartBox.innerHTML = `
            <img src="${imgSrc}" alt="" class="cart-img">
            <div class="detail-box">
              <div class="cart-product">${product}</div>
              <div class="cart-price">${price}</div>
              <div class="cart-box">
                <button class="decrease-btn">−</button>
                <input class="cart-quantity" type="number" min="0" inputmode="numeric" pattern="[0-9]*" value="${quantity}">
                <button class="add-btn">+</button>
              </div>
              <div class="cart-names-section">
                <div class="cart-names-list"></div>
                <div class="cart-names-input-row">
                  <input type="text" class="cart-name-input" placeholder="Tên...">
                  <button class="cart-name-add-btn">Thêm</button>
                </div>
              </div>
            </div>
            <i class='bx bx-trash cart-remove'></i>
        `;
        cartContent.appendChild(cartBox);

        // Restore names
        const namesList = cartBox.querySelector('.cart-names-list');
        names.forEach(nameValue => {
            if (!nameValue || !nameValue.trim()) return;
            const nameTag = document.createElement('span');
            nameTag.className = 'cart-name-tag';
            nameTag.innerHTML = `
                <span class="cart-name-text">${nameValue}</span>
                <button class="cart-name-edit-btn">chỉnh sửa</button>
            `;
            namesList.appendChild(nameTag);

            // Edit button logic
            const editBtn = nameTag.querySelector('.cart-name-edit-btn');
            const nameInput = cartBox.querySelector('.cart-name-input');
            editBtn.addEventListener('click', () => {
                nameInput.value = nameValue;
                namesList.removeChild(nameTag);
                let quantity = parseInt(cartBox.querySelector('.cart-quantity').value) || 0;
                cartBox.querySelector('.cart-quantity').value = Math.max(0, quantity - 1);
                updateCartTotal();
                saveCartToStorage();
                nameInput.focus();
            });
        });

        // Quantity and button logic
        const quantityInput = cartBox.querySelector('.cart-quantity');
        const addBtn = cartBox.querySelector('.add-btn');
        const decreaseBtn = cartBox.querySelector('.decrease-btn');
        const removeBtn = cartBox.querySelector('.cart-remove');
        const nameInput = cartBox.querySelector('.cart-name-input');
        const nameAddBtn = cartBox.querySelector('.cart-name-add-btn');

        function updateCartTotal() {
            let total = 0;
            document.querySelectorAll('.cart-box').forEach(box => {
                const priceElement = box.querySelector('.cart-price');
                const quantityInput = box.querySelector('.cart-quantity');
                if (priceElement && quantityInput) {
                    const pricePerItem = parseFloat(priceElement.textContent.replace('k', '').replace('K', '')) * 1000;
                    const quantity = parseInt(quantityInput.value) || 0;
                    total += pricePerItem * quantity;
                }
            });
            if (totalPriceElement) totalPriceElement.textContent = `${total / 1000}k`;
            saveCartToStorage();
        }

        quantityInput.addEventListener('change', updateCartTotal);
        quantityInput.addEventListener('input', updateCartTotal);

        addBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value) || 0;
            quantityInput.value = quantity + 1;
            updateCartTotal();
        });

        decreaseBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value) || 0;
            quantityInput.value = Math.max(0, quantity - 1);
            updateCartTotal();
        });

        removeBtn.addEventListener('click', () => {
            cartBox.remove();
            updateCartTotal();
            saveCartToStorage();
        });

        nameAddBtn.addEventListener('click', () => {
            const nameValue = nameInput.value.trim();
            if (nameValue) {
                const nameTag = document.createElement('span');
                nameTag.className = 'cart-name-tag';
                nameTag.innerHTML = `
                    <span class="cart-name-text">${nameValue}</span>
                    <button class="cart-name-edit-btn">chỉnh sửa</button>
                `;
                namesList.appendChild(nameTag);
                nameInput.value = '';
                let quantity = parseInt(quantityInput.value) || 0;
                quantityInput.value = quantity + 1;
                updateCartTotal();
                saveCartToStorage();

                // Edit button logic
                const editBtn = nameTag.querySelector('.cart-name-edit-btn');
                editBtn.addEventListener('click', () => {
                    nameInput.value = nameValue;
                    namesList.removeChild(nameTag);
                    let quantity = parseInt(quantityInput.value) || 0;
                    quantityInput.value = Math.max(0, quantity - 1);
                    updateCartTotal();
                    saveCartToStorage();
                    nameInput.focus();
                });
            }
        });

        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                nameAddBtn.click();
            }
        });

        // Initial total price update
        updateCartTotal();
    });
}

// Call loadCartFromStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
});

// ...existing code...