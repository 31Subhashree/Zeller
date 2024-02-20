type PricingRules = {
    [key: string]: { price: number; discountQuantity?: number; discountPrice?: number };
  };
  
  class Checkout {
    private cart: string[] = [];
  
    constructor(private pricingRules: PricingRules) {}
  
    scan(item: string): void {
      this.cart.push(item);
    }
  
    total(): number {
      const totalPrice = Object.keys(this.pricingRules).reduce((total, item) => {
        const count = this.cart.filter((cartItem) => cartItem === item).length;
        const { price, discountQuantity = 1, discountPrice = price } = this.pricingRules[item];
        return total + Math.floor(count / discountQuantity) * discountPrice + (count % discountQuantity) * price;
      }, 0);
  
      return totalPrice;
    }
  }
  
  const pricingRules: PricingRules = {
    ipd: { price: 549.99, discountQuantity: 5, discountPrice: 499.99 },
    mbp: { price: 1399.99 },
    atv: { price: 109.50, discountQuantity: 3, discountPrice: 2 * 109.50 },
    vga: { price: 30.00 },
  };
  
  const co = new Checkout(pricingRules);
  co.scan('atv');
  co.scan('atv');
  co.scan('atv');
  co.scan('vga');
  console.log('Total expected:', co.total()); 
  
  const co2 = new Checkout(pricingRules);
  co2.scan('atv');
  co2.scan('ipd');
  co2.scan('ipd');
  co2.scan('atv');
  co2.scan('ipd');
  co2.scan('ipd');
  co2.scan('ipd');
  console.log('Total expected:', co2.total()); 
  