import './App.css';
import { PostProvider } from './context/post'
import useFetch from './useFetch'
import React, { useState, useEffect } from 'react'

import { add, remove } from './utils'
import { useForm } from 'react-hook-form';
import DataTable from 'react-data-table-component';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function App() {
  const [data, loading] = useFetch('http://localhost:3000/posts');
  const [pages, setPages] = useState(data);
  const [showTable, setShowTable] = useState(false)
  const [activePage, setActivePage] = useState(data);
  const submitRemowe = (data, pages) => {
    console.log('s', data[0].id)
    confirmAlert({
      title: 'Usuwanie elementu ' + data[0].name,
      message: 'Czy usunąć obiekt na stałe',
      buttons: [
        {
          label: 'Tak',
          onClick: () => {
            const filteredPages = pages.filter(page => page.id !== data[0].id);
            setPages(filteredPages);
            setActivePage(pages[0]);
            remove(data[0].id)
          }
        },
        {
          label: 'Nie',
          onClick: () => alert('Click No')
        }
      ]
    });
  };
  const handleChange = ({ selectedRows }) => {
    submitRemowe(selectedRows, pages);
  };
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data, 'sa')
    addNewPage(data)
    resetField("name")
    resetField("netto")
    resetField("brutto")
    resetField("quantity")
  };


  useEffect(() => {
    if (data) {
      setPages(data);
      setActivePage(data[0]);

    }
  }, [data]);

  if (loading || !data) {
    return <div>loading...</div>
  }

  const context = {
    sidebar: [pages, setPages],
    page: [activePage, setActivePage]
  };

  const addNewPage = (data) => {
    let length = pages.length
    let id = pages[length - 1].id
    let addId = id + 1
    const page = {
      id: addId,
      name: data.name,
      netto: data.netto,
      brutto: data.brutto,
      quantity: data.quantity
    }

    add(page);
    setPages([
      ...pages,
      page
    ]);
  };
  const columns = [
    {
      name: 'Usun',


    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,

    },
    {
      name: 'Netto',
      selector: row => row.netto,
      sortable: true,

    },
    {
      name: 'Brutto',
      selector: row => row.brutto,
      sortable: true,

    },
    {
      name: 'Quantity',
      selector: row => row.quantity,
      sortable: true,

    },
  ];



  return (
    <PostProvider value={context}>
      <div className="App">
        <header className="App-header">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name', { required: true, maxLength: 20 })} />
            <input type="number" {...register('netto', { required: true })} />

            <input type="number" {...register('brutto', { required: true })} />
            <input type="number" {...register('quantity', { required: true })} />
            <input type="submit" />


          </form>

          <button type="submit" onClick={() => { setShowTable(!showTable) }}>{!showTable ? ' Pokaż tabele' : 'Ukryj tabele'}</button>

          <div className="container mt-5">
            {showTable && <DataTable
              columns={columns}
              data={pages != null ? pages : data}
              pagination
              selectableRows
              selectableRowsNoSelectAll
              onSelectedRowsChange={handleChange}

            />}
          </div>
        </header>

      </div>
    </PostProvider>
  );
}

export default App;
