import React from 'react'
import { observer } from 'mobx-react'


const Product = ({ id, name, price, isSold, onBuyClick }) => {

  const handleClick = () => {
    onBuyClick(id)
  }

  return (

    <div>

      <span style={ { textDecoration: isSold ? 'line-through' : 'none' }}>
        { name } {price}
      </span>

      <button onClick={handleClick}>
        Buy
      </button>

    </div>

  )
}

export default observer (Product)
