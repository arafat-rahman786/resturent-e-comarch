import type { ICart, Iproduct } from "./product.type"
import Swal from 'sweetalert2'
import api from '../../../lib/api'

let from_deshboard = document.getElementById("from_deshboard") as HTMLElement | null
let homeCartList = document.getElementById("homeCartList") as HTMLElement || null
let foodlist = document.getElementById("foodlist") as HTMLElement || null
let Cart_Badge = document.getElementById("Cart_Badge") as HTMLElement || null
let item_length = document.getElementById("item_length") as HTMLElement || null
let order_review = document.getElementById("order_review") as HTMLElement || null
let subtotal = document.getElementById("subtotal") as HTMLElement || null;
let total = document.getElementById("total") as HTMLElement || null;

from_deshboard?.addEventListener("submit", async (event) => {
  event.preventDefault()
  let fromData = new FormData(from_deshboard as HTMLFormElement);
  let enteries: any = Object.fromEntries(fromData);
  let validateFromData = validate(enteries)
  if (!validateFromData) {
    return
  }
  let url = await api.post("/products", validateFromData)
  let res = url.data
  randerHtml()
})


function validate(fromData: Partial<Iproduct>) {
  let condition = !fromData.name
    || !fromData.image
    || !fromData.catagory
    || Number(fromData.price ?? 0) <= 0
    || Number(fromData.ratting ?? 0) <= 0

  if (condition) {
    Swal.fire({
      title: "Fill Input",
      icon: "error",
      showConfirmButton: false,
      timer: 1500
    });
    return;
  } else {
    Swal.fire({
      title: "Added succesfully!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
    return fromData as Iproduct
  }
}

async function randerHtml() {
  let url = await api.get('./products')
  let res = url.data
  let conditon = "";
  let homePageHtml = "";
  let dashboardPageHtml = "";
  let newData = res.map((item: Iproduct) => {
    if (item.ratting == 5) {
      conditon = `<div class="mt-2 flex gap-1">
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            </div>`
    } else if (item.ratting == 4) {
      conditon = `<div class="mt-2 flex gap-1">
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
            </div>`
    } else if (item.ratting == 3) {
      conditon = `<div class="mt-2 flex gap-1">
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
            </div>`
    } else if (item.ratting == 2) {
      conditon = `<div class="mt-2 flex gap-1">
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
            </div>`
    } else if (item.ratting == 1) {
      conditon = `<div class="mt-2 flex gap-1">
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
            </div>`
    }
    homePageHtml += `<article class="group overflow-hidden rounded-3xl
               border border-white/10
               bg-[#12100c]
               transition-all duration-500
               hover:-translate-y-2
               hover:border-[#f0a400]/40
               hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">

          <div class="relative h-60 overflow-hidden">

            <img src="./src/assets/images/foods/${item.image}" alt="this is alt text" class="h-full w-full object-cover
                   transition duration-700
                   group-hover:scale-110" />

            <div class="absolute inset-0
                   bg-gradient-to-t
                   from-black/70
                   via-transparent
                   to-transparent"></div>

            <!-- Rating -->
            <div class="absolute left-4 top-4
                   flex items-center gap-2
                   rounded-full
                   bg-black/60
                   px-3 py-1.5
                   backdrop-blur-md">
              <i class="fa-solid fa-star text-xs text-[#f0a400]"></i>

              <span class="text-xs font-semibold text-white">
                ${item.ratting}
              </span>
            </div>

          </div>


          <div class="p-5">

            <h3 class="font-['Cormorant_Garamond']
                   text-2xl font-semibold
                   text-white
                   transition-colors
                   group-hover:text-[#f0a400]">
                 ${item.name}
            </h3>


            <!-- Rating Stars -->
            
            ${conditon}

            <div class="mt-5 flex items-center justify-between">

              <p class="text-xl font-semibold text-[#f0a400]">
                ৳ ${Number(item.price).toFixed(2)}
              </p>

              <!-- Quantity -->
              <div class="flex items-center rounded-full
                     border border-white/10">
                <button class="flex h-8 w-8 items-center
                       justify-center text-white/50">
                  −
                </button>

                <span class="w-7 text-center text-xs text-white">
                  1
                </span>

                <button class="flex h-8 w-8 items-center
                       justify-center text-white/50">
                  +
                </button>
              </div>

            </div>


            <button data-id="${item.id}" class="cart mt-5 flex w-full items-center
                   justify-center gap-2 rounded-xl
                   bg-[#f0a400] py-3
                   text-sm font-semibold text-black
                   transition-all duration-300
                   hover:bg-[#ffb82e]
                   active:scale-95">
              <i class="fa-solid fa-cart-plus text-xs"></i>
              Add to Cart
            </button>

          </div>

                     </article>`

    dashboardPageHtml += `<div class="group flex flex-col gap-4 rounded-2xl
                   border border-white/5
                   bg-white/[0.02] p-4
                   transition-all duration-300
                   hover:border-[#e8b95c]/20
                   hover:bg-[#e8b95c]/[0.03]
                   sm:flex-row sm:items-center">

                    <img src="./src/assets/images/foods/${item.image}" alt="Chicken Burger"
                        class="h-20 w-20 shrink-0 rounded-xl object-cover" />

                    <div class="min-w-0 flex-1">

                        <h3 class="font-['Cormorant_Garamond'] text-xl font-semibold text-white">
                            ${item.name}
                        </h3>

                        <div class="mt-1 flex items-center gap-3">

                            <span class="text-xs text-[#e8b95c]">
                                <i class="fa-solid fa-star mr-1"></i>
                                ${Number(item.ratting).toFixed(2)}
                            </span>

                            <span class="text-xs text-white/25">
                                ${item.catagory}
                            </span>

                        </div>

                    </div>

                    <div class="flex items-center justify-between gap-5 sm:justify-end">

                        <span class="text-lg font-semibold text-[#e8b95c]">
                            ৳${Number(item.price).toFixed(2)}
                        </span>

                        <div class="flex gap-2">

                            <a data-edit-id="${item.id}" href="edit.html?productId=${item.id}" class="flex edit h-9 w-9 items-center justify-center
                         rounded-lg border border-white/10
                         text-white/50
                         transition
                         hover:border-[#e8b95c]/40
                         hover:text-[#e8b95c]">
                                <i class="fa-solid fa-pen text-xs"></i>
                            </a>

                            <button data-delete-id="${item.id}" class="flex h-9 w-9 delete items-center justify-center
                         rounded-lg border border-red-500/10
                         text-red-400/60
                         transition
                         hover:border-red-500/40
                         hover:bg-red-500/10
                         hover:text-red-400">
                                <i class="fa-solid fa-trash text-xs"></i>
                            </button>

                        </div>

                    </div>

                </div>`

  })

  if (homeCartList) { homeCartList.innerHTML = String(homePageHtml) }
  if (foodlist) { foodlist.innerHTML = String(dashboardPageHtml) }
  if (item_length) { item_length.textContent = res.length }
}
randerHtml()

homeCartList?.addEventListener("click", async (e: any) => {
  const step1 = e.target.closest(".cart")
  if (!step1) {
    return
  }
  const productId = step1.dataset.id
  if (!productId) return

  const response = await api.get('/products')
  const res = response.data
  const newData = res.find((item: ICart) => {
    return String(item.id) === String(productId)
  })
  const url = await api.post('/carts', newData)
  console.log("post");
  checkoutRender()
})

foodlist?.addEventListener("click", (event: any) => {
  let deleteBtn = event.target.closest(".delete");
  let findBtn = deleteBtn.dataset.deleteId
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      await api.delete(`/products/${findBtn}`);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      })
      randerHtml()
    };
  });
})


