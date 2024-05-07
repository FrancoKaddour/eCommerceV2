document.addEventListener("DOMContentLoaded", function () {
  let carrito = [];

  const displayProducts = (productos) => {
    const productList = document.getElementById("lista-productos");
    productList.innerHTML = "";

    productos.forEach((producto) => {
      const productoDiv = createProductElement(producto);
      productList.appendChild(productoDiv);
    });
  };

  const createProductElement = (producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.dataset.id = producto.id;

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = producto.nombre;
    div.appendChild(img);

    const nombreProducto = document.createElement("p");
    nombreProducto.textContent = producto.nombre;
    div.appendChild(nombreProducto);

    const precioProducto = document.createElement("p");
    precioProducto.textContent = `$${producto.precio}`;
    div.appendChild(precioProducto);

    const cantidadInput = document.createElement("input");
    cantidadInput.type = "number";
    cantidadInput.min = 1;
    cantidadInput.max = 10; // Máximo permitido
    cantidadInput.value = 1;
    div.appendChild(cantidadInput);

    const addButton = document.createElement("button");
    addButton.textContent = "AGREGAR AL CARRITO";
    addButton.addEventListener("click", () => addToCart(producto));
    div.appendChild(addButton);

    return div;
  };

  const addToCart = (producto) => {
    const cantidadInput = document.querySelector(
      `.producto[data-id="${producto.id}"] input[type='number']`
    );
    const cantidad = parseInt(cantidadInput.value);

    if (cantidad <= 0) {
      alert("La cantidad debe ser mayor que cero.");
      return;
    }

    const existingCartItem = carrito.find((item) => item.id === producto.id);
    if (existingCartItem) {
      if (existingCartItem.cantidad + cantidad > 10) {
        alert("No puedes agregar más de 10 productos de este tipo al carrito.");
        return;
      }
      existingCartItem.cantidad += cantidad;
    } else {
      if (cantidad > 10) {
        alert("No puedes agregar más de 10 productos de este tipo al carrito.");
        return;
      }
      carrito.push({ ...producto, cantidad });
    }

    cantidadInput.value = 1;

    displayCart();
  };

  const displayCart = () => {
    const cartList = document.getElementById("lista-carta");
    cartList.innerHTML = "";

    let totalPagar = 0;
    carrito.forEach((producto) => {
      const li = document.createElement("li");
      li.textContent = `${producto.nombre} x ${producto.cantidad} - $${
        producto.precio * producto.cantidad
      }`;
      cartList.appendChild(li);
      totalPagar += producto.precio * producto.cantidad;
    });

    document.getElementById("total").textContent = totalPagar.toFixed(2);
  };

  document
    .getElementById("clear-cart-btn")
    .addEventListener("click", function () {
      carrito = [];
      displayCart();
    });

  document
    .getElementById("checkout-btn")
    .addEventListener("click", function () {
      const confirmacion = confirm("¿Deseas realizar la compra?");
      if (confirmacion) {
        alert("¡Gracias por su compra!");
        carrito = [];
        displayCart();
      }
    });

  fetch("./productos.json")
    .then((response) => response.json())
    .then((productos) => {
      displayProducts(productos);
    })
    .catch((error) => {
      console.error("Error al cargar los productos:", error);
    });
});
