import React from 'react';
import { useState, useContext } from 'react';


const CartContext = React.createContext([]);
export const useCartContext = () => useContext(CartContext);

function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addProduct = (item, quantity) => {
    if (isInCarrt(item.id)) {
      setCart(cart.map(product => {

        return product.id === item.id ? { ...product, quantity: product.quantity + quantity } : product
      }))
    } else {
      setCart([...cart, { ...item, quantity: quantity }])
    }

  }
  const totalPrice = () => {
    return cart.reduce((prev, act) => prev + act.quantity * act.price, 0)
  }
  const totalProducts = () => cart.reduce((acumulador, productoActual) => acumulador + productoActual.quantuity, 0)

  const clearCart = () => setCart([])

  const isInCarrt = (id) => cart.find(product => product.id === id) ? true : false

  const removeProduct = (id) => setCart(cart.filter(product => product.id !== id))


  return (
    <CartContext.Provider value={{
      addProduct,
      clearCart,
      isInCarrt,
      removeProduct,
      totalPrice,
      totalProducts,
      cart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider