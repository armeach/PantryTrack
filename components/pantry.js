const randomId = () => Math.random().toString(); 

const createItem = ({ title, quantity=1, unit='unit', category='misc.', dateAdded = new Date(), expirationDate }) => ({ 
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
    REMOVE: 'REMOVE'
};

export const actionCreators = {
    add: (item) => ({ type: types.ADD, payload: createItem(item) }),
    remove: (id) => ({ type: types.REMOVE, payload: id }),
};

export const initialState = {
    items: [
        createItem({ title: 'Soy Sauce' }),
        createItem({ title : 'Garlic' }),
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
    };
};