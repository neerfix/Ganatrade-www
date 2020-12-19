import React from 'react';

export default class Search extends React.Component {

    state = {
        q: "",
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.history.push({
            pathname: '/offers',
            search: '?q=' + this.state.q,
            state: { q: this.state.q }
        })
    }

    handleChange = (e) => {
        this.setState({q: e.target.value})
    }

    render(){
        return(
            <div className="-space-y-px">
                <form className="w-96" onSubmit={this.handleSubmit}>
                    <input id="search" name="q" type="text" onChange={this.handleChange}
                           className="appearance-none relative block w-full px-3 py-2 border border-black placeholder-black text-black ring-indigo-500 focus:outline-none focus:ring-indigo-500 focus:border-green-500 focus:z-10 sm:text-sm"
                           placeholder="Recherche" />
                </form>
            </div>
        )
    }

}
