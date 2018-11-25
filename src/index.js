import React from 'react'
import ReactDom from 'react-dom'
import ProductList from './components/ProductList'
//3/ We have to set strict mode like this
import { configure, autorun } from 'mobx';
import { Provider } from 'mobx-react';

import productStore from './stores/ProductStore';
import basket from './stores/Basket';

//useStrict(true);    //w nowym MobX 'useStrict' nazywa sie 'configure'(?)

// don't allow state modifications outside actions
configure({ enforceActions: 'always' });

autorun(() => {
  const {soldProductsNumber} = productStore;
  console.log(soldProductsNumber);
})

ReactDom.render(
  <Provider productStore={ productStore } basket={ basket }>
    <ProductList />
  </Provider>,

  document.getElementById('root')
);
