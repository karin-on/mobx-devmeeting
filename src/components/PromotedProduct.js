import React from 'react'

//5/ As our product will grow, it'd be better to extract is into its own component
const PromotedProduct = ({ products }) => (
  <div>
    { products.map(el => (
      <li key={el.id + 'prom'} style={{color: 'red'}}>
        {el.name}
      </li>

    )) }
  </div>
);

export default PromotedProduct
