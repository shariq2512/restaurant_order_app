import menuArray from '/data.js'

const dataEL = document.getElementById('data-el')
const orderEl = document.getElementById('order-el')
const modalEl = document.getElementById('modal-el')
const finalMsg = document.getElementById('final-msg')

let orderArray = []

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addItems(e.target.dataset.add)
    }
    if(e.target.dataset.remove){
        removeItems(e.target.dataset.remove)
    }
    if(e.target.classList.contains('complete-btn')){
        openPaymentModal()
    }
    // if(e.target.classList.contains('pay-btn')){
    //     handlePaybtnClick()
    // }
    if(e.target.classList.contains('close-modal')){
        handleCloseModalBtn()
    }
})


function addItems(itemId){
    
    const targetItemObj = menuArray.find(item => {
        return item.id === Number(itemId)
    })
    
    orderArray.push(targetItemObj)
    renderOrder()
}

function removeItems(itemId){
    const index = orderArray.findIndex(order => order.id === Number(itemId))
    if(index !== -1){
        orderArray.splice(index, 1)
        renderOrder()
    }
}

function renderOrder(){
    if(orderArray.length === 0){
        orderEl.innerHTML = ''
        return
    }
    
    const totalPrice = orderArray.reduce((total, item) => total + item.price, 0)
    
    // orders ? orderHeader.classList.remove('show') : orderHeader.classList.add('show')
    
    const orderItemsHtml = orderArray.map(order =>  `
        <div class="order-item">
            <h3>${order.name}</h3>
            <button class="remove-btn" data-remove="${order.id}">REMOVE</button>
            <p>£${order.price}</p>
        </div>
    `).join('')
    
    orderEl.innerHTML = ''
    
    orderEl.innerHTML += `
        <h2 class="order-title">Your Order</h2>
        ${orderItemsHtml}
        <div class="border-line"></div>
        <div class="order-total">
            <h3>Total price:</h4>
            <p>£${totalPrice}</p>
        </div>
        <button class="complete-btn">Complete Order</button>
    `
}

function openPaymentModal(){
    modalEl.classList.remove('hidden')
    modalEl.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">X</button>
            <h2>Enter payment details</h2>
            <form id="payment-form">
                <input type="text" id="name" placeholder="Enter your name" required>
                <input type="text" id="card-number" placeholder="Enter card number" required>
                <input type="text" id="cvv" placeholder="Enter CVV" required>
                <button type="submit" class="pay-btn">Pay</button>
            </form>
        </div>
    `
    
    const paymentForm = document.getElementById('payment-form')
    paymentForm.addEventListener('submit', handlePaybtnClick)
}

function handleCloseModalBtn(){
    modalEl.classList.add("hidden")
}

function handlePaybtnClick(e){
    e.preventDefault()
    
    const buyerName = document.getElementById('name').value.trim()
    
    modalEl.classList.add('hidden')
    
    orderEl.innerHTML = `
        <div class="message-content">
            <h2>Thanks ${buyerName}! Your order is on it's way!</h2>
        </div>
    `
    
    orderArray = []
}

function renderItems(items){
    
    // const { name, ingredients, emoji, price, id } = items
    items.map((item) => {
        dataEL.innerHTML += `
            <div class="card">
                <div class="emoji">${item.emoji}</div>
                <div class="card-text">
                    <h3>${item.name}</h3>
                    <p>${item.ingredients.join(',')}</p>
                    <h4>£${item.price}</h4>
                </div>
                <button class="add-btn" data-add="${item.id}">+</button>
                <div class="divider"></div>
            </div>
        `
    })
}

renderItems(menuArray)