// ========================== Cart Page =================

let district = document.getElementById("district") as HTMLInputElement | null
let delivary = document.getElementById("delivary") as HTMLElement | null
let tax = document.getElementById("tax") as HTMLElement | null
let discount = document.getElementById("discount") as HTMLElement | null
let applyInput = document.getElementById("applyInput") as HTMLInputElement | null
let applyBtn = document.getElementById("applyBtn") as HTMLElement | null
let orderBtn = document.getElementById("orderBtn") as HTMLElement | null
let fullName = document.getElementById("fullName") as HTMLInputElement | null
let phone = document.getElementById("phone") as HTMLInputElement | null
let email = document.getElementById("email") as HTMLInputElement | null
let deliveryAddress = document.getElementById("deliveryAddress") as HTMLInputElement | null
let area = document.getElementById("area") as HTMLInputElement | null


function deliveryFunction(): number {
  if (delivary) {
    if (district?.value === "Select District") {
      delivary.innerText = "0";
      return 0
    } else if (district?.value == "Dhaka") {
      delivary.innerText = "20";

      return 20
    } else {
      delivary.innerText = "50";
      return 50
    }
  }
  return 0
}
deliveryFunction()

function taxFunction(): number {
  if (tax) {
    if (district?.value === "Select District") {
      tax.innerText = "0";
      return 0
    } else if (district?.value === "Dhaka") {
      tax.innerText = "8.5";
      return 8.5
    } else {
      tax.innerText = "15";
      return 15
    }
  }

  return 0
}
taxFunction()

