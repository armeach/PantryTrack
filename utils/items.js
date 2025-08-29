import { getExpirationDate } from '../utils/getExpirationDate.js';

const randomId = () => Math.random().toString(); 

const createItem = ({ 
        title, 
        brand,
        quantity=1, 
        unit='units', 
        category='misc.', 
        dateAdded = new Date(), 
        expirationValue = 1, 
        expirationUnitsValue = 'days', 
        expirationDate,
        barcode,
    }) => { 
    const newItem = {
        id: randomId(), 
        title,
        brand,
        quantity,
        unit,
        category,
        dateAdded,
        expirationValue: expirationValue,
        expirationUnitsValue: expirationUnitsValue,
        expirationDate : expirationDate || getExpirationDate(dateAdded, expirationValue, expirationUnitsValue),
        barcode: barcode,
    };
    return newItem;
};

const types = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    EDIT: 'EDIT', 
    TOGGLE_CHECKED: 'TOGGLE_CHECKED',
    SET_ITEMS: 'SET_ITEMS',
};

export const actionCreators = {
    add: (item) => ({ type: types.ADD, payload: createItem(item) }),
    remove: (id) => ({ type: types.REMOVE, payload: id }),
    edit: (item) => ({ type: types.EDIT, payload: item }),
    toggleChecked: (id) => ({ type: types.TOGGLE_CHECKED, payload: id }),
    setItems: (items) => ({ type: types.SET_ITEMS, payload: items }),
};

export const createInitialState = () => ({
    items: [
        createItem({ title: 'Soy Sauce', unit: 'bottles', category: 'dry goods', expirationValue: 6, expirationUnitsValue: 'months' }),
        createItem({ title : 'Garlic', category: 'produce', expirationValue: 10, expirationUnitsValue: 'days' }),
        createItem({ title: 'Olive Oil', unit: 'bottles', category: 'dry goods', expirationValue: 1, expirationUnitsValue: 'years' }),
        createItem({ title: 'Eggs', unit: 'package', category: 'dairy', expirationValue: 2, expirationUnitsValue: 'weeks' }),
        createItem({ title: 'Spinach', unit: 'bags', category: 'produce', expirationValue: 5, expirationUnitsValue: 'days' }),
        createItem({ title: 'Rice', unit: 'bags', category: 'grains', expirationValue: 30, expirationUnitsValue: 'years' }),
    ]
});

export function reducer(state, action) {
    switch (action.type) {
        case types.ADD: 
            return { ...state, items: [...state.items, action.payload]};
        case types.REMOVE:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
            };
        case types.EDIT: 
            return {
                ...state,
                items: state.items.map(i => 
                    i.id === action.payload.id ? {...action.payload} : i
                ),
            };
        case types.TOGGLE_CHECKED: 
            return{
                ...state,
                items: state.items.map(i => 
                    i.id === action.payload ? { ...i, checked: !i.checked } : i
                ),
            };
        case types.SET_ITEMS: 
            return{ ...state, items: action.payload };
        default: 
            return state;
    };
};