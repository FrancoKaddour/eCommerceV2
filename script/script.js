const productos = [
  {
    id: 1,
    nombre: "Blunt, Blueberry",
    precio: 2000,
    imagen: "./images/images.jpg",
  },
  {
    id: 2,
    nombre: "Bong, Plastico duro",
    precio: 10000,
    imagen: "./images/images.jpg",
  },
  {
    id: 3,
    nombre: "Bong, Vidrio forjado",
    precio: 40000,
    imagen: "./images/images.jpg",
  },
  {
    id: 4,
    nombre: "Vape CBD, Garden Growshop",
    precio: 120000,
    imagen: "./images/images.jpg",
  },
];

let carrito = [];

const displayProducts = () => {
  const productList = document.getElementById("lista-productos");
  productList.innerHTML = "";

  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");

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
    cantidadInput.max = 10; // Establecer el máximo a 10
    cantidadInput.value = 1;
    div.appendChild(cantidadInput);

    const addButton = document.createElement("button");
    addButton.textContent = "AGREGAR AL CARRITO";
    addButton.addEventListener("click", () =>
      addToCart(producto.id, parseInt(cantidadInput.value))
    );
    div.appendChild(addButton);

    productList.appendChild(div);
  });
};

const addToCart = (productId, cantidad) => {
  const selectedProduct = productos.find(
    (producto) => producto.id === productId
  );
  if (selectedProduct) {
    const existingCartItem = carrito.find((item) => item.id === productId);
    if (existingCartItem) {
      if (existingCartItem.cantidad + cantidad > 10) {
        alert("No puedes agregar más de 10 productos de este tipo al carrito.");
        return; // Detener la ejecución si se supera el límite
      }
      existingCartItem.cantidad += cantidad;
    } else {
      if (cantidad > 10) {
        alert("No puedes agregar más de 10 productos de este tipo al carrito.");
        return; // Detener la ejecución si se supera el límite
      }
      carrito.push({ ...selectedProduct, cantidad });
    }
    // Restablecer el valor del input de cantidad a 1
    document.querySelectorAll(".producto").forEach((product) => {
      if (product.querySelector("button").contains(document.activeElement)) {
        product.querySelector('input[type="number"]').value = 1;
      }
    });
    displayCart();
  } else {
    alert("Producto no encontrado.");
  }
};

const displayCart = () => {
  const cartList = document.getElementById("lista-carta");
  cartList.innerHTML = "";

  let totalPagar = 0;
  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} x ${producto.cantidad} - $${
      producto.precio * producto.cantidad
    }`;
    cartList.appendChild(li);
    totalPagar += producto.precio * producto.cantidad;
  });

  const totalElement = document.getElementById("total");
  totalElement.textContent = totalPagar.toFixed(2);
};

// Agregar evento para limpiar el carrito
document
  .getElementById("clear-cart-btn")
  .addEventListener("click", function () {
    carrito = []; // Vaciar el carrito
    displayCart(); // Actualizar la visualización del carrito
  });

// Agregar evento para pagar
document.getElementById("checkout-btn").addEventListener("click", function () {
  const confirmacion = confirm("¿Deseas realizar la compra?");
  const mensajeCompra = document.getElementById("mensaje-compra");
  if (confirmacion) {
    alert("¡Gracias por su compra!");
    carrito = []; // Vaciar el carrito
    displayCart(); // Actualizar la visualización del carrito
  } else {
    mensajeCompra.textContent = ""; // Limpiar el mensaje si se cancela la compra
    window.location.href = window.location.href; // Redirigir a la página actual para volver atrás
  }
});

displayProducts();
