const categories = [
    {label: 'produce', value: 'produce', icon: 'leaf',
        seeds: [
            'fruit', 'apple', 'banana', 'berries', 'lemon', 'lime', 'orange', 'avocado', 'mango', 'melon', 'peach', 'plum', 'kiwi', 'pear', 'grape', 'cherries', 
            'vegetable', 'lettuce', 'spinach', 'kale', 'broccoli', 'cauliflower', 'pepper', 'potato', 'tomato', 'carrot', 'corn', 'onion', 'garlic', 'ginger',
            'herb', 'parsley', 'cilantro', 'basil', 'thyme', 'rosemary', 'mint', 'dill',
        ],
    },
    {label: 'meats & seafood', value: 'meats & seafood', icon: 'restaurant',
        seeds: [
            'poultry', 'chicken', 'turkey', 'duck',
            'beef', 'steak', 'pork', 'lamb', 
            'seafood', 'fish', 'salmon', 'tuna', 'tilapia', 'shrimp', 'scallops', 'lobster',
            'bacon', 'sausage', 'ham',
        ],
    },
    {label: 'dairy', value: 'dairy', icon: 'ice-cream',
        seeds: [
            'milk', 'cream', 'half-and-half',
            'cheese', 'cheddar', 'mozzarella', 'parmesan', 'gouda', 'swiss',
            'eggs', 'butter', 'yogurt',
        ],
    },
    {label: 'dry goods', value: 'dry goods', icon: 'basket',
        seeds: [
            'rice', 'pasta', 'quinoa', 'couscous', 
            'bread', 'flour', 'oats', 'cereal', 'granola',
            'beans', 'lentils',
            'oil', 'coconut milk', 
        ],
    },
    {label: 'spices', value: 'spices', icon: 'flame',
        seeds: [
            'salt', 'pepper', 'paprika', 'chili', 'cumin', 
            'cinnamon', 'allspice', 'nutmeg', 'clove',
            'dried', 'basil', 'thyme', 'oregano', 'rosemary', 'parsley',
            'blend', 'curry',
        ],
    },
    {label: 'frozen', value: 'frozen', icon: 'snow',
        seeds: ['frozen', 'ice cream', 'french fries', 'tater tots'],
    },
    {label: 'sauces/condiments', value: 'sauces/condiments', icon: 'water',
        seeds: [
            'sauce', 'ketchup', 'mustard', 'mayo',
        ],
    },
    {label: 'snacks', value: 'snacks', icon: 'fast-food',
        seeds: [
            'chips', 'cookies', 'candy', 'crackers', 'pretzels', 'popcorn', 'trail mix', 
            'nuts', 'almonds', 'cashews', 'peanuts', 
        ],
    },
    {label: 'beverages', value: 'beverages', icon: 'beer',
        seeds: [
            'water', 'juice', 'soda', 'tea', 'coffee', 'lemonade', 
            'beer', 'wine', 'rum', 'whiskey', 'vodka', 'tequila', 'gin', 'liquor', 'cocktail',
        ],
    },
    {label: 'leftovers', value: 'leftovers', icon: 'archive', 
        seeds: [],

    },
    {label: 'household supplies', value: 'household supplies', icon: 'water',
        seeds: [
            'paper', 'paper towels', 'toilet paper', 
            'soap', 'dish soap', 'hand soap', 
            'cleaning spray', 'trash bags', 'detergent', 'bleach', 
        ],
    },
    {label: 'misc.', value: 'misc.',
        seeds: [],
    },
];

function autoDetectCategory(itemName) { 
    const name = itemName.toLowerCase(); 
    for (let category of categories) {
        for (let seed of category.seeds) { 
            if (name.includes(seed.toLowerCase())){
                return category.value;
            };
        };
    };
    return 'misc.';
};

export { categories, autoDetectCategory };