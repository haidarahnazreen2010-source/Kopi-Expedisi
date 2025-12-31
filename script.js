const products = [
  { id: 1, name: "Kopi Susu Expedisi", price: 25000, img: "Kopsus.png" },
  { id: 2, name: "Kopi Susu gula Aren", price: 22000, img: "Kopi susu gula aren.png" },
  { id: 3, name: "Kopi Hitam", price: 28000, img: "Kopi Hitam.png" },
  { id: 4, name: "Coklat", price: 32000, img: "Coklat.jpg" }
];

let cart = [];

const menu = document.getElementById("menu");

products.forEach(p => {
  menu.innerHTML += `
    <div class="card">
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p>Rp ${p.price.toLocaleString("id-ID")}</p>
      <button onclick="addToCart(${p.id})">Tambah</button>
    </div>
  `;
});

function addToCart(id) {
  let item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    let product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("cart-count");

  list.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;
    list.innerHTML += `
    <li>
      ${item.name} x${item.qty}<br>
      <small>Rp ${(item.price * item.qty).toLocaleString("id-ID")}</small>
    </li>
  `;

  });

  totalEl.innerText = total.toLocaleString("id-ID");
  countEl.innerText = count;
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("show");
}

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let metode = document.getElementById("payment").value;

  let pesan = "☕ *COFFEE EXPEDISI* ☕%0A";
  pesan += "————————————%0A";
  pesan += "Detail Pesanan:%0A";


  let total = 0;

  cart.forEach(item => {
    pesan += `- ${item.name} x${item.qty} = Rp ${(item.price * item.qty).toLocaleString("id-ID")}%0A`;
    total += item.price * item.qty;
  });

  pesan += "————————————%0A";
  pesan += `*Total: Rp ${total.toLocaleString("id-ID")}*%0A`;
  pesan += `Pembayaran: *${metode}*%0A%0A`;
  pesan += "Terima kasih 🙏";

  // GANTI nomor WA penjual (format 62 tanpa +)
  let nomorWA = "6282121675566";

  let url = `https://wa.me/${nomorWA}?text=${pesan}`;
  if (!confirm("Lanjutkan checkout ke WhatsApp?")) return;
  window.open(url, "_blank");

  cart = [];
  updateCart();
  toggleCart();

  document.getElementById("cart").classList.add("show");

}

