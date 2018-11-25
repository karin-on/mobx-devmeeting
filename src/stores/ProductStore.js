import { action, observable, computed, runInAction } from 'mobx'

class ProductStore {
  //4/ We have to use @observable to let MobX track changes

  @observable products = [
    {id: 0, name: 'Coffee', price: 10, isProm: false, isSold: false},
    {id: 1, name: 'Apple', price: 5, isProm: true, isSold: false}
  ]

  //4/ In strict mode we have to do changes to products inside actions
  @action buyProduct = id => {
    const productToBeSold = this.products.find(p => p.id === id);
    productToBeSold.isSold = true;

    console.log(this.products.filter(p => p.id === id));
    return this.products.filter(p => p.id === id);
  }

  //3/ We can add an getter which depends on already existing value
  @computed get soldProductsNumber() {
    return this.products.filter(p => p.isSold).length;
  }

  fetchData() {
    return new Promise(() => 1);
  }

  @action async getData() {
    try {
      const response = await this.fetchData();
      runInAction(() => {
        this.buyProduct(response);
      });
    } catch (error) {
      alert(error);
    }
  }

}
// We have to create an instance of the store
export default new ProductStore()
