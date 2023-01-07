var submit = document.getElementById('submit');
submit.addEventListener('click', addData);

function addData(e){
    e.preventDefault();
    const cartList=document.getElementById('cartList');
    
    const cost=document.getElementById('cost').value;
    const description=document.getElementById('description').value;

    const obj=
    {
    cost:cost,
    description:description,
    }
    //console.log(obj);
    axios.post("https://crudcrud.com/api/5f00a3feb8234c3597ba1d665f0aea84/cart",obj)
    .then(()=>{
        showUserDetails();
    })
    .catch(err=>console.log(err));
}

function showUserDetails(){
    axios.get("https://crudcrud.com/api/5f00a3feb8234c3597ba1d665f0aea84/cart")
    .then(users =>{
        const totalCost=document.getElementById('totalCost');
        const cartList=document.getElementById('cartList');
        totalCost.innerHTML='';
        cartList.innerHTML='';
        var total=0;
        for(let i=0;i<users.data.length;i++){
            total+=parseInt(users.data[i].cost);
            
            const li = document.createElement('li');
            const listText = document.createTextNode(`${users.data[i].cost} ${users.data.description}`);
            li.appendChild(listText);
    
            const delBtn = document.createElement('button');
            const delBtnText = document.createTextNode('Delete');
            delBtn.appendChild(delBtnText);
            delBtn.onclick = function (e) {
                e.preventDefault();
                deleteInfo(users.data[i]._id);
            }
            
            cartList.appendChild(li);
            cartList.appendChild(delBtn);
        }
        const totalCostText=document.createTextNode(`total cost of your cart: ${total}`);
        totalCost.appendChild(totalCostText);
    })
}

function deleteInfo(id){
    axios.delete(`https://crudcrud.com/api/5f00a3feb8234c3597ba1d665f0aea84/cart/${id}`)
    .then(()=>{
        showUserDetails();
    })
}

window.onload=showUserDetails();

