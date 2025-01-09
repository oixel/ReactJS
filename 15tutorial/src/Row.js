import Cell from "./Cell"

const Row = ({ item }) => {
    return (
        // Table row element
        <tr>
            {Object.entries(item).map(([key, value]) => {
                return (
                    <Cell key={key} data={JSON.stringify(value)} />
                )
            })};
        </tr>
    )
}

export default Row