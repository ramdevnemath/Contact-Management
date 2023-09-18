import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

function ContactList() {

    const [contact, setContact] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([])

    const customFilter = (rows, filters) => {
        const filteredRows = rows.filter((row) => {
            return Object.keys(row).some((field) => {
                return String(row[field]).toLowerCase().includes(filters.searchText.toLowerCase());
            });
        });
        return filteredRows;
    };

    const handleDownload = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'contacts.xlsx');
    };


    const columns = [
        {
            name: 'First Name',
            selector: row => row.firstName,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.lastName,
            sortable: true,
        },
        {
            name: 'E-mail ID',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone No.',
            selector: row => row.phone,
        },
        {
            name: 'Date of Birth',
            selector: (row) => {
                if (row.dob) {
                    const date = new Date(row.dob);
                    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                } else {
                    return 'Not provided';
                }
            },
            sortable: true,
        },
        {
            name: 'CreatedAt',
            selector: (row) => {
                const date = new Date(row.dateOfCreation);
                return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            },
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <Link to={`/update/${row._id}`} className='btn btn-outline-primary' style={{marginRight:'10px'}}>Update</Link>
                    <Link onClick={()=>deleteContact(row._id)} className='btn btn-danger'>Delete</Link>
                </div>
            ),
        },
    ];
    
    useEffect(() => {
        axios.get('http://localhost:4000')
        .then(result => {
            if (Array.isArray(result.data)) {
                setContact(result.data);
                setData(result.data);
            } else {
                console.error("Data received is not an array", result.data);
            }
        })
        .catch(error => console.error(error));
    }, []);

    const deleteContact = async (id) => {
        try {
            const response = await axios.delete('http://localhost:4000/deleteContact/' + id);
            if (response.status === 200) {
                setContact((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
            } else {
                console.error("Failed to delete contact");
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Filter contacts based on searchText
    const filteredContact = customFilter(contact, { searchText }); 

    return (
        <div className='d-flex flex-column vh-100 bg-dark p-5'>
            <div className="d-flex justify-content-between align-items-center">
                <Link to='/create' className='btn btn-success'>Create Contact</Link>
                <h3 style={{ color: 'gold', textAlign: 'center' }}>Your Contacts</h3>
                <Link onClick={handleDownload} className='btn btn-outline-info'>Download</Link>
            </div>
            <div className='w-100 bg-white rounded p-3 mt-5'>
                <DataTable
                    columns={columns}
                    data={filteredContact}
                    onSearch={(newSearchText) => setSearchText(newSearchText)}
                    noHeader
                    customFilterText="Search Contacts"
                    subHeader
                    subHeaderComponent={
                        <section className="bg-white">
                            <div className="row p-2 d-flex align-items-center justify-content-center">
                                <div className="d-flex form-inputs top-5 start-0 translate-middle">
                                    <input
                                        type="text"
                                        placeholder="Search contacts..."
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        className="form-control"
                                        style={{
                                            width: '650px',
                                            boxShadow: '0px 0.1px 0px 0px #000',
                                        }}
                                        />
                                    <i className="bx bx-search"></i>
                                </div>
                            </div>
                        </section>
                    }                    
                    filterFunction={customFilter}
                />
            </div>
        </div>
    );
};

export default ContactList;