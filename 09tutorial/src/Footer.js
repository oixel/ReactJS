const Footer = ({ length }) => {
    return (
        <footer>
            {/* Display quantity of items in list along with proper plural */}
            <p>{length} List {length === 1 ? "item" : "items"}</p>
        </footer>
    )
}

export default Footer