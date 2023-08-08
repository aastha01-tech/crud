import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {LuArrowUpDown} from 'react-icons/lu'
function User() {
    const [user, setUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [sortingOrder, setSortingOrder] = useState('Ascending');
    const [sortingColumn, setSortingColumn] = useState('name');

    const searchHandle = async (event) => {
        try {
            let key = event.target.value;
            const response = await fetch(`http://localhost:8080/search/${key}`);
            const data = await response.json();
            if (data) {
                setUser(data);
            }
        } catch (error) {
            console.error('Error searching data:', error.message);
        }
    };

    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user`);
            const data = await response.json();
            setUser(data.student);
        } catch (error) {
            toast.error('Error fetching data:', error.message);
        }
    };

    const deleteItem = async (id) => {
        try {
            if (window.confirm('If you want to delete the record....?')) {
                let response = await fetch(`http://localhost:8080/user/${id}`, {
                    method: "delete"
                });
                await response.json();
                toast.success('Record deleted successfully...')
                getData();
            }
        } catch (error) {
            toast.error('Error Deleting data:', error.message);
        }
    };

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = user.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(user.length / itemsPerPage);

    const goToPreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const renderPaginationControls = () => {
        return (
            <div className='m-3' >
                <button className='btn btn-success' disabled={currentPage === 1} onClick={goToPreviousPage}>Previous</button>
                &nbsp; &nbsp;
                <span>{currentPage}</span>&nbsp; &nbsp;
                <button className='btn btn-secondary' disabled={currentPage === totalPages} onClick={goToNextPage}>Next</button>
            </div>
        );
    };

    const handleSort = (dataIndex) => {
        setSortingColumn(dataIndex);
        setSortingOrder((prevOrder) => (prevOrder === 'Ascending' ? 'Descending' : 'Ascending'));
    };

    const sortedItems = [...currentItems].sort((a, b) => {
        const order = sortingOrder === 'Ascending' ? 1 : -1;
        if (a[sortingColumn] < b[sortingColumn]) return -1 * order;
        if (a[sortingColumn] > b[sortingColumn]) return 1 * order;
        return 0;
    });

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className='container-fluid'>
                <Card>
                    <div className='row p-3'>
                        <div className='col-sm-5'>
                            <div className='input-group' style={{ width: "300px", marginTop: "50px" }} >
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='search here....'
                                    onChange={searchHandle}
                                />
                                <div className='input-group-append'>
                                    <span className='input-group-text' style={{ borderRadius: "2px 0px 0px 2px" }}>search</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='p-4'>
                        <table className='table table-hover'>
                            <thead className='table-danger'>
                                <tr>
                                    <th>S.NO</th>
                                    <th onClick={() => handleSort('name')}>
                                        ClientName{' '}
                                        {sortingColumn === 'name' && (
                                            <span>{sortingOrder === 'Ascending' ? <LuArrowUpDown /> : <LuArrowUpDown />}</span>
                                        )}
                                    </th>
                                    <th>Delete</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => deleteItem(item._id)}>
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <Link to={`/edit/${item._id}`}>
                                                <button className='btn btn-success'>Edit</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <center>
                        <div>
                            {renderPaginationControls()}
                        </div>
                    </center>
                </Card>
            </div>
            <ToastContainer />
        </>
    );
}

export default User;
