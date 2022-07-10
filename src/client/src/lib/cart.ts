import { ShopItemI } from "../components/shop/shop-view";

// Key = id, shopitem the item, number amount;
export interface CartItemsI {
	[key: number]: CartItemi;
}

type CartItemi = [ShopItemI, number];

class ClientCart {
	items: CartItemsI;

	constructor(items: CartItemsI = {}) {
		this.items = items;
	}

	private checkItemInCart(shopItem: ShopItemI) {
		if (this.items[shopItem.id] === undefined) {
			this.items[shopItem.id] = [shopItem, 0];
		}
	}

	insertOne(shopItem: ShopItemI) {
		this.checkItemInCart(shopItem);
		this.items[shopItem.id][1] += 1;
	}

	insertMany(shopItem: ShopItemI, amount: number) {
        this.checkItemInCart(shopItem);
        this.items[shopItem.id][1] += amount;
    }

    removeAllCartItem(item: ShopItemI | number){
        if(typeof item === "number"){
            delete this.items[item];
        } else {
            delete this.items[item.id];
        }
    }

    deleteOne(shopItem: ShopItemI | number){
        if(typeof (shopItem) === "number"){
            this.removeItem(shopItem);
        } else {
            this.removeItem(shopItem.id);
        }
    }

    private removeItem(id: number){
        const amount  = this.items[id][1];
        if(amount > 1){
            this.items[id][1] -= 1;
        } else {
            delete this.items[id];
        }
    }

    getLength(){
        let length = 0;

        for(let item in this.items){
            length += this.items[item][1];
        }

        return length;
    }

    getDisplayItems(){
        let displayItems: CartItemi[] = [];

        for(let item in this.items){
            displayItems.push(this.items[item]);
        }

        return displayItems;
    }
}

export default ClientCart;
