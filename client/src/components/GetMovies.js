import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable, usePagination } from 'react-table';
import './GetMovies.css'; // Assuming you have a CSS file for styling

const GetMovies = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/get_movies')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Title',
                accessor: 'Series_Title',
            },
            {
                Header: 'Released Year',
                accessor: 'Released_Year',
            },
            {
                Header: 'Runtime',
                accessor: 'Runtime',
            },
            {
                Header: 'Genre',
                accessor: 'Genre',
            },
            {
                Header: 'IMDB Rating',
                accessor: 'IMDB_Rating',
            },
            {
                Header: 'Overview',
                accessor: 'Overview',
                Cell: ({ value }) => (value.length > 50 ? `${value.substring(0, 50)}...` : value),
            },
            {
                Header: 'Director',
                accessor: 'Director',
            },
            {
                Header: 'Star 1',
                accessor: 'Star1',
            },
            {
                Header: 'Star 2',
                accessor: 'Star2',
            },
            {
                Header: 'Star 3',
                accessor: 'Star3',
            },
            {
                Header: 'Star 4',
                accessor: 'Star4',
            },
            {
                Header: 'Number of Votes',
                accessor: 'No_of_Votes',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Instead of using 'rows', we'll use page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        state: { pageIndex },
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, // Pass our default table state
        },
        usePagination
    );

    return (
        <div>
            <table {...getTableProps()} className="movie-table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
            </div>
        </div>
    );
};

export default GetMovies;
