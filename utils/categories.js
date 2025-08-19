const categories = [
    {label: 'produce', value: 'produce',
        seeds: ['apple', 'banana', 'lettuce', 'tomato', 'carrot', 'onion', 'garlic'],
    },
    {label: 'meat', value: 'meat',
        seeds: ['chicken', 'beef', 'steak', 'pork', 'lamb', 'fish', 'salmon', 'shrimp'],
    },
    {label: 'dairy', value: 'dairy', 
        seeds: ['milk', 'cheese', 'cream', 'yogurt'],
    },
    {label: 'dry goods', value: 'dry goods', 
        seeds: ['rice', 'pasta', 'flour', 'oats', 'beans', 'bread'],
    },
    {label: 'canned goods', value: 'canned goods',
        seeds: ['tomatoes', 'beans', 'corn'],
    },
    {label: 'spices', value: 'spices',
        seeds: ['salt', 'pepper', 'paprika', 'chili powder', 'cumin', 'oregano', 'basil', 'cinnamon', 'all-spice', 'nutmeg'],
    },
    {label: 'frozen', value: 'frozen',
        seeds: ['frozen', 'ice cream', 'french fries', 'tater tots'],
    },
    {label: 'snacks', value: 'snacks',
        seeds: ['chips', 'cookies', 'candy'],
    },
    {label: 'household supplies', value: 'household supplies',
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
            if (name.includes(seed.toLowerCase())) return category.value;
        };
    };
};

export { categories, autoDetectCategory };