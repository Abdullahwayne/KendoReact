// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import {
//   Grid,
//   GridColumn as Column,
//   GridToolbar,
// } from "@progress/kendo-react-grid";
// import { sampleProducts } from "./sample-products";
// import { MyCommandCell } from "./myComandCell";
// import { orderBy } from "@progress/kendo-data-query";

// import { DropDownCell } from "./myDropDownCell";
// import { insertItem, getItems, updateItem, deleteItem } from "./services";
// const Table = () => {
//   const editField = "inEdit";
//   const [data, setData] = React.useState(sampleProducts);
//   const CommandCell = (props) => (
//     <MyCommandCell
//       {...props}
//       edit={enterEdit}
//       remove={remove}
//       add={add}
//       discard={discard}
//       update={update}
//       cancel={cancel}
//       editField={editField}
//     />
//   );
//   const [sort, setSort] = React.useState([
//     {
//       field: "ProductName",
//       dir: "desc",
//     },
//   ]);
//   const sortChange = (event) => {
//     setData(getProducts(event.sort));
//     setSort(event.sort);
//   };
//   const getProducts = (sort) => {
//     return orderBy(products, sort);
//   };
//   const [allowUnsort, setAllowUnsort] = React.useState(true);
//   const [multiple, setMultiple] = React.useState(false);

//   // modify the data in the store, db etc
//   const remove = (dataItem) => {
//     const newData = deleteItem(dataItem);
//     setData(newData);
//   };
//   const add = (dataItem) => {
//     dataItem.inEdit = true;
//     const newData = insertItem(dataItem);
//     setData(newData);
//   };
//   const update = (dataItem) => {
//     dataItem.inEdit = false;
//     const newData = updateItem(dataItem);
//     setData(newData);
//   };

//   // Local state operations
//   const discard = (dataItem) => {
//     const newData = [...data];
//     newData.splice(0, 1);
//     setData(newData);
//   };
//   const cancel = (dataItem) => {
//     const originalItem = getItems().find(
//       (p) => p.ProductID === dataItem.ProductID
//     );
//     const newData = data.map((item) =>
//       item.ProductID === originalItem.ProductID ? originalItem : item
//     );
//     setData(newData);
//   };
//   const enterEdit = (dataItem) => {
//     let newData = data.map((item) =>
//       item.ProductID === dataItem.ProductID
//         ? {
//             ...item,
//             inEdit: true,
//           }
//         : item
//     );
//     setData(newData);
//   };
//   const itemChange = (event) => {
//     const field = event.field || "";
//     const newData = data.map((item) =>
//       item.ProductID === event.dataItem.ProductID
//         ? {
//             ...item,
//             [field]: event.value,
//           }
//         : item
//     );
//     setData(newData);
//   };
//   const addNew = () => {
//     const newDataItem = {
//       inEdit: true,
//       Discontinued: false,
//       ProductID: new Date().getMilliseconds(),
//     };
//     setData([newDataItem, ...data]);
//   };
//   return (
//     <Grid
//       data={data}
//       onItemChange={itemChange}
//       editField={editField}
//       dataItemKey={"ProductID"}
//       sortable={{
//           allowUnsort: allowUnsort,
//           mode: multiple ? "multiple" : "single",
//         }}
//         sort={sort}
//         onSortChange={sortChange}
//     >
//       <GridToolbar>
//         <button
//           title="Add new"
//           className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
//           onClick={addNew}
//         >
//           Add new
//         </button>
//       </GridToolbar>
//       <Column field="ProductID" title="Id" width="50px" editable={false} sortable={{
//           allowUnsort: allowUnsort,
//           mode: multiple ? "multiple" : "single",
//         }}
//         sort={sort}
//         onSortChange={sortChange} />
//       <Column field="ProductName" title="Product Name" />
//       <Column
//         field="FirstOrderedOn"
//         title="First Ordered"
//         editor="date"
//         format="{0:d}"
//       />
//       <Column field="UnitsInStock" title="Units" editor="numeric" />
//       <Column field="Discontinued" title="Discontinued" cell={DropDownCell} />
//       <Column cell={CommandCell} width="240px" />
//     </Grid>
//   );
// };
// // ReactDOM.render(<App />, document.querySelector('my-app'));
// export default Table;


import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { process } from '@progress/kendo-data-query';

import { ExcelExport } from '@progress/kendo-react-excel-export';
import { IntlProvider, load, LocalizationProvider, loadMessages, IntlService } from '@progress/kendo-react-intl';
// import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
// import currencyData from 'cldr-core/supplemental/currencyData.json';
// import weekData from 'cldr-core/supplemental/weekData.json';
// import numbers from 'cldr-numbers-full/main/es/numbers.json';
// import currencies from 'cldr-numbers-full/main/es/currencies.json';
// import caGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
// import dateFields from 'cldr-dates-full/main/es/dateFields.json';
// import timeZoneNames from 'cldr-dates-full/main/es/timeZoneNames.json';
// load( currencyData, weekData, numbers, currencies, caGregorian, dateFields, timeZoneNames);
// import esMessages from './es.json';
// loadMessages(esMessages, 'es-ES');

