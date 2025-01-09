import ListItem from './ListItem';

const List = ({ listItems }) => {
    return (
        <ul>
            {listItems.map((data, index) => <ListItem data={data} index={index} />)}
        </ul>
    )
}

export default List