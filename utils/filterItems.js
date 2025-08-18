export default function filterItems(items, query) { 
    query = query.toLowerCase();

    // if there is no query show all items
    if (!query) return items;

    // expired:(true/false)
    if (query.startsWith('expired:')) { 
        const now = new Date(); 
        const queryExpired = query === "expired:true";

        return items.filter(item => {
            const expired = item.expirationDate < now;
            return queryExpired ? expired : !expired;
        });
    };

    // default functionality: text search
    return items.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
    );
};