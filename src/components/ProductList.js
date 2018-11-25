import React from 'react'
import { inject, observer } from 'mobx-react'
import productStore from '../stores/ProductStore';
import basket from '../stores/Basket';
import Product from './Product';
import PromotedProduct from './PromotedProduct';

@inject('productStore')
@observer
class ProductList extends React.Component {
  state = {
    sortPricesAscending: false,
    sortNamesAscending: false,
    searchValue: '',
    //przeniesione do stora
    // products: [
    //   { id: 0, name: 'Coffee', price: 10, isProm: false, isSold: false },
    //   { id: 1, name: 'Apple', price: 5, isProm: true, isSold: false }
    // ]
  };

  // handleBuyClick = id => {
  //   this.setState(previousState => {
  //     const products = previousState.products.map(p => p.id === id ?
  //       // { ...p, isSold: true } :
  //       { ...p, isSold: !p.isSold } :
  //       p
  //     )
  //
  //     return { products }
  //   })
  // }

  //4/ This time we cannot change the reference
  handleBuyClick = id => {
    //przeniesione do stora jako akcja (na potrzeby strict mode):
    // const productToBeSold = productStore.products.find(p => p.id === id)
    // productToBeSold.isSold = true

    this.props.productStore.buyProduct(id);

    console.log(this.props);
    // this.props.basket.productsInBasket.push(this.props.productStore.buyProduct(id));
  }


  handleSortNames = () => {
    // const sortNames = (a,b) => {
    //   if (a.name < b.name) {
    //     return -1;
    //   } else if (a.name > b.name) {
    //     return 1;
    //   }
    // };

    this.setState({
      // products: [...productStore.products.sort(sortNames)]
      sortNamesAscending: !this.state.sortNamesAscending,
    })
  }

  handleSortPrices = () => {
      //przeniesione do rendera
    // const sortPrices = (a,b) => {
      // if (!this.state.sortPricesAscending) {
      //   return a.price - b.price;
      // } else {
      //   return b.price - a.price;
      // }
    // }

    this.setState({
      //poprzednio - sortowanie w 1 stronę
      // products: [...this.state.products.sort((a,b) => a.price - b.price)]

      sortPricesAscending: !this.state.sortPricesAscending,     //sortowanie w 2 strony
      // products: [...this.state.products.sort(sortPrices)]
    })
  }

  handleChange = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  }


  render() {

    let productsToLoad;

    //sortowanie - teraz w renderze, bo nie moge zmieniac state'a
    const { sortPricesAscending, sortNamesAscending } = this.state;

    if (this.state.searchValue.length) {
      productsToLoad = productStore.products.filter(el =>
        el.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
      )
    } else {
      productsToLoad = productStore.products;
    }


    //sortowania warto by przeniesc do stora
    const sortPrices = (a,b) => {
      return !this.state.sortPricesAscending ? a.price - b.price : b.price - a.price;
    }

    const sortNamesInRender = (a,b) => {
      if (!this.state.sortNamesAscending) {
        return a.name < b.name ? -1 : 1;
      } else if (this.state.sortNamesAscending) {
        return a.name < b.name ? 1 : -1;
      }
    }

    productsToLoad = productsToLoad.sort(sortPrices);
    productsToLoad = productsToLoad.sort(sortNamesInRender);

    const { products, soldProductsNumber } = this.props.productStore;

    return (

      <div>
        <button onClick={this.handleSortNames}>Sort names</button>
        <button onClick={this.handleSortPrices}>Sort prices</button>

        <input type="text" onChange={this.handleChange}/>

        <ul>
        { productsToLoad.map(p => (
          <li key={ p.id }>
            <Product
              id={ p.id }
              name={ p.name }
              price={ p.price }
              isSold={ p.isSold }
              onBuyClick={ this.handleBuyClick }/>
          </li>
        ) ) }
        </ul>

        <ul>
          <PromotedProduct products={productStore.products.filter(el =>
            el.isProm
          )} />
        </ul>

        <span>No. of sold products: { soldProductsNumber }</span>
      </div>
  )
  }
}

export default ProductList
