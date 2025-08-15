const randomId = () => Math.random().toString(); 

const createItem = (title, quantity) => ({ 
    id: randomId(), 
    title,
    quantity,
    dateAdded: new Date().toISOString(),
});

const types = {
    ADD: 'ADD',
    REMOVE: 'REMOVE'
};

export const actionCreators = {
    add: (title, quantity=1) => ({
        type: types.ADD, 
        payload: createItem(title, quantity)
    }),
    remove: (id) => ({ type: types.REMOVE, payload: id }),
};

export const initialState = {
    items: [
        createItem('Soy Sauce'),
        createItem('Garlic'),
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