import React from 'react'

class App extends React.Component {

    fetchData = () => {
        fetch(`https://api.allorigins.win/get?charset=ISO-8859-1&url=${encodeURIComponent('https://wikipedia.org')}`)
            .then(response => {
                if (response.ok) return response.json()
                throw new Error('Network response was not ok.')
            })
            .then(data => console.log(data.contents));
    }



    render() {
        return (
            <div>
                <button onClick={this.fetchData}>Get Data</button>
            </div>
        )
    }

};


export default App;
