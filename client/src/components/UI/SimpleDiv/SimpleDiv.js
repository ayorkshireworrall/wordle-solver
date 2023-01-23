import React, { useState } from 'react';


const SimpleDiv = props => {
    const [value, setValue] = useState(0)
    return (
        <section>
            <div>
                {value}
            </div>
        </section>
    )
}

export default SimpleDiv;