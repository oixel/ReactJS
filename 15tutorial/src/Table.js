import Row from "./Row"

const Table = ({ listItems }) => {
    return (
        <div className="table-container">
            <table>
                <tbody>
                    {listItems.map(item => (
                        <Row key={item.id} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table