district?.addEventListener("change", () => {
  deliveryFunction()
  taxFunction()
  checkoutRender()
})

applyBtn?.addEventListener("click", () => {
  checkoutRender()
})

orderBtn?.addEventListener("click", () => {
  if (
    fullName?.value == ""
    || phone?.value == ""
    || email?.value == ""
    || deliveryAddress?.value == ""
    || district?.value == ""
    || area?.value == ""
  ) {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon: "error",
      title: "Fill your from"
    });
  }else{
    showThankYouPopup();
    setTimeout(() => {
      window.location.reload()
    }, 3000);
  }
})

async function checkoutRender() {
  const nextUrl = await api.get('/carts')
  let cartResponse: ICart[] = nextUrl.data
  let Cart_Badge_Chackout = document.getElementById("Cart_Badge_Chackout")
  if (Cart_Badge_Chackout) {
    Cart_Badge_Chackout.innerText = String(cartResponse.length)
  }
  if (Cart_Badge) {
    Cart_Badge.innerHTML = String(cartResponse.length)
  }
  let some = cartResponse.map((item: ICart) => {
    return`<article
      class="group flex items-center gap-4
             rounded-2xl
             border border-white/10
             bg-white/[0.02]
             p-4
             transition-all duration-300
             hover:border-[#e8b95c]/30"
    >

      <!-- Image -->
      <div
        class="h-20 w-20 shrink-0
               overflow-hidden
               rounded-xl"
      >

        <img
          src="./src/assets/images/foods/${item.image}"
          alt="Chicken Burger"
          class="h-full w-full
                 object-cover
                 transition duration-500
                 group-hover:scale-110"
        />

      </div>


      <!-- Product Info -->
      <div class="min-w-0 flex-1">

        <div class="flex items-start justify-between gap-3">

          <div>

            <h3
              class="font-['Cormorant_Garamond']
                     text-xl font-semibold
                     text-white
                     transition-colors
                     group-hover:text-[#e8b95c]"
            >
              ${item.name}
            </h3>


            <!-- Rating -->
            <div class="mt-1 flex gap-1">

              <i class="fa-solid fa-star text-[9px] text-[#e8b95c]"></i>
              <i class="fa-solid fa-star text-[9px] text-[#e8b95c]"></i>
              <i class="fa-solid fa-star text-[9px] text-[#e8b95c]"></i>
              <i class="fa-solid fa-star text-[9px] text-[#e8b95c]"></i>
              <i class="fa-solid fa-star text-[9px] text-white/15"></i>

            </div>

          </div>


          <!-- Remove -->
          <button data-castom-id="${item.id}"
            type="button"
            class="remove flex h-8 w-8 shrink-0
                   items-center justify-center
                   rounded-full
                   text-white/25
                   transition
                   hover:bg-red-500/10
                   hover:text-red-400"
          >

            <i class="fa-solid fa-xmark text-xs"></i>

          </button>

        </div>


        <!-- Bottom -->
        <div
          class="mt-3 flex items-center
                 justify-between"
        >

          <!-- Price -->
          <p
            class="text-sm font-semibold
                   text-[#e8b95c]"
          >
            $${item.price}
          </p>


          <!-- Quantity -->
          <div
            class="flex items-center
                   rounded-full
                   border border-white/10"
          >

            <button
              type="button"
              class="flex h-7 w-7
                     items-center justify-center
                     text-white/40
                     transition
                     hover:text-[#e8b95c]"
            >
              −
            </button>


            <span
              class="w-7 text-center
                     text-xs font-semibold"
            >
              1
            </span>


            <button
              type="button"
              class="flex h-7 w-7
                     items-center justify-center
                     text-white/40
                     transition
                     hover:text-[#e8b95c]"
            >
              +
            </button>

          </div>

        </div>

      </div>

    </article>`
  })

  let subsum = cartResponse.reduce((total, item: ICart) => {
    return Number(total) + item.price * 1
  }, 0)
  if (subtotal) { subtotal.innerText = `৳ ${String(subsum.toFixed(2))}` }
  if (order_review) { order_review.innerHTML = some.join("") }
  if (!total) return
  if (applyInput?.value == "") {
    discount?.innerText == `৳ 0.00`
    total.innerText = `৳ ${Number(subsum + deliveryFunction() + taxFunction()).toFixed(2)}`
    return
  } else if (applyInput?.value == "HERO100") {
    total.innerText = `৳ ${Number(subsum + deliveryFunction() + taxFunction() - 100).toFixed(2)}`
  }

}
checkoutRender()

