let itemList=[];
        const onLoad=localStorage.getItem('itemList');
        if(onLoad){
            itemList=JSON.parse(onLoad);
            display();
        }
        function exTracker(){
                let itemInputElement=document.querySelector('#itemInput');
                let itemAmtElement=document.querySelector('#itemAmt');
                    let DateElement=document.querySelector('#date');
                    itemList.push({name:itemInputElement.value,amount:parseFloat(itemAmtElement.value),date:DateElement.value});
                    storeData();
                    itemInputElement.value='';
                    itemAmtElement.value='';
                    DateElement.value='';
                display();
                
        }
        
        function display(){
            let showHtml='';
            for(let i=0;i<itemList.length;i++){
                let {name,amount,date}=itemList[i];
                showHtml+=`<span>${name}</span>
                <span>₹${amount}</span>
                <span>${date}</span>
                <button onclick="itemList.splice(${i},1); totalExpense(); display(); storeData();">Delete</button>`
                
            }
            document.querySelector('.display').innerHTML=showHtml;
        }
        function totalExpense(){
            let sum=0;
            for(let i=0;i<itemList.length;i++){
                sum+=itemList[i].amount;
            }
            let totalDiv=document.querySelector('.totalExpense');
             if (sum > 0) {
        totalDiv.style.display = 'block';
        totalDiv.innerText = `Total : ₹${sum}`;
    } else {
        totalDiv.style.display = 'none'; // Hide when amount is zero
    }   
        }
        
        function storeData(){
            localStorage.setItem("itemList",JSON.stringify(itemList));
        }