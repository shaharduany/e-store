import React from 'react';
import AddButton from './add-item';
import { ShopItemI } from './shop-view';

const ShopItem: React.FC<ShopItemI> = (props: ShopItemI) => {
    const { title, description, price, id } = props;
    
    return (<div>
        <div>
            <h3>{title}</h3>
        </div>
        <div>
            <p>{description}</p>
        </div>
        <div>
            <p>Price: {price}</p>
        </div>
        <div>
            <AddButton item={props} />
        </div>
    </div>)
};

export default ShopItem;