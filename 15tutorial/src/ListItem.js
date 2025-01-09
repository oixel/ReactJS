const ListItem = ({ data, index }) => {
    return (
        <li
            id={index}
        >
            {JSON.stringify(data)}
        </li>
    )
}

export default ListItem