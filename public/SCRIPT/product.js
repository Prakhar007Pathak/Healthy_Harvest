function increaseValue() {
  var value = parseInt(document.getElementById('quantity-number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  value > 20 ? value = 20 : '';
  // if (value > 20){
  //   value = alert("You can only buy 20 box for all kg.")
  // }
  document.getElementById('quantity-number').value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById('quantity-number').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 2 ? value = 2 : '';
  value--;
  document.getElementById('quantity-number').value = value;
}

const likeProducts = document.querySelector(".like-products-list");
const leftArrowlikeProducts = document.querySelector(".left-and-right-arrow-ofLP .like-products-left-arrow svg");
const rightArrowlikeProducts = document.querySelector(".left-and-right-arrow-ofLP .like-products-right-arrow svg");

leftArrowlikeProducts.addEventListener("click", () => {
  likeProducts.scrollLeft -= 2000;
  manageIcons();
});
rightArrowlikeProducts.addEventListener("click", () => {
  likeProducts.scrollLeft += 2000;
  manageIcons();
});