import orders from './orders.json';
const DATE_FORMAT = 'yyyy-mm-dd hh:mm:ss.SSS';
const intl = new IntlService('en');
orders.forEach(o => {
  o.orderDate = intl.parseDate(o.orderDate ? o.orderDate : '20/20/2020', DATE_FORMAT);
  o.shippedDate = o.shippedDate ? undefined : intl.parseDate(o.shippedDate ? o.orderDate.toString() : '20/20/2020', DATE_FORMAT);
});
const DetailComponent = props => {
  const dataItem = props.dataItem;
  return <div>
            <section style={{
      width: "200px",
      float: "left"
    }}>
              <p><strong>Street:</strong> {dataItem.shipAddress.street}</p>
              <p><strong>City:</strong> {dataItem.shipAddress.city}</p>
              <p><strong>Country:</strong> {dataItem.shipAddress.country}</p>
              <p><strong>Postal Code:</strong> {dataItem.shipAddress.postalCode}</p>
            </section>
            <Grid style={{
      width: "500px"
    }} data={dataItem.details} />
          </div>;
};
const Table = () => {
  // const locales = [{
  //   language: 'en-US',
  //   locale: 'en'
  // }, {
  //   language: 'es-ES',
  //   locale: 'es'
  // }];
  const [dataState, setDataState] = React.useState({
    skip: 0,
    take: 20,
    sort: [{
      field: 'orderDate',
      dir: 'desc'
    }],
    group: [{
      field: 'customerID'
    }]
  });
  // const [currentLocale, setCurrentLocale] = React.useState(locales[0]);
  const [dataResult, setDataResult] = React.useState(process(orders, dataState));
  const dataStateChange = event => {
    setDataResult(process(orders, event.dataState));
    setDataState(event.dataState);
  };
  const expandChange = event => {
    const isExpanded = event.dataItem.expanded === undefined ? event.dataItem.aggregates : event.dataItem.expanded;
    event.dataItem.expanded = !isExpanded;
    setDataResult({
      ...dataResult
    });
  };
  let _pdfExport;
  const exportExcel = () => {
    _export.save();
  };
  let _export;
  const exportPDF = () => {
    _pdfExport.save();
  };
  return <div>
            {/* <IntlProvider locale={currentLocale.locale}> */}
              <div>
                <ExcelExport data={orders} ref={exporter => {
          _export = exporter;
        }}>
                  <Grid style={{
            height: '700px'
          }} sortable={true} filterable={true} groupable={true} reorderable={true} pageable={{
            buttonCount: 4,
            pageSizes: true
          }} data={dataResult} {...dataState} onDataStateChange={dataStateChange} detail={DetailComponent} expandField="expanded" onExpandChange={expandChange}>
                    {/* <GridToolbar> */}
                      {/* Locale:&nbsp;&nbsp;&nbsp;
                      <DropDownList value={currentLocale} textField="language" onChange={e => {
                setCurrentLocale(e.target.value);
              }} data={locales} />&nbsp;&nbsp;&nbsp; */}
                      {/* <button title="Export to Excel" className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={exportExcel}>
                        Export to Excel
                      </button>&nbsp; */}
                      {/* <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={exportPDF}>Export to PDF</button> */}
                    {/* </GridToolbar> */}
                    <GridColumn field="customerID" width="200px" />
                    <GridColumn field="orderDate" filter="date" format="{0:D}" width="300px" />
                    <GridColumn field="shipName" width="280px" />
                    <GridColumn field="freight" filter="numeric" width="200px" />
                    <GridColumn field="shippedDate" filter="date" format="{0:D}" width="300px" />
                    <GridColumn field="employeeID" filter="numeric" width="200px" />
                    <GridColumn locked={true} field="orderID" filterable={false} title="ID" width="90px" />
                  </Grid>
                </ExcelExport>
                <GridPDFExport ref={element => {
          _pdfExport = element;
        }} margin="1cm">
                  {<Grid data={process(orders, {
            skip: dataState.skip,
            take: dataState.take
          })}>
                    <GridColumn field="customerID" width="200px" />
                    <GridColumn field="orderDate" filter="date" format="{0:D}" width="300px" />
                    <GridColumn field="shipName" width="280px" />
                    <GridColumn field="freight" filter="numeric" width="200px" />
                    <GridColumn field="shippedDate" filter="date" format="{0:D}" width="300px" />
                    <GridColumn field="employeeID" filter="numeric" width="200px" />
                    <GridColumn locked={true} field="orderID" filterable={false} title="ID" width="90px" />
                  </Grid>}
                </GridPDFExport>
              </div>
            {/* </IntlProvider> */}
          </div>;
};
// ReactDOM.render(<App />, document.querySelector('my-app'));
export default Table