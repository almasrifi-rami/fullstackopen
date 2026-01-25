const Notification = ({ message, type }) => {
    if (!message) {
        return null
    }

    const messageStyle = {
        fontSize: '20px',
        color: type === 'error' ? 'red' : 'green',
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
    return (
        <div style={messageStyle}>
            <p>{message}</p>
        </div>
    )
}

export default Notification