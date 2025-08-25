const categories = [
    {label: 'produce', value: 'produce', icon: 'leaf',
        seeds: ['apple', 'banana', 'lettuce', 'tomato', 'carrot', 'onion', 'garlic'],
    },
    {label: 'meat', value: 'meat', icon: 'restaurant',
        seeds: ['chicken', 'beef', 'steak', 'pork', 'lamb', 'fish', 'salmon', 'shrimp'],
    },
    {label: 'dairy', value: 'dairy', icon: 'ice-cream',
        seeds: ['milk', 'cheese', 'cream', 'yogurt'],
    },
    {label: 'dry goods', value: 'dry goods', icon: 'basket',
        seeds: ['rice', 'pasta', 'flour', 'oats', 'beans', 'bread'],
    },
    {label: 'canned goods', value: 'canned goods', icon: 'server',
        seeds: ['tomatoes', 'beans', 'corn'],
    },
    {label: 'spices', value: 'spices', icon: 'flame',
        seeds: ['salt', 'pepper', 'paprika', 'chili powder', 'cumin', 'oregano', 'basil', 'cinnamon', 'all-spice', 'nutmeg'],
    },
    {label: 'frozen', value: 'frozen', icon: 'snow',
        seeds: ['frozen', 'ice cream', 'french fries', 'tater tots'],
    },
    {label: 'snacks', value: 'snacks', icon: 'fast-food',
        seeds: ['chips', 'cookies', 'candy'],
    },
    {label: 'household supplies', value: 'household supplies', icon: 'water',
        seeds: ['paper towels', 'toilet paper', 'dish soap', 'hand soap', 'cleaning spray', 'trash bags']
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
                // console.log(category.value);
                return category.value;
            };
        };
    };
    return 'misc.';
};

export { categories, autoDetectCategory };