order_review?.addEventListener("click", async (event: any) => {
  let removeBtn = event.target.closest(".remove");
  let findBtn = removeBtn.dataset.castomId
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      await api.delete(`/carts/${findBtn}`);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      })
      checkoutRender()
    };
  });
})




// ============================= Edit Page =========================



let edit_food_form = document.getElementById("edit_food_form") as HTMLElement || null;


if (edit_food_form) {
  console.log('hello edite page');
  let searchParams = new URLSearchParams(window.location.search)
  let productId = searchParams.get('productId')
  if (productId) {
    async function getData() {
      let res = await api.get(`/products/${productId}`)
      console.log(res);
      console.log(res.data.catagory);

      for (let falied in res.data) {
        document.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`[name="${falied}"]`).forEach((element) => {
          element.value = res.data[falied]
        })
      }
    }
    getData()
  }
}

edit_food_form?.addEventListener("submit", async (event) => {
  event.preventDefault()
  let fromdata = new FormData(edit_food_form as HTMLFormElement)
  let enteries = Object.fromEntries(fromdata)
  let validateFromdata = validate(enteries)
  if (!validateFromdata) {
    return;
  }
  let searchParams = new URLSearchParams(window.location.search)
  let productId = searchParams.get("productId");
  if (productId) {
    let { id, ...updateFromdata } = validateFromdata
    await api.put(`/products/${productId}`, updateFromdata)
  }
})



const images = [
  "/thankyou-1.jpg",
  "/thankyou-2.jpg",
  "/thankyou-3.jpg",
  "/thankyou-4.jpg",
  "/thankyou-5.jpg"
];

const thankYouImage =
    document.getElementById("thankYouImage") as HTMLImageElement | null;

const thankYouPopup =
    document.getElementById("thankYouPopup") as HTMLElement | null;


function showThankYouPopup() {

    const randomIndex = Math.floor(Math.random() * images.length);

    if (thankYouImage) {
        thankYouImage.src = images[randomIndex];
    }

    thankYouPopup?.classList.remove("hidden");

    setTimeout(() => {

        thankYouPopup?.classList.remove(
            "translate-y-[120%]",
            "opacity-0"
        );

        thankYouPopup?.classList.add(
            "translate-y-0",
            "opacity-100"
        );

    }, 50);
}