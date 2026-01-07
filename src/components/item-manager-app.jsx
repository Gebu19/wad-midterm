import "./item-manager-app.css"

import { useState, useRef } from "react";

import deleteLogo from '../assets/delete.svg';
import stationaryLogo from '../assets/ink_pen.svg';
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager () {

  /*
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MAY add additional state, refs, and variables if needed.
   */
  const [id,setId] = useState(1)  
  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // You must use this ref for the item name input
  const itemName = useRef(null);
  const itemCategory = useRef(null)
  const itemPrice = useRef(null)

  //TODO: Your code goes here

  /*
   * !!! IMPORTANT !!!
   * - Implement your output based on the given sample layout.
   * - The id and className attributes below MUST be preserved.
   * - Your CSS MUST use the existing id and className selectors.
   */
  function onClickAdd(){
    
    const name = itemName.current.value.trim();
    const category = itemCategory.current.value;
    const price = itemPrice.current.value;

    let isDuplicate = false
    items.forEach((item)=>{
        if(item.name.toLowerCase() === name.toLowerCase() ){
            isDuplicate = true
        }
    })
    if (!name) {
      setErrorMsg("Item name must not be empty");
      return;
    }
    else if(isDuplicate){
        setErrorMsg('Item must not be duplicated')
        return;
    }
    else if(!category){
        setErrorMsg('Please select a category')
        return;
    }
    else if(!price ||price < 0 ){
        setErrorMsg("Price must not be less than 0")
        return;
    }
    console.log('name: ',name);
    console.log('category: ',category);
    console.log('price: ',price);
    
    
    const newItem = {
        id: id,
        name: name,
        category: category,
        price: price,

    }
    setItems((prev)=> [...prev,newItem])

    setId((prev)=> prev+1)
    itemName.current.value = ''
    itemPrice.current.value = ''
    setErrorMsg('')
  }
  function onClickDelete(idToDelete) {
    setItems(items.filter(item => item.id !== idToDelete));
  }
  return (
    <>
      <div id="h1">
        Item Management
      </div>
      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {
                items.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.category === 'Stationary'?(
                            <img src={stationaryLogo} alt="Stationary" />
                        ):item.category == 'Kitchenware'?(
                            <img src={kitchenwareLogo} alt="Kitchenware" />
                        ):(
                            <img src={applianceLogo} alt="Appliance" />
                        )}</td>
                        <td>{item.price}</td>
                        <td><button onClick={() => onClickDelete(item.id)}><img src={deleteLogo} alt="delete" /></button></td>
                    </tr>

                ))
            }
            <tr>
                <td></td>
                <td><input type="text" ref={itemName} required/></td>
                <td><select ref={itemCategory}>
                        <option value=""></option>
                        <option value="Stationary">Stationary</option>
                        <option value="Kitchenware">Kitchenware</option>
                        <option value="Appliance">Appliance</option>
                    </select></td>
                <td><input type="number" ref={itemPrice} min='0'/></td>
                <td><button id='add-id-btn' onClick={onClickAdd}>Add item</button></td>
            </tr>

          </tbody>
        </table>
      </div>
      <div id="error-message">
         <span style={{color:'red'}}>{errorMsg}</span>
      </div>
    </>
  );
}

export default ItemManager;