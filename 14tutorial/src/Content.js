import ItemList from './ItemList';

const Content = ({ items, handleCheck, handleDelete }) => {
    return (
        <>
            {/* If list is not empty, display items */}
            {items.length ? (
                <ItemList
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            ) : (
                // Otherwise, display empty list message
                <p style={{ marginTop: '2rem' }}>Your grocery list is empty.</p>
            )}
        </>
    )
}

export default Content