const randomId = () => Math.random().toString(); 

const createItem = ({ title, quantity=1, unit='units', category='misc.', dateAdded = new Date(), expirationDate }) => ({ 
    id: randomId(), 
    title,
    quantity,
    unit,
    category,
    dateAdded,
    expirationDate : expirationDate || new Date(),
});

const types = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    TOGGLE_CHECKED: 'TOGGLE_CHECKED',
};

export const actionCreators = {
    add: (item) => ({ type: types.ADD, payload: createItem(item) }),
    remove: (id) => ({ type: types.REMOVE, payload: id }),
    toggleChecked: (id) => ({ type: types.TOGGLE_CHECKED, payload: id }),
};

export const initialState = {
    items: [
        createItem({ title: 'Soy Sauce', unit: 'bottles', category: 'dry goods'}),
        createItem({ title : 'Garlic', category: 'produce'}),
        createItem({ title: 'Olive Oil', unit: 'bottles', category: 'dry goods' }),
        createItem({ title: 'Eggs', unit: 'package', category: 'dairy' }),
        createItem({ title: 'Spinach', unit: 'bags', category: 'produce' }),
        createItem({ title: 'Rice', unit: 'bags', category: 'grains' }),
    ]
};

export function reducer(state, action) {
    switch (action.type) {
        case types.ADD: 
            return { ...state, items: [...state.items, action.payload]};
        case types.REMOVE:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
            };
        case types.TOGGLE_CHECKED: 
            return{
                ...state,
                items: state.items.map(i => 
                    i.id === action.payload ? { ...i, checked: !i.checked } : i
                ),
            };
        default: 
            return state;
    };
};