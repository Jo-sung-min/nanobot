import age from "./data.js";

export default function Cart() {
  let 장바구니 = [
    {name: '사과',price: 1200, count: 2}, 
    {name: '배', price: 1000, count: 1}, 
    {name: '복숭아', price: 800, count: 3}];

  return (
    <div>
      <h4 className="title">Cart</h4>
      {
        장바구니.map((item,i)=> <CartItem item={item} key={item.name} />)
      }
    </div>
  )
} 

function CartItem(props) {
  return (
    <div className="cart-item">
      <p>{props.item.name}</p>
      <p>${props.item.price}</p>
      <p>{props.item.count}개</p>
    </div>
  )
}