import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const totalAmount = cartCtx.totalAmount.toFixed(2);
	const hasItems = cartCtx.items.length > 0;

	const certItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};
	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, quantity: 1 });
	};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.quantity}
					price={item.price}
					description={item.description}
					onRemove={certItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const content = hasItems ? (
		<>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>${totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.closeCartHandler}>
					Close
				</button>
				{hasItems && <button className={classes.button}>Order</button>}
			</div>
		</>
	) : (
		<>
			<div className={classes.empty}>
				<h1>Your cart is empty!</h1>
				<button className={classes["button--alt"]} onClick={props.closeCartHandler}>
					Continue Shopping
				</button>
			</div>
		</>
	);

	return <Modal onClose={props.closeCartHandler}>{content}</Modal>;
};

export default Cart;
