import React, { Component } from 'react';
import { variables } from './variables.js';

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            home: [],
            modalTitle: "",
            SupeName: "",
            SupeSuperpower: "",
            SupeId: 0,
            SupeWeb: "",

            SupeIdFilter: "",
            SupeNameFilter: "",
            homeNoFilter: []
        };

    }

    Filter() {
        var SupeIdFilter = this.state.SupeIdFilter;
        var SupeNameFilter = this.state.SupeNameFilter;

        var filteredData = this.state.homeNoFilter.filter(
            function (el) {
                return el.id.toString().toLowerCase().includes(
                    SupeIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.name.toString().toLowerCase().includes(
                        SupeNameFilter.toString().trim().toLowerCase()
                    )
            }
        );
        this.setState({ home: filteredData })
    }

    sortResult(prop, asc) {
        var sortedData = this.state.homeNoFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({ home: sortedData });
    }

    changeSupeIdFilter = (e) => {
        this.state.SupeIdFilter = e.target.value;
        this.Filter();
    }
    changeSupeNameFilter = (e) => {
        this.state.SupeNameFilter = e.target.value;
        this.Filter();
    }

    refreshList() {
        fetch(variables.API_URL)
            .then(response => response.json())
            .then(data => {
                this.setState({ home: data, homeNoFilter: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeSupeName = (e) => {
        this.setState({ SupeName: e.target.value });
    }

    changeSupeSuperpower = (e) => {
        this.setState({ SupeSuperpower: e.target.value });
    }

    changeSupeWeb = (e) => {
        this.setState({ SupeWeb: e.target.value });
    }
    addClick() {
        this.setState({
            modalTitle: "Add Supes",
            SupeId: 0,
            SupeName: "",
            SupeSuperpower: "",
            SupeWeb: ""
        })
    }
    editClick(Supes) {
        this.setState({
            modalTitle: "Edit Supes",
            SupeId: Supes.id,
            SupeName: Supes.name,
            SupeSuperpower: Supes.superpower,
            SupeWeb: Supes.websiteUrl
        })
    }


    craeteClick() {
        fetch(variables.API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.SupeName,
                superpower: this.state.SupeSuperpower,
                websiteUrl: this.state.SupeWeb
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert('Supe successfully added to Vought');
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    updateClick() {
        fetch(variables.API_URL, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.SupeId,
                name: this.state.SupeName,
                superpower: this.state.SupeSuperpower,
                websiteUrl: this.state.SupeWeb

            })
        })
            .then(res => res.json())
            .then((result) => {
                alert('Update Supe successfully');
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure buddy?')) {
            fetch(variables.API_URL + '/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert('Supe Deleteted');
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    render() {
        const { home,
            modalTitle,
            SupeId,
            SupeName,
            SupeSuperpower,
            SupeWeb } = this.state;
        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <input className="form-control m-2"
                                    onChange={this.changeSupeIdFilter}
                                    placeholder="Search ID" />
                                Supe Id
                                &nbsp;&nbsp;<button type="button" className="btn btn-light"
                                    onClick={() => this.sortResult('id', true)}  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-numeric-down" viewBox="0 0 16 16">
                                        <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z" />
                                        <path fillRule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z" />
                                        <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                                    </svg>
                                </button>
                                <button type="button" className="btn btn-light"
                                    onClick={() => this.sortResult('id', false)}  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-numeric-up-alt" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z" />
                                        <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                                    </svg>
                                </button>
                            </th>
                            <th>
                                <input className='form-control m-2'
                                    onChange={this.changeSupeNameFilter}
                                    placeholder="Search Name" />
                                Supe Name
                                &nbsp;&nbsp;<button type="button" className="btn btn-light"
                                    onClick={() => this.sortResult('name', true)}  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" />
                                        <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                                    </svg>
                                </button>
                                <button type="button" className="btn btn-light"
                                    onClick={() => this.sortResult('name', false)}  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-alpha-up-alt" viewBox="0 0 16 16">
                                        <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z" />
                                        <path fillRule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z" />
                                        <path d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                                    </svg>
                                </button>
                            </th>
                            <th>
                                Superpower
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {home.map(Supes =>
                            <tr key={Supes.id}>
                                <td>{Supes.id}</td>
                                <td><b>{Supes.name}</b></td>
                                <td>{Supes.superpower}</td>
                                <td>
                                    <a href={Supes.websiteUrl} target="_blank">
                                        <button type="button" className="btn btn-light mr-"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                            </svg>
                                        </button>
                                    </a>
                                    <button type="button" className="btn btn-light mr-"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(Supes)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-"
                                        onClick={() => this.deleteClick(Supes.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-x" viewBox="0 0 16 16">
                                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                            <path fillRule="evenodd" d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>)}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"> {modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Supe Name</span>
                                    <input type="text" className="form-control"
                                        value={SupeName}
                                        onChange={this.changeSupeName}
                                        placeholder="YoeMama" />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Supe Superpower</span>
                                    <input type="text" className="form-control"
                                        value={SupeSuperpower}
                                        onChange={this.changeSupeSuperpower}
                                        placeholder="Nuke Everywhere" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Supe Website</span>
                                    <input type="text" className="form-control"
                                        value={SupeWeb}
                                        onChange={this.changeSupeWeb}
                                        placeholder="https://www.facebook.com/joemama/" />
                                </div>
                                {SupeId == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.craeteClick()}
                                    >
                                        Done</button> : null
                                }
                                {SupeId != 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}>
                                        Update</button> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;