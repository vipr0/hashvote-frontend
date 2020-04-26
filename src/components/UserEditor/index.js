import React from 'react'

const UserEditor = ({match}) => {
    return (
        <div>
            User ID: {match.params.votingId}
        </div>
    )
}

export default UserEditor
